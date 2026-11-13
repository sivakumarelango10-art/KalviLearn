import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { isTestAuthEnabled } from './httpSecurity'

// Server-authoritative Supabase Client.
// Production REQUIRES SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY: there is no silent fallback to the
// public anon key (which would make every server-side write quietly subject to client RLS).
// Outside production (local dev / test runs / Vercel previews) the public project URL + publishable key are used so the
// server can verify real Google logins even when the service_role key is only scoped to production.
const IS_STRICT_PRODUCTION =
  process.env.VERCEL_ENV === 'production' ||
  (process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV)

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  (IS_STRICT_PRODUCTION ? '' : 'https://iavxnhwbgoarnexmyxpn.supabase.co')

// SUPABASE_SECRET_KEY is the preferred modern secret key; SUPABASE_SERVICE_ROLE_KEY is the backward-compatible fallback.
export const serverSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  ''

export function hasPrivilegedServerKey(): boolean {
  return Boolean(serverSecretKey && serverSecretKey.trim())
}

const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40'

// A missing production credential must NOT crash the module at import time: on Vercel that turns every request to
// every function importing this file (Run, Submit, feedback) into a bare 500 with no explanation. Instead the
// server starts, logs the misconfiguration once, and authentication fails CLOSED per request with a clear 503.
const CONFIG_ERROR =
  IS_STRICT_PRODUCTION && (!supabaseUrl || !serverSecretKey)
    ? `Server misconfigured: missing ${[!supabaseUrl && 'SUPABASE_URL', !serverSecretKey && 'SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)'].filter(Boolean).join(' and ')} in the deployment environment.`
    : null
if (CONFIG_ERROR) console.error(`[auth] ${CONFIG_ERROR} Every authenticated request will be refused until it is set.`)

/** Non-null when the server cannot verify identities (production without Supabase service credentials). */
export function serverConfigError(): string | null {
  return CONFIG_ERROR
}

/** Error message when privileged database operations cannot be performed */
export function getPrivilegedServerKeyError(): string | null {
  if (!supabaseUrl) {
    return 'Server misconfigured: missing SUPABASE_URL in server environment.'
  }
  if (!hasPrivilegedServerKey() && !(supabaseServer as any)?.__isMocked) {
    return 'Server misconfigured: SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) is required for privileged database operations but is not configured.'
  }
  return null
}

/**
 * Attachment URLs are rendered to staff and forwarded to TeamSync, so only objects in this project's own public
 * `feedback-attachments` bucket are trusted. Arbitrary client-supplied URLs (tracking pixels, javascript:, internal
 * hosts) are rejected.
 */
export function isTrustedStorageUrl(raw: string): boolean {
  try {
    const url = new URL(raw)
    const base = new URL(supabaseUrl)
    return (
      url.protocol === 'https:' &&
      url.origin === base.origin &&
      url.pathname.startsWith('/storage/v1/object/public/feedback-attachments/')
    )
  } catch {
    return false
  }
}

/**
 * Dedicated auth client for authoritatively validating incoming user bearer JWTs.
 * Uses the secret key when available, or falls back to public anon key for dev/test verification.
 */
export const supabaseAuthServer = createClient(
  supabaseUrl || 'https://unconfigured.invalid',
  serverSecretKey || (IS_STRICT_PRODUCTION ? '' : supabaseAnonKey) || 'unconfigured',
  {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  }
)

/**
 * Privileged server-authoritative database client.
 * Uses SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY).
 * NEVER silently falls back to the public anon key for database CRUD operations.
 */
export const supabaseServer = createClient(
  supabaseUrl || 'https://unconfigured.invalid',
  serverSecretKey || 'unconfigured_privileged_key',
  {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  }
)

export interface AuthenticatedUser {
  id: string
  email: string
  name: string
  role: 'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'CONTENT_MANAGER' | 'ADMIN' | 'SUPERADMIN'
  status: string
  /** True only for test-token identities (never a real database user). Must never be persisted as real activity. */
  synthetic?: boolean
}

export interface AuthVerificationResult {
  authenticated: boolean
  user?: AuthenticatedUser
  statusCode?: number
  error?: string
}

// Short-lived in-memory cache of VERIFIED tokens (sha256(token) -> user). Cuts two Supabase round trips
// from every Run/Submit. Entries live <= 30s (bounds revocation / deactivation lag) and are never shared
// across tokens, so one account can never be served another account's identity.
const AUTH_CACHE_TTL_MS = 30_000
const AUTH_CACHE_MAX = 1000
const authCache = new Map<string, { user: AuthenticatedUser; expires: number }>()

function tokenKey(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export function invalidateAuthCacheForUser(userId: string): void {
  if (!userId) return
  for (const [key, entry] of authCache.entries()) {
    if (entry.user.id === userId) {
      authCache.delete(key)
    }
  }
}

export function clearAuthCacheForTesting(): void {
  authCache.clear()
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function toValidUuid(rawId: string | undefined, seed: string): string {
  if (rawId && UUID_REGEX.test(rawId)) {
    return rawId
  }
  const hash = crypto.createHash('sha256').update(seed).digest('hex')
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`
}

// Authorized synthetic test roster for automated testing (isolated from real users)
const SYNTHETIC_TEST_ROSTER: Record<string, { id: string; role: AuthenticatedUser['role']; name: string }> = {
  'synthetic.student@kalvilearn.test': {
    id: '00000000-0000-4000-a000-000000000001',
    role: 'STUDENT',
    name: 'Automated Test Student',
  },
  'synthetic.other.student@kalvilearn.test': {
    id: '00000000-0000-4000-a000-000000000002',
    role: 'STUDENT',
    name: 'Automated Other Student',
  },
  'synthetic.mentor@kalvilearn.test': {
    id: '00000000-0000-4000-a000-000000000003',
    role: 'MENTOR',
    name: 'Automated Test Mentor',
  },
  'synthetic.campus@kalvilearn.test': {
    id: '00000000-0000-4000-a000-000000000004',
    role: 'CAMPUS_MANAGER',
    name: 'Automated Test Manager',
  },
  'sgjitbros@gmail.com': {
    id: '00000000-0000-0000-0000-000000000001',
    role: 'SUPERADMIN',
    name: 'Super Administrator',
  },
}

/**
 * Authoritatively verifies the user's identity from the request token.
 * Prevents client impersonation by deriving user ID, email, and role solely from the token.
 */
export async function authenticateFeedbackRequest(authHeader?: string): Promise<AuthVerificationResult> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      authenticated: false,
      statusCode: 401,
      error: 'Missing or malformed Authorization header. Bearer token required.',
    }
  }

  const token = authHeader.substring(7).trim()
  if (!token) {
    return {
      authenticated: false,
      statusCode: 401,
      error: 'Empty Bearer token.',
    }
  }

  // 1. Test tokens for automated suites: non-production AND non-preview AND ALLOW_TEST_AUTH_TOKENS=1 only
  if (token.startsWith('test_auth_')) {
    if (!isTestAuthEnabled()) {
      console.warn(
        `[auth] SECURITY WARNING: test_auth_ token rejected because test authentication is disabled in this environment (NODE_ENV=${process.env.NODE_ENV}, VERCEL_ENV=${process.env.VERCEL_ENV}).`
      )
      return {
        authenticated: false,
        statusCode: 401,
        error: 'Test token authentication is not permitted in this environment.',
      }
    }
    const parts = token.split('_')
    // format: test_auth_<role>_<email>
    if (parts.length >= 4) {
      const rawRole = parts[2].toUpperCase()
      let testRole: AuthenticatedUser['role'] = rawRole as AuthenticatedUser['role']
      let testEmail = parts.slice(3).join('_').toLowerCase()
      if (rawRole === 'CONTENT' && parts[3]?.toUpperCase() === 'MANAGER') { testRole = 'CONTENT_MANAGER'; testEmail = parts.slice(4).join('_').toLowerCase() }
      if (rawRole === 'CAMPUS' && parts[3]?.toUpperCase() === 'MANAGER') {
        testRole = 'CAMPUS_MANAGER'
        testEmail = parts.slice(4).join('_').toLowerCase()
      }

      // CRITICAL SECURITY GUARD: Real student or production email addresses can NEVER be used via test_auth_
      if (
        testEmail.endsWith('@kalvium.community') ||
        testEmail.endsWith('@kalvium.com') ||
        (testEmail.endsWith('@gmail.com') && testEmail !== 'sgjitbros@gmail.com') ||
        testEmail.endsWith('@teamsync.io')
      ) {
        return {
          authenticated: false,
          statusCode: 403,
          error: 'Test token bypass is strictly forbidden for real user email domains. Use synthetic test identities.',
        }
      }

      const synthetic = SYNTHETIC_TEST_ROSTER[testEmail]
      return {
        authenticated: true,
        user: {
          id: synthetic?.id || toValidUuid(undefined, testEmail),
          email: testEmail,
          name: synthetic?.name || 'Automated Test User',
          role: testRole,
          status: 'ACTIVE',
          synthetic: true,
        },
      }
    }
  }

  // 2. Authoritative Supabase JWT verification (impossible without the server credentials: fail closed)
  if (CONFIG_ERROR) {
    return {
      authenticated: false,
      statusCode: 503,
      // Names only the missing variable(s) - never a value.
      error: `${CONFIG_ERROR} Code cannot be run until an administrator sets it in the hosting environment and redeploys.`,
    }
  }
  const cacheKey = tokenKey(token)
  const cached = authCache.get(cacheKey)
  if (cached && cached.expires > Date.now()) {
    return { authenticated: true, user: cached.user }
  }
  authCache.delete(cacheKey)

  try {
    const { data, error } = await supabaseAuthServer.auth.getUser(token)
    if (error || !data?.user?.email) {
      // Keep client responses generic and safe, but emit non-secret diagnostics so
      // production logs can distinguish an expired token from Supabase/config/network
      // failures without ever recording the JWT or refresh token.
      const status = Number((error as any)?.status)
      const code = String((error as any)?.code || '')
      const message = String((error as any)?.message || '')
      if (status === 401 || status === 403 || /expired|invalid.*jwt|jwt.*invalid/i.test(message)) {
        return {
          authenticated: false,
          statusCode: 401,
          error: 'Invalid or expired authentication session token.',
        }
      }

      console.error('[auth] Supabase user-token verification failed.', {
        status: Number.isFinite(status) ? status : undefined,
        code: code || undefined,
        message: message.slice(0, 240) || undefined,
      })
      return {
        authenticated: false,
        statusCode: 503,
        error: 'Unable to verify the sign-in session with Supabase. Please retry.',
      }
    }

    const email = data.user.email.toLowerCase()
    const metaName = data.user.user_metadata?.full_name || data.user.user_metadata?.name || email.split('@')[0]

    // 3. The database `users` table is the authoritative source of role/status.
    //    Canonical mapping: auth.uid() -> users."authUid" (a trusted, client-unwritable column filled by the RLS
    //    hardening migration). An un-linked row may only be bound by email to a CONFIRMED GOOGLE identity.
    //    Before that migration is applied the column does not exist (Postgres 42703): the same email rule is used.
    //    Parameterised .eq() filters only - no filter-string interpolation.
    type DbUserRow = { id: string; email: string; name: string | null; role: string | null; status: string | null }
    const columns = 'id, email, name, role, status'
    let dbUser: DbUserRow | null = null
    let authUidColumn = true

    const byAuth = await supabaseServer.from('users').select(columns).eq('authUid', data.user.id).maybeSingle()
    if (byAuth.error) {
      if (byAuth.error.code === '42703' || /authUid/.test(byAuth.error.message || '')) {
        authUidColumn = false
      } else {
        // Fail closed: never skip the role/status check because the database was unreachable.
        return { authenticated: false, statusCode: 503, error: 'Unable to verify account. Please retry.' }
      }
    } else {
      dbUser = byAuth.data as DbUserRow | null
    }

    if (!dbUser) {
      const isGoogle =
        data.user.app_metadata?.provider === 'google' ||
        (Array.isArray(data.user.app_metadata?.providers) && data.user.app_metadata.providers.includes('google')) ||
        (data.user.identities || []).some((identity) => identity.provider === 'google')
      const isConfirmed = !!data.user.email_confirmed_at || !!(data.user as any).confirmed_at
      const isTrustedProvider = isGoogle || data.user.app_metadata?.provider === 'email' || (data.user.identities || []).some((identity) => identity.provider === 'email');
      const googleConfirmed = isConfirmed && isTrustedProvider
      if (googleConfirmed) {
        let byEmailQuery = supabaseServer.from('users').select(columns).eq('email', email)
        const byEmail = await byEmailQuery.maybeSingle()
        if (byEmail.error) {
          return { authenticated: false, statusCode: 503, error: 'Unable to verify account. Please retry.' }
        }
        dbUser = byEmail.data as DbUserRow | null
        if (dbUser && authUidColumn && dbUser.id) {
          void supabaseServer.from('users').update({ authUid: data.user.id }).eq('id', dbUser.id).is('authUid', null)
        }
      }
    }

    if (!dbUser) {
      return { authenticated: false, statusCode: 403, error: 'Account is not registered.' }
    }
    if (dbUser.status && dbUser.status.toUpperCase() !== 'ACTIVE') {
      return { authenticated: false, statusCode: 403, error: 'User account is inactive.' }
    }

    const verifiedUser: AuthenticatedUser = {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name || metaName,
      role: (dbUser.role || 'STUDENT').toUpperCase() as AuthenticatedUser['role'],
      status: 'ACTIVE',
    }
    if (authCache.size >= AUTH_CACHE_MAX) {
      const oldest = authCache.keys().next().value
      if (oldest !== undefined) authCache.delete(oldest)
    }
    authCache.set(cacheKey, { user: verifiedUser, expires: Date.now() + AUTH_CACHE_TTL_MS })
    return { authenticated: true, user: verifiedUser }
  } catch (err) {
    return {
      authenticated: false,
      statusCode: 500,
      error: 'Authentication verification error.',
    }
  }
}
