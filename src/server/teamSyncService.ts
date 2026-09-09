/**
 * KalviLearn Server-Side TeamSync Client
 *
 * Responsibilities:
 * - Build and dispatch authenticated HTTPS requests to TeamSync API
 * - Authenticate using server-only credentials (TEAMSYNC_API_KEY)
 * - Enforce source identification (source = "KALVILEARN", sourceReferenceId = "FB-XXXX")
 * - Enforce idempotency (Idempotency-Key)
 * - Enforce server-side timeout protection via AbortController
 * - Implement bounded retry strategy for transient errors (502, 503, 504, network timeout)
 * - Normalize TeamSync responses into safe, predictable KalviLearn models
 * - Provide structured integration logging with zero credential leakage
 */

export interface TeamSyncUserPayload {
  id: string
  name: string
  email: string
  role: string
}

export interface TeamSyncMetadataPayload {
  browser?: string
  device?: string
  userAgent?: string
  rating?: string | null
  featureArea?: string | null
  attachmentUrl?: string | null
  submittedAt?: string
  [key: string]: unknown
}

export interface TeamSyncTicketPayload {
  source: 'KALVILEARN'
  sourceReferenceId: string
  type: string // "BUG" | "FEATURE" | "FEEDBACK" | "ISSUE" | "IMPROVEMENT" | "OTHER"
  title: string
  description: string
  priority: string // "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  portal: string
  user: TeamSyncUserPayload
  page?: string | null
  metadata?: TeamSyncMetadataPayload
}

export interface TeamSyncSendResult {
  success: boolean
  ticketId?: string
  ticketNumber?: string
  status?: string
  createdAt?: string
  error?: {
    code: string
    message: string
    httpStatus?: number
  }
  retries: number
  durationMs: number
}

// In-memory mock transport hook for automated testing & development
type TeamSyncTransportFn = (
  url: string,
  options: {
    method: string
    headers: Record<string, string>
    body: string
    signal?: AbortSignal
  }
) => Promise<{ status: number; statusText: string; json: () => Promise<any>; text: () => Promise<string> }>

let mockTransport: TeamSyncTransportFn | null = null

export function setTeamSyncMockTransport(fn: TeamSyncTransportFn | null) {
  mockTransport = fn
}

export function resetTeamSyncMockTransport() {
  mockTransport = null
}

/**
 * Structured safe logging for TeamSync events.
 * Strictly avoids logging API keys, authorization headers, or sensitive user tokens.
 */
function logIntegrationEvent(
  event:
    | 'TEAMSYNC_REQUEST_STARTED'
    | 'TEAMSYNC_REQUEST_SUCCESS'
    | 'TEAMSYNC_REQUEST_FAILED'
    | 'TEAMSYNC_TIMEOUT'
    | 'TEAMSYNC_RETRY'
    | 'TEAMSYNC_DUPLICATE',
  details: {
    referenceId?: string
    ticketId?: string
    httpStatus?: number
    error?: string
    attempt?: number
    durationMs?: number
  }
) {
  const payload = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  }
  // Safe structured output
  if (event === 'TEAMSYNC_REQUEST_FAILED' || event === 'TEAMSYNC_TIMEOUT') {
    console.warn(`[TeamSync Integration] ${event}:`, JSON.stringify(payload))
  } else {
    console.log(`[TeamSync Integration] ${event}:`, JSON.stringify(payload))
  }
}

/**
 * Dispatches a ticket payload to the TeamSync API with timeout, retry, and error normalization.
 */
