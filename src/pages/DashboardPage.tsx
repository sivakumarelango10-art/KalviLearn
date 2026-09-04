import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  Zap,
  Flame,
  CheckCircle2,
  ArrowRight,
  Code2,
  BookOpen,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Clock,
} from 'lucide-react'
import problemsData from '@/data/problems.json'
import curriculumData from '@/data/curriculum.json'
import { getUserState, subscribeProgress, UserState } from '@/lib/progress'
import { useAuth } from '@/contexts/AuthContext'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [userState, setUserState] = useState<UserState>({
    xp: 0,
    streak: 1,
    solvedSlugs: [],
    progress: {},
    submissions: [],
  })

  const displayName = user?.name || (user?.email ? user.email.split('@')[0].replace(/\./g, ' ') : 'Kalvi Scholar')

  useEffect(() => {
    const updateStats = () => {
      setUserState(getUserState())
    }
    updateStats()
    return subscribeProgress(updateStats)
  }, [])

  // Calculate belt details
  const beltSummaries = useMemo(() => {
    return problemsData.map((belt) => {
      const total = belt.problems.length
      const solved = belt.problems.filter((p: { slug: string }) =>
        userState.solvedSlugs.includes(p.slug)
      ).length
      const percent = total > 0 ? Math.round((solved / total) * 100) : 0
      return {
        order: belt.order,
        name: belt.name,
        title: belt.title,
        color: belt.color,
        total,
        solved,
        percent,
      }
    })
  }, [userState.solvedSlugs])

  // Find next problem to solve
  const nextProblem = useMemo(() => {
    for (const belt of problemsData) {
      for (const p of belt.problems) {
        if (!userState.solvedSlugs.includes(p.slug)) {
          return {
            ...p,
            beltName: belt.name,
            beltColor: belt.color,
          }
        }
      }
    }
    return null
  }, [userState.solvedSlugs])

  const totalProblems = 85
  const totalSolved = userState.solvedSlugs.length
  const overallPercent = Math.round((totalSolved / totalProblems) * 100)

  // Current active Belt
  const currentBelt = useMemo(() => {
    if (totalSolved >= 50) return { name: 'Belt 3', title: 'Advanced Algorithmic Patterns', color: '#EF4444' }
    if (totalSolved >= 20) return { name: 'Belt 2', title: 'Intermediate Data Structures & Logic', color: '#10B981' }
    return { name: 'Belt 1', title: 'Programming Foundations', color: '#3B82F6' }
  }, [totalSolved])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-[#ED2A2B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Kalvi Learn Student Platform</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {displayName}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Continue your journey through 85 Belt problems and 10 curriculum modules. Test your algorithmic logic in the Practice Arena and hone your speed.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {nextProblem ? (
                <Link
                  to={`/practice/${nextProblem.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <span>Resume: {nextProblem.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/practice"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <span>Open Practice Arena</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-sm font-medium transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Curriculum</span>
              </Link>
            </div>
          </div>

          {/* Gamification Ring Banner */}
          <div className="flex-shrink-0 bg-neutral-800/60 backdrop-blur border border-neutral-700/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-neutral-700"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="#ED2A2B"
                  strokeWidth="8"
                  strokeDasharray={238.76}
                  strokeDashoffset={238.76 - (238.76 * overallPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold">{overallPercent}%</span>
                <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Done</span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div>
                <div className="text-xs text-neutral-400 font-medium">Current Status</div>
                <div className="text-lg font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{currentBelt.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-neutral-300">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-semibold">{userState.streak} Day Streak</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">{userState.xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold">Total Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">
            {totalSolved} <span className="text-xs text-neutral-400 font-normal">/ {totalProblems}</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            {totalProblems - totalSolved} challenges left
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold">Kalvi XP</span>
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{userState.xp}</div>
          <div className="text-[11px] text-neutral-500">+50 XP per passed problem</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold">Learning Streak</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{userState.streak} Days</div>
          <div className="text-[11px] text-neutral-500">Consistent daily practice</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold">Submissions</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{userState.submissions.length}</div>
          <div className="text-[11px] text-neutral-500">Evaluated in test runner</div>
        </div>
      </div>

      {/* Belt Progression Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">Belt Progression System</h2>
          <Link
            to="/practice"
            className="text-xs font-semibold text-[#ED2A2B] hover:underline flex items-center gap-1"
          >
            <span>View All Problems</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {beltSummaries.map((b) => (
            <div
              key={b.order}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-4 hover:border-neutral-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: b.color }}
                  >
                    B{b.order}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">{b.name}</h3>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">{b.title}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-full">
                  {b.solved} / {b.total}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Mastery</span>
                  <span className="font-semibold text-neutral-800">{b.percent}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${b.percent}%`,
                      backgroundColor: b.color,
                    }}
                  />
                </div>
              </div>

              <Link
                to={`/practice`}
                className="w-full py-2 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Explore Belt {b.order}</span>
                <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Quick Curriculum + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Curriculum Preview (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#ED2A2B]" />
              <h2 className="text-base font-bold text-neutral-900">Curriculum Modules</h2>
            </div>
            <Link to="/learn" className="text-xs font-semibold text-[#ED2A2B] hover:underline">
              See All (10)
            </Link>
          </div>

          <p className="text-xs text-neutral-500">
            From basic syntax to algorithmic problem solving. 89 structured learning units.
          </p>

          <div className="space-y-2.5 divide-y divide-neutral-100">
            {curriculumData.slice(0, 4).map((mod: { order: number; title: string; learningUnits: unknown[] }) => (
              <div key={mod.order} className="pt-2.5 first:pt-0 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-800">
                    Module {mod.order}: {mod.title}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {mod.learningUnits.length} Learning Units
                  </div>
                </div>
                <Link
                  to="/learn"
                  className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md transition-colors"
                >
                  Read
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions Feed (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <h2 className="text-base font-bold text-neutral-900">Recent Activity</h2>
            </div>
            <Link to="/revise" className="text-xs font-semibold text-[#ED2A2B] hover:underline">
              Solution Vault
            </Link>
          </div>

          {userState.submissions.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Code2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-neutral-500">
                No submissions logged yet. Start solving problems to see your history!
              </p>
              <Link
                to="/practice"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
              >
                <span>Start Practice</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 text-xs">
              {userState.submissions.slice(0, 5).map((sub) => (
                <div key={sub.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {sub.status === 'PASSED' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-neutral-900 truncate">
                        {sub.problemTitle}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {sub.language.toUpperCase()} • {sub.executionTimeMs}ms • {sub.passedTests}/{sub.totalTests} tests
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/practice/${sub.problemSlug}`}
                    className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-md transition-colors flex-shrink-0"
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
