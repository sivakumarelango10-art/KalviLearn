import { runInSandbox } from '../sandboxHost'

/**
 * Judge execution engines. An engine executes ONE program against N stdin inputs and reports raw per-case results;
 * grading (output comparison, visibility, aggregation) is done by the judge, never by the engine.
 *
 *  - judge0: a Judge0-compatible service (real CPython / OpenJDK / GCC / Node, container-isolated). Used for every
 *            language whenever JUDGE0_URL is configured.
 *  - local:  the in-repo sandbox child process. Node.js is executed as real JavaScript. Python, Java and C++ are
 *            TRANSPILED to JavaScript and do not reproduce those languages' semantics (integer division, modulo,
 *            overflow, number formatting, much syntax) - see docs/JUDGE_ROOT_CAUSE_REPORT.md. Used only when no Judge0
 *            endpoint is configured; responses carry `engine: 'local'` so this is never invisible.
 */
export type CaseKind = 'ok' | 'runtime_error' | 'timeout' | 'memory'

export interface EngineCaseResult {
  output: string
  kind: CaseKind
  error?: string
  ms: number
}

export type EngineOutcome =
  | { kind: 'compile_error'; error: string }
  | { kind: 'ran'; cases: EngineCaseResult[] }
  | { kind: 'unavailable'; message: string }

export type EngineCaseListener = (index: number, result: EngineCaseResult) => void

export interface EngineJob {
  code: string
  language: string
  inputs: string[]
}

export interface JudgeEngine {
  name: 'judge0' | 'local'
  run(job: EngineJob, onCase?: EngineCaseListener): Promise<EngineOutcome>
}

// ---------------------------------------------------------------------------------------------------------------
// Local engine
// ---------------------------------------------------------------------------------------------------------------
function classifyLocal(error: string | undefined): CaseKind {
  if (!error) return 'ok'
  if (/time limit exceeded/i.test(error)) return 'timeout'
  if (/memory limit exceeded/i.test(error)) return 'memory'
  return 'runtime_error'
}

const isSyntaxError = (error?: string) =>
  !!error && (error.includes('SyntaxError') || /syntax error|compilation error/i.test(error))

export const localEngine: JudgeEngine = {
  name: 'local',
  async run(job, onCase) {
    let compileError: string | null = null
    const outcome = await runInSandbox(job, (index, r) => {
      // The transpilers surface syntax errors at run time; treat a syntax error on the first case as a compile error.
      if (index === 0 && isSyntaxError(r.error)) compileError = r.error || 'Compilation Error'
      if (compileError) return
      onCase?.(index, { output: r.output, error: r.error, ms: r.ms, kind: classifyLocal(r.error) })
    })
    if (outcome.kind === 'precheck_failed') return { kind: 'compile_error', error: outcome.error }
    if (outcome.kind === 'sandbox_failed' && outcome.reason === 'unavailable') return { kind: 'unavailable', message: outcome.message }
    if (outcome.kind === 'ran') {
      const first = outcome.cases[0]
      if (first && isSyntaxError(first.error)) return { kind: 'compile_error', error: first.error || 'Compilation Error' }
      return { kind: 'ran', cases: outcome.cases.map((c) => ({ output: c.output, error: c.error, ms: c.ms, kind: classifyLocal(c.error) })) }
    }
    // Child killed (memory / timeout / crash): keep the cases that genuinely completed, fail the rest with the reason.
    const done = outcome.completed || []
    const failKind: CaseKind = outcome.reason === 'memory' ? 'memory' : outcome.reason === 'timeout' ? 'timeout' : 'runtime_error'
    const cases = job.inputs.map((_, i) => {
      const c = done[i]
      if (c) return { output: c.output, error: c.error, ms: c.ms, kind: classifyLocal(c.error) }
      const failedCase: EngineCaseResult = { output: '', error: outcome.message, ms: 0, kind: failKind }
      onCase?.(i, failedCase)
      return failedCase
    })
    return { kind: 'ran', cases }
  },
}

// ---------------------------------------------------------------------------------------------------------------
// Judge0 engine (Judge0 CE / Extra CE compatible REST API)
// ---------------------------------------------------------------------------------------------------------------
// Default language ids exist in every Judge0 CE release; override with JUDGE0_LANGUAGE_IDS for newer runtimes, e.g.
// {"python":92,"java":91,"cpp":105,"nodejs":93} (Python 3.11, JDK 17, GCC 14, Node 18 on Judge0 CE >= 1.13.1).
const DEFAULT_LANGUAGE_IDS: Record<string, number> = { python: 71, java: 62, cpp: 54, nodejs: 63 }

function languageIds(): Record<string, number> {
  try {
    const custom = process.env.JUDGE0_LANGUAGE_IDS ? JSON.parse(process.env.JUDGE0_LANGUAGE_IDS) : {}
    return { ...DEFAULT_LANGUAGE_IDS, ...custom }
  } catch {
    return DEFAULT_LANGUAGE_IDS
  }
}

export function normalizeJudgeLanguage(raw: string): 'python' | 'java' | 'cpp' | 'nodejs' | null {
  const l = (raw || '').toLowerCase()
  if (l === 'python' || l === 'py') return 'python'
  if (l === 'java') return 'java'
  if (l === 'cpp' || l === 'c++') return 'cpp'
  if (l === 'nodejs' || l === 'node' || l === 'javascript' || l === 'js') return 'nodejs'
  return null
}

