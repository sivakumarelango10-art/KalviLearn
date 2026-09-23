import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  LogOut,
  User,
  Users,
  Bell,
  Menu,
  ShieldCheck,
  GraduationCap,
  ExternalLink,
} from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface MentorNavbarProps {
  onToggleMobileSidebar?: () => void
}

export const MentorNavbar: React.FC<MentorNavbarProps> = ({ onToggleMobileSidebar }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mentorName = user?.name || (user?.email ? user.email.split('@')[0].replace(/\./g, ' ') : 'Faculty Mentor')
  const mentorEmail = user?.email || ''
  const initials = mentorName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'M'

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="h-16 w-full bg-white border-b border-neutral-200/90 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Brand Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <Link
          to="/mentor"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED2A2B] rounded-lg group"
        >
          <BrandLogo size="sm" orientation="horizontal" showWordmark={false} />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-900">
              Kalvi<span className="text-[#ED2A2B]">Learn</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#ED2A2B] border border-red-200">
              <ShieldCheck className="w-3 h-3" />
              Mentor
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Notifications & Mentor Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Link to Assigned Students Roster */}
        <Link
          to="/mentor/students"
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
          title="View Assigned Students Roster"
        >
          <Users className="w-3.5 h-3.5 text-neutral-500" />
          <span>Assigned Students</span>
        </Link>

        {/* Quick Switch to Student View */}
        <Link
          to="/dashboard"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 transition-all border border-neutral-200/80 shadow-2xs"
          title="Preview Student Learning Platform"
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#ED2A2B]" />
          <span>Student View</span>
          <ExternalLink className="w-3 h-3 text-neutral-400" />
        </Link>

        {/* Notifications Icon */}
        <button
          type="button"
          className="relative p-2 rounded-lg text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ED2A2B]" />
        </button>

        {/* Mentor User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            className={cn(
              'flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all interactive-btn',
              'text-neutral-800 hover:bg-neutral-100 border border-neutral-200/80 shadow-xs',
              dropdownOpen && 'bg-neutral-100 ring-2 ring-neutral-900/10'
            )}
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-neutral-900 to-neutral-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {initials}
            </div>
            <span className="font-semibold text-neutral-900">{mentorName}</span>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 text-neutral-500 transition-transform duration-200',
                dropdownOpen && 'rotate-180 text-neutral-800'
              )}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 z-50 animate-modal-pop text-xs">
              {/* Profile Card Header */}
              <div className="px-4 py-3 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-neutral-900 to-neutral-700 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-neutral-900 truncate">{mentorName}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{mentorEmail}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-[#ED2A2B] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      Authorized Mentor
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="py-1">
                <Link
                  to="/mentor/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors font-medium"
                >
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>Mentor Profile</span>
                </Link>

                <Link
                  to="/mentor/students"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors font-medium"
                >
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span>Assigned Students</span>
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors font-medium border-t border-neutral-100"
                >
                  <GraduationCap className="w-4 h-4 text-[#ED2A2B]" />
                  <span className="font-semibold text-neutral-900">Switch to Student View</span>
                </Link>
              </div>

              {/* Logout Action */}
              <div className="pt-1 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors font-medium text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
