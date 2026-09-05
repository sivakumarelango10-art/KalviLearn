import { useState, useEffect, useCallback } from 'react'
import {
  fetchStudentGrowthMentor,
  subscribeToStudentMentorUpdates,
} from '@/lib/growthMentorService'

export interface UseGrowthMentorResult {
  mentorName: string | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Custom hook to retrieve and synchronize the Growth Mentor assigned to the currently authenticated student.
 */
export function useGrowthMentor(studentId?: string | null): UseGrowthMentorResult {
  const [mentorName, setMentorName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadMentor = useCallback(async () => {
    if (!studentId) {
      setMentorName(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const name = await fetchStudentGrowthMentor(studentId)
      setMentorName(name)
    } catch (err) {
      console.error('Failed to load Growth Mentor:', err)
      setError('Unable to retrieve Growth Mentor')
    } finally {
      setIsLoading(false)
    }
  }, [studentId])

  useEffect(() => {
    let isMounted = true

    const executeLoad = async () => {
      if (!studentId) {
        if (isMounted) {
          setMentorName(null)
          setIsLoading(false)
        }
        return
      }

      try {
        if (isMounted) {
          setIsLoading(true)
          setError(null)
        }
        const name = await fetchStudentGrowthMentor(studentId)
        if (isMounted) {
          setMentorName(name)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load Growth Mentor:', err)
          setError('Unable to retrieve Growth Mentor')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    executeLoad()

    if (!studentId) return

    const unsubscribe = subscribeToStudentMentorUpdates(studentId, () => {
      if (isMounted) {
        executeLoad()
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [studentId])

  return {
    mentorName,
    isLoading,
    error,
    refetch: loadMentor,
  }
}
