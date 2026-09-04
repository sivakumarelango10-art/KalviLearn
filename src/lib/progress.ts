export interface UserProgressRecord {
  problemId: string
  problemSlug: string
  status: 'SOLVED' | 'ATTEMPTED'
  language: string
  bestCode: string
  solvedAt?: string
  attempts: number
}

export interface SubmissionRecord {
  id: string
  problemSlug: string
  problemTitle: string
  language: string
  code: string
  status: 'PASSED' | 'FAILED' | 'ERROR'
  passedTests: number
  totalTests: number
  executionTimeMs: number
  createdAt: string
}

export interface UserState {
  xp: number
  streak: number
  solvedSlugs: string[]
  progress: Record<string, UserProgressRecord>
  submissions: SubmissionRecord[]
}

const STORAGE_KEY = 'kalvi_learn_user_state_v1'
const MAX_STORED_SUBMISSIONS = 50

const defaultState: UserState = {
  xp: 0,
  streak: 1,
  solvedSlugs: [],
  progress: {},
  submissions: [],
}

export function getUserState(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw)
    // Ensure submissions array exists
    if (!Array.isArray(parsed.submissions)) {
      parsed.submissions = []
    }
    return parsed
  } catch {
    return defaultState
  }
}

const PROGRESS_EVENT = 'kalvi_progress_updated'

/**
 * Safely persists user state with quota protection.
 * If browser localStorage quota (typically 5MB) is reached, it automatically prunes
 * older submission histories to protect student XP, solved problems, and best codes.
 */
export function saveUserState(state: UserState) {
  try {
    // Keep submissions history capped to prevent unbounded memory growth
    if (state.submissions && state.submissions.length > MAX_STORED_SUBMISSIONS) {
      state.submissions = state.submissions.slice(0, MAX_STORED_SUBMISSIONS)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PROGRESS_EVENT))
    }
  } catch (err: any) {
    console.warn('Initial localStorage save failed, attempting quota recovery:', err?.message)
    try {
      // Stage 1 Quota Recovery: Keep only last 15 submissions
      state.submissions = state.submissions.slice(0, 15)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(PROGRESS_EVENT))
      }
    } catch (secondErr: any) {
      console.warn('Stage 1 quota recovery failed, dropping submissions to protect core progress:', secondErr?.message)
      try {
        // Stage 2 Quota Recovery: Purge submissions array completely to guarantee XP and solved status
        state.submissions = []
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent(PROGRESS_EVENT))
        }
      } catch (fatalErr) {
        console.error('Fatal storage quota error: Unable to write to localStorage', fatalErr)
      }
    }
  }
}

/**
 * Reactive subscription listener for progress updates
 * Listens to both in-tab custom events and cross-tab storage events with zero polling.
 */
export function subscribeProgress(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const handleUpdate = () => callback()

  window.addEventListener(PROGRESS_EVENT, handleUpdate)
  window.addEventListener('storage', handleUpdate)

  return () => {
    window.removeEventListener(PROGRESS_EVENT, handleUpdate)
    window.removeEventListener('storage', handleUpdate)
  }
}

export function recordProblemSuccess(
  problemSlug: string,
  problemTitle: string,
  language: string,
  code: string,
  executionTimeMs: number
): { isFirstSolve: boolean; newXp: number } {
  const state = getUserState()
  const isFirstSolve = !state.solvedSlugs.includes(problemSlug)

  if (isFirstSolve) {
    state.solvedSlugs.push(problemSlug)
    state.xp += 50
  }

  const existingProg = state.progress[problemSlug] || {
    problemId: problemSlug,
    problemSlug,
    status: 'SOLVED',
    language,
    bestCode: code,
    attempts: 0,
  }

  existingProg.status = 'SOLVED'
  existingProg.language = language
  existingProg.bestCode = code
  existingProg.solvedAt = new Date().toISOString()
  existingProg.attempts += 1
  state.progress[problemSlug] = existingProg

  // Add to submission history
  state.submissions.unshift({
    id: 'sub_' + Date.now(),
    problemSlug,
    problemTitle,
    language,
    code,
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs,
    createdAt: new Date().toISOString(),
  })

  saveUserState(state)
  return { isFirstSolve, newXp: state.xp }
}

export function recordProblemAttempt(
  problemSlug: string,
  problemTitle: string,
  language: string,
  code: string,
  passedTests: number,
  totalTests: number,
  executionTimeMs: number
) {
  const state = getUserState()

  const existingProg = state.progress[problemSlug] || {
    problemId: problemSlug,
    problemSlug,
    status: 'ATTEMPTED',
    language,
    bestCode: code,
    attempts: 0,
  }

  if (existingProg.status !== 'SOLVED') {
    existingProg.status = 'ATTEMPTED'
  }
  existingProg.attempts += 1
  state.progress[problemSlug] = existingProg

  state.submissions.unshift({
    id: 'sub_' + Date.now(),
    problemSlug,
    problemTitle,
    language,
    code,
    status: passedTests === totalTests ? 'PASSED' : 'FAILED',
    passedTests,
    totalTests,
    executionTimeMs,
    createdAt: new Date().toISOString(),
  })

  saveUserState(state)
}
