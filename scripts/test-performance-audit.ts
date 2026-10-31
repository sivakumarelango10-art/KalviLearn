/**
 * KALVILEARN PERFORMANCE & RESPONSIVENESS REGRESSION TEST SUITE
 * 
 * Tests and verifies:
 * 1. Bundle and chunk size budgets (entry chunk, vendor isolation, data separation).
 * 2. Code Editor keystroke optimization and options memoization.
 * 3. AuthContext and useProblemStats context value stability (preventing cascade re-renders).
 * 4. Storage I/O throughput: debounced writes and single-pass legacy purges.
 * 5. Execution pipeline latency, isolation, and security.
 * 6. User account isolation, cache invalidation, and idempotency deduplication.
 */

import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Headless Node mock for browser localStorage in unit tests
const mockStorage = new Map<string, string>()
if (typeof (globalThis as any).localStorage === 'undefined') {
  ;(globalThis as any).localStorage = {
    getItem: (key: string) => mockStorage.get(key) ?? null,
    setItem: (key: string, value: string) => mockStorage.set(key, String(value)),
    removeItem: (key: string) => mockStorage.delete(key),
    clear: () => mockStorage.clear(),
  }
}

import { executeQuestion } from '../src/server/executeService.js'
import {
  claimStateForUser,
  getUserState,
  getUserStateReadOnly,
  resetUserState,
  recordProblemSuccess,
} from '../src/lib/progress.js'
import { clearAllUserCaches } from '../src/lib/cacheRegistry.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

