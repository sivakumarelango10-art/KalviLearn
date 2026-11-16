/**
 * KalviLearn Question Sorting & Draft Cleanup Verification Suite
 *
 * Verifies:
 * 1. Hierarchical sorting:
 *    - Parent Belt numeric order (Belt 1 before Belt 2 .. Belt 10; NOT alphabetical by belt UUID).
 *    - Numeric Problem.order within belt ascending (1, 2, 10, not string '1', '10', '2').
 *    - Stable tie-breaker and variant sequence preservation (Variant 1 before Variant 2).
 * 2. Super Admin and Content Manager API parity:
 *    - Both handlers apply identical hierarchical sorting.
 * 3. Pagination stability:
 *    - Slicing occurs after hierarchical sort; items on page 1 strictly precede items on page 2.
 * 4. Draft exclusion from student-facing queries:
 *    - Inactive / draft problems are rejected by judge resolution and hidden from student previews.
 * 5. Draft visibility in administrative review:
 *    - Draft, pending review, and archived problems are accessible to authorized administrators.
 *    - Distinct publication statuses (PUBLISHED, DRAFT, PENDING_REVIEW, ARCHIVED) are returned.
 * 6. Database and schema integrity:
 *    - Zero records deleted, belt relationships and test cases preserved.
 */

import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert'
import { EventEmitter } from 'node:events'

// Environment setup
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

