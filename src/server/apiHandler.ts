import type { IncomingMessage, ServerResponse } from 'http'
import { executeQuestion } from './executeService'
import { openStream, wantsStream } from './judge/stream'
import { authenticateFeedbackRequest } from './feedbackAuth'
import { hitRateLimit } from './rateLimit'
import { applyCors, getClientIp, PayloadTooLargeError, RateLimiter, readJsonBody } from './httpSecurity'

// Two limiters: a coarse per-IP flood guard that runs BEFORE authentication (so unauthenticated floods
// cannot hammer the auth backend), and a per-user execution quota that runs after.
const ipLimiter = new RateLimiter(300, 60_000)
const userLimiter = new RateLimiter(60, 60_000)

export function resetExecuteRateLimitsForTesting() {
  ipLimiter.reset()
  userLimiter.reset()
}

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,127}$/i
const ALLOWED_LANGUAGES = new Set(['python', 'java', 'cpp', 'c++', 'nodejs', 'node', 'javascript', 'js'])
const MAX_CODE_CHARS = 65536

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

  applyCors(req, res, { methods: 'POST, OPTIONS', headers: 'Content-Type, Authorization' })

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    return sendJson(405, { error: 'Method Not Allowed. Use POST.' })
  }

  const ipRate = ipLimiter.check(getClientIp(req))
  if (!ipRate.allowed) {
    res.setHeader('Retry-After', String(ipRate.retryAfter || 60))
    return sendJson(429, { success: false, error: 'Too Many Requests', message: 'Rate limit exceeded. Please retry shortly.' })
  }

  // Code execution is an authenticated capability: the caller identity comes ONLY from the verified
  // Supabase token, never from the request body.
  const authResult = await authenticateFeedbackRequest((req.headers['authorization'] as string) || '')
  if (!authResult.authenticated || !authResult.user) {
    const statusCode = authResult.statusCode || 401
    return sendJson(statusCode, {
      success: false,
      error: statusCode === 401 ? 'Unauthenticated' : 'Authentication Unavailable',
      message: statusCode === 401 ? 'Sign in to run code.' : authResult.error || 'Unable to verify your account. Please retry.',
      total: 10,
      passed: 0,
      testCases: [],
    })
  }

  const userRate = await hitRateLimit(userLimiter, `exec:${authResult.user.id}`, 60, 60)
  if (!userRate.allowed) {
    res.setHeader('Retry-After', String(userRate.retryAfter || 60))
    return sendJson(429, {
      success: false,
      error: 'Too Many Requests',
      message: `Execution rate limit exceeded. Please wait ${userRate.retryAfter} seconds before trying again.`,
    })
  }

  let body: Record<string, unknown>
  try {
    body = await readJsonBody(req, 256 * 1024)
  } catch (err) {
    if (err instanceof PayloadTooLargeError) {
      return sendJson(413, { success: false, error: 'Payload Too Large', message: 'Request body is too large.' })
    }
    return sendJson(400, { success: false, error: 'Bad Request', message: 'Malformed request body.' })
  }

  const questionSlug = typeof body.questionSlug === 'string' ? body.questionSlug : ''
  const language = typeof body.language === 'string' ? body.language.toLowerCase() : ''
  const code = typeof body.code === 'string' ? body.code : ''

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
  if (!SLUG_PATTERN.test(questionSlug) || !ALLOWED_LANGUAGES.has(language) || code.length > MAX_CODE_CHARS) {
    return sendJson(400, {
      success: false,
      error: 'Invalid Parameters',
      message: 'Unsupported question, language, or code size.',
      total: 10,
      passed: 0,
      testCases: [],
    })
  }

  // Run = the VISIBLE cases only (quick feedback). Only Submit executes the full hidden suite.
  if (wantsStream(req)) {
    const stream = openStream(res)
    try {
      const result = await executeQuestion({ questionSlug, language, code, mode: 'run', onEvent: (e) => stream(e) })
      stream({ type: 'result', ...result })
    } catch (err: unknown) {
      console.error('[api/execute] unexpected failure:', err instanceof Error ? err.message : 'unknown error')
      stream({ type: 'result', success: false, status: 'SYSTEM_ERROR', error: 'Execution Error', message: 'The code could not be evaluated. Please try again.', total: 3, passed: 0, testCases: [] })
    }
    res.end()
    return
  }

  try {
    const result = await executeQuestion({ questionSlug, language, code, mode: 'run' })
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
    console.error('[api/execute] unexpected failure:', err instanceof Error ? err.message : 'unknown error')
    return sendJson(500, {
      success: false,
      error: 'Execution Error',
      message: 'The code could not be evaluated. Please try again.',
      total: 10,
      passed: 0,
      testCases: [],
    })
  }
}
