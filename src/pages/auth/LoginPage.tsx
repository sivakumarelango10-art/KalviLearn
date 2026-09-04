import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { LoginCard } from '@/features/auth/components/LoginCard'
import { AccessDeniedCard } from '@/features/auth/components/AccessDeniedCard'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Kalvi Learn Login Page
 *
 * Implements the authorization flow:
 * Google returns user -> Supabase Auth -> Query 'users' table:
 * - EXISTS     -> Navigate to /dashboard
 * - NOT EXISTS -> Show AccessDeniedCard ("Account not registered")
 */
export const LoginPage: React.FC = () => {
  const { user, accessDenied, deniedEmail, clearAccessDenied } = useAuth()

  // If already authorized, proceed to dashboard
  if (user && !accessDenied) {
    return <Navigate to="/dashboard" replace />
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
