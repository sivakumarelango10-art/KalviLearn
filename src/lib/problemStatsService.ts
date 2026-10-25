import { supabase } from './supabase'
import { registerCacheClearer } from './cacheRegistry'
import problemsData from '../data/problems.json'
import { isPracticeArchiveEnabled } from './featureFlags'

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

// All practice problems (500)
const ALL_PRACTICE_PROBLEMS = problemsData.flatMap((b) => b.problems)
export const TOTAL_ALL_PRACTICE_PROBLEMS = ALL_PRACTICE_PROBLEMS.length // 500

// All active practice problems (58)
const ALL_ACTIVE_PRACTICE_PROBLEMS = problemsData.flatMap((b) =>
  b.problems.filter((p: any) => p.isActive !== false)
)
export const TOTAL_ACTIVE_PRACTICE_PROBLEMS = ALL_ACTIVE_PRACTICE_PROBLEMS.length // 58

// Fast canonical map for archived duplicates: slug/id -> canonicalProblemId
const CANONICAL_PROBLEM_MAP = new Map<string, string>()
const CANONICAL_SLUG_MAP = new Map<string, string>()

for (const b of problemsData) {
  for (const p of b.problems) {
    if ((p as any).canonicalProblemId) {
      CANONICAL_PROBLEM_MAP.set(p.id, (p as any).canonicalProblemId)
      CANONICAL_PROBLEM_MAP.set(p.slug, (p as any).canonicalProblemId)
    }
  }
}

// Build map from canonical problem ID to canonical problem slug
for (const p of ALL_ACTIVE_PRACTICE_PROBLEMS) {
  CANONICAL_SLUG_MAP.set(p.id, p.slug)
  CANONICAL_SLUG_MAP.set(p.slug, p.slug)
}

export function mapToCanonicalPracticeSlug(slugOrId: string): string {
  if (!isPracticeArchiveEnabled()) {
    return slugOrId
  }
  const targetId = CANONICAL_PROBLEM_MAP.get(slugOrId) || slugOrId
  return CANONICAL_SLUG_MAP.get(targetId) || targetId
}

export function isPracticeProblemActive(slugOrId: string): boolean {
  if (!isPracticeArchiveEnabled()) {
    return true
  }
  return !CANONICAL_PROBLEM_MAP.has(slugOrId)
}

export function getActiveProblemsCount(): number {
  return isPracticeArchiveEnabled() ? TOTAL_ACTIVE_PRACTICE_PROBLEMS : TOTAL_ALL_PRACTICE_PROBLEMS
}

export function getCanonicalPracticeProblem(slugOrId: string) {
  if (!isPracticeArchiveEnabled()) {
    return ALL_PRACTICE_PROBLEMS.find((p) => p.slug === slugOrId || p.id === slugOrId)
  }
  const canonicalSlug = mapToCanonicalPracticeSlug(slugOrId)
  return ALL_ACTIVE_PRACTICE_PROBLEMS.find((p) => p.slug === canonicalSlug || p.id === canonicalSlug)
}

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
  userStatsCache.clear()
}

/**
 * Fetches the authoritative total problem count directly from the local catalog.
 * Does NOT query the remote database for Problem.isActive, guaranteeing seamless operation
 * even if merged before the database migration is applied.
 */
export async function fetchTotalProblemCount(_forceRefresh = false): Promise<number> {
  return getActiveProblemsCount()
}

/**
 * Fetches authoritative belts joined with problem identifiers, filtered by feature flag.
 */
export async function fetchAuthoritativeBeltsWithProblems(_forceRefresh = false): Promise<Array<{
  id: string
  order: number
  name: string
  title: string
  color: string
  Problem: Array<{ id: string; slug: string }>
}>> {
  const archiveEnabled = isPracticeArchiveEnabled()
  return problemsData.map((b) => ({
    id: `belt-${b.order}`,
    order: b.order,
    name: b.name,
    title: b.title,
    color: b.color,
    Problem: b.problems
      .filter((p: any) => !archiveEnabled || p.isActive !== false)
      .map((p: any) => ({ id: p.id, slug: p.slug })),
  }))
}

/**
 * Fetches authoritative problem stats for a specific authenticated student.
 * 
 * Guarantees:
 * 1. User isolation: Scoped strictly by userId.
 * 2. Uniqueness: Multi-language solves (Python, Java, JS, C++) on the same problem count as 1 solve.
 * 3. Authoritative state: Queries UserProgress (SOLVED) and Submission (PASSED 10/10).
 * 4. Carry-over: Archived duplicates map to their canonical active problem at most once, with no double XP.
 * 5. Active totals: totalProblems equals 58, and empty belts report 0 problems cleanly.
 * 6. Remaining calculation: remaining = Math.max(totalProblems - solvedCount, 0).
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
  const archiveEnabled = isPracticeArchiveEnabled()
  const validProblemSet = new Set(
    (archiveEnabled ? ALL_ACTIVE_PRACTICE_PROBLEMS : ALL_PRACTICE_PROBLEMS).map((p) => p.slug)
  )

  function registerSolvedProblem(rawKey: string) {
    if (archiveEnabled) {
      const canonicalSlug = mapToCanonicalPracticeSlug(rawKey)
      if (validProblemSet.has(canonicalSlug)) {
        uniqueSolvedProblemKeys.add(canonicalSlug)
      }
    } else {
      if (validProblemSet.has(rawKey)) {
        uniqueSolvedProblemKeys.add(rawKey)
      }
    }
  }

  // 1. Add canonical problems from UserProgress table
  if (Array.isArray(userProgressResult.data)) {
    for (const row of userProgressResult.data) {
      const pObj = row.Problem as { slug?: string } | null
      const slug = pObj?.slug || row.problemId
      if (slug) {
        registerSolvedProblem(slug)
      }
    }
  }

  // 2. Add canonical problems from passed Submissions
  if (Array.isArray(submissionResult.data)) {
    for (const row of submissionResult.data) {
      const isFullPass =
        row.passedTests != null && row.totalTests != null
          ? row.passedTests === row.totalTests && row.totalTests > 0
          : row.status === 'PASSED'

      if (isFullPass) {
        const pObj = row.Problem as { slug?: string } | null
        const slug = pObj?.slug || row.problemId
        if (slug) {
          registerSolvedProblem(slug)
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

  // Calculate per-belt breakdown from active problem rows
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
