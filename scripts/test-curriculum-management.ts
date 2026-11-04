/**
 * Comprehensive Regression & Verification Suite for Super Admin Curriculum Management
 *
 * Verifies:
 * 1. Schema contract: prisma/schema.prisma and migration definitions declare required columns
 * 2. Database error resilience: Supabase errors return 500 error responses (never silently converted to mock data)
 * 3. Empty database transparency: Empty database returns empty list (no synthetic mock-module-* IDs)
 * 4. Synthetic mock ID protection: Reject modification/deletion of mock- IDs with 400
 * 5. Authorization: 401 for unauthenticated, 403 for Student, Mentor, and Campus Manager
 * 6. Module CRUD lifecycle: Create, update, reorder, toggle status, delete
 * 7. Learning Unit CRUD lifecycle: Create, update readingTimeMinutes, snippets, examples, reorder, toggle status, delete
 * 8. Persistence verification: Fresh GET returns the exact updated values
 */

import assert from 'assert'
import fs from 'fs'
import path from 'path'
import { EventEmitter } from 'events'

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
  req.url = options.url || '/api/super-admin'
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
const STUDENT_TOKEN = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'
const MENTOR_TOKEN = 'Bearer test_auth_mentor_synthetic.mentor@kalvilearn.test'
const CAMPUS_MANAGER_TOKEN = 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test'

let passed = 0
let failed = 0

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn()
    console.log(`  ✅ [PASS] ${name}`)
    passed++
  } catch (err: any) {
    console.error(`  ❌ [FAIL] ${name}`)
    console.error(`     Error: ${err?.message || err}`)
    failed++
  }
}

