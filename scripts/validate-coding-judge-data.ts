import { codingTestCases } from '../src/server/data/codingTestCases'

export function validateCodingJudgeData(): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const questionKeys = Object.keys(codingTestCases)

  if (questionKeys.length !== 740) {
    errors.push(`Expected 740 questions in codingTestCases, got ${questionKeys.length}`)
  }

  for (const [slug, q] of Object.entries(codingTestCases)) {
    if (!q.testCases || q.testCases.length !== 10) {
      errors.push(`Question "${slug}" does not have 10 test cases (found ${q.testCases?.length || 0})`)
      continue
    }

    const visibleCount = q.testCases.filter((tc) => !tc.isHidden).length
    const hiddenCount = q.testCases.filter((tc) => tc.isHidden).length

    if (visibleCount !== 3) {
      errors.push(`Question "${slug}" has ${visibleCount} visible cases (expected 3)`)
    }
    if (hiddenCount !== 7) {
      errors.push(`Question "${slug}" has ${hiddenCount} hidden cases (expected 7)`)
    }

    for (let i = 0; i < q.testCases.length; i++) {
      const tc = q.testCases[i]
      const expectedIndex = i + 1

      if (tc.testIndex !== expectedIndex) {
        errors.push(`Question "${slug}" case at index ${i} has testIndex ${tc.testIndex} (expected ${expectedIndex})`)
      }

      // Check for accidental Markdown markers, code fences, or HTML comments
      const markers = [
        '<!--',
        '-->',
        'HIDDEN_TEST_CASES_START',
        'HIDDEN_TEST_CASES_END',
        '```',
        '#####',
        '####',
        '###',
      ]

      for (const marker of markers) {
        if (tc.input.includes(marker)) {
          errors.push(`Question "${slug}" Case ${tc.testIndex} input contains marker "${marker}": ${JSON.stringify(tc.input)}`)
        }
        if (tc.expectedOutput.includes(marker)) {
          errors.push(`Question "${slug}" Case ${tc.testIndex} expectedOutput contains marker "${marker}": ${JSON.stringify(tc.expectedOutput)}`)
        }
      }

      if (tc.expectedOutput === undefined || tc.expectedOutput === null) {
        errors.push(`Question "${slug}" Case ${tc.testIndex} has missing expected output`)
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

console.log('========================================================================')
console.log('🔍 VALIDATING ALL 740 CODING BANK JUDGE DATA (7,400 CASES)')
console.log('========================================================================\n')

const result = validateCodingJudgeData()
if (result.valid) {
  console.log('✅ ALL 740 QUESTIONS VALIDATED: 7,400 test cases are clean and well-formed!')
  console.log('   - 0 accidental Markdown fences')
  console.log('   - 0 HTML comment markers')
  console.log('   - Exact 10 cases per question (3 visible, 7 hidden)')
  console.log('   - Exact testIndex ordering 1 to 10\n')
} else {
  console.error(`❌ Validation failed with ${result.errors.length} errors:`)
  result.errors.slice(0, 20).forEach((err) => console.error('   -', err))
  process.exit(1)
}

console.log('========================================================================')
console.log('🧮 INDEPENDENT MATHEMATICAL ORACLE VERIFICATION')
console.log('========================================================================\n')

let oraclePassed = 0
let oracleTotal = 0

function assertOracle(condition: boolean, msg: string) {
  oracleTotal++
  if (condition) {
    console.log(`  ✅ [ORACLE PASS] ${msg}`)
    oraclePassed++
  } else {
    console.error(`  ❌ [ORACLE FAIL] ${msg}`)
    process.exitCode = 1
  }
}

// 1. Arithmetic Check Oracle: (a + b) * c - b
const arithQ = codingTestCases['arithmetic-check']
if (arithQ) {
  for (let i = 0; i < arithQ.testCases.length; i++) {
    const tc = arithQ.testCases[i]
    const [a, b, c] = tc.input.trim().split(/\s+/).map(Number)
    const expected = (a + b) * c - b
    assertOracle(
      String(expected) === tc.expectedOutput.trim(),
      `Arithmetic Check Case ${tc.testIndex} ${tc.isHidden ? '🔒' : ' '}: (${a}+${b})*${c}-${b} = ${expected} === ${tc.expectedOutput.trim()}`
    )
  }
}

// 2. Weighted Triple: 2*a + 3*b + 5*c
const weightedQ = codingTestCases['weighted-triple']
if (weightedQ) {
  for (let i = 0; i < weightedQ.testCases.length; i++) {
    const tc = weightedQ.testCases[i]
    const [a, b, c] = tc.input.trim().split(/\s+/).map(Number)
    const expected = 2 * a + 3 * b + 5 * c
    assertOracle(
      String(expected) === tc.expectedOutput.trim(),
      `Weighted Triple Case ${tc.testIndex} ${tc.isHidden ? '🔒' : ' '}: 2*${a}+3*${b}+5*${c} = ${expected} === ${tc.expectedOutput.trim()}`
    )
  }
}

// 3. Linear Combination: a*b + c
const linearQ = codingTestCases['linear-combination']
if (linearQ) {
  for (let i = 0; i < linearQ.testCases.length; i++) {
    const tc = linearQ.testCases[i]
    const [a, b, c] = tc.input.trim().split(/\s+/).map(Number)
    const expected = a * b + c
    assertOracle(
      String(expected) === tc.expectedOutput.trim(),
      `Linear Combination Case ${tc.testIndex} ${tc.isHidden ? '🔒' : ' '}: ${a}*${b}+${c} = ${expected} === ${tc.expectedOutput.trim()}`
    )
  }
}

// 4. Difference Product: (a-b)*(b-c)
const diffQ = codingTestCases['difference-product']
if (diffQ) {
  for (let i = 0; i < diffQ.testCases.length; i++) {
    const tc = diffQ.testCases[i]
    const [a, b, c] = tc.input.trim().split(/\s+/).map(Number)
    const expected = (a - b) * (b - c)
    assertOracle(
      String(expected) === tc.expectedOutput.trim(),
      `Difference Product Case ${tc.testIndex} ${tc.isHidden ? '🔒' : ' '}: (${a}-${b})*(${b}-${c}) = ${expected} === ${tc.expectedOutput.trim()}`
    )
  }
}

// Verify all 740 questions in questions.json map to codingTestCases
import questions from '../src/data/coding/questions.json' with { type: 'json' }
import { executeQuestion } from '../src/server/executeService'

console.log('========================================================================')
console.log('🔗 VERIFYING QUESTION MAP (740 QUESTIONS -> CODING TEST CASES)')
console.log('========================================================================\n')

let mappingErrors = 0
const questionsList = Object.values(questions) as any[]
for (const q of questionsList) {
  const cleanSlug = q.slug.replace(/^coding-/, '')
  const found = (codingTestCases as any)[cleanSlug] || (codingTestCases as any)[q.slug] || (codingTestCases as any)[q.id]
  if (!found) {
    console.error(`❌ Missing in codingTestCases: slug=${q.slug}, id=${q.id}`)
    mappingErrors++
  }
}
if (mappingErrors === 0) {
  console.log(`✅ All ${questionsList.length} questions successfully map to codingTestCases!\n`)
} else {
  console.error(`❌ ${mappingErrors} questions failed to map to codingTestCases!\n`)
  process.exit(1)
}

console.log('========================================================================')
console.log('🔍 RAW CHARACTER INSPECTION: Arithmetic Check (All 10 Cases)')
console.log('========================================================================\n')
if (arithQ) {
  arithQ.testCases.forEach((tc) => {
    console.log(
      `Case ${tc.testIndex} ${tc.isHidden ? '🔒' : ' '}: ` +
      `input=${JSON.stringify(tc.input)}, ` +
      `expectedOutput=${JSON.stringify(tc.expectedOutput)}`
    )
  })
}

console.log('\n========================================================================')
console.log('⚡ MULTI-LANGUAGE REAL EXECUTION TEST: Arithmetic Check (10/10 Expected)')
console.log('========================================================================\n')

async function testAllLanguages() {
  // Python 3
  const pyCode = 'a, b, c = map(int, input().split())\nprint((a + b) * c - b)\n'
  const pyRes = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'python', code: pyCode, isSubmit: true })
  console.log(`Python 3 Execution   : passed ${pyRes.passed} / ${pyRes.total}, status: ${pyRes.status}`)
  if (pyRes.passed !== 10) throw new Error(`Python failed: ${JSON.stringify(pyRes)}`)

  // Node.js (JavaScript)
  const jsCode = 'const fs = require("fs");\nconst [a, b, c] = fs.readFileSync(0, "utf-8").trim().split(/\\s+/).map(Number);\nconsole.log((a + b) * c - b);\n'
  const jsRes = await executeQuestion({ questionSlug: 'arithmetic-check', language: 'nodejs', code: jsCode, isSubmit: true })
  console.log(`Node.js Execution    : passed ${jsRes.passed} / ${jsRes.total}, status: ${jsRes.status}`)
  if (jsRes.passed !== 10) throw new Error(`Node.js failed: ${JSON.stringify(jsRes)}`)

  console.log('\n✅ All language runners passed 10/10 on Arithmetic Check!')
}

await testAllLanguages()

console.log(`\n========================================================================`)
console.log(`🏁 ALL AUDITS COMPLETED SUCCESSFULLY!`)
console.log(`========================================================================\n`)

