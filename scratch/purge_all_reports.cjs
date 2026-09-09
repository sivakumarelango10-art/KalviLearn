const fs = require('fs');
const { Pool } = require('d:/TeamSync/node_modules/pg');

async function cleanupAllReports() {
  console.log('========================================================================');
  console.log('🗑️  PURGING ALL KALVILEARN REPORTS AND TEAMSYNC TICKETS');
  console.log('========================================================================\n');

  // ─── 1. Connect to TeamSync DB ──────────────────────────────────────────────
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

  // ─── 2. Connect to KalviLearn DB ───────────────────────────────────────────
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

  try {
    // ─── TeamSync Cleanup ───────────────────────────────────────────────────
    console.log('--- 1. Checking / Cleaning TeamSync Database ---');
    const tsClient = await tsPool.connect();
    try {
      await tsClient.query('BEGIN');

      // Find all KalviLearn tickets
      const tsTickets = await tsClient.query(`
        SELECT id, ticket_number, external_reference_id 
        FROM public.tickets 
        WHERE source = 'KALVILEARN' OR external_reference_id LIKE 'FB-%';
      `);
      const ticketIds = tsTickets.rows.map(r => r.id);
      const ticketNumbers = tsTickets.rows.map(r => r.ticket_number);
      console.log(`Found ${ticketIds.length} KalviLearn tickets in TeamSync.`);

      if (ticketIds.length > 0) {
        const delAtt = await tsClient.query(`DELETE FROM public.ticket_attachments WHERE ticket_id = ANY($1::uuid[]);`, [ticketIds]);
        console.log(`  Deleted ${delAtt.rowCount} ticket_attachments`);

        const delCom = await tsClient.query(`DELETE FROM public.ticket_comments WHERE ticket_id = ANY($1::uuid[]);`, [ticketIds]);
        console.log(`  Deleted ${delCom.rowCount} ticket_comments`);

        const delAct = await tsClient.query(`DELETE FROM public.ticket_activities WHERE ticket_id = ANY($1::uuid[]);`, [ticketIds]);
        console.log(`  Deleted ${delAct.rowCount} ticket_activities`);

        const delWh = await tsClient.query(`
          DELETE FROM public.webhook_deliveries 
          WHERE payload->>'ticketNumber' = ANY($1::text[]) 
             OR payload->>'sourceReferenceId' LIKE 'FB-%'
             OR payload->>'origin' = 'KALVILEARN';
        `, [ticketNumbers]);
        console.log(`  Deleted ${delWh.rowCount} webhook_deliveries`);

        const delTick = await tsClient.query(`DELETE FROM public.tickets WHERE id = ANY($1::uuid[]);`, [ticketIds]);
        console.log(`  Deleted ${delTick.rowCount} tickets from TeamSync`);
      }

      await tsClient.query('COMMIT');
      console.log('✅ TeamSync cleanup verified/committed.\n');
    } catch (err) {
      await tsClient.query('ROLLBACK');
      console.error('❌ TeamSync cleanup failed, rolled back:', err);
      throw err;
    } finally {
      tsClient.release();
    }

    // ─── KalviLearn Cleanup ─────────────────────────────────────────────────
    console.log('--- 2. Cleaning KalviLearn Database ---');
    const klClient = await klPool.connect();
    try {
      await klClient.query('BEGIN');

      const delWhEvents = await klClient.query(`DELETE FROM public.teamsync_webhook_events;`);
      console.log(`  Deleted ${delWhEvents.rowCount} teamsync_webhook_events`);

      const delCom = await klClient.query(`DELETE FROM public.feedback_comments;`);
      console.log(`  Deleted ${delCom.rowCount} feedback_comments`);

      const delAudit = await klClient.query(`DELETE FROM public.feedback_audit_logs;`);
      console.log(`  Deleted ${delAudit.rowCount} feedback_audit_logs`);

      const delRep = await klClient.query(`DELETE FROM public.feedback_reports;`);
      console.log(`  Deleted ${delRep.rowCount} feedback_reports`);

      // Reset sequence back to start
      try {
        await klClient.query(`ALTER SEQUENCE feedback_public_ref_seq RESTART WITH 1000;`);
        console.log('  Reset feedback_public_ref_seq sequence to 1000');
      } catch (seqErr) {
        console.log('  Sequence reset note:', seqErr.message);
      }

      await klClient.query('COMMIT');
      console.log('✅ KalviLearn cleanup committed successfully.\n');
    } catch (err) {
      await klClient.query('ROLLBACK');
      console.error('❌ KalviLearn cleanup failed, rolled back:', err);
      throw err;
    } finally {
      klClient.release();
    }

    // ─── 3. Final Verification ──────────────────────────────────────────────
    console.log('--- 3. Verification Post-Cleanup ---');
    const tsRemaining = await tsPool.query(`SELECT count(*) FROM public.tickets WHERE source = 'KALVILEARN' OR external_reference_id LIKE 'FB-%';`);
    console.log(`TeamSync KalviLearn tickets remaining: ${tsRemaining.rows[0].count}`);

    const klRemaining = await klPool.query(`SELECT count(*) FROM public.feedback_reports;`);
    console.log(`KalviLearn feedback reports remaining: ${klRemaining.rows[0].count}`);

    const klCommentsRemaining = await klPool.query(`SELECT count(*) FROM public.feedback_comments;`);
    console.log(`KalviLearn feedback comments remaining: ${klCommentsRemaining.rows[0].count}`);

    const klEventsRemaining = await klPool.query(`SELECT count(*) FROM public.teamsync_webhook_events;`);
    console.log(`KalviLearn webhook events remaining: ${klEventsRemaining.rows[0].count}`);

    console.log('\n========================================================================');
    console.log('🎉 ALL KALVILEARN REPORTS REMOVED SUCCESSFULLY FROM BOTH DATABASES');
    console.log('========================================================================');
  } finally {
    await tsPool.end();
    await klPool.end();
  }
}

cleanupAllReports().catch(console.error);
