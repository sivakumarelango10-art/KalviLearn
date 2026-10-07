/**
 * MASTER KALVILEARN TESTCASE, HIDDEN TEST, CODE EXECUTION, SECURITY & EVALUATION AUDIT SUITE
 *
 * Exercises the REAL execution pipeline across all 4 supported languages (Python, Java, Node.js, C++),
 * validates the full 500-question dataset (5,000 test cases), verifies strict open/hidden test separation,
 * tests adversarial wrong solutions, executes sandbox escape & resource abuse payloads, and verifies
 * API authentication, IDOR, and XP/progress integrity.
 */

import { EventEmitter } from 'events'
import fs from 'fs'
import path from 'path'
import { executeQuestion } from '../src/server/executeService'
import executeHandler, { resetExecuteRateLimitsForTesting } from '../src/server/apiHandler'
import submitHandler, { resetSubmitStateForTesting } from '../src/server/submitHandler'
import { serverTestCases } from '../src/server/data/serverTestCases'
import problemsData from '../src/data/problems.json'

// Allow synthetic test tokens for in-process testing
process.env.ALLOW_TEST_AUTH_TOKENS = '1'
process.env.POC_SECRET_PROBE = 'super-secret-probe-value'

interface TestReport {
  suite: string
  name: string
  passed: boolean
  details?: unknown
}

const reports: TestReport[] = []

function assert(condition: boolean, suite: string, name: string, details?: unknown) {
  reports.push({ suite, name, passed: condition, details })
  if (condition) {
    console.log(`  ✅ [PASS] [${suite}] ${name}`)
  } else {
    console.error(`  ❌ [FAIL] [${suite}] ${name}`, details || '')
    process.exitCode = 1
  }
}

function mockHttp(options: { method: string; url?: string; headers?: Record<string, string>; body?: unknown; ip?: string }) {
  const req = new EventEmitter() as any
  req.method = options.method
  req.url = options.url || '/api/test'
  req.headers = { ...(options.headers || {}) }
  req.socket = { remoteAddress: options.ip || '127.0.0.1' }
  req.body = options.body
  const responseHeaders: Record<string, string> = {}
  let responseData = ''
  const res: any = {
    statusCode: 200,
    setHeader: (k: string, v: string) => {
      responseHeaders[k.toLowerCase()] = v
    },
    end: (chunk?: string) => {
      if (chunk) responseData += chunk
    },
  }
  return {
    req,
    res,
    headers: responseHeaders,
    status: () => res.statusCode as number,
    json: () => {
      try {
        return JSON.parse(responseData)
      } catch {
        return {}
      }
    },
  }
}

