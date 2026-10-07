import { runInSandbox } from './sandboxHost'
import * as serverTestCasesModule from './data/serverTestCases'
import { codingTestCases } from './data/codingTestCases'

export interface ExecuteRequest {
  questionSlug: string
  language: string
  code: string
  isSubmit?: boolean
}

export interface ClientTestCaseResult {
  testIndex: number
  status: 'passed' | 'failed' | 'time_limit_exceeded' | 'runtime_error'
  visible: boolean
  executionTimeMs: number
  // The following fields are ONLY defined for visible cases (1-3)
  // NEVER defined or transmitted for hidden cases (4-10)
  input?: string
  expectedOutput?: string
  actualOutput?: string
  error?: string
}

export type ExecutionStatus =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'COMPILATION_ERROR'
  | 'RUNTIME_ERROR'
  | 'TIME_LIMIT_EXCEEDED'
  | 'SYSTEM_ERROR'

export interface ExecuteResponse {
  success: boolean
  total: number
  passed: number
  executed?: number
  visibleCount?: number
  hiddenCount?: number
  overallTimeMs: number
  status: ExecutionStatus
  error?: string
  message?: string
  testCases: ClientTestCaseResult[]
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

function compareOutput(actual: string, expected: string): boolean {
  const normActual = normalizeOutput(actual)
  const normExpected = normalizeOutput(expected)
  if (normActual === normExpected) return true

  // Tolerance check for decimal/floating point outputs
  const numActual = Number(normActual)
  const numExpected = Number(normExpected)
  if (!isNaN(numActual) && !isNaN(numExpected) && normActual !== '' && normExpected !== '') {
    return Math.abs(numActual - numExpected) < 1e-5
  }

  return false
}

/**
 * Executes a question's code against all configured test cases (exactly 10: 3 visible + 7 hidden).
 * Both Run and Submit execute the full evaluation suite.
 * CRITICAL SECURITY GUARANTEE:
 * Hidden test case inputs, expected outputs, and actual outputs are NEVER returned to the client.
 */
export async function executeQuestion(req: ExecuteRequest): Promise<ExecuteResponse> {
  const { questionSlug, language, code, isSubmit: _isSubmit = true } = req

  interface ServerProblemItem {
    testCases: Array<{ testIndex?: number; input: string; expectedOutput: string; isHidden?: boolean }>
  }
  const problemMap = ((serverTestCasesModule as any).serverTestCases || (serverTestCasesModule as any).default || serverTestCasesModule) as unknown as Record<string, ServerProblemItem>

  const cleanSlug = questionSlug.replace(/^coding-/, '')
  let problem =
    (codingTestCases as any)[cleanSlug] ||
    (codingTestCases as any)[questionSlug] ||
    problemMap[questionSlug] ||
    problemMap[cleanSlug]

  if (!problem) {
    const foundKey =
      Object.keys(codingTestCases).find(
        (k) => k === cleanSlug || k === questionSlug || k.endsWith(cleanSlug) || cleanSlug.endsWith(k)
      ) ||
      Object.keys(problemMap).find(
        (k) => k === questionSlug || k === cleanSlug || k.endsWith(cleanSlug) || cleanSlug.endsWith(k)
      )
    if (foundKey) {
      problem = (codingTestCases as any)[foundKey] || problemMap[foundKey]
    }
  }

  const authoritativeTotal = problem?.testCases?.length || 10

  if (!code || !code.trim()) {
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: 'COMPILATION_ERROR',
      error: 'Compilation Error',
      message: 'Source code cannot be empty.',
      testCases: [],
    }
  }

