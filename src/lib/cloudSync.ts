import { supabase } from './supabase'
import {
  type UserState,
  type SubmissionRecord,
  type UserProgressRecord,
  normalizeProgressLanguage,
} from './progress'
import { calculateAuthoritativeStreak } from './streak'

/**
 * Fetches all student progress, solved problem slugs, best code, and submissions from Supabase.
 * Enables seamless cross-device persistence when opening Kalvi Learn on any computer, phone, or browser.
 */
export async function fetchUserProgressFromCloud(userId: string): Promise<UserState | null> {
  if (!userId) return null

  try {
    // 1. Fetch user progress joined with Problem slug
    const { data: progressRows, error: pError } = await supabase
      .from('UserProgress')
      .select('id, userId, problemId, status, language, bestCode, solvedAt, attempts, xpEarned, Problem(slug, title)')
      .eq('userId', userId)

    if (pError) {
      console.warn('Failed to fetch UserProgress from cloud:', pError.message)
      return null
    }

    // 2. Fetch submissions for submission history & multi-language recovery
    const { data: submissionRows, error: sError } = await supabase
      .from('Submission')
      .select('id, userId, problemId, language, code, status, passedTests, totalTests, executionTimeMs, createdAt, Problem(slug, title)')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(100)

    if (sError) {
      console.warn('Failed to fetch Submissions from cloud:', sError.message)
    }

    // Reconstruct UserState
    const solvedSlugs: string[] = []
    let totalXp = 0
    const progressMap: Record<string, UserProgressRecord> = {}

    if (Array.isArray(progressRows)) {
      for (const row of progressRows) {
        const pObj = row.Problem as { slug?: string; title?: string } | null
        const slug = pObj?.slug
        if (!slug) continue

        const lang = normalizeProgressLanguage(row.language)
        const langKey = `${lang}:${slug}`
        const isSolved = row.status === 'SOLVED'

        if (isSolved && !solvedSlugs.includes(slug)) {
          solvedSlugs.push(slug)
          totalXp += Number(row.xpEarned || 0)
        }

        const record: UserProgressRecord = {
          problemId: slug,
          problemSlug: slug,
          status: row.status as 'SOLVED' | 'ATTEMPTED',
          language: lang,
          bestCode: row.bestCode || '',
          solvedAt: row.solvedAt || undefined,
          attempts: row.attempts || 1,
        }

        progressMap[langKey] = record

        // Also keep un-prefixed key
        if (!progressMap[slug] || isSolved) {
          progressMap[slug] = record
        }
      }
    }

    const submissions: SubmissionRecord[] = []
    if (Array.isArray(submissionRows)) {
      for (const row of submissionRows) {
        const pObj = row.Problem as { slug?: string; title?: string } | null
        const slug = pObj?.slug || row.problemId
        const title = pObj?.title || slug
        const lang = normalizeProgressLanguage(row.language)

        const sub: SubmissionRecord = {
          id: row.id,
          problemSlug: slug,
          problemTitle: title,
          language: lang,
          code: row.code || '',
          status: row.status as 'PASSED' | 'FAILED' | 'ERROR',
          passedTests: row.passedTests,
          totalTests: row.totalTests || 10,
          executionTimeMs: row.executionTimeMs || 0,
          createdAt: row.createdAt || new Date().toISOString(),
        }
        submissions.push(sub)

        // If this submission passed all tests, guarantee that a per-language progress record exists
        if (sub.status === 'PASSED' && (sub.passedTests === 10 || sub.passedTests === sub.totalTests)) {
          const langKey = `${lang}:${slug}`
          if (!progressMap[langKey] || !progressMap[langKey].bestCode) {
            progressMap[langKey] = {
              problemId: slug,
              problemSlug: slug,
              status: 'SOLVED',
              language: lang,
              bestCode: sub.code,
              solvedAt: sub.createdAt,
              attempts: 1,
            }
          }
          if (!solvedSlugs.includes(slug)) {
            solvedSlugs.push(slug)
            totalXp += 50
          }
          if (!progressMap[slug]) {
            progressMap[slug] = progressMap[langKey]
          }
        }
      }
    }

    // Calculate authoritative streak from real activity timestamps
    const activityTimestamps: string[] = [
      ...submissions.map((s) => s.createdAt),
      ...Object.values(progressMap).map((p) => p.solvedAt),
    ].filter(Boolean) as string[]

    const streakResult = calculateAuthoritativeStreak(activityTimestamps)

    return {
      xp: totalXp,
      streak: streakResult.streak,
      solvedSlugs,
      progress: progressMap,
      submissions,
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn('Error syncing user progress from cloud:', msg)
    return null
  }
}

/**
 * Uploads any offline or guest progress stored locally into the student's cloud account.
 * DEPRECATED: Cloud is authoritative; this is a no-op to prevent obsolete local data resurrecting in cloud.
 */
export async function uploadLocalProgressToCloud(_userId: string, _localState: UserState): Promise<void> {
  // Cloud database is authoritative; prevent obsolete local caches from overwriting cloud clean state
  return
}

/**
 * Sets up a real-time subscription on UserProgress and Submission for a specific student.
 * Enables live synchronization across multiple tabs, devices, and portals.
 */
export function subscribeToStudentCloudProgress(userId: string, onUpdate: () => void): () => void {
  if (!userId) return () => {}

  try {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    const debouncedUpdate = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        onUpdate()
      }, 300)
    }

    const channelName = `student-progress-${userId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'UserProgress',
          filter: `userId=eq.${userId}`,
        },
        () => {
          debouncedUpdate()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Submission',
          filter: `userId=eq.${userId}`,
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
    console.warn('Realtime student progress subscription error:', err)
    return () => {}
  }
}
