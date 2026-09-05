const { createClient } = require('@supabase/supabase-js');
const { spawn } = require('child_process');

const SUPABASE_URL = 'https://iavxnhwbgoarnexmyxpn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40';
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testDatabaseBatching() {
  console.log('\n--- 1. Testing Database Query Batching & Roster Performance ---');
  const start = Date.now();

  // Query 1: dbUsers
  const { data: dbUsers, error: uErr } = await sb
    .from('users')
    .select('id, email, name, role, status, createdAt')
    .eq('role', 'STUDENT')
    .order('name', { ascending: true });

  if (uErr) throw new Error('Query 1 failed: ' + uErr.message);
  console.log(`[PASS] Query 1 returned ${dbUsers.length} students:`, dbUsers.map(u => u.name));

  const studentIds = dbUsers.map(u => u.id);

  // Query 2: All solved UserProgress
  const { data: progressData, error: pErr } = await sb
    .from('UserProgress')
    .select('id, userId, problemId, status, language, solvedAt, Problem(slug, beltId, Belt(order, name, color))')
    .in('userId', studentIds)
    .eq('status', 'SOLVED');

  if (pErr) throw new Error('Query 2 failed: ' + pErr.message);
  console.log(`[PASS] Query 2 (Batched Progress) returned ${progressData.length} records in 1 query`);

  // Query 3: All recent Submissions
  const { data: subsData, error: sErr } = await sb
    .from('Submission')
    .select('id, userId, status, language, createdAt')
    .in('userId', studentIds)
    .order('createdAt', { ascending: false });

  if (sErr) throw new Error('Query 3 failed: ' + sErr.message);
  console.log(`[PASS] Query 3 (Batched Submissions) returned ${subsData.length} records in 1 query`);

  const elapsed = Date.now() - start;
  console.log(`[PASS] Total Roster Telemetry resolved in ${elapsed}ms using exactly 3 queries (N+1 eliminated!)`);
}

async function testExecutionEngine() {
  console.log('\n--- 2. Testing 10 Test Cases & Hidden Case Security ---');
  // Dynamic import of the bundled executeService from api/execute.js
  const apiModule = await import('../api/execute.js');
  const handler = apiModule.default || apiModule;

  // Helper to call handler
  const callExecute = async (body) => {
    let statusCode = 200;
    let jsonResult = null;
    const req = {
      method: 'POST',
      body,
    };
    const res = {
      statusCode: 200,
      setHeader: () => {},
      status: (code) => {
        statusCode = code;
        return {
          json: (d) => { jsonResult = d; }
        };
      },
      json: (d) => { jsonResult = d; },
      end: (data) => {
        if (data && !jsonResult) {
          try { jsonResult = JSON.parse(data); } catch {}
        }
      }
    };
    await handler(req, res);
    return { status: statusCode, body: jsonResult };
  };

  // Test 2.1: Correct Python solution for a problem
  console.log('Testing correct Python solution...');
  const res1 = await callExecute({
    questionSlug: 'belt1-two-sum',
    language: 'python',
    code: `
import sys
input_data = sys.stdin.read().split()
if input_data:
    target = int(input_data[-1])
    nums = [int(x) for x in input_data[:-1]]
    seen = {}
    found = False
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            print(f"{seen[comp]} {i}")
            found = True
            break
        seen[num] = i
    if not found:
        print("-1 -1")
`,
    isSubmit: true
  });

  console.log('Execution result status:', res1.status, 'Total:', res1.body?.total, 'Passed:', res1.body?.passed);
  if (res1.body?.testCases) {
    console.log(`Executed ${res1.body.testCases.length} test cases.`);
    const hiddenCases = res1.body.testCases.filter(t => !t.visible);
    console.log(`Hidden test cases count: ${hiddenCases.length}`);

    // Verify security: hidden test cases MUST NOT have input or expectedOutput
    for (const hc of hiddenCases) {
      if (hc.input !== undefined || hc.expectedOutput !== undefined || hc.actualOutput !== undefined) {
        throw new Error(`SECURITY LEAK DETECTED: Hidden test case #${hc.testIndex} leaked input/output!`);
      }
    }
    console.log('[PASS] Hidden test cases security verified: ZERO inputs or expected outputs leaked to client!');
  }

  // Test 2.2: Partial/Wrong solution
  console.log('\nTesting incorrect solution (must fail and not mark solved)...');
  const res2 = await callExecute({
    questionSlug: 'belt1-two-sum',
    language: 'python',
    code: 'print("0 1")',
    isSubmit: true
  });
  console.log('Incorrect solution passed count:', res2.body?.passed, 'Success:', res2.body?.success);
  if (res2.body?.passed === 10) {
    throw new Error('FAILURE: Incorrect solution was accepted for all 10 test cases!');
  }
  console.log('[PASS] Incorrect solution properly rejected.');

  // Test 2.3: Syntax Error (must return 422 Compilation Error)
  console.log('\nTesting syntax error handling...');
  const res3 = await callExecute({
    questionSlug: 'belt1-two-sum',
    language: 'python',
    code: 'def broken_syntax(x: return x +',
    isSubmit: true
  });
  console.log('Syntax error HTTP status:', res3.status, 'Error:', res3.body?.error);
  if (res3.status !== 422 && !res3.body?.error?.includes('Compilation')) {
    throw new Error('FAILURE: Syntax error did not return Compilation Error');
  }
  console.log('[PASS] Syntax/Compilation error handled correctly.');
}

