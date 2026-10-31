/**
 * Comprehensive Backend & Database Feedback Test Suite
 *
 * Covers:
 * 1. Authentication & Impersonation Prevention
 * 2. Controlled Feedback Types (BUG, FEATURE, FEEDBACK, ISSUE, IMPROVEMENT, OTHER)
 * 3. Validation, Lengths, Whitespace, Sanitization (XSS)
 * 4. Status Lifecycle State Machine & Reopen (422 on illegal transitions)
 * 5. Authorization & IDOR Protection (403 Forbidden)
 * 6. Rate Limiting (429) & Duplicate Submission Prevention (409)
 * 7. Real PostgreSQL Database Persistence & Public Reference (FB-XXXX)
 */

import http from 'http'

// Test-only bearer tokens are disabled unless explicitly enabled (never in production).
process.env.ALLOW_TEST_AUTH_TOKENS = '1'
import handler, { resetRateLimitsForTesting, checkRateLimit } from '../src/server/feedbackHandler'
import {
  isValidStatusTransition,
  validateFeedbackInput,
  normalizeFeedbackType,
  normalizePriority,
  sanitizeString,
} from '../src/server/feedbackLifecycle'
import { supabaseServer } from '../src/server/feedbackAuth'
import { setTeamSyncMockTransport, resetTeamSyncMockTransport } from '../src/server/teamSyncService'

// Track created report IDs for automatic teardown cleanup
const createdReportIds: string[] = []

// Mock Request & Response Helper to invoke handler directly in-memory
interface MockResponse {
  statusCode: number
  headers: Record<string, string>
  body: any
  endCalled: boolean
}

