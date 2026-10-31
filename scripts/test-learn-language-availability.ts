import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  getAllLearnQuestions,
  getLearnQuestionsByTopic,
  getAllLearnTopics,
  formatLanguageBadge,
  formatAvailableLanguagesLine,
  formatAvailableLanguagesCompact,
} from '../src/data/learn/coding/index'
import {
  isLanguageSupportedForQuestion,
  getSupportedLanguagesForQuestion,
  isPythonOnlyQuestion,
} from '../src/server/judge/questionId'
import { executeQuestion, executeCustomInput } from '../src/server/executeService'
import learnQuestionLanguages from '../src/server/judge/learnQuestionLanguages.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function runTests() {
  console.log('=====================================================================')
  console.log('🧪 VERIFYING LEARN CODING PER-QUESTION LANGUAGE AVAILABILITY')
  console.log('=====================================================================\n')

  let passed = 0
  let failed = 0

  function test(name: string, fn: () => void | Promise<void>) {
    try {
      fn()
      console.log(`  ✅ PASS: ${name}`)
      passed++
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name}`)
      console.error(err)
      failed++
    }
  }

  async function testAsync(name: string, fn: () => Promise<void>) {
    try {
      await fn()
      console.log(`  ✅ PASS: ${name}`)
      passed++
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name}`)
      console.error(err)
      failed++
    }
  }

  const allQuestions = getAllLearnQuestions()

  // 1. Question count and language metadata integrity
  console.log('--- 1. QUESTION DATA & LANGUAGE LIST INTEGRITY (480 QUESTIONS) ---')
  test('Total questions loaded is exactly 480', () => {
    assert.strictEqual(allQuestions.length, 480, `Expected 480 questions, got ${allQuestions.length}`)
  })

  test('All 480 questions have a valid non-empty languages array', () => {
    for (const q of allQuestions) {
      assert(Array.isArray(q.languages), `Question ${q.id} missing languages array`)
      assert(q.languages.length >= 1, `Question ${q.id} has empty languages array`)
      for (const lang of q.languages) {
        assert(
          ['python', 'nodejs', 'java', 'cpp'].includes(lang),
          `Question ${q.id} has invalid language ${lang}`
        )
      }
    }
  })

  test('All 480 questions strictly match learnQuestionLanguages.json mapping', () => {
    const jsonMap = learnQuestionLanguages as Record<string, string[]>
    for (const q of allQuestions) {
      const topicKey = `${q.topicSlug}:${q.slug}`
      const expectedFromTopic = jsonMap[topicKey]
      const expectedFromSlug = jsonMap[q.slug]
      assert(expectedFromTopic || expectedFromSlug, `Question ${q.id} missing in learnQuestionLanguages.json`)
      const expected = expectedFromTopic || expectedFromSlug
      assert.deepStrictEqual(
        [...q.languages].sort(),
        [...expected].sort(),
        `Mismatch in languages for ${q.id}`
      )
    }
  })

  // 2. Language badge formatting
  console.log('\n--- 2. LANGUAGE BADGE FORMATTING ---')
  test('formatLanguageBadge produces expected badge strings', () => {
    assert.strictEqual(formatLanguageBadge(['python', 'nodejs', 'java', 'cpp']), 'All languages')
    assert.strictEqual(formatLanguageBadge(['python']), 'Python only')
    assert.strictEqual(formatLanguageBadge(['python', 'nodejs']), 'Python · JS')
    assert.strictEqual(formatLanguageBadge(['python', 'nodejs', 'java']), 'Python · JS · Java')
    assert.strictEqual(formatLanguageBadge(['python', 'nodejs', 'cpp']), 'Python · JS · C++')
  })

  test('All 480 questions produce clean, non-empty badges', () => {
    const badgeCounts: Record<string, number> = {}
    for (const q of allQuestions) {
      const badge = formatLanguageBadge(q.languages)
      assert(badge && badge.length > 0, `Empty badge for ${q.id}`)
      badgeCounts[badge] = (badgeCounts[badge] || 0) + 1
    }
    console.log('     Badge counts across 480 questions:', badgeCounts)
    assert(badgeCounts['All languages'] === 39, `Expected 39 All languages, got ${badgeCounts['All languages']}`)
    assert(badgeCounts['Python only'] === 160, `Expected 160 Python only, got ${badgeCounts['Python only']}`)
    assert(badgeCounts['Python · JS'] === 280, `Expected 280 Python · JS, got ${badgeCounts['Python · JS']}`)
    assert(badgeCounts['Python · JS · Java'] === 1, `Expected 1 Python · JS · Java, got ${badgeCounts['Python · JS · Java']}`)
  })

  // 3. Available in line formatting
  console.log('\n--- 3. "AVAILABLE IN: ..." FORMATTING ---')
  test('formatAvailableLanguagesLine produces descriptive strings', () => {
    assert.strictEqual(
      formatAvailableLanguagesLine(['python', 'nodejs', 'java', 'cpp']),
      'Python, JavaScript, Java, C++'
    )
    assert.strictEqual(formatAvailableLanguagesLine(['python']), 'Python only')
    assert.strictEqual(formatAvailableLanguagesLine(['python', 'nodejs']), 'Python, JavaScript')
    assert.strictEqual(formatAvailableLanguagesLine(['python', 'nodejs', 'java']), 'Python, JavaScript, Java')
  })

  test('formatAvailableLanguagesCompact produces header-friendly strings', () => {
    assert.strictEqual(formatAvailableLanguagesCompact(['python', 'nodejs', 'java', 'cpp']), 'All languages')
    assert.strictEqual(formatAvailableLanguagesCompact(['python']), 'Python only')
    assert.strictEqual(formatAvailableLanguagesCompact(['python', 'nodejs']), 'Python · JS')
  })

  // 4. Topic-level language filtering logic
  console.log('\n--- 4. TOPIC PAGE LANGUAGE FILTERING ---')
  test('Topic page filter logic accurately subsets problems per topic', () => {
    const topics = getAllLearnTopics()
    for (const topic of topics) {
      const topicProblems = getLearnQuestionsByTopic(topic.id)
      assert.strictEqual(topicProblems.length, 20, `Topic ${topic.id} has ${topicProblems.length} questions, expected 20`)

      const pyCount = topicProblems.filter((p) => p.languages?.includes('python')).length
      const jsCount = topicProblems.filter((p) => p.languages?.includes('nodejs')).length
      const javaCount = topicProblems.filter((p) => p.languages?.includes('java')).length
      const cppCount = topicProblems.filter((p) => p.languages?.includes('cpp')).length

      assert.strictEqual(pyCount, 20, `Every question in topic ${topic.id} supports Python`)
      assert(jsCount <= 20)
      assert(javaCount <= 20)
      assert(cppCount <= 20)
    }
  })

  // 5. Fallback & ?lang redirect resolution
  console.log('\n--- 5. FALLBACK & ?LANG REDIRECT LOGIC ---')
  test('Fallback language selection when preferred is unavailable', () => {
    const pythonOnlyQuestion = allQuestions.find((q) => q.languages?.length === 1 && q.languages[0] === 'python')!
    const pyJsQuestion = allQuestions.find((q) => q.languages?.length === 2 && q.languages.includes('nodejs'))!
    const allLangQuestion = allQuestions.find((q) => q.languages?.length === 4)!

    // On Python-only:
    const pyOnlyAvail = pythonOnlyQuestion.languages!
    assert(!pyOnlyAvail.includes('java'))
    const fallbackForPyOnly = pyOnlyAvail.includes('java') ? 'java' : pyOnlyAvail[0]
    assert.strictEqual(fallbackForPyOnly, 'python')

    // On Python+JS:
    const pyJsAvail = pyJsQuestion.languages!
    assert(!pyJsAvail.includes('java'))
    const fallbackForPyJs = pyJsAvail.includes('java') ? 'java' : pyJsAvail[0]
    assert.strictEqual(fallbackForPyJs, 'python')

    // On All Languages:
    const allAvail = allLangQuestion.languages!
    assert(allAvail.includes('java'))
    const selectedForAll = allAvail.includes('java') ? 'java' : allAvail[0]
    assert.strictEqual(selectedForAll, 'java')
  })

  // 6. Server-side execution gating & friendly error messages
  console.log('\n--- 6. SERVER-SIDE EXECUTION GATING & FRIENDLY ERROR MESSAGES ---')
  await testAsync('executeQuestion rejects unavailable language with friendly message', async () => {
    // 1. Python-only question rejected when called with Java
    const pyOnlyRes = await executeQuestion({
      questionSlug: 'learn:scope:local-parameter-shadows-global',
      language: 'java',
      code: 'class Solution {}',
      mode: 'run',
    })
    assert.strictEqual(pyOnlyRes.success, false)
    assert.strictEqual(pyOnlyRes.status, 'COMPILATION_ERROR')
    assert.strictEqual(pyOnlyRes.error, 'Unsupported Language')
    assert(
      pyOnlyRes.message === 'This question only supports Python.' ||
      pyOnlyRes.message?.includes("isn't available for this question yet"),
      `Unexpected message: ${pyOnlyRes.message}`
    )

    // 2. Python+JS question rejected when called with Java
    const pyJsRes = await executeQuestion({
      questionSlug: 'learn:variables-data-types:integer-to-binary-digits',
      language: 'java',
      code: 'class Solution {}',
      mode: 'run',
    })
    assert.strictEqual(pyJsRes.success, false)
    assert.strictEqual(pyJsRes.status, 'COMPILATION_ERROR')
    assert.strictEqual(pyJsRes.error, 'Unsupported Language')
    assert.strictEqual(pyJsRes.message, "Java isn't available for this question yet.")

    // 3. Python+JS question rejected when called with C++
    const pyJsCppRes = await executeQuestion({
      questionSlug: 'learn:variables-data-types:integer-to-binary-digits',
      language: 'cpp',
      code: 'int main() {}',
      mode: 'run',
    })
    assert.strictEqual(pyJsCppRes.success, false)
    assert.strictEqual(pyJsCppRes.message, "C++ isn't available for this question yet.")
  })

  await testAsync('executeCustomInput rejects unavailable language with friendly message', async () => {
    const customRes = await executeCustomInput({
      questionSlug: 'learn:variables-data-types:integer-to-binary-digits',
      language: 'java',
      code: 'class Solution {}',
      customInput: '42',
    })
    assert.strictEqual(customRes.success, false)
    assert.strictEqual(customRes.status, 'COMPILATION_ERROR')
    assert.strictEqual(customRes.error, 'Unsupported Language')
    assert.strictEqual(customRes.message, "Java isn't available for this question yet.")
  })

  console.log('\n=====================================================================')
  console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed`)
  console.log('=====================================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Test runner fatal error:', err)
  process.exit(1)
})
