import { supabase } from './supabase'
import { clearAllUserCaches } from './cacheRegistry'

export interface DbUser {
  id: string
  email: string
  role: string
  status: string
  name?: string
}

export interface VerifyUserInput {
  email?: string | null
  authUid?: string | null
  accessToken?: string | null
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
 * Verifies if an authenticated user exists in the database 'users' table and holds an ACTIVE status.
 * Supports resolution by Supabase Auth UID (authUid), verified email, and authoritative role validation.
 * For Content Managers, validates active assignment status against content_manager_assignments.
 */
export async function verifyUserInDatabase(
  input: string | VerifyUserInput,
  options?: { bypassCache?: boolean }
): Promise<VerificationResult> {
  let rawEmail: string | undefined
  let authUid: string | undefined
  let accessToken: string | undefined

  if (typeof input === 'string') {
    rawEmail = input
  } else if (input && typeof input === 'object') {
    rawEmail = input.email || undefined
    authUid = input.authUid || undefined
    accessToken = input.accessToken || undefined
  }

  const normalizedEmail = rawEmail ? rawEmail.trim().toLowerCase() : undefined

  if (!normalizedEmail && !authUid) {
    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  }

  // 1. Instant Cache Check (Memory / SessionStorage / LocalStorage) -> 0ms
  const cacheKey = normalizedEmail || authUid || ''
  const cachedUser = options?.bypassCache ? null : getCachedVerification(cacheKey)
  if (cachedUser) {
    return { allowed: true, user: cachedUser }
  }

  // 2. Direct Authoritative Database Query (with 4500ms timeout)
  try {
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Auth request timed out')), 4500)
    )

    let dbUserRow: any = null

    // 2a. Primary Lookup by Supabase Auth UID if provided
    if (authUid) {
      try {
        const byAuthPromise = supabase
          .from('users')
          .select('id, email, role, status, name, "authUid"')
          .eq('authUid', authUid)
          .maybeSingle()
        const byAuthRes = await Promise.race([byAuthPromise, timeoutPromise])
        if (byAuthRes && 'data' in byAuthRes && byAuthRes.data) {
          dbUserRow = byAuthRes.data
        }
      } catch (err) {
        // Fall through to lookup by email
      }
    }

    // 2b. Secondary Lookup by verified Email
    if (!dbUserRow && normalizedEmail) {
      const byEmailPromise = supabase
        .from('users')
        .select('id, email, role, status, name, "authUid"')
        .ilike('email', normalizedEmail)
        .maybeSingle()
      const byEmailRes = await Promise.race([byEmailPromise, timeoutPromise])
      if (byEmailRes && 'data' in byEmailRes && byEmailRes.data) {
        dbUserRow = byEmailRes.data
      }
    }

    // 2c. First-Class Content Manager Authorization & Verification
    // Triggered when the user has CONTENT_MANAGER role OR when not found via client RLS but accessToken is provided
    const isCmCandidate =
      dbUserRow?.role?.toUpperCase() === 'CONTENT_MANAGER' ||
      (!dbUserRow && !!accessToken)

    if (isCmCandidate) {
      // If an access token is available, authoritatively verify with the server endpoint
      if (accessToken) {
        try {
          const apiRes = await fetch('/api/content-manager?action=me', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          })
          const apiJson = await apiRes.json().catch(() => null)
          if (apiRes.ok && apiJson?.success && apiJson?.data) {
            const cmData = apiJson.data
            const verifiedCmUser: DbUser = {
              id: cmData.userId,
              email: (cmData.email || normalizedEmail || '').toLowerCase(),
              role: 'CONTENT_MANAGER',
              status: 'ACTIVE',
              name: cmData.name || dbUserRow?.name,
            }
            setCachedVerification(cacheKey, verifiedCmUser)
            return { allowed: true, user: verifiedCmUser }
          } else if (apiRes.status === 403) {
            const msg = String(apiJson?.message || apiJson?.error || '').toLowerCase()
            if (msg.includes('inactive') || msg.includes('suspended')) {
              return { allowed: false, reason: 'ACCOUNT_INACTIVE' }
            }
            if (dbUserRow?.role?.toUpperCase() === 'CONTENT_MANAGER') {
              return { allowed: false, reason: 'ACCOUNT_INACTIVE' }
            }
          }
        } catch {
          // Network or offline environment fallback: continue with direct DB checks
        }
      }

      // Direct DB check for active Content Manager assignment (in mock/test or privileged environments)
      if (dbUserRow?.id) {
        try {
          const { data: assignment } = await supabase
            .from('content_manager_assignments')
            .select('id, status, is_active')
            .eq('user_id', dbUserRow.id)
            .maybeSingle()

          if (assignment) {
            const assignStatus = String(assignment.status || '').toUpperCase()
            if (assignStatus !== 'ACTIVE' || assignment.is_active === false) {
              return { allowed: false, reason: 'ACCOUNT_INACTIVE' }
            }
          }
        } catch {
          // If RLS prevents client reading content_manager_assignments, proceed with user status
        }
      }
    }

    if (dbUserRow) {
      const rawUser = dbUserRow as DbUser
      const resolvedEmail = (rawUser.email || normalizedEmail || '').toLowerCase()
      const dbUser: DbUser = {
        id: rawUser.id,
        email: resolvedEmail,
        role: (rawUser.role || 'STUDENT').toUpperCase(),
        status: (rawUser.status || 'ACTIVE').toUpperCase(),
        name: rawUser.name,
      }
      if (dbUser.status !== 'ACTIVE') {
        return { allowed: false, reason: 'ACCOUNT_INACTIVE' }
      }
      setCachedVerification(cacheKey, dbUser)
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
    clearAllUserCaches()
  }
}

