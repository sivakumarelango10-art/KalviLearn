import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { BrandLogo } from '@/components/common/BrandLogo'

/**
 * CampusManagerProtectedRoute
 *
 * Enforces role-based access control for the Campus Manager Portal.
 * Allows users with role === 'CAMPUS_MANAGER', role === 'ADMIN', or authorized mentors.
 */
export const CampusManagerProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-950 text-white space-y-4">
        <BrandLogo size="md" orientation="vertical" />
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <div className="w-3.5 h-3.5 border-2 border-[#ED2A2B] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Campus Manager authorization...</span>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Account inactive or suspended
  if (user.status !== 'ACTIVE') {
    return <Navigate to="/login" replace />
  }

  // Role check: Only CAMPUS_MANAGER and ADMIN can access Campus Manager portal
  if (user.role !== 'CAMPUS_MANAGER' && user.role !== 'ADMIN') {
    if (user.role === 'CONTENT_MANAGER') {
      return <Navigate to="/content-manager" replace />
    }
    if (user.role === 'MENTOR') {
      return <Navigate to="/mentor" replace />
    }
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
