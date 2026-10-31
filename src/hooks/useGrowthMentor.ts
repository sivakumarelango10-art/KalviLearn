import { useState, useEffect, useCallback } from 'react'
import {
  fetchStudentGrowthMentorDetails,
  subscribeToStudentMentorUpdates,
} from '@/lib/growthMentorService'

export interface UseGrowthMentorResult {
  mentorName: string | null
  mentorEmail: string | null
  mentorCode: string | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Custom hook to retrieve and synchronize the Growth Mentor assigned to the currently authenticated student.
 */
export function useGrowthMentor(studentId?: string | null): UseGrowthMentorResult {
  const [mentorName, setMentorName] = useState<string | null>(null)
  const [mentorEmail, setMentorEmail] = useState<string | null>(null)
  const [mentorCode, setMentorCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadMentor = useCallback(async () => {
    if (!studentId) {
      setMentorName(null)
      setMentorEmail(null)
      setMentorCode(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const details = await fetchStudentGrowthMentorDetails(studentId)
      setMentorName(details?.mentorName || null)
      setMentorEmail(details?.mentorEmail || null)
      setMentorCode(details?.mentorCode || null)
    } catch (err) {
      console.error('Failed to load Growth Mentor:', err)
      setError('Unable to retrieve Growth Mentor')
    } finally {
      setIsLoading(false)
    }
  }, [studentId])

  useEffect(() => {
    loadMentor()

    if (!studentId) return

    const unsubscribe = subscribeToStudentMentorUpdates(studentId, () => {
      loadMentor()
    })

    return () => {
      unsubscribe()
    }
  }, [studentId, loadMentor])

  return {
    mentorName,
    mentorEmail,
    mentorCode,
    isLoading,
    error,
    refetch: loadMentor,
  }
}
