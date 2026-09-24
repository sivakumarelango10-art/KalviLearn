import { executeQuestion } from '../src/server/executeService.js'

async function runE2EExecutionAudit() {
  console.log('========================================================================')
  console.log('🧪 E2E PRACTICE EXECUTION & TESTCASE VERIFICATION SUITE')
  console.log('========================================================================\n')

  let passedTests = 0
  let failedTests = 0

  function assert(condition: boolean, testName: string, detail?: unknown) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`)
      passedTests++
    } else {
      console.error(`  ❌ [FAIL] ${testName}`, detail || '')
      failedTests++
      process.exitCode = 1
    }
  }

  // -------------------------------------------------------------
  // Test 1: M1-LU1 (Belt 1 Q1: Variables and assignment) - Python
  // -------------------------------------------------------------
  console.log('--- 1. Belt 1: M1-LU1 (Variables and assignment) ---')
  const m1Lu1SolutionPython = `
import sys
data = sys.stdin.read().split()
if len(data) >= 4:
    initial = int(data[0])
    c1 = int(data[1])
    c2 = int(data[2])
    c3 = int(data[3])
    print(initial + c1 + c2 + c3)
`
  const res1 = await executeQuestion({
    questionSlug: 'belt-1-q1-variables-and-assignment',
    language: 'python',
    code: m1Lu1SolutionPython,
    isSubmit: true,
  })

  assert(res1.success === true, 'M1-LU1: Python execution succeeds')
  assert(res1.passed === 10, 'M1-LU1: Python passes all 10 test cases (10/10)', { passed: res1.passed, total: res1.total })
  assert(res1.testCases.length === 10, 'M1-LU1: Returns 10 test case results')

  // Also verify alias access via M1-LU1
  const res1Alias = await executeQuestion({
    questionSlug: 'M1-LU1',
    language: 'python',
    code: m1Lu1SolutionPython,
    isSubmit: false,
  })
  assert(res1Alias.passed === 10, 'M1-LU1: Resolution via LU ID "M1-LU1" passes all 10 test cases')

  // -------------------------------------------------------------
  // Test 2: M1-LU1 in Node.js (JavaScript)
  // -------------------------------------------------------------
  console.log('\n--- 2. Belt 1: M1-LU1 in Node.js ---')
  const m1Lu1SolutionJs = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length >= 4) {
  const sum = Number(input[0]) + Number(input[1]) + Number(input[2]) + Number(input[3]);
  console.log(sum);
}
`
  const resJs = await executeQuestion({
    questionSlug: 'belt-1-q1-variables-and-assignment',
    language: 'nodejs',
    code: m1Lu1SolutionJs,
    isSubmit: true,
  })
  assert(resJs.success === true && resJs.passed === 10, 'M1-LU1: Node.js passes all 10 test cases')

  // -------------------------------------------------------------
  // Test 3: M3-LU5 (Belt 2 Q5: Traversal) - Python
  // Traversal: print array from last element to first
  // -------------------------------------------------------------
  console.log('\n--- 3. Belt 2: M3-LU5 (Traversal) ---')
  const m3Lu5Solution = `
import sys
data = sys.stdin.read().split()
if len(data) >= 1:
    n = int(data[0])
    res = []
    for i in range(n, 0, -1):
        res.append(data[i])
    print(' '.join(res))
`
  const res3 = await executeQuestion({
    questionSlug: 'belt-2-q5-traversal',
    language: 'python',
    code: m3Lu5Solution,
    isSubmit: true,
  })
  assert(res3.success === true && res3.passed === 10, 'M3-LU5 (Traversal): Python passes all 10 test cases', {
    passed: res3.passed,
    total: res3.total,
  })

  // -------------------------------------------------------------
  // Test 4: M10-LU6 (Belt 3 Q35: Advanced recursion - Tower of Hanoi)
  // -------------------------------------------------------------
  console.log('\n--- 4. Belt 3: M10-LU6 (Advanced recursion - Tower of Hanoi) ---')
  const m10Lu6Solution = `
import sys
data = sys.stdin.read().split()
if data:
    n = int(data[0])
    if n == 0:
        print(0)
    else:
        print((1 << n) - 1)
`
  const res4 = await executeQuestion({
    questionSlug: 'belt-3-q35-advanced-recursion',
    language: 'python',
    code: m10Lu6Solution,
    isSubmit: true,
  })
  assert(res4.success === true && res4.passed === 10, 'M10-LU6 (Advanced recursion): Passes all 10 test cases (2^n - 1)', {
    passed: res4.passed,
    total: res4.total,
  })

  // -------------------------------------------------------------
  // Test 5: Legacy fixture "sum-of-two-numbers" preservation
  // -------------------------------------------------------------
  console.log('\n--- 5. Legacy Fixture Preservation ---')
  const legacySolution = `
import sys
data = sys.stdin.read().split()
if len(data) >= 2:
    print(int(data[0]) + int(data[1]))
`
  const legacyRes = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: legacySolution,
    isSubmit: true,
  })
  assert(legacyRes.success === true && legacyRes.passed === 10, 'Legacy "sum-of-two-numbers" fixture passes all 10 cases')

  console.log('\n========================================================================')
  console.log(`🏁 E2E EXECUTION AUDIT COMPLETE: ${passedTests} PASSED, ${failedTests} FAILED`)
  console.log('========================================================================\n')

  if (failedTests > 0) {
    process.exit(1)
  }
}

runE2EExecutionAudit().catch((err) => {
  console.error('Fatal execution audit error:', err)
  process.exit(1)
})
