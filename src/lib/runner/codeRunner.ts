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
  clientVisibleCases?: Array<{ testIndex: number; input: string; expectedOutput: string }>
): Promise<RunResult> {
  const startTime = performance.now()

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
      }),
    })

    if (response.ok) {
      const data = await response.json()

      if (!data.success && data.error === 'Compilation Error') {
        return {
          passed: false,
          passedCount: 0,
          totalCount: 10,
          results: [],
          overallTimeMs: Math.round(performance.now() - startTime),
          compilationError: data.message || 'Compilation failed.',
        }
      }

      if (Array.isArray(data.testCases) && data.testCases.length === 10) {
        const mappedResults: TestCaseExecution[] = data.testCases.map((tc: any) => ({
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
          passed: data.passed === 10,
          passedCount: data.passed,
          totalCount: 10,
          results: mappedResults,
          overallTimeMs: data.overallTimeMs || Math.round(performance.now() - startTime),
        }
      }
    }
  } catch (apiError) {
    console.warn('Backend /api/execute unavailable, attempting local fallback evaluation:', apiError)
  }

  // Fallback if network/API is offline:
  // Execute visible cases client-side if available, and mock hidden status strictly without leaking data
  const results: TestCaseExecution[] = []
  let passedCount = 0

  if (clientVisibleCases && clientVisibleCases.length > 0) {
    for (let i = 0; i < 10; i++) {
      const isVisible = i < 3
      const num = i + 1

      if (isVisible && clientVisibleCases[i]) {
        const tc = clientVisibleCases[i]
        const execResult: ExecutionResult = await executeInWorker(code, language, tc.input, 3000)
        const normActual = normalizeOutput(execResult.output)
        const normExpected = normalizeOutput(tc.expectedOutput)
        const passed = !execResult.error && normActual === normExpected
        if (passed) passedCount++

        results.push({
          testIndex: num,
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
      } else {
        // Hidden case in offline fallback: never guess or leak
        results.push({
          testIndex: num,
          status: 'failed',
          passed: false,
          isHidden: true,
          executionTimeMs: 0,
        })
      }
    }
  }

  return {
    passed: passedCount === 10,
    passedCount,
    totalCount: 10,
    results,
    overallTimeMs: Math.round(performance.now() - startTime),
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


