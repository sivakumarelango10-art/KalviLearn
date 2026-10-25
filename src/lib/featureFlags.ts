/**
 * Feature Flags Configuration for KalviLearn
 */

// In-memory runtime override (useful for testing or dynamic toggling)
let practiceArchiveEnabledOverride: boolean | null = null

/**
 * Returns whether the audited Practice Archive (58 active / 442 archived) is enabled.
 * Default is FALSE: Practice shows all 500 problems as today.
 * When TRUE: Practice filters to the 58 active benchmark problems and carries over progress.
 */
export function isPracticeArchiveEnabled(): boolean {
  if (practiceArchiveEnabledOverride !== null) {
    return practiceArchiveEnabledOverride
  }

  // Node environment variable (for scripts/tests)
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.PRACTICE_ARCHIVE_ENABLED !== undefined) {
      return process.env.PRACTICE_ARCHIVE_ENABLED === 'true'
    }
    if (process.env.VITE_PRACTICE_ARCHIVE_ENABLED !== undefined) {
      return process.env.VITE_PRACTICE_ARCHIVE_ENABLED === 'true'
    }
  }

  // Browser / Vite environment variable
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const viteVal = (import.meta.env as any).VITE_PRACTICE_ARCHIVE_ENABLED || (import.meta.env as any).PRACTICE_ARCHIVE_ENABLED
    if (viteVal !== undefined) {
      return viteVal === 'true' || viteVal === true
    }
  }

  // Default is false
  return false
}

/**
 * Programmatically override the practice archive feature flag (used by tests and dev tools).
 */
export function setPracticeArchiveEnabled(enabled: boolean | null): void {
  practiceArchiveEnabledOverride = enabled
}

export const PRACTICE_ARCHIVE_ENABLED: boolean = isPracticeArchiveEnabled()
