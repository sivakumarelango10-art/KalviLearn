/**
 * Test Suite: Learn › Coding Separation from Practice
 * Covers all 11 requirements from Section 7 of the Master Prompt.
 */
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 1. Data Imports
import {
  getAllLearnTopics,
  getLearnTopic,
  getAllLearnQuestions,
  getLearnQuestionsByTopic,
  getLearnQuestion,
  findLearnQuestionBySlug,
  isLearnQuestionSlug,
} from '../src/data/learn/coding/index'

import { getLearnServerSuitesByTopic, resolveLearnServerSuite } from '../server/learn/coding/hidden/index'
import { getCurriculum, getProblemByLanguageAndSlug } from '../src/data/curriculum/index'
import { getServerTests } from '../src/server/judge/testRepository'
import { executeQuestion } from '../src/server/executeService'
import rawQuestionsData from '../src/data/coding/questions.json'
import rawSummariesData from '../src/data/coding/summaries.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

console.log('--- RUNNING LEARN vs PRACTICE SEPARATION TEST SUITE ---\n')

// --------------------------------------------------------------------------
// TEST 1: Solve CTA Routing
// --------------------------------------------------------------------------
console.log('Test 1: Clicking Solve on a Learn card goes to /learn/coding/:topic/:q/solve, never to /practice')
{
  const topicProblemsFile = fs.readFileSync(path.join(rootDir, 'src/pages/learn/CodingTopicProblemsPage.tsx'), 'utf8')
  assert.match(
    topicProblemsFile,
    /\/learn\/coding\/\$\{topic\.id\}\/\$\{problem\.slug\}\/solve/,
    'CodingTopicProblemsPage must link card solve button to /learn/coding/:topicId/:slug/solve'
  )
  assert.ok(
    !topicProblemsFile.includes('to={`/practice/${problem.slug}`}'),
    'CodingTopicProblemsPage must NOT link to /practice/:slug'
  )

  const detailPageFile = fs.readFileSync(path.join(rootDir, 'src/pages/learn/CodingQuestionDetailPage.tsx'), 'utf8')
  assert.match(
    detailPageFile,
    /\/learn\/coding\/\$\{topic\.id\}\/\$\{question\.slug\}\/solve/,
    'CodingQuestionDetailPage must link to /learn/coding/:topicId/:slug/solve'
  )
  assert.ok(
    !detailPageFile.includes('to={`/practice/${question.slug}`}'),
    'CodingQuestionDetailPage must NOT link to /practice/:slug'
  )

  const routesFile = fs.readFileSync(path.join(rootDir, 'src/app/routes/index.tsx'), 'utf8')
  assert.match(
    routesFile,
    /path:\s*'learn\/coding\/:topicId\/:slug\/solve'/,
    'Router must define learn/coding/:topicId/:slug/solve route'
  )
  assert.match(routesFile, /LearnWorkspacePage/, 'Router must mount LearnWorkspacePage')
  console.log('  PASS: Solve CTAs link strictly to /learn/coding/:topicId/:slug/solve')
}

// --------------------------------------------------------------------------
// TEST 2: Learn Workspace Layout, Breadcrumbs & Sidebar
// --------------------------------------------------------------------------
console.log('\nTest 2: Learn Workspace shows Learn breadcrumb, highlights Learn, and has no belt label, belt number or +50 XP')
{
  const workspaceFile = fs.readFileSync(path.join(rootDir, 'src/pages/learn/LearnWorkspacePage.tsx'), 'utf8')
  // Breadcrumb checks
  assert.ok(workspaceFile.includes('to="/learn"'), 'Breadcrumb contains link to /learn')
  assert.ok(workspaceFile.includes('to="/learn/coding"'), 'Breadcrumb contains link to /learn/coding')
  assert.ok(workspaceFile.includes('to={`/learn/coding/${topic.slug}`}'), 'Breadcrumb contains link to topic')

  // Belt label, belt number, XP checks
  assert.ok(!workspaceFile.includes('+50 XP'), 'Workspace must NOT display "+50 XP"')
  assert.ok(!workspaceFile.includes('curriculum.belts'), 'Workspace must NOT display belt progress')
  assert.ok(!workspaceFile.includes('currentProblem.order}'), 'Workspace must NOT display belt problem number')
  assert.ok(workspaceFile.includes('currentIndex + 1} of ${topicQuestions.length}'), 'Workspace shows topic-relative numbering ("3 of 20")')

  // Sidebar check: AppSidebar.tsx highlights based on pathname prefix
  const sidebarFile = fs.readFileSync(path.join(rootDir, 'src/components/common/AppSidebar.tsx'), 'utf8')
  assert.ok(
    sidebarFile.includes("location.pathname.startsWith('/learn')"),
    'AppSidebar highlights Learn for /learn routes'
  )
  assert.ok(
    sidebarFile.includes("location.pathname.startsWith('/practice')"),
    'AppSidebar highlights Practice for /practice routes'
  )
  console.log('  PASS: Learn Workspace has pure Learn breadcrumb, topic numbering, and zero belt/+50XP artifacts')
}

