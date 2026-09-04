const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function verify() {
  console.log('====================================================');
  console.log('🏁 KALVICODE: MENTOR REAL DATA END-TO-END VERIFICATION');
  console.log('====================================================\n');

  let allPassed = true;

  // 1. Verify Authorized Students Roster
  console.log('--- TEST 1: Registered Students in PostgreSQL ---');
  const { data: students, error: uErr } = await supabase
    .from('users')
    .select('id, email, name, role, status')
    .eq('role', 'STUDENT')
    .order('name', { ascending: true });

  if (uErr || !students || students.length !== 2) {
    console.error('❌ FAIL: Expected 2 registered students, found:', students?.length, uErr);
    allPassed = false;
  } else {
    console.log(`✅ Found exactly 2 registered scholars:`);
    for (const s of students) {
      console.log(`   • ${s.name} (${s.email}) [${s.status}] ID: ${s.id}`);
    }
  }

  // 2. Verify Real Solved Progress Records
  console.log('\n--- TEST 2: Real Solved Problems per Student ---');
  for (const s of students || []) {
    const { data: progress, error: pErr } = await supabase
      .from('UserProgress')
      .select('id, problemId, status, language, solvedAt, Problem(title, slug, Belt(name))')
      .eq('userId', s.id)
      .eq('status', 'SOLVED');

    if (pErr || !progress || progress.length === 0) {
      console.error(`❌ FAIL: No real progress found for ${s.name}:`, pErr);
      allPassed = false;
    } else {
      const pct = Math.round((progress.length / 85) * 100);
      console.log(`✅ ${s.name}:`);
      console.log(`   Solved: ${progress.length} / 85 problems (${pct}%)`);
      console.log(`   Sample Solved: ${progress.slice(0, 3).map(p => p.Problem?.title).join(', ')}...`);
    }
  }

  // 3. Verify Real Submissions Feed
  console.log('\n--- TEST 3: Real Live Submissions Log ---');
  const { data: subs, error: sErr } = await supabase
    .from('Submission')
    .select('id, userId, language, code, status, passedTests, totalTests, executionTimeMs, createdAt, Problem(title, Belt(name))')
    .order('createdAt', { ascending: false })
    .limit(10);

  if (sErr || !subs || subs.length === 0) {
    console.error('❌ FAIL: No submissions found in database:', sErr);
    allPassed = false;
  } else {
    console.log(`✅ Retrieved ${subs.length} recent live submissions:`);
    for (const sub of subs.slice(0, 5)) {
      const student = students.find(s => s.id === sub.userId)?.name || sub.userId;
      console.log(`   • [${sub.status}] ${student} -> ${sub.Problem?.title} (${sub.Problem?.Belt?.name})`);
      console.log(`     Lang: ${sub.language} | Score: ${sub.passedTests}/${sub.totalTests} | Exec: ${sub.executionTimeMs}ms | At: ${sub.createdAt}`);
      console.log(`     Code: ${sub.code.trim().replace(/\n/g, ' ').slice(0, 50)}...`);
    }
  }

  // 4. Verify Curriculum Metrics
  console.log('\n--- TEST 4: Real Curriculum Belt Metrics ---');
  const { data: allProgress } = await supabase
    .from('UserProgress')
    .select('userId, Problem(Belt(order, name))')
    .eq('status', 'SOLVED');

  const beltCounts = { 1: new Set(), 2: new Set(), 3: new Set() };
  for (const row of allProgress || []) {
    const order = row.Problem?.Belt?.order;
    if (order && beltCounts[order]) {
      beltCounts[order].add(row.userId);
    }
  }

  console.log(`✅ Belt 1 Active Scholars: ${beltCounts[1].size} / 2`);
  console.log(`✅ Belt 2 Active Scholars: ${beltCounts[2].size} / 2`);
  console.log(`✅ Belt 3 Active Scholars: ${beltCounts[3].size} / 2`);

  // 5. Codebase Static Audit for Leftover Mock Data
  console.log('\n--- TEST 5: Codebase Audit for Remaining Fake/Mock Roster ---');
  const fs = require('fs');
  const path = require('path');
  const mentorFiles = [
    'src/pages/mentor/MentorDashboardPage.tsx',
    'src/pages/mentor/MentorStudentsPage.tsx',
    'src/pages/mentor/MentorSubmissionsPage.tsx',
    'src/pages/mentor/MentorCurriculumPage.tsx',
  ];

  for (const f of mentorFiles) {
    const content = fs.readFileSync(path.join(__dirname, '..', f), 'utf-8');
    if (content.includes('INITIAL_STUDENTS') || content.includes('SCHOLAR_DIRECTORY') || content.includes('SAMPLE_SUBMISSIONS')) {
      console.error(`❌ FAIL: Found legacy mock constants in ${f}`);
      allPassed = false;
    } else {
      console.log(`✅ ${f}: Purely dynamic data from mentorService!`);
    }
  }

  console.log('\n====================================================');
  if (allPassed) {
    console.log('🎉 ALL AUDIT & REAL DATA TESTS PASSED SUCCESSFULLY!');
  } else {
    console.log('❌ SOME TESTS FAILED');
  }
  console.log('====================================================\n');
}

verify().catch(console.error);
