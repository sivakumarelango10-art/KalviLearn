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
  const normalizedLang = raw.toLowerCase()
  if (normalizedLang === 'javascript' || normalizedLang === 'node' || normalizedLang === 'nodejs' || normalizedLang === 'js') return 'nodejs'
  if (normalizedLang === 'java') return 'java'
  if (normalizedLang === 'cpp' || normalizedLang === 'c++') return 'cpp'
  if (normalizedLang === 'python') return 'python'
  return 'python'
}

const STORAGE_KEY = 'kalvi_learn_user_state_v3'
const LEGACY_STORAGE_KEYS = [
  'kalvi_learn_user_state_v1',
  'kalvi_learn_user_state_v2',
  'kalvi_learn_user_state',
]
const MAX_STORED_SUBMISSIONS = 50

const defaultState: UserState = {
  xp: 0,
  streak: 0,
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

let legacyPurged = false

function purgeLegacyStorage() {
  if (legacyPurged) return
  try {
    for (const key of LEGACY_STORAGE_KEYS) {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key)
      }
    }
    legacyPurged = true
  } catch (storageErr) {
    console.warn('Failed to purge legacy storage keys:', storageErr)
  }
}

const STATE_OWNER_KEY = 'kalvi_state_owner'

/**
 * Local progress is a per-user cache. It is tagged with the owning user id so that signing in as a
 * DIFFERENT user (expired session, second tab, shared device) can never merge or display the previous
 * user's cached progress.
 */
export function claimStateForUser(userId: string) {
  try {
    const owner = localStorage.getItem(STATE_OWNER_KEY)
    if (owner !== userId) {
      clearAllUserCaches()
      resetUserState({ keepOwner: true })
      localStorage.setItem(STATE_OWNER_KEY, userId)
    }
  } catch {
    // storage unavailable: nothing is persisted, nothing can leak
  }
}

