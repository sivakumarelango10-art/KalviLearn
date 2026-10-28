/**
 * Comprehensive Test Suite for KalviLearn Campus Management:
 * 1. Error Normalization (`src/lib/errorUtils.ts`) - guarantees [object Object] is NEVER returned.
 * 2. API Authorization & Routing (`src/server/campusHandler.ts`).
 * 3. End-to-end Add Student, Add Mentor, and Mentor Assignment workflows.
 * 4. Idempotency & Conflict Resolution (duplicate emails, codes, reassignment).
 */

import fs from 'fs'
import path from 'path'
import { EventEmitter } from 'events'

// 1. Authoritatively load environment variables before importing handlers
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
  body?: Record<string, unknown>
}) {
  const req = new EventEmitter() as any
  req.method = options.method || 'POST'
  req.url = options.url || '/api/campus/students'
  req.headers = { 'content-type': 'application/json' }
  if (options.headers) {
    for (const [k, v] of Object.entries(options.headers)) {
      req.headers[k.toLowerCase()] = v
    }
  }
  req.body = options.body || {}
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
  const { formatErrorMessage } = await import('../src/lib/errorUtils')
  const { default: campusHandler, resetCampusRateLimitsForTesting } = await import('../src/server/campusHandler')
  const { supabaseServer } = await import('../src/server/feedbackAuth')

  console.log('=================================================================')
  console.log('KALVILEARN CAMPUS USER MANAGEMENT & ENROLLMENT REPAIR TEST SUITE')
  console.log('=================================================================\n')

  let passed = 0
  let failed = 0

  function assert(condition: boolean, desc: string) {
    if (condition) {
      console.log(`  [PASS] ${desc}`)
      passed++
    } else {
      console.error(`  [FAIL] ${desc}`)
      failed++
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 1: ERROR NORMALIZATION GUARANTEES
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('Suite 1: Error Normalization & [object Object] Prevention')

  // Case 1.1: null/undefined
  assert(
    formatErrorMessage(null) === 'An unexpected error occurred. Please try again.',
    'null error yields default fallback'
  )
  assert(
    formatErrorMessage(undefined, 'Custom fallback') === 'Custom fallback',
    'undefined error yields provided fallback'
  )

  // Case 1.2: literal string "[object Object]"
  assert(
    formatErrorMessage('[object Object]') === 'An unexpected error occurred. Please try again.',
    'String "[object Object]" is filtered out and replaced by fallback'
  )

  // Case 1.3: Error instance containing "[object Object]"
  assert(
    formatErrorMessage(new Error('[object Object]')) === 'An unexpected error occurred. Please try again.',
    'Error instance with message "[object Object]" is caught and sanitized'
  )

  // Case 1.4: PostgrestError plain object (The original bug report scenario)
  const originalPostgrestError = {
    code: '42501',
    details: null,
    hint: null,
    message: 'new row violates row-level security policy for table "users"',
  }
  const normalizedPgrst = formatErrorMessage(originalPostgrestError)
  assert(
    normalizedPgrst.includes('Permission denied') && !normalizedPgrst.includes('[object Object]'),
    `Original RLS bug formatted as: "${normalizedPgrst}" (NEVER [object Object])`
  )

  // Case 1.5: Duplicate key error (Postgres 23505)
  const duplicateEmailError = {
    code: '23505',
    details: 'Key (email)=(test@kalvi.test) already exists.',
    message: 'duplicate key value violates unique constraint "users_email_key"',
  }
  assert(
    formatErrorMessage(duplicateEmailError) === 'A user with this email address already exists.',
    'Duplicate email 23505 mapped to clear user explanation'
  )

  const duplicateStudentCodeError = {
    code: '23505',
    details: 'Key (student_code)=(STU-123) already exists.',
    message: 'duplicate key value violates unique constraint "students_student_code_key"',
  }
  assert(
    formatErrorMessage(duplicateStudentCodeError) === 'A student with this student code already exists.',
    'Duplicate student_code 23505 mapped to clear explanation'
  )

  const duplicateAssignmentError = {
    code: '23505',
    details: 'Key (mentor_id, student_id)=(m1, s1) already exists.',
    message: 'duplicate key value violates unique constraint "uq_mentor_student"',
  }
  assert(
    formatErrorMessage(duplicateAssignmentError) === 'This student is already assigned to this mentor.',
    'Duplicate mentor assignment 23505 mapped to clear explanation'
  )

  // Case 1.6: Network error strings
  assert(
    formatErrorMessage(new Error('TypeError: Failed to fetch')).includes('Network connection error'),
    'Network "Failed to fetch" sanitized to connection error'
  )
  assert(
    formatErrorMessage(new Error('TypeError: fetch failed')).includes('Network connection error'),
    'Network "TypeError: fetch failed" sanitized to connection error'
  )

  // Case 1.7: JSON error string
  assert(
    formatErrorMessage('{"message": "Session expired"}') === 'Your session has expired. Please sign in again.',
    'JSON-encoded error string parsed and normalized'
  )

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 2: API AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\nSuite 2: API Authentication & RBAC Enforcement')

  // Case 2.1: Missing authorization header -> 401
  resetCampusRateLimitsForTesting()
  const { req: noAuthReq, res: noAuthRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/students',
    body: { name: 'Test', email: 'test@kalvilearn.test' },
  })
  await campusHandler(noAuthReq, noAuthRes)
  const noAuthOut = noAuthRes.getOutput()
  assert(noAuthOut.statusCode === 401, 'Request without Authorization header rejected with HTTP 401')
  assert(noAuthOut.data.success === false, 'Response has success: false')

  // Case 2.2: Student caller -> 403 Forbidden
  resetCampusRateLimitsForTesting()
  const { req: studentReq, res: studentRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_student_synthetic.student@kalvilearn.test' },
    body: { name: 'Test', email: 'test@kalvilearn.test' },
  })
  await campusHandler(studentReq, studentRes)
  const studentOut = studentRes.getOutput()
  assert(studentOut.statusCode === 403, 'Student caller rejected with HTTP 403 Forbidden')
  assert(
    studentOut.data.message.includes('Campus manager or administrator privileges required'),
    'Clear RBAC error message for unauthorized role'
  )

  // Case 2.3: Mentor caller -> 403 Forbidden
  resetCampusRateLimitsForTesting()
  const { req: mentorReq, res: mentorRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_mentor_synthetic.mentor@kalvilearn.test' },
    body: { name: 'Test', email: 'test@kalvilearn.test' },
  })
  await campusHandler(mentorReq, mentorRes)
  const mentorOut = mentorRes.getOutput()
  assert(mentorOut.statusCode === 403, 'Mentor caller rejected with HTTP 403 Forbidden')

  // Case 2.4: Method not allowed (GET) -> 405
  resetCampusRateLimitsForTesting()
  const { req: getReq, res: getRes } = createMockReqRes({
    method: 'GET',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
  })
  await campusHandler(getReq, getRes)
  const getOut = getRes.getOutput()
  assert(getOut.statusCode === 405, 'HTTP GET rejected with 405 Method Not Allowed')

  // Case 2.5: Missing required fields (blank name/email) -> 400
  resetCampusRateLimitsForTesting()
  const { req: invalidReq, res: invalidRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
    body: { name: '', email: 'invalid-email' },
  })
  await campusHandler(invalidReq, invalidRes)
  const invalidOut = invalidRes.getOutput()
  assert(invalidOut.statusCode === 400, 'Invalid student payload rejected with HTTP 400')

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 3: END-TO-END WORKFLOWS (ISOLATED SYNTHETIC TEST IDENTITIES)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\nSuite 3: Database & API Workflows (Synthetic Test Personas)')

  const testStudentEmail = `test.student.${Date.now()}@kalvilearn.test`
  const testStudentName = 'Regression Test Student'
  const testMentorEmail = `test.mentor.${Date.now()}@kalvilearn.test`
  const testMentorName = 'Regression Test Mentor'
  let createdMentorId: string | null = null
  let createdStudentId: string | null = null

  try {
    // Step 3.1: Add Mentor via API
    resetCampusRateLimitsForTesting()
    const { req: addMentorReq, res: addMentorRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/mentors',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: {
        name: testMentorName,
        email: testMentorEmail,
        maxStudents: 25,
      },
    })
    await campusHandler(addMentorReq, addMentorRes)
    const addMentorOut = addMentorRes.getOutput()
    assert(addMentorOut.statusCode === 201, 'Mentor registered successfully via API (HTTP 201)')
    assert(addMentorOut.data.success === true, 'Mentor response has success: true')
    assert(!!addMentorOut.data.data?.mentorId, 'Mentor response returned mentorId')
    createdMentorId = addMentorOut.data.data?.mentorId

    // Step 3.2: Enroll Student with Mentor Assignment via API
    resetCampusRateLimitsForTesting()
    const { req: addStudentReq, res: addStudentRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: {
        name: testStudentName,
        email: testStudentEmail,
        mentorId: createdMentorId,
      },
    })
    await campusHandler(addStudentReq, addStudentRes)
    const addStudentOut = addStudentRes.getOutput()
    assert(addStudentOut.statusCode === 201, 'Student enrolled successfully with mentor assignment (HTTP 201)')
    assert(addStudentOut.data.success === true, 'Student response has success: true')
    assert(addStudentOut.data.data?.mentorId === createdMentorId, 'Mentor ID assigned to student')
    createdStudentId = addStudentOut.data.data?.studentId

    // Step 3.3: Idempotent Re-enrollment / Update of existing student
    resetCampusRateLimitsForTesting()
    const { req: reEnrollReq, res: reEnrollRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: {
        name: `${testStudentName} Updated`,
        email: testStudentEmail,
        mentorId: createdMentorId,
      },
    })
    await campusHandler(reEnrollReq, reEnrollRes)
    const reEnrollOut = reEnrollRes.getOutput()
    assert(
      reEnrollOut.statusCode === 201 && reEnrollOut.data.success === true,
      'Re-enrolling existing student succeeds idempotently without 23505 conflict'
    )
    assert(
      reEnrollOut.data.data?.studentId === createdStudentId,
      'Existing student record was updated, preserving student ID'
    )

    // Step 3.4: Re-assign Mentor to Student (unassign)
    resetCampusRateLimitsForTesting()
    const { req: unassignReq, res: unassignRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/assign-mentor',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: {
        studentId: createdStudentId,
        mentorId: 'NONE',
      },
    })
    await campusHandler(unassignReq, unassignRes)
    const unassignOut = unassignRes.getOutput()
    assert(unassignOut.statusCode === 200, 'Mentor unassigned successfully (HTTP 200)')
    assert(unassignOut.data.data?.mentorId === null, 'Mentor ID set to null')

    // Step 3.5: Re-assign Mentor back to student
    resetCampusRateLimitsForTesting()
    const { req: reassignReq, res: reassignRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/assign-mentor',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: {
        studentId: createdStudentId,
        mentorId: createdMentorId,
      },
    })
    await campusHandler(reassignReq, reassignRes)
    const reassignOut = reassignRes.getOutput()
    assert(
      reassignOut.statusCode === 200 && reassignOut.data.success === true,
      'Re-assigning student to mentor succeeds with conflict resolution'
    )

  } finally {
    // ─────────────────────────────────────────────────────────────────────────
    // CLEANUP SYNTHETIC TEST PERSONAS
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\nCleaning up synthetic test records...')
    if (createdStudentId) {
      await supabaseServer.from('mentor_students').delete().eq('student_id', createdStudentId)
      await supabaseServer.from('students').delete().eq('id', createdStudentId)
    }
    if (createdMentorId) {
      await supabaseServer.from('mentor_students').delete().eq('mentor_id', createdMentorId)
      await supabaseServer.from('mentors').delete().eq('id', createdMentorId)
    }
    await supabaseServer.from('users').delete().eq('email', testStudentEmail)
    await supabaseServer.from('users').delete().eq('email', testMentorEmail)
    console.log('Cleanup complete.')
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\n=================================================================')
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`)
  console.log('=================================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Fatal test failure:', err)
  process.exit(1)
})
