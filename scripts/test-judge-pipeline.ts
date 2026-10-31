/**
 * Judge pipeline regression suite (root-cause fix of "visible cases pass, hidden cases fail").
 *
 * Programs are executed by the PRODUCTION Judge0 adapter against a Judge0-compatible test server backed by the REAL
 * local interpreters (python / java / node), so correct code is graded with genuine language semantics.
 *
 *   A  original practice-bank question, known-correct solution        -> 10/10 (Python, Java, Node)
 *   B  coding-bank questions in every topic, known-correct solutions  -> 10/10
 *   C  deliberately wrong solutions                                    -> < 10/10, never accepted
 *   G  Submit returns results for all ten cases; hidden cases carry metadata only
 *   H  Run executes the visible cases only (3) and reports judgeTotal 10
 *   I  completion/XP only after an authoritative accepted Submit (isAuthoritativeAccept)
 *   S  streaming: the browser runner receives genuine per-case events from the real submit handler
 *   L  local engine (no Judge0 configured) still executes JavaScript correctly and reports engine 'local'
 *   (D/E bank-wide lookups: scripts/test-judge-bank-audit.ts   F hidden-content bundle scan: npm run check:bundle)
 */
import { EventEmitter } from 'events'
import { startJudge0TestServer, hasCompiler } from './lib/judge0-test-server'
import { REFERENCES, WRONG } from './lib/reference-solutions'

const store = new Map<string, string>()
;(globalThis as any).localStorage = {
  getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
}
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

let passed = 0
let failed = 0
function assert(cond: boolean, name: string, detail = '') {
  if (cond) {
    passed++
    console.log(`  ✅ [PASS] ${name}`)
  } else {
    failed++
    console.error(`  ❌ [FAIL] ${name}${detail ? ' -> ' + detail : ''}`)
  }
}