async function runMasterAudit() {
  console.log('========================================================================')
  console.log('🛡️  KALVILEARN MASTER COMPREHENSIVE AUDIT & VERIFICATION SUITE')
  console.log('========================================================================\n')

  // =========================================================================
  // 1. DATASET INTEGRITY & TOTAL TEST CASE INVENTORY (500 PROBLEMS, 5000 CASES)
  // =========================================================================
  console.log('--- 1. Question Dataset Integrity & Uniqueness (500 Problems, 5,000 Cases) ---')

  const allProblems = (problemsData as any[]).flatMap((b) => b.problems)
  assert(allProblems.length === 500, 'Dataset', 'Total problems in problems.json is exactly 500')

  const uniqueProblemIds = new Set(allProblems.map((p) => p.id))
  assert(uniqueProblemIds.size === 500, 'Dataset', 'All 500 problem IDs are globally unique')

  const uniqueSlugs = new Set(allProblems.map((p) => p.slug))
  assert(uniqueSlugs.size === 500, 'Dataset', 'All 500 problem slugs are globally unique')

  let missingMetadata = 0
  let catalogHiddenLeaks = 0
  let serverTestCaseErrors = 0
  let duplicateInputsInProblem = 0

  allProblems.forEach((p) => {
    if (!p.title || !p.description || !p.difficulty || !p.inputFormat || !p.outputFormat) {
      missingMetadata++
    }
    if (!p.testCases || p.testCases.length !== 10) {
      missingMetadata++
      return
    }

    // Check client testCases in problems.json (Cases 1-3 visible, 4-10 hidden)
    for (let i = 0; i < 3; i++) {
      const tc = p.testCases[i]
      if (tc.isHidden || !tc.input || !tc.expectedOutput) missingMetadata++
    }
    for (let i = 3; i < 10; i++) {
      const tc = p.testCases[i]
      if (!tc.isHidden || tc.input !== undefined || tc.expectedOutput !== undefined) {
        catalogHiddenLeaks++
      }
    }

    // Check server test cases in serverTestCases
    const serverItem = (serverTestCases as Record<string, any>)[p.slug]
    if (!serverItem || !Array.isArray(serverItem.testCases) || serverItem.testCases.length !== 10) {
      serverTestCaseErrors++
      return
    }

    const seenInputs = new Set<string>()
    serverItem.testCases.forEach((stc: any, idx: number) => {
      if (stc.testIndex !== idx + 1) serverTestCaseErrors++
      if (typeof stc.input !== 'string' || typeof stc.expectedOutput !== 'string') serverTestCaseErrors++
      if (idx < 3 && stc.isHidden) serverTestCaseErrors++
      if (idx >= 3 && !stc.isHidden) serverTestCaseErrors++

      // Check duplicate inputs
      if (seenInputs.has(stc.input)) {
        duplicateInputsInProblem++
      }
      seenInputs.add(stc.input)
    })
  })

  assert(missingMetadata === 0, 'Dataset', 'All 500 problems contain complete metadata & 10 test case definitions')
  assert(catalogHiddenLeaks === 0, 'Dataset', 'Zero hidden test cases leak input or output in client problems.json (0 / 3500 leaked)')
  assert(serverTestCaseErrors === 0, 'Dataset', 'All 500 problems resolve in serverTestCases with 10 well-formed test cases')
  assert(duplicateInputsInProblem === 0, 'Dataset', 'Zero duplicate test case inputs within any problem (0 / 5,000 duplicates)')

  // =========================================================================
  // 2. OPEN VS HIDDEN TEST SEPARATION & RUN VS SUBMIT SEMANTICS
  // =========================================================================
  console.log('\n--- 2. Open vs Hidden Test Separation & Sanitization ---')

  const arithmeticPython = `
import sys
tokens = sys.stdin.read().split()
if len(tokens) >= 3:
    a, b, c = int(tokens[0]), int(tokens[1]), int(tokens[2])
    print((a + b) * c - b)
`

  // RUN execution (isSubmit = false)
  const runResult = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: arithmeticPython,
    isSubmit: false,
  })

  assert(runResult.total === 3 && runResult.judgeTotal === 10, 'RunSemantics', 'Run evaluates the 3 visible cases and reports the 10-case judge suite')
  assert(runResult.passed === 3, 'RunSemantics', 'Correct code passes all 3 visible cases in Run')
  assert(runResult.testCases.length === 3 && runResult.testCases.every((t) => t.visible), 'RunSemantics', 'Run response returns only visible case results')

  // Check hidden cases 4-10 sanitization
  let hiddenDataLeaked = false
  runResult.testCases.forEach((tc) => {
    if (tc.testIndex >= 4) {
      if ('input' in tc && tc.input !== undefined) hiddenDataLeaked = true
      if ('expectedOutput' in tc && tc.expectedOutput !== undefined) hiddenDataLeaked = true
      if ('actualOutput' in tc && tc.actualOutput !== undefined) hiddenDataLeaked = true
    } else {
      if (!tc.input || !tc.expectedOutput) hiddenDataLeaked = true
    }
  })
  assert(!hiddenDataLeaked, 'Sanitization', 'Hidden cases (4-10) contain ZERO input, expectedOutput, or actualOutput in API response')

  // SUBMIT execution (isSubmit = true)
  const submitResult = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: arithmeticPython,
    isSubmit: true,
  })
  assert(submitResult.total === 10 && submitResult.passed === 10, 'SubmitSemantics', 'Submit evaluates all 10 cases authoritatively')

  // =========================================================================
  // 3. ADVERSARIAL WRONG SOLUTIONS (HARDCODED, CONSTANT, OFF-BY-ONE)
  // =========================================================================
  console.log('\n--- 3. Adversarial Wrong Solutions & Partial Pass Defense ---')

  // A. Hardcoded visible samples only
  // Belt 1 Q1 visible cases:
  // Case 1: 2 -3 1 -> 2
  // Case 2: 5 -4 3 -> 7
  // Case 3: 1 2 3 -> 7
  const hardcodedVisiblePython = `
import sys
raw = sys.stdin.read().strip()
if raw == "2 -3 1":
    print(2)
elif raw == "5 -4 3":
    print(7)
elif raw == "1 2 3":
    print(7)
else:
    print(999999)
`
  const hardcodedRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: hardcodedVisiblePython,
    isSubmit: true,
  })

  assert(hardcodedRes.success === false, 'Adversarial', 'Hardcoded visible solution is REJECTED by judge (success = false)')
  assert(hardcodedRes.passed === 3, 'Adversarial', 'Hardcoded visible solution passes exactly 3 visible cases (3 / 10 passed)')
  assert(hardcodedRes.status === 'WRONG_ANSWER', 'Adversarial', 'Verdict is WRONG_ANSWER')
  assert(
    hardcodedRes.testCases[0].status === 'passed' &&
    hardcodedRes.testCases[1].status === 'passed' &&
    hardcodedRes.testCases[2].status === 'passed' &&
    hardcodedRes.testCases[3].status === 'failed',
    'Adversarial',
    'Cases 1-3 pass while Case 4 fails'
  )

  // B. Off-by-one solution: (a + b) * c - b + 1
  const offByOnePython = `
import sys
tokens = sys.stdin.read().split()
if len(tokens) >= 3:
    a, b, c = int(tokens[0]), int(tokens[1]), int(tokens[2])
    print((a + b) * c - b + 1)
`
  const offByOneRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: offByOnePython,
    isSubmit: true,
  })
  assert(offByOneRes.success === false && offByOneRes.passed === 0, 'Adversarial', 'Off-by-one solution fails all test cases (0/10 passed)')

  // C. Constant return solution: print(0)
  const constantRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: 'print(0)',
    isSubmit: true,
  })
  assert(constantRes.success === false && constantRes.status === 'WRONG_ANSWER', 'Adversarial', 'Constant 0 return is rejected with WRONG_ANSWER')

  // D. Blank / Empty source code
  const emptyRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: '    \n  \t  ',
    isSubmit: true,
  })
  assert(emptyRes.success === false && emptyRes.status === 'COMPILATION_ERROR', 'Adversarial', 'Empty source code rejected with COMPILATION_ERROR')

  // =========================================================================
  // 4. FULL LANGUAGE MATRIX (PYTHON, JAVASCRIPT, C++, JAVA)
  // =========================================================================
  console.log('\n--- 4. Multi-Language Real Execution Matrix (Python, Node.js, C++, Java) ---')

  // Python 3
  const pyMatrixRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'python',
    code: arithmeticPython,
  })
  assert(pyMatrixRes.success === true && pyMatrixRes.passed === 10, 'LangMatrix', 'Python 3: 10/10 cases passed')

  // Node.js (JavaScript)
  const nodeJsCode = `
const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (tokens.length >= 3) {
  const a = Number(tokens[0]), b = Number(tokens[1]), c = Number(tokens[2]);
  console.log((a + b) * c - b);
}
`
  const nodeMatrixRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'nodejs',
    code: nodeJsCode,
  })
  assert(nodeMatrixRes.success === true && nodeMatrixRes.passed === 10, 'LangMatrix', 'Node.js (JavaScript): 10/10 cases passed')

  // C++ (g++)
  const cppCode = `
#include <iostream>
using namespace std;
int main() {
  long long a, b, c;
  if (cin >> a >> b >> c) {
    cout << (a + b) * c - b << endl;
  }
  return 0;
}
`
  const cppMatrixRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'cpp',
    code: cppCode,
  })
  assert(cppMatrixRes.success === true && cppMatrixRes.passed === 10, 'LangMatrix', 'C++ (g++): 10/10 cases passed')

  // Java (OpenJDK)
  const javaCode = `
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
  const javaMatrixRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'java',
    code: javaCode,
  })
  assert(javaMatrixRes.success === true && javaMatrixRes.passed === 10, 'LangMatrix', 'Java (OpenJDK): 10/10 cases passed')

  // =========================================================================
  // 5. SANDBOX SECURITY & EXFILTRATION ATTEMPTS
  // =========================================================================
  console.log('\n--- 5. Sandbox Security Boundary & Isolation ---')

  const escapePayloads = [
    { name: 'process.env secret access', code: `console.log(process.env.SUPABASE_SERVICE_ROLE_KEY)` },
    { name: 'child_process require', code: `require('child_process').execSync('dir')` },
    { name: 'prototype Function constructor', code: `console.log.constructor('return process')().env` },
    { name: '__proto__ traversal', code: `const p = ({}).__proto__.constructor('return process')()` },
  ]

  for (const payload of escapePayloads) {
    const secRes = await executeQuestion({
      questionSlug: 'belt-1-q1-arithmetic-check-v1',
      language: 'nodejs',
      code: payload.code,
    })
    const blocked =
      secRes.success === false &&
      (secRes.status === 'RUNTIME_ERROR' || secRes.status === 'COMPILATION_ERROR' || (secRes.error && secRes.error.includes('Security')))
    assert(blocked, 'Security', `Sandbox blocked: ${payload.name}`)
  }

  // Infinite loop containment
  const infiniteLoopCode = `while(true) {}`
  const tleRes = await executeQuestion({
    questionSlug: 'belt-1-q1-arithmetic-check-v1',
    language: 'nodejs',
    code: infiniteLoopCode,
  })
  assert(
    tleRes.success === false && tleRes.status === 'TIME_LIMIT_EXCEEDED',
    'ResourceLimits',
    'Infinite loop killed within CPU timeout window (TIME_LIMIT_EXCEEDED)'
  )

  // =========================================================================
  // 6. API AUTHENTICATION, IDOR, VALIDATION & FORGERY PREVENTION
  // =========================================================================
  console.log('\n--- 6. API Security, IDOR, and Submission Integrity ---')

  resetExecuteRateLimitsForTesting()
  resetSubmitStateForTesting()

  const STUDENT_ID = '00000000-0000-4000-a000-000000000001'
  const OTHER_ID = '00000000-0000-4000-a000-000000000002'
  const VALID_AUTH = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'

  // A. Unauthenticated /api/execute
  const unauthExec = mockHttp({
    method: 'POST',
    body: { questionSlug: 'belt-1-q1-arithmetic-check-v1', language: 'python', code: arithmeticPython },
  })
  await executeHandler(unauthExec.req, unauthExec.res)
  assert(unauthExec.status() === 401, 'ApiAuth', 'Unauthenticated request to /api/execute returns HTTP 401 Unauthorized')

  // B. Unauthenticated /api/submit
  const unauthSub = mockHttp({
    method: 'POST',
    body: { questionSlug: 'belt-1-q1-arithmetic-check-v1', language: 'python', code: arithmeticPython },
  })
  await submitHandler(unauthSub.req, unauthSub.res)
  assert(unauthSub.status() === 401, 'ApiAuth', 'Unauthenticated request to /api/submit returns HTTP 401 Unauthorized')

  // C. IDOR Attack: Authenticated as Student 1 but sends userId = Student 2
  const idorSub = mockHttp({
    method: 'POST',
    headers: { authorization: VALID_AUTH },
    body: {
      questionSlug: 'belt-1-q1-arithmetic-check-v1',
      language: 'python',
      code: arithmeticPython,
      userId: OTHER_ID, // Mismatched userId attempt
    },
  })
  await submitHandler(idorSub.req, idorSub.res)
  assert(idorSub.status() === 403, 'IDOR', 'Submitting code on behalf of a different userId is REJECTED with HTTP 403 Forbidden')

  // D. Client-forged evaluation flags tampering
  // Client attempts to send: passed = 10, total = 10, isSolved = true, xp = 9999, with INCORRECT code
  const forgeSub = mockHttp({
    method: 'POST',
    headers: { authorization: VALID_AUTH },
    body: {
      questionSlug: 'belt-1-q1-arithmetic-check-v1',
      language: 'python',
      code: 'print(999999999)', // Incorrect code
      passed: 10,
      total: 10,
      allPassed: true,
      isSolved: true,
      xp: 9999,
      userId: STUDENT_ID,
    },
  })
  await submitHandler(forgeSub.req, forgeSub.res)
  const forgeData = forgeSub.json()
  assert(forgeSub.status() === 200, 'TamperDefense', 'Submission processed by server evaluator')
  assert(forgeData.success === false && forgeData.isSolved === false, 'TamperDefense', 'Client-forged passed/isSolved flags are completely IGNORED')
  assert(forgeData.passed === 0, 'TamperDefense', 'Server authoritative evaluation passes 0 cases')
  assert(forgeData.xpAwarded === 0, 'TamperDefense', 'Zero XP awarded for failed submission (client xp=9999 ignored)')

  // E. Idempotent submission: Double-click with identical idempotency key
  const IDEM_KEY = 'idem_test_key_' + Date.now()
  const req1 = mockHttp({
    method: 'POST',
    headers: { authorization: VALID_AUTH, 'x-idempotency-key': IDEM_KEY },
    body: {
      questionSlug: 'belt-1-q1-arithmetic-check-v1',
      language: 'python',
      code: arithmeticPython,
      userId: STUDENT_ID,
      idempotencyKey: IDEM_KEY,
    },
  })
  const req2 = mockHttp({
    method: 'POST',
    headers: { authorization: VALID_AUTH, 'x-idempotency-key': IDEM_KEY },
    body: {
      questionSlug: 'belt-1-q1-arithmetic-check-v1',
      language: 'python',
      code: arithmeticPython,
      userId: STUDENT_ID,
      idempotencyKey: IDEM_KEY,
    },
  })

  // Submit simultaneously
  const [subRes1, subRes2] = await Promise.all([
    (async () => {
      await submitHandler(req1.req, req1.res)
      return req1.json()
    })(),
    (async () => {
      await submitHandler(req2.req, req2.res)
      return req2.json()
    })(),
  ])

  assert(subRes1.success === true && subRes2.success === true, 'Idempotency', 'Both concurrent requests return valid evaluations')
  assert(subRes1.passed === 10 && subRes2.passed === 10, 'Idempotency', 'Both concurrent requests evaluate authoritatively')

  // =========================================================================
  // 7. PRODUCTION BUNDLE LEAKAGE VERIFICATION
  // =========================================================================
  console.log('\n--- 7. Production Client Bundle Inspection (dist/) ---')

  const distDir = path.resolve('dist')
  assert(fs.existsSync(distDir), 'BundleAudit', 'dist/ directory exists and is built')

  function walk(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name)
      return e.isDirectory() ? walk(p) : [p]
    })
  }

  const distFiles = walk(distDir).filter((f) => /\.(js|mjs|html|json|map)$/.test(f))
  const distContent = distFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n')

  let bundleHiddenLeak = false
  for (const [slug, item] of Object.entries(serverTestCases as Record<string, any>)) {
    const cases = item.testCases || []
    cases.forEach((tc: any, idx: number) => {
      if (idx < 3) return // visible cases allowed
      for (const val of [tc.input, tc.expectedOutput]) {
        if (typeof val === 'string' && val.length >= 16) {
          const needle = JSON.stringify(val).slice(1, -1)
          if (distContent.includes(needle)) {
            console.error(`Leak in bundle for ${slug} case #${idx + 1}: ${needle}`)
            bundleHiddenLeak = true
          }
        }
      }
    })
  }

  assert(!bundleHiddenLeak, 'BundleAudit', 'Zero hidden test case inputs or expected outputs present in dist/ browser bundle')
  assert(!distContent.includes('serverTestCases'), 'BundleAudit', 'serverTestCases module is NOT bundled into client dist/')

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n========================================================================')
  const totalTests = reports.length
  const passedTests = reports.filter((r) => r.passed).length
  const failedTests = totalTests - passedTests

  console.log(`🏁 MASTER AUDIT RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`)
  console.log('========================================================================\n')

  if (failedTests > 0) {
    console.error(`🚨 ${failedTests} AUDIT TESTS FAILED!`)
    process.exit(1)
  } else {
    console.log('🎉 ALL AUDIT & REGRESSION TESTS PASSED DETERMINISTICALLY!')
  }
}

runMasterAudit().catch((err) => {
  console.error('Fatal error in master audit runner:', err)
  process.exit(1)
})
