import { executeCustomInput } from '../src/server/executeService'
import { outputsMatch, validateJsonInput, computeLineDiff } from '../src/lib/judge/compare'

async function runTests() {
  console.log('=====================================================================')
  console.log('--- RUNNING CUSTOM TEST INPUT BACKEND & ISOLATION TEST SUITE ---')
  console.log('=====================================================================\n')

  let passed = 0
  let failed = 0

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✓ ${msg}`)
      passed++
    } else {
      console.error(`  ✗ FAIL: ${msg}`)
      failed++
    }
  }

  // ---------------------------------------------------------------------------
  // Test 1: Python custom input execution
  // ---------------------------------------------------------------------------
  console.log('Test 1: Custom input in Python')
  try {
    const res = await executeCustomInput({
      questionSlug: 'custom-py-test',
      language: 'python',
      code: 'name = input().strip()\nprint(f"Welcome, {name}!")',
      customInput: 'Antigravity Student',
    })
    assert(res.success === true, 'Python execution succeeded')
    assert(res.status === 'ACCEPTED', 'Status is ACCEPTED')
    assert(res.testCases.length === 1, 'Exactly 1 test case returned')
    assert(res.testCases[0].actualOutput?.trim() === 'Welcome, Antigravity Student!', 'Correct stdout captured for Python')
    assert(typeof res.testCases[0].executionTimeMs === 'number', 'Execution time reported in ms')
  } catch (err: any) {
    assert(false, `Python custom input failed with error: ${err.message}`)
  }

  // ---------------------------------------------------------------------------
  // Test 2: Node.js (JavaScript) custom input execution
  // ---------------------------------------------------------------------------
  console.log('\nTest 2: Custom input in Node.js')
  try {
    const res = await executeCustomInput({
      questionSlug: 'custom-node-test',
      language: 'nodejs',
      code: 'const fs = require("fs"); const val = fs.readFileSync(0, "utf8").trim(); console.log("Squared:", Number(val) * Number(val));',
      customInput: '12',
    })
    assert(res.success === true, 'Node.js execution succeeded')
    assert(res.testCases[0].actualOutput?.trim() === 'Squared: 144', 'Correct stdout captured for Node.js')
  } catch (err: any) {
    assert(false, `Node.js custom input failed with error: ${err.message}`)
  }

  // ---------------------------------------------------------------------------
  // Test 3: Java custom input execution
  // ---------------------------------------------------------------------------
  console.log('\nTest 3: Custom input in Java')
  try {
    const javaCode = `
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println("Sum = " + (a + b));
        }
    }
}
`
    const res = await executeCustomInput({
      questionSlug: 'custom-java-test',
      language: 'java',
      code: javaCode,
      customInput: '45 55',
    })
    assert(res.success === true, 'Java execution succeeded')
    assert(res.testCases[0].actualOutput?.trim() === 'Sum = 100', 'Correct stdout captured for Java')
  } catch (err: any) {
    assert(false, `Java custom input failed with error: ${err.message}`)
  }

  // ---------------------------------------------------------------------------
  // Test 4: C++ custom input execution
  // ---------------------------------------------------------------------------
  console.log('\nTest 4: Custom input in C++')
  try {
    const cppCode = `
