import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X, Zap, Flame, Award } from 'lucide-react'
import { AppSidebar } from '@/components/common/AppSidebar'
import { getUserState } from '@/lib/progress'
import { useAuth } from '@/contexts/AuthContext'

export const AppLayout: React.FC = () => {
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(1)
  const [solvedCount, setSolvedCount] = useState(0)

  useEffect(() => {
    const updateStats = () => {
      const state = getUserState()
      setXp(state.xp)
      setStreak(state.streak)
      setSolvedCount(state.solvedSlugs.length)
    }

    updateStats()
    window.addEventListener('storage', updateStats)
    const interval = setInterval(updateStats, 1000)

    return () => {
      window.removeEventListener('storage', updateStats)
      clearInterval(interval)
    }
  }, [])

  // Calculate current belt based on problems solved
  const getCurrentBelt = () => {
    if (solvedCount >= 50) return { name: 'Belt 3', color: 'bg-red-50 text-red-700 border-red-200' }
    if (solvedCount >= 20) return { name: 'Belt 2', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
    return { name: 'Belt 1', color: 'bg-blue-50 text-blue-700 border-blue-200' }
  }

  const belt = getCurrentBelt()

  return (
    <div className="flex h-screen w-full bg-neutral-50 overflow-hidden font-sans">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <AppSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-50">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-800"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <AppSidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-neutral-200/80 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Kalvi Learn
              </span>
              {user?.name && (
                <>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                    {user.name}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Gamification / Stats Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Belt Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${belt.color}`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{belt.name}</span>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{streak}d Streak</span>
            </div>

            {/* XP Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-900 text-white shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{xp} XP</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/60">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
