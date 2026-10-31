import React, { useState, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  Search,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  ChevronRight,
  Trash2,
} from 'lucide-react'
import {
  fetchCampusStudents,
  fetchCampusMentors,
  addCampusStudent,
  assignStudentMentor,
  deleteCampusStudent,
  subscribeToCampusUpdates,
  CAMPUS_BELT_DEFINITIONS,
  type CampusStudentStat,
  type CampusMentorStat,
} from '@/lib/campusManagerService'
import { formatErrorMessage } from '@/lib/errorUtils'

export const CampusStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<CampusStudentStat[]>([])
  const [mentors, setMentors] = useState<CampusMentorStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [beltFilter, setBeltFilter] = useState<string>('ALL')
  const [mentorFilter, setMentorFilter] = useState<string>('ALL')

  // Add Student Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [selectedMentorId, setSelectedMentorId] = useState<string>('NONE')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successToast, setSuccessToast] = useState<string | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Student Details Drawer State
  const [selectedStudent, setSelectedStudent] = useState<CampusStudentStat | null>(null)
  const [reassignMentorId, setReassignMentorId] = useState<string>('')
  const [isReassigning, setIsReassigning] = useState(false)
  const [reassignError, setReassignError] = useState<string | null>(null)

  // Delete Confirmation Modal State
  const [studentToDelete, setStudentToDelete] = useState<CampusStudentStat | null>(null)
  const [isDeletingStudent, setIsDeletingStudent] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const openStudentDetails = (student: CampusStudentStat) => {
    setSelectedStudent(student)
    setReassignMentorId(student.mentorId || 'NONE')
    setReassignError(null)
  }

  const loadData = async (isInitial = false) => {
    if (isInitial) setIsLoading(true)
    try {
      const [studentsData, mentorsData] = await Promise.all([
        fetchCampusStudents(),
        fetchCampusMentors(),
      ])
      setStudents(studentsData)
      setMentors(mentorsData)
    } finally {
      if (isInitial) setIsLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Students Directory — Campus Manager'
    loadData(true)
    const unsubscribe = subscribeToCampusUpdates(() => {
      loadData(false)
    })
    return () => {
      unsubscribe()
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  // Filtered students (sorted alphabetically)
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const normalizedSearch = search.toLowerCase()
        const matchesSearch =
          s.name.toLowerCase().includes(normalizedSearch) ||
          s.email.toLowerCase().includes(normalizedSearch) ||
          s.mentorName.toLowerCase().includes(normalizedSearch)

        if (!matchesSearch) return false
        if (beltFilter !== 'ALL' && s.belt !== beltFilter) return false
        if (mentorFilter !== 'ALL') {
          if (mentorFilter === 'UNASSIGNED' && s.mentorId) return false
          if (mentorFilter !== 'UNASSIGNED' && s.mentorId !== mentorFilter) return false
        }

        return true
      })
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
  }, [students, search, beltFilter, mentorFilter])

  // Handle Add Student submit
  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = newName.trim()
    const trimmedEmail = newEmail.trim().toLowerCase()

    if (!trimmedName || !trimmedEmail) {
      setFormError('Please fill in all required fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    try {
      const autoCode = 'STU-' + Date.now().toString(36).toUpperCase()
      const mentorIdToAssign = selectedMentorId === 'NONE' ? null : selectedMentorId
      const res = await addCampusStudent({
        name: trimmedName,
        email: trimmedEmail,
        studentCode: autoCode,
        mentorId: mentorIdToAssign,
      })

      if (!res.success) {
        setFormError(formatErrorMessage(res.error, 'Failed to enroll student.'))
        return
      }

      setSuccessToast(`Student ${trimmedName} enrolled successfully!`)
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
      toastTimerRef.current = setTimeout(() => setSuccessToast(null), 4000)
      setIsAddModalOpen(false)
      setNewName('')
      setNewEmail('')
      setSelectedMentorId('NONE')
      await loadData()
    } catch (err: unknown) {
      setFormError(formatErrorMessage(err, 'Failed to enroll student.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle re-assign mentor in details drawer
  const handleReassignMentor = async () => {
    if (!selectedStudent) return
    setIsReassigning(true)
    setReassignError(null)
    try {
      const mentorId = reassignMentorId === 'NONE' ? null : reassignMentorId
      const res = await assignStudentMentor(selectedStudent.id, mentorId)
      if (res.success) {
        const assignedName = mentors.find((m) => m.id === mentorId)?.name || 'Unassigned'
        setSuccessToast(`Student mentor updated to: ${assignedName}`)
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
        toastTimerRef.current = setTimeout(() => setSuccessToast(null), 4000)
        setSelectedStudent({
          ...selectedStudent,
          mentorId,
          mentorName: assignedName,
        })
        await loadData()
      } else {
        setReassignError(formatErrorMessage(res.error, 'Failed to update mentor assignment.'))
      }
    } catch (err: unknown) {
      setReassignError(formatErrorMessage(err, 'Failed to update mentor assignment.'))
    } finally {
      setIsReassigning(false)
    }
  }

  // Handle Delete Student confirmed
  const handleConfirmDelete = async () => {
    if (!studentToDelete) return
    setIsDeletingStudent(true)
    setDeleteError(null)
    try {
      const res = await deleteCampusStudent(studentToDelete.id)
      if (res.success) {
        setSuccessToast(`Student ${studentToDelete.name} was permanently deleted.`)
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
        toastTimerRef.current = setTimeout(() => setSuccessToast(null), 4000)
        setStudentToDelete(null)
        if (selectedStudent?.id === studentToDelete.id) {
          setSelectedStudent(null)
        }
        await loadData()
      } else {
        setDeleteError(formatErrorMessage(res.error, 'Failed to delete student.'))
      }
    } catch (err: unknown) {
      setDeleteError(formatErrorMessage(err, 'Failed to delete student.'))
    } finally {
      setIsDeletingStudent(false)
    }
  }

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (studentToDelete && !isDeletingStudent) {
          setStudentToDelete(null)
          setDeleteError(null)
        } else if (isAddModalOpen && !isSubmitting) {
          setIsAddModalOpen(false)
          setFormError(null)
        } else if (selectedStudent && !isReassigning) {
          setSelectedStudent(null)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [studentToDelete, isDeletingStudent, isAddModalOpen, isSubmitting, selectedStudent, isReassigning])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="text-sm font-semibold text-neutral-500">Loading enrolled students...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-neutral-700 flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ED2A2B]/10 text-[#ED2A2B] uppercase tracking-wider">
              Students Directory
            </span>
            <span className="text-xs text-neutral-400 font-medium">• {students.length} Total Students</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1.5">
            Students Directory
          </h1>
          <p className="text-sm text-neutral-500 max-w-2xl mt-1">
            Search, filter, enroll, and manage mentor assignments for all students across the campus.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormError(null)
            setIsAddModalOpen(true)
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ED2A2B] hover:bg-[#D92223] text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, email, or mentor..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Belt Filter */}
            <select
              value={beltFilter}
              onChange={(e) => setBeltFilter(e.target.value)}
              className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl font-semibold text-neutral-700 focus:outline-none"
            >
              <option value="ALL">All Belts</option>
              {CAMPUS_BELT_DEFINITIONS.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name} ({b.title})
                </option>
              ))}
            </select>

            {/* Mentor Filter */}
            <select
              value={mentorFilter}
              onChange={(e) => setMentorFilter(e.target.value)}
              className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl font-semibold text-neutral-700 focus:outline-none max-w-xs"
            >
              <option value="ALL">All Mentors</option>
              <option value="UNASSIGNED">No Mentor Assigned</option>
              {mentors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.totalStudents} std)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200/80 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Student's</th>
                <th className="py-3.5 px-6">Assigned Mentor</th>
                <th className="py-3.5 px-6">Belt Level</th>
                <th className="py-3.5 px-6">Solved / XP</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-neutral-50/80 transition-colors group cursor-pointer"
                  onClick={() => openStudentDetails(student)}
                >
                  {/* Student info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 group-hover:text-[#ED2A2B] transition-colors">
                          {student.name}
                        </p>
                        <span className="text-[11px] text-neutral-400 font-mono">
                          {student.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Mentor */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                      <span className={student.mentorId ? 'text-neutral-800' : 'text-neutral-400 italic'}>
                        {student.mentorName}
                      </span>
                    </div>
                  </td>

                  {/* Belt */}
                  <td className="py-4 px-6">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white"
                      style={{ backgroundColor: student.beltColor }}
                    >
                      {student.belt}
                    </span>
                  </td>

                  {/* Solved / XP */}
                  <td className="py-4 px-6">
                    <div className="font-mono">
                      <span className="font-bold text-neutral-900">{student.questionsSolved} solved</span>
                      <span className="text-neutral-400 ml-1.5">• {student.totalXp} XP</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          openStudentDetails(student)
                        }}
                        className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteError(null)
                          setStudentToDelete(student)
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title={`Delete ${student.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Student Details Drawer ────────────────────────────────────────── */}
      {selectedStudent && createPortal(
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedStudent(null)}
          />

          <div className="relative w-full max-w-lg bg-white shadow-2xl z-50 h-full flex flex-col overflow-y-auto animate-in slide-in-from-right duration-250 custom-drawer-scrollbar">
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-neutral-900">{selectedStudent.name}</h2>
                  <span className="text-xs text-neutral-500 font-mono">{selectedStudent.email}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="p-2 text-neutral-400 hover:text-neutral-800 rounded-xl hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 flex-1 text-xs">
              {/* 1. Student Snapshot */}
              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-4">
                <h3 className="font-bold text-neutral-400 uppercase tracking-wider text-[11px]">
                  Learning Performance
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase">Questions Solved</span>
                    <p className="text-lg font-extrabold text-neutral-900 mt-0.5">{selectedStudent.questionsSolved}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase">Total XP</span>
                    <p className="text-lg font-extrabold text-amber-600 mt-0.5">{selectedStudent.totalXp}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase">Streak</span>
                    <p className="text-lg font-extrabold text-red-600 mt-0.5">{selectedStudent.streak} days</p>
                  </div>
                </div>
              </div>

              {/* 2. Mentor Assignment Section */}
              <div className="p-5 bg-purple-50/60 border border-purple-200/80 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                  <h3 className="font-bold text-purple-900">Faculty Mentor Assignment</h3>
                </div>
                <p className="text-neutral-600 text-[11px]">
                  Current Guidance: <span className="font-bold text-neutral-900">{selectedStudent.mentorName}</span>
                </p>

                {reassignError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 font-medium animate-in fade-in">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{reassignError}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-2">
                  <select
                    value={reassignMentorId}
                    onChange={(e) => {
                      setReassignMentorId(e.target.value)
                      if (reassignError) setReassignError(null)
                    }}
                    disabled={isReassigning}
                    className="flex-1 px-3 py-2 bg-white border border-purple-200 rounded-xl font-semibold text-neutral-800 focus:outline-none disabled:opacity-60"
                  >
                    <option value="NONE">No Mentor for now (Unassigned)</option>
                    {mentors.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.totalStudents} {m.totalStudents === 1 ? 'student' : 'students'})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleReassignMentor}
                    disabled={isReassigning}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {isReassigning ? 'Updating...' : 'Reassign'}
                  </button>
                </div>
              </div>

              {/* 3. Language Solved Breakdown */}
              <div className="space-y-3">
                <h3 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                  Solved by Programming Language
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <span className="font-semibold text-neutral-700">Python</span>
                    <span className="font-bold text-neutral-900 font-mono">
                      {selectedStudent.languageSolvedCounts?.python || 0}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <span className="font-semibold text-neutral-700">Java</span>
                    <span className="font-bold text-neutral-900 font-mono">
                      {selectedStudent.languageSolvedCounts?.java || 0}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <span className="font-semibold text-neutral-700">C++</span>
                    <span className="font-bold text-neutral-900 font-mono">
                      {selectedStudent.languageSolvedCounts?.cpp || 0}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <span className="font-semibold text-neutral-700">Node.js</span>
                    <span className="font-bold text-neutral-900 font-mono">
                      {selectedStudent.languageSolvedCounts?.nodejs || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Danger Zone */}
              <div className="p-5 bg-red-50/60 border border-red-200/80 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-red-700">
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <h3 className="font-bold">Danger Zone</h3>
                </div>
                <p className="text-neutral-600 text-[11px] leading-relaxed">
                  Permanently delete this student account, profile, mentor assignments, and submission history from KalviLearn. This action is irreversible.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteError(null)
                    setStudentToDelete(selectedStudent)
                  }}
                  className="w-full py-2.5 px-4 bg-white hover:bg-red-600 hover:text-white text-red-600 border border-red-200 hover:border-red-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Student Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Add Student Modal with Mentor Selection ─────────────────────── */}
      {isAddModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 animate-modal-pop">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Enroll New Student</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddStudentSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Student Full Name"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Student Email *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="student@institution.edu"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                />
              </div>


              {/* Assign Mentor Dropdown */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  Assign Faculty Mentor (Guidance)
                </label>
                <select
                  value={selectedMentorId}
                  onChange={(e) => setSelectedMentorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                >
                  <option value="NONE">No Mentor for now</option>
                  {mentors.map((m, index) => (
                    <option key={m.id} value={m.id}>
                      Mentor {index + 1}: {m.name} ({m.totalStudents} {m.totalStudents === 1 ? 'student' : 'students'})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-400 mt-1">
                  You can assign to any mentor or choose &quot;No Mentor for now&quot; to assign later.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#ED2A2B] hover:bg-[#D92223] text-white rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Enrolling...' : 'Enroll Student'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ── Delete Student Confirmation Modal ─────────────────────────────── */}
      {studentToDelete && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => {
            if (!isDeletingStudent) {
              setStudentToDelete(null)
              setDeleteError(null)
            }
          }}
        >
          <div
            className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-modal-pop border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-neutral-900">
                  Delete Student Account?
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete{' '}
                  <strong className="text-neutral-800">{studentToDelete.name}</strong> ({studentToDelete.email})?
                </p>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Student Code:</span>
                <span className="font-mono font-bold text-neutral-800">{studentToDelete.studentCode}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Current Belt:</span>
                <span className="font-bold text-neutral-800">{studentToDelete.belt}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Assigned Mentor:</span>
                <span className="font-semibold text-neutral-800">{studentToDelete.mentorName}</span>
              </div>
            </div>

            <div className="p-3.5 bg-red-50 border border-red-200/90 rounded-2xl text-[11px] text-red-800 leading-relaxed font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
              <span>
                <strong>Warning:</strong> This permanently purges the student profile, login account, mentor assignments, all solved problems ({studentToDelete.questionsSolved}), and earned XP ({studentToDelete.totalXp}). This action cannot be undone.
              </span>
            </div>

            {deleteError && (
              <div className="p-3.5 bg-red-100/80 border border-red-300 text-red-900 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{deleteError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStudentToDelete(null)
                  setDeleteError(null)
                }}
                disabled={isDeletingStudent}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeletingStudent}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isDeletingStudent ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Permanently Delete Student</span>
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
export default CampusStudentsPage
