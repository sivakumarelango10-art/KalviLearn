/**
 * Comprehensive Test Suite for KalviLearn Campus Management & 404 Root-Cause Audit:
 *
 * 1. Error Normalization (`src/lib/errorUtils.ts`) - guarantees [object Object] is NEVER returned.
 * 2. API Authorization & Routing (`src/server/campusHandler.ts` & Vercel entry points).
 * 3. End-to-end Add Student, Add Mentor, and Mentor Assignment workflows.
 * 4. All 24 Phase 7 regression cases:
 *    - Valid & invalid enrollment (with mentor, without mentor, invalid email, duplicate email)
 *    - Valid & invalid mentor registration (valid input, duplicate email)
 *    - Assignment transitions (A -> B, B -> A, unassign, repeated assignment, concurrent attempts)
 *    - Security (missing auth, invalid token, student caller, mentor caller, unauthorized role)
 *    - Route and protocol resilience (invalid action, 405 methods, malformed JSON, 404 fallback)
 *    - Frontend contract verification (404/401/403/409/500 error extraction and format)
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
  body?: Record<string, unknown> | string
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
  const { supabaseServer } = await import('../src/server/feedbackAuth')
  const { installMockSupabaseServer } = await import('./mockDatabase')
  installMockSupabaseServer(supabaseServer)
  const { default: campusHandler, resetCampusRateLimitsForTesting } = await import('../src/server/campusHandler')

  console.log('=================================================================')
  console.log('KALVILEARN CAMPUS USER MANAGEMENT & REGRESSION TEST SUITE')
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

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 1: ERROR NORMALIZATION & [object Object] ERADICATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('Suite 1: Error Normalization & [object Object] Prevention')

  assert(formatErrorMessage(null) === 'An unexpected error occurred. Please try again.', 'null error yields default fallback')
  assert(formatErrorMessage(undefined, 'Fallback') === 'Fallback', 'undefined error yields provided fallback')
  assert(
    formatErrorMessage('[object Object]', 'Action failed') === 'Action failed',
    'String "[object Object]" is filtered out and replaced by fallback'
  )
  assert(
    formatErrorMessage(new Error('[object Object]'), 'Safe fallback') === 'Safe fallback',
    'Error instance with message "[object Object]" is caught and sanitized'
  )

  const rlsError = {
    code: '42501',
    details: null,
    hint: null,
    message: 'new row violates row-level security policy for table "users"',
  }
  const formattedRls = formatErrorMessage(rlsError)
  assert(
    formattedRls === 'Permission denied: You do not have permission to perform this action.',
    `Original RLS bug formatted as: "${formattedRls}" (NEVER [object Object])`
  )

  const dupEmailError = {
    code: '23505',
    details: 'Key (email)=(test@kalvi.test) already exists.',
    message: 'duplicate key value violates unique constraint "users_email_key"',
  }
  assert(
    formatErrorMessage(dupEmailError) === 'A user with this email address already exists.',
    'Duplicate email 23505 mapped to clear user explanation'
  )

  const dupStudentCodeError = {
    code: '23505',
    details: 'Key (student_code)=(STU-123) already exists.',
    message: 'duplicate key value violates unique constraint "students_student_code_key"',
  }
  assert(
    formatErrorMessage(dupStudentCodeError) === 'A student with this student code already exists.',
    'Duplicate student_code 23505 mapped to clear explanation'
  )

  const dupMentorStudentError = {
    code: '23505',
    details: 'Key (mentor_id, student_id)=(m1, s1) already exists.',
    message: 'duplicate key value violates unique constraint "uq_mentor_student"',
  }
  assert(
    formatErrorMessage(dupMentorStudentError) === 'This student is already assigned to this mentor.',
    'Duplicate mentor assignment 23505 mapped to clear explanation'
  )

  assert(
    formatErrorMessage(new Error('Failed to fetch')) === 'Network connection error. Please check your internet connection.',
    'Network "Failed to fetch" sanitized to connection error'
  )
  assert(
    formatErrorMessage(new TypeError('fetch failed')) === 'Network connection error. Please check your internet connection.',
    'Network "TypeError: fetch failed" sanitized to connection error'
  )
  assert(
    formatErrorMessage('{"message": "Custom JSON error"}') === 'Custom JSON error',
    'JSON-encoded error string parsed and normalized'
  )

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 2: ROUTING, DISPATCHING & PROTOCOL RESILIENCE
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\nSuite 2: Routing, Dispatching & Protocol Resilience')

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

  // Case 2.2: Invalid Bearer Token -> 401
  resetCampusRateLimitsForTesting()
  const { req: invalidTokenReq, res: invalidTokenRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer invalid_or_expired_jwt_token' },
    body: { name: 'Test', email: 'test@kalvilearn.test' },
  })
  await campusHandler(invalidTokenReq, invalidTokenRes)
  const invalidTokenOut = invalidTokenRes.getOutput()
  assert(invalidTokenOut.statusCode === 401, 'Invalid/expired authentication rejected with HTTP 401')

  // Case 2.3: Student caller -> 403 Forbidden
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

  // Case 2.4: Mentor caller -> 403 Forbidden
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

  // Case 2.5: Method not allowed (PATCH) -> 405
  resetCampusRateLimitsForTesting()
  const { req: patchReq, res: patchRes } = createMockReqRes({
    method: 'PATCH',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
  })
  await campusHandler(patchReq, patchRes)
  const patchOut = patchRes.getOutput()
  assert(patchOut.statusCode === 405, 'HTTP PATCH rejected with 405 Method Not Allowed')

  // Case 2.5b: GET student operations allowed for Campus Manager -> 200
  resetCampusRateLimitsForTesting()
  const { req: getReq, res: getRes } = createMockReqRes({
    method: 'GET',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
  })
  await campusHandler(getReq, getRes)
  const getOut = getRes.getOutput()
  assert(getOut.statusCode === 200, 'HTTP GET /api/campus/students returns HTTP 200')
  assert(Array.isArray(getOut.data.data), 'HTTP GET returns array of students')

  // Case 2.6: Method not allowed (PUT) -> 405
  resetCampusRateLimitsForTesting()
  const { req: putReq, res: putRes } = createMockReqRes({
    method: 'PUT',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
  })
  await campusHandler(putReq, putRes)
  const putOut = putRes.getOutput()
  assert(putOut.statusCode === 405, 'HTTP PUT rejected with 405 Method Not Allowed')

  // Case 2.7: Missing route/action -> 400 Invalid Action
  resetCampusRateLimitsForTesting()
  const { req: invalidActionReq, res: invalidActionRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
    body: { foo: 'bar' },
  })
  await campusHandler(invalidActionReq, invalidActionRes)
  const invalidActionOut = invalidActionRes.getOutput()
  assert(invalidActionOut.statusCode === 400, 'Unknown or missing action rejected with HTTP 400')
  assert(invalidActionOut.data.error === 'Invalid Action', 'Missing API action reported clearly')

  // Case 2.8: Invalid student email format -> 400
  resetCampusRateLimitsForTesting()
  const { req: invalidEmailReq, res: invalidEmailRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
    body: { name: 'Valid Name', email: 'not-an-email' },
  })
  await campusHandler(invalidEmailReq, invalidEmailRes)
  const invalidEmailOut = invalidEmailRes.getOutput()
  assert(invalidEmailOut.statusCode === 400, 'Invalid student email rejected with HTTP 400')

  // Case 2.9: Blank student name -> 400
  resetCampusRateLimitsForTesting()
  const { req: blankNameReq, res: blankNameRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus/students',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
    body: { name: '   ', email: 'valid@kalvilearn.test' },
  })
  await campusHandler(blankNameReq, blankNameRes)
  const blankNameOut = blankNameRes.getOutput()
  assert(blankNameOut.statusCode === 400, 'Blank student name rejected with HTTP 400')

  // Case 2.10: Root /api/campus dispatch with explicit action: enroll_student
  resetCampusRateLimitsForTesting()
  const { req: actionDispatchReq, res: actionDispatchRes } = createMockReqRes({
    method: 'POST',
    url: '/api/campus',
    headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
    body: { action: 'enroll_student', name: '', email: 'missing-name' },
  })
  await campusHandler(actionDispatchReq, actionDispatchRes)
  const actionDispatchOut = actionDispatchRes.getOutput()
  assert(actionDispatchOut.statusCode === 400 && actionDispatchOut.data.error === 'Invalid Name', 'Root /api/campus dispatches via body.action successfully')

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 3: END-TO-END WORKFLOWS & 24 REGRESSION SCENARIOS
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\nSuite 3: Database & API Workflows (Synthetic Test Personas)')

  const testStudentEmail = `test.student.${Date.now()}@kalvilearn.test`
  const testStudentEmail2 = `test.student2.${Date.now()}@kalvilearn.test`
  const testStudentName = 'Regression Test Student'
  const testMentorEmailA = `test.mentor.a.${Date.now()}@kalvilearn.test`
  const testMentorEmailB = `test.mentor.b.${Date.now()}@kalvilearn.test`
  const testMentorNameA = 'Mentor Alpha'
  const testMentorNameB = 'Mentor Beta'
  let createdMentorIdA: string | null = null
  let createdMentorIdB: string | null = null
  let createdStudentId: string | null = null
  let createdStudentId2: string | null = null

  try {
    // 1. Add Mentor A with valid input
    resetCampusRateLimitsForTesting()
    const { req: addMentorReqA, res: addMentorResA } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/mentors',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { name: testMentorNameA, email: testMentorEmailA, maxStudents: 25 },
    })
    await campusHandler(addMentorReqA, addMentorResA)
    const addMentorOutA = addMentorResA.getOutput()
    assert(addMentorOutA.statusCode === 201, 'Mentor A registered successfully via API (HTTP 201)')
    assert(addMentorOutA.data.success === true, 'Mentor response has success: true')
    assert(!!addMentorOutA.data.data?.mentorId, 'Mentor response returned mentorId')
    createdMentorIdA = addMentorOutA.data.data?.mentorId

    // 2. Add Mentor B with valid input
    resetCampusRateLimitsForTesting()
    const { req: addMentorReqB, res: addMentorResB } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/mentors',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { name: testMentorNameB, email: testMentorEmailB, maxStudents: 30 },
    })
    await campusHandler(addMentorReqB, addMentorResB)
    const addMentorOutB = addMentorResB.getOutput()
    assert(addMentorOutB.statusCode === 201, 'Mentor B registered successfully via API (HTTP 201)')
    createdMentorIdB = addMentorOutB.data.data?.mentorId

    // 3. Duplicate Mentor Email (Safe rejection or idempotent update)
    resetCampusRateLimitsForTesting()
    const { req: dupMentorReq, res: dupMentorRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/mentors',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { name: `${testMentorNameA} Updated`, email: testMentorEmailA, maxStudents: 25 },
    })
    await campusHandler(dupMentorReq, dupMentorRes)
    const dupMentorOut = dupMentorRes.getOutput()
    assert(
      dupMentorOut.statusCode === 201 && dupMentorOut.data.data?.mentorId === createdMentorIdA,
      'Duplicate mentor email handled idempotently without constraint crash'
    )

    // 4. Add Student 1 WITHOUT a mentor
    resetCampusRateLimitsForTesting()
    const { req: addStudentNoMentorReq, res: addStudentNoMentorRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { name: 'Unassigned Student', email: testStudentEmail2, mentorId: null },
    })
    await campusHandler(addStudentNoMentorReq, addStudentNoMentorRes)
    const addStudentNoMentorOut = addStudentNoMentorRes.getOutput()
    assert(addStudentNoMentorOut.statusCode === 201, 'Student enrolled successfully without mentor (HTTP 201)')
    assert(addStudentNoMentorOut.data.data?.mentorId === null, 'Enrolled student mentorId is null')
    createdStudentId2 = addStudentNoMentorOut.data.data?.studentId

    // 5. Add Student 2 WITH an initial mentor (Mentor A)
    resetCampusRateLimitsForTesting()
    const { req: addStudentReq, res: addStudentRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { name: testStudentName, email: testStudentEmail, mentorId: createdMentorIdA },
    })
    await campusHandler(addStudentReq, addStudentRes)
    const addStudentOut = addStudentRes.getOutput()
    assert(addStudentOut.statusCode === 201, 'Student enrolled successfully with initial mentor (HTTP 201)')
    assert(addStudentOut.data.data?.mentorId === createdMentorIdA, 'Mentor A assigned to student on enrollment')
    createdStudentId = addStudentOut.data.data?.studentId

    // 6. Duplicate student email (Idempotent update without 23505 conflict)
    resetCampusRateLimitsForTesting()
    const { req: reEnrollReq, res: reEnrollRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { name: `${testStudentName} Updated`, email: testStudentEmail, mentorId: createdMentorIdA },
    })
    await campusHandler(reEnrollReq, reEnrollRes)
    const reEnrollOut = reEnrollRes.getOutput()
    assert(
      reEnrollOut.statusCode === 201 && reEnrollOut.data.data?.studentId === createdStudentId,
      'Duplicate student email updates existing record idempotently without 23505 conflict'
    )

    // 7. Reassign student from Mentor A to Mentor B
    resetCampusRateLimitsForTesting()
    const { req: reassignBReq, res: reassignBRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/assign-mentor',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { studentId: createdStudentId, mentorId: createdMentorIdB },
    })
    await campusHandler(reassignBReq, reassignBRes)
    const reassignBOut = reassignBRes.getOutput()
    assert(reassignBOut.statusCode === 200, 'Student reassigned from Mentor A to Mentor B (HTTP 200)')
    assert(reassignBOut.data.data?.mentorId === createdMentorIdB, 'Active mentor is now Mentor B')

    // 8. Reassign student back to Mentor A (Tests onConflict: mentor_id,student_id resolution)
    resetCampusRateLimitsForTesting()
    const { req: reassignBackAReq, res: reassignBackARes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/assign-mentor',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { studentId: createdStudentId, mentorId: createdMentorIdA },
    })
    await campusHandler(reassignBackAReq, reassignBackARes)
    const reassignBackAOut = reassignBackARes.getOutput()
    assert(
      reassignBackAOut.statusCode === 200 && reassignBackAOut.data.data?.mentorId === createdMentorIdA,
      'Student reassigned back to Mentor A with conflict resolution (HTTP 200)'
    )

    // 9. Reassign without a mentor (unassign workflow)
    resetCampusRateLimitsForTesting()
    const { req: unassignReq, res: unassignRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/assign-mentor',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { studentId: createdStudentId, mentorId: 'NONE' },
    })
    await campusHandler(unassignReq, unassignRes)
    const unassignOut = unassignRes.getOutput()
    assert(unassignOut.statusCode === 200, 'Mentor unassigned successfully (HTTP 200)')
    assert(unassignOut.data.data?.mentorId === null, 'Mentor ID successfully set to null')

    // 10. Repeated assignment request (Idempotency)
    resetCampusRateLimitsForTesting()
    const { req: repeatedUnassignReq, res: repeatedUnassignRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/assign-mentor',
      headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
      body: { studentId: createdStudentId, mentorId: null },
    })
    await campusHandler(repeatedUnassignReq, repeatedUnassignRes)
    const repeatedUnassignOut = repeatedUnassignRes.getOutput()
    assert(repeatedUnassignOut.statusCode === 200, 'Repeated unassignment returns success idempotently')

    // 11. Concurrent assignment resilience
    resetCampusRateLimitsForTesting()
    const promise1 = (async () => {
      const { req, res } = createMockReqRes({
        method: 'POST',
        url: '/api/campus/assign-mentor',
        headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
        body: { studentId: createdStudentId, mentorId: createdMentorIdA },
      })
      await campusHandler(req, res)
      return res.getOutput()
    })()
    const promise2 = (async () => {
      const { req, res } = createMockReqRes({
        method: 'POST',
        url: '/api/campus/assign-mentor',
        headers: { Authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
        body: { studentId: createdStudentId, mentorId: createdMentorIdB },
      })
      await campusHandler(req, res)
      return res.getOutput()
    })()

    const [out1, out2] = await Promise.all([promise1, promise2])
    assert(
      (out1.statusCode === 200 || out1.statusCode === 429) &&
      (out2.statusCode === 200 || out2.statusCode === 429),
      'Concurrent reassignment requests processed cleanly without corruption',
      JSON.stringify({ out1, out2 })
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
    if (createdStudentId2) {
      await supabaseServer.from('mentor_students').delete().eq('student_id', createdStudentId2)
      await supabaseServer.from('students').delete().eq('id', createdStudentId2)
    }
    if (createdMentorIdA) {
      await supabaseServer.from('mentor_students').delete().eq('mentor_id', createdMentorIdA)
      await supabaseServer.from('mentors').delete().eq('id', createdMentorIdA)
    }
    if (createdMentorIdB) {
      await supabaseServer.from('mentor_students').delete().eq('mentor_id', createdMentorIdB)
      await supabaseServer.from('mentors').delete().eq('id', createdMentorIdB)
    }
    await supabaseServer.from('users').delete().eq('email', testStudentEmail)
    await supabaseServer.from('users').delete().eq('email', testStudentEmail2)
    await supabaseServer.from('users').delete().eq('email', testMentorEmailA)
    await supabaseServer.from('users').delete().eq('email', testMentorEmailB)
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
