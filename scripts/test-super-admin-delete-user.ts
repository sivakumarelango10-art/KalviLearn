import fs from 'fs'
import path from 'path'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'

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
  body?: Record<string, unknown>
}) {
  const req = new EventEmitter() as any
  req.method = options.method || 'POST'
  req.url = options.url || '/api/super-admin/roles'
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
    end(chunk?: string | Buffer) {
      if (chunk) responseBody += chunk.toString()
      statusCode = this.statusCode
    },
    getResult() {
      let parsed: any = null
      try {
        parsed = responseBody ? JSON.parse(responseBody) : null
      } catch {
        parsed = responseBody
      }
      return { statusCode: this.statusCode, body: parsed }
    },
  }

  return { req, res }
}

async function run() {
  console.log('Running Super Admin Delete User & UI Validation Suite...')

  const { installMockSupabaseServer } = await import('./mockDatabase')
  const { supabaseServer } = await import('../src/server/feedbackAuth')
  const { default: superAdminHandler, SUPER_ADMIN_EMAIL } = await import(
    '../src/server/superAdminHandler'
  )
  const { validateDeleteUserConfirmation } = await import(
    '../src/components/super-admin/DeleteUserModal'
  )

  const db = installMockSupabaseServer(supabaseServer)

  // Seed users, profiles, academic history, and Content Manager assignment
  const studentUserId = 'user-student-del-1'
  const studentAuthUid = 'auth-uid-student-del-1'
  const studentProfileId = 'student-prof-del-1'
  const mentorUserId = 'user-mentor-1'
  const mentorProfileId = 'mentor-prof-1'
  const cmUserId = 'user-cm-del-1'

  db.users.push(
    {
      id: studentUserId,
      email: 'delete-student@kalvilearn.test',
      name: 'Student To Delete',
      role: 'STUDENT',
      status: 'ACTIVE',
      authUid: studentAuthUid,
      campus_id: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: mentorUserId,
      email: 'mentor-keep@kalvilearn.test',
      name: 'Mentor Keep',
      role: 'MENTOR',
      status: 'ACTIVE',
      campus_id: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: cmUserId,
      email: 'cm-delete@kalvilearn.test',
      name: 'CM To Delete',
      role: 'CONTENT_MANAGER',
      status: 'ACTIVE',
      authUid: 'auth-uid-cm-del-1',
      campus_id: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  )

  db.students.push({
    id: studentProfileId,
    user_id: studentUserId,
    name: 'Student To Delete',
    email: 'delete-student@kalvilearn.test',
    student_code: 'STU-DEL1',
    status: 'ACTIVE',
  })

  db.mentors.push({
    id: mentorProfileId,
    user_id: mentorUserId,
    name: 'Mentor Keep',
    email: 'mentor-keep@kalvilearn.test',
    mentor_code: 'MTR-KEEP1',
    status: 'ACTIVE',
  })

  db.mentor_students.push({
    id: 'ms-link-1',
    mentor_id: mentorProfileId,
    student_id: studentProfileId,
    status: 'ACTIVE',
  })

  db.UserProgress.push({
    id: 'prog-1',
    userId: studentUserId,
    problemId: 'prob-1',
    status: 'SOLVED',
  })

  db.Submission.push({
    id: 'sub-1',
    userId: studentUserId,
    problemId: 'prob-1',
    status: 'PASSED',
  })

  db.content_manager_assignments.push({
    id: 'cma-del-1',
    user_id: cmUserId,
    previous_role: 'STUDENT',
    scope_type: 'GLOBAL',
    status: 'ACTIVE',
    is_active: true,
  })

  // Track auth.admin calls for session revocation & ban without hard deleteUser
  const authAdminCalls: { signOut: any[]; updateUserById: any[]; deleteUser: any[] } = {
    signOut: [],
    updateUserById: [],
    deleteUser: [],
  }
  const authAdmin = supabaseServer.auth.admin as any
  authAdmin.signOut = async (uid: string, scope?: string) => {
    authAdminCalls.signOut.push({ uid, scope })
    return { data: null, error: null }
  }
  authAdmin.updateUserById = async (uid: string, attrs: Record<string, unknown>) => {
    authAdminCalls.updateUserById.push({ uid, attrs })
    return { data: { user: { id: uid } }, error: null }
  }
  const origDeleteUser = authAdmin.deleteUser
  authAdmin.deleteUser = async (uid: string) => {
    authAdminCalls.deleteUser.push(uid)
    return origDeleteUser ? origDeleteUser(uid) : { data: null, error: null }
  }

  const superAdminToken = `test_auth_superadmin_${SUPER_ADMIN_EMAIL}`

  // 1. UI confirmation validation tests
  assert.equal(
    validateDeleteUserConfirmation('a@b.com', 'a@b.com', 'no').valid,
    false,
    'Reason shorter than 3 chars must fail'
  )
  assert.equal(
    validateDeleteUserConfirmation('a@b.com', 'wrong@b.com', 'Graduated').valid,
    false,
    'Mismatched email must fail'
  )
  assert.equal(
    validateDeleteUserConfirmation('A@B.com', 'a@b.com', 'Account offboarded').valid,
    true,
    'Case-insensitive matching email + valid reason must pass'
  )
  console.log('  [PASS] 1. UI confirmation validation & error handling')

  // 2. Unauthorized attempts (401 unauthenticated, 403 non-superadmin)
  {
    const { req, res } = createMockReqRes({
      body: { action: 'delete_user', userId: studentUserId, confirmEmail: 'delete-student@kalvilearn.test', reason: 'Test' },
    })
    await superAdminHandler(req, res)
    assert.equal(res.getResult().statusCode, 401)
  }
  {
    const { req, res } = createMockReqRes({
      headers: { Authorization: 'Bearer test_auth_student_delete-student@kalvilearn.test' },
      body: { action: 'delete_user', userId: studentUserId, confirmEmail: 'delete-student@kalvilearn.test', reason: 'Test' },
    })
    await superAdminHandler(req, res)
    assert.equal(res.getResult().statusCode, 403)
  }
  console.log('  [PASS] 2. Unauthorized deletion attempts blocked (401/403)')

  // 3. Protected Super Admin & self-deletion prevention
  const superAdminRow = db.users.find((u) => u.email === SUPER_ADMIN_EMAIL)
  assert.ok(superAdminRow, 'Seeded Super Admin user must exist')
  {
    const { req, res } = createMockReqRes({
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: {
        action: 'delete_user',
        userId: superAdminRow.id,
        confirmEmail: SUPER_ADMIN_EMAIL,
        reason: 'Attempted protected deletion',
      },
    })
    await superAdminHandler(req, res)
    assert.equal(res.getResult().statusCode, 403)
    assert.match(res.getResult().body.message, /protected Super Administrator/i)
  }
  console.log('  [PASS] 3. Protected Super Admin & self-deletion blocked (403)')

  // 4. Last active Super Admin protection (non-sgjitbros superadmin check)
  // Temporarily simulate another superadmin row & test guard directly when only 1 active superadmin exists
  // Note: handler restricts caller to SUPER_ADMIN_EMAIL, so if caller is sgjitbros@gmail.com and target is another SUPERADMIN
  // while sgjitbros is INACTIVE, activeOthers === 0 triggers 403.
  {
    const extraAdminId = 'user-extra-superadmin'
    db.users.push({
      id: extraAdminId,
      email: 'secondary-admin@kalvilearn.test',
      name: 'Secondary Admin',
      role: 'SUPERADMIN',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    const prevStatus = superAdminRow.status
    superAdminRow.status = 'INACTIVE'

    const { req, res } = createMockReqRes({
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: {
        action: 'delete_user',
        userId: extraAdminId,
        confirmEmail: 'secondary-admin@kalvilearn.test',
        reason: 'Last admin test',
      },
    })
    await superAdminHandler(req, res)
    superAdminRow.status = prevStatus
    assert.equal(res.getResult().statusCode, 403)
    assert.match(res.getResult().body.message, /last active Super Administrator/i)
  }
  console.log('  [PASS] 4. Last active Super Admin protection verified (403)')

  // 5. Email confirmation mismatch returns 400
  {
    const { req, res } = createMockReqRes({
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: {
        action: 'delete_user',
        userId: studentUserId,
        confirmEmail: 'wrong@kalvilearn.test',
        reason: 'Graduated',
      },
    })
    await superAdminHandler(req, res)
    assert.equal(res.getResult().statusCode, 400)
  }
  console.log('  [PASS] 5. Email confirmation mismatch rejected (400)')

  // 6. Successful soft deletion of Student + preservation of historical records + session revocation + audit log
  {
    const { req, res } = createMockReqRes({
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: {
        action: 'delete_user',
        userId: studentUserId,
        confirmEmail: 'delete-student@kalvilearn.test',
        reason: 'Student graduated and requested offboarding',
      },
    })
    await superAdminHandler(req, res)
    const result = res.getResult()
    assert.equal(result.statusCode, 200)
    assert.equal(result.body.success, true)
    assert.equal(result.body.data.sessionRevoked, true)
    assert.equal(result.body.data.authLoginBlocked, true)
  }

  // Verify soft-deleted user state & preserved records
  const deletedStudentUser = db.users.find((u) => u.id === studentUserId)
  assert.ok(deletedStudentUser, 'public.users row must be preserved')
  assert.equal(deletedStudentUser.status, 'INACTIVE')
  assert.ok(deletedStudentUser.deleted_at)
  assert.equal(deletedStudentUser.deleted_by, SUPER_ADMIN_EMAIL)
  assert.equal(deletedStudentUser.deletion_reason, 'Student graduated and requested offboarding')

  assert.equal(db.students.find((s) => s.id === studentProfileId)?.status, 'INACTIVE')
  assert.equal(db.mentor_students.find((m) => m.id === 'ms-link-1')?.status, 'INACTIVE')
  assert.equal(db.UserProgress.filter((p) => p.userId === studentUserId).length, 1, 'UserProgress must be preserved')
  assert.equal(db.Submission.filter((s) => s.userId === studentUserId).length, 1, 'Submission must be preserved')

  // Verify session revocation & no hard auth.admin.deleteUser call
  assert.equal(authAdminCalls.signOut.length, 1)
  assert.equal(authAdminCalls.signOut[0].uid, studentAuthUid)
  assert.equal(authAdminCalls.updateUserById.length, 1)
  assert.equal(authAdminCalls.updateUserById[0].uid, studentAuthUid)
  assert.equal(authAdminCalls.deleteUser.length, 0, 'Hard auth.admin.deleteUser must NOT be called')

  // Verify audit log
  const deleteAudit = db.admin_audit_logs.find(
    (l) => l.action === 'DELETE_USER' && l.target_id === studentUserId
  )
  assert.ok(deleteAudit, 'Audit log entry must exist for DELETE_USER')
  assert.equal(deleteAudit.status, 'SUCCESS')
  assert.equal(deleteAudit.admin_email, SUPER_ADMIN_EMAIL)
  console.log('  [PASS] 6. Safe soft deletion, academic preservation, session revocation & audit log verified')

  // 7. Deleted user excluded from active user listings & duplicate delete returns 409
  {
    const { req, res } = createMockReqRes({
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: { action: 'list_users_roles' },
    })
    await superAdminHandler(req, res)
    const list = res.getResult().body.data as Array<{ id: string }>
    assert.equal(list.some((u) => u.id === studentUserId), false, 'Deleted user must be excluded from active directory')
  }
  {
    const { req, res } = createMockReqRes({
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: {
        action: 'delete_user',
        userId: studentUserId,
        confirmEmail: 'delete-student@kalvilearn.test',
        reason: 'Duplicate attempt',
      },
    })
    await superAdminHandler(req, res)
    assert.equal(res.getResult().statusCode, 409)
  }
  console.log('  [PASS] 7. Active user listing exclusion & duplicate deletion guard (409) verified')

  // 8. Content Manager soft deletion revokes assignment while preserving history
  {
    const { req, res } = createMockReqRes({
      headers: { Authorization: `Bearer ${superAdminToken}` },
      body: {
        action: 'delete_user',
        userId: cmUserId,
        confirmEmail: 'cm-delete@kalvilearn.test',
        reason: 'Content Manager offboarding',
      },
    })
    await superAdminHandler(req, res)
    assert.equal(res.getResult().statusCode, 200)
    const cma = db.content_manager_assignments.find((a) => a.user_id === cmUserId)
    assert.ok(cma, 'content_manager_assignments row must be preserved')
    assert.equal(cma.status, 'REVOKED')
    assert.equal(cma.is_active, false)
  }
  console.log('  [PASS] 8. Content Manager assignment revoked & history preserved')

  console.log('All Super Admin Delete User tests passed!')
}

run().catch((err) => {
  console.error('TEST FAILED:', err)
  process.exit(1)
})
