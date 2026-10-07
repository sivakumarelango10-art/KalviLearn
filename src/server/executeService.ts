import { randomUUID } from 'node:crypto'
import { outputsMatch } from './judge/compare'
import { selectEngine, type EngineCaseResult, type EngineName } from './judge/engines'
import { resolveQuestion, type JudgeCase } from './judge/testRepository'

/**
 * The single judge pipeline used by BOTH question banks (practice + coding) and BOTH actions:
 *
 *   identifier -> exact server-side suite lookup (testRepository) -> engine (Judge0 or local sandbox)
 *   -> central output comparison (judge/compare) -> per-case events -> aggregate -> safe response
 *
 *   mode 'run'    executes the VISIBLE cases only (quick feedback; can never mark a problem solved)
 *   mode 'submit' executes ALL cases of the authoritative server suite (3 visible + 7 hidden)
 *
 * The client never supplies test cases. Hidden inputs, expected outputs and actual outputs never leave this module.
 */
export interface ExecuteRequest {
  questionSlug: string
  language: string
  code: string
  /** Legacy flag: false = Run, true/undefined = Submit. `mode` wins when both are given. */
  isSubmit?: boolean
  mode?: 'run' | 'submit'
  /** Receives safe progress events while the evaluation runs (used for streaming responses). */
  onEvent?: (event: JudgeEvent) => void
}

export type CaseStatus = 'passed' | 'failed' | 'time_limit_exceeded' | 'runtime_error'

export interface ClientTestCaseResult {
  testIndex: number
  status: CaseStatus
  visible: boolean
  executionTimeMs: number
  // The following fields are ONLY defined for visible cases; NEVER for hidden cases.
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
  mode?: 'run' | 'submit'
  /** Size of the full judge suite (10), independent of how many cases this mode executed. */
  judgeTotal?: number
  submissionId?: string
  questionId?: string
  engine?: EngineName
}

export type JudgeEvent =
  | {
      type: 'started'
      submissionId: string
      questionId: string
      mode: 'run' | 'submit'
      total: number
      judgeTotal: number
      visibleCount: number
      hiddenCount: number
      cases: Array<{ testIndex: number; hidden: boolean }>
      engine: EngineName
    }
  | ({ type: 'case'; submissionId: string } & ClientTestCaseResult)

function statusOf(result: EngineCaseResult, expected: string): CaseStatus {
  if (result.kind === 'timeout') return 'time_limit_exceeded'
  if (result.kind === 'runtime_error' || result.kind === 'memory') return 'runtime_error'
  return outputsMatch(result.output, expected) ? 'passed' : 'failed'
}

function toClientResult(tc: JudgeCase, result: EngineCaseResult): ClientTestCaseResult {
  const status = statusOf(result, tc.expectedOutput)
  if (tc.isHidden) {
    // Hidden case: metadata only. Never input / expected / actual output / error text.
    return { testIndex: tc.testIndex, status, visible: false, executionTimeMs: result.ms }
  }
  return {
    testIndex: tc.testIndex,
    status,
    visible: true,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    actualOutput: result.output || (result.error ? `Error: ${result.error}` : '(no output)'),
    error: result.error,
    executionTimeMs: result.ms,
  }
}

function failure(
  status: ExecutionStatus,
  error: string,
  message: string,
  total: number,
  extra: Partial<ExecuteResponse> = {}
): ExecuteResponse {
  return { success: false, total, passed: 0, executed: 0, overallTimeMs: 0, status, error, message, testCases: [], ...extra }
}

