import React, { useEffect, useMemo, useState } from 'react'
import {
  UserCog,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  X,
  Power,
  Building2,
  Mail,
  Calendar,
} from 'lucide-react'
import {
  fetchCampusManagers,
  provisionCampusManager,
  assignManagerCampus,
  toggleManagerStatus,
  fetchCampuses,
  AdminCampusManager,
  AdminCampus,
} from '@/lib/superAdminService'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export const SuperAdminManagersPage: React.FC = () => {
  useDocumentTitle('Manager Management')
  const [managers, setManagers] = useState<AdminCampusManager[]>([])
  const [campuses, setCampuses] = useState<AdminCampus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Modals
  const [showProvisionModal, setShowProvisionModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reassigningManager, setReassigningManager] = useState<AdminCampusManager | null>(null)
  const [selectedCampusId, setSelectedCampusId] = useState('')

  // Provision Form
  const [provName, setProvName] = useState('')
  const [provEmail, setProvEmail] = useState('')
  const [provCampusId, setProvCampusId] = useState('')

  const loadData = async (forceRefresh = false) => {
    setLoading(true)
    setError(null)
    const [mRes, cRes] = await Promise.all([
      fetchCampusManagers({ forceRefresh }),
      fetchCampuses({ forceRefresh }),
    ])
    if (mRes.success && mRes.data) {
      setManagers(mRes.data)
    } else {
      setError(mRes.error || 'Failed to load managers.')
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

    const res = await provisionCampusManager({
      name: provName,
      email: provEmail,
      campusId: provCampusId || undefined,
    })

    if (res.success) {
      setSuccessMsg(`Campus Manager "${provName}" provisioned successfully.`)
      setShowProvisionModal(false)
      setProvName('')
      setProvEmail('')
      setProvCampusId('')
      loadData(true)
    } else {
      setError(res.error || 'Failed to provision manager.')
    }
    setSubmitting(false)
  }

  const handleReassign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reassigningManager) return
    setSubmitting(true)
    setError(null)

    const res = await assignManagerCampus(reassigningManager.id, selectedCampusId || null)
    if (res.success) {
      setSuccessMsg(`Campus updated for manager ${reassigningManager.name || reassigningManager.email}.`)
      setReassigningManager(null)
      loadData(true)
    } else {
      setError(res.error || 'Failed to reassign campus.')
    }
    setSubmitting(false)
  }

  const handleToggle = async (manager: AdminCampusManager) => {
    const nextStatus = manager.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    const confirm = window.confirm(
      `Change status of manager "${manager.name || manager.email}" to ${nextStatus}?`
    )
    if (!confirm) return

    const res = await toggleManagerStatus(manager.id, nextStatus)
    if (res.success) {
      setSuccessMsg(`Manager status changed to ${nextStatus}.`)
      loadData(true)
    } else {
      setError(res.error || 'Failed to update manager status.')
    }
  }

  const filtered = useMemo(() => {
    return managers.filter((m) => {
      if (!search.trim()) return true
      const s = search.toLowerCase()
      return (
        (m.name && m.name.toLowerCase().includes(s)) ||
        m.email.toLowerCase().includes(s) ||
        (m.managerCode && m.managerCode.toLowerCase().includes(s)) ||
        (m.campus && (m.campus.name.toLowerCase().includes(s) || m.campus.code.toLowerCase().includes(s)))
      )
    })
  }, [managers, search])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <UserCog className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Campus Managers</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Provision, campus-bind, and govern administrative staff overseeing institutional campuses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadData(true)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080808] border border-white/10 hover:border-white/15 text-neutral-300 hover:text-white text-xs font-medium transition-all"
          >
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowProvisionModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold shadow-lg shadow-red-950/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Provision Manager</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search */}
      <div className="bg-[#080808] p-3 rounded-xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search aria-hidden="true" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            id="manager-search"
            name="manager-search"
            type="search"
            aria-label="Search managers by name, email, or campus"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search managers by name, email, or campus..."
            className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-red-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121212] text-neutral-400 border-b border-white/10 font-medium">
              <tr>
                <th className="py-3.5 px-4">Manager Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Assigned Campus</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Provisioned</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-3.5 px-4"><div className="h-4 w-32 bg-white/[0.08] rounded" /></td>
                    <td className="py-3.5 px-4"><div className="h-4 w-40 bg-white/[0.08] rounded" /></td>
                    <td className="py-3.5 px-4"><div className="h-4 w-28 bg-white/[0.08] rounded" /></td>
                    <td className="py-3.5 px-4"><div className="h-4 w-20 bg-white/[0.08] rounded" /></td>
                    <td className="py-3.5 px-4"><div className="h-4 w-16 bg-white/[0.08] rounded" /></td>
                    <td className="py-3.5 px-4"><div className="h-4 w-24 bg-white/[0.08] rounded" /></td>
                    <td className="py-3.5 px-4 text-right"><div className="h-4 w-16 bg-white/[0.08] rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <UserCog className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                    <p className="font-medium text-neutral-300">No campus managers found</p>
                    <p className="text-xs text-neutral-500 mt-1">Try adjusting your search query.</p>
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="mt-3 px-3 py-1 rounded-md bg-white/10 hover:bg-white/15 text-xs text-white transition-colors"
                      >
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((mgr) => (
                  <tr key={mgr.id} className="hover:bg-[#141414]/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{mgr.name || 'Unnamed Manager'}</div>
                      {mgr.managerCode && (
                        <div className="text-[11px] font-mono text-neutral-400 font-normal">
                          {mgr.managerCode}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{mgr.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {mgr.campus ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-medium">
                          <Building2 className="w-3 h-3 text-purple-400" />
                          <span>{mgr.campus.name}</span>
                          <span className="text-[10px] text-neutral-400">({mgr.campus.code})</span>
                        </span>
                      ) : (
                        <span className="text-neutral-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300">
                        {mgr.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {mgr.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-neutral-400">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Inactive</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{new Date(mgr.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setReassigningManager(mgr)
                            setSelectedCampusId(mgr.campus_id || '')
                          }}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-medium transition-colors"
                        >
                          Campus
                        </button>
                        <button
                          onClick={() => handleToggle(mgr)}
                          className={`p-1 rounded border transition-colors ${
                            mgr.status === 'ACTIVE'
                              ? 'border-emerald-500/20 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/40'
                              : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                          }`}
                          title={mgr.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
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
          <div className="max-w-md w-full bg-[#080808] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowProvisionModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <UserCog className="w-6 h-6 text-purple-400" />
              <span>Provision Campus Manager</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Create an administrative user profile and immediately assign campus governance.
            </p>

            <form onSubmit={handleProvision} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={provName}
                  onChange={(e) => setProvName(e.target.value)}
                  placeholder="e.g., Dr. Alice Smith"
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={provEmail}
                  onChange={(e) => setProvEmail(e.target.value.toLowerCase())}
                  placeholder="manager@campus.edu"
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Assigned Campus
                </label>
                <select
                  value={provCampusId}
                  onChange={(e) => setProvCampusId(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="">None (Unassigned)</option>
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
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
                  {submitting ? 'Provisioning...' : 'Provision Manager'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reassign Campus Modal */}
      {reassigningManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-[#080808] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setReassigningManager(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              <span>Assign Campus</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Manager: <span className="text-white font-medium">{reassigningManager.name || reassigningManager.email}</span>
            </p>

            <form onSubmit={handleReassign} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Select Campus
                </label>
                <select
                  value={selectedCampusId}
                  onChange={(e) => setSelectedCampusId(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="">None (Unassigned)</option>
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setReassigningManager(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Updating...' : 'Save Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
