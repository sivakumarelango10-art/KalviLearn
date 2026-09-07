import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  LineChart,
  Trophy,
  Award,
  UserCheck,
  LogOut,
} from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface CampusManagerSidebarProps {
  className?: string
  onCloseMobile?: () => void
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/campus/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: 'Mentors',
    path: '/campus/mentors',
    icon: Users,
    badge: 'Faculty',
  },
  {
    label: 'Students',
    path: '/campus/students',
    icon: GraduationCap,
    badge: null,
  },
  {
    label: 'Analytics',
    path: '/campus/analytics',
    icon: LineChart,
    badge: 'Insights',
  },
  {
    label: 'Mentor Leaderboard',
    path: '/campus/mentor-leaderboard',
    icon: Trophy,
    badge: null,
  },
  {
    label: 'Student Leaderboard',
    path: '/campus/student-leaderboard',
    icon: Award,
    badge: null,
  },
  {
    label: 'Profile',
    path: '/campus/profile',
    icon: UserCheck,
    badge: null,
  },
]

export const CampusManagerSidebar: React.FC<CampusManagerSidebarProps> = ({
  className,
  onCloseMobile,
}) => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    if (path === '/campus/dashboard') {
      return location.pathname === '/campus/dashboard' || location.pathname === '/campus'
    }
    return location.pathname.startsWith(path)
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'CM'

  return (
    <aside
      className={cn(
        'w-64 bg-white border-r border-neutral-200 flex flex-col h-full select-none z-30',
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-neutral-100">
        <Link to="/campus/dashboard" className="flex items-center gap-2.5">
          <BrandLogo size="sm" orientation="horizontal" />
        </Link>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-[#ED2A2B] border border-red-200 uppercase tracking-wider">
          Manager
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path)
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={cn(
                'flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 interactive-tab',
                active
                  ? 'bg-neutral-900 text-white shadow-sm scale-[1.01]'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 hover:translate-x-1'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 transition-transform duration-200 flex-shrink-0',
                  active ? 'text-white scale-110' : 'text-neutral-500'
                )}
              />
              <span className="truncate">{item.label}</span>
              {active ? (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ED2A2B] shadow-sm animate-pulse-subtle flex-shrink-0" />
              ) : item.badge ? (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider bg-neutral-100 text-neutral-500 flex-shrink-0">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          )
        })}
      </div>

      {/* Footer User Info & Sign Out */}
      <div className="p-4 border-t border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-red-50 text-[#ED2A2B] font-bold text-xs flex items-center justify-center border border-red-100 flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-neutral-800 truncate">
              {user?.name || (user?.email ? user.email.split('@')[0] : 'Campus Manager')}
            </div>
            <div className="text-[10px] text-neutral-400 truncate">
              {user?.email || 'manager@kalvium.com'}
            </div>
          </div>
        </div>
        <button
          onClick={() => logout()}
          title="Sign Out"
          className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-md hover:bg-neutral-100 transition-colors flex-shrink-0"
          type="button"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  )
}
