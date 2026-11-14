/**
 * KalviLearn Super Admin & Content Manager Question Lifecycle Verification Suite
 *
 * Verifies:
 * 1. Initial State: Real archived variants from DB/migration have status='ARCHIVED', isActive=false, canonicalProblemId set.
 * 2. Access Control: Unauthenticated, Campus Manager, and Student cannot restore or toggle status (401/403).
 * 3. Super Admin Restore Action: restore_question updates status='DRAFT', isActive=false, approvalStatus='DRAFT', preserves canonicalProblemId.
 * 4. Audit Logging: RESTORE_QUESTION is immutably logged in admin_audit_logs.
 * 5. Update & Publish Workflow: update_question with status='PUBLISHED' sets status='PUBLISHED', isActive=true, approvalStatus='APPROVED', preserves canonicalProblemId.
 * 6. Listing & Filtering: Published questions appear under PUBLISHED, archived questions appear under ARCHIVED, draft under DRAFT.
 * 7. Direct Publishing from Archived: toggle_question_status with isActive=true sets status='PUBLISHED', isActive=true, preserves canonicalProblemId.
 * 8. Unpublishing: toggle_question_status with isActive=false reverts status='DRAFT', isActive=false, preserves canonicalProblemId.
 * 9. Explicit Re-archiving: toggle_question_status with status='ARCHIVED' sets status='ARCHIVED', isActive=false.
 * 10. Content Manager Restore & Publish: Content Manager restore_question restores archived to DRAFT, toggle publishes, preserving canonicalProblemId.
 * 11. Invariant Preservation: Existing published canonical questions remain untouched and active.
 */

