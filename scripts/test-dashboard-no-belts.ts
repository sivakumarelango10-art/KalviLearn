/**
 * Focused Regression Test: Removal of Belt Progression System from Dashboard Only
 *
 * Verifies:
 * 1. The Student Dashboard does not render the Belt Progression System section.
 * 2. The associated View All Problems link is absent from that section.
 * 3. No Belt 1–10 cards are rendered in that dashboard section.
 * 4. Other Dashboard cards remain present and intact (Total Solved, XP, Streak, Submissions, Growth Mentor, Curriculum, Recent Activity).
 * 5. Underlying belt navigation and problem filtering still work elsewhere in the application.
 * 6. Belt progress and student completion records remain unchanged.
 */
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import problemsData from '../src/data/problems.json'
import {
  fetchAuthoritativeBeltsWithProblems,
  fetchAuthoritativeProblemStats,
} from '../src/lib/problemStatsService'
import {
  SYNTHETIC_STUDENT_A,
  installSyntheticSupabaseInterceptor,
} from './syntheticFixtures'

async function runDashboardNoBeltsSuite() {
  installSyntheticSupabaseInterceptor()

  console.log('========================================================================')
  console.log('🛡️ REGRESSION TEST: BELT PROGRESSION SYSTEM REMOVED FROM DASHBOARD ONLY')
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

  const dashboardSrc = fs.readFileSync(path.resolve('src/pages/DashboardPage.tsx'), 'utf-8')

  // TEST 1: Section heading "Belt Progression System" is absent from Student Dashboard
  try {
    assert(!dashboardSrc.includes('Belt Progression System'), 'DashboardPage.tsx must not contain "Belt Progression System"')
    pass(1, 'Belt Progression System heading is absent from Dashboard', 'Zero occurrences of "Belt Progression System" in DashboardPage.tsx')
  } catch (err) {
    fail(1, 'Belt Progression System heading check failed', err)
  }

  // TEST 2: Associated "View All Problems" link is absent from that section
  try {
    assert(!dashboardSrc.includes('View All Problems'), 'DashboardPage.tsx must not contain "View All Problems" link')
    assert(!dashboardSrc.includes('ChevronRight'), 'DashboardPage.tsx must not import or render unused ChevronRight')
    pass(2, 'View All Problems link is absent from Dashboard', 'Neither "View All Problems" nor its ChevronRight icon exist in DashboardPage.tsx')
  } catch (err) {
    fail(2, 'View All Problems link check failed', err)
  }

  // TEST 3: No Belt 1–10 cards or "Explore Belt" buttons exist in Dashboard
  try {
    assert(!dashboardSrc.includes('Explore Belt'), 'DashboardPage.tsx must not contain "Explore Belt" buttons')
    assert(!dashboardSrc.includes('beltSummaries'), 'DashboardPage.tsx must not contain beltSummaries calculation or mapping')
    assert(!dashboardSrc.includes('b.order'), 'DashboardPage.tsx must not map over belt orders')
    pass(3, 'No Belt 1–10 cards rendered in Dashboard', 'beltSummaries, belt card grid, and Explore Belt buttons completely removed')
  } catch (err) {
    fail(3, 'Belt cards in Dashboard check failed', err)
  }

  // TEST 4: All other Dashboard sections and cards remain present and untouched
  try {
    // Welcome Banner
    assert(dashboardSrc.includes('Welcome back, {displayName}'), 'Welcome banner must be preserved')
    assert(dashboardSrc.includes('Resume:'), 'Resume problem button must be preserved')
    assert(dashboardSrc.includes('Curriculum'), 'Curriculum navigation button must be preserved')

    // Gamification Status
    assert(dashboardSrc.includes('currentBelt.name'), 'Current belt status badge in hero banner must be preserved')

    // Growth Mentor
    assert(dashboardSrc.includes('<GrowthMentorCard />'), 'GrowthMentorCard must be preserved')

    // Metrics Row
    assert(dashboardSrc.includes('Total Solved'), 'Total Solved metric card must be preserved')
    assert(dashboardSrc.includes('Kalvi XP'), 'Kalvi XP metric card must be preserved')
    assert(dashboardSrc.includes('Learning Streak'), 'Learning Streak metric card must be preserved')
    assert(dashboardSrc.includes('Submissions'), 'Submissions metric card must be preserved')

    // Bottom Grid
    assert(dashboardSrc.includes('Curriculum Modules'), 'Curriculum Modules preview must be preserved')
    assert(dashboardSrc.includes('Recent Activity'), 'Recent Activity feed must be preserved')

    pass(4, 'All other Dashboard sections remain present', 'Welcome banner, metrics, Growth Mentor, curriculum, and activity feed preserved')
  } catch (err) {
    fail(4, 'Other Dashboard sections check failed', err)
  }

  // TEST 5: Underlying belt navigation and problem filtering work elsewhere in the platform
  try {
    const practicePageSrc = fs.readFileSync(path.resolve('src/pages/LanguagePracticePage.tsx'), 'utf-8')
    const langCardsSrc = fs.readFileSync(path.resolve('src/components/practice/LanguageCards.tsx'), 'utf-8')

    assert(practicePageSrc.includes("searchParams.get('belt')"), 'LanguagePracticePage must support belt query filtering')
    assert(langCardsSrc.includes('searchParams'), 'LanguageCards must preserve belt search parameters')

    // Verify problemsData still defines 10 belts
    assert.strictEqual(problemsData.length, 10, 'problems.json must define all 10 belts')
    const beltOrders = problemsData.map((b) => b.order)
    assert.deepStrictEqual(beltOrders, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'Belts 1 to 10 must all be present')

    pass(5, 'Underlying belt navigation and problem filtering work elsewhere', 'LanguagePracticePage, LanguageCards, and 10 belt definitions intact')
  } catch (err) {
    fail(5, 'Underlying belt navigation check failed', err)
  }

  // TEST 6: Belt progress and student completion records remain unchanged
  try {
    const authoritativeBelts = await fetchAuthoritativeBeltsWithProblems(true)
    assert.strictEqual(authoritativeBelts.length, 10, 'Authoritative belt service must return all 10 belts')

    const stats = await fetchAuthoritativeProblemStats(SYNTHETIC_STUDENT_A, { forceRefresh: true })
    assert.strictEqual(stats.solvedCount, 3, 'Unique solved problems count remains unchanged (3)')
    assert.strictEqual(stats.beltStats.length, 10, 'beltStats array for student progress remains unchanged (10 belts)')

    pass(6, 'Belt progress and student completion records remain unchanged', 'Authoritative service and student beltStats calculation preserved')
  } catch (err) {
    fail(6, 'Belt progress and student completion records check failed', err)
  }

  // --- Summary ---
  console.log('\n========================================================================')
  console.log(`🏁 DASHBOARD NO BELTS REGRESSION SUITE: ${passed}/6 PASSED, ${failed}/6 FAILED`)
  console.log('========================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runDashboardNoBeltsSuite().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
