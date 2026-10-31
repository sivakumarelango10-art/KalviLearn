import { ComponentType, lazy, LazyExoticComponent } from 'react'

const RELOAD_KEY_PREFIX = 'kalvi_chunk_reload_'
const RELOAD_COOLDOWN_MS = 15000 // 15-second window prevents infinite reload loops

/**
 * Accurately detects whether an error is caused by a missing, stale, or failed
 * dynamically imported JavaScript/CSS chunk across all modern browser engines.
 */
export function isChunkLoadError(error: unknown): boolean {
  if (!error) return false

  const message = error instanceof Error ? error.message : String(error)
  const name = error instanceof Error ? error.name : ''

  const patterns = [
    /failed to fetch dynamically imported module/i,
    /loading chunk/i,
    /unable to preload css/i,
    /importing a module script failed/i,
    /error loading dynamically imported module/i,
    /failed to load module script/i,
    /chunkloaderror/i,
    /dynamically imported module/i,
    /mime type/i,
  ]

  return name === 'ChunkLoadError' || patterns.some((pattern) => pattern.test(message))
}

/**
 * Wraps a dynamic component import with automatic chunk recovery.
 *
 * If a deployed update invalidates a cached chunk hash, this function:
 * 1. Detects the chunk load failure.
 * 2. Checks sessionStorage to ensure a reload hasn't already occurred within the cooldown window.
 * 3. Triggers a single controlled page reload to fetch the latest deployment and assets.
 * 4. If the reload has already been attempted and fails again, throws the error to be handled
 *    by the RouteErrorBoundary, preventing infinite reload loops.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  chunkKey: string
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await componentImport()
    } catch (firstError: unknown) {
      // 1. Immediate soft retry after 250ms for temporary network hiccups
      try {
        await new Promise((resolve) => setTimeout(resolve, 250))
        return await componentImport()
      } catch (error: unknown) {
        if (isChunkLoadError(error)) {
          const storageKey = `${RELOAD_KEY_PREFIX}${chunkKey}`
          let lastReload: string | null = null
          try {
            lastReload = sessionStorage.getItem(storageKey)
          } catch {
            lastReload = null
          }
          const now = Date.now()

          // Check if we already attempted a reload recently for this chunk
          const hasRecentlyReloaded = lastReload && now - parseInt(lastReload, 10) < RELOAD_COOLDOWN_MS

          if (!hasRecentlyReloaded) {
            try {
              sessionStorage.setItem(storageKey, String(now))
            } catch {
              // Ignore storage errors in restricted contexts
            }
            console.warn(
              `[ChunkRecovery] Stale chunk detected for module "${chunkKey}". Reloading page to fetch latest deployment...`
            )
            window.location.reload()

            // Wait 1.5s for browser navigation to take over; if not, throw to trigger RouteErrorBoundary
            await new Promise((resolve) => setTimeout(resolve, 1500))
          }

          // Already reloaded and still failed (e.g. true offline or broken build)
          console.error(
            `[ChunkRecovery] Module "${chunkKey}" failed to load after page reload attempt.`,
            error
          )
        }

        // Re-throw to be captured by RouteErrorBoundary
        throw error
      }
    }
  })
}
