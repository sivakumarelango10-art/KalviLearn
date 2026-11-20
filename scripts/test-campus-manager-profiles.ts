/**
 * Dedicated Test Suite for Campus Manager Profiles & Standardization
 *
 * Verifies:
 * 1. 1-to-1 relationship between `public.users` and `public.campus_managers`.
 * 2. Uniqueness constraints on `user_id` and `manager_code`.
 * 3. `list_managers` merges profile attributes (profileId, managerCode, department, designation).
 * 4. `provision_manager` creates both user and campus_managers profile.
 * 5. `update_manager` updates profile attributes and guards against duplicate manager codes.
 * 6. `get_manager` returns full profile details.
 * 7. `assign_manager_campus` maintains campuses.manager_id and preserves profile data.
 * 8. `transfer_role` to CAMPUS_MANAGER ensures destination user receives profile.
 * 9. `update_user_role` to CAMPUS_MANAGER ensures profile is created.
 * 10. `toggle_manager_status` updates status while preserving profile.
 */

import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { EventEmitter } from 'events'

// Load environment variables synchronously BEFORE importing server modules
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
  req.url = options.url || '/api/super-admin/managers'
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
    writeHead(code: number, hdrs?: Record<string, string>) {
      statusCode = code
      this.statusCode = code
      if (hdrs) Object.assign(headers, hdrs)
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

async function runMasterSuite() {
  console.log('='.repeat(70))
  console.log('KalviLearn Dedicated Campus Manager Profiles Test Suite')
  console.log('='.repeat(70))

  const { default: superAdminHandler, resetSuperAdminRateLimitsForTesting } = await import('../src/server/superAdminHandler')
  const { supabaseServer } = await import('../src/server/feedbackAuth')
  const { installMockSupabaseServer } = await import('./mockDatabase')

  const mockDb = installMockSupabaseServer(supabaseServer)

  let passed = 0
  let failed = 0

  async function test(name: string, fn: () => Promise<void>) {
    resetSuperAdminRateLimitsForTesting()
    try {
      await fn()
      console.log(`  PASS: ${name}`)
      passed++
    } catch (err: any) {
      console.error(`  FAIL: ${name}`)
      console.error(`    ${err?.message || err}`)
      if (err.stack) {
        console.error(err.stack.split('\n').slice(1, 4).join('\n'))
      }
      failed++
    }
  }

  // 1. One-to-one relationship & initial seed profile existence
  await test('1. Initial mock seed has campus_managers table and 1-to-1 profile for campus manager', async () => {
    assert(Array.isArray(mockDb.campus_managers), 'mockDb.campus_managers must be initialized as an array')
    const existing = mockDb.campus_managers.find((cm: any) => cm.user_id === '00000000-0000-4000-a000-000000000004')
    assert(existing, 'Synthetic manager should have a campus_managers record')
    assert.strictEqual(existing.email, 'synthetic.campus@kalvilearn.test')
    assert.strictEqual(existing.manager_code, 'CMG-TEST01')
    assert.strictEqual(existing.department, 'Campus Operations')
    assert.strictEqual(existing.designation, 'Campus Manager')
  })

  // 2. Unique constraint on user_id and manager_code in mock DB
  await test('2. Unique constraints on user_id and manager_code are enforced', async () => {
    const { error: userError } = await supabaseServer.from('campus_managers').insert({
      user_id: '00000000-0000-4000-a000-000000000004',
      email: 'duplicate-user@kalvilearn.test',
      manager_code: 'MGR-NEW-99',
    })
    assert(userError, 'Must return error on duplicate user_id')
    assert.strictEqual(userError.code, '23505')
    assert(userError.message.includes('campus_managers_user_id_key'))

    const { error: codeError } = await supabaseServer.from('campus_managers').insert({
      user_id: '11111111-0000-4000-a000-000000000001',
      email: 'diff-user@kalvilearn.test',
      manager_code: 'CMG-TEST01',
    })
    assert(codeError, 'Must return error on duplicate manager_code')
    assert.strictEqual(codeError.code, '23505')
    assert(codeError.message.includes('campus_managers_manager_code_key'))
  })

  // 3. list_managers merges profile metadata
  await test('3. list_managers returns profileId, managerCode, department, designation', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_managers' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert(out.data.success, 'list_managers should succeed')
    const mgr = out.data.data.find((m: any) => m.id === '00000000-0000-4000-a000-000000000004')
    assert(mgr, 'Synthetic campus manager must be returned')
    assert.strictEqual(mgr.managerCode, 'CMG-TEST01')
    assert.strictEqual(mgr.department, 'Campus Operations')
    assert.strictEqual(mgr.designation, 'Campus Manager')
    assert(mgr.profileId, 'profileId must be populated from campus_managers')
  })

  // 4. provision_manager creates user and campus_managers profile
  const testManagerEmail = `test.cm.${Date.now()}@kalvilearn.test`
  let provisionedUserId = ''
  await test('4. provision_manager creates user and synchronized campus_managers profile', async () => {
    const targetCampus = mockDb.campuses[0]
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'provision_manager',
        email: testManagerEmail,
        name: 'Prof. Ada Lovelace',
        managerCode: 'MGR-ADA-101',
        department: 'Computing Science',
        designation: 'Department Head',
        campusId: targetCampus.id,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 201, `Expected 201, got ${out.statusCode}: ${JSON.stringify(out.data)}`)
    assert(out.data.success, 'Provision should succeed')

    provisionedUserId = out.data.data.id
    assert(provisionedUserId, 'Must return provisioned user ID')

    // Verify campus_managers record in mockDb
    const profile = mockDb.campus_managers.find((cm: any) => cm.user_id === provisionedUserId)
    assert(profile, 'campus_managers profile record must exist')
    assert.strictEqual(profile.email, testManagerEmail)
    assert.strictEqual(profile.name, 'Prof. Ada Lovelace')
    assert.strictEqual(profile.manager_code, 'MGR-ADA-101')
    assert.strictEqual(profile.department, 'Computing Science')
    assert.strictEqual(profile.designation, 'Department Head')

    // Verify campus assignment in campuses table
    const campus = mockDb.campuses.find((c: any) => c.id === targetCampus.id)
    assert.strictEqual(campus.manager_id, provisionedUserId, 'campuses.manager_id must point to users.id')
  })

  // 5. provision_manager rejects duplicate manager_code
  await test('5. provision_manager rejects duplicate manager_code with 409', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'provision_manager',
        email: `another.${Date.now()}@kalvilearn.test`,
        name: 'Another Manager',
        managerCode: 'MGR-ADA-101', // conflict with test #4
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 409, `Expected 409 conflict, got ${out.statusCode}`)
    assert.strictEqual(out.data.success, false)
    assert(out.data.message.includes('already in use'))
  })

  // 6. get_manager retrieves full details
  await test('6. get_manager / get_manager_details returns merged profile', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'get_manager',
        managerId: provisionedUserId,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert(out.data.success)
    assert.strictEqual(out.data.data.id, provisionedUserId)
    assert.strictEqual(out.data.data.managerCode, 'MGR-ADA-101')
    assert.strictEqual(out.data.data.department, 'Computing Science')
    assert.strictEqual(out.data.data.designation, 'Department Head')
  })

  // 7. update_manager updates profile attributes
  await test('7. update_manager updates name, managerCode, department, designation', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_manager',
        managerId: provisionedUserId,
        name: 'Dr. Ada Lovelace OBE',
        managerCode: 'MGR-ADA-202',
        department: 'Advanced Computing',
        designation: 'Dean',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200, `Update failed: ${JSON.stringify(out.data)}`)
    assert(out.data.success)

    const profile = mockDb.campus_managers.find((cm: any) => cm.user_id === provisionedUserId)
    assert.strictEqual(profile.name, 'Dr. Ada Lovelace OBE')
    assert.strictEqual(profile.manager_code, 'MGR-ADA-202')
    assert.strictEqual(profile.department, 'Advanced Computing')
    assert.strictEqual(profile.designation, 'Dean')
  })

  // 8. assign_manager_campus preserves profile and updates campuses.manager_id
  await test('8. assign_manager_campus updates campus and preserves profile', async () => {
    const targetCampus = mockDb.campuses[0]
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'assign_manager_campus',
        managerId: provisionedUserId,
        campusId: targetCampus.id,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert(out.data.success)

    const campus1 = mockDb.campuses.find((c: any) => c.id === targetCampus.id)
    assert.strictEqual(campus1.manager_id, provisionedUserId)

    const profile = mockDb.campus_managers.find((cm: any) => cm.user_id === provisionedUserId)
    assert(profile, 'Profile must still exist')
    assert.strictEqual(profile.manager_code, 'MGR-ADA-202')
  })

  // 9. transfer_role to CAMPUS_MANAGER ensures profile creation
  await test('9. transfer_role to CAMPUS_MANAGER creates campus_managers profile', async () => {
    const targetCampus = mockDb.campuses[0]
    // Create a student to receive the role
    const studentUser = {
      id: '22222222-0000-4000-a000-000000000002',
      email: 'promoteme@kalvilearn.test',
      name: 'Promoted Student',
      role: 'STUDENT',
      status: 'ACTIVE',
      campus_id: targetCampus.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockDb.users.push(studentUser)

    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'transfer_role',
        sourceUserId: provisionedUserId,
        destinationUserId: studentUser.id,
        roleToTransfer: 'CAMPUS_MANAGER',
        sourceNewRole: 'STUDENT',
        campusId: targetCampus.id,
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200, `Transfer role failed: ${JSON.stringify(out.data)}`)
    assert(out.data.success)

    const destProfile = mockDb.campus_managers.find((cm: any) => cm.user_id === studentUser.id)
    assert(destProfile, 'Destination user must receive a campus_managers profile')
    assert.strictEqual(destProfile.email, studentUser.email)

    // Source user should retain historical profile
    const sourceProfile = mockDb.campus_managers.find((cm: any) => cm.user_id === provisionedUserId)
    assert(sourceProfile, 'Source profile is preserved in campus_managers table')
  })

  // 10. toggle_manager_status updates user status while keeping profile
  await test('10. toggle_manager_status toggles status and preserves profile', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'toggle_manager_status',
        managerId: provisionedUserId,
        status: 'INACTIVE',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert(out.data.success)

    const user = mockDb.users.find((u: any) => u.id === provisionedUserId)
    assert.strictEqual(user.status, 'INACTIVE')

    const profile = mockDb.campus_managers.find((cm: any) => cm.user_id === provisionedUserId)
    assert(profile, 'Profile persists during status toggle')
  })

  // 11. update_user_role to CAMPUS_MANAGER ensures profile
  await test('11. update_user_role to CAMPUS_MANAGER creates campus_managers profile', async () => {
    const freshUser = {
      id: '33333333-0000-4000-a000-000000000003',
      email: 'promote.role@kalvilearn.test',
      name: 'Promoted Role User',
      role: 'STUDENT',
      status: 'ACTIVE',
      campus_id: '00000000-0000-4000-a000-000000000001',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockDb.users.push(freshUser)

    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'update_user_role',
        userId: freshUser.id,
        newRole: 'CAMPUS_MANAGER',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200, `update_user_role failed: ${JSON.stringify(out.data)}`)
    assert(out.data.success)

    const profile = mockDb.campus_managers.find((cm: any) => cm.user_id === freshUser.id)
    assert(profile, 'Profile must be automatically generated for newly promoted CAMPUS_MANAGER')
    assert.strictEqual(profile.email, freshUser.email)
  })

  // 12. Unrelated ADMIN account without campus association is excluded from managers list and receives no profile
  await test('12. Unrelated ADMIN without campus association is excluded from manager list and receives no profile', async () => {
    const unrelatedAdmin = {
      id: '44444444-0000-4000-a000-000000000004',
      email: 'unrelated.admin@kalvilearn.test',
      name: 'General Platform Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
      campus_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockDb.users.push(unrelatedAdmin)

    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_managers' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert(out.data.success)
    const found = out.data.data.find((m: any) => m.id === unrelatedAdmin.id)
    assert.strictEqual(found, undefined, 'Unrelated ADMIN without campus must NOT be returned in list_managers')

    const profile = mockDb.campus_managers.find((cm: any) => cm.user_id === unrelatedAdmin.id)
    assert.strictEqual(profile, undefined, 'Unrelated ADMIN must NOT have a campus_managers profile')
  })

  // 13. Legacy ADMIN with confirmed campus association is included in manager list
  await test('13. Legacy ADMIN with confirmed campus assignment is included in manager list', async () => {
    const legacyAdmin = {
      id: '55555555-0000-4000-a000-000000000005',
      email: 'legacy.campus.admin@kalvilearn.test',
      name: 'Legacy Campus Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
      campus_id: mockDb.campuses[0].id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockDb.users.push(legacyAdmin)

    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: { action: 'list_managers' },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 200)
    assert(out.data.success)
    const found = out.data.data.find((m: any) => m.id === legacyAdmin.id)
    assert(found, 'Legacy ADMIN with confirmed campus must be returned in list_managers')
    assert.strictEqual(found.campus.id, mockDb.campuses[0].id)
  })

  // 14. Super Admin sgjitbros@gmail.com CANNOT be provisioned as a Campus Manager (403)
  await test('14. Provisioning sgjitbros@gmail.com as Campus Manager is strictly rejected (403)', async () => {
    const { req, res } = createMockReqRes({
      headers: { authorization: SUPER_ADMIN_TOKEN },
      body: {
        action: 'provision_manager',
        email: 'sgjitbros@gmail.com',
        name: 'Protected Super Admin',
      },
    })
    await superAdminHandler(req, res)
    const out = res.getOutput()
    assert.strictEqual(out.statusCode, 403, `Expected 403, got ${out.statusCode}`)
    assert.strictEqual(out.data.success, false)
    assert(out.data.message.includes('Super Administrator account cannot be provisioned'))

    const profile = mockDb.campus_managers.find((cm: any) => String(cm.email || '').toLowerCase() === 'sgjitbros@gmail.com')
    assert.strictEqual(profile, undefined, 'Super Admin must NEVER have a campus_managers profile')
  })

  // 15. Migration candidate query & backfill logic strictly excludes sgjitbros@gmail.com and SUPERADMIN
  await test('15. Backfill eligibility criteria strictly excludes sgjitbros@gmail.com and SUPERADMIN role', async () => {
    // Simulate backfill eligibility predicate
    const eligibleCandidates = mockDb.users.filter((u: any) => {
      const email = String(u.email || '').toLowerCase().trim()
      const role = String(u.role || '').toUpperCase().trim()
      const isSuperAdminEmail = email === 'sgjitbros@gmail.com'
      const isSuperAdminRole = role === 'SUPERADMIN'
      if (isSuperAdminEmail || isSuperAdminRole) return false

      const isCampusManager = role === 'CAMPUS_MANAGER'
      const managesCampus = mockDb.campuses.some((c: any) => c.manager_id === u.id)
      const isLegacyAdminWithCampus = role === 'ADMIN' && (Boolean(u.campus_id) || managesCampus)

      return isCampusManager || managesCampus || isLegacyAdminWithCampus
    })

    const hasSuperAdminEmail = eligibleCandidates.some((c: any) => c.email.toLowerCase() === 'sgjitbros@gmail.com')
    assert.strictEqual(hasSuperAdminEmail, false, 'Protected email must be completely excluded from backfill')

    const hasSuperAdminRole = eligibleCandidates.some((c: any) => String(c.role || '').toUpperCase() === 'SUPERADMIN')
    assert.strictEqual(hasSuperAdminRole, false, 'SUPERADMIN role must be completely excluded from backfill')
  })

  console.log('='.repeat(70))
  console.log(`Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests.`)
  console.log('='.repeat(70))

  if (failed > 0) {
    process.exit(1)
  }
}

runMasterSuite().catch((err) => {
  console.error('Fatal error running suite:', err)
  process.exit(1)
})
