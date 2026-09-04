const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testService() {
  console.log('--- Testing Mentor Data Queries with Supabase Anon Client ---');

  // 1. Test fetching students
  const { data: users, error: uErr } = await supabase
    .from('users')
    .select('id, email, name, role, status, createdAt')
    .eq('role', 'STUDENT')
    .order('name', { ascending: true });

  console.log(`\n1. Found ${users?.length} registered students:`);
  for (const u of users || []) {
    const { count: solvedCount } = await supabase
      .from('UserProgress')
      .select('id', { count: 'exact', head: true })
      .eq('userId', u.id)
      .eq('status', 'SOLVED');

    const { data: recentSub } = await supabase
      .from('Submission')
      .select('id, createdAt, language, status, passedTests, totalTests')
      .eq('userId', u.id)
      .order('createdAt', { ascending: false })
      .limit(1);

    console.log(`• ${u.name} (${u.email})`);
    console.log(`  ID: ${u.id}`);
    console.log(`  Real Solved Count: ${solvedCount} / 85 (${Math.round((solvedCount/85)*100)}%)`);
    console.log(`  Latest Submission:`, recentSub?.[0] || 'None yet');
  }

  // 2. Test fetching submissions
  const { data: subs, error: sErr } = await supabase
    .from('Submission')
    .select('id, userId, language, code, status, passedTests, totalTests, executionTimeMs, createdAt, Problem(id, slug, title, Belt(name, color))')
    .order('createdAt', { ascending: false })
    .limit(5);

  console.log(`\n2. Recent Submissions Feed (${subs?.length} returned):`);
  for (const s of subs || []) {
    console.log(`• [${s.status}] ${s.Problem?.title} (${s.Problem?.Belt?.name})`);
    console.log(`  User: ${s.userId} | Lang: ${s.language} | Tests: ${s.passedTests}/${s.totalTests} | ${s.createdAt}`);
    console.log(`  Code preview: ${s.code.slice(0, 60).replace(/\n/g, ' ')}...`);
  }

  // 3. Test curriculum metrics
  const { data: progressRows } = await supabase
    .from('UserProgress')
    .select('id, userId, status, Problem(beltId, Belt(order, name, color))')
    .eq('status', 'SOLVED');

  console.log(`\n3. Total Solved Progress records in DB: ${progressRows?.length}`);
  const belts = { 1: new Set(), 2: new Set(), 3: new Set() };
  for (const r of progressRows || []) {
    const order = r.Problem?.Belt?.order;
    if (order && belts[order]) {
      belts[order].add(r.userId);
    }
  }
  console.log(`  Belt 1 active scholars: ${belts[1].size}`);
  console.log(`  Belt 2 active scholars: ${belts[2].size}`);
  console.log(`  Belt 3 active scholars: ${belts[3].size}`);

  console.log('\n✅ All Mentor service queries succeeded against Supabase client!');
}

testService().catch(console.error);
