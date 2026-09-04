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

export interface LanguageProgressSummary {
  solvedSlugs: string[]
  xp: number
}

export interface UserState {
  xp: number
  streak: number
  solvedSlugs: string[]
  progress: Record<string, UserProgressRecord>
  submissions: SubmissionRecord[]
  languageProgress?: Record<string, LanguageProgressSummary>
}

export function normalizeProgressLanguage(
  raw: string | null | undefined
): 'python' | 'java' | 'nodejs' | 'cpp' {
  if (!raw) return 'python'
  const l = raw.toLowerCase()
  if (l === 'javascript' || l === 'node' || l === 'nodejs' || l === 'js') return 'nodejs'
  if (l === 'java') return 'java'
  if (l === 'cpp' || l === 'c++') return 'cpp'
  if (l === 'python') return 'python'
  return 'python'
}

const STORAGE_KEY = 'kalvi_learn_user_state_v1'
const MAX_STORED_SUBMISSIONS = 50

const defaultState: UserState = {
  xp: 0,
  streak: 1,
  solvedSlugs: [],
  progress: {},
  submissions: [],
  languageProgress: {
    python: { solvedSlugs: [], xp: 0 },
    java: { solvedSlugs: [], xp: 0 },
    nodejs: { solvedSlugs: [], xp: 0 },
    cpp: { solvedSlugs: [], xp: 0 },
  },
}

