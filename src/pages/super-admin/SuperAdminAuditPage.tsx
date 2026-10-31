import React, { useEffect, useState } from 'react'
import {
  History,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  X,
  FileText,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react'
import {
  fetchAuditLogs,
  AdminAuditLogEntry,
} from '@/lib/superAdminService'

export const SuperAdminAuditPage: React.FC = () => {
  const [logs, setLogs] = useState<AdminAuditLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters & Pagination
  const [actionFilter, setActionFilter] = useState('ALL')
  const [targetTypeFilter, setTargetTypeFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const [limit] = useState(30)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Details Modal
  const [inspectingLog, setInspectingLog] = useState<AdminAuditLogEntry | null>(null)

  const loadData = async (targetPage = page) => {
    setLoading(true)
    setError(null)
    const res = await fetchAuditLogs({
      page: targetPage,
      limit,
      actionFilter: actionFilter !== 'ALL' ? actionFilter : undefined,
      targetType: targetTypeFilter !== 'ALL' ? targetTypeFilter : undefined,
    })

    if (res.success && res.data) {
      setLogs(res.data.logs || [])
      setTotalCount(res.data.totalCount || 0)
      setTotalPages(res.data.totalPages || 1)
      setPage(res.data.page || targetPage)
    } else {
      setError(res.error || 'Failed to load audit logs.')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData(1)
  }, [actionFilter, targetTypeFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-red-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Administrative Audit Log</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Tamper-resistant, append-only log of all Super Admin operations, security events, and entity mutations.
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
        </div>
      </div>

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

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900 p-3 rounded-xl border border-neutral-800">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Target Type Filter */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Filter className="w-3.5 h-3.5 text-neutral-500" />
            <span>Entity:</span>
            <select
              value={targetTypeFilter}
              onChange={(e) => setTargetTypeFilter(e.target.value)}
              className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-hidden focus:border-red-500"
            >
              <option value="ALL">All Entities</option>
              <option value="CAMPUS">Campuses</option>
              <option value="USER">Users</option>
              <option value="MENTOR">Mentors</option>
              <option value="STUDENT">Students</option>
            </select>
          </div>

          {/* Action Filter */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Activity className="w-3.5 h-3.5 text-neutral-500" />
            <span>Action:</span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-hidden focus:border-red-500"
            >
              <option value="ALL">All Actions</option>
              <option value="CREATE_CAMPUS">CREATE_CAMPUS</option>
              <option value="UPDATE_CAMPUS">UPDATE_CAMPUS</option>
              <option value="TOGGLE_CAMPUS_STATUS">TOGGLE_CAMPUS_STATUS</option>
              <option value="ASSIGN_CAMPUS_MANAGER">ASSIGN_CAMPUS_MANAGER</option>
              <option value="PROVISION_CAMPUS_MANAGER">PROVISION_CAMPUS_MANAGER</option>
              <option value="ASSIGN_MANAGER_CAMPUS">ASSIGN_MANAGER_CAMPUS</option>
              <option value="PROVISION_MENTOR">PROVISION_MENTOR</option>
              <option value="UPDATE_MENTOR">UPDATE_MENTOR</option>
              <option value="ENROLL_STUDENT">ENROLL_STUDENT</option>
              <option value="UPDATE_STUDENT">UPDATE_STUDENT</option>
              <option value="DELETE_STUDENT">DELETE_STUDENT</option>
              <option value="UPDATE_USER_ROLE">UPDATE_USER_ROLE</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-neutral-400">
          Total Logs: <span className="font-semibold text-white">{totalCount}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">Target Label</th>
                <th className="py-3.5 px-4">Administrator</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-red-500 mb-2" />
                    <span>Loading audit records...</span>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    No audit log records found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3.5 px-4 text-neutral-400 font-mono whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-red-400">
                      {log.action}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300">
                        {log.target_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-white font-medium truncate max-w-xs">
                      {log.target_label || log.target_id || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-300">
                      {log.admin_email}
                    </td>
                    <td className="py-3.5 px-4">
                      {log.status === 'SUCCESS' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          SUCCESS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-400">
                          <XCircle className="w-3.5 h-3.5" />
                          FAILED
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setInspectingLog(log)}
                        className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between text-xs text-neutral-400">
          <div>
            Showing <span className="text-white font-medium">{logs.length}</span> of{' '}
            <span className="text-white font-medium">{totalCount}</span> entries
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

      {/* Details Inspection Modal */}
      {inspectingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-lg w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setInspectingLog(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-400" />
              <span>Audit Log Details</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-4 font-mono">
              Event ID: {inspectingLog.id}
            </p>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono">
                <div>
                  <span className="text-neutral-500 block">Action</span>
                  <span className="text-red-400 font-semibold">{inspectingLog.action}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Status</span>
                  <span className={inspectingLog.status === 'SUCCESS' ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                    {inspectingLog.status}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Target Type</span>
                  <span className="text-neutral-300">{inspectingLog.target_type}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Target ID</span>
                  <span className="text-neutral-300 truncate block">{inspectingLog.target_id || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Administrator</span>
                  <span className="text-neutral-300">{inspectingLog.admin_email}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Client IP</span>
                  <span className="text-neutral-300">{inspectingLog.ip_address || '127.0.0.1'}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-neutral-300 mb-1">
                  Mutation Details (Payload)
                </span>
                <pre className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48">
                  {JSON.stringify(inspectingLog.details || {}, null, 2)}
                </pre>
              </div>

              {inspectingLog.error_message && (
                <div>
                  <span className="block text-xs font-semibold text-red-400 mb-1">
                    Error Message
                  </span>
                  <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-900/60 text-red-300 text-xs font-mono">
                    {inspectingLog.error_message}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end pt-4 mt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setInspectingLog(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
