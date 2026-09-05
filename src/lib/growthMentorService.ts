import { supabase } from './supabase'

/**
 * Result of fetching a student's assigned Growth Mentor
 */
export interface GrowthMentorInfo {
  mentorName: string | null
}

/**
 * Fetches the assigned Growth Mentor for a given student directly from PostgreSQL.
 *
 * Data flow:
 * studentId -> users (retrieve mentorId) -> users (retrieve mentor's name) -> return name
 *
 * Security:
 * Only the mentor for the requested studentId is queried; other students' assignments
 * are never fetched or exposed.
 */
export async function fetchStudentGrowthMentor(studentId: string): Promise<string | null> {
  if (!studentId) return null

  try {
    // 1. Fetch student's own record to find mentorId
    const { data: student, error: studentError } = await supabase
      .from('users')
      .select('id, mentorId')
      .eq('id', studentId)
      .maybeSingle()

    if (studentError) {
      console.warn('Error fetching student mentorId:', studentError.message)
      return null
    }

    if (!student || !student.mentorId) {
      return null
    }

    // 2. Fetch the assigned mentor's name
    const { data: mentor, error: mentorError } = await supabase
      .from('users')
      .select('id, name')
      .eq('id', student.mentorId)
      .maybeSingle()

    if (mentorError) {
      console.warn('Error fetching mentor name:', mentorError.message)
      return null
    }

    return mentor?.name || null
  } catch (err) {
    console.error('Unexpected error in fetchStudentGrowthMentor:', err)
    return null
  }
}

/**
 * Sets up a real-time subscription on the users table filtered to the student's own record.
 * If an admin or mentor reassigns the student's mentor, this triggers onUpdate() automatically.
 */
export function subscribeToStudentMentorUpdates(studentId: string, onUpdate: () => void): () => void {
  if (!studentId) return () => {}

  try {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    const debouncedUpdate = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        onUpdate()
      }, 300)
    }

    const channelName = `student-mentor-${studentId}-${Date.now()}`
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${studentId}`,
        },
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
    console.warn('Realtime subscription error for student mentor:', err)
    return () => {}
  }
}