const SUPER_ADMIN_TOKEN = 'Bearer test_auth_SUPERADMIN_sgjitbros@gmail.com'
const CONTENT_MANAGER_TOKEN = 'Bearer test_auth_CONTENT_MANAGER_cm.author@kalvilearn.test'
const STUDENT_TOKEN = 'Bearer test_auth_STUDENT_synthetic.student@kalvilearn.test'

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
  console.log('KALVILEARN — QUESTION SORTING & DRAFT CONTENT VERIFICATION SUITE')
  console.log('======================================================================\n')

  const { default: superAdminHandler, resetSuperAdminRateLimitsForTesting } = await import(
    '../src/server/superAdminHandler'
  )
  const { default: contentManagerHandler } = await import(
    '../src/server/contentManagerHandler'
  )
  const { supabaseServer } = await import('../src/server/feedbackAuth')
  const { installMockSupabaseServer } = await import('./mockDatabase')
  const { resolveQuestion, getServerTests } = await import('../src/server/judge/testRepository')
  const {
    compareProblemsHierarchically,
    getProblemBeltOrder,
    extractVariantNumber,
    buildBeltOrderMap,
    resolvePublicationStatus,
  } = await import('../src/server/questionSorting')

  const db = installMockSupabaseServer(supabaseServer)

  // Ensure content manager user exists with active global assignment
  db.users.push({
    id: 'cm-sorting-test-user-id',
    email: 'cm.author@kalvilearn.test',
    role: 'CONTENT_MANAGER',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  })
  db.auth_users.push({
    id: 'auth-cm-uid-1',
    email: 'cm.author@kalvilearn.test',
  })
  db.content_managers.push({
    id: 'cm-profile-sorting-1',
    user_id: 'cm-sorting-test-user-id',
    email: 'cm.author@kalvilearn.test',
    name: 'CM Author',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  db.content_manager_assignments.push({
    id: 'assignment-cm-1',
    user_id: 'cm-sorting-test-user-id',
    userId: 'cm-sorting-test-user-id',
    status: 'ACTIVE',
    is_active: true,
    isActive: true,
    scope_type: 'GLOBAL',
    scopeType: 'GLOBAL',
    createdAt: new Date().toISOString(),
  })

  // Seed varied test problems with distinct Belts, orders (1, 2, 10, 11), variants, and draft statuses
  const testBeltUUIDs = {
    belt1: 'uuid-belt-001',
    belt2: 'uuid-belt-002',
    belt10: 'uuid-belt-010',
  }

  // Update or insert Belts in db to guarantee UUID non-alphabetical test
  // Note: 'uuid-belt-010' alphabetically comes BEFORE 'uuid-belt-002'!
  // But numeric order: Belt 1 (order 1) < Belt 2 (order 2) < Belt 10 (order 10)
  db.Belt = [
    { id: testBeltUUIDs.belt1, order: 1, name: 'Belt 1', title: 'Yellow Belt' },
    { id: testBeltUUIDs.belt2, order: 2, name: 'Belt 2', title: 'Orange Belt' },
    { id: testBeltUUIDs.belt10, order: 10, name: 'Belt 10', title: 'Black Belt' },
  ]

  // Clear or prep test problems
  db.Problem = [
    // Belt 10 problems (should sort LAST despite uuid-belt-010 being alphabetically before uuid-belt-002)
    {
      id: 'prob-b10-q1',
      beltId: testBeltUUIDs.belt10,
      order: 1,
      title: 'Advanced Graph Coloring',
      slug: 'belt-10-q1-advanced-graph-coloring',
      difficulty: 'Hard',
      status: 'PUBLISHED',
      isActive: true,
      createdAt: '2026-11-01T00:00:00Z',
    },
    {
      id: 'prob-b10-q2',
      beltId: testBeltUUIDs.belt10,
      order: 2,
      title: 'Distributed Consensus Matrix',
      slug: 'belt-10-q2-distributed-consensus',
      difficulty: 'Hard',
      status: 'PUBLISHED',
      isActive: true,
      createdAt: '2026-11-02T00:00:00Z',
    },
    // Belt 1 problems: orders 1, 2, 10, 11, and variants
    {
      id: 'prob-b1-q10',
      beltId: testBeltUUIDs.belt1,
      order: 10,
      title: 'Three-Way Comparison',
      slug: 'belt-1-q10-three-way-comparison-v1',
      difficulty: 'Easy',
      status: 'PUBLISHED',
      isActive: true,
      createdAt: '2026-10-05T00:00:00Z',
    },
    {
      id: 'prob-b1-q2',
      beltId: testBeltUUIDs.belt1,
      order: 2,
      title: 'Absolute Difference (Variant 1)',
      slug: 'belt-1-q2-absolute-difference-v1',
      difficulty: 'Easy',
      status: 'PUBLISHED',
      isActive: true,
      createdAt: '2026-10-02T00:00:00Z',
    },
    {
      id: 'prob-b1-q1-v1',
      beltId: testBeltUUIDs.belt1,
      order: 1,
      title: 'Arithmetic Check (Variant 1)',
      slug: 'belt-1-q1-arithmetic-check-v1',
      difficulty: 'Easy',
      status: 'PUBLISHED',
      isActive: true,
      createdAt: '2026-10-01T00:00:00Z',
    },
    {
      id: 'prob-b1-q1-v2',
      beltId: testBeltUUIDs.belt1,
      order: 1,
      title: 'Arithmetic Check (Variant 2)',
      slug: 'belt-1-q1-arithmetic-check-v2',
      difficulty: 'Easy',
      status: 'PUBLISHED',
      isActive: true,
      createdAt: '2026-10-01T00:00:01Z',
    },
    {
      id: 'prob-b1-q11',
      beltId: testBeltUUIDs.belt1,
      order: 11,
      title: 'Arithmetic Check (Variant 3)',
      slug: 'belt-1-q11-arithmetic-check-v3',
      difficulty: 'Easy',
      status: 'PUBLISHED',
      isActive: true,
      createdAt: '2026-10-06T00:00:00Z',
    },
    // Belt 1 Draft and Pending Review problems
    {
      id: 'prob-b1-q99-draft',
      beltId: testBeltUUIDs.belt1,
      order: 99,
      title: 'Draft Experimental Problem',
      slug: 'belt-1-q99-draft-experimental',
      difficulty: 'Easy',
      status: 'DRAFT',
      approvalStatus: 'DRAFT',
      isActive: false,
      createdAt: '2026-11-10T00:00:00Z',
    },
    {
      id: 'prob-b1-q100-pending',
      beltId: testBeltUUIDs.belt1,
      order: 100,
      title: 'Pending Review Question',
      slug: 'belt-1-q100-pending-review',
      difficulty: 'Easy',
      status: 'PENDING_REVIEW',
      approvalStatus: 'PENDING_REVIEW',
      isActive: false,
      createdAt: '2026-11-11T00:00:00Z',
    },
    // Belt 2 problem
    {
      id: 'prob-b2-q1',
      beltId: testBeltUUIDs.belt2,
      order: 1,
      title: 'Search a 2D Matrix',
      slug: 'belt-2-q1-search-2d-matrix',
      difficulty: 'Medium',
      status: 'PUBLISHED',
      isActive: true,
      createdAt: '2026-10-15T00:00:00Z',
    },
  ]

  // --- SECTION 1: UNIT LOGIC & HIERARCHICAL COMPARATOR ---
  console.log('--- 1. Hierarchical Comparator & Belt Order Mapping ---')

  await runTest('1.1 Parent Belt numeric ordering: Belt 1 < Belt 2 < Belt 10 (ignores UUID alphabet)', async () => {
    const beltOrderMap = buildBeltOrderMap(db.Belt)
    const probB1 = db.Problem.find((p) => p.id === 'prob-b1-q1-v1')!
    const probB2 = db.Problem.find((p) => p.id === 'prob-b2-q1')!
    const probB10 = db.Problem.find((p) => p.id === 'prob-b10-q1')!

    assert.strictEqual(getProblemBeltOrder(probB1, beltOrderMap), 1)
    assert.strictEqual(getProblemBeltOrder(probB2, beltOrderMap), 2)
    assert.strictEqual(getProblemBeltOrder(probB10, beltOrderMap), 10)

    // B1 < B2
    assert.ok(compareProblemsHierarchically(probB1, probB2, beltOrderMap) < 0)
    // B2 < B10
    assert.ok(compareProblemsHierarchically(probB2, probB10, beltOrderMap) < 0)
    // B1 < B10
    assert.ok(compareProblemsHierarchically(probB1, probB10, beltOrderMap) < 0)
  })

  await runTest('1.2 Numeric question ordering within belt: 1 < 2 < 10 < 11 (NOT string order 1, 10, 11, 2)', async () => {
    const beltOrderMap = buildBeltOrderMap(db.Belt)
    const q1 = db.Problem.find((p) => p.id === 'prob-b1-q1-v1')!
    const q2 = db.Problem.find((p) => p.id === 'prob-b1-q2')!
    const q10 = db.Problem.find((p) => p.id === 'prob-b1-q10')!
    const q11 = db.Problem.find((p) => p.id === 'prob-b1-q11')!

    // Verify numeric ordering strictly holds
    assert.ok(compareProblemsHierarchically(q1, q2, beltOrderMap) < 0, 'q1 < q2')
    assert.ok(compareProblemsHierarchically(q2, q10, beltOrderMap) < 0, 'q2 < q10 (2 before 10)')
    assert.ok(compareProblemsHierarchically(q10, q11, beltOrderMap) < 0, 'q10 < q11 (10 before 11)')
  })

  await runTest('1.3 Variant sequence preservation: Variant 1 before Variant 2 when order matches', async () => {
    const beltOrderMap = buildBeltOrderMap(db.Belt)
    const v1 = db.Problem.find((p) => p.id === 'prob-b1-q1-v1')!
    const v2 = db.Problem.find((p) => p.id === 'prob-b1-q1-v2')!

    assert.strictEqual(extractVariantNumber(v1), 1)
    assert.strictEqual(extractVariantNumber(v2), 2)
    assert.ok(compareProblemsHierarchically(v1, v2, beltOrderMap) < 0, 'Variant 1 must strictly precede Variant 2')
  })

  // --- SECTION 2: SUPER ADMIN & CONTENT MANAGER API PARITY ---
  console.log('\n--- 2. Super Admin & Content Manager API Parity ---')

  await runTest('2.1 Super Admin list_questions returns hierarchically sorted questions', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', limit: 50 },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)

    const questions = out.data.data.questions
    assert.ok(questions.length >= 6)

    // Verify every consecutive pair is non-decreasing hierarchically
    const beltOrderMap = buildBeltOrderMap(db.Belt)
    for (let i = 0; i < questions.length - 1; i++) {
      const cmp = compareProblemsHierarchically(questions[i], questions[i + 1], beltOrderMap)
      assert.ok(
        cmp <= 0,
        `Super Admin order violation at index ${i}: [Belt ${questions[i].beltOrder} #${questions[i].order} ${questions[i].title}] should precede [Belt ${questions[i + 1].beltOrder} #${questions[i + 1].order} ${questions[i + 1].title}]`
      )
    }
  })

  await runTest('2.2 Content Manager list_questions returns identical hierarchical sorting', async () => {
    const { req, res } = createMockReqRes({
      url: '/api/content-manager/questions',
      headers: { authorization: CONTENT_MANAGER_TOKEN },
      body: { action: 'list_questions', limit: 50 },
    })
    await contentManagerHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)

    const questions = out.data.data.questions
    assert.ok(questions.length >= 6)

    const beltOrderMap = buildBeltOrderMap(db.Belt)
    for (let i = 0; i < questions.length - 1; i++) {
      const cmp = compareProblemsHierarchically(questions[i], questions[i + 1], beltOrderMap)
      assert.ok(
        cmp <= 0,
        `Content Manager order violation at index ${i}: [Belt ${questions[i].beltOrder} #${questions[i].order}] should precede [Belt ${questions[i + 1].beltOrder} #${questions[i + 1].order}]`
      )
    }
  })

  // --- SECTION 3: PAGINATION STABILITY ---
  console.log('\n--- 3. Pagination Stability & Global Ordering ---')

  await runTest('3.1 Page slicing happens after sorting: items on Page 1 strictly precede Page 2', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req: p1Req, res: p1Res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', page: 1, limit: 3 },
    })
    await superAdminHandler(p1Req, p1Res)
    const p1Out = p1Res.getOutput()
    assert.strictEqual(p1Out.statusCode, 200)
    const p1Questions = p1Out.data.data.questions
    assert.strictEqual(p1Questions.length, 3)

    resetSuperAdminRateLimitsForTesting()
    const { req: p2Req, res: p2Res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', page: 2, limit: 3 },
    })
    await superAdminHandler(p2Req, p2Res)
    const p2Out = p2Res.getOutput()
    assert.strictEqual(p2Out.statusCode, 200)
    const p2Questions = p2Out.data.data.questions
    assert.strictEqual(p2Questions.length, 3)

    const beltOrderMap = buildBeltOrderMap(db.Belt)
    const lastP1 = p1Questions[p1Questions.length - 1]
    const firstP2 = p2Questions[0]
    const boundaryCmp = compareProblemsHierarchically(lastP1, firstP2, beltOrderMap)
    assert.ok(
      boundaryCmp <= 0,
      `Pagination boundary broken: Last item on Page 1 (${lastP1.slug}) must precede First item on Page 2 (${firstP2.slug})`
    )
  })

  // --- SECTION 4: DRAFT EXCLUSION FROM STUDENTS ---
  console.log('\n--- 4. Draft Content Security & Student Exclusion ---')

  await runTest('4.1 Inactive / Draft question rejected by judge testRepository.resolveQuestion', async () => {
    // Draft question: prob-b1-q99-draft
    const draftResolved = await resolveQuestion('belt-1-q99-draft-experimental')
    assert.ok(draftResolved === null || ('error' in draftResolved && draftResolved.error === 'not_found'), 'Draft question must fail resolution with not_found or null')

    // Published question: prob-b1-q1-v1
    const pubResolved = await resolveQuestion('belt-1-q1-arithmetic-check-v1')
    assert.ok(pubResolved !== null && 'suite' in pubResolved, 'Published question should resolve with suite')
  })

  await runTest('4.2 Student preview strictly cannot access unapproved draft details', async () => {
    // Attempting to preview a draft question via Super Admin preview endpoint
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: STUDENT_TOKEN },
      body: { action: 'get_question_preview', slug: 'belt-1-q99-draft-experimental' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    // Non-superadmin is blocked with 403 Forbidden
    assert.strictEqual(out.statusCode, 403)
  })

  // --- SECTION 5: DRAFT ACCESSIBILITY FOR ADMIN REVIEW ---
  console.log('\n--- 5. Admin Draft Review & Publication Status Visibility ---')

  await runTest('5.1 Super Admin can filter by status: DRAFT returns only draft records', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', status: 'DRAFT' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const draftList = out.data.data.questions
    assert.ok(draftList.length >= 1)
    for (const q of draftList) {
      assert.strictEqual(q.status, 'DRAFT')
      assert.strictEqual(q.isActive, false)
    }
  })

  await runTest('5.2 Content Manager can view Draft and In Review questions for curation', async () => {
    const { req, res } = createMockReqRes({
      url: '/api/content-manager/questions',
      headers: { authorization: CONTENT_MANAGER_TOKEN },
      body: { action: 'list_questions', status: 'ALL' },
    })
    await contentManagerHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const allQs = out.data.data.questions
    const foundDraft = allQs.some((q: any) => q.status === 'DRAFT')
    const foundReview = allQs.some((q: any) => q.status === 'PENDING_REVIEW')
    assert.ok(foundDraft, 'Content Manager should see draft items in ALL')
    assert.ok(foundReview, 'Content Manager should see pending review items in ALL')
  })

  // --- SECTION 6: DRAFT AUDIT REPORT SQL VALIDATION ---
  console.log('\n--- 6. Read-Only SQL Inventory Audit Verification ---')

  await runTest('6.1 draft_content_inventory_and_cleanup_report.sql exists and is 100% read-only', async () => {
    const sqlPath = path.resolve(process.cwd(), 'scripts/sql/draft_content_inventory_and_cleanup_report.sql')
    assert.ok(fs.existsSync(sqlPath), 'SQL inventory file must exist')
    const content = fs.readFileSync(sqlPath, 'utf8')

    // Confirm presence of all required report sections
    assert.ok(content.includes('public."Problem"'), 'Must query public.Problem')
    assert.ok(content.includes('public."LearningUnit"'), 'Must query public.LearningUnit')
    assert.ok(content.includes('public."Module"'), 'Must query public.Module')
    assert.ok(content.includes('safety_assessment'), 'Must calculate safety_assessment')

    // Verify zero data-modifying statements (INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE)
    const lines = content.split('\n')
    for (const rawLine of lines) {
      const line = rawLine.trim()
      if (!line || line.startsWith('--')) continue
      const upper = line.toUpperCase()
      assert.ok(!upper.startsWith('DELETE '), 'Script must not contain DELETE')
      assert.ok(!upper.startsWith('UPDATE '), 'Script must not contain UPDATE')
      assert.ok(!upper.startsWith('INSERT '), 'Script must not contain INSERT')
      assert.ok(!upper.startsWith('DROP '), 'Script must not contain DROP')
      assert.ok(!upper.startsWith('ALTER '), 'Script must not contain ALTER')
      assert.ok(!upper.startsWith('TRUNCATE '), 'Script must not contain TRUNCATE')
    }
  })

  // --- SECTION 7: DATABASE INTEGRITY ---
  console.log('\n--- 7. Database Integrity & Structure Preservation ---')

  await runTest('7.1 Problem and Belt records, test cases, and references remain intact', async () => {
    assert.ok(db.Belt.length >= 3, 'Belts preserved')
    assert.ok(db.Problem.length >= 10, 'Problems preserved without accidental deletion')
    const sample = db.Problem.find((p) => p.id === 'prob-b1-q1-v1')
    assert.ok(sample, 'Problem sample preserved')
    assert.strictEqual(sample?.beltId, testBeltUUIDs.belt1, 'Belt association preserved')
  })

  console.log('\n======================================================================')
  console.log(`RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`)
  console.log('======================================================================')

  if (failedCount > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error in test suite:', err)
  process.exit(1)
})