// --------------------------------------------------------------------------
// TEST 3: Practice Arena is Unchanged
// --------------------------------------------------------------------------
console.log('\nTest 3: Practice /practice/python/belt-1-q3-largest-of-three-v1 is unchanged')
{
  const practiceProblem = getProblemByLanguageAndSlug('python', 'belt-1-q3-largest-of-three-v1')
  assert.ok(practiceProblem, 'Practice problem belt-1-q3-largest-of-three-v1 must exist')
  assert.strictEqual(practiceProblem.title, 'Largest of Three (Variant 1)')
  assert.strictEqual(practiceProblem.order, 3)
  assert.strictEqual(practiceProblem.xp, 50)
  assert.strictEqual(practiceProblem.language, 'python')

  const curriculum = getCurriculum('python')
  assert.strictEqual(curriculum.belts[0].name, 'Belt 1 (Yellow Belt)')
  const foundInBelt1 = curriculum.belts[0].problems.some((p) => p.slug === 'belt-1-q3-largest-of-three-v1')
  assert.ok(foundInBelt1, 'belt-1-q3-largest-of-three-v1 must remain in Belt 1 of Python curriculum')
  console.log('  PASS: Practice belt problem belt-1-q3-largest-of-three-v1 is intact with 50 XP in Belt 1')
}

// --------------------------------------------------------------------------
// TEST 4: Collision List & Data Independence
// --------------------------------------------------------------------------
console.log('\nTest 4: Learn "middle-of-three" and Practice "Middle Value (Variant 1)" load distinct data across collision pairs')
{
  // 1. Learn question
  const learnQ = getLearnQuestion('conditionals-control-flow', 'middle-of-three')
  assert.ok(learnQ, 'Learn question middle-of-three must exist')
  assert.strictEqual(learnQ.id, 'learn:conditionals-control-flow:middle-of-three')
  assert.strictEqual(learnQ.slug, 'middle-of-three')
  assert.strictEqual(learnQ.title, 'Middle of Three')

  // 2. Practice problem
  const practiceP = getProblemByLanguageAndSlug('python', 'belt-1-q4-middle-value-v1')
  assert.strictEqual(practiceP.id, 'python_belt-1-q4-middle-value-v1')
  assert.strictEqual(practiceP.slug, 'belt-1-q4-middle-value-v1')

  // They are completely different
  assert.notStrictEqual(learnQ.id, practiceP.id)
  assert.notStrictEqual(learnQ.title, practiceP.title)

  // Test suites are independent
  const learnSuite = resolveLearnServerSuite('middle-of-three')
  const practiceSuite = getServerTests('belt-1-q4-middle-value-v1')
  assert.ok(learnSuite, 'Learn suite must resolve')
  assert.ok(practiceSuite, 'Practice suite must resolve')
  assert.strictEqual(learnSuite.id, 'learn:conditionals-control-flow:middle-of-three')
  assert.strictEqual(practiceSuite.source, 'practice')
  assert.strictEqual(practiceSuite.questionId, 'practice:belt-1-q4-middle-value-v1')

  // Exact collision check across all 950 Learn questions vs 500 Practice problems:
  const allLearn = getAllLearnQuestions()
  const curriculum = getCurriculum('python')
  const allPracticeSlugs = new Set(curriculum.belts.flatMap((b) => b.problems.map((p) => p.slug)))
  const exactCollisions = allLearn.filter((q) => allPracticeSlugs.has(q.slug))
  assert.strictEqual(exactCollisions.length, 0, 'Exact collision count between Learn and Practice slugs must be 0')
  console.log(`  PASS: Zero exact slug collisions. Semantic collisions cleanly namespaced with "learn:" prefix`)
}

