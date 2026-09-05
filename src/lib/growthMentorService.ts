import { supabase } from './supabase'

export interface GrowthMentorInfo {
  mentorName: string | null
}

/**
 * Fetches the assigned Growth Mentor name for a given student (users.id).
 *
 * Data flow:
 * studentUserId -> students (get students.id)
 *   -> mentor_students (ACTIVE, get mentor_id)
 *   -> mentors (get user_id)
 *   -> users (get name)
 */
export async function fetchStudentGrowthMentor(studentUserId: string): Promise<string | null> {
  if (!studentUserId) return null

  try {
    // 1. Get student profile record
    const { data: studentRow, error: sErr } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', studentUserId)
      .maybeSingle()

    if (sErr || !studentRow) {
      // Fallback: try legacy users.mentorId path
      const { data: userRow } = await supabase
        .from('users')
        .select('mentorId')
        .eq('id', studentUserId)
        .maybeSingle()
      if (!userRow?.mentorId) return null
      const { data: mentor } = await supabase
        .from('users')
        .select('name')
        .eq('id', userRow.mentorId)
        .eq('role', 'MENTOR')
        .eq('status', 'ACTIVE')
        .maybeSingle()
      return mentor?.name || null
    }

    // 2. Find the ACTIVE mentor_students assignment
    const { data: assignment, error: aErr } = await supabase
      .from('mentor_students')
      .select('mentor_id')
      .eq('student_id', studentRow.id)
      .eq('status', 'ACTIVE')
      .maybeSingle()

    if (aErr || !assignment) return null

    // 3. Get mentor record from mentors table
    const { data: mentorRow, error: mErr } = await supabase
      .from('mentors')
      .select('user_id, status, name')
      .eq('id', assignment.mentor_id)
      .eq('status', 'ACTIVE')
      .maybeSingle()

    if (mErr || !mentorRow) return null
    if (mentorRow.name) return mentorRow.name

    // 4. Fallback: Get mentor name from users table
    const { data: userRow, error: uErr } = await supabase
      .from('users')
      .select('name')
      .eq('id', mentorRow.user_id)
      .maybeSingle()

    if (uErr || !userRow) return null
    return userRow.name || null
  } catch (err) {
    console.error('Unexpected error in fetchStudentGrowthMentor:', err)
    return null
  }
}

/**
 * Sets up a real-time subscription on the mentor_students table.
 * Triggers onUpdate() if the student's assignment changes.
 */
export function subscribeToStudentMentorUpdates(studentUserId: string, onUpdate: () => void): () => void {
  if (!studentUserId) return () => {}

  try {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const debouncedUpdate = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(onUpdate, 300)
    }

    // Subscribe to mentor_students changes (any change to the table refreshes the student's view)
    const channelName = `student-mentor-ms-${studentUserId}-${Date.now()}`
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mentor_students' }, debouncedUpdate)
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