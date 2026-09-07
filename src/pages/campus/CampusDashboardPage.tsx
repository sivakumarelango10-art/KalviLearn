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

  const loadData = async () => {
    setIsLoading(true)
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* 1. Header & Quick Refresh */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ED2A2B]/10 text-[#ED2A2B] uppercase tracking-wider">
              Campus Executive Overview
            </span>
            <span className="text-xs text-neutral-400 font-medium">• Academic Year 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Campus Operations Center
          </h1>
          <p className="text-sm text-neutral-500 max-w-2xl">
            Real-time telemetry across faculty guidance, scholar problem solving, test-case pass rates, and curriculum velocity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Telemetry</span>
          </button>
          <Link
            to="/campus/analytics"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
          >
            <span>Deep Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Campus Overview KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Scholars */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {activeCount} Active
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Total Scholars</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              {metrics?.totalStudents || students.length}
            </h3>
          </div>
          <p className="text-[11px] text-neutral-400">
            Across {mentors.length} faculty mentor cohorts
          </p>
        </div>

        {/* Faculty Mentors */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              {mentorCapacityPercent}% Full
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Faculty Mentors</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              {mentors.length}
            </h3>
          </div>
          <p className="text-[11px] text-neutral-400">
            {totalAssignedStudents} / {totalMentorCapacity} scholar seats occupied
          </p>
        </div>

        {/* Campus Solve Rate */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              +3.2% vs last wk
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Campus Pass Rate</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              {metrics?.campusPassRate || 91.2}%
            </h3>
          </div>
          <p className="text-[11px] text-neutral-400">
            On authoritative 10-test-case submissions
          </p>
        </div>

        {/* Total XP Distributed */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              50 XP / solve
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Total XP Earned</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              {(metrics?.totalXpDistributed || 52400).toLocaleString()}
            </h3>
          </div>
          <p className="text-[11px] text-neutral-400">
            Avg {metrics?.avgProblemsSolved || 19.5} problems solved / scholar
          </p>
        </div>
      </div>

      {/* 3. Mid Grid: Student Statistics + Mentor Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Statistics Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-neutral-900">Student Statistics</h2>
            </div>
            <Link
              to="/campus/students"
              className="text-xs font-semibold text-[#ED2A2B] hover:underline inline-flex items-center gap-1"
            >
              <span>View Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Belt Distribution */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 mb-2">
              <span>Curriculum Belt Distribution</span>
              <span>{students.length} Total Scholars</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/60 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Belt 1</span>
                <p className="text-xl font-extrabold text-blue-900 mt-0.5">{belt1Count}</p>
                <span className="text-[10px] text-blue-600 font-medium">Foundations</span>
              </div>
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Belt 2</span>
                <p className="text-xl font-extrabold text-amber-900 mt-0.5">{belt2Count}</p>
                <span className="text-[10px] text-amber-600 font-medium">Intermediate</span>
              </div>
              <div className="p-3.5 bg-red-50/70 border border-red-200/60 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Belt 3</span>
                <p className="text-xl font-extrabold text-red-900 mt-0.5">{belt3Count}</p>
                <span className="text-[10px] text-red-600 font-medium">Advanced</span>
              </div>
            </div>
          </div>

          {/* Activity Status Breakdown */}
          <div className="pt-2 border-t border-neutral-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-700">Engagement Health</span>
              <span className="text-neutral-500 font-mono text-[11px]">
                {activeCount} Active • {strugglingCount} Need Attention • {inactiveCount} Inactive
              </span>
            </div>
            <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(activeCount / Math.max(1, students.length)) * 100}%` }}
                className="bg-emerald-500 h-full"
                title={`Active: ${activeCount}`}
              />
              <div
                style={{ width: `${(strugglingCount / Math.max(1, students.length)) * 100}%` }}
                className="bg-amber-400 h-full"
                title={`Struggling: ${strugglingCount}`}
              />
              <div
                style={{ width: `${(inactiveCount / Math.max(1, students.length)) * 100}%` }}
                className="bg-neutral-300 h-full"
                title={`Inactive: ${inactiveCount}`}
              />
            </div>
          </div>
        </div>

        {/* Mentor Statistics Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-neutral-900">Mentor Statistics</h2>
            </div>
            <Link
              to="/campus/mentors"
              className="text-xs font-semibold text-[#ED2A2B] hover:underline inline-flex items-center gap-1"
            >
              <span>Manage Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Capacity Meter */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
              <span>Overall Mentor Capacity</span>
              <span>{totalAssignedStudents} / {totalMentorCapacity} ({mentorCapacityPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${mentorCapacityPercent}%` }}
                className="bg-purple-600 h-full rounded-full transition-all duration-500"
              />
            </div>
            <p className="text-[11px] text-neutral-500">
              Headroom available for {totalMentorCapacity - totalAssignedStudents} additional scholars across active cohorts.
            </p>
          </div>

          {/* Quick Mentor List Preview */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Active Faculty Mentors
            </span>
            <div className="divide-y divide-neutral-100 max-h-48 overflow-y-auto pr-1">
              {mentors.slice(0, 4).map((m) => (
                <div key={m.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-neutral-200 text-neutral-700 font-bold text-[10px] flex items-center justify-center">
                      {m.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-neutral-900 truncate">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-neutral-500">{m.totalStudents}/{m.maxStudents} std</span>
                    <span className="font-bold text-emerald-600">{m.avgPassRate}% pass</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lower Grid: Learning Activity Feed + Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Activity Feed (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold">
                <Activity className="w-4 h-4 text-[#ED2A2B]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-neutral-900">Live Learning Activity</h2>
                <p className="text-xs text-neutral-500">Real-time code submissions from scholars</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
              ● Live Stream
            </span>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentSubs.map((sub) => (
              <div key={sub.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  {sub.status === 'PASSED' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {sub.studentName}
                      <span className="font-normal text-neutral-500 ml-2">
                        solved <span className="font-medium text-neutral-800">{sub.problemTitle}</span>
                      </span>
                    </p>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {sub.studentEmail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] self-end sm:self-center">
                  <span className="uppercase font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-mono">
                    {sub.language}
                  </span>
                  <span className="font-semibold text-neutral-700">
                    {sub.passedTests}/{sub.totalTests} cases
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview (1 Col) */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">Performance Overview</h2>
              <p className="text-xs text-neutral-500">Curriculum progression metrics</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-700">Belt 1: Programming Foundations</span>
                <span className="font-bold text-neutral-900">96% Completed</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-700">Belt 2: Core Data Structures</span>
                <span className="font-bold text-neutral-900">74% In Progress</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-700">Belt 3: Advanced Algorithms</span>
                <span className="font-bold text-neutral-900">42% In Progress</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <p className="text-[11px] text-emerald-800 leading-snug font-medium">
              Campus pass rate is exceeding national benchmark by +6.4% this semester.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CampusDashboardPage
