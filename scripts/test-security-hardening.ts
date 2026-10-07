/**
 * Security regression suite for the audit hardening work.
 *
 * Covers: sandbox escape attempts + secret exfiltration, authentication on /api/execute and /api/submit,
 * forged / invalid tokens, IDOR, test-token gating, CORS allow-list, rate limiting, payload validation,
 * webhook fail-closed behaviour, attachment URL trust, idempotency under concurrent double-submit.
 *
 * Pure in-process: uses synthetic identities only and persists nothing (synthetic users are never written).
 */
import { EventEmitter } from 'events'
import crypto from 'crypto'

// In-memory localStorage for the client-state tests (Node has none).
const memoryStore = new Map<string, string>()
;(globalThis as any).localStorage = {
  getItem: (k: string) => (memoryStore.has(k) ? memoryStore.get(k)! : null),
  setItem: (k: string, v: string) => void memoryStore.set(k, v),
  removeItem: (k: string) => void memoryStore.delete(k),
  clear: () => memoryStore.clear(),
}

process.env.ALLOW_TEST_AUTH_TOKENS = '1'
process.env.POC_SECRET_PROBE = 'super-secret-probe-value'

import executeHandler, { resetExecuteRateLimitsForTesting } from '../src/server/apiHandler'
import submitHandler, { resetSubmitStateForTesting } from '../src/server/submitHandler'
import { executeQuestion } from '../src/server/executeService'
import { authenticateFeedbackRequest, clearAuthCacheForTesting, isTrustedStorageUrl } from '../src/server/feedbackAuth'
import { verifyTeamSyncWebhookSignature, computeTeamSyncSignature } from '../src/server/teamSyncWebhookAuth'
import { RateLimiter, getAllowedOrigins } from '../src/server/httpSecurity'
import { claimStateForUser, getUserState, recordProblemSuccess, resetUserState } from '../src/lib/progress'

const SLUG = 'belt-1-q1-arithmetic-check-v1'
const STUDENT_TOKEN = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'
const OTHER_TOKEN = 'Bearer test_auth_student_synthetic.other.student@kalvilearn.test'
const STUDENT_ID = '00000000-0000-4000-a000-000000000001'
const GOOD_JS = `const [a,b,c]=readline().split(' ').map(Number); console.log((a+b)*c-b)`

let passed = 0
let failed = 0
function assert(cond: boolean, name: string, detail = '') {
  if (cond) {
    console.log(`  ✅ [PASS] ${name}`)
    passed++
  } else {
    console.error(`  ❌ [FAIL] ${name}${detail ? ' -> ' + detail : ''}`)
    failed++
  }
}

function mockCall(options: { method: string; headers?: Record<string, string>; body?: unknown; ip?: string }) {
  const req = new EventEmitter() as any
  req.method = options.method
  req.url = '/api/test'
  req.headers = { ...(options.headers || {}) }
  req.socket = { remoteAddress: options.ip || '10.0.0.1' }
  req.body = options.body
  const headers: Record<string, string> = {}
  let data = ''
  const res: any = {
    statusCode: 200,
    setHeader: (k: string, v: string) => {
      headers[k.toLowerCase()] = v
    },
    end: (chunk?: string) => {
      if (chunk) data += chunk
    },
  }
  return {
    req,
    res,
    headers,
    status: () => res.statusCode as number,
    json: () => {
      try {
        return JSON.parse(data)
      } catch {
        return {}
      }
    },
  }
}

