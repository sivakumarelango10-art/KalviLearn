/**
 * TeamSync Webhook Sender Module (Phase 4B)
 *
 * Responsibilities:
 * - Generates structured, canonical outbound webhook event payloads for KalviLearn
 * - Cryptographically signs payloads using HMAC-SHA256 (matching KalviLearn Phase 4A)
 * - Persists all outbound webhook dispatches to `teamsync_webhook_deliveries` (Outbox pattern)
 * - Enforces bounded retries with exponential backoff for transient failures (502, 503, 504, timeout)
 * - Fails fast without retrying permanent client errors (400, 401, 403, 404, 422)
 * - Reuses stable `eventId` across all retries to guarantee recipient idempotency
 * - Strictly prevents SSRF attacks and secret leakage in logs or responses
 */

import crypto from 'crypto'
import { supabaseServer } from './feedbackAuth'

export interface TeamSyncWebhookTicket {
  id?: string | null
  ticketNumber?: string | null
  sourceReferenceId?: string | null
  source?: string
}

export interface TeamSyncWebhookEventPayload {
  eventId: string
  eventType: string
  timestamp: number
  source: 'TEAMSYNC'
  ticketId?: string | null
  ticketNumber?: string | null
  sourceReferenceId?: string | null
  ticket?: TeamSyncWebhookTicket
  previousStatus?: string | null
  newStatus?: string | null
  previousPriority?: string | null
  newPriority?: string | null
  assignee?: {
    id?: string | null
    name?: string | null
    email?: string | null
  }
  comment?: {
    id: string
    authorName?: string
    authorEmail?: string | null
    authorRole?: string
    content: string
    createdAt?: string
  }
  data?: Record<string, any>
}

export interface WebhookSenderResult {
  success: boolean
  eventId: string
  eventType: string
  destination: string
  httpStatus?: number
  attempts: number
  durationMs: number
  error?: string
  permanentFailure?: boolean
}

export interface WebhookSenderOptions {
  destination?: string
  secret?: string
  maxRetries?: number
  baseDelayMs?: number
  timeoutMs?: number
}

// ─── In-Memory Mock Transport Hook for Testing ────────────────────────────────
type SenderMockTransportFn = (
  url: string,
  options: {
    method: string
    headers: Record<string, string>
    body: string
    signal?: AbortSignal
  }
) => Promise<{ status: number; statusText: string; json: () => Promise<any>; text: () => Promise<string> }>

let mockTransport: SenderMockTransportFn | null = null

export function setWebhookSenderMockTransport(fn: SenderMockTransportFn | null) {
  mockTransport = fn
}

export function resetWebhookSenderMockTransport() {
  mockTransport = null
}

// ─── Environment Configuration ────────────────────────────────────────────────

export function getKalviLearnWebhookUrl(): string {
  const envUrl = process.env.KALVILEARN_WEBHOOK_URL?.trim()
  if (envUrl) return envUrl
  return 'https://kalvilearn.vercel.app/api/integrations/teamsync/webhooks'
}

export function getKalviLearnWebhookSecret(): string {
  const secret =
    process.env.KALVILEARN_WEBHOOK_SECRET ||
    process.env.TEAMSYNC_WEBHOOK_SECRET ||
    ''
  return secret.trim()
}

// ─── SSRF & Destination Validation ────────────────────────────────────────────

