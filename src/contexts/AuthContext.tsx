import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, signInWithGoogle } from '@/lib/supabase'
import { verifyUserInDatabase, signOutUser, DbUser } from '@/lib/authService'
import { fetchUserProgressFromCloud, uploadLocalProgressToCloud } from '@/lib/cloudSync'
import { getUserState, hydrateStateFromCloud, resetUserState } from '@/lib/progress'

interface AuthContextType {
  user: DbUser | null
  isLoading: boolean
  accessDenied: boolean
  deniedEmail: string | null
  deniedReason: 'ACCOUNT_NOT_REGISTERED' | 'ACCOUNT_INACTIVE' | 'ERROR' | null
  isMentor: boolean
  isStudent: boolean
  clearAccessDenied: () => void
  loginWithGoogle: () => Promise<any>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LOCAL_USER_KEY = 'kalvi_active_user'

async function syncUserData(userId: string) {
  try {
    const localState = getUserState()
    // 1. If student solved any problems offline/as guest, upload them to Supabase
    if (localState.solvedSlugs && localState.solvedSlugs.length > 0) {
      await uploadLocalProgressToCloud(userId, localState)
    }
    // 2. Fetch full progress, solved problems, best code, and submissions from Supabase
    const cloudState = await fetchUserProgressFromCloud(userId)
    if (cloudState) {
      hydrateStateFromCloud(cloudState)
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
  // Zero-delay initial state: Only true if currently handling an OAuth redirect callback
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
      return false
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
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.user?.email) {
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
        if (event === 'SIGNED_OUT' || !session?.user?.email) {
          setUser(null)
          localStorage.removeItem(LOCAL_USER_KEY)
          resetUserState()
          setIsLoading(false)
          return
        }

        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setIsLoading(true)
          const email = session.user.email
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

  const loginWithGoogle = async () => {
    clearAccessDenied()
    return await signInWithGoogle()
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
        clearAccessDenied,
        loginWithGoogle,
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