#include <iostream>
#include <string>
using namespace std;
int main() {
    string s;
    if (cin >> s) {
        cout << "Echo: " << s << endl;
    }
    return 0;
}
`
    const res = await executeCustomInput({
      questionSlug: 'custom-cpp-test',
      language: 'cpp',
      code: cppCode,
      customInput: 'HelloWorld',
    })
    assert(res.success === true, 'C++ execution succeeded')
    assert(res.testCases[0].actualOutput?.trim() === 'Echo: HelloWorld', 'Correct stdout captured for C++')
  } catch (err: any) {
    assert(false, `C++ custom input failed with error: ${err.message}`)
  }

  // ---------------------------------------------------------------------------
  // Test 5: Compilation Error, Runtime Error, and Timeout handling
  // ---------------------------------------------------------------------------
  console.log('\nTest 5: Error and Timeout handling')
  // 5a. Compile Error
  try {
    const res = await executeCustomInput({
      questionSlug: 'test-compile-error',
      language: 'python',
      code: 'def broken(\n  syntax error here',
      customInput: 'test',
    })
    assert(res.status === 'COMPILATION_ERROR', 'Syntax error classified as COMPILATION_ERROR')
    assert(res.success === false, 'Success is false on compilation error')
  } catch (err: any) {
    assert(false, `Compile error test failed: ${err.message}`)
  }

  // 5b. Runtime Error
  try {
    const res = await executeCustomInput({
      questionSlug: 'test-runtime-error',
      language: 'python',
      code: 'x = 1 / 0',
      customInput: 'test',
    })
    assert(res.status === 'RUNTIME_ERROR', 'Division by zero classified as RUNTIME_ERROR')
    assert(res.testCases[0].status === 'runtime_error', 'Test case status is runtime_error')
  } catch (err: any) {
    assert(false, `Runtime error test failed: ${err.message}`)
  }

  // 5c. Timeout
  try {
    const res = await executeCustomInput({
      questionSlug: 'test-timeout',
      language: 'python',
      code: 'import time\ntime.sleep(10)',
      customInput: 'test',
    })
    assert(res.status === 'TIME_LIMIT_EXCEEDED', 'Long running code classified as TIME_LIMIT_EXCEEDED')
    assert(res.testCases[0].status === 'time_limit_exceeded', 'Test case status is time_limit_exceeded')
  } catch (err: any) {
    assert(false, `Timeout test failed: ${err.message}`)
  }

  // ---------------------------------------------------------------------------
  // Test 6: Expected output matching rules (including JSON and line diff)
  // ---------------------------------------------------------------------------
  console.log('\nTest 6: Expected output comparison & JSON rules')
  assert(outputsMatch('42', '42') === true, 'Exact integer output matches')
  assert(outputsMatch('42\r\n', '42\n') === true, 'CRLF differences normalized and matched')
  assert(outputsMatch('42', '43') === false, 'Different outputs mismatch')

  // JSON objects: key order ignored
  const jsonA = '{"foo": "bar", "num": 100}'
  const jsonB = '{"num": 100, "foo": "bar"}'
  assert(outputsMatch(jsonA, jsonB) === true, 'JSON matching ignores object key ordering')

  // JSON arrays: ordering strictly preserved
  assert(outputsMatch('[1, 2, 3]', '[1, 2, 3]') === true, 'Matching JSON arrays pass')
  assert(outputsMatch('[1, 2, 3]', '[3, 2, 1]') === false, 'Permuted JSON arrays fail (order matters)')

  // Float numeric tolerance
  assert(outputsMatch('3.14159265', '3.14159260') === true, 'Floating point tolerance applied token-by-token')

  // Line diff
  const diff = computeLineDiff('alpha\nbravo\ncharlie', 'alpha\nDELTA\ncharlie')
  assert(diff.matches === false, 'Diff detects mismatch')
  assert(diff.firstMismatchLine === 2, 'Diff identifies line 2 as first mismatch')

  // ---------------------------------------------------------------------------
  // Test 7: Invalid JSON input validation
  // ---------------------------------------------------------------------------
  console.log('\nTest 7: JSON input validation & line detection')
  const validJson = validateJsonInput('{"name": "Alice", "age": 25}')
  assert(validJson.valid === true, 'Valid JSON correctly validated')

  const invalidJsonMultiLine = `{\n  "name": "Alice",\n  "invalid": [\n    1,\n    2,\n  ]\n}`
  const invalidRes = validateJsonInput(invalidJsonMultiLine)
  assert(invalidRes.valid === false, 'Invalid JSON with trailing comma detected')
  assert(typeof invalidRes.line === 'number', `Line error detected: ${invalidRes.error}`)

  // ---------------------------------------------------------------------------
  // Test 8: Input > 64 KB rejected & Output > 64 KB truncated
  // ---------------------------------------------------------------------------
  console.log('\nTest 8: Size limits (64 KB input reject, 64 KB output truncation)')
  // Input over 64 KB
  const hugeInput = 'X'.repeat(70000)
  const rejectRes = await executeCustomInput({
    questionSlug: 'test-huge-input',
    language: 'python',
    code: 'print("hello")',
    customInput: hugeInput,
  })
  assert(rejectRes.success === false, 'Input over 64 KB is rejected')
  assert(rejectRes.error === 'Payload Too Large', 'Error code is Payload Too Large')

  // Output over 64 KB
  const truncateRes = await executeCustomInput({
    questionSlug: 'test-huge-output',
    language: 'python',
    code: 'print("A" * 100000)',
    customInput: 'run',
  })
  assert(truncateRes.success === true, 'Code with huge output executes')
  const actualOut = truncateRes.testCases[0].actualOutput || ''
  assert(actualOut.includes('[Output truncated at 64 KB]'), 'Huge output is truncated with a note')
  assert(actualOut.length <= 66000, 'Output length is capped around 64 KB limit')

  // ---------------------------------------------------------------------------
  // Test 9: Zero database mutations & no hidden test leakage
  // ---------------------------------------------------------------------------
  console.log('\nTest 9: Database isolation & security')
  assert(!('suite' in rejectRes), 'ExecuteCustomResponse does not include suite object')
  assert(rejectRes.testCases.every((tc) => tc.visible === true), 'Custom test cases are strictly visible; zero hidden cases')

  console.log('\n=====================================================================')
  if (failed === 0) {
    console.log(`✓ ALL ${passed} CUSTOM TEST INPUT CHECKS PASSED SUCCESSFULLY!`)
  } else {
    console.error(`✗ ${failed} CHECKS FAILED! (${passed} passed)`)
    process.exit(1)
  }
  console.log('=====================================================================')
}

runTests().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