export function validateWebhookDestination(urlStr: string): { valid: boolean; error?: string } {
  if (!urlStr || typeof urlStr !== 'string') {
    return { valid: false, error: 'Webhook URL cannot be empty.' }
  }

  let parsed: URL
  try {
    parsed = new URL(urlStr)
  } catch {
    return { valid: false, error: 'Invalid Webhook URL format.' }
  }

  const hostname = parsed.hostname.toLowerCase()
  const protocol = parsed.protocol.toLowerCase()

  // In production, require HTTPS
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')
  if (protocol !== 'https:' && !isLocal && process.env.NODE_ENV === 'production') {
    return { valid: false, error: 'Outbound webhooks must use HTTPS protocol in production.' }
  }

  if (protocol !== 'http:' && protocol !== 'https:') {
    return { valid: false, error: `Disallowed protocol: ${protocol}` }
  }

  // Prohibit dangerous cloud metadata service IPs (SSRF defense)
  if (
    hostname === '169.254.169.254' || // AWS / GCP / Azure metadata
    hostname === 'metadata.google.internal' ||
    hostname === '100.100.100.200' || // Alibaba metadata
    hostname === 'fd00:ec2::254'
  ) {
    return { valid: false, error: 'Access to cloud instance metadata service is forbidden.' }
  }

  return { valid: true }
}

// ─── HMAC-SHA256 Signature ────────────────────────────────────────────────────

/**
 * Computes an HMAC-SHA256 signature matching the canonical format expected by KalviLearn:
 * HMAC_SHA256(secret, `${timestamp}.${rawBody}`)
 */
export function computeTeamSyncSenderSignature(
  rawBody: string,
  timestamp: number | string,
  secret: string = getKalviLearnWebhookSecret()
): string {
  const payloadToSign = `${timestamp}.${rawBody}`
  return crypto.createHmac('sha256', secret).update(payloadToSign, 'utf8').digest('hex')
}

// ─── Event Builders ───────────────────────────────────────────────────────────

function generateEventId(prefix = 'evt'): string {
  const rand = crypto.randomBytes(6).toString('hex')
  return `${prefix}_${Date.now()}_${rand}`
}

export function buildStatusChangedEvent(params: {
  eventId?: string
  ticketId: string
  ticketNumber?: string
  sourceReferenceId?: string
  previousStatus: string
  newStatus: string
  timestamp?: number
}): TeamSyncWebhookEventPayload {
  const timestamp = params.timestamp ?? Math.floor(Date.now() / 1000)
  const eventId = params.eventId || generateEventId('evt_status')

  return {
    eventId,
    eventType: 'STATUS_CHANGED',
    timestamp,
    source: 'TEAMSYNC',
    ticketId: params.ticketId,
    ticketNumber: params.ticketNumber || null,
    sourceReferenceId: params.sourceReferenceId || null,
    ticket: {
      id: params.ticketId,
      ticketNumber: params.ticketNumber || null,
      sourceReferenceId: params.sourceReferenceId || null,
      source: 'KALVILEARN',
    },
    previousStatus: params.previousStatus,
    newStatus: params.newStatus,
  }
}

export function buildPriorityChangedEvent(params: {
  eventId?: string
  ticketId: string
  ticketNumber?: string
  sourceReferenceId?: string
  previousPriority: string
  newPriority: string
  timestamp?: number
}): TeamSyncWebhookEventPayload {
  const timestamp = params.timestamp ?? Math.floor(Date.now() / 1000)
  const eventId = params.eventId || generateEventId('evt_prio')

  return {
    eventId,
    eventType: 'PRIORITY_CHANGED',
    timestamp,
    source: 'TEAMSYNC',
    ticketId: params.ticketId,
    ticketNumber: params.ticketNumber || null,
    sourceReferenceId: params.sourceReferenceId || null,
    ticket: {
      id: params.ticketId,
      ticketNumber: params.ticketNumber || null,
      sourceReferenceId: params.sourceReferenceId || null,
      source: 'KALVILEARN',
    },
    previousPriority: params.previousPriority,
    newPriority: params.newPriority,
  }
}

