import type { IncomingMessage, ServerResponse } from 'http'
import { randomUUID } from 'node:crypto'
import { executeQuestion, type JudgeEvent } from './executeService'
import { openStream, wantsStream } from './judge/stream'
import { authenticateFeedbackRequest, supabaseServer } from './feedbackAuth'
import { hitRateLimit } from './rateLimit'
import { applyCors, getClientIp, PayloadTooLargeError, RateLimiter, readJsonBody } from './httpSecurity'

const SOLVE_XP = 50
const REQUIRED_TESTS = 10

const ipLimiter = new RateLimiter(300, 60_000)
const userLimiter = new RateLimiter(30, 60_000)

// Idempotency: a repeated key from the SAME user within the TTL returns the first result. In-flight
// requests share one promise so a double-click can never create two submissions / two XP awards.
const IDEMPOTENCY_TTL_MS = 60_000
const idempotencyCache = new Map<string, { timestamp: number; promise: Promise<SubmitOutcome> }>()

// Problem slug -> id never changes at runtime; cache removes a Supabase round-trip per submission.
const problemIdCache = new Map<string, string>()

export function resetSubmitStateForTesting() {
  ipLimiter.reset()
  userLimiter.reset()
  idempotencyCache.clear()
  problemIdCache.clear()
}

interface SubmitOutcome {
  statusCode: number
  payload: Record<string, unknown>
}

function pruneIdempotencyCache() {
  if (idempotencyCache.size < 2000) return
  const now = Date.now()
  for (const [key, value] of idempotencyCache) {
    if (now - value.timestamp > IDEMPOTENCY_TTL_MS) idempotencyCache.delete(key)
  }
  while (idempotencyCache.size >= 2000) {
    const oldest = idempotencyCache.keys().next().value
    if (oldest === undefined) break
    idempotencyCache.delete(oldest)
  }
}

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,127}$/i
const MAX_CODE_CHARS = 65536

function normalizeSubmissionLanguage(raw: string): string | null {
  const l = (raw || '').toLowerCase()
  if (l === 'javascript' || l === 'js' || l === 'node' || l === 'nodejs') return 'nodejs'
  if (l === 'java') return 'java'
  if (l === 'cpp' || l === 'c++') return 'cpp'
  if (l === 'python' || l === 'py') return 'python'
  return null
}

async function resolveProblemId(slug: string): Promise<string | null> {
  const cachedId = problemIdCache.get(slug)
  if (cachedId) return cachedId
  const { data } = await supabaseServer.from('Problem').select('id').eq('slug', slug).maybeSingle()
  if (data?.id) {
    const id = String(data.id)
    problemIdCache.set(slug, id)
    return id
  }
  return null
}

interface PersistenceResult {
  saved: boolean
  submissionId: string | null
  progressUpdated: boolean
  xpEarned: number
  /** Why nothing was stored, when `saved` is false. */
  reason?: 'not_persisted_test_identity' | 'question_not_registered' | 'storage_error' | 'evaluation_failed'
}

/**
 * Server-authoritative persistence. The caller identity is the verified token's user id.
 * Logical identity of a progress row is (userId, problemId, language): languages never overwrite each other.
 */
async function persistSubmission(params: {
  userId: string
  problemId: string
  language: string
  code: string
  allPassed: boolean
  passed: number
  total: number
  executionTimeMs: number
}): Promise<PersistenceResult> {
  const { userId, problemId, language, code, allPassed, passed, total, executionTimeMs } = params
  const result: PersistenceResult = { saved: false, submissionId: null, progressUpdated: false, xpEarned: 0 }
  const now = new Date().toISOString()

  const submissionId = randomUUID()
  const { error: subError } = await supabaseServer.from('Submission').insert({
    id: submissionId,
    userId,
    problemId,
    language,
    code,
    status: allPassed ? 'PASSED' : 'FAILED',
    passedTests: passed,
    totalTests: total,
    testResults: [], // hidden test details are never stored client-visible
    executionTimeMs,
    createdAt: now,
  })
  if (subError) {
    console.error('[api/submit] submission insert failed:', subError.code)
    return result
  }
  result.submissionId = submissionId
  result.saved = true

  if (!allPassed) return result

  const { data: existing, error: lookupError } = await supabaseServer
    .from('UserProgress')
    .select('id, status, attempts, xpEarned')
    .eq('userId', userId)
    .eq('problemId', problemId)
    .eq('language', language)
    .maybeSingle()
  if (lookupError) {
    console.error('[api/submit] progress lookup failed:', lookupError.code)
    return result
  }

  if (!existing) {
    const { error: insertError } = await supabaseServer.from('UserProgress').insert({
      id: randomUUID(),
      userId,
      problemId,
      language,
      status: 'SOLVED',
      bestCode: code,
      solvedAt: now,
      attempts: 1,
      xpEarned: SOLVE_XP,
    })
    if (!insertError) {
      result.progressUpdated = true
      result.xpEarned = SOLVE_XP
      return result
    }
    // 23505 = a concurrent request created the row first (unique userId+problemId+language): fall through
    // and treat this as a repeat solve so XP is awarded exactly once.
    if (insertError.code !== '23505') {
      console.error('[api/submit] progress insert failed:', insertError.code)
      return result
    }
    const retry = await supabaseServer
      .from('UserProgress')
      .select('id, status, attempts, xpEarned')
      .eq('userId', userId)
      .eq('problemId', problemId)
      .eq('language', language)
      .maybeSingle()
    if (!retry.data) return result
    return updateExistingSolve(retry.data, code, now, result)
  }

  return updateExistingSolve(existing, code, now, result)
}

