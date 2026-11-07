import { codingTestCases } from '../data/codingTestCases'
import * as practiceModule from '../data/serverTestCases'
import { resolveLearnServerSuite } from '../../../server/learn/coding/hidden/index'
import { supabaseServer } from '../feedbackAuth'

/**
 * Authoritative, server-only judge test repository for BOTH question banks:
 *   practice: the original 10-belt bank (src/server/data/serverTestCases.*)
 *   coding/learn: the topic-wise coding bank (server/learn/coding/hidden/*)
 *
 * Lookup is EXACT and source-aware. There is deliberately no fuzzy/prefix/suffix matching: an unknown or
 * ambiguous identifier resolves to nothing rather than silently grading against another question's tests.
 *
 * Accepted identifiers:
 *   "learn:<topic>:<slug>" | "learn:<slug>" explicit Learn composite ids
 *   "coding:<slug>" | "practice:<slug>"     explicit composite ids
 *   "coding-<slug>"                         CodingQuestion.id as shipped to the client
 *   "<slug>"                                bare slug (must exist in exactly one bank)
 */
export type QuestionSource = 'practice' | 'coding' | 'learn' | 'custom'

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
const customBank: Record<string, RawSuite> = {}

export function registerCustomSuite(slug: string, suite: RawSuite): void {
  customBank[slug] = suite
}

export function unregisterCustomSuite(slug: string): void {
  delete customBank[slug]
}

export function getCustomSuite(slug: string): RawSuite | undefined {
  return customBank[slug]
}

const BANKS: Record<QuestionSource, Record<string, RawSuite>> = {
  practice: practiceBank,
  coding: codingBank,
  learn: {},
  custom: customBank,
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

  // 0. Explicit or bare custom questions bank
  if (customBank[id]) {
    return { suite: toSuite('custom', id, customBank[id]) }
  }
  if (id.startsWith('custom:')) {
    const customKey = id.slice('custom:'.length)
    if (customBank[customKey]) {
      return { suite: toSuite('custom', customKey, customBank[customKey]) }
    }
  }

  // 1. Explicit learn: namespace
  if (id.startsWith('learn:')) {
    const learnSuite = resolveLearnServerSuite(id)
    if (learnSuite) {
      return {
        suite: {
          source: 'learn',
          key: learnSuite.slug,
          questionId: learnSuite.id,
          title: learnSuite.title,
          testCases: learnSuite.testCases,
          visibleCount: learnSuite.testCases.filter((t) => !t.isHidden).length,
          hiddenCount: learnSuite.testCases.filter((t) => t.isHidden).length,
        },
      }
    }
    return { error: 'not_found' }
  }

  const explicit = /^(practice|coding):(.+)$/.exec(id)
  if (explicit) {
    const source = explicit[1] as QuestionSource
    const key = explicit[2]
    return has(source, key) ? { suite: toSuite(source, key, BANKS[source][key]) } : { error: 'not_found' }
  }
  // CodingQuestion.id is "coding-<slug>"; only treat it as such when that coding slug really exists.
  if (id.startsWith('coding-') && (has('coding', id.slice('coding-'.length)) || resolveLearnServerSuite(id)) && !has('practice', id)) {
    const key = id.slice('coding-'.length)
    if (has('coding', key)) {
      return { suite: toSuite('coding', key, codingBank[key]) }
    }
    const learnSuite = resolveLearnServerSuite(id)
    if (learnSuite) {
      return {
        suite: {
          source: 'learn',
          key: learnSuite.slug,
          questionId: learnSuite.id,
          title: learnSuite.title,
          testCases: learnSuite.testCases,
          visibleCount: learnSuite.testCases.filter((t) => !t.isHidden).length,
          hiddenCount: learnSuite.testCases.filter((t) => t.isHidden).length,
        },
      }
    }
  }
  const inPractice = has('practice', id)
  const inCoding = has('coding', id) || Boolean(resolveLearnServerSuite(id))
  if (inPractice && inCoding) return { error: 'ambiguous' }
  if (inPractice) return { suite: toSuite('practice', id, practiceBank[id]) }
  if (inCoding) {
    if (has('coding', id)) {
      return { suite: toSuite('coding', id, codingBank[id]) }
    }
    const learnSuite = resolveLearnServerSuite(id)
    if (learnSuite) {
      return {
        suite: {
          source: 'learn',
          key: learnSuite.slug,
          questionId: learnSuite.id,
          title: learnSuite.title,
          testCases: learnSuite.testCases,
          visibleCount: learnSuite.testCases.filter((t) => !t.isHidden).length,
          hiddenCount: learnSuite.testCases.filter((t) => t.isHidden).length,
        },
      }
    }
  }
  return { error: 'not_found' }
}

