/**
 * Registry of in-memory, per-session caches (mentor roster/submission caches, ...). Modules register a clearer at load
 * time; logout and account switches call clearAllUserCaches() so one user's cached data can never be served to the next
 * user of the same browser tab (the SPA is not reloaded between logout and the next login).
 */
const clearers = new Set<() => void>()

export function registerCacheClearer(clear: () => void): void {
  clearers.add(clear)
}

export function clearAllUserCaches(): void {
  for (const clear of clearers) {
    try {
      clear()
    } catch {
      // a failing clearer must never block logout
    }
  }
}
