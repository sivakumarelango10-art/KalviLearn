import type { IncomingMessage, ServerResponse } from 'http'
import { verifyTeamSyncWebhookSignature } from './teamSyncWebhookAuth'
import { processTeamSyncWebhook } from './teamSyncWebhookService'
import { getClientIp } from './httpSecurity'

// Sliding-window rate limiter for webhooks (120 requests / 1 minute per IP)
interface RateRecord {
  count: number
  resetTime: number
}
const rateLimitMap = new Map<string, RateRecord>()

export function resetWebhookRateLimitsForTesting() {
  rateLimitMap.clear()
}

function checkRateLimit(ip: string, maxLimit = 120, windowMs = 60000): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true }
  }
  if (record.count >= maxLimit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }
  record.count++
  return { allowed: true }
}

export default async function handler(
  req: IncomingMessage & { body?: unknown; rawBody?: string },
  res: ServerResponse & { status?: (code: number) => { json: (data: unknown) => void }; json?: (data: unknown) => void }
) {
  const sendJson = (statusCode: number, data: unknown) => {
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(statusCode).json(data)
    }
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  // Server-to-server endpoint: authenticated by HMAC signature, never called from a browser, so NO CORS headers
  // are emitted (cross-origin pages cannot read or script this endpoint).
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    return sendJson(405, {
      success: false,
      error: 'Method Not Allowed',
      message: 'Only POST requests are supported for TeamSync webhooks.',
    })
  }

  // Rate Limiting by IP
  const clientIp = getClientIp(req)

  const rate = checkRateLimit(clientIp, 120, 60000)
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfter || 60))
    return sendJson(429, {
      success: false,
      error: 'Too Many Requests',
      message: `Webhook rate limit exceeded. Please retry after ${rate.retryAfter} seconds.`,
    })
  }

  // 1. Buffer Raw Body for Cryptographic Verification
  let rawBody = req.rawBody || ''
  if (!rawBody) {
    if (typeof req.body === 'string') {
      rawBody = req.body
    } else if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
      rawBody = JSON.stringify(req.body)
    } else if (typeof req.on === 'function') {
      rawBody = await new Promise<string>((resolve, reject) => {
        let data = ''
        let totalBytes = 0
        const MAX_BYTES = 2 * 1024 * 1024 // 2MB limit

        req.on('data', (chunk: Buffer | string) => {
          totalBytes += chunk.length
          if (totalBytes > MAX_BYTES) {
            reject(new Error('Payload Too Large'))
            return
          }
          data += chunk
        })
        req.on('end', () => resolve(data))
        req.on('error', (err) => reject(err))
        // Timeout safeguard
        setTimeout(() => resolve(data), 500)
      }).catch(() => '')
    }
  }

  if (!rawBody || rawBody.trim() === '') {
    return sendJson(400, {
      success: false,
      error: 'Empty Body',
      message: 'Webhook request body cannot be empty.',
    })
  }

  // 2. Extract Security Headers
  const signatureHeader =
    (req.headers['x-teamsync-signature'] as string) ||
    (req.headers['x-signature'] as string)
  const timestampHeader =
    (req.headers['x-teamsync-timestamp'] as string) ||
    (req.headers['x-timestamp'] as string)
  const rawEventId =
    (req.headers['x-teamsync-event-id'] as string) ||
    (req.headers['x-event-id'] as string) ||
    ''
  const eventIdHeader = rawEventId ? rawEventId.split(',')[0].trim() : undefined

  // 3. Cryptographic Signature & Replay Verification
  const authResult = verifyTeamSyncWebhookSignature(
    rawBody,
    signatureHeader,
    timestampHeader,
    eventIdHeader
  )

  if (!authResult.valid) {
    return sendJson(authResult.statusCode || 401, {
      success: false,
      error: 'Unauthorized',
      message: authResult.error || 'TeamSync webhook cryptographic verification failed.',
    })
  }

  // 4. Parse Body JSON
  let parsedPayload: Record<string, any>
  try {
    parsedPayload = JSON.parse(rawBody)
  } catch {
    return sendJson(400, {
      success: false,
      error: 'Bad Request',
      message: 'Failed to parse webhook JSON payload.',
    })
  }

  // 5. Process Webhook Event through Business Logic Engine
  const result = await processTeamSyncWebhook(
    parsedPayload,
    rawBody,
    eventIdHeader || authResult.eventId
  )

  return sendJson(result.statusCode, result)
}
