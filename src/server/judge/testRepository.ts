import { codingTestCases } from '../data/codingTestCases'
import * as practiceModule from '../data/serverTestCases'

/**
 * Authoritative, server-only judge test repository for BOTH question banks:
 *   practice: the original 10-belt bank (src/server/data/serverTestCases.*)
 *   coding:   the topic-wise coding bank   (src/server/data/codingTestCases.*)
 *
 * Lookup is EXACT and source-aware. There is deliberately no fuzzy/prefix/suffix matching: an unknown or
 * ambiguous identifier resolves to nothing rather than silently grading against another question's tests.
 *
 * Accepted identifiers:
 *   "coding:<slug>" | "practice:<slug>"   explicit composite ids
 *   "coding-<slug>"                         CodingQuestion.id as shipped to the client
 *   "<slug>"                                bare slug (must exist in exactly one bank)
 */
export type QuestionSource = 'practice' | 'coding'

export interface JudgeCase {
  testIndex: number
  input: string
  expectedOutput: string
  isHidden: boolean
}

export interface QuestionSuite {
  source: QuestionSource
  key: string
  questionId: string
  title: string
  testCases: JudgeCase[]
  visibleCount: number
  hiddenCount: number
}

interface RawSuite {
  title?: string
  testCases: Array<{ testIndex?: number; input: string; expectedOutput: string; isHidden?: boolean }>
}

const practiceBank = ((practiceModule as unknown as { serverTestCases?: Record<string, RawSuite> }).serverTestCases ||
  (practiceModule as unknown as { default?: Record<string, RawSuite> }).default ||
  practiceModule) as unknown as Record<string, RawSuite>
const codingBank = codingTestCases as unknown as Record<string, RawSuite>

const BANKS: Record<QuestionSource, Record<string, RawSuite>> = {
  practice: practiceBank,
  coding: codingBank,
}

function toSuite(source: QuestionSource, key: string, raw: RawSuite): QuestionSuite {
  const testCases = raw.testCases
    .map((tc, i) => ({
      testIndex: tc.testIndex ?? i + 1,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      // Missing flag: by convention cases 1-3 are visible, the rest hidden.
      isHidden: tc.isHidden ?? i >= 3,
    }))
    .sort((a, b) => a.testIndex - b.testIndex)
  const hiddenCount = testCases.filter((t) => t.isHidden).length
  return {
    source,
    key,
    questionId: `${source}:${key}`,
    title: raw.title || key,
    testCases,
    visibleCount: testCases.length - hiddenCount,
    hiddenCount,
  }
}

function has(source: QuestionSource, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(BANKS[source], key)
}

export type ResolveFailure = 'not_found' | 'ambiguous'

export function resolveQuestion(identifier: string): { suite: QuestionSuite } | { error: ResolveFailure } {
  const id = (identifier || '').trim()
  const explicit = /^(practice|coding):(.+)$/.exec(id)
  if (explicit) {
    const source = explicit[1] as QuestionSource
    const key = explicit[2]
    return has(source, key) ? { suite: toSuite(source, key, BANKS[source][key]) } : { error: 'not_found' }
  }
  // CodingQuestion.id is "coding-<slug>"; only treat it as such when that coding slug really exists.
  if (id.startsWith('coding-') && has('coding', id.slice('coding-'.length)) && !has('practice', id)) {
    const key = id.slice('coding-'.length)
    return { suite: toSuite('coding', key, codingBank[key]) }
  }
  const inPractice = has('practice', id)
  const inCoding = has('coding', id)
  if (inPractice && inCoding) return { error: 'ambiguous' }
  if (inPractice) return { suite: toSuite('practice', id, practiceBank[id]) }
  if (inCoding) return { suite: toSuite('coding', id, codingBank[id]) }
  return { error: 'not_found' }
}

/** Same resolution path the Run/Submit endpoints use; null when not found or ambiguous. */
export function getServerTests(identifier: string): QuestionSuite | null {
  const r = resolveQuestion(identifier)
  return 'suite' in r ? r.suite : null
}

export function listAllQuestionIds(): string[] {
  return [
    ...Object.keys(practiceBank).map((k) => `practice:${k}`),
    ...Object.keys(codingBank).map((k) => `coding:${k}`),
  ]
}

/** Bare slugs present in both banks (must be empty: a bare slug would be ambiguous). */
export function findCrossBankCollisions(): string[] {
  return Object.keys(codingBank).filter((k) => has('practice', k))
}
