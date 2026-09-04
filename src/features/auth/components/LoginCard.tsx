import { type FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/common/BrandLogo'
import { Card } from '@/components/ui/Card'
import { GoogleLoginButton } from './GoogleLoginButton'
import { LoginHeader } from './LoginHeader'
import { AuthErrorMessage } from './AuthErrorMessage'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface LoginCardProps {
  className?: string
  onGoogleLogin?: () => void
  isLoading?: boolean
  errorMessage?: string | null
}

export const LoginCard: FC<LoginCardProps> = ({
  className,
  onGoogleLogin,
  isLoading: controlledLoading,
  errorMessage: controlledError,
}) => {
  const { loginWithGoogle, isLoading: authLoading } = useAuth()
  const [internalLoading, setInternalLoading] = useState(false)
  const [internalError, setInternalError] = useState<string | null>(null)

  const isLoading = controlledLoading ?? (internalLoading || authLoading)
  const errorMessage = controlledError ?? internalError

  const handleLoginClick = async () => {
    if (isLoading) return

    if (onGoogleLogin) {
      onGoogleLogin()
      return
    }

    setInternalLoading(true)
    setInternalError(null)

    try {
      const res = await loginWithGoogle()
      if (res && 'error' in res && res.error) {
        setInternalError(res.error.message || 'Unable to connect to Google authentication.')
        setInternalLoading(false)
        return
      }
      if (res && 'data' in res && res.data?.url) {
        window.location.assign(res.data.url)
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
        'bg-white border border-neutral-200/90 shadow-2xl rounded-3xl',
        'flex flex-col items-center space-y-8 animate-modal-pop',
        className
      )}
    >
      {/* Prominent Brand Logo */}
      <div className="pt-1">
        <BrandLogo size="lg" orientation="vertical" />
      </div>

      {/* Welcome Heading & Motto */}
      <LoginHeader />

      {/* Error Message Area */}
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

        {/* Legal Agreement */}
        <p className="text-xs text-neutral-500 text-center leading-relaxed pt-1">
          By continuing, you agree to our{' '}
          <Link
            to="/terms-and-conditions"
            className="font-medium text-neutral-900 underline underline-offset-2 hover:text-[#ED2A2B] transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded"
          >
            Terms &amp; Conditions
          </Link>{' '}
          and{' '}
          <Link
            to="/privacy-policy"
            className="font-medium text-neutral-900 underline underline-offset-2 hover:text-[#ED2A2B] transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Subtle academic reassurance */}
        <p className="text-[11px] text-neutral-400 text-center select-none pt-0.5">
          Authorized academic access for Kalvium community
        </p>
      </div>
    </Card>
  )
}
