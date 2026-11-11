import React, { useEffect, useState } from 'react'
import { History, RefreshCw, AlertTriangle, Lock, CheckCircle2, FileCode } from 'lucide-react'
import { useContentManager } from '@/contexts/ContentManagerContext'
import { fetchCmMyRevisions, ContentAuditLogEntry } from '@/lib/contentManagerService'
import type { AdminQuestionRevision } from '@/lib/superAdminService'

export const ContentManagerRevisionsPage: React.FC = () => {
  const { hasPermission } = useContentManager()
  const [auditLogs, setAuditLogs] = useState<ContentAuditLogEntry[]>([])
  const [revisions, setRevisions] = useState<AdminQuestionRevision[]>([])
  const [scope, setScope] = useState<'ALL_REVISIONS' | 'OWN_REVISIONS'>('OWN_REVISIONS')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'audit' | 'revisions'>('audit')

  const canViewRevs = hasPermission('content.revision.view_own') || hasPermission('content.revision.view_all')

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const res = await fetchCmMyRevisions()
    if (res.success && res.data) {
      setAuditLogs(res.data.auditLogs || [])
      setRevisions(res.data.questionRevisions || [])
      setScope(res.data.scope)
    } else {
      setError(res.error || 'Failed to load revisions and activity.')
    }
    setLoading(false)
  }

  useEffect(() => {
    document.title = 'KalviLearn — My Revisions'
    if (canViewRevs) loadData()
  }, [canViewRevs])

  if (!canViewRevs) {
    return (
      <div className="p-8 rounded-2xl border border-[#681717] bg-[#1F0B0B]/30 text-center space-y-3">
        <Lock className="w-8 h-8 text-[#FF6266] mx-auto" />
        <h2 className="text-lg font-bold text-white">Revisions Access Restricted</h2>
        <p className="text-sm text-neutral-400">
          Viewing content revisions requires <code className="text-[#FF6266]">content.revision.view_own</code> or{' '}
          <code className="text-[#FF6266]">content.revision.view_all</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <History className="w-6 h-6 text-[#FF6266]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">My Revisions & Audit Trail</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            {scope === 'ALL_REVISIONS'
              ? 'Viewing content management revisions across your authorized curriculum.'
              : 'Viewing content modifications and snapshots authored by your account.'}
          </p>
        </div>
        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080808] border border-white/10 hover:border-white/20 text-xs font-medium text-neutral-300"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF6266]' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
            tab === 'audit'
              ? 'bg-[#1F0B0B] border-[#681717] text-[#FF6266]'
              : 'bg-[#080808] border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          Content Change Audit ({auditLogs.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('revisions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
            tab === 'revisions'
              ? 'bg-[#1F0B0B] border-[#681717] text-[#FF6266]'
              : 'bg-[#080808] border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          Question Version Snapshots ({revisions.length})
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-neutral-400 text-xs">
          <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#FF6266]" />
          Loading change history...
        </div>
      ) : tab === 'audit' ? (
        auditLogs.length === 0 ? (
          <div className="p-10 text-center bg-[#080808] border border-dashed border-white/10 rounded-2xl text-xs text-neutral-500">
            No content audit activity recorded yet.
          </div>
        ) : (
          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-[#080808] border border-white/10 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-white">{log.change_summary || log.action}</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 font-mono">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-300">{log.resource_type}</span>
                  {log.resource_label && <span className="text-neutral-300">{log.resource_label}</span>}
                  {log.permission_used && (
                    <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-900/50">
                      {log.permission_used}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : revisions.length === 0 ? (
        <div className="p-10 text-center bg-[#080808] border border-dashed border-white/10 rounded-2xl text-xs text-neutral-500">
          No question revision snapshots found.
        </div>
      ) : (
        <div className="space-y-2.5">
          {revisions.map((rev) => (
            <div key={rev.id} className="p-4 rounded-xl bg-[#080808] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    v{rev.version} · {rev.changeSummary || 'Snapshot'}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Question ID: {rev.problemId} · {new Date(rev.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
