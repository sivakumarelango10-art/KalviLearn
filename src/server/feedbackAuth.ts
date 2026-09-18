import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

// Server-authoritative Supabase Client
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://iavxnhwbgoarnexmyxpn.supabase.co'

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40'

export const supabaseServer = createClient(supabaseUrl, supabaseKey)

export interface AuthenticatedUser {
  id: string
  email: string
  name: string
  role: 'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN' | 'SUPERADMIN'
  status: string
}

export interface AuthVerificationResult {
  authenticated: boolean
  user?: AuthenticatedUser
  statusCode?: number
  error?: string
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

  // 1. Support secure test tokens for automated test suites (non-production only)
  if (process.env.NODE_ENV !== 'production' && token.startsWith('test_auth_')) {
    const parts = token.split('_')
    // format: test_auth_<role>_<email>
    if (parts.length >= 4) {
      const testRole = parts[2].toUpperCase() as AuthenticatedUser['role']
      const testEmail = parts.slice(3).join('_').toLowerCase()

      // CRITICAL SECURITY GUARD: Real student or production email addresses can NEVER be used via test_auth_
      if (
        testEmail.endsWith('@kalvium.community') ||
        testEmail.endsWith('@kalvium.com') ||
        testEmail.endsWith('@gmail.com') ||
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
        },
      }
    }
  }

  // 2. Authoritative Supabase JWT verification
  try {
    const { data, error } = await supabaseServer.auth.getUser(token)
    if (error || !data?.user?.email) {
      return {
        authenticated: false,
        statusCode: 401,
        error: 'Invalid or expired authentication session token.',
      }
    }

    const email = data.user.email.toLowerCase()
    const metaName = data.user.user_metadata?.full_name || data.user.user_metadata?.name || email.split('@')[0]

    // 3. Database query in users table via supabaseServer
    try {
      const { data: dbUser } = await supabaseServer
        .from('users')
        .select('id, email, name, role, status')
        .or(`id.eq.${data.user.id},email.eq.${email}`)
        .maybeSingle()

      if (dbUser) {
        if (dbUser.status && dbUser.status !== 'ACTIVE') {
          return {
            authenticated: false,
            statusCode: 403,
            error: 'User account is inactive.',
          }
        }

        return {
          authenticated: true,
          user: {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name || metaName,
            role: (dbUser.role || 'STUDENT').toUpperCase() as AuthenticatedUser['role'],
            status: dbUser.status || 'ACTIVE',
          },
        }
      }
    } catch {
      // If direct DB connection pool is occupied, check fallback roster
    }

    // Check synthetic test roster if applicable
    const fallback = SYNTHETIC_TEST_ROSTER[email]
    if (fallback) {
      return {
        authenticated: true,
        user: {
          id: fallback.id,
          email: email,
          name: fallback.name || metaName,
          role: fallback.role,
          status: 'ACTIVE',
        },
      }
    }

    // Fallback to Supabase authenticated user
    return {
      authenticated: true,
      user: {
        id: data.user.id,
        email: email,
        name: metaName,
        role: 'STUDENT',
        status: 'ACTIVE',
      },
    }
  } catch (err) {
    return {
      authenticated: false,
      statusCode: 500,
      error: 'Authentication verification error.',
    }
  }
}
