/**
 * KalviLearn Super Admin Questions Management — Automated Verification Suite
 *
 * Verifies:
 * 1. Sole Super Admin authorization (401/403 for unauthenticated or non-admin roles).
 * 2. Questions dashboard listing with aggregate metrics (total, published, draft, difficulty counts).
 * 3. Search and filtering by difficulty, topic, and publication status.
 * 4. Question creation with multiple examples and public/hidden test cases.
 * 5. Input validation (missing title, invalid slug, empty description, missing test cases).
 * 6. Conflict rejection for duplicate slugs (409 Conflict).
 * 7. Question Preview security: hidden test cases are strictly excluded from preview responses.
 * 8. Question updating: edits to descriptions, constraints, examples, and test cases persist.
 * 9. Question duplication: creates a draft copy with -copy slug and replicated test cases.
 * 10. Publication status toggling between published and draft.
 * 11. Code execution & Judge compatibility: newly created questions are resolved by testRepository.
 * 12. Question deletion: cascades to test cases and removes from testRepository.
 * 13. Audit logging: question operations generate append-only admin_audit_logs records.
 */

import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { EventEmitter } from 'events'

// Load environment variables synchronously
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx > 0) {
      const k = trimmed.substring(0, idx).trim()
      let v = trimmed.substring(idx + 1).trim()
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.substring(1, v.length - 1)
      }
      process.env[k] = v
    }
  }
}
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

function createMockReqRes(options: {
  method?: string
  url?: string
  headers?: Record<string, string>
  body?: Record<string, unknown> | string
  query?: Record<string, unknown>
}) {
  const req = new EventEmitter() as any
  req.method = options.method || 'POST'
  req.url = options.url || '/api/super-admin/questions'
  req.headers = { 'content-type': 'application/json' }
  if (options.headers) {
    for (const [k, v] of Object.entries(options.headers)) {
      req.headers[k.toLowerCase()] = v
    }
  }
  req.body = options.body || {}
  req.query = options.query || {}
  req.socket = { remoteAddress: '127.0.0.1' }

  let statusCode = 200
  const headers: Record<string, string> = {}
  let responseBody = ''

  const res = {
    statusCode: 200,
    headers,
    setHeader(name: string, val: string) {
      headers[name.toLowerCase()] = val
    },
    getHeader(name: string) {
      return headers[name.toLowerCase()]
    },
    status(code: number) {
      statusCode = code
      this.statusCode = code
      return this
    },
    json(data: unknown) {
      responseBody = JSON.stringify(data)
    },
    write(chunk: unknown) {
      responseBody += String(chunk)
    },
    end(chunk?: unknown) {
      if (chunk) responseBody += String(chunk)
    },
    flushHeaders() {},
    getOutput() {
      try {
        return { statusCode, data: JSON.parse(responseBody) }
      } catch {
        return { statusCode, data: responseBody }
      }
    },
  } as any

  return { req, res }
}

const SUPER_ADMIN_TOKEN = 'Bearer test_auth_superadmin_sgjitbros@gmail.com'
const CAMPUS_MANAGER_TOKEN = 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test'
const STUDENT_TOKEN = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'

let passedCount = 0
let failedCount = 0

async function runTest(title: string, fn: () => Promise<void>) {
  try {
    await fn()
    console.log(`  ✓ ${title}`)
    passedCount++
  } catch (err: any) {
    console.error(`  ✗ ${title}`)
    console.error(`    Error: ${err.message}`)
    failedCount++
  }
}

