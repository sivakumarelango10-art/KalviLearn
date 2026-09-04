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

        {/* Mentor / Faculty Direct Sign In Option */}
        <div className="pt-2 border-t border-neutral-100">
          <MentorDirectLogin onLoginError={(err) => setInternalError(err)} />
        </div>

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

function MentorDirectLogin({ onLoginError }: { onLoginError: (err: string | null) => void }) {
  const { loginWithEmail, isLoading } = useAuth()
  const [showInput, setShowInput] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setSubmitting(true)
    onLoginError(null)

    const res = await loginWithEmail(email.trim())
    if (!res.success) {
      onLoginError(res.error || 'Account not registered or inactive in PostgreSQL.')
      setSubmitting(false)
    }
  }

  if (!showInput) {
    return (
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowInput(true)}
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-1.5 py-1"
        >
          <span>Faculty &amp; Mentor Direct Login</span>
          <span className="text-[10px] text-[#ED2A2B] bg-red-50 border border-red-200 px-1.5 py-0.2 rounded font-bold">
            Mentor Portal
          </span>
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 pt-1 animate-in fade-in duration-150">
      <div className="flex items-center justify-between text-xs">
        <label className="font-bold text-neutral-700">Mentor Email:</label>
        <button
          type="button"
          onClick={() => setShowInput(false)}
          className="text-[11px] text-neutral-400 hover:text-neutral-700"
        >
          Cancel
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="e.g. sivakumarelango10@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
        />
        <button
          type="submit"
          disabled={submitting || isLoading}
          className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1 flex-shrink-0"
        >
          {submitting ? 'Verifying...' : 'Sign In →'}
        </button>
      </div>
      <p className="text-[10px] text-neutral-400">
        Direct instant verification against PostgreSQL mentor roster.
      </p>
    </form>
  )
}