export function buildAssignedEvent(params: {
  eventId?: string
  ticketId: string
  ticketNumber?: string
  sourceReferenceId?: string
  assignee: {
    id?: string
    name: string
    email?: string | null
  }
  timestamp?: number
}): TeamSyncWebhookEventPayload {
  const timestamp = params.timestamp ?? Math.floor(Date.now() / 1000)
  const eventId = params.eventId || generateEventId('evt_assign')

  return {
    eventId,
    eventType: 'ASSIGNED',
    timestamp,
    source: 'TEAMSYNC',
    ticketId: params.ticketId,
    ticketNumber: params.ticketNumber || null,
    sourceReferenceId: params.sourceReferenceId || null,
    ticket: {
      id: params.ticketId,
      ticketNumber: params.ticketNumber || null,
      sourceReferenceId: params.sourceReferenceId || null,
      source: 'KALVILEARN',
    },
    assignee: {
      id: params.assignee.id || null,
      name: params.assignee.name,
      email: params.assignee.email || null,
    },
  }
}

export function buildCommentCreatedEvent(params: {
  eventId?: string
  ticketId: string
  ticketNumber?: string
  sourceReferenceId?: string
  comment: {
    id: string
    authorName?: string
    authorEmail?: string | null
    authorRole?: string
    content: string
    createdAt?: string
  }
  timestamp?: number
}): TeamSyncWebhookEventPayload {
  const timestamp = params.timestamp ?? Math.floor(Date.now() / 1000)
  const eventId = params.eventId || generateEventId('evt_comment')

  return {
    eventId,
    eventType: 'COMMENT_CREATED',
    timestamp,
    source: 'TEAMSYNC',
    ticketId: params.ticketId,
    ticketNumber: params.ticketNumber || null,
    sourceReferenceId: params.sourceReferenceId || null,
    ticket: {
      id: params.ticketId,
      ticketNumber: params.ticketNumber || null,
      sourceReferenceId: params.sourceReferenceId || null,
      source: 'KALVILEARN',
    },
    comment: {
      id: params.comment.id,
      authorName: params.comment.authorName || 'TeamSync Staff',
      authorEmail: params.comment.authorEmail || null,
      authorRole: params.comment.authorRole || 'STAFF',
      content: params.comment.content,
      createdAt: params.comment.createdAt || new Date().toISOString(),
    },
  }
}

// ─── Dispatcher with Outbox Tracking & Bounded Exponential Retries ─────────────

/**
 * Dispatches a webhook event to KalviLearn with outbox persistence and bounded retries.
 */
