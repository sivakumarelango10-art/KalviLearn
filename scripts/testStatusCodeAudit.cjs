const http = require('http');

async function runTests() {
  console.log('--- Testing Bundled api/execute.js ---');
  const handler = (await import('../api/execute.js')).default;

  const mockRes = () => {
    let statusCode = 200;
    let headers = {};
    let body = '';
    return {
      setHeader: (k, v) => { headers[k] = v; },
      set statusCode(code) { statusCode = code; },
      get statusCode() { return statusCode; },
      end: (data) => { body = data || ''; },
      status: function(code) { this.statusCode = code; return this; },
      json: function(data) { this.end(JSON.stringify(data)); return this; },
      _getResult: () => ({ statusCode, headers, body: body ? JSON.parse(body) : null }),
    };
  };

  const testCases = [
    {
      name: '1. OPTIONS CORS preflight returns HTTP 204',
      req: { method: 'OPTIONS' },
      expectedStatus: 204,
    },
    {
      name: '2. GET request returns HTTP 405 Method Not Allowed',
      req: { method: 'GET' },
      expectedStatus: 405,
    },
    {
      name: '3. Empty payload returns HTTP 400 Bad Request',
      req: { method: 'POST', body: {} },
      expectedStatus: 400,
    },
    {
      name: '4. Missing code returns HTTP 400 Bad Request',
      req: { method: 'POST', body: { questionSlug: 'sum-of-two-numbers', language: 'python' } },
      expectedStatus: 400,
    },
    {
      name: '5. Non-existent slug returns HTTP 404 Not Found',
      req: { method: 'POST', body: { questionSlug: 'completely-invalid-slug-12345', language: 'python', code: 'print(1)' } },
      expectedStatus: 404,
    },
    {
      name: '6. Python Syntax Error returns HTTP 422 Unprocessable Content',
      req: { method: 'POST', body: { questionSlug: 'sum-of-two-numbers', language: 'python', code: 'def invalid(:\n  return' } },
      expectedStatus: 422,
    },
    {
      name: '7. Valid Python execution returns HTTP 200 OK',
      req: { method: 'POST', body: { questionSlug: 'sum-of-two-numbers', language: 'python', code: 'a, b = map(int, input().split())\nprint(a + b)', isSubmit: true } },
      expectedStatus: 200,
    },
    {
      name: '8. Valid Java execution returns HTTP 200 OK',
      req: { method: 'POST', body: { questionSlug: 'sum-of-two-numbers', language: 'java', code: 'import java.util.Scanner;\npublic class Solution {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a + b);\n  }\n}', isSubmit: true } },
      expectedStatus: 200,
    },
    {
      name: '9. Valid C++ execution returns HTTP 200 OK',
      req: { method: 'POST', body: { questionSlug: 'sum-of-two-numbers', language: 'cpp', code: '#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}', isSubmit: true } },
      expectedStatus: 200,
    },
    {
      name: '10. Valid Node.js execution returns HTTP 200 OK',
      req: { method: 'POST', body: { questionSlug: 'sum-of-two-numbers', language: 'javascript', code: 'const [a, b] = readline().trim().split(/\\s+/).map(Number);\nprint(a + b);', isSubmit: true } },
      expectedStatus: 200,
    },
  ];

  let passedAll = true;

  for (const tc of testCases) {
    const res = mockRes();
    await handler(tc.req, res);
    const result = res._getResult();

    if (result.statusCode === tc.expectedStatus) {
      console.log(`PASS: ${tc.name} -> HTTP ${result.statusCode}`);
      if (result.statusCode === 200) {
        console.log(`      Passed tests: ${result.body.passed}/${result.body.total}`);
      }
    } else {
      console.error(`FAIL: ${tc.name} -> Expected HTTP ${tc.expectedStatus}, got HTTP ${result.statusCode}`);
      console.error('      Response:', result.body);
      passedAll = false;
    }
  }

  if (!passedAll) {
    process.exit(1);
  }
  console.log('\nAll 10 HTTP Status Code & Execution tests passed successfully!');
}

runTests().catch((err) => {
  console.error('Error running testStatusCodeAudit:', err);
  process.exit(1);
});
