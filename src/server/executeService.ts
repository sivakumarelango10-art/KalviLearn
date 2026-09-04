import { executePython } from '../lib/runner/pythonRunner'
import { executeCpp } from '../lib/runner/cppRunner'
import { executeJava } from '../lib/runner/javaRunner'
import serverTestCases from './data/serverTestCases.json'

export interface ExecuteRequest {
  questionSlug: string
  language: string
  code: string
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

export interface ExecuteResponse {
  success: boolean
  total: number
  passed: number
  overallTimeMs: number
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

function executeJavaScript(code: string, input: string): { output: string; error?: string } {
  const outputs: string[] = []
  const normalizedInput = input.replace(/\r\n/g, '\n')
  const inputLines = normalizedInput.split('\n')
  const inputTokens = normalizedInput.trim().split(/\s+/).filter(Boolean)

  const customConsole = {
    log: (...args: any[]) => outputs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
    info: (...args: any[]) => outputs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
    error: (...args: any[]) => outputs.push(args.map((a) => String(a)).join(' ')),
    warn: () => {},
  }

  const mockFs = {
    readFileSync: (_fd: any, _enc?: string) => normalizedInput,
    readSync: () => normalizedInput,
  }

  const mockProcess = {
    stdin: {
      read: () => normalizedInput,
      on: (event: string, cb: any) => {
        if (event === 'data') cb(normalizedInput)
        if (event === 'end') cb()
      },
    },
    stdout: { write: (data: any) => outputs.push(String(data)) },
    exit: () => {},
  }

  const mockReadline = {
    createInterface: () => ({
      on: (event: string, cb: any) => {
        if (event === 'line') {
          for (const l of inputLines) cb(l)
        }
        if (event === 'close') cb()
      },
      close: () => {},
    }),
  }

  const mockRequire = (mod: string) => {
    if (mod === 'fs') return mockFs
    if (mod === 'readline') return mockReadline
    if (mod === 'process') return mockProcess
    return {}
  }

  const prelude = `
    const print = console.log;
    let __lIdx = 0, __tIdx = 0;
    const __lines = ${JSON.stringify(inputLines)};
    const __tokens = ${JSON.stringify(inputTokens)};
    const readline = () => __lIdx < __lines.length ? __lines[__lIdx++] : '';
    const readToken = () => __tIdx < __tokens.length ? __tokens[__tIdx++] : '';
  `

  try {
    const wrapped = new Function('console', 'require', 'process', `
      ${prelude}
      ${code}
    `)
    wrapped(customConsole, mockRequire, mockProcess)
    return { output: outputs.join('\n').trim() }
  } catch (err: any) {
    return { output: outputs.join('\n').trim(), error: err.message || 'JavaScript Runtime Error' }
  }
}

function runSingleTestCase(code: string, language: string, input: string): { output: string; error?: string } {
  const lang = (language || '').toLowerCase()
  if (lang === 'python') {
    return executePython(code, input)
  } else if (lang === 'cpp' || lang === 'c++') {
    return executeCpp(code, input)
  } else if (lang === 'java') {
    return executeJava(code, input)
  }
  return executeJavaScript(code, input)
}

function checkCompilation(code: string, language: string): { ok: boolean; error?: string } {
  const lang = (language || '').toLowerCase()
  if (lang === 'python') {
    const dryRun = executePython(code, '')
    if (dryRun.error && (
      dryRun.error.includes('SyntaxError') ||
      dryRun.error.includes('Unexpected') ||
      dryRun.error.toLowerCase().includes('syntax error')
    )) {
      return { ok: false, error: dryRun.error }
    }
  } else if (lang === 'javascript' || lang === 'js') {
    try {
      new Function('console', 'require', 'process', code)
    } catch (err: any) {
      return { ok: false, error: `SyntaxError: ${err.message}` }
    }
  } else if (lang === 'cpp' || lang === 'c++') {
    const dryRun = executeCpp(code, '')
    if (dryRun.error && (dryRun.error.toLowerCase().includes('compil') || dryRun.error.toLowerCase().includes('syntax'))) {
      return { ok: false, error: dryRun.error }
    }
  } else if (lang === 'java') {
    const dryRun = executeJava(code, '')
    if (dryRun.error && (dryRun.error.toLowerCase().includes('compil') || dryRun.error.toLowerCase().includes('syntax'))) {
      return { ok: false, error: dryRun.error }
    }
  }
  return { ok: true }
}

/**
 * Executes a question's code against exactly 10 test cases.
 * CRITICAL SECURITY GUARANTEE:
 * Hidden test case inputs, expected outputs, and actual outputs are NEVER returned to the client.
 */
export async function executeQuestion(req: ExecuteRequest): Promise<ExecuteResponse> {
  const { questionSlug, language, code } = req

  if (!code || !code.trim()) {
    return {
      success: false,
      total: 10,
      passed: 0,
      overallTimeMs: 0,
      error: 'Compilation Error',
      message: 'Source code cannot be empty.',
      testCases: [],
    }
  }

  // Pre-check for compilation/syntax errors
  const compCheck = checkCompilation(code, language)
  if (!compCheck.ok) {
    return {
      success: false,
      total: 10,
      passed: 0,
      overallTimeMs: 0,
      error: 'Compilation Error',
      message: compCheck.error || 'Syntax / Compilation error detected in your code.',
      testCases: [],
    }
  }

  let problem = (serverTestCases as Record<string, any>)[questionSlug]
  if (!problem) {
    const foundKey = Object.keys(serverTestCases).find(
      (k) => k === questionSlug || k.endsWith(questionSlug) || questionSlug.endsWith(k)
    )
    if (foundKey) {
      problem = (serverTestCases as Record<string, any>)[foundKey]
    }
  }

  if (!problem) {
    return {
      success: false,
      total: 10,
      passed: 0,
      overallTimeMs: 0,
      error: 'Question Not Found',
      message: `Question with slug "${questionSlug}" was not found in the test repository.`,
      testCases: [],
    }
  }

  const testCases = problem.testCases
  // Strict 10 test cases validation (3 visible + 7 hidden)
  if (!testCases || testCases.length !== 10) {
    return {
      success: false,
      total: 10,
      passed: 0,
      overallTimeMs: 0,
      error: 'Invalid Question Configuration',
      message: `Question must have exactly 10 test cases (found ${testCases?.length || 0}).`,
      testCases: [],
    }
  }

  const startTime = performance.now()
  const sanitizedResults: ClientTestCaseResult[] = []
  let passedCount = 0

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]
    const tcStart = performance.now()
    const exec = runSingleTestCase(code, language, tc.input)
    const tcTime = Math.round(performance.now() - tcStart)

    // Check for syntax / compilation error during execution
    if (exec.error && (
      exec.error.includes('SyntaxError') ||
      exec.error.toLowerCase().includes('syntax error') ||
      exec.error.toLowerCase().includes('compilation error')
    )) {
      return {
        success: false,
        total: 10,
        passed: 0,
        overallTimeMs: tcTime,
        error: 'Compilation Error',
        message: exec.error,
        testCases: [],
      }
    }

    const normActual = normalizeOutput(exec.output)
    const normExpected = normalizeOutput(tc.expectedOutput)
    const passed = !exec.error && normActual === normExpected

    if (passed) passedCount++

    const isVisible = i < 3 // Cases 1, 2, 3 are visible; Cases 4-10 are hidden

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

  return {
    success: true,
    total: 10,
    passed: passedCount,
    overallTimeMs,
    testCases: sanitizedResults,
  }
}
