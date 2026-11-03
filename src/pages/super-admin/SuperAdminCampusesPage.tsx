import React, { useEffect, useState } from 'react'
import {
  Building2,
  Plus,
  Search,
  Filter,
  Edit2,
  Power,
  RefreshCw,
  CheckCircle2,
  XCircle,
  X,
  Users,
  GraduationCap,
  MapPin,
  UserCheck,
} from 'lucide-react'
import {
  fetchCampuses,
  createCampus,
  updateCampus,
  toggleCampusStatus,
  fetchCampusManagers,
  AdminCampus,
  AdminCampusManager,
} from '@/lib/superAdminService'

export const SuperAdminCampusesPage: React.FC = () => {
  const [campuses, setCampuses] = useState<AdminCampus[]>([])
  const [managers, setManagers] = useState<AdminCampusManager[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCampus, setEditingCampus] = useState<AdminCampus | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Create form state
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newState, setNewState] = useState('')
  const [newCountry, setNewCountry] = useState('India')
  const [newStatus, setNewStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE')
  const [newManagerId, setNewManagerId] = useState('')

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const [cRes, mRes] = await Promise.all([fetchCampuses(), fetchCampusManagers()])
    if (cRes.success && cRes.data) {
      setCampuses(cRes.data)
    } else {
      setError(cRes.error || 'Failed to load campuses.')
    }
    if (mRes.success && mRes.data) {
      setManagers(mRes.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const res = await createCampus({
      code: newCode,
      name: newName,
      city: newCity || undefined,
      state: newState || undefined,
      country: newCountry || undefined,
      status: newStatus,
      managerId: newManagerId || undefined,
    })

    if (res.success) {
      setSuccessMsg(`Campus "${newName}" created successfully.`)
      setShowCreateModal(false)
      // Reset form
      setNewCode('')
      setNewName('')
      setNewCity('')
      setNewState('')
      setNewManagerId('')
      loadData()
    } else {
      setError(res.error || 'Failed to create campus.')
    }
    setSubmitting(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCampus) return
    setSubmitting(true)
    setError(null)

    const res = await updateCampus(editingCampus.id, {
      name: editingCampus.name,
      city: editingCampus.city,
      state: editingCampus.state,
      country: editingCampus.country,
      status: editingCampus.status,
      managerId: editingCampus.manager_id || null,
    })

    if (res.success) {
      setSuccessMsg(`Campus "${editingCampus.name}" updated successfully.`)
      setEditingCampus(null)
      loadData()
    } else {
      setError(res.error || 'Failed to update campus.')
    }
    setSubmitting(false)
  }

  const handleToggle = async (campus: AdminCampus) => {
    const nextStatus = campus.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    const confirm = window.confirm(
      `Are you sure you want to change campus "${campus.name}" to ${nextStatus}?`
    )
    if (!confirm) return

    const res = await toggleCampusStatus(campus.id, nextStatus)
    if (res.success) {
      setSuccessMsg(`Campus "${campus.name}" is now ${nextStatus}.`)
      loadData()
    } else {
      setError(res.error || 'Failed to change campus status.')
    }
  }

  const filtered = campuses.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false
    if (!search.trim()) return true
    const s = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(s) ||
      c.code.toLowerCase().includes(s) ||
      (c.city && c.city.toLowerCase().includes(s))
    )
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#FF6266]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Campus Management</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Authoritative registry of university and tech campuses, status controls, and manager bindings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080808] border border-white/10 hover:border-white/15 text-neutral-300 hover:text-white text-xs font-medium transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-500' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campus</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-[#1F0B0B]/40 border border-red-900/60 text-[#FF6266] text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-[#FF6266] flex-shrink-0" />
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

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080808] p-3 rounded-xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by campus name, code, or city..."
            className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs text-neutral-400">Status:</span>
          {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors font-medium ${
                statusFilter === st
                  ? 'bg-[#141414] text-white border border-white/15'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Campuses Table */}
      <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-black/60 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Campus Name</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Manager</th>
                <th className="py-3.5 px-4">Enrolled Students</th>
                <th className="py-3.5 px-4">Mentors</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-red-500 mb-2" />
                    <span>Loading campuses...</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400">
                    No campuses found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((campus) => (
                  <tr key={campus.id} className="hover:bg-[#141414]/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {campus.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-300">
                      <span className="px-2 py-0.5 rounded bg-[#141414] border border-white/15/80 text-[11px]">
                        {campus.code}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{campus.city ? `${campus.city}, ${campus.state || ''}` : 'Unspecified'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {campus.manager ? (
                        <div className="flex items-center gap-1.5 text-[#FF6266]">
                          <UserCheck className="w-3.5 h-3.5 text-[#FF6266]" />
                          <span className="font-medium">{campus.manager.name || campus.manager.email}</span>
                        </div>
                      ) : (
                        <span className="text-neutral-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{campus.studentCount ?? 0}</span>
                        <span className="text-[10px] text-neutral-500">
                          ({campus.activeStudentCount ?? 0} active)
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#FF6266]" />
                        <span>{campus.mentorCount ?? 0}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {campus.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#141414] text-neutral-400 border border-white/15">
                          INACTIVE
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingCampus(campus)}
                          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#141414] transition-colors"
                          title="Edit Campus"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggle(campus)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            campus.status === 'ACTIVE'
                              ? 'text-neutral-400 hover:text-[#FF6266] hover:bg-[#141414]'
                              : 'text-neutral-400 hover:text-emerald-400 hover:bg-[#141414]'
                          }`}
                          title={campus.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
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

      {/* Create Campus Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-[#080808] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#FF6266]" />
              <span>Create New Campus</span>
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Campus Code * <span className="text-[10px] text-neutral-500 font-mono">(e.g. KALVIUM-PUNE)</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="KALVIUM-DELHI"
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white font-mono focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Campus Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Kalvium Delhi Technological Campus"
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Delhi"
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    placeholder="Delhi NCR"
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    placeholder="India"
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Assign Campus Manager
                </label>
                <select
                  value={newManagerId}
                  onChange={(e) => setNewManagerId(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="">None (Assign Later)</option>
                  {managers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name || m.email} ({m.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Campus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Campus Modal */}
      {editingCampus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-[#080808] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setEditingCampus(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-[#FF6266]" />
              <span>Edit Campus: {editingCampus.code}</span>
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Campus Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCampus.name}
                  onChange={(e) => setEditingCampus({ ...editingCampus, name: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editingCampus.city || ''}
                    onChange={(e) => setEditingCampus({ ...editingCampus, city: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={editingCampus.state || ''}
                    onChange={(e) => setEditingCampus({ ...editingCampus, state: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Status
                </label>
                <select
                  value={editingCampus.status}
                  onChange={(e) =>
                    setEditingCampus({
                      ...editingCampus,
                      status: e.target.value as 'ACTIVE' | 'INACTIVE',
                    })
                  }
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Campus Manager
                </label>
                <select
                  value={editingCampus.manager_id || ''}
                  onChange={(e) =>
                    setEditingCampus({ ...editingCampus, manager_id: e.target.value || null })
                  }
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="">None (Unassigned)</option>
                  {managers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name || m.email} ({m.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingCampus(null)}
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
