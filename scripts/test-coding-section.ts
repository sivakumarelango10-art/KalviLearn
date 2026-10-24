import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAllCodingTopics, getCodingTopicById, getCodingQuestionsByTopic, getCodingQuestionBySlug } from '../src/coding/questions'
import { CODING_TOPICS } from '../src/coding/topics'
import { getProblemByLanguageAndSlug } from '../src/data/curriculum/index'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function runTests() {
  console.log('====================================================')
  console.log('🧪 RUNNING COMPREHENSIVE CODING SECTION VERIFICATION')
  console.log('====================================================')

  let passed = 0
  let failed = 0

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${msg}`)
      passed++
    } else {
      console.error(`  ❌ FAIL: ${msg}`)
      failed++
    }
  }

  // 1. Topic count & listing
  console.log('\n--- 1. TOPIC CONFIGURATION ---')
  const topics = getAllCodingTopics()
  assert(topics.length === 24, `24 coding topics configured (got ${topics.length})`)

  const expectedTitles = [
    'Variables & Data Types',
    'Basic Arithmetic Operations',
    'Conditionals / Control Flow',
    'Loops',
    'Nested Loops',
    'Functions',
    'Scope',
    '1D Arrays / Lists',
    'Strings as Arrays',
    '2D Arrays / Matrices',
    'Linear Search',
    'Binary Search',
    'Sorting',
    'Sets',
    'Two Pointers',
    'Dictionaries / Hash Maps',
    'Recursion',
    'Trees / BST',
    'Graphs',
    'Dynamic Programming',
    'DSA Algorithms',
    'OOP — Classes & Objects',
    'OOP — Methods',
    'OOP — Inheritance',
  ]

  for (const expectedTitle of expectedTitles) {
    const found = topics.find((t) => t.title === expectedTitle)
    assert(!!found, `Topic "${expectedTitle}" exists in centralized configuration`)
  }

  // 2. Questions bank completeness
  console.log('\n--- 2. QUESTION BANK INTEGRITY ---')
  const summariesJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../src/data/coding/summaries.json'), 'utf-8')
  )
  const questionsJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../src/data/coding/questions.json'), 'utf-8')
  )

  let totalQuestionsCount = 0
  for (const topic of topics) {
    const topicProblems = getCodingQuestionsByTopic(topic.id)
    assert(topicProblems.length > 0, `Topic ${topic.title} has problems (count: ${topicProblems.length})`)
    totalQuestionsCount += topicProblems.length
  }

  assert(totalQuestionsCount === 740, `Total questions imported across 24 topics is 740 (got ${totalQuestionsCount})`)
  assert(Object.keys(questionsJson).length === 740, `Full questions dictionary has 740 questions`)

  // 3. Question structure & example integrity
  console.log('\n--- 3. QUESTION SCHEMA & EXAMPLES ---')
  let sampleSlug = 'profile-echo'
  let sampleQuestion = getCodingQuestionBySlug(sampleSlug)
  assert(!!sampleQuestion, `Lookup for slug "${sampleSlug}" returns valid question`)
  if (sampleQuestion) {
    assert(sampleQuestion.title.length > 0, `Question has title: "${sampleQuestion.title}"`)
    assert(sampleQuestion.problemStatement.length > 0, 'Question has non-empty Problem Statement')
    assert(sampleQuestion.inputFormat.length > 0, 'Question has non-empty Input Format')
    assert(sampleQuestion.outputFormat.length > 0, 'Question has non-empty Output Format')
    assert(sampleQuestion.constraints.length > 0, 'Question has non-empty Constraints')
    assert(sampleQuestion.examples.length === 3, `Question has exactly 3 worked examples (got ${sampleQuestion.examples.length})`)
    for (let i = 0; i < sampleQuestion.examples.length; i++) {
      const ex = sampleQuestion.examples[i]
      assert(ex.input !== undefined, `Example ${i + 1} has input`)
      assert(ex.output !== undefined, `Example ${i + 1} has output`)
      assert(ex.explanation !== undefined, `Example ${i + 1} has explanation`)
    }
  }

  // 4. Security Check: Hidden Tests Isolation
  console.log('\n--- 4. SECURITY CHECK: HIDDEN TEST ISOLATION ---')
  const summariesRaw = fs.readFileSync(path.resolve(__dirname, '../src/data/coding/summaries.json'), 'utf-8')
  const questionsRaw = fs.readFileSync(path.resolve(__dirname, '../src/data/coding/questions.json'), 'utf-8')

  assert(!summariesRaw.includes('hiddenTests'), 'summaries.json does NOT contain "hiddenTests"')
  assert(!questionsRaw.includes('hiddenTests'), 'questions.json does NOT contain "hiddenTests"')
  assert(!summariesRaw.includes('serverTestCases'), 'summaries.json does NOT contain "serverTestCases"')
  assert(!questionsRaw.includes('serverTestCases'), 'questions.json does NOT contain "serverTestCases"')

  // 5. Question Count UI Checks
  console.log('\n--- 5. QUESTION COUNT DISPLAY CHECK ---')
  const uiFilesToCheck = [
    '../src/pages/learn/LearningModeSelectPage.tsx',
    '../src/pages/learn/CodingTopicsPage.tsx',
    '../src/pages/learn/CodingTopicProblemsPage.tsx',
    '../src/pages/learn/CodingQuestionDetailPage.tsx',
    '../src/components/learn/CodingTopicCard.tsx',
  ]

  const countPatternRegex = /\b(\d+\s*(questions|problems|challenges)|questions\s*:\s*\d+|total\s*questions)\b/i

  for (const relPath of uiFilesToCheck) {
    const fullPath = path.resolve(__dirname, relPath)
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const matches = content.match(countPatternRegex)
      assert(!matches, `File ${path.basename(relPath)} does not contain rendered question-count metadata`)
      if (matches) {
        console.error(`    Found match in ${relPath}: ${matches[0]}`)
      }
    }
  }

  // 6. Learn Loader Integration & Practice Isolation
  console.log('\n--- 6. LEARN LOADER & PRACTICE ISOLATION ---')
  const { findLearnQuestionBySlug } = await import('../src/data/learn/coding/index')
  const { DEFAULT_STARTER_CODES } = await import('../src/data/curriculum/index')

  const learnQuestion = findLearnQuestionBySlug('profile-echo')
  assert(!!learnQuestion, 'Learn question resolver returns question for profile-echo')
  assert(!getProblemByLanguageAndSlug('python', 'profile-echo'), 'Practice curriculum resolver does NOT return Learn questions (strict isolation)')

  assert(!!DEFAULT_STARTER_CODES.python, 'Starter code exists for Python')
  assert(!!DEFAULT_STARTER_CODES.java, 'Starter code exists for Java')
  assert(!!DEFAULT_STARTER_CODES.nodejs, 'Starter code exists for Node.js')
  assert(!!DEFAULT_STARTER_CODES.cpp, 'Starter code exists for C++')

  const visibleTests = learnQuestion?.visibleTests || []
  assert(visibleTests.length === 3, `Visible test count is 3 (got ${visibleTests.length})`)
  assert(learnQuestion?.testCaseMeta?.hiddenCount === 7, `Hidden test metadata count is 7 (got ${learnQuestion?.testCaseMeta?.hiddenCount})`)

  let hiddenDataLeaked = false
  for (const vt of visibleTests) {
    if (vt.input === undefined || vt.expectedOutput === undefined) {
      hiddenDataLeaked = true
    }
  }
  assert(!hiddenDataLeaked, 'Client visible tests contain valid inputs and expected outputs')

  // Verify safe testCaseMeta on CodingQuestion
  assert(sampleQuestion?.testCaseMeta?.visibleCount === 3, 'Question model has testCaseMeta.visibleCount === 3')
  assert(sampleQuestion?.testCaseMeta?.hiddenCount === 7, 'Question model has testCaseMeta.hiddenCount === 7')
  assert(sampleQuestion?.testCaseMeta?.totalCount === 10, 'Question model has testCaseMeta.totalCount === 10')

  // 7. Check server test cases
  const { codingTestCases } = await import('../src/server/data/codingTestCases')
  assert(Object.keys(codingTestCases).length === 740, `Server test cases dictionary has 740 entries`)
  const serverEntry = codingTestCases['profile-echo']
  assert(!!serverEntry, 'Server has test cases for sample problem')
  assert(serverEntry?.testCases?.length === 10, `Server has exactly 10 test cases for sample problem (got ${serverEntry?.testCases?.length})`)
  
  let totalServerVisible = 0
  let totalServerHidden = 0
  for (const entry of Object.values(codingTestCases)) {
    for (const tc of entry.testCases) {
      if (tc.isHidden) totalServerHidden++
      else totalServerVisible++
    }
  }
  assert(totalServerVisible === 2220, `Server dictionary has exactly 2,220 visible test cases (got ${totalServerVisible})`)
  assert(totalServerHidden === 5180, `Server dictionary has exactly 5,180 hidden test cases (got ${totalServerHidden})`)

  // 8. Evaluator Consistency (Run vs Submit Parity)
  console.log('\n--- 8. EVALUATOR RUN VS SUBMIT CONSISTENCY ---')
  const { executeQuestion } = await import('../src/server/executeService')
  const pyCode = `import sys\nparts = sys.stdin.read().split()\nif len(parts) >= 3:\n    a = int(parts[0])\n    b = int(parts[1])\n    c = int(parts[2])\n    print((a + b) * c - b)`
  const runResult = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'python', code: pyCode, isSubmit: false })
  const submitResult = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'python', code: pyCode, isSubmit: true })
  const prefixRunResult = await executeQuestion({ questionSlug: 'coding-arithmetic-check', language: 'python', code: pyCode, isSubmit: false })

  assert(runResult.total === 3 && runResult.judgeTotal === 10, 'Run Code evaluates the 3 visible cases (judge suite = 10)')
  assert(runResult.passed === 3, 'Run Code passes 3/3 visible cases with correct solution')
  assert(submitResult.total === 10, 'Submit Code evaluates all 10 test cases')
  assert(submitResult.passed === 10, 'Submit Code passes 10/10 with correct solution')
  assert(
    runResult.testCases.every((rc) => submitResult.testCases.find((t) => t.testIndex === rc.testIndex)?.status === rc.status),
    'Run Code and Submit Code agree on every visible case'
  )
  assert(prefixRunResult.passed === 3 && prefixRunResult.questionId === 'coding:arithmetic-check', 'Slug with coding- prefix resolves to the same question')

  let hasLeakedHidden = false
  for (const tc of [...runResult.testCases, ...submitResult.testCases]) {
    if (tc.testIndex >= 4) {
      if (tc.visible !== false || tc.input !== undefined || tc.expectedOutput !== undefined || tc.actualOutput !== undefined) {
        hasLeakedHidden = true
      }
    }
  }
  assert(!hasLeakedHidden, 'Hidden test cases never leak input, expectedOutput, or actualOutput in Run or Submit responses')

  console.log('\n====================================================')
  console.log(`TOTAL: ${passed} PASSED, ${failed} FAILED`)
  console.log('====================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error(err)
  process.exit(1)
})
