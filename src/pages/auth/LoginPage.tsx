import { type FC } from 'react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { LoginCard } from '@/features/auth/components/LoginCard'

/**
 * Kalvi Learn Login Page
 *
 * Single-responsibility authentication entry page adhering to the
 * Kalvi Learn design system and component architecture.
 */
export const LoginPage: FC = () => {
  return (
    <AuthLayout>
      <LoginCard />
    </AuthLayout>
  )
}

export default LoginPage
