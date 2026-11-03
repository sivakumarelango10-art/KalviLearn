import React, { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, UserCog, Users, GraduationCap,
  ShieldCheck, BookOpen, History, LogOut, Menu, X,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard, badge: 'LIVE' },
  { label: 'Campuses', path: '/super-admin/campuses', icon: Building2 },
  { label: 'Campus Managers', path: '/super-admin/managers', icon: UserCog },
  { label: 'Mentors', path: '/super-admin/mentors', icon: Users },
  { label: 'Students', path: '/super-admin/students', icon: GraduationCap },
  { label: 'Roles & Access', path: '/super-admin/roles', icon: ShieldCheck, badge: 'RBAC' },
  { label: 'Content', path: '/super-admin/content', icon: BookOpen, badge: 'CURRICULUM', disabled: true },
  { label: 'Audit Logs', path: '/super-admin/audit', icon: History, badge: 'APPEND-ONLY' },
] as const

const getInitials = (name?: string | null, email?: string | null) => {
  const source = (name || email?.split('@')[0] || 'SA').trim()
  return source.split(/[\s._-]+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'SA'
}

export const SuperAdminLayout: React.FC = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebar = (
    <aside className="flex h-full w-[264px] shrink-0 flex-col border-r border-white/[0.08] bg-[#171717] text-slate-300">
      <div className="flex h-[72px] items-center justify-between border-b border-white/[0.07] px-5">
        <Link to="/super-admin/dashboard" className="flex min-w-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 100 120" className="h-8 w-7 shrink-0" fill="none" aria-hidden="true">
            <rect x="15" y="15" width="70" height="90" stroke="#ED2A2B" strokeWidth="11" />
            <polyline points="79.5 20.5 20.5 60 79.5 99.5" stroke="#ED2A2B" strokeWidth="11" strokeLinecap="square" />
          </svg>
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-extrabold tracking-tight text-white">KalviAdmin</span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#ED2A2B]">Super Admin</span>
          </span>
        </Link>
        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-bold tracking-wider text-red-400">ROOT</span>
      </div>

      <nav aria-label="Super Admin navigation" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          const active = location.pathname === item.path || (item.path !== '/super-admin/dashboard' && location.pathname.startsWith(item.path + '/'))
          return item.disabled ? (
            <div key={item.path} aria-disabled="true" title="Content management is not available yet"
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 opacity-70">
              <Icon className="h-4 w-4 shrink-0" /><span className="flex-1">{item.label}</span>
              {'badge' in item && <span className="rounded bg-white/[0.06] px-1.5 py-1 text-[9px] font-bold tracking-wide text-slate-500">{item.badge}</span>}
            </div>
          ) : (
            <NavLink key={item.path} to={item.path} end={item.path === '/super-admin/dashboard'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${isActive ? 'border-[#ED2A2B]/35 bg-[#ED2A2B]/[0.10] text-[#ff6266]' : 'border-transparent text-slate-300 hover:bg-white/[0.05] hover:text-white'}`}>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1">{item.label}</span>
              {'badge' in item && <span className="rounded bg-white/[0.07] px-1.5 py-1 text-[9px] font-bold tracking-wide text-slate-400">{item.badge}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-white/[0.07] p-3">
        <div className="rounded-xl border border-white/[0.10] bg-[#101010] p-3">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Sole Administrator
          </div>
          <div className="truncate text-xs font-semibold text-white">{user?.email || 'Administrator account'}</div>
          <div className="mt-1 text-[11px] text-slate-400">Role: <span className="font-bold text-[#ff6266]">{user?.role || 'SUPERADMIN'}</span></div>
        </div>
        <button type="button" onClick={() => void logout()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#090b10] font-sans text-slate-100">
      <div className="hidden h-full shrink-0 lg:flex">{sidebar}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button type="button" aria-label="Close navigation" className="absolute inset-0 bg-black/65" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full shadow-2xl">{sidebar}</div>
          <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 z-20 rounded-lg bg-[#171717] p-2 text-slate-300"><X className="h-5 w-5" /></button>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center border-b border-white/[0.07] bg-[#0d0f14] px-4 lg:hidden">
          <button type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-300 hover:bg-white/[0.06]"><Menu className="h-5 w-5" /></button>
          <span className="ml-3 text-sm font-semibold text-white">KalviAdmin <span className="text-[#ED2A2B]">/ Super Admin</span></span>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto bg-[#090b10]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
