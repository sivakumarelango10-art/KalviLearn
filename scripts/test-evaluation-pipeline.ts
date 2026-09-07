import { executeQuestion } from '../src/server/executeService.js'

async function runFullPipelineTests() {
  console.log('========================================================================')
  console.log('🧪 COMPREHENSIVE TEST CASE EVALUATION PIPELINE AUDIT')
  console.log('========================================================================\n')

  let passedTestsCount = 0
  let totalTestsCount = 0

  function assert(condition: boolean, testName: string, details?: unknown) {
    totalTestsCount++
    if (condition) {
      console.log(`✅ [PASS] ${testName}`)
      passedTestsCount++
    } else {
      console.error(`❌ [FAIL] ${testName}`, details ? details : '')
      process.exitCode = 1
    }
  }

  // --- 1. Python 3: RUN (isSubmit = false) with perfect solution ---
  console.log('--- Suite 1: Run vs Submit Total Count Authoritativeness ---')
  const perfectPython = `
import sys
data = sys.stdin.read().split()
if len(data) >= 2:
    print(int(data[0]) + int(data[1]))
`
  const runRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: perfectPython,
    isSubmit: false, // RUN
  })

  assert(
    runRes.total === 10,
    'TEST 1: Run (isSubmit=false) returns total = 10 (never 3)',
    { total: runRes.total }
  )
  assert(
    runRes.passed === 10,
    'TEST 2: Run (isSubmit=false) perfect solution passes all 10 cases',
    { passed: runRes.passed }
  )
  assert(
    runRes.testCases.length === 10,
    'TEST 3: Run (isSubmit=false) returns results array with length = 10',
    { length: runRes.testCases.length }
  )

  // --- 2. Python 3: SUBMIT (isSubmit = true) with perfect solution ---
  const submitRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: perfectPython,
    isSubmit: true, // SUBMIT
  })

  assert(
    submitRes.total === 10 && submitRes.passed === 10 && submitRes.testCases.length === 10,
    'TEST 4: Submit (isSubmit=true) evaluates all 10 cases (10/10 passed)',
    { total: submitRes.total, passed: submitRes.passed }
  )

  // --- 3. Hardcoded Solution: Only Visible Cases Pass (RUN & SUBMIT) ---
  console.log('\n--- Suite 2: Partial & Hidden Failure Evaluation ---')
  // sum-of-two-numbers visible cases: 15 27 -> 42, 100 250 -> 350, 8 12 -> 20
  const hardcodedOnlyVisible = `
import sys
d = sys.stdin.read().strip()
if d == "15 27":
    print(42)
elif d == "100 250":
    print(350)
elif d == "8 12":
    print(20)
else:
    print(999999)
`
  const runHardcoded = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: hardcodedOnlyVisible,
    isSubmit: false, // RUN
  })

  assert(
    runHardcoded.total === 10,
    'TEST 5: Hardcoded solution: Run total remains 10 (NEVER 3)',
    { total: runHardcoded.total }
  )
  assert(
    runHardcoded.passed === 3,
    'TEST 6: Hardcoded solution: Passed count is exactly 3/10 (visible only)',
    { passed: runHardcoded.passed, total: runHardcoded.total }
  )
  assert(
    runHardcoded.testCases[0].status === 'passed' &&
    runHardcoded.testCases[1].status === 'passed' &&
    runHardcoded.testCases[2].status === 'passed' &&
    runHardcoded.testCases[3].status === 'failed',
    'TEST 7: Visible cases (1-3) pass; hidden case 4 fails',
    {
      c1: runHardcoded.testCases[0].status,
      c2: runHardcoded.testCases[1].status,
      c3: runHardcoded.testCases[2].status,
      c4: runHardcoded.testCases[3].status,
    }
  )

  // --- 4. Zero Passed Solution ---
  const zeroPassCode = `print("completely_wrong_output")`
  const zeroPassRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: zeroPassCode,
    isSubmit: false,
  })

  assert(
    zeroPassRes.total === 10 && zeroPassRes.passed === 0,
    'TEST 8: Zero passed solution returns passed = 0 / 10',
    { passed: zeroPassRes.passed, total: zeroPassRes.total }
  )

  // --- 5. Security Sanitization Verification: Zero Hidden Data Leakage ---
  console.log('\n--- Suite 3: Security & Hidden Data Protection ---')
  let leakageFound = false
  runRes.testCases.forEach((tc) => {
    if (tc.testIndex >= 4) {
      if ('input' in tc && tc.input !== undefined) {
        console.error(`🚨 Leakage: Hidden Case ${tc.testIndex} exposed input!`, tc)
        leakageFound = true
      }
      if ('expectedOutput' in tc && tc.expectedOutput !== undefined) {
        console.error(`🚨 Leakage: Hidden Case ${tc.testIndex} exposed expectedOutput!`, tc)
        leakageFound = true
      }
      if ('actualOutput' in tc && tc.actualOutput !== undefined) {
        console.error(`🚨 Leakage: Hidden Case ${tc.testIndex} exposed actualOutput!`, tc)
        leakageFound = true
      }
    } else {
      // Visible cases MUST include them
      if (!tc.input || !tc.expectedOutput) {
        console.error(`🚨 Visible Case ${tc.testIndex} missing input/output!`, tc)
        leakageFound = true
      }
    }
  })

  assert(
    !leakageFound,
    'TEST 9: Zero hidden inputs or expected outputs exposed for Cases 4-10'
  )

  // --- 6. Deterministic Ordering ---
  console.log('\n--- Suite 4: Deterministic Ordering ---')
  const orderCorrect = runRes.testCases.every((tc, idx) => tc.testIndex === idx + 1)
  assert(
    orderCorrect && runRes.testCases.length === 10,
    'TEST 10: Test cases are deterministically ordered 1 to 10 in execution response'
  )

  // --- 7. Compilation & Syntax Error Handling ---
  console.log('\n--- Suite 5: Error Handling (Compilation & TLE) ---')
  const syntaxErrRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: 'def broken(:\n  return',
    isSubmit: false,
  })

  assert(
    syntaxErrRes.status === 'COMPILATION_ERROR' && syntaxErrRes.total === 10 && syntaxErrRes.passed === 0,
    'TEST 11: Python Syntax Error returns COMPILATION_ERROR, total=10, passed=0',
    { status: syntaxErrRes.status, total: syntaxErrRes.total }
  )

  // --- 8. JavaScript / Node.js Execution ---
  console.log('\n--- Suite 6: Multi-Language Verification ---')
  const jsCode = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length >= 2) {
    console.log(Number(input[0]) + Number(input[1]));
}
`
  const jsRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'javascript',
    code: jsCode,
    isSubmit: false,
  })

  assert(
    jsRes.total === 10 && jsRes.passed === 10,
    'TEST 12: JavaScript (Node.js) evaluates all 10 cases (10/10 passed, total=10)',
    { total: jsRes.total, passed: jsRes.passed }
  )

  // --- 9. C++ Execution ---
  const cppCode = `
