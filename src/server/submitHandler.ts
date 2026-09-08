import type { IncomingMessage, ServerResponse } from 'http'
import { executeQuestion } from './executeService'
import { createClient } from '@supabase/supabase-js'

// Supabase client for server-authoritative submission with service role key if available, fallback to environment
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://iavxnhwbgoarnexmyxpn.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40'
const supabaseServer = createClient(supabaseUrl, supabaseKey)

// In-memory sliding-window rate limiter (e.g. max 30 submissions/minute per IP/user)
interface RateRecord {
  count: number
  resetTime: number
}
const rateLimitMap = new Map<string, RateRecord>()

// In-memory idempotency deduplication cache
const idempotencyCache = new Map<string, { timestamp: number; response: any }>()

// In-memory Problem Slug -> UUID cache to eliminate redundant Supabase round-trips
const problemIdCache = new Map<string, string>()

function pruneSubmitCaches() {
  const now = Date.now()
  if (rateLimitMap.size > 2000) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) rateLimitMap.delete(key)
    }
  }
  if (idempotencyCache.size > 2000) {
    for (const [key, val] of idempotencyCache.entries()) {
      if (now - val.timestamp > 120000) idempotencyCache.delete(key)
    }
  }
}

function checkRateLimit(key: string, maxLimit = 30, windowMs = 60000): { allowed: boolean; retryAfter?: number } {
  pruneSubmitCaches()
  const now = Date.now()
  const record = rateLimitMap.get(key)
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
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

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Idempotency-Key')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    return sendJson(405, { error: 'Method Not Allowed. Use POST.' })
  }

  // Client IP for rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1'
  const rate = checkRateLimit(`submit_${ip}`, 30, 60000)
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfter || 60))
    return sendJson(429, {
      success: false,
      error: 'Too Many Requests',
      message: `Submission rate limit exceeded. Please wait ${rate.retryAfter} seconds before submitting again.`,
    })
  }

  // Parse JSON Body
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
        setTimeout(() => resolve(body || {}), 300)
      })
    }
  }

  interface SubmitRequestBody {
    questionSlug?: string
    language?: string
    code?: string
    userId?: string
    idempotencyKey?: string
  }
  const parsedBody = (body as SubmitRequestBody) || {}
  const { questionSlug, language, code, userId } = parsedBody
  const idempotencyKey = parsedBody.idempotencyKey || (req.headers['x-idempotency-key'] as string)

  // Idempotency check: if already processed recently, return cached response
  if (idempotencyKey) {
    const cached = idempotencyCache.get(idempotencyKey)
    if (cached && Date.now() - cached.timestamp < 30000) {
      return sendJson(200, cached.response)
    }
  }

  if (!questionSlug || !language || !code) {
    return sendJson(400, {
      success: false,
      error: 'Missing Parameters',
      message: 'questionSlug, language, and code are required.',
    })
  }

  try {
    // 1. Authoritatively evaluate all 10 test cases on the server
    const evalResult = await executeQuestion({
      questionSlug,
      language,
      code,
      isSubmit: true,
    })

    const isAllPassed = evalResult.success && evalResult.passed === evalResult.total && evalResult.total === 10

    let persistenceResult = { submissionId: null as string | null, progressUpdated: false, xpEarned: 0 }

    // 2. Server-Authoritative Database Persistence if userId provided
    if (userId) {
      try {
        // Resolve problem UUID with in-memory caching
        let problemId: string | undefined
        if (questionSlug) {
          const slug: string = questionSlug
          problemId = problemIdCache.get(slug)
          if (!problemId) {
            const { data: problemRow } = await supabaseServer
              .from('Problem')
              .select('id')
              .eq('slug', slug)
              .maybeSingle()
            if (problemRow?.id) {
              const pid = String(problemRow.id)
              problemId = pid
              problemIdCache.set(slug, pid)
            }
          }
        }

        if (problemId) {
          const submissionId = 'sub_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now()

          // Insert Submission
          await supabaseServer.from('Submission').insert({
            id: submissionId,
            userId,
            problemId,
            language,
            code,
            status: isAllPassed ? 'PASSED' : 'FAILED',
            passedTests: evalResult.passed,
            totalTests: evalResult.total,
            testResults: [], // Don't expose hidden test details
            executionTimeMs: evalResult.overallTimeMs,
            createdAt: new Date().toISOString(),
          })

          persistenceResult.submissionId = submissionId

          // If all 10 passed, award XP and update UserProgress
          if (isAllPassed) {
            await supabaseServer.from('UserProgress').upsert(
              {
                userId,
                problemId,
                status: 'SOLVED',
                language,
                bestCode: code,
                solvedAt: new Date().toISOString(),
                attempts: 1,
                xpEarned: 50,
              },
              { onConflict: 'userId,problemId' }
            )
            persistenceResult.progressUpdated = true
            persistenceResult.xpEarned = 50
          }
        }
      } catch (dbErr) {
        console.warn('Backend database persistence warning:', dbErr)
        // Proceed with evaluation result even if DB write had non-fatal warning
      }
    }

    const responsePayload = {
      ...evalResult,
      persistence: persistenceResult,
      isSolved: isAllPassed,
      xpAwarded: isAllPassed ? 50 : 0,
    }

    // Cache idempotency response
    if (idempotencyKey) {
      idempotencyCache.set(idempotencyKey, {
        timestamp: Date.now(),
        response: responsePayload,
      })
    }

    return sendJson(200, responsePayload)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal Server Error'
    return sendJson(500, {
      success: false,
      error: 'Submission Processing Error',
      message: msg,
      total: 10,
      passed: 0,
      testCases: [],
    })
  }
}
