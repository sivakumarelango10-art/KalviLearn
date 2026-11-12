/**
 * KalviLearn — Simplified Unified Content Manager & RBAC Verification Suite
 *
 * Verifies the simplified single fixed Content Manager role profile across:
 *   1. Authentication & role gates (/api/content-manager vs /api/super-admin)
 *   2. Sole Super Admin protection (sgjitbros@gmail.com)
 *   3. Unified fixed capabilities & GLOBAL curriculum access (zero permission/scope table writes)
 *   4. Area A: Curriculum Modules & Learning Units create/edit/reorder/publish
 *   5. Area B: Practice Coding Questions retaining Belt (beltId) & separation from Learn Coding
 *   6. Area C: Learn Coding Questions associated with LearningUnit & separation from Practice
 *   7. Examples, public & hidden test cases, multi-language starter codes (Python/Java/C++/JS) & test runner
 *   8. Student security (DRAFT isolation, student preview omitting hidden test expected outputs)
 *   9. Direct (Option A) & Invited (Option A INVITE) provisioning, duplicate 409 & Auth 502 fail-closed guards
 *  10. Lifecycle enforcement: SUSPENDED -> immediate 403, Reactivate -> ACTIVE, REVOKED -> role restoration & 400 guard
 *  11. Append-only content_audit_logs immutability
 */

import assert from 'assert'
import { EventEmitter } from 'events'

process.env.NODE_ENV = 'test'
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

import { supabaseServer, clearAuthCacheForTesting } from '../src/server/feedbackAuth'
import superAdminHandler, { resetSuperAdminRateLimitsForTesting } from '../src/server/superAdminHandler'
import contentManagerHandler, { resetContentManagerRateLimitsForTesting } from '../src/server/contentManagerHandler'
import { installMockSupabaseServer } from './mockDatabase'
import { resolveQuestionAsync } from '../src/server/judge/testRepository'
import { FIXED_CONTENT_MANAGER_PERMISSIONS, FIXED_CONTENT_MANAGER_AREAS } from '../src/lib/contentPermissions'

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