const b64 = (s: string) => Buffer.from(s, 'utf8').toString('base64')
const unb64 = (s: string | null | undefined) => (s ? Buffer.from(s, 'base64').toString('utf8') : '')

interface Judge0Submission {
  token: string
  status?: { id: number; description?: string }
  stdout?: string | null
  stderr?: string | null
  compile_output?: string | null
  message?: string | null
  time?: string | null
}

export function judge0Configured(): boolean {
  return !!process.env.JUDGE0_URL
}

function judge0Headers(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = process.env.JUDGE0_AUTH_TOKEN
  if (token) headers[process.env.JUDGE0_AUTH_HEADER || 'X-Auth-Token'] = token
  if (process.env.JUDGE0_RAPIDAPI_HOST) headers['X-RapidAPI-Host'] = process.env.JUDGE0_RAPIDAPI_HOST
  return headers
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const judge0Engine: JudgeEngine = {
  name: 'judge0',
  async run(job, onCase) {
    const base = (process.env.JUDGE0_URL || '').replace(/\/+$/, '')
    const language = normalizeJudgeLanguage(job.language)
    const languageId = language ? languageIds()[language] : undefined
    if (!base || !languageId) return { kind: 'unavailable', message: 'Code execution is temporarily unavailable.' }

    const deadline = Date.now() + Number(process.env.JUDGE0_DEADLINE_MS || 9000)
    const cpu = Number(process.env.JUDGE0_CPU_TIME_LIMIT || 2)
    const headers = judge0Headers()

    let tokens: string[]
    try {
      const res = await fetch(`${base}/submissions/batch?base64_encoded=true`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          submissions: job.inputs.map((input) => ({
            language_id: languageId,
            source_code: b64(job.code),
            stdin: b64(input),
            cpu_time_limit: cpu,
            wall_time_limit: cpu * 3,
            memory_limit: 256000,
          })),
        }),
        signal: AbortSignal.timeout(Math.max(1000, deadline - Date.now())),
      })
      if (!res.ok) throw new Error(`judge0 batch create HTTP ${res.status}`)
      const created = (await res.json()) as Array<{ token?: string }>
      if (!Array.isArray(created) || created.length !== job.inputs.length || created.some((c) => !c.token)) {
        throw new Error('judge0 batch create returned an unexpected payload')
      }
      tokens = created.map((c) => c.token as string)
    } catch (err) {
      console.error('[judge0] submit failed:', err instanceof Error ? err.message : err)
      return { kind: 'unavailable', message: 'Code execution is temporarily unavailable.' }
    }

    // Dense array: `.some()` skips holes in a sparse `new Array(n)`, which would end polling immediately.
    const results: Array<EngineCaseResult | undefined> = Array.from({ length: tokens.length }, () => undefined)
    let compileError: string | null = null
    let delay = 250
    while (results.some((r) => r === undefined) && !compileError) {
      if (Date.now() > deadline) {
        console.error('[judge0] deadline exceeded while polling')
        return { kind: 'unavailable', message: 'The judge took too long to respond. Please try again.' }
      }
      await sleep(delay)
      delay = Math.min(delay * 1.5, 1000)
      let submissions: Judge0Submission[]
      try {
        const res = await fetch(
          `${base}/submissions/batch?tokens=${tokens.join(',')}&base64_encoded=true&fields=token,status,stdout,stderr,compile_output,message,time`,
          { headers, signal: AbortSignal.timeout(Math.max(1000, deadline - Date.now())) }
        )
        if (!res.ok) throw new Error(`judge0 poll HTTP ${res.status}`)
        submissions = ((await res.json()) as { submissions?: Judge0Submission[] }).submissions || []
      } catch (err) {
        console.error('[judge0] poll failed:', err instanceof Error ? err.message : err)
        return { kind: 'unavailable', message: 'Code execution is temporarily unavailable.' }
      }
      for (const sub of submissions) {
        const index = tokens.indexOf(sub.token)
        if (index < 0 || results[index] || !sub.status || sub.status.id <= 2) continue // 1 queued, 2 processing
        const id = sub.status.id
        const ms = Math.round(Number(sub.time || 0) * 1000)
        if (id === 6) {
          compileError = unb64(sub.compile_output) || 'Compilation Error'
          break
        }
        let caseResult: EngineCaseResult
        if (id === 3 || id === 4) caseResult = { output: unb64(sub.stdout), kind: 'ok', ms }
        else if (id === 5) caseResult = { output: unb64(sub.stdout), kind: 'timeout', error: 'Time Limit Exceeded', ms }
        else if (id >= 7 && id <= 12) {
          const stderr = unb64(sub.stderr)
          const memory = /memory|MemoryError|OutOfMemory|bad_alloc/i.test(stderr)
          caseResult = {
            output: unb64(sub.stdout),
            kind: memory ? 'memory' : 'runtime_error',
            error: (stderr || sub.status.description || 'Runtime Error').trim().split('\n').slice(-3).join('\n'),
            ms,
          }
        } else {
          // 13 Internal Error, 14 Exec Format Error: the judge failed, not the student.
          console.error('[judge0] internal status', id, sub.status.description)
          return { kind: 'unavailable', message: 'The judge encountered an internal error. Please try again.' }
        }
        results[index] = caseResult
        onCase?.(index, caseResult)
      }
    }
    if (compileError) return { kind: 'compile_error', error: compileError.trim() }
    return { kind: 'ran', cases: results as EngineCaseResult[] }
  },
}

export function selectEngine(): JudgeEngine {
  return judge0Configured() ? judge0Engine : localEngine
}
