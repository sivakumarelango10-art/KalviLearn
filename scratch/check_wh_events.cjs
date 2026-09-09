const fs = require('fs');
const { Pool } = require('d:/TeamSync/node_modules/pg');

async function checkEvents() {
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

  const colRes = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'teamsync_webhook_events';
  `);
  console.log('Columns on teamsync_webhook_events:', colRes.rows);

  const repRes = await pool.query(`SELECT id, public_reference FROM public.feedback_reports;`);
  console.log('Reports in KL:', repRes.rows);

  await pool.end();
}

checkEvents().catch(console.error);
