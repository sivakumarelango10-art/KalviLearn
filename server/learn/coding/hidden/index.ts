// Server-only hidden test loader for Learn Coding Questions

import variables_data_types_hidden from './variables-data-types.json'
import basic_arithmetic_operations_hidden from './basic-arithmetic-operations.json'
import conditionals_control_flow_hidden from './conditionals-control-flow.json'
import loops_hidden from './loops.json'
import nested_loops_hidden from './nested-loops.json'
import functions_hidden from './functions.json'
import scope_hidden from './scope.json'
import arrays_1d_lists_hidden from './arrays-1d-lists.json'
import strings_as_arrays_hidden from './strings-as-arrays.json'
import arrays_2d_matrices_hidden from './arrays-2d-matrices.json'
import linear_search_hidden from './linear-search.json'
import binary_search_hidden from './binary-search.json'
import sorting_hidden from './sorting.json'
import sets_hidden from './sets.json'
import two_pointers_hidden from './two-pointers.json'
import dictionaries_hash_maps_hidden from './dictionaries-hash-maps.json'
import recursion_hidden from './recursion.json'
import trees_bst_hidden from './trees-bst.json'
import graphs_hidden from './graphs.json'
import dynamic_programming_hidden from './dynamic-programming.json'
import dsa_algorithms_hidden from './dsa-algorithms.json'
import oop_classes_objects_hidden from './oop-classes-objects.json'
import oop_methods_hidden from './oop-methods.json'
import oop_inheritance_hidden from './oop-inheritance.json'

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
  'variables-data-types': variables_data_types_hidden as unknown as Record<string, ServerQuestionSuite>,
  'basic-arithmetic-operations': basic_arithmetic_operations_hidden as unknown as Record<string, ServerQuestionSuite>,
  'conditionals-control-flow': conditionals_control_flow_hidden as unknown as Record<string, ServerQuestionSuite>,
  'loops': loops_hidden as unknown as Record<string, ServerQuestionSuite>,
  'nested-loops': nested_loops_hidden as unknown as Record<string, ServerQuestionSuite>,
  'functions': functions_hidden as unknown as Record<string, ServerQuestionSuite>,
  'scope': scope_hidden as unknown as Record<string, ServerQuestionSuite>,
  'arrays-1d-lists': arrays_1d_lists_hidden as unknown as Record<string, ServerQuestionSuite>,
  'strings-as-arrays': strings_as_arrays_hidden as unknown as Record<string, ServerQuestionSuite>,
  'arrays-2d-matrices': arrays_2d_matrices_hidden as unknown as Record<string, ServerQuestionSuite>,
  'linear-search': linear_search_hidden as unknown as Record<string, ServerQuestionSuite>,
  'binary-search': binary_search_hidden as unknown as Record<string, ServerQuestionSuite>,
  'sorting': sorting_hidden as unknown as Record<string, ServerQuestionSuite>,
  'sets': sets_hidden as unknown as Record<string, ServerQuestionSuite>,
  'two-pointers': two_pointers_hidden as unknown as Record<string, ServerQuestionSuite>,
  'dictionaries-hash-maps': dictionaries_hash_maps_hidden as unknown as Record<string, ServerQuestionSuite>,
  'recursion': recursion_hidden as unknown as Record<string, ServerQuestionSuite>,
  'trees-bst': trees_bst_hidden as unknown as Record<string, ServerQuestionSuite>,
  'graphs': graphs_hidden as unknown as Record<string, ServerQuestionSuite>,
  'dynamic-programming': dynamic_programming_hidden as unknown as Record<string, ServerQuestionSuite>,
  'dsa-algorithms': dsa_algorithms_hidden as unknown as Record<string, ServerQuestionSuite>,
  'oop-classes-objects': oop_classes_objects_hidden as unknown as Record<string, ServerQuestionSuite>,
  'oop-methods': oop_methods_hidden as unknown as Record<string, ServerQuestionSuite>,
  'oop-inheritance': oop_inheritance_hidden as unknown as Record<string, ServerQuestionSuite>,
}

const HIDDEN_BY_SLUG = new Map<string, ServerQuestionSuite>()
const HIDDEN_BY_ID = new Map<string, ServerQuestionSuite>()

for (const [topicId, questions] of Object.entries(HIDDEN_BY_TOPIC)) {
  for (const [slug, suite] of Object.entries(questions)) {
    HIDDEN_BY_SLUG.set(slug.toLowerCase(), suite)
    HIDDEN_BY_ID.set(suite.id.toLowerCase(), suite)
    HIDDEN_BY_ID.set(`${topicId.toLowerCase()}:${slug.toLowerCase()}`, suite)
  }
}

export function getLearnServerSuite(topicSlug: string, questionSlug: string): ServerQuestionSuite | undefined {
  const topicData = HIDDEN_BY_TOPIC[topicSlug.toLowerCase()]
  if (!topicData) return undefined
  return topicData[questionSlug.toLowerCase()]
}

export function getLearnServerSuitesByTopic(topicSlug: string): ServerQuestionSuite[] {
  const topicData = HIDDEN_BY_TOPIC[topicSlug.toLowerCase()]
  if (!topicData) return []
  return Object.values(topicData)
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
