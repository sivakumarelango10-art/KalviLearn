import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, Building2, UserCog, Users, GraduationCap,
  ShieldCheck, BookOpen, History, LogOut, Menu, X,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

type SuperAdminNavItem = { label: string; path: string; icon: LucideIcon; badge?: string; disabled?: boolean }

const NAV_ITEMS: SuperAdminNavItem[] = [
  { label: 'Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard, badge: 'LIVE' },
  { label: 'Campuses', path: '/super-admin/campuses', icon: Building2 },
  { label: 'Campus Managers', path: '/super-admin/managers', icon: UserCog },
  { label: 'Mentors', path: '/super-admin/mentors', icon: Users },
  { label: 'Students', path: '/super-admin/students', icon: GraduationCap },
  { label: 'Roles & Access', path: '/super-admin/roles', icon: ShieldCheck, badge: 'RBAC' },
  { label: 'Content', path: '/super-admin/content', icon: BookOpen, badge: 'CURRICULUM', disabled: true },
  { label: 'Audit Logs', path: '/super-admin/audit', icon: History, badge: 'APPEND-ONLY' },
]

export const SuperAdminLayout: React.FC = () => {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebar = (
    <aside className="flex h-full w-[176px] shrink-0 flex-col border-r border-white/[0.08] bg-[#080808] text-slate-300">
      <div className="flex h-[48px] items-center justify-between border-b border-white/[0.07] px-2">
        <Link to="/super-admin/dashboard" className="flex min-w-0 items-center gap-2" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 100 120" className="h-6 w-5 shrink-0" fill="none" aria-hidden="true">
            <rect x="15" y="15" width="70" height="90" stroke="#ED2A2B" strokeWidth="11" />
            <polyline points="79.5 20.5 20.5 60 79.5 99.5" stroke="#ED2A2B" strokeWidth="11" strokeLinecap="square" />
          </svg>
          <span className="min-w-0 leading-tight">
            <span className="block text-[11px] font-extrabold tracking-tight text-white">KalviAdmin</span>
            <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#ED2A2B]">Super Admin</span>
          </span>
        </Link>
        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-red-400">ROOT</span>
      </div>

      <nav aria-label="Super Admin navigation" className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          return item.disabled ? (
            <div key={item.path} aria-disabled="true" title="Content management is not available yet"
              className="flex cursor-not-allowed items-center gap-2 rounded-lg px-2 py-2.5 text-[11px] font-medium text-slate-500 opacity-70">
              <Icon className="h-3 w-3 shrink-0" /><span className="flex-1">{item.label}</span>
              {'badge' in item && <span className="rounded bg-white/[0.06] px-1 py-0.5 text-[8px] font-bold tracking-wide text-slate-500">{item.badge}</span>}
            </div>
          ) : (
            <NavLink key={item.path} to={item.path} end={item.path === '/super-admin/dashboard'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `flex items-center gap-2 rounded-lg border px-2 py-2.5 text-[11px] font-medium transition-colors ${isActive ? 'border-[#ED2A2B]/35 bg-[#ED2A2B]/[0.10] text-[#ff6266]' : 'border-transparent text-slate-300 hover:bg-white/[0.05] hover:text-white'}`}>
              <Icon className="h-3 w-3 shrink-0" />
              <span className="min-w-0 flex-1">{item.label}</span>
              {'badge' in item && <span className="rounded bg-white/[0.07] px-1 py-0.5 text-[8px] font-bold tracking-wide text-slate-400">{item.badge}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-white/[0.07] p-2">
        <div className="rounded-lg border border-white/[0.10] bg-[#000000] p-2">
          <div className="mb-1.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Sole Administrator
          </div>
          <div className="truncate text-[10px] font-semibold text-white">{user?.email || 'Administrator account'}</div>
          <div className="mt-0.5 text-[10px] text-slate-400">Role: <span className="font-bold text-[#ff6266]">{user?.role || 'SUPERADMIN'}</span></div>
        </div>
        <button type="button" onClick={() => void logout()}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-2 py-1.5 text-[11px] text-slate-400 transition hover:bg-white/[0.05] hover:text-white">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#000000] font-sans text-slate-100">
      <div className="hidden h-full shrink-0 lg:flex">{sidebar}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button type="button" aria-label="Close navigation" className="absolute inset-0 bg-black/65" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full shadow-2xl">{sidebar}</div>
          <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 z-20 rounded-lg bg-[#080808] p-2 text-slate-300"><X className="h-5 w-5" /></button>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center border-b border-white/[0.07] bg-[#050505] px-4 lg:hidden">
          <button type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-300 hover:bg-white/[0.06]"><Menu className="h-5 w-5" /></button>
          <span className="ml-3 text-sm font-semibold text-white">KalviAdmin <span className="text-[#ED2A2B]">/ Super Admin</span></span>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto bg-[#000000]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
