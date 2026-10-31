import React, { useEffect, useState } from 'react'
import {
  Users,
  Plus,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  X,
  Edit2,
  Power,
  Building2,
  Mail,
  GraduationCap,
} from 'lucide-react'
import {
  fetchSuperAdminMentors,
  provisionMentor,
  updateMentor,
  toggleMentorStatus,
  fetchCampuses,
  AdminMentor,
  AdminCampus,
} from '@/lib/superAdminService'

export const SuperAdminMentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<AdminMentor[]>([])
  const [campuses, setCampuses] = useState<AdminCampus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [campusFilter, setCampusFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')

  // Modals
  const [showProvisionModal, setShowProvisionModal] = useState(false)
  const [editingMentor, setEditingMentor] = useState<AdminMentor | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Provision Form
  const [provName, setProvName] = useState('')
  const [provEmail, setProvEmail] = useState('')
  const [provCampusId, setProvCampusId] = useState('')
  const [provMaxStudents, setProvMaxStudents] = useState(30)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const [mRes, cRes] = await Promise.all([fetchSuperAdminMentors(), fetchCampuses()])
    if (mRes.success && mRes.data) {
      setMentors(mRes.data)
    } else {
      setError(mRes.error || 'Failed to load mentors.')
    }
    if (cRes.success && cRes.data) {
      setCampuses(cRes.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const res = await provisionMentor({
      name: provName,
      email: provEmail,
      campusId: provCampusId || undefined,
      maxStudents: Number(provMaxStudents) || 30,
    })

    if (res.success) {
      setSuccessMsg(`Mentor "${provName}" provisioned successfully.`)
      setShowProvisionModal(false)
      setProvName('')
      setProvEmail('')
      setProvCampusId('')
      setProvMaxStudents(30)
      loadData()
    } else {
      setError(res.error || 'Failed to provision mentor.')
    }
    setSubmitting(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMentor) return
    setSubmitting(true)
    setError(null)

    const res = await updateMentor(editingMentor.id, {
      name: editingMentor.name || '',
      campusId: editingMentor.campus_id,
      maxStudents: editingMentor.max_students,
      status: editingMentor.status as 'ACTIVE' | 'INACTIVE',
    })

    if (res.success) {
      setSuccessMsg(`Mentor "${editingMentor.name}" updated successfully.`)
      setEditingMentor(null)
      loadData()
    } else {
      setError(res.error || 'Failed to update mentor.')
    }
    setSubmitting(false)
  }

  const handleToggle = async (mentor: AdminMentor) => {
    const nextStatus = mentor.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    const confirm = window.confirm(
      `Change status of mentor "${mentor.name || mentor.email}" to ${nextStatus}?`
    )
    if (!confirm) return

    const res = await toggleMentorStatus(mentor.id, nextStatus)
    if (res.success) {
      setSuccessMsg(`Mentor status changed to ${nextStatus}.`)
      loadData()
    } else {
      setError(res.error || 'Failed to update mentor status.')
    }
  }

  const filtered = mentors.filter((m) => {
    if (statusFilter !== 'ALL' && m.status !== statusFilter) return false
    if (campusFilter !== 'ALL' && m.campus_id !== campusFilter) return false
    if (!search.trim()) return true
    const s = search.toLowerCase()
    return (
      (m.name && m.name.toLowerCase().includes(s)) ||
      (m.email && m.email.toLowerCase().includes(s)) ||
      m.mentor_code.toLowerCase().includes(s)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Faculty Mentors</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Platform-wide directory of guidance mentors, campus assignments, and cohort capacities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-500' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowProvisionModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Provision Mentor</span>
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

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900 p-3 rounded-xl border border-neutral-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by mentor name, email, or code..."
            className="w-full pl-9 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
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
                <th className="py-3.5 px-4">Mentor Name</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Campus</th>
                <th className="py-3.5 px-4">Assigned / Capacity</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-red-500 mb-2" />
                    <span>Loading mentors...</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    No faculty mentors found.
                  </td>
                </tr>
              ) : (
                filtered.map((mentor) => (
                  <tr key={mentor.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {mentor.name || 'Unnamed Mentor'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-300">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700/80 text-[11px]">
                        {mentor.mentor_code}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{mentor.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {mentor.campus ? (
                        <div className="flex items-center gap-1.5 text-blue-300">
                          <Building2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>{mentor.campus.name}</span>
                        </div>
                      ) : (
                        <span className="text-neutral-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-medium text-white">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{mentor.assignedStudentCount}</span>
                        <span className="text-neutral-500">/ {mentor.max_students} students</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {mentor.status === 'ACTIVE' ? (
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
                          onClick={() => setEditingMentor(mentor)}
                          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                          title="Edit Mentor"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggle(mentor)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            mentor.status === 'ACTIVE'
                              ? 'text-neutral-400 hover:text-red-400 hover:bg-neutral-800'
                              : 'text-neutral-400 hover:text-emerald-400 hover:bg-neutral-800'
                          }`}
                          title={mentor.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision Modal */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowProvisionModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span>Provision Faculty Mentor</span>
            </h3>

            <form onSubmit={handleProvision} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Mentor Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={provName}
                  onChange={(e) => setProvName(e.target.value)}
                  placeholder="e.g. Dr. Jane Smith"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Mentor Email *
                </label>
                <input
                  type="email"
                  required
                  value={provEmail}
                  onChange={(e) => setProvEmail(e.target.value.toLowerCase())}
                  placeholder="mentor@kalvium.community"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Campus
                </label>
                <select
                  value={provCampusId}
                  onChange={(e) => setProvCampusId(e.target.value)}
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
                  Max Students Limit
                </label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  value={provMaxStudents}
                  onChange={(e) => setProvMaxStudents(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowProvisionModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Provisioning...' : 'Provision Mentor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setEditingMentor(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-amber-400" />
              <span>Edit Mentor: {editingMentor.mentor_code}</span>
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={editingMentor.name || ''}
                  onChange={(e) => setEditingMentor({ ...editingMentor, name: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Campus
                </label>
                <select
                  value={editingMentor.campus_id || ''}
                  onChange={(e) =>
                    setEditingMentor({ ...editingMentor, campus_id: e.target.value || null })
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
                  Max Students Limit
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={editingMentor.max_students}
                  onChange={(e) =>
                    setEditingMentor({ ...editingMentor, max_students: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Status
                </label>
                <select
                  value={editingMentor.status}
                  onChange={(e) => setEditingMentor({ ...editingMentor, status: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingMentor(null)}
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
    </div>
  )
}

