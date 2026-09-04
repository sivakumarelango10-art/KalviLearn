import { type FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/common/BrandLogo'
import { Card } from '@/components/ui/Card'
import { GoogleLoginButton } from './GoogleLoginButton'
import { LoginHeader } from './LoginHeader'
import { AuthErrorMessage } from './AuthErrorMessage'
import { signInWithGoogle } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface LoginCardProps {
  className?: string
  onGoogleLogin?: () => void
  isLoading?: boolean
  errorMessage?: string | null
}

/**
 * Centered Authentication Card for Kalvi Learn
 *
 * Encapsulates the Brand Logo, Login Header, Error Area, and Google Action Button
 * within a restrained, elevated card container with live Supabase Google OAuth integration.
 */
export const LoginCard: FC<LoginCardProps> = ({
  className,
  onGoogleLogin,
  isLoading: controlledLoading,
  errorMessage: controlledError,
}) => {
  const [internalLoading, setInternalLoading] = useState(false)
  const [internalError, setInternalError] = useState<string | null>(null)

  const isLoading = controlledLoading ?? internalLoading
  const errorMessage = controlledError ?? internalError

  const handleLoginClick = async () => {
    if (onGoogleLogin) {
      onGoogleLogin()
      return
    }

    setInternalLoading(true)
    setInternalError(null)

    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setInternalError(error.message)
        setInternalLoading(false)
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to connect to Google authentication.'
      setInternalError(message)
      setInternalLoading(false)
    }
  }

  return (
    <Card
      className={cn(
        'w-full max-w-[420px] mx-auto p-8 sm:p-10',
        'bg-white border border-neutral-200/90 shadow-card',
        'flex flex-col items-center space-y-8',
        className
      )}
    >
      {/* Prominent Brand Logo */}
      <div className="pt-1">
        <BrandLogo size="lg" orientation="vertical" />
      </div>

      {/* Welcome Heading & Motto */}
      <LoginHeader />

      {/* Error Message Area (shown when error exists) */}
      {errorMessage && (
        <div className="w-full">
          <AuthErrorMessage
            message={errorMessage}
            onDismiss={() => setInternalError(null)}
          />
        </div>
      )}

      {/* Primary Google Authentication Action */}
      <div className="w-full space-y-3 pt-1">
        <GoogleLoginButton
          isLoading={isLoading}
          onClick={handleLoginClick}
        />

        <div className="pt-2 text-center">
          <Link
            to="/dashboard"
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-1 hover:underline"
          >
            <span>Enter Scholar Workspace directly</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Subtle academic/security reassurance footer */}
        <p className="text-[11px] text-neutral-400 text-center select-none pt-1">
          Authorized academic access for Kalvi community
        </p>
      </div>
    </Card>
  )
}
