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
  // Test 1: Belt 1 Q1 (Arithmetic Check Variant 1) - Python
  // Given integers a, b, and c, compute (a+b)*c - b
  // -------------------------------------------------------------
  console.log('--- 1. Belt 1: Q1 (Arithmetic Check Variant 1) in Python ---')
  const b1q1SolutionPython = `
import sys
data = sys.stdin.read().split()
if len(data) >= 3:
    a, b, c = int(data[0]), int(data[1]), int(data[2])
    print((a + b) * c - b)
`
  const res1 = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: b1q1SolutionPython,
    isSubmit: true,
  })

  assert(res1.success === true, 'Belt 1 Q1: Python execution succeeds')
  assert(res1.passed === 10, 'Belt 1 Q1: Python passes all 10 test cases (10/10)', { passed: res1.passed, total: res1.total })
  assert(res1.testCases.length === 10, 'Belt 1 Q1: Returns 10 test case results')

  // -------------------------------------------------------------
  // Test 2: Belt 1 Q1 in Node.js (JavaScript)
  // -------------------------------------------------------------
  console.log('\n--- 2. Belt 1: Q1 in Node.js ---')
  const b1q1SolutionJs = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length >= 3) {
  const a = Number(input[0]), b = Number(input[1]), c = Number(input[2]);
  console.log((a + b) * c - b);
}
`
  const resJs = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'nodejs',
    code: b1q1SolutionJs,
    isSubmit: true,
  })
  assert(resJs.success === true && resJs.passed === 10, 'Belt 1 Q1: Node.js passes all 10 test cases')

  // -------------------------------------------------------------
  // Test 3: Belt 1 Q2 (Absolute Difference Variant 1) in Python
  // Given two integers, print their absolute difference.
  // -------------------------------------------------------------
  console.log('\n--- 3. Belt 1: Q2 (Absolute Difference Variant 1) in Python ---')
  const b1q2Solution = `
import sys
data = sys.stdin.read().split()
if len(data) >= 2:
    a, b = int(data[0]), int(data[1])
    print(abs(a - b))
`
  const res3 = await executeQuestion({
    questionSlug: 'belt-1-q2-absolute-difference-v1',
    language: 'python',
    code: b1q2Solution,
    isSubmit: true,
  })
  assert(res3.success === true && res3.passed === 10, 'Belt 1 Q2: Python passes all 10 test cases', {
    passed: res3.passed,
    total: res3.total,
  })

  // -------------------------------------------------------------
  // Test 4: Belt 2 Q1 (Arithmetic Check Variant 1) in Python
  // -------------------------------------------------------------
  console.log('\n--- 4. Belt 2: Q1 in Python ---')
  const res4 = await executeQuestion({
    questionSlug: 'belt-2-q1-arithmetic-check-v1',
    language: 'python',
    code: b1q1SolutionPython,
    isSubmit: true,
  })
  assert(res4.success === true && res4.passed === 10, 'Belt 2 Q1: Python passes all 10 test cases', {
    passed: res4.passed,
    total: res4.total,
  })

  // -------------------------------------------------------------
  // Test 5: Belt 10 Q90 (Pair Sum Exists Variant 3) presence
  // -------------------------------------------------------------
  console.log('\n--- 5. Belt 10: Q90 Execution Check ---')
  const res5 = await executeQuestion({
    questionSlug: 'belt-10-q90-pair-sum-exists-v3',
    language: 'python',
    code: 'print(0)',
    isSubmit: false,
  })
  assert(res5.total === 10, 'Belt 10 Q90: Successfully evaluates 10 test cases on Belt 10')

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
