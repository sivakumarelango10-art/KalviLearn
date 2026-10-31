/**
 * Client-Side Authoritative Progress Tracking for Learn › Coding.
 *
 * Strictly isolated from Practice:
 * - Does NOT touch the database `Submission` or `UserProgress` tables.
 * - Does NOT count towards /500 belts, streak, XP, mentor stats, or Revise.
 * - Namespaced per user under localStorage key: `kalvi_learn_progress_<userId>`.
 */

export interface LearnQuestionProgress {
  topicSlug: string
  questionSlug: string
  status: 'SOLVED' | 'ATTEMPTED'
  solved: boolean
  solvedAt?: string
  lastAttemptAt: string
  language: string
}

export type LearnProgressState = Record<string, LearnQuestionProgress>

const EVENT_NAME = 'kalvi_learn_progress_updated'

function getStorageKey(userId?: string): string {
  const safeId = (userId || 'anonymous').replace(/[^a-zA-Z0-9_-]/g, '_')
  return `kalvi_learn_progress_${safeId}`
}

export function getLearnProgressState(userId?: string): LearnProgressState {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(getStorageKey(userId))
    if (!raw) return {}
    return JSON.parse(raw) as LearnProgressState
  } catch (err) {
    console.warn('[LearnProgress] Failed to read learn progress:', err)
    return {}
  }
}

export function recordLearnQuestionSolve(params: {
  topicSlug: string
  questionSlug: string
  language: string
  userId?: string
}): void {
  if (typeof window === 'undefined') return
  try {
    const key = getStorageKey(params.userId)
    const state = getLearnProgressState(params.userId)
    const existing = state[params.questionSlug.toLowerCase()]
    state[params.questionSlug.toLowerCase()] = {
      topicSlug: params.topicSlug.toLowerCase(),
      questionSlug: params.questionSlug.toLowerCase(),
      status: 'SOLVED',
      solved: true,
      solvedAt: existing?.solvedAt || new Date().toISOString(),
      lastAttemptAt: new Date().toISOString(),
      language: params.language,
    }
    localStorage.setItem(key, JSON.stringify(state))

    // Broadcast in-tab and cross-tab update
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { questionSlug: params.questionSlug } }))
  } catch (err) {
    console.warn('[LearnProgress] Failed to save learn solve:', err)
  }
}

export function recordLearnQuestionAttempt(params: {
  topicSlug: string
  questionSlug: string
  language: string
  userId?: string
}): void {
  if (typeof window === 'undefined') return
  try {
    const key = getStorageKey(params.userId)
    const state = getLearnProgressState(params.userId)
    const existing = state[params.questionSlug.toLowerCase()]
    if (existing?.solved) return // do not downgrade solved status
    state[params.questionSlug.toLowerCase()] = {
      topicSlug: params.topicSlug.toLowerCase(),
      questionSlug: params.questionSlug.toLowerCase(),
      status: 'ATTEMPTED',
      solved: false,
      lastAttemptAt: new Date().toISOString(),
      language: params.language,
    }
    localStorage.setItem(key, JSON.stringify(state))
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { questionSlug: params.questionSlug } }))
  } catch (err) {
    console.warn('[LearnProgress] Failed to save learn attempt:', err)
  }
}

export function isLearnQuestionSolved(questionSlug?: string, userId?: string): boolean {
  if (!questionSlug) return false
  const state = getLearnProgressState(userId)
  return Boolean(state[questionSlug.toLowerCase()]?.solved)
}

export function getLearnQuestionStatus(questionSlug?: string, userId?: string): 'SOLVED' | 'ATTEMPTED' | 'UNTOUCHED' {
  if (!questionSlug) return 'UNTOUCHED'
  const state = getLearnProgressState(userId)
  const item = state[questionSlug.toLowerCase()]
  if (!item) return 'UNTOUCHED'
  return item.solved ? 'SOLVED' : item.status === 'ATTEMPTED' ? 'ATTEMPTED' : 'UNTOUCHED'
}

export function getTopicSolvedCount(topicSlug: string, totalQuestionsInTopic: number, userId?: string): {
  solvedCount: number
  totalCount: number
  percent: number
} {
  const state = getLearnProgressState(userId)
  const normTopic = topicSlug.toLowerCase()
  let solved = 0
  for (const prog of Object.values(state)) {
    if (prog.topicSlug === normTopic && prog.solved) {
      solved++
    }
  }
  const percent = totalQuestionsInTopic > 0 ? Math.round((solved / totalQuestionsInTopic) * 100) : 0
  return {
    solvedCount: solved,
    totalCount: totalQuestionsInTopic,
    percent,
  }
}

export function subscribeLearnProgress(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const handleCustomEvent = () => callback()
  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key?.startsWith('kalvi_learn_progress_')) {
      callback()
    }
  }

  window.addEventListener(EVENT_NAME, handleCustomEvent)
  window.addEventListener('storage', handleStorageEvent)

  return () => {
    window.removeEventListener(EVENT_NAME, handleCustomEvent)
    window.removeEventListener('storage', handleStorageEvent)
  }
}
