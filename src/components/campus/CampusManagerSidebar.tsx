import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  LineChart,
  Trophy,
  Award,
  UserCheck,
  Building,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CampusManagerSidebarProps {
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
  onCloseMobile,
}) => {
  return (
    <aside className="w-64 bg-white border-r border-neutral-200/90 flex flex-col justify-between h-full select-none">
      {/* Navigation Section */}
      <div className="p-4 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Campus Operations
          </p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group',
                      isActive
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            'w-4 h-4 transition-colors',
                            isActive ? 'text-[#ED2A2B]' : 'text-neutral-500 group-hover:text-neutral-900'
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            'text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider',
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200 group-hover:text-neutral-700'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Campus Overview Quick Card */}
        <div className="p-3.5 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl text-white space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-200">
              <Building className="w-4 h-4 text-[#ED2A2B]" />
              <span>Campus Health</span>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full">
              98% Active
            </span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            All 6 mentor cohorts operating within target guidance capacity.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-neutral-200/80">
        <div className="flex items-center gap-2 text-[11px] text-neutral-500">
          <Sparkles className="w-3.5 h-3.5 text-[#ED2A2B]" />
          <span className="font-semibold text-neutral-700">Kalvi Campus HQ</span>
          <span>• v2.0</span>
        </div>
      </div>
    </aside>
  )
}
