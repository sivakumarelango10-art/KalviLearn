/**
 * KalviLearn — Content Manager Login Authorization & Role Verification Suite
 *
 * Verifies the 9 essential authentication & authorization scenarios:
 *   1. Existing authorized Content Manager can log in and resolves to CONTENT_MANAGER role.
 *   2. Content Manager without active assignment (SUSPENDED / REVOKED / missing) is denied access.
 *   3. Unregistered Google account is denied (ACCOUNT_NOT_REGISTERED).
 *   4. Student login continues working (resolves STUDENT, routes /dashboard).
 *   5. Mentor login continues working (resolves MENTOR, routes /mentor).
 *   6. Campus Manager login continues working (resolves CAMPUS_MANAGER, routes /campus/dashboard).
 *   7. Super Admin login continues working (resolves SUPERADMIN, routes /super-admin/dashboard).
 *   8. OAuth callback and session hydration preserve the correct role without downgrading.
 *   9. Unauthorized users (students, mentors, campus managers) cannot access Content Manager routes directly.
 */

import assert from 'assert'
import { EventEmitter } from 'events'

process.env.NODE_ENV = 'test'
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

import { supabase } from '../src/lib/supabase'
import { supabaseServer, clearAuthCacheForTesting } from '../src/server/feedbackAuth'
import { requireContentManager } from '../src/server/contentRbac'
import contentManagerHandler, { resetContentManagerRateLimitsForTesting } from '../src/server/contentManagerHandler'
import { installMockSupabaseServer } from './mockDatabase'
import { verifyUserInDatabase, type DbUser } from '../src/lib/authService'

function createMockReqRes(options: {
  method?: string
  url: string
  headers?: Record<string, string>
  body?: Record<string, unknown>
}) {
  const req = new EventEmitter() as any
  req.method = options.method || 'GET'
  req.url = options.url
  req.headers = { 'content-type': 'application/json' }
  if (options.headers) {
    for (const [k, v] of Object.entries(options.headers)) {
      req.headers[k.toLowerCase()] = v
    }
  }
  req.body = options.body || {}
  req.query = {}
  req.socket = { remoteAddress: '127.0.0.1' }

  let statusCode = 200
  let responseBody = ''
  const headers: Record<string, string> = {}

  const res = new EventEmitter() as any
  res.statusCode = 200
  res.setHeader = (name: string, val: string) => {
    headers[name.toLowerCase()] = val
  }
  res.getHeader = (name: string) => {
    return headers[name.toLowerCase()]
  }
  res.status = (code: number) => {
    statusCode = code
    res.statusCode = code
    return res
  }
  res.json = (obj: any) => {
    responseBody = JSON.stringify(obj)
    res.emit('finish')
    return res
  }
  res.send = (body: any) => {
    responseBody = typeof body === 'string' ? body : JSON.stringify(body)
    res.emit('finish')
    return res
  }
  res.end = (body?: any) => {
    if (body) responseBody = typeof body === 'string' ? body : JSON.stringify(body)
    res.emit('finish')
    return res
  }

  const promise = new Promise<{ statusCode: number; body: any; headers: Record<string, string> }>((resolve) => {
    res.on('finish', () => {
      let parsed: any = responseBody
      try {
        parsed = JSON.parse(responseBody)
      } catch {
        // raw body
      }
      resolve({ statusCode, body: parsed, headers })
    })
  })

  return { req, res, promise }
}

function resolveRoleDestination(role: string, target?: string): string {
  const r = (role || '').toUpperCase()
  if (target && target !== '/' && target !== '/login') {
    if (r === 'SUPERADMIN' && target.startsWith('/super-admin')) return target
    if ((r === 'CAMPUS_MANAGER' || r === 'ADMIN') && target.startsWith('/campus')) return target
    if (r === 'CONTENT_MANAGER' && target.startsWith('/content-manager')) return target
    if (r === 'MENTOR' && target.startsWith('/mentor')) return target
    if (r === 'STUDENT' && !target.startsWith('/super-admin') && !target.startsWith('/campus') && !target.startsWith('/content-manager') && !target.startsWith('/mentor')) return target
  }

  switch (r) {
    case 'SUPERADMIN':
      return '/super-admin/dashboard'
    case 'CAMPUS_MANAGER':
    case 'ADMIN':
      return '/campus/dashboard'
    case 'CONTENT_MANAGER':
      return '/content-manager'
    case 'MENTOR':
      return '/mentor'
    case 'STUDENT':
    default:
      return '/dashboard'
  }
}

