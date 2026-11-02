import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, ArrowRight, BookOpen, Building2, GraduationCap, Layers3,
  Plus, RefreshCw, ShieldCheck, Users, UserRoundCog, X,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

type Counts = {
  campuses: number; activeCampuses: number; managers: number; mentors: number;
  students: number; activeStudents: number; totalAccounts: number;
}
type Campus = {
  id: string; name: string; code: string; city: string | null; state: string | null;
  country: string | null; status: string; managerId: string | null; createdAt: string;
  manager?: { name: string; email: string } | null;
  studentCount: number; mentorCount: number;
}
type ManagerOption = { id: string; name: string | null; email: string }

const initialCounts: Counts = { campuses: 0, activeCampuses: 0, managers: 0, mentors: 0, students: 0, activeStudents: 0, totalAccounts: 0 }
const number = (value: number) => new Intl.NumberFormat().format(value)

export const SuperAdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth()
  const [counts, setCounts] = useState<Counts>(initialCounts)
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [auditAvailable, setAuditAvailable] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState('')
  const [managers, setManagers] = useState<ManagerOption[]>([])
  const [form, setForm] = useState({ name: '', code: '', city: '', state: '', country: 'India', managerId: '' })

  const load = useCallback(async (refresh = false) => {
    if (refresh) setRefreshing(true); else setLoading(true)
    setError('')
    try {
      const [campusRes, managerRes, mentorRes, studentRes, usersRes, auditRes] = await Promise.all([
        supabase.from('campuses').select('id, name, code, city, state, country, status, manager_id, created_at').order('name'),
        supabase.from('users').select('id, name, email').eq('role', 'CAMPUS_MANAGER').eq('status', 'ACTIVE').order('name'),
        supabase.from('mentors').select('id', { count: 'exact', head: true }),
        supabase.from('students').select('id, status', { count: 'exact' }),
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('admin_audit_logs').select('id', { count: 'exact', head: true }).limit(1),
      ])
      const firstError = campusRes.error || managerRes.error || mentorRes.error || studentRes.error || usersRes.error
      if (firstError) throw firstError
      const managersData = managerRes.data || []
      setManagers(managersData as ManagerOption[])
      const campusRows = campusRes.data || []
      const ids = campusRows.map(row => row.id)
      const [studentsByCampus, mentorsByCampus] = ids.length ? await Promise.all([
        supabase.from('students').select('campus_id').in('campus_id', ids),
        supabase.from('mentors').select('campus_id').in('campus_id', ids),
      ]) : [{ data: [], error: null }, { data: [], error: null }]
      if (studentsByCampus.error || mentorsByCampus.error) throw studentsByCampus.error || mentorsByCampus.error
      const studentCounts = new Map<string, number>(), mentorCounts = new Map<string, number>()
      for (const row of studentsByCampus.data || []) if (row.campus_id) studentCounts.set(row.campus_id, (studentCounts.get(row.campus_id) || 0) + 1)
      for (const row of mentorsByCampus.data || []) if (row.campus_id) mentorCounts.set(row.campus_id, (mentorCounts.get(row.campus_id) || 0) + 1)
      const managerMap = new Map(managersData.map(row => [row.id, row]))
      const campusData: Campus[] = campusRows.map(row => ({
        id: row.id, name: row.name, code: row.code, city: row.city, state: row.state,
        country: row.country, status: row.status, managerId: row.manager_id, createdAt: row.created_at,
        manager: row.manager_id ? (managerMap.get(row.manager_id) as ManagerOption | undefined) || null : null,
        studentCount: studentCounts.get(row.id) || 0, mentorCount: mentorCounts.get(row.id) || 0,
      }))
      const studentRows = studentRes.data || []
      const activeCampusCount = campusData.filter(row => row.status?.toUpperCase() === 'ACTIVE').length
      const activeStudentCount = studentRows.filter(row => row.status?.toUpperCase() === 'ACTIVE').length
      const managerCount = managersData.length
      const studentCount = studentRes.count ?? studentRows.length
      setCampuses(campusData)
      setCounts({
        campuses: campusRes.count ?? campusData.length,
        activeCampuses: activeCampusCount,
        managers: managerCount,
        mentors: mentorRes.count || 0,
        students: studentCount,
        activeStudents: activeStudentCount,
        totalAccounts: usersRes.count || 0,
      })
      setAuditAvailable(!auditRes.error)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load platform data. Check database access and retry.')
    } finally {
      setLoading(false); setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    document.title = 'Platform Command Center — KalviLearn'
    void load()
    const channel = supabase.channel('super-admin-command-center')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'campuses' }, () => void load(true))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => void load(true))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => void load(true))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mentors' }, () => void load(true))
      .subscribe()
    return () => { void supabase.removeChannel(channel) }
  }, [load])

  const openCreate = async () => {
    setFormError('')
    setForm({ name: '', code: '', city: '', state: '', country: 'India', managerId: '' })
    setShowCreate(true)
  }

  const createCampus = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError('')
    const name = form.name.trim(), code = form.code.trim().toUpperCase()
    if (!name || !code) { setFormError('Campus name and campus code are required.'); return }
    if (!/^[A-Z0-9][A-Z0-9_-]{1,49}$/.test(code)) { setFormError('Use 2–50 letters, numbers, hyphens, or underscores for the campus code.'); return }
    setCreating(true)
    try {
      const { error: insertError } = await supabase.from('campuses').insert({
        name, code, city: form.city.trim() || null, state: form.state.trim() || null,
        country: form.country.trim() || 'India', status: 'ACTIVE', manager_id: form.managerId || null,
      })
      if (insertError) throw insertError
      setShowCreate(false)
      await load(true)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Campus could not be created.')
    } finally { setCreating(false) }
  }

  const tiles = useMemo(() => [
    { label: 'CAMPUSES', value: counts.campuses, meta: `${counts.activeCampuses} Active`, icon: Building2, tone: 'blue' },
    { label: 'CAMPUS MANAGERS', value: counts.managers, meta: `${counts.managers} Active`, icon: UserRoundCog, tone: 'purple' },
    { label: 'MENTORS', value: counts.mentors, meta: `${counts.mentors} Registered`, icon: Users, tone: 'amber' },
    { label: 'STUDENTS', value: counts.students, meta: `${counts.activeStudents} Active`, icon: GraduationCap, tone: 'green' },
  ], [counts])

  const nav = [
    ['Dashboard', '/super-admin/dashboard', Activity],
    ['Campuses', '/super-admin/campuses', Building2],
    ['Campus Managers', '/super-admin/managers', UserRoundCog],
    ['Mentors', '/super-admin/mentors', Users],
    ['Students', '/super-admin/students', GraduationCap],
    ['Roles & Access', '/super-admin/roles', ShieldCheck],
    ['Content', '/super-admin/content', BookOpen],
    ['Audit Logs', '/super-admin/audit', Layers3],
  ] as const

  return (
    <div className="min-h-screen bg-[#090909] text-white flex">
      <aside className="w-[228px] shrink-0 border-r border-[#242424] bg-[#151515] flex flex-col min-h-screen">
        <div className="h-14 border-b border-[#242424] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 border-[3px] border-[#ed2a2b] flex items-center justify-center text-[#ed2a2b] font-black">K</div>
            <div className="leading-tight"><div className="font-extrabold text-xs">Kalvi<span className="text-[#ed2a2b]">Admin</span></div><div className="text-[9px] tracking-widest text-[#ed5b5b] font-bold">SUPER ADMIN</div></div>
          </div>
          <span className="rounded-full border border-[#6d2020] bg-[#351111] px-2 py-1 text-[9px] text-red-300">ROOT</span>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {nav.map(([label, path, Icon], index) => (
            <Link key={path} to={path} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold ${index === 0 ? 'bg-[#321b1b] border border-[#5b2929] text-[#ff6a6a]' : 'text-slate-300 hover:bg-[#222]'}`}>
              <Icon size={15} /><span>{label}</span>
              {index === 0 && <span className="ml-auto text-[9px] rounded bg-[#622525] px-1.5 py-1">LIVE</span>}
            </Link>
          ))}
        </nav>
        <div className="border-t border-[#242424] p-3">
          <div className="rounded-xl border border-[#303030] bg-[#0b0b0b] p-3 mb-2">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-wide text-slate-400"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />Sole administrator</div>
            <div className="mt-2 text-[11px] font-bold truncate">{user?.email}</div>
            <div className="text-[10px] text-slate-500">Role: <span className="text-red-400">SUPERADMIN</span></div>
          </div>
          <button type="button" onClick={() => void logout()} className="w-full text-left px-3 py-2 text-xs text-slate-400 hover:text-white">↪ Sign Out</button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-6 lg:px-10 py-7">
        <div className="max-w-[1145px] mx-auto space-y-5">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#262626] pb-4">
            <div><div className="flex items-center gap-2"><h1 className="text-xl font-extrabold tracking-tight">Platform Command Center</h1><span className="rounded border border-red-800 bg-[#321010] px-2 py-1 text-[9px] font-bold text-red-400">SUPER ADMIN</span></div><p className="mt-1 text-xs text-slate-400">Authoritative platform-wide telemetry, multi-campus governance, and audit trails.</p></div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => void load(true)} disabled={refreshing} className="rounded-lg border border-[#303030] bg-[#171717] px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#222] disabled:opacity-50"><RefreshCw size={13} className={refreshing ? 'animate-spin' : ''}/> Refresh</button>
              <button type="button" onClick={() => void openCreate()} className="rounded-lg bg-[#ed2a2b] hover:bg-red-600 px-3 py-2 text-xs font-bold flex items-center gap-2"><Plus size={14}/> New Campus</button>
            </div>
          </header>

          {error && <div role="alert" className="rounded-xl border border-red-900 bg-red-950/40 p-3 text-xs text-red-300">{error}</div>}

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {tiles.map(({ label, value, meta, icon: Icon, tone }) => (
              <div key={label} className="rounded-2xl border border-[#292929] bg-[#171717] p-4">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-wide text-slate-400"><span>{label}</span><span className="rounded-lg bg-[#222] p-2 text-slate-200"><Icon size={16}/></span></div>
                <div className="mt-3 text-3xl font-extrabold tabular-nums">{loading ? '—' : number(value)}</div>
                <div className="mt-1 text-[10px] text-slate-400"><span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"/> {meta}</div>
                <div className={`mt-3 border-t border-[#292929] pt-2 text-[10px] font-semibold ${tone === 'blue' ? 'text-blue-400' : tone === 'purple' ? 'text-purple-400' : tone === 'amber' ? 'text-amber-400' : 'text-emerald-400'}`}>{label === 'CAMPUSES' ? 'Manage campuses →' : label === 'CAMPUS MANAGERS' ? 'Campus staff' : label === 'MENTORS' ? 'Faculty guides' : 'Learners'}</div>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-[#292929] bg-[#171717] p-4">
            <div className="flex items-center justify-between mb-3"><h2 className="text-xs font-extrabold tracking-wide">PLATFORM ROLE DISTRIBUTION</h2><Link to="/super-admin/roles" className="text-[10px] text-slate-400 hover:text-white">RBAC Directory →</Link></div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                ['SUPER ADMIN', 1, 'Sole Authorized', 'text-red-400'],
                ['CAMPUS MANAGERS', counts.managers, 'Campus Staff', 'text-purple-400'],
                ['MENTORS', counts.mentors, 'Faculty Guides', 'text-amber-400'],
                ['STUDENTS', counts.students, 'Learners', 'text-emerald-400'],
                ['TOTAL ACCOUNTS', counts.totalAccounts, 'Platform-wide', 'text-white'],
              ].map(([label, value, note, tone]) => <div key={String(label)} className="rounded-xl border border-[#292929] bg-[#0b0b0b] p-3"><p className="text-[9px] text-slate-400 font-bold">{label}</p><p className={`mt-1 text-xl font-extrabold ${tone}`}>{loading ? '—' : number(Number(value))}</p><p className="text-[9px] text-slate-500">{note}</p></div>)}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#292929] bg-[#171717] p-4 min-h-[145px]">
              <div className="flex justify-between items-center border-b border-[#292929] pb-3"><h2 className="text-xs font-extrabold flex items-center gap-2"><Building2 size={14} className="text-blue-400"/> CAMPUSES OVERVIEW</h2><Link to="/super-admin/campuses" className="text-[10px] text-blue-400">View All →</Link></div>
              {loading ? <p className="text-xs text-slate-500 text-center py-7">Loading campuses…</p> : campuses.length === 0 ? <p className="text-xs text-slate-500 text-center py-7">No campuses registered.</p> : <div className="divide-y divide-[#292929]">{campuses.slice(0,4).map(c => <Link key={c.id} to="/super-admin/campuses" className="flex justify-between gap-3 py-3 text-xs hover:bg-[#202020]"><span className="font-semibold">{c.name}<span className="block text-[10px] text-slate-500">{c.code} · {[c.city,c.state].filter(Boolean).join(', ') || c.country}</span></span><span className="text-[10px] text-slate-400">{c.studentCount} students · {c.mentorCount} mentors</span></Link>)}</div>}
            </div>
            <div className="rounded-2xl border border-[#292929] bg-[#171717] p-4 min-h-[145px]">
              <div className="flex justify-between items-center border-b border-[#292929] pb-3"><h2 className="text-xs font-extrabold flex items-center gap-2"><Activity size={14} className="text-red-400"/> RECENT AUDIT TRAIL</h2><Link to="/super-admin/audit" className="text-[10px] text-red-400">Full Audit Logs →</Link></div>
              <p className="text-xs text-slate-500 text-center py-7">{auditAvailable ? 'Audit log access is available; open the audit log page for details.' : 'Audit log table is not available in this database yet.'}</p>
            </div>
          </section>
        </div>
      </main>

      {showCreate && <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
        <form onSubmit={createCampus} className="w-full max-w-lg rounded-2xl border border-[#363636] bg-[#171717] p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4"><div><h2 className="font-bold">Create Campus</h2><p className="text-[11px] text-slate-400">Add a new institution to the campus registry.</p></div><button type="button" onClick={() => setShowCreate(false)} aria-label="Close" className="text-slate-400 hover:text-white"><X/></button></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ['Campus name','name'],['Campus code','code'],['City','city'],['State','state'],['Country','country'],
            ].map(([label,key]) => <label key={key} className="text-[11px] text-slate-300 space-y-1">{label}<input required={key === 'name' || key === 'code'} value={form[key as keyof typeof form]} onChange={e => setForm(current => ({...current,[key]:key === 'code' ? e.target.value.toUpperCase() : e.target.value}))} className="w-full rounded-lg border border-[#3a3a3a] bg-[#090909] px-3 py-2 text-sm text-white outline-none focus:border-red-500"/></label>)}
            <label className="text-[11px] text-slate-300 space-y-1">Campus manager (optional)<select value={form.managerId} onChange={e => setForm(current => ({...current,managerId:e.target.value}))} className="w-full rounded-lg border border-[#3a3a3a] bg-[#090909] px-3 py-2 text-sm"><option value="">Unassigned</option>{managers.map(m => <option key={m.id} value={m.id}>{m.name || m.email} · {m.email}</option>)}</select></label>
          </div>
          {formError && <p role="alert" className="mt-3 text-xs text-red-300">{formError}</p>}
          <div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setShowCreate(false)} className="rounded-lg border border-[#3a3a3a] px-4 py-2 text-xs">Cancel</button><button type="submit" disabled={creating} className="rounded-lg bg-[#ed2a2b] px-4 py-2 text-xs font-bold disabled:opacity-50">{creating ? 'Creating…' : 'Create Campus'}</button></div>
        </form>
      </div>}
    </div>
  )
}

export default SuperAdminDashboardPage
