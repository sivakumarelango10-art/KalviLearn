/**
 * KalviLearn — Content Manager Learning Unit Update & Persistence Test Suite
 *
 * Verifies the end-to-end bug fix for:
 * "Content Manager Shows Success but Learning Unit Is Not Updated"
 *
 * Covers:
 *   1. Editing lesson title
 *   2. Editing concept explanation (mapped to content in database, read back as concept)
 *   3. Editing approach / walkthrough
 *   4. Updating reading time minutes (numbers and numeric strings)
 *   5. "Save Draft" persistence (status = 'DRAFT', isActive = false, approvalStatus = 'DRAFT')
 *   6. "Save & Publish" persistence (status = 'PUBLISHED', isActive = true, approvalStatus = 'APPROVED')
 *   7. Invalid lesson ID returns 404 Not Found
 *   8. Unauthorized non-Content-Manager role returns 403 Forbidden
 *   9. Missing Unit ID returns 400 Bad Request
 *  10. Page refresh / reload simulation: list_curriculum_modules reflects all updated fields
 */

import assert from 'assert'
import { EventEmitter } from 'events'

process.env.NODE_ENV = 'test'
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

import { supabaseServer, clearAuthCacheForTesting } from '../src/server/feedbackAuth'
import contentManagerHandler, { resetContentManagerRateLimitsForTesting } from '../src/server/contentManagerHandler'
import { installMockSupabaseServer } from './mockDatabase'

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

async function callContentManager(
  token: string | null,
  action: string,
  body: Record<string, unknown> = {},
  method: 'GET' | 'POST' = 'POST'
) {
  const { req, res, getResult } = createMockReqRes({
    method,
    url: '/api/content-manager/curriculum',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: method === 'GET' ? {} : { ...body, action },
  })
  await contentManagerHandler(req, res)
  return getResult()
}

