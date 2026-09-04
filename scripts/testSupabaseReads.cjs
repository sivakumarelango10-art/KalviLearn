const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testSupabaseReads() {
  console.log('Testing Supabase anon client reads:');
  
  const { data: users, error: uErr } = await supabase.from('users').select('*');
  console.log('users count:', users?.length, 'error:', uErr);

  const { data: progress, error: pErr } = await supabase.from('UserProgress').select('*').limit(5);
  console.log('UserProgress count:', progress?.length, 'error:', pErr);

  const { data: subs, error: sErr } = await supabase.from('Submission').select('*').limit(5);
  console.log('Submission count:', subs?.length, 'error:', sErr);

  const { data: problems, error: prErr } = await supabase.from('Problem').select('id, slug, belt(name)').limit(5);
  console.log('Problem count:', problems?.length, 'error:', prErr);
}

testSupabaseReads();
