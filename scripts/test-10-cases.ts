import { executeQuestion } from '../src/server/executeService.js'
import fs from 'fs'
import path from 'path'

async function runTests() {
  console.log('====================================================')
  console.log('🚀 TESTING 10-TEST-CASE SECURE EXECUTION ENGINE')
  console.log('====================================================\n')

  let allPassed = true

  // Test 1: Python 3 Perfect Solution on 'sum-of-two-numbers'
  console.log('--- TEST 1: Python 3 (10/10 Passed) ---')
  const pyCode = `
import sys
input_data = sys.stdin.read().split()
if len(input_data) >= 2:
    a = int(input_data[0])
    b = int(input_data[1])
    print(a + b)
`
  const res1 = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: pyCode,
  })

  console.log(`Success: ${res1.success}`)
  console.log(`Passed count: ${res1.passed} / ${res1.total}`)
  console.log(`Total test cases returned: ${res1.testCases.length}`)
  
  if (res1.passed === 10 && res1.total === 10 && res1.testCases.length === 10) {
    console.log('✅ TEST 1 PASSED: Evaluated all 10 test cases, 10/10 passed.')
  } else {
    console.error('❌ TEST 1 FAILED:', res1)
    allPassed = false
  }

  // Verify Security: Test Cases 4-10 MUST NOT have input, expectedOutput, or actualOutput
  console.log('\n--- TEST 2: Security Sanitization Verification (Hidden Cases 4-10) ---')
  let leakageDetected = false
  res1.testCases.forEach((tc, idx) => {
    if (tc.testIndex >= 4) {
      if ('input' in tc || 'expectedOutput' in tc || 'actualOutput' in tc) {
        console.error(`🚨 SECURITY LEAKAGE in Test Case ${tc.testIndex}:`, tc)
        leakageDetected = true
      }
    } else {
      if (!('input' in tc) || !('expectedOutput' in tc) || !('actualOutput' in tc)) {
        console.error(`🚨 Visible Test Case ${tc.testIndex} missing visible field!`, tc)
        leakageDetected = true
      }
    }
  })

  if (!leakageDetected) {
    console.log('✅ TEST 2 PASSED: Cases 1-3 contain visible input/output. Cases 4-10 contain ZERO inputs, expected outputs, or actual outputs!')
  } else {
    allPassed = false
  }

  // Test 3: Hardcoded/Partial Solution (Fails hidden test cases)
  console.log('\n--- TEST 3: Hardcoded Solution (Fails Hidden Cases) ---')
  const hardcodedPy = `
import sys
data = sys.stdin.read().strip()
# Hardcodes only visible test case 1 (3 + 5 = 8)
if data == '3 5':
    print(8)
elif data == '10 20':
    print(30)
elif data == '-5 15':
    print(10)
else:
    print(0)
`
  const res3 = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: hardcodedPy,
  })

  console.log(`Passed count: ${res3.passed} / ${res3.total}`)
  if (res3.passed < 10) {
    console.log(`✅ TEST 3 PASSED: Hardcoded answer correctly failed hidden test cases (${res3.passed}/10 passed).`)
  } else {
    console.error('❌ TEST 3 FAILED: Hardcoded code somehow passed all 10!', res3)
    allPassed = false
  }

  // Test 4: Compilation/Syntax Error
  console.log('\n--- TEST 4: Python Syntax Error Handling ---')
  const syntaxErrPy = `def broken_func(:\n  return`
  const res4 = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'python',
    code: syntaxErrPy,
  })

  console.log(`Success: ${res4.success}, Error: ${res4.error}`)
  if (!res4.success && res4.error === 'Compilation Error' && res4.passed === 0) {
    console.log('✅ TEST 4 PASSED: Syntax error detected, 0/10 test cases passed, error message returned.')
  } else {
    console.error('❌ TEST 4 FAILED:', res4)
    allPassed = false
  }

  // Test 5: JavaScript 10/10 Execution
  console.log('\n--- TEST 5: JavaScript (Node.js) (10/10 Passed) ---')
  const jsCode = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length >= 2) {
    const a = parseInt(input[0], 10);
    const b = parseInt(input[1], 10);
    console.log(a + b);
}
`
  const res5 = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'javascript',
    code: jsCode,
  })

  console.log(`JS Passed count: ${res5.passed} / ${res5.total}`)
  if (res5.passed === 10) {
    console.log('✅ TEST 5 PASSED: JavaScript passed all 10 test cases.')
  } else {
    console.error('❌ TEST 5 FAILED:', res5)
    allPassed = false
  }

  // Test 6: C++ 10/10 Execution
  console.log('\n--- TEST 6: C++ (g++) (10/10 Passed) ---')
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
  const res6 = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'cpp',
    code: cppCode,
  })

  console.log(`C++ Passed count: ${res6.passed} / ${res6.total}`)
  if (res6.passed === 10) {
    console.log('✅ TEST 6 PASSED: C++ passed all 10 test cases.')
  } else {
    console.error('❌ TEST 6 FAILED:', res6)
    allPassed = false
  }

  // Test 7: Java 10/10 Execution
  console.log('\n--- TEST 7: Java (OpenJDK) (10/10 Passed) ---')
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
  const res7 = await executeQuestion({
    questionSlug: 'sum-of-two-numbers',
    language: 'java',
    code: javaCode,
  })

  console.log(`Java Passed count: ${res7.passed} / ${res7.total}`)
  if (res7.passed === 10) {
    console.log('✅ TEST 7 PASSED: Java passed all 10 test cases.')
  } else {
    console.error('❌ TEST 7 FAILED:', res7)
    allPassed = false
  }

  // Test 8: Frontend Production Bundle Scrub Verification
  console.log('\n--- TEST 8: Frontend Bundle Security Audit ---')
  const distAssetsDir = path.resolve('dist', 'assets')
  const files = fs.readdirSync(distAssetsDir)
  const problemsChunk = files.find(f => f.startsWith('problems-') && f.endsWith('.js'))
  
  if (!problemsChunk) {
    console.error('❌ problems chunk not found in dist/assets!')
    allPassed = false
  } else {
    const chunkContent = fs.readFileSync(path.join(distAssetsDir, problemsChunk), 'utf-8')
    // Check for secret hidden test case inputs from serverTestCases.json
    // e.g. for sum-of-two-numbers, test 10 input is "1000000000 2000000000"
    if (chunkContent.includes('1000000000 2000000000') || chunkContent.includes('3000000000')) {
      console.error('🚨 LEAKAGE DETECTED in client production bundle!')
      allPassed = false
    } else {
      console.log('✅ TEST 8 PASSED: Client bundle contains ZERO hidden test case inputs or expected outputs.')
    }
  }

  console.log('\n====================================================')
  if (allPassed) {
    console.log('🎉 ALL 8 TESTS PASSED WITH 100% SUCCESS!')
  } else {
    console.log('❌ SOME TESTS FAILED. Please review above logs.')
  }
  console.log('====================================================')

  process.exit(allPassed ? 0 : 1)
}

runTests().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
