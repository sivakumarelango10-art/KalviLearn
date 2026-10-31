import { fork, type ChildProcess } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { SandboxCaseResult, SandboxJob, SandboxJobResult } from './codeRunnerCore'

/**
 * Runs submitted code in an isolated CHILD PROCESS:
 *
 *  - PYTHON: Reuses a warm Pyodide worker process per function instance for sub-second execution,
 *    recycled after 200 runs, after any timeout/error, or if memory exceeds thresholds. Memory and
 *    virtual filesystem state are reset before/after each case. Concurrent Python requests in the same
 *    function instance are queued so the worker is never shared simultaneously.
 *  - JAVASCRIPT, JAVA, C++: Always executed in a FRESH, single-use child process that is killed with
 *    SIGKILL immediately upon completion, guaranteeing zero state leaks.
 *  - SEPARATE HEAP + NATIVE CAP: `--max-old-space-size=192`. Fatal OOMs kill only the child process.
 *  - EMPTY ENVIRONMENT: `env: {}`. No host environment variables or database secrets exist in the child.
 */
export type SandboxOutcome =
  | SandboxJobResult
  | {
      kind: 'sandbox_failed'
      reason: 'memory' | 'timeout' | 'crash' | 'unavailable'
      message: string
      /** Cases that completed before the child was killed (genuine results; the rest failed with `message`). */
      completed?: SandboxCaseResult[]
    }

export type CaseListener = (index: number, result: SandboxCaseResult) => void

const HARD_TIMEOUT_MS = 10_000
const HEAP_MB = 192

// Python-only persistent worker limits
const PYTHON_MAX_RUNS = 200
const PYTHON_MAX_HEAP_MB = 150
const PYTHON_MAX_RSS_MB = 350

interface PythonWorkerState {
  child: ChildProcess
  entryFile: string
  runCount: number
}

let pythonWorker: PythonWorkerState | null = null
let pythonLock = false
const pythonWaiters: Array<() => void> = []

function killPythonWorker(): void {
  if (pythonWorker) {
    try {
      if (pythonWorker.child.exitCode === null && !pythonWorker.child.killed) {
        pythonWorker.child.kill('SIGKILL')
      }
    } catch {}
    pythonWorker = null
  }
}

export function resetWorkerForTesting(): void {
  killPythonWorker()
}

async function acquirePythonLock(): Promise<void> {
  if (!pythonLock) {
    pythonLock = true
    return
  }
  await new Promise<void>((resolve) => pythonWaiters.push(resolve))
  pythonLock = true
}

function releasePythonLock(): void {
  pythonLock = false
  const next = pythonWaiters.shift()
  if (next) next()
}

function exists(name: string): string | null {
  try {
    const file = fileURLToPath(new URL(name, import.meta.url))
    return existsSync(file) ? file : null
  } catch {
    return null
  }
}

/**
 * Which child entry to fork. The goal is that NO environment ever executes a stale compiled copy of the runners:
 *   1. KALVI_SANDBOX_ENTRY - set by the Vite dev server, which (re)builds the worker from source on start/changes.
 *   2. production          - the bundle produced by `npm run build` next to api/execute.js / api/submit.js.
 *   3. tsx (tests/scripts) - the TypeScript source itself, run under the inherited tsx loader.
 */
function resolveEntry(): { file: string; compiled: boolean } | null {
  const fromDevServer = process.env.KALVI_SANDBOX_ENTRY
  if (fromDevServer && existsSync(fromDevServer)) return { file: fromDevServer, compiled: true }

  const sibling = exists('./_sandbox-worker.mjs')
  if (sibling) return { file: sibling, compiled: true }

  const underTsx = process.execArgv.some((arg) => arg.includes('tsx'))
  const source = exists('./sandboxWorker.ts')
  if (underTsx && source) return { file: source, compiled: false }

  return null
}

function getOrCreatePythonWorker(entry: { file: string; compiled: boolean }): ChildProcess {
  if (
    pythonWorker &&
    pythonWorker.entryFile === entry.file &&
    !pythonWorker.child.killed &&
    pythonWorker.child.exitCode === null &&
    pythonWorker.child.connected
  ) {
    return pythonWorker.child
  }

  killPythonWorker()

  const execArgv: string[] = entry.compiled ? [] : [...process.execArgv]
  execArgv.push(`--max-old-space-size=${HEAP_MB}`, '--disallow-code-generation-from-strings')

  const child = fork(entry.file, [], {
    env: {},
    execArgv,
    stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
    serialization: 'json',
  })

  child.on('error', (err) => {
    console.error('[sandboxHost] python worker process error:', err)
  })

  child.unref()

  pythonWorker = { child, entryFile: entry.file, runCount: 0 }
  return child
}

/**
 * Executes Python jobs in the warm Pyodide worker, reusing it across runs.
 */
