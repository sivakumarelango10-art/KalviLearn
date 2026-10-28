import { fetchAllRows } from './supabasePaging'
import { registerCacheClearer } from './cacheRegistry'
import { supabase } from './supabase'
import { calculateAuthoritativeStreak } from './streak'
import { fetchTotalProblemCount, mapToCanonicalPracticeSlug, getCanonicalPracticeProblem } from './problemStatsService'
import { isPracticeArchiveEnabled } from './featureFlags'
import problemsData from '../data/problems.json'

export interface SolvedProblemItem {
  problemId: string
  title: string
  slug: string
  difficulty: string
  beltName: string
  beltColor: string
  language: 'python' | 'java' | 'nodejs' | 'cpp'
  languageLabel: string
  languages?: Array<'python' | 'java' | 'nodejs' | 'cpp'>
  solvedAt: string
  solvedAtFormatted: string
}

export interface MentorStudent {
  id: string
  name: string
  email: string
  studentCode?: string
  student?: {
    id: string
    studentCode: string
    status: string
  }
  user?: {
    id: string
    name: string
    email: string
  }
  mentorName?: string
  mentorEmail?: string
  campus?: string
  belt: string
  beltColor: string
  progressPercent: number
  solvedCount: number
  totalProblems: number
  totalXp: number
  streak: number
  language: 'python' | 'java' | 'nodejs' | 'cpp'
  lastActive: string
  lastActiveRaw?: string
  status: 'ACTIVE' | 'ATTENTION'
  isActive: boolean
  needsAttention: boolean
  attentionReason?: string
  joinedDate?: string
  solvedSlugs?: string[]
  solvedProblems: SolvedProblemItem[]
  latestSolved?: SolvedProblemItem | null
  languageSolvedCounts: {
    python: number
    java: number
    cpp: number
    nodejs: number
  }
  recentSubmissions: Array<{
    id: string
    problemTitle: string
    problemSlug: string
    beltName: string
    beltColor: string
    language: 'python' | 'java' | 'nodejs' | 'cpp'
    languageLabel: string
    status: 'PASSED' | 'FAILED' | 'ERROR'
    passedTests: number
    totalTests: number
    executionTimeMs: number
    createdAt: string
    createdAtRaw: string
  }>
}

export interface MentorSubmission {
  id: string
  userId: string
  studentName: string
  studentEmail: string
  problemTitle: string
  problemSlug: string
  beltName: string
  beltColor: string
  language: 'python' | 'java' | 'nodejs' | 'cpp'
  languageLabel: string
  status: 'PASSED' | 'FAILED' | 'ERROR'
  passedTests: number
  totalTests: number
  executionTimeMs: number
  createdAt: string
  createdAtRaw: string
  code: string
}

export interface CohortOverview {
  totalStudents: number
  activeStudents: number
  attentionCount: number
  cohortMasteryPercent: number
}

export interface BeltMetric {
  order: number
  name: string
  title: string
  color: string
  totalProblems: number
  cohortCompleted: number
  avgPassRate: number | null
  bottleneck: string | null
}