export async function dispatchWebhookEvent(
  payload: TeamSyncWebhookEventPayload,
  options: WebhookSenderOptions = {}
): Promise<WebhookSenderResult> {
  const startTime = Date.now()
  const destination = options.destination || getKalviLearnWebhookUrl()
  const secret = options.secret || getKalviLearnWebhookSecret()
  const maxRetries = options.maxRetries ?? 3
  const baseDelayMs = options.baseDelayMs ?? 100
  const timeoutMs = options.timeoutMs ?? 5000

  // 1. SSRF and Destination Safety Check
  const validation = validateWebhookDestination(destination)
  if (!validation.valid) {
    return {
      success: false,
      eventId: payload.eventId,
      eventType: payload.eventType,
      destination,
      attempts: 0,
      durationMs: Date.now() - startTime,
      error: `SSRF Validation Error: ${validation.error}`,
      permanentFailure: true,
    }
  }

  const rawBody = JSON.stringify(payload)
  const timestamp = payload.timestamp || Math.floor(Date.now() / 1000)
  const signature = computeTeamSyncSenderSignature(rawBody, timestamp, secret)

  // 2. Outbox Persistence: Record event in `teamsync_webhook_deliveries`
  try {
    const { error: insertErr } = await supabaseServer.from('teamsync_webhook_deliveries').insert({
      id: crypto.randomUUID(),
      event_id: payload.eventId,
      event_type: payload.eventType,
      ticket_id: payload.ticketId || payload.ticket?.id || null,
      ticket_number: payload.ticketNumber || payload.ticket?.ticketNumber || null,
      source_reference_id: payload.sourceReferenceId || payload.ticket?.sourceReferenceId || null,
      destination,
      payload,
      status: 'PENDING',
      attempt_count: 0,
      created_at: new Date().toISOString(),
    })
    if (insertErr && !insertErr.message?.includes('duplicate key')) {
      console.warn('[Webhook Sender] Outbox insert warning:', insertErr.message)
    }
  } catch (dbErr) {
    console.warn('[Webhook Sender] Outbox query warning:', dbErr)
  }

  // 3. Execution Loop with Bounded Retries
  let attempts = 0
  let lastHttpStatus: number | undefined
  let lastErrorMessage: string | undefined
  let permanentFailure = false

  while (attempts < maxRetries) {
    attempts++
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    try {
      let res: { status: number; text: () => Promise<string> }

      if (mockTransport) {
        res = await mockTransport(destination, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-TeamSync-Signature': signature,
            'X-TeamSync-Timestamp': String(timestamp),
            'X-TeamSync-Event-ID': payload.eventId,
          },
          body: rawBody,
          signal: controller.signal,
        })
      } else {
        res = await fetch(destination, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-TeamSync-Signature': signature,
            'X-TeamSync-Timestamp': String(timestamp),
            'X-TeamSync-Event-ID': payload.eventId,
          },
          body: rawBody,
          signal: controller.signal,
        })
      }

      clearTimeout(timer)
      lastHttpStatus = res.status

      // Success codes: 200 (Processed/Duplicate), 202 (Unmapped Accepted)
      if (res.status === 200 || res.status === 202) {
        // Update Outbox status -> DELIVERED
        try {
          await supabaseServer
            .from('teamsync_webhook_deliveries')
            .update({
              status: 'DELIVERED',
              http_status: res.status,
              attempt_count: attempts,
              last_attempt: new Date().toISOString(),
              completed_at: new Date().toISOString(),
              error: null,
            })
            .eq('event_id', payload.eventId)
        } catch {}

        return {
          success: true,
          eventId: payload.eventId,
          eventType: payload.eventType,
          destination,
          httpStatus: res.status,
          attempts,
          durationMs: Date.now() - startTime,
        }
      }

      // Permanent failures: 400, 401, 403, 404, 422 (Do NOT retry)
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        const errText = await res.text().catch(() => '')
        lastErrorMessage = `HTTP ${res.status}: ${errText || 'Client Error'}`
        permanentFailure = true
        break
      }

      // Transient errors: 500, 502, 503, 504, 429
      const errText = await res.text().catch(() => '')
      lastErrorMessage = `HTTP ${res.status}: ${errText || 'Transient Error'}`
    } catch (fetchErr: any) {
      clearTimeout(timer)
      if (fetchErr.name === 'AbortError') {
        lastErrorMessage = `Request timed out after ${timeoutMs}ms`
      } else {
        lastErrorMessage = fetchErr.message || 'Network transport error'
      }
    }

    // If retries remaining and error is transient, wait exponential backoff
    if (attempts < maxRetries && !permanentFailure) {
      const delay = baseDelayMs * Math.pow(2, attempts - 1) + Math.random() * 20
      try {
        await supabaseServer
          .from('teamsync_webhook_deliveries')
          .update({
            status: 'RETRYING',
            http_status: lastHttpStatus || null,
            attempt_count: attempts,
            last_attempt: new Date().toISOString(),
            next_retry: new Date(Date.now() + delay).toISOString(),
            error: lastErrorMessage,
          })
          .eq('event_id', payload.eventId)
      } catch {}

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  // 4. Record Final Failure in Outbox
  try {
    await supabaseServer
      .from('teamsync_webhook_deliveries')
      .update({
        status: 'FAILED',
        http_status: lastHttpStatus || null,
        attempt_count: attempts,
        last_attempt: new Date().toISOString(),
        completed_at: new Date().toISOString(),
        error: lastErrorMessage,
      })
      .eq('event_id', payload.eventId)
  } catch {}

  return {
    success: false,
    eventId: payload.eventId,
    eventType: payload.eventType,
    destination,
    httpStatus: lastHttpStatus,
    attempts,
    durationMs: Date.now() - startTime,
    error: lastErrorMessage || 'Webhook delivery failed.',
    permanentFailure,
  }
}
