import { supabaseServer } from './feedbackAuth'
import type { RateLimiter } from './httpSecurity'

/**
 * Two-tier rate limiting for the serverless API.
 *
 *  1. Per-instance in-memory limiter (always applied; cheap first line of defence, bounded memory).
 *  2. Cross-instance counter in Postgres (`rate_limit_hit`, service_role only): atomic fixed-window counters shared by
 *     every serverless instance, so the quota is genuinely global.
 *
 * If the distributed counter is unavailable (migration not applied yet, DB hiccup) the request FALLS BACK to the
 * per-instance decision and the RPC is skipped for 60s. In that degraded mode the limit is per instance only.
 */
let distributedUnavailableUntil = 0

export function distributedLimiterActive(): boolean {
  return Date.now() >= distributedUnavailableUntil
}

export async function hitRateLimit(
  local: RateLimiter,
  bucket: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const localDecision = local.check(bucket)
  if (!localDecision.allowed) return localDecision
  if (!distributedLimiterActive()) return localDecision

  try {
    const { data, error } = await supabaseServer.rpc('rate_limit_hit', {
      p_bucket: bucket,
      p_max: maxRequests,
      p_window_seconds: windowSeconds,
    })
    if (error) {
      distributedUnavailableUntil = Date.now() + 60_000
      return localDecision
    }
    const row = Array.isArray(data) ? data[0] : data
    if (row && typeof row.allowed === 'boolean') {
      return row.allowed ? { allowed: true } : { allowed: false, retryAfter: Number(row.retry_after) || windowSeconds }
    }
    return localDecision
  } catch {
    distributedUnavailableUntil = Date.now() + 60_000
    return localDecision
  }
}

export function resetDistributedLimiterForTesting(): void {
  distributedUnavailableUntil = 0
}
