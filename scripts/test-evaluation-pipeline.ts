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

  // Run executes ONLY the visible cases; it reports the full suite size separately and can never accept.
  assert(
    runRes.total === 3 && runRes.judgeTotal === 10 && runRes.mode === 'run',
    'TEST 1: Run (isSubmit=false) executes the 3 visible cases and reports judgeTotal = 10',
    { total: runRes.total, judgeTotal: runRes.judgeTotal, mode: runRes.mode }
  )
  assert(
    runRes.passed === 3,
    'TEST 2: Run (isSubmit=false) perfect solution passes all 3 visible cases',
    { passed: runRes.passed }
  )
  assert(
    runRes.testCases.length === 3 && runRes.testCases.every((tc) => tc.visible),
    'TEST 3: Run response contains only visible case results (no hidden case is executed or reported)',
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
  const runHardcodedVisible = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: hardcodedOnlyVisible,
    isSubmit: false, // RUN: visible only
  })
  const runHardcoded = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: hardcodedOnlyVisible,
    isSubmit: true, // SUBMIT: the full hidden suite
  })

  assert(
    runHardcodedVisible.passed === 3 && runHardcodedVisible.total === 3 && runHardcoded.total === 10,
    'TEST 5: Hardcoded solution passes Run (3/3 visible) but Submit still judges all 10 cases',
    { run: `${runHardcodedVisible.passed}/${runHardcodedVisible.total}`, submitTotal: runHardcoded.total }
  )
  assert(
    runHardcoded.passed === 3 && runHardcoded.success === false,
    'TEST 6: Hardcoded solution: Submit is exactly 3/10 and NOT accepted',
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
    isSubmit: true,
  })

  assert(
    zeroPassRes.total === 10 && zeroPassRes.passed === 0,
    'TEST 8: Zero passed solution returns passed = 0 / 10',
    { passed: zeroPassRes.passed, total: zeroPassRes.total }
  )

  // --- 5. Security Sanitization Verification: Zero Hidden Data Leakage ---
  console.log('\n--- Suite 3: Security & Hidden Data Protection ---')
  let leakageFound = false
  submitRes.testCases.forEach((tc) => {
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
  const orderCorrect = submitRes.testCases.every((tc, idx) => tc.testIndex === idx + 1)
  assert(
    orderCorrect && submitRes.testCases.length === 10,
    'TEST 10: Test cases are deterministically ordered 1 to 10 in execution response'
  )

  // --- 7. Compilation & Syntax Error Handling ---
  console.log('\n--- Suite 5: Error Handling (Compilation & TLE) ---')
  const syntaxErrRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: 'def broken(:\n  return',
    isSubmit: true,
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
    isSubmit: true,
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
    isSubmit: true,
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
    isSubmit: true,
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
    isSubmit: true,
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
    isSubmit: true,
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
    isSubmit: true,
  })
  assert(
    notFoundRes.total === 10 && notFoundRes.status === 'SYSTEM_ERROR',
    'TEST 17: Non-existent question returns SYSTEM_ERROR with total=10'
  )

  // --- Suite 8: Arithmetic Check Explicit Regression & Consistency ---
  console.log('\n--- Suite 8: Arithmetic Check (Regression Case) ---')
  const pyArithmetic = `
import sys
parts = sys.stdin.read().split()
if len(parts) >= 3:
    a = int(parts[0])
    b = int(parts[1])
    c = int(parts[2])
    print((a + b) * c - b)
`
  // RUN Code for arithmetic-check (visible cases only)
  const runArith = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'python',
    code: pyArithmetic,
    isSubmit: false,
  })
  assert(
    runArith.total === 3 && runArith.passed === 3 && runArith.status === 'ACCEPTED' && runArith.judgeTotal === 10,
    'TEST 18: Arithmetic Check RUN (Python) passes 3/3 visible cases',
    { passed: runArith.passed, total: runArith.total, status: runArith.status }
  )

  // SUBMIT Code for arithmetic-check (unchanged code)
  const submitArith = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'python',
    code: pyArithmetic,
    isSubmit: true,
  })
  assert(
    submitArith.total === 10 && submitArith.passed === 10 && submitArith.status === 'ACCEPTED' && submitArith.success === true,
    'TEST 19: Arithmetic Check SUBMIT (Python, unchanged) passes 10/10 with status ACCEPTED',
    { passed: submitArith.passed, total: submitArith.total, success: submitArith.success }
  )

  // RUN vs SUBMIT Result Parity
  assert(
    runArith.testCases.every((rc) => {
      const sc = submitArith.testCases.find((t) => t.testIndex === rc.testIndex)
      return !!sc && sc.status === rc.status && sc.actualOutput === rc.actualOutput
    }),
    'TEST 20: Arithmetic Check RUN and SUBMIT agree exactly on the visible cases they share'
  )

  // Verify Safe Response on both RUN and SUBMIT (0 hidden inputs or outputs leaked)
  let arithLeakage = false
  for (const tc of [...runArith.testCases, ...submitArith.testCases]) {
    if (tc.testIndex >= 4) {
      if (tc.visible !== false || tc.input !== undefined || tc.expectedOutput !== undefined || tc.actualOutput !== undefined) {
        arithLeakage = true
      }
    }
  }
  assert(!arithLeakage, 'TEST 21: Arithmetic Check RUN (no hidden cases) and SUBMIT responses leak 0 hidden inputs/outputs')

  // --- Suite 9: Multi-Language Arithmetic Check Evaluation ---
  console.log('\n--- Suite 9: Multi-Language Arithmetic Check Evaluation ---')
  const nodeArithmetic = `
const fs = require('fs');
const [a, b, c] = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);
console.log((a + b) * c - b);
`
  const runNodeArith = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'nodejs',
    code: nodeArithmetic,
    isSubmit: false,
  })
  const submitNodeArith = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'nodejs',
    code: nodeArithmetic,
    isSubmit: true,
  })
  assert(
    runNodeArith.passed === 3 && runNodeArith.total === 3 && submitNodeArith.passed === 10,
    'TEST 22: Arithmetic Check Node.js RUN 3/3 visible and SUBMIT 10/10'
  )

  const cppArithmetic = `
#include <iostream>
using namespace std;
int main() {
    long long a, b, c;
    if (cin >> a >> b >> c) {
        cout << ((a + b) * c - b) << endl;
    }
    return 0;
}
`
  const runCppArith = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'cpp',
    code: cppArithmetic,
    isSubmit: false,
  })
  const submitCppArith = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'cpp',
    code: cppArithmetic,
    isSubmit: true,
  })
  assert(
    runCppArith.passed === 3 && runCppArith.total === 3 && submitCppArith.passed === 10,
    'TEST 23: Arithmetic Check C++ RUN 3/3 visible and SUBMIT 10/10'
  )

  const javaArithmetic = `
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong();
            long b = sc.nextLong();
            long c = sc.nextLong();
            System.out.println((a + b) * c - b);
        }
    }
}
`
  const runJavaArith = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'java',
    code: javaArithmetic,
    isSubmit: false,
  })
  const submitJavaArith = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'java',
    code: javaArithmetic,
    isSubmit: true,
  })
  assert(
    runJavaArith.passed === 3 && runJavaArith.total === 3 && submitJavaArith.passed === 10,
    'TEST 24: Arithmetic Check Java RUN 3/3 visible and SUBMIT 10/10'
  )

  // --- Suite 10: Dynamic Code State & Execution Flow ---
  console.log('\n--- Suite 10: Dynamic Code State & Execution Flow ---')
  // TEST D: Code changed after Run
  const brokenCode = `print(0)`
  const submitBroken = await executeQuestion({
    questionSlug: 'arithmetic-check',
    language: 'python',
    code: brokenCode,
    isSubmit: true,
  })
  assert(
    submitBroken.passed < 10 && submitBroken.success === false,
    'TEST 25: Edited broken code after Run fails on SUBMIT (passed < 10, success=false)',
    { passed: submitBroken.passed }
  )

  // TEST E: Submit without Run directly
  const directSubmit = await executeQuestion({
    questionSlug: 'profile-echo',
    language: 'python',
    code: `import sys\nparts = sys.stdin.read().split()\nif len(parts) >= 3:\n    print(parts[0], parts[1], parts[2])`,
    isSubmit: true,
  })
  assert(
    directSubmit.total === 10 && directSubmit.passed === 10 && directSubmit.success === true,
    'TEST 26: Submit without Run directly evaluates all 10 cases (10/10 Accepted)'
  )

  // --- Suite 11: Multi-Topic Representative Question Parity ---
  console.log('\n--- Suite 11: Multi-Topic Representative Question Parity ---')
  // Topic: Basic Arithmetic - weighted-triple: 2*a + 3*b + 5*c
  const weightedTripleCode = `
import sys
parts = sys.stdin.read().split()
if len(parts) >= 3:
    a = int(parts[0])
    b = int(parts[1])
    c = int(parts[2])
    print(2 * a + 3 * b + 5 * c)
`
  const runWeighted = await executeQuestion({
    questionSlug: 'weighted-triple',
    language: 'python',
    code: weightedTripleCode,
    isSubmit: false,
  })
  const submitWeighted = await executeQuestion({
    questionSlug: 'weighted-triple',
    language: 'python',
    code: weightedTripleCode,
    isSubmit: true,
  })
  assert(
    runWeighted.passed === 3 && submitWeighted.passed === 10,
    'TEST 27: Weighted Triple (Basic Arithmetic) RUN 3/3 visible & SUBMIT 10/10'
  )

  // Topic: Loops - repeated-increment-score: (a+2)*b-2
  const loopCode = `
import sys
parts = sys.stdin.read().split()
if len(parts) >= 2:
    a = int(parts[0])
    b = int(parts[1])
    print((a + 2) * b - 2)
`
  const runLoop = await executeQuestion({
    questionSlug: 'repeated-increment-score',
    language: 'python',
    code: loopCode,
    isSubmit: false,
  })
  const submitLoop = await executeQuestion({
    questionSlug: 'repeated-increment-score',
    language: 'python',
    code: loopCode,
    isSubmit: true,
  })
  assert(
    runLoop.passed === 3 && submitLoop.passed === 10,
    'TEST 28: Repeated Increment Score (Loops) RUN 3/3 visible & SUBMIT 10/10'
  )

  // Topic: Legacy Practice Belt Problem Parity (verify legacy questions continue working with their own test counts)
  const legacyProblemRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: `import sys\nparts = sys.stdin.read().split()\nif len(parts) >= 3:\n    a, b, c = map(int, parts[:3])\n    print(a - b + c if (a-b+c) != 0 else 0)`, // check legacy question
    isSubmit: true,
  })
  assert(
    legacyProblemRes.total > 0 && Array.isArray(legacyProblemRes.testCases),
    'TEST 29: Legacy belt question evaluates safely respecting its own test suite'
  )

  console.log('\n========================================================================')
  console.log(`🏁 AUDIT RESULTS: ${passedTestsCount} / ${totalTestsCount} TESTS PASSED`)
  console.log('========================================================================\n')

  if (passedTestsCount === totalTestsCount) {
    console.log(`🎉 ALL ${totalTestsCount} AUTOMATED PIPELINE TESTS PASSED!`)
  } else {
    console.error(`⚠️ ${totalTestsCount - passedTestsCount} TESTS FAILED!`)
    process.exit(1)
  }
}

runFullPipelineTests().catch((err) => {
  console.error('Fatal error in pipeline test runner:', err)
  process.exit(1)
})