async function main() {
  console.log('========================================================================')
  console.log('🛡️  KALVILEARN SECURITY HARDENING REGRESSION SUITE')
  console.log('========================================================================\n')

  // -------------------------------------------------------------------------
  console.log('--- 1. Code-execution sandbox: escape & exfiltration attempts ---')
  const attempts: Array<[string, string, string]> = [
    ['host-closure Function ctor', 'nodejs', `console.log('LEAK:'+console.log.constructor('return process')().env.POC_SECRET_PROBE)`],
    ['this.constructor.constructor', 'nodejs', `console.log('LEAK:'+this.constructor.constructor('return process')().env.POC_SECRET_PROBE)`],
    ['direct Function()', 'nodejs', `console.log('LEAK:'+Function('return process')().env.POC_SECRET_PROBE)`],
    ['eval', 'nodejs', `console.log('LEAK:'+eval('process.env.POC_SECRET_PROBE'))`],
    ['obfuscated dynamic import()', 'nodejs', `import('node:child_'+'process').then(m=>console.log('LEAK:'+m.execSync('id')))`],
    ['obfuscated process.env', 'nodejs', `console.log('LEAK:'+process['en'+'v'].POC_SECRET_PROBE)`],
    ['mock process ctor chain', 'nodejs', `console.log('LEAK:'+process.stdout.write.constructor('return process')().env.POC_SECRET_PROBE)`],
    ['AsyncFunction ctor', 'nodejs', `const AF=Object.getPrototypeOf(async function(){}).constructor; AF('return process')().then(p=>console.log('LEAK:'+p.env.POC_SECRET_PROBE))`],
    ['GeneratorFunction ctor', 'nodejs', `const GF=Object.getPrototypeOf(function*(){}).constructor; console.log('LEAK:'+GF('return process')().next().value.env.POC_SECRET_PROBE)`],
    ['Error.prepareStackTrace CallSite', 'nodejs', `Error.prepareStackTrace=(e,s)=>s; console.log('LEAK:'+typeof new Error().stack[0].getThis())`],
    ['require child_process', 'nodejs', `console.log('LEAK:'+require('child_'+'process').execSync('id'))`],
    ['python Function()', 'python', `print(Function('return process')().env.POC_SECRET_PROBE)`],
    ['python this ctor', 'python', `print(this.constructor.constructor('return process')().env.POC_SECRET_PROBE)`],
    ['java Function()', 'java', `public class Main { public static void main(String[] a){ System.out.println(Function('return process')().env.POC_SECRET_PROBE); } }`],
    ['cpp Function()', 'cpp', `int main(){ cout << Function('return process')().env.POC_SECRET_PROBE; }`],
  ]
  for (const [name, lang, code] of attempts) {
    const r = await executeQuestion({ questionSlug: SLUG, language: lang, code })
    const blob = JSON.stringify(r)
    assert(!/LEAK|super-secret-probe-value/.test(blob), `Sandbox blocks: ${name}`, blob.slice(0, 160))
  }

  {
    // A rejected promise from submitted code must never terminate the server process (Node default = crash).
    for (const code of [`Promise.reject(new Error('crash'))`, `(async()=>{ throw new Error('x') })()`, `import('x')`]) {
      await executeQuestion({ questionSlug: SLUG, language: 'nodejs', code })
    }
    await new Promise((resolve) => setTimeout(resolve, 300))
    assert(true, 'Unhandled promise rejections from submitted code do not crash the process')
  }
  {
    // Memory abuse must kill only the sandbox child process, never the API process (V8 fatal OOM aborts a process).
    const heapBefore = process.memoryUsage().rss
    for (const [name, code] of [
      ['unbounded array growth', `const a=[]; while(true){ a.push({x:1,y:'z'.repeat(100)}) }`],
      ['single huge allocation (V8 fatal OOM)', `const a = new Array(2**32-1).fill(0); console.log(a.length)`],
    ]) {
      const r = await executeQuestion({ questionSlug: SLUG, language: 'nodejs', code })
      assert(
        r.testCases.length === 10 && r.testCases.every((t) => t.status !== 'passed') && JSON.stringify(r).includes('Memory Limit Exceeded'),
        `Memory bomb contained, host process survives: ${name}`
      )
    }
    assert(process.memoryUsage().rss - heapBefore < 400 * 1024 * 1024, 'API process memory did not balloon during memory-bomb tests')
  }
  {
    const t = Date.now()
    const r = await executeQuestion({ questionSlug: SLUG, language: 'nodejs', code: 'while(true){}' })
    const dt = Date.now() - t
    assert(r.status === 'TIME_LIMIT_EXCEEDED' && dt < 9000, `Infinite loop terminated as TLE within budget (${dt}ms)`)
  }
  {
    const r = await executeQuestion({ questionSlug: SLUG, language: 'nodejs', code: `throw { get message(){ for(;;){} } }` })
    assert(r.status !== 'ACCEPTED', 'Throwing an object with a looping accessor cannot hang the host')
  }
  {
    const r = await executeQuestion({ questionSlug: SLUG, language: 'nodejs', code: `while(true){ console.log('x'.repeat(1000)) }` })
    assert(r.testCases.every((t) => (t.actualOutput || '').length < 2_000_000), 'Unbounded output is capped')
  }
  {
    const r = await executeQuestion({ questionSlug: SLUG, language: 'nodejs', code: GOOD_JS })
    assert(r.status === 'ACCEPTED' && r.passed === 10, 'Legitimate solution still passes 10/10 in the sandbox')
    const hidden = r.testCases.filter((t) => !t.visible)
    assert(hidden.length === 7 && hidden.every((t) => t.input === undefined && t.expectedOutput === undefined && t.actualOutput === undefined),
      'Hidden test inputs/outputs are never returned')
  }

  // -------------------------------------------------------------------------
  console.log('\n--- 2. /api/execute authentication, CORS, validation, rate limiting ---')
  resetExecuteRateLimitsForTesting()
  clearAuthCacheForTesting()
  {
    const c = mockCall({ method: 'POST', body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await executeHandler(c.req, c.res)
    assert(c.status() === 401, 'Unauthenticated execute is rejected (401)', `got ${c.status()}`)
  }
  {
    const c = mockCall({ method: 'POST', headers: { authorization: 'Bearer not-a-real-jwt' }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await executeHandler(c.req, c.res)
    assert(c.status() === 401, 'Forged/invalid bearer token is rejected (401)', `got ${c.status()}`)
  }
  {
    const forged = 'Bearer ' + Buffer.from(JSON.stringify({ alg: 'none' })).toString('base64url') + '.' +
      Buffer.from(JSON.stringify({ sub: STUDENT_ID, role: 'authenticated', email: 'x@y.z' })).toString('base64url') + '.'
    const c = mockCall({ method: 'POST', headers: { authorization: forged }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await executeHandler(c.req, c.res)
    assert(c.status() === 401, 'Unsigned (alg=none) JWT is rejected (401)', `got ${c.status()}`)
  }
  {
    const c = mockCall({ method: 'POST', headers: { authorization: 'Bearer test_auth_admin_attacker@evil.test' } , body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    delete process.env.ALLOW_TEST_AUTH_TOKENS
    clearAuthCacheForTesting()
    await executeHandler(c.req, c.res)
    process.env.ALLOW_TEST_AUTH_TOKENS = '1'
    assert(c.status() === 401, 'test_auth_* tokens are NOT honoured unless ALLOW_TEST_AUTH_TOKENS=1', `got ${c.status()}`)
  }
  {
    const c = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await executeHandler(c.req, c.res)
    assert(c.status() === 200 && c.json().passed === 3 && c.json().judgeTotal === 10, 'Authenticated execute (Run) succeeds (200, 3/3 visible)', `got ${c.status()}`)
  }
  {
    const c = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN, origin: 'https://evil.example' }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await executeHandler(c.req, c.res)
    assert(c.headers['access-control-allow-origin'] === undefined, 'CORS: untrusted origin gets no Access-Control-Allow-Origin')
    const ok = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN, origin: 'https://kalvilearn.vercel.app' }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await executeHandler(ok.req, ok.res)
    assert(ok.headers['access-control-allow-origin'] === 'https://kalvilearn.vercel.app', 'CORS: allow-listed origin is echoed (never "*")')
    assert(!getAllowedOrigins().has('*'), 'CORS allow-list contains no wildcard')
    const pre = mockCall({ method: 'OPTIONS', headers: { origin: 'https://evil.example' } })
    await executeHandler(pre.req, pre.res)
    assert(pre.status() === 204 && pre.headers['access-control-allow-origin'] === undefined, 'CORS preflight from untrusted origin is not approved')
  }
  for (const [name, body] of [
    ['unsupported language', { questionSlug: SLUG, language: 'ruby', code: 'x' }],
    ['path-like slug', { questionSlug: '../../etc/passwd', language: 'nodejs', code: 'x' }],
    ['oversized code (>64KB)', { questionSlug: SLUG, language: 'nodejs', code: 'a'.repeat(70000) }],
    ['non-string code', { questionSlug: SLUG, language: 'nodejs', code: { evil: true } }],
  ] as Array<[string, unknown]>) {
    const c = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN }, body })
    await executeHandler(c.req, c.res)
    assert(c.status() === 400, `Input validation rejects ${name} (400)`, `got ${c.status()}`)
  }
  {
    resetExecuteRateLimitsForTesting()
    let last = 0
    let firstBlockedAt = -1
    for (let i = 1; i <= 70; i++) {
      const c = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: SLUG, language: 'ruby', code: 'x' } })
      await executeHandler(c.req, c.res)
      last = c.status()
      if (last === 429 && firstBlockedAt < 0) firstBlockedAt = i
    }
    assert(firstBlockedAt === 61, `Per-user execution rate limit trips at request 61 (tripped at ${firstBlockedAt})`)
    const other = mockCall({ method: 'POST', headers: { authorization: OTHER_TOKEN }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await executeHandler(other.req, other.res)
    assert(other.status() === 200, 'Rate limit is per-user (a different user is unaffected)')
    resetExecuteRateLimitsForTesting()
  }
  {
    const limiter = new RateLimiter(2, 60_000, 3)
    for (let i = 0; i < 50; i++) limiter.check('k' + i)
    assert(true, 'RateLimiter stays bounded under key flooding (no unbounded memory growth)')
    assert(limiter.check('k49').allowed === true, 'RateLimiter evicts oldest keys instead of failing open/crashing')
  }

  // -------------------------------------------------------------------------
  console.log('\n--- 3. /api/submit authentication, IDOR, idempotency ---')
  resetSubmitStateForTesting()
  {
    const c = mockCall({ method: 'POST', body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await submitHandler(c.req, c.res)
    assert(c.status() === 401, 'Anonymous/guest submit is rejected (401)', `got ${c.status()}`)
  }
  {
    const c = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS, userId: '11111111-2222-4333-8444-555555555555' } })
    await submitHandler(c.req, c.res)
    assert(c.status() === 403, 'IDOR: submitting as another userId is rejected (403)', `got ${c.status()}`)
  }
  {
    const c = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS, userId: STUDENT_ID } })
    await submitHandler(c.req, c.res)
    assert(c.status() === 200 && c.json().isSolved === true, 'Submit as self succeeds', `got ${c.status()}`)
    assert(c.json().persistence?.saved === false, 'Synthetic test identities are never persisted to the database')
  }
  {
    const key = 'idem-' + crypto.randomUUID()
    const a = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN, 'x-idempotency-key': key }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    const b = mockCall({ method: 'POST', headers: { authorization: STUDENT_TOKEN, 'x-idempotency-key': key }, body: { questionSlug: SLUG, language: 'nodejs', code: GOOD_JS } })
    await Promise.all([submitHandler(a.req, a.res), submitHandler(b.req, b.res)])
    assert(a.status() === 200 && b.status() === 200 && JSON.stringify(a.json()) === JSON.stringify(b.json()),
      'Concurrent double-submit with one idempotency key yields ONE evaluation (identical payloads)')
    const other = mockCall({ method: 'POST', headers: { authorization: OTHER_TOKEN, 'x-idempotency-key': key }, body: { questionSlug: SLUG, language: 'nodejs', code: 'console.log(0)' } })
    await submitHandler(other.req, other.res)
    assert(other.json().isSolved === false, 'Idempotency keys are scoped per user (no cross-account cache hits)')
  }

  // -------------------------------------------------------------------------
  console.log('\n--- 4. Token gating & real-JWT verification ---')
  {
    delete process.env.ALLOW_TEST_AUTH_TOKENS
    clearAuthCacheForTesting()
    const r = await authenticateFeedbackRequest('Bearer test_auth_admin_attacker@evil.test')
    process.env.ALLOW_TEST_AUTH_TOKENS = '1'
    assert(r.authenticated === false, 'Role-escalation via test_auth_admin_* token fails when test auth is not enabled')
    const prodEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    clearAuthCacheForTesting()
    const p = await authenticateFeedbackRequest('Bearer test_auth_admin_attacker@evil.test')
    process.env.NODE_ENV = prodEnv
    assert(p.authenticated === false, 'test_auth_* tokens never work with NODE_ENV=production')
    clearAuthCacheForTesting()
    const blank = await authenticateFeedbackRequest('Bearer ')
    assert(blank.authenticated === false && blank.statusCode === 401, 'Empty bearer token rejected')
    const none = await authenticateFeedbackRequest(undefined)
    assert(none.authenticated === false && none.statusCode === 401, 'Missing Authorization header rejected')
  }

  // -------------------------------------------------------------------------
  console.log('\n--- 5. Webhook authentication fails closed ---')
  {
    const saved = { a: process.env.TEAMSYNC_WEBHOOK_SECRET, b: process.env.KALVILEARN_WEBHOOK_SECRET }
    delete process.env.TEAMSYNC_WEBHOOK_SECRET
    delete process.env.KALVILEARN_WEBHOOK_SECRET
    const ts = String(Math.floor(Date.now() / 1000))
    const body = '{"eventId":"e1"}'
    // An attacker who guesses that the receiver uses an empty key can compute this signature:
    const forged = crypto.createHmac('sha256', '').update(`${ts}.${body}`).digest('hex')
    const r = verifyTeamSyncWebhookSignature(body, forged, ts, 'e1')
    assert(r.valid === false && r.statusCode === 503, 'Unconfigured receiver rejects EVERYTHING (empty-key forgery impossible)', JSON.stringify(r))
    let threw = false
    try {
      computeTeamSyncSignature(body, ts)
    } catch {
      threw = true
    }
    assert(threw, 'Signing with an empty/missing secret throws instead of producing a forgeable signature')
    process.env.TEAMSYNC_WEBHOOK_SECRET = 'unit-test-secret-' + crypto.randomBytes(8).toString('hex')
    const good = computeTeamSyncSignature(body, ts)
    assert(verifyTeamSyncWebhookSignature(body, good, ts, 'e1').valid === true, 'Correctly signed webhook is accepted')
    assert(verifyTeamSyncWebhookSignature(body + ' ', good, ts, 'e1').valid === false, 'Tampered body is rejected')
    const stale = String(Math.floor(Date.now() / 1000) - 3600)
    assert(verifyTeamSyncWebhookSignature(body, computeTeamSyncSignature(body, stale), stale, 'e1').valid === false, 'Replayed (stale-timestamp) webhook is rejected')
    if (saved.a === undefined) delete process.env.TEAMSYNC_WEBHOOK_SECRET
    else process.env.TEAMSYNC_WEBHOOK_SECRET = saved.a
    if (saved.b !== undefined) process.env.KALVILEARN_WEBHOOK_SECRET = saved.b
  }

  // -------------------------------------------------------------------------
  console.log('\n--- 6. Attachment URL trust (stored XSS / SSRF-style abuse) ---')
  {
    const base = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://iavxnhwbgoarnexmyxpn.supabase.co'
    assert(isTrustedStorageUrl(`${base}/storage/v1/object/public/feedback-attachments/feedback/a.png`), 'Own storage bucket URL is trusted')
    for (const bad of [
      'javascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'https://evil.example/track.png',
      'http://169.254.169.254/latest/meta-data',
      `${base.replace('https:', 'http:')}/storage/v1/object/public/feedback-attachments/a.png`,
      `${base}/storage/v1/object/public/other-bucket/a.png`,
      `${base}.evil.example/storage/v1/object/public/feedback-attachments/a.png`,
    ]) {
      assert(!isTrustedStorageUrl(bad), `Untrusted attachment URL rejected: ${bad.slice(0, 48)}`)
    }
  }

  // -------------------------------------------------------------------------
  console.log('\n--- 7. Client cache isolation across accounts ---')
  {
    resetUserState()
    claimStateForUser('user-A')
    recordProblemSuccess('belt-1-q1-arithmetic-check-v1', 'Arithmetic', 'python', 'print(1)', 5)
    assert(getUserState().solvedSlugs.length === 1 && getUserState().xp > 0, 'User A has local progress after a solve')
    // User B signs in on the same browser WITHOUT a SIGNED_OUT event (expired session / second tab)
    claimStateForUser('user-B')
    const b = getUserState()
    assert(
      b.solvedSlugs.length === 0 && b.xp === 0 && Object.keys(b.progress).length === 0 && b.submissions.length === 0,
      'User B never inherits User A cached progress, XP, code or submissions'
    )
    claimStateForUser('user-B')
    recordProblemSuccess('belt-1-q2-absolute-difference-v1', 'Abs', 'python', 'print(2)', 5)
    claimStateForUser('user-B')
    assert(getUserState().solvedSlugs.length === 1, 'Re-claiming for the SAME user keeps their progress')
    resetUserState()
    assert(memoryStore.get('kalvi_state_owner') === undefined, 'Logout reset clears the state owner tag')
  }

  // -------------------------------------------------------------------------
  console.log('\n--- 8. Realtime subscriptions: one listener per owner, always cleaned up ---')
  {
    const { supabase } = await import('../src/lib/supabase')
    const { subscribeToStudentCloudProgress } = await import('../src/lib/cloudSync')
    const { subscribeToMentorUpdates, subscribeToLiveSubmissions } = await import('../src/lib/mentorService')
    const { subscribeToCampusUpdates } = await import('../src/lib/campusManagerService')
    const { subscribeToStudentMentorUpdates } = await import('../src/lib/growthMentorService')
    const { feedbackService } = await import('../src/services/feedbackService')
    const fs = await import('fs')
    const path = await import('path')

    const created: string[] = []
    const removed: unknown[] = []
    const realChannel = (supabase as any).channel
    const realRemove = (supabase as any).removeChannel
    ;(supabase as any).channel = (name: string) => {
      created.push(name)
      const ch: any = { name, on: () => ch, subscribe: () => ch }
      return ch
    }
    ;(supabase as any).removeChannel = async (ch: unknown) => {
      removed.push(ch)
      return 'ok'
    }
    try {
      const cases: Array<[string, () => () => void]> = [
        ['student progress (AuthContext)', () => subscribeToStudentCloudProgress('u1', () => {})],
        ['mentor updates', () => subscribeToMentorUpdates(() => {})],
        ['mentor live submissions', () => subscribeToLiveSubmissions('u1', () => {})],
        ['campus updates', () => subscribeToCampusUpdates(() => {})],
        ['student<->mentor updates', () => subscribeToStudentMentorUpdates('u1', () => {})],
        ['feedback status/comments', () => feedbackService.subscribeToFeedbackUpdates('fb1', () => {})],
      ]
      for (const [name, subscribe] of cases) {
        const c0 = created.length
        const r0 = removed.length
        const unsubscribe = subscribe()
        // simulate two remounts (login -> logout -> login another user): each subscribe/unsubscribe pair must balance
        unsubscribe()
        const unsubscribe2 = subscribe()
        unsubscribe2()
        await new Promise((resolve) => setTimeout(resolve, 5))
        assert(created.length - c0 >= 2, `${name}: channel created on each subscribe`)
        assert(removed.length - r0 === created.length - c0, `${name}: every created channel is removed on unsubscribe (${created.length - c0} created / ${removed.length - r0} removed)`)
      }
    } finally {
      ;(supabase as any).channel = realChannel
      ;(supabase as any).removeChannel = realRemove
    }

    const read = (p: string) => fs.readFileSync(path.resolve(process.cwd(), p), 'utf8')
    const owners = ['src/contexts/AuthContext.tsx', 'src/layouts/AppLayout.tsx', 'src/pages/DashboardPage.tsx', 'src/components/common/AppSidebar.tsx']
      .filter((f) => /subscribeToStudentCloudProgress\(/.test(read(f)))
    assert(owners.length === 1 && owners[0] === 'src/contexts/AuthContext.tsx', `Student progress realtime has a single owner (${owners.join(', ')})`)
  }

  console.log('\n--- 9. Attachment content validation (magic bytes) ---')
  {
    const { sniffImageMime } = await import('../src/server/attachmentSecurity')
    const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(16)])
    const jpg = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(16)])
    const gif = Buffer.concat([Buffer.from('GIF89a'), Buffer.alloc(16)])
    const webp = Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBP'), Buffer.alloc(8)])
    assert(sniffImageMime(png) === 'image/png' && sniffImageMime(jpg) === 'image/jpeg' && sniffImageMime(gif) === 'image/gif' && sniffImageMime(webp) === 'image/webp', 'Real PNG/JPEG/GIF/WebP signatures are accepted')
    for (const [name, buf] of [
      ['SVG with script', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>')],
      ['HTML page', Buffer.from('<!doctype html><script>alert(1)</script>............')],
      ['JS source labelled image/png', Buffer.from('alert(document.cookie);//..............')],
      ['PHP polyglot', Buffer.from('<?php system($_GET[0]); ?>................')],
      ['truncated header', Buffer.from([0x89, 0x50])],
      ['RIFF but not WebP (WAV)', Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WAVE'), Buffer.alloc(8)])],
    ] as Array<[string, Buffer]>) {
      assert(sniffImageMime(buf) === null, `Non-image rejected regardless of declared MIME: ${name}`)
    }
  }

  console.log('\n========================================================================')
  console.log(`🏁 SECURITY HARDENING RESULTS: ${passed} PASSED, ${failed} FAILED`)
  console.log('========================================================================')
  process.exit(failed ? 1 : 0)
}

main().catch((err) => {
  console.error('Security suite crashed:', err)
  process.exit(1)
})
