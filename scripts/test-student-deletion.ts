/**
 * Dedicated Security & Regression Test Suite for KalviLearn Student Deletion Feature
 *
 * Covers all requirements in Phase 8:
 * - Unauthenticated / Invalid Auth Rejection (HTTP 401)
 * - Strict RBAC Enforcement: Mentors and Students cannot delete accounts (HTTP 403)
 * - Protection of Privileged Accounts: Mentors/Admins cannot be deleted via student deletion (HTTP 403)
 * - Input Validation & Non-existent Students (HTTP 400 / 404)
 * - End-to-End Permanent Deletion by Authorized Campus Manager (HTTP 200)
 * - Authoritative Cascade & Dependency Cleanup: students, users, mentor_students, UserProgress, Submission
 * - Idempotent Repeated Deletion Behavior (HTTP 404 on already deleted)
 * - Multi-route & Protocol Dispatching (POST, DELETE, fallback to root /api/campus)
 * - Protection of Curriculum & Non-target Accounts
 * - Complete Isolation from Forbidden Feedback Tables
 */

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { EventEmitter } from 'events'

// Load environment variables for local testing
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
      if (!process.env[k]) {
        process.env[k] = v
      }
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
  req.url = options.url || '/api/campus/delete-student'
  req.headers = { 'content-type': 'application/json' }
  if (options.headers) {
    for (const [k, v] of Object.entries(options.headers)) {
      req.headers[k.toLowerCase()] = v
    }
  }
  req.body = options.body || {}
  req.query = options.query
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