function createMockReqRes(options: {
  method: string
  url?: string
  headers?: Record<string, string>
  body?: any
}) {
  const req: any = {
    method: options.method,
    url: options.url || '/api/feedback',
    headers: {
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body || {},
    socket: { remoteAddress: '127.0.0.1' },
    on: (event: string, cb: any) => {
      if (event === 'data' && options.body) {
        cb(JSON.stringify(options.body))
      }
      if (event === 'end') {
        cb()
      }
    },
  }

  const mockRes: MockResponse = {
    statusCode: 200,
    headers: {},
    body: null,
    endCalled: false,
  }

  const captureId = (body: any) => {
    const id = body?.feedback?.id || body?.id
    if (id && typeof id === 'string' && !createdReportIds.includes(id)) {
      createdReportIds.push(id)
    }
  }

  const res: any = {
    statusCode: 200,
    setHeader: (k: string, v: string) => {
      mockRes.headers[k.toLowerCase()] = v
    },
    status: (code: number) => {
      mockRes.statusCode = code
      res.statusCode = code
      return res
    },
    json: (data: any) => {
      mockRes.body = data
      mockRes.endCalled = true
      captureId(data)
    },
    end: (data?: string) => {
      mockRes.statusCode = res.statusCode || mockRes.statusCode
      if (data) {
        try {
          mockRes.body = JSON.parse(data)
        } catch {
          mockRes.body = data
        }
      }
      mockRes.endCalled = true
      captureId(mockRes.body)
    },
  }

  return { req, res, mockRes }
}

async function runTestSuite() {
  console.log('========================================================================')
  console.log('🧪 KALVILEARN PHASE 2: REAL BACKEND & DATABASE FEEDBACK AUDIT')
  console.log('========================================================================\n')

  let passed = 0
  let total = 0

  function assert(condition: boolean, testName: string, details?: unknown) {
    total++
    if (condition) {
      console.log(`✅ [PASS] ${testName}`)
      passed++
    } else {
      console.error(`❌ [FAIL] ${testName}`, details !== undefined ? details : '')
      process.exitCode = 1
    }
  }

  resetRateLimitsForTesting()

  // Install Mock Transport so test suite NEVER makes live network calls to TeamSync production!
  let mockTicketSeq = 1000
  setTeamSyncMockTransport(async (_url, opts) => {
    mockTicketSeq++
    const parsed = JSON.parse(opts.body)
    return {
      status: 201,
      statusText: 'Created',
      json: async () => ({
        success: true,
        ticket: {
          id: `ts_mock_${mockTicketSeq}`,
          ticketNumber: `TS-MOCK-${mockTicketSeq}`,
          status: 'OPEN',
          sourceReferenceId: parsed.sourceReferenceId,
          createdAt: new Date().toISOString(),
        },
      }),
      text: async () => JSON.stringify({ success: true }),
    }
  })

  // Test identities (strictly synthetic - isolated from real production users)
  const studentEmail = 'synthetic.student@kalvilearn.test'
  const studentToken = `test_auth_student_${studentEmail}`

  const otherStudentEmail = 'synthetic.other.student@kalvilearn.test'
  const otherStudentToken = `test_auth_student_${otherStudentEmail}`

  const mentorEmail = 'synthetic.mentor@kalvilearn.test'
  const mentorToken = `test_auth_mentor_${mentorEmail}`
  const adminToken = 'test_auth_admin_synthetic.admin@kalvilearn.test'

  let createdBugId = ''
  let createdBugRef = ''

  try {
    // --------------------------------------------------------------------------
    console.log('--- Suite 1: Authentication & Impersonation Prevention ---')
  // --------------------------------------------------------------------------
  {
    // Test 1: Unauthenticated request rejected
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      body: { type: 'BUG', title: 'Bug', description: 'Testing without auth' },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 401, 'TEST 1: Unauthenticated request rejected with HTTP 401')
    assert(mockRes.body?.success === false, 'TEST 2: Response returns success=false')
  }

  {
    // Test 3: Malformed Authorization header rejected
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: 'Basic xyz123' },
      body: { type: 'BUG', title: 'Bug', description: 'Testing with bad header' },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 401, 'TEST 3: Non-Bearer authorization header rejected with HTTP 401')
  }

  {
    // Test 4: Impersonation spoofing strictly prevented
    // Student attempts to submit payload pretending to be an ADMIN with a fake user ID
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: {
        type: 'BUG',
        title: 'Impersonation Attempt',
        description: 'Trying to forge admin credentials in payload',
        userId: 'fake-admin-uuid-999',
        userRole: 'SUPERADMIN',
        userEmail: 'admin@system.internal',
      },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 201, 'TEST 4: Authenticated submission succeeds with HTTP 201')

    // Verify in database that the author is the real student, NOT the spoofed admin
    const createdId = mockRes.body?.feedback?.id
    const { data: dbRow } = await supabaseServer
      .from('feedback_reports')
      .select('id, user_id, user_email_snapshot, user_role')
      .eq('id', createdId)
      .single()

    assert(dbRow?.user_email_snapshot === studentEmail, 'TEST 5: Database records authoritative user email snapshot')
    assert(dbRow?.user_role === 'STUDENT', 'TEST 6: Database records authoritative user role (never spoofed SUPERADMIN)')
    assert(dbRow?.user_id !== 'fake-admin-uuid-999', 'TEST 7: Client-provided fake userId is ignored')
  }

  // --------------------------------------------------------------------------
  console.log('\n--- Suite 2: Feedback Creation Across All Controlled Types ---')
  // --------------------------------------------------------------------------
  {
    // BUG
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: {
        type: 'BUG',
        title: 'Editor autocomplete glitch',
        description: 'The Monaco editor autocomplete hangs intermittently on large loops.',
      },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 201, 'TEST 8: BUG creation succeeds (HTTP 201)')
    assert(mockRes.body?.feedback?.status === 'OPEN', 'TEST 9: Initial status is OPEN')
    assert(mockRes.body?.feedback?.reference?.startsWith('FB-'), 'TEST 10: Reference is in FB-XXXX format')
    createdBugId = mockRes.body?.feedback?.id
    createdBugRef = mockRes.body?.feedback?.reference
  }

  {
    // FEATURE
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: {
        type: 'FEATURE',
        title: 'Vim keybindings in editor',
        description: 'Would love to have Vim mode option in the code editor settings.',
      },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 201, 'TEST 11: FEATURE creation succeeds (HTTP 201)')
    assert(mockRes.body?.feedback?.type === 'FEATURE', 'TEST 12: Stored type is FEATURE')
  }

  {
    // FEATURE_REQUEST (normalized to FEATURE)
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: {
        type: 'FEATURE_REQUEST',
        title: 'Dark mode contrast slider',
        description: 'Allow fine-tuning dark mode background contrast.',
      },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 201, 'TEST 13: FEATURE_REQUEST alias gracefully normalizes to FEATURE')
    assert(mockRes.body?.feedback?.type === 'FEATURE', 'TEST 14: Normalized type is FEATURE')
  }

  {
    // FEEDBACK (with rating)
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: {
        type: 'FEEDBACK',
        description: 'The instant feedback on test cases has significantly accelerated my learning!',
        rating: 'GOOD',
      },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 201, 'TEST 15: General FEEDBACK with sentiment rating succeeds (HTTP 201)')
  }

  {
    // ISSUE
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: {
        type: 'ISSUE',
        title: 'Streak reset after midnight',
        description: 'Completed problem at 11:45 PM but streak counter did not increment.',
      },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 201, 'TEST 16: ISSUE creation succeeds (HTTP 201)')
  }

  {
    // IMPROVEMENT
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: {
        type: 'IMPROVEMENT',
        title: 'Test case execution tab layout',
        description: 'Make the test case tabs horizontally scrollable on mobile screens.',
        featureArea: 'Mobile Arena',
      },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 201, 'TEST 17: IMPROVEMENT creation succeeds (HTTP 201)')
  }

  {
    // OTHER
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: {
        type: 'OTHER',
        description: 'General inquiry about upcoming curriculum schedule for Belt 4.',
      },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 201, 'TEST 18: OTHER creation succeeds (HTTP 201)')
  }

  // --------------------------------------------------------------------------
  console.log('\n--- Suite 3: Backend Validation, Limits & Sanitization ---')
  // --------------------------------------------------------------------------
  {
    // Invalid type
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: { type: 'ARBITRARY_HACK', title: 'Test', description: 'Valid description text' },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 400, 'TEST 19: Arbitrary feedback type rejected with HTTP 400')
  }

  {
    // Missing title for BUG
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: { type: 'BUG', title: '   ', description: 'Valid description text' },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 400, 'TEST 20: Empty title for BUG rejected with HTTP 400')
  }

  {
    // Description < 5 characters
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: { type: 'BUG', title: 'Test Bug', description: 'xyz' },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 400, 'TEST 21: Description < 5 characters rejected with HTTP 400')
  }

  {
    // Description > 4000 characters
    const longDesc = 'A'.repeat(4001)
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: { type: 'BUG', title: 'Test Bug', description: longDesc },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 400, 'TEST 22: Description > 4000 characters rejected with HTTP 400')
  }

  {
    // Invalid rating
    const { req, res, mockRes } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: { type: 'FEEDBACK', description: 'Good platform overall', rating: 'INVALID_SENTIMENT' },
    })
    await handler(req, res)
    assert(mockRes.statusCode === 400, 'TEST 23: Invalid sentiment rating rejected with HTTP 400')
  }

  {
    // XSS sanitization
    const maliciousTitle = 'Bug <script>alert("pwned")</script> <b>bold</b>'
    const maliciousDesc = 'Desc with <script src="malicious.js"></script> script injection'
    const sanitizedTitle = sanitizeString(maliciousTitle)
    const sanitizedDesc = sanitizeString(maliciousDesc)
    assert(!sanitizedTitle.includes('<script>'), 'TEST 24: Script tags stripped from title')
    assert(!sanitizedDesc.includes('<script'), 'TEST 25: Script tags stripped from description')
    assert(!sanitizedTitle.includes('<b>'), 'TEST 26: Raw HTML tags stripped')
  }

  // --------------------------------------------------------------------------
  console.log('\n--- Suite 4: Status Lifecycle State Machine & Reopening ---')
  // --------------------------------------------------------------------------
  {
    // Allowed transition: OPEN -> TRIAGED
    assert(isValidStatusTransition('OPEN', 'TRIAGED'), 'TEST 27: Lifecycle allows OPEN -> TRIAGED')

    // Allowed transition: TRIAGED -> IN_PROGRESS
    assert(isValidStatusTransition('TRIAGED', 'IN_PROGRESS'), 'TEST 28: Lifecycle allows TRIAGED -> IN_PROGRESS')

    // Allowed transition: IN_PROGRESS -> RESOLVED
    assert(isValidStatusTransition('IN_PROGRESS', 'RESOLVED'), 'TEST 29: Lifecycle allows IN_PROGRESS -> RESOLVED')

    // Allowed transition: RESOLVED -> CLOSED
    assert(isValidStatusTransition('RESOLVED', 'CLOSED'), 'TEST 30: Lifecycle allows RESOLVED -> CLOSED')

    // Allowed transition: Reopening (RESOLVED -> OPEN, CLOSED -> OPEN)
    assert(isValidStatusTransition('RESOLVED', 'OPEN'), 'TEST 31: Lifecycle allows reopen (RESOLVED -> OPEN)')
    assert(isValidStatusTransition('CLOSED', 'OPEN'), 'TEST 32: Lifecycle allows reopen (CLOSED -> OPEN)')

    // Disallowed transition jump: OPEN -> CLOSED (must go through lifecycle)
    assert(!isValidStatusTransition('OPEN', 'CLOSED'), 'TEST 33: Lifecycle rejects illegal jump (OPEN -> CLOSED)')

    // Disallowed transition jump: TRIAGED -> CLOSED
    assert(!isValidStatusTransition('TRIAGED', 'CLOSED'), 'TEST 34: Lifecycle rejects illegal jump (TRIAGED -> CLOSED)')

    // Live API PATCH test on created bug:
    // Try illegal jump OPEN -> CLOSED via PATCH API (should return HTTP 422)
    const { req: badPatchReq, res: badPatchRes, mockRes: badPatchMock } = createMockReqRes({
      method: 'PATCH',
      headers: { authorization: `Bearer ${adminToken}` },
      body: { id: createdBugId, status: 'CLOSED' },
    })
    await handler(badPatchReq, badPatchRes)
    assert(badPatchMock.statusCode === 422, 'TEST 35: API returns HTTP 422 Unprocessable Entity for illegal transition')

    // Authorization: a mentor who is NOT assigned to the ticket author must not be able to triage it (403)
    const { req: mentorPatchReq, res: mentorPatchRes, mockRes: mentorPatchMock } = createMockReqRes({
      method: 'PATCH',
      headers: { authorization: `Bearer ${mentorToken}` },
      body: { id: createdBugId, status: 'TRIAGED' },
    })
    await handler(mentorPatchReq, mentorPatchRes)
    assert(mentorPatchMock.statusCode === 403, 'TEST 35b: Unassigned mentor cannot advance a ticket authored by an unrelated user (HTTP 403)')

    // Student cannot self-advance lifecycle either
    const { req: stuPatchReq, res: stuPatchRes, mockRes: stuPatchMock } = createMockReqRes({
      method: 'PATCH',
      headers: { authorization: `Bearer ${studentToken}` },
      body: { id: createdBugId, status: 'TRIAGED' },
    })
    await handler(stuPatchReq, stuPatchRes)
    assert(stuPatchMock.statusCode === 403, 'TEST 35c: Student cannot advance own ticket lifecycle (HTTP 403)')

    // Advance legitimately: OPEN -> TRIAGED via PATCH API
    const { req: p1Req, res: p1Res, mockRes: p1Mock } = createMockReqRes({
      method: 'PATCH',
      headers: { authorization: `Bearer ${adminToken}` },
      body: { id: createdBugId, status: 'TRIAGED' },
    })
    await handler(p1Req, p1Res)
    assert(p1Mock.statusCode === 200, 'TEST 36: Legitimate transition OPEN -> TRIAGED succeeds with HTTP 200')
    assert(p1Mock.body?.feedback?.status === 'TRIAGED', 'TEST 37: Updated status is TRIAGED')

    // Advance: TRIAGED -> RESOLVED
    const { req: p2Req, res: p2Res, mockRes: p2Mock } = createMockReqRes({
      method: 'PATCH',
      headers: { authorization: `Bearer ${adminToken}` },
      body: { id: createdBugId, status: 'RESOLVED' },
    })
    await handler(p2Req, p2Res)
    assert(p2Mock.statusCode === 200, 'TEST 38: Transition to RESOLVED sets resolvedAt')
    assert(p2Mock.body?.feedback?.resolvedAt !== null, 'TEST 39: resolvedAt timestamp populated')

    // Student reopens their resolved bug: RESOLVED -> OPEN
    const { req: reopenReq, res: reopenRes, mockRes: reopenMock } = createMockReqRes({
      method: 'PATCH',
      headers: { authorization: `Bearer ${studentToken}` },
      body: { id: createdBugId, status: 'OPEN' },
    })
    await handler(reopenReq, reopenRes)
    assert(reopenMock.statusCode === 200, 'TEST 40: Author successfully reopens ticket (RESOLVED -> OPEN)')
    assert(reopenMock.body?.feedback?.status === 'OPEN', 'TEST 41: Status restored to OPEN')
  }

  // --------------------------------------------------------------------------
  console.log('\n--- Suite 5: Authorization & IDOR Protection ---')
  // --------------------------------------------------------------------------
  {
    // Student A reading their own feedback -> HTTP 200
    const { req: ownReq, res: ownRes, mockRes: ownMock } = createMockReqRes({
      method: 'GET',
      url: `/api/feedback?id=${createdBugId}`,
      headers: { authorization: `Bearer ${studentToken}` },
    })
    await handler(ownReq, ownRes)
    assert(ownMock.statusCode === 200, 'TEST 42: Creator can view own feedback report (HTTP 200)')
    assert(ownMock.body?.feedback?.reference === createdBugRef, 'TEST 43: Returned feedback matches created reference')

    // IDOR Attack: Student B trying to read Student A's feedback -> HTTP 403 Forbidden!
    const { req: idorReq, res: idorRes, mockRes: idorMock } = createMockReqRes({
      method: 'GET',
      url: `/api/feedback?id=${createdBugId}`,
      headers: { authorization: `Bearer ${otherStudentToken}` },
    })
    await handler(idorReq, idorRes)
    assert(idorMock.statusCode === 403, 'TEST 44: IDOR attempt rejected with HTTP 403 Forbidden')
    assert(idorMock.body?.success === false, 'TEST 45: IDOR response returns success=false')

    // Non-existent ID -> HTTP 404
    const { req: nfReq, res: nfRes, mockRes: nfMock } = createMockReqRes({
      method: 'GET',
      url: `/api/feedback?id=00000000-0000-0000-0000-000000000000`,
      headers: { authorization: `Bearer ${studentToken}` },
    })
    await handler(nfReq, nfRes)
    assert(nfMock.statusCode === 404, 'TEST 46: Non-existent feedback ID returns HTTP 404 Not Found')
  }

  // --------------------------------------------------------------------------
  console.log('\n--- Suite 6: Rate Limiting & Duplicate Protection ---')
  // --------------------------------------------------------------------------
  {
    resetRateLimitsForTesting()

    // Immediate duplicate submission without idempotency header -> HTTP 409
    const dupPayload = {
      type: 'BUG',
      title: 'Duplicate click test',
      description: 'Clicking submit rapidly multiple times.',
    }

    const { req: req1, res: res1, mockRes: mock1 } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: dupPayload,
    })
    await handler(req1, res1)
    assert(mock1.statusCode === 201, 'TEST 47: First submission succeeds (HTTP 201)')

    const { req: req2, res: res2, mockRes: mock2 } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}` },
      body: dupPayload,
    })
    await handler(req2, res2)
    assert(mock2.statusCode === 409, 'TEST 48: Immediate identical resubmission rejected with HTTP 409 Conflict')

    // Submission with X-Idempotency-Key -> returns cached 200 without creating second row
    const idemKey = 'test_idem_key_12345'
    const { req: idemReq1, res: idemRes1, mockRes: idemMock1 } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}`, 'x-idempotency-key': idemKey },
      body: { type: 'OTHER', description: 'Idempotency test unique payload' },
    })
    await handler(idemReq1, idemRes1)
    assert(idemMock1.statusCode === 201, 'TEST 49: Initial idempotent submission returns HTTP 201')

    const { req: idemReq2, res: idemRes2, mockRes: idemMock2 } = createMockReqRes({
      method: 'POST',
      headers: { authorization: `Bearer ${studentToken}`, 'x-idempotency-key': idemKey },
      body: { type: 'OTHER', description: 'Idempotency test unique payload' },
    })
    await handler(idemReq2, idemRes2)
    assert(idemMock2.statusCode === 200, 'TEST 50: Re-sent request with idempotency key returns cached HTTP 200')

    // Burst rate limiting test: checkRateLimit returns 429 when maxLimit is reached
    const testRateKey = 'rate_test_user_ip'
    for (let i = 0; i < 5; i++) {
      checkRateLimit(testRateKey, 5, 60000)
    }
    const overflow = checkRateLimit(testRateKey, 5, 60000)
    assert(overflow.allowed === false, 'TEST 51: Exceeding threshold triggers rate limit refusal')
    assert(typeof overflow.retryAfter === 'number' && overflow.retryAfter > 0, 'TEST 52: Provides positive retryAfter in seconds')
  }

  // --------------------------------------------------------------------------
  console.log('\n--- Suite 7: Database Persistence & Public Reference Verification ---')
  // --------------------------------------------------------------------------
  {
    // Direct Supabase query to verify row persistence
    const { data: report, error } = await supabaseServer
      .from('feedback_reports')
      .select('id, public_reference, type, status, priority, created_at, updated_at')
      .eq('id', createdBugId)
      .single()

    assert(!error && report !== null, 'TEST 53: Row successfully verified directly in PostgreSQL database')
    assert(/^FB-\d+$/.test(report?.public_reference), `TEST 54: Public reference (${report?.public_reference}) matches pattern FB-XXXX`)
    assert(!isNaN(Date.parse(report?.created_at)), 'TEST 55: Server timestamp created_at is valid ISO date')
    assert(!isNaN(Date.parse(report?.updated_at)), 'TEST 56: Server timestamp updated_at is valid ISO date')
  }

  console.log('\n========================================================================')
  console.log(`🏁 AUDIT RESULTS: ${passed} / ${total} TESTS PASSED`)
  console.log('========================================================================\n')

  if (passed === total) {
    console.log('🎉 ALL 56 BACKEND, DATABASE, SECURITY & LIFECYCLE TESTS PASSED!')
  } else {
    console.error(`⚠️ ${total - passed} TESTS FAILED!`)
    process.exitCode = 1
  }
} finally {
  resetTeamSyncMockTransport()
  if (createdReportIds.length > 0) {
    console.log(`\nCleaning up ${createdReportIds.length} synthetic test reports from PostgreSQL...`)
    await supabaseServer.from('feedback_reports').delete().in('id', createdReportIds)
    console.log('Cleanup completed successfully.')
  }
}
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