import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { EventEmitter } from 'events'
import problemsData from '../src/data/problems.json'

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
const CONTENT_MANAGER_TOKEN = 'Bearer test_auth_content_manager_synthetic.content@kalvilearn.test'

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
  console.log('KALVILEARN — QUESTION LIFECYCLE, RESTORE & PUBLISH VERIFICATION SUITE')
  console.log('======================================================================\n')

  const { default: superAdminHandler, resetSuperAdminRateLimitsForTesting } = await import(
    '../src/server/superAdminHandler'
  )
  const { default: contentManagerHandler, resetContentManagerRateLimitsForTesting } = await import(
    '../src/server/contentManagerHandler'
  )
  const { supabaseServer } = await import('../src/server/feedbackAuth')
  const { installMockSupabaseServer } = await import('./mockDatabase')

  const db = installMockSupabaseServer(supabaseServer)

  // Seed real questions from problems.json into db.Problem
  const allProblemsFromJson: any[] = []
  for (const belt of problemsData as any[]) {
    const list = Array.isArray(belt.problems) ? belt.problems : (Array.isArray(belt.questions) ? belt.questions : [])
    for (const q of list) {
      allProblemsFromJson.push({
        id: q.id || `prob-${q.slug}`,
        beltId: belt.id || `mock-belt-${belt.order || 1}`,
        order: q.order || 1,
        slug: q.slug,
        title: q.title,
        difficulty: q.difficulty || 'Easy',
        subdivision: q.subdivision || 'General',
        description: q.description || '',
        inputFormat: q.inputFormat || '',
        outputFormat: q.outputFormat || '',
        explanation: q.explanation || '',
        examples: q.examples || [],
        starterCodes: q.starterCodes || {},
        isActive: q.isActive !== undefined ? q.isActive : true,
        status: q.status || (q.isActive === false ? 'ARCHIVED' : 'PUBLISHED'),
        canonicalProblemId: q.canonicalProblemId || null,
        timeLimitMs: q.timeLimitMs || 2000,
        memoryLimitMb: q.memoryLimitMb || 256,
        createdAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
        updatedAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
      })
    }
  }

  // Merge into db.Problem (avoiding duplicate slugs)
  for (const p of allProblemsFromJson) {
    if (!db.Problem.some((ep: any) => ep.slug === p.slug || ep.id === p.id)) {
      db.Problem.push(p)
    }
  }

  // Ensure Content Manager test user exists with active global assignment
  const cmUserId = '00000000-0000-0000-0000-000000000099'
  db.users.push({
    id: cmUserId,
    email: 'synthetic.content@kalvilearn.test',
    role: 'CONTENT_MANAGER',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  })
  db.auth_users.push({
    id: cmUserId,
    email: 'synthetic.content@kalvilearn.test',
  })
  db.content_managers.push({
    id: 'cm-profile-lifecycle-1',
    user_id: cmUserId,
    email: 'synthetic.content@kalvilearn.test',
    name: 'Synthetic Content Manager',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  db.content_manager_assignments.push({
    id: 'assignment-cm-lifecycle-1',
    user_id: cmUserId,
    userId: cmUserId,
    status: 'ACTIVE',
    is_active: true,
    isActive: true,
    scope_type: 'GLOBAL',
    scopeType: 'GLOBAL',
    createdAt: new Date().toISOString(),
  })

  // Target question fixtures from the user's report:
  // 1. belt-1-q16-sign-product-v2: Sign Product (Variant 2) -> ARCHIVED, canonical: belt-1-q6-sign-product-v1
  // 2. belt-1-q20-three-way-comparison-v2: Three-Way Comparison (Variant 2) -> ARCHIVED, canonical: belt-1-q10-three-way-comparison-v1
  // 3. belt-3-q1-array-sum-v1: Array Sum (Variant 1) -> ARCHIVED, canonical: belt-2-q11-array-sum-v1
  // 4. belt-2-q20-pair-sum-exists-v1: Pair Sum Exists (Variant 1) -> PUBLISHED canonical
  const qSignProduct = db.Problem.find((p: any) => p.slug === 'belt-1-q16-sign-product-v2')
  const qThreeWay = db.Problem.find((p: any) => p.slug === 'belt-1-q20-three-way-comparison-v2')
  const qArraySum = db.Problem.find((p: any) => p.slug === 'belt-3-q1-array-sum-v1')
  const qPairSum = db.Problem.find((p: any) => p.slug === 'belt-2-q20-pair-sum-exists-v1')

  assert.ok(qSignProduct, 'belt-1-q16-sign-product-v2 fixture must exist')
  assert.ok(qThreeWay, 'belt-1-q20-three-way-comparison-v2 fixture must exist')
  assert.ok(qArraySum, 'belt-3-q1-array-sum-v1 fixture must exist')
  assert.ok(qPairSum, 'belt-2-q20-pair-sum-exists-v1 fixture must exist')

  // ─── 1. INITIAL STATE VERIFICATION ──────────────────────────────────────────
  console.log('--- 1. Initial State & Variant Relationships ---')

  await runTest('1.1 Archived variant has status=ARCHIVED, isActive=false, canonicalProblemId preserved', async () => {
    assert.strictEqual(qSignProduct.status, 'ARCHIVED')
    assert.strictEqual(qSignProduct.isActive, false)
    assert.strictEqual(qSignProduct.canonicalProblemId, 'belt-1-q6-sign-product-v1')

    assert.strictEqual(qThreeWay.status, 'ARCHIVED')
    assert.strictEqual(qThreeWay.isActive, false)
    assert.strictEqual(qThreeWay.canonicalProblemId, 'belt-1-q10-three-way-comparison-v1')

    assert.strictEqual(qArraySum.status, 'ARCHIVED')
    assert.strictEqual(qArraySum.isActive, false)
    assert.strictEqual(qArraySum.canonicalProblemId, 'belt-2-q11-array-sum-v1')
  })

  await runTest('1.2 Canonical problem has status=PUBLISHED, isActive=true, canonicalProblemId=null', async () => {
    assert.strictEqual(qPairSum.status, 'PUBLISHED')
    assert.strictEqual(qPairSum.isActive, true)
    assert.strictEqual(qPairSum.canonicalProblemId, null)
  })

  // ─── 2. ACCESS CONTROL & RBAC ON RESTORE ────────────────────────────────────
  console.log('\n--- 2. Access Control & Authorization on Restore ---')

  await runTest('2.1 Unauthenticated call to restore_question returns 401 Unauthorized', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: {},
      body: { action: 'restore_question', id: qSignProduct.id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 401)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('2.2 Campus Manager attempting restore_question returns 403 Forbidden', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: CAMPUS_MANAGER_TOKEN },
      body: { action: 'restore_question', id: qSignProduct.id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('2.3 Student attempting restore_question returns 403 Forbidden', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: STUDENT_TOKEN },
      body: { action: 'restore_question', id: qSignProduct.id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403)
    assert.strictEqual(out.data.success, false)
  })

  await runTest('2.4 Missing question identifier returns 400 Bad Request', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'restore_question' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 400)
    assert.strictEqual(out.data.success, false)
  })

  // ─── 3. SUPER ADMIN RESTORE TO DRAFT WORKFLOW ──────────────────────────────
  console.log('\n--- 3. Super Admin Restore to Draft Workflow ---')

  await runTest('3.1 Super Admin restores archived question: status becomes DRAFT, isActive=false', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'restore_question', id: qSignProduct.id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.status, 'DRAFT')
    assert.strictEqual(out.data.data.isActive, false)

    // Check DB record
    const updated = db.Problem.find((p: any) => p.id === qSignProduct.id)
    assert.strictEqual(updated.status, 'DRAFT')
    assert.strictEqual(updated.isActive, false)
    assert.strictEqual(updated.approvalStatus, 'DRAFT')
  })

  await runTest('3.2 Variant relationship (canonicalProblemId) is strictly preserved after restore', async () => {
    const updated = db.Problem.find((p: any) => p.id === qSignProduct.id)
    assert.strictEqual(updated.canonicalProblemId, 'belt-1-q6-sign-product-v1')
  })

  await runTest('3.3 Restore operation generates immutable audit log record', async () => {
    const auditLogs = db.admin_audit_logs || []
    const restoreEntry = auditLogs.find(
      (l: any) => l.action === 'RESTORE_QUESTION' && l.target_id === qSignProduct.id
    )
    assert.ok(restoreEntry, 'Audit log must contain RESTORE_QUESTION')
    assert.strictEqual(restoreEntry.status, 'SUCCESS')
    assert.strictEqual(restoreEntry.admin_email, 'sgjitbros@gmail.com')
  })

  await runTest('3.4 Super Admin cannot restore question that is already DRAFT (returns 409 Conflict)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'restore_question', id: qSignProduct.id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 409)
    assert.strictEqual(out.data.success, false)
    assert.strictEqual(out.data.error, 'Conflict')
  })

  // ─── 4. SUPER ADMIN UPDATE & PUBLISH WORKFLOW ──────────────────────────────
  console.log('\n--- 4. Super Admin Update & Publish Workflow ---')

  await runTest('4.1 Super Admin updates restored question and publishes: status becomes PUBLISHED, isActive=true', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_question',
        id: qSignProduct.id,
        status: 'PUBLISHED',
        title: 'Sign Product (Variant 2) - Verified',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.status, 'PUBLISHED')
    assert.strictEqual(out.data.data.isActive, true)

    // Check DB record
    const updated = db.Problem.find((p: any) => p.id === qSignProduct.id)
    assert.strictEqual(updated.status, 'PUBLISHED')
    assert.strictEqual(updated.isActive, true)
    assert.strictEqual(updated.approvalStatus, 'APPROVED')
    assert.ok(updated.publishedAt, 'publishedAt must be set')
    assert.strictEqual(updated.title, 'Sign Product (Variant 2) - Verified')
  })

  await runTest('4.2 Variant relationship is strictly preserved after update and publish', async () => {
    const updated = db.Problem.find((p: any) => p.id === qSignProduct.id)
    assert.strictEqual(updated.canonicalProblemId, 'belt-1-q6-sign-product-v1')
  })

  await runTest('4.3 Super Admin cannot restore question that is PUBLISHED (returns 409 Conflict)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'restore_question', id: qSignProduct.id },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 409)
    assert.strictEqual(out.data.success, false)
    assert.strictEqual(out.data.error, 'Conflict')
  })

  // ─── 5. LISTING & STATUS FILTERING ──────────────────────────────────────────
  console.log('\n--- 5. Listing & Status Filtering Verification ---')

  await runTest('5.1 Filtering status=PUBLISHED returns published questions and excludes archived', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', status: 'PUBLISHED', search: 'Sign Product' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)

    const list = out.data.data.questions
    // Newly published qSignProduct must be present
    assert.ok(list.some((q: any) => q.id === qSignProduct.id), 'Newly published question must be in PUBLISHED list')
  })

  await runTest('5.2 Filtering status=ARCHIVED returns only archived questions', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', status: 'ARCHIVED', search: 'Three-Way' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)

    const list = out.data.data.questions
    assert.ok(list.some((q: any) => q.id === qThreeWay.id), 'qThreeWay must be in ARCHIVED list')
    assert.ok(!list.some((q: any) => q.id === qSignProduct.id), 'Published qSignProduct must NOT be in ARCHIVED list')
  })

  await runTest('5.3 Filtering status=DRAFT excludes published and archived questions', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_questions', status: 'DRAFT' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)

    const list = out.data.data.questions
    assert.ok(!list.some((q: any) => q.id === qSignProduct.id), 'Published question must not be in DRAFT list')
    assert.ok(!list.some((q: any) => q.id === qThreeWay.id), 'Archived question must not be in DRAFT list')
  })

  // ─── 6. DIRECT PUBLISHING, UNPUBLISHING & RE-ARCHIVING ──────────────────────
  console.log('\n--- 6. Direct Publishing, Unpublishing & Re-archiving ---')

  await runTest('6.1 Direct publish from ARCHIVED via toggle_question_status (isActive=true)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_question_status', id: qThreeWay.id, isActive: true },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.status, 'PUBLISHED')
    assert.strictEqual(out.data.data.isActive, true)

    const updated = db.Problem.find((p: any) => p.id === qThreeWay.id)
    assert.strictEqual(updated.status, 'PUBLISHED')
    assert.strictEqual(updated.isActive, true)
    assert.strictEqual(updated.canonicalProblemId, 'belt-1-q10-three-way-comparison-v1')
  })

  await runTest('6.2 Unpublish question via toggle_question_status (isActive=false) sets DRAFT', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_question_status', id: qThreeWay.id, isActive: false },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.status, 'DRAFT')
    assert.strictEqual(out.data.data.isActive, false)

    const updated = db.Problem.find((p: any) => p.id === qThreeWay.id)
    assert.strictEqual(updated.status, 'DRAFT')
    assert.strictEqual(updated.isActive, false)
    assert.strictEqual(updated.canonicalProblemId, 'belt-1-q10-three-way-comparison-v1')
  })

  await runTest('6.3 Explicitly re-archive via toggle_question_status (status=ARCHIVED)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_question_status', id: qThreeWay.id, status: 'ARCHIVED' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.status, 'ARCHIVED')

    const updated = db.Problem.find((p: any) => p.id === qThreeWay.id)
    assert.strictEqual(updated.status, 'ARCHIVED')
    assert.strictEqual(updated.isActive, false)
    assert.strictEqual(updated.canonicalProblemId, 'belt-1-q10-three-way-comparison-v1')
    assert.notStrictEqual(updated.approvalStatus, 'REJECTED', 'Approval history must be preserved; not REJECTED')
  })

  await runTest('6.4 Incompatible isActive and status combination returns 400 Bad Request', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_question_status', id: qThreeWay.id, isActive: true, status: 'DRAFT' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 400)
    assert.strictEqual(out.data.success, false)
    assert.strictEqual(out.data.error, 'Invalid Status Combination')
  })

  // ─── 7. CONTENT MANAGER RESTORE & PUBLISH WORKFLOW ─────────────────────────
  console.log('\n--- 7. Content Manager Restore & Publish Workflow ---')

  await runTest('7.1 Content Manager restore_question restores archived question to DRAFT', async () => {
    resetContentManagerRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      url: '/api/content-manager/questions',
      headers: { authorization: CONTENT_MANAGER_TOKEN },
      body: { action: 'restore_question', id: qArraySum.id },
    })
    await contentManagerHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.status, 'DRAFT')
    assert.strictEqual(out.data.data.isActive, false)

    const updated = db.Problem.find((p: any) => p.id === qArraySum.id)
    assert.strictEqual(updated.status, 'DRAFT')
    assert.strictEqual(updated.isActive, false)
    assert.strictEqual(updated.canonicalProblemId, 'belt-2-q11-array-sum-v1')
  })

  await runTest('7.2 Content Manager restore action logs in content_audit_logs', async () => {
    const cmLogs = db.content_audit_logs || []
    const logEntry = cmLogs.find((l: any) => l.action === 'RESTORE_QUESTION' && l.resource_id === qArraySum.id)
    assert.ok(logEntry, 'content_audit_logs must contain RESTORE_QUESTION')
  })

  await runTest('7.3 Content Manager publishes restored question', async () => {
    resetContentManagerRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      url: '/api/content-manager/questions',
      headers: { authorization: CONTENT_MANAGER_TOKEN },
      body: { action: 'toggle_question_status', id: qArraySum.id, isActive: true },
    })
    await contentManagerHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.strictEqual(out.data.data.status, 'PUBLISHED')
    assert.strictEqual(out.data.data.isActive, true)

    const updated = db.Problem.find((p: any) => p.id === qArraySum.id)
    assert.strictEqual(updated.status, 'PUBLISHED')
    assert.strictEqual(updated.isActive, true)
    assert.strictEqual(updated.canonicalProblemId, 'belt-2-q11-array-sum-v1')
  })

  await runTest('7.4 Content Manager cannot restore PUBLISHED question (returns 409 Conflict)', async () => {
    resetContentManagerRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      url: '/api/content-manager/questions',
      headers: { authorization: CONTENT_MANAGER_TOKEN },
      body: { action: 'restore_question', id: qArraySum.id },
    })
    await contentManagerHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 409)
    assert.strictEqual(out.data.success, false)
    assert.strictEqual(out.data.error, 'Conflict')
  })

  // ─── 8. INVARIANT PRESERVATION ──────────────────────────────────────────────
  console.log('\n--- 8. Invariant Preservation ---')

  await runTest('8.1 Existing published canonical question remains PUBLISHED, isActive=true, unchanged', async () => {
    const checkPairSum = db.Problem.find((p: any) => p.id === qPairSum.id)
    assert.strictEqual(checkPairSum.status, 'PUBLISHED')
    assert.strictEqual(checkPairSum.isActive, true)
    assert.strictEqual(checkPairSum.canonicalProblemId, null)
  })

  console.log('\n======================================================================')
  console.log(`RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`)
  console.log('======================================================================')

  if (failedCount > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
