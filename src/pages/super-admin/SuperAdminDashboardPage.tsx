import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  UserCog,
  Users,
  GraduationCap,
  RefreshCw,
  Plus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Activity,
  Layers,
} from 'lucide-react'
import {
  fetchSuperAdminDashboard,
  SuperAdminDashboardTelemetry,
} from '@/lib/superAdminService'

export const SuperAdminDashboardPage: React.FC = () => {
  const [telemetry, setTelemetry] = useState<SuperAdminDashboardTelemetry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const res = await fetchSuperAdminDashboard()
    if (res.success && res.data) {
      setTelemetry(res.data)
    } else {
      setError(res.error || 'Failed to load platform telemetry.')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-full space-y-5 bg-[#0b0b0d] p-4 sm:p-6 text-white rounded-2xl">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Platform Command Center</h1>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-950 text-red-400 border border-red-800">
              Super Admin
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Authoritative platform-wide telemetry, multi-campus governance, and audit trails.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-500' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/super-admin/campuses"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-[#d02425] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Campus</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-900/60 text-red-300 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadData} className="underline text-xs hover:text-white">Retry</button>
        </div>
      )}

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
        {/* Campuses Card */}
        <div className="group p-5 rounded-2xl bg-gradient-to-br from-[#1b1b1f] to-[#141416] border border-white/[0.07] hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Campuses</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-4xl font-semibold tracking-tight text-white">
              {loading ? '-' : telemetry?.overview.totalCampuses ?? 0}
            </div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{telemetry?.overview.activeCampuses ?? 0} Active</span>
            </div>
          </div>
          <Link
            to="/super-admin/campuses"
            className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Manage Campuses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Campus Managers Card */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Campus Managers</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <UserCog className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white">
              {loading ? '-' : telemetry?.overview.totalManagers ?? 0}
            </div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{telemetry?.overview.activeManagers ?? 0} Active</span>
            </div>
          </div>
          <Link
            to="/super-admin/managers"
            className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>Manage Managers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mentors Card */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Mentors</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white">
              {loading ? '-' : telemetry?.overview.totalMentors ?? 0}
            </div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{telemetry?.overview.activeMentors ?? 0} Active</span>
            </div>
          </div>
          <Link
            to="/super-admin/mentors"
            className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Manage Mentors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Students Card */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Students</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white">
              {loading ? '-' : telemetry?.overview.totalStudents ?? 0}
            </div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{telemetry?.overview.activeStudents ?? 0} Active</span>
            </div>
          </div>
          <Link
            to="/super-admin/students"
            className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Manage Students</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Role Breakdown Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#151517] border border-white/[0.07] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-neutral-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Platform Role Distribution
            </h2>
          </div>
          <Link
            to="/super-admin/roles"
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
          >
            <span>RBAC Directory</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 pt-1">
          <div className="bg-[#0d0d0f] p-4 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <div className="text-[11px] font-semibold text-neutral-400 uppercase">Super Admin</div>
            <div className="text-xl font-bold text-red-400 mt-0.5">
              {telemetry?.roleDistribution?.SUPERADMIN ?? 1}
            </div>
            <div className="text-[10px] text-neutral-500">Sole Authorized</div>
          </div>
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
            <div className="text-[11px] font-semibold text-neutral-400 uppercase">Campus Managers</div>
            <div className="text-xl font-bold text-purple-400 mt-0.5">
              {(telemetry?.roleDistribution?.CAMPUS_MANAGER ?? 0) + (telemetry?.roleDistribution?.ADMIN ?? 0)}
            </div>
            <div className="text-[10px] text-neutral-500">Campus Staff</div>
          </div>
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
            <div className="text-[11px] font-semibold text-neutral-400 uppercase">Mentors</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5">
              {telemetry?.roleDistribution?.MENTOR ?? 0}
            </div>
            <div className="text-[10px] text-neutral-500">Faculty Guides</div>
          </div>
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
            <div className="text-[11px] font-semibold text-neutral-400 uppercase">Students</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">
              {telemetry?.roleDistribution?.STUDENT ?? 0}
            </div>
            <div className="text-[10px] text-neutral-500">Learners</div>
          </div>
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
            <div className="text-[11px] font-semibold text-neutral-400 uppercase">Total Accounts</div>
            <div className="text-xl font-bold text-white mt-0.5">
              {telemetry?.overview?.totalUsers ?? 0}
            </div>
            <div className="text-[10px] text-neutral-500">Platform-wide</div>
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Campuses Breakdown & Recent Audit Logs */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
        {/* Campuses Overview Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#151517] border border-white/[0.07] flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Campuses Overview
              </h2>
            </div>
            <Link
              to="/super-admin/campuses"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-800/60 overflow-y-auto max-h-[28rem] mt-3">
            {(!telemetry?.campuses || telemetry.campuses.length === 0) ? (
              <div className="py-8 text-center text-xs text-neutral-500">
                {loading ? 'Loading campuses...' : 'No campuses registered.'}
              </div>
            ) : (
              telemetry.campuses.map((c) => (
                <div key={c.id} className="py-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                      <span className="px-1.5 py-0.5 text-[10px] font-mono bg-neutral-800 text-neutral-300 rounded">
                        {c.code}
                      </span>
                      {c.status === 'ACTIVE' ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Active" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-neutral-600" title="Inactive" />
                      )}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {c.city ? `${c.city}, ${c.state || ''}` : 'Location unconfigured'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-right flex-shrink-0 text-xs">
                    <div>
                      <div className="font-semibold text-white">{c.totalStudents}</div>
                      <div className="text-[10px] text-neutral-500">Students</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{c.totalMentors}</div>
                      <div className="text-[10px] text-neutral-500">Mentors</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Audit Logs */}
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Recent Audit Trail
              </h2>
            </div>
            <Link
              to="/super-admin/audit"
              className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
            >
              <span>Full Audit Logs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-800/60 overflow-y-auto max-h-80 mt-2">
            {(!telemetry?.recentAuditLogs || telemetry.recentAuditLogs.length === 0) ? (
              <div className="py-8 text-center text-xs text-neutral-500">
                {loading ? 'Loading audit trail...' : 'No administrative actions recorded yet.'}
              </div>
            ) : (
              telemetry.recentAuditLogs.map((log) => (
                <div key={log.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 font-medium text-white truncate">
                      {log.status === 'SUCCESS' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      )}
                      <span className="font-mono text-red-400 font-semibold">{log.action}</span>
                      <span className="text-neutral-400 truncate">on {log.target_label || log.target_type}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5 font-mono truncate">
                      by {log.admin_email}
                    </div>
                  </div>
                  <div className="text-[11px] text-neutral-500 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
