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
  Eye,
  Edit3,
  ArrowRightLeft,
  Power,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  Calendar,
  IdCard,
} from 'lucide-react'
import {
  fetchUserRolesDirectory,
  updateUserRole,
  updateUserDetails,
  transferUserRole,
  toggleUserStatus,
  assignUserCampus,
  fetchCampuses,
  AdminUserRole,
  AdminCampus,
} from '@/lib/superAdminService'

const ROLE_COLORS: Record<string, string> = {
  SUPERADMIN: 'bg-red-950/80 text-red-300 border-red-800/80',
  CAMPUS_MANAGER: 'bg-purple-950/80 text-purple-300 border-purple-800/80',
  ADMIN: 'bg-purple-950/80 text-purple-300 border-purple-800/80',
  MENTOR: 'bg-amber-950/80 text-amber-300 border-amber-800/80',
  STUDENT: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80',
}

const SUPPORTED_ROLES = ['STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN'] as const

export const SuperAdminRolesPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserRole[]>([])
  const [campuses, setCampuses] = useState<AdminCampus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [campusFilter, setCampusFilter] = useState('ALL')
  const [activeDropdownUserId, setActiveDropdownUserId] = useState<string | null>(null)

  // Modals & Drawers state
  const [viewDetailsUser, setViewDetailsUser] = useState<AdminUserRole | null>(null)
  const [editUser, setEditUser] = useState<AdminUserRole | null>(null)
  const [editName, setEditName] = useState('')
  const [editRole, setEditRole] = useState<'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN'>('STUDENT')
  const [editStatus, setEditStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE')
  const [editCampusId, setEditCampusId] = useState<string>('NONE')

  // Quick Change Role Modal
  const [changeRoleUser, setChangeRoleUser] = useState<AdminUserRole | null>(null)
  const [quickNewRole, setQuickNewRole] = useState<'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN'>('STUDENT')

  // Role Transfer Modal
  const [transferModalOpen, setTransferModalOpen] = useState(false)
  const [transferSourceUserId, setTransferSourceUserId] = useState<string>('')
  const [transferDestUserId, setTransferDestUserId] = useState<string>('')
  const [transferRoleToTransfer, setTransferRoleToTransfer] = useState<'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN'>('MENTOR')
  const [transferSourceNewRole, setTransferSourceNewRole] = useState<'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN'>('STUDENT')
  const [transferCampusId, setTransferCampusId] = useState<string>('NONE')
  const [transferConfirmed, setTransferConfirmed] = useState(false)

  // Manage Campus Access Modal
  const [manageCampusUser, setManageCampusUser] = useState<AdminUserRole | null>(null)
  const [selectedCampusId, setSelectedCampusId] = useState<string>('NONE')

  // Deactivate/Activate Confirmation
  const [statusConfirmUser, setStatusConfirmUser] = useState<AdminUserRole | null>(null)

  const [submitting, setSubmitting] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const [rolesRes, campusesRes] = await Promise.all([
      fetchUserRolesDirectory(),
      fetchCampuses(),
    ])

    if (rolesRes.success && rolesRes.data) {
      setUsers(rolesRes.data)
    } else {
      setError(rolesRes.error || 'Failed to load user roles directory.')
    }

    if (campusesRes.success && campusesRes.data) {
      setCampuses(campusesRes.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.user-action-dropdown')) {
        setActiveDropdownUserId(null)
      }
    }
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [])

  // Open Edit User Modal
  const handleOpenEdit = (user: AdminUserRole) => {
    setEditUser(user)
    setEditName(user.name || '')
    setEditRole(
      SUPPORTED_ROLES.includes(user.role as any)
        ? (user.role as typeof editRole)
        : 'STUDENT'
    )
    setEditStatus((user.status as 'ACTIVE' | 'INACTIVE') || 'ACTIVE')
    setEditCampusId(user.campus_id || 'NONE')
    setActiveDropdownUserId(null)
  }

  // Submit Edit User
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editUser) return
    setSubmitting(true)
    setError(null)

    const res = await updateUserDetails(editUser.id, {
      name: editName,
      role: editRole,
      status: editStatus,
      campusId: editCampusId === 'NONE' ? null : editCampusId,
    })

    if (res.success) {
      setSuccessMsg(`User "${editName || editUser.email}" updated successfully.`)
      setEditUser(null)
      loadData()
    } else {
      setError(res.error || 'Failed to update user.')
    }
    setSubmitting(false)
  }

  // Quick Role Change
  const handleRoleChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!changeRoleUser) return
    setSubmitting(true)
    setError(null)

    const res = await updateUserRole(changeRoleUser.id, quickNewRole)
    if (res.success) {
      setSuccessMsg(
        `Role for ${changeRoleUser.name || changeRoleUser.email} updated from ${changeRoleUser.role} to ${quickNewRole}.`
      )
      setChangeRoleUser(null)
      loadData()
    } else {
      setError(res.error || 'Failed to update user role.')
    }
    setSubmitting(false)
  }

  // Open Role Transfer Modal
  const handleOpenTransfer = (sourceUser?: AdminUserRole) => {
    const initialSource = sourceUser || users.find((u) => !u.isSuperAdminProtected && u.role !== 'SUPERADMIN')
    if (initialSource) {
      setTransferSourceUserId(initialSource.id)
      const role = SUPPORTED_ROLES.includes(initialSource.role as any)
        ? (initialSource.role as typeof transferRoleToTransfer)
        : 'MENTOR'
      setTransferRoleToTransfer(role)
      setTransferSourceNewRole(role === 'STUDENT' ? 'MENTOR' : 'STUDENT')
      setTransferCampusId(initialSource.campus_id || 'NONE')
      // Default destination to first eligible user
      const destCandidate = users.find(
        (u) => u.id !== initialSource.id && !u.isSuperAdminProtected && u.role !== role && u.status === 'ACTIVE'
      )
      setTransferDestUserId(destCandidate?.id || '')
    }
    setTransferConfirmed(false)
    setTransferModalOpen(true)
    setActiveDropdownUserId(null)
  }

  // Submit Role Transfer
  const handleSubmitTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!transferSourceUserId || !transferDestUserId) {
      setError('Please select both a source user and a destination user.')
      return
    }

    setSubmitting(true)
    setError(null)

    const res = await transferUserRole({
      sourceUserId: transferSourceUserId,
      destinationUserId: transferDestUserId,
      roleToTransfer: transferRoleToTransfer,
      sourceNewRole: transferSourceNewRole,
      campusId: transferCampusId === 'NONE' ? null : transferCampusId,
    })

    if (res.success) {
      const sourceUser = users.find((u) => u.id === transferSourceUserId)
      const destUser = users.find((u) => u.id === transferDestUserId)
      setSuccessMsg(
        `Role "${transferRoleToTransfer}" successfully transferred from ${
          sourceUser?.name || sourceUser?.email
        } to ${destUser?.name || destUser?.email}.`
      )
      setTransferModalOpen(false)
      loadData()
    } else {
      setError(res.error || 'Failed to transfer role.')
    }
    setSubmitting(false)
  }

  // Submit Campus Access
  const handleSaveCampusAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!manageCampusUser) return
    setSubmitting(true)
    setError(null)

    const res = await assignUserCampus(
      manageCampusUser.id,
      selectedCampusId === 'NONE' ? null : selectedCampusId
    )

    if (res.success) {
      setSuccessMsg(`Campus access updated for ${manageCampusUser.name || manageCampusUser.email}.`)
      setManageCampusUser(null)
      loadData()
    } else {
      setError(res.error || 'Failed to update campus access.')
    }
    setSubmitting(false)
  }

  // Submit Status Toggle (Activate/Deactivate)
  const handleConfirmStatusToggle = async () => {
    if (!statusConfirmUser) return
    setSubmitting(true)
    setError(null)

    const nextStatus = statusConfirmUser.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    const res = await toggleUserStatus(statusConfirmUser.id, nextStatus)

    if (res.success) {
      setSuccessMsg(
        `User ${statusConfirmUser.name || statusConfirmUser.email} is now ${nextStatus}.`
      )
      setStatusConfirmUser(null)
      loadData()
    } else {
      setError(res.error || 'Failed to change account status.')
    }
    setSubmitting(false)
  }

  // Filtered Users
  const filtered = users.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false
    if (campusFilter !== 'ALL') {
      if (campusFilter === 'UNASSIGNED' && u.campus_id) return false
      if (campusFilter !== 'UNASSIGNED' && u.campus_id !== campusFilter) return false
    }
    if (!search.trim()) return true
    const s = search.toLowerCase()
    return (
      (u.name && u.name.toLowerCase().includes(s)) ||
      u.email.toLowerCase().includes(s) ||
      (u.campus && u.campus.name.toLowerCase().includes(s)) ||
      (u.campus && u.campus.code.toLowerCase().includes(s))
    )
  })

  // Transfer Modal Source & Dest objects
  const selectedSourceUser = users.find((u) => u.id === transferSourceUserId)
  const selectedDestUser = users.find((u) => u.id === transferDestUserId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-red-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight">User Access & Role Management</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Centrally manage user accounts, assign roles, transfer responsibilities, and configure campus access.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenTransfer()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Transfer Role</span>
          </button>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-500' : ''}`} />
            <span>Refresh</span>
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

      {/* Security Principles Banner */}
      <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Lock className="w-4 h-4 text-red-400" />
          <span>Security & Audit Policy</span>
        </div>
        <ul className="list-disc list-inside text-neutral-400 space-y-1 pl-1">
          <li>
            <strong className="text-white">Protected Root Identity:</strong>{' '}
            <code className="text-red-400 font-mono">sgjitbros@gmail.com</code> is the sole Super Administrator and cannot be demoted, deactivated, or transferred away.
          </li>
          <li>
            <strong className="text-white">Role Transfers:</strong> Seamlessly reallocates responsibilities between users while keeping historical submissions, code solves, and activity records intact.
          </li>
          <li>
            <strong className="text-white">Immutable Audit Trail:</strong> Every role change, transfer, campus reassignment, or activation toggle is recorded in the append-only admin audit log.
          </li>
        </ul>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-neutral-900 p-3 rounded-xl border border-neutral-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, campus, or code..."
            className="w-full pl-9 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-neutral-400 mr-1" />
            <span className="text-neutral-500 text-[11px] mr-1">Role:</span>
            {(['ALL', 'CAMPUS_MANAGER', 'MENTOR', 'STUDENT'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-2 py-1 text-xs rounded-lg transition-colors font-medium ${
                  roleFilter === r
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {r === 'CAMPUS_MANAGER' ? 'MANAGER' : r}
              </button>
            ))}
          </div>

          {/* Campus Filter */}
          <div className="flex items-center gap-1.5 text-xs border-l border-neutral-800 pl-2">
            <Building2 className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
              className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-300 focus:outline-hidden focus:border-red-500"
            >
              <option value="ALL">All Campuses</option>
              <option value="UNASSIGNED">Unassigned Only</option>
              {campuses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto min-h-[360px] pb-12">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">User Details</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Campus Assignment</th>
                <th className="py-3.5 px-4">Current Role</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-red-500 mb-2" />
                    <span>Loading directory & permissions...</span>
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
                  const isDropdownOpen = activeDropdownUserId === u.id

                  return (
                    <tr key={u.id} className="hover:bg-neutral-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-neutral-300 text-[11px]">
                            {(u.name || u.email).substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span>{u.name || 'Unnamed User'}</span>
                              {isProtected && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] bg-red-950 text-red-400 border border-red-800 uppercase font-mono font-bold">
                                  <ShieldAlert className="w-3 h-3" />
                                  Sole Super Admin
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-neutral-500 font-normal">
                              Joined {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                            </span>
                          </div>
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
                          <div className="flex items-center gap-1.5 text-blue-300">
                            <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <div>
                              <span className="font-medium">{u.campus.name}</span>
                              <span className="text-[10px] text-neutral-500 ml-1 font-mono">({u.campus.code})</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-neutral-500 italic flex items-center gap-1">
                            <span>Unassigned</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                            ROLE_COLORS[u.role] || 'bg-neutral-800 text-neutral-300 border-neutral-700'
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
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                            INACTIVE
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="relative inline-block text-left user-action-dropdown">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdownUserId(isDropdownOpen ? null : u.id)
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors font-medium border border-neutral-700/60"
                          >
                            <span>Manage</span>
                            <ChevronDown className="w-3 h-3 text-neutral-400" />
                          </button>

                          {isDropdownOpen && (
                            <div className="absolute right-0 mt-1 w-52 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl z-40 py-1.5 divide-y divide-neutral-800 text-left">
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    setViewDetailsUser(u)
                                    setActiveDropdownUserId(null)
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800 flex items-center gap-2"
                                >
                                  <Eye className="w-3.5 h-3.5 text-neutral-400" />
                                  <span>View Details</span>
                                </button>
                                {!isProtected && (
                                  <button
                                    onClick={() => handleOpenEdit(u)}
                                    className="w-full px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800 flex items-center gap-2"
                                  >
                                    <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                                    <span>Edit User</span>
                                  </button>
                                )}
                              </div>

                              {!isProtected && (
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      setChangeRoleUser(u)
                                      setQuickNewRole(
                                        SUPPORTED_ROLES.includes(u.role as any)
                                          ? (u.role as typeof quickNewRole)
                                          : 'STUDENT'
                                      )
                                      setActiveDropdownUserId(null)
                                    }}
                                    className="w-full px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800 flex items-center gap-2"
                                  >
                                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Change Role</span>
                                  </button>
                                  <button
                                    onClick={() => handleOpenTransfer(u)}
                                    className="w-full px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800 flex items-center gap-2"
                                  >
                                    <ArrowRightLeft className="w-3.5 h-3.5 text-purple-400" />
                                    <span>Transfer Role</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      setManageCampusUser(u)
                                      setSelectedCampusId(u.campus_id || 'NONE')
                                      setActiveDropdownUserId(null)
                                    }}
                                    className="w-full px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800 flex items-center gap-2"
                                  >
                                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Manage Campus</span>
                                  </button>
                                </div>
                              )}

                              {!isProtected && (
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      setStatusConfirmUser(u)
                                      setActiveDropdownUserId(null)
                                    }}
                                    className={`w-full px-3 py-1.5 text-xs flex items-center gap-2 ${
                                      u.status === 'ACTIVE'
                                        ? 'text-red-400 hover:bg-red-950/40'
                                        : 'text-emerald-400 hover:bg-emerald-950/40'
                                    }`}
                                  >
                                    <Power className="w-3.5 h-3.5" />
                                    <span>{u.status === 'ACTIVE' ? 'Deactivate Account' : 'Activate Account'}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── MODAL 1: VIEW DETAILS ─── */}
      {viewDetailsUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-lg w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setViewDetailsUser(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
              <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-lg font-bold text-white">
                {(viewDetailsUser.name || viewDetailsUser.email).substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{viewDetailsUser.name || 'Unnamed User'}</span>
                  {viewDetailsUser.isSuperAdminProtected && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950 text-red-400 border border-red-800 font-mono font-bold">
                      ROOT
                    </span>
                  )}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">{viewDetailsUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-6">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block text-[11px] mb-1">Current Role</span>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    ROLE_COLORS[viewDetailsUser.role] || 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {viewDetailsUser.role}
                </span>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block text-[11px] mb-1">Account Status</span>
                {viewDetailsUser.status === 'ACTIVE' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                    INACTIVE
                  </span>
                )}
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block text-[11px] mb-1 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-blue-400" />
                  <span>Assigned Campus</span>
                </span>
                <span className="text-neutral-200 font-medium">
                  {viewDetailsUser.campus ? `${viewDetailsUser.campus.name} (${viewDetailsUser.campus.code})` : 'Unassigned'}
                </span>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block text-[11px] mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  <span>Created Date</span>
                </span>
                <span className="text-neutral-200">
                  {viewDetailsUser.created_at ? new Date(viewDetailsUser.created_at).toLocaleString() : '—'}
                </span>
              </div>

              <div className="col-span-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block text-[11px] mb-1 flex items-center gap-1">
                  <IdCard className="w-3 h-3 text-neutral-400" />
                  <span>User Record ID</span>
                </span>
                <span className="text-neutral-400 font-mono text-[11px] select-all break-all">
                  {viewDetailsUser.id}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <span className="text-[11px] text-neutral-500">
                {viewDetailsUser.isSuperAdminProtected ? 'Root Super Admin is immutable' : 'All modifications are logged in audit history'}
              </span>
              <button
                onClick={() => setViewDetailsUser(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: EDIT USER MODAL ─── */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setEditUser(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-blue-500" />
              <span>Edit User Details & Access</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Modify account attributes and campus affiliation with server-side validation.
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="User Full Name"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1 flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Immutable
                  </span>
                </label>
                <input
                  type="email"
                  disabled
                  value={editUser.email}
                  className="w-full px-3 py-2 bg-neutral-950/60 border border-neutral-800/80 rounded-lg text-neutral-400 font-mono cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Role</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-red-500"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="MENTOR">MENTOR</option>
                    <option value="CAMPUS_MANAGER">CAMPUS_MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Account Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-red-500"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Campus Affiliation</label>
                <select
                  value={editCampusId}
                  onChange={(e) => setEditCampusId(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="NONE">Unassigned / None</option>
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  If this user is a Campus Manager, changing campus unbinds their previous primary assignment.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: QUICK CHANGE ROLE ─── */}
      {changeRoleUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setChangeRoleUser(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-500" />
              <span>Modify User Role</span>
            </h3>

            <p className="text-xs text-neutral-400 mb-4">
              User: <span className="text-white font-medium">{changeRoleUser.name || changeRoleUser.email}</span> ({changeRoleUser.email})
            </p>

            <form onSubmit={handleRoleChange} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Current Role
                </label>
                <div className="font-mono text-xs text-neutral-400 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                  {changeRoleUser.role}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Assign New Role *
                </label>
                <select
                  value={quickNewRole}
                  onChange={(e) => setQuickNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="STUDENT">STUDENT (Learner)</option>
                  <option value="MENTOR">MENTOR (Faculty Guidance)</option>
                  <option value="CAMPUS_MANAGER">CAMPUS_MANAGER (Campus Administration)</option>
                  <option value="ADMIN">ADMIN (Staff Operations)</option>
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Role modifications automatically synchronize the matching student/mentor profiles.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setChangeRoleUser(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || quickNewRole === changeRoleUser.role}
                  className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Updating...' : 'Confirm Role Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 4: DEDICATED ROLE TRANSFER ─── */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setTransferModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-purple-400" />
              <span>Role Transfer Workflow</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Reallocate institutional responsibilities between users with automatic profile synchronization and zero loss of historical activity.
            </p>

            <form onSubmit={handleSubmitTransfer} className="space-y-4 text-xs">
              {/* Source User Selector */}
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  1. Source User (Currently holding the role) *
                </label>
                <select
                  value={transferSourceUserId}
                  onChange={(e) => {
                    const uid = e.target.value
                    setTransferSourceUserId(uid)
                    const u = users.find((x) => x.id === uid)
                    if (u && SUPPORTED_ROLES.includes(u.role as any)) {
                      setTransferRoleToTransfer(u.role as any)
                      setTransferSourceNewRole(u.role === 'STUDENT' ? 'MENTOR' : 'STUDENT')
                    }
                  }}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-purple-500"
                >
                  <option value="">Select source user...</option>
                  {users
                    .filter((u) => !u.isSuperAdminProtected && u.role !== 'SUPERADMIN')
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name || u.email} ({u.email}) — [{u.role}]
                      </option>
                    ))}
                </select>
                {selectedSourceUser && (
                  <div className="mt-1.5 p-2 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">Current Role: <strong className="text-white">{selectedSourceUser.role}</strong></span>
                    <span className="text-neutral-400">Campus: <strong className="text-blue-400">{selectedSourceUser.campus?.name || 'Unassigned'}</strong></span>
                  </div>
                )}
              </div>

              {/* Role To Transfer */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    2. Role to Transfer *
                  </label>
                  <select
                    value={transferRoleToTransfer}
                    onChange={(e) => setTransferRoleToTransfer(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-purple-500"
                  >
                    <option value="CAMPUS_MANAGER">CAMPUS_MANAGER</option>
                    <option value="MENTOR">MENTOR</option>
                    <option value="STUDENT">STUDENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    3. Source User's New Role *
                  </label>
                  <select
                    value={transferSourceNewRole}
                    onChange={(e) => setTransferSourceNewRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-purple-500"
                  >
                    <option value="STUDENT">STUDENT (Demote to Learner)</option>
                    <option value="MENTOR">MENTOR (Reassign as Mentor)</option>
                    <option value="CAMPUS_MANAGER">CAMPUS_MANAGER (Reassign as Manager)</option>
                    <option value="ADMIN">ADMIN (Staff Operations)</option>
                  </select>
                </div>
              </div>

              {/* Destination User Selector */}
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  4. Destination User (Will receive the transferred role) *
                </label>
                <select
                  value={transferDestUserId}
                  onChange={(e) => setTransferDestUserId(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-purple-500"
                >
                  <option value="">Select destination user...</option>
                  {users
                    .filter(
                      (u) =>
                        u.id !== transferSourceUserId &&
                        !u.isSuperAdminProtected &&
                        u.role !== transferRoleToTransfer &&
                        u.status === 'ACTIVE'
                    )
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name || u.email} ({u.email}) — [Currently: {u.role}]
                      </option>
                    ))}
                </select>
                {selectedDestUser && (
                  <div className="mt-1.5 p-2 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">Current Role: <strong className="text-white">{selectedDestUser.role}</strong></span>
                    <span className="text-neutral-400">Campus: <strong className="text-blue-400">{selectedDestUser.campus?.name || 'Unassigned'}</strong></span>
                  </div>
                )}
              </div>

              {/* Campus Context (for Campus Manager) */}
              {transferRoleToTransfer === 'CAMPUS_MANAGER' && (
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    5. Campus Context (For incoming manager)
                  </label>
                  <select
                    value={transferCampusId}
                    onChange={(e) => setTransferCampusId(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-purple-500"
                  >
                    <option value="NONE">Keep existing campus / Unassigned</option>
                    {campuses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Before & After Comparison Card */}
              {selectedSourceUser && selectedDestUser && (
                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <ArrowRightLeft className="w-4 h-4 text-purple-400" />
                    <span>Review Transfer Impact</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    {/* Source Impact */}
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold mb-1">Outgoing User</span>
                      <div className="text-white font-medium truncate">{selectedSourceUser.name || selectedSourceUser.email}</div>
                      <div className="flex items-center gap-1.5 mt-1.5 font-mono">
                        <span className="line-through text-red-400">{selectedSourceUser.role}</span>
                        <ArrowRight className="w-3 h-3 text-neutral-500" />
                        <span className="text-emerald-400 font-bold">{transferSourceNewRole}</span>
                      </div>
                    </div>

                    {/* Dest Impact */}
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold mb-1">Incoming User</span>
                      <div className="text-white font-medium truncate">{selectedDestUser.name || selectedDestUser.email}</div>
                      <div className="flex items-center gap-1.5 mt-1.5 font-mono">
                        <span className="line-through text-neutral-500">{selectedDestUser.role}</span>
                        <ArrowRight className="w-3 h-3 text-neutral-500" />
                        <span className="text-purple-400 font-bold">{transferRoleToTransfer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-neutral-400 flex items-start gap-1.5 bg-purple-950/20 p-2 rounded-lg border border-purple-900/40">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>
                      Historical data preservation: Code submissions, test progress, and account identities will not be overwritten or lost.
                    </span>
                  </div>
                </div>
              )}

              {/* Confirmation Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={transferConfirmed}
                    onChange={(e) => setTransferConfirmed(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-700 bg-neutral-950 text-purple-600 focus:ring-0"
                  />
                  <span className="text-[11px] text-neutral-300">
                    I understand that this transfers role privileges between these accounts and records an audit log.
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !transferConfirmed || !transferSourceUserId || !transferDestUserId}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Executing Transfer...' : 'Confirm Role Transfer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 5: MANAGE CAMPUS ACCESS ─── */}
      {manageCampusUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setManageCampusUser(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>Campus Access Configuration</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Associate <strong className="text-white">{manageCampusUser.name || manageCampusUser.email}</strong> with an authorized campus context.
            </p>

            <form onSubmit={handleSaveCampusAccess} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Current Campus
                </label>
                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 text-neutral-300">
                  {manageCampusUser.campus ? `${manageCampusUser.campus.name} (${manageCampusUser.campus.code})` : 'Unassigned'}
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Assign Campus Context *
                </label>
                <select
                  value={selectedCampusId}
                  onChange={(e) => setSelectedCampusId(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="NONE">Unassigned / None</option>
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Campus managers are automatically unbound from their previous primary campus upon transfer.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setManageCampusUser(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Updating...' : 'Save Campus Access'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 6: CONFIRM ACCOUNT ACTIVATION / DEACTIVATION ─── */}
      {statusConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setStatusConfirmUser(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>
                {statusConfirmUser.status === 'ACTIVE' ? 'Deactivate Account' : 'Activate Account'}
              </span>
            </h3>

            <p className="text-xs text-neutral-300 mb-3">
              Are you sure you want to {statusConfirmUser.status === 'ACTIVE' ? 'deactivate' : 'activate'} the account for{' '}
              <strong className="text-white">{statusConfirmUser.name || statusConfirmUser.email}</strong>?
            </p>

            {statusConfirmUser.status === 'ACTIVE' && (
              <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-xl text-red-300 text-xs mb-4">
                <strong>Warning:</strong> Deactivating will prevent this user from authenticating to the platform until reactivated by a Super Admin.
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800 text-xs">
              <button
                type="button"
                onClick={() => setStatusConfirmUser(null)}
                className="px-4 py-2 rounded-lg font-medium text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusToggle}
                disabled={submitting}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  statusConfirmUser.status === 'ACTIVE'
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {submitting ? 'Processing...' : statusConfirmUser.status === 'ACTIVE' ? 'Confirm Deactivation' : 'Confirm Activation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
