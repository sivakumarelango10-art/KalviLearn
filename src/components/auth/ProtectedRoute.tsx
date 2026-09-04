import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { BrandLogo } from '@/components/common/BrandLogo'

export const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-50 space-y-4">
        <BrandLogo size="md" orientation="vertical" />
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
          <div className="w-3.5 h-3.5 border-2 border-[#ED2A2B] border-t-transparent rounded-full animate-spin" />
          <span>Verifying authorized academic access...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login page preserving the intended return destination
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
