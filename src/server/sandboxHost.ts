import { fork, type ChildProcess } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { SandboxCaseResult, SandboxJob, SandboxJobResult } from './codeRunnerCore'

/**
 * Runs submitted code in a long-lived CHILD PROCESS (isolated from the API process):
 *
 *  - SEPARATE HEAP + NATIVE CAP: `--max-old-space-size`. A memory bomb - including a V8 *fatal* OOM, which aborts a whole
 *    process and cannot be contained by a worker thread - kills only the child, leaving the host API intact.
 *  - EMPTY ENVIRONMENT: `env: {}`. Even a complete escape from the vm sandbox finds no SUPABASE_SERVICE_ROLE_KEY,
 *    webhook secret or database URL in `process.env`.
 *  - WORKER REUSE: Pyodide is loaded once per function instance and reused across requests. Memory and filesystem state
 *    are wiped between runs, preserving fast sub-second warm execution.
 *  - HARD WALL-CLOCK KILL (SIGKILL) after HARD_TIMEOUT_MS if a runaway job hangs, recycling the worker on demand.
 *  - The child bundle contains only the language runners + vm sandbox (no Supabase client, handlers or test repository).
 *  - Bounded concurrency, so requests run sequentially on the warm worker.
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
const MAX_CONCURRENT = 1
const HEAP_MB = 192

let active = 0
const waiters: Array<() => void> = []

async function acquire(): Promise<void> {
  if (active < MAX_CONCURRENT) {
    active++
    return
  }
  await new Promise<void>((resolve) => waiters.push(resolve))
  active++
}

function release(): void {
  active--
  const next = waiters.shift()
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

interface ActiveWorker {
  child: ChildProcess
  entryFile: string
}

let activeWorker: ActiveWorker | null = null

export function resetWorkerForTesting(): void {
  if (activeWorker) {
    try {
      if (activeWorker.child.exitCode === null && !activeWorker.child.killed) {
        activeWorker.child.kill('SIGKILL')
      }
    } catch {}
    activeWorker = null
  }
}

function getOrCreateWorker(entry: { file: string; compiled: boolean }): ChildProcess {
  if (
    activeWorker &&
    activeWorker.entryFile === entry.file &&
    !activeWorker.child.killed &&
    activeWorker.child.exitCode === null &&
    activeWorker.child.connected
  ) {
    return activeWorker.child
  }

  if (activeWorker) {
    try {
      if (activeWorker.child.exitCode === null && !activeWorker.child.killed) {
        activeWorker.child.kill('SIGKILL')
      }
    } catch {}
    activeWorker = null
  }

  const execArgv: string[] = entry.compiled ? [] : [...process.execArgv]
  execArgv.push(`--max-old-space-size=${HEAP_MB}`, '--disallow-code-generation-from-strings')

  const child = fork(entry.file, [], {
    env: {},
    execArgv,
    stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
    serialization: 'json',
  })

  child.on('error', (err) => {
    console.error('[sandboxHost] worker process error:', err)
  })

  // Detach child from parent event loop ref count so parent can exit cleanly
  child.unref()

  activeWorker = { child, entryFile: entry.file }
  return child
}

function run(
  entry: { file: string; compiled: boolean },
  job: SandboxJob,
  onCase?: CaseListener
): Promise<SandboxOutcome> {
  return new Promise((resolve) => {
    const child = getOrCreateWorker(entry)

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
      if (activeWorker?.child === child) {
        activeWorker = null
      }
      try {
        if (child.exitCode === null && !child.killed) child.kill('SIGKILL')
      } catch {}
      finish({ kind: 'sandbox_failed', reason, message, completed: [...completed] })
    }

    const timer = setTimeout(() => failed('timeout', 'Time Limit Exceeded'), HARD_TIMEOUT_MS)

    const onMessage = (msg: { type?: string; index?: number; result?: unknown }) => {
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
  await acquire()
  try {
    return await run(entry, job, onCase)
  } finally {
    release()
  }
}


