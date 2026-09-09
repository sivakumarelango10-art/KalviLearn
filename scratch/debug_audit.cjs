const fs = require('fs');
const { Pool } = require('d:/TeamSync/node_modules/pg');
const { createClient } = require('@supabase/supabase-js');

async function debugAudit() {
  const tsEnv = fs.readFileSync('d:/TeamSync/.env', 'utf8');
  let tsDirectUrl = '';
  for (const line of tsEnv.split('\n')) {
    const idx = line.indexOf('=');
    if (idx > 0 && line.slice(0, idx).trim() === 'DIRECT_URL') {
      tsDirectUrl = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      break;
    }
  }
  const tsPool = new Pool({ connectionString: tsDirectUrl, ssl: { rejectUnauthorized: false } });

  // Check TeamSync tickets columns
  const tsRes = await tsPool.query('SELECT * FROM public.tickets ORDER BY created_at DESC LIMIT 1;');
  console.log('--- TeamSync Tickets Columns ---');
  console.log(Object.keys(tsRes.rows[0]));
  console.log('Latest TeamSync ticket:', {
    id: tsRes.rows[0].id,
    ticket_number: tsRes.rows[0].ticket_number,
    ticketNumber: tsRes.rows[0].ticketnumber,
    source_reference_id: tsRes.rows[0].source_reference_id
  });

  // Check TeamSync comments on TS-1088
  console.log('--- TeamSync Comments on TS-1088 ---');
  const cRes = await tsPool.query("SELECT * FROM public.ticket_comments WHERE ticket_id = $1;", [tsRes.rows[0].id]);
  console.log('Comments count:', cRes.rows.length);
  for (const c of cRes.rows) {
    console.log({ id: c.id, comment: c.comment, author_role: c.author_role, author_name: c.author_name });
  }

  // Check TeamSync webhook deliveries for COMMENT_CREATED
  console.log('--- TeamSync Webhook Deliveries for COMMENT_CREATED ---');
  const dRes = await tsPool.query("SELECT * FROM public.webhook_deliveries WHERE event_type = 'COMMENT_CREATED' ORDER BY created_at DESC LIMIT 1;");
  if (dRes.rows.length > 0) {
    console.log({
      event_id: dRes.rows[0].event_id,
      status: dRes.rows[0].status,
      attempt_count: dRes.rows[0].attempt_count,
      response_code: dRes.rows[0].response_code,
      response_body: dRes.rows[0].response_body,
      payload: dRes.rows[0].payload
    });
  } else {
    console.log('No COMMENT_CREATED delivery found!');
  }

  // Check KalviLearn comments in DB
  const klEnv = fs.readFileSync('e:/KalviCode/.env', 'utf8');
  let klUrl = '', klKey = '';
  for (const line of klEnv.split('\n')) {
    const idx = line.indexOf('=');
    if (idx > 0) {
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (k === 'VITE_SUPABASE_URL') klUrl = v;
      if (k === 'SUPABASE_SERVICE_ROLE_KEY' || (k === 'VITE_SUPABASE_ANON_KEY' && !klKey)) klKey = v;
    }
  }
  const klClient = createClient(klUrl, klKey);
  const { data: klComments } = await klClient.from('feedback_comments').select('*').order('created_at', { ascending: false }).limit(5);
  console.log('--- KalviLearn Feedback Comments ---');
  for (const c of klComments) {
    console.log({ id: c.id, content: c.content, author_name: c.author_name, teamsync_comment_id: c.teamsync_comment_id, feedback_report_id: c.feedback_report_id });
  }

  // Check teamsync_webhook_events in KalviLearn
  const { data: klEvents } = await klClient.from('teamsync_webhook_events').select('*').order('received_at', { ascending: false }).limit(5);
  console.log('--- KalviLearn Webhook Events ---');
  for (const e of klEvents) {
    console.log({ event_id: e.event_id, event_type: e.event_type, status: e.status, error: e.error });
  }

  await tsPool.end();
}

debugAudit().catch(console.error);
