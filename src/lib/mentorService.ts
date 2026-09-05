import { supabase } from './supabase'

export interface MentorStudent {
  id: string
  name: string
  email: string
  studentCode?: string
  belt: 'Belt 1' | 'Belt 2' | 'Belt 3'
  beltColor: string
  progressPercent: number
  solvedCount: number
  totalProblems: number
  streak: number
  language: 'python' | 'java' | 'nodejs' | 'cpp'
  lastActive: string
  lastActiveRaw?: string
  status: 'ACTIVE' | 'ATTENTION'
  needsAttention: boolean
  attentionReason?: string
  joinedDate?: string
  solvedSlugs?: string[]
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
  mentorCode: string
  maxStudents: number
  status: string
  name?: string
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

function calculateStreak(dates: (string | Date)[]): number {
  if (!dates || dates.length === 0) return 0
  const dayStrings = new Set<string>()
  for (const d of dates) {
    const parsed = new Date(d)
    if (!isNaN(parsed.getTime())) dayStrings.add(parsed.toISOString().slice(0, 10))
  }
  const sortedDays = Array.from(dayStrings).sort().reverse()
  if (sortedDays.length === 0) return 0
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (sortedDays[0] !== today && sortedDays[0] !== yesterday) return 1
  let streak = 0
  let checkDate = new Date(sortedDays[0])
  for (const day of sortedDays) {
    if (day === checkDate.toISOString().slice(0, 10)) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else { break }
  }
  return Math.max(streak, 1)
}

// Core Helpers

/**
 * Resolves the mentor profile record (mentors table) from their users.id.
 */
export async function getMentorProfile(mentorUserId: string): Promise<MentorProfile | null> {
  const { data, error } = await supabase
    .from('mentors')
    .select('id, mentor_code, max_students, status, name')
    .eq('user_id', mentorUserId)
    .eq('status', 'ACTIVE')
    .maybeSingle()
  if (error || !data) return null
  return {
    id: data.id,
    mentorCode: data.mentor_code,
    maxStudents: data.max_students,
    status: data.status,
    name: data.name || undefined,
  }
}

interface StudentUserRow {
  userId: string
  studentId: string
  studentCode: string
  name: string
  email: string
  createdAt: string
}

/**
 * Returns all student user records actively assigned to the given mentors.id.
 */
async function getMentorStudentUsers(mentorId: string): Promise<StudentUserRow[]> {
  const { data: assignments, error: aErr } = await supabase
    .from('mentor_students')
    .select('student_id, students(id, user_id, student_code, created_at, name)')
    .eq('mentor_id', mentorId)
    .eq('status', 'ACTIVE')

  if (aErr || !assignments || assignments.length === 0) return []

  const studentRows = assignments
    .map((a) => (a.students as unknown) as { id: string; user_id: string; student_code: string; created_at: string; name?: string } | null)
    .filter(Boolean) as Array<{ id: string; user_id: string; student_code: string; created_at: string; name?: string }>

  const userIds = studentRows.map((s) => s.user_id)
  if (userIds.length === 0) return []

  const { data: users, error: uErr } = await supabase
    .from('users').select('id, name, email, createdAt').in('id', userIds)

  if (uErr || !users) return []
  const userMap = new Map(users.map((u) => [u.id, u]))

  return studentRows
    .map((s) => {
      const u = userMap.get(s.user_id)
      return {
        userId: s.user_id,
        studentId: s.id,
        studentCode: s.student_code,
        name: u?.name || s.name || 'Student',
        email: u?.email || '',
        createdAt: u?.createdAt || s.created_at,
      }
    })
    .filter((s) => s.email)
}

// Public API

/**
 * Fetches the real student roster via mentor_students -> students -> users.
 * OPTIMIZED: Batch queries, no N+1 calls.
 */
export async function fetchMentorRoster(mentorUserId?: string): Promise<MentorStudent[]> {
  try {
    let studentUsers: StudentUserRow[] = []

    if (mentorUserId) {
      const mentorProfile = await getMentorProfile(mentorUserId)
      if (!mentorProfile) return []
      studentUsers = await getMentorStudentUsers(mentorProfile.id)
    } else {
      const { data: allStudents } = await supabase
        .from('students').select('id, user_id, student_code, created_at').eq('status', 'ACTIVE')
      if (!allStudents || allStudents.length === 0) return []
      const userIds = allStudents.map((s) => s.user_id)
      const { data: users } = await supabase.from('users').select('id, name, email, createdAt').in('id', userIds)
      const userMap = new Map((users || []).map((u) => [u.id, u]))
      studentUsers = allStudents
        .map((s) => {
          const u = userMap.get(s.user_id)
          return { userId: s.user_id, studentId: s.id, studentCode: s.student_code, name: u?.name || 'Student', email: u?.email || '', createdAt: u?.createdAt || s.created_at }
        })
        .filter((s) => s.email)
    }

    if (studentUsers.length === 0) return []
    const studentUserIds = studentUsers.map((s) => s.userId)

    const [progressRes, submissionsRes] = await Promise.all([
      supabase.from('UserProgress').select('id, userId, problemId, status, language, solvedAt, Problem(slug, beltId, Belt(order, name, color))').in('userId', studentUserIds).eq('status', 'SOLVED'),
      supabase.from('Submission').select('id, userId, status, language, createdAt').in('userId', studentUserIds).order('createdAt', { ascending: false }),
    ])

    const progressByUser = new Map<string, Array<{ problemId: string; status: string; language?: string; solvedAt?: string; Problem?: unknown }>>()
    for (const p of progressRes.data || []) {
      const list = progressByUser.get(p.userId) || []
      list.push(p)
      progressByUser.set(p.userId, list)
    }
    const submissionsByUser = new Map<string, Array<{ status: string; language?: string; createdAt: string }>>()
    for (const s of submissionsRes.data || []) {
      const list = submissionsByUser.get(s.userId) || []
      if (list.length < 20) list.push(s)
      submissionsByUser.set(s.userId, list)
    }

    const students: MentorStudent[] = studentUsers.map((su) => {
      const solvedList = progressByUser.get(su.userId) || []
      const recentSubs = submissionsByUser.get(su.userId) || []
      const solvedCount = solvedList.length
      const progressPercent = Math.min(100, Math.round((solvedCount / 85) * 100))

      let highestBeltOrder = 1
      const solvedSlugs: string[] = []
      for (const p of solvedList) {
        const prob = p.Problem as { slug?: string; Belt?: { order?: number } } | null
        if (prob?.slug) solvedSlugs.push(prob.slug)
        const bOrder = prob?.Belt?.order || 1
        if (bOrder > highestBeltOrder) highestBeltOrder = bOrder
      }

      let belt: 'Belt 1' | 'Belt 2' | 'Belt 3' = 'Belt 1'
      let beltColor = '#3B82F6'
      if (highestBeltOrder >= 3 || solvedCount >= 40) { belt = 'Belt 3'; beltColor = '#EF4444' }
      else if (highestBeltOrder >= 2 || solvedCount >= 15) { belt = 'Belt 2'; beltColor = '#10B981' }

      const latestSub = recentSubs[0]
      const latestProg = [...solvedList].sort((a, b) => new Date(b.solvedAt || 0).getTime() - new Date(a.solvedAt || 0).getTime())[0]
      const subTime = latestSub?.createdAt ? new Date(latestSub.createdAt).getTime() : 0
      const progTime = latestProg?.solvedAt ? new Date(latestProg.solvedAt).getTime() : 0
      const lastActiveRaw = Math.max(subTime, progTime) > 0 ? new Date(Math.max(subTime, progTime)).toISOString() : su.createdAt
      const language = normalizeLanguage(latestSub?.language || latestProg?.language)
      const activityTimestamps = [...recentSubs.map((s) => s.createdAt), ...solvedList.map((p) => p.solvedAt)].filter(Boolean) as string[]
      const streak = calculateStreak(activityTimestamps)
      const recentFailedCount = recentSubs.slice(0, 5).filter((s) => s.status === 'FAILED').length
      const needsAttention = recentFailedCount >= 4

      return {
        id: su.userId,
        name: su.name || su.email.split('@')[0].replace(/\./g, ' '),
        email: su.email,
        studentCode: su.studentCode,
        belt, beltColor,
        progressPercent, solvedCount, totalProblems: 85,
        streak, language,
        lastActive: formatRelativeTime(lastActiveRaw),
        lastActiveRaw,
        status: needsAttention ? 'ATTENTION' as const : 'ACTIVE' as const,
        needsAttention,
        attentionReason: needsAttention ? `${recentFailedCount} failed test executions in recent problems` : undefined,
        joinedDate: su.createdAt ? new Date(su.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Jan 2026',
        solvedSlugs,
      }
    })

    return students.sort((a, b) => a.name.localeCompare(b.name))
  } catch (err) {
    console.error('Error in fetchMentorRoster:', err)
    return []
  }
}

/**
 * Fetches recent submissions, optionally scoped to a specific mentor's students.
 */
export async function fetchMentorSubmissions(mentorUserId?: string, limit = 50): Promise<MentorSubmission[]> {
  try {
    let studentUserIds: string[] | null = null
    if (mentorUserId) {
      const mp = await getMentorProfile(mentorUserId)
      if (mp) {
        const sus = await getMentorStudentUsers(mp.id)
        studentUserIds = sus.map((s) => s.userId)
        if (studentUserIds.length === 0) return []
      }
    }

    let query = supabase
      .from('Submission')
      .select('id, userId, language, code, status, passedTests, totalTests, executionTimeMs, createdAt, Problem(id, slug, title, Belt(name, color))')
      .order('createdAt', { ascending: false })
      .limit(limit)
    if (studentUserIds) query = query.in('userId', studentUserIds)

    const { data: subs, error: sError } = await query
    if (sError || !subs || subs.length === 0) return []

    const distinctUserIds = Array.from(new Set(subs.map((s) => s.userId).filter(Boolean)))
    const userMap = new Map<string, { name: string; email: string }>()
    if (distinctUserIds.length > 0) {
      const { data: users } = await supabase.from('users').select('id, name, email').in('id', distinctUserIds)
      for (const u of users || []) {
        userMap.set(u.id, { name: u.name || u.email.split('@')[0].replace(/\./g, ' '), email: u.email })
      }
    }

    return subs.map((s) => {
      const prob = s.Problem as { slug?: string; title?: string; Belt?: { name?: string; color?: string } } | null
      const uInfo = userMap.get(s.userId) || { name: 'Student', email: 'student@kalvium.community' }
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
    })
  } catch (err) {
    console.error('Error in fetchMentorSubmissions:', err)
    return []
  }
}

/**
 * Computes live curriculum metrics per belt from actual student progress and submissions.
 */
export async function fetchMentorCurriculumMetrics(): Promise<BeltMetric[]> {
  try {
    const [progressRes, submissionsRes] = await Promise.all([
      supabase.from('UserProgress').select('id, userId, status, Problem(beltId, Belt(order, name, color))').eq('status', 'SOLVED'),
      supabase.from('Submission').select('id, status, Problem(beltId, Belt(order))'),
    ])
    const progressRows = progressRes.data || []
    const submissionRows = submissionsRes.data || []
    return BELT_DEFINITIONS.map((def) => {
      const solvedInBeltByUser = new Map<string, number>()
      for (const row of progressRows) {
        const p = row.Problem as { Belt?: { order?: number } } | null
        if (p?.Belt?.order === def.order) {
          solvedInBeltByUser.set(row.userId, (solvedInBeltByUser.get(row.userId) || 0) + 1)
        }
      }
      const subsInBelt = submissionRows.filter((s) => (s.Problem as { Belt?: { order?: number } } | null)?.Belt?.order === def.order)
      const avgPassRate = subsInBelt.length > 0
        ? Math.round((subsInBelt.filter((s) => s.status === 'PASSED').length / subsInBelt.length) * 1000) / 10
        : 100
      return { order: def.order, name: def.name, title: def.title, color: def.color, totalProblems: def.totalProblems, cohortCompleted: solvedInBeltByUser.size, avgPassRate, bottleneck: def.bottleneck }
    })
  } catch (err) {
    console.error('Error in fetchMentorCurriculumMetrics:', err)
    return BELT_DEFINITIONS.map((b) => ({ ...b, cohortCompleted: 0, avgPassRate: 0 }))
  }
}

/**
 * Real-time subscription for Submission, UserProgress, and mentor_students table changes.
 */
export function subscribeToMentorUpdates(onUpdate: () => void): () => void {
  try {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const debouncedUpdate = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(onUpdate, 300)
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
    } else {
      const { data: newStudent, error: createErr } = await supabase
        .from('students')
        .insert({
          user_id: userRow.id,
          student_code: `STU-${Date.now()}`,
          status: 'ACTIVE',
          name: userRow.name || name,
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

    return {
      success: true,
      student: {
        id: userRow.id, name: userRow.name || name, email: userRow.email,
        belt: 'Belt 1', beltColor: '#3B82F6', progressPercent: 0, solvedCount: 0, totalProblems: 85,
        streak: 0, language: 'python', lastActive: 'Just mapped', status: 'ACTIVE', needsAttention: false, joinedDate: 'Just now',
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
    return { success: true }
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}