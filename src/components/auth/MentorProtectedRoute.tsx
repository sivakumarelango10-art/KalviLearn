import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { BrandLogo } from '@/components/common/BrandLogo'

/**
 * MentorProtectedRoute
 *
 * Enforces strict role-based access control for the Mentor Panel.
 * Validates that the user is authenticated, has role === 'MENTOR' (or 'ADMIN'),
 * and holds an 'ACTIVE' operational status.
 */
export const MentorProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-900 text-white space-y-4">
        <BrandLogo size="md" orientation="vertical" />
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <div className="w-3.5 h-3.5 border-2 border-[#ED2A2B] border-t-transparent rounded-full animate-spin" />
          <span>Verifying authorized mentor credentials...</span>
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

  // Role check: Only mentors and super-admins can access the Mentor Panel
  if (user.role !== 'MENTOR' && user.role !== 'ADMIN') {
    if (user.role === 'CONTENT_MANAGER') {
      return <Navigate to="/content-manager" replace />
    }
    if (user.role === 'CAMPUS_MANAGER') {
      return <Navigate to="/campus/dashboard" replace />
    }
    // Non-mentor students are directed to the student platform
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
