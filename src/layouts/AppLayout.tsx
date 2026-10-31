import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Menu, X, Zap, Flame, Award, ArrowRight, GraduationCap } from 'lucide-react'
import { AppSidebar } from '@/components/common/AppSidebar'
import { OfflineBanner } from '@/components/common/OfflineBanner'
import { getUserState, subscribeProgress } from '@/lib/progress'
import { useAuth } from '@/contexts/AuthContext'
import { GlobalFeedbackWidget } from '@/components/feedback/GlobalFeedbackWidget'

export const AppLayout: React.FC = () => {
  const { user } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [xp, setXp] = useState(() => getUserState().xp)
  const [streak, setStreak] = useState(() => getUserState().streak)
  const [solvedCount, setSolvedCount] = useState(() => getUserState().solvedSlugs.length)

  useEffect(() => {
    const updateStats = () => {
      const state = getUserState()
      setXp(state.xp)
      setStreak(state.streak)
      setSolvedCount(state.solvedSlugs.length)
    }

    updateStats()
    return subscribeProgress(updateStats)
  }, [])

  // Realtime progress sync is owned by AuthContext (single subscription per signed-in student); this layout only
  // reflects the hydrated local state via subscribeProgress above.

  // Calculate current belt based on problems solved across 10 Belts
  const getCurrentBelt = () => {
    if (solvedCount >= 410) return { name: 'Belt 10 (Black)', color: 'bg-neutral-900 text-white border-neutral-700' }
    if (solvedCount >= 330) return { name: 'Belt 9 (Sr. Red)', color: 'bg-red-100 text-red-800 border-red-300' }
    if (solvedCount >= 265) return { name: 'Belt 8 (Red)', color: 'bg-red-50 text-red-700 border-red-200' }
    if (solvedCount >= 205) return { name: 'Belt 7 (Sr. Brown)', color: 'bg-amber-100 text-amber-900 border-amber-300' }
    if (solvedCount >= 165) return { name: 'Belt 6 (Brown)', color: 'bg-amber-50 text-amber-800 border-amber-200' }
    if (solvedCount >= 125) return { name: 'Belt 5 (Blue)', color: 'bg-blue-50 text-blue-700 border-blue-200' }
    if (solvedCount >= 85) return { name: 'Belt 4 (Purple)', color: 'bg-purple-50 text-purple-700 border-purple-200' }
    if (solvedCount >= 50) return { name: 'Belt 3 (Green)', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
    if (solvedCount >= 20) return { name: 'Belt 2 (Orange)', color: 'bg-orange-50 text-orange-700 border-orange-200' }
    return { name: 'Belt 1 (Yellow)', color: 'bg-yellow-50 text-yellow-800 border-yellow-200' }
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
        {/* Mentor Preview Indicator Banner */}
        {user?.role === 'MENTOR' && (
          <div className="bg-neutral-900 text-white px-4 py-2 flex items-center justify-between text-xs font-medium z-30 shadow-xs flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#ED2A2B]/20 text-[#ED2A2B] flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white">Student View Active:</span>
              <span className="text-neutral-300 hidden sm:inline">
                Previewing student learning platform as Faculty Mentor ({user.name || user.email})
              </span>
            </div>
            <Link
              to="/mentor"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#ED2A2B] hover:bg-red-600 text-white font-bold transition-colors shadow-2xs text-xs cursor-pointer"
            >
              <span>Back to Mentor Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

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

        {/* Ambient Offline Detection Banner */}
        <OfflineBanner />

        {/* Dynamic Page Content with ultra-smooth route transitions */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/60">
          <div key={location.pathname} className="animate-page-enter min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Feedback & Support Widget */}
      <GlobalFeedbackWidget portal="STUDENT" />
    </div>
  )
}
