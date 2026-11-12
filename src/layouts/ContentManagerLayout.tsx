import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Code2,
  UserCheck,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useContentManager } from '@/contexts/ContentManagerContext'

type NavItem = {
  label: string
  path: string
  icon: LucideIcon
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', path: '/content-manager', icon: LayoutDashboard, end: true },
  { label: 'Curriculum', path: '/content-manager/curriculum', icon: BookOpen },
  { label: 'Practice Questions', path: '/content-manager/practice-questions', icon: Trophy },
  { label: 'Learn Coding Questions', path: '/content-manager/learn-coding-questions', icon: Code2 },
  { label: 'My Profile', path: '/content-manager/profile', icon: UserCheck },
]

export const ContentManagerLayout: React.FC = () => {
  const { logout } = useAuth()
  const { profile } = useContentManager()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebar = (
    <aside className="flex h-full w-[264px] shrink-0 flex-col border-r border-white/[0.08] bg-[#080808] text-slate-300">
      <div className="flex h-[72px] items-center justify-between border-b border-white/[0.07] px-5">
        <Link to="/content-manager" className="flex min-w-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 100 120" className="h-8 w-7 shrink-0" fill="none" aria-hidden="true">
            <rect x="15" y="15" width="70" height="90" stroke="#ED2A2B" strokeWidth="11" />
            <polyline points="79.5 20.5 20.5 60 79.5 99.5" stroke="#ED2A2B" strokeWidth="11" strokeLinecap="square" />
          </svg>
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-extrabold tracking-tight text-white">KalviLearn</span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6266]">
              Content Studio
            </span>
          </span>
        </Link>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-800/70 bg-emerald-950/50 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-emerald-300">
          <CheckCircle2 className="h-2.5 w-2.5" />
          ACTIVE
        </span>
      </div>

      <nav aria-label="Content Manager navigation" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-[#681717] bg-[#1F0B0B] text-[#FF6266]'
                    : 'border-transparent text-slate-300 hover:bg-white/[0.05] hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-white/[0.07] p-3">
        <div className="rounded-xl border border-white/[0.10] bg-[#000000] p-3">
          <div className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Content Manager
          </div>
          <div className="truncate text-xs font-semibold text-white">{profile?.name || profile?.email}</div>
          <div className="truncate text-[11px] text-slate-400">{profile?.email}</div>
          <div className="mt-1.5 text-[10px] font-medium text-emerald-400">
            Standard Content Access
          </div>
        </div>
        <button
          type="button"
          onClick={() => void logout()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
        >
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
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/65"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 h-full shadow-2xl">{sidebar}</div>
          <button
            type="button"
            aria-label="Close"
            className="relative z-10 m-3 h-10 w-10 rounded-xl bg-black/60 text-white flex items-center justify-center"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-white/[0.08] bg-[#080808] px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-white"
          >
            <Menu className="h-5 w-5" />
            <span>Content Studio</span>
          </button>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
            ACTIVE
          </span>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#000000] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
