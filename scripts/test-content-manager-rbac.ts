/**
 * KalviLearn — Comprehensive Automated Test Suite for Content Manager Dashboard & RBAC
 *
 * Covers all 25 verification criteria across server RBAC, scope isolation (IDOR prevention),
 * granular permission enforcement, publication workflow, hidden test case protection,
 * Super Admin access management, immediate revocation, student visibility safety, and audit logging.
 */

import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { EventEmitter } from 'events'

process.env.NODE_ENV = 'test'
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

import { supabaseServer, clearAuthCacheForTesting } from '../src/server/feedbackAuth'
import superAdminHandler, { resetSuperAdminRateLimitsForTesting } from '../src/server/superAdminHandler'
import contentManagerHandler, { resetContentManagerRateLimitsForTesting } from '../src/server/contentManagerHandler'
import { installMockSupabaseServer } from './mockDatabase'
import { resolveQuestionAsync } from '../src/server/judge/testRepository'
import {
  DEFAULT_CONTENT_MANAGER_PERMISSIONS,
  CONTENT_PERMISSION_LIST,
} from '../src/lib/contentPermissions'

function createMockReqRes(options: {
  method?: string
  url: string
  headers?: Record<string, string>
  body?: Record<string, unknown>
}) {
  const req = new EventEmitter() as any
  req.method = options.method || 'POST'
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

  const res: any = {
    statusCode: 200,
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
    end(chunk?: string) {
      if (chunk) responseBody += chunk
      statusCode = this.statusCode
    },
  }

  return {
    req,
    res,
    getResult() {
      return {
        status: statusCode,
        body: responseBody ? JSON.parse(responseBody) : null,
      }
    },
  }
}

async function callSuperAdmin(token: string | null, action: string, body: Record<string, unknown> = {}) {
  const { req, res, getResult } = createMockReqRes({
    method: 'POST',
    url: '/api/super-admin/content-managers',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: { ...body, action },
  })
  await superAdminHandler(req, res)
  return getResult()
}

async function callContentManager(token: string | null, action: string, body: Record<string, unknown> = {}, method: 'GET' | 'POST' = 'POST') {
  const url = action === 'me' ? '/api/content-manager/me' : action === 'dashboard' ? '/api/content-manager/dashboard' : action === 'list_my_revisions' ? '/api/content-manager/revisions' : '/api/content-manager'
  const { req, res, getResult } = createMockReqRes({
    method,
    url,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: method === 'GET' ? {} : { ...body, action },
  })
  await contentManagerHandler(req, res)
  return getResult()
}

