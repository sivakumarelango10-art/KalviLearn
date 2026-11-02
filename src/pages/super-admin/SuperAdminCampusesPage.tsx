import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, ChevronDown, Filter, Plus, RefreshCw, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Campus } from '@/lib/types'

type CampusRow = {
  id: string; name: string; code: string; city: string | null; state: string | null;
  country: string | null; status: string; manager_id: string | null; created_at: string;
  studentCount: number; mentorCount: number; manager: { name: string | null; email: string } | null;
}

export const SuperAdminCampusesPage: React.FC = () => {
  const [rows,setRows] = useState<CampusRow[]>([])
  const [query,setQuery] = useState('')
  const [status,setStatus] = useState<'ALL'|'ACTIVE'|'INACTIVE'>('ALL')
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const [refreshing,setRefreshing] = useState(false)

  const load = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true)
    setError('')
    try {
      const {data: campusData,error: campusError} = await supabase.from('campuses').select('id,name,code,city,state,country,status,manager_id,created_at').order('name')
      if(campusError) throw campusError
      const ids=(campusData||[]).map(row=>row.id)
      const managerIds=Array.from(new Set((campusData||[]).map(row=>row.manager_id).filter(Boolean))) as string[]
      const [students,mentors,managers]=ids.length?await Promise.all([
        supabase.from('students').select('campus_id').in('campus_id',ids),
        supabase.from('mentors').select('campus_id').in('campus_id',ids),
        managerIds.length?supabase.from('users').select('id,name,email').in('id',managerIds):Promise.resolve({data:[],error:null}),
      ]):[{data:[],error:null},{data:[],error:null},{data:[],error:null}]
      if(students.error||mentors.error||managers.error) throw students.error||mentors.error||managers.error
      const sc=new Map<string,number>(),mc=new Map<string,number>(),mm=new Map((managers.data||[]).map(m=>[m.id,m]))
      for(const r of students.data||[]) if(r.campus_id) sc.set(r.campus_id,(sc.get(r.campus_id)||0)+1)
      for(const r of mentors.data||[]) if(r.campus_id) mc.set(r.campus_id,(mc.get(r.campus_id)||0)+1)
      setRows((campusData||[]).map(row=>({...row,studentCount:sc.get(row.id)||0,mentorCount:mc.get(row.id)||0,manager:row.manager_id?mm.get(row.manager_id)||null:null})))
    } catch(err) { setError(err instanceof Error?err.message:'Unable to load campuses.') }
    finally {setLoading(false);setRefreshing(false)}
  },[])

  useEffect(()=>{
    document.title='Campus Management — KalviLearn'
    void load()
    const channel=supabase.channel('super-admin-campus-list').on('postgres_changes',{event:'*',schema:'public',table:'campuses'},()=>void load(true)).subscribe()
    return ()=>{void supabase.removeChannel(channel)}
  },[load])

  const filtered=useMemo(()=>rows.filter(row=>{
    const q=query.trim().toLowerCase()
    const match=!q||[row.name,row.code,row.city,row.state,row.country].some(value=>value?.toLowerCase().includes(q))
    return match&&(status==='ALL'||row.status.toUpperCase()===status)
  }),[rows,query,status])

  return <div className="min-h-screen bg-[#090909] text-white flex">
    <aside className="hidden md:flex w-[228px] shrink-0 border-r border-[#242424] bg-[#151515] flex-col">
      <div className="h-14 border-b border-[#242424] px-4 flex items-center gap-3"><div className="h-7 w-7 border-[3px] border-[#ed2a2b] flex items-center justify-center text-[#ed2a2b] font-black">K</div><div className="leading-tight"><div className="font-extrabold text-xs">Kalvi<span className="text-[#ed2a2b]">Admin</span></div><div className="text-[9px] tracking-widest text-[#ed5b5b] font-bold">SUPER ADMIN</div></div></div>
      <nav className="flex-1 p-2 space-y-1">{[['Dashboard','/super-admin/dashboard'],['Campuses','/super-admin/campuses'],['Campus Managers','/super-admin/managers'],['Mentors','/super-admin/mentors'],['Students','/super-admin/students'],['Roles & Access','/super-admin/roles'],['Content','/super-admin/content'],['Audit Logs','/super-admin/audit']].map(([label,path])=><Link key={path} to={path} className={`block rounded-xl px-3 py-3 text-xs font-semibold ${label==='Campuses'?'bg-[#321b1b] border border-[#5b2929] text-[#ff6a6a]':'text-slate-300 hover:bg-[#222]'}`}>{label}</Link>)}</nav>
    </aside>
    <main className="flex-1 min-w-0 px-5 lg:px-10 py-7"><div className="max-w-[1145px] mx-auto space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#262626] pb-4"><div><div className="flex items-center gap-2"><Building2 size={21} className="text-blue-400"/><h1 className="text-xl font-extrabold">Campus Management</h1></div><p className="mt-1 text-xs text-slate-400">Authoritative registry of university and tech campuses, status controls, and manager bindings.</p></div><div className="flex gap-2"><button type="button" onClick={()=>void load(true)} disabled={refreshing} className="rounded-lg border border-[#303030] bg-[#171717] px-3 py-2 text-xs flex items-center gap-2"><RefreshCw size={13} className={refreshing?'animate-spin':''}/>Refresh</button><Link to="/super-admin/dashboard?createCampus=1" className="rounded-lg bg-[#ed2a2b] px-3 py-2 text-xs font-bold flex items-center gap-2"><Plus size={14}/>Create Campus</Link></div></header>
      <div className="rounded-xl border border-[#292929] bg-[#171717] p-3 flex flex-wrap items-center gap-4 justify-between"><label className="relative w-full md:max-w-[285px]"><Search size={14} className="absolute left-3 top-2.5 text-slate-500"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by campus name, code, or city..." className="w-full rounded-lg border border-[#323232] bg-[#090909] py-2 pl-9 pr-3 text-[11px] outline-none focus:border-red-500"/></label><div className="flex items-center gap-2 text-[11px] text-slate-400"><Filter size={13}/><span>Status:</span>{(['ALL','ACTIVE','INACTIVE'] as const).map(value=><button key={value} type="button" onClick={()=>setStatus(value)} className={`rounded-lg px-3 py-1.5 ${status===value?'bg-[#242424] border border-[#454545] text-white':'hover:bg-[#222]'}`}>{value}</button>)}</div></div>
      {error&&<div role="alert" className="rounded-xl border border-red-900 bg-red-950/40 p-3 text-xs text-red-300">{error}</div>}
      <div className="overflow-x-auto rounded-2xl border border-[#292929] bg-[#171717]"><table className="w-full min-w-[900px] text-left"><thead className="bg-[#101010]"><tr>{['CAMPUS NAME','CODE','LOCATION','MANAGER','ENROLLED STUDENTS','MENTORS','STATUS','ACTIONS'].map(h=><th key={h} className="px-3 py-3 text-[10px] font-bold tracking-wide text-slate-400">{h}</th>)}</tr></thead><tbody className="divide-y divide-[#292929]">{loading?<tr><td colSpan={8} className="py-10 text-center text-xs text-slate-500">Loading campuses…</td></tr>:filtered.length===0?<tr><td colSpan={8} className="py-10 text-center text-xs text-slate-500">No campuses found matching your criteria.</td></tr>:filtered.map(row=><tr key={row.id} className="hover:bg-[#202020]"><td className="px-3 py-3 text-xs font-semibold">{row.name}</td><td className="px-3 py-3 text-xs font-mono text-slate-300">{row.code}</td><td className="px-3 py-3 text-xs text-slate-400">{[row.city,row.state,row.country].filter(Boolean).join(', ')}</td><td className="px-3 py-3 text-xs text-slate-300">{row.manager?.name||row.manager?.email||'Unassigned'}</td><td className="px-3 py-3 text-xs tabular-nums">{row.studentCount}</td><td className="px-3 py-3 text-xs tabular-nums">{row.mentorCount}</td><td className="px-3 py-3"><span className={`rounded-full px-2 py-1 text-[9px] font-bold ${row.status.toUpperCase()==='ACTIVE'?'bg-emerald-950 text-emerald-400':'bg-slate-800 text-slate-400'}`}>{row.status.toUpperCase()}</span></td><td className="px-3 py-3 text-xs text-slate-500">—</td></tr>)}</tbody></table></div>
    </div></main>
  </div>
}
export default SuperAdminCampusesPage
