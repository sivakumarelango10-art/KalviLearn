import fs from 'node:fs'
import path from 'node:path'
import { parseQuestionBankMarkdown } from '../src/coding/parser'

const MARKDOWN_PATH = path.resolve('Topic_Wise_740_Unique_Programming_Questions.md')
const OUTPUT_DIR = path.resolve('src/data/coding')
const SERVER_DATA_DIR = path.resolve('src/server/data')
const SERVER_TEST_CASES_TS_PATH = path.join(SERVER_DATA_DIR, 'codingTestCases.ts')
const SERVER_TEST_CASES_JSON_PATH = path.join(SERVER_DATA_DIR, 'codingTestCases.json')

export function buildCodingBank(sourcePath = MARKDOWN_PATH) {
  console.log('📖 Reading Markdown question bank from:', sourcePath)
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Markdown question bank file not found: ${sourcePath}`)
  }

  const markdownContent = fs.readFileSync(sourcePath, 'utf-8')
  console.log(`📄 Markdown content read (${markdownContent.length} bytes). Parsing questions...`)

  const parsed = parseQuestionBankMarkdown(markdownContent)

  console.log(
    `🔍 Parsed ${parsed.stats.questionCount} questions across ${parsed.stats.topicCount} topics.`
  )
  console.log(
    `   Worked Examples: ${parsed.stats.exampleCount}, Visible Tests: ${parsed.stats.visibleTestCount}, Hidden Tests: ${parsed.stats.hiddenTestCount}`
  )

  // --- Strict Global Validations ---
  if (parsed.stats.questionCount !== 740) {
    throw new Error(`Validation failed: Expected 740 questions, but parsed ${parsed.stats.questionCount}`)
  }

  if (parsed.stats.topicCount !== 24) {
    throw new Error(`Validation failed: Expected 24 topics, but parsed ${parsed.stats.topicCount}`)
  }

  if (parsed.stats.exampleCount !== 2220) {
    throw new Error(`Validation failed: Expected 2,220 worked examples (740 × 3), but found ${parsed.stats.exampleCount}`)
  }

  if (parsed.stats.visibleTestCount !== 2220) {
    throw new Error(
      `Validation failed: Expected 2,220 visible judge tests (740 × 3), but found ${parsed.stats.visibleTestCount}. No fallbacks allowed.`
    )
  }

  if (parsed.stats.hiddenTestCount !== 5180) {
    throw new Error(
      `Validation failed: Expected 5,180 hidden judge tests (740 × 7), but found ${parsed.stats.hiddenTestCount}. No fallbacks allowed.`
    )
  }

  const totalJudgeTests = parsed.stats.visibleTestCount + parsed.stats.hiddenTestCount
  if (totalJudgeTests !== 7400) {
    throw new Error(
      `Validation failed: Expected 7,400 total judge tests (740 × 10), but found ${totalJudgeTests}`
    )
  }

  // --- Per-Question Validations ---
  const seenSlugs = new Set<string>()
  for (const q of parsed.allQuestions) {
    if (!q.title || !q.title.trim()) {
      throw new Error(`Validation failed: Question ${q.id} has empty title`)
    }
    if (!q.topicId || !q.topicTitle) {
      throw new Error(`Validation failed: Question ${q.title} missing topic association`)
    }
    if (!q.problemStatement || !q.problemStatement.trim()) {
      throw new Error(`Validation failed: Question ${q.title} has empty Problem Statement`)
    }
    if (!q.inputFormat || !q.inputFormat.trim()) {
      throw new Error(`Validation failed: Question ${q.title} has empty Input Format`)
    }
    if (!q.outputFormat || !q.outputFormat.trim()) {
      throw new Error(`Validation failed: Question ${q.title} has empty Output Format`)
    }
    if (!q.constraints || !q.constraints.trim()) {
      throw new Error(`Validation failed: Question ${q.title} has empty Constraints`)
    }
    if (!q.examples || q.examples.length !== 3) {
      throw new Error(
        `Validation failed: Question ${q.title} must have exactly 3 worked examples (found ${q.examples?.length})`
      )
    }
    for (let i = 0; i < q.examples.length; i++) {
      const ex = q.examples[i]
      if (typeof ex.input !== 'string' || typeof ex.output !== 'string') {
        throw new Error(`Validation failed: Example ${i + 1} of question ${q.title} missing input/output`)
      }
    }

    // Strict Judge Test Validation per question: exactly 3 visible + 7 hidden = 10 total
    if (!q.visibleTests || q.visibleTests.length !== 3) {
      throw new Error(
        `Validation failed: Question ${q.title} must have exactly 3 visible judge tests (found ${q.visibleTests?.length || 0})`
      )
    }

    if (
      !q.testCaseMeta ||
      q.testCaseMeta.visibleCount !== 3 ||
      q.testCaseMeta.hiddenCount !== 7 ||
      q.testCaseMeta.totalCount !== 10
    ) {
      throw new Error(`Validation failed: Question ${q.title} missing or invalid testCaseMeta`)
    }

    const serverEntry = parsed.serverTestCasesBySlug[q.slug]
    if (!serverEntry || !serverEntry.testCases) {
      throw new Error(`Validation failed: Question ${q.title} missing server evaluator entry`)
    }

    const hiddenTests = serverEntry.testCases.filter((tc) => tc.isHidden)
    if (hiddenTests.length !== 7) {
      throw new Error(
        `Validation failed: Question ${q.title} must have exactly 7 hidden judge tests (found ${hiddenTests.length})`
      )
    }

    if (serverEntry.testCases.length !== 10) {
      throw new Error(
        `Validation failed: Question ${q.title} must have exactly 10 total judge test cases (found ${serverEntry.testCases.length})`
      )
    }

    for (let i = 0; i < serverEntry.testCases.length; i++) {
      const tc = serverEntry.testCases[i]
      if (typeof tc.input !== 'string' || typeof tc.expectedOutput !== 'string') {
        throw new Error(
          `Validation failed: Test case ${i + 1} of question ${q.title} missing input/expectedOutput`
        )
      }
    }

    if (seenSlugs.has(q.slug)) {
      throw new Error(`Validation failed: Duplicate slug detected: ${q.slug}`)
    }
    seenSlugs.add(q.slug)
  }

  console.log(
    '✅ Validation passed: All 740 questions contain complete sections, 3 worked examples, and exactly 10 judge tests (3 visible + 7 hidden).'
  )

  // --- Write Client Artifacts ---
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // 1. Client Question Summaries per topic (zero hidden tests)
  const summariesFile = path.join(OUTPUT_DIR, 'summaries.json')
  fs.writeFileSync(summariesFile, JSON.stringify(parsed.summariesByTopic, null, 2), 'utf-8')
  console.log(`💾 Saved topic summaries to: ${summariesFile}`)

  // 2. Client Questions by Slug (full problem statements, constraints, worked examples, 3 visible tests, ZERO hidden tests)
  const questionsFile = path.join(OUTPUT_DIR, 'questions.json')
  fs.writeFileSync(questionsFile, JSON.stringify(parsed.questionsBySlug, null, 2), 'utf-8')
  console.log(`💾 Saved full client-safe questions to: ${questionsFile}`)

  // --- Write Server Evaluator Test Cases ---
  if (!fs.existsSync(SERVER_DATA_DIR)) {
    fs.mkdirSync(SERVER_DATA_DIR, { recursive: true })
  }

  const serverCodingTestCases: Record<
    string,
    {
      title: string
      slug: string
      id: string
      testCases: Array<{ testIndex: number; input: string; expectedOutput: string; isHidden: boolean }>
    }
  > = {}

  for (const q of parsed.allQuestions) {
    const entry = parsed.serverTestCasesBySlug[q.slug]
    serverCodingTestCases[q.slug] = {
      title: q.title,
      slug: q.slug,
      id: q.id,
      testCases: entry ? entry.testCases : [],
    }
  }

  // Write server JSON for audit inspection and server tests
  fs.writeFileSync(
    SERVER_TEST_CASES_JSON_PATH,
    JSON.stringify(serverCodingTestCases, null, 2),
    'utf-8'
  )
  console.log(`💾 Saved server evaluation JSON to: ${SERVER_TEST_CASES_JSON_PATH}`)

  // Write server TS export
  const serverTsContent = `/**
 * Generated Server Test Cases for 740 Coding Bank Questions.
 * Generated from ${path.basename(sourcePath)}.
 * Authoritative single source of truth: Markdown test cases only.
 * DO NOT EDIT DIRECTLY.
 */
export const codingTestCases: Record<
  string,
  {
    title: string
    slug: string
    id: string
    testCases: Array<{
      testIndex: number
      input: string
      expectedOutput: string
      isHidden: boolean
    }>
  }
> = ${JSON.stringify(serverCodingTestCases, null, 2)}
`

  fs.writeFileSync(SERVER_TEST_CASES_TS_PATH, serverTsContent, 'utf-8')
  console.log(`💾 Saved server evaluation test cases to: ${SERVER_TEST_CASES_TS_PATH}`)

  return parsed
}

// Run directly when executed
if (process.argv[1]?.includes('build-coding-bank')) {
  try {
    const customSource = process.argv[2]
    buildCodingBank(customSource ? path.resolve(customSource) : MARKDOWN_PATH)
    console.log('🎉 Coding bank build successfully completed!')
  } catch (err) {
    console.error('❌ Build coding bank failed:', err)
    process.exit(1)
  }
}
