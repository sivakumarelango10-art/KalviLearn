import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Menu,
  Building2,
  ChevronDown,
  LogOut,
  User,
  ShieldCheck,
  GraduationCap,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { BrandLogo } from '@/components/common/BrandLogo'
import { cn } from '@/lib/utils'

interface CampusManagerNavbarProps {
  onToggleMobileSidebar?: () => void
}

export const CampusManagerNavbar: React.FC<CampusManagerNavbarProps> = ({
  onToggleMobileSidebar,
}) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const managerName = user?.name || (user?.email ? user.email.split('@')[0].replace(/\./g, ' ') : 'Campus Manager')
  const managerEmail = user?.email || 'manager@kalvium.com'
  const initials = managerName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'CM'

  return (
    <header className="h-16 w-full bg-white border-b border-neutral-200/90 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs select-none">
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
          to="/campus/dashboard"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED2A2B] rounded-lg group"
        >
          <BrandLogo size="sm" orientation="horizontal" showWordmark={false} />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-900">
              Kalvi<span className="text-[#ED2A2B]">Learn</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#ED2A2B] border border-red-200">
              <Building2 className="w-3 h-3" />
              Campus Manager
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Quick Switchers & User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Switch to Mentor View */}
        <Link
          to="/mentor"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
          title="Preview Mentor Cockpit"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
          <span>Mentor View</span>
          <ExternalLink className="w-3 h-3 text-neutral-400" />
        </Link>

        {/* Quick Switch to Student View */}
        <Link
          to="/dashboard"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
          title="Preview Student Learning Platform"
        >
          <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
          <span>Student View</span>
          <ExternalLink className="w-3 h-3 text-neutral-400" />
        </Link>

        {/* Manager User Dropdown */}
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
            <span className="font-semibold text-neutral-900 hidden sm:inline">{managerName}</span>
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
                  <div className="min-w-0">
                    <p className="font-bold text-neutral-900 truncate">{managerName}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{managerEmail}</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#ED2A2B] bg-red-50 px-1.5 py-0.5 rounded-md border border-red-100">
                      <ShieldCheck className="w-2.5 h-2.5" /> Campus Manager
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <Link
                  to="/campus/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                >
                  <User className="w-4 h-4 text-neutral-500" />
                  <span>Manager Profile</span>
                </Link>
                <Link
                  to="/campus/mentors"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-neutral-500" />
                  <span>Mentors Directory</span>
                </Link>
              </div>

              <div className="border-t border-neutral-100 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
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
