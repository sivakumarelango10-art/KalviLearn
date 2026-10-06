import { fork } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { SandboxJob, SandboxJobResult } from './codeRunnerCore'

/**
 * Runs submitted code in a short-lived CHILD PROCESS (not in the API process):
 *
 *  - SEPARATE HEAP + NATIVE CAP: `--max-old-space-size`. A memory bomb - including a V8 *fatal* OOM, which aborts a whole
 *    process and cannot be contained by a worker thread - kills only the child.
 *  - EMPTY ENVIRONMENT: `env: {}`. Even a complete escape from the vm sandbox finds no SUPABASE_SERVICE_ROLE_KEY,
 *    webhook secret or database URL in `process.env`.
 *  - NODE PERMISSION MODEL where available (`--permission` with no grants): the child cannot read/write the filesystem
 *    (except its own entry file), spawn processes, or start workers. Network egress is NOT restricted by this mechanism.
 *  - HARD WALL-CLOCK KILL (SIGKILL) after HARD_TIMEOUT_MS regardless of what the code is doing.
 *  - The child bundle contains only the language runners + vm sandbox (no Supabase client, handlers or test repository).
 *  - Bounded concurrency, so a burst cannot spawn unbounded processes on one instance.
 *
 * Residual risk (documented in the report): same machine, same network namespace, same user. This materially limits blast
 * radius; a container / microVM runner with no egress remains the long-term answer.
 */
export type SandboxOutcome =
  | SandboxJobResult
  | { kind: 'sandbox_failed'; reason: 'memory' | 'timeout' | 'crash' | 'unavailable'; message: string }

const HARD_TIMEOUT_MS = 10_000
const MAX_CONCURRENT = 4
const HEAP_MB = 192

let active = 0
const waiters: Array<() => void> = []
// If the permission-model flags make the child fail to boot on some Node build, remember and stop using them.
let permissionModelBroken = false

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

function resolveEntry(): { file: string; compiled: boolean } | null {
  // Production bundle: api/execute.js and api/submit.js sit next to api/_sandbox-worker.mjs.
  // Dev / tests (tsx): the TypeScript entry next to this file (runs under the inherited tsx loader).
  const candidates: Array<[string, boolean]> = [
    ['./_sandbox-worker.mjs', true],
    ['./sandboxWorker.ts', false],
  ]
  for (const [name, compiled] of candidates) {
    try {
      const file = fileURLToPath(new URL(name, import.meta.url))
      if (existsSync(file)) return { file, compiled }
    } catch {
      // try next candidate
    }
  }
  return null
}

function permissionFlag(): string | null {
  const flags = process.allowedNodeEnvironmentFlags
  if (flags.has('--permission')) return '--permission'
  if (flags.has('--experimental-permission')) return '--experimental-permission'
  return null
}

function run(entry: { file: string; compiled: boolean }, job: SandboxJob, usePermission: boolean): Promise<SandboxOutcome & { bootFailed?: boolean }> {
  return new Promise((resolve) => {
    const execArgv: string[] = entry.compiled ? [] : [...process.execArgv]
    execArgv.push(`--max-old-space-size=${HEAP_MB}`, '--disallow-code-generation-from-strings')
    const flag = usePermission && entry.compiled ? permissionFlag() : null
    if (flag) execArgv.push(flag, `--allow-fs-read=${entry.file}`)

    const child = fork(entry.file, [], {
      env: {},
      execArgv,
      stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
      serialization: 'json',
    })
    let settled = false
    let gotResult = false
    const finish = (outcome: SandboxOutcome & { bootFailed?: boolean }) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      if (child.exitCode === null && !child.killed) child.kill('SIGKILL')
      resolve(outcome)
    }
    const timer = setTimeout(
      () => finish({ kind: 'sandbox_failed', reason: 'timeout', message: 'Time Limit Exceeded' }),
      HARD_TIMEOUT_MS
    )
    child.once('message', (result: SandboxJobResult) => {
      gotResult = true
      finish(result)
    })
    child.once('error', () =>
      finish({ kind: 'sandbox_failed', reason: 'crash', message: 'Runtime Error: the program terminated abnormally', bootFailed: true })
    )
    child.once('exit', (code, signal) => {
      if (gotResult) return
      // 134 / SIGABRT = V8 fatal "heap out of memory" (child only); SIGKILL from the OS OOM-killer is treated alike.
      if (code === 134 || signal === 'SIGABRT' || signal === 'SIGKILL') {
        finish({ kind: 'sandbox_failed', reason: 'memory', message: 'Memory Limit Exceeded' })
      } else {
        finish({ kind: 'sandbox_failed', reason: 'crash', message: 'Runtime Error: the program terminated abnormally', bootFailed: !!flag })
      }
    })
    child.send(job)
  })
}

export async function runInSandbox(job: SandboxJob): Promise<SandboxOutcome> {
  const entry = resolveEntry()
  if (!entry) {
    // Fail CLOSED in production unless explicitly overridden: never silently run student code in the API process.
    if (process.env.NODE_ENV === 'production' && process.env.SANDBOX_ALLOW_INPROCESS !== '1') {
      console.error('[sandbox] child entry not found; refusing to execute submitted code in-process')
      return { kind: 'sandbox_failed', reason: 'unavailable', message: 'Code execution is temporarily unavailable.' }
    }
    const { runSubmissionJob } = await import('./codeRunnerCore')
    return runSubmissionJob(job)
  }
  await acquire()
  try {
    const first = await run(entry, job, !permissionModelBroken)
    if (first.kind === 'sandbox_failed' && first.bootFailed && !permissionModelBroken && permissionFlag() && entry.compiled) {
      // The child died before replying while the permission flag was active: retry once without it and remember.
      permissionModelBroken = true
      console.warn('[sandbox] permission-model flags unsupported on this runtime; continuing with process isolation only')
      return await run(entry, job, false)
    }
    return first
  } finally {
    release()
  }
}