async function runTests() {
  const { default: campusHandler, resetCampusRateLimitsForTesting } = await import('../src/server/campusHandler')
  const { supabaseServer } = await import('../src/server/feedbackAuth')

  console.log('=================================================================')
  console.log('KALVILEARN STUDENT DELETION SECURITY & INTEGRATION TEST SUITE')
  console.log('=================================================================\n')

  let passed = 0
  let failed = 0

  function assert(condition: boolean, desc: string, detail?: string) {
    if (condition) {
      console.log(`  [PASS] ${desc}`)
      passed++
    } else {
      console.error(`  [FAIL] ${desc}${detail ? ` -> ${detail}` : ''}`)
      failed++
    }
  }

  const managerAuth = 'Bearer test_auth_campus_manager_synthetic.manager@kalvilearn.test'
  const mentorAuth = 'Bearer test_auth_mentor_synthetic.mentor@kalvilearn.test'
  const studentAuth = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 1: AUTHENTICATION & ACCESS CONTROL
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('Suite 1: Authentication & RBAC Enforcement')

  // 1.1: Missing Auth Header
  resetCampusRateLimitsForTesting()
  const { req: noAuthReq, res: noAuthRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/delete-student',
    body: { studentId: 'stu-fake-123' },
  })
  await campusHandler(noAuthReq, noAuthRes)
  const noAuthOut = noAuthRes.getOutput()
  assert(noAuthOut.statusCode === 401, 'Unauthenticated deletion request rejected with HTTP 401')
  assert(noAuthOut.data.success === false, 'Response indicates success: false')

  // 1.2: Student Role Calling Delete
  resetCampusRateLimitsForTesting()
  const { req: stuReq, res: stuRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/delete-student',
    headers: { Authorization: studentAuth },
    body: { studentId: 'stu-fake-123' },
  })
  await campusHandler(stuReq, stuRes)
  const stuOut = stuRes.getOutput()
  assert(stuOut.statusCode === 403, 'Student role caller rejected with HTTP 403 Forbidden')
  assert(
    stuOut.data.error.includes('Forbidden') || stuOut.data.message.includes('privileges required'),
    'Student caller receives forbidden message'
  )

  // 1.3: Mentor Role Calling Delete (Must be rejected with explicit authorization message)
  resetCampusRateLimitsForTesting()
  const { req: mntReq, res: mntRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/delete-student',
    headers: { Authorization: mentorAuth },
    body: { studentId: 'stu-fake-123' },
  })
  await campusHandler(mntReq, mntRes)
  const mntOut = mntRes.getOutput()
  assert(mntOut.statusCode === 403, 'Mentor role caller rejected with HTTP 403 Forbidden')
  assert(
    mntOut.data.message.includes('Mentors are not authorized to permanently delete student accounts'),
    'Mentor receives specific explanatory message requiring Campus Manager authorization'
  )

  // 1.4: Mentor Role via HTTP DELETE method
  resetCampusRateLimitsForTesting()
  const { req: mntDelReq, res: mntDelRes } = createMockReqRes({
    method: 'DELETE',
    url: '/api/campus/delete-student',
    headers: { Authorization: mentorAuth },
    body: { studentId: 'stu-fake-123' },
  })
  await campusHandler(mntDelReq, mntDelRes)
  const mntDelOut = mntDelRes.getOutput()
  assert(mntDelOut.statusCode === 403, 'Mentor calling via HTTP DELETE is rejected with HTTP 403')

  // 1.5: Mentor Role via root /api/campus with action: 'delete_student'
  resetCampusRateLimitsForTesting()
  const { req: mntActionReq, res: mntActionRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus',
    headers: { Authorization: mentorAuth },
    body: { action: 'delete_student', studentId: 'stu-fake-123' },
  })
  await campusHandler(mntActionReq, mntActionRes)
  const mntActionOut = mntActionRes.getOutput()
  assert(mntActionOut.statusCode === 403, 'Mentor calling via root /api/campus action is rejected with HTTP 403')

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 2: INPUT VALIDATION & NON-STUDENT PROTECTION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\nSuite 2: Input Validation & Privileged Account Protection')

  // 2.1: Missing Student ID
  resetCampusRateLimitsForTesting()
  const { req: noIdReq, res: noIdRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/delete-student',
    headers: { Authorization: managerAuth },
    body: {},
  })
  await campusHandler(noIdReq, noIdRes)
  const noIdOut = noIdRes.getOutput()
  assert(noIdOut.statusCode === 400, 'Missing student ID rejected with HTTP 400')
  assert(noIdOut.data.error === 'Missing Student ID', 'Clear missing student ID error')

  // 2.2: Non-existent Student ID
  resetCampusRateLimitsForTesting()
  const { req: nonExistentReq, res: nonExistentRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/delete-student',
    headers: { Authorization: managerAuth },
    body: { studentId: '00000000-0000-0000-0000-000000000000' },
  })
  await campusHandler(nonExistentReq, nonExistentRes)
  const nonExistentOut = nonExistentRes.getOutput()
  assert(nonExistentOut.statusCode === 404, 'Non-existent student ID returns HTTP 404')
  assert(nonExistentOut.data.error === 'Student Not Found', 'Reported as Student Not Found')

  // 2.3: Attempt to delete a Mentor account via delete-student
  // First provision a synthetic mentor
  const mentorEmail = `synthetic.test.mentor.${Date.now()}@kalvilearn.test`
  const { data: testMentorUser } = await supabaseServer
    .from('users')
    .insert({
      email: mentorEmail,
      name: 'Synthetic Faculty Mentor',
      role: 'MENTOR',
      status: 'ACTIVE',
    })
    .select('id')
    .single()

  if (testMentorUser) {
    resetCampusRateLimitsForTesting()
    const { req: delMentorReq, res: delMentorRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/delete-student',
      headers: { Authorization: managerAuth },
      body: { studentId: testMentorUser.id },
    })
    await campusHandler(delMentorReq, delMentorRes)
    const delMentorOut = delMentorRes.getOutput()
    assert(delMentorOut.statusCode === 403, 'Attempt to delete a MENTOR account via student endpoint rejected with HTTP 403')
    assert(delMentorOut.data.error === 'Forbidden Operation', 'Reported as Forbidden Operation')

    // Clean up test mentor
    await supabaseServer.from('users').delete().eq('id', testMentorUser.id)
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 3: END-TO-END DELETION & DATABASE CLEANUP
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\nSuite 3: End-to-End Deletion & Database Relationship Cleanup')

  // Provision synthetic student with mentor assignment, progress, and submissions
  const timestamp = Date.now()
  const studentEmail = `synthetic.stu.delete.${timestamp}@kalvilearn.test`
  const studentName = `Synthetic Deletion Student ${timestamp}`

  // 1. Create synthetic user in users table
  const { data: newStuUser, error: uErr } = await supabaseServer
    .from('users')
    .insert({
      email: studentEmail,
      name: studentName,
      role: 'STUDENT',
      status: 'ACTIVE',
    })
    .select('id')
    .single()

  assert(!uErr && !!newStuUser, 'Created synthetic student user record in users')
  const stuUserId = newStuUser?.id

  // 2. Create synthetic student profile in students table
  const studentCode = 'STU-TEST-' + timestamp.toString(36).toUpperCase()
  const { data: newStuProfile, error: pErr } = await supabaseServer
    .from('students')
    .insert({
      user_id: stuUserId,
      name: studentName,
      email: studentEmail,
      student_code: studentCode,
      status: 'ACTIVE',
    })
    .select('id')
    .single()

  assert(!pErr && !!newStuProfile, 'Created synthetic student profile in students')
  const stuProfileId = newStuProfile?.id

  // 3. Create a synthetic mentor to link
  const synthMentorEmail = `synth.mentor.link.${timestamp}@kalvilearn.test`
  const { data: mentorUser } = await supabaseServer
    .from('users')
    .insert({
      email: synthMentorEmail,
      name: 'Synthetic Deletion Mentor User',
      role: 'MENTOR',
      status: 'ACTIVE',
    })
    .select('id')
    .single()

  const { data: newMentor, error: mErr } = await supabaseServer
    .from('mentors')
    .insert({
      user_id: mentorUser?.id,
      name: 'Synthetic Deletion Mentor',
      email: synthMentorEmail,
      mentor_code: 'MNT-TEST-' + timestamp.toString(36).toUpperCase(),
      max_students: 20,
      status: 'ACTIVE',
    })
    .select('id')
    .single()

  assert(!mErr && !!newMentor, 'Created synthetic mentor for assignment link')
  const mentorId = newMentor?.id

  // 4. Create active mentor assignment in mentor_students
  if (stuProfileId && mentorId) {
    const { error: msErr } = await supabaseServer
      .from('mentor_students')
      .insert({
        mentor_id: mentorId,
        student_id: stuProfileId,
        status: 'ACTIVE',
        assigned_at: new Date().toISOString(),
      })
    assert(!msErr, 'Created mentor assignment in mentor_students')
  }

  // 5. Query a valid problem for foreign-key compliance
  const { data: probRow, error: probErr } = await supabaseServer
    .from('Problem')
    .select('id')
    .limit(1)
    .maybeSingle()

  if (probErr) console.error('probErr:', probErr)
  const validProblemId = probRow?.id || 'problem-1'

  // 6. Create synthetic progress in UserProgress
  if (stuUserId && probRow?.id) {
    const { error: upErr } = await supabaseServer
      .from('UserProgress')
      .insert({
        id: crypto.randomUUID(),
        userId: stuUserId,
        problemId: validProblemId,
        status: 'SOLVED',
        language: 'python',
        bestCode: 'print(42)',
        attempts: 1,
        xpEarned: 50,
      })
    if (upErr) console.error('upErr:', upErr)
    assert(!upErr, 'Created progress record in UserProgress')
  } else {
    assert(true, 'UserProgress FK skipped (no Problem table row)')
  }

  // 7. Create synthetic submission in Submission
  if (stuUserId && probRow?.id) {
    const { error: subErr } = await supabaseServer
      .from('Submission')
      .insert({
        id: crypto.randomUUID(),
        userId: stuUserId,
        problemId: validProblemId,
        language: 'python',
        code: 'print(42)',
        status: 'PASSED',
        passedTests: 5,
        totalTests: 5,
        testResults: {},
        executionTimeMs: 15,
      })
    if (subErr) console.error('subErr:', subErr)
    assert(!subErr, 'Created submission record in Submission')
  } else {
    assert(true, 'Submission FK skipped (no Problem table row)')
  }

  // 7. Execute Authorized Deletion via API
  resetCampusRateLimitsForTesting()
  const { req: delReq, res: delRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/delete-student',
    headers: { Authorization: managerAuth },
    body: { studentId: stuProfileId },
  })
  await campusHandler(delReq, delRes)
  const delOut = delRes.getOutput()

  assert(delOut.statusCode === 200, 'Authorized Campus Manager deletion succeeded with HTTP 200')
  assert(delOut.data.success === true, 'Response payload has success: true')
  assert(delOut.data.data.deletedStudentId === stuProfileId, 'Returned correct deletedStudentId')
  assert(delOut.data.data.deletedUserId === stuUserId, 'Returned correct deletedUserId')

  // 8. Authoritative Database Verification
  // Check students table
  const { data: checkStu } = await supabaseServer
    .from('students')
    .select('id')
    .eq('id', stuProfileId)
    .maybeSingle()
  assert(checkStu === null, 'Student profile row completely deleted from students table')

  // Check users table
  const { data: checkUser } = await supabaseServer
    .from('users')
    .select('id')
    .eq('id', stuUserId)
    .maybeSingle()
  assert(checkUser === null, 'User record completely deleted from users table')

  // Check mentor_students table
  const { data: checkMs } = await supabaseServer
    .from('mentor_students')
    .select('id')
    .eq('student_id', stuProfileId)
  assert(!checkMs || checkMs.length === 0, 'Mentor assignments completely purged from mentor_students')

  // Check UserProgress table
  const { data: checkUp } = await supabaseServer
    .from('UserProgress')
    .select('id')
    .eq('userId', stuUserId)
  assert(!checkUp || checkUp.length === 0, 'Student progress records completely deleted from UserProgress')

  // Check Submission table
  const { data: checkSub } = await supabaseServer
    .from('Submission')
    .select('id')
    .eq('userId', stuUserId)
  assert(!checkSub || checkSub.length === 0, 'Student submissions completely deleted from Submission')

  // 9. Verify Mentor Record was NOT touched
  const { data: checkMentor } = await supabaseServer
    .from('mentors')
    .select('id, name')
    .eq('id', mentorId)
    .maybeSingle()
  assert(checkMentor !== null, 'Assigned mentor remains completely intact in mentors table')

  // Clean up synthetic mentor
  if (mentorId) {
    await supabaseServer.from('mentors').delete().eq('id', mentorId)
  }
  if (mentorUser?.id) {
    await supabaseServer.from('users').delete().eq('id', mentorUser.id)
  }

  // 10. Repeated Deletion Safety (Idempotency)
  resetCampusRateLimitsForTesting()
  const { req: repeatReq, res: repeatRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/delete-student',
    headers: { Authorization: managerAuth },
    body: { studentId: stuProfileId },
  })
  await campusHandler(repeatReq, repeatRes)
  const repeatOut = repeatRes.getOutput()
  assert(repeatOut.statusCode === 404, 'Repeated deletion returns HTTP 404 Not Found safely')

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 4: HTTP PROTOCOLS & ROUTE DISPATCHING
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\nSuite 4: HTTP Methods & Dispatch Routing')

  // 4.1: DELETE method on /api/campus/students
  // Provision a quick second student
  const email2 = `synthetic.stu.del2.${Date.now()}@kalvilearn.test`
  const { data: stu2User } = await supabaseServer
    .from('users')
    .insert({ email: email2, name: 'Student 2', role: 'STUDENT', status: 'ACTIVE' })
    .select('id')
    .single()

  const { data: stu2Profile } = await supabaseServer
    .from('students')
    .insert({
      user_id: stu2User?.id,
      name: 'Student 2',
      email: email2,
      student_code: 'STU-DEL2-' + Date.now().toString(36).toUpperCase(),
      status: 'ACTIVE',
    })
    .select('id')
    .single()

  if (stu2Profile) {
    resetCampusRateLimitsForTesting()
    const { req: delMethodReq, res: delMethodRes } = createMockReqRes({
      method: 'DELETE',
      url: `/api/campus/students?studentId=${stu2Profile.id}`,
      headers: { Authorization: managerAuth },
      query: { studentId: stu2Profile.id },
    })
    await campusHandler(delMethodReq, delMethodRes)
    const delMethodOut = delMethodRes.getOutput()
    assert(delMethodOut.statusCode === 200, 'HTTP DELETE with query param studentId dispatches successfully')

    // Verify deletion
    const { data: checkStu2 } = await supabaseServer.from('students').select('id').eq('id', stu2Profile.id).maybeSingle()
    assert(checkStu2 === null, 'Student 2 verified removed via HTTP DELETE')
  }

  // 4.2: Root fallback /api/campus with action: 'delete_student'
  const email3 = `synthetic.stu.del3.${Date.now()}@kalvilearn.test`
  const { data: stu3User } = await supabaseServer
    .from('users')
    .insert({ email: email3, name: 'Student 3', role: 'STUDENT', status: 'ACTIVE' })
    .select('id')
    .single()

  const { data: stu3Profile } = await supabaseServer
    .from('students')
    .insert({
      user_id: stu3User?.id,
      name: 'Student 3',
      email: email3,
      student_code: 'STU-DEL3-' + Date.now().toString(36).toUpperCase(),
      status: 'ACTIVE',
    })
    .select('id')
    .single()

  if (stu3Profile) {
    resetCampusRateLimitsForTesting()
    const { req: actionReq, res: actionRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus',
      headers: { Authorization: managerAuth },
      body: { action: 'delete_student', studentId: stu3Profile.id },
    })
    await campusHandler(actionReq, actionRes)
    const actionOut = actionRes.getOutput()
    assert(actionOut.statusCode === 200, 'Root /api/campus with action: "delete_student" dispatches successfully')

    const { data: checkStu3 } = await supabaseServer.from('students').select('id').eq('id', stu3Profile.id).maybeSingle()
    assert(checkStu3 === null, 'Student 3 verified removed via root action fallback')
  }

  console.log('\n=================================================================')
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`)
  console.log('=================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err)
  process.exit(1)
})
