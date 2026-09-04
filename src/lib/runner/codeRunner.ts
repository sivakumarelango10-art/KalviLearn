import { executePython } from './pythonRunner'

export interface TestCaseExecution {
  testIndex: number
  input: string
  expectedOutput: string
  actualOutput: string
  passed: boolean
  isHidden: boolean
  error?: string
  executionTimeMs: number
}

export interface RunResult {
  passed: boolean
  passedCount: number
  totalCount: number
  results: TestCaseExecution[]
  overallTimeMs: number
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
 * Executes student code in JavaScript sandbox
 */
export function executeJavaScript(code: string, input: string): { output: string; error?: string } {
  const outputs: string[] = []

  const customConsole = {
    log: (...args: any[]) => {
      outputs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '))
    },
    error: (...args: any[]) => {
      outputs.push(args.map(a => String(a)).join(' '))
    },
    warn: () => {},
  }

  const mockFs = {
    readFileSync: (_fd: any, _enc?: string) => input,
  }

  const mockRequire = (mod: string) => {
    if (mod === 'fs') return mockFs
    return {}
  }

  try {
    const wrapped = new Function('console', 'require', 'input', `
      const fs = require('fs');
      ${code}
    `)
    wrapped(customConsole, mockRequire, input)
    return { output: outputs.join('\n').trim() }
  } catch (err: any) {
    return { output: outputs.join('\n').trim(), error: err.message || 'Runtime Error' }
  }
}

/**
 * Universal runner executing code against a set of test cases
 */
export async function runTestCases(
  code: string,
  language: string,
  testCases: Array<{ testIndex: number; input: string; expectedOutput: string; isHidden: boolean }>
): Promise<RunResult> {
  const results: TestCaseExecution[] = []
  const startTime = performance.now()
  let passedCount = 0

  for (const tc of testCases) {
    const tcStart = performance.now()
    let actualOutput = ''
    let error: string | undefined

    if (language === 'python') {
      const exec = executePython(code, tc.input)
      actualOutput = exec.output
      error = exec.error
    } else if (language === 'javascript') {
      const exec = executeJavaScript(code, tc.input)
      actualOutput = exec.output
      error = exec.error
    } else {
      // C++ or Java simulation: if student provides working code, run JavaScript translation
      // or evaluate directly
      const exec = executeJavaScript(code, tc.input)
      actualOutput = exec.output
      error = exec.error
    }

    const tcTime = Math.round(performance.now() - tcStart)
    const normActual = normalizeOutput(actualOutput)
    const normExpected = normalizeOutput(tc.expectedOutput)
    const passed = !error && normActual === normExpected

    if (passed) passedCount++

    results.push({
      testIndex: tc.testIndex,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: actualOutput || (error ? `Error: ${error}` : '(no output)'),
      passed,
      isHidden: tc.isHidden,
      error,
      executionTimeMs: tcTime,
    })
  }

  const overallTimeMs = Math.round(performance.now() - startTime)

  return {
    passed: passedCount === testCases.length,
    passedCount,
    totalCount: testCases.length,
    results,
    overallTimeMs,
  }
}
