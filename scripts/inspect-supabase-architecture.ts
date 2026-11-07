/**
 * Safe Audit of Actual Supabase Database Architecture
 *
 * Inspects:
 * - Problem
 * - LearningUnit
 * - Module
 * - TestCase
 * - Belt
 *
 * Discovers columns, nullability, row counts, and structural mismatches.
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

const TABLES = ['Problem', 'LearningUnit', 'Module', 'TestCase', 'Belt', 'ProblemExample', 'ProblemTestCase', 'ProblemStarterCode', 'ProblemRevision']

async function auditTable(tableName: string) {
  try {
    const res: any = await withTimeout(
      client.from(tableName).select('*', { count: 'exact' }).limit(3)
    )

    if (res.error) {
      return {
        table: tableName,
        exists: false,
        error: res.error.message,
        code: res.error.code,
      }
    }

    const columns = res.data && res.data.length > 0 ? Object.keys(res.data[0]) : []
    const sample = res.data && res.data.length > 0 ? res.data[0] : null
    return {
      table: tableName,
      exists: true,
      count: res.count,
      columns,
      sampleTypes: sample ? Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, v === null ? 'null' : typeof v])) : {},
      sampleRows: res.data,
    }
  } catch (err: any) {
    return {
      table: tableName,
      exists: false,
      error: err.message,
    }
  }
}

async function runAudit() {
  console.log('========================================================================')
  console.log('🔍 KALVILEARN — LIVE DATABASE ARCHITECTURE AUDIT')
  console.log(`Connecting to: ${new URL(supabaseUrl).host}`)
  console.log('========================================================================\n')

  for (const t of TABLES) {
    const result = await auditTable(t)
    if (!result.exists) {
      console.log(`❌ Table "${t}": NOT ACCESSIBLE OR DOES NOT EXIST (${result.error})`)
    } else {
      console.log(`✅ Table "${t}": EXISTS | Total rows: ${result.count}`)
      console.log(`   Columns (${result.columns.length}): ${result.columns.join(', ')}`)
      console.log(`   Types: ${JSON.stringify(result.sampleTypes)}`)
      if (t === 'Problem' && result.sampleRows && result.sampleRows.length > 0) {
        console.log(`   Sample Problem row [0] preview (safe keys only):`)
        const p = result.sampleRows[0]
        console.log(`     id: ${p.id}`)
        console.log(`     slug: ${p.slug}`)
        console.log(`     title: ${p.title}`)
        console.log(`     difficulty: ${p.difficulty}`)
        console.log(`     beltId: ${p.beltId}`)
        console.log(`     learningUnitId: ${p.learningUnitId}`)
        console.log(`     order: ${p.order}`)
        console.log(`     examples type: ${Array.isArray(p.examples) ? `Array(${p.examples.length})` : typeof p.examples}`)
        console.log(`     starterCodes keys: ${p.starterCodes ? Object.keys(p.starterCodes).join(', ') : 'null'}`)
        console.log(`     isActive field in record? ${'isActive' in p ? p.isActive : 'MISSING'}`)
        console.log(`     status field in record? ${'status' in p ? p.status : 'MISSING'}`)
      }
    }
    console.log('------------------------------------------------------------------------')
  }
}

runAudit()

