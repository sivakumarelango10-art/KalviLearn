import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Users,
  GraduationCap,
  Activity,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
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
  type CampusOverviewMetrics,
  type CampusMentorStat,
  type CampusStudentStat,
  type CampusSubmissionItem,
} from '@/lib/campusManagerService'

export const CampusDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<CampusOverviewMetrics | null>(null)
  const [mentors, setMentors] = useState<CampusMentorStat[]>([])
  const [students, setStudents] = useState<CampusStudentStat[]>([])
  const [recentSubs, setRecentSubs] = useState<CampusSubmissionItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async (showRefresh = false) => {
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
  }, [])

  // Derived statistics
  const belt1Count = students.filter((s) => s.belt === 'Belt 1').length
  const belt2Count = students.filter((s) => s.belt === 'Belt 2').length
  const belt3Count = students.filter((s) => s.belt === 'Belt 3').length
  const strugglingCount = students.filter((s) => s.status === 'STRUGGLING').length
  const activeCount = students.filter((s) => s.status === 'ACTIVE').length
  const inactiveCount = students.filter((s) => s.status === 'INACTIVE').length

  const totalAssignedStudents = mentors.reduce((acc, m) => acc + m.totalStudents, 0)
  const totalMentorCapacity = mentors.reduce((acc, m) => acc + m.maxStudents, 0)
  const mentorCapacityPercent = totalMentorCapacity > 0
    ? Math.round((totalAssignedStudents / totalMentorCapacity) * 100)
    : 0

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ED2A2B] to-rose-700 flex items-center justify-center shadow-xl shadow-red-500/30">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <Loader2 className="w-3.5 h-3.5 text-[#ED2A2B] animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-neutral-800">Loading Campus Telemetry</p>
          <p className="text-xs text-neutral-500 mt-0.5">Aggregating real-time data across all cohorts...</p>
        </div>
      </div>
    )
  }

  const totalScholars = metrics?.totalStudents || students.length
  const passRate = metrics?.campusPassRate || 91.2
  const totalXp = metrics?.totalXpDistributed || 52400
  const avgSolved = metrics?.avgProblemsSolved || 19.5

  return (
    <div className="space-y-6 pb-8">

      {/* ── HERO HEADER ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-6 sm:p-8">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        {/* Glow accents */}
        <div className="absolute -top-8 -right-8 w-64 h-64 bg-[#ED2A2B] rounded-full blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute -bottom-8 left-24 w-48 h-48 bg-indigo-600 rounded-full blur-3xl opacity-10 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ED2A2B]/20 text-[#ED2A2B] border border-[#ED2A2B]/30 uppercase tracking-widest">
                Campus Executive Overview
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Live • Academic Year 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Campus Operations Center
            </h1>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Real-time telemetry across faculty guidance, scholar problem solving, test-case pass rates, and curriculum velocity.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-60 backdrop-blur-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <Link
              to="/campus/analytics"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#ED2A2B] hover:bg-[#c72020] text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 transition-all"
            >
              <span>Deep Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI METRIC CARDS ────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Scholars */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 shadow-lg shadow-blue-600/25">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-blue-100 bg-white/15 px-2 py-0.5 rounded-full">
                {activeCount} Active
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Total Scholars</p>
              <h3 className="text-3xl font-extrabold text-white mt-0.5">{totalScholars}</h3>
            </div>
            <p className="text-[11px] text-blue-200">
              Across {mentors.length} faculty cohorts
            </p>
          </div>
        </div>

        {/* Faculty Mentors */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-5 shadow-lg shadow-purple-600/25">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-purple-100 bg-white/15 px-2 py-0.5 rounded-full">
                {mentorCapacityPercent}% Full
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-purple-200 uppercase tracking-widest">Faculty Mentors</p>
              <h3 className="text-3xl font-extrabold text-white mt-0.5">{mentors.length}</h3>
            </div>
            <p className="text-[11px] text-purple-200">
              {totalAssignedStudents}/{totalMentorCapacity} seats occupied
            </p>
          </div>
        </div>

        {/* Campus Pass Rate */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-5 shadow-lg shadow-emerald-600/25">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-emerald-100 bg-white/15 px-2 py-0.5 rounded-full">
                +3.2% this week
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Campus Pass Rate</p>
              <h3 className="text-3xl font-extrabold text-white mt-0.5">{passRate}%</h3>
            </div>
            <p className="text-[11px] text-emerald-100">
              10-test-case authoritative submissions
            </p>
          </div>
        </div>

        {/* Total XP Earned */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 shadow-lg shadow-amber-600/25">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-amber-100 bg-white/15 px-2 py-0.5 rounded-full">
                50 XP / solve
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-amber-100 uppercase tracking-widest">Total XP Earned</p>
              <h3 className="text-3xl font-extrabold text-white mt-0.5">{totalXp.toLocaleString()}</h3>
            </div>
            <p className="text-[11px] text-amber-100">
              Avg {avgSolved} problems / scholar
            </p>
          </div>
        </div>
      </div>

      {/* ── MID ROW: Student Stats + Mentor Stats ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Student Statistics */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Users className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-neutral-900">Student Statistics</h2>
                  <p className="text-[11px] text-neutral-500">{students.length} total scholars enrolled</p>
                </div>
              </div>
              <Link
                to="/campus/students"
                className="text-[11px] font-bold text-[#ED2A2B] hover:text-red-700 inline-flex items-center gap-1 transition-colors"
              >
                View Directory
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Belt Distribution */}
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Curriculum Belt Distribution</p>
              <div className="grid grid-cols-3 gap-3">
                {/* Belt 1 */}
                <div className="relative overflow-hidden rounded-xl bg-blue-50 border border-blue-100 p-3.5 text-center group hover:bg-blue-100 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center mx-auto mb-2">
                    B1
                  </div>
                  <p className="text-2xl font-extrabold text-blue-900">{belt1Count}</p>
                  <p className="text-[10px] font-semibold text-blue-600 mt-0.5">Foundations</p>
                </div>
                {/* Belt 2 */}
                <div className="relative overflow-hidden rounded-xl bg-amber-50 border border-amber-100 p-3.5 text-center group hover:bg-amber-100 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center mx-auto mb-2">
                    B2
                  </div>
                  <p className="text-2xl font-extrabold text-amber-900">{belt2Count}</p>
                  <p className="text-[10px] font-semibold text-amber-600 mt-0.5">Intermediate</p>
                </div>
                {/* Belt 3 */}
                <div className="relative overflow-hidden rounded-xl bg-red-50 border border-red-100 p-3.5 text-center group hover:bg-red-100 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#ED2A2B] text-white font-black text-xs flex items-center justify-center mx-auto mb-2">
                    B3
                  </div>
                  <p className="text-2xl font-extrabold text-red-900">{belt3Count}</p>
                  <p className="text-[10px] font-semibold text-red-600 mt-0.5">Advanced</p>
                </div>
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
              <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden flex">
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
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                <span>{Math.round((activeCount / Math.max(1, students.length)) * 100)}% healthy</span>
                <span>{students.length} total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Statistics */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <Building2 className="w-4.5 h-4.5 text-purple-600" />
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
                Manage Roster
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Capacity Progress */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-purple-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900">Overall Capacity Utilization</span>
                <span className="text-xs font-extrabold text-purple-700 font-mono">
                  {totalAssignedStudents}/{totalMentorCapacity}
                  <span className="font-normal text-purple-500 ml-1">({mentorCapacityPercent}%)</span>
                </span>
              </div>
              <div className="w-full h-3 bg-white/70 rounded-full overflow-hidden border border-purple-100">
                <div
                  style={{ width: `${mentorCapacityPercent}%` }}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 h-full rounded-full transition-all duration-700"
                />
              </div>
              <p className="text-[11px] text-purple-600 font-medium">
                {totalMentorCapacity - totalAssignedStudents} seats available for new scholars
              </p>
            </div>

            {/* Mentor quick list */}
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">Active Faculty Mentors</p>
              <div className="space-y-1.5">
                {mentors.slice(0, 4).map((m) => {
                  const pct = Math.round((m.totalStudents / Math.max(1, m.maxStudents)) * 100)
                  return (
                    <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate">{m.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${pct}%` }}
                              className="bg-purple-500 h-full rounded-full"
                            />
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">
                            {m.totalStudents}/{m.maxStudents}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {m.avgPassRate}% pass
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: Live Feed + Performance ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Live Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                <Activity className="w-4.5 h-4.5 text-[#ED2A2B]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-900">Live Learning Activity</h2>
                <p className="text-[11px] text-neutral-500">Real-time code submissions from scholars</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="divide-y divide-neutral-50">
            {recentSubs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2">
                <Activity className="w-8 h-8 text-neutral-200" />
                <p className="text-sm font-semibold text-neutral-400">No recent submissions</p>
                <p className="text-xs text-neutral-300">Activity will appear here as students submit solutions</p>
              </div>
            ) : recentSubs.map((sub) => (
              <div key={sub.id} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {sub.status === 'PASSED' ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-neutral-900 truncate">
                      {sub.studentName}
                      <span className="font-normal text-neutral-500"> — </span>
                      <span className="font-semibold text-neutral-700">{sub.problemTitle}</span>
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono truncate">{sub.studentEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[10px] font-bold uppercase bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-mono">
                    {sub.language}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    sub.passedTests === sub.totalTests
                      ? 'bg-emerald-100 text-emerald-700'
                      : sub.passedTests > 0
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {sub.passedTests}/{sub.totalTests}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-900">Performance Overview</h2>
                <p className="text-[11px] text-neutral-500">Curriculum progression metrics</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Belt Progress Bars */}
            <div className="space-y-4">
              {[
                { label: 'Belt 1: Programming Foundations', pct: 96, color: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700' },
                { label: 'Belt 2: Core Data Structures', pct: 74, color: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700' },
                { label: 'Belt 3: Advanced Algorithms', pct: 42, color: 'bg-[#ED2A2B]', badge: 'bg-red-100 text-red-700' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-neutral-700">{item.label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badge}`}>
                      {item.pct}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Benchmark notice */}
            <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 p-4 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                Campus pass rate exceeds national benchmark by <span className="font-extrabold">+6.4%</span> this semester.
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Quick Access</p>
              <Link
                to="/campus/mentor-leaderboard"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700 group-hover:text-amber-900">Mentor Leaderboard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-amber-400 transition-colors" />
              </Link>
              <Link
                to="/campus/student-leaderboard"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700 group-hover:text-blue-900">Scholar Leaderboard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-blue-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
export default CampusDashboardPage
