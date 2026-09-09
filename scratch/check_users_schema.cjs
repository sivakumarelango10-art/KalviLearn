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

  const colRes = await pool.query(`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = 'users';
  `);
  console.log('Columns on users:');
  for (const col of colRes.rows) {
    console.log(`  ${col.column_name} (${col.data_type}) nullable=${col.is_nullable} default=${col.column_default}`);
  }

  await pool.end();
}

main().catch(console.error);
