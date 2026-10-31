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
 * Helper to initiate Google OAuth sign-in via Supabase
 */
export async function signInWithGoogle(redirectTo?: string) {
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : env.VITE_APP_URL || 'https://kalvilearn.vercel.app'

  const callbackUrl = redirectTo || `${origin}/auth/callback`

  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
    },
  })
}
