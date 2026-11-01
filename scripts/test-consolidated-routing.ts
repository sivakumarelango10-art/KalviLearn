/**
 * Comprehensive Regression Test Suite for KalviLearn Vercel Consolidated API Routing
 *
 * Verifies:
 * 1. Campus API operations: GET/POST students, GET/POST mentors, mentor assignment, student deletion.
 * 2. Super Admin API operations: Dashboard, Campuses, Managers, Mentors, Students, Roles, Audit, Questions, Curriculum, Belts.
 * 3. Route matching after Vercel edge rewrites (simulating ?__subpath=..., headers, and direct paths).
 * 4. Correct HTTP method dispatching (GET, POST, DELETE, OPTIONS, rejection of unsupported methods like PATCH with 405).
 * 5. Query parameter preservation for GET and DELETE operations.
 * 6. Missing or invalid action handling (400).
 * 7. Authentication failure handling (401).
 * 8. Non-Super-Admin access denial (403).
 * 9. Hidden-test protection (zero leakage).
 * 10. Administrative audit logging verification.
 *
 * Runs 100% in-memory using mockDatabase without modifying production data or requiring network access.
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
  req.method = (options.method || 'GET').toUpperCase()
  req.url = options.url || '/'
  req.headers = { 'content-type': 'application/json', ...(options.headers || {}) }
  if (options.body) {
    req.body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body
  }
  if (options.query) {
    req.query = options.query
  }

  let statusCode = 200
  let responseBody = ''
  const responseHeaders: Record<string, string> = {}

  const res = {
    statusCode: 200,
    setHeader(name: string, value: string) {
      responseHeaders[name.toLowerCase()] = String(value)
    },
    getHeader(name: string) {
      return responseHeaders[name.toLowerCase()]
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
        return { statusCode, data: JSON.parse(responseBody), headers: responseHeaders }
      } catch {
        return { statusCode, data: responseBody, headers: responseHeaders }
      }
    },
  } as any

  return { req, res }
}

const SUPER_ADMIN_TOKEN = 'Bearer test_auth_superadmin_sgjitbros@gmail.com'
const CAMPUS_MANAGER_TOKEN = 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test'
const MENTOR_TOKEN = 'Bearer test_auth_mentor_synthetic.mentor@kalvilearn.test'
const STUDENT_TOKEN = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'

let passed = 0
let failed = 0

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn()
    console.log(`  ✓ ${name}`)
    passed++
  } catch (err: any) {
    console.error(`  ✗ ${name}`)
    console.error(`    Error: ${err.message}`)
    if (err.stack) {
      const callerLine = err.stack.split('\n')[2]
      if (callerLine) console.error(`    ${callerLine.trim()}`)
    }
    failed++
  }
}

async function runSuite() {
  console.log('======================================================================')
  console.log('KALVILEARN CONSOLIDATED API ROUTING & REGRESSION VERIFICATION SUITE')
  console.log('======================================================================\n')

  // Import mockDatabase and server handlers
  const { installMockSupabaseServer } = await import('./mockDatabase')
  const { supabaseServer } = await import('../src/server/feedbackAuth')
  const db = installMockSupabaseServer(supabaseServer)

  const { default: campusHandler, resetCampusRateLimitsForTesting } = await import('../src/server/campusHandler')
  const { default: superAdminHandler, resetSuperAdminRateLimitsForTesting } = await import('../src/server/superAdminHandler')

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. CAMPUS API: ROUTING, VERCEL REWRITES & CRUD
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('--- SECTION 1: Campus API Operations & Vercel Rewrite Matching ---')

  await test('1.1 GET /api/campus/students (direct subpath)', async () => {
    resetCampusRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/campus/students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.ok(Array.isArray(out.data.data))
  })

  await test('1.2 GET /api/campus?__subpath=students (Vercel rewrite simulation)', async () => {
    resetCampusRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/campus?__subpath=students&page=1&limit=20',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.ok(Array.isArray(out.data.data))
  })

  await test('1.3 POST /api/campus/students (direct subpath enroll student)', async () => {
    resetCampusRateLimitsForTesting()
    const email = `test.student.${Date.now()}@kalvilearn.test`
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { name: 'Campus Student A', email, studentCode: 'CSA001' },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    assert.ok(out.data.data.studentId)
  })

  await test('1.4 POST /api/campus?__subpath=students (Vercel rewrite enroll student)', async () => {
    resetCampusRateLimitsForTesting()
    const email = `test.student.rewrite.${Date.now()}@kalvilearn.test`
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/campus?__subpath=students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { name: 'Campus Student B', email, studentCode: 'CSB002' },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    assert.ok(out.data.data.studentId)
  })

  let testMentorId = ''
  await test('1.5 GET /api/campus/mentors (direct subpath)', async () => {
    resetCampusRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/campus/mentors',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.ok(Array.isArray(out.data.data))
  })

  await test('1.6 GET /api/campus?__subpath=mentors (Vercel rewrite)', async () => {
    resetCampusRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/campus?__subpath=mentors',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.ok(Array.isArray(out.data.data))
  })

  await test('1.7 POST /api/campus/mentors (direct subpath add mentor)', async () => {
    resetCampusRateLimitsForTesting()
    const email = `test.mentor.${Date.now()}@kalvilearn.test`
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/mentors',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { name: 'Campus Mentor X', email, mentorCode: 'CMX001' },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    assert.ok(out.data.data.mentorId)
    testMentorId = out.data.data.mentorId
  })

  await test('1.8 POST /api/campus?__subpath=assign-mentor (Vercel rewrite mentor assignment)', async () => {
    resetCampusRateLimitsForTesting()
    // First enroll a student
    const stuEmail = `test.assign.stu.${Date.now()}@kalvilearn.test`
    const { req: sReq, res: sRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { name: 'Assignee Student', email: stuEmail, studentCode: 'AST001' },
    })
    await campusHandler(sReq, sRes)
    const sOut = sRes.getOutput()
    const studentId = sOut.data.data.studentId

    // Assign to mentor via rewritten path
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/campus?__subpath=assign-mentor',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { studentId, mentorId: testMentorId },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
  })

  await test('1.9 DELETE /api/campus/students?studentId=... (DELETE with query param)', async () => {
    resetCampusRateLimitsForTesting()
    // Enroll a student to delete
    const stuEmail = `test.del.stu.${Date.now()}@kalvilearn.test`
    const { req: sReq, res: sRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { name: 'Delete Target Student', email: stuEmail, studentCode: 'DEL001' },
    })
    await campusHandler(sReq, sRes)
    const sOut = sRes.getOutput()
    const studentId = sOut.data.data.studentId

    // Delete student via DELETE method with query string
    const { req, res } = createMockReqRes({
      method: 'DELETE',
      url: `/api/campus/students?studentId=${studentId}`,
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.ok(out.data.message.includes('deleted'))
  })

  await test('1.10 DELETE /api/campus?__subpath=students&studentId=... (Vercel rewrite DELETE)', async () => {
    resetCampusRateLimitsForTesting()
    const stuEmail = `test.del.rewrite.${Date.now()}@kalvilearn.test`
    const { req: sReq, res: sRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { name: 'Rewrite Delete Student', email: stuEmail, studentCode: 'RDL001' },
    })
    await campusHandler(sReq, sRes)
    const studentId = sRes.getOutput().data.data.studentId

    const { req, res } = createMockReqRes({
      method: 'DELETE',
      url: `/api/campus?__subpath=students&studentId=${studentId}`,
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
  })

  await test('1.11 POST /api/campus with explicit action: "delete_student"', async () => {
    resetCampusRateLimitsForTesting()
    const stuEmail = `test.del.action.${Date.now()}@kalvilearn.test`
    const { req: sReq, res: sRes } = createMockReqRes({
      method: 'POST',
      url: '/api/campus/students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { name: 'Action Delete Student', email: stuEmail, studentCode: 'ADL001' },
    })
    await campusHandler(sReq, sRes)
    const studentId = sRes.getOutput().data.data.studentId

    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/campus',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { action: 'delete_student', studentId },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. SUPER ADMIN API: ROUTING & VERCEL REWRITES
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\n--- SECTION 2: Super Admin API Operations & Vercel Rewrite Matching ---')

  await test('2.1 GET /api/super-admin/dashboard (direct subpath)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin/dashboard',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.ok(out.data.data.overview)
  })

  await test('2.2 GET /api/super-admin?__subpath=dashboard (Vercel rewrite)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=dashboard',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
    assert.ok(out.data.data.overview)
  })

  let createdCampusId = ''
  await test('2.3 GET /api/super-admin/campuses & POST create_campus via rewrite', async () => {
    resetSuperAdminRateLimitsForTesting()
    // GET via rewrite
    const { req: gReq, res: gRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=campuses',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(gReq, gRes)
    const gOut = gRes.getOutput()
    assert.strictEqual(gOut.statusCode, 200)
    assert.ok(Array.isArray(gOut.data.data))

    // POST create campus via rewrite
    const campusCode = `CMP-${Date.now().toString().slice(-4)}`
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/super-admin?__subpath=campuses',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'create_campus', code: campusCode, name: 'Routing Test Campus' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    createdCampusId = out.data.data.id
  })

  await test('2.4 POST update_campus, toggle_campus_status via rewrite', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/super-admin?__subpath=campuses',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'update_campus', id: createdCampusId, name: 'Renamed Test Campus' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.name, 'Renamed Test Campus')

    // Toggle status
    const { req: tReq, res: tRes } = createMockReqRes({
      method: 'POST',
      url: '/api/super-admin?__subpath=campuses',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_campus_status', id: createdCampusId, status: 'INACTIVE' },
    })
    await superAdminHandler(tReq, tRes)
    assert.strictEqual(tRes.getOutput().statusCode, 200)
  })

  let createdManagerId = ''
  await test('2.5 GET /api/super-admin/managers & POST provision_manager via rewrite', async () => {
    resetSuperAdminRateLimitsForTesting()
    // GET managers
    const { req: gReq, res: gRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=managers',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(gReq, gRes)
    assert.strictEqual(gRes.getOutput().statusCode, 200)

    // Provision manager
    const email = `manager.route.${Date.now()}@kalvilearn.test`
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/super-admin?__subpath=managers',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'provision_manager', email, name: 'Manager Route', campusId: createdCampusId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    createdManagerId = out.data.data.id
  })

  await test('2.6 GET /api/super-admin/mentors & POST provision_mentor via rewrite', async () => {
    resetSuperAdminRateLimitsForTesting()
    // GET mentors
    const { req: gReq, res: gRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=mentors',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(gReq, gRes)
    assert.strictEqual(gRes.getOutput().statusCode, 200)

    // Provision mentor
    const email = `mentor.sa.route.${Date.now()}@kalvilearn.test`
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/super-admin?__subpath=mentors',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'provision_mentor', email, name: 'Mentor SA Route', campusId: createdCampusId },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 201)
  })

  let saStudentId = ''
  await test('2.7 GET /api/super-admin/students (with query params) & POST enroll_student', async () => {
    resetSuperAdminRateLimitsForTesting()
    // GET students with pagination query params
    const { req: gReq, res: gRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=students&page=1&limit=15',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(gReq, gRes)
    const gOut = gRes.getOutput()
    assert.strictEqual(gOut.statusCode, 200)
    assert.ok(Array.isArray(gOut.data.data?.students || gOut.data.data))

    // Enroll student
    const email = `sa.student.route.${Date.now()}@kalvilearn.test`
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/super-admin?__subpath=students',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'enroll_student', email, name: 'SA Route Student', campusId: createdCampusId },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    saStudentId = out.data.data.studentId || out.data.data.id
  })

  await test('2.8 DELETE /api/super-admin/students?id=... (DELETE with rewrite)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'DELETE',
      url: `/api/super-admin?__subpath=students&studentId=${saStudentId}`,
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.success, true)
  })

  await test('2.9 GET /api/super-admin/roles & POST update_user_role via rewrite', async () => {
    resetSuperAdminRateLimitsForTesting()
    // GET roles
    const { req: gReq, res: gRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=roles',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(gReq, gRes)
    assert.strictEqual(gRes.getOutput().statusCode, 200)

    // Update user role
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/super-admin?__subpath=roles',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'update_user_role', userId: createdManagerId, newRole: 'MENTOR' },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 200)
  })

  await test('2.10 GET /api/super-admin/audit (audit logs listing)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=audit&limit=10',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.ok(Array.isArray(out.data.data?.logs || out.data.data))
  })

  await test('2.11 GET /api/super-admin/questions (with search query params)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=questions&search=sum&limit=5',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.ok(Array.isArray(out.data.data?.questions || out.data.data))
  })

  await test('2.12 GET /api/super-admin/curriculum (curriculum modules listing)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=curriculum',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const modules = out.data.data?.modules || out.data.data
    assert.ok(Array.isArray(modules))
    assert.strictEqual(modules.length, 10)
  })

  await test('2.13 GET /api/super-admin/belts (practice belts listing)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin?__subpath=belts',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const belts = out.data.data?.belts || out.data.data
    assert.ok(Array.isArray(belts))
    assert.strictEqual(belts.length, 10)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. SECURITY, RBAC & METHOD RESTRICTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  console.log('\n--- SECTION 3: Security Hardening & Method Verification ---')

  await test('3.1 Reject unsupported HTTP methods with 405 Method Not Allowed', async () => {
    resetCampusRateLimitsForTesting()
    const { req: pReq, res: pRes } = createMockReqRes({
      method: 'PATCH',
      url: '/api/campus/students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await campusHandler(pReq, pRes)
    assert.strictEqual(pRes.getOutput().statusCode, 405)

    resetCampusRateLimitsForTesting()
    const { req: uReq, res: uRes } = createMockReqRes({
      method: 'PUT',
      url: '/api/campus/students',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await campusHandler(uReq, uRes)
    assert.strictEqual(uRes.getOutput().statusCode, 405)
  })

  await test('3.2 CORS preflight OPTIONS returns 204 with correct headers', async () => {
    const { req, res } = createMockReqRes({
      method: 'OPTIONS',
      url: '/api/campus',
      headers: { origin: 'http://localhost:5174' },
    })
    await campusHandler(req, res)
    assert.strictEqual(res.statusCode, 204)
  })

  await test('3.3 Missing or invalid action returns 400 Invalid Action', async () => {
    resetCampusRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/campus',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
      body: { action: 'non_existent_action' },
    })
    await campusHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 400)
    assert.strictEqual(out.data.error, 'Invalid Action')
  })

  await test('3.4 Unauthenticated request returns 401 Unauthorized', async () => {
    resetCampusRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'GET',
      url: '/api/campus/students',
    })
    await campusHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 401)

    resetSuperAdminRateLimitsForTesting()
    const { req: sReq, res: sRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin/dashboard',
    })
    await superAdminHandler(sReq, sRes)
    assert.strictEqual(sRes.getOutput().statusCode, 401)
  })

  await test('3.5 Non-SuperAdmin caller on Super Admin API rejected with 403 Forbidden', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req: stuReq, res: stuRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin/dashboard',
      headers: { Authorization: STUDENT_TOKEN },
    })
    await superAdminHandler(stuReq, stuRes)
    assert.strictEqual(stuRes.getOutput().statusCode, 403)

    resetSuperAdminRateLimitsForTesting()
    const { req: mntReq, res: mntRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin/dashboard',
      headers: { Authorization: MENTOR_TOKEN },
    })
    await superAdminHandler(mntReq, mntRes)
    assert.strictEqual(mntRes.getOutput().statusCode, 403)

    resetSuperAdminRateLimitsForTesting()
    const { req: mgrReq, res: mgrRes } = createMockReqRes({
      method: 'GET',
      url: '/api/super-admin/dashboard',
      headers: { Authorization: CAMPUS_MANAGER_TOKEN },
    })
    await superAdminHandler(mgrReq, mgrRes)
    assert.strictEqual(mgrRes.getOutput().statusCode, 403)
  })

  await test('3.6 Mentor caller attempting student deletion rejected with 403 Forbidden', async () => {
    resetCampusRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'DELETE',
      url: '/api/campus/students?studentId=some-id',
      headers: { Authorization: MENTOR_TOKEN },
    })
    await campusHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 403)
    assert.ok(res.getOutput().data.message.includes('Campus Manager or Administrator privileges'))
  })

  await test('3.7 Hidden-test protection in question preview (zero leakage)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      method: 'POST',
      url: '/api/super-admin/questions',
      headers: { Authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'get_question_preview', id: 'mock-prob-1' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.hiddenTests, undefined)
    assert.ok(Array.isArray(out.data.data.visibleTestCases || out.data.data.testCases))
  })

  await test('3.8 Administrative audit logging records actions to admin_audit_logs', async () => {
    const logs = db.admin_audit_logs
    assert.ok(logs.length > 0, 'Audit log entries should have been recorded')
    const lastLog = logs[logs.length - 1]
    assert.strictEqual(lastLog.admin_email, 'sgjitbros@gmail.com')
    assert.strictEqual(lastLog.status, 'SUCCESS')
  })

  console.log('\n======================================================================')
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`)
  console.log('======================================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runSuite().catch((err) => {
  console.error('Fatal test runner crash:', err)
  process.exit(1)
})
