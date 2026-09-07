import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  Users,
  Search,
  UserPlus,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Mail,
  User,
  Code2,
  ChevronRight,
  ExternalLink,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  MentorStudent,
  fetchMentorRoster,
  subscribeToMentorUpdates,
  addStudent,
  removeStudent,
} from '@/lib/mentorService'
import { useAuth } from '@/contexts/AuthContext'
import { PythonLogo, JavaLogo, CppLogo } from '@/components/practice/LanguageCards'

export const NodejsOfficialLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="#539E43" />
    <path
      d="M42 35 V61 C42 65.5 38.5 69 34 69 C30.5 69 27.5 67 25.5 64"
      stroke="#FFFFFF"
      strokeWidth="6.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M73 42.5 C70.5 37.5 64.5 34.5 58.5 34.5 C52 34.5 48.5 38.5 48.5 44 C48.5 53.5 73 49 73 59.5 C73 65.5 67.5 69.5 59.5 69.5 C53.5 69.5 48.5 66 46.5 61.5"
      stroke="#FFFFFF"
      strokeWidth="6.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export const AllLanguagesLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" className="stroke-sky-500" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" className="stroke-sky-500" />
    <path d="M2 12h20" className="stroke-sky-500" />
  </svg>
)

const LANGUAGES = [
  { id: 'all', label: 'All Languages', shortLabel: 'All' },
  { id: 'cpp', label: 'C++', shortLabel: 'C++' },
  { id: 'python', label: 'Python', shortLabel: 'Python' },
  { id: 'java', label: 'Java', shortLabel: 'Java' },
  { id: 'nodejs', label: 'Node.Js', shortLabel: 'Node.Js' },
] as const

type LanguageKey = (typeof LANGUAGES)[number]['id']

const renderLangLogo = (id: LanguageKey | string, className: string = 'w-4 h-4') => {
  switch (id) {
    case 'cpp':
      return <CppLogo className={className} />
    case 'python':
      return <PythonLogo className={className} />
    case 'java':
      return <JavaLogo className={className} />
    case 'nodejs':
      return <NodejsOfficialLogo className={className} />
    default:
      return <AllLanguagesLogo className={className} />
  }
}

