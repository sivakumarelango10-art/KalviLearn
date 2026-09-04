import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://iavxnhwbgoarnexmyxpn.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
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
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo || `${origin}/login`,
    },
  })
}
