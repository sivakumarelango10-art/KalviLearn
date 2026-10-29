import React, { useEffect, useState } from 'react'
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  X,
  Edit2,
  Trash2,
  Building2,
  Mail,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react'
import {
  fetchSuperAdminStudents,
  enrollStudent,
  updateStudent,
  deleteStudentPermanent,
  fetchCampuses,
  fetchSuperAdminMentors,
  AdminStudent,
  AdminCampus,
  AdminMentor,
} from '@/lib/superAdminService'

export const SuperAdminStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<AdminStudent[]>([])
  const [campuses, setCampuses] = useState<AdminCampus[]>([])
  const [mentors, setMentors] = useState<AdminMentor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Filters & Pagination
  const [search, setSearch] = useState('')
  const [campusFilter, setCampusFilter] = useState('ALL')
  const [mentorFilter, setMentorFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const [limit] = useState(30)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Modals
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState<AdminStudent | null>(null)
  const [deletingStudent, setDeletingStudent] = useState<AdminStudent | null>(null)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Enroll Form
  const [enrollName, setEnrollName] = useState('')
  const [enrollEmail, setEnrollEmail] = useState('')
  const [enrollCampusId, setEnrollCampusId] = useState('')
  const [enrollMentorId, setEnrollMentorId] = useState('')
  const [enrollCode, setEnrollCode] = useState('')

  const loadData = async (targetPage = page) => {
    setLoading(true)
    setError(null)
    const [sRes, cRes, mRes] = await Promise.all([
      fetchSuperAdminStudents({
        search: search.trim() || undefined,
        campusId: campusFilter !== 'ALL' ? campusFilter : undefined,
        mentorId: mentorFilter !== 'ALL' ? mentorFilter : undefined,
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        page: targetPage,
        limit,
      }),
      fetchCampuses(),
      fetchSuperAdminMentors(),
    ])

    if (sRes.success && sRes.data) {
      setStudents(sRes.data.students || [])
      setTotalCount(sRes.data.totalCount || 0)
      setTotalPages(sRes.data.totalPages || 1)
      setPage(sRes.data.page || targetPage)
    } else {
      setError(sRes.error || 'Failed to load students.')
    }

    if (cRes.success && cRes.data) setCampuses(cRes.data)
    if (mRes.success && mRes.data) setMentors(mRes.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData(1)
  }, [campusFilter, mentorFilter, statusFilter])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loadData(1)
  }

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const res = await enrollStudent({
      name: enrollName,
      email: enrollEmail,
      campusId: enrollCampusId || undefined,
      mentorId: enrollMentorId || undefined,
      studentCode: enrollCode || undefined,
    })

    if (res.success) {
      setSuccessMsg(`Student "${enrollName}" enrolled successfully.`)
      setShowEnrollModal(false)
      setEnrollName('')
      setEnrollEmail('')
      setEnrollCampusId('')
      setEnrollMentorId('')
      setEnrollCode('')
      loadData(1)
    } else {
      setError(res.error || 'Failed to enroll student.')
    }
    setSubmitting(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingStudent) return
    setSubmitting(true)
    setError(null)

    const res = await updateStudent(editingStudent.id, {
      name: editingStudent.name || '',
      campusId: editingStudent.campus_id,
      mentorId: editingStudent.mentor?.id || null,
      status: editingStudent.status as 'ACTIVE' | 'INACTIVE',
    })

    if (res.success) {
      setSuccessMsg(`Student "${editingStudent.name}" updated successfully.`)
      setEditingStudent(null)
      loadData(page)
    } else {
      setError(res.error || 'Failed to update student.')
    }
    setSubmitting(false)
  }

  const handleDeletePermanent = async () => {
    if (!deletingStudent) return
    setSubmitting(true)
    setError(null)

    const res = await deleteStudentPermanent(deletingStudent.id)
    if (res.success) {
      setSuccessMsg(`Student "${deletingStudent.name || deletingStudent.email}" was permanently deleted.`)
      setDeletingStudent(null)
      setDeleteConfirmText('')
      loadData(page)
    } else {
      setError(res.error || 'Failed to delete student.')
    }
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Platform Students Directory</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Centrally manage enrolled students across all campuses, assign mentors, and audit progression.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadData(page)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-500' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowEnrollModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enroll Student</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-900/60 text-red-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-xs text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-emerald-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-xs text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-neutral-900 p-3 rounded-xl border border-neutral-800">
        <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, or code..."
            className="w-full pl-9 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-red-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Campus Filter */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Building2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>Campus:</span>
            <select
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
              className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-hidden focus:border-red-500"
            >
              <option value="ALL">All Campuses</option>
              {campuses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mentor Filter */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <UserCheck className="w-3.5 h-3.5 text-neutral-500" />
            <span>Mentor:</span>
            <select
              value={mentorFilter}
              onChange={(e) => setMentorFilter(e.target.value)}
              className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-hidden focus:border-red-500 max-w-[150px] truncate"
            >
              <option value="ALL">All Mentors</option>
              {mentors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name || m.email}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-neutral-400" />
            {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2 py-1 text-xs rounded-lg transition-colors font-medium ${
                  statusFilter === st
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Student Code</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Campus</th>
                <th className="py-3.5 px-4">Assigned Mentor</th>
                <th className="py-3.5 px-4">Solved / XP</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-red-500 mb-2" />
                    <span>Loading student records...</span>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400">
                    No student records found matching your filters.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {student.name || 'Unnamed Student'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-300">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700/80 text-[11px]">
                        {student.student_code}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{student.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {student.campus ? (
                        <div className="flex items-center gap-1 text-blue-300">
                          <Building2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>{student.campus.name}</span>
                        </div>
                      ) : (
                        <span className="text-neutral-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {student.mentor ? (
                        <div className="flex items-center gap-1 text-amber-300">
                          <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>{student.mentor.name || student.mentor.email}</span>
                        </div>
                      ) : (
                        <span className="text-neutral-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{student.stats?.solvedCount ?? 0}</span>
                        <span className="text-neutral-500 text-[10px]">solved</span>
                        <span className="text-red-400 font-semibold">{student.stats?.totalXp ?? 0} XP</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {student.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                          INACTIVE
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingStudent(student)}
                          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                          title="Edit Student"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingStudent(student)
                            setDeleteConfirmText('')
                          }}
                          className="p-1.5 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors"
                          title="Permanently Delete Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between text-xs text-neutral-400">
          <div>
            Showing <span className="text-white font-medium">{students.length}</span> of{' '}
            <span className="text-white font-medium">{totalCount}</span> students
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => loadData(Math.max(1, page - 1))}
              disabled={page <= 1 || loading}
              className="p-1.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page <span className="text-white font-medium">{page}</span> of{' '}
              <span className="text-white font-medium">{totalPages}</span>
            </span>
            <button
              onClick={() => loadData(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages || loading}
              className="p-1.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Enroll Student Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowEnrollModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>Enroll New Student</span>
            </h3>

            <form onSubmit={handleEnroll} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={enrollName}
                  onChange={(e) => setEnrollName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Student Email *
                </label>
                <input
                  type="email"
                  required
                  value={enrollEmail}
                  onChange={(e) => setEnrollEmail(e.target.value.toLowerCase())}
                  placeholder="student@kalvium.community"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Campus Assignment
                </label>
                <select
                  value={enrollCampusId}
                  onChange={(e) => setEnrollCampusId(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="">None (Unassigned)</option>
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Assign Faculty Mentor (Guidance)
                </label>
                <select
                  value={enrollMentorId}
                  onChange={(e) => setEnrollMentorId(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="">None (Assign Later)</option>
                  {mentors.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name || m.email} ({m.mentor_code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Student Code <span className="text-[10px] text-neutral-500">(Optional, auto-generated if blank)</span>
                </label>
                <input
                  type="text"
                  value={enrollCode}
                  onChange={(e) => setEnrollCode(e.target.value.toUpperCase())}
                  placeholder="STU-00123"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Enrolling...' : 'Enroll Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setEditingStudent(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-emerald-400" />
              <span>Edit Student: {editingStudent.student_code}</span>
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={editingStudent.name || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Campus
                </label>
                <select
                  value={editingStudent.campus_id || ''}
                  onChange={(e) =>
                    setEditingStudent({ ...editingStudent, campus_id: e.target.value || null })
                  }
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="">None (Unassigned)</option>
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Assigned Mentor
                </label>
                <select
                  value={editingStudent.mentor?.id || ''}
                  onChange={(e) => {
                    const mId = e.target.value
                    const found = mentors.find((m) => m.id === mId)
                    setEditingStudent({
                      ...editingStudent,
                      mentor: found ? { id: found.id, name: found.name, email: found.email } : null,
                    })
                  }}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="">None (Unassigned)</option>
                  {mentors.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name || m.email} ({m.mentor_code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Status
                </label>
                <select
                  value={editingStudent.status}
                  onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-red-900/60 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setDeletingStudent(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Permanently Delete Student?
            </h3>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              This will permanently delete <strong className="text-white">{deletingStudent.name || deletingStudent.email}</strong>,
              including their profile, mentor links, problem progress, and code submissions from the database.
              This action cannot be undone.
            </p>

            <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg mb-4 text-xs font-mono text-neutral-300">
              <div>Email: {deletingStudent.email}</div>
              <div>Code: {deletingStudent.student_code}</div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-neutral-400 mb-1">
                Type <span className="font-mono text-white font-semibold">DELETE</span> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setDeletingStudent(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeletePermanent}
                disabled={deleteConfirmText !== 'DELETE' || submitting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold disabled:opacity-40"
              >
                {submitting ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
