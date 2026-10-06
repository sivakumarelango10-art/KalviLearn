import { useState, useEffect, useCallback, useRef } from 'react'
import {
  fetchAuthoritativeProblemStats,
  ProblemStats,
  clearProblemStatsCache,
} from '@/lib/problemStatsService'
import { subscribeProgress } from '@/lib/progress'

export interface UseProblemStatsResult {
  status: 'loading' | 'success' | 'error'
  stats: ProblemStats | null
  error: string | null
  refetch: () => Promise<void>
}

/**
 * React hook to retrieve and reactively observe real-time, database-backed
 * problem solved statistics for the currently authenticated user.
 * 
 * Guarantees:
 * - Zero fake/fallback numbers: explicit loading ('loading') and explicit error ('error') states.
 * - Immediate state clearing on account switch or logout.
 * - Real-time updates: Automatically re-fetches authoritative DB stats when progress is updated
 *   (via local solve, cross-tab events, or AuthContext realtime cloud sync).
 * - Safe concurrency: in-flight queries for a previous user ID are discarded on switch/unmount.
 */
export function useProblemStats(userId?: string | null): UseProblemStatsResult {
  const [state, setState] = useState<{
    status: 'loading' | 'success' | 'error'
    stats: ProblemStats | null
    error: string | null
  }>({
    status: 'loading',
    stats: null,
    error: null,
  })

  // Track active userId to prevent race conditions during async fetches
  const currentUserIdRef = useRef<string | null>(userId ?? null)

  const loadStats = useCallback(async (targetUserId: string, forceRefresh = false) => {
    try {
      const stats = await fetchAuthoritativeProblemStats(targetUserId, { forceRefresh })
      // Guard against stale response if user switched accounts while request was in-flight
      if (currentUserIdRef.current === targetUserId) {
        setState({
          status: 'success',
          stats,
          error: null,
        })
      }
    } catch (err) {
      if (currentUserIdRef.current === targetUserId) {
        setState({
          status: 'error',
          stats: null,
          error: err instanceof Error ? err.message : 'Unable to load progress',
        })
      }
    }
  }, [])

  const refetch = useCallback(async () => {
    const currentId = currentUserIdRef.current
    if (!currentId) return
    setState((prev) => ({ ...prev, status: 'loading' }))
    await loadStats(currentId, true)
  }, [loadStats])

  useEffect(() => {
    currentUserIdRef.current = userId ?? null

    // Immediate account isolation: clear state so prior user's numbers are never displayed
    setState({
      status: 'loading',
      stats: null,
      error: null,
    })

    if (!userId) {
      // User is logged out or session not yet initialized
      clearProblemStatsCache()
      return
    }

    let isMounted = true

    // Initial database-backed fetch
    loadStats(userId, true)

    // Reactive subscription: when AuthContext's Supabase realtime channel receives an update,
    // or when a local problem submission succeeds, subscribeProgress notifies us to re-fetch
    const unsubscribe = subscribeProgress(() => {
      if (isMounted && currentUserIdRef.current === userId) {
        loadStats(userId, true)
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [userId, loadStats])

  return {
    status: state.status,
    stats: state.stats,
    error: state.error,
    refetch,
  }
}
