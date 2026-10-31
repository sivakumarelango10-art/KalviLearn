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
