import fs from 'node:fs'
import path from 'node:path'
import { CODING_TOPICS } from '../src/coding/topics'
import type { CodingQuestion } from '../src/coding/types'

const ROOT = process.cwd()
const QUESTIONS_JSON_PATH = path.join(ROOT, 'src/data/coding/questions.json')
const SERVER_TEST_CASES_JSON_PATH = path.join(ROOT, 'src/server/data/codingTestCases.json')

const CLIENT_LEARN_DATA_DIR = path.join(ROOT, 'src/data/learn/coding')
const SERVER_LEARN_HIDDEN_DIR = path.join(ROOT, 'server/learn/coding/hidden')

fs.mkdirSync(CLIENT_LEARN_DATA_DIR, { recursive: true })
fs.mkdirSync(SERVER_LEARN_HIDDEN_DIR, { recursive: true })

const rawQuestions = JSON.parse(fs.readFileSync(QUESTIONS_JSON_PATH, 'utf-8')) as Record<string, CodingQuestion>
const rawServerCases = JSON.parse(fs.readFileSync(SERVER_TEST_CASES_JSON_PATH, 'utf-8')) as Record<string, any>

// Group questions by topicId
const questionsByTopic: Record<string, CodingQuestion[]> = {}
for (const topic of CODING_TOPICS) {
  questionsByTopic[topic.id] = []
}

for (const [slug, q] of Object.entries(rawQuestions)) {
  const topicId = q.topicId
  if (!questionsByTopic[topicId]) {
    questionsByTopic[topicId] = []
  }
  questionsByTopic[topicId].push(q)
}

// Sort questions deterministically within each topic by globalNumber or slug
for (const topicId of Object.keys(questionsByTopic)) {
  questionsByTopic[topicId].sort((a, b) => (a.globalNumber || 0) - (b.globalNumber || 0))
}

console.log('=== LEARN QUESTION MIGRATION AUDIT ===')
let totalMigrated = 0

// 1. Generate src/data/learn/coding/topics.ts
const topicsSource = `// Authoritative Centralized Configuration for all 24 Learn Coding Topics.
export interface LearnCodingTopic {
  id: string
  slug: string
  title: string
  description: string
  order: number
}

export const LEARN_CODING_TOPICS: LearnCodingTopic[] = [
${CODING_TOPICS.map((t, idx) => `  {
    id: ${JSON.stringify(t.id)},
    slug: ${JSON.stringify(t.id)},
    title: ${JSON.stringify(t.title)},
    description: ${JSON.stringify(t.description)},
    order: ${idx + 1},
  },`).join('\n')}
]

export const LEARN_CODING_TOPICS_BY_SLUG = new Map<string, LearnCodingTopic>(
  LEARN_CODING_TOPICS.map((t) => [t.slug.toLowerCase(), t])
)

export function getAllLearnTopics(): LearnCodingTopic[] {
  return LEARN_CODING_TOPICS
}

export function getLearnTopic(slugOrId?: string): LearnCodingTopic | undefined {
  if (!slugOrId) return undefined
  return LEARN_CODING_TOPICS_BY_SLUG.get(slugOrId.toLowerCase())
}
`
fs.writeFileSync(path.join(CLIENT_LEARN_DATA_DIR, 'topics.ts'), topicsSource, 'utf-8')
console.log('✅ Generated src/data/learn/coding/topics.ts')

// 2. Generate per-topic client data files and server hidden files
const topicExports: string[] = []