async function updateExistingSolve(
  existing: { id: string; status: string; attempts: number | null; xpEarned: number | null },
  code: string,
  now: string,
  result: PersistenceResult
): Promise<PersistenceResult> {
  const wasSolved = existing.status === 'SOLVED'
  const update: Record<string, unknown> = {
    status: 'SOLVED',
    bestCode: code,
    attempts: (existing.attempts || 0) + 1,
  }
  if (!wasSolved) {
    update.solvedAt = now
    update.xpEarned = SOLVE_XP
  }
  const { error } = await supabaseServer.from('UserProgress').update(update).eq('id', existing.id)
  if (error) {
    console.error('[api/submit] progress update failed:', error.code)
    return result
  }
  result.progressUpdated = true
  result.xpEarned = wasSolved ? 0 : SOLVE_XP
  return result
}

async function processSubmission(params: {
  userId: string
  questionSlug: string
  language: string
  code: string
  persist: boolean
  onEvent?: (event: JudgeEvent) => void
}): Promise<SubmitOutcome> {
  const { userId, questionSlug, language, code, persist, onEvent } = params

  // 1. Authoritatively evaluate the FULL server suite (3 visible + 7 hidden). The client never supplies tests.
  const evalResult = await executeQuestion({ questionSlug, language, code, mode: 'submit', onEvent })
  // Accepted strictly means every case of the complete judge suite passed (never "visible cases passed").
  const allPassed =
    evalResult.success &&
    evalResult.mode === 'submit' &&
    evalResult.total === evalResult.judgeTotal &&
    evalResult.passed === evalResult.judgeTotal &&
    evalResult.total > 0

  // 2. Persist (best effort - the evaluation result is still returned if storage is unavailable)
  let persistence: PersistenceResult = { saved: false, submissionId: null, progressUpdated: false, xpEarned: 0 }
  const questionKey = (evalResult.questionId || questionSlug).replace(/^(practice|coding):/, '')
  if (!persist) {
    persistence.reason = 'not_persisted_test_identity'
  } else if (!evalResult.questionId || evalResult.status === 'SYSTEM_ERROR') {
    persistence.reason = 'evaluation_failed'
  } else {
    try {
      const problemId = await resolveProblemId(questionKey)
      if (!problemId) {
        persistence.reason = 'question_not_registered'
        console.warn(`[api/submit] ${evalResult.questionId} has no Problem row; submission not persisted`)
      } else {
        persistence = await persistSubmission({
          userId,
          problemId,
          language,
          code,
          allPassed,
          passed: evalResult.passed,
          total: evalResult.total,
          executionTimeMs: evalResult.overallTimeMs,
        })
        if (!persistence.saved) persistence.reason = 'storage_error'
      }
    } catch (dbErr) {
      persistence.reason = 'storage_error'
      console.error('[api/submit] persistence failure:', dbErr instanceof Error ? dbErr.message : 'unknown')
    }
  }

  return {
    statusCode: 200,
    payload: {
      ...evalResult,
      persistence,
      isSolved: allPassed,
      xpAwarded: persistence.xpEarned,
    },
  }
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

  applyCors(req, res, { methods: 'POST, OPTIONS', headers: 'Content-Type, Authorization, X-Idempotency-Key' })

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

  // Authoritative authentication: identity comes from the verified token + users table only.
  const authResult = await authenticateFeedbackRequest((req.headers['authorization'] as string) || '')
  if (!authResult.authenticated || !authResult.user) {
    return sendJson(authResult.statusCode || 401, {
      success: false,
      error: 'Unauthorized',
      message: 'Authentication is required to submit code.',
    })
  }
  const authenticatedUser = authResult.user

  let body: Record<string, unknown>
  try {
    body = await readJsonBody(req, 256 * 1024)
  } catch (err) {
    if (err instanceof PayloadTooLargeError) {
      return sendJson(413, { success: false, error: 'Payload Too Large', message: 'Request body is too large.' })
    }
    return sendJson(400, { success: false, error: 'Bad Request', message: 'Malformed request body.' })
  }

  const questionSlug =
    typeof body.questionSlug === 'string' ? body.questionSlug : typeof body.problemSlug === 'string' ? body.problemSlug : ''
  const rawLanguage = typeof body.language === 'string' ? body.language : ''
  const code = typeof body.code === 'string' ? body.code : ''
  const claimedUserId = typeof body.userId === 'string' ? body.userId : undefined

  // IDOR guard: a request may only ever act as the authenticated user.
  if (claimedUserId && claimedUserId !== 'guest' && claimedUserId !== authenticatedUser.id) {
    return sendJson(403, {
      success: false,
      error: 'Forbidden',
      message: 'Cannot submit code on behalf of another user.',
    })
  }

  if (!questionSlug || !rawLanguage || !code) {
    return sendJson(400, {
      success: false,
      error: 'Missing Parameters',
      message: 'questionSlug, language, and code are required.',
    })
  }
  const language = normalizeSubmissionLanguage(rawLanguage)
  if (!language || !SLUG_PATTERN.test(questionSlug) || code.length > MAX_CODE_CHARS) {
    return sendJson(400, {
      success: false,
      error: 'Invalid Parameters',
      message: 'Unsupported question, language, or code size.',
    })
  }

  const userRate = await hitRateLimit(userLimiter, `submit:${authenticatedUser.id}`, 30, 60)
  if (!userRate.allowed) {
    res.setHeader('Retry-After', String(userRate.retryAfter || 60))
    return sendJson(429, {
      success: false,
      error: 'Too Many Requests',
      message: `Submission rate limit exceeded. Please wait ${userRate.retryAfter} seconds before submitting again.`,
    })
  }

  // Idempotency (scoped to the authenticated user so keys cannot collide across accounts)
  const rawKey = (typeof body.idempotencyKey === 'string' && body.idempotencyKey) || (req.headers['x-idempotency-key'] as string) || ''
  const idempotencyKey = rawKey && rawKey.length <= 200 ? `${authenticatedUser.id}:${rawKey}` : ''
  pruneIdempotencyCache()
  const stream = wantsStream(req) ? openStream(res) : null
  const deliver = (outcome: SubmitOutcome) => {
    if (!stream) return sendJson(outcome.statusCode, outcome.payload)
    stream({ type: 'result', ...outcome.payload })
    res.end()
  }

  if (idempotencyKey) {
    const existing = idempotencyCache.get(idempotencyKey)
    if (existing && Date.now() - existing.timestamp < IDEMPOTENCY_TTL_MS) {
      const outcome = await existing.promise
      return deliver(outcome)
    }
  }

  const work = processSubmission({
    userId: authenticatedUser.id,
    questionSlug,
    language,
    code,
    persist: !authenticatedUser.synthetic,
    onEvent: stream ? (event) => stream(event) : undefined,
  })
  if (idempotencyKey) {
    idempotencyCache.set(idempotencyKey, { timestamp: Date.now(), promise: work })
  }

  try {
    const outcome = await work
    return deliver(outcome)
  } catch (err: unknown) {
    if (idempotencyKey) idempotencyCache.delete(idempotencyKey)
    console.error('[api/submit] processing failure:', err instanceof Error ? err.message : 'unknown error')
    if (stream) {
      stream({ type: 'result', success: false, status: 'SYSTEM_ERROR', error: 'Submission Processing Error', message: 'Your submission could not be processed. Please try again.', total: 10, passed: 0, testCases: [] })
      res.end()
      return
    }
    return sendJson(500, {
      success: false,
      error: 'Submission Processing Error',
      message: 'Your submission could not be processed. Please try again.',
      total: REQUIRED_TESTS,
      passed: 0,
      testCases: [],
    })
  }
}
