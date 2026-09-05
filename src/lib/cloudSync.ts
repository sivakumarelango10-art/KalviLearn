import { supabase } from './supabase'
import type { UserState, SubmissionRecord, UserProgressRecord } from './progress'

// Slug-to-UUID cache to avoid repeated queries for the 85 problems
let slugToProblemIdMap: Map<string, string> | null = null

function generateUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

async function getProblemIdBySlug(slug: string): Promise<string | null> {
  try {
    if (!slugToProblemIdMap) {
      const { data, error } = await supabase.from('Problem').select('id, slug')
      if (error) {
        console.warn('Failed to fetch problem map from database:', error.message)
        return null
      }
      if (data && Array.isArray(data)) {
        slugToProblemIdMap = new Map()
        for (const item of data) {
          slugToProblemIdMap.set(item.slug, item.id)
        }
      }
    }
    return slugToProblemIdMap?.get(slug) || null
  } catch {
    return null
  }
}

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

    // 2. Fetch recent submissions for submission history
    const { data: submissionRows, error: sError } = await supabase
      .from('Submission')
      .select('id, userId, problemId, language, code, status, passedTests, totalTests, executionTimeMs, createdAt, Problem(slug, title)')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(50)

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

        const isSolved = row.status === 'SOLVED'
        if (isSolved && !solvedSlugs.includes(slug)) {
          solvedSlugs.push(slug)
          totalXp += row.xpEarned || 50
        }

        progressMap[slug] = {
          problemId: slug,
          problemSlug: slug,
          status: row.status as 'SOLVED' | 'ATTEMPTED',
          language: row.language || 'python',
          bestCode: row.bestCode || '',
          solvedAt: row.solvedAt || undefined,
          attempts: row.attempts || 1,
        }
      }
    }

    const submissions: SubmissionRecord[] = []
    if (Array.isArray(submissionRows)) {
      for (const row of submissionRows) {
        const pObj = row.Problem as { slug?: string; title?: string } | null
        const slug = pObj?.slug || row.problemId
        const title = pObj?.title || slug

        submissions.push({
          id: row.id,
          problemSlug: slug,
          problemTitle: title,
          language: row.language || 'python',
          code: row.code || '',
          status: row.status as 'PASSED' | 'FAILED' | 'ERROR',
          passedTests: row.passedTests,
          totalTests: row.totalTests || 10,
          executionTimeMs: row.executionTimeMs || 0,
          createdAt: row.createdAt || new Date().toISOString(),
        })
      }
    }

    return {
      xp: totalXp,
      streak: solvedSlugs.length > 0 ? 1 : 1,
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
 * Persists a solved problem to Supabase in the background.
 */
export async function saveSuccessToCloud(
  userId: string,
  problemSlug: string,
  language: string,
  code: string,
  executionTimeMs: number
): Promise<void> {
  if (!userId) return

  try {
    const problemId = await getProblemIdBySlug(problemSlug)
    if (!problemId) return

    const progressRecord = {
      id: generateUuid(),
      userId,
      problemId,
      status: 'SOLVED',
      language,
      bestCode: code,
      solvedAt: new Date().toISOString(),
      attempts: 1,
      xpEarned: 50,
    }

    await supabase
      .from('UserProgress')
      .upsert(progressRecord, { onConflict: 'userId,problemId' })

    const subRecord = {
      id: generateUuid(),
      userId,
      problemId,
      language,
      code,
      status: 'PASSED',
      passedTests: 10,
      totalTests: 10,
      testResults: [],
      executionTimeMs,
      createdAt: new Date().toISOString(),
    }

    await supabase.from('Submission').insert(subRecord)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn('Failed to save problem success to cloud database:', msg)
  }
}

/**
 * Persists a problem attempt and submission record to Supabase in the background.
 */
export async function saveAttemptToCloud(
  userId: string,
  problemSlug: string,
  language: string,
  code: string,
  passedTests: number,
  totalTests: number,
  executionTimeMs: number
): Promise<void> {
  if (!userId) return

  try {
    const problemId = await getProblemIdBySlug(problemSlug)
    if (!problemId) return

    const subRecord = {
      id: generateUuid(),
      userId,
      problemId,
      language,
      code,
      status: passedTests === totalTests ? 'PASSED' : 'FAILED',
      passedTests,
      totalTests,
      testResults: [],
      executionTimeMs,
      createdAt: new Date().toISOString(),
    }

    await supabase.from('Submission').insert(subRecord)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn('Failed to save attempt to cloud database:', msg)
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
