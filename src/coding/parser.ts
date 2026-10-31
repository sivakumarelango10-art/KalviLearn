import { CODING_TOPICS, normalizeTopicTitle } from './topics'
import type {
  CodingExample,
  CodingQuestion,
  CodingQuestionSummary,
  JudgeTestCase,
} from './types'

export interface ParseResult {
  allQuestions: CodingQuestion[]
  questionsBySlug: Record<string, CodingQuestion>
  summariesByTopic: Record<string, CodingQuestionSummary[]>
  topicMap: Map<string, CodingQuestion[]>
  serverTestCasesBySlug: Record<
    string,
    { slug: string; title: string; testCases: JudgeTestCase[] }
  >
  stats: {
    topicCount: number
    questionCount: number
    exampleCount: number
    visibleTestCount: number
    hiddenTestCount: number
  }
}

/**
 * Creates URL-friendly slug from question title
 */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

/**
 * Parses a worked example markdown section
 */
export function parseWorkedExample(block: string): CodingExample {
  const inMatch =
    block.match(/\*\*Input\*\*\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
    block.match(/###\s*Input\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
    block.match(/Input:?\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i)

  const outMatch =
    block.match(/\*\*Output\*\*\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
    block.match(/###\s*Output\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
    block.match(/Output:?\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i)

  const expMatch =
    block.match(/\*\*Explanation\*\*\s*\n([\s\S]*?)(?=\n###|\n##|\n#|$)/i) ||
    block.match(/###\s*Explanation\s*\n([\s\S]*?)(?=\n###|\n##|\n#|$)/i) ||
    block.match(/Explanation:?\s*\n([\s\S]*?)(?=\n###|\n##|\n#|$)/i)

  return {
    input: inMatch ? inMatch[1].trim() : '',
    output: outMatch ? outMatch[1].trim() : '',
    explanation: expMatch ? expMatch[1].trim() : '',
  }
}

/**
 * Parses judge test cases (both visible and hidden).
 * Authoritative format:
 * - `### Test Cases`
 * - `#### Visible Test Cases`
 * - `##### Test Case 1 — Visible`
 * - `<!-- HIDDEN_TEST_CASES_START`
 * - `##### Test Case 4 — Hidden` ... `##### Test Case 10 — Hidden`
 * - `HIDDEN_TEST_CASES_END -->`
 *
 * Supports heading depths 3 to 5 (###, ####, #####).
 * Unstrips HTML comments so hidden cases inside comments are fully parsed.
 */
export function parseJudgeTestCases(qBlock: string): {
  visibleTests: JudgeTestCase[]
  hiddenTests: JudgeTestCase[]
} {
  const visibleTests: JudgeTestCase[] = []
  const hiddenTests: JudgeTestCase[] = []

  // Strip HTML comment delimiters around hidden test cases so the content is parsed
  const normalizedBlock = qBlock
    .replace(/<!--\s*HIDDEN_TEST_CASES_START\s*/gi, '\n')
    .replace(/\s*HIDDEN_TEST_CASES_END\s*-->/gi, '\n')

  const tcRegex =
    /#{3,5}\s*Test Case\s+(\d+)(?:\s*[-—–]\s*([^\n]*))?\n([\s\S]*?)(?=(?:\n#{3,5}\s*Test Case|\n##\s*Question|\n#\s*|$))/gi
  let match: RegExpExecArray | null

  while ((match = tcRegex.exec(normalizedBlock)) !== null) {
    const testIndex = parseInt(match[1], 10)
    const label = (match[2] || '').toLowerCase()
    const body = match[3]

    const isHidden = label.includes('hidden') || testIndex > 3

    const inMatch =
      body.match(/\*\*Input\*\*\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
      body.match(/#{3,5}\s*Input\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
      body.match(/(?:^|\n)Input:?\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
      body.match(/\*\*Input\*\*\s*[:\n]\s*([^\n]+)/i)

    const outMatch =
      body.match(/\*\*(?:Expected\s+)?Output\*\*\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
      body.match(/#{3,5}\s*(?:Expected\s+)?Output\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
      body.match(/(?:^|\n)(?:Expected\s+)?Output:?\s*\n```[a-z0-9_-]*\n([\s\S]*?)\n```/i) ||
      body.match(/\*\*(?:Expected\s+)?Output\*\*\s*[:\n]\s*([^\n]+)/i)

    const input = inMatch ? inMatch[1].trim() : ''
    const expectedOutput = outMatch ? outMatch[1].trim() : ''

    const tc: JudgeTestCase = {
      testIndex,
      input,
      expectedOutput,
      isHidden,
    }

    if (isHidden) {
      hiddenTests.push(tc)
    } else {
      visibleTests.push(tc)
    }
  }

  return { visibleTests, hiddenTests }
}

/**
 * Complete parser for the Coding Question Bank Markdown file.
 * Separates client-safe question content from server-only judge test content.
 * CRITICAL REQUIREMENT:
 * NO temporary fallback from worked examples to judge tests.
 * Judge tests MUST be parsed directly and strictly from dedicated test case sections.
 */
export function parseQuestionBankMarkdown(rawMarkdown: string): ParseResult {
  const markdown = rawMarkdown.replace(/\r\n/g, '\n')
  const allQuestions: CodingQuestion[] = []
  const questionsBySlug: Record<string, CodingQuestion> = {}
  const summariesByTopic: Record<string, CodingQuestionSummary[]> = {}
  const topicMap = new Map<string, CodingQuestion[]>()
  const serverTestCasesBySlug: Record<
    string,
    { slug: string; title: string; testCases: JudgeTestCase[] }
  > = {}

  let totalExamples = 0
  let totalVisibleTests = 0
  let totalHiddenTests = 0

  // Initialize summary map for all 24 topics
  for (const topic of CODING_TOPICS) {
    topicMap.set(topic.id, [])
    summariesByTopic[topic.id] = []
  }

  // Split content by Top-Level H1 Headings (`# Topic Name`)
  const rawSections = markdown.split(/\n# (?=[A-Z0-9])/g)

  let globalCounter = 0

  for (const section of rawSections) {
    const lines = section.split('\n')
    const firstLine = lines[0].trim()

    // Skip introduction and metadata section
    if (
      firstLine.includes('Topic-Wise Programming Question Bank') ||
      firstLine.includes('Validation Summary') ||
      firstLine.includes('Topic Distribution')
    ) {
      continue
    }

    const topicConfig = normalizeTopicTitle(firstLine)
    if (!topicConfig) {
      continue
    }

    // Split questions within this topic: `## Question N — Title`
    const rawQuestionBlocks = section.split(/\n## Question /g).slice(1)

    for (const qBlock of rawQuestionBlocks) {
      const qLines = qBlock.split('\n')
      const headerLine = qLines[0].trim()

      const headerMatch = headerLine.match(/^(\d+)\s*[-—–]\s*(.+)$/)
      if (!headerMatch) {
        continue
      }

      const rawTitle = headerMatch[2].trim()
      globalCounter++

      const title = rawTitle

      // Extract sections
      const psMatch = qBlock.match(/### Problem Statement\s*\n([\s\S]*?)(?=\n### Input Format|$)/i)
      const ifMatch = qBlock.match(/### Input Format\s*\n([\s\S]*?)(?=\n### Output Format|$)/i)
      const ofMatch = qBlock.match(/### Output Format\s*\n([\s\S]*?)(?=\n### Constraints|$)/i)
      const cMatch = qBlock.match(/### Constraints\s*\n([\s\S]*?)(?=\n### Worked Example 1|$)/i)

      const ex1Match = qBlock.match(/### Worked Example 1\s*\n([\s\S]*?)(?=\n### Worked Example 2|$)/i)
      const ex2Match = qBlock.match(/### Worked Example 2\s*\n([\s\S]*?)(?=\n### Worked Example 3|$)/i)
      const ex3Match = qBlock.match(
        /### Worked Example 3\s*\n([\s\S]*?)(?=\n### Test Case|\n## Question|\n# |$)/i
      )

      const problemStatement = psMatch ? psMatch[1].trim() : ''
      const inputFormat = ifMatch ? ifMatch[1].trim() : ''
      const outputFormat = ofMatch ? ofMatch[1].trim() : ''
      const constraints = cMatch ? cMatch[1].trim() : ''

      const examples: CodingExample[] = []
      if (ex1Match) examples.push(parseWorkedExample(ex1Match[1]))
      if (ex2Match) examples.push(parseWorkedExample(ex2Match[1]))
      if (ex3Match) examples.push(parseWorkedExample(ex3Match[1]))

      totalExamples += examples.length

      // Parse dedicated judge test cases directly from Markdown
      const { visibleTests, hiddenTests } = parseJudgeTestCases(qBlock)
      totalVisibleTests += visibleTests.length
      totalHiddenTests += hiddenTests.length

      const slug = slugifyTitle(title)
      const id = `coding-${slug}`

      // Client-facing question representation
      // NO FALLBACK TO WORKED EXAMPLES: visibleTests are strictly from judge test cases!
      const question: CodingQuestion = {
        id,
        slug,
        globalNumber: globalCounter,
        topicId: topicConfig.id,
        topicTitle: topicConfig.title,
        title,
        problemStatement,
        inputFormat,
        outputFormat,
        constraints,
        examples,
        visibleTests: visibleTests.map((t) => ({
          testIndex: t.testIndex,
          input: t.input,
          expectedOutput: t.expectedOutput,
        })),
        testCaseMeta: {
          visibleCount: visibleTests.length,
          hiddenCount: hiddenTests.length,
          totalCount: visibleTests.length + hiddenTests.length,
        },
        difficulty: 'Easy',
      }

      allQuestions.push(question)
      questionsBySlug[slug] = question

      // Server-only judge test cases
      // NO FALLBACK TO WORKED EXAMPLES: only parsed judge test cases are included!
      const allJudgeCases: JudgeTestCase[] = [
        ...visibleTests,
        ...hiddenTests,
      ]

      serverTestCasesBySlug[slug] = {
        slug,
        title,
        testCases: allJudgeCases,
      }

      const topicList = topicMap.get(topicConfig.id)
      if (topicList) {
        topicList.push(question)
      }

      // Short preview for list views
      const preview =
        problemStatement.split('\n')[0].slice(0, 140) +
        (problemStatement.length > 140 ? '...' : '')

      const summary: CodingQuestionSummary = {
        id,
        slug,
        topicId: topicConfig.id,
        title,
        preview,
        difficulty: 'Easy',
      }

      summariesByTopic[topicConfig.id].push(summary)
    }
  }

  // Count active topics
  let activeTopics = 0
  for (const topic of CODING_TOPICS) {
    if ((topicMap.get(topic.id) || []).length > 0) {
      activeTopics++
    }
  }

  return {
    allQuestions,
    questionsBySlug,
    summariesByTopic,
    topicMap,
    serverTestCasesBySlug,
    stats: {
      topicCount: activeTopics,
      questionCount: allQuestions.length,
      exampleCount: totalExamples,
      visibleTestCount: totalVisibleTests,
      hiddenTestCount: totalHiddenTests,
    },
  }
}
