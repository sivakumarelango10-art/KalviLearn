import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { fetchContentManagerProfile, ContentManagerProfile } from '@/lib/contentManagerService'
import { ContentManagerProvider } from '@/contexts/ContentManagerContext'

export const ContentManagerProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const [profile, setProfile] = useState<ContentManagerProfile | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let active = true
    if (!user?.id) {
      setProfile(null)
      setChecked(false)
      return
    }

    setChecked(false)
    fetchContentManagerProfile().then((res) => {
      if (!active) return
      if (res.success && res.data && res.data.role === 'CONTENT_MANAGER') {
        setProfile(res.data)
      } else {
        setProfile(null)
      }
      setChecked(true)
    })

    return () => {
      active = false
    }
  }, [user?.id, user?.role])

  if (isLoading || (user && !checked)) {
    return (
      <div className="min-h-screen bg-[#000000] text-slate-300 flex flex-col items-center justify-center gap-3 text-sm">
        <div className="w-5 h-5 border-2 border-[#ED2A2B] border-t-transparent rounded-full animate-spin" />
        <span>Verifying Content Manager permissions…</span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: { pathname: location.pathname } }} />
  }

  if (!profile) {
    // Route non-content managers / revoked users strictly away from /content-manager
    if (user.role === 'SUPERADMIN') return <Navigate to="/super-admin/dashboard" replace />
    if (user.role === 'CAMPUS_MANAGER' || user.role === 'ADMIN') return <Navigate to="/campus/dashboard" replace />
    if (user.role === 'MENTOR') return <Navigate to="/mentor" replace />
    return <Navigate to="/dashboard" replace />
  }

  return (
    <ContentManagerProvider initialProfile={profile}>
      <Outlet />
    </ContentManagerProvider>
  )
}
