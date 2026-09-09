/**
 * Database Diagnostic and Health Check with Strict 10s Timeouts
 */

import { supabaseServer } from '../src/server/feedbackAuth'

interface QueryAuditResult {
  table: string
  elapsedMs: number
  success: boolean
  timedOut: boolean
  rowCount?: number
  error?: string
  code?: string
  sample?: any
}

async function runTimedQuery(
  tableName: string,
  queryFn: () => Promise<any>,
  timeoutMs = 10000
): Promise<QueryAuditResult> {
  const start = Date.now()
  let timeoutId: any

  const timeoutPromise = new Promise<{ timedOut: true }>((resolve) => {
    timeoutId = setTimeout(() => resolve({ timedOut: true }), timeoutMs)
  })

  try {
    const result = await Promise.race([queryFn(), timeoutPromise])
    clearTimeout(timeoutId)
    const elapsedMs = Date.now() - start

    if ('timedOut' in result && result.timedOut) {
      return {
        table: tableName,
        elapsedMs,
        success: false,
        timedOut: true,
        error: `Query timed out after ${timeoutMs}ms`,
      }
    }

    const { data, error } = result
    if (error) {
      return {
        table: tableName,
        elapsedMs,
        success: false,
        timedOut: false,
        error: error.message,
        code: error.code,
      }
    }

    return {
      table: tableName,
      elapsedMs,
      success: true,
      timedOut: false,
      rowCount: Array.isArray(data) ? data.length : data ? 1 : 0,
      sample: Array.isArray(data) ? data.slice(0, 3) : data,
    }
  } catch (err: any) {
    clearTimeout(timeoutId)
    const elapsedMs = Date.now() - start
    return {
      table: tableName,
      elapsedMs,
      success: false,
      timedOut: false,
      error: err.message || 'Unknown query error',
    }
  }
}

async function auditDatabaseHealth() {
  console.log('========================================================================')
  console.log('🔍 KALVILEARN LIVE DATABASE HEALTH & TIMEOUT AUDIT')
  console.log('========================================================================\n')

  const results: QueryAuditResult[] = []

  // 1. Connection Ping (Smallest query: 1 row from users)
  console.log('1. Testing basic connection (ping via users table)...')
  const ping = await runTimedQuery('users (ping)', () =>
    supabaseServer.from('users').select('id').limit(1)
  )
  results.push(ping)
  console.log(`   Ping Result: ${ping.success ? 'CONNECTED' : 'FAILED'} (${ping.elapsedMs}ms)`)

  // 2. Mentors table
  console.log('2. Auditing mentors table...')
  const mentors = await runTimedQuery('mentors', () =>
    supabaseServer.from('mentors').select('id, name, email, mentor_code, user_id, status').limit(20)
  )
  results.push(mentors)
  console.log(`   Mentors: ${mentors.success ? `FOUND ${mentors.rowCount} records` : 'FAILED'} (${mentors.elapsedMs}ms)`)

  // 3. Students table
  console.log('3. Auditing students table...')
  const students = await runTimedQuery('students', () =>
    supabaseServer.from('students').select('id, name, email, student_code, user_id, status').limit(20)
  )
  results.push(students)
  console.log(`   Students: ${students.success ? `FOUND ${students.rowCount} records` : 'FAILED'} (${students.elapsedMs}ms)`)

  // 4. Mentor-Students relations
  console.log('4. Auditing mentor_students table...')
  const mentorStudents = await runTimedQuery('mentor_students', () =>
    supabaseServer.from('mentor_students').select('id, mentor_id, student_id, status, assigned_at').limit(20)
  )
  results.push(mentorStudents)
  console.log(`   MentorStudents: ${mentorStudents.success ? `FOUND ${mentorStudents.rowCount} records` : 'FAILED'} (${mentorStudents.elapsedMs}ms)`)

  // 5. Belts table
  console.log('5. Auditing belts table...')
  const belts = await runTimedQuery('Belt', () =>
    supabaseServer.from('Belt').select('id, order, name, title').limit(10)
  )
  results.push(belts)
  console.log(`   Belts: ${belts.success ? `FOUND ${belts.rowCount} records` : 'FAILED'} (${belts.elapsedMs}ms)`)

  // 6. Problems table
  console.log('6. Auditing problems table...')
  const problems = await runTimedQuery('Problem', () =>
    supabaseServer.from('Problem').select('id, slug, title, difficulty').limit(10)
  )
  results.push(problems)
  console.log(`   Problems: ${problems.success ? `FOUND ${problems.rowCount} records` : 'FAILED'} (${problems.elapsedMs}ms)`)

  // 7. Submissions table
  console.log('7. Auditing submissions table...')
  const submissions = await runTimedQuery('Submission', () =>
    supabaseServer.from('Submission').select('id, status, language').limit(10)
  )
  results.push(submissions)
  console.log(`   Submissions: ${submissions.success ? `FOUND ${submissions.rowCount} records` : 'FAILED'} (${submissions.elapsedMs}ms)`)

  // 8. UserProgress table
  console.log('8. Auditing user_progress table...')
  const userProgress = await runTimedQuery('UserProgress', () =>
    supabaseServer.from('UserProgress').select('id, status, xpEarned').limit(10)
  )
  results.push(userProgress)
  console.log(`   UserProgress: ${userProgress.success ? `FOUND ${userProgress.rowCount} records` : 'FAILED'} (${userProgress.elapsedMs}ms)`)

  // 9. Feedback Reports table
  console.log('9. Auditing feedback_reports table...')
  const feedback = await runTimedQuery('feedback_reports', () =>
    supabaseServer.from('feedback_reports').select('id, public_reference, status, type').limit(10)
  )
  results.push(feedback)
  console.log(`   Feedback Reports: ${feedback.success ? `FOUND ${feedback.rowCount} records` : 'FAILED'} (${feedback.elapsedMs}ms)`)

  // 10. Webhook Inbound Events table
  console.log('10. Auditing teamsync_webhook_events table...')
  const webhookEvents = await runTimedQuery('teamsync_webhook_events', () =>
    supabaseServer.from('teamsync_webhook_events').select('id, event_id, status').limit(10)
  )
  results.push(webhookEvents)
  console.log(`   Inbound Webhooks: ${webhookEvents.success ? `FOUND ${webhookEvents.rowCount} records` : 'FAILED'} (${webhookEvents.elapsedMs}ms)`)

  // 11. Webhook Outbound Deliveries table
  console.log('11. Auditing teamsync_webhook_deliveries table...')
  const deliveries = await runTimedQuery('teamsync_webhook_deliveries', () =>
    supabaseServer.from('teamsync_webhook_deliveries').select('id, event_id, status').limit(10)
  )
  results.push(deliveries)
  console.log(`   Outbound Deliveries: ${deliveries.success ? `FOUND ${deliveries.rowCount} records` : 'FAILED'} (${deliveries.elapsedMs}ms)`)

  console.log('\n========================================================================')
  console.log('📊 DATABASE DIAGNOSTIC AUDIT SUMMARY')
  console.log('========================================================================')
  for (const r of results) {
    const icon = r.success ? '✅' : r.timedOut ? '⏱️' : '❌'
    const status = r.success ? `PASS (${r.rowCount} rows)` : r.timedOut ? 'TIMEOUT WARNING' : `FAIL (${r.error})`
    console.log(`${icon} [${r.table}]: ${status} — ${r.elapsedMs}ms`)
  }
}

auditDatabaseHealth().catch((err) => {
  console.error('Diagnostic error:', err)
  process.exit(1)
})