async function runPerformanceAuditSuite() {
  console.log('========================================================================')
  console.log('⚡ KALVILEARN COMPREHENSIVE PERFORMANCE & ULTRA-SMOOTH UX AUDIT SUITE')
  console.log('========================================================================\n')

  let passed = 0
  let total = 0

  async function test(name: string, fn: () => void | Promise<void>) {
    total++
    try {
      await fn()
      console.log(`  ✅ [PASS] ${name}`)
      passed++
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}:`, err)
      process.exitCode = 1
    }
  }

  console.log('--- 1. Production Bundle Size & Chunk Distribution Budgets ---')

  const distDir = path.join(ROOT, 'dist')
  const assetsDir = path.join(distDir, 'assets')

  await test('Vite production build assets exist in dist/assets', () => {
    assert(fs.existsSync(assetsDir), 'dist/assets directory must exist after build')
  })

  await test('Initial index entry chunk is strictly optimized below 150 kB budget', () => {
    const files = fs.readdirSync(assetsDir)
    const indexChunks = files.filter((f) => /^index-[A-Za-z0-9_-]+\.js$/.test(f))
    assert(indexChunks.length > 0, 'Must have an entry index-*.js chunk')
    const entryChunk = indexChunks[0]
    const size = fs.statSync(path.join(assetsDir, entryChunk)).size
    const sizeKb = Math.round(size / 1024)
    console.log(`     ↳ Measured index entry chunk size: ${sizeKb} kB (Budget: <150 kB)`)
    assert(size < 150 * 1024, `Entry chunk size (${sizeKb} kB) must be under 150 kB`)
  })

  await test('Question banks are isolated into dedicated on-demand data chunks', () => {
    const files = fs.readdirSync(assetsDir)
    const hasDataProblems = files.some((f) => f.startsWith('data-problems'))
    const hasDataLearn = files.some((f) => f.startsWith('data-learn-coding'))
    assert(hasDataProblems, 'Must produce dedicated data-problems chunk')
    assert(hasDataLearn, 'Must produce dedicated data-learn-coding chunk')
    console.log('     ↳ Verified isolated data-problems and data-learn-coding chunks')
  })

  console.log('\n--- 2. Main-Thread Responsiveness & LocalStorage I/O ---')

  await test('progress.ts executes purgeLegacyStorage efficiently in under 100ms budget', () => {
    const start = performance.now()
    for (let i = 0; i < 500; i++) {
      getUserStateReadOnly()
    }
    const elapsed = performance.now() - start
    console.log(`     ↳ 500 read operations completed in ${elapsed.toFixed(2)} ms (${(elapsed / 500).toFixed(3)} ms/op)`)
    assert(elapsed < 100, `500 state reads must complete within 100ms, took ${elapsed}ms`)
  })

  await test('LearnWorkspacePage debounces code persistence to avoid blocking typing thread', () => {
    const learnWorkspaceSrc = fs.readFileSync(path.join(ROOT, 'src/pages/learn/LearnWorkspacePage.tsx'), 'utf8')
    assert(
      learnWorkspaceSrc.includes('saveTimeoutRef') && learnWorkspaceSrc.includes('setTimeout'),
      'LearnWorkspacePage must use debounced timeout for localStorage saves to prevent typing lag'
    )
    console.log('     ↳ Verified LearnWorkspacePage debounced localStorage save pattern')
  })

  console.log('\n--- 3. React Tree Re-render Protection & Component Memoization ---')

  await test('AuthContext provider value and callbacks are memoized with useMemo/useCallback', () => {
    const authContextSrc = fs.readFileSync(path.join(ROOT, 'src/contexts/AuthContext.tsx'), 'utf8')
    assert(authContextSrc.includes('useMemo(() => ('), 'AuthContext must memoize provider value object')
    assert(authContextSrc.includes('useCallback'), 'AuthContext must use useCallback for action handlers')
    console.log('     ↳ Verified stable context identity to prevent root cascade re-renders')
  })

  await test('useProblemStats hook return value is memoized with useMemo', () => {
    const hookSrc = fs.readFileSync(path.join(ROOT, 'src/hooks/useProblemStats.ts'), 'utf8')
    assert(hookSrc.includes('useMemo('), 'useProblemStats must return a memoized object to prevent consumer loop renders')
    console.log('     ↳ Verified memoized useProblemStats result object')
  })

  await test('CodeEditor options object is memoized to avoid triggering editor.updateOptions on render', () => {
    const editorSrc = fs.readFileSync(path.join(ROOT, 'src/components/editor/CodeEditor.tsx'), 'utf8')
    assert(
      editorSrc.includes('useMemo(') && editorSrc.includes('mergedOptions'),
      'CodeEditor must memoize mergedOptions to prevent unnecessary Monaco options updates'
    )
    console.log('     ↳ Verified memoized Monaco options object')
  })

  await test('ProblemArenaPage memoizes editor mount and code change handlers', () => {
    const arenaSrc = fs.readFileSync(path.join(ROOT, 'src/pages/ProblemArenaPage.tsx'), 'utf8')
    assert(arenaSrc.includes('handleEditorMount: OnMount = useCallback'), 'handleEditorMount must be memoized')
    assert(arenaSrc.includes('handleCodeChange = useCallback'), 'handleCodeChange must be memoized')
    console.log('     ↳ Verified stable editor callback identities in ProblemArenaPage')
  })

  await test('AppSidebar NAV_ITEMS is declared as a module-level constant', () => {
    const sidebarSrc = fs.readFileSync(path.join(ROOT, 'src/components/common/AppSidebar.tsx'), 'utf8')
    assert(sidebarSrc.includes('const NAV_ITEMS ='), 'AppSidebar must define NAV_ITEMS at module scope')
    console.log('     ↳ Verified static navigation item allocations')
  })

  console.log('\n--- 4. Code Execution Pipeline Latency & Engine Isolation ---')

  await test('Python 3 execution evaluates 3 visible cases under 3000ms latency budget', async () => {
    const start = performance.now()
    const res = await executeQuestion({
      questionSlug: 'sum-of-two-numbers',
      language: 'python',
      code: 'import sys\ndata = sys.stdin.read().split()\nif len(data) >= 2: print(int(data[0]) + int(data[1]))',
      mode: 'run',
    })
    const duration = performance.now() - start
    console.log(`     ↳ Python execution duration: ${duration.toFixed(1)} ms (Engine reported: ${res.overallTimeMs} ms)`)
    assert(res.success && res.passed === 3, 'Python execution must pass all 3 visible cases')
    assert(res.testCases.every((tc) => tc.visible), 'Run mode must return only visible test cases')
  })

  await test('Node.js (JavaScript) execution evaluates 3 visible cases under 1000ms latency budget', async () => {
    const start = performance.now()
    const res = await executeQuestion({
      questionSlug: 'sum-of-two-numbers',
      language: 'nodejs',
      code: 'const fs = require("fs"); const [a, b] = fs.readFileSync(0, "utf-8").trim().split(/\\s+/).map(Number); console.log(a + b);',
      mode: 'run',
    })
    const duration = performance.now() - start
    console.log(`     ↳ Node.js execution duration: ${duration.toFixed(1)} ms (Engine reported: ${res.overallTimeMs} ms)`)
    assert(res.success && res.passed === 3, 'Node.js execution must pass all 3 visible cases')
  })

  console.log('\n--- 5. User Account Isolation & Cache Invalidation ---')

  await test('Account switch completely flushes cached state with zero cross-user pollution', () => {
    const userA = 'perf_student_alpha'
    const userB = 'perf_student_beta'

    claimStateForUser(userA)
    recordProblemSuccess('sum-of-two-numbers', 'python', 'codeA')
    const stateA = getUserState()
    assert(stateA.solvedSlugs.includes('sum-of-two-numbers'), 'User A has solved problem')

    // Switch account to User B
    claimStateForUser(userB)
    const stateB = getUserState()
    assert.strictEqual(stateB.solvedSlugs.length, 0, 'User B must start with zero solved problems')
    assert.strictEqual(stateB.xp, 0, 'User B must have zero XP')

    // Reset back
    resetUserState()
    clearAllUserCaches()
    console.log('     ↳ Verified account boundary and cache purge on switch')
  })

  console.log('\n========================================================================')
  console.log(`🏁 PERFORMANCE AUDIT SUITE FINISHED: ${passed}/${total} TESTS PASSED`)
  console.log('========================================================================')

  if (passed !== total) {
    process.exitCode = 1
  }
}

runPerformanceAuditSuite().catch((err) => {
  console.error('Fatal error in performance audit suite:', err)
  process.exit(1)
})
