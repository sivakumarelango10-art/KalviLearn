import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  UserCog,
  Users,
  GraduationCap,
  ShieldCheck,
  History,
  LogOut,
  ShieldAlert,
  BookOpen,
} from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface SuperAdminSidebarProps {
  className?: string
  onCloseMobile?: () => void
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/super-admin/dashboard',
    icon: LayoutDashboard,
    badge: 'Live',
  },
  {
    label: 'Campuses',
    path: '/super-admin/campuses',
    icon: Building2,
    badge: null,
  },
  {
    label: 'Campus Managers',
    path: '/super-admin/managers',
    icon: UserCog,
    badge: null,
  },
  {
    label: 'Mentors',
    path: '/super-admin/mentors',
    icon: Users,
    badge: null,
  },
  {
    label: 'Students',
    path: '/super-admin/students',
    icon: GraduationCap,
    badge: null,
  },
  {
    label: 'Roles & Access',
    path: '/super-admin/roles',
    icon: ShieldCheck,
    badge: 'RBAC',
  },
  {
    label: 'Content',
    path: '/super-admin/content',
    icon: BookOpen,
    badge: 'Curriculum',
  },
  {
    label: 'Audit Logs',
    path: '/super-admin/audit',
    icon: History,
    badge: 'Append-Only',
  },
]

export const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({
  className,
  onCloseMobile,
}) => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    if (path === '/super-admin/dashboard') {
      return (
        location.pathname === '/super-admin/dashboard' ||
        location.pathname === '/super-admin' ||
        location.pathname === '/super-admin/'
      )
    }
    if (path === '/super-admin/content') {
      return (
        location.pathname.startsWith('/super-admin/content') ||
        location.pathname.startsWith('/super-admin/questions')
      )
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside
      className={cn(
        'w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between select-none text-white',
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col">
        <div className="h-16 px-5 border-b border-neutral-800/80 flex items-center justify-between">
          <Link
            to="/super-admin/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          >
            <BrandLogo size="sm" showWordmark={false} />
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-white leading-tight">
                Kalvi<span className="text-[#ED2A2B]">Admin</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-red-400">
                Super Admin
              </span>
            </div>
          </Link>
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-800/60 uppercase">
            <ShieldAlert className="w-3 h-3 text-red-400" />
            Root
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path)
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group',
                  active
                    ? 'bg-red-500/10 text-red-400 font-semibold border border-red-500/20 shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors flex-shrink-0',
                      active ? 'text-red-400' : 'text-neutral-400 group-hover:text-neutral-200'
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      'text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider',
                      active
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-neutral-800 text-neutral-400'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Sole Administrator Footer Card */}
      <div className="p-3 border-t border-neutral-800/80 space-y-2">
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Sole Administrator
            </span>
          </div>
          <div className="text-xs font-semibold text-white truncate font-mono">
            {user?.email || 'sgjitbros@gmail.com'}
          </div>
          <div className="text-[11px] text-neutral-400 truncate mt-0.5">
            Role: <span className="text-red-400 font-semibold">{user?.role || 'SUPERADMIN'}</span>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-red-400 hover:bg-neutral-800/60 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
