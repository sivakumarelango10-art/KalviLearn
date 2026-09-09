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

  const fkRes = await pool.query(`
    SELECT
      tc.constraint_name, 
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
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name='feedback_reports';
  `);
  console.log('Foreign keys on feedback_reports:', fkRes.rows);

  // Check columns of feedback_reports
  const colRes = await pool.query(`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = 'feedback_reports';
  `);
  console.log('Columns on feedback_reports:');
  for (const col of colRes.rows) {
    console.log(`  ${col.column_name} (${col.data_type}) nullable=${col.is_nullable} default=${col.column_default}`);
  }

  // Check existing users in public.users
  const userRes = await pool.query(`SELECT id, email, role FROM public.users LIMIT 5;`);
  console.log('Users in public.users:', userRes.rows);

  // Try a test insert
  try {
    const testId = '11111111-1111-4111-a111-111111111111';
    const insRes = await pool.query(`
      INSERT INTO public.feedback_reports (
        user_id, user_name_snapshot, user_email_snapshot, user_role, portal, type, title, description, status, priority
      ) VALUES (
        $1, 'Val Tester', 'val_tester@kalvilearn.edu', 'MENTOR', 'MENTOR', 'BUG', 'Test Insert', 'Test Description', 'OPEN', 'MEDIUM'
      ) RETURNING id, public_reference;
    `, [testId]);
    console.log('Test insert succeeded:', insRes.rows[0]);
    // Clean up test row
    await pool.query(`DELETE FROM public.feedback_reports WHERE id = $1;`, [insRes.rows[0].id]);
  } catch (err) {
    console.error('Test insert error:', err.message);
  }

  await pool.end();
}

main().catch(console.error);
