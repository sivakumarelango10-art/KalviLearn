import React, { useState, useEffect } from 'react'
import {
  Zap,
  Flame,
  ShieldCheck,
} from 'lucide-react'
import { getUserState, subscribeProgress, UserState } from '@/lib/progress'
import { useAuth } from '@/contexts/AuthContext'
import { GrowthMentorCard } from '@/components/student/GrowthMentorCard'

export const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [userState, setUserState] = useState<UserState>(() => getUserState())

  useEffect(() => {
    const updateStats = () => {
      setUserState(getUserState())
    }
    updateStats()
    return subscribeProgress(updateStats)
  }, [])

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'KS'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 interactive-card">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neutral-900 to-neutral-700 text-white font-bold text-2xl flex items-center justify-center shadow-sm relative">
            <span>{initials}</span>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#ED2A2B] rounded-full border-2 border-white animate-pulse-subtle" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {user?.name || user?.email?.split('@')[0] || 'Student'}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-[#ED2A2B] border border-red-200">
                {user?.role || 'STUDENT'} Account
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500">
              {user?.email || 'Enrolled in Kalvi Learn Mastery Program'} • Joined 2026
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-center transition-transform hover:scale-105">
            <div className="text-xs text-neutral-500 font-medium">Kalvi XP</div>
            <div className="text-lg font-bold text-neutral-900 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{userState.xp}</span>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-center transition-transform hover:scale-105">
            <div className="text-xs text-neutral-500 font-medium">Streak</div>
            <div className="text-lg font-bold text-neutral-900 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{userState.streak}d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Mentor Section */}
      <GrowthMentorCard />

      {/* Platform Security & Evaluation Engine */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 border border-neutral-800 space-y-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-sm">Evaluation Engine & Workspace</h3>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">
          The Kalvi Practice Arena provides a full-featured Monaco editor with copy, paste, and developer shortcut support (<code className="text-neutral-200">Ctrl+C / Ctrl+V / Ctrl+X</code>) alongside comprehensive automated test case evaluation.
        </p>
      </div>
    </div>
  )
}
