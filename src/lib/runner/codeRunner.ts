import { executeInWorker, type ExecutionResult } from './workerRunner'
import { getActiveUserId } from '../progress'
import { supabase } from '../supabase'

export type CaseStatus = 'passed' | 'failed' | 'time_limit_exceeded' | 'runtime_error'

export interface TestCaseExecution {
  testIndex: number
  status: CaseStatus
  passed: boolean
  isHidden: boolean
  executionTimeMs: number
  // Defined ONLY for visible test cases (1-3); NEVER defined for hidden cases (4-10)
  input?: string
  expectedOutput?: string
  actualOutput?: string
  error?: string
  isTimeLimitExceeded?: boolean
}

export interface RunResult {
  passed: boolean
  passedCount: number
  /** Number of cases this action executed (Run: visible cases, Submit: the full judge suite). */
  totalCount: number
  results: TestCaseExecution[]
  overallTimeMs: number
  compilationError?: string
  /** What `compilationError` describes: a real compile/syntax error in the code, or a server-side failure. */
  errorKind?: 'compile' | 'system'
  mode?: 'run' | 'submit'
  /** Size of the authoritative server suite (10), reported by the server. */
  judgeTotal?: number
  submissionId?: string
  engine?: 'judge0' | 'native' | 'local'
  /** Server-side persistence outcome for Submit. */
  persistence?: { saved: boolean; progressUpdated: boolean; xpEarned: number; reason?: string }
  /** True when the server could not be reached and only an offline preview of the visible cases ran. */
  offlinePreview?: boolean
}

/**
 * The ONLY condition under which a problem counts as solved (completion, XP, celebration): a Submit whose
 * server-reported suite is complete and fully passed. Passing the visible cases of a Run never qualifies.
 */
export function isAuthoritativeAccept(result: RunResult, isSubmit: boolean): boolean {
  return (
    isSubmit &&
    !result.compilationError &&
    !result.offlinePreview &&
    result.mode === 'submit' &&
    typeof result.judgeTotal === 'number' &&
    result.judgeTotal > 0 &&
    result.totalCount === result.judgeTotal &&
    result.passedCount === result.judgeTotal &&
    result.results.length === result.judgeTotal &&
    result.results.every((r) => r.passed) &&
    result.passed
  )
}

/** Genuine progress events streamed by the server while a Run/Submit executes. */
export type LiveJudgeEvent =
  | {
      type: 'started'
      submissionId: string
      mode: 'run' | 'submit'
      total: number
      judgeTotal: number
      cases: Array<{ testIndex: number; hidden: boolean }>
      engine: 'judge0' | 'native' | 'local'
    }
  | { type: 'case'; submissionId: string; result: TestCaseExecution }

interface ApiTestCasePayload {
  testIndex: number
  status: CaseStatus
  visible: boolean
  executionTimeMs?: number
  input?: string
  expectedOutput?: string
  actualOutput?: string
  error?: string
}

interface ApiResultPayload {
  success?: boolean
  status?: string
  error?: string
  message?: string
  total?: number
  passed?: number
  judgeTotal?: number
  mode?: 'run' | 'submit'
  submissionId?: string
  engine?: 'judge0' | 'native' | 'local'
  overallTimeMs?: number
  testCases?: ApiTestCasePayload[]
  persistence?: RunResult['persistence']
}

function normalizeOutput(str: string): string {
  if (!str) return ''
  return str
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim()
}

function mapCase(tc: ApiTestCasePayload): TestCaseExecution {
  return {
    testIndex: tc.testIndex,
    status: tc.status,
    passed: tc.status === 'passed',
    isHidden: !tc.visible,
    executionTimeMs: tc.executionTimeMs || 0,
    input: tc.visible ? tc.input : undefined,
    expectedOutput: tc.visible ? tc.expectedOutput : undefined,
    actualOutput: tc.visible ? tc.actualOutput : undefined,
    error: tc.visible ? tc.error : undefined,
    isTimeLimitExceeded: tc.status === 'time_limit_exceeded',
  }
}

function toRunResult(data: ApiResultPayload, startTime: number): RunResult {
  const base = {
    mode: data.mode,
    judgeTotal: data.judgeTotal,
    submissionId: data.submissionId,
    engine: data.engine,
    persistence: data.persistence,
  }
  const results = Array.isArray(data.testCases) ? data.testCases.map(mapCase) : []
  if (results.length === 0 && data.status && data.status !== 'ACCEPTED' && data.status !== 'WRONG_ANSWER') {
    return {
      ...base,
      passed: false,
      passedCount: 0,
      totalCount: data.total || 10,
      results: [],
      overallTimeMs: Math.round(performance.now() - startTime),
      compilationError: data.message || data.error || 'Execution failed.',
      errorKind: data.status === 'COMPILATION_ERROR' ? 'compile' : 'system',
    }
  }
  const totalCount = data.total || results.length || 10
  const passedCount = data.passed ?? results.filter((r) => r.passed).length
  return {
    ...base,
    passed: !!data.success && passedCount === totalCount && results.length === totalCount,
    passedCount,
    totalCount,
    results,
    overallTimeMs: data.overallTimeMs || Math.round(performance.now() - startTime),
  }
}

