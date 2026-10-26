import { runSubmissionJob, type SandboxJob } from './codeRunnerCore'

/**
 * Sandbox CHILD-PROCESS entry. Started by sandboxHost.ts with an empty environment, a native heap cap, and (where the
 * Node version supports it) the permission model with no fs/child-process/worker grants. Runs exactly ONE job received
 * over IPC. Each test case result is sent as soon as that case finishes ({type:'case'}), followed by the final result
 * ({type:'done'}). Bundled separately (api/_sandbox-worker.mjs) so it contains no module that holds secrets
 * (no Supabase client, no handlers, no test repository).
 */
if (typeof process.send !== 'function') {
  throw new Error('sandboxWorker must be started with an IPC channel')
}

process.once('message', async (job: SandboxJob) => {
  const result = await runSubmissionJob(job, (index, caseResult) => {
    process.send!({ type: 'case', index, result: caseResult })
  })
  process.send!({ type: 'done', result }, undefined, undefined, () => process.exit(0))
})
