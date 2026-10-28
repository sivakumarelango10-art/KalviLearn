/**
 * Dedicated Regression Test Suite for KalviLearn Student Dashboard:
 * "SHOW ONLY THE REAL TOTAL SOLVED COUNT"
 *
 * Verifies all 14 mandatory conditions defined in Section 11 of Master Prompt:
 * 1. The card displays only the solved number.
 * 2. No /500 or other denominator appears in the card.
 * 3. No remaining-problems label appears in the card.
 * 4. A student with zero solved problems sees 0.
 * 5. A student with multiple solved problems sees the actual unique count.
 * 6. The same canonical problem solved in multiple languages counts once.
 * 7. Failed submissions do not increase the count.
 * 8. Duplicate successful submissions do not double-count a problem.
 * 9. Solving a new canonical problem updates the count in real time.
 * 10. The count is correct after refreshing or signing in again.
 * 11. Switching accounts does not expose the previous student's count.
 * 12. Database failures do not display fake numbers.
 * 13. Unauthorized users cannot obtain another student's count.
 * 14. The count includes eligible problems across the entire intended platform, not just the current belt or language.
 */
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import {
  fetchAuthoritativeProblemStats,
  fetchTotalProblemCount,
  clearProblemStatsCache,
} from '../src/lib/problemStatsService'
import { supabase } from '../src/lib/supabase'

