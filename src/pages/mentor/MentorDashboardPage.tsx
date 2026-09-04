import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Flame,
  AlertTriangle,
  Search,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Sun,
  Moon,
  Send,
  X,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

export interface StudentProgressItem {
  id: string
  name: string
  email: string
  belt: 'Belt 1' | 'Belt 2' | 'Belt 3'
  beltColor: string
  progressPercent: number
  solvedCount: number
  totalProblems: number
  streak: number
  language: 'python' | 'java' | 'nodejs' | 'cpp'
  lastActive: string
  needsAttention: boolean
  attentionReason?: string
}

// Initial cohort data matching the prompt requirements
const INITIAL_STUDENTS: StudentProgressItem[] = [
  {
    id: 's-1',
    name: 'Arun',
    email: 'arun.k@kalvium.community',
    belt: 'Belt 3',
    beltColor: '#EF4444',
    progressPercent: 72,
    solvedCount: 61,
    totalProblems: 85,
    streak: 8,
    language: 'python',
    lastActive: '2 hours ago',
    needsAttention: false,
  },
  {
    id: 's-2',
    name: 'Priya',
    email: 'priya.s@kalvium.community',
    belt: 'Belt 2',
    beltColor: '#10B981',
    progressPercent: 51,
    solvedCount: 43,
    totalProblems: 85,
    streak: 5,
    language: 'java',
    lastActive: '5 hours ago',
    needsAttention: false,
  },
  {
    id: 's-3',
    name: 'Karthik',
    email: 'karthik.m@kalvium.community',
    belt: 'Belt 1',
    beltColor: '#3B82F6',
    progressPercent: 24,
    solvedCount: 20,
    totalProblems: 85,
    streak: 2,
    language: 'cpp',
    lastActive: '1 day ago',
    needsAttention: false,
  },
  {
    id: 's-4',
    name: 'Kavya Ramesh',
    email: 'kavya.ramesh.s.121@kalvium.community',
    belt: 'Belt 2',
    beltColor: '#10B981',
    progressPercent: 65,
    solvedCount: 55,
    totalProblems: 85,
    streak: 12,
    language: 'python',
    lastActive: 'Just now',
    needsAttention: false,
  },
  {
    id: 's-5',
    name: 'Prajith P S',
    email: 'prajith.p.s.121@kalvium.community',
    belt: 'Belt 3',
    beltColor: '#EF4444',
    progressPercent: 88,
    solvedCount: 75,
    totalProblems: 85,
    streak: 15,
    language: 'python',
    lastActive: '30 mins ago',
    needsAttention: false,
  },
  {
    id: 's-6',
    name: 'Ananya Sharma',
    email: 'ananya.s@kalvium.community',
    belt: 'Belt 1',
    beltColor: '#3B82F6',
    progressPercent: 18,
    solvedCount: 15,
    totalProblems: 85,
    streak: 0,
    language: 'nodejs',
    lastActive: '4 days ago',
    needsAttention: true,
    attentionReason: 'Inactive for 4 days; stuck on Belt 1 Loops',
  },
  {
    id: 's-7',
    name: 'Rohan Verma',
    email: 'rohan.v@kalvium.community',
    belt: 'Belt 2',
    beltColor: '#10B981',
    progressPercent: 44,
    solvedCount: 37,
    totalProblems: 85,
    streak: 3,
    language: 'python',
    lastActive: '1 day ago',
    needsAttention: false,
  },
  {
    id: 's-8',
    name: 'Sneha Patel',
    email: 'sneha.p@kalvium.community',
    belt: 'Belt 3',
    beltColor: '#EF4444',
    progressPercent: 91,
    solvedCount: 77,
    totalProblems: 85,
    streak: 19,
    language: 'java',
    lastActive: '1 hour ago',
    needsAttention: false,
  },
  {
    id: 's-9',
    name: 'Vikas Reddy',
    email: 'vikas.r@kalvium.community',
    belt: 'Belt 1',
    beltColor: '#3B82F6',
    progressPercent: 12,
    solvedCount: 10,
    totalProblems: 85,
    streak: 0,
    language: 'cpp',
    lastActive: '5 days ago',
    needsAttention: true,
    attentionReason: 'Frequent hidden test failures on boundary cases',
  },
  {
    id: 's-10',
    name: 'Meera Nair',
    email: 'meera.n@kalvium.community',
    belt: 'Belt 2',
    beltColor: '#10B981',
    progressPercent: 58,
    solvedCount: 49,
    totalProblems: 85,
    streak: 6,
    language: 'python',
    lastActive: '3 hours ago',
    needsAttention: false,
  },
]

