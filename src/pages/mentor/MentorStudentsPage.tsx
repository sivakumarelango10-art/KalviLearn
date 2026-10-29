import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
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
import { deleteCampusStudent } from '@/lib/campusManagerService'
import { useAuth } from '@/contexts/AuthContext'
import { PythonLogo, JavaLogo, CppLogo } from '@/components/practice/LanguageCards'
import { StudentDetailModal } from '@/components/mentor/StudentDetailModal'
import { fetchTotalProblemCount } from '@/lib/problemStatsService'

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
  const [beltFilter, setBeltFilter] = useState<string>('all')
  const [langFilter, setLangFilter] = useState<LanguageKey>('all')
  const [onlyWithSolved, setOnlyWithSolved] = useState(false)
  const [sortBy, setSortBy] = useState<'progress' | 'streak' | 'name'>('progress')

  // Selected Student for Authoritative Student View
  const [selectedStudent, setSelectedStudent] = useState<MentorStudent | null>(null)

  // Add Student Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successToast, setSuccessToast] = useState<string | null>(null)

  // Remove/Delete confirmation state
  const [studentToDelete, setStudentToDelete] = useState<MentorStudent | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPermanentDeleting, setIsPermanentDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [totalProblemsBenchmark, setTotalProblemsBenchmark] = useState<number | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const userRole = (user?.role || '').toUpperCase()
  const isStaff = userRole === 'CAMPUS_MANAGER' || userRole === 'ADMIN' || userRole === 'SUPERADMIN'

  useEffect(() => {
    fetchTotalProblemCount().then(setTotalProblemsBenchmark).catch(() => {})
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  // Keyboard shortcut (Escape) to close modals and body scroll lock
  useEffect(() => {
    const isAnyModalOpen = isAddModalOpen || !!studentToDelete
    if (!isAnyModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAddModalOpen(false)
        setStudentToDelete(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isAddModalOpen, studentToDelete])

  const loadData = useCallback(async () => {
    try {
      const data = await fetchMentorRoster(user?.id || user?.email)
      setStudents(data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error loading students:', err)
      setIsLoading(false)
    }
  }, [user?.id, user?.email])

  useEffect(() => {
    loadData()

    const unsubscribe = subscribeToMentorUpdates(() => {
      loadData()
    })

    return () => {
      unsubscribe()
    }
  }, [loadData])

  const attentionCount = students.filter((student) => student.needsAttention).length

  const beltFilterOptions = useMemo(() => {
    const activeBelts = Array.from(new Set(students.map((s) => s.belt))).filter(Boolean)
    const defaults = ['Belt 1', 'Belt 2', 'Belt 3']
    const combined = Array.from(new Set([...defaults, ...activeBelts]))
    combined.sort((a, b) => {
      const aNum = parseInt(a.replace(/\D/g, ''), 10) || 0
      const bNum = parseInt(b.replace(/\D/g, ''), 10) || 0
      return aNum - bNum
    })
    return ['all', 'attention', ...combined]
  }, [students])

  const filtered = useMemo(() => {
    return students
      .filter((student) => {
        const studentName = (student.name || '').toLowerCase()
        const studentEmail = (student.email || '').toLowerCase()
        const normalizedSearch = (search || '').toLowerCase()

        const matchesSearch =
          studentName.includes(normalizedSearch) ||
          studentEmail.includes(normalizedSearch) ||
          (student.solvedProblems || []).some(
            (problem) => problem.title.toLowerCase().includes(normalizedSearch) || problem.slug.toLowerCase().includes(normalizedSearch)
          )

        if (!matchesSearch) return false

        if (beltFilter === 'attention') {
          if (!student.needsAttention) return false
        } else if (beltFilter !== 'all') {
          if (student.belt !== beltFilter) return false
        }

        if (langFilter !== 'all') {
          const solvedInLang = student.languageSolvedCounts?.[langFilter] || 0
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
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
      setSuccessToast(`Student ${newName} added successfully!`)
      toastTimerRef.current = setTimeout(() => setSuccessToast(null), 4000)

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

  // 1. Remove from cohort (unassign)
  const handleRemoveFromCohort = async () => {
    if (!studentToDelete) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      const res = await removeStudent(studentToDelete.id, user?.id)
      if (res.success) {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
        setSuccessToast(`Student ${studentToDelete.name} removed from cohort.`)
        toastTimerRef.current = setTimeout(() => setSuccessToast(null), 4000)
        setStudentToDelete(null)
        await loadData()
      } else {
        setDeleteError(res.error || 'Failed to remove student from cohort.')
      }
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to remove student from cohort.')
    } finally {
      setIsDeleting(false)
    }
  }

  // 2. Permanently delete student account
  const handlePermanentDelete = async () => {
    if (!studentToDelete) return
    setIsPermanentDeleting(true)
    setDeleteError(null)
    try {
      const res = await deleteCampusStudent(studentToDelete.id)
      if (res.success) {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
        setSuccessToast(`Student ${studentToDelete.name} was permanently deleted.`)
        toastTimerRef.current = setTimeout(() => setSuccessToast(null), 4000)
        setStudentToDelete(null)
        await loadData()
      } else {
        setDeleteError(res.error || 'Failed to permanently delete student.')
      }
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to permanently delete student.')
    } finally {
      setIsPermanentDeleting(false)
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

      {/* Language Selector Bar (C++, Python, Java, Node.Js) */}
      <div className="bg-white p-4 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-neutral-100 text-neutral-700">
              <Code2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-neutral-800">Filter by Language:</span>
            <span className="text-[11px] text-neutral-500 hidden sm:inline">
              Click a language to view real-time solved problems for each student
            </span>
          </div>

          {langFilter !== 'all' && (
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyWithSolved}
                  onChange={(e) => setOnlyWithSolved(e.target.checked)}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <span>Only show students with solved {LANGUAGES.find((l) => l.id === langFilter)?.label} problems</span>
              </label>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Real-Time Sync
              </span>
            </div>
          )}
        </div>

        {/* 4 Language Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {LANGUAGES.filter((lang) => lang.id !== 'all').map((lang) => {
            const isSelected = langFilter === lang.id

            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLangFilter(isSelected ? 'all' : lang.id)}
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
            placeholder="Search student by name, email, or problem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Belt Filters */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {beltFilterOptions.map((filter) => {
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
                    'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all interactive-tab whitespace-nowrap',
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
                : (student.solvedProblems || []).filter((p) =>
                    p.languages ? p.languages.includes(langFilter) : p.language === langFilter
                  )

            return (
              <div
                key={student.id}
                className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4 hover:border-neutral-300 transition-all interactive-card relative group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex items-center gap-3 cursor-pointer group/header"
                      onClick={() => setSelectedStudent(student)}
                      title="Click to view student profile"
                    >
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shadow-xs flex-shrink-0 group-hover/header:bg-[#ED2A2B] transition-colors">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-neutral-900 text-sm truncate group-hover/header:text-[#ED2A2B] transition-colors">
                          {student.name}
                        </h3>
                        <p className="text-[11px] text-neutral-400 font-mono truncate max-w-[180px]">
                          {student.email}
                        </p>
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
                      <span>Overall Progress</span>
                      <span className="font-bold text-neutral-900">{student.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${student.progressPercent}%`,
                          backgroundColor: student.beltColor,
                        }}
                      />
                    </div>
                  </div>

                  {/* Meta Stats Row */}
                  <div className="pt-2 border-t border-neutral-100 grid grid-cols-3 text-center text-xs">
                    <div>
                      <span className="block font-bold text-neutral-900">{student.solvedCount}</span>
                      <span className="text-[10px] text-neutral-400">Total Solved</span>
                    </div>
                    <div>
                      <span className="block font-bold text-amber-500">{student.streak}d</span>
                      <span className="text-[10px] text-neutral-400">Streak</span>
                    </div>
                    <div>
                      <span className="block font-bold text-neutral-700 uppercase">{student.language}</span>
                      <span className="text-[10px] text-neutral-400">Primary Lang</span>
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
                              onClick={() => setSelectedStudent(student)}
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
                                onClick={() => setSelectedStudent(student)}
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
                                onClick={() => setSelectedStudent(student)}
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
                              onClick={() => setSelectedStudent(student)}
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
                            onClick={() => setSelectedStudent(student)}
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
                            onClick={() => setSelectedStudent(student)}
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
                            onClick={() => setSelectedStudent(student)}
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
                            onClick={() => setSelectedStudent(student)}
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
                        {(student.latestSolved || student.solvedProblems.length > 0) && (() => {
                          const latest = student.latestSolved || student.solvedProblems[0]
                          return (
                            <div
                              onClick={() => setSelectedStudent(student)}
                              className="mt-2 p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 transition-all cursor-pointer flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                <span className="text-xs text-neutral-800 truncate font-semibold">
                                  <span className="text-neutral-500 font-normal">Latest Solved: </span>
                                  {latest.title}
                                </span>
                              </div>
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-800 uppercase flex-shrink-0 inline-flex items-center gap-1.5">
                                {renderLangLogo(latest.language, 'w-3 h-3')}
                                <span>{latest.languageLabel}</span>
                              </span>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Active Status & View Action */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[11px] text-neutral-400">
                  <span>Active: {student.lastActive}</span>
                  <div className="flex items-center gap-2">
                    {student.needsAttention && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        Attention
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedStudent(student)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-neutral-800 hover:text-white bg-neutral-100 hover:bg-neutral-900 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      <span>View Student</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Student View Modal (Authoritative Real-Time Data) */}
      <StudentDetailModal
        student={selectedStudent}
        initialLanguage={langFilter}
        onClose={() => setSelectedStudent(null)}
        onDeleteStudent={(s) => {
          setSelectedStudent(null)
          setDeleteError(null)
          setStudentToDelete(s)
        }}
      />

      {/* Add Student Modal (Portaled directly to document.body) */}
      {isAddModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setIsAddModalOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-student-modal-title"
              className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#ED2A2B] border border-red-100 flex items-center justify-center mb-3">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 id="add-student-modal-title" className="text-xl font-bold text-neutral-900">
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
                  <label htmlFor="student-full-name" className="text-xs font-bold text-neutral-700 block">
                    Student Full Name <span className="text-[#ED2A2B]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="student-full-name"
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Student Full Name"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="student-email" className="text-xs font-bold text-neutral-700 block">
                    Email Address <span className="text-[#ED2A2B]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="student-email"
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="student@institution.edu"
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
                    <span className="font-bold text-neutral-900">
                      {totalProblemsBenchmark !== null ? `${totalProblemsBenchmark} Problems` : '—'}
                    </span>
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

      {/* Remove / Delete Confirmation Modal (Portaled directly to document.body) */}
      {studentToDelete &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => {
              if (!isDeleting && !isPermanentDeleting) {
                setStudentToDelete(null)
                setDeleteError(null)
              }
            }}
          >
            <div
              className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4 animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-900">
                    {isStaff ? 'Delete or Unassign Student' : `Remove ${studentToDelete.name}?`}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Student: <strong className="text-neutral-800">{studentToDelete.name}</strong> ({studentToDelete.email})
                  </p>
                </div>
              </div>

              {!isStaff && (
                <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-2xl text-[11px] text-amber-900 leading-relaxed font-medium space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>Mentor Role Authorization Note:</span>
                  </p>
                  <p>
                    Mentors are authorized to remove students from their cohort (unassign guidance). Permanent account deletion requires Campus Manager authorization.
                  </p>
                </div>
              )}

              {isStaff && (
                <div className="p-3 bg-red-50 border border-red-200/90 rounded-2xl text-[11px] text-red-900 leading-relaxed font-medium">
                  <p className="font-bold flex items-center gap-1.5 text-red-800">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                    <span>Permanent Deletion Warning:</span>
                  </p>
                  <p className="mt-1">
                    Permanent deletion will purge the student profile, login account, mentor assignments, all solved problems, and submission history from KalviLearn.
                  </p>
                </div>
              )}

              {deleteError && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-900 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span>{deleteError}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStudentToDelete(null)
                    setDeleteError(null)
                  }}
                  disabled={isDeleting || isPermanentDeleting}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleRemoveFromCohort}
                  disabled={isDeleting || isPermanentDeleting}
                  className="px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Removing...' : 'Remove from Cohort'}
                </button>

                <button
                  type="button"
                  onClick={handlePermanentDelete}
                  disabled={isDeleting || isPermanentDeleting}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
                >
                  {isPermanentDeleting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Permanently Delete</span>
                    </>
                  )}
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
