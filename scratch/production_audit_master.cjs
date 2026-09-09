const fs = require('fs');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('d:/TeamSync/node_modules/pg');

// 1. Load KalviLearn config
const klEnv = fs.readFileSync('e:/KalviCode/.env', 'utf8');
let klDbUrl = '';
let klDirectUrl = '';
let klUrl = '';
let klAnonKey = '';
let klServiceKey = '';
let tsApiUrl = '';
let tsApiKey = '';
let webhookSecret = '';

for (const line of klEnv.split('\n')) {
  const idx = line.indexOf('=');
  if (idx > 0 && !line.trim().startsWith('#')) {
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (k === 'DATABASE_URL') klDbUrl = v;
    if (k === 'DIRECT_URL') klDirectUrl = v;
    if (k === 'VITE_SUPABASE_URL' || k === 'SUPABASE_URL') klUrl = v;
    if (k === 'VITE_SUPABASE_ANON_KEY') klAnonKey = v;
    if (k === 'SUPABASE_SERVICE_ROLE_KEY') klServiceKey = v;
    if (k === 'TEAMSYNC_API_URL') tsApiUrl = v;
    if (k === 'TEAMSYNC_API_KEY') tsApiKey = v;
    if (k === 'KALVILEARN_WEBHOOK_SECRET' || k === 'TEAMSYNC_WEBHOOK_SECRET') webhookSecret = v;
  }
}

// 2. Load TeamSync config
const tsEnv = fs.readFileSync('d:/TeamSync/.env', 'utf8');
let tsDirectUrl = '';
for (const line of tsEnv.split('\n')) {
  const idx = line.indexOf('=');
  if (idx > 0 && !line.trim().startsWith('#')) {
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (k === 'DIRECT_URL' || (k === 'DATABASE_URL' && !tsDirectUrl)) tsDirectUrl = v;
  }
}

const klClient = createClient(klUrl, klServiceKey || klAnonKey);
const tsPool = new Pool({ connectionString: tsDirectUrl, ssl: { rejectUnauthorized: false } });

const KALVI_TICKETS_URL = 'https://kalvilearn.vercel.app/api/integrations/teamsync/tickets';
const KALVI_WEBHOOK_URL = 'https://kalvilearn.vercel.app/api/integrations/teamsync/webhooks';
const TEAMSYNC_URL = tsApiUrl || 'https://teamsync-fawn.vercel.app';

const MENTOR_AUTH_DEFAULT = 'Bearer test_auth_mentor_sivakumarelango10@gmail.com';
const MENTOR_AUTH_VALIDATION = 'Bearer test_auth_mentor_val_tester@kalvilearn.edu';
const MENTOR_AUTH_ATTACHMENT = 'Bearer test_auth_mentor_att_tester@kalvilearn.edu';
const MENTOR_AUTH_E2E = 'Bearer test_auth_mentor_e2e_tester@kalvilearn.edu';

const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function recordTest(category, name, passed, details = '') {
  results.tests.push({ category, name, passed, details });
  if (passed) {
    results.passed++;
    console.log(`  ✅ [PASS] ${name}`);
  } else {
    results.failed++;
    console.error(`  ❌ [FAIL] ${name}: ${details}`);
  }
}

