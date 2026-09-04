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
  clearAccessDenied: () => void
  loginWithGoogle: () => Promise<void>
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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [accessDenied, setAccessDenied] = useState<boolean>(false)
  const [deniedEmail, setDeniedEmail] = useState<string | null>(null)

  const clearAccessDenied = () => {
    setAccessDenied(false)
    setDeniedEmail(null)
  }

  // Verify and sync session
  useEffect(() => {
    let isMounted = true

    async function checkCurrentSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.user?.email) {
          if (isMounted) {
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
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(result.user))
          syncUserData(result.user.id).catch(console.warn)
        } else {
          // Access Denied: User not registered in database
          console.warn(`User ${email} rejected: Account not registered in database.`)
          await signOutUser()
          setUser(null)
          setAccessDenied(true)
          setDeniedEmail(email)
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
            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(result.user))
            syncUserData(result.user.id).catch(console.warn)
          } else {
            console.warn(`User ${email} access denied by whitelist check.`)
            await signOutUser()
            setUser(null)
            setAccessDenied(true)
            setDeniedEmail(email)
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
    await signInWithGoogle()
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
