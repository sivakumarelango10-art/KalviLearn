import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { LoginCard } from '@/features/auth/components/LoginCard'
import { AccessDeniedCard } from '@/features/auth/components/AccessDeniedCard'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Kalvi Learn Login Page
 *
 * Implements the authorization flow:
 * Google returns user -> Supabase Auth -> Query 'users' table:
 * - EXISTS     -> Navigate to /dashboard (or preserved destination)
 * - NOT EXISTS -> Show AccessDeniedCard ("Account not registered")
 */
export const LoginPage: React.FC = () => {
  const { user, accessDenied, deniedEmail, deniedReason, clearAccessDenied } = useAuth()
  const location = useLocation()
  const defaultDestination =
    user?.role === 'SUPERADMIN'
      ? '/super-admin/dashboard'
      : user?.role === 'CAMPUS_MANAGER' || user?.role === 'ADMIN'
      ? '/campus/dashboard'
      : user?.role === 'MENTOR'
      ? '/mentor'
      : '/dashboard'
  const stateFrom = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
  let targetDestination = defaultDestination
  if (stateFrom && stateFrom !== '/' && stateFrom !== '/login') {
    if (user?.role === 'SUPERADMIN') {
      targetDestination = stateFrom.startsWith('/super-admin') ? stateFrom : '/super-admin/dashboard'
    } else if (user?.role === 'CAMPUS_MANAGER' || user?.role === 'ADMIN') {
      targetDestination = stateFrom.startsWith('/campus') ? stateFrom : '/campus/dashboard'
    } else if (user?.role === 'MENTOR') {
      targetDestination = stateFrom.startsWith('/mentor') ? stateFrom : '/mentor'
    } else {
      targetDestination = stateFrom
    }
  }

  useEffect(() => {
    document.title = 'KalviLearn — Login'
  }, [])

  // If already authorized, proceed to preserved destination or role home
  if (user && !accessDenied) {
    return <Navigate to={targetDestination} replace />
  }

  return (
    <AuthLayout>
      {accessDenied ? (
        <AccessDeniedCard
          deniedEmail={deniedEmail}
          reason={deniedReason}
          onTryAgain={clearAccessDenied}
        />
      ) : (
        <LoginCard />
      )}
    </AuthLayout>
  )
}

export default LoginPage
