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

/**
 * Verifies if an email exists in the database 'users' table and is ACTIVE.
 * Implements the architecture diagram flow:
 * Google returns user -> Supabase Auth -> Query 'users' table -> EXISTS (ALLOW) | NOT EXISTS (ACCESS DENIED)
 */
export async function verifyUserInDatabase(rawEmail: string): Promise<VerificationResult> {
  if (!rawEmail) {
    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  }

  const normalizedEmail = rawEmail.trim().toLowerCase()

  try {
    // 1. Query database 'users' table via Supabase PostgREST
    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, status, name')
      .ilike('email', normalizedEmail)
      .maybeSingle()

    if (error) {
      console.warn('Database query error on users table:', error.message)
      // If table query threw an error, check fallback whitelist
      if (AUTHORIZED_FALLBACK_EMAILS.includes(normalizedEmail)) {
        return {
          allowed: true,
          user: {
            id: 'local_' + normalizedEmail,
            email: normalizedEmail,
            role: 'STUDENT',
            status: 'ACTIVE',
            name: normalizedEmail.split('@')[0].replace(/\./g, ' ').toUpperCase(),
          },
        }
      }
      return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
    }

    // 2. Check if record exists
    if (!data) {
      console.warn(`Access Denied: Email ${normalizedEmail} does not exist in users table.`)
      return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
    }

    // 3. Check status
    if (data.status !== 'ACTIVE') {
      console.warn(`Access Denied: Email ${normalizedEmail} status is ${data.status}.`)
      return { allowed: false, reason: 'ACCOUNT_INACTIVE' }
    }

    return {
      allowed: true,
      user: data as DbUser,
    }
  } catch (err) {
    console.error('Unexpected error during user verification:', err)
    if (AUTHORIZED_FALLBACK_EMAILS.includes(normalizedEmail)) {
      return {
        allowed: true,
        user: {
          id: 'fallback_' + normalizedEmail,
          email: normalizedEmail,
          role: 'STUDENT',
          status: 'ACTIVE',
        },
      }
    }
    return { allowed: false, reason: 'ACCOUNT_NOT_REGISTERED' }
  }
}

/**
 * Sign out and purge local user session
 */
export async function signOutUser() {
  try {
    await supabase.auth.signOut()
  } catch (err) {
    console.error('Error during signOut:', err)
  } finally {
    localStorage.removeItem('kalvi_active_user')
  }
}