export const MentorDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const mentorName = user?.name || 'Rahul'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBeltFilter, setSelectedBeltFilter] = useState<'all' | 'Belt 1' | 'Belt 2' | 'Belt 3' | 'attention'>('all')
  const [selectedStudent, setSelectedStudent] = useState<StudentProgressItem | null>(null)
  const [mentorNote, setMentorNote] = useState('')
  const [noteSent, setNoteSent] = useState(false)

  // Dynamic Time Greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: 'Good morning', icon: Sun }
    if (hour < 18) return { text: 'Good afternoon', icon: Sun }
    return { text: 'Good evening', icon: Moon }
  }, [])

  const GreetingIcon = greeting.icon

  // Filtered student list
  const filteredStudents = useMemo(() => {
    return INITIAL_STUDENTS.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      if (selectedBeltFilter === 'all') return true
      if (selectedBeltFilter === 'attention') return student.needsAttention
      return student.belt === selectedBeltFilter
    })
  }, [searchQuery, selectedBeltFilter])

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mentorNote.trim()) return
    setNoteSent(true)
    setTimeout(() => {
      setNoteSent(false)
      setMentorNote('')
      setSelectedStudent(null)
    }, 1500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* 1. Header Greeting: "Good morning, Rahul" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100">
              <GreetingIcon className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {greeting.text}, {mentorName}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Welcome to your mentor cockpit. Monitor cohort trajectory, unblock struggling scholars, and review code submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/mentor/submissions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all interactive-btn shadow-xs"
          >
            <span>Live Submissions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Top Metric Stat Cards: 128 Students | 94 Active | 12 Attention */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: 128 Students */}
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
              128
            </div>
            <div className="text-xs font-semibold text-neutral-500 mt-1">
              Students Enrolled
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Kalvi AI & Computing Track</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 100% Onboarded
            </span>
          </div>
        </div>

        {/* Card 2: 94 Active */}
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
              94
            </div>
            <div className="text-xs font-semibold text-neutral-500 mt-1">
              Active This Week (73.4%)
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Maintained coding streaks</span>
            <span className="text-emerald-600 font-semibold">+6 vs last week</span>
          </div>
        </div>

        {/* Card 3: 12 Attention */}
        <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-xs space-y-4 interactive-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Needs Intervention
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">
              12
            </div>
            <div className="text-xs font-semibold text-amber-800/80 mt-1">
              Attention Required
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span className="text-amber-700 font-medium">Stuck on hidden test cases</span>
            <button
              onClick={() => setSelectedBeltFilter('attention')}
              className="text-[#ED2A2B] font-bold hover:underline"
            >
              Filter Scholars →
            </button>
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
              Live progression metrics, belt badges, and completion milestones across assigned scholars.
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
              {(['all', 'Belt 3', 'Belt 2', 'Belt 1', 'attention'] as const).map((filter) => (
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
                    ? 'All (128)'
                    : filter === 'attention'
                    ? '⚠️ Attention (12)'
                    : filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Student Progress Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50/80 text-neutral-500 font-bold uppercase text-[10px] tracking-wider border-y border-neutral-200/80">
              <tr>
                <th className="py-3 px-4">Scholar</th>
                <th className="py-3 px-4">Current Belt</th>
                <th className="py-3 px-4">Completion</th>
                <th className="py-3 px-4">Problems Solved</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-400">
                    No scholars found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const initials = student.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-neutral-50/70 transition-colors group cursor-pointer"
                      onClick={() => setSelectedStudent(student)}
                    >
                      {/* Scholar Info */}
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
                          <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${student.progressPercent}%`,
                                backgroundColor: student.beltColor,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Problems Solved */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-neutral-900">
                          {student.solvedCount}
                        </span>
                        <span className="text-neutral-400"> / {student.totalProblems}</span>
                      </td>

                      {/* Streak */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 font-semibold text-neutral-800">
                          <Flame
                            className={cn(
                              'w-3.5 h-3.5',
                              student.streak > 0 ? 'text-amber-500 fill-amber-500' : 'text-neutral-300'
                            )}
                          />
                          <span>{student.streak}d</span>
                        </div>
                      </td>

                      {/* Attention Flag / Status */}
                      <td className="py-3.5 px-4">
                        {student.needsAttention ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertTriangle className="w-3 h-3" />
                            Needs Attention
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            On Track
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedStudent(student)
                          }}
                          className="px-3 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 font-semibold text-xs transition-colors interactive-btn"
                        >
                          Inspect
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

      {/* 4. Student Detail Inspection & Mentor Note Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative animate-modal-pop">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scholar Summary Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                {selectedStudent.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  {selectedStudent.email}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-bold text-white"
                    style={{ backgroundColor: selectedStudent.beltColor }}
                  >
                    {selectedStudent.belt}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Primary: {selectedStudent.language.toUpperCase()}
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

            {/* Mentor Action: Send Guidance Note */}
            <form onSubmit={handleSendNote} className="space-y-3">
              <label className="text-xs font-bold text-neutral-700 block">
                Send Mentor Advice or Unblocking Hint:
              </label>
              <textarea
                rows={3}
                value={mentorNote}
                onChange={(e) => setMentorNote(e.target.value)}
                placeholder={`Write personalized guidance for ${selectedStudent.name}...`}
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-neutral-400">
                  Delivered to scholar's notification center
                </span>
                <button
                  type="submit"
                  disabled={!mentorNote.trim() || noteSent}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold transition-all interactive-btn disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{noteSent ? 'Delivered!' : 'Send Advice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MentorDashboardPage
