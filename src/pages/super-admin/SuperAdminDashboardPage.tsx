import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, ArrowUpRight, Building2, CheckCircle2, GraduationCap,
  Layers3, Plus, RefreshCw, ShieldCheck, UserCog, Users, XCircle,
} from 'lucide-react'
import {
  fetchSuperAdminDashboard,
  SuperAdminDashboardTelemetry,
} from '@/lib/superAdminService'

const number = (value?: number) => (value ?? 0).toLocaleString()

export const SuperAdminDashboardPage: React.FC = () => {
  const [telemetry, setTelemetry] = useState<SuperAdminDashboardTelemetry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchSuperAdminDashboard()
      if (res.success && res.data) setTelemetry(res.data)
      else setError(res.error || 'Unable to load platform telemetry.')
    } catch {
      setError('Unable to load platform telemetry. Please retry.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadData() }, [])

  const overview = telemetry?.overview
  const roleDistribution = telemetry?.roleDistribution
  const totalUsers = overview?.totalUsers ?? 0
  const roleItems = [
    { label: 'Super Admin', value: roleDistribution?.SUPERADMIN ?? 1, color: 'bg-rose-400', text: 'text-rose-300' },
    { label: 'Campus Managers', value: (roleDistribution?.CAMPUS_MANAGER ?? 0) + (roleDistribution?.ADMIN ?? 0), color: 'bg-violet-400', text: 'text-violet-300' },
    { label: 'Mentors', value: roleDistribution?.MENTOR ?? 0, color: 'bg-amber-400', text: 'text-amber-300' },
    { label: 'Students', value: roleDistribution?.STUDENT ?? 0, color: 'bg-emerald-400', text: 'text-emerald-300' },
  ]
  const metrics = [
    { label: 'Campuses', value: overview?.totalCampuses, active: overview?.activeCampuses, icon: Building2, color: 'text-rose-300', tint: 'bg-rose-500/10', href: '/super-admin/campuses', description: 'Registered institutions' },
    { label: 'Campus managers', value: overview?.totalManagers, active: overview?.activeManagers, icon: UserCog, color: 'text-violet-300', tint: 'bg-violet-400/10', href: '/super-admin/managers', description: 'Campus operations' },
    { label: 'Mentors', value: overview?.totalMentors, active: overview?.activeMentors, icon: Users, color: 'text-amber-300', tint: 'bg-amber-400/10', href: '/super-admin/mentors', description: 'Learning facilitators' },
    { label: 'Students', value: overview?.totalStudents, active: overview?.activeStudents, icon: GraduationCap, color: 'text-emerald-300', tint: 'bg-emerald-400/10', href: '/super-admin/students', description: 'Enrolled learners' },
  ]

  return (
    <main className="min-h-screen w-full bg-black px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1680px] space-y-6 xl:space-y-7">
        <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/20 bg-rose-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-300">
                <ShieldCheck className="h-3.5 w-3.5" /> Super Admin
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.7)]" /> Platform overview
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Command center</h1>
            <p className="mt-1.5 max-w-2xl text-sm text-slate-400">A clear view of campus operations, platform membership, and administrative activity.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => void loadData()} disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08] disabled:opacity-60">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <Link to="/super-admin/campuses" className="inline-flex h-10 items-center gap-2 rounded-xl bg-rose-500 px-4 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition hover:bg-rose-400">
              <Plus className="h-4 w-4" /> Add campus
            </Link>
          </div>
        </header>

        {error && <div role="alert" className="flex items-center justify-between rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}<button onClick={() => void loadData()} className="font-semibold underline underline-offset-2">Retry</button></div>}

        <section aria-label="Platform metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {metrics.map(({ label, value, active, icon: Icon, color, tint, href, description }) => (
            <Link key={label} to={href} className="group rounded-2xl border border-white/[0.08] bg-[#080808] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-[#000000]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white tabular-nums">{loading ? '—' : number(value)}</p>
                  <p className="mt-1 text-xs text-slate-500">{description}</p>
                </div>
                <span className={`rounded-xl p-2.5 ${tint} ${color}`}><Icon className="h-5 w-5" /></span>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-3">
                <span className="flex items-center gap-2 text-xs text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{number(active)} active</span>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold ${color}`}>Manage <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </div>
            </Link>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.1fr)_minmax(380px,.9fr)]">
          <div className="rounded-2xl border border-white/[0.08] bg-[#080808] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-slate-300"><Layers3 className="h-4 w-4 text-slate-400" /><h2 className="text-sm font-semibold">Platform role distribution</h2></div>
                <p className="mt-1 text-xs text-slate-500">Account composition across the platform</p>
              </div>
              <Link to="/super-admin/roles" className="text-xs font-medium text-slate-400 transition hover:text-white">RBAC directory <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></Link>
            </div>
            <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-white/[0.06]" aria-label="Role distribution bar">
              {roleItems.map(item => <div key={item.label} className={item.color} style={{ width: totalUsers ? `${(item.value / totalUsers) * 100}%` : '0%' }} title={`${item.label}: ${item.value}`} />)}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-4">
              {roleItems.map(item => <div key={item.label} className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-400"><span className={`h-2 w-2 rounded-full ${item.color}`} />{item.label}</div>
                <p className={`mt-2 text-2xl font-semibold tabular-nums ${item.text}`}>{number(item.value)}</p>
              </div>)}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
              <span className="text-xs text-slate-400">Total platform accounts</span><span className="text-lg font-semibold text-white tabular-nums">{number(totalUsers)}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#080808] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div><div className="flex items-center gap-2 text-slate-300"><Activity className="h-4 w-4 text-rose-300" /><h2 className="text-sm font-semibold">Recent admin activity</h2></div><p className="mt-1 text-xs text-slate-500">Latest recorded governance events</p></div>
              <Link to="/super-admin/audit" className="shrink-0 text-xs font-medium text-rose-300 hover:text-rose-200">View audit log <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></Link>
            </div>
            <div className="mt-4 space-y-1">
              {(!telemetry?.recentAuditLogs || telemetry.recentAuditLogs.length === 0) ? <div className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-500">{loading ? 'Loading activity…' : 'No administrative actions recorded yet.'}</div> : telemetry.recentAuditLogs.slice(0, 6).map(log => (
                <div key={log.id} className="flex items-start gap-3 rounded-xl px-2.5 py-3 transition hover:bg-white/[0.03]">
                  <span className="mt-0.5 shrink-0">{log.status === 'SUCCESS' ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-rose-400" />}</span>
                  <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-slate-200"><span className="font-mono text-rose-300">{log.action}</span><span className="text-slate-400"> · {log.target_label || log.target_type}</span></p><p className="mt-1 truncate text-[11px] text-slate-500">{log.admin_email}</p></div>
                  <time className="shrink-0 pt-0.5 text-[11px] text-slate-500">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#080808] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><div className="flex items-center gap-2 text-slate-300"><Building2 className="h-4 w-4 text-rose-300" /><h2 className="text-sm font-semibold">Campus directory</h2></div><p className="mt-1 text-xs text-slate-500">Campus health and enrollment at a glance</p></div>
            <Link to="/super-admin/campuses" className="text-xs font-medium text-rose-300 hover:text-sky-200">All campuses <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead><tr className="border-b border-white/[0.08] text-[11px] uppercase tracking-wider text-slate-500"><th className="px-3 py-3 font-medium">Campus</th><th className="px-3 py-3 font-medium">Location</th><th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 text-right font-medium">Students</th><th className="px-3 py-3 text-right font-medium">Mentors</th></tr></thead>
              <tbody className="divide-y divide-white/[0.05]">
                {(!telemetry?.campuses || telemetry.campuses.length === 0) ? <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-slate-500">{loading ? 'Loading campuses…' : 'No campuses registered.'}</td></tr> : telemetry.campuses.map(c => <tr key={c.id} className="transition hover:bg-white/[0.025]">
                  <td className="px-3 py-4"><div className="font-medium text-slate-200">{c.name}</div><div className="mt-1 font-mono text-[11px] text-slate-500">{c.code}</div></td>
                  <td className="px-3 py-4 text-xs text-slate-400">{c.city ? `${c.city}, ${c.state || ''}` : 'Not configured'}</td>
                  <td className="px-3 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${c.status === 'ACTIVE' ? 'bg-emerald-400/10 text-emerald-300' : 'bg-slate-400/10 text-slate-400'}`}><span className={`h-1.5 w-1.5 rounded-full ${c.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-slate-500'}`} />{c.status === 'ACTIVE' ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-3 py-4 text-right text-sm font-medium tabular-nums text-slate-200">{number(c.totalStudents)}</td><td className="px-3 py-4 text-right text-sm font-medium tabular-nums text-slate-200">{number(c.totalMentors)}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
