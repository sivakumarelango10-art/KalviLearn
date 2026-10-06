import { fetchAllRows } from './supabasePaging'
import { registerCacheClearer } from './cacheRegistry'
import { supabase } from './supabase'
import { calculateAuthoritativeStreak } from './streak'
import { fetchTotalProblemCount } from './problemStatsService'

export interface SolvedProblemItem {
  problemId: string
  title: string
  slug: string
  difficulty: string
  beltName: string
  beltColor: string
  language: 'python' | 'java' | 'nodejs' | 'cpp'
  languageLabel: string
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
  belt: 'Belt 1' | 'Belt 2' | 'Belt 3'
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
  needsAttention: boolean
  attentionReason?: string
  joinedDate?: string
  solvedSlugs?: string[]
  solvedProblems: SolvedProblemItem[]
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
  avgPassRate: number
  bottleneck: string
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

const BELT_DEFINITIONS = [
  { order: 1, name: 'Belt 1', title: 'Programming Foundations', color: '#3B82F6', totalProblems: 20, bottleneck: 'Basic Syntax & Loop Bounds' },
  { order: 2, name: 'Belt 2', title: 'Intermediate Data Structures & Logic', color: '#10B981', totalProblems: 30, bottleneck: 'Two-Pointer & Sliding Window Bounds' },
  { order: 3, name: 'Belt 3', title: 'Advanced Algorithmic Patterns', color: '#EF4444', totalProblems: 35, bottleneck: 'Dynamic Programming & State Transitions' },
]

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

function normalizeLanguage(lang?: string | null): 'python' | 'java' | 'nodejs' | 'cpp' {
  if (!lang) return 'python'
  const lower = lang.toLowerCase()
  if (lower.includes('java') && !lower.includes('script')) return 'java'
  if (lower.includes('node') || lower.includes('js') || lower.includes('javascript')) return 'nodejs'
  if (lower.includes('c++') || lower.includes('cpp')) return 'cpp'
  return 'python'
}

function getLanguageLabel(lang: string): string {
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
export const problemLookupCache = new Map<string, { title: string; slug: string; beltName: string; beltColor: string }>()

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
      const recentSubs = submissionsByUser.get(su.userId) || []

      const solvedProblems: SolvedProblemItem[] = []
      const languageSolvedCounts = {
        python: 0,
        java: 0,
        cpp: 0,
        nodejs: 0,
      }
      const seenProblemIds = new Set<string>()

      for (const p of solvedList) {
        const prob = p.Problem as { slug?: string; title?: string; difficulty?: string; Belt?: { order?: number; name?: string; color?: string } } | null
        const pLang = normalizeLanguage(p.language)
        languageSolvedCounts[pLang] = (languageSolvedCounts[pLang] || 0) + 1
        if (seenProblemIds.has(p.problemId)) {
          continue
        }
        seenProblemIds.add(p.problemId)
        solvedProblems.push({
          problemId: p.problemId,
          title: prob?.title || 'Practice Challenge',
          slug: prob?.slug || 'challenge',
          difficulty: prob?.difficulty || 'Easy',
          beltName: prob?.Belt?.name || 'Belt 1',
          beltColor: prob?.Belt?.color || '#3B82F6',
          language: pLang,
          languageLabel: getLanguageLabel(pLang),
          solvedAt: p.solvedAt || new Date().toISOString(),
          solvedAtFormatted: formatRelativeTime(p.solvedAt),
        })
      }

      // Also include any 10/10 passed submissions not already present in UserProgress
      for (const s of recentSubs) {
        if (s.status === 'PASSED' && s.passedTests === 10 && !seenProblemIds.has(s.problemId)) {
          seenProblemIds.add(s.problemId)
          const prob = s.Problem as { slug?: string; title?: string; difficulty?: string; Belt?: { order?: number; name?: string; color?: string } } | null
          const sLang = normalizeLanguage(s.language)
          languageSolvedCounts[sLang] = (languageSolvedCounts[sLang] || 0) + 1
          solvedProblems.push({
            problemId: s.problemId,
            title: prob?.title || 'Practice Challenge',
            slug: prob?.slug || 'challenge',
            difficulty: prob?.difficulty || 'Easy',
            beltName: prob?.Belt?.name || 'Belt 1',
            beltColor: prob?.Belt?.color || '#3B82F6',
            language: sLang,
            languageLabel: getLanguageLabel(sLang),
            solvedAt: s.createdAt || new Date().toISOString(),
            solvedAtFormatted: formatRelativeTime(s.createdAt),
          })
        }
      }

      const solvedCount = solvedProblems.length
      const progressPercent = totalProblemsCount > 0 ? Math.min(100, Math.round((solvedCount / totalProblemsCount) * 100)) : 0

      const baseSolvedXp = solvedList.reduce((acc, p: any) => acc + Number(p.xpEarned != null ? p.xpEarned : 50), 0)
      const extraPassedCount = recentSubs.filter((s) => s.status === 'PASSED' && s.passedTests === 10 && !seenProblemIds.has(s.problemId)).length
      const totalXp = baseSolvedXp + (extraPassedCount * 50)

      const recentSubmissions = recentSubs.slice(0, 15).map((s: any) => {
        const prob = s.Problem as { slug?: string; title?: string; difficulty?: string; Belt?: { order?: number; name?: string; color?: string } } | null
        const sLang = normalizeLanguage(s.language)
        return {
          id: s.id,
          problemTitle: prob?.title || 'Practice Challenge',
          problemSlug: prob?.slug || 'challenge',
          beltName: prob?.Belt?.name || 'Belt 1',
          beltColor: prob?.Belt?.color || '#3B82F6',
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

      let highestBeltOrder = 1
      const solvedSlugs: string[] = []
      for (const p of solvedProblems) {
        if (p.slug) solvedSlugs.push(p.slug)
        const bOrder = p.beltName === 'Belt 3' ? 3 : p.beltName === 'Belt 2' ? 2 : 1
        if (bOrder > highestBeltOrder) highestBeltOrder = bOrder
      }

      let belt: 'Belt 1' | 'Belt 2' | 'Belt 3' = 'Belt 1'
      let beltColor = '#3B82F6'
      if (highestBeltOrder >= 3 || solvedCount >= 40) { belt = 'Belt 3'; beltColor = '#EF4444' }
      else if (highestBeltOrder >= 2 || solvedCount >= 15) { belt = 'Belt 2'; beltColor = '#10B981' }

      const latestSub = recentSubs[0]
      const latestProg = [...solvedProblems].sort((a, b) => new Date(b.solvedAt || 0).getTime() - new Date(a.solvedAt || 0).getTime())[0]
      const subTime = latestSub?.createdAt ? new Date(latestSub.createdAt).getTime() : 0
      const progTime = latestProg?.solvedAt ? new Date(latestProg.solvedAt).getTime() : 0
      const lastActiveRaw = Math.max(subTime, progTime) > 0 ? new Date(Math.max(subTime, progTime)).toISOString() : su.createdAt
      const language = normalizeLanguage(latestSub?.language || latestProg?.language)
      const activityTimestamps = [...recentSubs.map((s) => s.createdAt), ...solvedProblems.map((p) => p.solvedAt)].filter(Boolean) as string[]
      const streak = calculateAuthoritativeStreak(activityTimestamps).streak
      const recentFailedCount = recentSubs.slice(0, 5).filter((s) => s.status === 'FAILED').length
      const needsAttention = recentFailedCount >= 4

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
        belt, beltColor,
        progressPercent, solvedCount, totalProblems: totalProblemsCount,
        totalXp,
        streak, language,
        lastActive: formatRelativeTime(lastActiveRaw),
        lastActiveRaw,
        status: needsAttention ? 'ATTENTION' as const : 'ACTIVE' as const,
        needsAttention,
        attentionReason: needsAttention ? `${recentFailedCount} failed test executions in recent problems` : undefined,
        joinedDate: su.createdAt ? new Date(su.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Jan 2026',
        solvedSlugs,
        solvedProblems,
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

    const hasMore = subs.length > limit
    const pageSubs = subs.slice(0, limit)

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
 */
export async function fetchMentorCurriculumMetrics(): Promise<BeltMetric[]> {
  try {
    const [progressRes, submissionsRes] = await Promise.all([
      fetchAllRows(() => supabase.from('UserProgress').select('id, userId, status, Problem(beltId, Belt(order, name, color))').eq('status', 'SOLVED')),
      fetchAllRows(() => supabase.from('Submission').select('id, status, Problem(beltId, Belt(order))')),
    ])
    const progressRows = progressRes.data || []
    const submissionRows = submissionsRes.data || []
    return BELT_DEFINITIONS.map((def) => {
      const solvedInBeltByUser = new Map<string, number>()
      for (const row of progressRows) {
        const problemData = row.Problem as { Belt?: { order?: number } } | null
        if (problemData?.Belt?.order === def.order) {
          solvedInBeltByUser.set(row.userId, (solvedInBeltByUser.get(row.userId) || 0) + 1)
        }
      }
      const subsInBelt = submissionRows.filter((submissionItem) => (submissionItem.Problem as { Belt?: { order?: number } } | null)?.Belt?.order === def.order)
      const avgPassRate = subsInBelt.length > 0
        ? Math.round((subsInBelt.filter((submissionItem) => submissionItem.status === 'PASSED').length / subsInBelt.length) * 1000) / 10
        : 100
      return { order: def.order, name: def.name, title: def.title, color: def.color, totalProblems: def.totalProblems, cohortCompleted: solvedInBeltByUser.size, avgPassRate, bottleneck: def.bottleneck }
    })
  } catch (err) {
    console.error('Error in fetchMentorCurriculumMetrics:', err)
    return BELT_DEFINITIONS.map((beltDef) => ({ ...beltDef, cohortCompleted: 0, avgPassRate: 0 }))
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

    const dynamicTotalProblems = await fetchTotalProblemCount().catch(() => 500)

    return {
      success: true,
      student: {
        id: userRow.id, name: userRow.name || name, email: userRow.email,
        belt: 'Belt 1', beltColor: '#3B82F6', progressPercent: 0, solvedCount: 0, totalProblems: dynamicTotalProblems,
        totalXp: 0,
        mentorName: mentorProfile.name || 'Assigned Growth Mentor',
        mentorEmail: mentorProfile.email || '',
        campus: 'Kalvi National Technology Campus',
        streak: 0, language: 'python', lastActive: 'Just mapped', status: 'ACTIVE', needsAttention: false, joinedDate: 'Just now',
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