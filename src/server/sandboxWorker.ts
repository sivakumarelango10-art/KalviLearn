import { runSubmissionJob, type SandboxJob } from './codeRunnerCore'
import { getPyodide } from '../lib/runner/pyodideRunner'

/**
 * Sandbox CHILD-PROCESS entry. Started by sandboxHost.ts with an empty environment and a native heap cap.
 * Reused across execution jobs for the lifetime of the serverless instance so runtimes like Pyodide
 * remain warm in memory, while per-run isolation (builtins, filesystem, modules) is strictly enforced.
 */
if (typeof process.send !== 'function') {
  throw new Error('sandboxWorker must be started with an IPC channel')
}

// Pre-warm Pyodide runtime in the background immediately on process boot
getPyodide().catch(() => {})

process.on('message', async (job: SandboxJob) => {
  try {
    const result = await runSubmissionJob(job, (index, caseResult) => {
      process.send!({ type: 'case', index, result: caseResult })
    })
    process.send!({ type: 'done', result })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    process.send!({
      type: 'done',
      result: {
        kind: 'sandbox_failed',
        reason: 'crash',
        message: `Runtime Error: ${message}`,
      },
    })
  }
})