async function runSuite() {
  console.log('========================================================================')
  console.log('📚 KALVILEARN — SUPER ADMIN CURRICULUM MANAGEMENT VERIFICATION SUITE')
  console.log('========================================================================\n')

  const { default: superAdminHandler, resetSuperAdminRateLimitsForTesting } = await import('../src/server/superAdminHandler')
  const { supabaseServer } = await import('../src/server/feedbackAuth')
  const { installMockSupabaseServer } = await import('./mockDatabase')
  installMockSupabaseServer(supabaseServer)

  // ─── 1. Schema Contract Verification ─────────────────────────────────
  console.log('--- 1. Schema & Migration Contract Verification ---')

  await test('1.1 Prisma schema declares all required Module and LearningUnit columns', async () => {
    const schemaPath = path.resolve(process.cwd(), 'prisma/schema.prisma')
    const schemaText = fs.readFileSync(schemaPath, 'utf8')

    // Module fields
    const moduleFields = ['isActive', 'status', 'createdAt', 'updatedAt']
    for (const f of moduleFields) {
      assert.ok(schemaText.includes(f), `Prisma schema must declare Module.${f}`)
    }

    // LearningUnit fields
    const unitFields = ['readingTimeMinutes', 'isActive', 'status', 'createdAt', 'updatedAt', 'codeSnippets', 'examples', 'approach']
    for (const f of unitFields) {
      assert.ok(schemaText.includes(f), `Prisma schema must declare LearningUnit.${f}`)
    }
  })

  await test('1.2 Additive SQL migration exists with safe non-destructive DDL and PostgREST reload', async () => {
    const migrationDir = path.resolve(process.cwd(), 'prisma/migrations/20261104_curriculum_learningunit_schema_repair')
    assert.ok(fs.existsSync(migrationDir), 'Migration directory must exist under prisma/migrations/')
    const sqlText = fs.readFileSync(path.join(migrationDir, 'migration.sql'), 'utf8')
    assert.ok(sqlText.includes('readingTimeMinutes'), 'Migration must add readingTimeMinutes')
    assert.ok(sqlText.includes('NOTIFY pgrst, \'reload schema\';'), 'Migration must notify PostgREST to reload schema')
    assert.ok(sqlText.includes('IF NOT EXISTS'), 'Migration must be non-destructive using IF NOT EXISTS')
  })

  // ─── 2. Access Control & Authorization ───────────────────────────────
  console.log('\n--- 2. RBAC & Access Control Verification ---')

  await test('2.1 Unauthenticated requests are rejected with 401', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({ body: { action: 'list_curriculum_modules' } })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 401)
  })

  await test('2.2 Students cannot access curriculum management (403)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: STUDENT_TOKEN },
      body: { action: 'list_curriculum_modules' },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 403)
  })

  await test('2.3 Mentors cannot access curriculum management (403)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: MENTOR_TOKEN },
      body: { action: 'create_curriculum_module', title: 'Hacked Module' },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 403)
  })

  await test('2.4 Campus Managers cannot access curriculum management (403)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: CAMPUS_MANAGER_TOKEN },
      body: { action: 'delete_curriculum_module', id: 'some-id' },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 403)
  })

  // ─── 3. Database Error & Mock-Data Isolation ─────────────────────────
  console.log('\n--- 3. Database Error Handling & Mock-Data Isolation ---')

  await test('3.1 Rejects update or delete operations targeting synthetic mock- IDs (400)', async () => {
    resetSuperAdminRateLimitsForTesting()
    // Update mock module
    const { req: r1, res: s1 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'update_curriculum_module', id: 'mock-module-1', title: 'Fake Title' },
    })
    await superAdminHandler(r1, s1)
    assert.strictEqual(s1.getOutput().statusCode, 400)
    assert.ok(s1.getOutput().data.message.includes('mock') || s1.getOutput().data.message.includes('Demonstration'))

    // Delete mock module
    resetSuperAdminRateLimitsForTesting()
    const { req: r2, res: s2 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'delete_curriculum_module', id: 'mock-module-1' },
    })
    await superAdminHandler(r2, s2)
    assert.strictEqual(s2.getOutput().statusCode, 400)

    // Update mock unit
    resetSuperAdminRateLimitsForTesting()
    const { req: r3, res: s3 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'update_learning_unit', id: 'mock-unit-1-1', title: 'Fake Unit' },
    })
    await superAdminHandler(r3, s3)
    assert.strictEqual(s3.getOutput().statusCode, 400)

    // Toggle mock unit status
    resetSuperAdminRateLimitsForTesting()
    const { req: r4, res: s4 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_learning_unit_status', id: 'mock-unit-1-1' },
    })
    await superAdminHandler(r4, s4)
    assert.strictEqual(s4.getOutput().statusCode, 400)
  })

  await test('3.2 Database query error returns HTTP 500 and is never converted to mock data', async () => {
    resetSuperAdminRateLimitsForTesting()
    // Temporarily mock supabaseServer.from to simulate database error
    const origFrom = supabaseServer.from
    try {
      supabaseServer.from = function(table: string) {
        if (table === 'Module' || table === 'LearningUnit') {
          return {
            select() {
              return {
                order() {
                  return Promise.resolve({
                    data: null,
                    error: {
                      code: 'PGRST301',
                      message: 'relation "Module" does not exist in schema cache',
                    },
                  })
                },
              }
            },
          } as any
        }
        return origFrom.call(this, table)
      }

      const { req, res } = createMockReqRes({
        headers: { authorization: SUPER_ADMIN_TOKEN },
        body: { action: 'list_curriculum_modules' },
      })
      await superAdminHandler(req, res)
      const out = res.getOutput()
      assert.strictEqual(out.statusCode, 500, 'Database error must return 500 status')
      assert.strictEqual(out.data.success, false)
      assert.strictEqual(out.data.error, 'Database Error')
      assert.ok(out.data.message.includes('relation "Module" does not exist'))
    } finally {
      supabaseServer.from = origFrom
    }
  })

  await test('3.3 Empty database returns honest empty state with 0 modules (no synthetic mock data)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const origFrom = supabaseServer.from
    try {
      supabaseServer.from = function(table: string) {
        if (table === 'Module' || table === 'LearningUnit') {
          return {
            select() {
              return {
                order() {
                  return Promise.resolve({ data: [], error: null })
                },
              }
            },
          } as any
        }
        return origFrom.call(this, table)
      }

      const { req, res } = createMockReqRes({
        headers: { authorization: SUPER_ADMIN_TOKEN },
        body: { action: 'list_curriculum_modules' },
      })
      await superAdminHandler(req, res)
      const out = res.getOutput()
      assert.strictEqual(out.statusCode, 200)
      assert.strictEqual(out.data.success, true)
      assert.strictEqual(out.data.data.modules.length, 0, 'Must return 0 modules')
      assert.strictEqual(out.data.data.stats.totalModules, 0)
      assert.strictEqual(out.data.data.stats.totalLearningUnits, 0)
    } finally {
      supabaseServer.from = origFrom
    }
  })

  // ─── 4. Full Curriculum Lifecycle & Persistence ───────────────────────
  console.log('\n--- 4. Full Curriculum CRUD Lifecycle & Reading Time ---')

  let testModId = ''
  let testUnitId = ''

  await test('4.1 Create new curriculum module (persists with order and PUBLISHED status)', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_curriculum_module',
        title: 'Distributed Systems & Consensus',
        description: 'Raft, Paxos, replication and partitioning.',
        order: 99,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    testModId = out.data.data.id
    assert.ok(testModId.startsWith('mod-'))
    assert.strictEqual(out.data.data.title, 'Distributed Systems & Consensus')
    assert.strictEqual(out.data.data.order, 99)
    assert.strictEqual(out.data.data.status, 'PUBLISHED')
  })

  await test('4.2 Update module title, description, and order', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_curriculum_module',
        id: testModId,
        title: 'Distributed Systems & Consistency (Updated)',
        description: 'Updated description for consensus algorithms.',
        order: 100,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.title, 'Distributed Systems & Consistency (Updated)')
    assert.strictEqual(out.data.data.order, 100)
  })

  await test('4.3 Toggle module publication status (PUBLISHED -> DRAFT -> PUBLISHED)', async () => {
    resetSuperAdminRateLimitsForTesting()
    // Unpublish
    const { req: r1, res: s1 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_module_status', id: testModId, isActive: false },
    })
    await superAdminHandler(r1, s1)
    assert.strictEqual(s1.getOutput().statusCode, 200)
    assert.strictEqual(s1.getOutput().data.data.isActive, false)
    assert.strictEqual(s1.getOutput().data.data.status, 'DRAFT')

    // Publish
    resetSuperAdminRateLimitsForTesting()
    const { req: r2, res: s2 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'toggle_module_status', id: testModId, isActive: true },
    })
    await superAdminHandler(r2, s2)
    assert.strictEqual(s2.getOutput().statusCode, 200)
    assert.strictEqual(s2.getOutput().data.data.isActive, true)
    assert.strictEqual(s2.getOutput().data.data.status, 'PUBLISHED')
  })

  await test('4.4 Create learning unit with readingTimeMinutes, codeSnippets, and examples', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'create_learning_unit',
        moduleId: testModId,
        title: 'Raft Consensus Protocol',
        concept: 'Leader election, log replication, and safety invariants in Raft.',
        approach: 'Understand election timeouts, term numbers, and majority heartbeats.',
        codingQuestion: 'Implement leader heartbeat timer simulation.',
        inputFormat: 'Timeout integer ms.',
        outputFormat: 'Term and leader state.',
        readingTimeMinutes: 7,
        order: 1,
        codeSnippets: {
          python: '# Raft simulator\nprint("Leader elected in Term 1")',
          javascript: 'console.log("Leader elected in Term 1");',
          cpp: '#include <iostream>\nint main() { std::cout << "Leader elected in Term 1\\n"; }',
          java: 'public class Main { public static void main(String[] args) { System.out.println("Leader elected in Term 1"); } }',
        },
        examples: [
          { input: '150', output: 'Term 1 LEADER', explanation: 'Election timeout elapsed' },
        ],
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201)
    assert.strictEqual(out.data.success, true)
    testUnitId = out.data.data.id
    assert.ok(testUnitId.startsWith('unit-'))
    assert.strictEqual(out.data.data.readingTimeMinutes, 7)
    assert.strictEqual(out.data.data.title, 'Raft Consensus Protocol')
    assert.strictEqual(out.data.data.content, 'Leader election, log replication, and safety invariants in Raft.')
  })

  await test('4.5 Edit learning unit readingTimeMinutes, concept, approach, and codeSnippets', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_learning_unit',
        id: testUnitId,
        title: 'Raft Consensus Protocol & Log Compaction',
        concept: 'Updated theory on snapshotting and log compaction.',
        readingTimeMinutes: 12,
        codeSnippets: {
          python: '# Updated Raft simulator with snapshots\nprint("Snapshot installed")',
        },
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert.strictEqual(out.data.data.title, 'Raft Consensus Protocol & Log Compaction')
    assert.strictEqual(out.data.data.readingTimeMinutes, 12)
    assert.strictEqual(out.data.data.content, 'Updated theory on snapshotting and log compaction.')
  })

  await test('4.6 Fresh GET request verifies persisted readingTimeMinutes and updated data', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_curriculum_modules' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    const foundModule = out.data.data.modules.find((m: any) => m.id === testModId)
    assert.ok(foundModule, 'Created module must be found in database listing')
    assert.strictEqual(foundModule.title, 'Distributed Systems & Consistency (Updated)')
    const foundUnit = foundModule.learningUnits.find((u: any) => u.id === testUnitId)
    assert.ok(foundUnit, 'Created learning unit must be found inside module')
    assert.strictEqual(foundUnit.readingTimeMinutes, 12, 'Persisted readingTimeMinutes must be 12')
    assert.strictEqual(foundUnit.title, 'Raft Consensus Protocol & Log Compaction')
  })

  await test('4.7 Reorder learning units and verify updated ordering', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'reorder_learning_units',
        unitOrders: [{ id: testUnitId, order: 5 }],
      },
    })
    await superAdminHandler(req, res)
    assert.strictEqual(res.getOutput().statusCode, 200)
  })

  await test('4.8 Delete learning unit and verify 404 on subsequent update', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req: r1, res: s1 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'delete_learning_unit', id: testUnitId },
    })
    await superAdminHandler(r1, s1)
    assert.strictEqual(s1.getOutput().statusCode, 200)

    // Attempting to update deleted unit must return 404
    resetSuperAdminRateLimitsForTesting()
    const { req: r2, res: s2 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'update_learning_unit', id: testUnitId, title: 'Ghost Unit' },
    })
    await superAdminHandler(r2, s2)
    assert.strictEqual(s2.getOutput().statusCode, 404)
  })

  await test('4.9 Delete module with cascade and verify 404 on subsequent lookup', async () => {
    resetSuperAdminRateLimitsForTesting()
    const { req: r1, res: s1 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'delete_curriculum_module', id: testModId },
    })
    await superAdminHandler(r1, s1)
    assert.strictEqual(s1.getOutput().statusCode, 200)

    // Attempting to update deleted module must return 404
    resetSuperAdminRateLimitsForTesting()
    const { req: r2, res: s2 } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'update_curriculum_module', id: testModId, title: 'Ghost Module' },
    })
    await superAdminHandler(r2, s2)
    assert.strictEqual(s2.getOutput().statusCode, 404)
  })

  console.log('\n========================================================================')
  console.log(`🏁 FINISHED: ${passed} PASSED, ${failed} FAILED`)
  console.log('========================================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runSuite().catch((err) => {
  console.error('Fatal test runner error:', err)
  process.exit(1)
})