  if (code.length > 65536) {
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: 'COMPILATION_ERROR',
      error: 'Payload Too Large',
      message: 'Submitted code exceeds the maximum allowed limit of 64KB.',
      testCases: [],
    }
  }

  // Pre-check + execution run together inside the sandbox worker (empty env, capped heap, hard kill).
  const inputs = problem?.testCases && problem.testCases.length > 0 ? problem.testCases.map((t: any) => t.input) : []
  const outcome = await runInSandbox({ code, language, inputs })

  if (outcome.kind === 'precheck_failed') {
    const isSecErr = outcome.error.includes('SecurityError')
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: isSecErr ? 'RUNTIME_ERROR' : 'COMPILATION_ERROR',
      error: isSecErr ? outcome.error : 'Compilation Error',
      message: outcome.error || 'Syntax / Compilation error detected in your code.',
      testCases: [],
    }
  }
  if (outcome.kind === 'sandbox_failed' && outcome.reason === 'unavailable') {
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: 'SYSTEM_ERROR',
      error: 'Execution Unavailable',
      message: outcome.message,
      testCases: [],
    }
  }
  // A killed worker (memory / timeout / crash) fails every case with the reason; results are still returned in full.
  const executed: Array<{ output: string; error?: string; ms: number }> =
    outcome.kind === 'ran'
      ? outcome.cases
      : inputs.map(() => ({ output: '', error: outcome.message, ms: 0 }))

  if (!problem) {
    return {
      success: false,
      total: authoritativeTotal,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: 'SYSTEM_ERROR',
      error: 'Question Not Found',
      message: `Question with slug "${questionSlug}" was not found in the test repository.`,
      testCases: [],
    }
  }

  const testCases = problem.testCases
  // Ensure valid test cases are configured
  if (!testCases || testCases.length < 3) {
    return {
      success: false,
      total: testCases?.length || 3,
      passed: 0,
      executed: 0,
      overallTimeMs: 0,
      status: 'SYSTEM_ERROR',
      error: 'Invalid Question Configuration',
      message: `Question must have at least 3 test cases (found ${testCases?.length || 0}).`,
      testCases: [],
    }
  }

  // Both Run and Submit execute all authoritative test cases
  const casesToExecute = testCases
  const totalCount = testCases.length
  const visibleCount = testCases.filter((tc: any) => !tc.isHidden).length
  const hiddenCount = totalCount - visibleCount

  const startTime = performance.now()
  const sanitizedResults: ClientTestCaseResult[] = []
  let passedCount = 0

  for (let i = 0; i < casesToExecute.length; i++) {
    const tc = casesToExecute[i]
    const exec = { output: executed[i].output, error: executed[i].error }
    const tcTime = executed[i].ms

    // Check for syntax / compilation error during execution
    if (exec.error && (
      exec.error.includes('SyntaxError') ||
      exec.error.toLowerCase().includes('syntax error') ||
      exec.error.toLowerCase().includes('compilation error')
    )) {
      return {
        success: false,
        total: totalCount,
        passed: 0,
        executed: i,
        visibleCount,
        hiddenCount,
        overallTimeMs: tcTime,
        status: 'COMPILATION_ERROR',
        error: 'Compilation Error',
        message: exec.error,
        testCases: [],
      }
    }

    const passed = !exec.error && compareOutput(exec.output, tc.expectedOutput)

    if (passed) passedCount++

    const isVisible = tc.isHidden !== undefined ? !tc.isHidden : i < 3

    let status: ClientTestCaseResult['status'] = passed ? 'passed' : 'failed'
    if (exec.error) {
      if (exec.error.includes('Time Limit Exceeded') || tcTime >= 3000) {
        status = 'time_limit_exceeded'
      } else {
        status = 'runtime_error'
      }
    }

    if (isVisible) {
      // Visible test case (1, 2, 3): allowed to include input, expectedOutput, actualOutput
      sanitizedResults.push({
        testIndex: tc.testIndex || i + 1,
        status,
        visible: true,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: exec.output || (exec.error ? `Error: ${exec.error}` : '(no output)'),
        error: exec.error,
        executionTimeMs: tcTime,
      })
    } else {
      // Hidden test case (4-10): NEVER send input, expectedOutput, or actualOutput
      sanitizedResults.push({
        testIndex: tc.testIndex || i + 1,
        status,
        visible: false,
        executionTimeMs: tcTime,
      })
    }
  }

  const overallTimeMs = Math.round(performance.now() - startTime)
  const isAccepted = passedCount === totalCount

  let executionStatus: ExecutionStatus = 'ACCEPTED'
  if (!isAccepted) {
    const hasTle = sanitizedResults.some((t) => t.status === 'time_limit_exceeded')
    const hasRuntime = sanitizedResults.some((t) => t.status === 'runtime_error')
    if (hasTle) {
      executionStatus = 'TIME_LIMIT_EXCEEDED'
    } else if (hasRuntime) {
      executionStatus = 'RUNTIME_ERROR'
    } else {
      executionStatus = 'WRONG_ANSWER'
    }
  }

  return {
    success: isAccepted,
    total: totalCount,
    passed: passedCount,
    executed: casesToExecute.length,
    visibleCount,
    hiddenCount,
    overallTimeMs,
    status: executionStatus,
    message: isAccepted
      ? 'All test cases passed successfully.'
      : `${passedCount} of ${totalCount} test cases passed.`,
    testCases: sanitizedResults,
  }
}
