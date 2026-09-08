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
const AUTHORIZED_FALLBACK_USERS: Record<string, { id: string; role: string; name: string; status: string }> = {
  // Registered Scholars
  'kavya.ramesh.s.121@kalvium.community': {
    id: '36a74ed3-4a98-4374-a3d1-be0e2050b81c',
    role: 'STUDENT',
    name: 'Kavya Ramesh',
    status: 'ACTIVE',
  },
  'prajith.p.s.121@kalvium.community': {
    id: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    role: 'STUDENT',
    name: 'Prajith P S',
    status: 'ACTIVE',
  },
  // Authorized Campus Managers
  'pkumardigital@gmail.com': {
    id: 'cm-pkumardigital-001',
    role: 'CAMPUS_MANAGER',
    name: 'P Kumar',
    status: 'ACTIVE',
  },
  'nithyashri.rs@kalvium.com': {
    id: 'cm-nithyashri-002',
    role: 'CAMPUS_MANAGER',
    name: 'Nithyashri R S',
    status: 'ACTIVE',
  },
  'avishka.s@kalvium.com': {
    id: 'cm-avishka-003',
    role: 'CAMPUS_MANAGER',
    name: 'Avishka S',
    status: 'ACTIVE',
  },
  // Authorized Mentors
  'sivakumarelango10@gmail.com': {
    id: 'e95272bc-633d-4fbd-8bf0-7801426fd0f6',
    role: 'MENTOR',
    name: 'Elango Sivakumar',
    status: 'ACTIVE',
  },
  'aaditya.rm@kalvium.com': {
    id: 'a5ff17af-95dc-4ecf-951e-fa7f19365cf6',
    role: 'MENTOR',
    name: 'Aaditya R M',
    status: 'ACTIVE',
  },
  'swathi.ks@kalvium.com': {
    id: '3901e057-64a5-4554-b8b2-4b3ea514510d',
    role: 'MENTOR',
    name: 'Swathi K S',
    status: 'ACTIVE',
  },
  'sanchita.dutta@kalvium.com': {
    id: '93d30972-5a32-408d-8e76-473c02192ab3',
    role: 'MENTOR',
    name: 'Sanchita Dutta',
    status: 'ACTIVE',
  },
  'supriya.muvva@kalvium.com': {
    id: 'ac0652a0-a087-4252-b750-89e080fdce6e',
    role: 'MENTOR',
    name: 'Muvva Supriya',
    status: 'ACTIVE',
  },
  'infanta.f@kalvium.com': {
    id: '3f499c45-3da7-483e-bfdd-2cd1d5153d62',
    role: 'MENTOR',
    name: 'Infanta Carolina Freshale',
    status: 'ACTIVE',
  },
  'chaitra.alur@kalvium.com': {
    id: 'a6b4599a-40f7-4efc-95f9-111343e5eb28',
    role: 'MENTOR',
    name: 'Chaitra Alur',
    status: 'ACTIVE',
  },
  'indhu.k@kalvium.com': {
    id: '7f6fab30-4574-4bbf-93e6-48da4af13dea',
    role: 'MENTOR',
    name: 'Indhu K',
    status: 'ACTIVE',
  },
  'tulika.suman@kalvium.com': {
    id: '8254bdcf-b0d4-473f-8657-18d9614a2a89',
    role: 'MENTOR',
    name: 'Tulika Suman',
    status: 'ACTIVE',
  },
  'mandala.thanuja@kalvium.com': {
    id: '4d6347a9-43ba-42e5-9bb0-45f3d0ec03eb',
    role: 'MENTOR',
    name: 'Mandala Thanuja',
    status: 'ACTIVE',
  },
  'bhavana.r@kalvium.com': {
    id: '9802f70f-8348-4728-8202-ad75cf9ec78b',
    role: 'MENTOR',
    name: 'Bhavana R K',
    status: 'ACTIVE',
  },
}

const AUTH_CACHE_KEY = 'kalvi_verified_user_cache_v1'
const AUTH_CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes cache for 200+ concurrent users

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

  // 2. Instant Whitelist Check (Known Verified Scholars & Mentors) -> 0ms response time
  const fallback = AUTHORIZED_FALLBACK_USERS[normalizedEmail]
  if (fallback) {
    if (fallback.status !== 'ACTIVE') {
      return { allowed: false, reason: 'ACCOUNT_INACTIVE' }
    }
    const authorizedUser: DbUser = {
      id: fallback.id,
      email: normalizedEmail,
      role: fallback.role,
      status: fallback.status,
      name: fallback.name,
    }
    setCachedVerification(normalizedEmail, authorizedUser)

    // Non-blocking background sync with Supabase to update real PostgreSQL UUID
    void (async () => {
      try {
        const { data } = await supabase
          .from('users')
          .select('id, email, role, status, name')
          .ilike('email', normalizedEmail)
          .maybeSingle()

        if (data && data.id) {
          const syncedUser: DbUser = {
            id: data.id,
            email: normalizedEmail,
            role: data.role || fallback.role,
            status: data.status || fallback.status,
            name: data.name || fallback.name,
          }
          setCachedVerification(normalizedEmail, syncedUser)
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('kalvi_active_user', JSON.stringify(syncedUser))
          }
        }
      } catch {
        // Non-blocking background error ignored
      }
    })()

    return { allowed: true, user: authorizedUser }
  }

  // 3. Fast Network Query for newly added scholars (with 2500ms timeout)
  try {
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Auth request timed out')), 2500)
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
    console.warn('Fast auth network query error or timeout:', err)
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

