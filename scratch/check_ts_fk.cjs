const fs = require('fs');
const { Pool } = require('d:/TeamSync/node_modules/pg');

async function checkTeamSyncFK() {
  const tsEnv = fs.readFileSync('d:/TeamSync/.env', 'utf8');
  let tsDirectUrl = '';
  for (const l of tsEnv.split('\n')) {
    const idx = l.indexOf('=');
    if (idx > 0 && l.slice(0, idx).trim() === 'DIRECT_URL') {
      tsDirectUrl = l.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      break;
    }
  }
  const pool = new Pool({ connectionString: tsDirectUrl, ssl: { rejectUnauthorized: false } });

  const fkRes = await pool.query(`
    SELECT
      tc.constraint_name, 
      tc.table_name,
      kcu.column_name, 
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name 
    FROM 
      information_schema.table_constraints AS tc 
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' AND ccu.table_name='tickets';
  `);
  console.log('Foreign keys referencing tickets:', fkRes.rows);

  // Check counts in related tables for KalviLearn tickets
  const klTicketIdsRes = await pool.query(`
    SELECT id FROM public.tickets WHERE source = 'KALVILEARN' OR external_reference_id LIKE 'FB-%';
  `);
  const ticketIds = klTicketIdsRes.rows.map(r => r.id);
  console.log(`KalviLearn ticket IDs count: ${ticketIds.length}`);

  if (ticketIds.length > 0) {
    for (const fk of fkRes.rows) {
      const cnt = await pool.query(`SELECT count(*) FROM public.${fk.table_name} WHERE ${fk.column_name} = ANY($1::uuid[])`, [ticketIds]);
      console.log(`  Records in ${fk.table_name}.${fk.column_name}: ${cnt.rows[0].count}`);
    }
  }

  // Also check webhook_deliveries
  const whRes = await pool.query(`SELECT count(*) FROM public.webhook_deliveries;`);
  console.log(`Total webhook deliveries: ${whRes.rows[0].count}`);

  await pool.end();
}

checkTeamSyncFK().catch(console.error);