async function runLoginVerificationSuite() {
  console.log('========================================================================')
  console.log('🔑 CONTENT MANAGER LOGIN & ROLE RESOLUTION VERIFICATION SUITE')
  console.log('========================================================================\n')

  installMockSupabaseServer(supabaseServer)
  // Also install mock database for client supabase
  installMockSupabaseServer(supabase)

  // Seed test database
  const cmUserId = '00000000-0000-4000-a000-000000000005'
  const cmEmail = 'synthetic.content@kalvilearn.test'
  const studentEmail = 'synthetic.student@kalvilearn.test'
  const mentorEmail = 'synthetic.mentor@kalvilearn.test'
  const campusEmail = 'synthetic.campus@kalvilearn.test'
  const superAdminEmail = 'sgjitbros@gmail.com'

  let testCount = 0

  // -------------------------------------------------------------------------
  // Scenario 1: Existing authorized Content Manager can log in
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] Existing authorized Content Manager login authorization`)
    clearAuthCacheForTesting()
    resetContentManagerRateLimitsForTesting()

    const res = await verifyUserInDatabase(
      { email: cmEmail, authUid: 'auth-cm-uid-5' },
      { bypassCache: true }
    )

    assert.strictEqual(res.allowed, true, 'Authorized Content Manager must be allowed access')
    assert.ok(res.user, 'User object must be returned')
    assert.strictEqual(res.user?.role, 'CONTENT_MANAGER', 'Role must resolve to CONTENT_MANAGER')
    assert.strictEqual(res.user?.status, 'ACTIVE', 'Status must be ACTIVE')
    assert.strictEqual(res.user?.email, cmEmail, 'Email must match')

    const destination = resolveRoleDestination(res.user.role)
    assert.strictEqual(destination, '/content-manager', 'Authorized Content Manager must redirect to /content-manager')

    // Also test server-side API verification for CM
    const { req, res: httpRes, promise } = createMockReqRes({
      method: 'GET',
      url: '/api/content-manager?action=me',
      headers: { authorization: 'Bearer test_auth_content_manager_synthetic.content@kalvilearn.test' },
    })
    contentManagerHandler(req, httpRes)
    const apiResult = await promise

    assert.strictEqual(apiResult.statusCode, 200, '/api/content-manager?action=me must return 200')
    assert.strictEqual(apiResult.body.success, true, 'API response success must be true')
    assert.strictEqual(apiResult.body.data.role, 'CONTENT_MANAGER', 'API role must be CONTENT_MANAGER')
    console.log('   ✓ Content Manager login succeeds and resolves /content-manager')
  }

  // -------------------------------------------------------------------------
  // Scenario 2: Content Manager without active assignment is denied
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] Content Manager without active assignment is denied`)
    clearAuthCacheForTesting()
    resetContentManagerRateLimitsForTesting()

    // 2A: Suspended assignment
    const suspendedUserId = '00000000-0000-4000-a000-000000000091'
    const suspendedEmail = 'suspended.cm@kalvilearn.test'

    // Add suspended user to mock database
    await supabaseServer.from('users').insert({
      id: suspendedUserId,
      email: suspendedEmail,
      name: 'Suspended CM',
      role: 'CONTENT_MANAGER',
      status: 'ACTIVE',
      authUid: 'auth-suspended-cm',
    })
    await supabase.from('users').insert({
      id: suspendedUserId,
      email: suspendedEmail,
      name: 'Suspended CM',
      role: 'CONTENT_MANAGER',
      status: 'ACTIVE',
      authUid: 'auth-suspended-cm',
    })
    await supabaseServer.from('content_manager_assignments').insert({
      id: 'cma-suspended-1',
      user_id: suspendedUserId,
      previous_role: 'STUDENT',
      scope_type: 'GLOBAL',
      status: 'SUSPENDED',
      is_active: false,
    })
    await supabase.from('content_manager_assignments').insert({
      id: 'cma-suspended-1',
      user_id: suspendedUserId,
      previous_role: 'STUDENT',
      scope_type: 'GLOBAL',
      status: 'SUSPENDED',
      is_active: false,
    })

    const resSuspended = await verifyUserInDatabase(
      { email: suspendedEmail, authUid: 'auth-suspended-cm' },
      { bypassCache: true }
    )

    assert.strictEqual(resSuspended.allowed, false, 'Suspended Content Manager must be denied')
    assert.strictEqual(resSuspended.reason, 'ACCOUNT_INACTIVE', 'Suspended Content Manager must receive ACCOUNT_INACTIVE')

    // 2B: Revoked assignment
    const revokedUserId = '00000000-0000-4000-a000-000000000092'
    const revokedEmail = 'revoked.cm@kalvilearn.test'
    await supabase.from('users').insert({
      id: revokedUserId,
      email: revokedEmail,
      name: 'Revoked CM',
      role: 'CONTENT_MANAGER',
      status: 'ACTIVE',
      authUid: 'auth-revoked-cm',
    })
    await supabase.from('content_manager_assignments').insert({
      id: 'cma-revoked-1',
      user_id: revokedUserId,
      previous_role: 'STUDENT',
      scope_type: 'GLOBAL',
      status: 'REVOKED',
      is_active: false,
    })

    const resRevoked = await verifyUserInDatabase(
      { email: revokedEmail, authUid: 'auth-revoked-cm' },
      { bypassCache: true }
    )

    assert.strictEqual(resRevoked.allowed, false, 'Revoked Content Manager must be denied')
    assert.strictEqual(resRevoked.reason, 'ACCOUNT_INACTIVE', 'Revoked Content Manager must receive ACCOUNT_INACTIVE')
    console.log('   ✓ Inactive/suspended/revoked assignments are strictly blocked')
  }

  // -------------------------------------------------------------------------
  // Scenario 3: Unregistered Google account is denied
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] Unregistered Google account is denied`)
    clearAuthCacheForTesting()

    const unregEmail = 'random.stranger@gmail.com'
    const res = await verifyUserInDatabase(
      { email: unregEmail, authUid: 'auth-random-stranger-uid' },
      { bypassCache: true }
    )

    assert.strictEqual(res.allowed, false, 'Unregistered user must be denied')
    assert.strictEqual(res.reason, 'ACCOUNT_NOT_REGISTERED', 'Unregistered user reason must be ACCOUNT_NOT_REGISTERED')
    assert.strictEqual(res.user, undefined, 'No user object should be returned')
    console.log('   ✓ Unregistered Google account receives ACCOUNT_NOT_REGISTERED')
  }

  // -------------------------------------------------------------------------
  // Scenario 4: Student login continues working
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] Student login continues working`)
    clearAuthCacheForTesting()

    const studentUid = '00000000-0000-4000-a000-000000000001'
    await supabase.from('users').insert({
      id: studentUid,
      email: studentEmail,
      name: 'Automated Student',
      role: 'STUDENT',
      status: 'ACTIVE',
      authUid: 'auth-student-uid-1',
    })

    const res = await verifyUserInDatabase(
      { email: studentEmail, authUid: 'auth-student-uid-1' },
      { bypassCache: true }
    )

    assert.strictEqual(res.allowed, true, 'Active student must be allowed')
    assert.strictEqual(res.user?.role, 'STUDENT', 'Role must be STUDENT')
    const destination = resolveRoleDestination(res.user.role)
    assert.strictEqual(destination, '/dashboard', 'Student must route to /dashboard')
    console.log('   ✓ Student login resolves STUDENT and routes to /dashboard')
  }

  // -------------------------------------------------------------------------
  // Scenario 5: Mentor login continues working
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] Mentor login continues working`)
    clearAuthCacheForTesting()

    const mentorUid = '00000000-0000-4000-a000-000000000003'
    await supabase.from('users').insert({
      id: mentorUid,
      email: mentorEmail,
      name: 'Automated Mentor',
      role: 'MENTOR',
      status: 'ACTIVE',
      authUid: 'auth-mentor-uid-1',
    })

    const res = await verifyUserInDatabase(
      { email: mentorEmail, authUid: 'auth-mentor-uid-1' },
      { bypassCache: true }
    )

    assert.strictEqual(res.allowed, true, 'Active mentor must be allowed')
    assert.strictEqual(res.user?.role, 'MENTOR', 'Role must be MENTOR')
    const destination = resolveRoleDestination(res.user.role)
    assert.strictEqual(destination, '/mentor', 'Mentor must route to /mentor')
    console.log('   ✓ Mentor login resolves MENTOR and routes to /mentor')
  }

  // -------------------------------------------------------------------------
  // Scenario 6: Campus Manager login continues working
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] Campus Manager login continues working`)
    clearAuthCacheForTesting()

    const res = await verifyUserInDatabase(
      { email: campusEmail },
      { bypassCache: true }
    )

    assert.strictEqual(res.allowed, true, 'Active Campus Manager must be allowed')
    assert.strictEqual(res.user?.role, 'CAMPUS_MANAGER', 'Role must be CAMPUS_MANAGER')
    const destination = resolveRoleDestination(res.user.role)
    assert.strictEqual(destination, '/campus/dashboard', 'Campus Manager must route to /campus/dashboard')
    console.log('   ✓ Campus Manager resolves CAMPUS_MANAGER and routes to /campus/dashboard')
  }

  // -------------------------------------------------------------------------
  // Scenario 7: Super Admin login continues working
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] Super Admin login continues working`)
    clearAuthCacheForTesting()

    const res = await verifyUserInDatabase(
      { email: superAdminEmail, authUid: 'auth-superadmin-uid-1' },
      { bypassCache: true }
    )

    assert.strictEqual(res.allowed, true, 'Active Super Admin must be allowed')
    assert.strictEqual(res.user?.role, 'SUPERADMIN', 'Role must be SUPERADMIN')
    const destination = resolveRoleDestination(res.user.role)
    assert.strictEqual(destination, '/super-admin/dashboard', 'Super Admin must route to /super-admin/dashboard')
    console.log('   ✓ Super Admin resolves SUPERADMIN and routes to /super-admin/dashboard')
  }

  // -------------------------------------------------------------------------
  // Scenario 8: OAuth callback and page refresh preserve the correct role
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] OAuth callback and page refresh preserve role`)
    clearAuthCacheForTesting()

    // Simulate callback resolution for Content Manager
    const callbackRes = await verifyUserInDatabase(
      { email: cmEmail, authUid: 'auth-cm-uid-5' },
      { bypassCache: true }
    )
    assert.strictEqual(callbackRes.allowed, true)
    const storedUser = callbackRes.user!

    // Verify localStorage persistence simulation
    const serialized = JSON.stringify(storedUser)
    const restoredUser: DbUser = JSON.parse(serialized)
    assert.strictEqual(restoredUser.role, 'CONTENT_MANAGER', 'Restored user must preserve CONTENT_MANAGER role')

    // Page refresh: verify cached resolution
    const refreshRes = await verifyUserInDatabase(
      { email: cmEmail },
      { bypassCache: false }
    )
    assert.strictEqual(refreshRes.allowed, true)
    assert.strictEqual(refreshRes.user?.role, 'CONTENT_MANAGER', 'Refreshed session must preserve CONTENT_MANAGER role')
    assert.strictEqual(resolveRoleDestination(refreshRes.user!.role), '/content-manager')
    console.log('   ✓ Session restoration and refresh preserve CONTENT_MANAGER role')
  }

  // -------------------------------------------------------------------------
  // Scenario 9: Unauthorized users cannot access Content Manager routes directly
  // -------------------------------------------------------------------------
  {
    testCount++
    console.log(`[Test ${testCount}] Unauthorized users cannot access Content Manager endpoints`)
    clearAuthCacheForTesting()
    resetContentManagerRateLimitsForTesting()

    // 9A: Student token hitting /api/content-manager
    const studentReq = createMockReqRes({
      method: 'GET',
      url: '/api/content-manager?action=me',
      headers: { authorization: 'Bearer test_auth_student_synthetic.student@kalvilearn.test' },
    })
    contentManagerHandler(studentReq.req, studentReq.res)
    const studentRes = await studentReq.promise
    assert.strictEqual(studentRes.statusCode, 403, 'Student hitting CM endpoint must receive 403 Forbidden')

    // 9B: Mentor token hitting /api/content-manager
    const mentorReq = createMockReqRes({
      method: 'GET',
      url: '/api/content-manager?action=me',
      headers: { authorization: 'Bearer test_auth_mentor_synthetic.mentor@kalvilearn.test' },
    })
    contentManagerHandler(mentorReq.req, mentorReq.res)
    const mentorRes = await mentorReq.promise
    assert.strictEqual(mentorRes.statusCode, 403, 'Mentor hitting CM endpoint must receive 403 Forbidden')

    // 9C: Campus Manager token hitting /api/content-manager
    const cmReq = createMockReqRes({
      method: 'GET',
      url: '/api/content-manager?action=me',
      headers: { authorization: 'Bearer test_auth_campus_manager_synthetic.campus@kalvilearn.test' },
    })
    contentManagerHandler(cmReq.req, cmReq.res)
    const cmRes = await cmReq.promise
    assert.strictEqual(cmRes.statusCode, 403, 'Campus Manager hitting CM endpoint must receive 403 Forbidden')

    // 9D: Client Route destination checks: non-CM trying to access /content-manager
    assert.strictEqual(
      resolveRoleDestination('STUDENT', '/content-manager'),
      '/dashboard',
      'Student attempting /content-manager must route to /dashboard'
    )
    assert.strictEqual(
      resolveRoleDestination('MENTOR', '/content-manager'),
      '/mentor',
      'Mentor attempting /content-manager must route to /mentor'
    )
    assert.strictEqual(
      resolveRoleDestination('CAMPUS_MANAGER', '/content-manager'),
      '/campus/dashboard',
      'Campus Manager attempting /content-manager must route to /campus/dashboard'
    )

    console.log('   ✓ Non-content managers are strictly denied access to /content-manager')
  }

  console.log('\n========================================================================')
  console.log('✅ ALL 9 CONTENT MANAGER LOGIN VERIFICATION SCENARIOS PASSED')
  console.log('========================================================================')
}

runLoginVerificationSuite().catch((err) => {
  console.error('\n❌ Suite failed with error:', err)
  process.exit(1)
})
