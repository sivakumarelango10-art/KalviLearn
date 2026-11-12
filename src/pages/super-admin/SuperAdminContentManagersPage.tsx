import React, { useEffect, useMemo, useState } from 'react'
import {
  UserCog,
  UserPlus,
  Search,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Edit2,
  PauseCircle,
  PlayCircle,
  History,
  Clock,
  X,
  AlertTriangle,
  Mail,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react'
import {
  AdminContentManagerAssignment,
  AdminContentManagerStats,
  AdminEligibleContentUser,
  ContentManagerLifecycleStatus,
  fetchContentManagersDirectory,
  searchUsersForContentManager,
  createContentManagerAccount,
  grantOrUpdateContentManager,
  suspendContentManagerAccess,
  reactivateContentManagerAccess,
  revokeContentManagerAccess,
  fetchContentManagerActivity,
} from '@/lib/superAdminService'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PAGE_SIZE = 10

function formatDateTime(iso: string | null | undefined, fallback = '—') {
  if (!iso) return fallback
  const dt = new Date(iso)
  if (Number.isNaN(dt.getTime())) return fallback
  return dt.toLocaleString()
}

function StatusBadge({ status, reason }: { status: ContentManagerLifecycleStatus; reason?: string | null }) {
  if (status === 'ACTIVE') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800/60 text-[10px] font-semibold">
        <CheckCircle2 className="w-3 h-3" /> Active
      </span>
    )
  }
  if (status === 'SUSPENDED') {
    return (
      <div className="space-y-0.5">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/50 text-amber-300 border border-amber-800/60 text-[10px] font-semibold">
          <PauseCircle className="w-3 h-3" /> Suspended
        </span>
        {reason && (
          <div className="text-[10px] text-amber-300/80 max-w-[160px] truncate" title={reason}>
            {reason}
          </div>
        )}
      </div>
    )
  }
  if (status === 'INVITED') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-950/50 text-sky-300 border border-sky-800/60 text-[10px] font-semibold">
        <Mail className="w-3 h-3" /> Invited
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-950/40 text-red-400 border border-red-900/60 text-[10px] font-semibold">
      <XCircle className="w-3 h-3" /> Revoked
    </span>
  )
}

