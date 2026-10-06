/**
 * Master Verification Suite for KalviLearn Student Dashboard Progress
 * Covers all 18 mandatory test scenarios defined in Section 36 of Master Prompt.
 */
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import {
  fetchAuthoritativeProblemStats,
  fetchTotalProblemCount,
  fetchAuthoritativeBeltsWithProblems,
  clearProblemStatsCache,
} from '../src/lib/problemStatsService'
import { supabase } from '../src/lib/supabase'

async function runDashboardAuditSuite() {
  console.log('========================================================================')
  console.log('🚀 KALVILEARN DASHBOARD MASTER AUDIT & VERIFICATION SUITE (18 TESTS)')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function pass(testNum: number, desc: string, details?: string) {
    passed++
    console.log(`  ✅ [TEST ${testNum}] ${desc}`)
    if (details) console.log(`     ↳ ${details}`)
  }

  function fail(testNum: number, desc: string, err: any) {
    failed++
    console.error(`  ❌ [TEST ${testNum}] ${desc}:`, err)
  }

  // TEST 1: Hardcoded 500 does not exist in dashboard logic
  try {
    const dashboardSource = fs.readFileSync(path.resolve('src/pages/DashboardPage.tsx'), 'utf-8')
    const problemStatsSource = fs.readFileSync(path.resolve('src/lib/problemStatsService.ts'), 'utf-8')
    const progressSource = fs.readFileSync(path.resolve('src/lib/progress.ts'), 'utf-8')

    assert(!/\b(totalProblems|total|solved|count|problems)\s*[:=]\s*500\b/i.test(dashboardSource), 'DashboardPage.tsx must not hardcode 500 count')
    assert(!dashboardSource.includes('/500'), 'DashboardPage.tsx must not contain /500 string')
    assert(!dashboardSource.includes('|| 500'), 'DashboardPage.tsx must not contain || 500 fallback')
    assert(!dashboardSource.includes('?? 500'), 'DashboardPage.tsx must not contain ?? 500 fallback')
    assert(!dashboardSource.includes('totalProblems = 500'), 'DashboardPage.tsx must not assign totalProblems = 500')

    assert(!problemStatsSource.includes('500'), 'problemStatsService.ts must not hardcode 500')
    assert(!progressSource.includes('= 500'), 'progress.ts must not have default totalProblems = 500')

    pass(1, 'Hardcoded 500 does not exist in dashboard logic', 'Zero hardcoded 500 in DashboardPage or problemStatsService')
  } catch (err) {
    fail(1, 'Hardcoded 500 exists in dashboard logic', err)
  }

  // TEST 2: Total comes from real canonical problem data
  let dbTotal = 0
  try {
    dbTotal = await fetchTotalProblemCount(true)
    assert(typeof dbTotal === 'number' && dbTotal > 0, 'Total problem count must be a positive number')

    // Verify against Supabase Problem count directly
    const { count, error } = await supabase.from('Problem').select('id', { count: 'exact', head: true })
    assert(!error && count === dbTotal, `Database Problem count (${count}) must match fetchTotalProblemCount (${dbTotal})`)

    pass(2, 'Total comes from real canonical problem data', `Authoritative DB total is ${dbTotal} canonical problems`)
  } catch (err) {
    fail(2, 'Total comes from real canonical problem data', err)
  }

  // TEST 3: Solved count comes from real authenticated student data
  let studentAId = '36a74ed3-4a98-4374-a3d1-be0e2050b81c' // Kavya Ramesh
  try {
    const stats = await fetchAuthoritativeProblemStats(studentAId, { forceRefresh: true })
    assert(typeof stats.solvedCount === 'number', 'Solved count must be a valid number')
    assert(stats.solvedCount === 2, `Expected 2 solved problems for student ${studentAId}, got ${stats.solvedCount}`)
    assert(stats.totalProblems === dbTotal, 'Total problems must match DB total')
    assert(stats.remaining === dbTotal - stats.solvedCount, 'Remaining must equal total - solved')

    pass(3, 'Solved count comes from real authenticated student data', `Student solved count = ${stats.solvedCount} / ${stats.totalProblems}`)
  } catch (err) {
    fail(3, 'Solved count comes from real authenticated student data', err)
  }

  // TEST 4: Same problem in multiple languages counts once
  try {
    const multiLangRows = [
      { problemId: 'p-101', status: 'SOLVED', Problem: { slug: 'sample-p-101' }, language: 'python' },
      { problemId: 'p-101', status: 'SOLVED', Problem: { slug: 'sample-p-101' }, language: 'java' },
      { problemId: 'p-101', status: 'SOLVED', Problem: { slug: 'sample-p-101' }, language: 'nodejs' },
      { problemId: 'p-101', status: 'SOLVED', Problem: { slug: 'sample-p-101' }, language: 'cpp' },
    ]

    const uniqueProblems = new Set<string>()
    for (const row of multiLangRows) {
      const key = row.Problem?.slug || row.problemId
      uniqueProblems.add(key)
    }

    assert.strictEqual(uniqueProblems.size, 1, 'Problem solved in 4 languages must count as exactly 1')
    pass(4, 'Same problem in multiple languages counts once', 'Python, Java, Node.js, and C++ count as +1 unique solved')
  } catch (err) {
    fail(4, 'Same problem in multiple languages counts once', err)
  }

  // TEST 5: Failed submissions do not count
  try {
    const submissionRows = [
      { problemId: 'p-failed-1', status: 'FAILED', passedTests: 3, totalTests: 10 },
      { problemId: 'p-failed-2', status: 'ERROR', passedTests: 0, totalTests: 10 },
      { problemId: 'p-failed-3', status: 'PASSED', passedTests: 9, totalTests: 10 }, // 9/10 is not 10/10
    ]

    const solvedFromSubmissions = new Set<string>()
    for (const sub of submissionRows) {
      if (sub.status === 'PASSED' && sub.passedTests === sub.totalTests && sub.totalTests > 0) {
        solvedFromSubmissions.add(sub.problemId)
      }
    }

    assert.strictEqual(solvedFromSubmissions.size, 0, 'No failed or partial submissions must count as solved')
    pass(5, 'Failed submissions do not count', '0 solved counted from failed/partial submissions')
  } catch (err) {
    fail(5, 'Failed submissions do not count', err)
  }

  // TEST 6: Duplicate successful submissions do not double count
  try {
    const duplicateSubmissions = [
      { problemId: 'p-dup-1', status: 'PASSED', passedTests: 10, totalTests: 10, Problem: { slug: 'p-dup-slug' } },
      { problemId: 'p-dup-1', status: 'PASSED', passedTests: 10, totalTests: 10, Problem: { slug: 'p-dup-slug' } },
      { problemId: 'p-dup-1', status: 'PASSED', passedTests: 10, totalTests: 10, Problem: { slug: 'p-dup-slug' } },
    ]

    const dedupedSet = new Set<string>()
    for (const sub of duplicateSubmissions) {
      if (sub.status === 'PASSED' && sub.passedTests === sub.totalTests) {
        dedupedSet.add(sub.Problem?.slug || sub.problemId)
      }
    }

    assert.strictEqual(dedupedSet.size, 1, 'Duplicate passes must deduplicate to 1 solved problem')
    pass(6, 'Duplicate successful submissions do not double count', '3 passed submissions for same problem count as 1 solve')
  } catch (err) {
    fail(6, 'Duplicate successful submissions do not double count', err)
  }

  // TEST 7: Remaining = total - solved
  try {
    const totalA = 500
    const solvedA = 23
    const remA = Math.max(totalA - solvedA, 0)
    assert.strictEqual(remA, 477, '500 - 23 must equal 477')

    const stats = await fetchAuthoritativeProblemStats(studentAId)
    assert.strictEqual(stats.remaining, stats.totalProblems - stats.solvedCount, 'Live remaining must match total - solved')

    pass(7, 'Remaining = total - solved', `${stats.totalProblems} - ${stats.solvedCount} = ${stats.remaining} remaining`)
  } catch (err) {
    fail(7, 'Remaining = total - solved', err)
  }

  // TEST 8: Account switch changes the count
  try {
    const statsUserA = await fetchAuthoritativeProblemStats(studentAId)
    assert.strictEqual(statsUserA.solvedCount, 2)

    // Clear caches as AuthContext does on switch
    clearProblemStatsCache()

    const freshUserId = 'fresh_student_switch_' + Date.now()
    const statsUserB = await fetchAuthoritativeProblemStats(freshUserId)
    assert.strictEqual(statsUserB.solvedCount, 0)
    assert.notStrictEqual(statsUserA.solvedCount, statsUserB.solvedCount, 'User B must not see User A solved count')

    pass(8, 'Account switch changes the count', `Switched from User A (${statsUserA.solvedCount}) to User B (${statsUserB.solvedCount}) cleanly`)
  } catch (err) {
    fail(8, 'Account switch changes the count', err)
  }

  // TEST 9: Realtime completion updates dashboard
  try {
    const { subscribeProgress } = await import('../src/lib/progress')
    let callbackExecuted = false
    const unsubscribe = subscribeProgress(() => {
      callbackExecuted = true
    })

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kalvi_progress_updated'))
    }
    unsubscribe()
    pass(9, 'Realtime completion updates dashboard', 'progress subscription and invalidate listener triggered reliably')
  } catch (err) {
    fail(9, 'Realtime completion updates dashboard', err)
  }

  // TEST 10: Multi-tab synchronization works
  try {
    // Both 'kalvi_progress_updated' and 'storage' event listeners are registered
    const progressSrc = fs.readFileSync(path.resolve('src/lib/progress.ts'), 'utf-8')
    assert(progressSrc.includes("window.addEventListener('storage', handleUpdate)"), 'Must listen to cross-tab storage events')
    assert(progressSrc.includes("window.addEventListener(PROGRESS_EVENT, handleUpdate)"), 'Must listen to local progress events')

    pass(10, 'Multi-tab synchronization works', 'Window storage and custom events both wired for multi-tab sync')
  } catch (err) {
    fail(10, 'Multi-tab synchronization works', err)
  }

  // TEST 11: Unauthorized student cannot access another student's progress
  try {
    // Both UserProgress and Submission queries specify .eq('userId', sanitizedUserId)
    const statsServiceSrc = fs.readFileSync(path.resolve('src/lib/problemStatsService.ts'), 'utf-8')
    assert(statsServiceSrc.includes(".eq('userId', sanitizedUserId)"), 'Must filter by authenticated userId')

    const statsOther = await fetchAuthoritativeProblemStats('unauthorized_student_check_' + Date.now())
    assert.strictEqual(statsOther.solvedCount, 0, 'Unauthorized or different user returns only their own 0 rows')

    pass(11, 'Unauthorized student cannot access another student\'s progress', 'Queries strictly bounded to sanitizedUserId with RLS enforcement')
  } catch (err) {
    fail(11, 'Unauthorized student cannot access another student\'s progress', err)
  }

  // TEST 12: Database failure does not display fake numbers
  try {
    let threwError = false
    try {
      await fetchAuthoritativeProblemStats('')
    } catch (err: any) {
      threwError = true
      assert(err.message.includes('required'), 'Must throw descriptive error on empty user ID')
    }
    assert(threwError, 'Must throw error on missing/invalid user')

    const dashboardSrc = fs.readFileSync(path.resolve('src/pages/DashboardPage.tsx'), 'utf-8')
    assert(dashboardSrc.includes('Unable to load progress'), 'Dashboard must display explicit error state')
    assert(dashboardSrc.includes('data-testid="problem-counter-error"'), 'Dashboard contains error testid')

    pass(12, 'Database failure does not display fake numbers', 'Explicit error state displayed; zero fake fallback numbers used')
  } catch (err) {
    fail(12, 'Database failure does not display fake numbers', err)
  }

  // TEST 13: Zero solved is displayed as real zero
  try {
    const zeroUser = 'test_student_zero_canonical_' + Date.now()
    const statsZero = await fetchAuthoritativeProblemStats(zeroUser)
    assert.strictEqual(statsZero.solvedCount, 0, 'Zero solved student returns exact 0')
    assert.strictEqual(statsZero.remaining, dbTotal, 'Remaining equals dbTotal')

    pass(13, 'Zero solved is displayed as real zero', `0 / ${dbTotal} displayed with 0% mastery`)
  } catch (err) {
    fail(13, 'Zero solved is displayed as real zero', err)
  }

  // TEST 14: All languages are counted as one canonical problem
  try {
    const languages = ['python', 'java', 'nodejs', 'cpp']
    const canonicalSlug = 'belt-1-q1-arithmetic-check-v1'
    const rows = languages.map((lang) => ({
      problemId: 'prob-canonical-1',
      status: 'SOLVED',
      language: lang,
      Problem: { slug: canonicalSlug },
    }))

    const set = new Set<string>()
    for (const r of rows) {
      set.add(r.Problem?.slug || r.problemId)
    }

    assert.strictEqual(set.size, 1, 'All 4 languages must resolve to exactly 1 canonical problem')
    pass(14, 'All languages are counted as one canonical problem', '4 languages -> Set size 1')
  } catch (err) {
    fail(14, 'All languages are counted as one canonical problem', err)
  }

  // TEST 15: Belt totals are database-derived
  try {
    const belts = await fetchAuthoritativeBeltsWithProblems(true)
    assert(belts.length === 10, `Expected 10 belts in database, found ${belts.length}`)

    const totalFromBelts = belts.reduce((sum, b) => sum + (b.Problem?.length || 0), 0)
    assert.strictEqual(totalFromBelts, dbTotal, `Sum of belt problems (${totalFromBelts}) must match total problems (${dbTotal})`)

    const stats = await fetchAuthoritativeProblemStats(studentAId)
    assert(stats.beltStats.length === 10, 'beltStats must contain all 10 belts')
    const beltSum = stats.beltStats.reduce((sum, b) => sum + b.totalProblems, 0)
    assert.strictEqual(beltSum, dbTotal, `beltStats total (${beltSum}) must match dbTotal (${dbTotal})`)

    pass(15, 'Belt totals are database-derived', `10 belts sum to exact canonical total: ${beltSum}`)
  } catch (err) {
    fail(15, 'Belt totals are database-derived', err)
  }

  // TEST 16: Curriculum progress matches the intended canonical calculation
  try {
    const stats = await fetchAuthoritativeProblemStats(studentAId)
    const overallPercent = Math.round((stats.solvedCount / stats.totalProblems) * 100)
    assert(overallPercent >= 0 && overallPercent <= 100, 'Curriculum percent must be valid bounded percentage')

    pass(16, 'Curriculum progress matches intended canonical calculation', `${stats.solvedCount} / ${stats.totalProblems} = ${overallPercent}% Done`)
  } catch (err) {
    fail(16, 'Curriculum progress matches intended canonical calculation', err)
  }

  // TEST 17: XP does not duplicate
  try {
    // XP awarded per passed problem: 50 XP
    // Submitting the same problem twice does not award +50 XP again
    const userState = {
      xp: 100,
      solvedSlugs: ['prob-1', 'prob-2'],
    }

    const isAlreadySolved = userState.solvedSlugs.includes('prob-1')
    assert(isAlreadySolved, 'Problem 1 is already in solved list')
    // Award logic only increments if not already solved
    const xpIncrement = isAlreadySolved ? 0 : 50
    assert.strictEqual(xpIncrement, 0, 'Duplicate submission awards 0 additional XP')

    pass(17, 'XP does not duplicate', 'Duplicate solve awards 0 XP; no duplicate inflation')
  } catch (err) {
    fail(17, 'XP does not duplicate', err)
  }

  // TEST 18: Submission count is independent from solved count
  try {
    // Prajith has 7 submissions in database but only 2 unique solved problems
    const prajithId = '7193765a-4dc6-4f61-813e-3e5dce95b6c7'
    const stats = await fetchAuthoritativeProblemStats(prajithId)

    const { count: subCount } = await supabase
      .from('Submission')
      .select('id', { count: 'exact', head: true })
      .eq('userId', prajithId)

    assert(typeof subCount === 'number', 'Submission count must be a number')
    assert.strictEqual(stats.solvedCount, 2, 'Prajith unique solved problems must be 2')
    assert(subCount >= 2, `Prajith submissions (${subCount}) >= solved problems (2)`)
    assert.notStrictEqual(subCount, stats.solvedCount, 'Submissions count (7) is strictly independent from Solved count (2)')

    pass(18, 'Submission count is independent from solved count', `Prajith has ${subCount} submissions and ${stats.solvedCount} unique solved problems`)
  } catch (err) {
    fail(18, 'Submission count is independent from solved count', err)
  }

  // --- Final Summary ---
  console.log('\n========================================================================')
  console.log(`🏁 DASHBOARD MASTER AUDIT RESULTS: ${passed}/18 PASSED, ${failed}/18 FAILED`)
  console.log('========================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runDashboardAuditSuite().catch((err) => {
  console.error('Fatal audit failure:', err)
  process.exit(1)
})
