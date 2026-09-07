import type { IncomingMessage, ServerResponse } from 'http'
import { executeQuestion } from './executeService'

// Sliding window rate limiter: max 40 executions/min per IP with burst limit
interface RateRecord {
  count: number
  resetTime: number
}
const rateLimitMap = new Map<string, RateRecord>()

function pruneRateLimitMap() {
  if (rateLimitMap.size > 2000) {
    const now = Date.now()
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) rateLimitMap.delete(key)
    }
  }
}

function checkRateLimit(ip: string, maxLimit = 60, windowMs = 60000): { allowed: boolean; retryAfter?: number } {
  pruneRateLimitMap()
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
  req: IncomingMessage & { body?: unknown; query?: unknown },
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

  // Support CORS if needed
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    return sendJson(405, { error: 'Method Not Allowed. Use POST.' })
  }

  // Rate Limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1'
  const rate = checkRateLimit(ip, 60, 60000)
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfter || 60))
    return sendJson(429, {
      success: false,
      error: 'Too Many Requests',
      message: `Execution rate limit exceeded. Please wait ${rate.retryAfter} seconds before trying again.`,
    })
  }

  // Parse body if not already parsed by Vercel
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  } else if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    if (typeof req.on === 'function') {
      body = await new Promise((resolve) => {
        let data = ''
        req.on('data', (chunk) => {
          data += chunk
        })
        req.on('end', () => {
          try {
            resolve(JSON.parse(data || '{}'))
          } catch {
            resolve({})
          }
        })
        req.on('error', () => resolve({}))
        setTimeout(() => resolve(body || {}), 200)
      })
    }
  }

  interface ExecuteRequestBody {
    questionSlug?: string
    language?: string
    code?: string
    isSubmit?: boolean
  }
  const parsedBody = (body as ExecuteRequestBody) || {}
  const { questionSlug, language, code, isSubmit = true } = parsedBody

  if (!questionSlug || !language || !code) {
    return sendJson(400, {
      success: false,
      error: 'Missing Parameters',
      message: 'questionSlug, language, and code are required.',
      total: 10,
      passed: 0,
      testCases: [],
    })
  }

  try {
    const result = await executeQuestion({ questionSlug, language, code, isSubmit })
    if (result.error === 'Question Not Found') {
      return sendJson(404, result)
    }
    if (result.error === 'Compilation Error') {
      return sendJson(422, result)
    }
    if (!result.success && result.error) {
      return sendJson(500, result)
    }
    return sendJson(200, result)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal Server Error'
    return sendJson(500, {
      success: false,
      error: 'Execution Error',
      message: msg,
      total: 10,
      passed: 0,
      testCases: [],
    })
  }
}
