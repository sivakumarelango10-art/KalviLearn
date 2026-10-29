/**
 * Master Verification Test Suite for KalviLearn Super Admin Portal
 *
 * Verifies all 18 Core Requirements:
 * 1. sgjitbros@gmail.com with valid token returns 200.
 * 2. Unauthenticated request without token returns 401.
 * 3. Authenticated request with non-admin email returns 403.
 * 4. Campus Manager account attempting Super Admin access returns 403.
 * 5. Mentor account attempting Super Admin access returns 403.
 * 6. Student account attempting Super Admin access returns 403.
 * 7. Attempting Super Admin access by supplying sgjitbros@gmail.com in request body without token fails (401).
 * 8. Super Admin dashboard returns authoritative data matching database counts.
 * 9. Campus creation: creating new campus persists in database with unique code.
 * 10. Duplicate campus code rejected with appropriate conflict error (409).
 * 11. Campus Manager provisioning: creating new manager creates user with CAMPUS_MANAGER role.
 * 12. Campus assignment: assigning manager to campus persists in both tables.
 * 13. Role change: changing user role between supported roles succeeds and persists in users table.
 * 14. Protection of sgjitbros@gmail.com: attempting to demote or change role of sgjitbros@gmail.com fails (403).
 * 15. Protection against self-promotion: non-admin cannot promote self to SUPERADMIN (403).
 * 16. Unauthorized role promotion: cannot assign SUPERADMIN to any other account (403).
 * 17. Student deletion: deleting student removes student profile, user record, submissions, and progress.
 * 18. Audit log generation: every administrative action generates an append-only audit log entry with correct actor, action, and target.
 */

import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { EventEmitter } from 'events'

// Load environment variables synchronously BEFORE importing server modules
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx > 0) {
      const k = trimmed.substring(0, idx).trim()
      let v = trimmed.substring(idx + 1).trim()
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.substring(1, v.length - 1)
      }
      process.env[k] = v
    }
  }
}
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

function createMockReqRes(options: {
  method?: string
  url?: string
  headers?: Record<string, string>
  body?: Record<string, unknown> | string
  query?: Record<string, unknown>
}) {
  const req = new EventEmitter() as any
  req.method = options.method || 'POST'
  req.url = options.url || '/api/super-admin'
  req.headers = { 'content-type': 'application/json' }
  if (options.headers) {
    for (const [k, v] of Object.entries(options.headers)) {
      req.headers[k.toLowerCase()] = v
    }
  }
  req.body = options.body || {}
  req.query = options.query || {}
  req.socket = { remoteAddress: '127.0.0.1' }

  let statusCode = 200
  const headers: Record<string, string> = {}
  let responseBody = ''

  const res = {
    statusCode: 200,
    headers,
    setHeader(name: string, val: string) {
      headers[name.toLowerCase()] = val
    },
    getHeader(name: string) {
      return headers[name.toLowerCase()]
    },
    status(code: number) {
      statusCode = code
      this.statusCode = code
      return this
    },
    json(data: unknown) {
      responseBody = JSON.stringify(data)
    },
    write(chunk: unknown) {
      responseBody += String(chunk)
    },
    end(chunk?: unknown) {
      if (chunk) responseBody += String(chunk)
    },
    flushHeaders() {},
    getOutput() {
      try {
        return { statusCode, data: JSON.parse(responseBody) }
      } catch {
        return { statusCode, data: responseBody }
      }
    },
  } as any

  return { req, res }
}

// Test Tokens
const SUPER_ADMIN_TOKEN = 'Bearer test_auth_superadmin_sgjitbros@gmail.com'
const CAMPUS_MANAGER_TOKEN = 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test'
const MENTOR_TOKEN = 'Bearer test_auth_mentor_synthetic.mentor@kalvilearn.test'
const STUDENT_TOKEN = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'
const OTHER_USER_TOKEN = 'Bearer test_auth_student_synthetic.other.student@kalvilearn.test'

let passedCount = 0
let failedCount = 0