async function callContentManager(
  token: string | null,
  action: string,
  body: Record<string, unknown> = {},
  method: 'GET' | 'POST' = 'POST'
) {
  const url =
    action === 'me'
      ? '/api/content-manager/me'
      : action === 'dashboard'
        ? '/api/content-manager/dashboard'
        : action === 'list_my_revisions'
          ? '/api/content-manager/revisions'
          : '/api/content-manager'
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
  console.log('KALVILEARN — SIMPLIFIED CONTENT MANAGER & RBAC VERIFICATION SUITE')
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
  const belt1 = db.Belt[0]
  assert(mod1 && mod2 && unitInMod1 && unitInMod2 && belt1, 'Baseline modules, units, and belts must exist in mockDb')

  // Test 1: Unauthenticated & Non-Content-Manager access rejected
  console.log('Test 1: Authentication & role gate on /api/content-manager')
  const unauthRes = await callContentManager(null, 'me', {}, 'GET')
  assert.strictEqual(unauthRes.status, 401, 'Missing token must return 401')
  const studentCmRes = await callContentManager(STUDENT_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(studentCmRes.status, 403, 'Student calling /api/content-manager must return 403')
  const mentorCmRes = await callContentManager(MENTOR_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(mentorCmRes.status, 403, 'Mentor calling /api/content-manager must return 403')
  console.log('  OK Unauthenticated (401) and Student/Mentor (403) strictly blocked.')

  // Test 2: Non-Super-Admin blocked from Super Admin CM APIs & CM blocked from Super Admin/student/role endpoints
  console.log('Test 2: Strict Super Admin & student-boundary enforcement')
  const nonAdminGrant = await callSuperAdmin(STUDENT_TOKEN, 'grant_content_manager', { userId: STUDENT_USER.id })
  assert.strictEqual(nonAdminGrant.status, 403, 'Student calling grant_content_manager must get 403')
  const protectSuper = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    email: 'sgjitbros@gmail.com',
  })
  assert.strictEqual(protectSuper.status, 403, 'Sole Super Admin cannot be converted to Content Manager')
  console.log('  OK Non-Super-Admin blocked (403) and sgjitbros@gmail.com protected (403).')

  // Test 3: Grant Content Manager assigns unified fixed access without permission/scope table rows
  console.log('Test 3: Granting Content Manager assigns unified fixed access (GLOBAL, zero permission/scope writes)')
  const grantRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: STUDENT_USER.id,
    notes: 'Simplified unified CM assignment',
  })
  assert.strictEqual(grantRes.status, 200)
  assert.strictEqual(grantRes.body.data.scopeType, 'GLOBAL')
  assert.strictEqual(db.users.find((u: any) => u.id === STUDENT_USER.id)?.role, 'CONTENT_MANAGER')
  assert.strictEqual(db.content_manager_permissions.length, 0, 'Must NOT write content_manager_permissions rows')
  assert.strictEqual(db.content_manager_scopes.length, 0, 'Must NOT write content_manager_scopes rows')

  const meRes = await callContentManager(CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(meRes.status, 200)
  assert.strictEqual(meRes.body.data.scopeType, 'GLOBAL')
  assert.deepStrictEqual(meRes.body.data.permissions, [...FIXED_CONTENT_MANAGER_PERMISSIONS])
  assert.strictEqual(FIXED_CONTENT_MANAGER_AREAS.length, 3)

  const dashRes = await callContentManager(CM_TOKEN, 'dashboard', {}, 'GET')
  assert.strictEqual(dashRes.status, 200)
  assert(typeof dashRes.body.data.stats.totalModules === 'number')
  assert(typeof dashRes.body.data.stats.totalLearningUnits === 'number')
  assert(typeof dashRes.body.data.stats.totalPracticeQuestions === 'number')
  assert(typeof dashRes.body.data.stats.totalLearnCodingQuestions === 'number')
  console.log('  OK Unified GLOBAL access, 3 fixed capability areas, and overview KPIs verified.')

  // Test 4: Content Manager CANNOT access Super Admin APIs, role changes, student data, or non-allowlisted actions
  console.log('Test 4: Content Manager blocked from Super Admin APIs, user roles, students, mentors')
  const cmTrySuperAdmin = await callSuperAdmin(CM_TOKEN, 'list_students')
  assert.strictEqual(cmTrySuperAdmin.status, 403, 'CM calling /api/super-admin must return 403')
  const cmTryRoleChange = await callContentManager(CM_TOKEN, 'update_user_role', {
    userId: OTHER_STUDENT.id,
    role: 'SUPERADMIN',
  })
  assert.strictEqual(cmTryRoleChange.status, 403, 'CM attempting non-allowlisted role escalation must return 403')
  const cmTryStudents = await callContentManager(CM_TOKEN, 'list_students')
  assert.strictEqual(cmTryStudents.status, 403, 'CM attempting list_students must return 403')
  console.log('  OK Super Admin, role escalation, and student endpoints blocked (403).')

  // Test 5: Area A — Curriculum Management (View all, Create/Edit Module, Create/Edit/Reorder/Publish Learning Unit)
  console.log('Test 5: Area A — Curriculum Modules & Learning Units CRUD + Reorder + Publish')
  const listMods = await callContentManager(CM_TOKEN, 'list_curriculum_modules')
  assert.strictEqual(listMods.status, 200)
  assert.strictEqual(listMods.body.data.modules.length, db.Module.length, 'Active CM must see ALL curriculum modules')

  const createdMod = await callContentManager(CM_TOKEN, 'create_curriculum_module', {
    title: 'CM Algorithms Module',
    description: 'Sorting, searching, and complexity',
    status: 'PUBLISHED',
  })
  assert.strictEqual(createdMod.status, 201)
  const newModId = createdMod.body.data.id

  const editedMod = await callContentManager(CM_TOKEN, 'update_curriculum_module', {
    id: newModId,
    description: 'Updated description by CM',
  })
  assert.strictEqual(editedMod.status, 200)

  const lu1 = await callContentManager(CM_TOKEN, 'create_learning_unit', {
    moduleId: newModId,
    title: 'Binary Search Lesson',
    concept: '## Binary Search\nDivide search interval in half.',
    readingTime: '12 min',
    status: 'PUBLISHED',
  })
  assert.strictEqual(lu1.status, 201)
  const lu1Id = lu1.body.data.id

  const lu2 = await callContentManager(CM_TOKEN, 'create_learning_unit', {
    moduleId: newModId,
    title: 'Two Pointers Lesson',
    concept: '## Two Pointers\nLinear time scanning.',
    status: 'DRAFT',
  })
  assert.strictEqual(lu2.status, 201)
  const lu2Id = lu2.body.data.id

  const editLu = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: lu2Id,
    concept: '## Two Pointers Updated\nSorted array scan in O(n).',
    status: 'PUBLISHED',
  })
  assert.strictEqual(editLu.status, 200)

  const reorderLu = await callContentManager(CM_TOKEN, 'reorder_learning_units', {
    moduleId: newModId,
    orders: [
      { id: lu2Id, order: 1 },
      { id: lu1Id, order: 2 },
    ],
  })
  assert.strictEqual(reorderLu.status, 200)
  console.log('  OK Module create/edit and Learning Unit create/edit/reorder/publish succeeded.')

  // Test 6: Area B — Practice Coding Questions retain Belt (beltId) & stay separate from Learn Coding
  console.log('Test 6: Area B — Practice Coding Questions (Belt relationship + filter separation)')
  const beltsRes = await callContentManager(CM_TOKEN, 'list_belts')
  assert.strictEqual(beltsRes.status, 200)
  assert(beltsRes.body.data.length >= 1, 'list_belts must return existing belts')

  const createPractice = await callContentManager(CM_TOKEN, 'create_question', {
    title: 'CM Belt Practice Two Sum Variant',
    slug: 'cm-practice-two-sum-variant',
    difficulty: 'Easy',
    description: 'Read n and array, compute max element.',
    inputFormat: 'First line n, second line n ints',
    outputFormat: 'Single integer max',
    beltId: belt1.id,
    status: 'DRAFT',
    examples: [{ label: 'Ex1', input: '3\n1 9 4', output: '9', explanation: 'Max is 9' }],
    testCases: [
      { input: '3\n1 9 4', expectedOutput: '9', isHidden: false },
      { input: '4\n-5 -2 -9 -1', expectedOutput: '-1', isHidden: true },
    ],
    starterCodes: {
      python: 'n = int(input())\narr = list(map(int, input().split()))\nprint(max(arr))',
      javascript: 'const fs=require("fs");const nums=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);console.log(Math.max(...nums.slice(1)));',
      java: 'import java.util.*; class Solution { public static void main(String[] args) {} }',
      cpp: '#include <iostream>\nusing namespace std;\nint main(){return 0;}',
    },
  })
  assert.strictEqual(createPractice.status, 201)
  const practiceId = createPractice.body.data.id
  const practiceRow = db.Problem.find((p: any) => p.id === practiceId)
  assert.strictEqual(practiceRow?.beltId, belt1.id, 'Practice question must retain beltId')
  assert.strictEqual(practiceRow?.learningUnitId, null, 'Practice question must NOT set learningUnitId')

  const editPractice = await callContentManager(CM_TOKEN, 'update_question', {
    id: practiceId,
    title: 'CM Belt Practice Max Element',
    beltId: belt1.id,
    status: 'PUBLISHED',
  })
  assert.strictEqual(editPractice.status, 200)
  assert.strictEqual(db.Problem.find((p: any) => p.id === practiceId)?.beltId, belt1.id, 'Editing Practice question must preserve beltId')
  console.log('  OK Practice question created/edited with Belt relationship retained.')

  // Test 7: Area C — Learn Coding Lesson Questions (LearningUnit linked) + 7-Tab Persistence & Test Runner
  console.log('Test 7: Area C — Learn Coding Questions (LearningUnit linked), 7-Tab Persistence, Runner & Student Preview Security')
  const createLearnCoding = await callContentManager(CM_TOKEN, 'create_question', {
    title: 'CM Learn Coding Addition',
    slug: 'cm-learn-coding-addition',
    difficulty: 'Easy',
    description: 'Add two integers a and b.',
    inputFormat: 'Two space-separated integers a and b',
    outputFormat: 'Single integer a + b',
    learningUnitId: lu1Id,
    status: 'DRAFT',
    examples: [{ label: 'Ex1', input: '2 3', output: '5', explanation: '2 + 3 = 5' }],
    testCases: [
      { input: '2 3', expectedOutput: '5', isHidden: false },
      { input: '10 20', expectedOutput: '30', isHidden: true },
    ],
    starterCodes: {
      python: 'a, b = map(int, input().split())\nprint(a + b)',
      javascript: 'const fs=require("fs");const [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);console.log(a+b);',
      java: 'import java.util.*; class Solution { public static void main(String[] args) {} }',
      cpp: '#include <iostream>\nusing namespace std;\nint main(){return 0;}',
    },
  })
  assert.strictEqual(createLearnCoding.status, 201)
  const learnQId = createLearnCoding.body.data.id
  const learnQRow = db.Problem.find((p: any) => p.id === learnQId)
  assert.strictEqual(learnQRow?.learningUnitId, lu1Id, 'Learn Coding question must link to learningUnitId')
  assert.strictEqual(learnQRow?.beltId, null, 'Learn Coding question must NOT overwrite Practice beltId')

  // Verify Practice vs Learn Coding filtering separates them cleanly
  const practiceListRes = await callContentManager(CM_TOKEN, 'list_questions', { questionType: 'PRACTICE', beltId: belt1.id })
  assert.strictEqual(practiceListRes.status, 200)
  assert(practiceListRes.body.data.questions.some((q: any) => q.id === practiceId), 'PRACTICE list must include created practice question')
  assert(!practiceListRes.body.data.questions.some((q: any) => q.id === learnQId), 'PRACTICE list must NOT include Learn Coding question')

  const learnListRes = await callContentManager(CM_TOKEN, 'list_questions', { questionType: 'LEARN_CODING' })
  assert.strictEqual(learnListRes.status, 200)
  assert(learnListRes.body.data.questions.some((q: any) => q.id === learnQId), 'LEARN_CODING list must include created learn coding question')
  assert(!learnListRes.body.data.questions.some((q: any) => q.id === practiceId), 'LEARN_CODING list must NOT include Practice question')

  // Draft question is NOT visible to student testRepository!
  const studentDraftLookup = await resolveQuestionAsync('cm-learn-coding-addition')
  assert('error' in studentDraftLookup, 'DRAFT Learn Coding question must NOT be exposed in student testRepository')

  // Run public + hidden tests via CM test runner
  const runTests = await callContentManager(CM_TOKEN, 'run_question_tests', {
    id: learnQId,
    language: 'javascript',
    code: 'const fs=require("fs");const [a,b]=fs.readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);console.log(a+b);',
    filter: 'all',
  })
  assert.strictEqual(runTests.status, 200)
  assert.strictEqual(runTests.body.data.status, 'ACCEPTED')
  assert.strictEqual(runTests.body.data.passedTests, 2)

  // Normalized DB records check (Examples, TestCases incl. hidden, StarterCodes across 4 langs, Revisions)
  assert.strictEqual(db.ProblemExample.filter((e: any) => e.problemId === learnQId).length, 1)
  assert.strictEqual(db.ProblemTestCase.filter((t: any) => t.problemId === learnQId).length, 2)
  assert.strictEqual(db.ProblemStarterCode.filter((s: any) => s.problemId === learnQId).length, 4)

  // Edit & publish Learn Coding question + verify Duplicate creates DRAFT
  const publishLearn = await callContentManager(CM_TOKEN, 'update_question', {
    id: learnQId,
    title: 'CM Learn Coding Addition Published',
    status: 'PUBLISHED',
    changeSummary: 'Ready for students',
  })
  assert.strictEqual(publishLearn.status, 200)
  assert.strictEqual(publishLearn.body.data.status, 'PUBLISHED')

  const dupQ = await callContentManager(CM_TOKEN, 'duplicate_question', { id: learnQId })
  assert.strictEqual(dupQ.status, 201)
  assert.strictEqual(dupQ.body.data.status, 'DRAFT')

  // Published Learn Coding question resolves for student judge, and student preview NEVER reveals hidden expected outputs
  const studentPublishedLookup = await resolveQuestionAsync('cm-learn-coding-addition')
  assert('suite' in studentPublishedLookup, 'Published Learn Coding question must resolve for student judge')
  const previewRes = await callContentManager(CM_TOKEN, 'get_question_preview', { id: learnQId })
  assert.strictEqual(previewRes.status, 200)
  assert.strictEqual(previewRes.body.data.publicTestCases.length, 1)
  assert.strictEqual(previewRes.body.data.publicTestCases.every((t: any) => !t.isHidden), true)
  console.log('  OK Practice vs Learn Coding separation, 7-tab persistence, test runner, and student security verified.')

  // Test 8: Super Admin Option A Direct Provisioning + Duplicate & Fail-Closed Auth Guards
  console.log('Test 8: Option A Direct Provisioning, Invites, Duplicate 409 & Fail-Closed Auth 502')
  const defaultCampus = db.campuses[0]
  const directEmail = 'direct.author@kalvilearn.test'
  const createDirectRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Direct Content Author',
    email: directEmail,
    campusId: defaultCampus?.id || null,
    creationMode: 'DIRECT',
    notes: 'Direct simplified onboarding',
  })
  assert.strictEqual(createDirectRes.status, 201)
  const directUserId = createDirectRes.body.data.userId
  const directAssignId = createDirectRes.body.data.assignmentId
  assert.strictEqual(createDirectRes.body.data.status, 'ACTIVE')
  assert.strictEqual(createDirectRes.body.data.scopeType, 'GLOBAL')

  const DIRECT_CM_TOKEN = `test_auth_CONTENT_MANAGER_${directEmail}`
  const directMe = await callContentManager(DIRECT_CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(directMe.status, 200)
  assert.strictEqual(directMe.body.data.scopeType, 'GLOBAL')

  const directQ = await callContentManager(DIRECT_CM_TOKEN, 'create_question', {
    title: 'Direct CM Question',
    slug: 'direct-cm-question',
    difficulty: 'Easy',
    description: 'Created by directly provisioned CM',
    learningUnitId: unitInMod2.id,
    testCases: [{ input: '1', expectedOutput: '1', isHidden: false }],
  })
  assert.strictEqual(directQ.status, 201)
  const directQId = directQ.body.data.id

  // Duplicate email (409) & duplicate assignment (409)
  const dupEmailRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Duplicate Author',
    email: directEmail.toUpperCase(),
  })
  assert.strictEqual(dupEmailRes.status, 409)
  const dupAssignRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', {
    userId: directUserId,
    preventDuplicateAssignment: true,
  })
  assert.strictEqual(dupAssignRes.status, 409)

  // INVITE mode + pending 403 + Auth fail-closed 502 + duplicate auth.users 409
  const invitedEmail = 'invited.author@kalvilearn.test'
  const createInviteRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Invited Content Author',
    email: invitedEmail,
    creationMode: 'INVITE',
    notes: 'Pending invite acceptance',
  })
  assert.strictEqual(createInviteRes.status, 201)
  assert.strictEqual(createInviteRes.body.data.status, 'INVITED')
  assert.strictEqual(createInviteRes.body.data.isActive, false)

  const invitedMePending = await callContentManager(`test_auth_CONTENT_MANAGER_${invitedEmail}`, 'me', {}, 'GET')
  assert.strictEqual(invitedMePending.status, 403, 'Pending INVITED assignment must fail closed (403)')

  db.auth_users.push({ id: 'auth-only-dup-1', email: 'only.in.auth@kalvilearn.test' })
  const dupAuthInvite = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Dup Auth User',
    email: 'only.in.auth@kalvilearn.test',
    creationMode: 'INVITE',
  })
  assert.strictEqual(dupAuthInvite.status, 409)
  assert(!db.users.some((u: any) => u.email === 'only.in.auth@kalvilearn.test'))
  ;(db as any).__authControl.failInvite = true
  const failedInviteRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'create_content_manager', {
    name: 'Failed Invite User',
    email: 'failed.invite@kalvilearn.test',
    creationMode: 'INVITE',
  })
  ;(db as any).__authControl.failInvite = false
  assert.strictEqual(failedInviteRes.status, 502)
  assert(!db.users.some((u: any) => u.email === 'failed.invite@kalvilearn.test'))

  const activateInvRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'reactivate_content_manager', {
    assignmentId: createInviteRes.body.data.assignmentId,
  })
  assert.strictEqual(activateInvRes.status, 200)
  assert.strictEqual(activateInvRes.body.data.status, 'ACTIVE')
  assert.strictEqual(activateInvRes.body.data.isActive, true)
  const activatedMe = await callContentManager(`test_auth_CONTENT_MANAGER_${invitedEmail}`, 'me', {}, 'GET')
  assert.strictEqual(activatedMe.status, 200)
  console.log('  OK Direct/Invite provisioning, duplicate guards (409), Auth 502 fail-closed, and activation verified.')

  // Test 9: Lifecycle — Edit Profile, Suspend -> 403, Reactivate -> ACTIVE, Revoke -> Role Restoration & 400
  console.log('Test 9: Account Lifecycle (Edit Profile, Suspend, Reactivate, Revoke, Role Restoration)')
  const editRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'update_content_manager', {
    userId: directUserId,
    name: 'Direct Content Author Updated',
    campusId: null,
    notes: 'Updated notes only',
  })
  assert.strictEqual(editRes.status, 200)
  assert.strictEqual(db.users.find((u: any) => u.id === directUserId)?.name, 'Direct Content Author Updated')

  const suspendRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'suspend_content_manager', {
    assignmentId: directAssignId,
    reason: 'Temporary leave',
  })
  assert.strictEqual(suspendRes.status, 200)
  assert.strictEqual(suspendRes.body.data.status, 'SUSPENDED')

  const suspendedMe = await callContentManager(DIRECT_CM_TOKEN, 'me', {}, 'GET')
  assert.strictEqual(suspendedMe.status, 403, 'Suspended Content Manager must receive 403 immediately')

  const editWhileSuspended = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'update_content_manager', {
    userId: directUserId,
    name: 'Direct Content Author While Suspended',
  })
  assert.strictEqual(editWhileSuspended.status, 200)
  assert.strictEqual(editWhileSuspended.body.data.status, 'SUSPENDED', 'Editing while suspended must preserve SUSPENDED')
  assert(db.Problem.some((p: any) => p.id === directQId), 'Authored content preserved during suspension')

  const reactivateRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'reactivate_content_manager', {
    assignmentId: directAssignId,
  })
  assert.strictEqual(reactivateRes.status, 200)
  assert.strictEqual(reactivateRes.body.data.status, 'ACTIVE')
  assert.strictEqual((await callContentManager(DIRECT_CM_TOKEN, 'me', {}, 'GET')).status, 200)

  const revokeDirectRes = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'revoke_content_manager', {
    assignmentId: directAssignId,
  })
  assert.strictEqual(revokeDirectRes.status, 200)
  assert.strictEqual(revokeDirectRes.body.data.status, 'REVOKED')
  assert.strictEqual(db.users.find((u: any) => u.id === directUserId)?.role, 'STUDENT')
  assert.strictEqual((await callContentManager(DIRECT_CM_TOKEN, 'me', {}, 'GET')).status, 403)
  assert.strictEqual(
    (await callSuperAdmin(SUPER_ADMIN_TOKEN, 'reactivate_content_manager', { assignmentId: directAssignId })).status,
    400,
    'Reactivating REVOKED assignment must fail with 400'
  )

  // Mentor/Campus Manager role restoration & override guard
  const MENTOR_USER = {
    id: 'user-cm-mentor-1',
    email: 'mentor.author@kalvilearn.test',
    name: 'Mentor Author',
    role: 'MENTOR',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  db.users.push(MENTOR_USER)
  await callSuperAdmin(SUPER_ADMIN_TOKEN, 'grant_content_manager', { userId: MENTOR_USER.id })
  const revMentor = await callSuperAdmin(SUPER_ADMIN_TOKEN, 'revoke_content_manager', { userId: MENTOR_USER.id })
  assert.strictEqual(revMentor.body.data.restoredRole, 'MENTOR')
  assert.strictEqual(db.users.find((u: any) => u.id === MENTOR_USER.id)?.role, 'MENTOR')
  console.log('  OK Suspend (403), Reactivate (ACTIVE), Revoke (role restore + 400 guard) verified.')

  // Test 10: Append-only audit logs + zero legacy permission/scope rows + non-SA guard on lifecycle routes
  console.log('Test 10: Audit Immutability, Super Admin Action Guards & Zero Permission/Scope Table Usage')
  const { error: auditUpdErr } = await supabaseServer
    .from('content_audit_logs')
    .update({ change_summary: 'Tampered' })
    .eq('actor_user_id', STUDENT_USER.id)
  assert(auditUpdErr, 'Updating content_audit_logs must fail')
  const { error: auditDelErr } = await supabaseServer
    .from('content_audit_logs')
    .delete()
    .eq('actor_user_id', STUDENT_USER.id)
  assert(auditDelErr, 'Deleting from content_audit_logs must fail')

  for (const action of ['create_content_manager', 'suspend_content_manager', 'reactivate_content_manager']) {
    assert.strictEqual((await callSuperAdmin(CM_TOKEN, action, { email: 'evil@kalvilearn.test', name: 'Evil' })).status, 403)
    assert.strictEqual((await callContentManager(CM_TOKEN, action, { email: 'evil@kalvilearn.test', name: 'Evil' })).status, 403)
  }

  assert.strictEqual(db.content_manager_permissions.length, 0, 'Zero rows should exist in content_manager_permissions')
  assert.strictEqual(db.content_manager_scopes.length, 0, 'Zero rows should exist in content_manager_scopes')
  console.log('  OK Audit logs append-only, lifecycle routes Super-Admin-only, and zero granular permission/scope rows written.')

  console.log('\n======================================================================')
  console.log('ALL 10 SIMPLIFIED CONTENT MANAGER & RBAC SUITES PASSED 100%!')
  console.log('======================================================================')
}

main().catch((err) => {
  console.error('TEST FAILED:', err)
  process.exit(1)
})
