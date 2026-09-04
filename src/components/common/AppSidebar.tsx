import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  RotateCcw,
  User,
  LogOut,
} from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { cn } from '@/lib/utils'

interface AppSidebarProps {
  className?: string
  onCloseMobile?: () => void
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ className, onCloseMobile }) => {
  const location = useLocation()

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Learn',
      path: '/learn',
      icon: BookOpen,
    },
    {
      label: 'Practice',
      path: '/practice',
      icon: Code2,
    },
    {
      label: 'Revise',
      path: '/revise',
      icon: RotateCcw,
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: User,
    },
  ]

  const isActive = (path: string) => {
    if (path === '/practice') {
      return location.pathname.startsWith('/practice')
    }
    return location.pathname === path
  }

  return (
    <aside
      className={cn(
        'w-64 bg-white border-r border-neutral-200 flex flex-col h-full select-none z-30',
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center border-b border-neutral-100">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <BrandLogo size="sm" orientation="horizontal" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path)
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={cn(
                'flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
              )}
            >
              <Icon className={cn('w-4 h-4', active ? 'text-white' : 'text-neutral-500')} />
              <span>{item.label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ED2A2B]" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-50 text-[#ED2A2B] font-semibold text-xs flex items-center justify-center border border-red-100">
            KL
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-800">Kalvi Scholar</div>
            <div className="text-[10px] text-neutral-400">Student Portal</div>
          </div>
        </div>
        <Link
          to="/login"
          title="Sign Out"
          className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-md hover:bg-neutral-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  )
}
