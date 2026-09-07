import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, signInWithGoogle } from '@/lib/supabase'
import { verifyUserInDatabase, signOutUser, DbUser } from '@/lib/authService'
import { fetchUserProgressFromCloud, subscribeToStudentCloudProgress } from '@/lib/cloudSync'
import { hydrateStateFromCloud, resetUserState } from '@/lib/progress'

interface AuthContextType {
  user: DbUser | null
  isLoading: boolean
  accessDenied: boolean
  deniedEmail: string | null
  deniedReason: 'ACCOUNT_NOT_REGISTERED' | 'ACCOUNT_INACTIVE' | 'ERROR' | null
  isMentor: boolean
  isStudent: boolean
  isCampusManager: boolean
  clearAccessDenied: () => void
  loginWithGoogle: () => Promise<any>
  loginWithEmail: (email: string) => Promise<{ success: boolean; user?: DbUser; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LOCAL_USER_KEY = 'kalvi_active_user'

async function syncUserData(userId: string) {
  try {
    // Fetch full progress, solved problems, best code, and submissions from Supabase
    const cloudState = await fetchUserProgressFromCloud(userId)
    if (cloudState && (cloudState.solvedSlugs.length > 0 || Object.keys(cloudState.progress).length > 0)) {
      hydrateStateFromCloud(cloudState)
    } else {
      // Zero progress in database: reset local state so student starts 100% fresh
      resetUserState()
    }
  } catch (err) {
    console.warn('Cross-device cloud synchronization error:', err)
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DbUser | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  // Zero-delay initial state: false if user is cached locally, true if verifying session
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_KEY)
      if (saved) return false

      if (typeof window !== 'undefined') {
        const hash = window.location.hash
        const search = window.location.search
        if (hash.includes('access_token=') || hash.includes('error=') || search.includes('code=')) {
          return true
        }
      }
      return true
    } catch {
      return false
    }
  })
  const [accessDenied, setAccessDenied] = useState<boolean>(false)
  const [deniedEmail, setDeniedEmail] = useState<string | null>(null)
  const [deniedReason, setDeniedReason] = useState<'ACCOUNT_NOT_REGISTERED' | 'ACCOUNT_INACTIVE' | 'ERROR' | null>(null)

  const clearAccessDenied = () => {
    setAccessDenied(false)
    setDeniedEmail(null)
    setDeniedReason(null)
  }

  // Verify and sync session
  useEffect(() => {
    let isMounted = true

    async function checkCurrentSession() {
      try {
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise<{ data: { session: null } }>((resolve) =>
          setTimeout(() => resolve({ data: { session: null } }), 1500)
        )
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise])

        if (!session?.user?.email) {
          // If Supabase session is absent, purge any stored cached active user to prevent unauthenticated bypass
          if (isMounted) {
            localStorage.removeItem(LOCAL_USER_KEY)
            setUser(null)
            setIsLoading(false)
          }
          return
        }

        const email = session.user.email
        const result = await verifyUserInDatabase(email)

        if (!isMounted) return

        if (result.allowed && result.user) {
          setUser(result.user)
          setAccessDenied(false)
          setDeniedEmail(null)
          setDeniedReason(null)
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(result.user))
          syncUserData(result.user.id).catch(console.warn)
        } else {
          // Access Denied: User not registered or inactive in database
          console.warn(`User ${email} rejected: ${result.reason || 'Account not registered'}`)
          await signOutUser()
          setUser(null)
          setAccessDenied(true)
          setDeniedEmail(email)
          setDeniedReason(result.reason || 'ACCOUNT_NOT_REGISTERED')
          localStorage.removeItem(LOCAL_USER_KEY)
          resetUserState()
        }
      } catch (err) {
        console.error('Session verification error:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    checkCurrentSession()

    // Listen to OAuth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
          localStorage.removeItem(LOCAL_USER_KEY)
          resetUserState()
          setIsLoading(false)
          return
        }

        if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || (event === 'INITIAL_SESSION' && session?.user?.email)) {
          const email = session?.user?.email
          if (!email) return

          setIsLoading(true)
          const result = await verifyUserInDatabase(email)

          if (result.allowed && result.user) {
            setUser(result.user)
            setAccessDenied(false)
            setDeniedEmail(null)
            setDeniedReason(null)
            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(result.user))
            syncUserData(result.user.id).catch(console.warn)
          } else {
            console.warn(`User ${email} access denied: ${result.reason || 'whitelist check'}`)
            await signOutUser()
            setUser(null)
            setAccessDenied(true)
            setDeniedEmail(email)
            setDeniedReason(result.reason || 'ACCOUNT_NOT_REGISTERED')
            localStorage.removeItem(LOCAL_USER_KEY)
            resetUserState()
          }
          setIsLoading(false)
        }
      }
    )

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Real-time synchronization for student progress and submissions across devices
  useEffect(() => {
    if (!user?.id || user.role !== 'STUDENT') return

    const unsubscribe = subscribeToStudentCloudProgress(user.id, () => {
      syncUserData(user.id).catch(console.warn)
    })

    return () => {
      unsubscribe()
    }
  }, [user?.id, user?.role])

  const loginWithGoogle = async () => {
    clearAccessDenied()
    return await signInWithGoogle()
  }

  const loginWithEmail = async (email: string) => {
    // In production, authentication must require cryptographic proof via Google OAuth
    if (import.meta.env.PROD) {
      console.warn('Direct passwordless loginWithEmail is disabled in production. Use Google OAuth.')
      return { success: false, error: 'Passwordless login is disabled in production. Please sign in with Google.' }
    }
    setIsLoading(true)
    clearAccessDenied()
    try {
      const result = await verifyUserInDatabase(email)
      if (result.allowed && result.user) {
        setUser(result.user)
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(result.user))
        syncUserData(result.user.id).catch(console.warn)
        return { success: true, user: result.user }
      } else {
        setAccessDenied(true)
        setDeniedEmail(email)
        setDeniedReason(result.reason || 'ACCOUNT_NOT_REGISTERED')
        return { success: false, error: result.reason || 'Account not registered' }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await signOutUser()
    setUser(null)
    clearAccessDenied()
    resetUserState()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        accessDenied,
        deniedEmail,
        deniedReason,
        isMentor: user?.role === 'MENTOR',
        isStudent: user?.role === 'STUDENT',
        isCampusManager: user?.role === 'CAMPUS_MANAGER' || user?.role === 'ADMIN',
        clearAccessDenied,
        loginWithGoogle,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
