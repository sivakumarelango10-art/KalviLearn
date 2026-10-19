import React, { useState, useEffect, useMemo } from 'react'
import {
  Zap,
  Flame,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'
import problemsData from '@/data/problems.json'
import { getUserState, subscribeProgress, UserState } from '@/lib/progress'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { GrowthMentorCard } from '@/components/student/GrowthMentorCard'
import { useProblemStats } from '@/hooks/useProblemStats'

export const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [userState, setUserState] = useState<UserState>(() => getUserState())
  const { stats: problemStats } = useProblemStats(user?.id)

  useEffect(() => {
    const updateStats = () => {
      setUserState(getUserState())
    }
    updateStats()
    return subscribeProgress(updateStats)
  }, [])

  // Authoritative unique solved problem slugs
  const authoritativeSolvedSlugs = useMemo(() => {
    if (problemStats?.solvedProblemSlugs && problemStats.solvedProblemSlugs.length > 0) {
      return problemStats.solvedProblemSlugs
    }
    return userState.solvedSlugs
  }, [problemStats?.solvedProblemSlugs, userState.solvedSlugs])

  // Calculate difficulty breakdown
  const difficultyStats = useMemo(() => {
    let easyTotal = 0
    let easySolved = 0
    let medTotal = 0
    let medSolved = 0
    let hardTotal = 0
    let hardSolved = 0

    for (const belt of problemsData) {
      for (const p of belt.problems) {
        const isSolved = authoritativeSolvedSlugs.includes(p.slug)
        if (p.difficulty === 'Easy') {
          easyTotal++
          if (isSolved) easySolved++
        } else if (p.difficulty === 'Medium') {
          medTotal++
          if (isSolved) medSolved++
        } else if (p.difficulty === 'Hard') {
          hardTotal++
          if (isSolved) hardSolved++
        }
      }
    }

    return {
      easy: { solved: easySolved, total: easyTotal },
      medium: { solved: medSolved, total: medTotal },
      hard: { solved: hardSolved, total: hardTotal },
    }
  }, [authoritativeSolvedSlugs])

  const solvedCount = problemStats?.solvedCount ?? userState.solvedSlugs.length

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

      {/* Belt Mastery Milestones */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900">Belt Mastery Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Belt 1 */}
          <div
            className={cn(
              'rounded-2xl p-6 border transition-all space-y-4 relative overflow-hidden interactive-card',
              solvedCount >= 20
                ? 'bg-blue-50/50 border-blue-200'
                : 'bg-white border-neutral-200/80'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm transition-transform group-hover:scale-105">
                B1
              </div>
              {solvedCount >= 20 ? (
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mastered
                </span>
              ) : (
                <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                  {Math.min(solvedCount, 20)} / 20 Solved
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Belt 1: Foundations</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Syntax, conditionals, loops, standard I/O, and arithmetic operations.
              </p>
            </div>
          </div>

          {/* Belt 2 */}
          <div
            className={cn(
              'rounded-2xl p-6 border transition-all space-y-4 relative overflow-hidden interactive-card',
              solvedCount >= 50
                ? 'bg-emerald-50/50 border-emerald-200'
                : 'bg-white border-neutral-200/80'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                B2
              </div>
              {solvedCount >= 50 ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mastered
                </span>
              ) : (
                <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                  {Math.max(0, Math.min(solvedCount - 20, 30))} / 30 Solved
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Belt 2: Intermediate</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Arrays, strings, two pointers, prefix sums, and basic algorithmic logic.
              </p>
            </div>
          </div>

          {/* Belt 3 */}
          <div
            className={cn(
              'rounded-2xl p-6 border transition-all space-y-4 relative overflow-hidden interactive-card',
              solvedCount >= 85
                ? 'bg-red-50/50 border-red-200'
                : 'bg-white border-neutral-200/80'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                B3
              </div>
              {solvedCount >= 85 ? (
                <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mastered
                </span>
              ) : (
                <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                  {Math.max(0, Math.min(solvedCount - 50, 35))} / 35 Solved
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Belt 3: Advanced</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Sliding window, binary search, sorting synthesis, and complex constraints.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown Grid */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-neutral-900">Problem Breakdown by Difficulty</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Easy */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-emerald-700">Easy Problems</span>
              <span className="text-neutral-700">
                {difficultyStats.easy.solved} / {difficultyStats.easy.total}
              </span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(difficultyStats.easy.solved / (difficultyStats.easy.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-amber-700">Medium Problems</span>
              <span className="text-neutral-700">
                {difficultyStats.medium.solved} / {difficultyStats.medium.total}
              </span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(difficultyStats.medium.solved / (difficultyStats.medium.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Hard */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-red-700">Hard Problems</span>
              <span className="text-neutral-700">
                {difficultyStats.hard.solved} / {difficultyStats.hard.total}
              </span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-red-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(difficultyStats.hard.solved / (difficultyStats.hard.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

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
