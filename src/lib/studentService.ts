import { supabase } from './supabase'

export interface StudentProfile {
  id: string           // students.id
  userId: string       // users.id
  studentCode: string
  status: string
  name: string
  email: string
  createdAt: string
}

export interface StudentMentorInfo {
  mentorUserId: string
  mentorName: string
  mentorCode: string
  mentorEmail: string
}

export interface StudentProgressSummary {
  solvedCount: number
  totalProblems: number
  progressPercent: number
}

/**
 * Fetches the student profile record for a given users.id.
 */
export async function getStudentProfile(userUserId: string): Promise<StudentProfile | null> {
  if (!userUserId) return null
  try {
    const { data: student, error: sErr } = await supabase
      .from('students')
      .select('id, user_id, student_code, status, created_at')
      .eq('user_id', userUserId)
      .maybeSingle()

    if (sErr || !student) return null

    const { data: user } = await supabase
      .from('users')
      .select('name, email, createdAt')
      .eq('id', userUserId)
      .maybeSingle()

    return {
      id: student.id,
      userId: student.user_id,
      studentCode: student.student_code,
      status: student.status,
      name: user?.name || '',
      email: user?.email || '',
      createdAt: user?.createdAt || student.created_at,
    }
  } catch (err) {
    console.error('Error in getStudentProfile:', err)
    return null
  }
}

/**
 * Fetches the assigned mentor information for a student (by students.id).
 */
export async function getStudentMentorInfo(studentProfileId: string): Promise<StudentMentorInfo | null> {
  if (!studentProfileId) return null
  try {
    const { data: assignment } = await supabase
      .from('mentor_students')
      .select('mentor_id')
      .eq('student_id', studentProfileId)
      .eq('status', 'ACTIVE')
      .maybeSingle()

    if (!assignment) return null

    const { data: mentor } = await supabase
      .from('mentors')
      .select('id, user_id, mentor_code, status')
      .eq('id', assignment.mentor_id)
      .eq('status', 'ACTIVE')
      .maybeSingle()

    if (!mentor) return null

    const { data: mentorUser } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', mentor.user_id)
      .maybeSingle()

    if (!mentorUser) return null

    return {
      mentorUserId: mentor.user_id,
      mentorName: mentorUser.name || '',
      mentorCode: mentor.mentor_code,
      mentorEmail: mentorUser.email || '',
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