#include <iostream>
using namespace std;
int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << (a + b) << endl;
    }
    return 0;
}
`
  const cppRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'cpp',
    code: cppCode,
    isSubmit: false,
  })

  assert(
    cppRes.total === 10 && cppRes.passed === 10,
    'TEST 13: C++ evaluates all 10 cases (10/10 passed, total=10)',
    { total: cppRes.total, passed: cppRes.passed }
  )

  // --- 10. Java Execution ---
  const javaCode = `
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong();
            long b = sc.nextLong();
            System.out.println(a + b);
        }
    }
}
`
  const javaRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'java',
    code: javaCode,
    isSubmit: false,
  })

  assert(
    javaRes.total === 10 && javaRes.passed === 10,
    'TEST 14: Java evaluates all 10 cases (10/10 passed, total=10)',
    { total: javaRes.total, passed: javaRes.passed }
  )

  // --- 11. Empty Code Validation ---
  console.log('\n--- Suite 7: Boundary & Payload Limits ---')
  const emptyRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: '   ',
    isSubmit: false,
  })
  assert(
    emptyRes.total === 10 && emptyRes.passed === 0 && emptyRes.status === 'COMPILATION_ERROR',
    'TEST 15: Empty code safely rejected with COMPILATION_ERROR and total=10'
  )

  // --- 12. Oversized Payload (>64KB) ---
  const hugeCode = '# ' + 'x'.repeat(70000)
  const hugeRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: hugeCode,
    isSubmit: false,
  })
  assert(
    hugeRes.total === 10 && hugeRes.passed === 0 && hugeRes.error === 'Payload Too Large',
    'TEST 16: Oversized payload rejected with total=10 and error message'
  )

  // --- 13. Non-existent Question Slug ---
  const notFoundRes = await executeQuestion({
    questionSlug: 'non-existent-random-question',
    language: 'python',
    code: 'print(1)',
    isSubmit: false,
  })
  assert(
    notFoundRes.total === 10 && notFoundRes.status === 'SYSTEM_ERROR',
    'TEST 17: Non-existent question returns SYSTEM_ERROR with total=10'
  )

  console.log('\n========================================================================')
  console.log(`🏁 AUDIT RESULTS: ${passedTestsCount} / ${totalTestsCount} TESTS PASSED`)
  console.log('========================================================================\n')

  if (passedTestsCount === totalTestsCount) {
    console.log('🎉 ALL 17 AUTOMATED PIPELINE TESTS PASSED!')
  } else {
    console.error(`⚠️ ${totalTestsCount - passedTestsCount} TESTS FAILED!`)
    process.exit(1)
  }
}

runFullPipelineTests().catch((err) => {
  console.error('Fatal error in pipeline test runner:', err)
  process.exit(1)
})