async function main() {
  console.log('======================================================================')
  console.log('KALVILEARN — CONTENT MANAGER LEARNING UNIT UPDATE VERIFICATION')
  console.log('======================================================================\n')

  const db = installMockSupabaseServer(supabaseServer)
  clearAuthCacheForTesting()
  resetContentManagerRateLimitsForTesting()

  const CM_USER = {
    id: 'user-cm-synthetic-1',
    email: 'cm.author@kalvilearn.test',
    name: 'Content Manager Tester',
    role: 'CONTENT_MANAGER',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const STUDENT_USER = {
    id: 'user-unauthorized-student',
    email: 'student@kalvilearn.test',
    name: 'Student User',
    role: 'STUDENT',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  db.users.push(CM_USER, STUDENT_USER)
  db.content_managers.push({
    id: 'cm-profile-synthetic-1',
    user_id: CM_USER.id,
    manager_code: 'CM-0001',
    status: 'ACTIVE',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  db.content_manager_assignments.push({
    id: 'cma-synthetic-1',
    user_id: CM_USER.id,
    status: 'ACTIVE',
    is_active: true,
    scope_type: 'GLOBAL',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  const CM_TOKEN = 'test_auth_CONTENT_MANAGER_cm.author@kalvilearn.test'
  const STUDENT_TOKEN = 'test_auth_STUDENT_student@kalvilearn.test'

  const mod1 = db.Module[0]
  assert(mod1, 'At least one module must exist in mockDatabase')

  // Create a target learning unit to simulate "Variables & assignment"
  console.log('Setup: Creating initial Learning Unit "Variables & assignment"')
  const initialCreate = await callContentManager(CM_TOKEN, 'create_learning_unit', {
    moduleId: mod1.id,
    title: 'Variables & assignment',
    concept: 'Initial concept explanation for variables.',
    approach: 'Initial approach walkthrough.',
    readingTimeMinutes: 2,
    status: 'PUBLISHED',
  })
  if (initialCreate.status !== 201) {
    console.error('Initial create failed:', initialCreate.status, initialCreate.body)
  }
  assert.strictEqual(initialCreate.status, 201, 'Unit creation must return 201')
  const unitId = initialCreate.body.data.id
  assert(unitId, 'Created unit must have an id')
  console.log(`  OK Unit created with ID: ${unitId}`)

  // Test 1: Editing Lesson Title
  console.log('\nTest 1: Editing Lesson Title')
  const editTitleRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: unitId,
    title: 'Variables, Types & Assignment',
  })
  assert.strictEqual(editTitleRes.status, 200, 'Title update must return 200')
  assert.strictEqual(editTitleRes.body.data.title, 'Variables, Types & Assignment', 'Title must reflect updated value')
  console.log('  OK Lesson title updated successfully to "Variables, Types & Assignment"')

  // Test 2: Editing Concept / Lesson Explanation (concept -> content mapping)
  console.log('\nTest 2: Editing Concept / Lesson Explanation')
  const updatedConceptText = '### Detailed Lesson Concept\nVariables store values in memory with static/dynamic typing.'
  const editConceptRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: unitId,
    concept: updatedConceptText,
  })
  assert.strictEqual(editConceptRes.status, 200, 'Concept update must return 200')
  assert.strictEqual(editConceptRes.body.data.concept, updatedConceptText, 'Returned concept must match updated text')
  assert.strictEqual(editConceptRes.body.data.content, updatedConceptText, 'Underlying content column must match updated text')
  console.log('  OK Lesson concept updated and mapped to content column successfully')

  // Test 3: Editing Approach / Walkthrough
  console.log('\nTest 3: Editing Approach / Walkthrough')
  const updatedApproachText = 'Step 1: Declare the variable. Step 2: Assign value. Step 3: Print result.'
  const editApproachRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: unitId,
    approach: updatedApproachText,
  })
  assert.strictEqual(editApproachRes.status, 200, 'Approach update must return 200')
  assert.strictEqual(editApproachRes.body.data.approach, updatedApproachText, 'Approach must reflect updated text')
  console.log('  OK Lesson approach updated successfully')

  // Test 4: Updating Reading Time (both number and numeric string)
  console.log('\nTest 4: Updating Reading Time')
  const editReadingNumRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: unitId,
    readingTimeMinutes: 7,
  })
  assert.strictEqual(editReadingNumRes.status, 200)
  assert.strictEqual(editReadingNumRes.body.data.readingTimeMinutes, 7, 'Reading time number must update')

  const editReadingStrRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: unitId,
    readingTimeMinutes: '12' as any,
  })
  assert.strictEqual(editReadingStrRes.status, 200)
  assert.strictEqual(editReadingStrRes.body.data.readingTimeMinutes, 12, 'Reading time numeric string must parse to integer')
  console.log('  OK Reading time updated (numbers and numeric strings handled correctly)')

  // Test 5: "Save Draft" persistence
  console.log('\nTest 5: "Save Draft" persistence (status = DRAFT, isActive = false)')
  const saveDraftRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: unitId,
    title: 'Variables & assignment (Draft)',
    concept: 'Draft content under revision',
    approach: 'Draft approach',
    readingTimeMinutes: 5,
    status: 'DRAFT',
  })
  assert.strictEqual(saveDraftRes.status, 200)
  assert.strictEqual(saveDraftRes.body.data.status, 'DRAFT')
  assert.strictEqual(saveDraftRes.body.data.isActive, false)
  assert.strictEqual(saveDraftRes.body.data.approvalStatus, 'DRAFT')
  console.log('  OK "Save Draft" correctly sets status = DRAFT, isActive = false, approvalStatus = DRAFT')

  // Test 6: "Save & Publish" persistence
  console.log('\nTest 6: "Save & Publish" persistence (status = PUBLISHED, isActive = true)')
  const savePublishRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: unitId,
    title: 'Variables & Assignment (Published Final)',
    concept: 'Published final concept explanation.',
    approach: 'Published final walkthrough.',
    readingTimeMinutes: 8,
    status: 'PUBLISHED',
  })
  assert.strictEqual(savePublishRes.status, 200)
  assert.strictEqual(savePublishRes.body.data.status, 'PUBLISHED')
  assert.strictEqual(savePublishRes.body.data.isActive, true)
  assert.strictEqual(savePublishRes.body.data.approvalStatus, 'APPROVED')
  assert(savePublishRes.body.data.publishedAt, 'publishedAt must be set')
  assert.strictEqual(savePublishRes.body.data.publishedBy, CM_USER.id, 'publishedBy must be the actor user ID')
  console.log('  OK "Save & Publish" correctly sets status = PUBLISHED, isActive = true, approvalStatus = APPROVED')

  // Test 7: Invalid lesson ID returns 404
  console.log('\nTest 7: Invalid lesson ID returns 404 Not Found')
  const notFoundRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    id: 'non-existent-unit-id-99999',
    title: 'Fake Title',
  })
  assert.strictEqual(notFoundRes.status, 404, 'Non-existent ID must return 404')
  assert.strictEqual(notFoundRes.body.success, false)
  console.log('  OK Non-existent lesson ID returns 404 Not Found')

  // Test 8: Unauthorized role returns 403
  console.log('\nTest 8: Unauthorized non-Content-Manager role returns 403 Forbidden')
  const unauthorizedRes = await callContentManager(STUDENT_TOKEN, 'update_learning_unit', {
    id: unitId,
    title: 'Hacked Title',
  })
  assert.strictEqual(unauthorizedRes.status, 403, 'Student calling content update must return 403')
  console.log('  OK Unauthorized role returns 403 Forbidden')

  // Test 9: Missing Unit ID returns 400 Bad Request
  console.log('\nTest 9: Missing Unit ID returns 400 Bad Request')
  const missingIdRes = await callContentManager(CM_TOKEN, 'update_learning_unit', {
    title: 'Missing ID Title',
  })
  assert.strictEqual(missingIdRes.status, 400, 'Missing id must return 400')
  assert.strictEqual(missingIdRes.body.success, false)
  console.log('  OK Missing Unit ID returns 400 Bad Request')

  // Test 10: Page refresh / reload simulation across list_curriculum_modules
  console.log('\nTest 10: Page refresh / reload simulation (list_curriculum_modules persistence)')
  const reloadRes = await callContentManager(CM_TOKEN, 'list_curriculum_modules', {})
  assert.strictEqual(reloadRes.status, 200, 'list_curriculum_modules must succeed')
  const modulesList = reloadRes.body.data.modules
  assert(Array.isArray(modulesList) && modulesList.length > 0, 'Modules list must be returned')

  let reloadedUnit: any = null
  for (const m of modulesList) {
    const found = (m.learningUnits || []).find((u: any) => u.id === unitId)
    if (found) {
      reloadedUnit = found
      break
    }
  }

  assert(reloadedUnit, 'Saved unit must be found in reloaded curriculum')
  assert.strictEqual(reloadedUnit.title, 'Variables & Assignment (Published Final)', 'Persisted title must match')
  assert.strictEqual(reloadedUnit.concept, 'Published final concept explanation.', 'Persisted concept must match')
  assert.strictEqual(reloadedUnit.content, 'Published final concept explanation.', 'Persisted content must match')
  assert.strictEqual(reloadedUnit.approach, 'Published final walkthrough.', 'Persisted approach must match')
  assert.strictEqual(reloadedUnit.readingTimeMinutes, 8, 'Persisted reading time must match')
  assert.strictEqual(reloadedUnit.status, 'PUBLISHED', 'Persisted status must match')
  assert.strictEqual(reloadedUnit.isActive, true, 'Persisted isActive must match')
  console.log('  OK Reloaded curriculum accurately returns all updated fields across modules!')

  console.log('\n======================================================================')
  console.log('ALL 10 LEARNING UNIT UPDATE & PERSISTENCE TESTS PASSED CLEANLY!')
  console.log('======================================================================')
}

main().catch((err) => {
  console.error('\n❌ Test suite failed:', err)
  process.exit(1)
})
