import { supabase } from './supabase'
import { registerCacheClearer } from './cacheRegistry'

export interface ProblemStats {
  solvedCount: number
  totalProblems: number
  remaining: number
  solvedProblemSlugs: string[]
}

// In-memory cache for total problem count with TTL to avoid redundant full-table counts
let cachedTotalProblemCount: number | null = null
let totalProblemCountTimestamp = 0
const TOTAL_PROBLEMS_TTL_MS = 2 * 60 * 1000 // 2 minutes

// Per-user in-memory stats cache for rapid successive component calls
const userStatsCache = new Map<string, { stats: ProblemStats; timestamp: number }>()
const USER_STATS_TTL_MS = 5 * 1000 // 5 seconds (invalidated immediately on updates)

// Register with cache registry to guarantee clear on logout and account switch
registerCacheClearer(() => {
  clearProblemStatsCache()
})

/**
 * Clears all cached problem statistics. Called on logout, account switch, or data mutations.
 */
export function clearProblemStatsCache(): void {
  cachedTotalProblemCount = null
  totalProblemCountTimestamp = 0
  userStatsCache.clear()
}

/**
 * Fetches the authoritative total problem count directly from the Supabase Problem table.
 * Guaranteed to be database-backed with no hardcoded fallbacks.
 */
export async function fetchTotalProblemCount(forceRefresh = false): Promise<number> {
  const now = Date.now()
  if (!forceRefresh && cachedTotalProblemCount !== null && now - totalProblemCountTimestamp < TOTAL_PROBLEMS_TTL_MS) {
    return cachedTotalProblemCount
  }

  const { count, error } = await supabase
    .from('Problem')
    .select('id', { count: 'exact', head: true })

  if (error) {
    // If we have an existing cached count, use it rather than failing if network blipped
    if (cachedTotalProblemCount !== null) {
      return cachedTotalProblemCount
    }
    throw new Error(`Failed to fetch total problem count from database: ${error.message}`)
  }

  if (typeof count !== 'number') {
    throw new Error('Database returned invalid problem count')
  }

  cachedTotalProblemCount = count
  totalProblemCountTimestamp = now
  return count
}

/**
 * Fetches authoritative problem stats for a specific authenticated student.
 * 
 * Guarantees:
 * 1. User isolation: Scoped strictly by userId.
 * 2. Uniqueness: Multi-language solves (Python, Java, JS, C++) on the same problem count as 1 solve.
 * 3. Authoritative state: Queries UserProgress (SOLVED) and Submission (PASSED 10/10).
 * 4. No fake numbers: Returns exact counts; throws on database failure so caller shows explicit error.
 * 5. Remaining calculation: remaining = Math.max(totalProblems - solvedCount, 0).
 */
export async function fetchAuthoritativeProblemStats(
  userId: string,
  options: { forceRefresh?: boolean } = {}
): Promise<ProblemStats> {
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    throw new Error('Authenticated user ID is required to fetch problem stats')
  }

  const sanitizedUserId = userId.trim()
  const now = Date.now()

  if (!options.forceRefresh) {
    const cached = userStatsCache.get(sanitizedUserId)
    if (cached && now - cached.timestamp < USER_STATS_TTL_MS) {
      return cached.stats
    }
  }

  // Fetch total problem count and user's solved records concurrently
  const [totalProblems, userProgressResult, submissionResult] = await Promise.all([
    fetchTotalProblemCount(options.forceRefresh),
    supabase
      .from('UserProgress')
      .select('problemId, status, Problem(slug)')
      .eq('userId', sanitizedUserId)
      .eq('status', 'SOLVED'),
    supabase
      .from('Submission')
      .select('problemId, status, passedTests, totalTests, Problem(slug)')
      .eq('userId', sanitizedUserId)
      .eq('status', 'PASSED'),
  ])

  if (userProgressResult.error) {
    throw new Error(`Failed to fetch user progress from database: ${userProgressResult.error.message}`)
  }

  if (submissionResult.error) {
    throw new Error(`Failed to fetch user submissions from database: ${submissionResult.error.message}`)
  }

  // Deduplicate solved problems across languages and submission records
  const uniqueSolvedProblemKeys = new Set<string>()

  // 1. Add canonical problems from UserProgress table
  if (Array.isArray(userProgressResult.data)) {
    for (const row of userProgressResult.data) {
      const pObj = row.Problem as { slug?: string } | null
      const slug = pObj?.slug || row.problemId
      if (slug) {
        uniqueSolvedProblemKeys.add(slug)
      }
    }
  }

  // 2. Add canonical problems from passed Submissions
  if (Array.isArray(submissionResult.data)) {
    for (const row of submissionResult.data) {
      // Must have passed all test cases
      const isFullPass =
        row.passedTests != null && row.totalTests != null
          ? row.passedTests === row.totalTests && row.totalTests > 0
          : row.status === 'PASSED'

      if (isFullPass) {
        const pObj = row.Problem as { slug?: string } | null
        const slug = pObj?.slug || row.problemId
        if (slug) {
          uniqueSolvedProblemKeys.add(slug)
        }
      }
    }
  }

  const solvedCount = uniqueSolvedProblemKeys.size
  const remaining = Math.max(totalProblems - solvedCount, 0)

  // Warn if data anomaly detected (solved exceeds total)
  if (solvedCount > totalProblems && totalProblems > 0) {
    console.warn(
      `[Data Anomaly] Student ${sanitizedUserId} solved count (${solvedCount}) exceeds total problems (${totalProblems})`
    )
  }

  const stats: ProblemStats = {
    solvedCount,
    totalProblems,
    remaining,
    solvedProblemSlugs: Array.from(uniqueSolvedProblemKeys),
  }

  userStatsCache.set(sanitizedUserId, { stats, timestamp: now })

  return stats
}
