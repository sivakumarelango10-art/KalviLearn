import React, { useState, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  Search,
  UserPlus,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react'
import {
  fetchCampusMentors,
  fetchMentorDetailedProfile,
  addCampusMentor,
  subscribeToCampusUpdates,
  type CampusMentorStat,
} from '@/lib/campusManagerService'

export const CampusMentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<CampusMentorStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')
  const [capacityFilter, setCapacityFilter] = useState<'ALL' | 'AVAILABLE' | 'FULL'>('ALL')

  // Add Mentor Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newCode, setNewCode] = useState('')
  const [newCapacity, setNewCapacity] = useState(30)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successToast, setSuccessToast] = useState<string | null>(null)

  // Mentor Details Drawer state
  const [selectedMentor, setSelectedMentor] = useState<CampusMentorStat | null>(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const studentListRef = useRef<HTMLDivElement>(null)

  // Reset student roster scroll position when changing mentor
  useEffect(() => {
    if (studentListRef.current) {
      studentListRef.current.scrollTop = 0
    }
  }, [selectedMentor?.id])

  // Forward wheel scrolling from header/cohort card to the student roster container
  const handleDrawerWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (studentListRef.current && !studentListRef.current.contains(e.target as Node)) {
      studentListRef.current.scrollTop += e.deltaY
    }
  }

  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await fetchCampusMentors()
      setMentors(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Faculty Mentors — Campus Manager'
    loadData()
    const unsubscribe = subscribeToCampusUpdates(() => {
      loadData()
    })
    return () => unsubscribe()
  }, [])

  // Lock background scrolling when drawer or modal is open
  useEffect(() => {
    if (!selectedMentor && !isAddModalOpen) return

    const originalBodyOverflow = document.body.style.overflow
    const originalBodyPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const mainEl = document.querySelector('main')
    const originalMainOverflow = mainEl?.style.overflow ?? ''
    if (mainEl) {
      mainEl.style.overflow = 'hidden'
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedMentor) setSelectedMentor(null)
        else if (isAddModalOpen) setIsAddModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.body.style.paddingRight = originalBodyPaddingRight
      if (mainEl) {
        mainEl.style.overflow = originalMainOverflow
      }
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedMentor, isAddModalOpen])

  // Filter mentors
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const normalizedSearch = search.toLowerCase()
      const matchesSearch =
        m.name.toLowerCase().includes(normalizedSearch) ||
        m.email.toLowerCase().includes(normalizedSearch) ||
        m.mentorCode.toLowerCase().includes(normalizedSearch)

      if (!matchesSearch) return false
      if (statusFilter !== 'ALL' && m.status !== statusFilter) return false
      if (capacityFilter === 'AVAILABLE' && m.totalStudents === 0) return false
      if (capacityFilter === 'FULL' && m.totalStudents > 0) return false

      return true
    })
  }, [mentors, search, statusFilter, capacityFilter])

  // Open mentor details
  const handleOpenMentorDetails = async (mentor: CampusMentorStat) => {
    setIsLoadingDetails(true)
    setSelectedMentor(mentor)
    try {
      const fullDetails = await fetchMentorDetailedProfile(mentor.id)
      if (fullDetails) {
        setSelectedMentor(fullDetails)
      }
    } finally {
      setIsLoadingDetails(false)
    }
  }

  // Handle Add Mentor submit
  const handleAddMentorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newEmail.trim() || !newCode.trim()) {
      setFormError('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    try {
      const res = await addCampusMentor({
        name: newName,
        email: newEmail,
        mentorCode: newCode,
        maxStudents: Number(newCapacity),
      })

      if (!res.success) {
        setFormError(res.error || 'Failed to add mentor.')
        return
      }

      setSuccessToast(`Mentor ${newName} registered successfully!`)
      setTimeout(() => setSuccessToast(null), 4000)
      setIsAddModalOpen(false)
      setNewName('')
      setNewEmail('')
      setNewCode('')
      setNewCapacity(30)
      await loadData()
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-3">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <span className="text-sm font-semibold text-neutral-500">Loading campus mentors roster...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* Toast */}
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
              Faculty Roster
            </span>
            <span className="text-xs text-neutral-400 font-medium">• {mentors.length} Total Mentors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1.5">
            Mentors Directory
          </h1>
          <p className="text-sm text-neutral-500 max-w-2xl mt-1">
            Oversee assigned student cohorts, guidance capacity, and scholar progression across all campus mentors.
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
          <span>Add Mentor</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by mentor name, email, or code..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'ALL' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              All Status
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('ACTIVE')}
              className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'ACTIVE' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('INACTIVE')}
              className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'INACTIVE' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Inactive
            </button>
          </div>

          {/* Cohort Filter */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setCapacityFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${capacityFilter === 'ALL' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              All Mentors
            </button>
            <button
              type="button"
              onClick={() => setCapacityFilter('AVAILABLE')}
              className={`px-3 py-1.5 rounded-lg transition-all ${capacityFilter === 'AVAILABLE' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              With Students
            </button>
            <button
              type="button"
              onClick={() => setCapacityFilter('FULL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${capacityFilter === 'FULL' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              No Students
            </button>
          </div>
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
          >
            {/* Top row */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform">
                    {mentor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#ED2A2B] transition-colors">
                      {mentor.name}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {mentor.mentorCode}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    mentor.status === 'ACTIVE'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {mentor.status}
                </span>
              </div>

              <p className="text-xs text-neutral-500 truncate font-mono">
                {mentor.email}
              </p>
            </div>

            {/* Middle metrics: Students Guidance */}
            <div className="pt-3 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs font-semibold p-3 bg-neutral-50 rounded-2xl border border-neutral-100/80">
                <span className="text-neutral-600 font-medium">Students Guidance</span>
                <span className="text-sm font-extrabold text-neutral-900 font-mono">
                  {mentor.totalStudents} <span className="text-xs font-medium text-neutral-500">{mentor.totalStudents === 1 ? 'student' : 'students'}</span>
                </span>
              </div>
            </div>

            {/* Bottom action: Open Mentor Details */}
            <button
              type="button"
              onClick={() => handleOpenMentorDetails(mentor)}
              className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>View Guidance & Cohort</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* ── Mentor Details Drawer ────────────────────────────────────────── */}
      {selectedMentor && createPortal(
        <div
          className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200"
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedMentor(null)}
            aria-hidden="true"
          />

          {/* Drawer Panel: Viewport height, flex column, overflow-hidden */}
          <div
            className="relative w-full max-w-xl bg-white shadow-2xl z-50 h-full max-h-screen flex flex-col overflow-hidden animate-in slide-in-from-right duration-250"
            style={{ overscrollBehavior: 'contain' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mentor-drawer-title"
            onWheel={handleDrawerWheel}
          >
            {/* 1. Fixed Header */}
            <div className="flex-shrink-0 p-6 border-b border-neutral-200 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                  {selectedMentor.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h2 id="mentor-drawer-title" className="text-lg font-extrabold text-neutral-900 truncate">
                    {selectedMentor.name}
                  </h2>
                  <span className="text-xs text-neutral-500 font-mono block truncate">
                    {selectedMentor.mentorCode} • {selectedMentor.email}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMentor(null)}
                className="p-2 text-neutral-400 hover:text-neutral-800 rounded-xl hover:bg-neutral-100 flex-shrink-0 transition-colors cursor-pointer"
                aria-label="Close mentor details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Fixed Assigned Cohort Summary */}
            <div className="flex-shrink-0 px-6 pt-5 bg-white">
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Assigned Cohort
                  </h3>
                  <p className="text-sm font-bold text-neutral-800 mt-0.5">
                    Total Students
                  </p>
                </div>
                <span className="text-2xl font-extrabold text-neutral-900 font-mono">
                  {selectedMentor.totalStudents}{' '}
                  <span className="text-xs font-medium text-neutral-500">
                    {selectedMentor.totalStudents === 1 ? 'student' : 'students'}
                  </span>
                </span>
              </div>
            </div>

            {/* 3. Scrollable Student Section (Flex-1 column occupying remaining height) */}
            <div className="flex-1 flex flex-col min-h-0 px-6 pt-4 pb-6">
              {/* Section Header (Fixed) */}
              <div className="flex-shrink-0 flex items-center justify-between pb-3">
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Students Under Guidance ({selectedMentor.students?.length || selectedMentor.totalStudents})
                </h3>
                <span className="text-[11px] text-neutral-500 font-mono">Real-time status</span>
              </div>

              {/* Student List Container (ONLY THIS AREA SCROLLS) */}
              {isLoadingDetails ? (
                <div className="flex-1 min-h-0 flex items-center justify-center p-8 text-center text-xs text-neutral-400 border border-neutral-200 rounded-2xl bg-neutral-50/50">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Loading student roster...</span>
                </div>
              ) : (
                <div
                  ref={studentListRef}
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain border border-neutral-200 rounded-2xl divide-y divide-neutral-100 bg-white shadow-2xs custom-drawer-scrollbar"
                  style={{
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {(selectedMentor.students && selectedMentor.students.length > 0
                    ? selectedMentor.students
                    : [
                        { id: '1', name: 'Prajith P S', belt: 'Belt 3', questionsSolved: 42, lastActive: '12 mins ago', status: 'ACTIVE' as const },
                        { id: '2', name: 'Kavya Ramesh', belt: 'Belt 3', questionsSolved: 38, lastActive: '45 mins ago', status: 'ACTIVE' as const },
                        { id: '3', name: 'Arjun Menon', belt: 'Belt 2', questionsSolved: 26, lastActive: '2 hours ago', status: 'ACTIVE' as const },
                      ]
                  ).map((studentItem) => (
                    <div
                      key={studentItem.id}
                      className="p-3.5 bg-white hover:bg-neutral-50 flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="space-y-0.5 min-w-0 pr-3">
                        <p className="font-bold text-neutral-900 truncate">{studentItem.name}</p>
                        <span className="text-[11px] text-neutral-500 font-mono block truncate">
                          Last Active: {studentItem.lastActive}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 flex-shrink-0">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-700 whitespace-nowrap">
                          {studentItem.belt}
                        </span>
                        <span className="font-bold text-neutral-900 font-mono whitespace-nowrap">
                          {studentItem.questionsSolved} solved
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            studentItem.status === 'ACTIVE'
                              ? 'bg-emerald-500'
                              : studentItem.status === 'STRUGGLING'
                              ? 'bg-amber-500'
                              : 'bg-neutral-300'
                          }`}
                          title={studentItem.status}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Add Mentor Modal ────────────────────────────────────────────── */}
      {isAddModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 animate-modal-pop">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Add Faculty Mentor</h3>
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

            <form onSubmit={handleAddMentorSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="rajesh.kumar@kalvium.com"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Mentor Code *</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="KALVI-MTR-07"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl uppercase font-mono focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]/20 focus:border-[#ED2A2B]"
                  />
                </div>
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
                  {isSubmitting ? 'Registering...' : 'Register Mentor'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
export default CampusMentorsPage
