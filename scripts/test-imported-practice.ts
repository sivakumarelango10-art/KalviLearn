import fs from 'fs'
import path from 'path'
import { getCurriculum, getProblemByLanguageAndSlug, SUPPORTED_LANGUAGES } from '../src/data/curriculum/index'
import { serverTestCases } from '../src/server/data/serverTestCases'

interface ProblemItem {
  order: number
  id: string
  globalNumber?: number
  subdivision?: string
  title: string
  slug: string
  legacySlug?: string
  difficulty: string
  description: string
  inputFormat: string
  outputFormat: string
  constraints?: string
  explanation?: string
  exampleExplanation?: string
  examples?: Array<{ input: string; output: string; explanation: string }>
  starterCodes?: Record<string, string>
  testCases?: Array<{ testIndex: number; input?: string; expectedOutput?: string; isHidden: boolean }>
}

interface BeltItem {
  order: number
  name: string
  title: string
  description: string
  color: string
  problems: ProblemItem[]
}

const EXPECTED_BELT_COUNTS = [20, 30, 35, 40, 40, 40, 60, 65, 80, 90]

async function runImportValidationSuite() {
  console.log('========================================================================')
  console.log('🧪 KALVILEARN 10-BELT 500-QUESTION BANK VALIDATION SUITE')
  console.log('========================================================================\n')

  let passedCount = 0
  let failedCount = 0

  function assert(condition: boolean, testName: string, detail?: unknown) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`)
      passedCount++
    } else {
      console.error(`  ❌ [FAIL] ${testName}`, detail || '')
      failedCount++
      process.exitCode = 1
    }
  }

  const problemsJsonPath = path.resolve('src/data/problems.json')
  const belts: BeltItem[] = JSON.parse(fs.readFileSync(problemsJsonPath, 'utf8'))
  const allProblems = belts.flatMap((b) => b.problems)

  console.log('--- 1. Question Identity & Total Count ---')
  assert(belts.length === 10, 'Total Belts equals 10 (found ' + belts.length + ')')
  const questionIds = allProblems.map((p) => p.id)
  const uniqueIds = new Set(questionIds)
  assert(questionIds.length === 500, 'Total questions equals 500 (found ' + questionIds.length + ')')
  assert(uniqueIds.size === 500, 'Every question has a unique ID (found ' + uniqueIds.size + ')')

  console.log('\n--- 2. Slug Uniqueness & Formatting ---')
  const slugs = allProblems.map((p) => p.slug)
  const uniqueSlugs = new Set(slugs)
  assert(uniqueSlugs.size === 500, 'Every problem slug is unique (found ' + uniqueSlugs.size + ')')
  assert(
    slugs.every((s) => /^belt-(10|[1-9])-q\d+-[a-z0-9-]+$/.test(s)),
    'All slugs follow belt-{belt}-q{order}-{slug} format'
  )

  console.log('\n--- 3. Required Problem Fields & Explanations ---')
  const missingFields: string[] = []
  let missingExplCount = 0

  allProblems.forEach((p) => {
    if (!p.title) missingFields.push(`${p.id}: title`)
    if (!p.description) missingFields.push(`${p.id}: description`)
    if (!p.inputFormat) missingFields.push(`${p.id}: inputFormat`)
    if (!p.outputFormat) missingFields.push(`${p.id}: outputFormat`)
    if (!p.constraints) missingFields.push(`${p.id}: constraints`)
    if (!p.difficulty || !['Easy', 'Medium', 'Hard'].includes(p.difficulty)) missingFields.push(`${p.id}: difficulty`)
    if (!p.starterCodes?.python || !p.starterCodes?.javascript || !p.starterCodes?.cpp || !p.starterCodes?.java) {
      missingFields.push(`${p.id}: starterCodes`)
    }
    if (!p.examples || p.examples.length < 2 || !p.examples[0].explanation || !p.examples[1].explanation) {
      missingExplCount++
    }
  })
  assert(missingFields.length === 0, 'All 500 problems contain complete required fields', missingFields)
  assert(missingExplCount === 0, 'All 500 problems contain worked examples with non-empty explanations')

  console.log('\n--- 4. Client vs Server Test Case Partitioning & Protection ---')
  let clientLeakage = 0
  let visibleMissing = 0
  allProblems.forEach((p) => {
    if (!p.testCases || p.testCases.length !== 10) {
      clientLeakage++
      return
    }
    // Cases 1..3 visible
    for (let i = 0; i < 3; i++) {
      const tc = p.testCases[i]
      if (tc.isHidden || !tc.input || !tc.expectedOutput) visibleMissing++
    }
    // Cases 4..10 hidden
    for (let i = 3; i < 10; i++) {
      const tc = p.testCases[i]
      if (!tc.isHidden || tc.input !== undefined || tc.expectedOutput !== undefined) clientLeakage++
    }
  })
  assert(visibleMissing === 0, 'All 1500 visible test cases (cases 1-3) have inputs and expected outputs')
  assert(clientLeakage === 0, 'Zero hidden test cases (cases 4-10) leak input/output in client JSON (0 / 3500 leaked)')

  console.log('\n--- 5. Server Test Cases Authoritativeness & Exact Mapping ---')
  let serverMissingCases = 0
  let serverEmptyInput = 0
  let serverEmptyOutput = 0
  allProblems.forEach((p) => {
    const serverItem = (serverTestCases as Record<string, any>)[p.slug]
    if (!serverItem || !Array.isArray(serverItem.testCases) || serverItem.testCases.length !== 10) {
      serverMissingCases++
      return
    }
    serverItem.testCases.forEach((tc: any) => {
      if (tc.input === undefined || tc.input === null) serverEmptyInput++
      if (tc.expectedOutput === undefined || tc.expectedOutput === null) serverEmptyOutput++
    })
  })
  assert(serverMissingCases === 0, 'All 500 problems resolve in serverTestCases with exactly 10 test cases')
  assert(serverEmptyInput === 0, 'All 5000 server test cases contain defined inputs')
  assert(serverEmptyOutput === 0, 'All 5000 server test cases contain defined expected outputs')

  console.log('\n--- 6. Deterministic Belt & Order Hierarchy ---')
  EXPECTED_BELT_COUNTS.forEach((expectedCount, idx) => {
    const beltNum = idx + 1
    assert(
      belts[idx]?.problems.length === expectedCount,
      `Belt ${beltNum} contains exactly ${expectedCount} problems (found ${belts[idx]?.problems.length})`
    )
  })

  const orderCorrect = belts.every((b) =>
    b.problems.every((p, idx) => p.order === idx + 1)
  )
  assert(orderCorrect, 'Problems within every belt are deterministically ordered 1..N')

  console.log('\n--- 7. Multi-Language Curriculum Loading & Resolution ---')
  SUPPORTED_LANGUAGES.forEach((lang) => {
    const curr = getCurriculum(lang)
    assert(curr.language === lang, `Curriculum loaded for ${lang}`)
    const totalLangProblems = curr.belts.reduce((acc, b) => acc + b.problems.length, 0)
    assert(totalLangProblems === 500, `${lang} curriculum resolves all 500 problems`)

    // Verify first, middle, and last problem can be resolved by slug
    const firstP = getProblemByLanguageAndSlug(lang, allProblems[0].slug)
    const midP = getProblemByLanguageAndSlug(lang, allProblems[250].slug)
    const lastP = getProblemByLanguageAndSlug(lang, allProblems[499].slug)

    assert(firstP !== null && firstP.title === allProblems[0].title, `${lang} resolves first problem (${allProblems[0].slug})`)
    assert(midP !== null && midP.title === allProblems[250].title, `${lang} resolves mid problem (${allProblems[250].slug})`)
    assert(lastP !== null && lastP.title === allProblems[499].title, `${lang} resolves last problem (${allProblems[499].slug})`)
  })

  console.log('\n========================================================================')
  console.log(`🏁 IMPORT VALIDATION COMPLETE: ${passedCount} PASSED, ${failedCount} FAILED`)
  console.log('========================================================================\n')

  if (failedCount > 0) {
    process.exit(1)
  }
}

runImportValidationSuite().catch((err) => {
  console.error('Fatal validation suite error:', err)
  process.exit(1)
})