export async function executeQuestion(req: ExecuteRequest): Promise<ExecuteResponse> {
  const { questionSlug, language, code, onEvent } = req
  const mode: 'run' | 'submit' = req.mode ?? (req.isSubmit === false ? 'run' : 'submit')
  const submissionId = randomUUID()

  const resolved = resolveQuestion(questionSlug)
  const suite = 'suite' in resolved ? resolved.suite : null
  const judgeTotal = suite?.testCases.length ?? 10
  const casesToRun = suite ? (mode === 'run' ? suite.testCases.filter((t) => !t.isHidden) : suite.testCases) : []
  const total = suite ? casesToRun.length : judgeTotal
  const base: Partial<ExecuteResponse> = { mode, judgeTotal, submissionId, questionId: suite?.questionId }

  if (!code || !code.trim()) {
    return failure('COMPILATION_ERROR', 'Compilation Error', 'Source code cannot be empty.', total, base)
  }
  if (code.length > 65536) {
    return failure('COMPILATION_ERROR', 'Payload Too Large', 'Submitted code exceeds the maximum allowed limit of 64KB.', total, base)
  }
  if (!suite) {
    const ambiguous = 'error' in resolved && resolved.error === 'ambiguous'
    return failure(
      'SYSTEM_ERROR',
      'Question Not Found',
      ambiguous
        ? `Question identifier "${questionSlug}" is ambiguous; use a source-qualified id.`
        : `Question with slug "${questionSlug}" was not found in the test repository.`,
      total,
      base
    )
  }
  if (suite.testCases.length !== 10 || suite.visibleCount !== 3 || suite.hiddenCount !== 7) {
    console.error(`[judge] invalid suite ${suite.questionId}: ${suite.visibleCount} visible / ${suite.hiddenCount} hidden`)
    return failure('SYSTEM_ERROR', 'Invalid Question Configuration', 'This question is misconfigured on the server.', total, base)
  }

  const engine = selectEngine(language)
  onEvent?.({
    type: 'started',
    submissionId,
    questionId: suite.questionId,
    mode,
    total,
    judgeTotal,
    visibleCount: suite.visibleCount,
    hiddenCount: mode === 'run' ? 0 : suite.hiddenCount,
    cases: casesToRun.map((t) => ({ testIndex: t.testIndex, hidden: t.isHidden })),
    engine: engine.name,
  })

  const started = performance.now()
  const outcome = await engine.run({ code, language, inputs: casesToRun.map((t) => t.input) }, (index, result) => {
    const tc = casesToRun[index]
    if (tc) onEvent?.({ type: 'case', submissionId, ...toClientResult(tc, result) })
  })

  const meta = {
    ...base,
    engine: engine.name,
    visibleCount: suite.visibleCount,
    hiddenCount: mode === 'run' ? 0 : suite.hiddenCount,
  }
  if (outcome.kind === 'unavailable') {
    return failure('SYSTEM_ERROR', 'Execution Unavailable', outcome.message, total, meta)
  }
  if (outcome.kind === 'compile_error') {
    const isSecurity = outcome.error.includes('SecurityError')
    return failure(
      isSecurity ? 'RUNTIME_ERROR' : 'COMPILATION_ERROR',
      isSecurity ? outcome.error : 'Compilation Error',
      outcome.error || 'Syntax / Compilation error detected in your code.',
      total,
      meta
    )
  }

  const testCases = casesToRun.map((tc, i) => toClientResult(tc, outcome.cases[i]))
  const passed = testCases.filter((t) => t.status === 'passed').length
  const accepted = passed === total
  let status: ExecutionStatus = 'ACCEPTED'
  if (!accepted) {
    if (testCases.some((t) => t.status === 'time_limit_exceeded')) status = 'TIME_LIMIT_EXCEEDED'
    else if (testCases.some((t) => t.status === 'runtime_error')) status = 'RUNTIME_ERROR'
    else status = 'WRONG_ANSWER'
  }

  if (process.env.JUDGE_DEBUG === '1') {
    // Metadata only - never inputs or expected outputs.
    console.log(
      `[JUDGE DEBUG] submission=${submissionId} question=${suite.questionId} mode=${mode} language=${language} ` +
        `engine=${engine.name} visible=${suite.visibleCount} hidden=${suite.hiddenCount} executed=${total} ` +
        `passed=${passed}/${total} statuses=${testCases.map((t) => t.status[0]).join('')}`
    )
  }

  return {
    ...meta,
    success: accepted,
    total,
    passed,
    executed: total,
    overallTimeMs: Math.round(performance.now() - started),
    status,
    message: accepted
      ? mode === 'run'
        ? `All ${total} visible test cases passed. Submit to run all ${judgeTotal} judge tests.`
        : 'All test cases passed successfully.'
      : `${passed} of ${total} test cases passed.`,
    testCases,
  }
}