/** Reads an application/x-ndjson body, forwarding progress events and returning the final `result` event. */
async function readJudgeStream(
  response: Response,
  onEvent?: (event: LiveJudgeEvent) => void
): Promise<ApiResultPayload | null> {
  const reader = response.body?.getReader()
  if (!reader) return null
  const decoder = new TextDecoder()
  let buffered = ''
  let final: ApiResultPayload | null = null
  const handleLine = (line: string) => {
    if (!line.trim()) return
    const event = JSON.parse(line) as Record<string, unknown> & { type?: string }
    if (event.type === 'result') {
      final = event as ApiResultPayload
    } else if (event.type === 'started') {
      onEvent?.(event as unknown as LiveJudgeEvent)
    } else if (event.type === 'case') {
      onEvent?.({
        type: 'case',
        submissionId: String(event.submissionId),
        result: mapCase(event as unknown as ApiTestCasePayload),
      })
    }
  }
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffered += decoder.decode(value, { stream: true })
    let newline: number
    while ((newline = buffered.indexOf('\n')) >= 0) {
      handleLine(buffered.slice(0, newline))
      buffered = buffered.slice(newline + 1)
    }
  }
  handleLine(buffered)
  return final
}

/**
 * Executes student code on the server judge.
 *   Run    -> POST /api/execute : the VISIBLE cases only (never marks a problem solved)
 *   Submit -> POST /api/submit  : the full authoritative server suite (3 visible + 7 hidden)
 * The client sends only question id, language and source; the server owns every test case.
 * `onEvent` receives genuine per-case progress streamed by the server as each case finishes.
 */
export async function executeCode(
  questionSlug: string,
  language: string,
  code: string,
  clientVisibleCases?: Array<{ testIndex: number; input: string; expectedOutput: string }>,
  isSubmit: boolean = true,
  options: { onEvent?: (event: LiveJudgeEvent) => void } = {}
): Promise<RunResult> {
  const startTime = performance.now()
  const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false

  let apiErrorMessage: string | null = null

  if (!isOffline) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const endpoint = isSubmit ? '/api/submit' : '/api/execute'
      const activeUserId = getActiveUserId()
      const idempotencyKey = isSubmit ? `submit_${questionSlug}_${language}` : undefined

      let authToken: string | undefined
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        authToken = sessionData?.session?.access_token
      } catch {
        // Continue unauthenticated if session retrieval fails (the server will answer 401)
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/x-ndjson, application/json',
          ...(idempotencyKey ? { 'X-Idempotency-Key': idempotencyKey } : {}),
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify({ questionSlug, language, code, isSubmit, userId: activeUserId, idempotencyKey }),
        signal: controller.signal,
      })

      const contentType = response.headers.get('content-type') || ''
      if (response.status === 200 && contentType.includes('application/x-ndjson')) {
        const final = await readJudgeStream(response, options.onEvent)
        if (final) return toRunResult(final, startTime)
        apiErrorMessage = 'The judge closed the connection before reporting a result. Please try again.'
      } else if (response.status === 200) {
        return toRunResult((await response.json()) as ApiResultPayload, startTime)
      } else if (response.status === 422) {
        const errData = (await response.json().catch(() => ({}))) as ApiResultPayload
        return {
          passed: false,
          passedCount: 0,
          totalCount: errData.total || 10,
          results: [],
          overallTimeMs: Math.round(performance.now() - startTime),
          compilationError: errData.message || 'Syntax or compilation error detected in your solution.',
          errorKind: 'compile',
        }
      } else {
        const errData = (await response.json().catch(() => ({}))) as ApiResultPayload
        if (response.status === 401) apiErrorMessage = 'Your session has expired. Please sign in again to run code.'
        else if (response.status === 429) apiErrorMessage = errData.message || 'Rate limit reached. Please wait a few seconds before trying again.'
        else if (response.status === 400) apiErrorMessage = errData.message || 'Invalid code execution parameters provided.'
        else if (response.status === 404) apiErrorMessage = errData.message || `Problem "${questionSlug}" was not found on the execution server.`
        else if (response.status >= 500)
          apiErrorMessage =
            errData.message ||
            `The execution server failed before running your code (HTTP ${response.status}). Your code was not evaluated; please try again, and contact support if this persists.`
        else apiErrorMessage = `Unexpected server response (HTTP ${response.status}).`
      }
    } catch (err: unknown) {
      const isAbort = err instanceof Error && err.name === 'AbortError'
      apiErrorMessage = isAbort
        ? 'Execution request timed out. Please try again.'
        : 'Unable to connect to the execution server. Please check your network connection.'
    } finally {
      clearTimeout(timeoutId)
    }
  } else {
    apiErrorMessage = 'You are currently working offline. Please reconnect to the internet to submit code.'
  }

  // Run only, server unreachable: an OFFLINE PREVIEW of the visible cases in the browser worker. Hidden cases are
  // NOT reported at all (the judge never ran them) - they are never fabricated as "failed".
  if (!isSubmit && clientVisibleCases && clientVisibleCases.length > 0 && isOffline) {
    const results: TestCaseExecution[] = []
    let passedCount = 0
    for (let i = 0; i < clientVisibleCases.length; i++) {
      const tc = clientVisibleCases[i]
      const execResult: ExecutionResult = await executeInWorker(code, language, tc.input, 3000)
      const passed = !execResult.error && normalizeOutput(execResult.output) === normalizeOutput(tc.expectedOutput)
      if (passed) passedCount++
      results.push({
        testIndex: tc.testIndex || i + 1,
        status: passed ? 'passed' : 'failed',
        passed,
        isHidden: false,
        executionTimeMs: execResult.executionTimeMs,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: execResult.output || (execResult.error ? `Error: ${execResult.error}` : '(no output)'),
        error: execResult.error,
        isTimeLimitExceeded: !!execResult.isTimeLimitExceeded,
      })
    }
    return {
      passed: false, // an offline preview can never count as a pass
      passedCount,
      totalCount: clientVisibleCases.length,
      results,
      overallTimeMs: Math.round(performance.now() - startTime),
      mode: 'run',
      offlinePreview: true,
    }
  }

  return {
    passed: false,
    passedCount: 0,
    totalCount: isSubmit ? 10 : clientVisibleCases?.length || 3,
    results: [],
    overallTimeMs: Math.round(performance.now() - startTime),
    compilationError: apiErrorMessage || 'Code execution service is currently unavailable. Please try again.',
    errorKind: 'system',
  }
}

