import React, { useState, useEffect } from 'react'
import { WifiOff, Wifi } from 'lucide-react'

/**
 * Ambient Offline Connectivity Banner
 * Monitors browser online/offline status and displays a non-intrusive warning when offline.
 * Auto-dismisses when connectivity is restored.
 */
export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true
  })
  const [showRestored, setShowRestored] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    const handleOnline = () => {
      setIsOnline(true)
      setShowRestored(true)
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => setShowRestored(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowRestored(false)
      if (timer) clearTimeout(timer)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline && !showRestored) {
    return null
  }

  if (showRestored) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full bg-emerald-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-300 animate-in slide-in-from-top-2"
      >
        <Wifi className="w-4 h-4 text-emerald-200" />
        <span>Internet connection restored. Cloud synchronization resumed.</span>
      </div>
    )
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="w-full bg-amber-500 text-neutral-950 px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-300 animate-in slide-in-from-top-2 border-b border-amber-600"
    >
      <WifiOff className="w-4 h-4 text-neutral-900" />
      <span>
        You are currently working offline. Code submissions and cloud progress sync will pause until reconnected.
      </span>
    </div>
  )
}
