/**
 * Local-only audit reproductions. Executes the repository's TypeScript functions
 * in a VM with in-memory storage and explicit service stubs. No network or DB
 * credentials are read. Run: node docs/audit-2026-10-20/frontend-reproduction.cjs
 */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

const root = path.resolve(__dirname, '..', '..')
const storage = new Map()
const localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
}
const modules = new Map()
const stubs = new Map()
const effects = []
const quietConsole = { ...console, warn() {}, error() {} }
const react = {
  createContext: () => ({}),
  useEffect: (effect) => effects.push(effect),
  useState: (initial) => [typeof initial === 'function' ? initial() : initial, () => {}],
}
stubs.set('react', react)
stubs.set('react/jsx-runtime', { jsx: () => null, jsxs: () => null })
stubs.set('react-router-dom', { useNavigate: () => () => {} })
stubs.set('@/components/common/BrandLogo', {})
const supabaseStub = { auth: {}, from() { throw Error('Unexpected database request') } }
stubs.set('src/lib/supabase.ts', { supabase: supabaseStub })
stubs.set('src/lib/runner/workerRunner.ts', {})

function load(relative, append = '') {
  const file = relative.replaceAll('\\', '/')
  if (stubs.has(file)) return stubs.get(file)
  if (modules.has(file)) return modules.get(file)
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
  const module = { exports: {} }
  modules.set(file, module.exports)
  const source = fs.readFileSync(path.join(root, file), 'utf8')
    .replaceAll('import.meta', '({ env: {} })') + append
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: file,
  }).outputText
  function scopedRequire(request) {
    if (stubs.has(request)) return stubs.get(request)
    let candidate
    if (request.startsWith('@/')) candidate = `src/${request.slice(2)}`
    else if (request.startsWith('.')) candidate = path.posix.normalize(path.posix.join(path.posix.dirname(file), request))
    else throw Error(`Dependency must be explicitly stubbed: ${request}`)
    if (!/\.(tsx?|json)$/.test(candidate)) {
      candidate += fs.existsSync(path.join(root, candidate + '.ts')) ? '.ts' : '.tsx'
    }
    return load(candidate)
  }
  const context = {
    module, exports: module.exports, require: scopedRequire,
    localStorage, console: quietConsole, Date, Intl, URLSearchParams,
    // Prevent pending UI redirect/timeout timers from prolonging this local check.
    setTimeout: () => 1, clearTimeout() {}, performance,
    fetch: () => { throw Error('Network access is prohibited in audit reproduction') },
  }
  vm.runInNewContext(output, context, { filename: file })
  modules.set(file, module.exports)
  return module.exports
}

