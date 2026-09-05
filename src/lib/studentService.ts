import { supabase } from './supabase'

export interface StudentProfile {
  id: string           // students.id
  userId: string       // users.id
  name: string         // students.name
  email: string        // students.email
  studentCode: string  // students.student_code
  status: string       // students.status
  createdAt: string
  updatedAt?: string
  user: {
    id: string         // users.id
    name: string       // users.name
    email: string      // users.email
  }
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
 * Directly reads name, email, and student_code from the students table.
 */
export async function getStudentProfile(studentIdOrUserId: string): Promise<StudentProfile | null> {
  if (!studentIdOrUserId) return null
  try {
    const { data: student, error: sErr } = await supabase
      .from('students')
      .select('id, user_id, name, email, student_code, status, created_at, updated_at')
      .or(`id.eq.${studentIdOrUserId},user_id.eq.${studentIdOrUserId}`)
      .maybeSingle()

    if (sErr || !student) return null

    const studentName = student.name || ''
    const studentEmail = student.email || ''

    return {
      id: student.id,
      userId: student.user_id,
      name: studentName,
      email: studentEmail,
      studentCode: student.student_code,
      status: student.status,
      createdAt: student.created_at,
      updatedAt: student.updated_at,
      user: {
        id: student.user_id,
        name: studentName,
        email: studentEmail,
      },
    }
  } catch (err) {
    console.error('Error in getStudentProfile:', err)
    return null
  }
}

/**
 * Fetches the assigned mentor information for a student (by students.id or users.id).
 * Follows students -> mentor_students -> mentors (reads mentors.name, mentors.email, mentors.mentor_code).
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

    // 3. Mentor record directly exposes name, email, mentor_code
    const { data: mentor } = await supabase
      .from('mentors')
      .select('id, user_id, name, email, mentor_code, status')
      .eq('id', assignment.mentor_id)
      .eq('status', 'ACTIVE')
      .maybeSingle()

    if (!mentor) return null

    const mentorName = mentor.name || ''
    const mentorEmail = mentor.email || ''

    return {
      mentorUserId: mentor.user_id,
      mentorName,
      mentorCode: mentor.mentor_code,
      mentorEmail,
      user: {
        id: mentor.user_id,
        name: mentorName,
        email: mentorEmail,
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

/**
 * Synchronizes user name and/or email from users table to students or mentors table.
 */
export async function syncUserProfile(
  userId: string,
  updates: { name?: string; email?: string }
): Promise<{ success: boolean; error?: string }> {
  if (!userId) return { success: false, error: 'User ID is required' }
  const cleanUpdates: Record<string, string> = {}
  if (updates.name !== undefined) cleanUpdates.name = updates.name.trim()
  if (updates.email !== undefined) cleanUpdates.email = updates.email.trim().toLowerCase()

  if (Object.keys(cleanUpdates).length === 0) return { success: true }

  try {
    const { data: user, error: uErr } = await supabase
      .from('users')
      .update(cleanUpdates)
      .eq('id', userId)
      .select('id, role, name, email')
      .single()

    if (uErr || !user) return { success: false, error: uErr?.message || 'Failed to update user' }

    const syncPayload = {
      name: user.name,
      email: user.email,
      updated_at: new Date().toISOString(),
    }

    if (user.role === 'STUDENT') {
      await supabase.from('students').update(syncPayload).eq('user_id', user.id)
    } else if (user.role === 'MENTOR') {
      await supabase.from('mentors').update(syncPayload).eq('user_id', user.id)
    }

    return { success: true }
  } catch (err) {
    console.error('Error in syncUserProfile:', err)
    return { success: false, error: 'Internal error syncing profile' }
  }
}