function runPythonJob(
  entry: { file: string; compiled: boolean },
  job: SandboxJob,
  onCase?: CaseListener
): Promise<SandboxOutcome> {
  return new Promise((resolve) => {
    const child = getOrCreatePythonWorker(entry)
    const currentState = pythonWorker

    let settled = false
    let gotResult = false
    const completed: SandboxCaseResult[] = []

    const cleanup = () => {
      clearTimeout(timer)
      child.removeListener('message', onMessage)
      child.removeListener('error', onError)
      child.removeListener('exit', onExit)
    }

    const finish = (outcome: SandboxOutcome) => {
      if (settled) return
      settled = true
      cleanup()
      resolve(outcome)
    }

    const failed = (reason: 'memory' | 'timeout' | 'crash', message: string) => {
      killPythonWorker()
      finish({ kind: 'sandbox_failed', reason, message, completed: [...completed] })
    }

    const timer = setTimeout(() => failed('timeout', 'Time Limit Exceeded'), HARD_TIMEOUT_MS)

    const onMessage = (msg: { type?: string; index?: number; result?: unknown; memory?: NodeJS.MemoryUsage }) => {
      if (msg?.type === 'case' && typeof msg.index === 'number' && msg.result) {
        const caseResult = msg.result as SandboxCaseResult
        completed[msg.index] = caseResult
        onCase?.(msg.index, caseResult)
        return
      }
      if (msg?.type === 'done' && msg.result) {
        gotResult = true
        if (currentState) {
          currentState.runCount++
          const heapMb = (msg.memory?.heapUsed || 0) / (1024 * 1024)
          const rssMb = (msg.memory?.rss || 0) / (1024 * 1024)
          // Recycle worker after 200 runs or if memory limits exceeded
          if (
            currentState.runCount >= PYTHON_MAX_RUNS ||
            heapMb > PYTHON_MAX_HEAP_MB ||
            rssMb > PYTHON_MAX_RSS_MB
          ) {
            killPythonWorker()
          }
        }
        finish(msg.result as SandboxJobResult)
      }
    }

    const onError = () => {
      failed('crash', 'Runtime Error: the program terminated abnormally')
    }

    const onExit = (code: number | null, signal: string | null) => {
      if (gotResult) return
      if (code === 134 || signal === 'SIGABRT' || signal === 'SIGKILL') {
        failed('memory', 'Memory Limit Exceeded')
      } else {
        failed('crash', 'Runtime Error: the program terminated abnormally')
      }
    }

    child.on('message', onMessage)
    child.once('error', onError)
    child.once('exit', onExit)

    try {
      child.send(job)
    } catch {
      failed('crash', 'Runtime Error: failed to dispatch job to sandbox worker')
    }
  })
}

/**
 * Executes non-Python jobs (JS, Java, C++) in a FRESH child process that is ALWAYS killed on finish.
 */
function runEphemeralJob(
  entry: { file: string; compiled: boolean },
  job: SandboxJob,
  onCase?: CaseListener
): Promise<SandboxOutcome> {
  return new Promise((resolve) => {
    const execArgv: string[] = entry.compiled ? [] : [...process.execArgv]
    execArgv.push(`--max-old-space-size=${HEAP_MB}`, '--disallow-code-generation-from-strings')

    const child = fork(entry.file, [], {
      env: {},
      execArgv,
      stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
      serialization: 'json',
    })

    let settled = false
    let gotResult = false
    const completed: SandboxCaseResult[] = []

    const finish = (outcome: SandboxOutcome) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      try {
        if (child.exitCode === null && !child.killed) child.kill('SIGKILL')
      } catch {}
      resolve(outcome)
    }

    const failed = (reason: 'memory' | 'timeout' | 'crash', message: string) => {
      try {
        if (child.exitCode === null && !child.killed) child.kill('SIGKILL')
      } catch {}
      finish({ kind: 'sandbox_failed', reason, message, completed: [...completed] })
    }

    const timer = setTimeout(() => failed('timeout', 'Time Limit Exceeded'), HARD_TIMEOUT_MS)

    child.on('message', (msg: { type?: string; index?: number; result?: unknown }) => {
      if (msg?.type === 'case' && typeof msg.index === 'number' && msg.result) {
        const caseResult = msg.result as SandboxCaseResult
        completed[msg.index] = caseResult
        onCase?.(msg.index, caseResult)
        return
      }
      if (msg?.type === 'done' && msg.result) {
        gotResult = true
        finish(msg.result as SandboxJobResult)
      }
    })

    child.once('error', () => failed('crash', 'Runtime Error: the program terminated abnormally'))

    child.once('exit', (code: number | null, signal: string | null) => {
      if (gotResult) return
      if (code === 134 || signal === 'SIGABRT' || signal === 'SIGKILL') {
        failed('memory', 'Memory Limit Exceeded')
      } else {
        failed('crash', 'Runtime Error: the program terminated abnormally')
      }
    })

    try {
      child.send(job)
    } catch {
      failed('crash', 'Runtime Error: failed to dispatch job to sandbox worker')
    }
  })
}

export async function runInSandbox(job: SandboxJob, onCase?: CaseListener): Promise<SandboxOutcome> {
  const entry = resolveEntry()
  if (!entry) {
    if (process.env.NODE_ENV === 'production' && process.env.SANDBOX_ALLOW_INPROCESS !== '1') {
      console.error('[sandbox] child entry not found; refusing to execute submitted code in-process')
      return { kind: 'sandbox_failed', reason: 'unavailable', message: 'Code execution is temporarily unavailable.' }
    }
    console.warn('[sandbox] no child entry available outside production; executing in-process (development only)')
    const { runSubmissionJob } = await import('./codeRunnerCore')
    return await runSubmissionJob(job, onCase)
  }

  const isPython = job.language.toLowerCase() === 'python'
  if (isPython) {
    await acquirePythonLock()
    try {
      return await runPythonJob(entry, job, onCase)
    } finally {
      releasePythonLock()
    }
  }

  // JavaScript, Java, C++: run in a fresh child process, killed immediately on finish
  return await runEphemeralJob(entry, job, onCase)
}