export const MentorStudentsPage: React.FC = () => {
  const { user } = useAuth()
  const [students, setStudents] = useState<MentorStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [beltFilter, setBeltFilter] = useState<'all' | 'Belt 1' | 'Belt 2' | 'Belt 3' | 'attention'>('all')
  const [langFilter, setLangFilter] = useState<LanguageKey>('all')
  const [onlyWithSolved, setOnlyWithSolved] = useState(false)
  const [sortBy, setSortBy] = useState<'progress' | 'streak' | 'name'>('progress')

  // Inspection modal for realtime solved problems
  const [inspectingSolvedStudent, setInspectingSolvedStudent] = useState<MentorStudent | null>(null)
  const [modalLangFilter, setModalLangFilter] = useState<LanguageKey>('all')

  // Add Scholar Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successToast, setSuccessToast] = useState<string | null>(null)

  // Remove confirmation state
  const [studentToDelete, setStudentToDelete] = useState<MentorStudent | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Keyboard shortcut (Escape) to close modals and body scroll lock
  useEffect(() => {
    const isAnyModalOpen = isAddModalOpen || !!studentToDelete || !!inspectingSolvedStudent
    if (!isAnyModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAddModalOpen(false)
        setStudentToDelete(null)
        setInspectingSolvedStudent(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isAddModalOpen, studentToDelete, inspectingSolvedStudent])

  const loadData = useCallback(async () => {
    try {
      const data = await fetchMentorRoster(user?.id)
      setStudents(data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error loading students:', err)
      setIsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    loadData()

    const unsubscribe = subscribeToMentorUpdates(() => {
      loadData()
    })

    return () => {
      unsubscribe()
    }
  }, [loadData])

  const attentionCount = students.filter((s) => s.needsAttention).length

  // Cohort total solved count per language
  const cohortLangCounts = useMemo(() => {
    const counts = { all: 0, cpp: 0, python: 0, java: 0, nodejs: 0 }
    for (const s of students) {
      counts.all += s.solvedProblems?.length || 0
      counts.cpp += s.languageSolvedCounts?.cpp || 0
      counts.python += s.languageSolvedCounts?.python || 0
      counts.java += s.languageSolvedCounts?.java || 0
      counts.nodejs += s.languageSolvedCounts?.nodejs || 0
    }
    return counts
  }, [students])

  const studentsWithSolvedInLang = useMemo(() => {
    if (langFilter === 'all') return students.filter((s) => s.solvedCount > 0).length
    return students.filter((s) => (s.languageSolvedCounts?.[langFilter] || 0) > 0).length
  }, [students, langFilter])

  const filtered = useMemo(() => {
    return students
      .filter((s) => {
        const sName = (s.name || '').toLowerCase()
        const sEmail = (s.email || '').toLowerCase()
        const sCode = (s.studentCode || '').toLowerCase()
        const q = (search || '').toLowerCase()

        const matchesSearch =
          sName.includes(q) ||
          sEmail.includes(q) ||
          sCode.includes(q) ||
          (s.solvedProblems || []).some(
            (p) => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
          )

        if (!matchesSearch) return false

        if (beltFilter === 'attention') {
          if (!s.needsAttention) return false
        } else if (beltFilter !== 'all') {
          if (s.belt !== beltFilter) return false
        }

        if (langFilter !== 'all') {
          const solvedInLang = s.languageSolvedCounts?.[langFilter] || 0
          if (onlyWithSolved && solvedInLang === 0) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        if (langFilter !== 'all') {
          const aSolved = a.languageSolvedCounts?.[langFilter] || 0
          const bSolved = b.languageSolvedCounts?.[langFilter] || 0
          if (bSolved !== aSolved) {
            return bSolved - aSolved
          }
        }
        if (sortBy === 'progress') return b.progressPercent - a.progressPercent
        if (sortBy === 'streak') return b.streak - a.streak
        return (a.name || '').localeCompare(b.name || '')
      })
  }, [students, search, beltFilter, langFilter, onlyWithSolved, sortBy])

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!newName.trim()) {
      setFormError('Please enter the student’s full name.')
      return
    }

    if (!newEmail.trim() || !newEmail.includes('@') || !newEmail.includes('.')) {
      setFormError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await addStudent({
        name: newName,
        email: newEmail,
        mentorId: user?.id,
      })

      if (!result.success) {
        setFormError(result.error || 'Failed to add student. Please try again.')
        setIsSubmitting(false)
        return
      }

      // Success
      setSuccessToast(`Student ${newName} added successfully!`)
      setTimeout(() => setSuccessToast(null), 4000)

      setNewName('')
      setNewEmail('')
      setIsAddModalOpen(false)
      await loadData()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setFormError(msg || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStudent = async () => {
    if (!studentToDelete) return
    setIsDeleting(true)
    try {
      const res = await removeStudent(studentToDelete.id, user?.id)
      if (res.success) {
        setSuccessToast(`Student ${studentToDelete.name} removed from cohort.`)
        setTimeout(() => setSuccessToast(null), 4000)
        setStudentToDelete(null)
        await loadData()
      } else {
        alert(res.error || 'Failed to remove student.')
      }
    } catch (err) {
      console.error('Error deleting student:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-page-enter">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successToast}</span>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-emerald-600 hover:text-emerald-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100 flex-shrink-0">
              <Users className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Student Directory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Manage your registered students, track individual belt mastery, and view real-time solved problems by programming language.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-semibold px-3 py-2 rounded-xl bg-neutral-100 text-neutral-700 whitespace-nowrap flex-shrink-0">
            Cohort 2026 • {isLoading ? '...' : `${students.length} Assigned`}
          </span>

          <button
            onClick={() => {
              setIsAddModalOpen(true)
              setFormError(null)
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-bold transition-all interactive-btn shadow-xs whitespace-nowrap flex-shrink-0"
          >
            <UserPlus className="w-4 h-4 flex-shrink-0" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Language Selector Bar (All, C++, Python, Java, Node.Js) */}
      <div className="bg-white p-4 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-neutral-100 text-neutral-700">
              <Code2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-neutral-800">Filter by Language:</span>
            <span className="text-[11px] text-neutral-500 hidden sm:inline">
              {langFilter === 'all'
                ? 'Showing total solved problems across all languages'
                : `Showing real-time solved problems for ${LANGUAGES.find((l) => l.id === langFilter)?.label} only`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {langFilter !== 'all' && (
              <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyWithSolved}
                  onChange={(e) => setOnlyWithSolved(e.target.checked)}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <span>
                  Only show students with solved {LANGUAGES.find((l) => l.id === langFilter)?.label} problems ({studentsWithSolvedInLang})
                </span>
              </label>
            )}
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Real-Time Sync
            </span>
          </div>
        </div>

        {/* 5 Language Buttons with Live Solved Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {LANGUAGES.map((lang) => {
            const isSelected = langFilter === lang.id
            const count = cohortLangCounts[lang.id]

            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLangFilter(lang.id)}
                className={cn(
                  'px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border flex-shrink-0 cursor-pointer shadow-2xs',
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border-neutral-200/80 hover:text-neutral-900'
                )}
              >
                <span className="flex-shrink-0 flex items-center justify-center">
                  {renderLangLogo(lang.id, 'w-4 h-4')}
                </span>
                <span>{lang.label}</span>
                <span
                  className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full font-mono font-bold',
                    isSelected
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-200/80 text-neutral-700'
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name, email, student code, or problem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Belt Filters */}
          <div className="flex items-center gap-1 overflow-x-auto">
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
                  onClick={() => setBeltFilter(filter)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all interactive-tab',
                    beltFilter === filter
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  )}
                >
                  {filter === 'all'
                    ? `All (${count})`
                    : filter === 'attention'
                    ? `Attention (${count})`
                    : `${filter} (${count})`}
                </button>
              )
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
            <span className="text-[11px] text-neutral-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'progress' | 'streak' | 'name')}
              className="text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="progress">Highest Progress</option>
              <option value="streak">Longest Streak</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Student Cards */}
      {isLoading ? (
        <div className="py-16 text-center text-neutral-500">
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#ED2A2B]" />
            <span className="text-xs font-medium">Loading registered students...</span>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-neutral-400 bg-white rounded-2xl border border-neutral-200 space-y-3">
          <p>No students found matching the selected criteria.</p>
          {langFilter !== 'all' && onlyWithSolved && (
            <button
              onClick={() => setOnlyWithSolved(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-semibold hover:bg-neutral-200 transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Show all students for {LANGUAGES.find((l) => l.id === langFilter)?.label}</span>
            </button>
          )}
          <div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add New Student</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((student) => {
            const studentName = student.name || student.email || 'Student'
            const initials =
              studentName
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .map((w) => w[0] || '')
                .join('')
                .slice(0, 2)
                .toUpperCase() || 'S'

            const solvedInActive =
              langFilter === 'all'
                ? student.solvedProblems || []
                : (student.solvedProblems || []).filter((p) => p.language === langFilter)

            const activeLangSolvedCount =
              langFilter === 'all'
                ? student.solvedCount
                : student.languageSolvedCounts?.[langFilter] || 0

            const activeLangProgressPercent =
              langFilter === 'all'
                ? student.progressPercent
                : Math.min(100, Math.round((activeLangSolvedCount / 85) * 100))

            const activeLangObj = LANGUAGES.find((l) => l.id === langFilter) || LANGUAGES[0]

            return (
              <div
                key={student.id}
                className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4 hover:border-neutral-300 transition-all interactive-card relative group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shadow-xs flex-shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-neutral-900 text-sm truncate">{student.name}</h3>
                        <p className="text-[11px] text-neutral-400 font-mono truncate max-w-[180px]">
                          {student.email}
                        </p>
                        {student.studentCode && (
                          <p className="text-[10px] text-neutral-500 font-mono font-medium mt-0.5">
                            Code: {student.studentCode}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-2xs"
                        style={{ backgroundColor: student.beltColor }}
                      >
                        {student.belt}
                      </span>
                      <button
                        onClick={() => setStudentToDelete(student)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        title="Remove Student"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                      <span className="flex items-center gap-1.5">
                        {langFilter !== 'all' && renderLangLogo(langFilter, 'w-3.5 h-3.5')}
                        <span>{langFilter === 'all' ? 'Overall Progress' : `${activeLangObj.label} Progress`}</span>
                      </span>
                      <span className="font-bold text-neutral-900">{activeLangProgressPercent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${activeLangProgressPercent}%`,
                          backgroundColor: student.beltColor,
                        }}
                      />
                    </div>
                  </div>

                  {/* Meta Stats Row */}
                  <div className="pt-2 border-t border-neutral-100 grid grid-cols-3 text-center text-xs">
                    <div>
                      <span className="block font-bold text-neutral-900">{activeLangSolvedCount}</span>
                      <span className="text-[10px] text-neutral-400">
                        {langFilter === 'all' ? 'Total Solved' : `${activeLangObj.shortLabel} Solved`}
                      </span>
                    </div>
                    <div>
                      <span className="block font-bold text-amber-500">{student.streak}d</span>
                      <span className="text-[10px] text-neutral-400">Streak</span>
                    </div>
                    <div>
                      {langFilter === 'all' ? (
                        <>
                          <span className="block font-bold text-neutral-700 uppercase">{student.language}</span>
                          <span className="text-[10px] text-neutral-400">Primary Lang</span>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center gap-1">
                            {renderLangLogo(langFilter, 'w-3 h-3')}
                            <span className="block font-bold text-neutral-900">{activeLangObj.shortLabel}</span>
                          </div>
                          <span className="text-[10px] text-neutral-400">Selected Lang</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Realtime Solved Problems Section */}
                  <div className="pt-3 border-t border-neutral-100 space-y-2">
                    {langFilter !== 'all' ? (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="flex-shrink-0 flex items-center justify-center">
                              {renderLangLogo(langFilter, 'w-4 h-4')}
                            </span>
                            <span className="text-[11px] font-bold text-neutral-800">
                              Solved in {LANGUAGES.find((l) => l.id === langFilter)?.label}:
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-neutral-100 text-neutral-700">
                              {student.languageSolvedCounts?.[langFilter] || 0}
                            </span>
                          </div>
                          {(student.languageSolvedCounts?.[langFilter] || 0) > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setInspectingSolvedStudent(student)
                                setModalLangFilter(langFilter)
                              }}
                              className="text-[10px] font-bold text-[#ED2A2B] hover:underline flex items-center gap-0.5"
                            >
                              <span>View All ({student.languageSolvedCounts?.[langFilter]})</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {solvedInActive.length === 0 ? (
                          <div className="py-2.5 px-3 rounded-xl bg-neutral-50/80 border border-dashed border-neutral-200 text-center">
                            <p className="text-[11px] text-neutral-400 font-medium">
                              No problems solved in {LANGUAGES.find((l) => l.id === langFilter)?.label} yet
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            {solvedInActive.slice(0, 2).map((prob) => (
                              <div
                                key={prob.problemId}
                                onClick={() => {
                                  setInspectingSolvedStudent(student)
                                  setModalLangFilter(langFilter)
                                }}
                                className="p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200/70 transition-all cursor-pointer flex items-center justify-between gap-2 group/item"
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                    <span className="text-xs font-bold text-neutral-900 truncate group-hover/item:text-neutral-950">
                                      {prob.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1 ml-5">
                                    <span
                                      className="text-[9px] font-extrabold px-1.5 py-0.2 rounded text-white shadow-2xs"
                                      style={{ backgroundColor: prob.beltColor }}
                                    >
                                      {prob.beltName}
                                    </span>
                                    <span
                                      className={cn(
                                        'text-[9px] font-bold px-1.5 py-0.2 rounded',
                                        prob.difficulty.toLowerCase() === 'easy'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : prob.difficulty.toLowerCase() === 'medium'
                                          ? 'bg-amber-100 text-amber-800'
                                          : 'bg-red-100 text-red-800'
                                      )}
                                    >
                                      {prob.difficulty}
                                    </span>
                                    <span className="text-[10px] text-neutral-400">
                                      {prob.solvedAtFormatted}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-neutral-700 flex-shrink-0" />
                              </div>
                            ))}
                            {solvedInActive.length > 2 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setInspectingSolvedStudent(student)
                                  setModalLangFilter(langFilter)
                                }}
                                className="w-full text-center text-[10px] text-neutral-500 font-semibold hover:text-neutral-800 py-1"
                              >
                                + {solvedInActive.length - 2} more solved in {LANGUAGES.find((l) => l.id === langFilter)?.label}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-neutral-700">Solved by Language:</span>
                          {student.solvedProblems.length > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setInspectingSolvedStudent(student)
                                setModalLangFilter('all')
                              }}
                              className="text-[10px] font-bold text-[#ED2A2B] hover:underline flex items-center gap-0.5"
                            >
                              <span>All Solved ({student.solvedProblems.length})</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {/* 4 Interactive Language Badges with Real Logos */}
                        <div className="grid grid-cols-4 gap-1.5 text-center">
                          <button
                            type="button"
                            onClick={() => setLangFilter('cpp')}
                            className="p-1.5 rounded-xl bg-blue-50/80 border border-blue-100/80 hover:bg-blue-100/80 transition-all text-left cursor-pointer group/pill"
                          >
                            <div className="flex items-center justify-between">
                              <span className="block text-[11px] font-bold text-blue-900 group-hover/pill:text-blue-950">
                                {student.languageSolvedCounts?.cpp || 0}
                              </span>
                              <CppLogo className="w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-[9px] font-semibold text-blue-600 block mt-0.5">C++</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setLangFilter('python')}
                            className="p-1.5 rounded-xl bg-emerald-50/80 border border-emerald-100/80 hover:bg-emerald-100/80 transition-all text-left cursor-pointer group/pill"
                          >
                            <div className="flex items-center justify-between">
                              <span className="block text-[11px] font-bold text-emerald-900 group-hover/pill:text-emerald-950">
                                {student.languageSolvedCounts?.python || 0}
                              </span>
                              <PythonLogo className="w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-[9px] font-semibold text-emerald-600 block mt-0.5">Python</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setLangFilter('java')}
                            className="p-1.5 rounded-xl bg-amber-50/80 border border-amber-100/80 hover:bg-amber-100/80 transition-all text-left cursor-pointer group/pill"
                          >
                            <div className="flex items-center justify-between">
                              <span className="block text-[11px] font-bold text-amber-900 group-hover/pill:text-amber-950">
                                {student.languageSolvedCounts?.java || 0}
                              </span>
                              <JavaLogo className="w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-[9px] font-semibold text-amber-600 block mt-0.5">Java</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setLangFilter('nodejs')}
                            className="p-1.5 rounded-xl bg-teal-50/80 border border-teal-100/80 hover:bg-teal-100/80 transition-all text-left cursor-pointer group/pill"
                          >
                            <div className="flex items-center justify-between">
                              <span className="block text-[11px] font-bold text-teal-900 group-hover/pill:text-teal-950">
                                {student.languageSolvedCounts?.nodejs || 0}
                              </span>
                              <NodejsOfficialLogo className="w-3.5 h-3.5 flex-shrink-0" />
                            </div>
                            <span className="text-[9px] font-semibold text-teal-600 block mt-0.5">Node.Js</span>
                          </button>
                        </div>

                        {/* Most recently solved problem if any */}
                        {student.solvedProblems.length > 0 && (
                          <div
                            onClick={() => {
                              setInspectingSolvedStudent(student)
                              setModalLangFilter('all')
                            }}
                            className="mt-2 p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 transition-all cursor-pointer flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                              <span className="text-xs text-neutral-800 truncate font-semibold">
                                <span className="text-neutral-500 font-normal">Latest: </span>
                                {student.solvedProblems[0]?.title}
                              </span>
                            </div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-800 uppercase flex-shrink-0 inline-flex items-center gap-1.5">
                              {renderLangLogo(student.solvedProblems[0]?.language, 'w-3 h-3')}
                              <span>{student.solvedProblems[0]?.languageLabel}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Active Status */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[11px] text-neutral-400">
                  <span>Active: {student.lastActive}</span>
                  {student.needsAttention ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Attention
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setInspectingSolvedStudent(student)
                        setModalLangFilter(langFilter)
                      }}
                      className="text-[10px] font-bold text-neutral-600 hover:text-neutral-900 hover:underline"
                    >
                      Inspect Problems →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Solved Problems Inspection Modal (Portaled directly to document.body) */}
      {inspectingSolvedStudent &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setInspectingSolvedStudent(null)}
          >
            <div
              className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200 space-y-5 relative max-h-[90vh] flex flex-col animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setInspectingSolvedStudent(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-3.5 pr-8">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white text-sm font-bold flex items-center justify-center shadow-xs flex-shrink-0">
                  {inspectingSolvedStudent.name
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((w) => w[0] || '')
                    .join('')
                    .slice(0, 2)
                    .toUpperCase() || 'S'}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-neutral-900 truncate">
                      {inspectingSolvedStudent.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-2xs"
                      style={{ backgroundColor: inspectingSolvedStudent.beltColor }}
                    >
                      {inspectingSolvedStudent.belt}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 font-mono truncate">
                    {inspectingSolvedStudent.email}
                    {inspectingSolvedStudent.studentCode && ` • ${inspectingSolvedStudent.studentCode}`}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs flex-wrap">
                    <span className="font-semibold text-neutral-700">
                      Total Solved: <strong className="text-neutral-900 font-bold">{inspectingSolvedStudent.solvedProblems.length}</strong>
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="font-semibold text-neutral-700">
                      Progress: <strong className="text-neutral-900 font-bold">{inspectingSolvedStudent.progressPercent}%</strong>
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="font-semibold text-neutral-700">
                      Streak: <strong className="text-amber-600 font-bold">{inspectingSolvedStudent.streak}d</strong>
                    </span>
                    {modalLangFilter !== 'all' && (
                      <>
                        <span className="text-neutral-300">•</span>
                        <span className="font-semibold text-neutral-700 flex items-center gap-1">
                          {renderLangLogo(modalLangFilter, 'w-3.5 h-3.5')}
                          <span>{LANGUAGES.find((l) => l.id === modalLangFilter)?.label} Solved:</span>
                          <strong className="text-neutral-900 font-bold">
                            {inspectingSolvedStudent.languageSolvedCounts?.[modalLangFilter] || 0}
                          </strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Language Filter Tabs */}
              <div className="flex items-center gap-1.5 border-b border-neutral-100 pb-3 overflow-x-auto">
                {LANGUAGES.map((lang) => {
                  const isSelected = modalLangFilter === lang.id
                  const count =
                    lang.id === 'all'
                      ? inspectingSolvedStudent.solvedProblems.length
                      : inspectingSolvedStudent.languageSolvedCounts?.[lang.id] || 0

                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setModalLangFilter(lang.id)}
                      className={cn(
                        'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer',
                        isSelected
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      )}
                    >
                      <span className="flex-shrink-0 flex items-center justify-center">
                        {renderLangLogo(lang.id, 'w-3.5 h-3.5')}
                      </span>
                      <span>{lang.shortLabel}</span>
                      <span
                        className={cn(
                          'text-[10px] px-1.5 py-0.2 rounded-md font-mono',
                          isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-200/80 text-neutral-700'
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Solved Problems List */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-2 min-h-[200px] max-h-[380px]">
                {(() => {
                  const list =
                    modalLangFilter === 'all'
                      ? inspectingSolvedStudent.solvedProblems
                      : inspectingSolvedStudent.solvedProblems.filter((p) => p.language === modalLangFilter)

                  if (list.length === 0) {
                    return (
                      <div className="py-12 text-center text-neutral-400 space-y-2">
                        <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                          <Code2 className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium">
                          No problems solved in {LANGUAGES.find((l) => l.id === modalLangFilter)?.label} yet.
                        </p>
                      </div>
                    )
                  }

                  return list.map((prob) => {
                    const langBadge =
                      prob.language === 'cpp'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : prob.language === 'python'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : prob.language === 'java'
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : 'bg-teal-100 text-teal-800 border-teal-200'

                    return (
                      <div
                        key={prob.problemId}
                        className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between gap-3 hover:border-neutral-300 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-neutral-900 truncate">
                              {prob.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span
                                className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white shadow-2xs"
                                style={{ backgroundColor: prob.beltColor }}
                              >
                                {prob.beltName}
                              </span>
                              <span
                                className={cn(
                                  'text-[9px] font-bold px-1.5 py-0.5 rounded',
                                  prob.difficulty.toLowerCase() === 'easy'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : prob.difficulty.toLowerCase() === 'medium'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-red-100 text-red-800'
                                )}
                              >
                                {prob.difficulty}
                              </span>
                              <span className={cn('text-[9px] font-extrabold px-2 py-0.5 rounded border inline-flex items-center gap-1.5', langBadge)}>
                                {renderLangLogo(prob.language, 'w-3 h-3')}
                                <span>{prob.languageLabel}</span>
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {prob.solvedAtFormatted}
                              </span>
                            </div>
                          </div>
                        </div>

                        <a
                          href={`/problem/${prob.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/60 transition-colors flex-shrink-0"
                          title="Open Problem in Arena"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )
                  })
                })()}
              </div>

              {/* Modal Footer */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <span>Real-time live progress sync enabled</span>
                <button
                  type="button"
                  onClick={() => setInspectingSolvedStudent(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Add Student Modal (Portaled directly to document.body) */}
      {isAddModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setIsAddModalOpen(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#ED2A2B] border border-red-100 flex items-center justify-center mb-3">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  Add Student
                </h3>
                <p className="text-xs text-neutral-500">
                  Register or map a student to your mentor cohort. They will immediately gain access to practice under your guidance.
                </p>
              </div>

              {/* Error Message */}
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleCreateStudent} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 block">
                    Student Full Name <span className="text-[#ED2A2B]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 block">
                    Email Address <span className="text-[#ED2A2B]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="e.g. rahul.s.121@kalvium.community"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Must match the Google account the student uses to log in.
                  </p>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-500">Initial Milestone:</span>
                    <span className="font-bold text-neutral-900">Belt 1 (Foundations)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-500">Total Benchmark:</span>
                    <span className="font-bold text-neutral-900">85 Problems</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-bold transition-all interactive-btn disabled:opacity-50 shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add Student</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* Delete Confirmation Modal (Portaled directly to document.body) */}
      {studentToDelete &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setStudentToDelete(null)}
          >
            <div
              className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4 animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-neutral-900">
                  Remove {studentToDelete.name}?
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Are you sure you want to remove <strong className="text-neutral-700">{studentToDelete.email}</strong> from this mentor cohort? Their login authorization will be revoked.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStudentToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteStudent}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Removing...' : 'Yes, Remove'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default MentorStudentsPage