// Deprecated alias for backwards compatibility
export const runTestCases = (
  code: string,
  language: string,
  testCases: Array<{ testIndex: number; input: string; expectedOutput: string; isHidden: boolean }>
) => {
  return executeCode('', language, code, testCases)
}

export interface CustomRunOutcome {
  success: boolean
  status: string
  actualOutput?: string
  error?: string
  compilationError?: string
  executionTimeMs?: number
  isTimeLimitExceeded?: boolean
}

/**
 * Executes code on the server against a single student-supplied custom input.
 * Does not modify any database records or submit tracking.
 */
export async function executeCustomCode(
  questionSlug: string,
  language: string,
  code: string,
  customInput: string
): Promise<CustomRunOutcome> {
  const startTime = performance.now()
  const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false

  if (isOffline) {
    return {
      success: false,
      status: 'SYSTEM_ERROR',
      error: 'You are currently working offline. Please reconnect to the internet to run custom test cases.',
      executionTimeMs: 0,
    }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  try {
    let authToken: string | undefined
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      authToken = sessionData?.session?.access_token
    } catch {
      // ignore
    }

    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({
        questionSlug,
        language,
        code,
        customInput,
      }),
      signal: controller.signal,
    })

    const data = await response.json().catch(() => ({}))
    const executionTimeMs = data.overallTimeMs || Math.round(performance.now() - startTime)

    if (response.status === 200) {
      const tc = Array.isArray(data.testCases) && data.testCases[0]
      return {
        success: data.success || data.status === 'ACCEPTED',
        status: data.status || 'ACCEPTED',
        actualOutput: tc?.actualOutput || data.message || '',
        error: tc?.error,
        executionTimeMs: tc?.executionTimeMs || executionTimeMs,
        isTimeLimitExceeded: tc?.status === 'time_limit_exceeded',
      }
    } else if (response.status === 422) {
      return {
        success: false,
        status: 'COMPILATION_ERROR',
        compilationError: data.message || data.error || 'Syntax or compilation error in code.',
        executionTimeMs,
      }
    } else if (response.status === 401) {
      return {
        success: false,
        status: 'UNAUTHORIZED',
        error: 'Your session has expired. Please sign in again to run code.',
        executionTimeMs,
      }
    } else if (response.status === 400 && data.error === 'Payload Too Large') {
      return {
        success: false,
        status: 'PAYLOAD_TOO_LARGE',
        error: data.message || 'Custom test input exceeds maximum limit of 64 KB.',
        executionTimeMs,
      }
    } else {
      return {
        success: false,
        status: data.status || 'SYSTEM_ERROR',
        error: data.message || data.error || `Execution failed (HTTP ${response.status}).`,
        executionTimeMs,
      }
    }
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError'
    return {
      success: false,
      status: 'SYSTEM_ERROR',
      error: isAbort ? 'Execution timed out.' : 'Unable to connect to execution server.',
      executionTimeMs: Math.round(performance.now() - startTime),
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
