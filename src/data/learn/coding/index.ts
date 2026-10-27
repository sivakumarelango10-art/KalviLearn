import type { LearnQuestion, LearnQuestionSummary } from './types'

import { questions as variables_data_types_questions } from './variables-data-types'
import { questions as basic_arithmetic_operations_questions } from './basic-arithmetic-operations'
import { questions as conditionals_control_flow_questions } from './conditionals-control-flow'
import { questions as loops_questions } from './loops'
import { questions as nested_loops_questions } from './nested-loops'
import { questions as functions_questions } from './functions'
import { questions as scope_questions } from './scope'
import { questions as arrays_1d_lists_questions } from './arrays-1d-lists'
import { questions as strings_as_arrays_questions } from './strings-as-arrays'
import { questions as arrays_2d_matrices_questions } from './arrays-2d-matrices'
import { questions as linear_search_questions } from './linear-search'
import { questions as binary_search_questions } from './binary-search'
import { questions as sorting_questions } from './sorting'
import { questions as sets_questions } from './sets'
import { questions as two_pointers_questions } from './two-pointers'
import { questions as dictionaries_hash_maps_questions } from './dictionaries-hash-maps'
import { questions as recursion_questions } from './recursion'
import { questions as trees_bst_questions } from './trees-bst'
import { questions as graphs_questions } from './graphs'
import { questions as dynamic_programming_questions } from './dynamic-programming'
import { questions as dsa_algorithms_questions } from './dsa-algorithms'
import { questions as oop_classes_objects_questions } from './oop-classes-objects'
import { questions as oop_methods_questions } from './oop-methods'
import { questions as oop_inheritance_questions } from './oop-inheritance'

const QUESTIONS_BY_TOPIC: Record<string, LearnQuestion[]> = {
  'variables-data-types': variables_data_types_questions,
  'basic-arithmetic-operations': basic_arithmetic_operations_questions,
  'conditionals-control-flow': conditionals_control_flow_questions,
  'loops': loops_questions,
  'nested-loops': nested_loops_questions,
  'functions': functions_questions,
  'scope': scope_questions,
  'arrays-1d-lists': arrays_1d_lists_questions,
  'strings-as-arrays': strings_as_arrays_questions,
  'arrays-2d-matrices': arrays_2d_matrices_questions,
  'linear-search': linear_search_questions,
  'binary-search': binary_search_questions,
  'sorting': sorting_questions,
  'sets': sets_questions,
  'two-pointers': two_pointers_questions,
  'dictionaries-hash-maps': dictionaries_hash_maps_questions,
  'recursion': recursion_questions,
  'trees-bst': trees_bst_questions,
  'graphs': graphs_questions,
  'dynamic-programming': dynamic_programming_questions,
  'dsa-algorithms': dsa_algorithms_questions,
  'oop-classes-objects': oop_classes_objects_questions,
  'oop-methods': oop_methods_questions,
  'oop-inheritance': oop_inheritance_questions,
}

const ALL_QUESTIONS: LearnQuestion[] = Object.values(QUESTIONS_BY_TOPIC).flat()

const QUESTION_BY_TOPIC_AND_SLUG = new Map<string, LearnQuestion>()
const QUESTION_BY_SLUG_ONLY = new Map<string, LearnQuestion>()
const QUESTION_BY_NAMESPACED_ID = new Map<string, LearnQuestion>()

for (const q of ALL_QUESTIONS) {
  QUESTION_BY_TOPIC_AND_SLUG.set(`${q.topicSlug.toLowerCase()}:${q.slug.toLowerCase()}`, q)
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
  return QUESTION_BY_TOPIC_AND_SLUG.get(`${topicSlug.toLowerCase()}:${questionSlug.toLowerCase()}`)
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

import redirectsData from './redirects.json'

export interface LearnRedirect {
  originalId: string
  originalSlug: string
  targetSource: string
  targetId: string
  targetTitle: string
  targetUrl: string
  targetSolveUrl: string
}

export function getLearnRedirect(slug?: string): LearnRedirect | undefined {
  if (!slug) return undefined
  const cleaned = slug.toLowerCase().replace(/^(learn:|coding-)/i, '')
  return (redirectsData as Record<string, LearnRedirect>)[cleaned]
}

export function isLearnQuestionSlug(slug?: string): boolean {
  if (!slug) return false
  return QUESTION_BY_SLUG_ONLY.has(slug.toLowerCase())
}

export const JAVA_CPP_SUPPORTED_TOPICS: ReadonlySet<string> = new Set<string>([
  'variables-data-types',
  'basic-arithmetic-operations',
  'conditionals-control-flow',
  'loops',
  'nested-loops',
  'functions',
  'arrays-1d-lists',
  'strings-as-arrays',
  'linear-search',
  'binary-search',
  'two-pointers',
  'recursion',
])

export const CPP_ONLY_EXTRA_TOPICS: ReadonlySet<string> = new Set<string>([
  'dsa-algorithms',
])

export function getQuestionSupportedLanguages(
  questionOrSlug?: string | LearnQuestion
): ('python' | 'nodejs' | 'java' | 'cpp')[] {
  if (!questionOrSlug) return ['python', 'nodejs']

  let q: LearnQuestion | undefined
  if (typeof questionOrSlug === 'object') {
    q = questionOrSlug
  } else {
    q = findLearnQuestionBySlug(questionOrSlug)
  }

  if (q?.languages && q.languages.length > 0) {
    return q.languages
  }

  if (q?.isPythonOnly) {
    return ['python']
  }

  return ['python']
}