async function main() {
  console.log('======================================================================')
  console.log('KALVILEARN SUPER ADMIN — QUESTIONS MANAGEMENT VERIFICATION SUITE')
  console.log('======================================================================\n')

  const { default: superAdminHandler, resetSuperAdminRateLimitsForTesting } = await import(
    '../src/server/superAdminHandler'
  )
  const { supabaseServer } = await import('../src/server/feedbackAuth')
  const { installMockSupabaseServer } = await import('./mockDatabase')
  const { resolveQuestion, getServerTests } = await import('../src/server/judge/testRepository')

  const db = installMockSupabaseServer(supabaseServer)

  // ─── 1. ACCESS CONTROL & RBAC ───────────────────────────────────────────────
  console.log('--- 1. Access Control & Authorization ---')

  await runTest('1.1 Unauthenticated request returns 401 Unauthorized', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: {},
      body: { action: 'list_questions' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 401)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('1.2 Campus Manager attempting question management returns 403 Forbidden', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: CAMPUS_MANAGER_TOKEN },
      body: { action: 'list_questions' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('1.3 Student attempting question creation returns 403 Forbidden', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: STUDENT_TOKEN },
      body: { action: 'create_question', title: 'Hacked Question' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('1.4 Super Admin (sgjitbros@gmail.com) is authorized (200)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.ok(Array.isArray(out.data.data.questions))
    assert.ok(out.data.data.stats)
  })

  // ─── 2. LISTING, SEARCH & FILTERING ────────────────────────────────────────
  console.log('\n--- 2. Dashboard Listing, Search & Filtering ---')

  await runTest('2.1 Initial seed questions are present with calculated statistics', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const stats = out.data.data.stats
    assert.ok(stats.total >= 4, `Expected at least 4 total questions, got ${stats.total}`)
    assert.ok(stats.published >= 1)
    assert.strictEqual(stats.easy + stats.medium + stats.hard, stats.total)
  })

  await runTest('2.2 Filter questions by difficulty (Easy)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', difficulty: 'Easy' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const questions = out.data.data.questions
    assert.ok(questions.length > 0)
    for (const q of questions) {
      assert.strictEqual(q.difficulty, 'Easy')
    }
  })

  await runTest('2.3 Filter questions by publication status (PUBLISHED vs DRAFT)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req: reqPub, res: resPub } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', status: 'PUBLISHED' },
    })
    await superAdminHandler(reqPub, resPub)
    const pubOut = resPub.getOutput()
    for (const q of pubOut.data.data.questions) {
      assert.strictEqual(q.isActive, true)
    }

    const { req: reqDraft, res: resDraft } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', status: 'DRAFT' },
    })
    await superAdminHandler(reqDraft, resDraft)
    const draftOut = resDraft.getOutput()
    for (const q of draftOut.data.data.questions) {
      assert.strictEqual(q.isActive, false)
    }
  })

  await runTest('2.4 Search questions by title query', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', search: 'Two Sum' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.ok(out.data.data.questions.length >= 1)
    assert.strictEqual(out.data.data.questions[0].title, 'Two Sum')
  })

  await runTest('2.5 Question list pagination limits rows and returns stable metadata', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req: firstReq, res: firstRes } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', page: 1, limit: 2 },
    })
    await superAdminHandler(firstReq, firstRes)
    const first = firstRes.getOutput()
    assert.strictEqual(first.statusCode, 200)
    assert.strictEqual(first.data.data.page, 1)
    assert.strictEqual(first.data.data.limit, 2)
    assert.ok(first.data.data.total >= 4)
    assert.strictEqual(first.data.data.questions.length, 2)
    assert.strictEqual(first.data.data.totalPages, Math.ceil(first.data.data.total / 2))
    assert.ok(first.data.data.questions.every((q: any) =>
      q.testCaseCount && typeof q.testCaseCount.total === 'number' &&
      typeof q.testCaseCount.visible === 'number' &&
      typeof q.testCaseCount.hidden === 'number'
    ))
    assert.ok(first.data.data.questions.every((q: any) => !('testCases' in q)))

    const { req: secondReq, res: secondRes } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', page: 2, limit: 2 },
    })
    await superAdminHandler(secondReq, secondRes)
    const second = secondRes.getOutput()
    assert.strictEqual(second.statusCode, 200)
    assert.strictEqual(second.data.data.page, 2)
    assert.strictEqual(second.data.data.questions.length, 2)
    const firstIds = new Set(first.data.data.questions.map((q: any) => q.id))
    assert.ok(second.data.data.questions.every((q: any) => !firstIds.has(q.id)))
  })

  // ─── 3. QUESTION CREATION & VALIDATION ───────────────────────────────────────
  console.log('\n--- 3. Question Creation & Validation ---')

  let createdQuestionId = ''
  const testSlug = 'longest-consecutive-sequence-test'

  await runTest('3.1 Reject question creation with missing required fields (400)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        // Missing title, slug, and testCases
        description: 'Incomplete question',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 400)
    assert.strictEqual(out.data.success, false)
    const msg = out.data.error || out.data.message
    assert.ok(msg.includes('Title') || msg.includes('title'))
  })

  await runTest('3.2 Reject question creation with invalid slug format (400)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        title: 'Bad Slug Question',
        slug: 'Invalid Slug With Spaces!',
        difficulty: 'Medium',
        subdivision: 'Arrays & Hashing',
        description: 'Test description',
        testCases: [{ input: '1', expectedOutput: '1' }],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 400)
    assert.strictEqual(out.data.success, false)
    const msg = out.data.error || out.data.message
    assert.ok(msg.includes('Slug') || msg.includes('slug'))
  })

  await runTest('3.3 Reject question creation with empty test cases (400)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        title: 'No Tests Question',
        slug: 'no-tests-question',
        difficulty: 'Easy',
        subdivision: 'Variables & Data Types',
        description: 'Test description',
        testCases: [],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 400)
    assert.strictEqual(out.data.success, false)
    const msg = out.data.error || out.data.message
    assert.ok(msg.includes('Test Cases') || msg.includes('test case'))
  })

  await runTest('3.4 Successfully create question with multiple examples and public/hidden test cases (201)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        title: 'Longest Consecutive Sequence Test',
        slug: testSlug,
        difficulty: 'Medium',
        subdivision: 'Arrays & Hashing',
        description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.',
        inputFormat: 'The first line contains n. The second line contains n integers.',
        outputFormat: 'Print the length of the longest consecutive sequence.',
        constraints: '0 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9',
        isActive: true,
        examples: [
          {
            label: 'Example 1',
            input: 'nums = [100,4,200,1,3,2]',
            output: '4',
            explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.',
          },
          {
            label: 'Example 2',
            input: 'nums = [0,3,7,2,5,8,4,6,0,1]',
            output: '9',
            explanation: 'The consecutive elements sequence is 0 through 8.',
          },
        ],
        testCases: [
          {
            input: '6\n100 4 200 1 3 2',
            expectedOutput: '4',
            isHidden: false,
            description: 'Sample public test case 1',
          },
          {
            input: '10\n0 3 7 2 5 8 4 6 0 1',
            expectedOutput: '9',
            isHidden: false,
            description: 'Sample public test case 2',
          },
          {
            input: '0\n',
            expectedOutput: '0',
            isHidden: true,
            description: 'Edge case: empty array',
          },
          {
            input: '5\n1 2 0 1 5',
            expectedOutput: '3',
            isHidden: true,
            description: 'Duplicate numbers within sequence',
          },
        ],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.title, 'Longest Consecutive Sequence Test')
    assert.strictEqual(out.data.data.slug, testSlug)
    assert.strictEqual(out.data.data.examples.length, 2)
    assert.strictEqual(out.data.data.testCaseCount.total, 4)
    assert.strictEqual(out.data.data.testCaseCount.visible, 2)
    assert.strictEqual(out.data.data.testCaseCount.hidden, 2)
    createdQuestionId = out.data.data.id
    assert.ok(createdQuestionId)
  })

  await runTest('3.5 Reject creation with duplicate slug (409 Conflict)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        title: 'Duplicate Slug Test',
        slug: testSlug, // already exists
        difficulty: 'Easy',
        subdivision: 'Arrays & Hashing',
        description: 'Duplicate test',
        testCases: [{ input: '1', expectedOutput: '1' }],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 409)
    assert.strictEqual(out.data.success, false)
    const msg = out.data.error || out.data.message
    assert.ok(msg.includes('already exists') || msg.includes('Conflict'))
  })

  // ─── 4. SECURITY: HIDDEN TEST CASE PROTECTION ──────────────────────────────
  console.log('\n--- 4. Security: Hidden Test Case Protection ---')

  await runTest('4.1 Question preview strictly excludes hidden test cases', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question_preview', id: createdQuestionId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    const preview = out.data.data
    assert.strictEqual(preview.testCaseCount.hidden, 2)
    assert.strictEqual(preview.testCases.length, 2)
    for (const tc of preview.testCases) {
      assert.strictEqual(tc.isHidden, false, 'Hidden test case was leaked in preview!')
      assert.ok(!tc.input.includes('1 2 0 1 5'), 'Hidden input leaked in preview!')
    }
  })

  await runTest('4.2 Super Admin full detail retrieves all test cases for editing', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question', id: createdQuestionId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    const q = out.data.data
    assert.strictEqual(q.testCases.length, 4)
    const hidden = q.testCases.filter((tc: any) => tc.isHidden)
    assert.strictEqual(hidden.length, 2)
  })

  // ─── 5. EXECUTION & JUDGE REPOSITORY COMPATIBILITY ─────────────────────────
  console.log('\n--- 5. Code Execution, Cold Starts & Submission Flow ---')

  await runTest('5.1 Created question is registered in testRepository and resolved by slug', async () => {
    const resolved = resolveQuestion(testSlug)
    assert.ok('suite' in resolved, `Failed to resolve newly created custom question "${testSlug}"`)
    assert.strictEqual(resolved.suite.title, 'Longest Consecutive Sequence Test')
    assert.strictEqual(resolved.suite.source, 'custom')
  })

  await runTest('5.2 Judge engine retrieves test suite with all public and hidden cases', async () => {
    const suite = getServerTests(testSlug)
    assert.ok(suite, `Failed to get server test suite for "${testSlug}"`)
    assert.strictEqual(suite.testCases.length, 4)
    assert.strictEqual(suite.testCases[0].input, '6\n100 4 200 1 3 2')
    assert.strictEqual(suite.testCases[0].expectedOutput, '4')
    assert.strictEqual(suite.testCases[2].isHidden, true)
  })

  const { unregisterCustomSuite, resolveQuestionAsync } = await import('../src/server/judge/testRepository')
  const { executeQuestion } = await import('../src/server/executeService')
  const { default: submitHandler } = await import('../src/server/submitHandler')

  await runTest('5.3 Cold start simulation: wipe memory customBank, verify rehydration from persistent database', async () => {
    // 1. Wipe in-memory registration to simulate complete server restart or new serverless instance
    unregisterCustomSuite(testSlug)
    const inMemoryCheck = resolveQuestion(testSlug)
    assert.ok('error' in inMemoryCheck, 'Expected customBank to be cleared')

    // 2. Asynchronous resolver re-queries Problem + TestCase from persistent database
    const persistentResolved = await resolveQuestionAsync(testSlug)
    assert.ok('suite' in persistentResolved, 'Failed to rehydrate question from persistent database')
    assert.strictEqual(persistentResolved.suite.title, 'Longest Consecutive Sequence Test')
    assert.strictEqual(persistentResolved.suite.testCases.length, 4)
    assert.strictEqual(persistentResolved.suite.testCases[0].input, '6\n100 4 200 1 3 2')
    assert.strictEqual(persistentResolved.suite.testCases[3].isHidden, true)
  })

  await runTest('5.4 Code execution via executeQuestion against cold-started custom question', async () => {
    // Wipe memory again to ensure executeQuestion itself invokes persistent resolution
    unregisterCustomSuite(testSlug)

    const jsSolution = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
if (!input) {
  console.log(0);
} else {
  const parts = input.split(/\\s+/).map(Number);
  const n = parts[0];
  if (n === 0 || parts.length <= 1) {
    console.log(0);
  } else {
    const nums = parts.slice(1);
    const set = new Set(nums);
    let maxStreak = 0;
    for (const num of set) {
      if (!set.has(num - 1)) {
        let curr = num;
        let streak = 1;
        while (set.has(curr + 1)) {
          curr++;
          streak++;
        }
        maxStreak = Math.max(maxStreak, streak);
      }
    }
    console.log(maxStreak);
  }
}
`
    const runResult = await executeQuestion({
      questionSlug: testSlug,
      language: 'nodejs',
      code: jsSolution,
      mode: 'run',
    })

    assert.strictEqual(runResult.mode, 'run')
    assert.ok(runResult.total >= 2, `Expected at least 2 visible test cases, got ${runResult.total}`)
    assert.strictEqual(runResult.passed, runResult.total, 'All visible test cases should pass')
    assert.strictEqual(runResult.status, 'ACCEPTED')
    // Ensure hidden test cases were NOT run or exposed in mode: run
    assert.strictEqual(runResult.testCases.some((t) => !t.visible), false)
  })

  await runTest('5.5 Submission processing via submitHandler against persistent custom question', async () => {
    const jsSolution = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
if (!input) {
  console.log(0);
} else {
  const parts = input.split(/\\s+/).map(Number);
  const n = parts[0];
  if (n === 0 || parts.length <= 1) {
    console.log(0);
  } else {
    const nums = parts.slice(1);
    const set = new Set(nums);
    let maxStreak = 0;
    for (const num of set) {
      if (!set.has(num - 1)) {
        let curr = num;
        let streak = 1;
        while (set.has(curr + 1)) {
          curr++;
          streak++;
        }
        maxStreak = Math.max(maxStreak, streak);
      }
    }
    console.log(maxStreak);
  }
}
`
    const { req, res } = createMockReqRes({
      headers: { authorization: STUDENT_TOKEN },
      body: {
        questionSlug: testSlug,
        language: 'nodejs',
        code: jsSolution,
      },
    })

    await submitHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200, `Expected 200 from submitHandler, got ${out.statusCode}`)
    assert.strictEqual(out.data.status, 'ACCEPTED')
    assert.strictEqual(out.data.total, 4, 'Full submit should evaluate all 4 test cases')
    assert.strictEqual(out.data.passed, 4, 'All 4 test cases should pass')
  })

  // ─── 6. QUESTION UPDATING & MODIFICATION ───────────────────────────────────
  console.log('\n--- 6. Question Updating & Status Toggling ---')

  await runTest('6.1 Super Admin can update problem statement, difficulty, and test cases', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_question',
        id: createdQuestionId,
        title: 'Longest Consecutive Sequence (Audited)',
        difficulty: 'Hard',
        description: 'Audited and optimized problem statement.',
        testCases: [
          { input: '1\n100', expectedOutput: '1', isHidden: false, description: 'Single element' },
          { input: '2\n1 2', expectedOutput: '2', isHidden: true, description: 'Two elements' },
          { input: '3\n1 3 5', expectedOutput: '1', isHidden: true, description: 'No consecutive' },
        ],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.title, 'Longest Consecutive Sequence (Audited)')
    assert.strictEqual(out.data.data.difficulty, 'Hard')
    assert.strictEqual(out.data.data.testCaseCount.total, 3)
    assert.strictEqual(out.data.data.testCaseCount.hidden, 2)

    // Verify judge suite immediately synchronizes
    const updatedSuite = getServerTests(testSlug)
    assert.strictEqual(updatedSuite.testCases.length, 3)
    assert.strictEqual(updatedSuite.testCases[0].input, '1\n100')
  })

  await runTest('6.2 Toggle publication status (Published -> Draft -> Published)', async () => {
    resetSuperAdminRateLimitsForTesting()
    // Unpublish
    const { req: reqDraft, res: resDraft } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_question_status', id: createdQuestionId, isActive: false },
    })
    await superAdminHandler(reqDraft, resDraft)
    assert.strictEqual(resDraft.getOutput().statusCode, 200)
    assert.strictEqual(resDraft.getOutput().data.data.isActive, false)

    // Re-publish
    const { req: reqPub, res: resPub } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_question_status', id: createdQuestionId, isActive: true },
    })
    await superAdminHandler(reqPub, resPub)
    assert.strictEqual(resPub.getOutput().statusCode, 200)
    assert.strictEqual(resPub.getOutput().data.data.isActive, true)
  })

  // ─── 7. QUESTION DUPLICATION ────────────────────────────────────────────────
  console.log('\n--- 7. Question Duplication ---')

  let duplicateId = ''
  await runTest('7.1 Duplicate question creates a draft copy with -copy slug and replicated test cases', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'duplicate_question', id: createdQuestionId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    const dup = out.data.data
    assert.strictEqual(dup.isActive, false, 'Duplicated question must default to draft')
    assert.ok(dup.slug.endsWith('-copy'))
    assert.strictEqual(dup.testCases.length, 3)
    duplicateId = dup.id
  })

  // ─── 8. QUESTION DELETION & CLEANUP ─────────────────────────────────────────
  console.log('\n--- 8. Question Deletion & Cascade ---')

  await runTest('8.1 Deleting question removes question record and cascades to test cases', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'delete_question', id: duplicateId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.deletedId, duplicateId)

    // Check duplicate cannot be retrieved
    const { req: reqChk, res: resChk } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question', id: duplicateId },
    })
    await superAdminHandler(reqChk, resChk)
    assert.strictEqual(resChk.getOutput().statusCode, 404)
  })

  // ─── 9. AUDIT LOGGING VERIFICATION ─────────────────────────────────────────
  console.log('\n--- 9. Append-Only Audit Logging ---')

  await runTest('9.1 Administrative operations are recorded in admin_audit_logs', async () => {
    const logs = db.admin_audit_logs
    assert.ok(logs.length > 0)
    const questionLogs = logs.filter((l) => l.target_type === 'QUESTION')
    assert.ok(questionLogs.length >= 4, `Expected at least 4 question audit logs, found ${questionLogs.length}`)

    const actions = questionLogs.map((l) => l.action)
    assert.ok(actions.includes('CREATE_QUESTION'), 'Missing CREATE_QUESTION in audit logs')
    assert.ok(actions.includes('UPDATE_QUESTION'), 'Missing UPDATE_QUESTION in audit logs')
    assert.ok(actions.includes('TOGGLE_QUESTION_STATUS'), 'Missing TOGGLE_QUESTION_STATUS in audit logs')
    assert.ok(actions.includes('DUPLICATE_QUESTION'), 'Missing DUPLICATE_QUESTION in audit logs')
    assert.ok(actions.includes('DELETE_QUESTION'), 'Missing DELETE_QUESTION in audit logs')

    for (const qLog of questionLogs) {
      const email = qLog.admin_email || qLog.actor_email
      assert.strictEqual(email, 'sgjitbros@gmail.com')
      assert.ok(qLog.created_at)
    }
  })

  // ─── 10. SUPER ADMIN FULL QUESTION ACCESS & TEST RUNNER ─────────────────────
  console.log('\n--- 10. Super Admin Full Access & Test Runner Verification ---')

  await runTest('10.1 Super Admin full detail retrieves all test cases with full inputs and outputs', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question', id: createdQuestionId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    const qData = out.data.data
    assert.ok(Array.isArray(qData.testCases))
    assert.strictEqual(qData.testCases.length, 3)

    // Verify all test cases contain complete input and expectedOutput
    for (const tc of qData.testCases) {
      assert.ok(typeof tc.input === 'string' && tc.input.length > 0)
      assert.ok(typeof tc.expectedOutput === 'string' && tc.expectedOutput.length > 0)
      assert.ok('isHidden' in tc)
    }
    const hiddenCount = qData.testCases.filter((tc: any) => tc.isHidden).length
    assert.strictEqual(hiddenCount, 2, 'Expected 2 hidden test cases visible to Super Admin')
  })

  await runTest('10.2 Super Admin can reorder test cases and updated ordering persists to database', async () => {
    resetSuperAdminRateLimitsForTesting()
    // Retrieve current question to get test cases
    const { req: reqGet, res: resGet } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question', id: createdQuestionId },
    })
    await superAdminHandler(reqGet, resGet)
    const current = resGet.getOutput().data.data

    // Reverse test cases order to simulate reordering
    const reversed = [...current.testCases].reverse().map((tc, idx) => ({
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      isHidden: tc.isHidden,
      description: `Reordered #${idx + 1}: ${tc.description || tc.explanation || ''}`,
    }))

    resetSuperAdminRateLimitsForTesting()
    const { req: reqUpd, res: resUpd } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_question',
        id: createdQuestionId,
        title: current.title,
        slug: current.slug,
        difficulty: current.difficulty,
        subdivision: current.subdivision,
        description: current.description,
        isActive: current.isActive,
        examples: current.examples,
        testCases: reversed,
      },
    })
    await superAdminHandler(reqUpd, resUpd)
    assert.strictEqual(resUpd.getOutput().statusCode, 200)

    // Verify persisted ordering in database
    resetSuperAdminRateLimitsForTesting()
    const { req: reqChk, res: resChk } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question', id: createdQuestionId },
    })
    await superAdminHandler(reqChk, resChk)
    const updated = resChk.getOutput().data.data
    assert.strictEqual(updated.testCases.length, 3)
    assert.strictEqual(updated.testCases[0].input, reversed[0].input)
    assert.strictEqual(updated.testCases[1].input, reversed[1].input)
    assert.strictEqual(updated.testCases[2].input, reversed[2].input)
  })

  await runTest('10.3 Super Admin test runner executes public test cases and returns stdout matching', async () => {
    resetSuperAdminRateLimitsForTesting()
    const pySolution = `
import sys
lines = sys.stdin.read().splitlines()
if lines:
    n = int(lines[0].strip())
    nums = list(map(int, lines[1].split())) if len(lines) > 1 and lines[1].strip() else []
    num_set = set(nums)
    best = 0
    for x in num_set:
        if x - 1 not in num_set:
            y = x + 1
            while y in num_set:
                y += 1
            best = max(best, y - x)
    print(best)
`
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'run_question_tests',
        id: createdQuestionId,
        language: 'python',
        code: pySolution,
        filter: 'public',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    const runData = out.data.data
    assert.strictEqual(runData.totalCount, 1, 'Expected 1 public test case to run')
    assert.strictEqual(runData.passedCount, 1)
    assert.strictEqual(runData.allPassed, true)
    assert.ok(runData.results[0].actualOutput.length > 0)
    assert.strictEqual(runData.results[0].passed, true)
  })

  await runTest('10.4 Super Admin test runner executes hidden test cases with full inspection', async () => {
    resetSuperAdminRateLimitsForTesting()
    const pySolution = `
import sys
lines = sys.stdin.read().splitlines()
if lines:
    n = int(lines[0].strip())
    nums = list(map(int, lines[1].split())) if len(lines) > 1 and lines[1].strip() else []
    num_set = set(nums)
    best = 0
    for x in num_set:
        if x - 1 not in num_set:
            y = x + 1
            while y in num_set:
                y += 1
            best = max(best, y - x)
    print(best)
`
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'run_question_tests',
        id: createdQuestionId,
        language: 'python',
        code: pySolution,
        filter: 'hidden',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    const runData = out.data.data
    assert.strictEqual(runData.totalCount, 2, 'Expected 2 hidden test cases to run')
    assert.strictEqual(runData.passedCount, 2)
    assert.strictEqual(runData.allPassed, true)
    // Verify hidden tests return full stdin input and expected output to Super Admin
    for (const r of runData.results) {
      assert.strictEqual(r.isHidden, true)
      assert.ok(r.input.length > 0)
      assert.ok(r.expectedOutput.length > 0)
      assert.ok(r.actualOutput.length > 0)
      assert.strictEqual(r.passed, true)
    }
  })

  await runTest('10.5 Super Admin test runner executes full test suite and inspects execution errors', async () => {
    resetSuperAdminRateLimitsForTesting()
    // Failing solution that outputs wrong answer
    const failingCode = `print("99 99")`
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'run_question_tests',
        id: createdQuestionId,
        language: 'python',
        code: failingCode,
        filter: 'all',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const runData = out.data.data
    assert.strictEqual(runData.totalCount, 3)
    assert.strictEqual(runData.allPassed, false)
    assert.strictEqual(runData.passedCount, 0)
    assert.strictEqual(runData.status, 'WRONG_ANSWER')
    for (const r of runData.results) {
      assert.strictEqual(r.passed, false)
      assert.strictEqual(r.status, 'failed')
      assert.ok(r.expectedOutput !== r.actualOutput)
    }
  })

  await runTest('10.6 Student attempting to call run_question_tests is rejected with 403 Forbidden', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: STUDENT_TOKEN },
      body: {
        action: 'run_question_tests',
        id: createdQuestionId,
        language: 'python',
        code: 'print("hello")',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403, 'Student must receive 403 Forbidden')
  })

  await runTest('10.7 Cold start rehydration uses latest reordered test cases in judge engine', async () => {
    // 1. Wipe in-memory registration to simulate complete server restart
    unregisterCustomSuite(testSlug)

    // 2. Resolve via resolveQuestionAsync
    const resolved = await resolveQuestionAsync(testSlug)
    assert.ok('suite' in resolved, `Failed to rehydrate "${testSlug}" post restart`)
    const suite = (resolved as any).suite
    assert.strictEqual(suite.testCases.length, 3)

    // 3. Execute solution via executeQuestion
    const pySolution = `
import sys
lines = sys.stdin.read().splitlines()
if lines:
    n = int(lines[0].strip())
    nums = list(map(int, lines[1].split())) if len(lines) > 1 and lines[1].strip() else []
    num_set = set(nums)
    best = 0
    for x in num_set:
        if x - 1 not in num_set:
            y = x + 1
            while y in num_set:
                y += 1
            best = max(best, y - x)
    print(best)
`
    const submitResult = await executeQuestion({
      questionSlug: testSlug,
      language: 'python',
      code: pySolution,
      mode: 'submit',
    })
    assert.strictEqual(submitResult.status, 'ACCEPTED')
    assert.strictEqual(submitResult.passed, 3)
    assert.strictEqual(submitResult.total, 3)
  })

  // ======================================================================
  // 11. Curriculum & Content Management Verification
  // ======================================================================
  console.log('\n--- 11. Curriculum & Courses Management ---')

  let testModuleId = ''
  let testUnitId = ''

  await runTest('11.1 List curriculum modules returns 10 initial modules with 85 learning units', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_curriculum_modules' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    const modules = out.data.data.modules
    assert.ok(modules.length >= 10, `Expected at least 10 modules, got ${modules.length}`)
    const totalUnits = modules.reduce((sum: number, m: any) => sum + (m.learningUnits?.length || 0), 0)
    assert.ok(totalUnits >= 85, `Expected at least 85 learning units, got ${totalUnits}`)
    assert.strictEqual(out.data.data.stats.totalModules >= 10, true)
  })

  await runTest('11.2 Super Admin creates a new curriculum module', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_curriculum_module',
        title: 'System Design & Distributed Architectures',
        description: 'Scalability, microservices, caches, and consistency models.',
        order: 11,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.title, 'System Design & Distributed Architectures')
    testModuleId = out.data.data.id
    assert.ok(testModuleId.length > 0)
  })

  await runTest('11.3 Super Admin updates module and reorders modules', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_curriculum_module',
        id: testModuleId,
        title: 'System Design & Cloud Systems (Updated)',
        description: 'Advanced scalability and cloud patterns.',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.title, 'System Design & Cloud Systems (Updated)')

    // Reorder modules
    resetSuperAdminRateLimitsForTesting()
    const { req: reqReorder, res: resReorder } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'reorder_curriculum_modules',
        moduleOrders: [{ id: testModuleId, order: 11 }],
      },
    })
    await superAdminHandler(reqReorder, resReorder)
    assert.strictEqual(resReorder.getOutput().statusCode, 200)
  })

  await runTest('11.4 Super Admin toggles module publication status', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'toggle_module_status',
        id: testModuleId,
        isActive: false,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.isActive, false)
    assert.strictEqual(out.data.data.status, 'DRAFT')
  })

  // ======================================================================
  // 12. Learning Units Management Verification
  // ======================================================================
  console.log('\n--- 12. Learning Units Management ---')

  await runTest('12.1 Super Admin creates a learning unit in a module', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_learning_unit',
        moduleId: testModuleId,
        title: 'Event-Driven Architectures',
        concept: 'Message queues and pub/sub decoupled systems.',
        approach: 'Define event schema, consumer idempotency, and partition keys.',
        codeSnippets: {
          python: '# Event producer\nimport json\nprint(json.dumps({"event": "order_created"}))',
          javascript: 'console.log(JSON.stringify({ event: "order_created" }));',
        },
        inputFormat: 'Input: Event payload JSON string.',
        outputFormat: 'Output: Processed ACK status.',
        examples: [
          { input: '{"id": 1}', output: 'ACK', explanation: 'Order 1 processed' },
        ],
        readingTimeMinutes: 5,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    testUnitId = out.data.data.id
    assert.strictEqual(out.data.data.title, 'Event-Driven Architectures')
    assert.strictEqual(out.data.data.readingTimeMinutes, 5)
  })

  await runTest('12.2 Super Admin updates learning unit and reorders units', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_learning_unit',
        id: testUnitId,
        title: 'Event-Driven Architectures & Streaming',
        readingTimeMinutes: 7,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.title, 'Event-Driven Architectures & Streaming')
    assert.strictEqual(out.data.data.readingTimeMinutes, 7)

    // Reorder units
    resetSuperAdminRateLimitsForTesting()
    const { req: reqOrder, res: resOrder } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'reorder_learning_units',
        unitOrders: [{ id: testUnitId, order: 1 }],
      },
    })
    await superAdminHandler(reqOrder, resOrder)
    assert.strictEqual(resOrder.getOutput().statusCode, 200)
  })

  await runTest('12.3 Super Admin deletes learning unit', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'delete_learning_unit',
        id: testUnitId,
      },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 200)
  })

  await runTest('12.4 Super Admin deletes created module with cascade cleanup', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'delete_curriculum_module',
        id: testModuleId,
      },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 200)
  })

  // ======================================================================
  // 13. Practice Belts Management Verification
  // ======================================================================
  console.log('\n--- 13. Practice Belts Management ---')

  await runTest('13.1 List practice belts returns all 10 martial arts belts with problem counts', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_belts' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    const belts = out.data.data.belts
    assert.strictEqual(belts.length, 10, 'Expected exactly 10 belts')
    assert.strictEqual(belts[0].name, 'Belt 1')
    assert.strictEqual(belts[0].title, 'Yellow Belt')
    assert.strictEqual(belts[0].color, '#EAB308')
    assert.strictEqual(belts[9].title, 'Black Belt')
    assert.strictEqual(belts[9].color, '#171717')
  })

  await runTest('13.2 Super Admin updates belt metadata (title, description, color)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_belt',
        order: 1,
        title: 'Yellow Belt: Foundations',
        color: '#FACC15',
        description: 'Variables, core operators, and decision branches.',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.title, 'Yellow Belt: Foundations')
    assert.strictEqual(out.data.data.color, '#FACC15')
  })

  // ======================================================================
  // 14. Belt & Topic Scoped Question Filtering
  // ======================================================================
  console.log('\n--- 14. Scoped Question Filtering & Security ---')

  await runTest('14.1 Belt-scoped question filtering returns only questions for that belt', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'list_questions',
        belt: 1,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const qList = out.data.data.questions
    assert.ok(qList.length > 0)
    for (const q of qList) {
      assert.strictEqual(q.beltOrder === 1 || q.beltId?.includes('1'), true, 'Must belong to Belt 1')
    }
  })

  await runTest('14.2 Topic-scoped question filtering returns only questions for that topic', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'list_questions',
        topic: '1D Arrays / Lists',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const qList = out.data.data.questions
    assert.ok(qList.length > 0)
    for (const q of qList) {
      assert.strictEqual(q.subdivision, '1D Arrays / Lists')
    }
  })

  await runTest('14.3 Non-SuperAdmin access to curriculum and belt management is strictly rejected with 403 Forbidden', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req: reqStu, res: resStu } = createMockReqRes({
      headers: { authorization: STUDENT_TOKEN },
      body: { action: 'list_curriculum_modules' },
    })
    await superAdminHandler(reqStu, resStu)
    assert.strictEqual(resStu.getOutput().statusCode, 403, 'Student must receive 403 on curriculum')

    resetSuperAdminRateLimitsForTesting()
    const { req: reqMgr, res: resMgr } = createMockReqRes({
      headers: { authorization: CAMPUS_MANAGER_TOKEN },
      body: { action: 'list_belts' },
    })
    await superAdminHandler(reqMgr, resMgr)
    assert.strictEqual(resMgr.getOutput().statusCode, 403, 'Campus manager must receive 403 on belts')
  })
  // ─── 15. LEARN CODING CURRICULUM QUESTIONS MANAGEMENT ──────────────────────
  console.log('\n--- 15. Learn Coding Curriculum Questions Management ---')

  let testUnitAId = 'mock-unit-1-1'
  let testUnitBId = 'mock-unit-1-2'
  let unitAProb1Id = ''
  let unitAProb2Id = ''
  let unitBProb1Id = ''

  await runTest('15.1 Scoped question listing for learning unit returns zero when none added', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', learningUnitId: testUnitAId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.questions.length, 0)
    assert.strictEqual(out.data.data.stats.total, 0)
    assert.strictEqual(out.data.data.stats.published, 0)
    assert.strictEqual(out.data.data.stats.draft, 0)
  })

  await runTest('15.2 Reject question creation with non-existent learningUnitId (404)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        learningUnitId: 'non-existent-unit-999999',
        title: 'Invalid Lesson Question',
        slug: 'invalid-lesson-question',
        difficulty: 'Easy',
        description: 'Should be rejected because learning unit does not exist.',
        testCases: [{ input: '1', expectedOutput: '1' }],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 404, 'Must return 404 for non-existent learning unit')
    assert.strictEqual(out.data.success, false)
  })

  await runTest('15.3 Create first coding question linked to Unit A', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        learningUnitId: testUnitAId,
        title: 'Unit A Print Hello',
        slug: 'unit-a-print-hello',
        difficulty: 'Easy',
        topic: 'Variables & Data Types',
        description: 'Print Hello World to stdout.',
        inputFormat: 'No input required.',
        outputFormat: 'Print "Hello World".',
        constraints: 'None.',
        status: 'PUBLISHED',
        examples: [{ label: 'Example 1', input: '', output: 'Hello World', explanation: 'Basic print' }],
        testCases: [
          { input: '', expectedOutput: 'Hello World', isHidden: false, description: 'Public sample' },
          { input: '   ', expectedOutput: 'Hello World', isHidden: true, description: 'Hidden evaluation test' },
        ],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.learningUnitId, testUnitAId)
    assert.strictEqual(out.data.data.beltId, null, 'Must NOT assign arbitrary mock-belt-1 to learning unit question')
    unitAProb1Id = out.data.data.id
    assert.ok(unitAProb1Id)
  })

  await runTest('15.4 Create second coding question linked to Unit A as DRAFT', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        learningUnitId: testUnitAId,
        title: 'Unit A Add Numbers',
        slug: 'unit-a-add-numbers',
        difficulty: 'Medium',
        topic: 'Variables & Data Types',
        description: 'Read two numbers and print sum.',
        inputFormat: 'Two space-separated integers a and b.',
        outputFormat: 'Sum of a and b.',
        status: 'DRAFT',
        examples: [{ label: 'Example 1', input: '2 3', output: '5' }],
        testCases: [
          { input: '2 3', expectedOutput: '5', isHidden: false },
          { input: '100 200', expectedOutput: '300', isHidden: true },
        ],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.data.learningUnitId, testUnitAId)
    assert.strictEqual(out.data.data.status, 'DRAFT')
    unitAProb2Id = out.data.data.id
    assert.ok(unitAProb2Id)
  })

  await runTest('15.5 Create question linked to Unit B for isolation testing', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        learningUnitId: testUnitBId,
        title: 'Unit B Factorial',
        slug: 'unit-b-factorial',
        difficulty: 'Hard',
        topic: 'Conditionals & Loops',
        description: 'Calculate n factorial.',
        status: 'PUBLISHED',
        testCases: [
          { input: '5', expectedOutput: '120', isHidden: false },
        ],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    unitBProb1Id = out.data.data.id
    assert.ok(unitBProb1Id)
  })

  await runTest('15.6 Scoped question listing for Unit A returns only Unit A questions with accurate stats', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', learningUnitId: testUnitAId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const questions = out.data.data.questions
    assert.strictEqual(questions.length, 2, 'Unit A must have exactly 2 questions')
    const slugs = questions.map((q: any) => q.slug)
    assert.ok(slugs.includes('unit-a-print-hello'))
    assert.ok(slugs.includes('unit-a-add-numbers'))
    assert.ok(!slugs.includes('unit-b-factorial'), 'Unit B question must NOT appear in Unit A')

    // Verify stats
    assert.strictEqual(out.data.data.stats.total, 2)
    assert.strictEqual(out.data.data.stats.published, 1)
    assert.strictEqual(out.data.data.stats.draft, 1)
  })

  await runTest('15.7 Question isolation: Unit B listing contains only Unit B question', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', learningUnitId: testUnitBId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const questions = out.data.data.questions
    assert.strictEqual(questions.length, 1)
    assert.strictEqual(questions[0].slug, 'unit-b-factorial')
    assert.strictEqual(out.data.data.stats.total, 1)
    assert.strictEqual(out.data.data.stats.published, 1)
    assert.strictEqual(out.data.data.stats.draft, 0)
  })

  await runTest('15.8 Student preview of learning unit question strips hidden test cases', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question_preview', id: unitAProb1Id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const q = out.data.data
    assert.strictEqual(q.title, 'Unit A Print Hello')
    assert.ok(Array.isArray(q.testCases))
    assert.strictEqual(q.testCases.length, 1, 'Hidden test cases must be stripped')
    assert.strictEqual(q.testCases[0].isHidden, false)
  })

  await runTest('15.9 Super Admin full detail retrieves all test cases for editing', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question', id: unitAProb1Id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const q = out.data.data
    assert.strictEqual(q.learningUnitId, testUnitAId)
    assert.strictEqual(q.testCases.length, 2, 'Admin view must include both public and hidden test cases')
    const hasHidden = q.testCases.some((tc: any) => tc.isHidden === true)
    assert.strictEqual(hasHidden, true)
  })

  await runTest('15.10 Super Admin updates learning unit question fields and test cases', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_question',
        id: unitAProb1Id,
        title: 'Unit A Print Hello World (Updated)',
        difficulty: 'Easy',
        constraints: 'O(1) space complexity required.',
        testCases: [
          { input: '', expectedOutput: 'Hello World', isHidden: false, description: 'Updated sample' },
          { input: 'test', expectedOutput: 'Hello World', isHidden: true, description: 'Updated hidden test' },
          { input: 'abc', expectedOutput: 'Hello World', isHidden: true, description: 'Added 2nd hidden test' },
        ],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)

    // Verify persisted
    const { req: vReq, res: vRes } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question', id: unitAProb1Id },
    })
    await superAdminHandler(vReq, vRes)
    const vOut = vRes.getOutput()
    assert.strictEqual(vOut.data.data.title, 'Unit A Print Hello World (Updated)')
    assert.strictEqual(vOut.data.data.testCases.length, 3)
  })

  await runTest('15.11 Super Admin toggles publication status of learning unit question', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_question_status', id: unitAProb2Id, isActive: true },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)

    // Check stats updated
    const { req: sReq, res: sRes } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', learningUnitId: testUnitAId },
    })
    await superAdminHandler(sReq, sRes)
    const sOut = sRes.getOutput()
    assert.strictEqual(sOut.data.data.stats.published, 2, 'Both questions now published')
    assert.strictEqual(sOut.data.data.stats.draft, 0)
  })

  await runTest('15.12 Super Admin duplicates learning unit question, preserving unit association as DRAFT', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'duplicate_question', id: unitAProb1Id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    const dup = out.data.data
    assert.strictEqual(dup.learningUnitId, testUnitAId, 'Duplicated question must stay bound to same unit')
    assert.strictEqual(dup.isActive, false, 'Duplicated question must be DRAFT by default')
    assert.ok(dup.slug.includes('-copy'))

    // Cleanup duplicated question
    const { req: dReq, res: dRes } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'delete_question', id: dup.id },
    })
    await superAdminHandler(dReq, dRes)
  })

  await runTest('15.13 Super Admin executes test runner on learning unit question', async () => {
    resetSuperAdminRateLimitsForTesting()
    const pythonCode = 'print("Hello World")'
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'run_question_tests',
        slug: 'unit-a-print-hello',
        code: pythonCode,
        language: 'python',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.passedCount, out.data.data.totalCount, 'All test cases must pass')
    assert.strictEqual(out.data.data.allPassed, true)
  })

  await runTest('15.14 Super Admin deletes learning unit question with cascade cleanup', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'delete_question', id: unitAProb2Id },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 200)

    // Verify deleted
    const { req: cReq, res: cRes } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question', id: unitAProb2Id },
    })
    await superAdminHandler(cReq, cRes)
    assert.strictEqual(cRes.getOutput().statusCode, 404)
  })

  await runTest('15.15 Practice belt questions remain completely unaffected', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', belt: '1' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const beltQuestions = out.data.data.questions
    assert.ok(beltQuestions.length > 0)
    for (const q of beltQuestions) {
      assert.strictEqual(q.learningUnitId ?? null, null, 'Practice belt questions must not have learningUnitId')
    }
  })

  // ─── 16. NORMALIZED RELATIONAL ARCHITECTURE & REVISION HISTORY ─────────────
  console.log('\n--- 16. Normalized Relational Architecture & Revision History ---')

  let normProblemId = ''
  const normSlug = 'normalized-arch-test-problem'

  await runTest('16.1 Create question populates ProblemExample, ProblemTestCase, ProblemStarterCode, and ProblemRevision v1', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_question',
        title: 'Normalized Architecture Problem',
        slug: normSlug,
        difficulty: 'Medium',
        subdivision: '1D Arrays / Lists',
        description: 'Verify normalized multi-table database architecture.',
        inputFormat: 'Single line of integers',
        outputFormat: 'Sorted array',
        constraints: '1 <= n <= 10^5',
        timeLimitMs: 3000,
        memoryLimitMb: 512,
        status: 'PUBLISHED',
        examples: [
          { label: 'Example 1', input: '3 1 2', output: '1 2 3', explanation: 'Sorted order' },
          { label: 'Example 2', input: '5 4 3 2 1', output: '1 2 3 4 5', explanation: 'Reverse sorted' },
        ],
        testCases: [
          { input: '3 1 2', expectedOutput: '1 2 3', isHidden: false, points: 15, description: 'Public sample' },
          { input: '10 9 8', expectedOutput: '8 9 10', isHidden: true, points: 25, description: 'Hidden evaluation 1' },
          { input: '100', expectedOutput: '100', isHidden: true, points: 60, description: 'Single element edge case' },
        ],
        starterCodes: {
          python: '# Python 3 solution\ndef solve():\n    pass\n',
          javascript: '// Node.js solution\nfunction solve() {}\n',
          cpp: '// C++ solution\nint main() { return 0; }\n',
          java: '// Java solution\npublic class Main { public static void main(String[] args) {} }\n',
        },
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    normProblemId = out.data.data.id
    assert.ok(normProblemId, 'Question ID must be returned')

    // Inspect child tables in in-memory database
    const examples = db.ProblemExample.filter((pe: any) => pe.problemId === normProblemId)
    assert.strictEqual(examples.length, 2, 'Must create 2 ProblemExample records')
    assert.strictEqual(examples[0].displayOrder, 1)
    assert.strictEqual(examples[1].displayOrder, 2)

    const testCases = db.ProblemTestCase.filter((tc: any) => tc.problemId === normProblemId)
    assert.strictEqual(testCases.length, 3, 'Must create 3 ProblemTestCase records')
    assert.strictEqual(testCases[0].points, 15)
    assert.strictEqual(testCases[1].points, 25)
    assert.strictEqual(testCases[1].isHidden, true)

    const starterCodes = db.ProblemStarterCode.filter((sc: any) => sc.problemId === normProblemId)
    assert.strictEqual(starterCodes.length, 4, 'Must create 4 ProblemStarterCode records')
    const languages = starterCodes.map((s: any) => s.language).sort()
    assert.deepStrictEqual(languages, ['cpp', 'java', 'javascript', 'python'])

    const revisions = db.ProblemRevision.filter((r: any) => r.problemId === normProblemId)
    assert.strictEqual(revisions.length, 1, 'Must create initial v1 ProblemRevision')
    assert.strictEqual(revisions[0].version, 1)
    assert.strictEqual(revisions[0].changeSummary, 'Initial question creation')
  })

  await runTest('16.2 Independent Examples reordering and editing persists', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_question',
        id: normProblemId,
        examples: [
          { label: 'Example 2 (Promoted)', input: '5 4 3 2 1', output: '1 2 3 4 5', explanation: 'Now first' },
          { label: 'Example 1 (Demoted)', input: '3 1 2', output: '1 2 3', explanation: 'Now second' },
          { label: 'Example 3 (Added)', input: '0', output: '0', explanation: 'Zero case' },
        ],
        changeSummary: 'Reordered examples and added zero case',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)

    const examples = db.ProblemExample.filter((pe: any) => pe.problemId === normProblemId)
    assert.strictEqual(examples.length, 3, 'Must have 3 updated examples')
    assert.strictEqual(examples[0].displayOrder, 1)
    assert.strictEqual(examples[0].input, '5 4 3 2 1')
    assert.strictEqual(examples[1].displayOrder, 2)
    assert.strictEqual(examples[1].input, '3 1 2')
    assert.strictEqual(examples[2].displayOrder, 3)
    assert.strictEqual(examples[2].input, '0')
  })

  await runTest('16.3 Segregated Public vs Hidden test cases with custom points and visibility toggles', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_question',
        id: normProblemId,
        testCases: [
          { input: '3 1 2', expectedOutput: '1 2 3', isHidden: false, points: 20, displayOrder: 1, description: 'Public sample' },
          { input: '10 9 8', expectedOutput: '8 9 10', isHidden: false, points: 20, displayOrder: 2, description: 'Toggled to public' },
          { input: '100', expectedOutput: '100', isHidden: true, points: 60, displayOrder: 3, description: 'Hidden edge case' },
        ],
        changeSummary: 'Converted test case 2 to public and adjusted points',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)

    const ptc = db.ProblemTestCase.filter((tc: any) => tc.problemId === normProblemId)
    assert.strictEqual(ptc.length, 3)
    const publicCases = ptc.filter((tc: any) => !tc.isHidden)
    const hiddenCases = ptc.filter((tc: any) => tc.isHidden)
    assert.strictEqual(publicCases.length, 2, 'Must have 2 public test cases')
    assert.strictEqual(hiddenCases.length, 1, 'Must have 1 hidden test case')
    assert.strictEqual(hiddenCases[0].points, 60, 'Hidden case must carry 60 points')
  })

  await runTest('16.4 Multi-language starter codes independently retrieved and updated', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'get_question',
        id: normProblemId,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const starterCodes = out.data.data.starterCodes
    assert.ok(starterCodes.python, 'Must contain Python starter')
    assert.ok(starterCodes.javascript, 'Must contain JavaScript starter')
    assert.ok(starterCodes.cpp, 'Must contain C++ starter')
    assert.ok(starterCodes.java, 'Must contain Java starter')
  })

  await runTest('16.5 Updating question records new immutable ProblemRevision with snapshot and change summary', async () => {
    const revisions = db.ProblemRevision.filter((r: any) => r.problemId === normProblemId)
    assert.strictEqual(revisions.length, 3, 'Must have 3 revisions (v1, v2, v3) after 2 updates')
    const latest = revisions[revisions.length - 1]
    assert.strictEqual(latest.version, 3)
    assert.strictEqual(latest.changeSummary, 'Converted test case 2 to public and adjusted points')
    assert.ok(latest.snapshot.problem)
    assert.ok(latest.snapshot.testCases)
  })

  await runTest('16.6 Super Admin lists revisions via list_question_revisions in descending order', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'list_question_revisions',
        id: normProblemId,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    const revList = out.data.data
    assert.strictEqual(revList.length, 3)
    assert.strictEqual(revList[0].version, 3, 'First element must be latest version (v3)')
    assert.strictEqual(revList[1].version, 2)
    assert.strictEqual(revList[2].version, 1)
  })

  await runTest('16.7 Super Admin restores revision via restore_question_revision and generates restoration revision v4', async () => {
    resetSuperAdminRateLimitsForTesting()
    // Restore to initial v1 revision
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'restore_question_revision',
        problemId: normProblemId,
        version: 1,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.restoredFromVersion, 1)
    assert.strictEqual(out.data.data.currentVersion, 4)

    // Verify restored examples count
    const restoredExamples = db.ProblemExample.filter((pe: any) => pe.problemId === normProblemId)
    assert.strictEqual(restoredExamples.length, 2, 'Restored v1 must revert to 2 original examples')

    // Verify new restoration revision v4 was recorded
    const revisions = db.ProblemRevision.filter((r: any) => r.problemId === normProblemId)
    assert.strictEqual(revisions.length, 4, 'Must now have 4 total revisions')
    assert.strictEqual(revisions[revisions.length - 1].changeSummary, 'Restored from revision v1')
  })

  await runTest('16.8 Cascade deletion removes rows across ProblemExample, ProblemTestCase, ProblemStarterCode, ProblemRevision, and legacy TestCase', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'delete_question',
        id: normProblemId,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)

    // Verify Problem deleted
    const probExists = db.Problem.some((p: any) => p.id === normProblemId)
    assert.strictEqual(probExists, false, 'Problem record must be deleted')

    // Verify all child tables cascade deleted
    const peCount = db.ProblemExample.filter((pe: any) => pe.problemId === normProblemId).length
    assert.strictEqual(peCount, 0, 'ProblemExample records must be cascade deleted')

    const ptcCount = db.ProblemTestCase.filter((tc: any) => tc.problemId === normProblemId).length
    assert.strictEqual(ptcCount, 0, 'ProblemTestCase records must be cascade deleted')

    const tcCount = db.TestCase.filter((tc: any) => tc.problemId === normProblemId).length
    assert.strictEqual(tcCount, 0, 'Legacy TestCase records must be cascade deleted')

    const pscCount = db.ProblemStarterCode.filter((sc: any) => sc.problemId === normProblemId).length
    assert.strictEqual(pscCount, 0, 'ProblemStarterCode records must be cascade deleted')

    const revCount = db.ProblemRevision.filter((r: any) => r.problemId === normProblemId).length
    assert.strictEqual(revCount, 0, 'ProblemRevision records must be cascade deleted')
  })


  console.log('\n======================================================================')
  console.log(`RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`)
  console.log('======================================================================\n')

  if (failedCount > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error running question management test suite:', err)
  process.exit(1)
})