export function resetUserState(options: { keepOwner?: boolean } = {}) {
  purgeLegacyStorage()
  if (!options.keepOwner) {
    try {
      localStorage.removeItem(STATE_OWNER_KEY)
    } catch {
      // ignore
    }
  }
  saveUserState({
    xp: 0,
    streak: 0,
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

// Parse cache for READ-ONLY consumers. The practice list asks "solved/attempted?" for every one of ~500 rows on
// every render; re-parsing the (potentially hundreds of KB) JSON state per row made a render cost hundreds of ms.
// The cache is keyed on the exact raw storage string, so any write (this tab or hydration) invalidates it.
// Callers MUST treat the returned object as immutable; code that mutates state must keep using getUserState().
let readOnlyRaw: string | null = null
let readOnlyState: UserState | null = null

export function getUserStateReadOnly(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw && raw === readOnlyRaw && readOnlyState) return readOnlyState
    const fresh = getUserState()
    readOnlyRaw = raw
    readOnlyState = raw ? fresh : null
    return fresh
  } catch {
    return getUserState()
  }
}

export function getUserState(): UserState {
  try {
    purgeLegacyStorage()

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

import { calculateAuthoritativeStreak } from './streak'
import { clearAllUserCaches } from './cacheRegistry'

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

  const mergedProgress: Record<string, UserProgressRecord> = {}

  // 1. Seed with local progress
  for (const [key, record] of Object.entries(localState.progress || {})) {
    if (record) {
      mergedProgress[key] = { ...record }
    }
  }

  // 2. Merge cloud progress (authoritative for saved bestCode and solved status)
  for (const [key, record] of Object.entries(cloudState.progress || {})) {
    if (!record) continue
    const localP = mergedProgress[key]
    mergedProgress[key] = {
      problemId: record.problemId || localP?.problemId || key,
      problemSlug: record.problemSlug || localP?.problemSlug || key.replace(/^(python|java|nodejs|cpp):/, ''),
      status: record.status || localP?.status || 'ATTEMPTED',
      language: record.language || localP?.language || 'python',
      bestCode: record.bestCode || localP?.bestCode || '',
      solvedAt: record.solvedAt || localP?.solvedAt,
      attempts: Math.max(record.attempts || 1, localP?.attempts || 1),
    }
  }

  // 3. Merge submissions
  const mergedSubmissions: SubmissionRecord[] = [...(cloudState.submissions || [])]
  const cloudSubIds = new Set(mergedSubmissions.map((s) => s.id))
  for (const ls of localState.submissions || []) {
    if (!cloudSubIds.has(ls.id)) {
      mergedSubmissions.push(ls)
    }
  }
  mergedSubmissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // 4. Reconstruct languageProgress for each language independently
  const languageProgress: Record<string, LanguageProgressSummary> = {
    python: { solvedSlugs: [], xp: 0 },
    java: { solvedSlugs: [], xp: 0 },
    nodejs: { solvedSlugs: [], xp: 0 },
    cpp: { solvedSlugs: [], xp: 0 },
  }

  // Helper to register solved problem in language
  const registerLangSolve = (langRaw: string, slug: string, code?: string, timestamp?: string) => {
    const lang = normalizeProgressLanguage(langRaw)
    if (!slug || !languageProgress[lang]) return
    if (!languageProgress[lang].solvedSlugs.includes(slug)) {
      languageProgress[lang].solvedSlugs.push(slug)
      languageProgress[lang].xp += 50
    }
    const langKey = `${lang}:${slug}`
    if (!mergedProgress[langKey] || mergedProgress[langKey].status !== 'SOLVED' || (code && !mergedProgress[langKey].bestCode)) {
      mergedProgress[langKey] = {
        problemId: slug,
        problemSlug: slug,
        status: 'SOLVED',
        language: lang,
        bestCode: code || mergedProgress[langKey]?.bestCode || mergedProgress[slug]?.bestCode || '',
        solvedAt: timestamp || mergedProgress[langKey]?.solvedAt || new Date().toISOString(),
        attempts: mergedProgress[langKey]?.attempts || 1,
      }
    }
  }

  // Inspect cloudState.languageProgress if available
  if (cloudState.languageProgress) {
    for (const [langKey, summary] of Object.entries(cloudState.languageProgress)) {
      for (const slug of summary.solvedSlugs || []) {
        registerLangSolve(langKey, slug)
      }
    }
  }

  // Inspect all mergedProgress records
  for (const [key, record] of Object.entries(mergedProgress)) {
    if (record && record.status === 'SOLVED') {
      const slug = record.problemSlug || key.replace(/^(python|java|nodejs|cpp):/, '')
      registerLangSolve(record.language, slug, record.bestCode, record.solvedAt)
    }
  }

  // Inspect all passed submissions to recover all solved languages
  for (const sub of mergedSubmissions) {
    if (sub.status === 'PASSED' && (sub.passedTests === 10 || sub.passedTests === sub.totalTests)) {
      registerLangSolve(sub.language, sub.problemSlug, sub.code, sub.createdAt)
    }
  }

  // Unique solved slugs overall across all languages
  const allSolvedSet = new Set<string>()
  for (const l of ['python', 'java', 'nodejs', 'cpp']) {
    for (const s of languageProgress[l].solvedSlugs) {
      allSolvedSet.add(s)
    }
  }
  for (const s of cloudState.solvedSlugs || []) {
    allSolvedSet.add(s)
  }
  const allSolved = Array.from(allSolvedSet)

  // Ensure un-prefixed problemSlug key exists for each solved problem
  for (const slug of allSolved) {
    if (!mergedProgress[slug]) {
      const candidate =
        mergedProgress[`python:${slug}`] ||
        mergedProgress[`java:${slug}`] ||
        mergedProgress[`nodejs:${slug}`] ||
        mergedProgress[`cpp:${slug}`]
      if (candidate) {
        mergedProgress[slug] = { ...candidate }
      }
    } else {
      mergedProgress[slug].status = 'SOLVED'
    }
  }

  const activityTimestamps = [
    ...mergedSubmissions.map((s) => s.createdAt),
    ...Object.values(mergedProgress).map((p) => p.solvedAt),
  ].filter(Boolean) as string[]

  const authoritativeStreak =
    typeof cloudState.streak === 'number'
      ? cloudState.streak
      : calculateAuthoritativeStreak(activityTimestamps).streak

  const mergedState: UserState = {
    xp: Object.values(languageProgress).reduce((acc, lp) => acc + lp.xp, 0),
    streak: authoritativeStreak,
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
  executionTimeMs: number,
  options?: { awardXp?: boolean }
): { isFirstSolve: boolean; newXp: number } {
  const state = getUserState()
  const lang = normalizeProgressLanguage(rawLanguage)
  const shouldAwardXp = options?.awardXp !== false

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
    if (shouldAwardXp) {
      state.languageProgress[lang].xp += 50
    }
  }

  // Overall unique solved tracking
  const isGlobalFirstSolve = !state.solvedSlugs.includes(problemSlug)
  if (isGlobalFirstSolve) {
    state.solvedSlugs.push(problemSlug)
  }
  if (isLangFirstSolve && shouldAwardXp) {
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

  // Recalculate streak reactively
  const activityTimestamps = [
    ...state.submissions.map((s) => s.createdAt),
    ...Object.values(state.progress).map((p) => p.solvedAt),
  ].filter(Boolean) as string[]
  state.streak = calculateAuthoritativeStreak(activityTimestamps).streak

  saveUserState(state)

  // Cloud persistence is performed exclusively by the authenticated POST /api/submit endpoint
  // (server-authoritative). The browser never writes progress, XP or submissions to the database.

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

  // Recalculate streak reactively
  const attemptTimestamps = [
    ...state.submissions.map((s) => s.createdAt),
    ...Object.values(state.progress).map((p) => p.solvedAt),
  ].filter(Boolean) as string[]
  state.streak = calculateAuthoritativeStreak(attemptTimestamps).streak

  saveUserState(state)

  // Cloud persistence is performed exclusively by the authenticated POST /api/submit endpoint.
}

/**
 * Returns all solved problem slugs for a specific programming language.
 */
export function getLanguageSolvedSlugs(rawLanguage: string): string[] {
  const state = getUserStateReadOnly()
  const lang = normalizeProgressLanguage(rawLanguage)
  return state.languageProgress?.[lang]?.solvedSlugs || []
}

/**
 * Calculates language-specific completion stats and XP.
 */
export function getLanguageProgress(rawLanguage: string, totalProblems: number): {
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
  const state = getUserStateReadOnly()
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
  const state = getUserStateReadOnly()
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
export function getLanguageSavedCode(param1: string, param2: string): string | null {
  const isParam1Lang = ['python', 'java', 'nodejs', 'cpp', 'javascript', 'node', 'c++'].includes(
    (param1 || '').toLowerCase()
  )
  const problemSlug = isParam1Lang ? param2 : param1
  const rawLanguage = isParam1Lang ? param1 : param2

  const state = getUserStateReadOnly()
  const lang = normalizeProgressLanguage(rawLanguage)
  const langKey = `${lang}:${problemSlug}`
  if (state.progress[langKey]?.bestCode) {
    return state.progress[langKey].bestCode
  }
  // Fallback to latest passed submission for this specific problem and language
  const sub = (state.submissions || []).find(
    (s) =>
      s.problemSlug === problemSlug &&
      normalizeProgressLanguage(s.language) === lang &&
      s.status === 'PASSED' &&
      Boolean(s.code)
  )
  if (sub?.code) {
    return sub.code
  }
  // Fallback to un-prefixed if language matches
  if (
    state.progress[problemSlug]?.bestCode &&
    normalizeProgressLanguage(state.progress[problemSlug]?.language) === lang
  ) {
    return state.progress[problemSlug].bestCode
  }
  return null
}