async function main() {
  const results = []
  const progress = load('src/lib/progress.ts')
  function setup() {
    storage.clear()
    localStorage.setItem('kalvi_active_user', JSON.stringify({ id: 'audit-user' }))
    progress.claimStateForUser('audit-user')
  }

  // An unsuccessful cloud read must not mean the account has no progress.
  setup()
  progress.recordProblemSuccess('audit-problem', 'Audit Problem', 'python', 'print(1)', 10)
  stubs.set('src/lib/cloudSync.ts', { fetchUserProgressFromCloud: async () => null })
  stubs.set('src/lib/authService.ts', {})
  const auth = load('src/contexts/AuthContext.tsx', '\nexport { syncUserData };\n')
  const before = progress.getUserState().solvedSlugs.length
  await auth.syncUserData('audit-user')
  const after = progress.getUserState().solvedSlugs.length
  assert.equal(before, 1)
  assert.equal(after, 0)
  results.push({ check: 'cloud_failure_erases_cache', before, after, reproduced: true })

  // The database uses a UUID; the local recorder synthesizes a different id.
  setup()
  progress.recordProblemSuccess('audit-problem', 'Audit Problem', 'python', 'print(1)', 10)
  const local = progress.getUserState()
  const cloudSubmission = { ...local.submissions[0], id: 'b43bf50a-7b7c-43f0-abf0-bb975a80b5d6' }
  progress.hydrateStateFromCloud({ ...local, submissions: [cloudSubmission] })
  assert.equal(progress.getUserState().submissions.length, 2)
  results.push({
    check: 'single_submission_duplicated_after_cloud_hydration',
    logicalSubmissions: 1,
    displayedSubmissions: progress.getUserState().submissions.length,
    reproduced: true,
  })

  // Removing one solved record on the server does not revoke it in a warm cache.
  setup()
  progress.recordProblemSuccess('removed-problem', 'Removed Problem', 'python', 'print(1)', 10)
  const cloudRecord = {
    problemId: 'kept-problem', problemSlug: 'kept-problem', status: 'SOLVED',
    language: 'python', bestCode: 'print(2)', attempts: 1, solvedAt: new Date().toISOString(),
  }
  progress.hydrateStateFromCloud({
    xp: 50, streak: 1, solvedSlugs: ['kept-problem'],
    progress: { 'python:kept-problem': cloudRecord }, submissions: [],
  })
  assert.equal(progress.getUserState().solvedSlugs.length, 2)
  results.push({
    check: 'cloud_removed_solve_survives_local_merge',
    cloudSolved: 1, cachedSolved: progress.getUserState().solvedSlugs.length,
    reproduced: true,
  })

  // Evaluation acceptance explicitly ignores an unsuccessful persistence result.
  const runner = load('src/lib/runner/codeRunner.ts')
  const accepted = runner.isAuthoritativeAccept({
    mode: 'submit', passed: true, passedCount: 10, totalCount: 10, judgeTotal: 10,
    results: Array.from({ length: 10 }, (_, i) => ({
      testIndex: i + 1, passed: true, status: 'passed', isHidden: i > 2, executionTimeMs: 1,
    })),
    overallTimeMs: 10,
    persistence: { saved: false, progressUpdated: false, xpEarned: 0, reason: 'storage_error' },
  }, true)
  assert.equal(accepted, true)
  results.push({ check: 'storage_failure_still_qualifies_for_local_xp_and_celebration', accepted, reproduced: true })

  // A delayed valid OAuth user is obtained but discarded by AuthCallbackPage.
  setup()
  effects.length = 0
  let verifiedEmail = null
  let signedOut = false
  supabaseStub.auth.getSession = async () => ({ data: { session: null }, error: null })
  supabaseStub.auth.onAuthStateChange = (callback) => {
    queueMicrotask(() => callback('SIGNED_IN', { user: { id: 'auth-id', email: 'valid@example.test' } }))
    return { data: { subscription: { unsubscribe() {} } } }
  }
  stubs.set('src/lib/authService.ts', {
    verifyUserInDatabase: async (email) => {
      verifiedEmail = email
      return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
    },
    signOutUser: async () => { signedOut = true },
  })
  const callback = load('src/pages/auth/AuthCallbackPage.tsx')
  callback.AuthCallbackPage()
  effects[0]()
  await new Promise(setImmediate)
  assert.equal(verifiedEmail, '')
  assert.equal(signedOut, true)
  results.push({
    check: 'delayed_oauth_user_discarded',
    receivedEmail: 'valid@example.test', verifiedEmail, signedOut, reproduced: true,
  })

  // Supabase returns database failures in the `error` property; it does not
  // reject by default. The unassignment branch currently ignores this error.
  const campus = load('src/lib/campusManagerService.ts')
  supabaseStub.from = () => {
    const query = {
      update() { return query },
      eq() { return query },
      then(resolve, reject) {
        return Promise.resolve({
          data: null, error: { code: '42501', message: 'Audit simulated access denial' },
        }).then(resolve, reject)
      },
    }
    return query
  }
  const unassign = await campus.assignStudentMentor('student-id', null)
  assert.equal(unassign.success, true)
  results.push({
    check: 'campus_unassignment_reports_success_on_database_error',
    injectedDatabaseError: '42501',
    reportedSuccess: unassign.success, reproduced: true,
  })

  // In-memory model of the declared UNIQUE(mentor_id, student_id) constraint.
  // This is a source-contract test, not a live database assertion.
  const existingLink = { id: 'existing-link', mentor_id: 'mentor-id', student_id: 'student-id', status: 'ACTIVE' }
  supabaseStub.from = (table) => {
    assert.equal(table, 'mentor_students')
    let operation, payload
    const filters = []
    const query = {
      update(value) { operation = 'update'; payload = value; return query },
      upsert(value, options) {
        operation = 'upsert'; payload = value
        assert.equal(options, undefined)
        return query
      },
      eq(column, value) { filters.push([column, value]); return query },
      then(resolve, reject) {
        let response
        if (operation === 'update') {
          if (filters.every(([key, value]) => existingLink[key] === value)) {
            Object.assign(existingLink, payload)
          }
          response = { data: null, error: null }
        } else if (payload.mentor_id === existingLink.mentor_id && payload.student_id === existingLink.student_id) {
          response = { data: null, error: { code: '23505', message: 'Duplicate mentor/student pair' } }
        } else {
          response = { data: null, error: null }
        }
        return Promise.resolve(response).then(resolve, reject)
      },
    }
    return query
  }
  const reassign = await campus.assignStudentMentor('student-id', 'mentor-id')
  assert.equal(reassign.success, false)
  assert.equal(existingLink.status, 'INACTIVE')
  results.push({
    check: 'same_mentor_reassignment_deactivates_then_fails_unique_constraint',
    reportedSuccess: reassign.success, remainingLinkStatus: existingLink.status,
    evidence: 'Actual service function against an in-memory model of schema.prisma unique constraint',
    reproduced: true,
  })

  console.log(JSON.stringify({
    scope: 'Repository source, VM-isolated execution, mocked storage/auth, zero external requests',
    results,
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
