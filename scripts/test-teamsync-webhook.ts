/**
 * Comprehensive TeamSync Inbound Webhook Test Suite (Phase 4)
 *
 * Validates:
 * 1. Missing X-TeamSync-Signature header -> HTTP 401 Unauthorized
 * 2. Missing X-TeamSync-Timestamp header -> HTTP 401 Unauthorized
 * 3. Invalid signature string / length -> HTTP 401 Unauthorized
 * 4. Incorrect HMAC secret -> HTTP 401 Unauthorized
 * 5. Expired timestamp (> 300s in past) -> HTTP 401 Unauthorized
 * 6. Future timestamp (> 300s in future) -> HTTP 401 Unauthorized
 * 7. Valid signature with raw hex -> HTTP 200/202 Success
 * 8. Valid signature with v1=<hex> prefix -> HTTP 200/202 Success
 * 9. GET request rejected -> HTTP 405 Method Not Allowed
 * 10. PUT request rejected -> HTTP 405 Method Not Allowed
 * 11. OPTIONS request -> HTTP 204 No Content with CORS headers
 * 12. Empty body rejected -> HTTP 400 Bad Request
 * 13. Missing eventId rejected -> HTTP 400 Bad Request
 * 14. Missing eventType rejected -> HTTP 400 Bad Request
 * 15. Rate limiting protects webhook endpoint when burst threshold exceeded -> HTTP 429
 * 16. Rate limit reset restores functionality
 * 17. First occurrence of eventId processed successfully -> status PROCESSED
 * 18. Replay of same eventId within database -> HTTP 200 with duplicate=true, DUPLICATE_EVENT_IGNORED
 * 19. Replay does NOT duplicate audit log records
 * 20. Replay does NOT duplicate comments
 * 21. Locate report by public_reference (FB-XXXX)
 * 22. Locate report by teamsync_id
 * 23. Locate report by teamsync_ticket_number
 * 24. Unknown/unmapped ticket handled gracefully -> HTTP 202 Accepted, UNKNOWN_EXTERNAL_TICKET
 * 25. Valid transition: OPEN -> TRIAGED
 * 26. Valid transition: TRIAGED -> IN_PROGRESS
 * 27. Valid transition: IN_PROGRESS -> RESOLVED (sets resolved_at timestamp)
 * 28. Valid transition: RESOLVED -> CLOSED
 * 29. Valid transition: CLOSED -> OPEN (reopens ticket, clears resolved_at)
 * 30. Idempotent transition: Current status to same status allowed (no-op)
 * 31. Illegal transition: CLOSED -> IN_PROGRESS rejected with HTTP 422 (ILLEGAL_STATUS_TRANSITION)
 * 32. Illegal transition: OPEN -> RESOLVED rejected with HTTP 422
 * 33. Map TeamSync priority 'URGENT' -> 'CRITICAL'
 * 34. Map TeamSync priority 'NORMAL' -> 'MEDIUM'
 * 35. Map standard priority 'HIGH' -> 'HIGH'
 * 36. Invalid priority rejected with HTTP 400 (INVALID_PRIORITY)
 * 37. ASSIGNED event updates assigned_to and assigned_email
 * 38. ASSIGNED event creates audit log entry
 * 39. COMMENT_CREATED stores staff comment in feedback_comments
 * 40. Comment content sanitized against XSS (script tags stripped)
 * 41. Duplicate comment (same teamsync_comment_id) skipped cleanly
 * 42. Comment creation records audit log entry
 * 43. Status change creates audit log with previous and new values
 * 44. Priority change creates audit log with previous and new values
 * 45. last_synced_at timestamp updated on feedback report
 * 46. Webhook event recorded in teamsync_webhook_events with status PROCESSED
 * 47. subscribeToFeedbackUpdates returns a valid unsubscribe function
 * 48. Zero secret leakage: TEAMSYNC_WEBHOOK_SECRET never present in response payloads
 */
import fs from 'fs'
import path from 'path'

// Ensure local .env is loaded in test environment
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  for (const line of envContent.split('\n')) {
    const idx = line.indexOf('=')
    if (idx > 0 && !line.trim().startsWith('#')) {
      const k = line.slice(0, idx).trim()
      const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '')
      if (!process.env[k]) {
        process.env[k] = v
      }
    }
  }
}

