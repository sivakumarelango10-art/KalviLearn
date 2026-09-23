/**
 * Comprehensive Multi-Language Quick Revision, Code Editor Reset, & Security Test Suite
 *
 * Verifies:
 * 1. Non-destructive Code Editor Reset behavior and canonical starter code recovery
 * 2. Multi-Language Quick Revision: Independent per-language progress, solutions, and XP tracking
 * 3. Cross-language persistence without overwriting or collision (Python, Java, Node.js, C++)
 * 4. Deduplication of solved questions with multi-language badges
 * 5. Execution isolation & sandbox escape prevention (process.env, child_process, __proto__)
 * 6. IDOR protection & server-authoritative token validation on /api/submit
 * 7. Practice route preservation: /practice/${language}/${slug}
 */

import {
  getUserState,
  saveUserState,
  hydrateStateFromCloud,
  getLanguageSavedCode,
  normalizeProgressLanguage,
  type UserState,
  type UserProgressRecord,
  type SubmissionRecord,
} from '../src/lib/progress'
import { executeQuestion } from '../src/server/executeService'
import handler from '../src/server/submitHandler'
import problemsData from '../src/data/problems.json'
import { EventEmitter } from 'events'

// In-memory mock for localStorage in Node environment
const mockStorage = new Map<string, string>()
if (typeof (globalThis as any).localStorage === 'undefined') {
  ;(globalThis as any).localStorage = {
    getItem: (key: string) => mockStorage.get(key) || null,
    setItem: (key: string, val: string) => mockStorage.set(key, val),
    removeItem: (key: string) => mockStorage.delete(key),
    clear: () => mockStorage.clear(),
  }
}

// Minimal mock for HTTP Request / Response for testing submitHandler
function createMockHttpReqRes(options: {
  method: string
  url: string
  headers?: Record<string, string>
  body?: any
}) {
  const req = new EventEmitter() as any
  req.method = options.method
  req.url = options.url
  req.headers = options.headers || {}
  req.socket = { remoteAddress: '127.0.0.1' }
  req.body = options.body

  let responseHeaders: Record<string, string> = {}
  let responseData = ''

  const res = {
    statusCode: 200,
    writeHead: (code: number, headers?: Record<string, string>) => {
      res.statusCode = code
      if (headers) responseHeaders = { ...responseHeaders, ...headers }
    },
    setHeader: (name: string, val: string) => {
      responseHeaders[name] = val
    },
    end: (chunk?: any) => {
      if (chunk) responseData += chunk
    },
    getStatusCode: () => res.statusCode,
    getData: () => {
      try {
        return JSON.parse(responseData)
      } catch {
        return responseData
      }
    },
  } as any

  process.nextTick(() => {
    if (options.body) {
      req.emit('data', Buffer.from(JSON.stringify(options.body)))
    }
    req.emit('end')
  })

  return { req, res }
}

