/**
 * Safe Read-Only Verification of Supabase Problem Table Schema
 *
 * Checks whether `Problem.learningUnitId` exists in the connected database.
 * Uses a strict 15-second timeout.
 * Does NOT print any secrets, tokens, or credentials.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://iavxnhwbgoarnexmyxpn.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40'

const client = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
})

const TIMEOUT_MS = 15000

function withTimeout<T>(promise: Promise<T>, timeoutMs = TIMEOUT_MS): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    ),
  ])
}

async function verifyProblemSchema() {
  console.log('--- Checking Supabase "Problem" table for learningUnitId ---')
  console.log(`Connecting to URL host: ${new URL(supabaseUrl).host}`)
  const startTime = Date.now()

  try {
    const res: any = await withTimeout(
      client
        .from('Problem')
        .select('id, learningUnitId, beltId')
        .limit(1)
    )

    const elapsed = Date.now() - startTime
    if (res.error) {
      console.log(`[STATUS] Query returned error in ${elapsed}ms:`)
      console.log(`  Code: ${res.error.code}`)
      console.log(`  Message: ${res.error.message}`)
      console.log(`  Details: ${res.error.details || 'none'}`)
      console.log(`  Hint: ${res.error.hint || 'none'}`)
      if (
        res.error.message?.includes('learningUnitId') ||
        res.error.code === '42703' ||
        res.error.message?.includes('schema cache') ||
        res.error.message?.includes('column Problem.learningUnitId does not exist')
      ) {
        console.log('\n[RESULT] CONFIRMED: column Problem.learningUnitId DOES NOT EXIST in the connected database.')
        console.log('The migration 20261104_problem_learning_unit_relation has NOT been applied to this Supabase project.')
      }
    } else {
      console.log(`[STATUS] Query succeeded in ${elapsed}ms!`)
      console.log(`  Records returned: ${res.data?.length ?? 0}`)
      if (res.data && res.data.length > 0) {
        console.log(`  Columns found: ${Object.keys(res.data[0]).join(', ')}`)
      }
      console.log('\n[RESULT] CONFIRMED: column Problem.learningUnitId EXISTS in the connected database.')
    }
  } catch (err: any) {
    const elapsed = Date.now() - startTime
    console.log(`[ERROR] Connection or timeout error in ${elapsed}ms: ${err.message || err}`)
  }
}

verifyProblemSchema()
