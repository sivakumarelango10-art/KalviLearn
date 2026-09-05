import React, { useState, useMemo, useEffect } from 'react'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  MentorStudent,
  fetchMentorRoster,
  subscribeToMentorUpdates,
  addStudent,
  removeStudent,
} from '@/lib/mentorService'

export const MentorStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<MentorStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [beltFilter, setBeltFilter] = useState<'all' | 'Belt 1' | 'Belt 2' | 'Belt 3' | 'attention'>('all')
  const [sortBy, setSortBy] = useState<'progress' | 'streak' | 'name'>('progress')

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

  const loadData = async () => {
    try {
      const data = await fetchMentorRoster()
      setStudents(data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error loading students:', err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()

    const unsubscribe = subscribeToMentorUpdates(() => {
      loadData()
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const attentionCount = students.filter((s) => s.needsAttention).length

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const sName = (s.name || '').toLowerCase()
      const sEmail = (s.email || '').toLowerCase()
      const sLang = (s.language || '').toLowerCase()
      const q = (search || '').toLowerCase()

      const matchesSearch =
        sName.includes(q) ||
        sEmail.includes(q) ||
        sLang.includes(q)

      if (!matchesSearch) return false

      if (beltFilter === 'all') return true
      if (beltFilter === 'attention') return s.needsAttention
      return s.belt === beltFilter
    }).sort((a, b) => {
      if (sortBy === 'progress') return b.progressPercent - a.progressPercent
      if (sortBy === 'streak') return b.streak - a.streak
      return (a.name || '').localeCompare(b.name || '')
    })
  }, [students, search, beltFilter, sortBy])

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
      })

      if (!result.success) {
        setFormError(result.error || 'Failed to add student. Please try again.')
        setIsSubmitting(false)
        return
      }

      // Success
      setSuccessToast(`Scholar ${newName} added successfully!`)
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
      const res = await removeStudent(studentToDelete.id)
      if (res.success) {
        setSuccessToast(`Scholar ${studentToDelete.name} removed from cohort.`)
        setTimeout(() => setSuccessToast(null), 4000)
        setStudentToDelete(null)
        await loadData()
      } else {
        alert(res.error || 'Failed to remove scholar.')
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
          <button onClick={() => setSuccessToast(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100">
              <Users className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Scholar Directory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Manage your registered scholars, track individual belt mastery, and enroll new students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-2 rounded-xl bg-neutral-100 text-neutral-700">
            Cohort 2026 • {isLoading ? '...' : `${students.length} Assigned`}
          </span>

          <button
            onClick={() => {
              setIsAddModalOpen(true)
              setFormError(null)
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-bold transition-all interactive-btn shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Scholar</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name, email, or language..."
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
            <span className="text-xs font-medium">Loading registered scholars...</span>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-neutral-400 bg-white rounded-2xl border border-neutral-200 space-y-3">
          <p>No scholars found matching the selected criteria.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add New Scholar</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((student) => {
            const studentName = student.name || student.email || 'Scholar'
            const initials = studentName
              .trim()
              .split(/\s+/)
              .filter(Boolean)
              .map((w) => w[0] || '')
              .join('')
              .slice(0, 2)
              .toUpperCase() || 'S'

            return (
              <div
                key={student.id}
                className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4 hover:border-neutral-300 transition-all interactive-card relative group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm">{student.name}</h3>
                      <p className="text-[11px] text-neutral-400 font-mono truncate max-w-[150px]">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-2xs"
                      style={{ backgroundColor: student.beltColor }}
                    >
                      {student.belt}
                    </span>
                    <button
                      onClick={() => setStudentToDelete(student)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      title="Remove Scholar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                    <span>Progress</span>
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

                {/* Meta Details */}
                <div className="pt-2 border-t border-neutral-100 grid grid-cols-3 text-center text-xs">
                  <div>
                    <span className="block font-bold text-neutral-900">{student.solvedCount}</span>
                    <span className="text-[10px] text-neutral-400">Solved</span>
                  </div>
                  <div>
                    <span className="block font-bold text-amber-500">{student.streak}d</span>
                    <span className="text-[10px] text-neutral-400">Streak</span>
                  </div>
                  <div>
                    <span className="block font-bold text-neutral-700 uppercase">{student.language}</span>
                    <span className="text-[10px] text-neutral-400">Language</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-neutral-400">
                    Active: {student.lastActive}
                  </span>
                  {student.needsAttention && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Attention
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Scholar Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative animate-modal-pop">
            <button
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
                Enroll New Scholar
              </h3>
              <p className="text-xs text-neutral-500">
                Register a student into the Kalvi cohort. They will immediately gain access to login via Google and begin practicing.
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
                  Scholar Full Name <span className="text-[#ED2A2B]">*</span>
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
                  Must match the Google account the scholar uses to log in.
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
                      <span>Enrolling...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Enroll Scholar</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4 animate-modal-pop">
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
        </div>
      )}
    </div>
  )
}

export default MentorStudentsPage