async function main() {
  console.log('========================================================================')
  console.log('⚖️  JUDGE PIPELINE REGRESSION SUITE (real interpreters via Judge0 adapter)')
  console.log('========================================================================')
  const languages = (['python', 'java', 'node'] as const).filter((l) => hasCompiler(l))
  console.log(`Real runtimes available: ${languages.join(', ')}${hasCompiler('gpp') ? ', g++' : ' (no g++: C++ not executed for real here)'}`)

  const j0 = await startJudge0TestServer()
  process.env.JUDGE0_URL = j0.url
  const { executeQuestion } = await import('../src/server/executeService')
  const { isAuthoritativeAccept, executeCode } = await import('../src/lib/runner/codeRunner')
  const submitHandler = (await import('../src/server/submitHandler')).default

  const runtimeFor = { python: 'python', java: 'java', nodejs: 'node' } as const

  // ---------------------------------------------------------------- A + B
  console.log('\n--- A/B. Known-correct solutions reach 10/10 (practice + every coding topic) ---')
  const topicsOk = new Set<string>()
  for (const ref of REFERENCES) {
    for (const lang of ['python', 'java', 'nodejs'] as const) {
      const code = ref[lang]
      if (!code || !languages.includes(runtimeFor[lang])) continue
      const r = await executeQuestion({ questionSlug: ref.slug, language: lang, code, mode: 'submit' })
      const ok = r.engine === 'judge0' && r.status === 'ACCEPTED' && r.passed === 10 && r.total === 10
      if (ok) topicsOk.add(ref.topic)
      assert(ok, `${ref.topic} / ${ref.slug} (${lang}) -> ${r.passed}/${r.total}`, `${r.status} ${(r.message || '').slice(0, 80)}`)
    }
  }
  const topics = new Set(REFERENCES.map((r) => r.topic))
  assert(topicsOk.size === topics.size, `every covered topic has a 10/10 solution (${topicsOk.size}/${topics.size})`)

  // ---------------------------------------------------------------- C
  console.log('\n--- C. Deliberately wrong solutions are rejected ---')
  for (const w of WRONG) {
    const r = await executeQuestion({ questionSlug: w.slug, language: 'python', code: w.python, mode: 'submit' })
    assert(r.passed < 10 && !r.success && r.status !== 'ACCEPTED', `${w.slug}: ${w.why} -> ${r.passed}/10 ${r.status}`)
  }

  // ---------------------------------------------------------------- G + H
  console.log('\n--- G/H. Submit = all 10 cases (hidden metadata only); Run = visible cases only ---')
  const py = REFERENCES.find((r) => r.slug === 'arithmetic-check')!.python
  const sub = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'python', code: py, mode: 'submit' })
  assert(sub.testCases.length === 10 && sub.testCases.map((t) => t.testIndex).join(',') === '1,2,3,4,5,6,7,8,9,10', 'Submit returns results for all ten cases in order')
  const hidden = sub.testCases.filter((t) => !t.visible)
  assert(
    hidden.length === 7 && hidden.every((t) => t.input === undefined && t.expectedOutput === undefined && t.actualOutput === undefined && t.error === undefined),
    'hidden case results carry no input / expected / actual output / error text'
  )
  const run = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'python', code: py, mode: 'run' })
  assert(run.mode === 'run' && run.total === 3 && run.judgeTotal === 10 && run.testCases.every((t) => t.visible), 'Run executes the 3 visible cases and reports judgeTotal 10')
  const legacyRun = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'python', code: py, isSubmit: false })
  assert(legacyRun.mode === 'run' && legacyRun.total === 3, 'legacy isSubmit:false request maps to Run (visible only)')

  // ---------------------------------------------------------------- I
  console.log('\n--- I. Completion only after an authoritative accepted Submit ---')
  const asRun = (r: typeof sub, isSubmit: boolean) => ({
    passed: r.success,
    passedCount: r.passed,
    totalCount: r.total,
    judgeTotal: r.judgeTotal,
    mode: r.mode,
    overallTimeMs: r.overallTimeMs,
    results: r.testCases.map((t) => ({ testIndex: t.testIndex, status: t.status, passed: t.status === 'passed', isHidden: !t.visible, executionTimeMs: t.executionTimeMs })),
    __isSubmit: isSubmit,
  })
  assert(isAuthoritativeAccept(asRun(sub, true) as any, true), 'Submit 10/10 -> accepted')
  assert(!isAuthoritativeAccept(asRun(run, false) as any, false), 'Run 3/3 visible -> NOT accepted (no completion, no XP)')
  assert(!isAuthoritativeAccept({ ...asRun(run, true), mode: 'run' } as any, true), 'a Run result can never be accepted, even if flagged as submit')
  const nineOfTen = await executeQuestion({ questionSlug: 'first-target-position', language: 'python', code: WRONG.find((w) => w.slug === 'first-target-position')!.python, mode: 'submit' })
  assert(!isAuthoritativeAccept(asRun(nineOfTen, true) as any, true), `Submit ${nineOfTen.passed}/10 -> NOT accepted`)

  // ---------------------------------------------------------------- S
  console.log('\n--- S. Browser runner <- real submit handler: genuine per-case streaming ---')
  const realFetch = globalThis.fetch
  // Route only the browser's /api/* calls into the handler; the server's own Judge0 calls keep the real fetch.
  ;(globalThis as any).fetch = (url: string, init: { headers: Record<string, string>; body: string }) =>
    !String(url).startsWith('/api/') ? realFetch(url as any, init as any) : new Promise((resolve) => {
      const req = new EventEmitter() as any
      req.method = 'POST'
      req.url = url
      req.socket = { remoteAddress: '10.20.30.40' }
      req.headers = Object.fromEntries(Object.entries(init.headers).map(([k, v]) => [k.toLowerCase(), v]))
      req.headers.authorization = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'
      req.body = JSON.parse(init.body)
      const headers: Record<string, string> = {}
      let controller!: ReadableStreamDefaultController<Uint8Array>
      const body = new ReadableStream<Uint8Array>({ start: (c) => void (controller = c) })
      const enc = new TextEncoder()
      let resolved = false
      const res: any = {
        statusCode: 200,
        writableEnded: false,
        setHeader: (k: string, v: string) => void (headers[k.toLowerCase()] = v),
        flushHeaders: () => {
          if (!resolved) {
            resolved = true
            resolve(new Response(body, { status: res.statusCode, headers }))
          }
        },
        write: (chunk: string) => {
          res.flushHeaders()
          controller.enqueue(enc.encode(chunk))
        },
        end: (chunk?: string) => {
          if (chunk) controller.enqueue(enc.encode(chunk))
          res.writableEnded = true
          res.flushHeaders()
          controller.close()
        },
      }
      submitHandler(req, res)
    })
  const events: Array<{ type: string; submissionId: string; testIndex?: number; hidden?: boolean }> = []
  const clientResult = await executeCode('arithmetic-check', 'python', py, undefined, true, {
    onEvent: (e) => events.push(e.type === 'case' ? { type: 'case', submissionId: e.submissionId, testIndex: e.result.testIndex, hidden: e.result.isHidden } : { type: 'started', submissionId: e.submissionId }),
  })
  const caseEvents = events.filter((e) => e.type === 'case')
  assert(events[0]?.type === 'started', 'first streamed event is "started"')
  assert(caseEvents.length === 10 && new Set(caseEvents.map((e) => e.testIndex)).size === 10, `10 per-case events streamed (${caseEvents.length})`)
  assert(new Set(events.map((e) => e.submissionId)).size === 1 && clientResult.submissionId === events[0]?.submissionId, 'all events and the final result share one submissionId')
  assert(isAuthoritativeAccept(clientResult, true) && clientResult.passedCount === 10 && clientResult.totalCount === 10, 'client final result: accepted 10/10 from the server-reported suite')
  assert(clientResult.results.filter((r) => r.isHidden).every((r) => r.input === undefined && r.expectedOutput === undefined && r.actualOutput === undefined), 'client never receives hidden case contents')

  // ---------------------------------------------------------------- L
  console.log('\n--- L. Local engine (no Judge0 endpoint) ---')
  await j0.close()
  delete process.env.JUDGE0_URL
  const node = REFERENCES.find((r) => r.slug === 'arithmetic-check')!.nodejs!
  const local = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'nodejs', code: node, mode: 'submit' })
  assert(local.engine === 'local' && local.passed === 10, `local engine runs JavaScript correctly (${local.passed}/10, engine=${local.engine})`)

  // ---------------------------------------------------------------- N
  console.log('\n--- N. In-sandbox Node.js runner behaves like real Node on common stdin/stdout patterns ---')
  const { runSubmissionJob } = await import('../src/server/codeRunnerCore')
  const { NODE_IO_PATTERNS } = await import('./lib/node-io-patterns')
  for (const p of NODE_IO_PATTERNS) {
    const job = await runSubmissionJob({ code: p.code, language: 'nodejs', inputs: [p.input] })
    const c = job.kind === 'ran' ? job.cases[0] : { output: '', error: job.error }
    assert(!c.error && c.output === p.expected, `node I/O: ${p.name}`, `got ${JSON.stringify(c.output)} ${c.error || ''}`)
  }

  // ---------------------------------------------------------------- P
  console.log('\n--- P. No Judge0 configured: Python / Java are graded by the real runtimes (native engine) ---')
  const { nativeAvailable } = await import('../src/server/judge/native')
  for (const ref of REFERENCES) {
    for (const lang of ['python', 'java'] as const) {
      const code = ref[lang]
      if (!code || !nativeAvailable(lang)) continue
      const r = await executeQuestion({ questionSlug: ref.slug, language: lang, code, mode: 'submit' })
      assert(r.engine === 'native' && r.status === 'ACCEPTED' && r.passed === 10, `native ${lang}: ${ref.slug} -> ${r.passed}/${r.total} (${r.engine})`, `${r.status} ${(r.message || '').slice(0, 80)}`)
    }
  }
  for (const w of WRONG) {
    if (!nativeAvailable('python')) break
    const r = await executeQuestion({ questionSlug: w.slug, language: 'python', code: w.python, mode: 'submit' })
    assert(r.engine === 'native' && r.status !== 'ACCEPTED' && r.passed < 10, `native python rejects wrong solution ${w.slug} -> ${r.passed}/10 ${r.status}`)
  }
  if (nativeAvailable('python')) {
    const syntax = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'python', code: 'def broken(:\n  pass', mode: 'submit' })
    assert(syntax.status === 'COMPILATION_ERROR' && syntax.testCases.length === 0, 'native python syntax error -> COMPILATION_ERROR, no case results')
    const tle = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'python', code: 'while True:\n  pass', mode: 'run' })
    assert(tle.status === 'TIME_LIMIT_EXCEEDED' || tle.testCases.every((t) => t.status === 'time_limit_exceeded'), `native python infinite loop -> time limit (${tle.status})`)
  }
  if (nativeAvailable('java')) {
    const javac = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'java', code: 'public class Main { public static void main(String[] a) { int x = } }', mode: 'submit' })
    assert(javac.status === 'COMPILATION_ERROR', 'native java compile error -> COMPILATION_ERROR')
  }

  console.log('\n========================================================================')
  console.log(`🏁 JUDGE PIPELINE RESULTS: ${passed} PASSED, ${failed} FAILED`)
  console.log('========================================================================')
  process.exit(failed ? 1 : 0)
}

main().catch((err) => {
  console.error('Judge pipeline suite crashed:', err)
  process.exit(1)
})
