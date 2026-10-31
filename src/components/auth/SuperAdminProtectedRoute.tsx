import React from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { BrandLogo } from '@/components/common/BrandLogo'
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react'

export const SUPER_ADMIN_AUTHORIZED_EMAIL = 'sgjitbros@gmail.com'
export const SUPER_ADMIN_ROLE_NAME = 'SUPERADMIN'

/**
 * SuperAdminProtectedRoute
 *
 * Strict route protection enforcing that ONLY sgjitbros@gmail.com with SUPERADMIN role
 * can access the KalviLearn Super Admin Portal.
 *
 * All other accounts (students, mentors, campus managers, other emails) are denied access
 * and presented with a dedicated 403 Access Denied interface.
 */
export const SuperAdminProtectedRoute: React.FC = () => {
  const { user, isLoading, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-950 text-white space-y-4">
        <BrandLogo size="md" orientation="vertical" />
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <div className="w-3.5 h-3.5 border-2 border-[#ED2A2B] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Super Administrator credentials...</span>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const userEmail = (user.email || '').toLowerCase().trim()
  const userRole = (user.role || '').toUpperCase().trim()
  const isAuthorizedSuperAdmin =
    userEmail === SUPER_ADMIN_AUTHORIZED_EMAIL &&
    userRole === SUPER_ADMIN_ROLE_NAME &&
    user.status === 'ACTIVE'

  if (!isAuthorizedSuperAdmin) {
    const defaultReturnRoute =
      userRole === 'CAMPUS_MANAGER' || userRole === 'ADMIN'
        ? '/campus'
        : userRole === 'MENTOR'
        ? '/mentor'
        : '/dashboard'

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 text-white p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-red-900/40 rounded-2xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <span className="inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 rounded-full mb-3">
            Access Restricted (403)
          </span>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            Super Administrator Portal
          </h1>

          <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
            Centralized platform administration is restricted exclusively to the authorized Super Administrator account.
          </p>

          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 mb-6 text-left">
            <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
              Attempted Identity
            </div>
            <div className="text-sm font-medium text-white truncate font-mono">
              {user.email}
            </div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center justify-between">
              <span>Role: <span className="text-neutral-300 font-semibold">{user.role}</span></span>
              <span>Status: <span className="text-neutral-300 font-semibold">{user.status}</span></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(defaultReturnRoute)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Portal
            </button>
            <button
              onClick={() => logout()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <Outlet />
}

