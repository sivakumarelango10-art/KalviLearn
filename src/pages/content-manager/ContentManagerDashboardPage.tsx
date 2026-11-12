import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Code2,
  Trophy,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  History,
} from 'lucide-react'
import {
  fetchContentManagerDashboard,
  ContentManagerDashboardData,
} from '@/lib/contentManagerService'

export const ContentManagerDashboardPage: React.FC = () => {
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
      setError(res.error || 'Failed to load Content Studio overview.')
    }
    setLoading(false)
  }

  useEffect(() => {
    document.title = 'KalviLearn — Content Studio Overview'
    loadDashboard()
  }, [])

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
            Manage curriculum modules, learning units, Belt-based Practice questions, and Learn Coding lesson questions.
          </p>
        </div>

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

      {/* Assigned Content Overview Banner */}
      <div className="p-4 rounded-xl bg-[#080808] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Assigned Content Overview
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Active Content Managers receive full access to Curriculum Modules &amp; Learning Units, Practice Coding Questions, and Learn Coding Lesson Questions.
            </p>
          </div>
        </div>
        <Link
          to="/content-manager/profile"
          className="text-xs font-semibold text-[#FF6266] hover:underline flex items-center gap-1 shrink-0"
        >
          View Profile <ArrowRight className="w-3.5 h-3.5" />
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
          Loading Content Studio metrics...
        </div>
      ) : data ? (
        <>
          {/* 4 Main Overview KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/content-manager/curriculum"
              className="p-4 rounded-xl bg-[#080808] border border-white/10 hover:border-white/25 transition"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Total Modules</span>
                <BookOpen className="w-4 h-4 text-[#FF6266]" />
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{data.stats.totalModules ?? data.stats.assignedModulesCount}</div>
            </Link>

            <Link
              to="/content-manager/curriculum"
              className="p-4 rounded-xl bg-[#080808] border border-white/10 hover:border-white/25 transition"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Total Learning Units</span>
                <Layers className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{data.stats.totalLearningUnits}</div>
            </Link>

            <Link
              to="/content-manager/practice-questions"
              className="p-4 rounded-xl bg-[#080808] border border-white/10 hover:border-white/25 transition"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Total Practice Questions</span>
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-amber-300">{data.stats.totalPracticeQuestions ?? 0}</div>
            </Link>

            <Link
              to="/content-manager/learn-coding-questions"
              className="p-4 rounded-xl bg-[#080808] border border-white/10 hover:border-white/25 transition"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Total Learn Coding Questions</span>
                <Code2 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-300">{data.stats.totalLearnCodingQuestions ?? 0}</div>
            </Link>
          </div>

          {/* Curriculum Modules & Recently Edited Questions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FF6266]" />
                  Curriculum Modules
                </h2>
                <Link to="/content-manager/curriculum" className="text-xs text-[#FF6266] hover:underline">
                  Manage Curriculum
                </Link>
              </div>
              {data.assignedModules.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl">
                  No curriculum modules found yet.
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
                          {mod.unitCount} learning unit{mod.unitCount === 1 ? '' : 's'}
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

            <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  Recently Created &amp; Edited Questions
                </h2>
                <div className="flex items-center gap-3 text-xs">
                  <Link to="/content-manager/practice-questions" className="text-amber-300 hover:underline">
                    Practice
                  </Link>
                  <Link to="/content-manager/learn-coding-questions" className="text-[#FF6266] hover:underline">
                    Learn Coding
                  </Link>
                </div>
              </div>
              {data.recentlyEditedQuestions.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl">
                  No recently edited coding questions found.
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
                        <div className="text-[11px] text-neutral-500 font-mono truncate">
                          {q.learningUnitId ? 'Learn Coding' : 'Practice'} · {q.slug}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${
                          q.status === 'PUBLISHED'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                        }`}
                      >
                        {q.status}
                      </span>
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
                  Recently Updated Learning Units
                </h2>
                <Link to="/content-manager/curriculum" className="text-xs text-[#FF6266] hover:underline">
                  Open Curriculum
                </Link>
              </div>
              {data.recentlyUpdatedLessons.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-white/10 rounded-xl">
                  No recently updated learning units yet.
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
                  Recent Content Activity
                </h2>
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