export interface MentorProfile {
  id: string
  userId?: string
  mentorCode: string
  maxStudents: number
  status: string
  name: string
  email: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface AddStudentParams {
  name: string
  email: string
  mentorId?: string
}

export interface AddStudentResult {
  success: boolean
  error?: string
  student?: MentorStudent
}

export const COHORT_THRESHOLDS = {
  ACTIVE_DAYS: 7,
  ATTENTION_INACTIVE_DAYS: 7,
  ATTENTION_FAILED_TESTS: 4,
} as const

export function computeStudentBelt(solvedCount: number) {
  if (!isPracticeArchiveEnabled()) {
    if (solvedCount >= 410) return { order: 10, name: 'Belt 10', title: 'Black Belt: Advanced DP & Bitwise Reasoning', color: '#171717' }
    if (solvedCount >= 330) return { order: 9, name: 'Belt 9', title: 'Sr. Red Belt: Graph Algorithms & Network Traversal', color: '#B91C1C' }
    if (solvedCount >= 265) return { order: 8, name: 'Belt 8', title: 'Red Belt: Trees & Hierarchical Structures', color: '#EF4444' }
    if (solvedCount >= 205) return { order: 7, name: 'Belt 7', title: 'Sr. Brown Belt: Search & Optimization', color: '#78350F' }
    if (solvedCount >= 165) return { order: 6, name: 'Belt 6', title: 'Brown Belt: Recursion and State', color: '#92400E' }
    if (solvedCount >= 125) return { order: 5, name: 'Belt 5', title: 'Blue Belt: Structured Problem Solving', color: '#3B82F6' }
    if (solvedCount >= 85) return { order: 4, name: 'Belt 4', title: 'Purple Belt: Structured Problem Solving', color: '#8B5CF6' }
    if (solvedCount >= 50) return { order: 3, name: 'Belt 3', title: 'Green Belt: Structured Problem Solving', color: '#10B981' }
    if (solvedCount >= 20) return { order: 2, name: 'Belt 2', title: 'Orange Belt: Loop Logic & Introductory Arrays', color: '#F97316' }
    return { order: 1, name: 'Belt 1', title: 'Yellow Belt: Variables, Operators & Conditional Logic', color: '#EAB308' }
  }

  // Active 58-problem milestones
  if (solvedCount >= 45) return { order: 8, name: 'Belt 8', title: 'Red Belt: Trees & Hierarchical Structures', color: '#EF4444' }
  if (solvedCount >= 35) return { order: 7, name: 'Belt 7', title: 'Sr. Brown Belt: Search & Optimization', color: '#78350F' }
  if (solvedCount >= 25) return { order: 6, name: 'Belt 6', title: 'Brown Belt: Recursion and State', color: '#92400E' }
  if (solvedCount >= 10) return { order: 2, name: 'Belt 2', title: 'Orange Belt: Loop Logic & Introductory Arrays', color: '#F97316' }
  return { order: 1, name: 'Belt 1', title: 'Yellow Belt: Variables, Operators & Conditional Logic', color: '#EAB308' }
}

export function getBeltDefinitions(): Array<{
  order: number
  name: string
  title: string
  color: string
  totalProblems: number
}> {
  const archiveEnabled = isPracticeArchiveEnabled()
  return (problemsData as Array<{ order: number; name: string; title: string; color: string; problems: Array<{ isActive?: boolean }> }>).map((b) => ({
    order: b.order,
    name: b.name,
    title: b.title,
    color: b.color,
    totalProblems: b.problems.filter((p: any) => !archiveEnabled || p.isActive !== false).length,
  }))
}

export const BELT_DEFINITIONS: Array<{
  order: number
  name: string
  title: string
  color: string
  totalProblems: number
}> = new Proxy([] as any, {
  get(_target, prop, receiver) {
    const defs = getBeltDefinitions()
    return Reflect.get(defs, prop, receiver)
  },
})

export function deduplicateSubmissions<T extends { userId?: string; studentId?: string; problemId?: string; problemSlug?: string; language?: string; createdAt?: string; createdAtRaw?: string; code?: string; status?: string }>(
  subs: T[],
  windowSec = 15
): T[] {
  const result: T[] = []
  const lastSeenMap = new Map<string, number>()
  const windowMs = windowSec * 1000

  for (const s of subs) {
    const user = s.userId || s.studentId || ''
    const slug = s.problemSlug || s.problemId || ''
    const lang = normalizeLanguage(s.language)
    const codeSnippet = (s.code || '').trim().slice(0, 100)
    const timeMs = s.createdAtRaw || s.createdAt ? new Date(s.createdAtRaw || s.createdAt || 0).getTime() : 0
    const groupKey = `${user}:${slug}:${lang}:${s.status}:${codeSnippet}`

    const prevTime = lastSeenMap.get(groupKey)
    if (prevTime !== undefined && Math.abs(timeMs - prevTime) <= windowMs) {
      continue
    }

    lastSeenMap.set(groupKey, timeMs)
    result.push(s)
  }
  return result
}

export function formatRelativeTime(dateString?: string | null): string {
  if (!dateString) return 'Inactive'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Recently'
  const diffMs = Date.now() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  if (diffSecs < 60) return 'Just now'
  const diffMins = Math.floor(diffSecs / 60)
  if (diffMins < 60) return `${diffMins} mins ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function normalizeLanguage(lang?: string | null): 'python' | 'java' | 'nodejs' | 'cpp' {
  if (!lang) return 'python'
  const lower = lang.toLowerCase()
  if (lower.includes('java') && !lower.includes('script')) return 'java'
  if (lower.includes('node') || lower.includes('js') || lower.includes('javascript')) return 'nodejs'
  if (lower.includes('c++') || lower.includes('cpp') || lower.includes('g++') || lower.includes('clang') || lower.includes('cxx')) return 'cpp'
  return 'python'
}

export function getLanguageLabel(lang: string): string {
  switch (lang) {
    case 'java': return 'Java'
    case 'nodejs': return 'Node.js'
    case 'cpp': return 'C++'
    default: return 'Python'
  }
}



// In-memory High Performance Caching Layer (TTL + SWR)
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}
const mentorProfileCache = new Map<string, CacheEntry<MentorProfile | null>>()
const mentorStudentUsersCache = new Map<string, CacheEntry<StudentUserRow[]>>()
const mentorRosterCache = new Map<string, CacheEntry<MentorStudent[]>>()
const mentorSubmissionsCache = new Map<string, CacheEntry<{ submissions: MentorSubmission[]; hasMore: boolean }>>()
export const problemLookupCache = new Map<string, { title: string; slug: string; beltName: string; beltColor: string; difficulty?: string }>()

// Pre-seed lookup cache with practice catalog so problem titles and belts always resolve
for (const b of (problemsData as any[])) {
  for (const p of (b.problems || [])) {
    const entry = {
      title: p.title || 'Practice Challenge',
      slug: p.slug,
      beltName: b.name || 'Belt 1',
      beltColor: b.color || '#3B82F6',
      difficulty: p.difficulty || 'Easy',
    }
    problemLookupCache.set(p.id, entry)
    problemLookupCache.set(p.slug, entry)
  }
}

// Per-session caches are wiped on logout / account switch.
registerCacheClearer(() => {
  mentorProfileCache.clear()
  mentorStudentUsersCache.clear()
  mentorRosterCache.clear()
  mentorSubmissionsCache.clear()
})

/**
 * Invalidates cached mentor telemetry to guarantee real-time data consistency.
 */
export function invalidateMentorCache(mentorKey?: string): void {
  if (!mentorKey) {
    mentorProfileCache.clear()
    mentorStudentUsersCache.clear()
    mentorRosterCache.clear()
    mentorSubmissionsCache.clear()
    return
  }
  const key = mentorKey.toLowerCase()
  for (const k of mentorProfileCache.keys()) {
    if (k.toLowerCase().includes(key)) mentorProfileCache.delete(k)
  }
  for (const k of mentorStudentUsersCache.keys()) {
    if (k.toLowerCase().includes(key)) mentorStudentUsersCache.delete(k)
  }
  for (const k of mentorRosterCache.keys()) {
    if (k.toLowerCase().includes(key)) mentorRosterCache.delete(k)
  }
  for (const k of mentorSubmissionsCache.keys()) {
    if (k.toLowerCase().includes(key)) mentorSubmissionsCache.delete(k)
  }
}

// Core Helpers

/**
 * Resolves the mentor profile record directly from the mentors table with in-memory caching.
 * Directly exposes name, email, mentor_code, and user object.
 */
export async function getMentorProfile(mentorIdOrUserId: string): Promise<MentorProfile | null> {
  if (!mentorIdOrUserId) return null
  const cacheKey = mentorIdOrUserId.trim().toLowerCase()
  const cached = mentorProfileCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data
  }

  const isEmail = mentorIdOrUserId.includes('@')
  const query = supabase
    .from('mentors')
    .select('id, user_id, name, email, mentor_code, max_students, status')
    .eq('status', 'ACTIVE')

  const { data: mentor, error } = isEmail
    ? await query.ilike('email', mentorIdOrUserId.trim().toLowerCase()).maybeSingle()
    : await query.or(`id.eq.${mentorIdOrUserId},user_id.eq.${mentorIdOrUserId},email.eq.${mentorIdOrUserId}`).maybeSingle()

  if (error || !mentor) {
    mentorProfileCache.set(cacheKey, { data: null, timestamp: Date.now(), ttl: 10000 })
    return null
  }

  const userName = mentor.name || ''
  const userEmail = mentor.email || ''

  const result: MentorProfile = {
    id: mentor.id,
    userId: mentor.user_id,
    mentorCode: mentor.mentor_code,
    maxStudents: mentor.max_students,
    status: mentor.status,
    name: userName,
    email: userEmail,
    user: {
      id: mentor.user_id,
      name: userName,
      email: userEmail,
    },
  }

  // Cache for 5 minutes across id, user_id, and email keys
  const ttl = 300000
  mentorProfileCache.set(cacheKey, { data: result, timestamp: Date.now(), ttl })
  if (mentor.id) mentorProfileCache.set(mentor.id.toLowerCase(), { data: result, timestamp: Date.now(), ttl })
  if (mentor.user_id) mentorProfileCache.set(mentor.user_id.toLowerCase(), { data: result, timestamp: Date.now(), ttl })
  if (mentor.email) mentorProfileCache.set(mentor.email.toLowerCase(), { data: result, timestamp: Date.now(), ttl })

  return result
}

interface StudentUserRow {
  userId: string
  studentId: string
  studentCode: string
  status: string
  name: string
  email: string
  createdAt: string
}

/**
 * Returns all student records actively assigned to the given mentors.id with in-memory caching.
 * Directly reads name, email, student_code, status from students table.
 */
async function getMentorStudentUsers(mentorId: string): Promise<StudentUserRow[]> {
  const cacheKey = `sus_${mentorId}`
  const cached = mentorStudentUsersCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data
  }

  const { data: assignments, error: aErr } = await supabase
    .from('mentor_students')
    .select('student_id, students(id, user_id, name, email, student_code, status, created_at)')
    .eq('mentor_id', mentorId)
    .eq('status', 'ACTIVE')

  if (aErr || !assignments || assignments.length === 0) {
    mentorStudentUsersCache.set(cacheKey, { data: [], timestamp: Date.now(), ttl: 15000 })
    return []
  }

  const studentRows = assignments
    .map((a) => (a.students as unknown) as { id: string; user_id: string; name?: string; email?: string; student_code: string; status: string; created_at: string } | null)
    .filter(Boolean) as Array<{ id: string; user_id: string; name?: string; email?: string; student_code: string; status: string; created_at: string }>

  const result = studentRows
    .map((s) => ({
      userId: s.user_id,
      studentId: s.id,
      studentCode: s.student_code,
      status: s.status || 'ACTIVE',
      name: s.name || '',
      email: s.email || '',
      createdAt: s.created_at,
    }))
    .filter((s) => s.email)

  mentorStudentUsersCache.set(cacheKey, { data: result, timestamp: Date.now(), ttl: 60000 }) // 1 min TTL
  return result
}

// Public API

/**
 * Fetches the real student roster via mentor_students -> students -> users.
 * OPTIMIZED: Batch queries, no N+1 calls.
 */
export async function fetchMentorRoster(mentorUserId?: string, skipCache = false): Promise<MentorStudent[]> {
  try {
    const cacheKey = `roster_${mentorUserId || 'all'}`
    if (!skipCache) {
      const cached = mentorRosterCache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        return cached.data
      }
    }

    let studentUsers: StudentUserRow[] = []
    let mentorProfile: MentorProfile | null = null

    if (mentorUserId) {
      mentorProfile = await getMentorProfile(mentorUserId)
      if (!mentorProfile) return []
      studentUsers = await getMentorStudentUsers(mentorProfile.id)
    } else {
      const { data: allStudents } = await supabase
        .from('students').select('id, user_id, name, email, student_code, status, created_at').eq('status', 'ACTIVE')
      if (!allStudents || allStudents.length === 0) return []
      studentUsers = allStudents
        .map((s) => ({
          userId: s.user_id,
          studentId: s.id,
          studentCode: s.student_code,
          status: s.status || 'ACTIVE',
          name: s.name || '',
          email: s.email || '',
          createdAt: s.created_at,
        }))
        .filter((s) => s.email)
    }

    if (studentUsers.length === 0) return []
    const studentUserIds = studentUsers.map((s) => s.userId)

    const [progressRes, submissionsRes, totalProblemsCount] = await Promise.all([
      fetchAllRows(() => supabase.from('UserProgress').select('id, userId, problemId, status, language, solvedAt, xpEarned, Problem(slug, title, difficulty, beltId, Belt(order, name, color))').in('userId', studentUserIds).eq('status', 'SOLVED')),
      fetchAllRows(() => supabase.from('Submission').select('id, userId, problemId, status, language, createdAt, passedTests, totalTests, executionTimeMs, Problem(slug, title, difficulty, Belt(order, name, color))').in('userId', studentUserIds), [{ column: 'createdAt', ascending: false }]),
      fetchTotalProblemCount(),
    ])

    const progressByUser = new Map<string, Array<{ problemId: string; status: string; language?: string; solvedAt?: string; xpEarned?: number; Problem?: unknown }>>()
    for (const p of progressRes.data || []) {
      const list = progressByUser.get(p.userId) || []
      list.push(p as any)
      progressByUser.set(p.userId, list)
    }
    const submissionsByUser = new Map<string, Array<{ problemId: string; status: string; language?: string; createdAt: string; passedTests?: number; totalTests?: number; executionTimeMs?: number; Problem?: unknown }>>()
    for (const s of submissionsRes.data || []) {
      const list = submissionsByUser.get(s.userId) || []
      if (list.length < 50) list.push(s as any)
      submissionsByUser.set(s.userId, list)
    }

    const students: MentorStudent[] = studentUsers.map((su) => {
      const solvedList = progressByUser.get(su.userId) || []
      const rawSubs = submissionsByUser.get(su.userId) || []
      // Deduplicate near-duplicate submissions (within 15s with same code) so double-writes don't distort pass rate or counts
      const recentSubs = deduplicateSubmissions(rawSubs)

      // A problem is solved in language L if UserProgress has (SOLVED, L) OR Submission has (PASSED 10/10, L)
      const solvedByLang: Record<'python' | 'java' | 'nodejs' | 'cpp', Set<string>> = {
        python: new Set(),
        java: new Set(),
        cpp: new Set(),
        nodejs: new Set(),
      }
      const uniqueSolvedOverall = new Map<string, SolvedProblemItem>()

      const registerSolvedProblem = (
        slugCandidate: string,
        lang: 'python' | 'java' | 'nodejs' | 'cpp',
        solvedAt: string,
        probData: {
          problemId?: string
          title?: string
          difficulty?: string
          beltName?: string
          beltColor?: string
        }
      ) => {
        const canonicalSlug = mapToCanonicalPracticeSlug(slugCandidate)
        const slug = canonicalSlug || slugCandidate
        if (!slug) return

        solvedByLang[lang].add(slug)

        const cached =
          problemLookupCache.get(slug) ||
          (probData.problemId ? problemLookupCache.get(probData.problemId) : undefined)
        const canonicalProb = getCanonicalPracticeProblem(slug)

        const title = canonicalProb?.title || probData.title || cached?.title || 'Practice Challenge'
        const difficulty = canonicalProb?.difficulty || probData.difficulty || cached?.difficulty || 'Easy'
        const beltName = probData.beltName || cached?.beltName || 'Belt 1'
        const beltColor = probData.beltColor || cached?.beltColor || '#3B82F6'
        const problemId = canonicalProb?.id || probData.problemId || slug

        const existing = uniqueSolvedOverall.get(slug)
        const newTime = solvedAt ? new Date(solvedAt).getTime() : 0
        const existingTime = existing?.solvedAt ? new Date(existing.solvedAt).getTime() : 0

        if (!existing) {
          uniqueSolvedOverall.set(slug, {
            problemId,
            title,
            slug,
            difficulty,
            beltName,
            beltColor,
            language: lang,
            languageLabel: getLanguageLabel(lang),
            languages: [lang],
            solvedAt: solvedAt || new Date().toISOString(),
            solvedAtFormatted: formatRelativeTime(solvedAt),
          })
        } else {
          if (!existing.languages) {
            existing.languages = [existing.language]
          }
          if (!existing.languages.includes(lang)) {
            existing.languages.push(lang)
          }
          if (newTime > existingTime) {
            existing.language = lang
            existing.languageLabel = getLanguageLabel(lang)
            existing.solvedAt = solvedAt || existing.solvedAt
            existing.solvedAtFormatted = formatRelativeTime(solvedAt)
          }
        }
      }

      for (const p of solvedList) {
        const prob = p.Problem as { slug?: string; title?: string; difficulty?: string; Belt?: { order?: number; name?: string; color?: string } } | null
        const pLang = normalizeLanguage(p.language)
        const rawSlug = prob?.slug || p.problemId
        registerSolvedProblem(rawSlug, pLang, p.solvedAt || '', {
          problemId: p.problemId,
          title: prob?.title,
          difficulty: prob?.difficulty,
          beltName: prob?.Belt?.name,
          beltColor: prob?.Belt?.color,
        })
      }

      // Also include any passed submissions not already present in UserProgress
      for (const s of recentSubs) {
        const isPassed =
          (s.status?.toUpperCase() === 'PASSED' || s.status?.toUpperCase() === 'ACCEPTED') &&
          ((s.passedTests != null && s.totalTests != null && s.passedTests === s.totalTests && s.totalTests > 0) ||
            (s.passedTests ?? 0) >= 10 ||
            (s.status?.toUpperCase() === 'PASSED' && (s.totalTests == null || s.passedTests == null || s.passedTests === s.totalTests)))

        if (isPassed) {
          const prob = s.Problem as { slug?: string; title?: string; difficulty?: string; Belt?: { order?: number; name?: string; color?: string } } | null
          const sLang = normalizeLanguage(s.language)
          const rawSlug = prob?.slug || s.problemId
          registerSolvedProblem(rawSlug, sLang, s.createdAt || '', {
            problemId: s.problemId,
            title: prob?.title,
            difficulty: prob?.difficulty,
            beltName: prob?.Belt?.name,
            beltColor: prob?.Belt?.color,
          })
        }
      }

      const languageSolvedCounts = {
        python: solvedByLang.python.size,
        java: solvedByLang.java.size,
        cpp: solvedByLang.cpp.size,
        nodejs: solvedByLang.nodejs.size,
      }

      // Solved problems sorted by solvedAt descending (newest first!)
      const solvedProblems = Array.from(uniqueSolvedOverall.values()).sort(
        (a, b) => new Date(b.solvedAt).getTime() - new Date(a.solvedAt).getTime()
      )
      const latestSolved = solvedProblems[0] || null
      const solvedCount = uniqueSolvedOverall.size
      const solvedSlugs = Array.from(uniqueSolvedOverall.keys())

      const progressPercent = totalProblemsCount > 0 ? Math.min(100, Math.round((solvedCount / totalProblemsCount) * 100)) : 0
      const totalXp = solvedCount * 50

      const recentSubmissions = recentSubs.slice(0, 15).map((s: any) => {
        const prob = s.Problem as { slug?: string; title?: string; difficulty?: string; Belt?: { order?: number; name?: string; color?: string } } | null
        const sLang = normalizeLanguage(s.language)
        const cached =
          (prob?.slug ? problemLookupCache.get(prob.slug) : null) ||
          (s.problemId ? problemLookupCache.get(s.problemId) : null)
        return {
          id: s.id,
          problemTitle: prob?.title || cached?.title || 'Practice Challenge',
          problemSlug: prob?.slug || cached?.slug || 'challenge',
          beltName: prob?.Belt?.name || cached?.beltName || 'Belt 1',
          beltColor: prob?.Belt?.color || cached?.beltColor || '#3B82F6',
          language: sLang,
          languageLabel: getLanguageLabel(sLang),
          status: (s.status as 'PASSED' | 'FAILED' | 'ERROR') || 'PASSED',
          passedTests: s.passedTests ?? 10,
          totalTests: s.totalTests || 10,
          executionTimeMs: s.executionTimeMs || 25,
          createdAt: formatRelativeTime(s.createdAt),
          createdAtRaw: s.createdAt,
        }
      })

      // Single source of truth for belt progression: aligned with Student Dashboard cumulative solved thresholds
      const studentBelt = computeStudentBelt(solvedCount)
      const belt = studentBelt.name
      const beltColor = studentBelt.color

      const latestSub = recentSubs[0]
      const subTime = latestSub?.createdAt ? new Date(latestSub.createdAt).getTime() : 0
      const progTime = latestSolved?.solvedAt ? new Date(latestSolved.solvedAt).getTime() : 0
      const lastActiveRaw = Math.max(subTime, progTime) > 0 ? new Date(Math.max(subTime, progTime)).toISOString() : su.createdAt
      const language = normalizeLanguage(latestSub?.language || latestSolved?.language)
      const activityTimestamps = [...recentSubs.map((s) => s.createdAt), ...solvedProblems.map((p) => p.solvedAt)].filter(Boolean) as string[]
      const streak = calculateAuthoritativeStreak(activityTimestamps).streak

      // Threshold-based Attention & Active calculation
      const nowMs = Date.now()
      const daysSinceActive = lastActiveRaw
        ? Math.floor((nowMs - new Date(lastActiveRaw).getTime()) / (1000 * 60 * 60 * 24))
        : 999
      const recentFailedCount = recentSubs.slice(0, 5).filter((s) => s.status === 'FAILED').length

      let needsAttention = false
      let attentionReason: string | undefined = undefined

      if (daysSinceActive > COHORT_THRESHOLDS.ATTENTION_INACTIVE_DAYS) {
        needsAttention = true
        attentionReason = `Inactive for ${daysSinceActive} days`
      } else if (recentFailedCount >= COHORT_THRESHOLDS.ATTENTION_FAILED_TESTS) {
        needsAttention = true
        attentionReason = `${recentFailedCount} failed test executions in recent problems`
      }

      const status: 'ACTIVE' | 'ATTENTION' = needsAttention ? 'ATTENTION' : 'ACTIVE'

      return {
        id: su.userId,
        name: su.name || su.email.split('@')[0].replace(/\./g, ' '),
        email: su.email,
        studentCode: su.studentCode,
        student: {
          id: su.studentId,
          studentCode: su.studentCode,
          status: su.status,
        },
        user: {
          id: su.userId,
          name: su.name,
          email: su.email,
        },
        mentorName: mentorProfile?.name || mentorProfile?.user?.name || 'Assigned Growth Mentor',
        mentorEmail: mentorProfile?.email || mentorProfile?.user?.email || '',
        campus: 'Kalvi National Technology Campus',
        belt,
        beltColor,
        progressPercent,
        solvedCount,
        totalProblems: totalProblemsCount,
        totalXp,
        streak,
        language,
        lastActive: formatRelativeTime(lastActiveRaw),
        lastActiveRaw,
        status,
        isActive: !needsAttention && daysSinceActive <= COHORT_THRESHOLDS.ACTIVE_DAYS,
        needsAttention,
        attentionReason,
        joinedDate: su.createdAt ? new Date(su.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Jan 2026',
        solvedSlugs,
        solvedProblems,
        latestSolved,
        languageSolvedCounts,
        recentSubmissions,
      }
    })

    return students.sort((a, b) => a.name.localeCompare(b.name))
  } catch (err) {
    console.error('Error in fetchMentorRoster:', err)
    return []
  }
}

/**
 * Fetches recent submissions with pagination, optionally scoped to a specific mentor's students.
 */
/**
 * Fetches recent submissions with pagination and high-speed in-memory caching.
 * Resolves student metadata directly without redundant queries.
 */
export async function fetchMentorSubmissions(
  mentorUserId?: string,
  limit = 25,
  offset = 0,
  skipCache = false
): Promise<{ submissions: MentorSubmission[]; hasMore: boolean }> {
  try {
    const cacheKey = `subs_${mentorUserId || 'all'}_${limit}_${offset}`
    if (!skipCache) {
      const cached = mentorSubmissionsCache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        return cached.data
      }
    }

    let studentUserIds: string[] | null = null
    const userMap = new Map<string, { name: string; email: string }>()

    if (mentorUserId) {
      const mp = await getMentorProfile(mentorUserId)
      if (mp) {
        const sus = await getMentorStudentUsers(mp.id)
        for (const s of sus) {
          userMap.set(s.userId, { name: s.name, email: s.email })
        }
        studentUserIds = sus.map((s) => s.userId)
        if (studentUserIds.length === 0) {
          const emptyResult = { submissions: [], hasMore: false }
          mentorSubmissionsCache.set(cacheKey, { data: emptyResult, timestamp: Date.now(), ttl: 15000 })
          return emptyResult
        }
      }
    }

    let query = supabase
      .from('Submission')
      .select('id, userId, language, code, status, passedTests, totalTests, executionTimeMs, createdAt, Problem(id, slug, title, Belt(name, color))')
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit)
    if (studentUserIds) query = query.in('userId', studentUserIds)

    const { data: subs, error: sError } = await query
    if (sError || !subs || subs.length === 0) {
      const emptyResult = { submissions: [], hasMore: false }
      mentorSubmissionsCache.set(cacheKey, { data: emptyResult, timestamp: Date.now(), ttl: 15000 })
      return emptyResult
    }

    const deduplicatedSubs = deduplicateSubmissions(subs)
    const hasMore = deduplicatedSubs.length > limit
    const pageSubs = deduplicatedSubs.slice(0, limit)

    // Check if any submission userId is missing from userMap (e.g. if studentUserIds was null)
    const missingUserIds = Array.from(
      new Set(pageSubs.map((s) => s.userId).filter((id) => id && !userMap.has(id)))
    )

    if (missingUserIds.length > 0) {
      const { data: users } = await supabase.from('users').select('id, name, email').in('id', missingUserIds)
      for (const u of users || []) {
        userMap.set(u.id, { name: u.name || u.email.split('@')[0].replace(/\./g, ' '), email: u.email })
      }
    }

    const result = {
      submissions: pageSubs.map((s) => {
        const prob = s.Problem as { id?: string; slug?: string; title?: string; Belt?: { name?: string; color?: string } } | null
        if (prob?.id) {
          problemLookupCache.set(prob.id, {
            title: prob.title || 'Practice Challenge',
            slug: prob.slug || 'challenge',
            beltName: prob.Belt?.name || 'Belt 1',
            beltColor: prob.Belt?.color || '#3B82F6',
          })
        }
        const uInfo = userMap.get(s.userId) || { name: 'Student', email: '' }
        const lang = normalizeLanguage(s.language)
        return {
          id: s.id, userId: s.userId,
          studentName: uInfo.name, studentEmail: uInfo.email,
          problemTitle: prob?.title || 'Practice Challenge',
          problemSlug: prob?.slug || 'challenge',
          beltName: prob?.Belt?.name || 'Belt 1',
          beltColor: prob?.Belt?.color || '#3B82F6',
          language: lang, languageLabel: getLanguageLabel(lang),
          status: (s.status as 'PASSED' | 'FAILED' | 'ERROR') || 'PASSED',
          passedTests: s.passedTests ?? 10, totalTests: s.totalTests || 10,
          executionTimeMs: s.executionTimeMs || 25,
          createdAt: formatRelativeTime(s.createdAt), createdAtRaw: s.createdAt,
          code: s.code || '',
        }
      }),
      hasMore,
    }

    mentorSubmissionsCache.set(cacheKey, { data: result, timestamp: Date.now(), ttl: 20000 })
    return result
  } catch (err) {
    console.error('Error in fetchMentorSubmissions:', err)
    return { submissions: [], hasMore: false }
  }
}

/**
 * Computes live curriculum metrics per belt from actual student progress and submissions.
 * Scoped strictly to the authenticated mentor's assigned students.
 */
export async function fetchMentorCurriculumMetrics(mentorUserId?: string): Promise<BeltMetric[]> {
  try {
    let studentUserIds: string[] = []

    if (mentorUserId) {
      const mp = await getMentorProfile(mentorUserId)
      if (mp) {
        const sus = await getMentorStudentUsers(mp.id)
        studentUserIds = sus.map((s) => s.userId)
      }
    } else {
      const { data: allStudents } = await supabase
        .from('students')
        .select('user_id')
        .eq('status', 'ACTIVE')
      studentUserIds = (allStudents || []).map((s) => s.user_id).filter(Boolean)
    }

    if (studentUserIds.length === 0) {
      return BELT_DEFINITIONS.map((def) => ({
        order: def.order,
        name: def.name,
        title: def.title,
        color: def.color,
        totalProblems: def.totalProblems,
        cohortCompleted: 0,
        avgPassRate: null,
        bottleneck: null,
      }))
    }

    const [progressRes, submissionsRes] = await Promise.all([
      fetchAllRows(() =>
        supabase
          .from('UserProgress')
          .select('id, userId, problemId, status, Problem(slug, title, beltId, Belt(order, name, color))')
          .in('userId', studentUserIds)
          .eq('status', 'SOLVED')
      ),
      fetchAllRows(
        () =>
          supabase
            .from('Submission')
            .select('id, userId, problemId, status, language, code, createdAt, passedTests, totalTests, Problem(slug, title, beltId, Belt(order, name, color))')
            .in('userId', studentUserIds),
        [{ column: 'createdAt', ascending: false }]
      ),
    ])

    const progressRows = progressRes.data || []
    const rawSubmissionRows = submissionsRes.data || []
    const submissionRows = deduplicateSubmissions(rawSubmissionRows)

    return BELT_DEFINITIONS.map((def) => {
      // Active in this milestone: distinct student user IDs assigned to THIS mentor who have
      // solved or submitted a problem in that belt.
      const activeStudentsInBelt = new Set<string>()

      for (const row of progressRows) {
        const problemData = row.Problem as { Belt?: { order?: number } } | null
        if (problemData?.Belt?.order === def.order && row.userId) {
          activeStudentsInBelt.add(row.userId)
        }
      }

      const subsInBelt = submissionRows.filter(
        (submissionItem) => (submissionItem.Problem as { Belt?: { order?: number } } | null)?.Belt?.order === def.order
      )

      for (const sub of subsInBelt) {
        if (sub.userId) {
          activeStudentsInBelt.add(sub.userId)
        }
      }

      // Numerator: DISTINCT students assigned to this mentor active in that belt (guaranteed <= total mentor students)
      const cohortCompleted = activeStudentsInBelt.size

      // Formula: passed submissions / total submissions for this mentor's students on problems in that belt
      let avgPassRate: number | null = null
      let bottleneck: string | null = null

      if (subsInBelt.length > 0) {
        const passedCount = subsInBelt.filter(
          (s) => s.status === 'PASSED' && (s.passedTests === 10 || s.passedTests === s.totalTests)
        ).length
        avgPassRate = Math.round((passedCount / subsInBelt.length) * 1000) / 10

        // Derive bottleneck from real failure telemetry on this belt
        const problemStatsMap = new Map<string, { title: string; total: number; passed: number }>()
        for (const s of subsInBelt) {
          const prob = s.Problem as { title?: string; slug?: string } | null
          const title = prob?.title || 'Problem'
          const curr = problemStatsMap.get(title) || { title, total: 0, passed: 0 }
          curr.total += 1
          if (s.status === 'PASSED' && (s.passedTests === 10 || s.passedTests === s.totalTests)) {
            curr.passed += 1
          }
          problemStatsMap.set(title, curr)
        }

        const problemStatsList = Array.from(problemStatsMap.values()).sort((a, b) => {
          const aRate = a.total > 0 ? a.passed / a.total : 1
          const bRate = b.total > 0 ? b.passed / b.total : 1
          return aRate - bRate
        })

        const worst = problemStatsList[0]
        if (worst) {
          const worstRate = Math.round((worst.passed / worst.total) * 100)
          if (worstRate < 100) {
            bottleneck = `${worst.title} (${worstRate}% pass rate)`
          } else {
            bottleneck = 'All problems on track (100% pass)'
          }
        }
      }

      return {
        order: def.order,
        name: def.name,
        title: def.title,
        color: def.color,
        totalProblems: def.totalProblems,
        cohortCompleted,
        avgPassRate,
        bottleneck,
      }
    })
  } catch (err) {
    console.error('Error in fetchMentorCurriculumMetrics:', err)
    return BELT_DEFINITIONS.map((beltDef) => ({
      ...beltDef,
      cohortCompleted: 0,
      avgPassRate: null,
      bottleneck: null,
    }))
  }
}

/**
 * Real-time subscription for Submission, UserProgress, and mentor_students table changes.
 */
/**
 * Real-time subscription for Submission, UserProgress, and mentor_students table changes.
 */
export function subscribeToMentorUpdates(onUpdate: () => void): () => void {
  try {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const debouncedUpdate = (payload?: any) => {
      // Invalidate relevant cache on data change
      if (payload?.table === 'mentor_students') {
        mentorStudentUsersCache.clear()
        mentorRosterCache.clear()
      }
      if (payload?.table === 'Submission') {
        mentorSubmissionsCache.clear()
      }
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(onUpdate, 200)
    }
    const channel = supabase
      .channel(`mentor-live-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Submission' }, debouncedUpdate)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'UserProgress' }, debouncedUpdate)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mentor_students' }, debouncedUpdate)
      .subscribe()
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      supabase.removeChannel(channel).catch(console.warn)
    }
  } catch (err) {
    console.warn('Realtime subscription error:', err)
    return () => {}
  }
}

