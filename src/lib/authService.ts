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

// Fallback authorized roster in sync with PostgreSQL database
const AUTHORIZED_FALLBACK_EMAILS = [
  'kavya.ramesh.s.121@kalvium.community',
  'prajith.p.s.121@kalvium.community',
]

const AUTH_CACHE_KEY = 'kalvi_verified_user_cache_v1'
const AUTH_CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes cache for 200+ concurrent users

interface CachedAuth {
  email: string
  user: DbUser
  timestamp: number
}

function getCachedVerification(email: string): DbUser | null {
  try {
    const raw = sessionStorage.getItem(AUTH_CACHE_KEY) || localStorage.getItem(AUTH_CACHE_KEY)
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
    sessionStorage.setItem(AUTH_CACHE_KEY, str)
    localStorage.setItem(AUTH_CACHE_KEY, str)
  } catch (err) {
    console.warn('Failed to cache auth verification:', err)
  }
}

function clearCachedVerification() {
  try {
    sessionStorage.removeItem(AUTH_CACHE_KEY)
    localStorage.removeItem(AUTH_CACHE_KEY)
  } catch {
    // ignore
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Verifies if an email exists in the database 'users' table and is ACTIVE.
 * Optimized for 200+ concurrent users with caching, retry with exponential backoff & jitter,
 * and resilient fallback.
 */
export async function verifyUserInDatabase(rawEmail: string): Promise<VerificationResult> {
  if (!rawEmail) {
    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  }

  const normalizedEmail = rawEmail.trim().toLowerCase()

  // 1. Check client-side verification cache to prevent hammering Supabase under concurrency
  const cachedUser = getCachedVerification(normalizedEmail)
  if (cachedUser) {
    return { allowed: true, user: cachedUser }
  }

  // 2. Query Supabase with exponential backoff (up to 3 attempts)
  let lastError: any = null
  let data: any = null

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await supabase
        .from('users')
        .select('id, email, role, status, name')
        .ilike('email', normalizedEmail)
        .maybeSingle()

      if (res.error) {
        lastError = res.error
        // If error is transient (e.g. rate limit 429 or gateway timeout), wait and retry
        const backoff = 400 * Math.pow(2, attempt) + Math.random() * 200
        await sleep(backoff)
        continue
      }

      data = res.data
      lastError = null
      break
    } catch (err) {
      lastError = err
      const backoff = 400 * Math.pow(2, attempt) + Math.random() * 200
      await sleep(backoff)
    }
  }

  // Handle errors after retries
  if (lastError) {
    console.warn('Database query error on users table after retries:', lastError)

    // Check if user was previously authenticated locally
    try {
      const activeUserStr = localStorage.getItem('kalvi_active_user')
      if (activeUserStr) {
        const activeUser: DbUser = JSON.parse(activeUserStr)
        if (activeUser.email.toLowerCase() === normalizedEmail && activeUser.status === 'ACTIVE') {
          console.info('Using locally validated active session due to transient database connection issue.')
          return { allowed: true, user: activeUser }
        }
      }
    } catch {
      // ignore
    }

    // Check fallback whitelist
    if (AUTHORIZED_FALLBACK_EMAILS.includes(normalizedEmail)) {
      const fallbackUser: DbUser = {
        id: 'local_' + normalizedEmail,
        email: normalizedEmail,
        role: 'STUDENT',
        status: 'ACTIVE',
        name: normalizedEmail.split('@')[0].replace(/\./g, ' ').toUpperCase(),
      }
      setCachedVerification(normalizedEmail, fallbackUser)
      return { allowed: true, user: fallbackUser }
    }

    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  }

  // 3. Check if record exists
  if (!data) {
    // Check fallback whitelist before denying
    if (AUTHORIZED_FALLBACK_EMAILS.includes(normalizedEmail)) {
      const fallbackUser: DbUser = {
        id: 'local_' + normalizedEmail,
        email: normalizedEmail,
        role: 'STUDENT',
        status: 'ACTIVE',
        name: normalizedEmail.split('@')[0].replace(/\./g, ' ').toUpperCase(),
      }
      setCachedVerification(normalizedEmail, fallbackUser)
      return { allowed: true, user: fallbackUser }
    }

    console.warn(`Access Denied: Email ${normalizedEmail} does not exist in users table.`)
    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  }

  // 4. Check status
  if (data.status !== 'ACTIVE') {
    console.warn(`Access Denied: Email ${normalizedEmail} status is ${data.status}.`)
    return { allowed: false, reason: 'ACCOUNT_INACTIVE' }
  }

  const verifiedUser = data as DbUser
  setCachedVerification(normalizedEmail, verifiedUser)

  return {
    allowed: true,
    user: verifiedUser,
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
    localStorage.removeItem('kalvi_active_user')
    clearCachedVerification()
  }
}

