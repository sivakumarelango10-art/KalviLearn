import React, { useEffect, useState } from 'react'
import {
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  X,
  ShieldAlert,
  UserCheck,
  Mail,
  Building2,
  Lock,
} from 'lucide-react'
import {
  fetchUserRolesDirectory,
  updateUserRole,
  AdminUserRole,
} from '@/lib/superAdminService'

const ROLE_COLORS: Record<string, string> = {
  SUPERADMIN: 'bg-[#1F0B0B] text-[#FF6266] border-[#681717]',
  CAMPUS_MANAGER: 'bg-[#1F0B0B] text-[#FF6266] border-[#681717]',
  ADMIN: 'bg-[#1F0B0B] text-[#FF6266] border-[#681717]',
  MENTOR: 'bg-[#1F0B0B] text-[#FF6266] border-[#681717]',
  STUDENT: 'bg-[#1F0B0B] text-[#FF8588] border-[#681717]',
}

const SUPPORTED_ROLES = ['STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN'] as const

export const SuperAdminRolesPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserRole[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')

  // Modals
  const [selectedUser, setSelectedUser] = useState<AdminUserRole | null>(null)
  const [newRole, setNewRole] = useState<'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN'>('STUDENT')
  const [submitting, setSubmitting] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const res = await fetchUserRolesDirectory()
    if (res.success && res.data) {
      setUsers(res.data)
    } else {
      setError(res.error || 'Failed to load user roles.')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleRoleChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    setSubmitting(true)
    setError(null)

    const res = await updateUserRole(selectedUser.id, newRole)
    if (res.success) {
      setSuccessMsg(
        `Role for ${selectedUser.name || selectedUser.email} updated from ${selectedUser.role} to ${newRole}.`
      )
      setSelectedUser(null)
      loadData()
    } else {
      setError(res.error || 'Failed to update user role.')
    }
    setSubmitting(false)
  }

  const filtered = users.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false
    if (!search.trim()) return true
    const s = search.toLowerCase()
    return (
      (u.name && u.name.toLowerCase().includes(s)) ||
      u.email.toLowerCase().includes(s) ||
      (u.campus && u.campus.name.toLowerCase().includes(s))
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#FF6266]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Role & Access Control (RBAC)</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Centrally manage user roles across the platform with strict Super Admin safeguards.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080808] border border-white/10 hover:border-white/15 text-neutral-300 hover:text-white text-xs font-medium transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF6266]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-[#1F0B0B]/40 border border-[#681717] text-[#FF6266] text-sm flex items-center justify-between">
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

      {/* Security Principles Banner */}
      <div className="p-4 rounded-xl bg-[#080808]/90 border border-white/10 text-xs text-neutral-300 space-y-1.5">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Lock className="w-4 h-4 text-[#FF6266]" />
          <span>Super Admin Access Enforcement Rules</span>
        </div>
        <ul className="list-disc list-inside text-neutral-400 space-y-1 pl-1">
          <li>
            <strong className="text-white">Sole Administrator Protection:</strong> The account{' '}
            <code className="text-[#FF6266] font-mono">sgjitbros@gmail.com</code> is immutable and can never be demoted.
          </li>
          <li>
            <strong className="text-white">Role Restrictions:</strong> Only{' '}
            <code className="text-[#FF6266] font-mono">sgjitbros@gmail.com</code> may hold the{' '}
            <code className="text-[#FF6266] font-mono">SUPERADMIN</code> role. Self-promotion and other promotions to SUPERADMIN are denied.
          </li>
          <li>
            <strong className="text-white">Automatic Profile Synchronization:</strong> Assigning a user to{' '}
            <code className="text-white font-mono">MENTOR</code> or{' '}
            <code className="text-white font-mono">STUDENT</code> automatically synchronizes their corresponding profile records.
          </li>
        </ul>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080808] p-3 rounded-xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, email, or campus..."
            className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#FF6266]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <Filter className="w-3.5 h-3.5 text-neutral-400 mr-1" />
          {(['ALL', 'SUPERADMIN', 'CAMPUS_MANAGER', 'MENTOR', 'STUDENT'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-2 py-1 text-xs rounded-lg transition-colors font-medium ${
                roleFilter === r
                  ? 'bg-[#141414] text-white border border-white/15'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-black/60 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">User Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Campus</th>
                <th className="py-3.5 px-4">Current Role</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#FF6266] mb-2" />
                    <span>Loading roles directory...</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => {
                  const isProtected = u.isSuperAdminProtected
                  return (
                    <tr key={u.id} className="hover:bg-[#141414]/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span>{u.name || 'Unnamed User'}</span>
                          {isProtected && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-[#1F0B0B] text-[#FF6266] border border-[#681717] uppercase font-mono font-bold">
                              <ShieldAlert className="w-3 h-3" />
                              Sole Super Admin
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{u.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {u.campus ? (
                          <div className="flex items-center gap-1 text-[#FF6266]">
                            <Building2 className="w-3.5 h-3.5 text-[#FF6266]" />
                            <span>{u.campus.name}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-500 italic">None</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                            ROLE_COLORS[u.role] || 'bg-[#141414] text-neutral-300 border-white/15'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {u.status === 'ACTIVE' ? (
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
                        {isProtected ? (
                          <span className="text-[11px] text-neutral-500 italic">Protected</span>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedUser(u)
                              const targetRole = SUPPORTED_ROLES.includes(u.role as any)
                                ? (u.role as typeof newRole)
                                : 'STUDENT'
                              setNewRole(targetRole)
                            }}
                            className="px-2.5 py-1 text-xs rounded-lg bg-[#141414] hover:bg-[#202020] text-neutral-200 transition-colors font-medium"
                          >
                            Change Role
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Role Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-[#080808] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#FF6266]" />
              <span>Modify User Role</span>
            </h3>

            <p className="text-xs text-neutral-400 mb-4">
              User: <span className="text-white font-medium">{selectedUser.name || selectedUser.email}</span> ({selectedUser.email})
            </p>

            <form onSubmit={handleRoleChange} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Current Role
                </label>
                <div className="font-mono text-xs text-neutral-400 bg-black p-2.5 rounded-lg border border-white/10">
                  {selectedUser.role}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Assign New Role *
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-hidden focus:border-[#FF6266]"
                >
                  <option value="STUDENT">STUDENT (Learner)</option>
                  <option value="MENTOR">MENTOR (Faculty Guidance)</option>
                  <option value="CAMPUS_MANAGER">CAMPUS_MANAGER (Campus Administration)</option>
                  <option value="ADMIN">ADMIN (Staff Operations)</option>
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Note: Role changes are recorded in the append-only admin audit log.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || newRole === selectedUser.role}
                  className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Updating...' : 'Confirm Role Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

