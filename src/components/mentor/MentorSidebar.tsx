import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Send,
  BookOpen,
  Megaphone,
  UserCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MentorSidebarProps {
  className?: string
  onCloseMobile?: () => void
}

export const MentorSidebar: React.FC<MentorSidebarProps> = ({ className, onCloseMobile }) => {
  const location = useLocation()

  const navItems = [
    {
      label: 'Dashboard',
      path: '/mentor',
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      label: 'Students',
      path: '/mentor/students',
      icon: Users,
      badge: undefined,
    },
    {
      label: 'Submissions',
      path: '/mentor/submissions',
      icon: Send,
      badge: 'Live',
    },
    {
      label: 'Curriculum',
      path: '/mentor/curriculum',
      icon: BookOpen,
      badge: undefined,
    },
    {
      label: 'Announcements',
      path: '/mentor/announcements',
      icon: Megaphone,
      badge: undefined,
    },
    {
      label: 'Profile',
      path: '/mentor/profile',
      icon: UserCheck,
      badge: undefined,
    },
  ]

  const isNavActive = (path: string) => {
    if (path === '/mentor') {
      return location.pathname === '/mentor' || location.pathname === '/mentor/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside
      className={cn(
        'w-64 bg-white border-r border-neutral-200/90 flex flex-col justify-between h-full select-none shadow-xs',
        className
      )}
    >
      {/* Navigation Group */}
      <div className="p-4 space-y-6">
        <div className="px-3 py-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Mentor Workspace
          </p>
        </div>

        <nav className="space-y-1.5" aria-label="Mentor Navigation">
          {navItems.map((item) => {
            const active = isNavActive(item.path)
            const Icon = item.icon

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 group',
                  active
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      active ? 'text-[#ED2A2B]' : 'text-neutral-500 group-hover:text-neutral-900'
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full',
                      active
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Live'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse'
                        : 'bg-neutral-100 text-neutral-600'
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

      {/* Cohort Insight Widget */}
      <div className="p-4 border-t border-neutral-100">
        <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Assigned Cohort
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs font-bold text-neutral-900">
            Batch 2026 — Track A
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
            <UserCheck className="w-3 h-3 flex-shrink-0" />
            <span>All students on track</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
