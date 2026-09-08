import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Users,
  Flame,
  Search,
  TrendingUp,
  CheckCircle2,
  X,
  Award,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { MentorWelcomeHero } from '@/components/mentor/MentorWelcomeHero'
import {
  MentorStudent,
  fetchMentorRoster,
  subscribeToMentorUpdates,
} from '@/lib/mentorService'

export const MentorDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const mentorDisplayName =
    user?.name || (user?.email ? user.email.split('@')[0].replace(/\./g, ' ') : 'Faculty Mentor')

  const cacheKey = `kalvi_roster_${user?.id || user?.email || 'default'}`
  const [students, setStudents] = useState<MentorStudent[]>(() => {
    try {
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {}
    return []
  })
  const [isLoading, setIsLoading] = useState(() => students.length === 0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBeltFilter, setSelectedBeltFilter] = useState<'all' | 'Belt 1' | 'Belt 2' | 'Belt 3' | 'attention'>('all')
  const [selectedStudent, setSelectedStudent] = useState<MentorStudent | null>(null)

  // Keyboard shortcut (Escape) to close modal and body scroll lock
  useEffect(() => {
    if (!selectedStudent) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedStudent(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedStudent])

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const data = await fetchMentorRoster(user?.id || user?.email)
        if (isMounted) {
          setStudents(data)
          setIsLoading(false)
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(data))
          } catch {}
        }
      } catch (err) {
        console.error('Error loading mentor cohort:', err)
        if (isMounted) setIsLoading(false)
      }
    }

    loadData()

    // Real-time live update subscription
    const unsubscribe = subscribeToMentorUpdates(() => {
      loadData()
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [user?.id, user?.email])

  // Real mentor cohort telemetry computed directly from real database state
  const totalStudents = students.length
  const activeStudents = students.filter((student) => !student.needsAttention).length
  const attentionCount = students.filter((student) => student.needsAttention).length
  const cohortMasteryPercent = totalStudents > 0
    ? Math.round(students.reduce((accumulator, student) => accumulator + student.progressPercent, 0) / totalStudents)
    : 0

  // Filtered student list
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const studentName = (student.name || '').toLowerCase()
      const studentEmail = (student.email || '').toLowerCase()
      const normalizedSearch = (searchQuery || '').toLowerCase()
      const matchesSearch = studentName.includes(normalizedSearch) || studentEmail.includes(normalizedSearch)

      if (!matchesSearch) return false

      if (selectedBeltFilter === 'all') return true
      if (selectedBeltFilter === 'attention') return student.needsAttention
      return student.belt === selectedBeltFilter
    })
  }, [students, searchQuery, selectedBeltFilter])


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* 1. Mentor Welcome Hero Section (Matching Student Portal visual language) */}
      <MentorWelcomeHero
        mentorName={mentorDisplayName}
        totalStudents={totalStudents}
        activeStudents={activeStudents}
        studentsNeedingAttention={attentionCount}
        cohortMasteryPercent={cohortMasteryPercent}
      />

      {/* 2. Top Metric Stat Cards: Real Roster Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Registered Students */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 interactive-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Assigned Cohort
            </span>
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {isLoading ? '...' : totalStudents}
            </div>
            <div className="text-xs font-semibold text-neutral-500 mt-1">
              Registered Students
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Kalvi AI & Computing Track</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 100% Onboarded
            </span>
          </div>
        </div>

        {/* Card 2: Active Engagement */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 interactive-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Active Engagement
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
              {isLoading ? '...' : activeStudents}
            </div>
            <div className="text-xs font-semibold text-neutral-500 mt-1">
              Active Students ({totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 100}%)
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Maintained coding streaks</span>
            <span className="text-emerald-600 font-semibold">Active daily</span>
          </div>
        </div>

        {/* Card 3: Needs Intervention */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 interactive-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Intervention Status
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {isLoading ? '...' : attentionCount}
            </div>
            <div className="text-xs font-semibold text-neutral-500 mt-1">
              Attention Required
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span className={cn('font-medium', attentionCount > 0 ? 'text-amber-600' : 'text-emerald-600')}>
              {attentionCount > 0 ? `${attentionCount} students flagged` : 'All registered students on track'}
            </span>
            <span className="text-emerald-600 font-semibold">
              {attentionCount === 0 ? '100% Healthy' : 'Action suggested'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Section: Student Progress */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden space-y-6 p-6">
        {/* Section Header & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
              Student Progress
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Live progression metrics, belt badges, and completion milestones across assigned students.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['all', 'Belt 3', 'Belt 2', 'Belt 1', 'attention'] as const).map((filter) => {
                const count =
                  filter === 'all'
                    ? students.length
                    : filter === 'attention'
                    ? attentionCount
                    : students.filter((s) => s.belt === filter).length

                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedBeltFilter(filter)}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all interactive-tab',
                      selectedBeltFilter === filter
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    )}
                  >
                    {filter === 'all'
                      ? `All (${count})`
                      : filter === 'attention'
                      ? `⚠️ Attention (${count})`
                      : `${filter} (${count})`}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Student Progress Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50/80 text-neutral-500 font-bold uppercase text-[10px] tracking-wider border-y border-neutral-200/80">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Current Belt</th>
                <th className="py-3 px-4">Completion</th>
                <th className="py-3 px-4">Problems Solved</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#ED2A2B]" />
                      <span className="text-xs font-medium">Loading live student telemetry...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-400">
                    No students found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const studentName = student.name || student.email || 'Student'
                  const initials = studentName
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((w) => w[0] || '')
                    .join('')
                    .slice(0, 2)
                    .toUpperCase() || 'S'

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-neutral-50/70 transition-colors group cursor-pointer"
                      onClick={() => setSelectedStudent(student)}
                    >
                      {/* Student Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-neutral-900 group-hover:text-[#ED2A2B] transition-colors">
                              {student.name}
                            </div>
                            <div className="text-[11px] text-neutral-400 font-mono">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Belt Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-2xs"
                          style={{ backgroundColor: student.beltColor }}
                        >
                          <Award className="w-3 h-3" />
                          <span>{student.belt}</span>
                        </span>
                      </td>

                      {/* Progress Bar & Percentage */}
                      <td className="py-3.5 px-4">
                        <div className="w-40 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                            <span>{student.progressPercent}%</span>
                            <span className="text-[10px] text-neutral-400 font-normal">
                              Target 100%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500 bg-neutral-900"
                              style={{ width: `${student.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Solved Count */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">
                          {student.solvedCount} / {student.totalProblems}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {student.totalProblems - student.solvedCount} remaining
                        </div>
                      </td>

                      {/* Streak */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-500">
                          <Flame className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{student.streak}d</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {student.needsAttention ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-semibold border border-amber-200">
                            <AlertTriangle className="w-3 h-3" /> Needs Attention
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> On Track
                          </span>
                        )}
                        <div className="text-[10px] text-neutral-400 mt-0.5">
                          Active: {student.lastActive}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedStudent(student)
                          }}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Student Detail Inspection Modal (Portaled directly to document.body) */}
      {selectedStudent &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setSelectedStudent(null)}
          >
            <div
              className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Student Summary Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                  {(selectedStudent.name || selectedStudent.email || 'ST').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {selectedStudent.name || 'Student'}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    {selectedStudent.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-bold text-white"
                      style={{ backgroundColor: selectedStudent.beltColor || '#3B82F6' }}
                    >
                      {selectedStudent.belt || 'Belt 1'}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Primary: {(selectedStudent.language || 'python').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics Breakdown */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
                <div>
                  <div className="text-xl font-extrabold text-neutral-900">
                    {selectedStudent.progressPercent}%
                  </div>
                  <div className="text-[11px] text-neutral-500">Progress</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-neutral-900">
                    {selectedStudent.solvedCount} / {selectedStudent.totalProblems}
                  </div>
                  <div className="text-[11px] text-neutral-500">Solved</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-amber-500">
                    {selectedStudent.streak} days
                  </div>
                  <div className="text-[11px] text-neutral-500">Streak</div>
                </div>
              </div>

              {/* Attention Notice if present */}
              {selectedStudent.needsAttention && selectedStudent.attentionReason && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Intervention Recommended:</span>{' '}
                    {selectedStudent.attentionReason}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-end pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all interactive-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default MentorDashboardPage
