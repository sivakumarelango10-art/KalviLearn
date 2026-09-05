async function testAllLanguagesAndEdgeCases() {
  const api = await import('../api/execute.js');
  const handler = api.default || api;

  const testLang = async (lang, code) => {
    let result = null;
    let statusCode = 200;
    const req = {
      method: 'POST',
      body: {
        questionSlug: 'belt-1-q1-sum-of-two-numbers',
        language: lang,
        code,
        isSubmit: true
      }
    };
    const res = {
      statusCode: 200,
      setHeader: () => {},
      status: (c) => {
        statusCode = c;
        return {
          json: (d) => { result = d; }
        };
      },
      json: (d) => { result = d; },
      end: (d) => {
        if (d && !result) {
          try { result = JSON.parse(d); } catch {}
        }
      }
    };
    await handler(req, res);
    return { statusCode, result };
  };

  console.log('=== 1. Testing Python ===');
  const pyCode = `
import sys
tokens = sys.stdin.read().split()
if len(tokens) >= 2:
    print(int(tokens[0]) + int(tokens[1]))
`;
  const { result: pyRes } = await testLang('python', pyCode);
  console.log('Python total:', pyRes?.total, 'passed:', pyRes?.passed, 'success:', pyRes?.success);

  console.log('\n=== 2. Testing Node.js ===');
  const jsCode = `
const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (tokens.length >= 2) {
  console.log(Number(tokens[0]) + Number(tokens[1]));
}
`;
  const { result: jsRes } = await testLang('nodejs', jsCode);
  console.log('Node.js total:', jsRes?.total, 'passed:', jsRes?.passed, 'success:', jsRes?.success);

  console.log('\n=== 3. Testing C++ ===');
  const cppCode = `
#include <iostream>
using namespace std;
int main() {
    int a, b;
    if (cin >> a >> b) {
        cout << a + b << endl;
    }
    return 0;
}
`;
  const { result: cppRes } = await testLang('cpp', cppCode);
  console.log('C++ total:', cppRes?.total, 'passed:', cppRes?.passed, 'success:', cppRes?.success);

  console.log('\n=== 4. Testing Java ===');
  const javaCode = `
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println(a + b);
        }
    }
}
`;
  const { result: javaRes } = await testLang('java', javaCode);
  console.log('Java total:', javaRes?.total, 'passed:', javaRes?.passed, 'success:', javaRes?.success);

  console.log('\n=== 5. Edge Case: Incorrect Solution ===');
  const { result: wrongRes } = await testLang('python', 'print("0")');
  console.log('Wrong solution passed:', wrongRes?.passed, 'total:', wrongRes?.total, 'success:', wrongRes?.success);
  if (wrongRes?.passed === 10 || wrongRes?.success === true) {
    throw new Error('Wrong solution was improperly accepted!');
  }
  console.log('VERIFIED: Wrong solution was properly rejected.');

  console.log('\n=== 6. Edge Case: Syntax / Compilation Error ===');
  const { statusCode: errStatus, result: errRes } = await testLang('python', 'def bad(x:');
  console.log('Syntax error HTTP status:', errStatus, 'error message:', errRes?.message);
  if (errStatus !== 422) {
    throw new Error('Syntax error did not return HTTP 422');
  }
  console.log('VERIFIED: Syntax error properly returned HTTP 422 Compilation Error.');

  console.log('\n=== 7. Edge Case: Empty Code ===');
  const { statusCode: emptyStatus, result: emptyRes } = await testLang('python', '   ');
  console.log('Empty code HTTP status:', emptyStatus, 'error:', emptyRes?.error);
  if (emptyRes?.error !== 'Compilation Error') {
    throw new Error('Empty code was not rejected');
  }
  console.log('VERIFIED: Empty code properly rejected.');

  console.log('\n=== 8. Hidden Test Case Security Check ===');
  const cases = pyRes?.testCases || [];
  const hidden = cases.filter(c => !c.visible);
  console.log('Total hidden cases evaluated:', hidden.length);
  for (const h of hidden) {
    if (h.input !== undefined || h.expectedOutput !== undefined || h.actualOutput !== undefined) {
      throw new Error(`SECURITY LEAK: Test case #${h.testIndex} leaked data to client`);
    }
  }
  console.log('VERIFIED: ZERO hidden test case inputs or expected outputs exposed to client!');
}

testAllLanguagesAndEdgeCases().catch((err) => {
  console.error('Edge case test failed:', err);
  process.exit(1);
});
