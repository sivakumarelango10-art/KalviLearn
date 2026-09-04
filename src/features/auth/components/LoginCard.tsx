import { type FC, useState } from 'react'
import { BrandLogo } from '@/components/common/BrandLogo'
import { Card } from '@/components/ui/Card'
import { GoogleLoginButton } from './GoogleLoginButton'
import { LoginHeader } from './LoginHeader'
import { AuthErrorMessage } from './AuthErrorMessage'
import { useAuth } from '@/contexts/AuthContext'
import { verifyUserInDatabase } from '@/lib/authService'
import { cn } from '@/lib/utils'
import { ShieldCheck, UserCheck, AlertCircle } from 'lucide-react'

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
    if (onGoogleLogin) {
      onGoogleLogin()
      return
    }

    setInternalLoading(true)
    setInternalError(null)

    try {
      await loginWithGoogle()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to connect to Google authentication.'
      setInternalError(message)
      setInternalLoading(false)
    }
  }

  // Helper to test with one of the registered database accounts
  const handleSimulateUser = async (testEmail: string) => {
    setInternalLoading(true)
    setInternalError(null)

    try {
      const res = await verifyUserInDatabase(testEmail)
      if (res.allowed && res.user) {
        localStorage.setItem('kalvi_active_user', JSON.stringify(res.user))
        window.location.href = '/dashboard'
      } else {
        setInternalError(`Access Denied: ${testEmail} is not registered in the database.`)
      }
    } catch (err: any) {
      setInternalError(err.message || 'Verification error')
    } finally {
      setInternalLoading(false)
    }
  }

  return (
    <Card
      className={cn(
        'w-full max-w-[440px] mx-auto p-8 sm:p-10',
        'bg-white border border-neutral-200/90 shadow-card',
        'flex flex-col items-center space-y-7',
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
      <div className="w-full space-y-4 pt-1">
        <GoogleLoginButton
          isLoading={isLoading}
          onClick={handleLoginClick}
        />

        {/* Database Roster Verification Notice */}
        <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-200/80 space-y-2 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Database Whitelist Enforced</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Only users registered in the database <code className="text-neutral-700 bg-neutral-200/60 px-1 py-0.5 rounded">users</code> table are granted dashboard access.
          </p>

          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">
              Registered Accounts:
            </div>
            <button
              type="button"
              onClick={() => handleSimulateUser('kavya.ramesh.s.121@kalvium.community')}
              className="w-full text-left p-2 rounded-lg bg-white border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-colors flex items-center justify-between group"
            >
              <div className="min-w-0">
                <div className="text-xs font-medium text-neutral-900 truncate">
                  kavya.ramesh.s.121@kalvium.community
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">Active Student</div>
              </div>
              <UserCheck className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 flex-shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => handleSimulateUser('prajith.p.s.121@kalvium.community')}
              className="w-full text-left p-2 rounded-lg bg-white border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-colors flex items-center justify-between group"
            >
              <div className="min-w-0">
                <div className="text-xs font-medium text-neutral-900 truncate">
                  prajith.p.s.121@kalvium.community
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">Active Student</div>
              </div>
              <UserCheck className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 flex-shrink-0" />
            </button>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => handleSimulateUser('unregistered.test@gmail.com')}
              className="w-full text-center text-[10px] font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center justify-center gap-1 py-1"
            >
              <AlertCircle className="w-3 h-3" />
              <span>Test Unregistered Account &rarr; Access Denied</span>
            </button>
          </div>
        </div>

        {/* Subtle academic reassurance */}
        <p className="text-[11px] text-neutral-400 text-center select-none pt-1">
          Authorized academic access for Kalvium community
        </p>
      </div>
    </Card>
  )
}
