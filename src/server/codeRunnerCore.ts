import * as vm from 'node:vm'
import { installSandbox } from './sandbox'
import { evaluate } from '../lib/runner/evaluator'
import { executePython } from '../lib/runner/pythonRunner'
import { executeCpp } from '../lib/runner/cppRunner'
import { executeJava } from '../lib/runner/javaRunner'

/**
 * Language execution core. This module is loaded INSIDE the sandbox worker thread (see sandboxWorker.ts); it must not
 * import the test repository, Supabase, or anything holding secrets. Student code is only ever evaluated through the
 * hardened vm evaluator installed here.
 */
installSandbox()

const MAX_OUTPUT_CHARS = 1_000_000
// Overall wall-clock budget for one job: remaining cases are failed as TLE once exhausted
// (keeps the function inside serverless time limits even when every case hits its own timeout).
const TOTAL_EXECUTION_BUDGET_MS = 7000

function executeJavaScript(code: string, input: string): { output: string; error?: string } {
  // Fast-fail filter (defence in depth only - the vm sandbox is the actual boundary).
  if (
    /process\s*\.\s*env/i.test(code) ||
    /child_process/i.test(code) ||
    /__proto__/i.test(code) ||
    /binding\s*\(\s*['"]process/i.test(code)
  ) {
    return {
      output: '',
      error: 'Security Violation: Access to system environment, process, and native bindings is strictly forbidden.',
    }
  }

  const outputs: string[] = []
  let outputChars = 0
  const emit = (text: string) => {
    outputChars += text.length + 1
    if (outputChars > MAX_OUTPUT_CHARS) throw new Error('Output Limit Exceeded')
    outputs.push(text)
  }
  const normalizedInput = input.replace(/\r\n/g, '\n')
  const inputLines = normalizedInput.split('\n')
  const inputTokens = normalizedInput.trim().split(/\s+/).filter(Boolean)

  const formatArg = (a: unknown) => (typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a))
  const customConsole = {
    log: (...args: unknown[]) => emit(args.map(formatArg).join(' ')),
    info: (...args: unknown[]) => emit(args.map(formatArg).join(' ')),
    error: (...args: unknown[]) => emit(args.map((a) => String(a)).join(' ')),
    warn: () => {},
  }

  const mockFs = {
    readFileSync: (_fd: unknown, _enc?: string) => normalizedInput,
    readSync: () => normalizedInput,
  }

  const mockProcess = {
    stdin: {
      read: () => normalizedInput,
      on: (event: string, cb: (data?: unknown) => void) => {
        if (event === 'data') cb(normalizedInput)
        if (event === 'end') cb()
      },
    },
    stdout: { write: (data: unknown) => emit(String(data)) },
    exit: () => {},
  }

  const mockReadline = {
    createInterface: () => ({
      on: (event: string, cb: (line?: string) => void) => {
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

  // Input is injected as JSON data literals (never as executable text).
  const prelude = `
    "use strict";
    const print = console.log;
    let __lIdx = 0, __tIdx = 0;
    const __lines = ${JSON.stringify(inputLines)};
    const __tokens = ${JSON.stringify(inputTokens)};
    const readline = () => __lIdx < __lines.length ? __lines[__lIdx++] : '';
    const readToken = () => __tIdx < __tokens.length ? __tokens[__tIdx++] : '';
  `

  try {
    const bindings: Record<string, unknown> = {
      console: customConsole,
      require: mockRequire,
      process: mockProcess,
      setTimeout: undefined,
      setInterval: undefined,
      setImmediate: undefined,
      global: undefined,
      globalThis: undefined,
    }
    evaluate(Object.keys(bindings), Object.values(bindings), `${prelude}\n${code}`)
    return { output: outputs.join('\n').trim() }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'JavaScript Runtime Error'
    return { output: outputs.join('\n').trim(), error: errMsg }
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
  // Pre-execution security filter: block process/env/child_process escapes across all languages
  if (
    /process\s*\.\s*env/i.test(code) ||
    /child_process/i.test(code) ||
    /__proto__/i.test(code) ||
    /binding\s*\(\s*['"]process/i.test(code)
  ) {
    return { ok: false, error: 'SecurityError: Access to process/environment bindings is prohibited.' }
  }

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
  } else if (lang === 'javascript' || lang === 'js' || lang === 'nodejs' || lang === 'node') {
    try {
      // Parse only (never executed here).
      new vm.Script(`(function (console, require, process) {
${code}
})`, { filename: 'submission.js' })
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err)
      return { ok: false, error: `SyntaxError: ${errMsg}` }
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


export interface SandboxJob {
  code: string
  language: string
  inputs: string[]
}

export type SandboxJobResult =
  | { kind: 'precheck_failed'; error: string }
  | { kind: 'ran'; cases: Array<{ output: string; error?: string; ms: number }> }

/** Pre-checks the submission, then runs it against every input. Pure compute; no I/O. */
export function runSubmissionJob(job: SandboxJob): SandboxJobResult {
  const compCheck = checkCompilation(job.code, job.language)
  if (!compCheck.ok) return { kind: 'precheck_failed', error: compCheck.error || 'Compilation error' }

  const started = performance.now()
  const cases: Array<{ output: string; error?: string; ms: number }> = []
  for (const input of job.inputs) {
    const t0 = performance.now()
    const exhausted = t0 - started > TOTAL_EXECUTION_BUDGET_MS
    const exec = exhausted ? { output: '', error: 'Time Limit Exceeded' } : runSingleTestCase(job.code, job.language, input)
    cases.push({ output: exec.output, error: exec.error, ms: Math.round(performance.now() - t0) })
  }
  return { kind: 'ran', cases }
}
