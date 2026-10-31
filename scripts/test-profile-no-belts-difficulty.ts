/**
 * Focused Regression Test: Removal of Belt Mastery Badges & Problem Breakdown by Difficulty
 *
 * Verifies:
 * 1. The Belt Mastery Badges section is absent from ProfilePage.tsx.
 * 2. The Problem Breakdown by Difficulty section is absent from ProfilePage.tsx.
 * 3. Associated belt badge cards (B1, B2, B3, solved counters) and difficulty progress bars are not rendered there.
 * 4. Other ProfilePage sections remain visible (Profile Header Card, Kalvi XP, Streak, GrowthMentorCard, Evaluation Engine & Workspace).
 * 5. Belt progression and navigation still work elsewhere in the application.
 * 6. Problem difficulty information remains available wherever required in the codebase.
 * 7. Student progress, XP, streak, and submission behavior remain unchanged.
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

async function runProfileNoBeltsDifficultySuite() {
  installSyntheticSupabaseInterceptor()

  console.log('========================================================================')
  console.log('🛡️ REGRESSION TEST: BELT MASTERY BADGES & DIFFICULTY BREAKDOWN REMOVED')
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

  const profileSrc = fs.readFileSync(path.resolve('src/pages/ProfilePage.tsx'), 'utf-8')

  // TEST 1: Belt Mastery Badges section heading and cards are absent from ProfilePage
  try {
    assert(!profileSrc.includes('Belt Mastery Badges'), 'ProfilePage.tsx must not contain "Belt Mastery Badges"')
    assert(!profileSrc.includes('Belt 1: Foundations'), 'ProfilePage.tsx must not contain "Belt 1: Foundations"')
    assert(!profileSrc.includes('Belt 2: Intermediate'), 'ProfilePage.tsx must not contain "Belt 2: Intermediate"')
    assert(!profileSrc.includes('Belt 3: Advanced'), 'ProfilePage.tsx must not contain "Belt 3: Advanced"')
    assert(!/B1\s*<\/div>/.test(profileSrc), 'ProfilePage.tsx must not contain B1 badge')
    assert(!/B2\s*<\/div>/.test(profileSrc), 'ProfilePage.tsx must not contain B2 badge')
    assert(!/B3\s*<\/div>/.test(profileSrc), 'ProfilePage.tsx must not contain B3 badge')
    assert(!profileSrc.includes('/ 20 Solved'), 'ProfilePage.tsx must not contain "/ 20 Solved"')
    assert(!profileSrc.includes('/ 30 Solved'), 'ProfilePage.tsx must not contain "/ 30 Solved"')
    assert(!profileSrc.includes('/ 35 Solved'), 'ProfilePage.tsx must not contain "/ 35 Solved"')
    pass(1, 'Belt Mastery Badges section is completely absent', 'Zero occurrences of Belt Mastery Badges, B1/B2/B3, or solved counters in ProfilePage.tsx')
  } catch (err) {
    fail(1, 'Belt Mastery Badges check failed', err)
  }

  // TEST 2: Problem Breakdown by Difficulty section is absent from ProfilePage
  try {
    assert(!profileSrc.includes('Problem Breakdown by Difficulty'), 'ProfilePage.tsx must not contain "Problem Breakdown by Difficulty"')
    assert(!profileSrc.includes('Easy Problems'), 'ProfilePage.tsx must not contain "Easy Problems"')
    assert(!profileSrc.includes('Medium Problems'), 'ProfilePage.tsx must not contain "Medium Problems"')
    assert(!profileSrc.includes('Hard Problems'), 'ProfilePage.tsx must not contain "Hard Problems"')
    assert(!profileSrc.includes('difficultyStats'), 'ProfilePage.tsx must not contain difficultyStats calculation or rendering')
    pass(2, 'Problem Breakdown by Difficulty section is completely absent', 'Zero occurrences of Difficulty Breakdown, Easy/Med/Hard progress bars in ProfilePage.tsx')
  } catch (err) {
    fail(2, 'Problem Breakdown by Difficulty check failed', err)
  }

  // TEST 3: Unused imports and variables are cleaned up from ProfilePage
  try {
    assert(!profileSrc.includes('useProblemStats'), 'ProfilePage.tsx must not import or call useProblemStats')
    assert(!profileSrc.includes('problemsData'), 'ProfilePage.tsx must not import problemsData')
    assert(!profileSrc.includes('CheckCircle2'), 'ProfilePage.tsx must not import CheckCircle2')
    assert(!profileSrc.includes("from '@/lib/utils'"), 'ProfilePage.tsx must not import unused cn helper')
    assert(!profileSrc.includes('authoritativeSolvedSlugs'), 'ProfilePage.tsx must not define authoritativeSolvedSlugs')
    assert(!profileSrc.includes('solvedCount'), 'ProfilePage.tsx must not define solvedCount')
    pass(3, 'Unused imports, hooks, and local variables cleanly removed', 'No orphaned data fetching or calculations in ProfilePage.tsx')
  } catch (err) {
    fail(3, 'Unused imports and variables cleanup check failed', err)
  }

  // TEST 4: Other ProfilePage sections remain present and functional
  try {
    // Profile Header Card
    assert(profileSrc.includes('initials'), 'Profile initials calculation must be preserved')
    assert(profileSrc.includes('user?.name'), 'User name display must be preserved')
    assert(profileSrc.includes('ACCOUNT', true) || profileSrc.includes('Account'), 'Account role badge must be preserved')
    assert(profileSrc.includes('Kalvi XP'), 'Kalvi XP badge must be preserved')
    assert(profileSrc.includes('userState.xp'), 'userState.xp must be displayed')
    assert(profileSrc.includes('Streak'), 'Streak badge must be preserved')
    assert(profileSrc.includes('userState.streak'), 'userState.streak must be displayed')

    // Growth Mentor Section
    assert(profileSrc.includes('<GrowthMentorCard />'), 'GrowthMentorCard must be rendered')

    // Platform Security / Evaluation Engine card
    assert(profileSrc.includes('Evaluation Engine & Workspace'), 'Evaluation Engine & Workspace card must be preserved')
    assert(profileSrc.includes('ShieldCheck'), 'ShieldCheck icon must be preserved')
    assert(profileSrc.includes('Ctrl+C / Ctrl+V / Ctrl+X'), 'Monaco editor shortcuts explanation must be preserved')

    pass(4, 'Remaining ProfilePage cards and layout preserved', 'Profile Header, Quick Stats, Growth Mentor, and Evaluation Engine cards intact')
  } catch (err) {
    fail(4, 'Remaining ProfilePage sections check failed', err)
  }

  // TEST 5: Belt progression and navigation still work elsewhere
  try {
    const practicePageSrc = fs.readFileSync(path.resolve('src/pages/LanguagePracticePage.tsx'), 'utf-8')
    const langCardsSrc = fs.readFileSync(path.resolve('src/components/practice/LanguageCards.tsx'), 'utf-8')

    assert(practicePageSrc.includes("searchParams.get('belt')"), 'LanguagePracticePage must support belt query filtering')
    assert(langCardsSrc.includes('searchParams'), 'LanguageCards must preserve belt search parameters')

    // Verify problemsData still defines 10 belts
    assert.strictEqual(problemsData.length, 10, 'problems.json must define all 10 belts')
    const beltOrders = problemsData.map((b) => b.order)
    assert.deepStrictEqual(beltOrders, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'Belts 1 to 10 must all be present')

    pass(5, 'Belt progression and navigation work elsewhere', 'LanguagePracticePage, LanguageCards, and 10 belt definitions intact')
  } catch (err) {
    fail(5, 'Belt progression elsewhere check failed', err)
  }

  // TEST 6: Problem difficulty information remains available across problems
  try {
    let easyCount = 0
    let mediumCount = 0
    let hardCount = 0

    for (const belt of problemsData) {
      for (const p of belt.problems) {
        if (p.difficulty === 'Easy') easyCount++
        else if (p.difficulty === 'Medium') mediumCount++
        else if (p.difficulty === 'Hard') hardCount++
      }
    }

    assert(easyCount > 0, 'Easy problems must be defined in question bank')
    assert(mediumCount > 0, 'Medium problems must be defined in question bank')
    assert(hardCount > 0, 'Hard problems must be defined in question bank')

    const practicePageSrc = fs.readFileSync(path.resolve('src/pages/LanguagePracticePage.tsx'), 'utf-8')
    assert(practicePageSrc.includes('difficulty'), 'LanguagePracticePage preserves difficulty badges and filtering')

    pass(6, 'Problem difficulty information remains available', `Found ${easyCount} Easy, ${mediumCount} Medium, and ${hardCount} Hard problems in bank`)
  } catch (err) {
    fail(6, 'Problem difficulty availability check failed', err)
  }

  // TEST 7: Student progress, XP, streak, and submission records remain unchanged
  try {
    const authoritativeBelts = await fetchAuthoritativeBeltsWithProblems(true)
    assert.strictEqual(authoritativeBelts.length, 10, 'Authoritative belt service must return all 10 belts')

    const stats = await fetchAuthoritativeProblemStats(SYNTHETIC_STUDENT_A, { forceRefresh: true })
    assert.strictEqual(stats.solvedCount, 3, 'Unique solved problems count remains unchanged (3)')
    assert.strictEqual(stats.beltStats.length, 10, 'beltStats array for student progress remains unchanged (10 belts)')

    pass(7, 'Student progress and stats services remain unchanged', 'Authoritative service and student beltStats calculation preserved')
  } catch (err) {
    fail(7, 'Student progress and stats check failed', err)
  }

  // --- Summary ---
  console.log('\n========================================================================')
  console.log(`🏁 PROFILE CLEANUP REGRESSION SUITE: ${passed}/7 PASSED, ${failed}/7 FAILED`)
  console.log('========================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runProfileNoBeltsDifficultySuite().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