for (let tIdx = 0; tIdx < CODING_TOPICS.length; tIdx++) {
  const topic = CODING_TOPICS[tIdx]
  const topicQuestions = questionsByTopic[topic.id] || []
  totalMigrated += topicQuestions.length

  console.log(`- [${topic.id}] migrating ${topicQuestions.length} questions...`)

  // Prepare client public questions
  const publicQuestions = topicQuestions.map((q, qIdx) => {
    const namespacedId = `learn:${topic.id}:${q.slug}`
    return {
      id: namespacedId,
      slug: q.slug,
      topicId: topic.id,
      topicSlug: topic.id,
      topicTitle: topic.title,
      title: q.title,
      order: qIdx + 1,
      difficulty: q.difficulty || 'Easy',
      problemStatement: q.problemStatement,
      inputFormat: q.inputFormat,
      outputFormat: q.outputFormat,
      constraints: q.constraints,
      examples: q.examples || [],
      visibleTests: (q.visibleTests || []).map((vt, i) => ({
        testIndex: vt.testIndex ?? i + 1,
        input: vt.input,
        expectedOutput: vt.expectedOutput,
      })),
      testCaseMeta: q.testCaseMeta || {
        visibleCount: (q.visibleTests || []).length || 3,
        hiddenCount: 7,
        totalCount: ((q.visibleTests || []).length || 3) + 7,
      },
    }
  })

  // Write src/data/learn/coding/<topic-slug>.ts
  const clientTopicSource = `import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = ${JSON.stringify(publicQuestions, null, 2)}

export default questions
`
  fs.writeFileSync(path.join(CLIENT_LEARN_DATA_DIR, `${topic.id}.ts`), clientTopicSource, 'utf-8')

  // Prepare server hidden tests for this topic
  const serverHiddenData: Record<string, any> = {}
  for (const q of topicQuestions) {
    const serverEntry = rawServerCases[q.slug] || rawServerCases[q.id] || {}
    const namespacedId = `learn:${topic.id}:${q.slug}`
    serverHiddenData[q.slug] = {
      id: namespacedId,
      slug: q.slug,
      topicId: topic.id,
      title: q.title,
      testCases: (serverEntry.testCases || []).map((tc: any, i: number) => ({
        testIndex: tc.testIndex ?? i + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isHidden: tc.isHidden ?? i >= 3,
      })),
    }
  }

  // Write server/learn/coding/hidden/<topic-slug>.json
  fs.writeFileSync(
    path.join(SERVER_LEARN_HIDDEN_DIR, `${topic.id}.json`),
    JSON.stringify(serverHiddenData, null, 2),
    'utf-8'
  )

  topicExports.push(topic.id)
}

// 3. Generate src/data/learn/coding/types.ts
const typesSource = `export interface LearnExample {
  input: string
  output: string
  explanation: string
}

export interface LearnVisibleTest {
  testIndex: number
  input: string
  expectedOutput: string
}

export interface LearnTestCaseMeta {
  visibleCount: number
  hiddenCount: number
  totalCount: number
}

export interface LearnQuestion {
  id: string // e.g. "learn:conditionals-control-flow:largest-of-three"
  slug: string // "largest-of-three"
  topicId: string
  topicSlug: string
  topicTitle: string
  title: string
  order: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  problemStatement: string
  inputFormat: string
  outputFormat: string
  constraints: string
  examples: LearnExample[]
  visibleTests: LearnVisibleTest[]
  testCaseMeta: LearnTestCaseMeta
}

export interface LearnQuestionSummary {
  id: string
  slug: string
  topicId: string
  topicSlug: string
  topicTitle: string
  title: string
  order: number
  preview: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}
`
fs.writeFileSync(path.join(CLIENT_LEARN_DATA_DIR, 'types.ts'), typesSource, 'utf-8')
console.log('✅ Generated src/data/learn/coding/types.ts')

// 4. Generate src/data/learn/coding/index.ts
const indexSource = `import { LEARN_CODING_TOPICS, getLearnTopic, type LearnCodingTopic } from './topics'
import type { LearnQuestion, LearnQuestionSummary } from './types'

${topicExports.map((id) => `import { questions as ${id.replace(/[^a-zA-Z0-9]/g, '_')}_questions } from './${id}'`).join('\n')}

const QUESTIONS_BY_TOPIC: Record<string, LearnQuestion[]> = {
${topicExports.map((id) => `  '${id}': ${id.replace(/[^a-zA-Z0-9]/g, '_')}_questions,`).join('\n')}
}

const ALL_QUESTIONS: LearnQuestion[] = Object.values(QUESTIONS_BY_TOPIC).flat()

const QUESTION_BY_TOPIC_AND_SLUG = new Map<string, LearnQuestion>()
const QUESTION_BY_SLUG_ONLY = new Map<string, LearnQuestion>()
const QUESTION_BY_NAMESPACED_ID = new Map<string, LearnQuestion>()

for (const q of ALL_QUESTIONS) {
  QUESTION_BY_TOPIC_AND_SLUG.set(\`\${q.topicSlug.toLowerCase()}:\${q.slug.toLowerCase()}\`, q)
  // Bare slug lookup (for redirects and fallback resolution)
  if (!QUESTION_BY_SLUG_ONLY.has(q.slug.toLowerCase())) {
    QUESTION_BY_SLUG_ONLY.set(q.slug.toLowerCase(), q)
  }
  QUESTION_BY_NAMESPACED_ID.set(q.id.toLowerCase(), q)
}

export * from './topics'
export * from './types'

export function getAllLearnQuestions(): LearnQuestion[] {
  return ALL_QUESTIONS
}

export function getLearnQuestionsByTopic(topicSlug?: string): LearnQuestion[] {
  if (!topicSlug) return []
  return QUESTIONS_BY_TOPIC[topicSlug.toLowerCase()] || []
}

export function getLearnQuestionSummariesByTopic(topicSlug?: string): LearnQuestionSummary[] {
  const qs = getLearnQuestionsByTopic(topicSlug)
  return qs.map((q) => ({
    id: q.id,
    slug: q.slug,
    topicId: q.topicId,
    topicSlug: q.topicSlug,
    topicTitle: q.topicTitle,
    title: q.title,
    order: q.order,
    preview: q.problemStatement ? q.problemStatement.slice(0, 140) + '...' : '',
    difficulty: q.difficulty,
  }))
}

export function getLearnQuestion(topicSlug?: string, questionSlug?: string): LearnQuestion | undefined {
  if (!topicSlug || !questionSlug) return undefined
  return QUESTION_BY_TOPIC_AND_SLUG.get(\`\${topicSlug.toLowerCase()}:\${questionSlug.toLowerCase()}\`)
}

export function findLearnQuestionBySlug(questionSlug?: string): LearnQuestion | undefined {
  if (!questionSlug) return undefined
  const cleaned = questionSlug.replace(/^learn:/i, '')
  // Check if it includes topic
  if (cleaned.includes(':')) {
    const parts = cleaned.split(':')
    return getLearnQuestion(parts[0], parts[1])
  }
  return QUESTION_BY_SLUG_ONLY.get(cleaned.toLowerCase())
}

export function isLearnQuestionSlug(slug?: string): boolean {
  if (!slug) return false
  return QUESTION_BY_SLUG_ONLY.has(slug.toLowerCase())
}
`
fs.writeFileSync(path.join(CLIENT_LEARN_DATA_DIR, 'index.ts'), indexSource, 'utf-8')
console.log('✅ Generated src/data/learn/coding/index.ts')