/**
 * Dedicated sub-second real-time stream subscription for live submissions.
 * Directly pushes incoming Submission inserts to the UI in milliseconds without refetching.
 */
export function subscribeToLiveSubmissions(
  mentorUserId: string | undefined,
  onNewSubmission: (submission: MentorSubmission) => void,
  onReconcileNeeded?: () => void
): () => void {
  try {
    const channelId = `live-subs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    let debounceReconcile: ReturnType<typeof setTimeout> | null = null

    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Submission' },
        async (payload) => {
          const raw = payload.new as {
            id: string
            userId: string
            problemId?: string
            language: string
            code: string
            status: string
            passedTests?: number
            totalTests?: number
            executionTimeMs?: number
            createdAt: string
          }

          if (!raw?.id) return

          // Clear submissions cache so next page/offset fetch is fresh
          mentorSubmissionsCache.clear()

          let isRelevant = true
          let studentInfo = { name: 'Student', email: '' }

          if (mentorUserId) {
            const mp = await getMentorProfile(mentorUserId)
            if (mp) {
              const sus = await getMentorStudentUsers(mp.id)
              const matchedStudent = sus.find((s) => s.userId === raw.userId)
              if (!matchedStudent && sus.length > 0) {
                isRelevant = false
              } else if (matchedStudent) {
                studentInfo = { name: matchedStudent.name, email: matchedStudent.email }
              }
            }
          }

          if (isRelevant) {
            const probInfo = raw.problemId ? problemLookupCache.get(raw.problemId) : null
            const lang = normalizeLanguage(raw.language)

            const liveSubmission: MentorSubmission = {
              id: raw.id,
              userId: raw.userId,
              studentName: studentInfo.name,
              studentEmail: studentInfo.email,
              problemTitle: probInfo?.title || 'Practice Challenge',
              problemSlug: probInfo?.slug || 'challenge',
              beltName: probInfo?.beltName || 'Belt 1',
              beltColor: probInfo?.beltColor || '#3B82F6',
              language: lang,
              languageLabel: getLanguageLabel(lang),
              status: (raw.status as 'PASSED' | 'FAILED' | 'ERROR') || 'PASSED',
              passedTests: raw.passedTests ?? 10,
              totalTests: raw.totalTests || 10,
              executionTimeMs: raw.executionTimeMs || 25,
              createdAt: formatRelativeTime(raw.createdAt),
              createdAtRaw: raw.createdAt,
              code: raw.code || '',
            }

            // Immediately stream new submission to UI in real-time
            onNewSubmission(liveSubmission)
          }

          // Trigger reconciliation in background to ensure joined DB relations
          if (onReconcileNeeded) {
            if (debounceReconcile) clearTimeout(debounceReconcile)
            debounceReconcile = setTimeout(onReconcileNeeded, 400)
          }
        }
      )
      .subscribe()

    return () => {
      if (debounceReconcile) clearTimeout(debounceReconcile)
      supabase.removeChannel(channel).catch(console.warn)
    }
  } catch (err) {
    console.warn('Live submissions subscription error:', err)
    return () => {}
  }
}

/**
 * Adds and maps a student to the current mentor via the mentor_students junction table.
 * Enforces uniqueness, capacity, and role constraints.
 */
export async function addStudent(params: AddStudentParams): Promise<AddStudentResult> {
  const name = params.name.trim()
  const email = params.email.trim().toLowerCase()
  const mentorUserId = params.mentorId

  if (!name) return { success: false, error: 'Student full name is required.' }
  if (!email || !email.includes('@') || !email.includes('.')) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    let mentorProfile: MentorProfile | null = null
    if (mentorUserId) {
      mentorProfile = await getMentorProfile(mentorUserId)
      if (!mentorProfile) return { success: false, error: 'Mentor account is invalid or inactive.' }
    }

    const safeEmail = email.replace(/[%_\\]/g, '\\$&')
    const { data: userRow, error: userErr } = await supabase
      .from('users').select('id, email, name, role, status').ilike('email', safeEmail).maybeSingle()

    if (userErr) return { success: false, error: userErr.message }
    if (!userRow) return { success: false, error: 'No student with that email address exists in the system.' }
    if (userRow.role !== 'STUDENT') return { success: false, error: 'Only users with role STUDENT can be assigned a mentor.' }
    if (userRow.status !== 'ACTIVE') return { success: false, error: 'This student account is inactive.' }

    const { data: existingStudent } = await supabase
      .from('students').select('id').eq('user_id', userRow.id).maybeSingle()

    let studentId: string
    if (existingStudent?.id) {
      studentId = existingStudent.id
      await supabase
        .from('students')
        .update({
          name: userRow.name || name,
          email: userRow.email,
          updated_at: new Date().toISOString(),
        })
        .eq('id', studentId)
    } else {
      const { data: newStudent, error: createErr } = await supabase
        .from('students')
        .insert({
          user_id: userRow.id,
          name: userRow.name || name,
          email: userRow.email,
          student_code: `STU-${Date.now()}`,
          status: 'ACTIVE',
        })
        .select('id').single()
      if (createErr || !newStudent) return { success: false, error: 'Failed to create student profile.' }
      studentId = newStudent.id
    }

    const { data: existingLink } = await supabase
      .from('mentor_students').select('id, mentor_id').eq('student_id', studentId).eq('status', 'ACTIVE').maybeSingle()

    if (existingLink) {
      if (mentorProfile && existingLink.mentor_id === mentorProfile.id) {
        return { success: false, error: 'This student is already mapped to you.' }
      }
      return { success: false, error: 'This student is already mapped to another mentor.' }
    }

    if (!mentorProfile) return { success: false, error: 'Mentor context is required.' }

    const { count: activeCount } = await supabase
      .from('mentor_students').select('id', { count: 'exact', head: true })
      .eq('mentor_id', mentorProfile.id).eq('status', 'ACTIVE')

    if ((activeCount ?? 0) >= mentorProfile.maxStudents) {
      return { success: false, error: `Mentor has reached the maximum capacity of ${mentorProfile.maxStudents} students.` }
    }

    const { error: linkErr } = await supabase
      .from('mentor_students')
      .insert({ mentor_id: mentorProfile.id, student_id: studentId, status: 'ACTIVE', assigned_at: new Date().toISOString() })

    if (linkErr) {
      if (linkErr.code === '23505') return { success: false, error: 'This student is already mapped to another mentor.' }
      return { success: false, error: linkErr.message }
    }

    if (mentorUserId) {
      await supabase.from('users').update({ mentorId: mentorUserId, updatedAt: new Date().toISOString() }).eq('id', userRow.id)
    }

    invalidateMentorCache(mentorUserId)

    const dynamicTotalProblems = await fetchTotalProblemCount().catch(() => 0)

    return {
      success: true,
      student: {
        id: userRow.id, name: userRow.name || name, email: userRow.email,
        belt: 'Belt 1', beltColor: '#3B82F6', progressPercent: 0, solvedCount: 0, totalProblems: dynamicTotalProblems,
        totalXp: 0,
        mentorName: mentorProfile.name || 'Assigned Growth Mentor',
        mentorEmail: mentorProfile.email || '',
        campus: 'Kalvi National Technology Campus',
        streak: 0, language: 'python', lastActive: 'Just mapped', status: 'ACTIVE', isActive: true, needsAttention: false, joinedDate: 'Just now',
        solvedProblems: [],
        languageSolvedCounts: { python: 0, java: 0, cpp: 0, nodejs: 0 },
        recentSubmissions: [],
      },
    }
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}

/**
 * Assigns a student to a mentor via mentor_students (system/admin flow).
 */
export async function assignStudentMentor(
  studentUserId: string,
  mentorUserId: string
): Promise<{ success: boolean; error?: string }> {
  if (!studentUserId || !mentorUserId) return { success: false, error: 'Student and mentor IDs are required.' }
  try {
    const mentorProfile = await getMentorProfile(mentorUserId)
    if (!mentorProfile) return { success: false, error: 'Mentor is invalid or inactive.' }

    const { data: studentRow } = await supabase.from('students').select('id').eq('user_id', studentUserId).maybeSingle()
    if (!studentRow) return { success: false, error: 'Student profile not found.' }

    const { data: existing } = await supabase
      .from('mentor_students').select('id, mentor_id').eq('student_id', studentRow.id).eq('status', 'ACTIVE').maybeSingle()
    if (existing) {
      return { success: false, error: existing.mentor_id === mentorProfile.id ? 'Student already assigned to this mentor.' : 'Student is already assigned to another mentor.' }
    }

    const { count: activeCount } = await supabase
      .from('mentor_students').select('id', { count: 'exact', head: true })
      .eq('mentor_id', mentorProfile.id).eq('status', 'ACTIVE')
    if ((activeCount ?? 0) >= mentorProfile.maxStudents) {
      return { success: false, error: `Mentor has reached the maximum capacity of ${mentorProfile.maxStudents} students.` }
    }

    const { error: linkErr } = await supabase
      .from('mentor_students').insert({ mentor_id: mentorProfile.id, student_id: studentRow.id, status: 'ACTIVE', assigned_at: new Date().toISOString() })
    if (linkErr) return { success: false, error: linkErr.message }

    await supabase.from('users').update({ mentorId: mentorUserId, updatedAt: new Date().toISOString() }).eq('id', studentUserId)
    invalidateMentorCache(mentorUserId)
    return { success: true }
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}

/**
 * Removes a student from a mentor's cohort by setting mentor_students.status = INACTIVE.
 * Does NOT delete the user row. IDOR protected.
 */
export async function removeStudent(
  studentUserId: string,
  mentorUserId?: string
): Promise<{ success: boolean; error?: string }> {
  if (!studentUserId) return { success: false, error: 'Student ID is required.' }
  try {
    const { data: studentRow } = await supabase.from('students').select('id').eq('user_id', studentUserId).maybeSingle()
    if (!studentRow) return { success: false, error: 'Student profile not found.' }

    let mentorId: string | undefined
    if (mentorUserId) {
      const mp = await getMentorProfile(mentorUserId)
      if (!mp) return { success: false, error: 'Mentor profile not found.' }
      mentorId = mp.id
    }

    let query = supabase
      .from('mentor_students')
      .update({ status: 'INACTIVE', unassigned_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('student_id', studentRow.id).eq('status', 'ACTIVE')
    if (mentorId) query = query.eq('mentor_id', mentorId)

    const { data, error } = await query.select('id')
    if (error) return { success: false, error: error.message }
    if (!data || data.length === 0) return { success: false, error: 'Assignment not found or unauthorized.' }

    await supabase.from('users').update({ mentorId: null, updatedAt: new Date().toISOString() }).eq('id', studentUserId)
    invalidateMentorCache(mentorUserId)
    return { success: true }
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export { syncUserProfile } from './studentService'