/** Same resolution path the Run/Submit endpoints use; null when not found or ambiguous. */
export function getServerTests(identifier: string): QuestionSuite | null {
  const r = resolveQuestion(identifier)
  return 'suite' in r ? r.suite : null
}

/**
 * Asynchronous resolution path that falls back to persistent database storage
 * (Problem + TestCase tables via supabaseServer) when a custom question is not
 * found in the in-memory cache (e.g. following a server restart or cold start).
 */
export async function resolveQuestionAsync(
  identifier: string
): Promise<{ suite: QuestionSuite } | { error: ResolveFailure }> {
  // 1. Try in-memory resolution first
  const memoryResult = resolveQuestion(identifier)
  if ('suite' in memoryResult) {
    return memoryResult
  }

  // 2. Query persistent database
  const id = (identifier || '').trim()
  const targetSlug = id.startsWith('custom:') ? id.slice('custom:'.length) : id

  try {
    let problem: any = null
    const { data: bySlug } = await supabaseServer
      .from('Problem')
      .select('id, slug, title, isActive')
      .eq('slug', targetSlug)
      .maybeSingle()

    if (bySlug) {
      problem = bySlug
    } else {
      const { data: byId } = await supabaseServer
        .from('Problem')
        .select('id, slug, title, isActive')
        .eq('id', targetSlug)
        .maybeSingle()
      problem = byId
    }

    if (problem) {
      // Try normalized ProblemTestCase first, falling back to legacy TestCase
      let testCases: any[] | null = null
      const { data: ptcCases, error: ptcErr } = await supabaseServer
        .from('ProblemTestCase')
        .select('displayOrder, input, expectedOutput, isHidden')
        .eq('problemId', problem.id)
        .order('displayOrder', { ascending: true })

      if (!ptcErr && ptcCases && ptcCases.length > 0) {
        testCases = ptcCases.map((tc: any, i: number) => ({
          testIndex: tc.displayOrder ?? i + 1,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isHidden: Boolean(tc.isHidden),
        }))
      } else {
        const { data: legacyCases, error: tcErr } = await supabaseServer
          .from('TestCase')
          .select('testIndex, input, expectedOutput, isHidden')
          .eq('problemId', problem.id)
          .order('testIndex', { ascending: true })

        if (!tcErr && legacyCases && legacyCases.length > 0) {
          testCases = legacyCases.map((tc: any, i: number) => ({
            testIndex: tc.testIndex ?? i + 1,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: Boolean(tc.isHidden),
          }))
        }
      }

      if (testCases && testCases.length > 0) {
        const rawSuite: RawSuite = {
          title: problem.title,
          testCases,
        }
        // Cache in memory for subsequent rapid evaluation
        customBank[problem.slug] = rawSuite
        return { suite: toSuite('custom', problem.slug, rawSuite) }
      }
    }
  } catch (err) {
    console.warn(`[testRepository] Failed to query database for question "${identifier}":`, err)
  }

  return memoryResult
}

export async function getServerTestsAsync(identifier: string): Promise<QuestionSuite | null> {
  const r = await resolveQuestionAsync(identifier)
  return 'suite' in r ? r.suite : null
}

export function listAllQuestionIds(): string[] {
  return [
    ...Object.keys(practiceBank).map((k) => `practice:${k}`),
    ...Object.keys(codingBank).map((k) => `coding:${k}`),
    ...Object.keys(customBank).map((k) => `custom:${k}`),
  ]
}

/** Bare slugs present in both banks (must be empty: a bare slug would be ambiguous). */
export function findCrossBankCollisions(): string[] {
  return Object.keys(codingBank).filter((k) => has('practice', k))
}
