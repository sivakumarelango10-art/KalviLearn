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
  Sparkles,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { BrandLogo } from '@/components/common/BrandLogo'

interface CampusManagerNavbarProps {
  onToggleMobileSidebar: () => void
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

  const managerName = user?.name || 'Campus Manager'
  const managerEmail = user?.email || 'manager@kalvium.com'

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/90 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile Toggle + Logo + Campus Title */}
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/campus/dashboard" className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div className="hidden sm:flex flex-col border-l border-neutral-200 pl-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Campus Manager
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-[#ED2A2B]/10 text-[#ED2A2B] rounded-md">
                    Admin
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500 font-medium">
                  Kalvium Community HQ
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Campus Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200/80 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-neutral-700">
              Campus Live Telemetry
            </span>
            <span className="text-[11px] text-neutral-400 font-mono">
              • 100% Synced
            </span>
          </div>

          {/* Right: Quick Switcher & User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Switchers to Mentor & Student views */}
            <div className="hidden sm:flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200/60 text-xs font-semibold">
              <Link
                to="/mentor/dashboard"
                className="flex items-center gap-1 px-2.5 py-1 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-white transition-all shadow-2xs"
                title="Switch to Mentor Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                <span>Mentor View</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-1 px-2.5 py-1 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-white transition-all shadow-2xs"
                title="Switch to Student Arena"
              >
                <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
                <span>Student View</span>
              </Link>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl hover:bg-neutral-100 border border-transparent hover:border-neutral-200/80 transition-all text-left group"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                  {managerName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs font-bold text-neutral-900 leading-tight">
                    {managerName}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">
                    Campus Manager
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-transform" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-neutral-200/80 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900 leading-tight">
                      {managerName}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5 font-mono">
                      {managerEmail}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ED2A2B]/10 text-[#ED2A2B]">
                      <Sparkles className="w-3 h-3" />
                      <span>Campus Administrator</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/campus/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      <User className="w-4 h-4 text-neutral-500" />
                      <span>Manager Profile</span>
                    </Link>
                    <Link
                      to="/campus/mentors"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      <Building2 className="w-4 h-4 text-neutral-500" />
                      <span>Manage Faculty Mentors</span>
                    </Link>
                  </div>

                  <div className="border-t border-neutral-100 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