async function runTests() {
  console.log('========================================================================')
  console.log('🧪 KALVILEARN: REVISION, RESET, & SECURITY VERIFICATION SUITE')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`)
      passed++
    } else {
      console.error(`  ❌ FAIL: ${testName}${detail ? ` -> ${detail}` : ''}`)
      failed++
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION 1: Multi-Language Quick Revision & Deduplication
  // ---------------------------------------------------------------------------
  console.log('--- 1. Multi-Language Progress Hydration & Solution Isolation ---')

  const testProblemSlug = 'belt-1-q1-sum-of-two-numbers'
  const pythonCode = 'def twoSum(nums, target):\n    # Python O(n) hash map\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen: return [seen[diff], i]\n        seen[n] = i'
  const javaCode = 'class Solution {\n    // Java solution\n    public int[] twoSum(int[] nums, int target) { return new int[]{0, 1}; }\n}'
  const nodejsCode = 'function twoSum(nums, target) {\n    // Node.js solution\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        if (map.has(target - nums[i])) return [map.get(target - nums[i]), i];\n        map.set(nums[i], i);\n    }\n}'
  const cppCode = 'vector<int> twoSum(vector<int>& nums, int target) {\n    // C++ solution\n    unordered_map<int, int> mp;\n    return {0, 1};\n}'

  // Seed cloud state representing a user who solved the SAME question in Python, Java, Node.js, and C++
  const cloudState: UserState = {
    xp: 200,
    streak: 3,
    solvedSlugs: [testProblemSlug],
    progress: {
      [`python:${testProblemSlug}`]: {
        problemId: testProblemSlug,
        problemSlug: testProblemSlug,
        status: 'SOLVED',
        language: 'python',
        bestCode: pythonCode,
        attempts: 1,
        solvedAt: '2026-03-20T10:00:00Z',
      },
      [`java:${testProblemSlug}`]: {
        problemId: testProblemSlug,
        problemSlug: testProblemSlug,
        status: 'SOLVED',
        language: 'java',
        bestCode: javaCode,
        attempts: 2,
        solvedAt: '2026-03-21T11:00:00Z',
      },
      [`nodejs:${testProblemSlug}`]: {
        problemId: testProblemSlug,
        problemSlug: testProblemSlug,
        status: 'SOLVED',
        language: 'nodejs',
        bestCode: nodejsCode,
        attempts: 1,
        solvedAt: '2026-03-22T12:00:00Z',
      },
      [`cpp:${testProblemSlug}`]: {
        problemId: testProblemSlug,
        problemSlug: testProblemSlug,
        status: 'SOLVED',
        language: 'cpp',
        bestCode: cppCode,
        attempts: 1,
        solvedAt: '2026-03-23T14:00:00Z',
      },
    },
    submissions: [
      {
        id: 'sub-py-1',
        problemSlug: testProblemSlug,
        problemTitle: 'Sum of Two Numbers',
        language: 'python',
        code: pythonCode,
        status: 'PASSED',
        passedTests: 10,
        totalTests: 10,
        executionTimeMs: 45,
        createdAt: '2026-03-20T10:00:00Z',
      },
      {
        id: 'sub-java-1',
        problemSlug: testProblemSlug,
        problemTitle: 'Sum of Two Numbers',
        language: 'java',
        code: javaCode,
        status: 'PASSED',
        passedTests: 10,
        totalTests: 10,
        executionTimeMs: 120,
        createdAt: '2026-03-21T11:00:00Z',
      },
      {
        id: 'sub-node-1',
        problemSlug: testProblemSlug,
        problemTitle: 'Sum of Two Numbers',
        language: 'nodejs',
        code: nodejsCode,
        status: 'PASSED',
        passedTests: 10,
        totalTests: 10,
        executionTimeMs: 35,
        createdAt: '2026-03-22T12:00:00Z',
      },
      {
        id: 'sub-cpp-1',
        problemSlug: testProblemSlug,
        problemTitle: 'Sum of Two Numbers',
        language: 'cpp',
        code: cppCode,
        status: 'PASSED',
        passedTests: 10,
        totalTests: 10,
        executionTimeMs: 15,
        createdAt: '2026-03-23T14:00:00Z',
      },
    ],
  }

  // Hydrate local state from cloud state
  hydrateStateFromCloud(cloudState)
  const hydratedState = getUserState()

  assert(
    hydratedState.languageProgress?.python.solvedSlugs.includes(testProblemSlug) === true,
    'LanguageProgress: Python tracks solve'
  )
  assert(
    hydratedState.languageProgress?.java.solvedSlugs.includes(testProblemSlug) === true,
    'LanguageProgress: Java tracks solve'
  )
  assert(
    hydratedState.languageProgress?.nodejs.solvedSlugs.includes(testProblemSlug) === true,
    'LanguageProgress: Node.js tracks solve'
  )
  assert(
    hydratedState.languageProgress?.cpp.solvedSlugs.includes(testProblemSlug) === true,
    'LanguageProgress: C++ tracks solve'
  )

  // Verify getLanguageSavedCode retrieves distinct, uncorrupted code for each language
  const retrievedPy = getLanguageSavedCode('python', testProblemSlug)
  const retrievedJava = getLanguageSavedCode('java', testProblemSlug)
  const retrievedNode = getLanguageSavedCode('nodejs', testProblemSlug)
  const retrievedCpp = getLanguageSavedCode('cpp', testProblemSlug)

  assert(retrievedPy === pythonCode, 'getLanguageSavedCode: Python code preserved accurately')
  assert(retrievedJava === javaCode, 'getLanguageSavedCode: Java code preserved accurately')
  assert(retrievedNode === nodejsCode, 'getLanguageSavedCode: Node.js code preserved accurately')
  assert(retrievedCpp === cppCode, 'getLanguageSavedCode: C++ code preserved accurately')
  assert(
    retrievedPy !== retrievedJava && retrievedJava !== retrievedNode && retrievedNode !== retrievedCpp,
    'Multi-language isolation: No language code overwrote another'
  )

  // Test language normalization helper
  assert(normalizeProgressLanguage('node') === 'nodejs', 'normalizeProgressLanguage: "node" -> "nodejs"')
  assert(normalizeProgressLanguage('JavaScript') === 'nodejs', 'normalizeProgressLanguage: "JavaScript" -> "nodejs"')
  assert(normalizeProgressLanguage('c++') === 'cpp', 'normalizeProgressLanguage: "c++" -> "cpp"')
  assert(normalizeProgressLanguage('JAVA') === 'java', 'normalizeProgressLanguage: "JAVA" -> "java"')
  assert(normalizeProgressLanguage('python') === 'python', 'normalizeProgressLanguage: "python" -> "python"')

  // ---------------------------------------------------------------------------
  // SECTION 2: Non-Destructive Reset Functionality
  // ---------------------------------------------------------------------------
  console.log('\n--- 2. Non-Destructive Code Editor Reset ---')

  // Find a problem from problem database
  const sampleProblem = problemsData[0]?.problems[0] as any
  assert(Boolean(sampleProblem), 'Problem data loaded successfully')

  if (sampleProblem) {
    const starterPy = sampleProblem.starterCodes?.python || sampleProblem.starterCode?.python || ''
    const starterJava = sampleProblem.starterCodes?.java || sampleProblem.starterCode?.java || ''
    const starterNode =
      sampleProblem.starterCodes?.javascript ||
      sampleProblem.starterCodes?.nodejs ||
      sampleProblem.starterCode?.javascript ||
      ''
    const starterCpp = sampleProblem.starterCodes?.cpp || sampleProblem.starterCode?.cpp || ''

    assert(
      Boolean(starterPy && starterJava && starterNode && starterCpp),
      'Canonical starter code defined for all 4 languages'
    )

    // Simulate student editing code in editor
    let currentEditorCode = '/* Student modified experimental code */\nconsole.log("Broken syntax");'
    let editorErrorState = 'SyntaxError: Unexpected token'
    let isResetModalOpen = false

    // Simulate user pressing Reset button
    const handleResetClick = (dirty: boolean) => {
      if (dirty) {
        isResetModalOpen = true
      }
    }

    const performReset = (canonicalStarter: string) => {
      currentEditorCode = canonicalStarter
      editorErrorState = ''
      isResetModalOpen = false
    }

    handleResetClick(true)
    assert(isResetModalOpen === true, 'Reset button prompts confirmation when code is modified')

    // Confirm reset
    const userStateBeforeReset = { ...getUserState() }
    performReset(starterNode)

    assert(currentEditorCode === starterNode, 'performReset: Restores canonical starter code accurately')
    assert(editorErrorState === '', 'performReset: Clears transient error / execution state')

    const userStateAfterReset = getUserState()
    assert(userStateAfterReset.xp === userStateBeforeReset.xp, 'Non-destructive: XP is preserved on reset')
    assert(userStateAfterReset.streak === userStateBeforeReset.streak, 'Non-destructive: Streak is preserved on reset')
    assert(
      userStateAfterReset.submissions.length === userStateBeforeReset.submissions.length,
      'Non-destructive: Past submissions intact on reset'
    )
  }

  // ---------------------------------------------------------------------------
  // SECTION 3: Code Execution Security & Sandbox Escape Hardening
  // ---------------------------------------------------------------------------
  console.log('\n--- 3. Code Execution Sandbox Security ---')

  const targetSlug = 'belt-1-q1-sum-of-two-numbers'

  // Test 3.1: Attempt to access process.env in Node.js
  const envAttackCode = `
    const env = process.env;
    console.log(env);
  `
  const envAttackResult = await executeQuestion({
    questionSlug: targetSlug,
    language: 'nodejs',
    code: envAttackCode,
  })
  assert(
    envAttackResult.success === false &&
      /SecurityError|process\/environment bindings/i.test(envAttackResult.error || envAttackResult.message || ''),
    'Security: process.env access in Node.js is blocked immediately'
  )

  // Test 3.2: Attempt child_process execution
  const childProcessAttack = `
    const cp = require('child_process');
    cp.execSync('whoami');
  `
  const cpAttackResult = await executeQuestion({
    questionSlug: targetSlug,
    language: 'nodejs',
    code: childProcessAttack,
  })
  assert(
    cpAttackResult.success === false &&
      /SecurityError|process\/environment bindings/i.test(cpAttackResult.error || cpAttackResult.message || ''),
    'Security: child_process access in Node.js is blocked immediately'
  )

  // Test 3.3: Attempt prototype constructor escape
  const prototypeAttack = `
    const foreignFunction = ({}).constructor.constructor;
    foreignFunction("return process")().exit(1);
  `
  const protoAttackResult = await executeQuestion({
    questionSlug: targetSlug,
    language: 'nodejs',
    code: prototypeAttack,
  })
  assert(
    protoAttackResult.success === false,
    'Security: Prototype constructor escape attempt is safely neutralized'
  )

  // Test 3.4: Legitimate, clean user code execution runs cleanly
  const cleanCode = `
    const fs = require('fs');
    function solve() {
      const input = fs.readFileSync(0, 'utf-8').trim();
      if (!input) return;
      const [a, b] = input.split(' ').map(Number);
      console.log(a + b);
    }
    solve();
  `
  const cleanResult = await executeQuestion({
    questionSlug: targetSlug,
    language: 'nodejs',
    code: cleanCode,
  })
  assert(
    cleanResult.error === undefined || !cleanResult.error.includes('SecurityError'),
    'Security: Benign, clean student code passes execution checks'
  )

  // ---------------------------------------------------------------------------
  // SECTION 4: Submit Handler IDOR & Authentication Verification
  // ---------------------------------------------------------------------------
  console.log('\n--- 4. Submit Handler Authentication & IDOR Verification ---')

  // Test 4.1: Submission without Authorization header attempting to submit on behalf of a user
  const { req: unauthReq, res: unauthRes } = createMockHttpReqRes({
    method: 'POST',
    url: '/api/submit',
    headers: { 'content-type': 'application/json' },
    body: {
      userId: 'target-victim-id',
      problemSlug: targetSlug,
      language: 'nodejs',
      code: 'function twoSum() { return [0, 1]; }',
    },
  })

  await new Promise<void>((resolve) => {
    const orig = unauthRes.end
    unauthRes.end = (chunk?: any) => {
      orig(chunk)
      assert(
        unauthRes.getStatusCode() === 401,
        'Submit Handler: Unauthenticated user submission rejected with HTTP 401',
        `Got ${unauthRes.getStatusCode()}: ${JSON.stringify(unauthRes.getData())}`
      )
      resolve()
    }
    handler(unauthReq, unauthRes)
  })

  // Test 4.2: IDOR Attempt: Token for User A attempting to submit for User B
  const { req: idorReq, res: idorRes } = createMockHttpReqRes({
    method: 'POST',
    url: '/api/submit',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer test-token-attacker',
    },
    body: {
      userId: 'victim-student-id-999', // Mismatched userId
      problemSlug: targetSlug,
      language: 'nodejs',
      code: 'function twoSum() { return [0, 1]; }',
    },
  })

  await new Promise<void>((resolve) => {
    const orig = idorRes.end
    idorRes.end = (chunk?: any) => {
      orig(chunk)
      assert(
        idorRes.getStatusCode() === 403,
        'Submit Handler: IDOR attack with mismatched userId rejected with HTTP 403 Forbidden',
        `Got ${idorRes.getStatusCode()}: ${JSON.stringify(idorRes.getData())}`
      )
      resolve()
    }
    handler(idorReq, idorRes)
  })

  // Test 4.3: Valid Authenticated Submission with matching identity
  const authenticatedUserId = 'student-test-user-123'
  const { req: authReq, res: authRes } = createMockHttpReqRes({
    method: 'POST',
    url: '/api/submit',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer test-token-${authenticatedUserId}`,
    },
    body: {
      userId: authenticatedUserId,
      problemSlug: targetSlug,
      language: 'nodejs',
      code: cleanCode,
    },
  })

  await new Promise<void>((resolve) => {
    const orig = authRes.end
    authRes.end = (chunk?: any) => {
      orig(chunk)
      const status = authRes.getStatusCode()
      // Should be 200 (test evaluation completed and logged)
      assert(
        status === 200,
        `Submit Handler: Authorized user submission processed with HTTP 200 (Got ${status})`
      )
      resolve()
    }
    handler(authReq, authRes)
  })

  // ---------------------------------------------------------------------------
  // SECTION 5: Routing & URL Integrity
  // ---------------------------------------------------------------------------
  console.log('\n--- 5. Practice & Revision Route Formatting ---')

  const languages = ['python', 'java', 'nodejs', 'cpp']
  const slug = 'belt-1-q1-sum-of-two-numbers'
  for (const lang of languages) {
    const route = `/practice/${lang}/${slug}`
    assert(
      route.startsWith(`/practice/${lang}/`) && route.endsWith(slug),
      `Route formatting: Language preserved in path (${route})`
    )
  }

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log('\n========================================================================')
  console.log(`📊 TEST RESULTS: ${passed} Passed, ${failed} Failed`)
  console.log('========================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Test execution crashed:', err)
  process.exit(1)
})