export function resetUserState() {
  saveUserState({
    xp: 0,
    streak: 1,
    solvedSlugs: [],
    progress: {},
    submissions: [],
    languageProgress: {
      python: { solvedSlugs: [], xp: 0 },
      java: { solvedSlugs: [], xp: 0 },
      nodejs: { solvedSlugs: [], xp: 0 },
      cpp: { solvedSlugs: [], xp: 0 },
    },
  })
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

    // Ensure languageProgress exists and has all 4 languages
    if (!parsed.languageProgress) {
      parsed.languageProgress = {
        python: { solvedSlugs: [], xp: 0 },
        java: { solvedSlugs: [], xp: 0 },
        nodejs: { solvedSlugs: [], xp: 0 },
        cpp: { solvedSlugs: [], xp: 0 },
      }

      // Populate from existing progress records
      if (parsed.progress) {
        for (const [key, record] of Object.entries(parsed.progress as Record<string, UserProgressRecord>)) {
          if (record && record.status === 'SOLVED') {
            const lang = normalizeProgressLanguage(record.language)
            const slug = record.problemSlug || key.replace(/^(python|java|nodejs|cpp|javascript):/, '')
            if (!parsed.languageProgress[lang].solvedSlugs.includes(slug)) {
              parsed.languageProgress[lang].solvedSlugs.push(slug)
              parsed.languageProgress[lang].xp += 50
            }
          }
        }
      }
    } else {
      for (const l of ['python', 'java', 'nodejs', 'cpp']) {
        if (!parsed.languageProgress[l]) {
          parsed.languageProgress[l] = { solvedSlugs: [], xp: 0 }
        }
      }
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

import { saveSuccessToCloud, saveAttemptToCloud } from './cloudSync'

export function getActiveUserId(): string | null {
  try {
    const raw = localStorage.getItem('kalvi_active_user')
    if (!raw) return null
    const user = JSON.parse(raw)
    return user?.id || null
  } catch {
    return null
  }
}

/**
 * Merges cloud progress from Supabase into local storage.
 * Ensures that opening Kalvi Learn on any new device instantly restores all solved problems,
 * best code, XP, and past submissions without overwriting recent local updates.
 */
export function hydrateStateFromCloud(cloudState: UserState) {
  if (!cloudState) return
  const localState = getUserState()

  // Union of solved slugs
  const allSolved = Array.from(new Set([...(cloudState.solvedSlugs || []), ...(localState.solvedSlugs || [])]))

  // Merge progress maps intelligently: ensure best code is never wiped out
  const allSlugs = Array.from(
    new Set([
      ...Object.keys(localState.progress || {}),
      ...Object.keys(cloudState.progress || {}),
      ...allSolved,
    ])
  )

  const mergedProgress: Record<string, UserProgressRecord> = {}

  for (const slug of allSlugs) {
    const localP = localState.progress?.[slug]
    const cloudP = cloudState.progress?.[slug]
    const isSolved = allSolved.includes(slug) || localP?.status === 'SOLVED' || cloudP?.status === 'SOLVED'

    let bestCode = ''
    let language = 'python'
    let attempts = 1
    let solvedAt: string | undefined = undefined

    if (localP && cloudP) {
      bestCode = cloudP.bestCode || localP.bestCode || ''
      language = cloudP.language || localP.language || 'python'
      attempts = Math.max(cloudP.attempts || 1, localP.attempts || 1)
      solvedAt = cloudP.solvedAt || localP.solvedAt
    } else if (cloudP) {
      bestCode = cloudP.bestCode || ''
      language = cloudP.language || 'python'
      attempts = cloudP.attempts || 1
      solvedAt = cloudP.solvedAt
    } else if (localP) {
      bestCode = localP.bestCode || ''
      language = localP.language || 'python'
      attempts = localP.attempts || 1
      solvedAt = localP.solvedAt
    }

    mergedProgress[slug] = {
      problemId: slug,
      problemSlug: slug,
      status: isSolved ? 'SOLVED' : 'ATTEMPTED',
      language,
      bestCode,
      solvedAt,
      attempts,
    }
  }

  // Merge submissions uniquely
  const seenIds = new Set<string>()
  const mergedSubmissions: SubmissionRecord[] = []

  for (const sub of [...(localState.submissions || []), ...(cloudState.submissions || [])]) {
    if (!sub || !sub.id || seenIds.has(sub.id)) continue
    seenIds.add(sub.id)
    mergedSubmissions.push(sub)
  }

  mergedSubmissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Merge languageProgress
  const languageProgress: Record<string, LanguageProgressSummary> = {
    python: { solvedSlugs: [], xp: 0 },
    java: { solvedSlugs: [], xp: 0 },
    nodejs: { solvedSlugs: [], xp: 0 },
    cpp: { solvedSlugs: [], xp: 0 },
  }

  // Build from localState and cloudState
  for (const l of ['python', 'java', 'nodejs', 'cpp']) {
    const localSlugs = localState.languageProgress?.[l]?.solvedSlugs || []
    const cloudSlugs = cloudState.languageProgress?.[l]?.solvedSlugs || []
    const union = Array.from(new Set([...localSlugs, ...cloudSlugs]))
    languageProgress[l] = {
      solvedSlugs: union,
      xp: union.length * 50,
    }
  }

  const mergedState: UserState = {
    xp: Math.max(cloudState.xp || 0, localState.xp || 0, allSolved.length * 50),
    streak: Math.max(cloudState.streak || 1, localState.streak || 1, allSolved.length > 0 ? 1 : 1),
    solvedSlugs: allSolved,
    progress: mergedProgress,
    submissions: mergedSubmissions.slice(0, MAX_STORED_SUBMISSIONS),
    languageProgress,
  }

  saveUserState(mergedState)
}

export function recordProblemSuccess(
  problemSlug: string,
  problemTitle: string,
  rawLanguage: string,
  code: string,
  executionTimeMs: number
): { isFirstSolve: boolean; newXp: number } {
  const state = getUserState()
  const lang = normalizeProgressLanguage(rawLanguage)

  if (!state.languageProgress) {
    state.languageProgress = {
      python: { solvedSlugs: [], xp: 0 },
      java: { solvedSlugs: [], xp: 0 },
      nodejs: { solvedSlugs: [], xp: 0 },
      cpp: { solvedSlugs: [], xp: 0 },
    }
  }
  if (!state.languageProgress[lang]) {
    state.languageProgress[lang] = { solvedSlugs: [], xp: 0 }
  }

  const isLangFirstSolve = !state.languageProgress[lang].solvedSlugs.includes(problemSlug)
  if (isLangFirstSolve) {
    state.languageProgress[lang].solvedSlugs.push(problemSlug)
    state.languageProgress[lang].xp += 50
  }

  // Overall unique solved tracking
  const isGlobalFirstSolve = !state.solvedSlugs.includes(problemSlug)
  if (isGlobalFirstSolve) {
    state.solvedSlugs.push(problemSlug)
  }
  if (isLangFirstSolve) {
    state.xp += 50
  }

  // Key by lang:problemSlug for independent per-language solved state & best code
  const langKey = `${lang}:${problemSlug}`
  const existingLangProg = state.progress[langKey] || {
    problemId: problemSlug,
    problemSlug,
    status: 'SOLVED',
    language: lang,
    bestCode: code,
    attempts: 0,
  }

  existingLangProg.status = 'SOLVED'
  existingLangProg.language = lang
  existingLangProg.bestCode = code
  existingLangProg.solvedAt = new Date().toISOString()
  existingLangProg.attempts += 1
  state.progress[langKey] = existingLangProg

  // Also maintain un-prefixed key for backward compatibility
  const globalProg = state.progress[problemSlug] || {
    problemId: problemSlug,
    problemSlug,
    status: 'SOLVED',
    language: lang,
    bestCode: code,
    attempts: 0,
  }
  globalProg.status = 'SOLVED'
  globalProg.language = lang
  globalProg.bestCode = code
  globalProg.solvedAt = new Date().toISOString()
  globalProg.attempts += 1
  state.progress[problemSlug] = globalProg

  // Add to submission history
  state.submissions.unshift({
    id: 'sub_' + Date.now(),
    problemSlug,
    problemTitle,
    language: lang,
    code,
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs,
    createdAt: new Date().toISOString(),
  })

  saveUserState(state)

  // Background Cloud Sync
  const activeUserId = getActiveUserId()
  if (activeUserId) {
    saveSuccessToCloud(activeUserId, problemSlug, lang, code, executionTimeMs).catch(() => {})
  }

  return { isFirstSolve: isLangFirstSolve, newXp: state.languageProgress[lang].xp }
}

export function recordProblemAttempt(
  problemSlug: string,
  problemTitle: string,
  rawLanguage: string,
  code: string,
  passedTests: number,
  totalTests: number,
  executionTimeMs: number
) {
  const state = getUserState()
  const lang = normalizeProgressLanguage(rawLanguage)
  const langKey = `${lang}:${problemSlug}`

  const existingProg = state.progress[langKey] || {
    problemId: problemSlug,
    problemSlug,
    status: 'ATTEMPTED',
    language: lang,
    bestCode: code,
    attempts: 0,
  }

  if (existingProg.status !== 'SOLVED') {
    existingProg.status = 'ATTEMPTED'
  }
  existingProg.attempts += 1
  existingProg.language = lang
  existingProg.bestCode = code
  state.progress[langKey] = existingProg

  // Also update backward-compatible global progress
  const globalProg = state.progress[problemSlug] || {
    problemId: problemSlug,
    problemSlug,
    status: 'ATTEMPTED',
    language: lang,
    bestCode: code,
    attempts: 0,
  }
  if (globalProg.status !== 'SOLVED') {
    globalProg.status = 'ATTEMPTED'
  }
  globalProg.attempts += 1
  state.progress[problemSlug] = globalProg

  state.submissions.unshift({
    id: 'sub_' + Date.now(),
    problemSlug,
    problemTitle,
    language: lang,
    code,
    status: passedTests === totalTests ? 'PASSED' : 'FAILED',
    passedTests,
    totalTests,
    executionTimeMs,
    createdAt: new Date().toISOString(),
  })

  saveUserState(state)

  // Background Cloud Sync
  const activeUserId = getActiveUserId()
  if (activeUserId) {
    saveAttemptToCloud(activeUserId, problemSlug, lang, code, passedTests, totalTests, executionTimeMs).catch(() => {})
  }
}

/**
 * Returns all solved problem slugs for a specific programming language.
 */
export function getLanguageSolvedSlugs(rawLanguage: string): string[] {
  const state = getUserState()
  const lang = normalizeProgressLanguage(rawLanguage)
  return state.languageProgress?.[lang]?.solvedSlugs || []
}

/**
 * Calculates language-specific completion stats and XP.
 */
export function getLanguageProgress(rawLanguage: string, totalProblems: number = 85): {
  solvedSlugs: string[]
  solvedCount: number
  totalCount: number
  percentage: number
  xp: number
} {
  const state = getUserState()
  const lang = normalizeProgressLanguage(rawLanguage)
  const solvedSlugs = state.languageProgress?.[lang]?.solvedSlugs || []
  const xp = state.languageProgress?.[lang]?.xp || (solvedSlugs.length * 50)
  const solvedCount = solvedSlugs.length
  const percentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0

  return {
    solvedSlugs,
    solvedCount,
    totalCount: totalProblems,
    percentage,
    xp,
  }
}

/**
 * Checks if a specific problem has been solved in the designated language.
 */
export function isProblemSolvedInLanguage(problemSlug: string, rawLanguage: string): boolean {
  const state = getUserState()
  const lang = normalizeProgressLanguage(rawLanguage)
  const langKey = `${lang}:${problemSlug}`
  if (state.progress[langKey]?.status === 'SOLVED') return true
  const langSolved = state.languageProgress?.[lang]?.solvedSlugs || []
  return langSolved.includes(problemSlug)
}

/**
 * Checks if a problem has been attempted in the designated language.
 */
export function isProblemAttemptedInLanguage(problemSlug: string, rawLanguage: string): boolean {
  const state = getUserState()
  const lang = normalizeProgressLanguage(rawLanguage)
  const langKey = `${lang}:${problemSlug}`
  return (
    state.progress[langKey]?.status === 'ATTEMPTED' &&
    !isProblemSolvedInLanguage(problemSlug, rawLanguage)
  )
}

/**
 * Returns saved best code for a problem in a designated language.
 */
export function getLanguageSavedCode(problemSlug: string, rawLanguage: string): string | null {
  const state = getUserState()
  const lang = normalizeProgressLanguage(rawLanguage)
  const langKey = `${lang}:${problemSlug}`
  if (state.progress[langKey]?.bestCode) {
    return state.progress[langKey].bestCode
  }
  // Fallback to un-prefixed if language matches
  if (state.progress[problemSlug]?.language === lang && state.progress[problemSlug]?.bestCode) {
    return state.progress[problemSlug].bestCode
  }
  return null
}