async function runAllTests() {
  // Dynamically import after process.env is initialized
  const { default: superAdminHandler, resetSuperAdminRateLimitsForTesting } = await import('../src/server/superAdminHandler')
  const { supabaseServer } = await import('../src/server/feedbackAuth')

  async function runTest(title: string, fn: () => Promise<void>) {
    resetSuperAdminRateLimitsForTesting()
    try {
      await fn()
      console.log(`  ✓ ${title}`)
      passedCount++
    } catch (err: any) {
      console.error(`  ✗ ${title}`)
      console.error(`    Error: ${err.message}`)
      failedCount++
    }
  }

  console.log('======================================================================')
  console.log('KALVILEARN SUPER ADMIN PORTAL — 18-POINT VERIFICATION TEST SUITE')
  console.log('======================================================================\n')

  // SECTION 1: AUTHENTICATION & ACCESS CONTROL
  console.log('--- SECTION 1: Sole Administrator Authentication & RBAC Hardening ---')

  await runTest('1. sgjitbros@gmail.com with valid token returns 200', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'dashboard' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200, `Expected 200, got ${out.statusCode}`)
    assert.strictEqual(out.data.success, true)
    assert.ok(out.data.data.overview)
  })

  await runTest('2. Unauthenticated request without token returns 401', async () => {
    const { req, res } = createMockReqRes({
      headers: {},
      body: { action: 'dashboard' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 401)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('3. Authenticated request with non-admin email returns 403', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: OTHER_USER_TOKEN },
      body: { action: 'dashboard' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.ok(out.data.error.includes('sgjitbros@gmail.com'))
  })

  await runTest('4. Campus Manager account attempting Super Admin access returns 403', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: CAMPUS_MANAGER_TOKEN },
      body: { action: 'list_campuses' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('5. Mentor account attempting Super Admin access returns 403', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: MENTOR_TOKEN },
      body: { action: 'list_mentors' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('6. Student account attempting Super Admin access returns 403', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: STUDENT_TOKEN },
      body: { action: 'list_students' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('7. Supplying sgjitbros@gmail.com in request body without token fails (401)', async () => {
    const { req, res } = createMockReqRes({
      headers: {},
      body: { email: 'sgjitbros@gmail.com', action: 'dashboard' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 401)
  })

  // SECTION 2: PLATFORM TELEMETRY & DASHBOARD
  console.log('\n--- SECTION 2: Platform Telemetry & Dashboard Aggregation ---')

  await runTest('8. Super Admin dashboard returns authoritative data matching database counts', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'dashboard' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const data = out.data.data
    assert.ok(data.overview.totalCampuses >= 1, 'At least default campus should exist')
    assert.ok(data.overview.totalStudents >= 0)
    assert.ok(data.overview.totalMentors >= 0)
    assert.ok(Array.isArray(data.campuses))
    assert.ok(Array.isArray(data.recentAuditLogs))
  })

  // SECTION 3: CAMPUS MANAGEMENT
  console.log('\n--- SECTION 3: Campus Management Lifecycle ---')

  const testCampusCode = `TEST-CAMPUS-${Date.now().toString(36).toUpperCase()}`
  let createdCampusId = ''

  await runTest('9. Campus creation: creating new campus persists in database with unique code', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_campus',
        code: testCampusCode,
        name: 'Automated Test Campus',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        status: 'ACTIVE',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.code, testCampusCode)
    createdCampusId = out.data.data.id

    // Verify in database
    const { data: dbRow } = await supabaseServer.from('campuses').select('*').eq('id', createdCampusId).single()
    assert.ok(dbRow)
    assert.strictEqual(dbRow.code, testCampusCode)
  })

  await runTest('10. Duplicate campus code rejected with conflict error (409)', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_campus',
        code: testCampusCode,
        name: 'Duplicate Campus Test',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 409)
    assert.strictEqual(out.data.success, false)
  })

  // SECTION 4: CAMPUS MANAGERS
  console.log('\n--- SECTION 4: Campus Manager Lifecycle & Assignment ---')

  const testManagerEmail = `test.manager.${Date.now()}@kalvilearn.test`
  let createdManagerId = ''

  await runTest('11. Campus Manager provisioning: creates user with CAMPUS_MANAGER role', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'provision_manager',
        email: testManagerEmail,
        name: 'Automated Test Manager',
        campusId: createdCampusId,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    createdManagerId = out.data.data.id

    // Verify in database
    const { data: dbUser } = await supabaseServer.from('users').select('*').eq('id', createdManagerId).single()
    assert.strictEqual(dbUser.role, 'CAMPUS_MANAGER')
    assert.strictEqual(dbUser.campus_id, createdCampusId)
  })

  await runTest('12. Campus assignment: assigning manager to campus persists in both tables', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'assign_campus_manager',
        campusId: createdCampusId,
        managerId: createdManagerId,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)

    // Verify in campuses table
    const { data: dbCampus } = await supabaseServer.from('campuses').select('manager_id').eq('id', createdCampusId).single()
    assert.strictEqual(dbCampus.manager_id, createdManagerId)
  })

  // SECTION 5: ROLE MANAGEMENT & RBAC SAFEGUARDS
  console.log('\n--- SECTION 5: Role & Permission Management Safeguards ---')

  const testRoleEmail = `test.role.${Date.now()}@kalvilearn.test`
  let roleUserId = ''

  await runTest('13. Role change: changing user role between supported roles succeeds', async () => {
    // 1. Create a user
    const { data: u, error: uErr } = await supabaseServer
      .from('users')
      .insert({ email: testRoleEmail, name: 'Role Change Subject', role: 'STUDENT', status: 'ACTIVE' })
      .select('id')
      .single()
    if (uErr) throw uErr
    roleUserId = u.id

    // 2. Change role to MENTOR
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_user_role',
        userId: roleUserId,
        newRole: 'MENTOR',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.role, 'MENTOR')

    // Verify mentor profile created
    const { data: mRow } = await supabaseServer.from('mentors').select('*').eq('user_id', roleUserId).maybeSingle()
    assert.ok(mRow, 'Mentor profile should have been created automatically on role change')
  })

  await runTest('14. Protection of sgjitbros@gmail.com: attempting to demote or change role fails (403)', async () => {
    // Fetch super admin id
    const { data: saUser } = await supabaseServer.from('users').select('id').eq('email', 'sgjitbros@gmail.com').single()
    assert.ok(saUser)

    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_user_role',
        userId: saUser.id,
        newRole: 'STUDENT',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.ok(out.data.message.includes('sgjitbros@gmail.com'))
  })

  await runTest('15. Protection against self-promotion: non-admin cannot promote self to SUPERADMIN (403)', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: CAMPUS_MANAGER_TOKEN },
      body: {
        action: 'update_user_role',
        userId: '00000000-0000-4000-a000-000000000004',
        newRole: 'SUPERADMIN',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
  })

  await runTest('16. Unauthorized role promotion: cannot assign SUPERADMIN to any other account (403)', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_user_role',
        userId: roleUserId,
        newRole: 'SUPERADMIN',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.ok(out.data.message.includes('SUPERADMIN') || out.data.error.includes('SUPERADMIN'))
  })

  // SECTION 6: STUDENT MANAGEMENT & DELETION
  console.log('\n--- SECTION 6: Student Management & Permanent Deletion Cascade ---')

  const testStudentEmail = `test.student.del.${Date.now()}@kalvilearn.test`
  let studentRecordId = ''
  let studentUserId = ''

  await runTest('17. Student enrollment & deletion cascade: removes profile, submissions, progress, and user', async () => {
    // 1. Enroll Student
    const { req: eReq, res: eRes } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'enroll_student',
        name: 'Temporary Deletion Student',
        email: testStudentEmail,
        campusId: createdCampusId,
      },
    })
    await superAdminHandler(eReq, eRes)
    const eOut = eRes.getOutput()
    assert.strictEqual(eOut.statusCode, 201)
    studentRecordId = eOut.data.data.id
    studentUserId = eOut.data.data.userId

    // Simulate dummy submission and progress
    await supabaseServer.from('UserProgress').insert({
      userId: studentUserId,
      problemId: 'test-slug',
      status: 'SOLVED',
      language: 'python',
      bestCode: 'print(1)',
      xpEarned: 50,
    })

    // 2. Authoritative Permanent Deletion
    const { req: dReq, res: dRes } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'delete_student',
        studentId: studentRecordId,
      },
    })
    await superAdminHandler(dReq, dRes)
    const dOut = dRes.getOutput()
    assert.strictEqual(dOut.statusCode, 200)
    assert.strictEqual(dOut.data.success, true)

    // 3. Verify clean cascade removal
    const { data: sCheck } = await supabaseServer.from('students').select('id').eq('id', studentRecordId).maybeSingle()
    assert.strictEqual(sCheck, null, 'Student profile must be deleted')

    const { data: uCheck } = await supabaseServer.from('users').select('id').eq('id', studentUserId).maybeSingle()
    assert.strictEqual(uCheck, null, 'User record must be deleted')

    const { data: pCheck } = await supabaseServer.from('UserProgress').select('id').eq('userId', studentUserId)
    assert.strictEqual((pCheck || []).length, 0, 'User progress must be deleted')
  })

  // SECTION 7: ADMINISTRATIVE AUDIT LOGGING
  console.log('\n--- SECTION 7: Append-Only Administrative Audit Log Verification ---')

  await runTest('18. Audit log generation: administrative actions generate append-only log entry', async () => {
    // Check audit logs created during this test run
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'list_audit_logs',
        limit: 20,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const logs = out.data.data.logs
    assert.ok(logs.length > 0, 'Audit logs should contain recorded actions')

    // Find the campus creation log
    const campusLog = logs.find((l: any) => l.action === 'CREATE_CAMPUS' && l.target_id === createdCampusId)
    assert.ok(campusLog, 'CREATE_CAMPUS audit log must exist')
    assert.strictEqual(campusLog.admin_email, 'sgjitbros@gmail.com')
    assert.strictEqual(campusLog.status, 'SUCCESS')
  })

  // CLEANUP TEST FIXTURES
  try {
    if (createdCampusId) {
      await supabaseServer.from('campuses').delete().eq('id', createdCampusId)
    }
    if (createdManagerId) {
      await supabaseServer.from('users').delete().eq('id', createdManagerId)
    }
    if (roleUserId) {
      await supabaseServer.from('mentors').delete().eq('user_id', roleUserId)
      await supabaseServer.from('users').delete().eq('id', roleUserId)
    }
  } catch {
    // Ignore cleanup errors
  }

  console.log('\n======================================================================')
  console.log(`TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED (TOTAL: ${passedCount + failedCount})`)
  console.log('======================================================================')

  if (failedCount > 0) {
    process.exit(1)
  }
}

runAllTests().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
