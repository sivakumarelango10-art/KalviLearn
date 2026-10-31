import React, { useState, useEffect } from 'react'
import {
  Users,
  GraduationCap,
  Code2,
  Activity,
  Loader2,
} from 'lucide-react'
import {
  fetchCampusOverviewMetrics,
  fetchCampusMentors,
  fetchCampusStudents,
  fetchCampusDetailedAnalytics,
  subscribeToCampusUpdates,
  type CampusOverviewMetrics,
  type CampusMentorStat,
  type CampusStudentStat,
  type CampusDetailedAnalytics,
} from '@/lib/campusManagerService'

type AnalyticsTab = 'student' | 'mentor' | 'learning' | 'activity'

export const CampusAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('student')
  const [metrics, setMetrics] = useState<CampusOverviewMetrics | null>(null)
  const [mentors, setMentors] = useState<CampusMentorStat[]>([])
  const [students, setStudents] = useState<CampusStudentStat[]>([])
  const [detailed, setDetailed] = useState<CampusDetailedAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.title = 'Campus Analytics — KalviLearn'
    let isMounted = true

    const load = async () => {
      try {
        const [m, mentorsData, studentsData, detailedData] = await Promise.all([
          fetchCampusOverviewMetrics(),
          fetchCampusMentors(),
          fetchCampusStudents(),
          fetchCampusDetailedAnalytics(),
        ])
        if (isMounted) {
          setMetrics(m)
          setMentors(mentorsData)
          setStudents(studentsData)
          setDetailed(detailedData)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error loading analytics:', err)
        if (isMounted) setIsLoading(false)
      }
    }

    load()

    // 100% Live real-time database update subscription
    const unsubscribe = subscribeToCampusUpdates(() => {
      load()
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-3">
        <Loader2 className="w-8 h-8 text-[#ED2A2B] animate-spin" />
        <span className="text-sm font-semibold text-neutral-500">Aggregating campus intelligence...</span>
      </div>
    )
  }

  const activeStudentsCount = students.filter((s) => s.status === 'ACTIVE').length
  const strugglingStudentsCount = students.filter((s) => s.status === 'STRUGGLING').length
  const avgXpPerStudent = Math.round((metrics?.totalXpDistributed ?? 0) / Math.max(1, students.length))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ED2A2B]/10 text-[#ED2A2B] uppercase tracking-wider">
            Campus Intelligence
          </span>
          <span className="text-xs text-neutral-400 font-medium">• Live Telemetry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Campus Analytics Hub
        </h1>
        <p className="text-sm text-neutral-500 max-w-2xl">
          Deep telemetry into student progression velocity, mentor effectiveness, programming language adoption, and campus-wide submission patterns.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-px overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('student')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'student'
              ? 'border-[#ED2A2B] text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Student Analytics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mentor')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'mentor'
              ? 'border-[#ED2A2B] text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Mentor Analytics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('learning')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'learning'
              ? 'border-[#ED2A2B] text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Learning Analytics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('activity')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'activity'
              ? 'border-[#ED2A2B] text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Campus Activity</span>
        </button>
      </div>

      {/* Tab 1: Student Analytics */}
      {activeTab === 'student' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Active Students</span>
              <p className="text-3xl font-extrabold text-neutral-900">
                {activeStudentsCount} / {students.length}
              </p>
              <span className="text-xs text-emerald-600 font-semibold">{detailed?.dailyActiveRatio ?? 0}% Daily Active Ratio</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Avg XP per Student</span>
              <p className="text-3xl font-extrabold text-amber-600">
                {avgXpPerStudent} XP
              </p>
              <span className="text-xs text-neutral-500 font-medium">Over 50 XP awarded per passed question</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Need Guidance</span>
              <p className="text-3xl font-extrabold text-red-600">
                {strugglingStudentsCount}
              </p>
              <span className="text-xs text-neutral-500 font-medium">Flagged for mentor review</span>
            </div>
          </div>

          {/* Belt Progression Funnel */}
          <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-neutral-900">Curriculum Belt Progression Velocity</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-800 mb-1.5">
                  <span>Belt 1: Foundations</span>
                  <span>{detailed?.beltProgression.belt1Percent ?? 0}% Students Enrolled / Solved ({detailed?.beltProgression.belt1Enrolled ?? 0} students)</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${detailed?.beltProgression.belt1Percent ?? 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-800 mb-1.5">
                  <span>Belt 2: Core Data Structures</span>
                  <span>{detailed?.beltProgression.belt2Percent ?? 0}% Students Enrolled / Solved ({detailed?.beltProgression.belt2Enrolled ?? 0} students)</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${detailed?.beltProgression.belt2Percent ?? 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-800 mb-1.5">
                  <span>Belt 3: Advanced Algorithms</span>
                  <span>{detailed?.beltProgression.belt3Percent ?? 0}% Students Enrolled / Solved ({detailed?.beltProgression.belt3Enrolled ?? 0} students)</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${detailed?.beltProgression.belt3Percent ?? 0}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Mentor Analytics */}
      {activeTab === 'mentor' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900">Mentor Cohort Loads</h3>
                <span className="text-xs text-neutral-400 font-medium">{mentors.length} Mentors</span>
              </div>
              <div className="space-y-2">
                {mentors.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-2xl text-xs hover:bg-neutral-100/70 transition-colors"
                  >
                    <span className="font-semibold text-neutral-800">{m.name}</span>
                    <span className="font-bold text-neutral-900 font-mono bg-white px-3 py-1 rounded-xl border border-neutral-200/70 shadow-2xs">
                      {m.totalStudents} {m.totalStudents === 1 ? 'student' : 'students'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900">Mentor Guidance Status</h3>
                <span className="text-xs text-neutral-400 font-medium">Live Roster</span>
              </div>
              <div className="space-y-2">
                {mentors.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-2xl text-xs hover:bg-neutral-100/70 transition-colors">
                    <div>
                      <p className="font-semibold text-neutral-900">{m.name}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Learning Analytics */}
      {activeTab === 'learning' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(detailed?.languages || []).map((lang) => (
              <div key={lang.language} className="bg-white p-5 rounded-2xl border border-neutral-200/80 text-center space-y-1">
                <span className={`text-[11px] font-bold ${lang.color} uppercase`}>{lang.label}</span>
                <p className="text-2xl font-extrabold text-neutral-900">{lang.percentage}%</p>
                <span className="text-[10px] text-neutral-400 block">{lang.count} submissions • {lang.trackLabel}</span>
              </div>
            ))}
          </div>

          <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900">Top Problem Bottlenecks (Lowest Pass Rates)</h3>
              <span className="text-xs text-neutral-400 font-mono">Live Submissions</span>
            </div>
            {(!detailed?.bottlenecks || detailed.bottlenecks.length === 0) ? (
              <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-100">
                No problem bottlenecks recorded yet. As students submit code, pass rates will automatically rank here in real-time.
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 text-xs">
                {detailed.bottlenecks.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-neutral-900">{item.title}</p>
                      <span className="text-[11px] text-neutral-400">{item.belt} • {item.totalSubmissions} attempts</span>
                    </div>
                    <span className={`font-bold font-mono ${item.passRate < 70 ? 'text-red-600' : item.passRate < 85 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {item.passRate}% Pass Rate
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Campus Activity */}
      {activeTab === 'activity' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Peak Campus Coding Hours</h3>
                <p className="text-xs text-neutral-500">Hourly volume of code executions across the campus</p>
              </div>
              <span className="text-xs text-neutral-400 font-mono">Live Telemetry</span>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 pt-2">
              {(detailed?.hourlyActivity || []).map((h) => (
                <div key={h.hourLabel} className="flex flex-col items-center gap-2">
                  <div className="w-full bg-neutral-100 rounded-lg h-32 flex items-end p-1">
                    <div
                      style={{ height: `${h.percentage}%` }}
                      className="w-full bg-[#ED2A2B] rounded-md transition-all duration-500 hover:opacity-80"
                      title={`${h.hourLabel}: ${h.volume} submission${h.volume === 1 ? '' : 's'}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{h.hourLabel}</span>
                  <span className="text-[9px] font-mono font-bold text-neutral-400">{h.volume}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default CampusAnalyticsPage
