const fs = require('fs');
const { Pool } = require('d:/TeamSync/node_modules/pg');

async function checkKalviLearnFK() {
  const klEnv = fs.readFileSync('e:/KalviCode/.env', 'utf8');
  let klDirectUrl = '';
  for (const l of klEnv.split('\n')) {
    const idx = l.indexOf('=');
    if (idx > 0 && l.slice(0, idx).trim() === 'DIRECT_URL') {
      klDirectUrl = l.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      break;
    }
  }
  const pool = new Pool({ connectionString: klDirectUrl, ssl: { rejectUnauthorized: false } });

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
    WHERE tc.constraint_type = 'FOREIGN KEY' AND ccu.table_name='feedback_reports';
  `);
  console.log('Foreign keys referencing feedback_reports in KalviLearn:', fkRes.rows);

  const reportIdsRes = await pool.query(`SELECT id FROM public.feedback_reports;`);
  const reportIds = reportIdsRes.rows.map(r => r.id);
  console.log(`KalviLearn feedback report IDs count: ${reportIds.length}`);

  if (reportIds.length > 0) {
    for (const fk of fkRes.rows) {
      const cnt = await pool.query(`SELECT count(*) FROM public.${fk.table_name} WHERE ${fk.column_name} = ANY($1::uuid[])`, [reportIds]);
      console.log(`  Records in ${fk.table_name}.${fk.column_name}: ${cnt.rows[0].count}`);
    }
  }

  // Check all feedback-related tables in KalviLearn
  const tablesRes = await pool.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name LIKE '%feedback%';
  `);
  console.log('Feedback tables in KalviLearn:', tablesRes.rows.map(r => r.table_name));

  await pool.end();
}

checkKalviLearnFK().catch(console.error);