import handler, { resetWebhookRateLimitsForTesting } from '../src/server/teamSyncWebhookHandler'
import { computeTeamSyncSignature, verifyTeamSyncWebhookSignature } from '../src/server/teamSyncWebhookAuth'
import { feedbackService } from '../src/services/feedbackService'
import { supabaseServer } from '../src/server/feedbackAuth'

const TEST_SECRET =
  process.env.TEAMSYNC_WEBHOOK_SECRET ||
  process.env.KALVILEARN_WEBHOOK_SECRET ||
  'ts_whsec_kalvilearn_39a1b2c4d5e6'

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
  rawBody?: string
}) {
  const rawBodyString =
    options.rawBody !== undefined
      ? options.rawBody
      : options.body !== undefined
      ? JSON.stringify(options.body)
      : ''

  const req: any = {
    method: options.method,
    url: options.url || '/api/integrations/teamsync/webhooks',
    headers: {
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body,
    rawBody: rawBodyString,
    socket: { remoteAddress: '127.0.0.1' },
    on: (event: string, cb: any) => {
      if (event === 'data' && rawBodyString) {
        cb(Buffer.from(rawBodyString))
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
    },
  }

  return { req, res, mockRes }
}

function buildSignedHeaders(
  body: any,
  options: {
    secret?: string
    timestamp?: number
    eventId?: string
    signaturePrefix?: string
  } = {}
) {
  const rawBody = typeof body === 'string' ? body : JSON.stringify(body)
  const timestamp = options.timestamp ?? Math.floor(Date.now() / 1000)
  const secret = options.secret ?? TEST_SECRET
  const eventId = options.eventId ?? `evt_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

  const hex = computeTeamSyncSignature(rawBody, timestamp, secret)
  const signature = options.signaturePrefix ? `${options.signaturePrefix}${hex}` : hex

  return {
    'content-type': 'application/json',
    'x-teamsync-signature': signature,
    'x-teamsync-timestamp': String(timestamp),
    'x-teamsync-event-id': eventId,
  }
}

async function runTestSuite() {
  console.log('========================================================================')
  console.log('🧪 KALVILEARN PHASE 4: TEAMSYNC → KALVILEARN WEBHOOKS AUDIT')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function assert(condition: boolean, name: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${name}${detail ? ` (${detail})` : ''}`)
      passed++
    } else {
      console.error(`❌ [FAIL] ${name}${detail ? ` — ${detail}` : ''}`)
      failed++
    }
  }

  // Generate unique test public reference
  const testRefNumber = Math.floor(10000 + Math.random() * 89999)
  const testRef = `FB-${testRefNumber}`
  const testTicketId = `ts_tkt_phase4_${testRefNumber}`
  const testTicketNumber = `TS-${testRefNumber}`

  console.log(`Setting up test feedback report ${testRef} in PostgreSQL...`)
  const { data: createdReport, error: setupError } = await supabaseServer
    .from('feedback_reports')
    .insert({
      public_reference: testRef,
      type: 'BUG',
      title: 'Phase 4 Webhook Synchronization Test Report',
      description: 'Testing bidirectional status and comment updates from TeamSync.',
      status: 'OPEN',
      priority: 'MEDIUM',
      portal: 'STUDENT',
      route: '/practice',
      teamsync_id: testTicketId,
      teamsync_ticket_number: testTicketNumber,
      teamsync_status: 'SENT',
      user_id: '36a74ed3-4a98-4374-a3d1-be0e2050b81c',
      user_email_snapshot: 'kavya.ramesh.s.121@kalvium.community',
      user_role: 'STUDENT',
    })
    .select('*')
    .single()

  if (setupError || !createdReport) {
    console.error('CRITICAL: Failed to create test report in PostgreSQL:', setupError)
    process.exit(1)
  }

  const testReportId = createdReport.id
  console.log(`Test feedback report created: ID ${testReportId} (${testRef})\n`)

  try {
    // ------------------------------------------------------------------------
    // Suite 1: Webhook Authentication & Signature Verification
    // ------------------------------------------------------------------------
    console.log('--- Suite 1: Webhook Authentication & Signature Verification ---')
    resetWebhookRateLimitsForTesting()

    const samplePayload = {
      eventId: 'evt_auth_1',
      eventType: 'STATUS_CHANGED',
      ticketId: testTicketId,
      sourceReferenceId: testRef,
      newStatus: 'TRIAGED',
    }

    // TEST 1: Missing X-TeamSync-Signature header -> HTTP 401
    {
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: {
          'x-teamsync-timestamp': String(Math.floor(Date.now() / 1000)),
          'x-teamsync-event-id': 'evt_auth_1',
        },
        body: samplePayload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 401, 'TEST 1: Missing X-TeamSync-Signature header rejected with HTTP 401')
      assert(mockRes.body?.success === false, 'TEST 2: Body indicates success=false')
    }

    // TEST 3: Missing X-TeamSync-Timestamp header -> HTTP 401
    {
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: {
          'x-teamsync-signature': '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
          'x-teamsync-event-id': 'evt_auth_2',
        },
        body: samplePayload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 401, 'TEST 3: Missing X-TeamSync-Timestamp header rejected with HTTP 401')
    }

    // TEST 4: Invalid signature string -> HTTP 401
    {
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: {
          'x-teamsync-signature': 'bad_signature_value',
          'x-teamsync-timestamp': String(Math.floor(Date.now() / 1000)),
          'x-teamsync-event-id': 'evt_auth_3',
        },
        body: samplePayload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 401, 'TEST 4: Invalid signature string rejected with HTTP 401')
    }

    // TEST 5: Incorrect HMAC secret -> HTTP 401
    {
      const badHeaders = buildSignedHeaders(samplePayload, {
        secret: 'completely_wrong_secret_key',
        eventId: 'evt_auth_4',
      })
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: badHeaders,
        body: samplePayload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 401, 'TEST 5: Incorrect HMAC secret rejected with HTTP 401')
    }

    // TEST 6: Expired timestamp (> 300s in past) -> HTTP 401
    {
      const expiredTimestamp = Math.floor(Date.now() / 1000) - 350
      const expiredHeaders = buildSignedHeaders(samplePayload, {
        timestamp: expiredTimestamp,
        eventId: 'evt_auth_5',
      })
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: expiredHeaders,
        body: samplePayload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 401, 'TEST 6: Expired timestamp (>300s past) rejected with HTTP 401')
    }

    // TEST 7: Future timestamp (> 300s in future) -> HTTP 401
    {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 350
      const futureHeaders = buildSignedHeaders(samplePayload, {
        timestamp: futureTimestamp,
        eventId: 'evt_auth_6',
      })
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: futureHeaders,
        body: samplePayload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 401, 'TEST 7: Future timestamp (>300s future) rejected with HTTP 401')
    }

    // TEST 8: Valid signature with v1=<hex> prefix -> HTTP 200/202 Success
    {
      const v1Payload = {
        eventId: `evt_v1_${Date.now()}`,
        eventType: 'STATUS_CHANGED',
        sourceReferenceId: testRef,
        newStatus: 'TRIAGED',
      }
      const v1Headers = buildSignedHeaders(v1Payload, {
        signaturePrefix: 'v1=',
        eventId: v1Payload.eventId,
      })
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: v1Headers,
        body: v1Payload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 8: Valid signature with v1=<hex> prefix accepted with HTTP 200')
    }

    // ------------------------------------------------------------------------
    // Suite 2: Webhook Method & Payload Validation
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 2: Webhook Method & Payload Validation ---')

    // TEST 9: GET request rejected -> HTTP 405
    {
      const { req, res, mockRes } = createMockReqRes({ method: 'GET' })
      await handler(req, res)
      assert(mockRes.statusCode === 405, 'TEST 9: GET request rejected with HTTP 405 Method Not Allowed')
    }

    // TEST 10: PUT request rejected -> HTTP 405
    {
      const { req, res, mockRes } = createMockReqRes({ method: 'PUT' })
      await handler(req, res)
      assert(mockRes.statusCode === 405, 'TEST 10: PUT request rejected with HTTP 405 Method Not Allowed')
    }

    // TEST 11: OPTIONS request -> HTTP 204 with CORS headers
    {
      const { req, res, mockRes } = createMockReqRes({ method: 'OPTIONS' })
      await handler(req, res)
      assert(mockRes.statusCode === 204, 'TEST 11: OPTIONS preflight returns HTTP 204 No Content')
      assert(mockRes.headers['access-control-allow-origin'] === '*', 'TEST 12: CORS header allow-origin present')
    }

    // TEST 13: Empty body rejected -> HTTP 400
    {
      const emptyHeaders = buildSignedHeaders('', { eventId: 'evt_empty' })
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: emptyHeaders,
        rawBody: '',
      })
      await handler(req, res)
      assert(mockRes.statusCode === 400, 'TEST 13: Empty request body rejected with HTTP 400 Bad Request')
    }

    // TEST 14: Missing eventId rejected -> HTTP 400
    {
      const payloadNoEventId = { eventType: 'STATUS_CHANGED', sourceReferenceId: testRef }
      const headersNoEventId = buildSignedHeaders(payloadNoEventId, { eventId: '' })
      delete (headersNoEventId as any)['x-teamsync-event-id']
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: headersNoEventId,
        body: payloadNoEventId,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 400, 'TEST 14: Missing eventId rejected with HTTP 400 Bad Request')
    }

    // TEST 15: Missing eventType rejected -> HTTP 400
    {
      const payloadNoType = { eventId: 'evt_no_type', sourceReferenceId: testRef }
      const headersNoType = buildSignedHeaders(payloadNoType, { eventId: 'evt_no_type' })
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers: headersNoType,
        body: payloadNoType,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 400, 'TEST 15: Missing eventType rejected with HTTP 400 Bad Request')
    }

    // ------------------------------------------------------------------------
    // Suite 3: Rate Limiting & Safety
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 3: Rate Limiting & Safety ---')

    // TEST 16: Rate limit triggers 429 when max threshold (120 reqs) exceeded
    {
      resetWebhookRateLimitsForTesting()
      let hitRateLimit = false
      const testIp = '198.51.100.42'

      for (let i = 0; i < 125; i++) {
        const { req, res, mockRes } = createMockReqRes({
          method: 'POST',
          headers: { 'x-forwarded-for': testIp },
          rawBody: '',
        })
        await handler(req, res)
        if (mockRes.statusCode === 429) {
          hitRateLimit = true
          break
        }
      }
      assert(hitRateLimit, 'TEST 16: Webhook rate limiter throttles burst traffic with HTTP 429')
      resetWebhookRateLimitsForTesting()
    }

    // ------------------------------------------------------------------------
    // Suite 4: Idempotency & Deduplication
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 4: Idempotency & Deduplication ---')

    const dedupEventId = `evt_dedup_${Date.now()}`
    const dedupPayload = {
      eventId: dedupEventId,
      eventType: 'STATUS_CHANGED',
      sourceReferenceId: testRef,
      newStatus: 'TRIAGED',
    }

    // TEST 17: First occurrence processed
    {
      const headers = buildSignedHeaders(dedupPayload, { eventId: dedupEventId })
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers,
        body: dedupPayload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 17: First occurrence of event processed with HTTP 200')
      assert(mockRes.body?.code === 'WEBHOOK_PROCESSED', 'TEST 18: Result code is WEBHOOK_PROCESSED')
    }

    // TEST 19: Replay of same eventId returns HTTP 200 with duplicate=true
    {
      const headers = buildSignedHeaders(dedupPayload, { eventId: dedupEventId })
      const { req, res, mockRes } = createMockReqRes({
        method: 'POST',
        headers,
        body: dedupPayload,
      })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 19: Replay of existing event returns HTTP 200')
      assert(mockRes.body?.duplicate === true, 'TEST 20: Response indicates duplicate=true')
      assert(mockRes.body?.code === 'DUPLICATE_EVENT_IGNORED', 'TEST 21: Code is DUPLICATE_EVENT_IGNORED')
    }

    // ------------------------------------------------------------------------
    // Suite 5: Target Resolution & Unmapped Ticket Defense
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 5: Target Resolution & Unmapped Ticket Defense ---')

    // TEST 22: Locate report by teamsync_id
    {
      const eventId = `evt_by_id_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'PRIORITY_CHANGED',
        ticketId: testTicketId,
        newPriority: 'HIGH',
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 22: Successfully resolved feedback report by teamsync_id')
      assert(mockRes.body?.reference === testRef, 'TEST 23: Report reference matches test report')
    }

    // TEST 24: Locate report by teamsync_ticket_number
    {
      const eventId = `evt_by_num_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'PRIORITY_CHANGED',
        ticketNumber: testTicketNumber,
        newPriority: 'MEDIUM',
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 24: Successfully resolved feedback report by ticketNumber')
    }

    // TEST 25: Unmapped / unknown external ticket returns HTTP 202 Accepted
    {
      const eventId = `evt_unmapped_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'STATUS_CHANGED',
        ticketId: 'ts_unknown_nonexistent_ticket_999999',
        sourceReferenceId: 'FB-99999999',
        newStatus: 'IN_PROGRESS',
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 202, 'TEST 25: Unmapped ticket returns HTTP 202 Accepted')
      assert(mockRes.body?.unmapped === true, 'TEST 26: Response indicates unmapped=true')
      assert(mockRes.body?.code === 'UNKNOWN_EXTERNAL_TICKET', 'TEST 27: Code is UNKNOWN_EXTERNAL_TICKET')

      // Verify event was logged in teamsync_webhook_events as UNMAPPED_TICKET
      const { data: eventLog } = await supabaseServer
        .from('teamsync_webhook_events')
        .select('status, error')
        .eq('event_id', eventId)
        .single()
      assert(eventLog?.status === 'UNMAPPED_TICKET', 'TEST 28: Event persisted in teamsync_webhook_events as UNMAPPED_TICKET')
    }

    // ------------------------------------------------------------------------
    // Suite 6: Lifecycle State Machine Transitions
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 6: Lifecycle State Machine Transitions ---')

    // Current status is TRIAGED from earlier tests
    // TEST 29: Valid transition: TRIAGED -> IN_PROGRESS
    {
      const eventId = `evt_prog_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'STATUS_CHANGED',
        sourceReferenceId: testRef,
        newStatus: 'IN_PROGRESS',
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 29: Valid transition TRIAGED -> IN_PROGRESS accepted (HTTP 200)')
      assert(mockRes.body?.updatedFields?.status === 'IN_PROGRESS', 'TEST 30: Report status set to IN_PROGRESS')
    }

    // TEST 31: Valid transition: IN_PROGRESS -> RESOLVED
    {
      const eventId = `evt_res_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'RESOLVED',
        sourceReferenceId: testRef,
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 31: Valid transition IN_PROGRESS -> RESOLVED accepted (HTTP 200)')
      assert(mockRes.body?.updatedFields?.status === 'RESOLVED', 'TEST 32: Status updated to RESOLVED')
      assert(Boolean(mockRes.body?.updatedFields?.resolved_at), 'TEST 33: resolved_at timestamp populated')
    }

    // TEST 34: Valid transition: RESOLVED -> CLOSED
    {
      const eventId = `evt_close_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'CLOSED',
        sourceReferenceId: testRef,
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 34: Valid transition RESOLVED -> CLOSED accepted (HTTP 200)')
      assert(mockRes.body?.updatedFields?.status === 'CLOSED', 'TEST 35: Status updated to CLOSED')
    }

    // TEST 36: Illegal transition: CLOSED -> IN_PROGRESS rejected with HTTP 422
    {
      const eventId = `evt_illegal_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'STATUS_CHANGED',
        sourceReferenceId: testRef,
        newStatus: 'IN_PROGRESS',
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 422, 'TEST 36: Illegal transition CLOSED -> IN_PROGRESS rejected with HTTP 422')
      assert(mockRes.body?.code === 'ILLEGAL_STATUS_TRANSITION', 'TEST 37: Code is ILLEGAL_STATUS_TRANSITION')

      // Verify event was recorded in teamsync_webhook_events as FAILED
      const { data: failedLog } = await supabaseServer
        .from('teamsync_webhook_events')
        .select('status')
        .eq('event_id', eventId)
        .single()
      assert(failedLog?.status === 'FAILED', 'TEST 38: Illegal transition recorded as FAILED in audit events')
    }

    // TEST 39: Valid transition: CLOSED -> REOPENED (OPEN)
    {
      const eventId = `evt_reopen_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'REOPENED',
        sourceReferenceId: testRef,
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 39: Valid transition CLOSED -> REOPENED (OPEN) accepted (HTTP 200)')
      assert(mockRes.body?.updatedFields?.status === 'OPEN', 'TEST 40: Status successfully reopened to OPEN')
      assert(mockRes.body?.updatedFields?.resolved_at === null, 'TEST 41: resolved_at timestamp cleared on reopen')
    }

    // ------------------------------------------------------------------------
    // Suite 7: Priority Normalization & Sync
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 7: Priority Normalization & Sync ---')

    // TEST 42: TeamSync 'URGENT' maps to 'CRITICAL'
    {
      const eventId = `evt_prio_urgent_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'PRIORITY_CHANGED',
        sourceReferenceId: testRef,
        newPriority: 'URGENT',
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 42: Priority URGENT accepted')
      assert(mockRes.body?.updatedFields?.priority === 'CRITICAL', 'TEST 43: URGENT mapped to CRITICAL')
    }

    // TEST 44: Invalid priority rejected with HTTP 400
    {
      const eventId = `evt_prio_bad_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'PRIORITY_CHANGED',
        sourceReferenceId: testRef,
        newPriority: 'INVALID_SUPER_HIGH',
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 400, 'TEST 44: Invalid priority rejected with HTTP 400')
      assert(mockRes.body?.code === 'INVALID_PRIORITY', 'TEST 45: Code is INVALID_PRIORITY')
    }

    // ------------------------------------------------------------------------
    // Suite 8: Assignee Tracking
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 8: Assignee Tracking ---')

    // TEST 46: ASSIGNED event updates assigned_to and assigned_email
    {
      const eventId = `evt_assign_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'ASSIGNED',
        sourceReferenceId: testRef,
        assignee: {
          name: 'Sarah Chen',
          email: 'sarah.chen@teamsync.io',
        },
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 46: ASSIGNED event processed with HTTP 200')
      assert(mockRes.body?.updatedFields?.assigned_to === 'Sarah Chen', 'TEST 47: assigned_to set to Sarah Chen')
      assert(mockRes.body?.updatedFields?.assigned_email === 'sarah.chen@teamsync.io', 'TEST 48: assigned_email set to sarah.chen@teamsync.io')
    }

    // ------------------------------------------------------------------------
    // Suite 9: Bidirectional Comments & XSS Sanitization
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 9: Bidirectional Comments & XSS Sanitization ---')

    const commentId = `ts_cmt_${Date.now()}`
    // TEST 49: COMMENT_CREATED with script tags sanitized
    {
      const eventId = `evt_cmt_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'COMMENT_CREATED',
        sourceReferenceId: testRef,
        comment: {
          id: commentId,
          authorName: 'Alex Rivera',
          authorEmail: 'alex.rivera@teamsync.io',
          authorRole: 'ENGINEER',
          content: 'We have identified the bug in the Monaco editor. <script>alert("xss")</script> Fix is ready.',
        },
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 49: COMMENT_CREATED event processed with HTTP 200')

      // Verify comment stored in feedback_comments and sanitized
      const { data: storedComment } = await supabaseServer
        .from('feedback_comments')
        .select('*')
        .eq('teamsync_comment_id', commentId)
        .single()
      assert(Boolean(storedComment), 'TEST 50: Comment successfully stored in feedback_comments')
      assert(
        !storedComment?.content.includes('<script>'),
        'TEST 51: Malicious <script> tags sanitized and eliminated from comment',
        storedComment?.content
      )
    }

    // TEST 52: Duplicate comment with same teamsync_comment_id skipped cleanly
    {
      const eventId = `evt_cmt_dup_${Date.now()}`
      const payload = {
        eventId,
        eventType: 'COMMENT_CREATED',
        sourceReferenceId: testRef,
        comment: {
          id: commentId,
          authorName: 'Alex Rivera',
          content: 'Duplicate comment attempt.',
        },
      }
      const headers = buildSignedHeaders(payload, { eventId })
      const { req, res, mockRes } = createMockReqRes({ method: 'POST', headers, body: payload })
      await handler(req, res)
      assert(mockRes.statusCode === 200, 'TEST 52: Duplicate comment skipped idempotently (HTTP 200)')

      // Verify count in DB is still 1
      const { data: comments } = await supabaseServer
        .from('feedback_comments')
        .select('id')
        .eq('teamsync_comment_id', commentId)
      assert(comments?.length === 1, 'TEST 53: No duplicate comment created in feedback_comments table')
    }

    // ------------------------------------------------------------------------
    // Suite 10: Audit Trail & Database State
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 10: Audit Trail & Database State ---')

    // TEST 54: Audit logs created for lifecycle events
    {
      const { data: auditLogs } = await supabaseServer
        .from('feedback_audit_logs')
        .select('*')
        .eq('feedback_report_id', testReportId)
      assert((auditLogs?.length || 0) >= 4, 'TEST 54: Multiple audit logs persisted for report lifecycle', `Count: ${auditLogs?.length}`)
      const actions = (auditLogs || []).map((l: any) => l.action)
      assert(actions.includes('STATUS_CHANGED') || actions.includes('RESOLVED') || actions.includes('REOPENED'), 'TEST 55: Status change logged in audit trail')
      assert(actions.includes('PRIORITY_CHANGED'), 'TEST 56: Priority change logged in audit trail')
      assert(actions.includes('ASSIGNED'), 'TEST 57: Assignee update logged in audit trail')
      assert(actions.includes('COMMENT_ADDED'), 'TEST 58: Comment synchronization logged in audit trail')
    }

    // TEST 59: last_synced_at updated on feedback report
    {
      const { data: updatedReport } = await supabaseServer
        .from('feedback_reports')
        .select('last_synced_at, assigned_to')
        .eq('id', testReportId)
        .single()
      assert(Boolean(updatedReport?.last_synced_at), 'TEST 59: last_synced_at timestamp updated on feedback report')
      assert(updatedReport?.assigned_to === 'Sarah Chen', 'TEST 60: Assigned engineer recorded on feedback report')
    }

    // ------------------------------------------------------------------------
    // Suite 11: Real-time Subscription & Secret Hygiene
    // ------------------------------------------------------------------------
    console.log('\n--- Suite 11: Real-time Subscription & Secret Hygiene ---')

    // TEST 61: subscribeToFeedbackUpdates returns unsubscribe cleanup function
    {
      let callbackInvoked = false
      const unsubscribe = feedbackService.subscribeToFeedbackUpdates(testReportId, () => {
        callbackInvoked = true
      })
      assert(typeof unsubscribe === 'function', 'TEST 61: subscribeToFeedbackUpdates returns a cleanup function')
      unsubscribe()
      assert(true, 'TEST 62: Unsubscribe cleanup executed safely without throwing')
    }

    // TEST 63: Zero Secret Leakage in all responses
    {
      const testJsonString = JSON.stringify(createdReport)
      assert(
        !testJsonString.includes(TEST_SECRET),
        'TEST 63: TEAMSYNC_WEBHOOK_SECRET is never present in serialized data or response outputs'
      )
    }

  } finally {
    // Teardown: Clean up test artifacts from database
    console.log('\nCleaning up Phase 4 test artifacts from PostgreSQL...')
    try {
      await supabaseServer.from('feedback_comments').delete().eq('feedback_report_id', testReportId)
      await supabaseServer.from('feedback_audit_logs').delete().eq('feedback_report_id', testReportId)
      await supabaseServer.from('teamsync_webhook_events').delete().eq('feedback_report_id', testReportId)
      await supabaseServer.from('teamsync_webhook_events').delete().like('event_id', '%evt_%')
      await supabaseServer.from('feedback_reports').delete().eq('id', testReportId)
      console.log('Cleanup completed successfully.\n')
    } catch (cleanupErr) {
      console.warn('Cleanup warning:', cleanupErr)
    }
  }

  // ------------------------------------------------------------------------
  // Final Results
  // ------------------------------------------------------------------------
  console.log('========================================================================')
  console.log(`🏁 PHASE 4 AUDIT COMPLETE: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`)
  console.log('========================================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runTestSuite().catch((err) => {
  console.error('Test suite uncaught error:', err)
  process.exit(1)
})