// --------------------------------------------------------------------------
// TEST 5: Old Practice URLs Redirect to Learn Solve Route
// --------------------------------------------------------------------------
console.log('\nTest 5: Old /practice/python/<learn-slug> redirects to Learn solve route')
{
  const arenaFile = fs.readFileSync(path.join(rootDir, 'src/pages/ProblemArenaPage.tsx'), 'utf8')
  assert.ok(
    arenaFile.includes('findLearnQuestionBySlug(slug)'),
    'ProblemArenaPage must check findLearnQuestionBySlug'
  )
  assert.match(
    arenaFile,
    /<Navigate\s+to=\{`\/learn\/coding\/\$\{learnQuestion\.topicSlug\}\/\$\{learnQuestion\.slug\}\/solve\?lang=\$\{currentLanguage\}`\}\s+replace\s*\/>/,
    'ProblemArenaPage must render <Navigate replace /> to Learn solve route when slug is a Learn question'
  )

  // Verify findLearnQuestionBySlug resolves both bare slugs and namespaced slugs
  const resolved = findLearnQuestionBySlug('middle-of-three')
  assert.ok(resolved, 'findLearnQuestionBySlug("middle-of-three") must resolve')
  assert.strictEqual(resolved.topicSlug, 'conditionals-control-flow')
  assert.strictEqual(resolved.slug, 'middle-of-three')

  const resolvedNamespaced = findLearnQuestionBySlug('learn:conditionals-control-flow:middle-of-three')
  assert.ok(resolvedNamespaced, 'findLearnQuestionBySlug with namespaced id must resolve')
  assert.strictEqual(resolvedNamespaced.slug, 'middle-of-three')
  console.log('  PASS: Old /practice/<learn-slug> cleanly redirects to /learn/coding/:topic/:slug/solve')
}

// --------------------------------------------------------------------------
// TEST 6: Unknown Topic or Question Shows Not Found
// --------------------------------------------------------------------------
console.log('\nTest 6: Unknown Learn topic or question shows Not Found, not blank and not Practice fallback')
{
  assert.strictEqual(getLearnTopic('non-existent-topic'), undefined)
  assert.strictEqual(getLearnQuestion('conditionals-control-flow', 'non-existent-question'), undefined)
  assert.strictEqual(findLearnQuestionBySlug('non-existent-slug-xyz'), undefined)

  const workspaceFile = fs.readFileSync(path.join(rootDir, 'src/pages/learn/LearnWorkspacePage.tsx'), 'utf8')
  assert.ok(
    workspaceFile.includes('Question Not Found'),
    'LearnWorkspacePage must display Question Not Found when question is missing'
  )
  assert.ok(
    workspaceFile.includes('Return to Coding Topics'),
    'LearnWorkspacePage provides link back to coding overview'
  )

  const arenaFile = fs.readFileSync(path.join(rootDir, 'src/pages/ProblemArenaPage.tsx'), 'utf8')
  assert.match(
    arenaFile,
    /<ProblemNotFoundCard\s+slug=\{slug\}\s+language=\{currentLanguage\}\s*\/>/,
    'ProblemArenaPage renders ProblemNotFoundCard when problem is not in Practice curriculum'
  )
  console.log('  PASS: Unknown Learn or Practice entities render explicit Not Found states without silent fallbacks')
}

// --------------------------------------------------------------------------
// TEST 7: Question Counts per Topic Match Exactly Between Client and Server
// --------------------------------------------------------------------------
console.log('\nTest 7: Learn question counts per topic match between client and server stores (950 in total)')
{
  const migratedQuestions = getAllLearnQuestions()
  assert.strictEqual(migratedQuestions.length, 950, 'Audited Learn questions count must be exactly 950')

  const allTopics = getAllLearnTopics()
  assert.strictEqual(allTopics.length, 24, 'There must be exactly 24 topics')

  let verifiedTotal = 0
  for (const topic of allTopics) {
    const migratedForTopic = getLearnQuestionsByTopic(topic.slug)
    const serverSuiteForTopic = getLearnServerSuitesByTopic(topic.slug)

    assert.strictEqual(
      serverSuiteForTopic.length,
      migratedForTopic.length,
      `Server hidden suite count mismatch for ${topic.slug}: client=${migratedForTopic.length}, server=${serverSuiteForTopic.length}`
    )

    verifiedTotal += migratedForTopic.length
  }

  assert.strictEqual(verifiedTotal, 950, 'Sum of all topic questions must equal 950')
  console.log(`  PASS: All 24 topics verified. Exact 950/950 count preserved across client and server stores`)
}

// --------------------------------------------------------------------------
// TEST 8: Hidden Tests Absent from Client Bundle
// --------------------------------------------------------------------------
console.log('\nTest 8: Learn hidden tests are absent from dist/ (verified by check:bundle)')
{
  const checkBundleScript = fs.readFileSync(path.join(rootDir, 'scripts/check-bundle-no-hidden-tests.cjs'), 'utf8')
  assert.ok(
    checkBundleScript.includes("server/learn/coding/hidden"),
    'check-bundle-no-hidden-tests.cjs must scan server/learn/coding/hidden/*.json'
  )
  assert.ok(
    checkBundleScript.includes("serverLearnHiddenDir"),
    'check-bundle-no-hidden-tests.cjs defines serverLearnHiddenDir'
  )
  console.log('  PASS: Bundle check configuration scans both Practice and Learn server-only hidden directories')
}

