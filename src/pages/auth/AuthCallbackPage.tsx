import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { verifyUserInDatabase, signOutUser, type DbUser } from '@/lib/authService'
import { fetchUserProgressFromCloud } from '@/lib/cloudSync'
import { hydrateStateFromCloud, resetUserState } from '@/lib/progress'
import { BrandLogo } from '@/components/common/BrandLogo'

/**
 * Dedicated OAuth Authentication Callback Handler
 *
 * Handles OAuth redirects from Google & Supabase:
 * 1. Exchanges auth code or parses hash access token
 * 2. Verifies user registration & active status in database
 * 3. Hydrates authoritative cloud progress & streak data
 * 4. Deterministically redirects user to their authoritative role portal:
 *    - STUDENT        -> /dashboard
 *    - MENTOR         -> /mentor
 *    - CAMPUS_MANAGER -> /campus/dashboard
 *    - ADMIN          -> /campus/dashboard
 */
export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate()
  const [statusMessage, setStatusMessage] = useState('Verifying your credentials with KalviLearn...')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    async function handleAuthCallback() {
      try {
        // 1. Check for error parameters in URL hash or query string
        const hash = typeof window !== 'undefined' ? window.location.hash : ''
        const search = typeof window !== 'undefined' ? window.location.search : ''

        const urlParams = new URLSearchParams(search)
        const hashParams = new URLSearchParams(hash.replace(/^#/, ''))

        const errorDesc =
          hashParams.get('error_description') ||
          urlParams.get('error_description') ||
          hashParams.get('error') ||
          urlParams.get('error')

        if (errorDesc) {
          console.warn('OAuth callback error reported by provider:', errorDesc)
          if (!isCancelled) {
            setErrorMessage(`Authentication failed: ${decodeURIComponent(errorDesc)}`)
            setTimeout(() => navigate('/login', { replace: true }), 3000)
          }
          return
        }

        // 2. Fetch authenticated Supabase session
        setStatusMessage('Establishing secure session...')
        let { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session?.user?.email) {
          // Wait for Supabase to finish processing the OAuth callback. Keep the full
          // session so the access token and authenticated user are from the same result.
          session = await new Promise<typeof session>((resolve) => {
            let settled = false
            const finish = (value: typeof session) => {
              if (settled) return
              settled = true
              clearTimeout(timeout)
              subscription.unsubscribe()
              resolve(value)
            }
            const timeout = setTimeout(() => finish(null), 10_000)
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
              if (currentSession?.user?.email && currentSession.access_token) finish(currentSession)
            })
            void supabase.auth.getSession().then(({ data }) => {
              if (data.session?.user?.email && data.session.access_token) finish(data.session)
            }).catch(() => finish(null))
          })
        }

        if (isCancelled) return
        if (!session?.user?.email || !session.access_token) {
          if (!isCancelled) {
            setErrorMessage('Session could not be established. Please sign in with Google again.')
            setTimeout(() => navigate('/login', { replace: true }), 2500)
          }
          return
        }

        // 3. User authenticated by Google: verify identity in KalviLearn database
        const activeUser = session.user
        const email = typeof activeUser.email === 'string' ? activeUser.email.toLowerCase() : undefined
        if (!email) {
          setErrorMessage('Your Google account did not provide an email address. Please sign in again.')
          setTimeout(() => navigate('/login', { replace: true }), 2500)
          return
        }
        setStatusMessage(`Authorizing profile for ${email}...`)

        const result = await verifyUserInDatabase(email)

        if (isCancelled) return

        if (result.allowed && result.user) {
          const googleName =
            activeUser?.user_metadata?.full_name ||
            activeUser?.user_metadata?.name ||
            result.user.name

          const resolvedUser: DbUser = {
            ...result.user,
            name: result.user.name || googleName || undefined,
          }

          // Persist verified user locally
          localStorage.setItem('kalvi_active_user', JSON.stringify(resolvedUser))

          // Hydrate authoritative database progress
          setStatusMessage('Synchronizing your progress...')
          try {
            const cloudProgress = await fetchUserProgressFromCloud(resolvedUser.id)
            if (cloudProgress && (cloudProgress.solvedSlugs.length > 0 || Object.keys(cloudProgress.progress).length > 0)) {
              hydrateStateFromCloud(cloudProgress)
            } else {
              resetUserState()
            }
          } catch (syncErr) {
            console.warn('Initial cloud sync warning in callback:', syncErr)
          }

          // 4. Role-based portal redirection
          setStatusMessage('Redirecting to your workspace...')
          const role = resolvedUser.role?.toUpperCase()

          if (role === 'SUPERADMIN') {
            navigate('/super-admin/dashboard', { replace: true })
          } else if (role === 'CAMPUS_MANAGER' || role === 'ADMIN') {
            navigate('/campus/dashboard', { replace: true })
          } else if (role === 'MENTOR') {
            navigate('/mentor', { replace: true })
          } else {
            navigate('/dashboard', { replace: true })
          }
        } else {
          // Access Denied: User is not authorized in KalviLearn
          console.warn(`User ${email} access denied: ${result.reason}`)
          await signOutUser()
          localStorage.removeItem('kalvi_active_user')
          resetUserState()

          if (!isCancelled) {
            setErrorMessage(
              result.reason === 'ACCOUNT_INACTIVE'
                ? 'Your account is inactive. Please contact your Campus Manager or Mentor.'
                : 'Your email is not registered in KalviLearn. Please log in with your authorized student or staff email.'
            )
            setTimeout(() => navigate('/login', { replace: true }), 3500)
          }
        }
      } catch (err: unknown) {
        console.error('Unexpected error in AuthCallbackPage:', err)
        if (!isCancelled) {
          const msg = err instanceof Error ? err.message : 'Authentication verification failed'
          setErrorMessage(msg)
          setTimeout(() => navigate('/login', { replace: true }), 3000)
        }
      }
    }

    handleAuthCallback()

    return () => {
      isCancelled = true
    }
  }, [navigate])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fafafa] px-4 py-8">
      <div className="w-full max-w-sm p-8 bg-white border border-neutral-200 shadow-xl rounded-3xl flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <BrandLogo size="lg" orientation="vertical" />

        {errorMessage ? (
          <div className="space-y-3 w-full animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center font-bold text-lg">
              !
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">Authentication Alert</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">{errorMessage}</p>
            <p className="text-[11px] text-neutral-400">Redirecting back to login...</p>
          </div>
        ) : (
          <div className="space-y-4 w-full">
            <div className="w-8 h-8 border-3 border-[#ED2A2B] border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-neutral-900">Welcome to KalviLearn</h3>
              <p className="text-xs text-neutral-500">{statusMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthCallbackPage
