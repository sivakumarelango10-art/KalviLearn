import { createClient } from '@supabase/supabase-js'

const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || (typeof process !== 'undefined' && process.env) || {}

const supabaseUrl =
  env.VITE_SUPABASE_URL ||
  'https://iavxnhwbgoarnexmyxpn.supabase.co'

const supabaseAnonKey =
  env.VITE_SUPABASE_ANON_KEY ||
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40'

/**
 * Singleton Supabase client instance configured for Kalvi Learn
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

/**
 * Authoritative constants and explicit redirect allowlist for KalviLearn authentication.
 * Prevents open-redirect vulnerabilities while seamlessly supporting both local development
 * (ports 5174, 5173, 4173) and production (kalvilearn.vercel.app).
 */
export const DEFAULT_PRODUCTION_URL = 'https://kalvilearn.vercel.app'
export const DEFAULT_PRODUCTION_CALLBACK = `${DEFAULT_PRODUCTION_URL}/auth/callback`

export const ALLOWED_AUTH_ORIGINS = [
  'https://kalvilearn.vercel.app',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
] as const

/**
 * Validates whether an origin is in the authorized authentication allowlist.
 */
export function isAllowedAuthOrigin(rawOrigin: string | undefined | null): boolean {
  if (!rawOrigin || typeof rawOrigin !== 'string') return false
  try {
    const parsed = new URL(rawOrigin.trim())
    const normalized = parsed.origin

    // 1. Exact match against known static origins
    if ((ALLOWED_AUTH_ORIGINS as readonly string[]).includes(normalized)) {
      return true
    }

    // 2. Explicitly configured app URL from environment
    const configuredAppUrl =
      env.VITE_APP_URL || (typeof process !== 'undefined' ? process.env.VITE_APP_URL : undefined)
    if (configuredAppUrl) {
      try {
        if (new URL(configuredAppUrl.trim()).origin === normalized) {
          return true
        }
      } catch {}
    }

    // 3. Vercel preview environments (*.vercel.app)
    if (parsed.protocol === 'https:' && parsed.hostname.endsWith('.vercel.app')) {
      return true
    }

    return false
  } catch {
    return false
  }
}

/**
 * Resolves an environment-aware, allowlisted OAuth callback URL.
 * Never accepts unvalidated or arbitrary redirect URLs from user input.
 */
export function getAuthCallbackUrl(requestedRedirect?: string): string {
  // If an explicit redirect was requested, validate it strictly
  if (requestedRedirect && typeof requestedRedirect === 'string') {
    const trimmed = requestedRedirect.trim()
    try {
      // Relative path redirect (e.g. '/auth/callback' or '/dashboard')
      if (trimmed.startsWith('/')) {
        const currentOrigin =
          typeof window !== 'undefined' && window.location?.origin && isAllowedAuthOrigin(window.location.origin)
            ? window.location.origin
            : DEFAULT_PRODUCTION_URL
        return `${currentOrigin}${trimmed}`
      }

      // Absolute URL redirect
      const parsed = new URL(trimmed)
      if (isAllowedAuthOrigin(parsed.origin)) {
        return parsed.toString()
      } else {
        console.warn(`[auth] Requested redirect URL "${trimmed}" origin not in allowlist. Falling back to safe callback.`)
      }
    } catch {
      console.warn(`[auth] Invalid redirect URL format "${trimmed}". Falling back to safe callback.`)
    }
  }

  // Determine active environment origin
  let activeOrigin: string | null = null

  if (typeof window !== 'undefined' && window.location?.origin) {
    if (isAllowedAuthOrigin(window.location.origin)) {
      activeOrigin = window.location.origin
    }
  }

  if (!activeOrigin && env.VITE_APP_URL) {
    if (isAllowedAuthOrigin(env.VITE_APP_URL)) {
      activeOrigin = new URL(env.VITE_APP_URL.trim()).origin
    }
  }

  if (activeOrigin) {
    return `${activeOrigin.replace(/\/+$/, '')}/auth/callback`
  }

  return DEFAULT_PRODUCTION_CALLBACK
}

/**
 * Helper to initiate Google OAuth sign-in via Supabase
 */
export async function signInWithGoogle(redirectTo?: string) {
  const callbackUrl = getAuthCallbackUrl(redirectTo)

  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
    },
  })
}
