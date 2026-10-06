import { supabase } from './supabase'
import { registerCacheClearer } from './cacheRegistry'

export interface BeltStat {
  order: number
  name: string
  title: string
  color: string
  totalProblems: number
  solvedCount: number
  remaining: number
  percent: number
  problemSlugs: string[]
}

export interface ProblemStats {
  solvedCount: number
  totalProblems: number
  remaining: number
  solvedProblemSlugs: string[]
  beltStats: BeltStat[]
}

// In-memory cache for total problem count with TTL to avoid redundant full-table counts
let cachedTotalProblemCount: number | null = null
let totalProblemCountTimestamp = 0
const TOTAL_PROBLEMS_TTL_MS = 2 * 60 * 1000 // 2 minutes

// In-memory cache for authoritative belts with problems
let cachedBeltsWithProblems: Array<{
  id: string
  order: number
  name: string
  title: string
  color: string
  Problem: Array<{ id: string; slug: string }>
}> | null = null
let beltsTimestamp = 0

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
  cachedBeltsWithProblems = null
  beltsTimestamp = 0
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
 * Fetches authoritative belts joined with problem identifiers directly from the Supabase Belt table.
 */
export async function fetchAuthoritativeBeltsWithProblems(forceRefresh = false): Promise<Array<{
  id: string
  order: number
  name: string
  title: string
  color: string
  Problem: Array<{ id: string; slug: string }>
}>> {
  const now = Date.now()
  if (!forceRefresh && cachedBeltsWithProblems !== null && now - beltsTimestamp < TOTAL_PROBLEMS_TTL_MS) {
    return cachedBeltsWithProblems
  }

  const { data, error } = await supabase
    .from('Belt')
    .select('id, order, name, title, color, Problem(id, slug)')
    .order('order')

  if (error || !data) {
    if (cachedBeltsWithProblems !== null) {
      return cachedBeltsWithProblems
    }
    throw new Error(`Failed to fetch belts from database: ${error?.message || 'Unknown error'}`)
  }

  const typedBelts = data as unknown as Array<{
    id: string
    order: number
    name: string
    title: string
    color: string
    Problem: Array<{ id: string; slug: string }>
  }>
  cachedBeltsWithProblems = typedBelts
  beltsTimestamp = now
  return typedBelts
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
 * 6. Belt breakdown: Per-belt problem counts and user solved counts derived from the database.
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

  // Fetch total problem count, user's solved records, and belt catalog concurrently
  const [totalProblems, userProgressResult, submissionResult, beltResult] = await Promise.all([
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
    fetchAuthoritativeBeltsWithProblems(options.forceRefresh),
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

  // Calculate per-belt breakdown from database rows
  const beltStats: BeltStat[] = (beltResult || []).map((b) => {
    const problems = (b.Problem as Array<{ id: string; slug: string }>) || []
    const totalInBelt = problems.length
    const solvedInBelt = problems.filter((p) => uniqueSolvedProblemKeys.has(p.slug)).length
    const remainingInBelt = Math.max(totalInBelt - solvedInBelt, 0)
    const percentInBelt = totalInBelt > 0 ? Math.round((solvedInBelt / totalInBelt) * 100) : 0
    return {
      order: b.order,
      name: b.name,
      title: b.title,
      color: b.color || '#ED2A2B',
      totalProblems: totalInBelt,
      solvedCount: solvedInBelt,
      remaining: remainingInBelt,
      percent: percentInBelt,
      problemSlugs: problems.map((p) => p.slug),
    }
  })

  const stats: ProblemStats = {
    solvedCount,
    totalProblems,
    remaining,
    solvedProblemSlugs: Array.from(uniqueSolvedProblemKeys),
    beltStats,
  }

  userStatsCache.set(sanitizedUserId, { stats, timestamp: now })

  return stats
}
