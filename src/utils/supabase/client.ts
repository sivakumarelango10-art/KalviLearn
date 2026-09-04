import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://iavxnhwbgoarnexmyxpn.supabase.co'

const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40'

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  )

export const supabase = createClient()
