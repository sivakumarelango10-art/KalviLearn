import React, { useEffect, useState } from 'react'
import {
  UserCog,
  Search,
  Plus,
  ShieldCheck,
  Globe,
  Shield,
  Lock,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  History,
  Clock,
  Check,
  X,
  AlertTriangle,
  FileCheck,
} from 'lucide-react'
import {
  AdminContentManagerAssignment,
  AdminEligibleContentUser,
  AdminPendingContentApproval,
  fetchContentManagersDirectory,
  searchUsersForContentManager,
  grantOrUpdateContentManager,
  revokeContentManagerAccess,
  fetchContentManagerActivity,
  fetchPendingContentApprovals,
  approvePublishContent,
  rejectContentReview,
} from '@/lib/superAdminService'
import {
  CONTENT_PERMISSION_CATALOG,
  DEFAULT_CONTENT_MANAGER_PERMISSIONS,
  CONTENT_PERMISSION_LIST,
  ContentScopeType,
} from '@/lib/contentPermissions'
import { cn } from '@/lib/utils'

export const SuperAdminContentManagersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'managers' | 'approvals' | 'audit'>('managers')
  const [assignments, setAssignments] = useState<AdminContentManagerAssignment[]>([])
  const [modules, setModules] = useState<Array<{ id: string; title: string; order: number }>>([])
  const [learningUnits, setLearningUnits] = useState<Array<{ id: string; moduleId: string; title: string; order: number }>>([])
  const [pendingApprovals, setPendingApprovals] = useState<AdminPendingContentApproval[]>([])
  const [auditLogs, setAuditLogs] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [searchFilter, setSearchFilter] = useState('')

  // Grant / Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<AdminContentManagerAssignment | null>(null)
  const [userQuery, setUserQuery] = useState('')
  const [userResults, setUserResults] = useState<AdminEligibleContentUser[]>([])
  const [searchingUsers, setSearchingUsers] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ id: string; email: string; name: string | null } | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([...DEFAULT_CONTENT_MANAGER_PERMISSIONS])
  const [scopeType, setScopeType] = useState<ContentScopeType>('SCOPED')
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([])
  const [selectedUnitIds, setSelectedUnitIds] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  // Activity Modal
  const [activityModalUser, setActivityModalUser] = useState<{ id: string; email: string } | null>(null)
  const [userActivityLogs, setUserActivityLogs] = useState<any[]>([])
  const [loadingActivity, setLoadingActivity] = useState(false)

  // Revoke Confirmation
  const [revokeTarget, setRevokeTarget] = useState<AdminContentManagerAssignment | null>(null)
  const [revoking, setRevoking] = useState(false)

  // Reject Modal
  const [rejectTarget, setRejectTarget] = useState<AdminPendingContentApproval | null>(null)
  const [rejectNotes, setRejectNotes] = useState('')

  const categories = Array.from(new Set(CONTENT_PERMISSION_CATALOG.map((p) => p.category)))

  const loadAll = async () => {
    setLoading(true)
    setError(null)
    const [dirRes, appRes, audRes] = await Promise.all([
      fetchContentManagersDirectory(),
      fetchPendingContentApprovals(),
      fetchContentManagerActivity(),
    ])
    if (dirRes.success && dirRes.data) {
      setAssignments(dirRes.data.assignments || [])
      setModules(dirRes.data.modules || [])
      setLearningUnits(dirRes.data.learningUnits || [])
    } else {
      setError(dirRes.error || 'Failed to load Content Managers directory.')
    }
    if (appRes.success && appRes.data) {
      setPendingApprovals([...(appRes.data.pendingQuestions || []), ...(appRes.data.pendingUnits || [])])
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

  const openGrantModal = () => {
    setEditingAssignment(null)
    setSelectedUser(null)
    setUserQuery('')
    setUserResults([])
    setSelectedPermissions([...DEFAULT_CONTENT_MANAGER_PERMISSIONS])
    setScopeType('SCOPED')
    setSelectedModuleIds([])
    setSelectedUnitIds([])
    setNotes('')
    setIsModalOpen(true)
    handleUserSearch('')
  }

  const openEditModal = (a: AdminContentManagerAssignment) => {
    setEditingAssignment(a)
    setSelectedUser({ id: a.userId, email: a.email, name: a.name })
    setSelectedPermissions(a.permissions || [])
    setScopeType(a.scopeType || 'NONE')
    setSelectedModuleIds(a.moduleIds || [])
    setSelectedUnitIds(a.learningUnitIds || [])
    setNotes(a.notes || '')
    setIsModalOpen(true)
  }

  const handleUserSearch = async (query: string) => {
    setUserQuery(query)
    setSearchingUsers(true)
    const res = await searchUsersForContentManager(query)
    setSearchingUsers(false)
    if (res.success && res.data) {
      setUserResults(res.data)
    }
  }

  const togglePerm = (permId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId) ? prev.filter((p) => p !== permId) : [...prev, permId]
    )
  }

  const toggleModuleScope = (modId: string) => {
    setSelectedModuleIds((prev) => (prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]))
  }

  const toggleUnitScope = (unitId: string) => {
    setSelectedUnitIds((prev) => (prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]))
  }

  const handleSaveAssignment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) {
      setError('Please select a registered user.')
      return
    }
    setSaving(true)
    setError(null)
    const res = await grantOrUpdateContentManager({
      userId: selectedUser.id,
      email: selectedUser.email,
      permissions: selectedPermissions,
      scopeType,
      moduleIds: scopeType === 'SCOPED' ? selectedModuleIds : [],
      learningUnitIds: scopeType === 'SCOPED' ? selectedUnitIds : [],
      notes: notes.trim() || null,
    })
    setSaving(false)
    if (res.success) {
      setSuccessMsg(
        `Content Manager access ${editingAssignment ? 'updated' : 'granted'} for ${selectedUser.email} (${scopeType}).`
      )
      setIsModalOpen(false)
      loadAll()
    } else {
      setError(res.error || 'Failed to save Content Manager assignment.')
    }
  }

  const handleRevoke = async () => {
    if (!revokeTarget) return
    setRevoking(true)
    const res = await revokeContentManagerAccess({ userId: revokeTarget.userId, assignmentId: revokeTarget.id })
    setRevoking(false)
    setRevokeTarget(null)
    if (res.success) {
      setSuccessMsg(`Content Manager access immediately revoked for ${revokeTarget.email}.`)
      loadAll()
    } else {
      setError(res.error || 'Failed to revoke access.')
    }
  }

  const openActivityModal = async (a: AdminContentManagerAssignment) => {
    setActivityModalUser({ id: a.userId, email: a.email })
    setLoadingActivity(true)
    const res = await fetchContentManagerActivity(a.userId)
    setLoadingActivity(false)
    if (res.success && res.data) {
      setUserActivityLogs(res.data)
    } else {
      setUserActivityLogs([])
    }
  }

  const handleApprove = async (item: AdminPendingContentApproval) => {
    const res = await approvePublishContent({ resourceType: item.resourceType, id: item.id })
    if (res.success) {
      setSuccessMsg(`Approved & published "${item.title}".`)
      loadAll()
    } else {
      setError(res.error || 'Approval failed.')
    }
  }

  const handleReject = async () => {
    if (!rejectTarget) return
    const res = await rejectContentReview({
      resourceType: rejectTarget.resourceType,
      id: rejectTarget.id,
      reviewNotes: rejectNotes.trim() || 'Changes requested by Super Admin',
    })
    setRejectTarget(null)
    setRejectNotes('')
    if (res.success) {
      setSuccessMsg(`Returned "${rejectTarget.title}" with feedback.`)
      loadAll()
    } else {
      setError(res.error || 'Rejection failed.')
    }
  }

  const filteredAssignments = assignments.filter((a) => {
    if (!searchFilter.trim()) return true
    const s = searchFilter.toLowerCase()
    return a.email.toLowerCase().includes(s) || String(a.name || '').toLowerCase().includes(s)
  })

  const activeCount = assignments.filter((a) => a.isActive).length

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
            Grant scoped curriculum permissions, audit content edits, and approve pending publications.
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
            onClick={openGrantModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold shadow"
          >
            <Plus className="w-4 h-4" />
            Grant Content Manager
          </button>
        </div>
      </div>

      {/* Banners */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {error}
          </span>
          <button onClick={() => setError(null)} className="text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {successMsg}
          </span>
          <button onClick={() => setSuccessMsg(null)} className="text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-xs text-neutral-400">Active Content Managers</div>
          <div className="text-2xl font-bold text-white mt-1">{activeCount}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-xs text-neutral-400">Pending Publication Reviews</div>
          <div className="text-2xl font-bold text-amber-300 mt-1">{pendingApprovals.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#080808] border border-white/10">
          <div className="text-xs text-neutral-400">Recent Content Edits</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{auditLogs.length}</div>
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
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-2 ${
            activeTab === 'approvals'
              ? 'bg-[#1F0B0B] border-[#681717] text-[#FF6266]'
              : 'bg-[#080808] border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          Publication Approvals
          {pendingApprovals.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black font-bold text-[10px]">
              {pendingApprovals.length}
            </span>
          )}
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
          Global Content Audit ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: CONTENT MANAGERS DIRECTORY */}
      {activeTab === 'managers' && (
        <div className="space-y-4">
          <div className="bg-[#080808] p-3 rounded-xl border border-white/10">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search Content Managers by name or email..."
                className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-black/60 text-neutral-400 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Scope</th>
                    <th className="py-3.5 px-4">Permission Summary</th>
                    <th className="py-3.5 px-4">Granted / Revoked</th>
                    <th className="py-3.5 px-4">Activity</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-200">
                  {filteredAssignments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-500">
                        No Content Managers assigned yet. Click "Grant Content Manager" to add one.
                      </td>
                    </tr>
                  ) : (
                    filteredAssignments.map((a) => (
                      <tr key={a.id} className="hover:bg-white/[0.02]">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{a.name || 'Registered User'}</div>
                          <div className="font-mono text-[11px] text-neutral-400">{a.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          {a.isActive ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800/60 text-[10px] font-semibold">
                              <CheckCircle2 className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-950/40 text-red-400 border border-red-900/60 text-[10px] font-semibold">
                              <XCircle className="w-3 h-3" /> Revoked
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            {a.scopeType === 'GLOBAL' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 text-[10px] font-bold">
                                <Globe className="w-3 h-3" /> GLOBAL
                              </span>
                            ) : a.scopeType === 'SCOPED' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-800/50 text-[10px] font-bold">
                                <Shield className="w-3 h-3" /> SCOPED ({a.moduleIds.length}m · {a.learningUnitIds.length}u)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-700 text-[10px] font-bold">
                                <Lock className="w-3 h-3" /> NONE
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{a.permissionCount} permissions</div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">
                            {a.permissions.includes('content.question.publish') ? 'Can Publish' : 'Draft / Review Only'}
                            {a.permissions.includes('content.question.delete') ? ' · Can Delete' : ''}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[11px] text-neutral-400">
                          <div>Granted by {a.grantedBy || 'Super Admin'}</div>
                          {a.grantedAt && <div>{new Date(a.grantedAt).toLocaleDateString()}</div>}
                          {!a.isActive && a.revokedAt && (
                            <div className="text-red-400">
                              Revoked {new Date(a.revokedAt).toLocaleDateString()} by {a.revokedBy}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-[11px] text-neutral-400">
                          <button
                            type="button"
                            onClick={() => openActivityModal(a)}
                            className="inline-flex items-center gap-1 text-[#FF6266] hover:underline font-medium"
                          >
                            <History className="w-3.5 h-3.5" />
                            {a.activityCount} edits
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditModal(a)}
                              className="px-2.5 py-1 rounded bg-[#181818] hover:bg-[#222] border border-white/10 text-neutral-200 text-[11px] font-semibold flex items-center gap-1"
                            >
                              <Edit2 className="w-3 h-3" /> Configure
                            </button>
                            {a.isActive && (
                              <button
                                type="button"
                                onClick={() => setRevokeTarget(a)}
                                className="px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-[11px] font-semibold flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" /> Revoke
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
          </div>
        </div>
      )}

      {/* TAB 2: PENDING PUBLICATION APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-3">
          {pendingApprovals.length === 0 ? (
            <div className="p-10 text-center bg-[#080808] border border-dashed border-white/10 rounded-2xl text-xs text-neutral-500">
              No pending publication requests from Content Managers.
            </div>
          ) : (
            pendingApprovals.map((item) => (
              <div
                key={`${item.resourceType}-${item.id}`}
                className="p-4 rounded-xl bg-[#080808] border border-amber-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/70 text-[10px] font-bold">
                      {item.resourceType}
                    </span>
                    <span className="text-sm font-bold text-white">{item.title}</span>
                    {item.slug && <span className="text-xs font-mono text-neutral-500">{item.slug}</span>}
                  </div>
                  <div className="text-xs text-neutral-400">
                    Submitted by <strong className="text-white">{item.submittedByEmail}</strong> ·{' '}
                    {new Date(item.submittedAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setRejectTarget(item)}
                    className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-red-950/40 border border-white/10 hover:border-red-800/60 text-xs font-semibold text-neutral-300 hover:text-red-300"
                  >
                    Request Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(item)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve & Publish
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: GLOBAL CONTENT AUDIT LOGS */}
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
                  {log.permission_used && (
                    <span className="px-2 py-0.2 rounded bg-white/5 text-neutral-300">{log.permission_used}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* GRANT / CONFIGURE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveAssignment}
            className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#121212] border border-white/15 shadow-2xl overflow-hidden"
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#161616]">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editingAssignment ? `Configure Access: ${editingAssignment.email}` : 'Grant Content Manager Access'}
                </h2>
                <p className="text-xs text-neutral-400">
                  Select an existing registered user, configure granular permissions, and restrict curriculum scope.
                </p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Step 1: User Selection */}
              {!editingAssignment && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                    1. Select Registered User
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userQuery}
                      onChange={(e) => handleUserSearch(e.target.value)}
                      placeholder="Search by email or name..."
                      className="flex-1 bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto rounded-xl border border-white/10 bg-black/60 divide-y divide-white/5">
                    {searchingUsers ? (
                      <div className="p-4 text-center text-xs text-neutral-500">Searching users...</div>
                    ) : userResults.length === 0 ? (
                      <div className="p-4 text-center text-xs text-neutral-500">No matching eligible users found.</div>
                    ) : (
                      userResults.map((u) => {
                        const isSel = selectedUser?.id === u.id
                        return (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setSelectedUser({ id: u.id, email: u.email, name: u.name })}
                            className={cn(
                              'w-full px-3.5 py-2 flex items-center justify-between text-left text-xs transition',
                              isSel ? 'bg-[#1F0B0B] text-white' : 'hover:bg-white/[0.04] text-neutral-300'
                            )}
                          >
                            <div>
                              <div className="font-semibold">{u.name || 'Registered User'}</div>
                              <div className="font-mono text-[11px] text-neutral-400">{u.email}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono">{u.role}</span>
                              {isSel && <CheckCircle2 className="w-4 h-4 text-[#FF6266]" />}
                            </div>
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Scope Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                  2. Curriculum Access Scope
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'SCOPED', title: 'Scoped Modules / Units', desc: 'Restrict solely to checked modules or units (Recommended).' },
                    { id: 'GLOBAL', title: 'Global Content Access', desc: 'Manage all curriculum modules, lessons, and questions.' },
                    { id: 'NONE', title: 'No Scope (Locked)', desc: 'Safest default until modules or units are assigned.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScopeType(opt.id as ContentScopeType)}
                      className={cn(
                        'p-3 rounded-xl border text-left transition',
                        scopeType === opt.id
                          ? 'bg-[#1F0B0B] border-[#ED2A2B] text-white'
                          : 'bg-black/50 border-white/10 text-neutral-400 hover:border-white/25'
                      )}
                    >
                      <div className="text-xs font-bold">{opt.title}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                {scopeType === 'SCOPED' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-2">
                      <div className="text-xs font-semibold text-white">Authorized Modules ({selectedModuleIds.length})</div>
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {modules.map((m) => (
                          <label key={m.id} className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer py-1">
                            <input
                              type="checkbox"
                              checked={selectedModuleIds.includes(m.id)}
                              onChange={() => toggleModuleScope(m.id)}
                              className="accent-[#ED2A2B]"
                            />
                            <span className="truncate">M{m.order}: {m.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-2">
                      <div className="text-xs font-semibold text-white">Specific Learning Units ({selectedUnitIds.length})</div>
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {learningUnits.map((u) => (
                          <label key={u.id} className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer py-1">
                            <input
                              type="checkbox"
                              checked={selectedUnitIds.includes(u.id)}
                              onChange={() => toggleUnitScope(u.id)}
                              className="accent-[#ED2A2B]"
                            />
                            <span className="truncate">{u.order}. {u.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Granular Permissions */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    3. Granular Permissions ({selectedPermissions.length} selected)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPermissions([...DEFAULT_CONTENT_MANAGER_PERMISSIONS])}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] text-neutral-300"
                    >
                      Apply Safe Defaults
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPermissions([...CONTENT_PERMISSION_LIST])}
                      className="px-2.5 py-1 rounded bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/50 text-[11px] text-amber-300"
                    >
                      Grant All Content Perms
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <div key={cat} className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF6266]">{cat}</div>
                      {CONTENT_PERMISSION_CATALOG.filter((p) => p.category === cat).map((perm) => (
                        <label key={perm.id} className="flex items-start gap-2 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(perm.id)}
                            onChange={() => togglePerm(perm.id)}
                            className="mt-0.5 accent-[#ED2A2B]"
                          />
                          <div>
                            <div className={perm.isElevated ? 'text-amber-300 font-medium' : 'text-neutral-200'}>
                              {perm.label}
                              {perm.isElevated && (
                                <span className="ml-1.5 text-[9px] px-1 py-0.2 rounded bg-amber-950/60 border border-amber-800/60">
                                  ELEVATED
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] font-mono text-neutral-500">{perm.id}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Assignment Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Authoring Python Loops & Recursion curriculum"
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
                disabled={saving || !selectedUser}
                className="px-5 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold disabled:opacity-40"
              >
                {saving ? 'Saving...' : 'Save Content Manager Access'}
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

      {/* Revoke Modal */}
      {revokeTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#121212] border border-red-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Revoke Content Manager Access</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Immediately revoke Content Manager permissions for <strong className="text-white">{revokeTarget.email}</strong>?
              Their account will immediately lose access to <code className="text-[#FF6266]">/content-manager</code> and restore to{' '}
              <strong>{revokeTarget.previousRole}</strong>.
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
                disabled={revoking}
                onClick={handleRevoke}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white"
              >
                {revoking ? 'Revoking...' : 'Confirm Revoke'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#121212] border border-white/15 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Request Changes: {rejectTarget.title}</h3>
            <textarea
              rows={3}
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              placeholder="Provide feedback or required revisions..."
              className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectTarget(null)}
                className="px-3.5 py-1.5 rounded-lg border border-white/15 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white"
              >
                Return to Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
