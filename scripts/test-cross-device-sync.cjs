const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://iavxnhwbgoarnexmyxpn.supabase.co';
const supabaseKey = 'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40';
const supabase = createClient(supabaseUrl, supabaseKey);

function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function runCrossDeviceSimulation() {
  console.log('====================================================');
  console.log('🧪 SIMULATING MULTI-DEVICE PERSONAL DATA CLOUD SYNC');
  console.log('====================================================\n');

  // 1. Fetch student user
  const { data: users } = await supabase
    .from('users')
    .select('id, email, name')
    .ilike('email', 'kavya.ramesh.s.121@kalvium.community')
    .single();

  if (!users) {
    throw new Error('Test user not found in database');
  }
  console.log(`👤 Student Account: ${users.name} (${users.email})`);
  console.log(`🆔 Database UUID: ${users.id}\n`);

  // Clean any previous test data for clean slate
  await supabase.from('UserProgress').delete().eq('userId', users.id);
  await supabase.from('Submission').delete().eq('userId', users.id);

  // 2. Fetch two test problems
  const { data: p1 } = await supabase.from('Problem').select('id, slug, title').eq('slug', 'belt-1-q1-sum-of-two-numbers').single();
  const { data: p2 } = await supabase.from('Problem').select('id, slug, title').eq('slug', 'belt-1-q2-difference-of-two-numbers').single();

  console.log('📱 [DEVICE 1: School Lab Computer]');
  console.log('Student logs in and solves 2 problems in the Practice Arena...');

  const pythonCodeP1 = 'import sys\na, b = map(int, sys.stdin.read().split())\nprint(a + b)';
  const jsCodeP2 = 'const fs = require("fs");\nconst n = parseInt(fs.readFileSync(0, "utf8").trim());\nconsole.log(n % 2 === 0 ? "Even" : "Odd");';

  // Device 1: Problem 1 solve
  const prog1 = {
    id: generateUuid(),
    userId: users.id,
    problemId: p1.id,
    status: 'SOLVED',
    language: 'python',
    bestCode: pythonCodeP1,
    solvedAt: new Date().toISOString(),
    attempts: 1,
    xpEarned: 50,
  };
  const sub1 = {
    id: generateUuid(),
    userId: users.id,
    problemId: p1.id,
    language: 'python',
    code: pythonCodeP1,
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    testResults: [],
    executionTimeMs: 38,
    createdAt: new Date().toISOString(),
  };

  await supabase.from('UserProgress').upsert(prog1, { onConflict: 'userId,problemId' });
  await supabase.from('Submission').insert(sub1);
  console.log(`  ✅ Device 1: Solved "${p1.title}" (Python) -> Persisted to Supabase`);

  // Device 1: Problem 2 solve
  const prog2 = {
    id: generateUuid(),
    userId: users.id,
    problemId: p2.id,
    status: 'SOLVED',
    language: 'javascript',
    bestCode: jsCodeP2,
    solvedAt: new Date().toISOString(),
    attempts: 2,
    xpEarned: 50,
  };
  const sub2 = {
    id: generateUuid(),
    userId: users.id,
    problemId: p2.id,
    language: 'javascript',
    code: jsCodeP2,
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    testResults: [],
    executionTimeMs: 24,
    createdAt: new Date().toISOString(),
  };

  await supabase.from('UserProgress').upsert(prog2, { onConflict: 'userId,problemId' });
  await supabase.from('Submission').insert(sub2);
  console.log(`  ✅ Device 1: Solved "${p2.title}" (JavaScript) -> Persisted to Supabase\n`);

  // -------------------------------------------------------------
  // SIMULATE DEVICE 2
  // -------------------------------------------------------------
  console.log('💻 [DEVICE 2: Home Laptop / Mobile Phone]');
  console.log('Student opens Kalvi Learn on a completely new device (localStorage is empty).');
  console.log('Student logs into the same account and the application hydrates from Supabase cloud...\n');

  // Query UserProgress joined with Problem
  const { data: progressRows, error: pErr } = await supabase
    .from('UserProgress')
    .select('id, userId, problemId, status, language, bestCode, solvedAt, attempts, xpEarned, Problem(slug, title)')
    .eq('userId', users.id);

  if (pErr) throw pErr;

  // Query Submissions joined with Problem
  const { data: submissionRows, error: sErr } = await supabase
    .from('Submission')
    .select('id, userId, problemId, language, code, status, passedTests, totalTests, executionTimeMs, createdAt, Problem(slug, title)')
    .eq('userId', users.id)
    .order('createdAt', { ascending: false });

  if (sErr) throw sErr;

  // Hydrate into UserState
  const solvedSlugs = [];
  let totalXp = 0;
  const progressMap = {};

  for (const row of progressRows) {
    const slug = row.Problem.slug;
    if (row.status === 'SOLVED') {
      solvedSlugs.push(slug);
      totalXp += row.xpEarned || 50;
    }
    progressMap[slug] = {
      problemSlug: slug,
      status: row.status,
      language: row.language,
      bestCode: row.bestCode,
      attempts: row.attempts,
    };
  }

  console.log('🔍 [DEVICE 2 HYDRATION VERIFICATION RESULTS]:');
  console.log(`  - Total Solved Slugs: [${solvedSlugs.join(', ')}] (Expected: 2)`);
  console.log(`  - Total Student XP: ${totalXp} XP (Expected: 100 XP)`);
  console.log(`  - P1 Best Code Restored: "${progressMap[p1.slug]?.bestCode?.replace(/\n/g, ' ')}"`);
  console.log(`  - P2 Best Code Restored: "${progressMap[p2.slug]?.bestCode?.replace(/\n/g, ' ')}"`);
  console.log(`  - Total Submissions Restored: ${submissionRows.length} entries`);

  // Assertions
  if (solvedSlugs.length !== 2) throw new Error(`Expected 2 solved slugs, got ${solvedSlugs.length}`);
  if (totalXp !== 100) throw new Error(`Expected 100 XP, got ${totalXp}`);
  if (!progressMap[p1.slug]?.bestCode.includes('a + b')) throw new Error('P1 code mismatch');
  if (!progressMap[p2.slug]?.bestCode.includes('Even')) throw new Error('P2 code mismatch');
  if (submissionRows.length !== 2) throw new Error(`Expected 2 submissions, got ${submissionRows.length}`);

  console.log('\n====================================================');
  console.log('🎉 TEST PASSED: ALL PERSONAL DATA PERSISTS TO SUPABASE!');
  console.log('Account is 100% synchronized seamlessly across all devices.');
  console.log('====================================================\n');

  // Clean up test data
  await supabase.from('UserProgress').delete().eq('userId', users.id);
  await supabase.from('Submission').delete().eq('userId', users.id);
  console.log('🧹 Cleaned test data from Supabase.');
}

runCrossDeviceSimulation().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
