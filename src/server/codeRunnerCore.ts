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

  // stdout is a byte stream, exactly like Node: console.log appends a line, process.stdout.write appends raw text.
  // stderr (console.error / console.warn / process.stderr.write) is not graded, as on any judge.
  let stdout = ''
  const write = (text: string) => {
    if (stdout.length + text.length > MAX_OUTPUT_CHARS) throw new Error('Output Limit Exceeded')
    stdout += text
  }
  const normalizedInput = input.replace(/\r\n/g, '\n')
  const inputLines = normalizedInput.split('\n')
  const inputTokens = normalizedInput.trim().split(/\s+/).filter(Boolean)

  const formatArg = (a: unknown) => (typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a))
  const logLine = (...args: unknown[]) => write(args.map(formatArg).join(' ') + '\n')
  const customConsole = {
    log: logLine,
    info: logLine,
    debug: logLine,
    error: () => {},
    warn: () => {},
    trace: () => {},
  }
  let asyncError: string | null = null

  // Node's stdin APIs are implemented INSIDE the sandbox realm (no extra host surface). As in Node, 'data'/'end' and
  // readline 'line'/'close' events are delivered after the main script has run, so handlers may be registered in any
  // order and chained (`rl.on(...).on(...)`). readline drops the empty segment after a final newline but keeps blank
  // lines elsewhere. Input is injected as a JSON data literal (never as executable text).
  const prelude = `
    "use strict";
    const __kalviInput = ${JSON.stringify(normalizedInput)};
    const __kalviExit = new Error('__KALVI_EXIT__');
    const __kalviIo = (() => {
      const rlH = { line: [], close: [] }, inH = { data: [], end: [] };
      let flushed = false, rlClosed = false;
      const lines = () => { const l = __kalviInput.split('\\n'); if (l[l.length - 1] === '') l.pop(); return l; };
      const fireClose = () => { if (rlClosed) return; rlClosed = true; for (const cb of rlH.close.slice()) cb(); };
      const rl = {
        on(ev, cb) { if (rlH[ev] && typeof cb === 'function') rlH[ev].push(cb); return rl; },
        once(ev, cb) { return rl.on(ev, cb); },
        addListener(ev, cb) { return rl.on(ev, cb); },
        close() { fireClose(); },
        pause() { return rl; }, resume() { return rl; }, setPrompt() {}, prompt() {}, write() {},
        [Symbol.asyncIterator]() {
          const ls = lines(); let i = 0;
          const it = { next: async () => (i < ls.length ? { value: ls[i++], done: false } : { value: undefined, done: true }), return: async () => ({ value: undefined, done: true }) };
          it[Symbol.asyncIterator] = () => it;
          return it;
        },
      };
      const stdin = {
        on(ev, cb) { if (inH[ev] && typeof cb === 'function') inH[ev].push(cb); return stdin; },
        once(ev, cb) { return stdin.on(ev, cb); },
        addListener(ev, cb) { return stdin.on(ev, cb); },
        resume() { return stdin; }, pause() { return stdin; }, setEncoding() { return stdin; },
        read() { return __kalviInput; }, fd: 0, isTTY: false,
      };
      const fs = { readFileSync: () => __kalviInput, readSync: () => __kalviInput };
      const readlineModule = { createInterface: () => rl };
      const proc = {
        stdin,
        stdout: { write: (d) => { __kalviWrite(String(d)); return true; }, isTTY: false },
        stderr: { write: () => true, isTTY: false },
        exit: () => { throw __kalviExit; },
        argv: ['node', 'main.js'], platform: 'linux', exitCode: undefined,
        nextTick: (fn, ...args) => { Promise.resolve().then(() => fn(...args)); },
      };
      const modules = { fs, readline: readlineModule, process: proc, os: { EOL: '\\n' } };
      const req = (name) => { const m = modules[String(name).replace(/^node:/, '')]; return m === undefined ? {} : m; };
      const flush = () => {
        if (flushed) return; flushed = true;
        if (__kalviInput.length) for (const cb of inH.data.slice()) cb(__kalviInput);
        for (const cb of inH.end.slice()) cb();
        for (const l of lines()) { if (rlClosed) break; for (const cb of rlH.line.slice()) cb(l); }
        fireClose();
      };
      return { proc, req, flush };
    })();
    process = __kalviIo.proc;
    require = __kalviIo.req;
    const print = console.log;
    let __lIdx = 0, __tIdx = 0;
    const __lines = ${JSON.stringify(inputLines)};
    const __tokens = ${JSON.stringify(inputTokens)};
    const readline = () => __lIdx < __lines.length ? __lines[__lIdx++] : '';
    const readToken = () => __tIdx < __tokens.length ? __tokens[__tIdx++] : '';
  `
  // Student code runs in its own block so its declarations (const readline = require('readline'), function print)
  // shadow the helpers above instead of colliding with them. stdin events fire once the main script's microtasks settle.
  const epilogue = `
    (async () => {
      for (let i = 0; i < 16; i++) await null;
      try { __kalviIo.flush(); } catch (e) { if (e !== __kalviExit) __kalviFail(e && typeof e.message === 'string' ? e.message : 'Runtime Error'); }
    })();
  `

  try {
    const bindings: Record<string, unknown> = {
      console: customConsole,
      require: undefined,
      process: undefined,
      __kalviWrite: (text: string) => write(String(text)),
      __kalviFail: (message: string) => void (asyncError = asyncError ?? String(message)),
      setTimeout: undefined,
      setInterval: undefined,
      setImmediate: undefined,
      global: undefined,
      globalThis: undefined,
    }
    evaluate(Object.keys(bindings), Object.values(bindings), `${prelude}\n{\n${code}\n}\n${epilogue}`)
    return asyncError ? { output: stdout.trim(), error: asyncError } : { output: stdout.trim() }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'JavaScript Runtime Error'
    if (errMsg === '__KALVI_EXIT__') return { output: stdout.trim() }
    return { output: stdout.trim(), error: errMsg }
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

export interface SandboxCaseResult {
  output: string
  error?: string
  ms: number
}

export type SandboxJobResult =
  | { kind: 'precheck_failed'; error: string }
  | { kind: 'ran'; cases: SandboxCaseResult[] }

/**
 * Pre-checks the submission, then runs it against every input in order. Pure compute; no I/O.
 * `onCase` is invoked as soon as each case finishes (used to stream genuine per-case progress).
 */
export function runSubmissionJob(job: SandboxJob, onCase?: (index: number, result: SandboxCaseResult) => void): SandboxJobResult {
  const compCheck = checkCompilation(job.code, job.language)
  if (!compCheck.ok) return { kind: 'precheck_failed', error: compCheck.error || 'Compilation error' }

  const started = performance.now()
  const cases: SandboxCaseResult[] = []
  for (const input of job.inputs) {
    const t0 = performance.now()
    const exhausted = t0 - started > TOTAL_EXECUTION_BUDGET_MS
    const exec = exhausted ? { output: '', error: 'Time Limit Exceeded' } : runSingleTestCase(job.code, job.language, input)
    const caseResult: SandboxCaseResult = { output: exec.output, error: exec.error, ms: Math.round(performance.now() - t0) }
    cases.push(caseResult)
    onCase?.(cases.length - 1, caseResult)
  }
  return { kind: 'ran', cases }
}