export const SuperAdminContentManagersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'managers' | 'audit'>('managers')
  const [assignments, setAssignments] = useState<AdminContentManagerAssignment[]>([])
  const [stats, setStats] = useState<AdminContentManagerStats | null>(null)
  const [campuses, setCampuses] = useState<Array<{ id: string; name: string; code: string; status?: string }>>([])
  const [auditLogs, setAuditLogs] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [directoryLoadError, setDirectoryLoadError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Search / Filter / Sort / Pagination
  const [searchFilter, setSearchFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | ContentManagerLifecycleStatus>('ALL')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [page, setPage] = useState(1)

  // Dual-mode Add / Edit Profile Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<AdminContentManagerAssignment | null>(null)
  const [addMode, setAddMode] = useState<'create' | 'existing'>('create')
  const [fullName, setFullName] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [selectedCampusId, setSelectedCampusId] = useState('')
  const [managerCode, setManagerCode] = useState('')
  const [department, setDepartment] = useState('')
  const [designation, setDesignation] = useState('')
  const [creationMode, setCreationMode] = useState<'DIRECT' | 'INVITE'>('DIRECT')
  const [userQuery, setUserQuery] = useState('')
  const [userResults, setUserResults] = useState<AdminEligibleContentUser[]>([])
  const [searchingUsers, setSearchingUsers] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ id: string; email: string; name: string | null } | null>(null)
  const [notes, setNotes] = useState('')
  const [modalError, setModalError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Activity Modal
  const [activityModalUser, setActivityModalUser] = useState<{ id: string; email: string } | null>(null)
  const [userActivityLogs, setUserActivityLogs] = useState<any[]>([])
  const [loadingActivity, setLoadingActivity] = useState(false)

  // Lifecycle Action Modals
  const [suspendTarget, setSuspendTarget] = useState<AdminContentManagerAssignment | null>(null)
  const [suspensionReason, setSuspensionReason] = useState('')
  const [reactivateTarget, setReactivateTarget] = useState<AdminContentManagerAssignment | null>(null)
  const [revokeTarget, setRevokeTarget] = useState<AdminContentManagerAssignment | null>(null)
  const [lifecycleBusy, setLifecycleBusy] = useState(false)

  const loadAll = async () => {
    setLoading(true)
    setError(null)
    setDirectoryLoadError(null)
    const [dirRes, audRes] = await Promise.all([
      fetchContentManagersDirectory(),
      fetchContentManagerActivity(),
    ])
    if (dirRes.success && dirRes.data) {
      setAssignments(dirRes.data.assignments || [])
      setStats(dirRes.data.stats || null)
      setCampuses(dirRes.data.campuses || [])
    } else {
      const msg = dirRes.error || dirRes.message || 'Failed to load Content Managers directory.'
      setDirectoryLoadError(msg)
      setError(msg)
    }
    if (audRes.success && audRes.data) {
      setAuditLogs(audRes.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    document.title = 'KalviAdmin — Content Manager Management'
    loadAll()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [searchFilter, statusFilter, sortOrder])

  const openAddModal = () => {
    setEditingAssignment(null)
    setAddMode('create')
    setFullName('')
    setEmailInput('')
    setSelectedCampusId('')
    setManagerCode('')
    setDepartment('')
    setDesignation('')
    setCreationMode('DIRECT')
    setSelectedUser(null)
    setUserQuery('')
    setUserResults([])
    setNotes('')
    setModalError(null)
    setIsModalOpen(true)
  }

  const openEditModal = (a: AdminContentManagerAssignment) => {
    setEditingAssignment(a)
    setFullName(a.name || '')
    setEmailInput(a.email || '')
    setSelectedCampusId(a.campusId || '')
    setManagerCode(a.managerCode || '')
    setDepartment(a.department || '')
    setDesignation(a.designation || '')
    setSelectedUser({ id: a.userId, email: a.email, name: a.name })
    setNotes(a.notes || '')
    setModalError(null)
    setIsModalOpen(true)
  }

  const handleUserSearch = async (query: string) => {
    setUserQuery(query)
    setSearchingUsers(true)
    const res = await searchUsersForContentManager(query)
    if (res.success && res.data) {
      setUserResults(res.data)
    }
    setSearchingUsers(false)
  }

  const switchAddMode = (mode: 'create' | 'existing') => {
    setAddMode(mode)
    setModalError(null)
    if (mode === 'existing' && userResults.length === 0) {
      handleUserSearch('')
    }
  }

  const handleSaveAssignment = async (e: React.FormEvent) => {
    e.preventDefault()
    setModalError(null)
    setError(null)
    setSuccessMsg(null)

    if (editingAssignment) {
      const trimmedName = fullName.trim()
      if (!trimmedName || trimmedName.length > 100) {
        setModalError('Full name is required and must be 100 characters or fewer.')
        return
      }
      setSaving(true)
      const res = await grantOrUpdateContentManager({
        userId: editingAssignment.userId,
        name: trimmedName,
        campusId: selectedCampusId || null,
        managerCode: managerCode.trim() || null,
        department: department.trim() || null,
        designation: designation.trim() || null,
        notes: notes.trim() || null,
      })
      setSaving(false)
      if (!res.success) {
        setModalError(res.message || res.error || 'Failed to update Content Manager profile.')
        return
      }
      setSuccessMsg(`Updated profile for "${editingAssignment.email}".`)
      setIsModalOpen(false)
      await loadAll()
      return
    }

    if (addMode === 'create') {
      const trimmedName = fullName.trim()
      const trimmedEmail = emailInput.trim().toLowerCase()
      if (!trimmedName || !trimmedEmail) {
        setModalError('Full name and email address are required.')
        return
      }
      if (trimmedName.length > 100) {
        setModalError('Full name must be 100 characters or fewer.')
        return
      }
      if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 255) {
        setModalError('Please enter a valid email address.')
        return
      }

      setSaving(true)
      const res = await createContentManagerAccount({
        name: trimmedName,
        email: trimmedEmail,
        campusId: selectedCampusId || null,
        managerCode: managerCode.trim() || null,
        department: department.trim() || null,
        designation: designation.trim() || null,
        creationMode,
        notes: notes.trim() || null,
      })
      setSaving(false)
      if (!res.success) {
        setModalError(res.message || res.error || 'Failed to create Content Manager account.')
        return
      }
      setSuccessMsg(res.message || `Created Content Manager account for ${trimmedEmail}.`)
      setIsModalOpen(false)
      await loadAll()
      return
    }

    // Option 2: Assign Existing User
    if (!selectedUser) {
      setModalError('Please select a registered user from the list.')
      return
    }
    setSaving(true)
    const res = await grantOrUpdateContentManager({
      userId: selectedUser.id,
      managerCode: managerCode.trim() || null,
      department: department.trim() || null,
      designation: designation.trim() || null,
      preventDuplicateAssignment: true,
      notes: notes.trim() || null,
    })
    setSaving(false)
    if (!res.success) {
      setModalError(res.message || res.error || 'Failed to assign Content Manager access.')
      return
    }
    setSuccessMsg(`Assigned Content Manager role to ${selectedUser.email}.`)
    setIsModalOpen(false)
    await loadAll()
  }

  const handleSuspend = async () => {
    if (!suspendTarget) return
    setLifecycleBusy(true)
    setError(null)
    const res = await suspendContentManagerAccess({
      assignmentId: suspendTarget.id,
      userId: suspendTarget.userId,
      reason: suspensionReason.trim() || null,
    })
    setLifecycleBusy(false)
    if (res.success) {
      setSuccessMsg(res.message || `Suspended Content Manager access for ${suspendTarget.email}.`)
      setSuspendTarget(null)
      setSuspensionReason('')
      await loadAll()
    } else {
      setError(res.message || res.error || 'Failed to suspend Content Manager.')
    }
  }

  const handleReactivate = async () => {
    if (!reactivateTarget) return
    setLifecycleBusy(true)
    setError(null)
    const res = await reactivateContentManagerAccess({
      assignmentId: reactivateTarget.id,
      userId: reactivateTarget.userId,
    })
    setLifecycleBusy(false)
    if (res.success) {
      setSuccessMsg(res.message || `Reactivated Content Manager access for ${reactivateTarget.email}.`)
      setReactivateTarget(null)
      await loadAll()
    } else {
      setError(res.message || res.error || 'Failed to reactivate Content Manager.')
    }
  }

  const handleRevoke = async () => {
    if (!revokeTarget) return
    setLifecycleBusy(true)
    setError(null)
    const res = await revokeContentManagerAccess({
      userId: revokeTarget.userId,
      assignmentId: revokeTarget.id,
    })
    setLifecycleBusy(false)
    if (res.success) {
      setSuccessMsg(res.message || `Revoked Content Manager access for ${revokeTarget.email}.`)
      setRevokeTarget(null)
      await loadAll()
    } else {
      setError(res.message || res.error || 'Failed to revoke Content Manager access.')
    }
  }

  const openActivityModal = async (a: AdminContentManagerAssignment) => {
    setActivityModalUser({ id: a.userId, email: a.email })
    setLoadingActivity(true)
    const res = await fetchContentManagerActivity(a.userId)
    setUserActivityLogs(res.success && res.data ? res.data : [])
    setLoadingActivity(false)
  }

  const computedStats: AdminContentManagerStats = useMemo(() => {
    if (stats) return stats
    return {
      total: assignments.length,
      active: assignments.filter((a) => a.status === 'ACTIVE').length,
      suspended: assignments.filter((a) => a.status === 'SUSPENDED').length,
      revoked: assignments.filter((a) => a.status === 'REVOKED').length,
      invited: assignments.filter((a) => a.status === 'INVITED').length,
      totalContentEdits: assignments.reduce((acc, a) => acc + (a.contentEditCount || 0), 0),
    }
  }, [stats, assignments])

  const filteredAndSorted = useMemo(() => {
    const q = searchFilter.trim().toLowerCase()
    const filtered = assignments.filter((a) => {
      if (statusFilter !== 'ALL' && a.status !== statusFilter) return false
      if (!q) return true
      return (
        a.email.toLowerCase().includes(q) ||
        String(a.name || '').toLowerCase().includes(q) ||
        String(a.campusName || '').toLowerCase().includes(q)
      )
    })
    return [...filtered].sort((a, b) => {
      const ta = new Date(a.createdAt || a.grantedAt || 0).getTime()
      const tb = new Date(b.createdAt || b.grantedAt || 0).getTime()
      return sortOrder === 'newest' ? tb - ta : ta - tb
    })
  }, [assignments, searchFilter, statusFilter, sortOrder])

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginatedAssignments = filteredAndSorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <UserCog className="w-6 h-6 text-[#FF6266]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Content Manager Management</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Add and manage Content Managers. Every active Content Manager automatically receives full Curriculum, Practice Question, and Learn Coding authoring access.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadAll}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080808] border border-white/10 hover:border-white/20 text-xs font-medium text-neutral-300"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF6266]' : ''}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold shadow"
          >
            <UserPlus className="w-4 h-4" />
            + Add Content Manager
          </button>
        </div>
      </div>

      {/* Banners */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {error}
          </span>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={loadAll}
              className="px-2.5 py-1 rounded bg-red-900/50 hover:bg-red-800/60 text-white font-semibold"
            >
              Retry
            </button>
            <button type="button" onClick={() => setError(null)} className="text-neutral-400 hover:text-white">
              Dismiss
            </button>
          </div>
        </div>
      )}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {successMsg}
          </span>
          <button type="button" onClick={() => setSuccessMsg(null)} className="text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-[11px] text-neutral-400">Total Managers</div>
          <div className="text-xl font-bold text-white mt-1">{computedStats.total}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-[11px] text-neutral-400">Active</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{computedStats.active}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-[11px] text-neutral-400">Suspended</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{computedStats.suspended}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-[11px] text-neutral-400">Revoked</div>
          <div className="text-xl font-bold text-red-400 mt-1">{computedStats.revoked}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-[11px] text-neutral-400">Pending Invites</div>
          <div className="text-xl font-bold text-sky-300 mt-1">{computedStats.invited}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-[11px] text-neutral-400">Total Content Edits</div>
          <div className="text-xl font-bold text-indigo-300 mt-1">{computedStats.totalContentEdits}</div>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('managers')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
            activeTab === 'managers'
              ? 'bg-[#1F0B0B] border-[#681717] text-[#FF6266]'
              : 'bg-[#080808] border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          Content Managers ({assignments.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
            activeTab === 'audit'
              ? 'bg-[#1F0B0B] border-[#681717] text-[#FF6266]'
              : 'bg-[#080808] border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          Content Audit Log ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: CONTENT MANAGERS DIRECTORY */}
      {activeTab === 'managers' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="bg-[#080808] p-3.5 rounded-xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search Content Managers by name, email, or campus..."
                className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                aria-label="Filter by status"
                className="bg-black border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="INVITED">Invited</option>
                <option value="REVOKED">Revoked</option>
              </select>
              <button
                type="button"
                onClick={() => setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
                className="inline-flex items-center gap-1.5 bg-black border border-white/10 hover:border-white/25 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                {sortOrder === 'newest' ? 'Created: Newest' : 'Created: Oldest'}
              </button>
            </div>
          </div>

          <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-black/60 text-neutral-400 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4">Manager</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Department / Designation</th>
                    <th className="py-3.5 px-4">Assignment Status</th>
                    <th className="py-3.5 px-4">Access Status</th>
                    <th className="py-3.5 px-4">Created Date</th>
                    <th className="py-3.5 px-4">Granted By</th>
                    <th className="py-3.5 px-4">Last Activity</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-200">
                  {loading && assignments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-neutral-400">
                        Loading Content Managers...
                      </td>
                    </tr>
                  ) : directoryLoadError && assignments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-red-300 space-y-2">
                        <div>{directoryLoadError}</div>
                        <button
                          type="button"
                          onClick={loadAll}
                          className="px-3 py-1.5 rounded-lg bg-red-900/50 hover:bg-red-800/60 text-white text-xs font-semibold"
                        >
                          Retry Loading Directory
                        </button>
                      </td>
                    </tr>
                  ) : paginatedAssignments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-neutral-500">
                        {assignments.length === 0
                          ? 'No Content Managers added yet. Click "+ Add Content Manager" to create or assign one.'
                          : 'No Content Managers match the active search or filter criteria.'}
                      </td>
                    </tr>
                  ) : (
                    paginatedAssignments.map((a) => (
                      <tr key={a.id} className="hover:bg-white/[0.02]">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{a.name || 'Registered User'}</span>
                            {a.managerCode && (
                              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-neutral-300">
                                {a.managerCode}
                              </span>
                            )}
                          </div>
                          {a.campusName && (
                            <div className="text-[10px] text-neutral-400 mt-0.5">Campus: {a.campusName}</div>
                          )}
                          {a.notes && (
                            <div className="text-[10px] text-neutral-500 mt-0.5 max-w-[180px] truncate" title={a.notes}>
                              {a.notes}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-mono text-[11px] text-neutral-300">{a.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          {a.department || a.designation ? (
                            <div>
                              <div className="text-neutral-200 font-medium">{a.department || '—'}</div>
                              {a.designation && (
                                <div className="text-[10px] text-neutral-400">{a.designation}</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-neutral-500">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={a.status} reason={a.suspensionReason} />
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-300 border border-indigo-800/60 text-[10px] font-semibold">
                            <Layers className="w-3 h-3" /> {a.isActive ? 'GLOBAL Active' : a.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[11px] text-neutral-400 whitespace-nowrap">
                          {formatDateTime(a.createdAt || a.grantedAt)}
                        </td>
                        <td className="py-3.5 px-4 text-[11px]">
                          <div className="text-neutral-300">{a.grantedBy || 'Super Admin'}</div>
                          {a.updatedBy && a.updatedAt && (
                            <div className="text-[10px] text-neutral-500">Edited by {a.updatedBy}</div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => openActivityModal(a)}
                            className="inline-flex flex-col items-start text-left hover:text-[#FF6266]"
                          >
                            <span className="inline-flex items-center gap-1 text-neutral-300 text-[11px]">
                              <History className="w-3 h-3" />
                              {a.activityCount} actions
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {a.lastActivityAt ? formatDateTime(a.lastActivityAt) : 'No edits yet'}
                            </span>
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditModal(a)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#181818] hover:bg-white/10 border border-white/10 text-[11px] font-medium"
                              title="Edit basic profile"
                            >
                              <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            {(a.status === 'ACTIVE' || a.status === 'INVITED') && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSuspensionReason('')
                                  setSuspendTarget(a)
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-950/30 hover:bg-amber-900/50 border border-amber-800/50 text-amber-300 text-[11px] font-medium"
                                title="Suspend access temporarily"
                              >
                                <PauseCircle className="w-3 h-3" /> Suspend
                              </button>
                            )}
                            {a.status === 'SUSPENDED' && (
                              <button
                                type="button"
                                onClick={() => setReactivateTarget(a)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 text-emerald-300 text-[11px] font-medium"
                                title="Reactivate suspended access"
                              >
                                <PlayCircle className="w-3 h-3" /> Reactivate
                              </button>
                            )}
                            {a.status !== 'REVOKED' && (
                              <button
                                type="button"
                                onClick={() => setRevokeTarget(a)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-400 text-[11px] font-medium"
                                title="Revoke Content Manager access"
                              >
                                <ShieldCheck className="w-3 h-3" /> Revoke
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            {filteredAndSorted.length > 0 && (
              <div className="px-4 py-3 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-400">
                <div>
                  Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filteredAndSorted.length)} of{' '}
                  {filteredAndSorted.length} Content Manager{filteredAndSorted.length === 1 ? '' : 's'}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-white/10 bg-black text-neutral-300 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </button>
                  <span className="text-neutral-300">
                    Page {safePage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-white/10 bg-black text-neutral-300 disabled:opacity-40"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL CONTENT AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-2.5">
          {auditLogs.length === 0 ? (
            <div className="p-10 text-center bg-[#080808] border border-dashed border-white/10 rounded-2xl text-xs text-neutral-500">
              No content management audit entries recorded yet.
            </div>
          ) : (
            auditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-[#080808] border border-white/10 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-bold text-white">{log.change_summary || log.action}</div>
                  <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <span className="text-[#FF6266]">{log.actor_email}</span>
                  <span>({log.actor_role})</span>
                  <span>·</span>
                  <span>{log.resource_type}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ADD / EDIT CONTENT MANAGER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveAssignment}
            className="w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl bg-[#121212] border border-white/15 shadow-2xl overflow-hidden"
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#161616]">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editingAssignment ? `Edit Content Manager: ${editingAssignment.name || editingAssignment.email}` : 'Add Content Manager'}
                </h2>
                <p className="text-xs text-neutral-400">
                  {editingAssignment
                    ? 'Update profile details without altering authentication identity.'
                    : 'Every Content Manager receives standard Curriculum, Practice Question, and Learn Coding authoring access automatically.'}
                </p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {modalError && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-800/70 text-red-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{modalError}</span>
                </div>
              )}

              {editingAssignment ? (
                <div className="space-y-4 p-4 rounded-xl bg-black/50 border border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-300">Account Profile</div>
                      <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        Auth Email (Locked): <span className="text-white">{editingAssignment.email}</span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-neutral-400">
                      <div>Created: {formatDateTime(editingAssignment.createdAt || editingAssignment.grantedAt)}</div>
                      {editingAssignment.updatedAt && (
                        <div>
                          Updated: {formatDateTime(editingAssignment.updatedAt)}
                          {editingAssignment.updatedBy ? ` by ${editingAssignment.updatedBy}` : ''}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Content Manager full name"
                        className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Campus (Optional)</label>
                      <select
                        value={selectedCampusId}
                        onChange={(e) => setSelectedCampusId(e.target.value)}
                        className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                      >
                          <option value="">Platform-wide (No specific campus)</option>
                          {campuses.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.code})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-300 mb-1">Manager Code (Optional)</label>
                        <input
                          type="text"
                          maxLength={30}
                          value={managerCode}
                          onChange={(e) => setManagerCode(e.target.value)}
                          placeholder="e.g. CM-2026-01"
                          className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-300 mb-1">Department (Optional)</label>
                        <input
                          type="text"
                          maxLength={100}
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          placeholder="e.g. Curriculum & Coding"
                          className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-neutral-300 mb-1">Designation (Optional)</label>
                        <input
                          type="text"
                          maxLength={100}
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="e.g. Lead Content Architect"
                          className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
              ) : (
                <div className="space-y-4">
                  {/* Option Switcher */}
                  <div className="flex gap-2 p-1 rounded-xl bg-black border border-white/10 w-fit">
                    <button
                      type="button"
                      onClick={() => switchAddMode('create')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                        addMode === 'create' ? 'bg-[#ED2A2B] text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Create New Content Manager
                    </button>
                    <button
                      type="button"
                      onClick={() => switchAddMode('existing')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                        addMode === 'existing' ? 'bg-[#ED2A2B] text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Assign Existing User
                    </button>
                  </div>

                  {addMode === 'create' ? (
                    <div className="space-y-4 p-4 rounded-xl bg-black/50 border border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            maxLength={100}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Ananya Sharma"
                            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">Email Address (Google OAuth) *</label>
                          <input
                            type="email"
                            required
                            maxLength={255}
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="e.g. ananya.content@kalvilearn.edu"
                            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">Campus (Optional)</label>
                          <select
                            value={selectedCampusId}
                            onChange={(e) => setSelectedCampusId(e.target.value)}
                            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          >
                            <option value="">Platform-wide (No specific campus)</option>
                            {campuses.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name} ({c.code})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">Provisioning Mode</label>
                          <select
                            value={creationMode}
                            onChange={(e) => setCreationMode(e.target.value as 'DIRECT' | 'INVITE')}
                            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          >
                            <option value="DIRECT">Active Immediately (Google OAuth Sign-In)</option>
                            <option value="INVITE">Send Email Invite (Activates Upon Acceptance)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">Manager Code (Optional)</label>
                          <input
                            type="text"
                            maxLength={30}
                            value={managerCode}
                            onChange={(e) => setManagerCode(e.target.value)}
                            placeholder="e.g. CM-2026-01"
                            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">Department (Optional)</label>
                          <input
                            type="text"
                            maxLength={100}
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="e.g. Curriculum & Coding"
                            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-neutral-300 mb-1">Designation (Optional)</label>
                          <input
                            type="text"
                            maxLength={100}
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="e.g. Lead Content Architect"
                            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                        Select Registered User
                      </label>
                      <input
                        type="text"
                        value={userQuery}
                        onChange={(e) => handleUserSearch(e.target.value)}
                        placeholder="Search by email, name, or role..."
                        className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                      />
                      <div className="max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-black/60 divide-y divide-white/5">
                        {searchingUsers ? (
                          <div className="p-4 text-xs text-neutral-400">Searching registered users...</div>
                        ) : userResults.length === 0 ? (
                          <div className="p-4 text-xs text-neutral-500">No eligible users found matching your query.</div>
                        ) : (
                          userResults.map((u) => (
                            <button
                              type="button"
                              key={u.id}
                              onClick={() => setSelectedUser({ id: u.id, email: u.email, name: u.name })}
                              className={`w-full px-3 py-2.5 text-left flex items-center justify-between text-xs transition ${
                                selectedUser?.id === u.id ? 'bg-[#2a0e0e] text-white' : 'hover:bg-white/5 text-neutral-300'
                              }`}
                            >
                              <div>
                                <div className="font-semibold text-white">{u.name || 'Unnamed User'}</div>
                                <div className="font-mono text-[11px] text-neutral-400">{u.email}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono">{u.role}</span>
                                {u.assignmentStatus && u.assignmentStatus !== 'REVOKED' && (
                                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 text-[10px]">
                                    CM ({u.assignmentStatus})
                                  </span>
                                )}
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-800/40 text-xs text-indigo-200">
                <strong>Fixed Content Access:</strong> Active Content Managers automatically receive full access to Curriculum Modules &amp; Learning Units, Practice Coding Questions, and Learn Coding Questions. User accounts and platform settings remain strictly restricted.
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Admin Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. DSA curriculum & coding question author"
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#161616] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/15 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || (!editingAssignment && addMode === 'existing' && !selectedUser)}
                className="px-5 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold disabled:opacity-40"
              >
                {saving
                  ? 'Saving...'
                  : editingAssignment
                    ? 'Save Changes'
                    : addMode === 'create'
                      ? 'Create Content Manager'
                      : 'Assign Content Manager'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Activity Modal */}
      {activityModalUser && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-[#121212] border border-white/15 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Activity Log: {activityModalUser.email}</h3>
              <button type="button" onClick={() => setActivityModalUser(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            {loadingActivity ? (
              <div className="py-8 text-center text-xs text-neutral-400">Loading user activity...</div>
            ) : userActivityLogs.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-500">No recorded edits for this Content Manager.</div>
            ) : (
              <div className="space-y-2">
                {userActivityLogs.map((l) => (
                  <div key={l.id} className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-1">
                    <div className="font-semibold text-white">{l.change_summary || l.action}</div>
                    <div className="text-[10px] font-mono text-neutral-500">
                      {l.resource_type} · {new Date(l.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suspend Modal */}
      {suspendTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#121212] border border-amber-800/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-300">
              <PauseCircle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Suspend Content Manager Access</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Temporarily suspend <strong className="text-white">{suspendTarget.email}</strong>? Their access to{' '}
              <code className="text-amber-300">/content-manager</code> is blocked immediately while their Auth identity and authored content are preserved for reactivation.
            </p>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Suspension Reason (Optional)</label>
              <input
                type="text"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                placeholder="e.g. Temporary leave / Account review"
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSuspendTarget(null)}
                className="px-3.5 py-2 rounded-lg border border-white/15 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={lifecycleBusy}
                onClick={handleSuspend}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-black"
              >
                {lifecycleBusy ? 'Suspending...' : 'Confirm Suspend'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reactivate Modal */}
      {reactivateTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#121212] border border-emerald-800/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <PlayCircle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Reactivate Content Manager Access</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Reactivate <strong className="text-white">{reactivateTarget.email}</strong>? They will immediately regain Content Studio access to Curriculum, Practice Questions, and Learn Coding Questions.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReactivateTarget(null)}
                className="px-3.5 py-2 rounded-lg border border-white/15 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={lifecycleBusy}
                onClick={handleReactivate}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white"
              >
                {lifecycleBusy ? 'Reactivating...' : 'Confirm Reactivate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Modal */}
      {revokeTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#121212] border border-red-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Revoke Content Manager Access</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Permanently revoke Content Manager access for <strong className="text-white">{revokeTarget.email}</strong>?
              They will immediately lose access to <code className="text-[#FF6266]">/content-manager</code> while preserving Auth identity, authored content, and audit logs.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRevokeTarget(null)}
                className="px-3.5 py-2 rounded-lg border border-white/15 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={lifecycleBusy}
                onClick={handleRevoke}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white"
              >
                {lifecycleBusy ? 'Revoking...' : 'Confirm Revoke'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