async function runAudit() {
  console.log('========================================================================');
  console.log('🚀 KALVILEARN PHASE 2 <-> TEAMSYNC PHASE 1 PRODUCTION INTEGRATION AUDIT');
  console.log('========================================================================');
  console.log(`KalviLearn Production: ${KALVI_TICKETS_URL}`);
  console.log(`TeamSync Production:   ${TEAMSYNC_URL}`);
  console.log(`Time: ${new Date().toISOString()}\n`);

  // ─── 1. AUTHENTICATION MATRIX ──────────────────────────────────────────────
  console.log('--- 1. Authentication Matrix ---');
  try {
    // A. Unauthenticated
    const resNoAuth = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'BUG', title: 'Test', description: 'Desc' })
    });
    recordTest('Auth', 'Unauthenticated request rejected with HTTP 401', resNoAuth.status === 401, `Status: ${resNoAuth.status}`);

    // B. Invalid session token
    const resBadToken = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid_forged_session_token'
      },
      body: JSON.stringify({ type: 'BUG', title: 'Test', description: 'Desc' })
    });
    recordTest('Auth', 'Invalid session rejected with HTTP 401', resBadToken.status === 401, `Status: ${resBadToken.status}`);

    // C. Server authoritatively derives identity (client user_id override prevented)
    const resSpoof = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MENTOR_AUTH
      },
      body: JSON.stringify({
        type: 'BUG',
        title: 'Auth Identity Verification Bug',
        description: 'Verifying user identity is authoritative and cannot be forged by client payload.',
        user_id: 'attacker-injected-id',
        user: { id: 'attacker-id', email: 'attacker@hacker.io', role: 'SUPERADMIN' }
      })
    });
    const spoofData = await resSpoof.json();
    const createdReportId = spoofData.localId;
    let spoofCheckPassed = false;
    if (createdReportId) {
      const { data: dbReport } = await klClient.from('feedback_reports').select('user_email_snapshot, user_role, user_id').eq('id', createdReportId).single();
      spoofCheckPassed = dbReport && dbReport.user_email_snapshot === 'sivakumarelango10@gmail.com' && dbReport.user_role === 'MENTOR';
    }
    recordTest('Auth', 'User identity authoritatively derived from server context (client spoofing prevented)', resSpoof.status === 201 && spoofCheckPassed);
  } catch (err) {
    recordTest('Auth', 'Authentication suite exception', false, err.message);
  }

  // ─── 2. INPUT VALIDATION BOUNDARY ──────────────────────────────────────────
  console.log('\n--- 2. Input Validation Boundary Matrix ---');
  try {
    // Empty title
    const resEmptyTitle = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_VALIDATION },
      body: JSON.stringify({ type: 'BUG', title: '', description: 'Valid description here' })
    });
    recordTest('Validation', 'Empty title rejected with HTTP 400', resEmptyTitle.status === 400, `Status: ${resEmptyTitle.status}`);

    // 1-character title "a"
    const res1CharTitle = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_VALIDATION },
      body: JSON.stringify({ type: 'BUG', title: 'a', description: 'Valid description here' })
    });
    recordTest('Validation', '1-character title "a" rejected with HTTP 400', res1CharTitle.status === 400, `Status: ${res1CharTitle.status}`);

    // 2-character title "ab"
    const res2CharTitle = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_VALIDATION },
      body: JSON.stringify({ type: 'BUG', title: 'ab', description: 'Valid description here' })
    });
    recordTest('Validation', '2-character title "ab" rejected with HTTP 400', res2CharTitle.status === 400, `Status: ${res2CharTitle.status}`);

    // 2-character title "sd"
    const resSdTitle = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_VALIDATION },
      body: JSON.stringify({ type: 'BUG', title: 'sd', description: 'Valid description here' })
    });
    recordTest('Validation', '2-character title "sd" rejected with HTTP 400', resSdTitle.status === 400, `Status: ${resSdTitle.status}`);

    // Empty description
    const resEmptyDesc = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_VALIDATION },
      body: JSON.stringify({ type: 'BUG', title: 'Valid Title', description: '' })
    });
    recordTest('Validation', 'Empty description rejected with HTTP 400', resEmptyDesc.status === 400, `Status: ${resEmptyDesc.status}`);

    // Short description (< 5 chars)
    const resShortDesc = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_VALIDATION },
      body: JSON.stringify({ type: 'BUG', title: 'Valid Title', description: 'bad' })
    });
    recordTest('Validation', 'Short description (<5 chars) rejected with HTTP 400', resShortDesc.status === 400, `Status: ${resShortDesc.status}`);

    // Oversized description (> 4000 chars)
    const longDesc = 'A'.repeat(4001);
    const resLongDesc = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_VALIDATION },
      body: JSON.stringify({ type: 'BUG', title: 'Valid Title', description: longDesc })
    });
    recordTest('Validation', 'Oversized description (>4000 chars) rejected with HTTP 400', resLongDesc.status === 400, `Status: ${resLongDesc.status}`);

    // Valid 3-char title "Bug"
    const res3Char = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_VALIDATION },
      body: JSON.stringify({ type: 'BUG', title: 'Bug', description: 'Valid description for 3-char title test' })
    });
    recordTest('Validation', '3-character title "Bug" accepted with HTTP 201', res3Char.status === 201, `Status: ${res3Char.status}`);
  } catch (err) {
    recordTest('Validation', 'Validation suite exception', false, err.message);
  }

  // ─── 3. ATTACHMENT VALIDATION ──────────────────────────────────────────────
  console.log('\n--- 3. Attachment Validation Matrix ---');
  try {
    // Valid PNG Attachment
    const validPngBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const resPng = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_ATTACHMENT },
      body: JSON.stringify({
        type: 'BUG',
        title: 'Valid PNG Attachment Test',
        description: 'Verifying valid PNG screenshot processing in production.',
        attachment: {
          dataUrl: validPngBase64,
          fileName: 'test.png',
          fileType: 'image/png',
          fileSize: 100
        }
      })
    });
    recordTest('Attachment', 'Valid PNG attachment accepted (HTTP 201)', resPng.status === 201, `Status: ${resPng.status}`);

    // Invalid MIME type (e.g. application/pdf)
    const resInvalidMime = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_ATTACHMENT },
      body: JSON.stringify({
        type: 'BUG',
        title: 'Invalid Attachment Test',
        description: 'Verifying invalid mime rejection in production.',
        attachment: {
          dataUrl: 'data:application/pdf;base64,JVBERi0xLg==',
          fileName: 'malicious.pdf',
          fileType: 'application/pdf',
          fileSize: 500
        }
      })
    });
    recordTest('Attachment', 'Invalid attachment MIME type rejected with HTTP 400', resInvalidMime.status === 400, `Status: ${resInvalidMime.status}`);

    // Oversized attachment (> 5MB)
    const resOversized = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': MENTOR_AUTH_ATTACHMENT },
      body: JSON.stringify({
        type: 'BUG',
        title: 'Oversized Attachment Test',
        description: 'Verifying oversized image rejection in production.',
        attachment: {
          dataUrl: validPngBase64,
          fileName: 'oversized.png',
          fileType: 'image/png',
          fileSize: 6 * 1024 * 1024
        }
      })
    });
    recordTest('Attachment', 'Oversized attachment (>5MB) rejected with HTTP 400', resOversized.status === 400, `Status: ${resOversized.status}`);
  } catch (err) {
    recordTest('Attachment', 'Attachment validation exception', false, err.message);
  }

  // ─── 4. WEBHOOK RECEIVER SECURITY & REPLAY PROTECTION ──────────────────────
  console.log('\n--- 4. Webhook Receiver Security & Replay Matrix ---');
  try {
    // Missing Signature
    const resWhNoSig = await fetch(KALVI_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true })
    });
    recordTest('Webhook', 'Missing X-TeamSync-Signature rejected with HTTP 401', resWhNoSig.status === 401, `Status: ${resWhNoSig.status}`);

    // Invalid Signature
    const resWhBadSig = await fetch(KALVI_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TeamSync-Signature': 'invalid_forged_hex_signature',
        'X-TeamSync-Timestamp': String(Math.floor(Date.now() / 1000)),
        'X-TeamSync-Event-ID': 'evt_bad_sig'
      },
      body: JSON.stringify({ test: true })
    });
    recordTest('Webhook', 'Invalid signature rejected with HTTP 401', resWhBadSig.status === 401, `Status: ${resWhBadSig.status}`);

    // Expired Timestamp (> 300s drift)
    const expiredTimestamp = Math.floor(Date.now() / 1000) - 400;
    const expiredBody = JSON.stringify({ test: true });
    const expiredSig = crypto.createHmac('sha256', webhookSecret).update(`${expiredTimestamp}.${expiredBody}`).digest('hex');
    const resWhExpired = await fetch(KALVI_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TeamSync-Signature': expiredSig,
        'X-TeamSync-Timestamp': String(expiredTimestamp),
        'X-TeamSync-Event-ID': 'evt_expired'
      },
      body: expiredBody
    });
    recordTest('Webhook', 'Expired timestamp (>300s drift) rejected with HTTP 401', resWhExpired.status === 401, `Status: ${resWhExpired.status}`);

    // Unmapped Ticket Handling (HTTP 202)
    const validNow = Math.floor(Date.now() / 1000);
    const unmappedEventId = `evt_unmapped_audit_${Date.now()}`;
    const unmappedPayload = {
      eventId: unmappedEventId,
      eventType: 'STATUS_CHANGED',
      timestamp: validNow,
      ticketId: 'ts_unknown_ticket_99999',
      ticketNumber: 'TS-99999',
      sourceReferenceId: 'FB-99999-UNMAPPED',
      newStatus: 'TRIAGED'
    };
    const unmappedBody = JSON.stringify(unmappedPayload);
    const unmappedSig = crypto.createHmac('sha256', webhookSecret).update(`${validNow}.${unmappedBody}`).digest('hex');
    const resWhUnmapped = await fetch(KALVI_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TeamSync-Signature': unmappedSig,
        'X-TeamSync-Timestamp': String(validNow),
        'X-TeamSync-Event-ID': unmappedEventId
      },
      body: unmappedBody
    });
    const unmappedJson = await resWhUnmapped.json();
    recordTest('Webhook', 'Unmapped ticket handled safely with HTTP 202 and unmapped=true', resWhUnmapped.status === 202 && unmappedJson.unmapped === true);
  } catch (err) {
    recordTest('Webhook', 'Webhook security suite exception', false, err.message);
  }

  // ─── 5. FULL PRODUCTION E2E ROUND-TRIP & BIDIRECTIONAL LIFECYCLE ───────────
  console.log('\n--- 5. Full Production E2E Round-Trip & Lifecycle Sync ---');
  let testRef = '';
  let testTicketNumber = '';
  let testTicketId = '';

  try {
    // Step 1: Submit a valid Mentor Bug Report from KalviLearn
    const timestamp = Date.now();
    const uniqueTitle = `Production Audit Verification #${timestamp.toString().slice(-4)}`;
    const uniqueDesc = `Controlled end-to-end audit of KalviLearn Phase 2 and TeamSync Phase 1 integration. Timestamp: ${timestamp}`;

    console.log(`Submitting report to ${KALVI_TICKETS_URL}...`);
    const submitRes = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MENTOR_AUTH_E2E,
        'X-Idempotency-Key': `idem_prod_audit_${timestamp}`
      },
      body: JSON.stringify({
        type: 'BUG',
        title: uniqueTitle,
        description: uniqueDesc,
        priority: 'MEDIUM',
        portal: 'MENTOR',
        route: '/mentor/dashboard',
        module: 'Practice Arena'
      })
    });

    const submitJson = await submitRes.json();
    recordTest('Lifecycle', 'Report created in KalviLearn (HTTP 201)', submitRes.status === 201, `Status: ${submitRes.status}`);

    testRef = submitJson.reportId || submitJson.feedback?.reference;
    testTicketNumber = submitJson.teamSync?.ticketNumber;
    testTicketId = submitJson.teamSync?.ticketId;

    recordTest('Lifecycle', 'KalviLearn returns public reference and TeamSync ticket number', Boolean(testRef && testTicketNumber && testTicketId), `Ref: ${testRef}, Ticket: ${testTicketNumber}`);

    // Step 2: Verify KalviLearn database record
    const { data: klReport } = await klClient
      .from('feedback_reports')
      .select('*')
      .eq('public_reference', testRef)
      .single();

    recordTest('Lifecycle', 'KalviLearn PostgreSQL DB contains report record with teamsync_status = SENT', klReport && klReport.teamsync_status === 'SENT' && klReport.teamsync_id === testTicketId);

    // Step 3: Verify TeamSync database record
    const tsTicketRes = await tsPool.query('SELECT * FROM public.tickets WHERE ticket_number = $1;', [testTicketNumber]);
    const tsTicket = tsTicketRes.rows[0];

    const refMatch = tsTicket && (tsTicket.external_reference_id === testRef || tsTicket.source_reference_id === testRef);
    recordTest('Lifecycle', 'TeamSync PostgreSQL DB contains ticket record matching reference', Boolean(refMatch), `Ref in TS: ${tsTicket?.external_reference_id}`);
    recordTest('Lifecycle', 'TeamSync and KalviLearn ticket IDs match exactly', klReport?.teamsync_id === tsTicket?.id);

    // Step 4: Idempotency Verification
    const dupRes = await fetch(KALVI_TICKETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MENTOR_AUTH_E2E,
        'X-Idempotency-Key': `idem_prod_audit_${timestamp}`
      },
      body: JSON.stringify({
        type: 'BUG',
        title: uniqueTitle,
        description: uniqueDesc
      })
    });
    const dupJson = await dupRes.json();
    recordTest('Lifecycle', 'Idempotent resubmission returns HTTP 200 with matching ticket number', dupRes.status === 200 && dupJson.teamSync?.ticketNumber === testTicketNumber);

    // Step 5: Lifecycle Sync: Status change in TeamSync (OPEN -> TRIAGED)
    console.log(`Updating TeamSync status: ${testTicketNumber} -> TRIAGED...`);
    const statusRes = await fetch(`${TEAMSYNC_URL}/api/v1/tickets/${testTicketNumber}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tsApiKey}`
      },
      body: JSON.stringify({
        status: 'TRIAGED',
        performedBy: 'mentor_elango',
        performedByName: 'Elango Sivakumar'
      })
    });
    recordTest('Lifecycle', 'TeamSync status updated to TRIAGED (HTTP 200)', statusRes.status === 200);

    // Wait 4 seconds for webhook delivery & DB sync
    await new Promise(r => setTimeout(r, 4000));

    // Check KalviLearn DB status
    const { data: klReportAfterStatus } = await klClient
      .from('feedback_reports')
      .select('status, updated_at, last_synced_at')
      .eq('public_reference', testRef)
      .single();

    recordTest('Lifecycle', 'KalviLearn DB status synchronized to TRIAGED via TeamSync webhook', klReportAfterStatus?.status === 'TRIAGED', `Status: ${klReportAfterStatus?.status}`);

    // Step 6: Lifecycle Sync: Priority change in TeamSync (MEDIUM -> CRITICAL)
    console.log(`Updating TeamSync priority: ${testTicketNumber} -> CRITICAL...`);
    const prioRes = await fetch(`${TEAMSYNC_URL}/api/v1/tickets/${testTicketNumber}/priority`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tsApiKey}`
      },
      body: JSON.stringify({
        priority: 'CRITICAL',
        performedByName: 'Elango Sivakumar'
      })
    });
    recordTest('Lifecycle', 'TeamSync priority updated to CRITICAL (HTTP 200)', prioRes.status === 200);

    await new Promise(r => setTimeout(r, 4000));

    const { data: klReportAfterPrio } = await klClient
      .from('feedback_reports')
      .select('priority')
      .eq('public_reference', testRef)
      .single();

    recordTest('Lifecycle', 'KalviLearn DB priority synchronized to CRITICAL via TeamSync webhook', klReportAfterPrio?.priority === 'CRITICAL', `Priority: ${klReportAfterPrio?.priority}`);

    // Step 7: Lifecycle Sync: Assignment in TeamSync
    console.log(`Assigning ticket in TeamSync: ${testTicketNumber}...`);
    // Find a valid profile in TeamSync
    const profilesRes = await tsPool.query('SELECT id, full_name, email FROM public.profiles LIMIT 1;');
    const profile = profilesRes.rows[0];

    if (profile) {
      const assignRes = await fetch(`${TEAMSYNC_URL}/api/v1/tickets/${testTicketNumber}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tsApiKey}`
        },
        body: JSON.stringify({
          assigneeProfileId: profile.id,
          performedByName: 'Elango Sivakumar'
        })
      });
      recordTest('Lifecycle', 'TeamSync ticket assigned to staff member (HTTP 200)', assignRes.status === 200);

      await new Promise(r => setTimeout(r, 4000));

      const { data: klReportAfterAssign } = await klClient
        .from('feedback_reports')
        .select('assigned_to')
        .eq('public_reference', testRef)
        .single();

      recordTest('Lifecycle', 'KalviLearn DB assignment synchronized via webhook', Boolean(klReportAfterAssign?.assigned_to), `Assigned to: ${klReportAfterAssign?.assigned_to}`);
    }

    // Step 8: Lifecycle Sync: Add Comment in TeamSync
    console.log(`Adding TeamSync staff comment to ${testTicketNumber}...`);
    const commentText = `Staff investigation update for ${testRef}: Root cause identified and verified in production test suite.`;
    const commentRes = await fetch(`${TEAMSYNC_URL}/api/v1/tickets/${testTicketNumber}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tsApiKey}`
      },
      body: JSON.stringify({
        comment: commentText,
        authorName: 'Sarah Chen (Staff)',
        authorRole: 'STAFF',
        authorEmail: 'sarah.chen@teamsync.io',
        origin: 'TEAMSYNC'
      })
    });
    recordTest('Lifecycle', 'TeamSync staff comment added (HTTP 201)', commentRes.status === 201);

    await new Promise(r => setTimeout(r, 4000));

    const { data: comments } = await klClient
      .from('feedback_comments')
      .select('*')
      .eq('feedback_report_id', klReport.id);

    const commentSynced = comments && comments.some(c => c.content && c.content.includes('Staff investigation update'));
    recordTest('Lifecycle', 'KalviLearn feedback_comments table synchronized with staff comment', Boolean(commentSynced));

    // Step 9: Webhook Replay Protection on real event
    console.log('Testing webhook replay protection on delivered event...');
    // Query latest delivered webhook in TeamSync DB for this ticket
    const delRes = await tsPool.query(
      'SELECT * FROM public.webhook_deliveries WHERE payload->>\'ticketNumber\' = $1 ORDER BY created_at DESC LIMIT 1;',
      [testTicketNumber]
    );
    const deliveredRow = delRes.rows[0];

    if (deliveredRow) {
      const replayTime = Math.floor(Date.now() / 1000);
      const replayPayload = { ...deliveredRow.payload, timestamp: replayTime };
      const replayPayloadStr = JSON.stringify(replayPayload);
      const replaySig = crypto.createHmac('sha256', webhookSecret).update(`${replayTime}.${replayPayloadStr}`).digest('hex');

      const replayRes = await fetch(KALVI_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-TeamSync-Signature': replaySig,
          'X-TeamSync-Timestamp': String(replayTime),
          'X-TeamSync-Event-ID': deliveredRow.event_id
        },
        body: replayPayloadStr
      });

      const replayJson = await replayRes.json();
      recordTest('Lifecycle', 'Duplicate webhook event ignored idempotently with DUPLICATE_EVENT_IGNORED', replayRes.status === 200 && replayJson.duplicate === true);
    }
  } catch (err) {
    recordTest('Lifecycle', 'Lifecycle test suite exception', false, err.message);
  } finally {
    await tsPool.end();
  }

  // ─── 6. AUDIT SUMMARY ──────────────────────────────────────────────────────
  console.log('\n========================================================================');
  console.log(`🏁 AUDIT COMPLETE: ${results.passed} PASSED, ${results.failed} FAILED (TOTAL: ${results.tests.length})`);
  console.log('========================================================================');

  return results;
}

runAudit()
  .then(res => {
    process.exit(res.failed === 0 ? 0 : 1);
  })
  .catch(err => {
    console.error('Fatal audit failure:', err);
    process.exit(1);
  });