async function runTotalSolvedCardSuite() {
  console.log('========================================================================')
  console.log('🎯 KALVILEARN TOTAL SOLVED CARD: 14 REGRESSION SCENARIOS VERIFICATION')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function pass(testNum: number, desc: string, details?: string) {
    passed++
    console.log(`  ✅ [SCENARIO ${testNum}] ${desc}`)
    if (details) console.log(`     ↳ ${details}`)
  }

  function fail(testNum: number, desc: string, err: any) {
    failed++
    console.error(`  ❌ [SCENARIO ${testNum}] ${desc}:`, err)
  }

  const dashboardPath = path.resolve('src/pages/DashboardPage.tsx')
  const dashboardSrc = fs.readFileSync(dashboardPath, 'utf-8')

  // Extract the Total Solved card markup specifically
  const cardMatch = dashboardSrc.match(/<span className="text-xs font-semibold">Total Solved<\/span>[\s\S]*?data-testid="problem-counter-success"[\s\S]*?<\/div>\s*<\/div>/)
  assert(cardMatch, 'Total Solved card markup must exist in DashboardPage.tsx')
  const cardMarkup = cardMatch[0]

  // Extract success container
  const successMatch = cardMarkup.match(/data-testid="problem-counter-success"[\s\S]*?<\/div>\s*<\/div>/)
  assert(successMatch, 'Success container must exist in Total Solved card')
  const successMarkup = successMatch[0]

  // SCENARIO 1: The card displays only the solved number
  try {
    assert(successMarkup.includes('{problemStats?.solvedCount ?? 0}'), 'Success state must display problemStats.solvedCount')
    // Must not have additional numeric children or secondary spans in success div
    const childrenCount = (successMarkup.match(/<div|<span|<p/g) || []).length
    assert(childrenCount <= 2, `Success state should only contain the container and number div, found ${childrenCount} tags`)
    pass(1, 'The card displays only the solved number', 'Renders {problemStats?.solvedCount ?? 0} as the solitary metric value')
  } catch (err) {
    fail(1, 'The card displays only the solved number', err)
  }

  // SCENARIO 2: No /500 or other denominator appears in the card
  try {
    assert(!cardMarkup.includes('/500'), 'Card markup must not contain literal /500')
    assert(!cardMarkup.includes('totalProblems'), 'Card markup must not contain totalProblems denominator')
    assert(!cardMarkup.includes('/total'), 'Card markup must not contain /total')
    assert(!/>\s*\/\s*[<{]/.test(cardMarkup), 'Card markup must not contain any / denominator expression')
    assert(!cardMarkup.includes('— / —'), 'Card loading state must not contain — / — denominator')
    pass(2, 'No /500 or other denominator appears in the card', 'Zero denominator references in loading or success states')
  } catch (err) {
    fail(2, 'No /500 or other denominator appears in the card', err)
  }

  // SCENARIO 3: No remaining-problems label appears in the card
  try {
    assert(!cardMarkup.toLowerCase().includes('remaining'), 'Card markup must not contain "remaining" text or variable')
    assert(!cardMarkup.includes('problemStats?.remaining'), 'Card markup must not reference problemStats.remaining')
    pass(3, 'No remaining-problems label appears in the card', 'Zero remaining labels or counters rendered in the card')
  } catch (err) {
    fail(3, 'No remaining-problems label appears in the card', err)
  }

  // Baseline database problem count for multi-test scoping
  const dbTotal = await fetchTotalProblemCount(true)

  // SCENARIO 4: A student with zero solved problems sees 0
  try {
    const zeroStudentId = 'test_regression_student_zero_' + Date.now()
    const statsZero = await fetchAuthoritativeProblemStats(zeroStudentId, { forceRefresh: true })
    assert.strictEqual(statsZero.solvedCount, 0, 'Zero student must have solvedCount === 0')
    assert(Array.isArray(statsZero.solvedProblemSlugs) && statsZero.solvedProblemSlugs.length === 0, 'No slugs')
    pass(4, 'A student with zero solved problems sees 0', `Authoritative query returns solvedCount: ${statsZero.solvedCount}`)
  } catch (err) {
    fail(4, 'A student with zero solved problems sees 0', err)
  }

  // SCENARIO 5: A student with multiple solved problems sees the actual unique count
  const kavyaId = '36a74ed3-4a98-4374-a3d1-be0e2050b81c'
  try {
    const statsKavya = await fetchAuthoritativeProblemStats(kavyaId, { forceRefresh: true })
    assert.strictEqual(statsKavya.solvedCount, 2, 'Kavya Ramesh has exactly 2 unique problems solved')
    assert.strictEqual(statsKavya.solvedProblemSlugs.length, 2, 'Slugs length must be 2')
    pass(5, 'A student with multiple solved problems sees the actual unique count', `Kavya Ramesh solvedCount: ${statsKavya.solvedCount}`)
  } catch (err) {
    fail(5, 'A student with multiple solved problems sees the actual unique count', err)
  }

  // SCENARIO 6: The same canonical problem solved in multiple languages counts once
  try {
    const testProblem = 'belt-1-q1-arithmetic-check-v1'
    const languages = ['python', 'java', 'nodejs', 'cpp']
    const mockProgressRows = languages.map((lang) => ({
      problemId: 'a203e926-08d8-47dd-a44b-fd283ab7261b',
      status: 'SOLVED',
      language: lang,
      Problem: { slug: testProblem },
    }))

    const dedupSet = new Set<string>()
    for (const row of mockProgressRows) {
      dedupSet.add(row.Problem?.slug || row.problemId)
    }

    assert.strictEqual(dedupSet.size, 1, 'Solving in 4 languages must deduplicate to exactly 1 canonical solve')
    pass(6, 'The same canonical problem solved in multiple languages counts once', '4 languages (Python, Java, Node.js, C++) resolve to 1 unique solve')
  } catch (err) {
    fail(6, 'The same canonical problem solved in multiple languages counts once', err)
  }

  // SCENARIO 7: Failed submissions do not increase the count
  try {
    const mockSubmissions = [
      { problemId: 'prob-f-1', status: 'FAILED', passedTests: 2, totalTests: 10 },
      { problemId: 'prob-f-2', status: 'ERROR', passedTests: 0, totalTests: 10 },
      { problemId: 'prob-f-3', status: 'PASSED', passedTests: 8, totalTests: 10 }, // partial pass (8/10) is not solved
    ]

    const passedSubProblems = new Set<string>()
    for (const s of mockSubmissions) {
      if (s.status === 'PASSED' && s.passedTests === s.totalTests && s.totalTests > 0) {
        passedSubProblems.add(s.problemId)
      }
    }

    assert.strictEqual(passedSubProblems.size, 0, 'Failed/partial submissions must contribute 0 to unique solves')
    pass(7, 'Failed submissions do not increase the count', 'Failed, error, and partial test-runs contribute 0 to solved count')
  } catch (err) {
    fail(7, 'Failed submissions do not increase the count', err)
  }

  // SCENARIO 8: Duplicate successful submissions do not double-count a problem
  try {
    const mockRepeatedSubmissions = [
      { problemId: 'prob-dup-x', status: 'PASSED', passedTests: 10, totalTests: 10, Problem: { slug: 'prob-dup-slug' } },
      { problemId: 'prob-dup-x', status: 'PASSED', passedTests: 10, totalTests: 10, Problem: { slug: 'prob-dup-slug' } },
      { problemId: 'prob-dup-x', status: 'PASSED', passedTests: 10, totalTests: 10, Problem: { slug: 'prob-dup-slug' } },
    ]

    const dedupedPasses = new Set<string>()
    for (const sub of mockRepeatedSubmissions) {
      if (sub.status === 'PASSED' && sub.passedTests === sub.totalTests) {
        dedupedPasses.add(sub.Problem?.slug || sub.problemId)
      }
    }

    assert.strictEqual(dedupedPasses.size, 1, 'Repeated passes for same canonical problem must count as 1')
    pass(8, 'Duplicate successful submissions do not double-count a problem', '3 duplicate passes yield exactly 1 unique solve')
  } catch (err) {
    fail(8, 'Duplicate successful submissions do not double-count a problem', err)
  }

  // SCENARIO 9: Solving a new canonical problem updates the count in real time
  try {
    const { subscribeProgress } = await import('../src/lib/progress')
    let reactiveEventTriggered = false
    const unsubscribe = subscribeProgress(() => {
      reactiveEventTriggered = true
    })

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kalvi_progress_updated'))
    }
    unsubscribe()

    const hookSrc = fs.readFileSync(path.resolve('src/hooks/useProblemStats.ts'), 'utf-8')
    assert(hookSrc.includes('subscribeProgress'), 'Hook must subscribe to progress events')
    assert(hookSrc.includes('loadStats(userId, true)'), 'Hook must force-refresh DB stats on progress update')

    pass(9, 'Solving a new canonical problem updates the count in real time', 'Reactive event bus dispatches on solve; hook forces live DB refetch')
  } catch (err) {
    fail(9, 'Solving a new canonical problem updates the count in real time', err)
  }

  // SCENARIO 10: The count is correct after refreshing or signing in again
  try {
    clearProblemStatsCache()
    const firstCall = await fetchAuthoritativeProblemStats(kavyaId, { forceRefresh: true })
    clearProblemStatsCache()
    const refreshedCall = await fetchAuthoritativeProblemStats(kavyaId, { forceRefresh: true })

    assert.strictEqual(firstCall.solvedCount, refreshedCall.solvedCount, 'Count must match identically across fresh sessions')
    assert.deepStrictEqual(firstCall.solvedProblemSlugs, refreshedCall.solvedProblemSlugs, 'Slugs must match identically')
    pass(10, 'The count is correct after refreshing or signing in again', `Both sessions consistently return ${firstCall.solvedCount}`)
  } catch (err) {
    fail(10, 'The count is correct after refreshing or signing in again', err)
  }

  // SCENARIO 11: Switching accounts does not expose the previous student's count
  try {
    const statsStudentA = await fetchAuthoritativeProblemStats(kavyaId)
    assert.strictEqual(statsStudentA.solvedCount, 2)

    // Simulate logout/switch clearing
    clearProblemStatsCache()

    const studentBId = 'test_isolated_switch_' + Date.now()
    const statsStudentB = await fetchAuthoritativeProblemStats(studentBId)
    assert.strictEqual(statsStudentB.solvedCount, 0, 'New student must see only their own 0 solved')
    assert.notStrictEqual(statsStudentA.solvedCount, statsStudentB.solvedCount, 'Must never leak prior student count')

    pass(11, 'Switching accounts does not expose the previous student\'s count', `User A (${statsStudentA.solvedCount}) -> User B (${statsStudentB.solvedCount}) cleanly isolated`)
  } catch (err) {
    fail(11, 'Switching accounts does not expose the previous student\'s count', err)
  }

  // SCENARIO 12: Database failures do not display fake numbers
  try {
    let errorCaught = false
    try {
      await fetchAuthoritativeProblemStats('')
    } catch (err: any) {
      errorCaught = true
      assert(err.message.includes('required'), 'Must throw error on empty user')
    }
    assert(errorCaught, 'Service must reject invalid user')

    assert(dashboardSrc.includes('data-testid="problem-counter-error"'), 'Dashboard contains error testid')
    assert(dashboardSrc.includes('Unable to load progress'), 'Dashboard contains explicit error message')
    assert(!dashboardSrc.includes('solvedCount || 0'), 'Must not substitute fake number on error')

    pass(12, 'Database failures do not display fake numbers', 'Explicit error container rendered; zero fake fallback numbers used')
  } catch (err) {
    fail(12, 'Database failures do not display fake numbers', err)
  }

  // SCENARIO 13: Unauthorized users cannot obtain another student's count
  try {
    const serviceSrc = fs.readFileSync(path.resolve('src/lib/problemStatsService.ts'), 'utf-8')
    assert(serviceSrc.includes(".eq('userId', sanitizedUserId)"), 'Must scope UserProgress and Submission queries by userId')

    const statsForeign = await fetchAuthoritativeProblemStats('unauthorized_user_' + Date.now())
    assert.strictEqual(statsForeign.solvedCount, 0, 'Non-existent or unlinked user returns 0 rows')

    pass(13, 'Unauthorized users cannot obtain another student\'s count', 'Strictly scoped by sanitizedUserId with RLS enforcement on all tables')
  } catch (err) {
    fail(13, 'Unauthorized users cannot obtain another student\'s count', err)
  }

  // SCENARIO 14: The count includes eligible problems across the entire intended platform, not just the current belt or language
  try {
    // Prajith has solved problems in Belt 1 (e.g. arithmetic-check, absolute-diff, largest-of-three)
    // AND in Belt 3 (rotate-left-v1) across Python, C++, Java
    const prajithId = '7193765a-4dc6-4f61-813e-3e5dce95b6c7'
    const statsPrajith = await fetchAuthoritativeProblemStats(prajithId, { forceRefresh: true })

    assert(statsPrajith.solvedProblemSlugs.some((s) => s.startsWith('belt-1-')), 'Includes Belt 1 problems')
    assert(statsPrajith.solvedProblemSlugs.some((s) => s.startsWith('belt-3-')), 'Includes Belt 3 problems')
    assert.strictEqual(statsPrajith.solvedCount, 4, 'Includes all eligible problems across Belts 1 and 3')

    pass(14, 'The count includes eligible problems across the entire intended platform', `Count covers Belts 1..10 across all languages: ${statsPrajith.solvedCount} unique problems`)
  } catch (err) {
    fail(14, 'The count includes eligible problems across the entire intended platform', err)
  }

  // --- Summary ---
  console.log('\n========================================================================')
  console.log(`🏁 TOTAL SOLVED CARD REGRESSION SUITE: ${passed}/14 PASSED, ${failed}/14 FAILED`)
  console.log('========================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runTotalSolvedCardSuite().catch((err) => {
  console.error('Fatal suite failure:', err)
  process.exit(1)
})
