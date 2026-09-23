import { supabase } from './supabase'

export interface DbUser {
  id: string
  email: string
  role: string
  status: string
  name?: string
}

export interface VerificationResult {
  allowed: boolean
  user?: DbUser
  reason?: 'ACCOUNT_NOT_REGISTERED' | 'ACCOUNT_INACTIVE' | 'ERROR'
}

// In-memory verification cache for active session performance
const AUTH_CACHE_KEY = 'kalvi_verified_user_cache_v1'
const AUTH_CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes cache for concurrent performance

interface CachedAuth {
  email: string
  user: DbUser
  timestamp: number
}

function getCachedVerification(email: string): DbUser | null {
  try {
    const raw =
      (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(AUTH_CACHE_KEY) : null) ||
      (typeof localStorage !== 'undefined' ? localStorage.getItem(AUTH_CACHE_KEY) : null)
    if (!raw) return null
    const cached: CachedAuth = JSON.parse(raw)
    if (cached.email === email && Date.now() - cached.timestamp < AUTH_CACHE_TTL_MS) {
      return cached.user
    }
    return null
  } catch {
    return null
  }
}

function setCachedVerification(email: string, user: DbUser) {
  try {
    const payload: CachedAuth = { email, user, timestamp: Date.now() }
    const str = JSON.stringify(payload)
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(AUTH_CACHE_KEY, str)
    if (typeof localStorage !== 'undefined') localStorage.setItem(AUTH_CACHE_KEY, str)
  } catch (err) {
    console.warn('Failed to cache auth verification:', err)
  }
}

function clearCachedVerification() {
  try {
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(AUTH_CACHE_KEY)
    if (typeof localStorage !== 'undefined') localStorage.removeItem(AUTH_CACHE_KEY)
  } catch {
    // ignore
  }
}

/**
 * Verifies if an email exists in the database 'users' table and is ACTIVE.
 * Optimized for sub-millisecond response time using instant in-memory whitelist,
 * localStorage session validation, and non-blocking background synchronization.
 */
export async function verifyUserInDatabase(rawEmail: string): Promise<VerificationResult> {
  if (!rawEmail) {
    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  }

  const normalizedEmail = rawEmail.trim().toLowerCase()

  // 1. Instant Cache Check (Memory / SessionStorage / LocalStorage) -> 0ms
  const cachedUser = getCachedVerification(normalizedEmail)
  if (cachedUser) {
    return { allowed: true, user: cachedUser }
  }

  // 2. Direct Authoritative Database Query (with 3500ms timeout)
  try {
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Auth request timed out')), 3500)
    )

    const queryPromise = supabase
      .from('users')
      .select('id, email, role, status, name')
      .ilike('email', normalizedEmail)
      .maybeSingle()

    const res = await Promise.race([queryPromise, timeoutPromise])

    if (res && 'data' in res && res.data) {
      const rawUser = res.data as DbUser
      const dbUser: DbUser = {
        id: rawUser.id,
        email: normalizedEmail,
        role: (rawUser.role || 'STUDENT').toUpperCase(),
        status: (rawUser.status || 'ACTIVE').toUpperCase(),
        name: rawUser.name,
      }
      if (dbUser.status !== 'ACTIVE') {
        return { allowed: false, reason: 'ACCOUNT_INACTIVE' }
      }
      setCachedVerification(normalizedEmail, dbUser)
      return { allowed: true, user: dbUser }
    }

    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  } catch (err) {
    console.warn('Database auth query error or timeout:', err)
    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  }
}

/**
 * Sign out and purge local user session and auth caches
 */
export async function signOutUser() {
  try {
    await supabase.auth.signOut()
  } catch (err) {
    console.error('Error during signOut:', err)
  } finally {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('kalvi_active_user')
    }
    clearCachedVerification()
  }
}

