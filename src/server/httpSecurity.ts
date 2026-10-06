import type { IncomingMessage, ServerResponse } from 'http'

/**
 * Shared HTTP security primitives for the serverless API handlers.
 * - Origin allow-list CORS (no wildcard on authenticated APIs)
 * - Trusted client-IP extraction
 * - Size-bounded JSON body reader
 * - Bounded sliding-window rate limiter
 * - Explicit opt-in gate for non-production test tokens
 */

const DEFAULT_PRODUCTION_ORIGIN = 'https://kalvilearn.vercel.app'

function normalizeOrigin(value: string | undefined): string | null {
  if (!value) return null
  try {
    return new URL(value.trim()).origin
  } catch {
    return null
  }
}

export function getAllowedOrigins(): Set<string> {
  const origins = new Set<string>([DEFAULT_PRODUCTION_ORIGIN])
  const configured = [
    process.env.APP_URL,
    process.env.VITE_APP_URL,
    ...(process.env.ALLOWED_ORIGINS || '').split(','),
  ]
  for (const raw of configured) {
    const origin = normalizeOrigin(raw)
    if (origin) origins.add(origin)
  }
  if (process.env.NODE_ENV !== 'production') {
    origins.add('http://localhost:5173')
    origins.add('http://127.0.0.1:5173')
    origins.add('http://localhost:4173')
  }
  return origins
}

/**
 * Applies origin-allow-listed CORS headers. Requests without an Origin header (same-origin
 * navigations, server-to-server calls) need no CORS headers. Unknown origins receive none,
 * so browsers block cross-origin reads/writes. Authentication uses Bearer tokens only
 * (never cookies), so credentials are never enabled.
 */
export function applyCors(
  req: IncomingMessage,
  res: ServerResponse,
  options: { methods: string; headers: string }
): void {
  res.setHeader('Vary', 'Origin')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  const origin = req.headers['origin']
  if (typeof origin === 'string' && getAllowedOrigins().has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', options.methods)
    res.setHeader('Access-Control-Allow-Headers', options.headers)
    res.setHeader('Access-Control-Max-Age', '600')
  }
}

export function getClientIp(req: IncomingMessage): string {
  const header = (name: string): string | undefined => {
    const value = req.headers[name]
    return (Array.isArray(value) ? value[0] : value)?.split(',')[0]?.trim() || undefined
  }
  return (
    header('x-vercel-forwarded-for') ||
    header('x-real-ip') ||
    header('x-forwarded-for') ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  )
}

/**
 * Test-only bearer tokens (`test_auth_*`) are honoured ONLY when the process is not running
 * in production AND ALLOW_TEST_AUTH_TOKENS=1 is set explicitly. Unset by default.
 */
export function isTestAuthEnabled(): boolean {
  return process.env.NODE_ENV !== 'production' && process.env.ALLOW_TEST_AUTH_TOKENS === '1'
}

export class PayloadTooLargeError extends Error {
  constructor() {
    super('Payload Too Large')
    this.name = 'PayloadTooLargeError'
  }
}

/**
 * Reads a JSON object body. Honours a body already parsed by the platform (Vercel), otherwise
 * streams the request with a hard byte cap. Malformed JSON yields an empty object.
 */
export async function readJsonBody(
  req: IncomingMessage & { body?: unknown },
  maxBytes = 256 * 1024
): Promise<Record<string, unknown>> {
  const existing = req.body
  if (existing && typeof existing === 'object' && !Buffer.isBuffer(existing)) {
    return existing as Record<string, unknown>
  }
  if (typeof existing === 'string') {
    if (Buffer.byteLength(existing) > maxBytes) throw new PayloadTooLargeError()
    return parseJsonObject(existing)
  }
  if (typeof req.on !== 'function') return {}

  return new Promise((resolve, reject) => {
    let size = 0
    const chunks: Buffer[] = []
    let settled = false
    const timer = setTimeout(() => finish(() => resolve(parseJsonObject(Buffer.concat(chunks).toString('utf8')))), 5000)
    const finish = (fn: () => void) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      fn()
    }
    req.on('data', (chunk: Buffer | string) => {
      const buf = typeof chunk === 'string' ? Buffer.from(chunk) : chunk
      size += buf.length
      if (size > maxBytes) {
        finish(() => reject(new PayloadTooLargeError()))
        return
      }
      chunks.push(buf)
    })
    req.on('end', () => finish(() => resolve(parseJsonObject(Buffer.concat(chunks).toString('utf8')))))
    req.on('error', () => finish(() => resolve({})))
  })
}

function parseJsonObject(text: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(text || '{}')
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

interface RateRecord {
  count: number
  resetTime: number
}

/**
 * Fixed-window rate limiter with a hard cap on tracked keys (cannot grow unbounded).
 * NOTE: state is per serverless instance; it throttles bursts but is not a global quota.
 */
export class RateLimiter {
  private readonly records = new Map<string, RateRecord>()
  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number,
    private readonly maxKeys = 5000
  ) {}

  check(key: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now()
    if (this.records.size >= this.maxKeys) {
      for (const [k, v] of this.records) {
        if (now > v.resetTime) this.records.delete(k)
      }
      // Still full of live keys: evict the oldest to stay bounded.
      while (this.records.size >= this.maxKeys) {
        const oldest = this.records.keys().next().value
        if (oldest === undefined) break
        this.records.delete(oldest)
      }
    }
    const record = this.records.get(key)
    if (!record || now > record.resetTime) {
      this.records.set(key, { count: 1, resetTime: now + this.windowMs })
      return { allowed: true }
    }
    if (record.count >= this.maxRequests) {
      return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) }
    }
    record.count++
    return { allowed: true }
  }

  reset(): void {
    this.records.clear()
  }
}
