import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Code2,
  Clock,
  FileEdit,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Shield,
  Globe,
  Lock,
  ArrowRight,
  History,
} from 'lucide-react'
import { useContentManager } from '@/contexts/ContentManagerContext'
import {
  fetchContentManagerDashboard,
  ContentManagerDashboardData,
} from '@/lib/contentManagerService'

export const ContentManagerDashboardPage: React.FC = () => {
  const { profile, hasPermission } = useContentManager()
  const [data, setData] = useState<ContentManagerDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDashboard = async () => {
    setLoading(true)
    setError(null)
    const res = await fetchContentManagerDashboard()
    if (res.success && res.data) {
      setData(res.data)
    } else {
      setError(res.error || 'Failed to load Content Manager overview.')
    }
    setLoading(false)
  }

  useEffect(() => {
    document.title = 'KalviLearn — Content Studio Overview'
    loadDashboard()
  }, [])

  if (!hasPermission('content.dashboard.view')) {
    return (
      <div className="p-8 rounded-2xl border border-[#681717] bg-[#1F0B0B]/30 text-center space-y-3">
        <Lock className="w-8 h-8 text-[#FF6266] mx-auto" />
        <h2 className="text-lg font-bold text-white">Dashboard Overview Restricted</h2>
        <p className="text-sm text-neutral-400">
          Your account lacks the <code className="text-[#FF6266]">content.dashboard.view</code> permission.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-6 h-6 text-[#FF6266]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Content Studio Overview</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Manage curriculum modules, learning units, and coding questions strictly within your assigned scope.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadDashboard}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080808] border border-white/10 hover:border-white/20 text-xs font-medium text-neutral-300 hover:text-white transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF6266]' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Scope Banner */}
      <div className="p-4 rounded-xl bg-[#080808] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {profile?.scopeType === 'GLOBAL' ? (
            <Globe className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : profile?.scopeType === 'SCOPED' ? (
            <Shield className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <Lock className="w-5 h-5 text-[#FF6266] shrink-0" />
          )}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Access Scope:{' '}
              <span
                className={
                  profile?.scopeType === 'GLOBAL'
                    ? 'text-emerald-400'
                    : profile?.scopeType === 'SCOPED'
                    ? 'text-amber-400'
                    : 'text-[#FF6266]'
                }
              >
                {profile?.scopeType || 'NONE'}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {profile?.scopeType === 'GLOBAL'
                ? 'Authorized to manage all educational curriculum modules, lessons, and questions according to your permissions.'
                : profile?.scopeType === 'SCOPED'
                ? `Scoped strictly to ${profile.assignedModuleIds.length} module(s) and ${profile.assignedLearningUnitIds.length} specific learning unit(s).`
                : 'No curriculum scope is currently configured. Contact the Super Admin to assign modules or units.'}
            </p>
          </div>
        </div>
        <Link
          to="/content-manager/profile"
          className="text-xs font-semibold text-[#FF6266] hover:underline flex items-center gap-1 shrink-0"
        >
          View Permission Matrix <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/60 text-red-300 text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={loadDashboard}
            className="px-3 py-1 rounded bg-red-900/40 hover:bg-red-900/60 text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {loading && !data ? (
        <div className="py-16 text-center text-neutral-400 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF6266]" />
          Loading scoped content metrics...
        </div>
      ) : data ? (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-[#080808] border border-white/10">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Assigned Modules</span>
                <BookOpen className="w-4 h-4 text-[#FF6266]" />
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{data.stats.assignedModulesCount}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-white/10">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Learning Units</span>
                <Layers className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{data.stats.totalLearningUnits}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-white/10">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Coding Questions</span>
                <Code2 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{data.stats.totalCodingQuestions}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-white/10">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Draft Questions</span>
                <FileEdit className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-amber-300">{data.stats.draftQuestions}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-white/10">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Pending Approvals</span>
                <Clock className="w-4 h-4 text-orange-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-orange-300">{data.stats.pendingApprovals}</div>
              {data.stats.publishedQuestions !== null && (
                <div className="mt-1 text-[11px] text-emerald-400">
                  {data.stats.publishedQuestions} published live
                </div>
              )}
            </div>
          </div>

          {/* Assigned Modules & Recent Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assigned Modules */}
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FF6266]" />
                  Assigned Curriculum Modules
                </h2>
                <Link to="/content-manager/curriculum" className="text-xs text-[#FF6266] hover:underline">
                  Open Curriculum
                </Link>
              </div>
              {data.assignedModules.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl">
                  No curriculum modules are assigned to your scope yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {data.assignedModules.slice(0, 6).map((mod) => (
                    <div
                      key={mod.id}
                      className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          Module {mod.order}: {mod.title}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          {mod.unitCount} learning unit{mod.unitCount === 1 ? '' : 's'} ·{' '}
                          {mod.canManageModule ? 'Editable module' : 'Unit-scoped access'}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${
                          mod.status === 'PUBLISHED'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                        }`}
                      >
                        {mod.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recently Edited Questions */}
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  Recently Edited Questions
                </h2>
                <Link to="/content-manager/questions" className="text-xs text-[#FF6266] hover:underline">
                  Manage Questions
                </Link>
              </div>
              {data.recentlyEditedQuestions.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl">
                  No questions found within your assigned scope.
                </div>
              ) : (
                <div className="space-y-2">
                  {data.recentlyEditedQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{q.title}</div>
                        <div className="text-[11px] text-neutral-500 font-mono truncate">{q.slug}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {q.approvalStatus === 'PENDING_REVIEW' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950/50 text-amber-300 border border-amber-800/60">
                            Pending Review
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            q.status === 'PUBLISHED'
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                          }`}
                        >
                          {q.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recently Updated Lessons & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Recently Updated Lessons
                </h2>
                <Link to="/content-manager/learning-units" className="text-xs text-[#FF6266] hover:underline">
                  View Units
                </Link>
              </div>
              {data.recentlyUpdatedLessons.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl">
                  No recently updated learning units in scope.
                </div>
              ) : (
                <div className="space-y-2">
                  {data.recentlyUpdatedLessons.map((lu) => (
                    <div
                      key={lu.id}
                      className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{lu.title}</div>
                        <div className="text-[11px] text-neutral-500">
                          Updated {new Date(lu.updatedAt).toLocaleString()}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${
                          lu.status === 'PUBLISHED'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                        }`}
                      >
                        {lu.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  My Recent Content Activity
                </h2>
                <Link to="/content-manager/revisions" className="text-xs text-[#FF6266] hover:underline">
                  All Activity
                </Link>
              </div>
              {data.recentActivity.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl">
                  No recent edits recorded yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {data.recentActivity.slice(0, 6).map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{act.change_summary || act.action}</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 font-mono">
                          {act.resource_type} · {new Date(act.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