async function main() {
  console.log('======================================================================')
  console.log('KALVILEARN — CONTENT MANAGER RBAC & WORKFLOW VERIFICATION SUITE')
  console.log('======================================================================\n')

  const db = installMockSupabaseServer(supabaseServer)
  clearAuthCacheForTesting()
  resetSuperAdminRateLimitsForTesting()
  resetContentManagerRateLimitsForTesting()

  const SUPER_ADMIN_TOKEN = 'test_auth_SUPERADMIN_sgjitbros@gmail.com'
  const STUDENT_USER = {
    id: 'user-cm-candidate-1',
    email: 'author1@kalvilearn.test',
    name: 'Content Author One',
    role: 'STUDENT',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const OTHER_STUDENT = {
    id: 'user-regular-student',
    email: 'regular.student@kalvilearn.test',
    name: 'Regular Student',
    role: 'STUDENT',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  db.users.push(STUDENT_USER, OTHER_STUDENT)

  const CM_TOKEN = 'test_auth_CONTENT_MANAGER_author1@kalvilearn.test'
  const STUDENT_TOKEN = 'test_auth_STUDENT_regular.student@kalvilearn.test'
  const MENTOR_TOKEN = 'test_auth_MENTOR_synthetic.mentor@kalvilearn.test'

  const mod1 = db.Module[0]
  const mod2 = db.Module[1]
  const unitInMod1 = db.LearningUnit.find((u) => u.moduleId === mod1.id)!
  const unitInMod2 = db.LearningUnit.find((u) => u.moduleId === mod2.id)!
  assert(mod1 && mod2 && unitInMod1 && unitInMod2, 'Baseline modules & units must exist in mockDb')

  // Test 1: Unauthenticated & Non-Content-Manager access rejected
  console.log('Test 1: Authentication & role gate on /api/content-manager')
  const unauthRes = await callContentManager(null, 'me', {}, 'GET')
  assert.strictEqual(unauthRes.status, 401, 'Missing token must return 401')
  const studentCmRes = await callContentManager(STUDENT_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(studentCmRes.status, 403, 'Student calling /api/content-manager must return 403')
  const mentorCmRes = await callContentManager(MENTOR_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(mentorCmRes.status, 403, 'Mentor calling /api/content-manager must return 403')
  console.log('  ✓ Unauthenticated (401) and Student/Mentor (403) strictly blocked.')

  // Test 2: Self-promotion & non-Super-Admin granting Content Manager access rejected
  console.log('Test 2: Non-Super Admin cannot grant Content Manager access or view user directory')
  const nonAdminGrant = await callSuperAdmin(STUDENT_TOKEN, 'grant_content_manager', { userId: STUDENT_USER.id })
  assert.strictEqual(nonAdminGrant.status, 403, 'Student attempting Super Admin grant_content_manager must get 403')
  console.log('  ✓ Self-grant and non-Super-Admin RBAC mutations rejected (403).')

  // Test 3: Super Admin cannot convert sgjitbros@gmail.com to Content Manager
  console.log('Test 3: Sole Super Admin account protection')
  const protectSuper = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    email: 'sgjitbros@gmail.com',
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'GLOBAL',
  })
  assert.strictEqual(protectSuper.status, 403, 'Sole Super Admin cannot be downgraded to Content Manager')
  console.log('  ✓ sgjitbros@gmail.com protected from Content Manager reassignment (403).')

  // Test 4: Safest default NONE scope blocks all modules/units until scope configured
  console.log('Test 4: Granting Content Manager with safest default NONE scope')
  const grantNone = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: STUDENT_USER.id,
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'NONE',
  })
  assert.strictEqual(grantNone.status, 200)
  assert.strictEqual(db.users.find((u: any) => u.id === STUDENT_USER.id)?.role, 'CONTENT_MANAGER')
  const listNone = await callContentManager(CM_TOKEN, 'list_curriculum_modules')
  assert.strictEqual(listNone.status, 200)
  assert.strictEqual(listNone.body.data.modules.length, 0, 'NONE scope must see 0 modules')
  const createUnitNone = await callContentManager(CM_TOKEN, 'create_learning_unit', {
    moduleId: mod1.id,
    title: 'Blocked Unit',
    concept: 'Blocked',
  })
  assert.strictEqual(createUnitNone.status, 403, 'NONE scope cannot create learning unit')
  console.log('  ✓ NONE scope grants zero curriculum visibility and returns 403 on mutations.')

  // Test 5: Scoped Assignment -> Strictly isolated to Module 1, blocked from Module 2 (IDOR prevention)
  console.log('Test 5: Scoped Module Assignment & IDOR Protection')
  const grantScoped = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: STUDENT_USER.id,
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'SCOPED',
    moduleIds: [mod1.id],
    learningUnitIds: [],
    notes: 'Scoped to Module 1 only',
  })
  assert.strictEqual(grantScoped.status, 200)

  const meRes = await callContentManager(CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(meRes.status, 200)
  assert.strictEqual(meRes.body.data.scopeType, 'SCOPED')
  assert.deepStrictEqual(meRes.body.data.assignedModuleIds, [mod1.id])

  const dashRes = await callContentManager(CM_TOKEN, 'dashboard', {}, 'GET')
  assert.strictEqual(dashRes.status, 200)
  assert.strictEqual(dashRes.body.data.stats.assignedModulesCount, 1, 'Dashboard must show only 1 assigned module')

  const currRes = await callContentManager(CM_TOKEN, 'list_curriculum_modules')
  assert.strictEqual(currRes.status, 200)
  assert.strictEqual(currRes.body.data.modules.length, 1)
  assert.strictEqual(currRes.body.data.modules[0].id, mod1.id)

  // IDOR attempt: Edit Module 2 or Unit in Module 2
  const idorMod = await callContentManager(CM_TOKEN, 'update_curriculum_module', {
    id: mod2.id,
    title: 'Hacked Mod 2',
  })
  assert.strictEqual(idorMod.status, 403, 'Modifying unrelated module must return 403')
  const idorUnit = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: unitInMod2.id,
    title: 'Hacked Unit 2',
  })
  assert.strictEqual(idorUnit.status, 403, 'Modifying unrelated learning unit must return 403')
  const idorQuestion = await callContentManager(CM_TOKEN, 'create_question', {
    title: 'Unauthorized Unit Q',
    slug: 'unauth-unit-q',
    difficulty: 'Easy',
    description: 'Attempt IDOR',
    learningUnitId: unitInMod2.id,
    testCases: [{ input: '1', expectedOutput: '1', isHidden: false }],
  })
  assert.strictEqual(idorQuestion.status, 403, 'Creating question inside unauthorized unit must return 403')
  console.log('  ✓ Scoped visibility & cross-module IDOR attempts rejected with 403.')

  // Test 6: Content Manager CANNOT access Super Admin endpoints or prohibited actions
  console.log('Test 6: Content Manager blocked from Super Admin APIs, user roles, students, mentors')
  const cmTrySuperAdmin = await callSuperAdmin(CM_TOKEN, 'list_students')
  assert.strictEqual(cmTrySuperAdmin.status, 403, 'CM calling /api/super-admin must return 403')
  const cmTryRoleChange = await callContentManager(CM_TOKEN, 'update_user_role', { userId: OTHER_STUDENT.id, role: 'SUPERADMIN' })
  assert.strictEqual(cmTryRoleChange.status, 403, 'CM attempting role escalation via CM handler must return 403')
  const cmTryStudents = await callContentManager(CM_TOKEN, 'list_students')
  assert.strictEqual(cmTryStudents.status, 403, 'CM attempting list_students must return 403')
  console.log('  ✓ Super Admin, role escalation, and student/mentor endpoints blocked (403).')

  // Test 7: Authorized Curriculum & Learning Unit CRUD within Scope
  console.log('Test 7: Authorized Module edit, Learning Unit create/edit/reorder within Scope')
  const editMod1 = await callContentManager(CM_TOKEN, 'update_curriculum_module', {
    id: mod1.id,
    description: 'Updated by Content Manager within scope',
  })
  assert.strictEqual(editMod1.status, 200)

  const createLu = await callContentManager(CM_TOKEN, 'create_learning_unit', {
    moduleId: mod1.id,
    title: 'CM New Lesson',
    concept: 'Lesson concept markdown',
  })
  assert.strictEqual(createLu.status, 201)
  assert.strictEqual(createLu.body.data.status, 'DRAFT', 'Without publish permission, unit saves as DRAFT')
  const createdUnitId = createLu.body.data.id

  const editLu = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: createdUnitId,
    concept: 'Updated lesson concept',
  })
  assert.strictEqual(editLu.status, 200)
  console.log('  ✓ Module edit and Learning Unit create/edit succeeded within scope as DRAFT.')

  // Test 8: Question CRUD, Examples, Public & Hidden Test Cases, Starter Code, Test Runner, Publication Gating
  console.log('Test 8: Question lifecycle, 7-tab persistence, test runner, and publication gating')
  // 8a. Attempting direct publish without content.question.publish fails 403
  const directPub = await callContentManager(CM_TOKEN, 'create_question', {
    title: 'Direct Publish Attempt',
    slug: 'direct-publish-attempt',
    difficulty: 'Easy',
    description: 'Should be blocked without publish perm',
    status: 'PUBLISHED',
    learningUnitId: unitInMod1.id,
    testCases: [{ input: '1', expectedOutput: '1', isHidden: false }],
  })
  assert.strictEqual(directPub.status, 403, 'Direct publish without content.question.publish must fail with 403')

  // 8b. Create as Draft succeeds
  const createQ = await callContentManager(CM_TOKEN, 'create_question', {
    title: 'CM Scoped Addition',
    slug: 'cm-scoped-addition',
    difficulty: 'Easy',
    description: 'Add two numbers and print result.',
    inputFormat: 'Two integers a and b',
    outputFormat: 'Single integer a + b',
    learningUnitId: unitInMod1.id,
    examples: [{ label: 'Ex1', input: '2 3', output: '5', explanation: '2+3=5' }],
    testCases: [
      { input: '2 3', expectedOutput: '5', isHidden: false },
      { input: '10 20', expectedOutput: '30', isHidden: true },
    ],
    starterCodes: {
      python: 'a, b = map(int, input().split())\nprint(a + b)',
      javascript: 'const fs=require("fs");const [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);console.log(a+b);',
    },
  })
  assert.strictEqual(createQ.status, 201)
  const qId = createQ.body.data.id
  assert.strictEqual(createQ.body.data.status, 'DRAFT')

  // 8c. Draft question is NOT visible to student testRepository!
  const studentDraftLookup = await resolveQuestionAsync('cm-scoped-addition')
  assert('error' in studentDraftLookup, 'DRAFT question must NOT be exposed in student testRepository')

  // 8d. Run tests via Content Manager test runner (JavaScript engine in sandbox!)
  const runTests = await callContentManager(CM_TOKEN, 'run_question_tests', {
    id: qId,
    language: 'javascript',
    code: 'const fs=require("fs");const [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);console.log(a+b);',
    filter: 'all',
  })
  assert.strictEqual(runTests.status, 200)
  assert.strictEqual(runTests.body.data.status, 'ACCEPTED')
  assert.strictEqual(runTests.body.data.passedTests, 2)

  // 8e. Update examples, starterCode, and test cases
  const updQ = await callContentManager(CM_TOKEN, 'update_question', {
    id: qId,
    title: 'CM Scoped Addition v2',
    examples: [{ label: 'Ex1', input: '4 5', output: '9', explanation: '4+5=9' }],
    starterCodes: {
      python: 'print(sum(map(int, input().split())))',
    },
    changeSummary: 'Updated example and starter code',
  })
  assert.strictEqual(updQ.status, 200)

  // 8f. Duplicate as draft
  const dupQ = await callContentManager(CM_TOKEN, 'duplicate_question', { id: qId })
  assert.strictEqual(dupQ.status, 201)
  assert.strictEqual(dupQ.body.data.status, 'DRAFT')

  // 8g. Submit for review (DRAFT -> PENDING_REVIEW)
  const subRev = await callContentManager(CM_TOKEN, 'submit_question_for_review', {
    id: qId,
    changeSummary: 'Ready for Super Admin publication review',
  })
  assert.strictEqual(subRev.status, 200)
  assert.strictEqual(subRev.body.data.approvalStatus, 'PENDING_REVIEW')

  // 8h. Delete without content.question.delete fails 403
  const tryDel = await callContentManager(CM_TOKEN, 'delete_question', { id: qId })
  assert.strictEqual(tryDel.status, 403, 'Delete without content.question.delete must return 403')

  // 8i. Restore revision without content.revision.restore fails 403
  const revs = await callContentManager(CM_TOKEN, 'list_question_revisions', { id: qId })
  assert.strictEqual(revs.status, 200)
  assert(revs.body.data.length >= 2)
  const tryRestore = await callContentManager(CM_TOKEN, 'restore_question_revision', {
    problemId: qId,
    revisionId: revs.body.data[0].id,
  })
  assert.strictEqual(tryRestore.status, 403, 'Restore without content.revision.restore must return 403')
  console.log('  ✓ Question create/edit/duplicate/tests/submit-review passed; publish/delete/restore gated (403).')

  // Test 9: Super Admin Reviews & Approves -> Student TestRepository Now Serves Question (still keeping hidden tests hidden in preview!)
  console.log('Test 9: Super Admin Publication Approval Workflow & Student Preview Security')
  const pendingRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'list_pending_content_approvals')
  assert.strictEqual(pendingRes.status, 200)
  assert(pendingRes.body.data.pendingQuestions.some((p: any) => p.id === qId), 'Question must appear in pending queue')

  const approveRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'approve_publish_content', {
    resourceType: 'PROBLEM',
    id: qId,
  })
  assert.strictEqual(approveRes.status, 200)
  assert.strictEqual(approveRes.body.data.status, 'PUBLISHED')
  assert.strictEqual(approveRes.body.data.approvalStatus, 'APPROVED')

  // Student lookup succeeds now!
  const studentPublishedLookup = await resolveQuestionAsync('cm-scoped-addition')
  assert('suite' in studentPublishedLookup, 'Published question must resolve for student judge')

  // Student preview NEVER leaks hidden test cases
  const previewRes = await callContentManager(CM_TOKEN, 'get_question_preview', { id: qId })
  assert.strictEqual(previewRes.status, 200)
  assert.strictEqual(previewRes.body.data.publicTestCases.length, 1)
  assert.strictEqual(previewRes.body.data.publicTestCases.every((t: any) => !t.isHidden), true)
  console.log('  ✓ Super Admin approval published question; student preview hides hidden test cases.')

  // Test 10: Hidden Test Case Permission Restriction & Preservation
  console.log('Test 10: Stripping & Preserving Hidden Test Cases when content.hidden_test_case.manage is Revoked')
  const restrictedPerms = DEFAULT_CONTENT_MANAGER_PERMISSIONS.filter((p) => p !== 'content.hidden_test_case.manage')
  await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: STUDENT_USER.id,
    permissions: restrictedPerms,
    scopeType: 'SCOPED',
    moduleIds: [mod1.id],
  })

  const getQNoHidden = await callContentManager(CM_TOKEN, 'get_question', { id: qId })
  assert.strictEqual(getQNoHidden.status, 200)
  assert.strictEqual(getQNoHidden.body.data.testCases.length, 1, 'Hidden test case must be stripped from get_question')
  assert.strictEqual(getQNoHidden.body.data.testCases[0].isHidden, false)

  // Revisions snapshot also stripped of hidden tests!
  const revNoHidden = await callContentManager(CM_TOKEN, 'list_question_revisions', { id: qId })
  assert.strictEqual(revNoHidden.status, 200)
  for (const r of revNoHidden.body.data) {
    assert(r.snapshot.testCases.every((tc: any) => !tc.isHidden), 'Revision snapshot must strip hidden tests')
  }

  // Attempting to run hidden tests returns 403
  const runHiddenBlocked = await callContentManager(CM_TOKEN, 'run_question_tests', {
    id: qId,
    language: 'javascript',
    code: 'console.log(5)',
    filter: 'hidden',
  })
  assert.strictEqual(runHiddenBlocked.status, 403, 'Running hidden filter without permission must return 403')

  // Updating public test case must NOT wipe existing hidden test case in DB
  const updPublicOnly = await callContentManager(CM_TOKEN, 'update_question', {
    id: qId,
    testCases: [{ input: '7 8', expectedOutput: '15', isHidden: false }],
  })
  assert.strictEqual(updPublicOnly.status, 200)
  const dbPtcAfter = db.ProblemTestCase.filter((t: any) => t.problemId === qId)
  assert.strictEqual(dbPtcAfter.length, 2, 'Hidden test case in DB must remain preserved!')
  assert(dbPtcAfter.some((t: any) => t.isHidden === true), 'Preserved hidden test case verified in DB')
  console.log('  ✓ Hidden test cases stripped in APIs/revisions and preserved intact on public-only save.')

  // Test 11: Audit Logs & Global Scope Module Creation
  console.log('Test 11: Content Audit Logging & Global Scope Verification')
  const myRevs = await callContentManager(CM_TOKEN, 'list_my_revisions', {}, 'GET')
  assert.strictEqual(myRevs.status, 200)
  assert(myRevs.body.data.auditLogs.length >= 5, 'Content audit trail must log every edit')

  // Upgrade to GLOBAL + ALL permissions
  await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: STUDENT_USER.id,
    permissions: [...CONTENT_PERMISSION_LIST],
    scopeType: 'GLOBAL',
  })
  const createGlobalMod = await callContentManager(CM_TOKEN, 'create_curriculum_module', {
    title: 'Global Module Created by CM',
    description: 'Now permitted globally',
  })
  assert.strictEqual(createGlobalMod.status, 201)
  console.log('  ✓ Audit trail complete; GLOBAL scope + module creation verified.')

  // Test 12: Immediate Revocation Takes Effect Instantly
  console.log('Test 12: Immediate Revocation Enforcement')
  const revokeRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'revoke_content_manager', {
    userId: STUDENT_USER.id,
  })
  assert.strictEqual(revokeRes.status, 200)
  assert.strictEqual(db.users.find((u: any) => u.id === STUDENT_USER.id)?.role, 'STUDENT', 'User role restored to previous STUDENT role')

  // Call immediately with the SAME CM_TOKEN (simulating active session after revocation)
  const postRevokeMe = await callContentManager(CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(postRevokeMe.status, 403, 'Revoked Content Manager must immediately lose access (403)')
  const postRevokeWrite = await callContentManager(CM_TOKEN, 'update_curriculum_module', {
    id: mod1.id,
    title: 'Should Fail',
  })
  assert.strictEqual(postRevokeWrite.status, 403, 'Revoked Content Manager mutations blocked immediately (403)')
  console.log('  ✓ Revoked Content Manager blocked immediately on next request (403) and role restored.')

  // Test 13: Role Preservation & Restoration Across MENTOR, CAMPUS_MANAGER, Re-grants, and Legitimate Role Changes
  console.log('Test 13: Role Preservation & Restoration Edge Cases (Mentor, Campus Manager, Re-grant, Override Guard)')
  const MENTOR_USER = {
    id: 'user-cm-mentor-1',
    email: 'mentor.author@kalvilearn.test',
    name: 'Mentor Author',
    role: 'MENTOR',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const CAMPUS_USER = {
    id: 'user-cm-campus-1',
    email: 'campus.author@kalvilearn.test',
    name: 'Campus Author',
    role: 'CAMPUS_MANAGER',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  db.users.push(MENTOR_USER, CAMPUS_USER)

  // Grant to Mentor -> revoke -> restores MENTOR
  await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: MENTOR_USER.id,
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    // Omit scopeType to verify safest default NONE
  })
  assert.strictEqual(db.users.find((u: any) => u.id === MENTOR_USER.id)?.role, 'CONTENT_MANAGER')
  const mentorMe = await callContentManager('test_auth_CONTENT_MANAGER_mentor.author@kalvilearn.test', 'me', {}, 'GET')
  assert.strictEqual(mentorMe.body.data.scopeType, 'NONE', 'Omitted scopeType must default safely to NONE')
  const revMentor = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'revoke_content_manager', { userId: MENTOR_USER.id })
  assert.strictEqual(revMentor.body.data.restoredRole, 'MENTOR')
  assert.strictEqual(db.users.find((u: any) => u.id === MENTOR_USER.id)?.role, 'MENTOR')

  // Grant to Campus Manager -> revoke -> restores CAMPUS_MANAGER
  await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: CAMPUS_USER.id,
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'SCOPED',
    learningUnitIds: [unitInMod1.id],
  })
  assert.strictEqual(db.users.find((u: any) => u.id === CAMPUS_USER.id)?.role, 'CONTENT_MANAGER')
  const revCampus = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'revoke_content_manager', { userId: CAMPUS_USER.id })
  assert.strictEqual(revCampus.body.data.restoredRole, 'CAMPUS_MANAGER')
  assert.strictEqual(db.users.find((u: any) => u.id === CAMPUS_USER.id)?.role, 'CAMPUS_MANAGER')

  // Re-grant after user was legitimately promoted (STUDENT -> MENTOR -> CONTENT_MANAGER -> revoke must restore MENTOR, not stale STUDENT)
  const updToMentor = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'update_user_role', { userId: STUDENT_USER.id, newRole: 'MENTOR' })
  assert.strictEqual(updToMentor.status, 200)
  assert.strictEqual(db.users.find((u: any) => u.id === STUDENT_USER.id)?.role, 'MENTOR')
  await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: STUDENT_USER.id,
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'SCOPED',
    learningUnitIds: [unitInMod1.id],
  })
  assert.strictEqual(db.content_manager_assignments.find((a: any) => a.user_id === STUDENT_USER.id)?.previous_role, 'MENTOR', 'Re-grant must capture fresh previous_role = MENTOR')
  // Legitimate role change while active via update_user_role to CAMPUS_MANAGER -> subsequent revoke must NOT overwrite CAMPUS_MANAGER!
  const updToCampus = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'update_user_role', { userId: STUDENT_USER.id, newRole: 'CAMPUS_MANAGER' })
  assert.strictEqual(updToCampus.status, 200)
  assert.strictEqual(db.users.find((u: any) => u.id === STUDENT_USER.id)?.role, 'CAMPUS_MANAGER')
  const postRoleChangeRevoke = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'revoke_content_manager', { userId: STUDENT_USER.id })
  assert.strictEqual(postRoleChangeRevoke.status, 200)
  assert.strictEqual(postRoleChangeRevoke.body.data.wasRestored, false)
  assert.strictEqual(db.users.find((u: any) => u.id === STUDENT_USER.id)?.role, 'CAMPUS_MANAGER', 'Legitimately changed role must NEVER be overwritten by revoke')
  console.log('  ✓ Mentor/Campus Manager restoration, re-grant previousRole capture, and override guard verified.')

  // Test 14: Unit-Level Scope Isolation (Unit-only manager cannot edit parent Module or sibling Unit)
  console.log('Test 14: Granular Learning-Unit-Only Scope Isolation')
  await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: CAMPUS_USER.id,
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'SCOPED',
    moduleIds: [],
    learningUnitIds: [unitInMod1.id],
  })
  const unitCmToken = 'test_auth_CONTENT_MANAGER_campus.author@kalvilearn.test'
  const siblingUnit = db.LearningUnit.find((u: any) => u.moduleId === mod1.id && u.id !== unitInMod1.id)
  const tryEditParentMod = await callContentManager(unitCmToken, 'update_curriculum_module', { id: mod1.id, title: 'Bypass Parent Mod' })
  assert.strictEqual(tryEditParentMod.status, 403, 'Unit-only manager must NOT mutate parent Module (403)')
  if (siblingUnit) {
    const tryEditSibling = await callContentManager(unitCmToken, 'update_learning_unit', { id: siblingUnit.id, title: 'Bypass Sibling' })
    assert.strictEqual(tryEditSibling.status, 403, 'Unit-only manager must NOT mutate sibling LearningUnit (403)')
  }
  const createUnitQ = await callContentManager(unitCmToken, 'create_question', {
    title: 'Unit Scoped Q',
    slug: 'unit-scoped-q-1',
    difficulty: 'Easy',
    description: 'Scoped to assigned unit only',
    learningUnitId: unitInMod1.id,
    testCases: [{ input: '1', expectedOutput: '1', isHidden: false }],
  })
  assert.strictEqual(createUnitQ.status, 201, 'Unit-scoped manager can create question inside authorized unit')
  console.log('  ✓ Learning-unit-only scope allows authorized unit Qs while blocking parent Module & sibling units (403).')

  // Test 15: Append-Only Content Audit Log Immutability
  console.log('Test 15: Append-Only Audit Log Immutability')
  const { error: auditUpdErr } = await supabaseServer.from('content_audit_logs').update({ change_summary: 'Tampered' }).eq('actor_user_id', STUDENT_USER.id)
  assert(auditUpdErr, 'Updating content_audit_logs must fail')
  const { error: auditDelErr } = await supabaseServer.from('content_audit_logs').delete().eq('actor_user_id', STUDENT_USER.id)
  assert(auditDelErr, 'Deleting from content_audit_logs must fail')
  console.log('  ✓ content_audit_logs UPDATE and DELETE strictly rejected.')

  // Test 16: Direct Content Manager Creation (Option A) + Scoped Login & Question Authoring
  console.log('Test 16: Direct Content Manager Account Creation (Option A) & Auth Compatibility')
  const defaultCampus = db.campuses[0]
  const directEmail = 'direct.author@kalvilearn.test'
  const createDirectRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Direct Content Author',
    email: directEmail,
    campusId: defaultCampus?.id || null,
    creationMode: 'DIRECT',
    permissions: ['content.question.view', 'content.question.create', 'content.question.edit', 'content.test_case.manage', 'content.module.view'],
    scopeType: 'SCOPED',
    moduleIds: [mod1.id],
    notes: 'Provisioned directly via Super Admin + Add Content Manager',
  })
  assert.strictEqual(createDirectRes.status, 201, `Expected 201 on create_content_manager, got ${createDirectRes.status}: ${createDirectRes.body?.message}`)
  const directUserId = createDirectRes.body.data.userId
  const directAssignId = createDirectRes.body.data.assignmentId
  assert.strictEqual(createDirectRes.body.data.status, 'ACTIVE')
  assert.strictEqual(createDirectRes.body.data.role, 'CONTENT_MANAGER')

  // Verify the created user authenticates directly via existing role-based session
  const DIRECT_CM_TOKEN = `test_auth_CONTENT_MANAGER_${directEmail}`
  const directMe = await callContentManager(DIRECT_CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(directMe.status, 200)
  assert.strictEqual(directMe.body.data.email, directEmail)
  assert.strictEqual(directMe.body.data.scopeType, 'SCOPED')

  // Verify direct user can create authored content inside assigned scope
  const directQ = await callContentManager(DIRECT_CM_TOKEN, 'create_question', {
    title: 'Direct CM Authored Question',
    slug: 'direct-cm-authored-q',
    difficulty: 'Easy',
    description: 'Created by directly provisioned CM',
    learningUnitId: unitInMod1.id,
    testCases: [{ input: '1', expectedOutput: '1', isHidden: false }],
  })
  assert.strictEqual(directQ.status, 201)
  const directQId = directQ.body.data.id
  console.log('  ✓ Option A creates user + RBAC records + scoped login + content authoring cleanly.')

  // Test 17: Duplicate Email, Duplicate Existing Assignment & Protected Super Admin Guards
  console.log('Test 17: Duplicate Email (409), Duplicate Assignment (409) & Protected Account (403) Guards')
  const dupEmailRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Duplicate Author',
    email: directEmail.toUpperCase(),
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'NONE',
  })
  assert.strictEqual(dupEmailRes.status, 409, 'Duplicate email on create_content_manager must return 409')

  const dupAssignRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: directUserId,
    preventDuplicateAssignment: true,
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'NONE',
  })
  assert.strictEqual(dupAssignRes.status, 409, 'Duplicate active assignment via Option B must return 409')

  const protectedCreate = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Blocked Super Admin Clone',
    email: 'sgjitbros@gmail.com',
    permissions: DEFAULT_CONTENT_MANAGER_PERMISSIONS,
    scopeType: 'NONE',
  })
  assert.strictEqual(protectedCreate.status, 403, 'Protected Super Admin email must return 403')
  console.log('  ✓ 409 duplicate guards and 403 Super Admin protection verified.')

  // Test 18: Invited Provisioning Mode, Fail-Closed Auth Guards, Duplicate auth.users Guard & Activation
  console.log('Test 18: Invited Provisioning Mode, Auth Failure Guards & Status/is_active Invariants')
  const invitedEmail = 'invited.author@kalvilearn.test'
  const createInviteRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Invited Content Author',
    email: invitedEmail,
    creationMode: 'INVITE',
    permissions: ['content.question.view', 'content.module.view'],
    scopeType: 'NONE',
    notes: 'Pending invite acceptance',
  })
  assert.strictEqual(createInviteRes.status, 201)
  assert.strictEqual(createInviteRes.body.data.status, 'INVITED')
  assert.strictEqual(createInviteRes.body.data.isActive, false, 'INVITED status must enforce isActive === false')
  assert.strictEqual(createInviteRes.body.data.authInviteSent, true)
  const invAssignRow = db.content_manager_assignments.find((a: any) => a.id === createInviteRes.body.data.assignmentId)
  assert.strictEqual(invAssignRow?.status, 'INVITED')
  assert.strictEqual(invAssignRow?.is_active, false, 'DB row for INVITED must strictly keep is_active = false')
  assert(db.auth_users.some((au: any) => au.email === invitedEmail), 'Supabase Auth user created on INVITE')

  // Unaccepted INVITED user must NOT have active API access until accepted/activated
  const invitedMePending = await callContentManager(`test_auth_CONTENT_MANAGER_${invitedEmail}`, 'me', {}, 'GET')
  assert.strictEqual(invitedMePending.status, 403, 'Pending INVITED assignment (is_active=false) must fail closed (403)')

  // Duplicate auth.users email check even when absent from public.users
  db.auth_users.push({ id: 'auth-only-dup-1', email: 'only.in.auth@kalvilearn.test' })
  const dupAuthInvite = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Dup Auth User',
    email: 'only.in.auth@kalvilearn.test',
    creationMode: 'INVITE',
    permissions: ['content.question.view'],
    scopeType: 'NONE',
  })
  assert.strictEqual(dupAuthInvite.status, 409, 'Duplicate auth.users identity must return 409 Conflict')
  assert(!db.users.some((u: any) => u.email === 'only.in.auth@kalvilearn.test'), 'Failed duplicate auth check must leave zero public.users rows')

  // Auth invite failure/unavailability must NEVER report silent success
  ;(db as any).__authControl.failInvite = true
  const failedInviteRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Failed Invite User',
    email: 'failed.invite@kalvilearn.test',
    creationMode: 'INVITE',
    permissions: ['content.question.view'],
    scopeType: 'NONE',
  })
  ;(db as any).__authControl.failInvite = false
  assert.strictEqual(failedInviteRes.status, 502, 'Auth invite failure must return explicit 502 error')
  assert(!db.users.some((u: any) => u.email === 'failed.invite@kalvilearn.test'), 'Failed auth invite must create zero public.users rows')

  // Activating INVITED user transitions atomically to ACTIVE + is_active = true without escalating scope
  const activateInvRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'reactivate_content_manager', {
    assignmentId: createInviteRes.body.data.assignmentId,
  })
  assert.strictEqual(activateInvRes.status, 200)
  assert.strictEqual(activateInvRes.body.data.status, 'ACTIVE')
  assert.strictEqual(activateInvRes.body.data.isActive, true)
  assert.strictEqual(activateInvRes.body.data.scopeType, 'NONE', 'Activation must keep configured NONE scope')
  const activatedMe = await callContentManager(`test_auth_CONTENT_MANAGER_${invitedEmail}`, 'me', {}, 'GET')
  assert.strictEqual(activatedMe.status, 200)
  console.log('  ✓ INVITED (is_active=false), Auth fail-closed 502/409, zero orphan rollback, and safe activation verified.')

  // Test 19: Edit Profile, Permissions & Scope + Verify Directory Stats
  console.log('Test 19: Edit Content Manager Profile/Permissions/Scope & Directory Stats')
  const editRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'update_content_manager', {
    userId: directUserId,
    name: 'Direct Content Author Updated',
    campusId: null,
    permissions: ['content.question.view', 'content.question.create', 'content.question.edit', 'content.module.view', 'content.unit.edit'],
    scopeType: 'SCOPED',
    moduleIds: [mod1.id],
    notes: 'Updated notes and profile',
  })
  assert.strictEqual(editRes.status, 200)
  assert.strictEqual(db.users.find((u: any) => u.id === directUserId)?.email, directEmail, 'Email/Auth identity must remain unchanged')
  assert.strictEqual(db.users.find((u: any) => u.id === directUserId)?.name, 'Direct Content Author Updated')

  const pendingInviteRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Pending Invited Author',
    email: 'pending.invite2@kalvilearn.test',
    creationMode: 'INVITE',
    permissions: ['content.question.view'],
    scopeType: 'NONE',
  })
  assert.strictEqual(pendingInviteRes.status, 201)

  const dirRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'list_content_managers')
  assert.strictEqual(dirRes.status, 200)
  assert(dirRes.body.data.stats.total >= 5)
  assert(dirRes.body.data.stats.active >= 2)
  assert(dirRes.body.data.stats.invited >= 1)
  const pendingInvEntry = dirRes.body.data.assignments.find((a: any) => a.id === pendingInviteRes.body.data.assignmentId)
  assert.strictEqual(pendingInvEntry?.status, 'INVITED')
  assert.strictEqual(pendingInvEntry?.isActive, false, 'Directory listing must report isActive=false for INVITED status')
  const dirEntry = dirRes.body.data.assignments.find((a: any) => a.id === directAssignId)
  assert(dirEntry && dirEntry.updatedBy === 'sgjitbros@gmail.com' && dirEntry.name === 'Direct Content Author Updated')
  console.log('  ✓ Edit preserved Auth email, saved updatedBy/updatedAt, and updated directory stats.')

  // Test 20: Suspend Preserves Permissions/Scope/Content & Immediately Blocks /content-manager
  console.log('Test 20: Suspension Lifecycle, Permission Preservation & Immediate 403')
  const suspendRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'suspend_content_manager', {
    assignmentId: directAssignId,
    reason: 'Temporary curriculum freeze',
  })
  assert.strictEqual(suspendRes.status, 200)
  assert.strictEqual(suspendRes.body.data.status, 'SUSPENDED')

  // Immediately blocked on /api/content-manager
  const suspendedMe = await callContentManager(DIRECT_CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(suspendedMe.status, 403, 'Suspended Content Manager must immediately receive 403')

  // Editing metadata while suspended must preserve SUSPENDED state
  const editWhileSuspended = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'update_content_manager', {
    userId: directUserId,
    name: 'Direct Content Author While Suspended',
    permissions: ['content.question.view', 'content.question.create', 'content.question.edit', 'content.module.view'],
    scopeType: 'SCOPED',
    moduleIds: [mod1.id],
    notes: 'Edited while suspended',
  })
  assert.strictEqual(editWhileSuspended.status, 200)
  assert.strictEqual(editWhileSuspended.body.data.status, 'SUSPENDED', 'Editing a suspended manager must not accidentally unsuspend')

  // Authored content and permissions remain intact in DB
  assert(db.Problem.some((p: any) => p.id === directQId), 'Authored question must be preserved during suspension')
  assert.strictEqual(db.content_manager_scopes.filter((s: any) => s.assignment_id === directAssignId).length, 1, 'Scopes preserved during suspension')
  console.log('  ✓ Suspended user blocked immediately (403) while permissions, scopes & authored content preserved.')

  // Test 21: Reactivate Restores Exact Prior Scope (Never Auto-Grants GLOBAL)
  console.log('Test 21: Reactivation Lifecycle & Exact Scope Restoration')
  const reactivateRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'reactivate_content_manager', {
    assignmentId: directAssignId,
  })
  assert.strictEqual(reactivateRes.status, 200)
  assert.strictEqual(reactivateRes.body.data.status, 'ACTIVE')
  assert.strictEqual(reactivateRes.body.data.scopeType, 'SCOPED', 'Reactivation must restore exact SCOPED access and NEVER upgrade to GLOBAL')

  const postReactivateMe = await callContentManager(DIRECT_CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(postReactivateMe.status, 200, 'Reactivated Content Manager must regain access immediately')
  assert.strictEqual(postReactivateMe.body.data.scopeType, 'SCOPED')
  console.log('  ✓ Reactivated manager regained SCOPED access cleanly with saved permissions.')

  // Test 22: Permanent Revoke Safely Downgrades Direct User, Preserves Content/Audit, Blocks Reactivate (400)
  console.log('Test 22: Revoke Preserves Content/Audit, Downgrades Direct User, Blocks Reactivate (400)')
  const revokeDirectRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'revoke_content_manager', {
    assignmentId: directAssignId,
  })
  assert.strictEqual(revokeDirectRes.status, 200)
  assert.strictEqual(revokeDirectRes.body.data.status, 'REVOKED')
  assert.strictEqual(db.users.find((u: any) => u.id === directUserId)?.role, 'STUDENT', 'Revoked Option A user safely downgraded to STUDENT')
  assert(db.Problem.some((p: any) => p.id === directQId), 'Authored question preserved after revoke')
  assert(db.content_audit_logs.length >= 8, 'Audit history preserved after revoke')

  const postRevokeDirectMe = await callContentManager(DIRECT_CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(postRevokeDirectMe.status, 403, 'Revoked direct user immediately blocked from /content-manager')

  const reactivateRevoked = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'reactivate_content_manager', {
    assignmentId: directAssignId,
  })
  assert.strictEqual(reactivateRevoked.status, 400, 'Reactivating permanently REVOKED assignment must fail with 400')
  console.log('  ✓ Permanent revoke preserved content/audit, safely downgraded role, and blocked direct reactivate (400).')

  // Test 23: Non-Super-Admin Privilege Escalation Protection
  console.log('Test 23: Non-Super-Admin Users Blocked from Content Manager Lifecycle Actions (403)')
  for (const action of ['create_content_manager', 'suspend_content_manager', 'reactivate_content_manager']) {
    const blockedSa = await callSuperAdmin(CM_TOKEN, action, { email: 'evil@kalvilearn.test', name: 'Evil' })
    assert.strictEqual(blockedSa.status, 403, `Non-super-admin must receive 403 for ${action} on /api/super-admin`)
    const blockedCm = await callContentManager(CM_TOKEN, action, { email: 'evil@kalvilearn.test', name: 'Evil' })
    assert.strictEqual(blockedCm.status, 403, `Content manager must receive 403 for ${action} on /api/content-manager`)
  }
  console.log('  ✓ All new lifecycle actions strictly restricted to verified Super Admin.')

  console.log('\n======================================================================')
  console.log('ALL 23 CONTENT MANAGER USER MANAGEMENT, RBAC & SECURITY SUITES PASSED 100%!')
  console.log('======================================================================')
}

main().catch((err) => {
  console.error('TEST FAILED:', err)
  process.exit(1)
})
