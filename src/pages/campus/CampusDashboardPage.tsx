import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  Building2,
  Users,
  GraduationCap,
  Activity,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Zap,
  ChevronRight,
  Target,
  BarChart3,
  Loader2,
} from 'lucide-react'
import {
  fetchCampusOverviewMetrics,
  fetchCampusMentors,
  fetchCampusStudents,
  fetchRecentCampusSubmissions,
  subscribeToCampusUpdates,
  invalidateCampusCache,
  CAMPUS_BELT_DEFINITIONS,
  type CampusOverviewMetrics,
  type CampusMentorStat,
  type CampusStudentStat,
  type CampusSubmissionItem,
} from '@/lib/campusManagerService'

export const CampusDashboardPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [metrics, setMetrics] = useState<CampusOverviewMetrics | null>(null)
  const [mentors, setMentors] = useState<CampusMentorStat[]>([])
  const [students, setStudents] = useState<CampusStudentStat[]>([])
  const [recentSubs, setRecentSubs] = useState<CampusSubmissionItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Enforce role safety: only CAMPUS_MANAGER users
  useEffect(() => {
    if (!authLoading && user && user.role !== 'CAMPUS_MANAGER') {
      navigate(user.role === 'MENTOR' ? '/mentor' : '/dashboard', { replace: true })
    }
  }, [authLoading, user, navigate])

  // Derive manager display name strictly from authenticated account data
  const managerName =
    user?.name?.trim() ||
    (user?.email
      ? user.email
          .split('@')[0]
          .split(/[._-]/)
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      : '')

  const loadData = async (showRefresh = false) => {
    if (user && user.role !== 'CAMPUS_MANAGER') return

    if (showRefresh) setRefreshing(true)
    else setIsLoading(true)
    try {
      const [overviewData, mentorData, studentData, subsData] = await Promise.all([
        fetchCampusOverviewMetrics(),
        fetchCampusMentors(),
        fetchCampusStudents(),
        fetchRecentCampusSubmissions(8),
      ])
      setMetrics(overviewData)
      setMentors(mentorData)
      setStudents(studentData)
      setRecentSubs(subsData)
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    document.title = 'Campus Dashboard — KalviLearn'
    loadData()
    const unsubscribe = subscribeToCampusUpdates(() => {
      loadData(false)
    })
    return () => unsubscribe()
  }, [user?.role])

  // Derived statistics: distribution of students across all 10 curriculum belts
  const beltCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const b of CAMPUS_BELT_DEFINITIONS) {
      counts[b.name] = 0
    }
    for (const s of students) {
      if (counts[s.belt] !== undefined) {
        counts[s.belt]++
      } else {
        const matched = CAMPUS_BELT_DEFINITIONS.find((b) => b.name === s.belt || b.title === s.belt)
        if (matched) {
          counts[matched.name]++
        } else {
          counts['Belt 1']++
        }
      }
    }
    return counts
  }, [students])

  const strugglingCount = students.filter((s) => s.status === 'STRUGGLING').length
  const activeCount = students.filter((s) => s.status === 'ACTIVE').length
  const inactiveCount = students.filter((s) => s.status === 'INACTIVE').length

  const parseBeltOrder = (beltStr?: string) => Number(beltStr?.replace(/\D/g, '')) || 1
  const belt1Pct = students.length > 0 ? Math.round((students.filter(s => parseBeltOrder(s.belt) >= 1).length / students.length) * 100) : 0
  const belt2Pct = students.length > 0 ? Math.round((students.filter(s => parseBeltOrder(s.belt) >= 2).length / students.length) * 100) : 0
  const belt3Pct = students.length > 0 ? Math.round((students.filter(s => parseBeltOrder(s.belt) >= 3).length / students.length) * 100) : 0

  const totalAssignedStudents = mentors.reduce((acc, m) => acc + m.totalStudents, 0)
  const totalMentorCapacity = mentors.reduce((acc, m) => acc + m.maxStudents, 0)
  const mentorCapacityPercent = totalMentorCapacity > 0
    ? Math.round((totalAssignedStudents / totalMentorCapacity) * 100)
    : 0

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-xs">
            <Loader2 className="w-3.5 h-3.5 text-[#ED2A2B] animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-neutral-800">Loading Campus Overview</p>
          <p className="text-xs text-neutral-500 mt-0.5">Aggregating real-time telemetry across cohorts...</p>
        </div>
      </div>
    )
  }

  const totalStudents = metrics?.totalStudents ?? students.length
  const passRate = metrics?.campusPassRate ?? 0
  const totalXp = metrics?.totalXpDistributed ?? 0
  const avgSolved = metrics?.avgProblemsSolved ?? 0
  const totalSubmissions = metrics?.totalSubmissions ?? 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">

      {/* ── WELCOME HERO BANNER (Kalvi Learn Design System) ───────────────── */}
      <section
        aria-label="Campus Welcome Banner"
        className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800 relative overflow-hidden"
      >
        {/* Subtle Kalvi red ambient glow on top-right */}
        <div
          className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-[#ED2A2B]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>Kalvi Learn Campus Management</span>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white break-words">
                {authLoading ? (
                  <span className="inline-flex items-center gap-1 text-neutral-300">
                    Welcome back<span className="animate-pulse">...</span>
                  </span>
                ) : managerName ? (
                  `Welcome back, ${managerName}`
                ) : (
                  'Welcome back'
                )}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-neutral-400">
                Campus Management Dashboard
              </p>
            </div>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Real-time telemetry across faculty guidance, student problem solving, authoritative 10-test-case evaluations, and curriculum velocity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/campus/mentors"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-sm font-semibold shadow-sm transition-all interactive-btn hover:shadow-lg hover:shadow-red-600/25"
              >
                <span>Manage Mentors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  invalidateCampusCache()
                  loadData(true)
                }}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-sm font-medium transition-all interactive-btn disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>

          {/* Right-side SVG Circular telemetry card */}
          <div className="flex-shrink-0 bg-neutral-800/60 backdrop-blur border border-neutral-700/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6 interactive-card hover:border-neutral-600">
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
                  strokeDashoffset={238.76 - (238.76 * Math.min(100, Math.max(0, passRate))) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold">{passRate}%</span>
                <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Pass</span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div>
                <div className="text-xs text-neutral-400 font-medium">Campus Benchmark</div>
                <div className="text-lg font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                  <Target className="w-4 h-4 text-emerald-400 animate-pulse-subtle" />
                  <span>Target Exceeded</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-neutral-300">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">{totalStudents} Students</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold">{mentors.length} Mentors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KPI METRIC CARDS (Clean White Style) ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Card 1: Total Students */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 interactive-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Total Students
            </span>
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {totalStudents}
            </div>
            <div className="text-xs font-semibold text-neutral-500 mt-1">
              Enrolled across {mentors.length} faculty cohorts
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Active Engagement</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {activeCount} Active
            </span>
          </div>
        </div>

        {/* Card 2: Faculty Mentors */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 interactive-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Faculty Mentors
            </span>
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {mentors.length}
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Capacity Utilization</span>
            <span className="text-purple-600 font-semibold flex items-center gap-1">
              {mentorCapacityPercent}% Full
            </span>
          </div>
        </div>

        {/* Card 3: Campus Pass Rate */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 interactive-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Campus Pass Rate
            </span>
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {passRate}%
            </div>
            <div className="text-xs font-semibold text-neutral-500 mt-1">
              10-test-case authoritative evaluations
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Evaluations</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {totalSubmissions} Submissions
            </span>
          </div>
        </div>

        {/* Card 4: Total XP Earned */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 interactive-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Total XP Earned
            </span>
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {totalXp.toLocaleString()}
            </div>
            <div className="text-xs font-semibold text-neutral-500 mt-1">
              Avg {avgSolved} problems / student
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Reward Velocity</span>
            <span className="text-amber-600 font-semibold">{metrics?.rewardVelocity ?? 50} XP / solve</span>
          </div>
        </div>
      </div>

      {/* ── MID ROW: Student Stats + Mentor Stats ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Student Statistics */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <Users className="w-4.5 h-4.5 text-neutral-700" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-neutral-900">Student Statistics</h2>
                  <p className="text-[11px] text-neutral-500">{students.length} total students enrolled</p>
                </div>
              </div>
              <Link
                to="/campus/students"
                className="text-[11px] font-bold text-[#ED2A2B] hover:text-red-700 inline-flex items-center gap-1 transition-colors"
              >
                <span>View Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Belt Distribution */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Curriculum Belt Distribution
                </p>
                <span className="text-[10px] font-semibold text-neutral-400">
                  10 Belts
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
                {CAMPUS_BELT_DEFINITIONS.map((b) => {
                  const count = beltCounts[b.name] || 0
                  return (
                    <div
                      key={b.name}
                      className="rounded-2xl bg-neutral-50 border border-neutral-200/70 p-3 text-center group hover:bg-neutral-100/60 transition-colors"
                      title={`${b.name} (${b.title}): ${b.description}`}
                    >
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-white font-black text-xs flex items-center justify-center mx-auto mb-2 shadow-2xs"
                        style={{ backgroundColor: b.color }}
                      >
                        {b.badge}
                      </div>
                      <p className="text-xl sm:text-2xl font-extrabold text-neutral-900">{count}</p>
                      <p className="text-[10px] font-semibold text-neutral-500 mt-0.5 truncate" title={b.title}>
                        {b.title}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Engagement Health Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Engagement Health</p>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />{activeCount} Active
                  </span>
                  <span className="flex items-center gap-1 text-amber-700">
                    <span className="w-2 h-2 bg-amber-400 rounded-full" />{strugglingCount} At Risk
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <span className="w-2 h-2 bg-neutral-300 rounded-full" />{inactiveCount} Inactive
                  </span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${(activeCount / Math.max(1, students.length)) * 100}%` }}
                  className="bg-emerald-500 h-full transition-all"
                />
                <div
                  style={{ width: `${(strugglingCount / Math.max(1, students.length)) * 100}%` }}
                  className="bg-amber-400 h-full transition-all"
                />
                <div
                  style={{ width: `${(inactiveCount / Math.max(1, students.length)) * 100}%` }}
                  className="bg-neutral-300 h-full transition-all"
                />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1.5 font-mono">
                <span>{Math.round((activeCount / Math.max(1, students.length)) * 100)}% healthy</span>
                <span>{students.length} total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Statistics */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <Building2 className="w-4.5 h-4.5 text-neutral-700" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-neutral-900">Mentor Statistics</h2>
                  <p className="text-[11px] text-neutral-500">{mentors.length} active faculty cohorts</p>
                </div>
              </div>
              <Link
                to="/campus/mentors"
                className="text-[11px] font-bold text-[#ED2A2B] hover:text-red-700 inline-flex items-center gap-1 transition-colors"
              >
                <span>Manage Roster</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Assigned Students Cohort */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-neutral-800 block">Total Guided Students</span>
                <p className="text-[11px] text-neutral-500 mt-0.5">Assigned across {mentors.length} active mentors</p>
              </div>
              <span className="text-xl font-extrabold text-neutral-900 font-mono">
                {totalAssignedStudents} <span className="text-xs font-medium text-neutral-500">students</span>
              </span>
            </div>

            {/* Mentor quick list */}
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">Active Faculty Mentors</p>
              <div className="space-y-1.5">
                {mentors.slice(0, 4).map((m) => (
                  <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-neutral-900 truncate">{m.name}</p>
                      <p className="text-[11px] font-semibold text-neutral-500 font-mono mt-0.5">
                        {m.totalStudents} {m.totalStudents === 1 ? 'student' : 'students'}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: Live Feed + Performance ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Live Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                <Activity className="w-4.5 h-4.5 text-neutral-700" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-900">Live Learning Activity</h2>
                <p className="text-[11px] text-neutral-500">Real-time code submissions from students</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentSubs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2">
                <Activity className="w-8 h-8 text-neutral-300" />
                <p className="text-sm font-semibold text-neutral-500">No recent submissions</p>
                <p className="text-xs text-neutral-400">Activity will appear here as students submit solutions</p>
              </div>
            ) : recentSubs.map((sub) => (
              <div key={sub.id} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-neutral-50/80 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {sub.status === 'PASSED' ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-4 h-4 text-[#ED2A2B]" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-neutral-900 truncate">
                      {sub.studentName}
                      <span className="font-normal text-neutral-400"> — </span>
                      <span className="font-semibold text-neutral-700">{sub.problemTitle}</span>
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono truncate">{sub.studentEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[10px] font-bold uppercase bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-mono">
                    {sub.language}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    sub.passedTests === sub.totalTests
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : sub.passedTests > 0
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {sub.passedTests}/{sub.totalTests}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                <TrendingUp className="w-4.5 h-4.5 text-neutral-700" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-900">Performance Overview</h2>
                <p className="text-[11px] text-neutral-500">Curriculum progression metrics</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Belt Progress Bars */}
            <div className="space-y-4">
              {[
                { label: 'Belt 1: Programming Foundations', pct: belt1Pct, color: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border border-blue-200' },
                { label: 'Belt 2: Core Data Structures', pct: belt2Pct, color: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
                { label: 'Belt 3: Advanced Algorithms', pct: belt3Pct, color: 'bg-[#ED2A2B]', badge: 'bg-red-50 text-red-700 border border-red-200' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-neutral-700">{item.label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badge}`}>
                      {item.pct}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Links */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Quick Access</p>
              <Link
                to="/campus/mentor-leaderboard"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200/80 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700 group-hover:text-neutral-900">Mentor Leaderboard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
              </Link>
              <Link
                to="/campus/student-leaderboard"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200/80 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-700" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700 group-hover:text-neutral-900">Student Leaderboard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
export default CampusDashboardPage
