import { executeInWorker, type ExecutionResult } from './workerRunner'

export interface TestCaseExecution {
  testIndex: number
  status: 'passed' | 'failed' | 'time_limit_exceeded' | 'runtime_error'
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
  totalCount: number
  results: TestCaseExecution[]
  overallTimeMs: number
  compilationError?: string
}

interface ApiTestCasePayload {
  testIndex: number
  status: 'passed' | 'failed' | 'time_limit_exceeded' | 'runtime_error'
  visible: boolean
  executionTimeMs?: number
  input?: string
  expectedOutput?: string
  actualOutput?: string
  error?: string
}

function normalizeOutput(str: string): string {
  if (!str) return ''
  return str
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim()
}

/**
 * Universal runner that executes student code against all 10 test cases.
 * Calls backend POST /api/execute for server-side evaluation where hidden test cases
 * are kept strictly secure and never transmitted to the frontend.
 */
export async function executeCode(
  questionSlug: string,
  language: string,
  code: string,
  clientVisibleCases?: Array<{ testIndex: number; input: string; expectedOutput: string }>,
  isSubmit: boolean = true
): Promise<RunResult> {
  const startTime = performance.now()
  const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false

  let apiErrorMessage: string | null = null

  // If user is online, attempt backend /api/execute evaluation
  if (!isOffline) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionSlug,
          language,
          code,
          isSubmit,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // HTTP 200: Successful execution
      if (response.status === 200) {
        const data = await response.json()

        if (Array.isArray(data.testCases)) {
          const mappedResults: TestCaseExecution[] = data.testCases.map((tc: ApiTestCasePayload) => ({
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
          }))

          return {
            passed: data.passed === (data.total || (isSubmit ? 10 : 3)),
            passedCount: data.passed,
            totalCount: data.total || (isSubmit ? 10 : 3),
            results: mappedResults,
            overallTimeMs: data.overallTimeMs || Math.round(performance.now() - startTime),
          }
        }
      }

      // HTTP 422: Compilation or syntax error
      if (response.status === 422) {
        const errData = await response.json().catch(() => ({}))
        return {
          passed: false,
          passedCount: 0,
          totalCount: isSubmit ? 10 : 3,
          results: [],
          overallTimeMs: Math.round(performance.now() - startTime),
          compilationError: errData.message || 'Syntax or compilation error detected in your solution.',
        }
      }

      // HTTP 400: Bad request
      if (response.status === 400) {
        const errData = await response.json().catch(() => ({}))
        apiErrorMessage = errData.message || 'Invalid code execution parameters provided.'
      }

      // HTTP 404: Question not found
      else if (response.status === 404) {
        const errData = await response.json().catch(() => ({}))
        apiErrorMessage = errData.message || `Problem "${questionSlug}" was not found on the execution server.`
      }

      // HTTP 405: Method not allowed
      else if (response.status === 405) {
        apiErrorMessage = 'Invalid HTTP method. Only POST submissions are permitted.'
      }

      // HTTP 429: Rate limit
      else if (response.status === 429) {
        apiErrorMessage = 'Rate limit reached. Please wait a few seconds before submitting again.'
      }

      // HTTP 502, 503, 504: Gateway or Service Unavailable
      else if (response.status === 502 || response.status === 503 || response.status === 504) {
        apiErrorMessage = 'The code execution service is temporarily unavailable. Please try again in a moment.'
      }

      // HTTP 500: Server Error
      else if (response.status >= 500) {
        const errData = await response.json().catch(() => ({}))
        apiErrorMessage = errData.message || 'Server encountered an unexpected error while executing your code.'
      } else {
        apiErrorMessage = `Unexpected server response (HTTP ${response.status}).`
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId)
      const isAbort = err instanceof Error && err.name === 'AbortError'
      if (isAbort) {
        apiErrorMessage = 'Execution request timed out (15-second limit exceeded). Please optimize your solution or try again.'
      } else {
        apiErrorMessage = 'Unable to connect to the execution server. Please check your network connection.'
      }
    }
  } else {
    apiErrorMessage = 'You are currently working offline. Please reconnect to the internet to submit code.'
  }

  // If Run Code (not submit) and API was unavailable, fall back to client worker for immediate feedback
  if (!isSubmit && clientVisibleCases && clientVisibleCases.length > 0) {
    const results: TestCaseExecution[] = []
    let passedCount = 0

    for (let i = 0; i < clientVisibleCases.length; i++) {
      const tc = clientVisibleCases[i]
      const execResult: ExecutionResult = await executeInWorker(code, language, tc.input, 3000)
      const normActual = normalizeOutput(execResult.output)
      const normExpected = normalizeOutput(tc.expectedOutput)
      const passed = !execResult.error && normActual === normExpected
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
      passed: passedCount === clientVisibleCases.length,
      passedCount,
      totalCount: clientVisibleCases.length,
      results,
      overallTimeMs: Math.round(performance.now() - startTime),
    }
  }

  // If Submit Code failed or Run Code with no visible cases, return meaningful user-facing error
  return {
    passed: false,
    passedCount: 0,
    totalCount: isSubmit ? 10 : 3,
    results: [],
    overallTimeMs: Math.round(performance.now() - startTime),
    compilationError: apiErrorMessage || 'Code execution service is currently unavailable. Please try again.',
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


