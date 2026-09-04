import React from 'react'
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
  const { user, accessDenied, deniedEmail, clearAccessDenied } = useAuth()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  // If already authorized, proceed to preserved destination or dashboard
  if (user && !accessDenied) {
    return <Navigate to={from} replace />
  }

  return (
    <AuthLayout>
      {accessDenied ? (
        <AccessDeniedCard
          deniedEmail={deniedEmail}
          onTryAgain={clearAccessDenied}
        />
      ) : (
        <LoginCard />
      )}
    </AuthLayout>
  )
}

export default LoginPage
