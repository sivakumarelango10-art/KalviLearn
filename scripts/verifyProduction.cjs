const https = require('https');

async function testUrl(options, data) {
  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch {}
        resolve({ status: res.statusCode, headers: res.headers, body, json });
      });
    });
    req.on('error', (err) => resolve({ error: err.message }));
    if (data) req.write(data);
    req.end();
  });
}

async function verifyProduction() {
  console.log('Testing live Vercel deployment: https://kalvicode.vercel.app...\n');

  // Test 1: GET /api/execute -> 405
  const res1 = await testUrl({
    hostname: 'kalvicode.vercel.app',
    path: '/api/execute',
    method: 'GET'
  });
  console.log(`1. GET /api/execute: HTTP ${res1.status} (Expected: 405)`);

  // Test 2: POST /api/execute with missing params -> 400
  const res2 = await testUrl({
    hostname: 'kalvicode.vercel.app',
    path: '/api/execute',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({}));
  console.log(`2. POST /api/execute (empty): HTTP ${res2.status} (Expected: 400)`);

  // Test 3: POST /api/execute with invalid slug -> 404
  const res3 = await testUrl({
    hostname: 'kalvicode.vercel.app',
    path: '/api/execute',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({ questionSlug: 'invalid-test-slug-999', language: 'python', code: 'print(1)' }));
  console.log(`3. POST /api/execute (invalid slug): HTTP ${res3.status} (Expected: 404)`);

  // Test 4: POST /api/execute with syntax error -> 422
  const res4 = await testUrl({
    hostname: 'kalvicode.vercel.app',
    path: '/api/execute',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({ questionSlug: 'sum-of-two-numbers', language: 'python', code: 'def invalid(:\n  return' }));
  console.log(`4. POST /api/execute (syntax error): HTTP ${res4.status} (Expected: 422)`);

  // Test 5: POST /api/execute with correct Python code -> 200 (10/10)
  const res5 = await testUrl({
    hostname: 'kalvicode.vercel.app',
    path: '/api/execute',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: 'a, b = map(int, input().split())\nprint(a + b)',
    isSubmit: true
  }));
  console.log(`5. POST /api/execute (correct Python): HTTP ${res5.status} (Expected: 200), Passed: ${res5.json?.passed}/${res5.json?.total}`);

  // Test 6: Unknown SPA route rewrite
  const res6 = await testUrl({
    hostname: 'kalvicode.vercel.app',
    path: '/random-invalid-route-12345',
    method: 'GET'
  });
  console.log(`6. GET /random-invalid-route-12345: HTTP ${res6.status} (SPA rewrite to index.html with 404 client router)`);

  console.log('\nProduction verification completed.');
}

// Give Vercel 15 seconds to build and deploy
setTimeout(verifyProduction, 12000);
