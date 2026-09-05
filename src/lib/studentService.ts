import { supabase } from './supabase'

export interface StudentProfile {
  id: string           // students.id
  studentCode: string  // students.student_code
  status: string       // students.status
  user: {
    id: string         // users.id
    name: string       // users.name
    email: string      // users.email
  }
  // Backwards-compatible convenience properties
  userId?: string
  name?: string
  email?: string
  createdAt?: string
}

export interface StudentMentorInfo {
  mentorUserId: string
  mentorName: string
  mentorCode: string
  mentorEmail: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export interface StudentProgressSummary {
  solvedCount: number
  totalProblems: number
  progressPercent: number
}

/**
 * Fetches the student profile record for a given studentId (or users.id).
 * Directly resolves user: { id, name, email } from the users table (single source of truth).
 */
export async function getStudentProfile(studentIdOrUserId: string): Promise<StudentProfile | null> {
  if (!studentIdOrUserId) return null
  try {
    const { data: student, error: sErr } = await supabase
      .from('students')
      .select('id, user_id, student_code, status, created_at')
      .or(`id.eq.${studentIdOrUserId},user_id.eq.${studentIdOrUserId}`)
      .maybeSingle()

    if (sErr || !student) return null

    const { data: user, error: uErr } = await supabase
      .from('users')
      .select('id, name, email, createdAt')
      .eq('id', student.user_id)
      .maybeSingle()

    if (uErr || !user) return null

    return {
      id: student.id,
      studentCode: student.student_code,
      status: student.status,
      user: {
        id: user.id,
        name: user.name || '',
        email: user.email || '',
      },
      // Convenience properties
      userId: student.user_id,
      name: user.name || '',
      email: user.email || '',
      createdAt: user.createdAt || student.created_at,
    }
  } catch (err) {
    console.error('Error in getStudentProfile:', err)
    return null
  }
}

/**
 * Fetches the assigned mentor information for a student (by students.id or users.id).
 * Follows students -> mentor_students -> mentors -> users.
 */
export async function getStudentMentorInfo(studentProfileIdOrUserId: string): Promise<StudentMentorInfo | null> {
  if (!studentProfileIdOrUserId) return null
  try {
    // 1. Resolve student record
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .or(`id.eq.${studentProfileIdOrUserId},user_id.eq.${studentProfileIdOrUserId}`)
      .maybeSingle()

    if (!student) return null

    // 2. Active assignment
    const { data: assignment } = await supabase
      .from('mentor_students')
      .select('mentor_id')
      .eq('student_id', student.id)
      .eq('status', 'ACTIVE')
      .maybeSingle()

    if (!assignment) return null

    // 3. Mentor record
    const { data: mentor } = await supabase
      .from('mentors')
      .select('id, user_id, mentor_code, status')
      .eq('id', assignment.mentor_id)
      .eq('status', 'ACTIVE')
      .maybeSingle()

    if (!mentor) return null

    // 4. Source of truth for mentor's name and email: users table
    const { data: mentorUser } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', mentor.user_id)
      .maybeSingle()

    if (!mentorUser) return null

    return {
      mentorUserId: mentor.user_id,
      mentorName: mentorUser.name || '',
      mentorCode: mentor.mentor_code,
      mentorEmail: mentorUser.email || '',
      user: {
        id: mentorUser.id,
        name: mentorUser.name || '',
        email: mentorUser.email || '',
      },
    }
  } catch (err) {
    console.error('Error in getStudentMentorInfo:', err)
    return null
  }
}

/**
 * Returns a summary of a student's progress.
 * userId is the users.id (same as UserProgress.userId).
 */
export async function getStudentProgressSummary(userId: string): Promise<StudentProgressSummary> {
  const empty = { solvedCount: 0, totalProblems: 85, progressPercent: 0 }
  if (!userId) return empty
  try {
    const { count } = await supabase
      .from('UserProgress')
      .select('id', { count: 'exact', head: true })
      .eq('userId', userId)
      .eq('status', 'SOLVED')

    const solvedCount = count ?? 0
    return {
      solvedCount,
      totalProblems: 85,
      progressPercent: Math.min(100, Math.round((solvedCount / 85) * 100)),
    }
  } catch (err) {
    console.error('Error in getStudentProgressSummary:', err)
    return empty
  }
}