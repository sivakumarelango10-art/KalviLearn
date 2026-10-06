import { CODING_TOPICS, CODING_TOPICS_BY_ID } from './topics'
import type { CodingTopic, CodingQuestion, CodingQuestionSummary } from './types'
import summariesData from '../data/coding/summaries.json'
import questionsData from '../data/coding/questions.json'

const summariesByTopic = summariesData as unknown as Record<string, CodingQuestionSummary[]>
const questionsBySlug = questionsData as unknown as Record<string, CodingQuestion>

/**
 * Returns all 24 authoritative Coding Topics in canonical order.
 */
export function getAllCodingTopics(): CodingTopic[] {
  return CODING_TOPICS
}

/**
 * Retrieves a topic by its stable URL/internal identifier.
 */
export function getCodingTopicById(topicId?: string): CodingTopic | undefined {
  if (!topicId) return undefined
  return CODING_TOPICS_BY_ID.get(topicId.toLowerCase())
}

/**
 * Retrieves lightweight question summaries for a specific topic.
 * Strictly avoids loading heavy questions into memory for list views.
 */
export function getCodingQuestionsByTopic(topicId?: string): CodingQuestionSummary[] {
  if (!topicId) return []
  return summariesByTopic[topicId.toLowerCase()] || []
}

/**
 * Retrieves the complete question object by its unique slug.
 */
export function getCodingQuestionBySlug(slug?: string): CodingQuestion | undefined {
  if (!slug) return undefined
  return questionsBySlug[slug.toLowerCase()]
}

/**
 * Filters coding topics by user query (matches topic title and description).
 * Does NOT display or search question counts.
 */
export function searchCodingTopics(query: string): CodingTopic[] {
  const q = query.trim().toLowerCase()
  if (!q) return CODING_TOPICS
  return CODING_TOPICS.filter(
    (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
  )
}

/**
 * Filters questions within a topic by search term.
 */
export function searchTopicQuestions(topicId: string, query: string): CodingQuestionSummary[] {
  const list = getCodingQuestionsByTopic(topicId)
  const q = query.trim().toLowerCase()
  if (!q) return list
  return list.filter(
    (item) => item.title.toLowerCase().includes(q) || item.preview.toLowerCase().includes(q)
  )
}