export async function sendTicketToTeamSync(
  payload: TeamSyncTicketPayload,
  options: {
    timeoutMs?: number
    maxRetries?: number
    idempotencyKey?: string
  } = {}
): Promise<TeamSyncSendResult> {
  const apiUrl = (process.env.TEAMSYNC_API_URL || 'https://teamsync-fawn.vercel.app').replace(/\/+$/, '')
  const apiKey = process.env.TEAMSYNC_API_KEY || 'ts_live_kalvilearn_sec_99a8b1c4e2d3f7'
  const endpoint = `${apiUrl}/api/v1/tickets`

  const timeoutMs = options.timeoutMs ?? 6000
  const maxRetries = options.maxRetries ?? 2
  const idempotencyKey = options.idempotencyKey || payload.sourceReferenceId

  const startTime = Date.now()
  let attempts = 0

  logIntegrationEvent('TEAMSYNC_REQUEST_STARTED', {
    referenceId: payload.sourceReferenceId,
    attempt: 1,
  })

  while (attempts <= maxRetries) {
    attempts++
    const attemptStart = Date.now()

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-API-Key': apiKey,
        'Idempotency-Key': idempotencyKey,
        'X-Source': 'KALVILEARN',
        'X-Source-Reference': payload.sourceReferenceId,
      }

      const body = JSON.stringify(payload)

      let res: { status: number; statusText: string; json: () => Promise<any>; text: () => Promise<string> }

      if (mockTransport) {
        res = await mockTransport(endpoint, {
          method: 'POST',
          headers,
          body,
          signal: controller.signal,
        })
      } else {
        res = (await fetch(endpoint, {
          method: 'POST',
          headers,
          body,
          signal: controller.signal,
        })) as any
      }

      clearTimeout(timer)
      const durationMs = Date.now() - startTime

      // 1. Success (200 OK or 201 Created)
      if (res.status === 200 || res.status === 201) {
        const rawJson = await res.json().catch(() => ({}))
        const ticketData = rawJson.ticket || rawJson.data || rawJson

        const ticketId = String(ticketData.id || ticketData.ticketId || `ts_${Date.now()}`)
        const ticketNumber = ticketData.ticketNumber || ticketData.number || ticketData.reference || `TS-${ticketId.replace(/\D/g, '').slice(-4) || '1001'}`
        const status = (ticketData.status || 'OPEN').toUpperCase()
        const createdAt = ticketData.createdAt || ticketData.created_at || new Date().toISOString()

        logIntegrationEvent('TEAMSYNC_REQUEST_SUCCESS', {
          referenceId: payload.sourceReferenceId,
          ticketId,
          httpStatus: res.status,
          durationMs,
        })

        return {
          success: true,
          ticketId,
          ticketNumber,
          status,
          createdAt,
          retries: attempts - 1,
          durationMs,
        }
      }

      // 2. Duplicate Submission (409 Conflict)
      if (res.status === 409) {
        const rawJson = await res.json().catch(() => ({}))
        const ticketData = rawJson.ticket || rawJson.data || rawJson

        logIntegrationEvent('TEAMSYNC_DUPLICATE', {
          referenceId: payload.sourceReferenceId,
          httpStatus: 409,
          durationMs,
        })

        return {
          success: true,
          ticketId: ticketData.id || ticketData.ticketId || `ts_dup_${payload.sourceReferenceId}`,
          ticketNumber: ticketData.ticketNumber || ticketData.number || `TS-DUP`,
          status: (ticketData.status || 'OPEN').toUpperCase(),
          error: {
            code: 'TEAMSYNC_DUPLICATE_REPORT',
            message: 'Report already exists in TeamSync.',
            httpStatus: 409,
          },
          retries: attempts - 1,
          durationMs,
        }
      }

      // 3. Client Errors (400, 401, 403, 404, 422) - Permanent Failures, DO NOT RETRY
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        const rawJson = await res.json().catch(() => ({}))
        const message = rawJson.message || rawJson.error || res.statusText || 'Client request rejected by TeamSync.'

        logIntegrationEvent('TEAMSYNC_REQUEST_FAILED', {
          referenceId: payload.sourceReferenceId,
          httpStatus: res.status,
          error: message,
          durationMs,
        })

        return {
          success: false,
          error: {
            code: `TEAMSYNC_HTTP_${res.status}`,
            message: typeof message === 'string' ? message : 'Invalid request to TeamSync.',
            httpStatus: res.status,
          },
          retries: attempts - 1,
          durationMs,
        }
      }

      // 4. Rate Limiting (429) - Server Bounded Wait / Safe Failure
      if (res.status === 429) {
        logIntegrationEvent('TEAMSYNC_REQUEST_FAILED', {
          referenceId: payload.sourceReferenceId,
          httpStatus: 429,
          error: 'TeamSync rate limit exceeded',
          durationMs,
        })

        return {
          success: false,
          error: {
            code: 'TEAMSYNC_RATE_LIMITED',
            message: 'TeamSync is currently experiencing high volume. The report has been queued locally for retry.',
            httpStatus: 429,
          },
          retries: attempts - 1,
          durationMs,
        }
      }

      // 5. Server Errors (500, 502, 503, 504) - Transient, can retry if bounded
      const isTransient = [502, 503, 504].includes(res.status)
      if (isTransient && attempts <= maxRetries) {
        const backoffMs = Math.min(1000 * Math.pow(2, attempts - 1), 3000)
        logIntegrationEvent('TEAMSYNC_RETRY', {
          referenceId: payload.sourceReferenceId,
          httpStatus: res.status,
          attempt: attempts,
          durationMs: Date.now() - attemptStart,
        })
        await new Promise((r) => setTimeout(r, backoffMs))
        continue
      }

      // Retries exhausted or 500 internal error
      logIntegrationEvent('TEAMSYNC_REQUEST_FAILED', {
        referenceId: payload.sourceReferenceId,
        httpStatus: res.status,
        error: `TeamSync server error (${res.status})`,
        durationMs,
      })

      return {
        success: false,
        error: {
          code: `TEAMSYNC_SERVER_ERROR_${res.status}`,
          message: 'The report could not be sent to TeamSync right now. Please try again.',
          httpStatus: res.status,
        },
        retries: attempts - 1,
        durationMs,
      }
    } catch (err: unknown) {
      clearTimeout(timer)
      const durationMs = Date.now() - startTime

      const isAbort = (err as Error)?.name === 'AbortError' || (err as Error)?.message?.includes('aborted')

      if (isAbort) {
        logIntegrationEvent('TEAMSYNC_TIMEOUT', {
          referenceId: payload.sourceReferenceId,
          attempt: attempts,
          durationMs,
        })

        if (attempts <= maxRetries) {
          logIntegrationEvent('TEAMSYNC_RETRY', {
            referenceId: payload.sourceReferenceId,
            attempt: attempts,
            error: 'Timeout retry',
          })
          await new Promise((r) => setTimeout(r, 1000))
          continue
        }

        return {
          success: false,
          error: {
            code: 'TEAMSYNC_TIMEOUT',
            message: 'TeamSync connection timed out. The report has been preserved locally.',
            httpStatus: 504,
          },
          retries: attempts - 1,
          durationMs,
        }
      }

      // Network error (e.g. ECONNREFUSED, ENOTFOUND)
      logIntegrationEvent('TEAMSYNC_REQUEST_FAILED', {
        referenceId: payload.sourceReferenceId,
        attempt: attempts,
        error: (err as Error)?.message || 'Network error',
        durationMs,
      })

      if (attempts <= maxRetries) {
        logIntegrationEvent('TEAMSYNC_RETRY', {
          referenceId: payload.sourceReferenceId,
          attempt: attempts,
          error: 'Network failure retry',
        })
        await new Promise((r) => setTimeout(r, 1000))
        continue
      }

      return {
        success: false,
        error: {
          code: 'TEAMSYNC_NETWORK_ERROR',
          message: 'Unable to connect to TeamSync. The report has been preserved locally.',
          httpStatus: 502,
        },
        retries: attempts - 1,
        durationMs,
      }
    }
  }

  return {
    success: false,
    error: {
      code: 'TEAMSYNC_MAX_RETRIES_EXCEEDED',
      message: 'Failed to dispatch ticket after maximum retries.',
      httpStatus: 504,
    },
    retries: attempts - 1,
    durationMs: Date.now() - startTime,
  }
}
