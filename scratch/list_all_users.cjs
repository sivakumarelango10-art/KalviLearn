const fs = require('fs');
const { Pool } = require('d:/TeamSync/node_modules/pg');

async function main() {
  const klEnv = fs.readFileSync('e:/KalviCode/.env', 'utf8');
  let directUrl = '';
  for (const l of klEnv.split('\n')) {
    const idx = l.indexOf('=');
    if (idx > 0 && l.slice(0, idx).trim() === 'DIRECT_URL') {
      directUrl = l.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      break;
    }
  }

  const pool = new Pool({ connectionString: directUrl, ssl: { rejectUnauthorized: false } });
  const allUsers = await pool.query(`SELECT id, email, role, name FROM public.users ORDER BY role, email;`);
  console.log('Total users in public.users:', allUsers.rows.length);
  for (const u of allUsers.rows) {
    console.log(`  [${u.role}] ${u.email} -> ${u.id} (${u.name})`);
  }
  await pool.end();
}

main().catch(console.error);