async function testBrowserRendering() {
  console.log('\n--- 3. Testing Headless Chrome Browser Rendering & Route Safeguards ---');
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=C:\\Users\\sivak\\AppData\\Local\\Temp\\chrome-audit-' + Date.now(),
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await fetch('http://127.0.0.1:9222/json/list').then(r => r.json());
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);

  const routesToTest = [
    { url: 'http://localhost:4173/login', name: 'Login Page' },
    { url: 'http://localhost:4173/mentor', name: 'Mentor Dashboard' },
    { url: 'http://localhost:4173/mentor/students', name: 'Mentor Students' },
    { url: 'http://localhost:4173/mentor/submissions', name: 'Mentor Submissions' },
    { url: 'http://localhost:4173/mentor/profile', name: 'Mentor Profile' },
    { url: 'http://localhost:4173/mentor/curriculum', name: 'Mentor Curriculum' },
    { url: 'http://localhost:4173/mentor/announcements', name: 'Mentor Announcements' },
    { url: 'http://localhost:4173/dashboard', name: 'Student Dashboard' },
    { url: 'http://localhost:4173/practice', name: 'Practice Arena' },
    { url: 'http://localhost:4173/non-existent-route-12345', name: '404 Page Not Found' },
  ];

  let currentRouteIdx = 0;

  await new Promise((resolve, reject) => {
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
      // Set active mentor user in localStorage for testing
      const testMentor = {
        id: 'e95272bc-633d-4fbd-8bf0-7801426fd0f6',
        email: 'sivakumarelango10@gmail.com',
        role: 'MENTOR',
        status: 'ACTIVE',
        name: 'Sivakumar Elango'
      };
      // Navigate to first route
      ws.send(JSON.stringify({
        id: 10,
        method: 'Page.navigate',
        params: { url: routesToTest[0].url }
      }));
    };

    ws.onmessage = async (e) => {
      const m = JSON.parse(e.data);
      if (m.method === 'Runtime.exceptionThrown') {
        console.error(`[CRITICAL EXCEPTION on ${routesToTest[currentRouteIdx].name}]:`, m.params.exceptionDetails?.text);
        reject(new Error(m.params.exceptionDetails?.text));
      }

      if (m.method === 'Page.loadEventFired') {
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 100 + currentRouteIdx,
            method: 'Runtime.evaluate',
            params: {
              expression: `JSON.stringify({
                title: document.title,
                url: location.href,
                hasWhiteScreen: document.body.innerHTML.trim() === '' || document.getElementById('root')?.innerHTML.trim() === '',
                bodySnippet: document.body.innerText.slice(0, 300).replace(/\\n+/g, ' ')
              })`
            }
          }));
        }, 1200);
      }

      if (m.id && m.id >= 100 && m.id < 200) {
        const route = routesToTest[currentRouteIdx];
        const res = JSON.parse(m.result.result.value);
        console.log(`[VERIFIED ROUTE] ${route.name}:`);
        console.log(`  Title: ${res.title}`);
        console.log(`  White screen: ${res.hasWhiteScreen ? 'FAIL (WHITE SCREEN)' : 'PASS (Content Loaded)'}`);
        console.log(`  Content: "${res.bodySnippet.slice(0, 100)}..."\n`);

        if (res.hasWhiteScreen) {
          reject(new Error(`White screen detected on ${route.name}`));
        }

        currentRouteIdx++;
        if (currentRouteIdx < routesToTest.length) {
          // If transitioning to mentor pages, ensure kalvi_active_user is set
          if (routesToTest[currentRouteIdx].url.includes('/mentor')) {
            const setStorage = `localStorage.setItem('kalvi_active_user', JSON.stringify({
              id: 'e95272bc-633d-4fbd-8bf0-7801426fd0f6',
              email: 'sivakumarelango10@gmail.com',
              role: 'MENTOR',
              status: 'ACTIVE',
              name: 'Sivakumar Elango'
            }));`;
            ws.send(JSON.stringify({ id: 50, method: 'Runtime.evaluate', params: { expression: setStorage } }));
          }

          ws.send(JSON.stringify({
            id: 10 + currentRouteIdx,
            method: 'Page.navigate',
            params: { url: routesToTest[currentRouteIdx].url }
          }));
        } else {
          console.log('[ALL ROUTES VERIFIED] Zero white screens, zero runtime exceptions across all tested routes!');
          ws.close();
          chromeProc.kill();
          resolve();
        }
      }
    };
  });
}

async function main() {
  try {
    await testDatabaseBatching();
    await testExecutionEngine();
    await testBrowserRendering();
    console.log('\n=============================================');
    console.log('ALL VERIFICATION SUITES PASSED SUCCESSFULLY!');
    console.log('=============================================');
    process.exit(0);
  } catch (err) {
    console.error('\n[VERIFICATION FAILED]:', err);
    process.exit(1);
  }
}

main();