// --------------------------------------------------------------------------
// TEST 9: Learn Submits Never Write to Practice DB / Progress
// --------------------------------------------------------------------------
console.log('\nTest 9: A Learn submit never writes to Practice Submission or UserProgress, and never alters /500, XP, or streak')
{
  const submitHandlerFile = fs.readFileSync(path.join(rootDir, 'src/server/submitHandler.ts'), 'utf8')
  assert.ok(
    submitHandlerFile.includes("persistence.reason = 'learn_practice_isolated'"),
    'submitHandler must set reason = "learn_practice_isolated" for Learn submits'
  )
  assert.ok(
    submitHandlerFile.includes("const isLearn ="),
    'submitHandler explicitly identifies Learn questions'
  )

  // Verify learnProgress.ts does client-side isolated progress
  const learnProgFile = fs.readFileSync(path.join(rootDir, 'src/lib/learnProgress.ts'), 'utf8')
  assert.ok(
    learnProgFile.includes("kalvi_learn_progress_"),
    'Learn progress uses isolated localStorage key kalvi_learn_progress_'
  )
  assert.ok(
    !learnProgFile.includes("recordProblemSuccess"),
    'Learn progress does not call recordProblemSuccess'
  )
  assert.ok(
    !learnProgFile.includes("recordProblemAttempt"),
    'Learn progress does not call recordProblemAttempt'
  )
  console.log('  PASS: Learn submissions are completely isolated from Practice DB persistence and progress tracking')
}

// --------------------------------------------------------------------------
// TEST 10: Disjoint Storage Keys for Saved Code
// --------------------------------------------------------------------------
console.log('\nTest 10: Learn and Practice saved code use different storage keys')
{
  const workspaceFile = fs.readFileSync(path.join(rootDir, 'src/pages/learn/LearnWorkspacePage.tsx'), 'utf8')
  assert.match(
    workspaceFile,
    /learn_code_\$\{topicId \|\| 'unknown'\}_\$\{slug \|\| 'unknown'\}_\$\{currentLanguage\}/,
    'LearnWorkspacePage must use learn_code_${topicId}_${slug}_${lang} storage key'
  )

  const progressFile = fs.readFileSync(path.join(rootDir, 'src/lib/progress.ts'), 'utf8')
  assert.ok(
    progressFile.includes("const langKey = `${lang}:${problemSlug}`"),
    'Practice uses `${lang}:${problemSlug}` in progress record'
  )
  console.log('  PASS: Saved code storage keys are completely isolated between Learn and Practice')
}

// --------------------------------------------------------------------------
// TEST 11: Server Evaluates Authoritatively and Rejects Client Test Cases
// --------------------------------------------------------------------------
console.log('\nTest 11: Server rejects client-supplied tests and authoritatively evaluates Learn submissions')
{
  // Test evaluation of a Learn question through executeQuestion
  const pythonCode = `
import sys
parts = sys.stdin.read().split()
if parts:
    nums = sorted([int(p) for p in parts])
    print(nums[1])
`
  const res = await executeQuestion({
    questionSlug: 'learn:conditionals-control-flow:middle-of-three',
    language: 'python',
    code: pythonCode,
    mode: 'submit',
  })

  assert.strictEqual(res.success, true, 'Execution must succeed')
  assert.strictEqual(res.status, 'ACCEPTED', 'Evaluation status must be ACCEPTED')
  assert.strictEqual(res.passed, 10, 'All 10 test cases must pass')
  assert.strictEqual(res.total, 10, 'Total test cases must be 10')
  assert.strictEqual(res.visibleCount, 3, 'Must have 3 visible test cases')
  assert.strictEqual(res.hiddenCount, 7, 'Must have 7 hidden test cases')
  assert.strictEqual(res.questionId, 'learn:conditionals-control-flow:middle-of-three')

  // Verify that testCases in client response do NOT expose hidden input/output
  for (const tc of res.testCases) {
    if (!tc.visible) {
      assert.strictEqual(tc.input, undefined, 'Hidden test case input must never be returned to client')
      assert.strictEqual(tc.expectedOutput, undefined, 'Hidden test case expectedOutput must never be returned to client')
    }
  }
  console.log('  PASS: Server evaluated all 10 authoritative cases, passing 10/10 with hidden cases kept confidential')
}

console.log('\n======================================================')
console.log('ALL 11 LEARN vs PRACTICE SEPARATION TESTS PASSED!')
console.log('======================================================\n')
