const fs = require('fs');
const { Pool } = require('d:/TeamSync/node_modules/pg');

async function checkCounts() {
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
  const r = await pool.query('SELECT count(*) FROM public.tickets;');
  console.log('Total tickets in TeamSync tickets table:', r.rows[0].count);
  await pool.end();
}

checkCounts().catch(console.error);