// 5. Generate server/learn/coding/hidden/index.ts
const serverIndexSource = `// Server-only hidden test loader for Learn Coding Questions
import fs from 'node:fs'
import path from 'node:path'

${topicExports.map((id) => `import ${id.replace(/[^a-zA-Z0-9]/g, '_')}_hidden from './${id}.json'`).join('\n')}

export interface ServerJudgeTestCase {
  testIndex: number
  input: string
  expectedOutput: string
  isHidden: boolean
}

export interface ServerQuestionSuite {
  id: string
  slug: string
  topicId: string
  title: string
  testCases: ServerJudgeTestCase[]
}

const HIDDEN_BY_TOPIC: Record<string, Record<string, ServerQuestionSuite>> = {
${topicExports.map((id) => `  '${id}': ${id.replace(/[^a-zA-Z0-9]/g, '_')}_hidden as unknown as Record<string, ServerQuestionSuite>,`).join('\n')}
}

const HIDDEN_BY_SLUG = new Map<string, ServerQuestionSuite>()
const HIDDEN_BY_ID = new Map<string, ServerQuestionSuite>()

for (const [topicId, questions] of Object.entries(HIDDEN_BY_TOPIC)) {
  for (const [slug, suite] of Object.entries(questions)) {
    HIDDEN_BY_SLUG.set(slug.toLowerCase(), suite)
    HIDDEN_BY_ID.set(suite.id.toLowerCase(), suite)
    HIDDEN_BY_ID.set(\`\${topicId.toLowerCase()}:\${slug.toLowerCase()}\`, suite)
  }
}

export function getLearnServerSuite(topicSlug: string, questionSlug: string): ServerQuestionSuite | undefined {
  const topicData = HIDDEN_BY_TOPIC[topicSlug.toLowerCase()]
  if (!topicData) return undefined
  return topicData[questionSlug.toLowerCase()]
}

export function resolveLearnServerSuite(identifier: string): ServerQuestionSuite | undefined {
  const id = (identifier || '').trim().toLowerCase()
  if (HIDDEN_BY_ID.has(id)) return HIDDEN_BY_ID.get(id)
  if (id.startsWith('learn:')) {
    const rest = id.slice('learn:'.length)
    if (HIDDEN_BY_ID.has(rest)) return HIDDEN_BY_ID.get(rest)
    if (HIDDEN_BY_SLUG.has(rest)) return HIDDEN_BY_SLUG.get(rest)
  }
  if (id.startsWith('coding-')) {
    const rest = id.slice('coding-'.length)
    if (HIDDEN_BY_SLUG.has(rest)) return HIDDEN_BY_SLUG.get(rest)
  }
  return HIDDEN_BY_SLUG.get(id)
}

export function getAllLearnServerSuites(): ServerQuestionSuite[] {
  return Array.from(HIDDEN_BY_SLUG.values())
}
`
fs.writeFileSync(path.join(SERVER_LEARN_HIDDEN_DIR, 'index.ts'), serverIndexSource, 'utf-8')
console.log('✅ Generated server/learn/coding/hidden/index.ts')

console.log(`\n🎉 MIGRATION COMPLETE: Migrated ${totalMigrated} questions across ${CODING_TOPICS.length} topics.`)
