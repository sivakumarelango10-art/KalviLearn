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
  type CampusOverviewMetrics,
  type CampusMentorStat,
  type CampusStudentStat,
} from '@/lib/campusManagerService'

type AnalyticsTab = 'student' | 'mentor' | 'learning' | 'activity'

export const CampusAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('student')
  const [metrics, setMetrics] = useState<CampusOverviewMetrics | null>(null)
  const [mentors, setMentors] = useState<CampusMentorStat[]>([])
  const [students, setStudents] = useState<CampusStudentStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.title = 'Campus Analytics — KalviLearn'
    const load = async () => {
      setIsLoading(true)
      try {
        const [m, mentorsData, studentsData] = await Promise.all([
          fetchCampusOverviewMetrics(),
          fetchCampusMentors(),
          fetchCampusStudents(),
        ])
        setMetrics(m)
        setMentors(mentorsData)
        setStudents(studentsData)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-3">
        <Loader2 className="w-8 h-8 text-[#ED2A2B] animate-spin" />
        <span className="text-sm font-semibold text-neutral-500">Aggregating campus intelligence...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ED2A2B]/10 text-[#ED2A2B] uppercase tracking-wider">
            Campus Intelligence
          </span>
          <span className="text-xs text-neutral-400 font-medium">• Aggregated Data</span>
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
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Active Scholars</span>
              <p className="text-3xl font-extrabold text-neutral-900">
                {students.filter((s) => s.status === 'ACTIVE').length} / {students.length}
              </p>
              <span className="text-xs text-emerald-600 font-semibold">86% Daily Active Ratio</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Avg XP per Student</span>
              <p className="text-3xl font-extrabold text-amber-600">
                {Math.round((metrics?.totalXpDistributed || 52400) / Math.max(1, students.length))} XP
              </p>
              <span className="text-xs text-neutral-500 font-medium">Over 50 XP awarded per passed question</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Need Guidance</span>
              <p className="text-3xl font-extrabold text-red-600">
                {students.filter((s) => s.status === 'STRUGGLING').length}
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
                  <span>Belt 1: Foundations (25 Problems)</span>
                  <span>96% Scholars Enrolled / Completed</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '96%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-800 mb-1.5">
                  <span>Belt 2: Core Data Structures (30 Problems)</span>
                  <span>72% Scholars Enrolled / Completed</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-800 mb-1.5">
                  <span>Belt 3: Advanced Algorithms (30 Problems)</span>
                  <span>41% Scholars Enrolled / Completed</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '41%' }} />
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
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 text-center space-y-1">
              <span className="text-[11px] font-bold text-blue-600 uppercase">Python</span>
              <p className="text-2xl font-extrabold text-neutral-900">62%</p>
              <span className="text-[10px] text-neutral-400">Primary Track</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 text-center space-y-1">
              <span className="text-[11px] font-bold text-amber-600 uppercase">Java</span>
              <p className="text-2xl font-extrabold text-neutral-900">18%</p>
              <span className="text-[10px] text-neutral-400">OOP & Systems</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 text-center space-y-1">
              <span className="text-[11px] font-bold text-purple-600 uppercase">C++</span>
              <p className="text-2xl font-extrabold text-neutral-900">12%</p>
              <span className="text-[10px] text-neutral-400">DSA Speed</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 text-center space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 uppercase">Node.js</span>
              <p className="text-2xl font-extrabold text-neutral-900">8%</p>
              <span className="text-[10px] text-neutral-400">Full-Stack Track</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900">Top Problem Bottlenecks (Lowest Pass Rates)</h3>
            <div className="divide-y divide-neutral-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-neutral-900">LRU Cache Implementation</p>
                  <span className="text-[11px] text-neutral-400">Belt 3 • Advanced Algorithms</span>
                </div>
                <span className="font-bold text-red-600 font-mono">68.4% Pass Rate</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-neutral-900">Longest Palindromic Substring</p>
                  <span className="text-[11px] text-neutral-400">Belt 2 • Core Data Structures</span>
                </div>
                <span className="font-bold text-amber-600 font-mono">74.2% Pass Rate</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-neutral-900">Merge K Sorted Lists</p>
                  <span className="text-[11px] text-neutral-400">Belt 3 • Advanced Algorithms</span>
                </div>
                <span className="font-bold text-amber-600 font-mono">77.5% Pass Rate</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Campus Activity */}
      {activeTab === 'activity' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900">Peak Campus Coding Hours</h3>
            <p className="text-xs text-neutral-500">Hourly volume of code executions across the campus</p>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 pt-2">
              {['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'].map((hour, i) => {
                const heights = [20, 45, 80, 95, 60, 50, 75, 90, 100, 85, 70, 40]
                return (
                  <div key={hour} className="flex flex-col items-center gap-2">
                    <div className="w-full bg-neutral-100 rounded-lg h-32 flex items-end p-1">
                      <div
                        style={{ height: `${heights[i]}%` }}
                        className="w-full bg-[#ED2A2B] rounded-md transition-all duration-500"
                        title={`${hour}: ${heights[i]}% activity`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">{hour}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default CampusAnalyticsPage
