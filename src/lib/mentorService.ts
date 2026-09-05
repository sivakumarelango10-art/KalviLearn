import { supabase } from './supabase'

export interface MentorStudent {
  id: string
  name: string
  email: string
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

const BELT_DEFINITIONS = [
  {
    order: 1,
    name: 'Belt 1',
    title: 'Programming Foundations',
    color: '#3B82F6',
    totalProblems: 20,
    bottleneck: 'Basic Syntax & Loop Bounds',
  },
  {
    order: 2,
    name: 'Belt 2',
    title: 'Intermediate Data Structures & Logic',
    color: '#10B981',
    totalProblems: 30,
    bottleneck: 'Two-Pointer & Sliding Window Bounds',
  },
  {
    order: 3,
    name: 'Belt 3',
    title: 'Advanced Algorithmic Patterns',
    color: '#EF4444',
    totalProblems: 35,
    bottleneck: 'Dynamic Programming & State Transitions',
  },
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

/**
 * Normalizes language strings to our typed union
 */
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
    case 'java':
      return 'Java'
    case 'nodejs':
      return 'Node.js'
    case 'cpp':
      return 'C++'
    default:
      return 'Python'
  }
}

/**
 * Calculates current streak based on submission / progress timestamps
 */
function calculateStreak(dates: (string | Date)[]): number {
  if (!dates || dates.length === 0) return 0

  const dayStrings = new Set<string>()
  for (const d of dates) {
    const parsed = new Date(d)
    if (!isNaN(parsed.getTime())) {
      dayStrings.add(parsed.toISOString().slice(0, 10))
    }
  }

  const sortedDays = Array.from(dayStrings).sort().reverse()
  if (sortedDays.length === 0) return 0

  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  // If last activity wasn't today or yesterday, streak is broken, show past max or 1
  if (sortedDays[0] !== today && sortedDays[0] !== yesterday) {
    return 1
  }

  let streak = 0
  let checkDate = new Date(sortedDays[0])

  for (const day of sortedDays) {
    const expected = checkDate.toISOString().slice(0, 10)
    if (day === expected) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return Math.max(streak, 1)
}

/**
 * Fetches the real student roster from public.users with their live solved problems,
 * real completion percent out of 85, live belt, and activity telemetry.
 * OPTIMIZED: Eliminates N+1 queries by batching UserProgress and Submission queries.
 */
export async function fetchMentorRoster(mentorId?: string): Promise<MentorStudent[]> {
  try {
    // 1. Fetch registered students (optionally filtered by assigned mentor)
    let query = supabase
      .from('users')
      .select('id, email, name, role, status, mentorId, createdAt')
      .eq('role', 'STUDENT')
      .order('name', { ascending: true })

    if (mentorId) {
      query = query.eq('mentorId', mentorId)
    }

    const { data: dbUsers, error: uError } = await query

    if (uError) {
      console.warn('Error fetching students from database:', uError.message)
      return []
    }

    if (!dbUsers || dbUsers.length === 0) {
      return []
    }

    const studentIds = dbUsers.map((u) => u.id)

    // 2. Batch query: Fetch all solved UserProgress and recent Submissions in 2 parallel requests
    const [progressRes, submissionsRes] = await Promise.all([
      supabase
        .from('UserProgress')
        .select('id, userId, problemId, status, language, solvedAt, Problem(slug, beltId, Belt(order, name, color))')
        .in('userId', studentIds)
        .eq('status', 'SOLVED'),
      supabase
        .from('Submission')
        .select('id, userId, status, language, createdAt')
        .in('userId', studentIds)
        .order('createdAt', { ascending: false }),
    ])

    // Group progress and submissions by userId in memory
    const progressByUser = new Map<string, Array<{
      id: string
      problemId: string
      status: string
      language?: string
      solvedAt?: string
      Problem?: unknown
    }>>()

    for (const p of progressRes.data || []) {
      const list = progressByUser.get(p.userId) || []
      list.push(p)
      progressByUser.set(p.userId, list)
    }

    const submissionsByUser = new Map<string, Array<{
      id: string
      userId: string
      status: string
      language?: string
      createdAt: string
    }>>()

    for (const s of submissionsRes.data || []) {
      const list = submissionsByUser.get(s.userId) || []
      if (list.length < 20) {
        list.push(s)
      }
      submissionsByUser.set(s.userId, list)
    }

    const students: MentorStudent[] = []

    // 3. Process students in-memory with zero extra database queries
    for (const u of dbUsers) {
      const solvedList = progressByUser.get(u.id) || []
      const recentSubs = submissionsByUser.get(u.id) || []

      const solvedCount = solvedList.length
      const totalProblems = 85
      const progressPercent = Math.min(100, Math.round((solvedCount / totalProblems) * 100))

      // Determine highest belt reached based on solved problems
      let highestBeltOrder = 1
      const solvedSlugs: string[] = []
      for (const p of solvedList) {
        const prob = p.Problem as { slug?: string; Belt?: { order?: number } } | null
        if (prob?.slug) solvedSlugs.push(prob.slug)
        const bOrder = prob?.Belt?.order || 1
        if (bOrder > highestBeltOrder) {
          highestBeltOrder = bOrder
        }
      }

      let belt: 'Belt 1' | 'Belt 2' | 'Belt 3' = 'Belt 1'
      let beltColor = '#3B82F6'

      if (highestBeltOrder >= 3 || solvedCount >= 40) {
        belt = 'Belt 3'
        beltColor = '#EF4444'
      } else if (highestBeltOrder >= 2 || solvedCount >= 15) {
        belt = 'Belt 2'
        beltColor = '#10B981'
      }

      // Determine primary language and last active timestamp
      const latestSub = recentSubs[0]
      const latestProg = solvedList.slice().sort(
        (a, b) => new Date(b.solvedAt || 0).getTime() - new Date(a.solvedAt || 0).getTime()
      )[0]

      const subTime = latestSub?.createdAt ? new Date(latestSub.createdAt).getTime() : 0
      const progTime = latestProg?.solvedAt ? new Date(latestProg.solvedAt).getTime() : 0
      const mostRecentTimeMs = Math.max(subTime, progTime)
      const lastActiveRaw = mostRecentTimeMs > 0 ? new Date(mostRecentTimeMs).toISOString() : u.createdAt
      const lastActive = formatRelativeTime(lastActiveRaw)

      const preferredLang = latestSub?.language || latestProg?.language || 'python'
      const language = normalizeLanguage(preferredLang)

      // Calculate streak from all activity timestamps
      const activityTimestamps = [
        ...recentSubs.map((s) => s.createdAt),
        ...solvedList.map((p) => p.solvedAt),
      ].filter(Boolean) as string[]
      const streak = calculateStreak(activityTimestamps)

      // Attention calculation: flag if student has 4+ failed submissions in recent attempts
      const recentFailedCount = recentSubs.slice(0, 5).filter((s) => s.status === 'FAILED').length
      const needsAttention = recentFailedCount >= 4
      const attentionReason = needsAttention
        ? `${recentFailedCount} failed test executions in recent problems`
        : undefined

      students.push({
        id: u.id,
        name: u.name || u.email.split('@')[0].replace(/\./g, ' '),
        email: u.email,
        belt,
        beltColor,
        progressPercent,
        solvedCount,
        totalProblems,
        streak,
        language,
        lastActive,
        lastActiveRaw,
        status: needsAttention ? 'ATTENTION' : 'ACTIVE',
        needsAttention,
        attentionReason,
        joinedDate: u.createdAt
          ? new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
          : 'Jan 2026',
        solvedSlugs,
      })
    }

    return students
  } catch (err) {
    console.error('Error in fetchMentorRoster:', err)
    return []
  }
}

/**
 * Fetches real submissions from Supabase Submission table joined with Problem and Belt.
 * OPTIMIZED: Fetches user details only for students present in the returned submissions.
 */
export async function fetchMentorSubmissions(limit = 50): Promise<MentorSubmission[]> {
  try {
    // 1. Fetch recent submissions
    const { data: subs, error: sError } = await supabase
      .from('Submission')
      .select('id, userId, language, code, status, passedTests, totalTests, executionTimeMs, createdAt, Problem(id, slug, title, Belt(name, color))')
      .order('createdAt', { ascending: false })
      .limit(limit)

    if (sError) {
      console.warn('Error fetching submissions from database:', sError.message)
      return []
    }

    if (!subs || subs.length === 0) {
      return []
    }

    // 2. Targeted fetch of only users who made these submissions
    const distinctUserIds = Array.from(new Set(subs.map((s) => s.userId).filter(Boolean)))
    const userMap = new Map<string, { name: string; email: string }>()

    if (distinctUserIds.length > 0) {
      const { data: users } = await supabase
        .from('users')
        .select('id, name, email')
        .in('id', distinctUserIds)

      if (users) {
        for (const u of users) {
          userMap.set(u.id, {
            name: u.name || u.email.split('@')[0].replace(/\./g, ' '),
            email: u.email,
          })
        }
      }
    }

    const submissions: MentorSubmission[] = []

    for (const s of subs) {
      const prob = s.Problem as {
        slug?: string
        title?: string
        Belt?: { name?: string; color?: string }
      } | null

      const uInfo = userMap.get(s.userId) || {
        name: 'Student',
        email: 'student@kalvium.community',
      }

      const lang = normalizeLanguage(s.language)

      submissions.push({
        id: s.id,
        userId: s.userId,
        studentName: uInfo.name,
        studentEmail: uInfo.email,
        problemTitle: prob?.title || 'Practice Challenge',
        problemSlug: prob?.slug || 'challenge',
        beltName: prob?.Belt?.name || 'Belt 1',
        beltColor: prob?.Belt?.color || '#3B82F6',
        language: lang,
        languageLabel: getLanguageLabel(lang),
        status: (s.status as 'PASSED' | 'FAILED' | 'ERROR') || 'PASSED',
        passedTests: s.passedTests ?? 10,
        totalTests: s.totalTests || 10,
        executionTimeMs: s.executionTimeMs || 25,
        createdAt: formatRelativeTime(s.createdAt),
        createdAtRaw: s.createdAt,
        code: s.code || '',
      })
    }

    return submissions
  } catch (err) {
    console.error('Error in fetchMentorSubmissions:', err)
    return []
  }
}

/**
 * Computes live curriculum metrics per belt from actual student progress & submissions
 */
export async function fetchMentorCurriculumMetrics(): Promise<BeltMetric[]> {
  try {
    const [progressRes, submissionsRes] = await Promise.all([
      supabase
        .from('UserProgress')
        .select('id, userId, status, Problem(beltId, Belt(order, name, color))')
        .eq('status', 'SOLVED'),
      supabase
        .from('Submission')
        .select('id, status, Problem(beltId, Belt(order))'),
    ])

    const progressRows = progressRes.data || []
    const submissionRows = submissionsRes.data || []

    return BELT_DEFINITIONS.map((def) => {
      // 1. Calculate how many students completed or solved problems in this belt
      const solvedInBeltByUser = new Map<string, number>()
      for (const row of progressRows) {
        const p = row.Problem as { Belt?: { order?: number } } | null
        if (p?.Belt?.order === def.order) {
          const prev = solvedInBeltByUser.get(row.userId) || 0
          solvedInBeltByUser.set(row.userId, prev + 1)
        }
      }

      // Count students who solved problems in this belt
      const activeInBeltCount = solvedInBeltByUser.size

      // 2. Calculate actual pass rate for this belt from submissions
      const subsInBelt = submissionRows.filter((s) => {
        const p = s.Problem as { Belt?: { order?: number } } | null
        return p?.Belt?.order === def.order
      })

      let avgPassRate = 100
      if (subsInBelt.length > 0) {
        const passedCount = subsInBelt.filter((s) => s.status === 'PASSED').length
        avgPassRate = Math.round((passedCount / subsInBelt.length) * 1000) / 10
      }

      return {
        order: def.order,
        name: def.name,
        title: def.title,
        color: def.color,
        totalProblems: def.totalProblems,
        cohortCompleted: activeInBeltCount,
        avgPassRate,
        bottleneck: def.bottleneck,
      }
    })
  } catch (err) {
    console.error('Error in fetchMentorCurriculumMetrics:', err)
    return BELT_DEFINITIONS.map((b) => ({
      ...b,
      cohortCompleted: 0,
      avgPassRate: 0,
    }))
  }
}

/**
 * Sets up a Supabase Realtime channel to listen for live submission and progress updates.
 * Features a 300ms debounce to prevent duplicate network calls when rapid submissions occur.
 */
export function subscribeToMentorUpdates(onUpdate: () => void): () => void {
  try {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    const debouncedUpdate = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        onUpdate()
      }, 300)
    }

    const channelName = `mentor-live-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Submission' },
        () => {
          debouncedUpdate()
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'UserProgress' },
        () => {
          debouncedUpdate()
        }
      )
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

export interface AddStudentParams {
  name: string
  email: string
  mentorId?: string
}

export interface AddStudentResult {
  success: boolean
  student?: MentorStudent
  error?: string
}

/**
 * Assigns or reassigns a student to a mentor.
 * Enforces strict invariants:
 * - A student already mapped to another mentor can NEVER be reassigned.
 * - Only users with role = STUDENT can be assigned a mentor.
 * - Target mentor must be active with role = MENTOR.
 */
export async function assignStudentMentor(
  studentId: string,
  mentorId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Validate that target mentor exists, is active, and holds MENTOR role
    const { data: mentor, error: mErr } = await supabase
      .from('users')
      .select('id, role, status')
      .eq('id', mentorId)
      .maybeSingle()

    if (mErr || !mentor) {
      return { success: false, error: 'Target mentor not found.' }
    }

    if (mentor.role !== 'MENTOR' || mentor.status !== 'ACTIVE') {
      return { success: false, error: 'Target user is not an active mentor.' }
    }

    // 2. Fetch the target student to verify role and mapping state
    const { data: student, error: sFindErr } = await supabase
      .from('users')
      .select('id, role, mentorId')
      .eq('id', studentId)
      .maybeSingle()

    if (sFindErr || !student) {
      return { success: false, error: 'Student not found.' }
    }

    if (student.role !== 'STUDENT') {
      return { success: false, error: 'Only users with role STUDENT can be assigned a mentor.' }
    }

    if (student.mentorId) {
      if (student.mentorId === mentorId) {
        return { success: true } // Already assigned to this mentor
      }
      return { success: false, error: 'This student is already mapped to another mentor.' }
    }

    // 3. Atomically update the student's mentorId if still unmapped
    const { data: updated, error: sErr } = await supabase
      .from('users')
      .update({ mentorId, updatedAt: new Date().toISOString() })
      .eq('id', studentId)
      .eq('role', 'STUDENT')
      .is('mentorId', null)
      .select('id, mentorId')
      .maybeSingle()

    if (sErr) {
      return { success: false, error: sErr.message }
    }

    if (!updated) {
      return { success: false, error: 'This student is already mapped to another mentor.' }
    }

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg }
  }
}

/**
 * Registers or maps a student to the current mentor in PostgreSQL.
 *
 * Rules enforced:
 * 1. Safe, parameterized case-insensitive student lookup (escapes LIKE wildcards).
 * 2. Strict role verification: Only users with role = STUDENT can be assigned.
 * 3. Mentor verification: Assigning mentor must have role = MENTOR and status = ACTIVE.
 * 4. Already mapped to another mentor -> "This student is already mapped to another mentor."
 * 5. Already mapped to current mentor -> "This student is already mapped to you."
 * 6. Concurrency / Race-Condition Safe: Atomic conditional update prevents simultaneous double assignments.
 * 7. Enforced strictly at the database level via PostgreSQL trigger and foreign key.
 */
export async function addStudent(params: AddStudentParams): Promise<AddStudentResult> {
  const name = params.name.trim()
  const email = params.email.trim().toLowerCase()
  const currentMentorId = params.mentorId

  if (!name) {
    return { success: false, error: 'Student full name is required.' }
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    // 1. Validate that the current mentor is active with role MENTOR
    if (currentMentorId) {
      const { data: mentor, error: mErr } = await supabase
        .from('users')
        .select('id, role, status')
        .eq('id', currentMentorId)
        .maybeSingle()

      if (mErr || !mentor || mentor.role !== 'MENTOR' || mentor.status !== 'ACTIVE') {
        return { success: false, error: 'Target mentor account is invalid or inactive.' }
      }
    }

    // 2. Safe, parameterized case-insensitive lookup (escaping LIKE wildcards)
    const safeEmail = email.replace(/[%_\\]/g, '\\$&')
    const { data: existing, error: findError } = await supabase
      .from('users')
      .select('id, email, name, role, status, mentorId')
      .ilike('email', safeEmail)
      .maybeSingle()

    if (findError) {
      return { success: false, error: findError.message }
    }

    // 3. If user already exists in database
    if (existing) {
      // Only users with role = STUDENT can be assigned a mentor
      if (existing.role !== 'STUDENT') {
        return { success: false, error: 'Only users with role STUDENT can be assigned a mentor.' }
      }

      // Check whether student is already mapped
      if (existing.mentorId) {
        if (currentMentorId && existing.mentorId === currentMentorId) {
          return { success: false, error: 'This student is already mapped to you.' }
        }
        return { success: false, error: 'This student is already mapped to another mentor.' }
      }

      // Concurrency-safe atomic conditional update: only update if mentorId IS NULL
      const { data: updated, error: updateError } = await supabase
        .from('users')
        .update({
          mentorId: currentMentorId || null,
          name: name || existing.name,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .is('mentorId', null) // Atomic check prevents race conditions
        .select('id, email, name, role, status, mentorId, createdAt')
        .maybeSingle()

      if (updateError) {
        return { success: false, error: updateError.message }
      }

      // If another concurrent transaction mapped the student first, updated will be null
      if (!updated) {
        const { data: recheck } = await supabase
          .from('users')
          .select('mentorId')
          .eq('id', existing.id)
          .maybeSingle()

        if (recheck?.mentorId && currentMentorId && recheck.mentorId === currentMentorId) {
          return { success: false, error: 'This student is already mapped to you.' }
        }
        return { success: false, error: 'This student is already mapped to another mentor.' }
      }

      const mappedStudent: MentorStudent = {
        id: updated.id,
        name: updated.name || name,
        email: updated.email,
        belt: 'Belt 1',
        beltColor: '#3B82F6',
        progressPercent: 0,
        solvedCount: 0,
        totalProblems: 85,
        streak: 0,
        language: 'python',
        lastActive: 'Just mapped',
        status: 'ACTIVE',
        needsAttention: false,
        joinedDate: 'Just now',
      }

      return { success: true, student: mappedStudent }
    }

    // 4. Student does not exist in database: create and map to current mentor
    const { data, error } = await supabase
      .from('users')
      .insert({
        name,
        email,
        role: 'STUDENT',
        status: 'ACTIVE',
        mentorId: currentMentorId || null,
      })
      .select('id, email, name, role, status, mentorId, createdAt')
      .single()

    if (error) {
      // If unique constraint violation occurred concurrently
      if (error.code === '23505' || error.message.includes('unique') || error.message.includes('users_email_key')) {
        const { data: concurrentUser } = await supabase
          .from('users')
          .select('id, mentorId')
          .eq('email', email)
          .maybeSingle()

        if (concurrentUser?.mentorId && currentMentorId && concurrentUser.mentorId === currentMentorId) {
          return { success: false, error: 'This student is already mapped to you.' }
        }
        return { success: false, error: 'This student is already mapped to another mentor.' }
      }
      return { success: false, error: error.message }
    }

    const newStudent: MentorStudent = {
      id: data.id,
      name: data.name || name,
      email: data.email,
      belt: 'Belt 1',
      beltColor: '#3B82F6',
      progressPercent: 0,
      solvedCount: 0,
      totalProblems: 85,
      streak: 0,
      language: 'python',
      lastActive: 'Just registered',
      status: 'ACTIVE',
      needsAttention: false,
      joinedDate: 'Just now',
    }

    return { success: true, student: newStudent }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg }
  }
}

/**
 * Removes a student from a mentor's cohort or database.
 * IDOR Protected: Scoped strictly to users with role = STUDENT,
 * and if mentorId is supplied, strictly validates that the student belongs to the requesting mentor.
 */
export async function removeStudent(
  studentId: string,
  mentorId?: string
): Promise<{ success: boolean; error?: string }> {
  if (!studentId) {
    return { success: false, error: 'Student ID is required.' }
  }

  try {
    let query = supabase
      .from('users')
      .delete()
      .eq('id', studentId)
      .eq('role', 'STUDENT')

    // IDOR Protection: authenticated mentor can only remove their own mapped students
    if (mentorId) {
      query = query.eq('mentorId', mentorId)
    }

    const { data, error } = await query.select('id')
    if (error) {
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: 'Student not found or unauthorized to remove.' }
    }

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg }
  }
}

