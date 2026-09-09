const fs = require('fs');
const { Pool } = require('d:/TeamSync/node_modules/pg');

async function inspectReports() {
  // 1. TeamSync DB
  const tsEnv = fs.readFileSync('d:/TeamSync/.env', 'utf8');
  let tsDirectUrl = '';
  for (const l of tsEnv.split('\n')) {
    const idx = l.indexOf('=');
    if (idx > 0 && l.slice(0, idx).trim() === 'DIRECT_URL') {
      tsDirectUrl = l.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      break;
    }
  }
  const tsPool = new Pool({ connectionString: tsDirectUrl, ssl: { rejectUnauthorized: false } });

  const tsTicketsRes = await tsPool.query(`
    SELECT id, ticket_number, title, source, external_reference_id, created_at 
    FROM public.tickets 
    WHERE source = 'KALVILEARN' OR external_reference_id LIKE 'FB-%'
    ORDER BY created_at DESC;
  `);
  console.log(`TeamSync KalviLearn tickets found: ${tsTicketsRes.rows.length}`);
  for (const t of tsTicketsRes.rows.slice(0, 10)) {
    console.log(`  [TS] ${t.ticket_number} | ref: ${t.external_reference_id} | source: ${t.source} | title: ${t.title}`);
  }

  const tsAllTicketsRes = await tsPool.query(`SELECT count(*) FROM public.tickets;`);
  console.log(`TeamSync total tickets (all sources): ${tsAllTicketsRes.rows[0].count}`);

  // 2. KalviLearn DB
  const klEnv = fs.readFileSync('e:/KalviCode/.env', 'utf8');
  let klDirectUrl = '';
  for (const l of klEnv.split('\n')) {
    const idx = l.indexOf('=');
    if (idx > 0 && l.slice(0, idx).trim() === 'DIRECT_URL') {
      klDirectUrl = l.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      break;
    }
  }
  const klPool = new Pool({ connectionString: klDirectUrl, ssl: { rejectUnauthorized: false } });

  const klReportsRes = await klPool.query(`
    SELECT id, public_reference, title, teamsync_ticket_number, created_at 
    FROM public.feedback_reports 
    ORDER BY created_at DESC;
  `);
  console.log(`\nKalviLearn feedback reports found: ${klReportsRes.rows.length}`);
  for (const r of klReportsRes.rows.slice(0, 10)) {
    console.log(`  [KL] ${r.public_reference} | TS ticket: ${r.teamsync_ticket_number} | title: ${r.title}`);
  }

  const klCommentsRes = await klPool.query(`SELECT count(*) FROM public.feedback_comments;`);
  console.log(`KalviLearn feedback comments: ${klCommentsRes.rows[0].count}`);

  const klEventsRes = await klPool.query(`SELECT count(*) FROM public.webhook_events;`);
  console.log(`KalviLearn webhook events: ${klEventsRes.rows[0].count}`);

  await tsPool.end();
  await klPool.end();
}

inspectReports().catch(console.error);
