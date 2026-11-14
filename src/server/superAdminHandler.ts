import type { IncomingMessage, ServerResponse } from 'http'
import { authenticateFeedbackRequest, supabaseServer, getPrivilegedServerKeyError, invalidateAuthCacheForUser } from './feedbackAuth'
import { applyCors, getClientIp, RateLimiter, readJsonBody, PayloadTooLargeError } from './httpSecurity'
import { formatErrorMessage } from '../lib/errorUtils'
import { resolveRoute } from './routeResolver'
import { registerCustomSuite, unregisterCustomSuite } from './judge/testRepository'
import { selectEngine } from './judge/engines'
import { outputsMatch } from './judge/compare'
import { normalizeLanguage } from './judge/questionId'
import problemsData from '../data/problems.json'
import {
  buildBeltOrderMap,
  compareProblemsHierarchically,
  getProblemBeltOrder,
  resolvePublicationStatus,
} from './questionSorting'
import {
  handleListContentManagers,
  handleSearchUsersForContentManager,
  handleCreateContentManager,
  handleGrantOrUpdateContentManager,
  handleSuspendContentManager,
  handleReactivateContentManager,
  handleRevokeContentManager,
  handleGetContentManagerActivity,
  handleListPendingContentApprovals,
  handleApproveOrRejectContent,
} from './superAdminContentManagerHandlers'

// Rate limiters: 120 req/min per IP, 60 req/min per authenticated user
const ipLimiter = new RateLimiter(120, 60_000)
const userLimiter = new RateLimiter(60, 60_000)

export function resetSuperAdminRateLimitsForTesting() {
  ipLimiter.reset()
  userLimiter.reset()
}

export const SUPER_ADMIN_EMAIL = 'sgjitbros@gmail.com'
export const SUPER_ADMIN_ROLE = 'SUPERADMIN'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_TARGET_ROLES = new Set<string>(['STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN'])

interface ApiResponse {
  success: boolean
  message: string
  error?: string
  data?: unknown
}

function sendJson(
  res: ServerResponse & { status?: (code: number) => { json: (data: unknown) => void }; json?: (data: unknown) => void },
  statusCode: number,
  payload: ApiResponse
) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(payload)
  }
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

/**
 * Append-only audit logger for administrative actions.
 */
async function recordAdminAudit(
  adminEmail: string,
  adminId: string,
  action: string,
  targetType: string,
  targetId: string | null,
  targetLabel: string,
  details: Record<string, unknown> = {},
  status: 'SUCCESS' | 'FAILED' = 'SUCCESS',
  errorMessage: string | null = null,
  ipAddress: string | null = null
) {
  try {
    await supabaseServer.from('admin_audit_logs').insert({
      admin_email: adminEmail,
      admin_id: adminId,
      action,
      target_type: targetType,
      target_id: targetId,
      target_label: targetLabel,
      details,
      status,
      error_message: errorMessage,
      ip_address: ipAddress,
    })
  } catch (err) {
    console.error('[superadmin-audit] Audit log write failure:', err)
  }
}

export default async function handler(
  req: IncomingMessage & { body?: unknown; query?: unknown },
  res: ServerResponse & { status?: (code: number) => { json: (data: unknown) => void }; json?: (data: unknown) => void }
) {
  // CORS handling
  applyCors(req, res, {
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    headers: 'Content-Type, Authorization, X-Idempotency-Key, X-Kalvi-Subpath, X-Kalvi-Action',
  })

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  // IP rate limiting
  const clientIp = getClientIp(req)
  const ipCheck = ipLimiter.check(clientIp)
  if (!ipCheck.allowed) {
    res.setHeader('Retry-After', String(ipCheck.retryAfter || 60))
    return sendJson(res, 429, {
      success: false,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please wait a moment before trying again.',
    })
  }

  // Parse Body if not GET
  let body: Record<string, unknown> = {}
  if (req.method !== 'GET') {
    try {
      body = await readJsonBody(req)
    } catch (err: unknown) {
      if (err instanceof PayloadTooLargeError) {
        return sendJson(res, 413, {
          success: false,
          error: 'Payload Too Large',
          message: 'Request payload exceeded the maximum permitted size.',
        })
      }
      return sendJson(res, 400, {
        success: false,
        error: 'Invalid JSON',
        message: 'Failed to parse JSON request body.',
      })
    }
  } else if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    body = req.body as Record<string, unknown>
  }

  // Authenticate Caller
  const authHeader = (req.headers['authorization'] || (req.headers as Record<string, string | undefined>)['Authorization']) as string | undefined
  const auth = await authenticateFeedbackRequest(authHeader)
  if (!auth.authenticated || !auth.user) {
    return sendJson(res, auth.statusCode || 401, {
      success: false,
      error: auth.error || 'Authentication required.',
      message: auth.error || 'Authentication required.',
    })
  }

  // STRICT SOLE ADMINISTRATOR ACCESS VERIFICATION:
  // ONLY authenticated account whose verified email is sgjitbros@gmail.com and role is SUPERADMIN is authorized.
  const callerEmail = (auth.user.email || '').toLowerCase().trim()
  const callerRole = (auth.user.role || '').toUpperCase().trim()

  if (callerEmail !== SUPER_ADMIN_EMAIL || callerRole !== SUPER_ADMIN_ROLE) {
    return sendJson(res, 403, {
      success: false,
      error: 'Access Denied: Super Admin privileges are restricted exclusively to the authorized platform administrator sgjitbros@gmail.com.',
      message: 'Access Denied: Super Admin privileges are restricted exclusively to the authorized platform administrator sgjitbros@gmail.com.',
    })
  }

  // User Rate Limiting
  const userCheck = userLimiter.check(auth.user.id)
  if (!userCheck.allowed) {
    res.setHeader('Retry-After', String(userCheck.retryAfter || 60))
    return sendJson(res, 429, {
      success: false,
      error: 'Too Many Requests',
      message: 'Account rate limit exceeded. Please wait a moment.',
    })
  }

  // Robust Route & Action Resolution
  const route = resolveRoute(req, body, '/api/super-admin')
  req.query = { ...route.queryParams, ...(typeof req.query === 'object' && req.query ? req.query : {}) }

  let action = route.action
  const sub = route.subpath
  const method = route.method
  const url = (req.url || '').toLowerCase()

  if (!action) {
    if (sub === 'dashboard') {
      action = 'dashboard'
    } else if (sub === 'campuses' || sub.startsWith('campuses/')) {
      if (method === 'GET') action = 'list_campuses'
    } else if (sub === 'managers' || sub.startsWith('managers/')) {
      if (method === 'GET') action = 'list_managers'
    } else if (sub === 'mentors' || sub.startsWith('mentors/')) {
      if (method === 'GET') action = 'list_mentors'
    } else if (sub === 'students' || sub.startsWith('students/')) {
      if (method === 'GET') action = 'list_students'
      else if (method === 'DELETE') action = 'delete_student'
    } else if (sub === 'roles' || sub.startsWith('roles/')) {
      if (method === 'GET') action = 'list_roles'
    } else if (sub === 'audit' || sub.startsWith('audit/')) {
      if (method === 'GET') action = 'list_audit_logs'
    } else if (sub === 'questions' || sub.startsWith('questions/')) {
      if (method === 'GET') action = 'list_questions'
      else if (method === 'DELETE') action = 'delete_question'
    } else if (sub === 'curriculum' || sub.startsWith('curriculum/')) {
      if (method === 'GET') action = 'list_curriculum_modules'
    } else if (sub === 'belts' || sub.startsWith('belts/')) {
      if (method === 'GET') action = 'list_belts'
    } else if (sub === 'content' || sub.startsWith('content/')) {
      if (sub === 'content/courses') {
        if (method === 'GET') action = 'list_curriculum_modules'
      } else if (sub === 'content/learn-coding') {
        if (method === 'GET') action = 'list_belts'
      } else if (sub === 'content/practice-coding') {
        if (method === 'GET') action = 'list_questions'
      }
    }
    // Content-management list endpoints may be deployed through the consolidated
    // /api/super-admin entrypoint. Preserve explicit action headers/body values,
    // and resolve the module route names for both direct and rewritten requests.

  }

  try {
    // 1. Dashboard Telemetry
    if (action === 'dashboard' || sub === 'dashboard' || url.includes('/dashboard')) {
      return await handleGetDashboard(res)
    }

    // 2. Campus Management
    if (action === 'list_campuses' || (method === 'GET' && (sub === 'campuses' || url.includes('/campuses')))) {
      return await handleListCampuses(res)
    }
    if (action === 'create_campus') {
      return await handleCreateCampus(body, auth.user.id, clientIp, res)
    }
    if (action === 'update_campus') {
      return await handleUpdateCampus(body, auth.user.id, clientIp, res)
    }
    if (action === 'toggle_campus_status') {
      return await handleToggleCampusStatus(body, auth.user.id, clientIp, res)
    }
    if (action === 'assign_campus_manager') {
      return await handleAssignCampusManager(body, auth.user.id, clientIp, res)
    }

    // 3. Campus Managers
    if (action === 'list_managers' || (method === 'GET' && (sub === 'managers' || url.includes('/managers')))) {
      return await handleListManagers(res)
    }
    if (action === 'provision_manager') {
      return await handleProvisionManager(body, auth.user.id, clientIp, res)
    }
    if (action === 'assign_manager_campus') {
      return await handleAssignManagerCampus(body, auth.user.id, clientIp, res)
    }
    if (action === 'toggle_manager_status') {
      return await handleToggleManagerStatus(body, auth.user.id, clientIp, res)
    }

    // 4. Mentors
    if (action === 'list_mentors' || (method === 'GET' && (sub === 'mentors' || url.includes('/mentors')))) {
      return await handleListMentors(res)
    }
    if (action === 'provision_mentor') {
      return await handleProvisionMentor(body, auth.user.id, clientIp, res)
    }
    if (action === 'update_mentor') {
      return await handleUpdateMentor(body, auth.user.id, clientIp, res)
    }
    if (action === 'toggle_mentor_status') {
      return await handleToggleMentorStatus(body, auth.user.id, clientIp, res)
    }

    // 5. Students
    if (action === 'list_students' || (method === 'GET' && (sub === 'students' || url.includes('/students')))) {
      return await handleListStudents(body, req, res)
    }
    if (action === 'enroll_student') {
      return await handleEnrollStudent(body, auth.user.id, clientIp, res)
    }
    if (action === 'update_student') {
      return await handleUpdateStudent(body, auth.user.id, clientIp, res)
    }
    if (action === 'delete_student' || (method === 'DELETE' && (sub === 'students' || url.includes('/students')))) {
      return await handleDeleteStudent(body, req, auth.user.id, clientIp, res)
    }

    // 6. Role & Permission Management
    if (action === 'list_roles' || action === 'list_users_roles' || (method === 'GET' && (sub === 'roles' || url.includes('/roles')))) {
      return await handleListUserRoles(res)
    }
    if (action === 'update_user_role') {
      return await handleUpdateUserRole(body, auth.user.id, clientIp, res)
    }
    if (action === 'update_user' || action === 'edit_user') {
      return await handleUpdateUser(body, auth.user.id, clientIp, res)
    }
    if (action === 'transfer_role' || action === 'transfer_user_role') {
      return await handleTransferRole(body, auth.user.id, clientIp, res)
    }
    if (action === 'toggle_user_status') {
      return await handleToggleUserStatus(body, auth.user.id, clientIp, res)
    }
    if (action === 'delete_user' || (method === 'DELETE' && (sub === 'users' || url.includes('/users')))) {
      return await handleDeleteUser(body, auth.user.id, callerEmail, clientIp, res)
    }
    if (action === 'assign_user_campus') {
      return await handleAssignUserCampus(body, auth.user.id, clientIp, res)
    }

    // 7. Audit Logs
    if (action === 'list_audit_logs' || (method === 'GET' && (sub === 'audit' || url.includes('/audit')))) {
      return await handleListAuditLogs(body, req, res)
    }

    // Content Management — curriculum, learning units, belts and questions.
    // Reached only after verified Supabase user identity plus sole SUPERADMIN email/role checks above.
    if (action === 'list_curriculum_modules') return await handleListCurriculumModules(body, req, res)
    if (action === 'create_curriculum_module') return await handleCreateCurriculumModule(body, auth.user.id, clientIp, res)
    if (action === 'update_curriculum_module') return await handleUpdateCurriculumModule(body, auth.user.id, clientIp, res)
    if (action === 'delete_curriculum_module') return await handleDeleteCurriculumModule(body, auth.user.id, clientIp, res)
    if (action === 'reorder_curriculum_modules') return await handleReorderCurriculumModules(body, auth.user.id, clientIp, res)
    if (action === 'create_learning_unit') return await handleCreateLearningUnit(body, auth.user.id, clientIp, res)
    if (action === 'update_learning_unit') return await handleUpdateLearningUnit(body, auth.user.id, clientIp, res)
    if (action === 'delete_learning_unit') return await handleDeleteLearningUnit(body, auth.user.id, clientIp, res)
    if (action === 'reorder_learning_units') return await handleReorderLearningUnits(body, auth.user.id, clientIp, res)
    if (action === 'toggle_module_status') return await handleToggleModuleStatus(body, auth.user.id, clientIp, res)
    if (action === 'toggle_learning_unit_status' || action === 'toggle_unit_status') return await handleToggleLearningUnitStatus(body, auth.user.id, clientIp, res)
    if (action === 'list_belts') return await handleListBelts(res)
    if (action === 'update_belt') return await handleUpdateBelt(body, auth.user.id, clientIp, res)

    // 8. Questions Management
    if (action === 'list_questions' || (method === 'GET' && (sub === 'questions' || url.includes('/questions')))) {
      return await handleListQuestions(body, req, res)
    }
    if (action === 'get_question') {
      return await handleGetQuestion(body, req, res)
    }
    if (action === 'get_question_preview') {
      return await handleGetQuestionPreview(body, req, res)
    }
    if (action === 'run_question_tests') {
      return await handleRunQuestionTests(body, auth.user.id, clientIp, res)
    }
    if (action === 'create_question') {
      return await handleCreateQuestion(body, auth.user.id, clientIp, res)
    }
    if (action === 'update_question') {
      return await handleUpdateQuestion(body, auth.user.id, clientIp, res)
    }
    if (action === 'duplicate_question') {
      return await handleDuplicateQuestion(body, auth.user.id, clientIp, res)
    }
    if (action === 'toggle_question_status') {
      return await handleToggleQuestionStatus(body, auth.user.id, clientIp, res)
    }
    if (action === 'restore_question') {
      return await handleRestoreQuestion(body, auth.user.id, clientIp, res)
    }
    if (action === 'delete_question' || (method === 'DELETE' && (sub === 'questions' || url.includes('/questions')))) {
      return await handleDeleteQuestion(body, req, auth.user.id, clientIp, res)
    }
    if (action === 'list_question_revisions') {
      return await handleListQuestionRevisions(body, req, res)
    }
    if (action === 'restore_question_revision') {
      return await handleRestoreQuestionRevision(body, auth.user.id, clientIp, res)
    }

    // 9. Curriculum (Courses) Management
    if (action === 'list_curriculum_modules' || (method === 'GET' && (sub === 'curriculum' || url.includes('/curriculum')))) {
      return await handleListCurriculumModules(body, req, res)
    }
    if (action === 'create_curriculum_module') {
      return await handleCreateCurriculumModule(body, auth.user.id, clientIp, res)
    }
    if (action === 'update_curriculum_module') {
      return await handleUpdateCurriculumModule(body, auth.user.id, clientIp, res)
    }
    if (action === 'delete_curriculum_module') {
      return await handleDeleteCurriculumModule(body, auth.user.id, clientIp, res)
    }
    if (action === 'reorder_curriculum_modules') {
      return await handleReorderCurriculumModules(body, auth.user.id, clientIp, res)
    }
    if (action === 'create_learning_unit') {
      return await handleCreateLearningUnit(body, auth.user.id, clientIp, res)
    }
    if (action === 'update_learning_unit') {
      return await handleUpdateLearningUnit(body, auth.user.id, clientIp, res)
    }
    if (action === 'delete_learning_unit') {
      return await handleDeleteLearningUnit(body, auth.user.id, clientIp, res)
    }
    if (action === 'reorder_learning_units') {
      return await handleReorderLearningUnits(body, auth.user.id, clientIp, res)
    }
    if (action === 'toggle_module_status') {
      return await handleToggleModuleStatus(body, auth.user.id, clientIp, res)
    }
    if (action === 'toggle_learning_unit_status' || action === 'toggle_unit_status') {
      return await handleToggleLearningUnitStatus(body, auth.user.id, clientIp, res)
    }

    // 11. Content Manager RBAC & Publication Workflow Approvals
    const cmDeps = { SUPER_ADMIN_EMAIL, sendJson, recordAdminAudit }
    if (action === 'list_content_managers' || (method === 'GET' && sub === 'content-managers')) {
      return await handleListContentManagers(cmDeps, res)
    }
    if (action === 'search_users_for_content_manager') {
      return await handleSearchUsersForContentManager(cmDeps, body, req, res)
    }
    if (action === 'create_content_manager') {
      return await handleCreateContentManager(cmDeps, body, auth.user.id, clientIp, res)
    }
    if (action === 'grant_content_manager' || action === 'update_content_manager') {
      return await handleGrantOrUpdateContentManager(cmDeps, body, auth.user.id, clientIp, res)
    }
    if (action === 'suspend_content_manager') {
      return await handleSuspendContentManager(cmDeps, body, auth.user.id, clientIp, res)
    }
    if (action === 'reactivate_content_manager') {
      return await handleReactivateContentManager(cmDeps, body, auth.user.id, clientIp, res)
    }
    if (action === 'revoke_content_manager') {
      return await handleRevokeContentManager(cmDeps, body, auth.user.id, clientIp, res)
    }
    if (action === 'get_content_manager_activity' || action === 'list_content_audit_logs') {
      return await handleGetContentManagerActivity(cmDeps, body, req, res)
    }
    if (action === 'list_pending_content_approvals') {
      return await handleListPendingContentApprovals(cmDeps, res)
    }
    if (action === 'approve_publish_content') {
      return await handleApproveOrRejectContent(cmDeps, 'APPROVE', body, auth.user.id, clientIp, res)
    }
    if (action === 'reject_content_review') {
      return await handleApproveOrRejectContent(cmDeps, 'REJECT', body, auth.user.id, clientIp, res)
    }

    // 10. Practice Belts Management
    if (action === 'list_belts' || (method === 'GET' && (sub === 'belts' || url.includes('/belts')))) {
      return await handleListBelts(res)
    }
    if (action === 'update_belt') {
      return await handleUpdateBelt(body, auth.user.id, clientIp, res)
    }

    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Action',
      message: 'Unknown or missing action in Super Admin request.',
    })
  } catch (err: unknown) {
    const errorMsg = formatErrorMessage(err, 'Failed to process Super Admin request.')
    return sendJson(res, 500, {
      success: false,
      error: errorMsg,
      message: errorMsg,
    })
  }
}

// ─── 1. Dashboard Telemetry ──────────────────────────────────────────────────

async function handleGetDashboard(res: ServerResponse) {
  // Fetch only the fields required for telemetry, then aggregate each collection once.
  const [
    campusesRes,
    usersRes,
    mentorsRes,
    studentsRes,
    auditRes,
  ] = await Promise.all([
    supabaseServer.from('campuses').select('id, code, name, city, state, status, manager_id'),
    supabaseServer.from('users').select('id, role, status, campus_id'),
    supabaseServer.from('mentors').select('id, status, campus_id'),
    supabaseServer.from('students').select('id, status, campus_id'),
    supabaseServer.from('admin_audit_logs').select('id, admin_email, admin_id, action, target_type, target_id, target_label, status, created_at').order('created_at', { ascending: false }).limit(10),
  ])

  if (campusesRes.error) throw campusesRes.error
  if (usersRes.error) throw usersRes.error
  if (mentorsRes.error) throw mentorsRes.error
  if (studentsRes.error) throw studentsRes.error

  const campuses = campusesRes.data || []
  const users = usersRes.data || []
  const mentors = mentorsRes.data || []
  const students = studentsRes.data || []
  const recentAudit = auditRes.data || []

  const roleCounts: Record<string, number> = {
    STUDENT: 0,
    MENTOR: 0,
    CAMPUS_MANAGER: 0,
    ADMIN: 0,
    SUPERADMIN: 0,
  }
  const managerCampusIds = new Set<string>()
  let totalManagers = 0
  let activeManagers = 0

  for (const user of users) {
    const role = (user.role || 'STUDENT').toUpperCase()
    roleCounts[role] = (roleCounts[role] || 0) + 1

    if (user.role === 'CAMPUS_MANAGER' || user.role === 'ADMIN') {
      totalManagers++
      if (user.status === 'ACTIVE') activeManagers++
      if (user.campus_id) managerCampusIds.add(user.campus_id)
    }
  }

  const studentCountsByCampus = new Map<string, { total: number; active: number }>()
  for (const student of students) {
    if (!student.campus_id) continue
    const counts = studentCountsByCampus.get(student.campus_id) || { total: 0, active: 0 }
    counts.total++
    if (student.status === 'ACTIVE') counts.active++
    studentCountsByCampus.set(student.campus_id, counts)
  }

  const mentorCountsByCampus = new Map<string, { total: number; active: number }>()
  let activeMentors = 0
  for (const mentor of mentors) {
    if (mentor.status === 'ACTIVE') activeMentors++
    if (!mentor.campus_id) continue
    const counts = mentorCountsByCampus.get(mentor.campus_id) || { total: 0, active: 0 }
    counts.total++
    if (mentor.status === 'ACTIVE') counts.active++
    mentorCountsByCampus.set(mentor.campus_id, counts)
  }

  let activeStudents = 0
  for (const student of students) {
    if (student.status === 'ACTIVE') activeStudents++
  }

  const campusBreakdown = campuses.map((campus) => {
    const studentCounts = studentCountsByCampus.get(campus.id)
    const mentorCounts = mentorCountsByCampus.get(campus.id)
    return {
      id: campus.id,
      code: campus.code,
      name: campus.name,
      city: campus.city,
      state: campus.state,
      status: campus.status,
      totalStudents: studentCounts?.total || 0,
      activeStudents: studentCounts?.active || 0,
      totalMentors: mentorCounts?.total || 0,
      activeMentors: mentorCounts?.active || 0,
      hasManager: !!campus.manager_id || managerCampusIds.has(campus.id),
    }
  })

  const telemetry = {
    overview: {
      totalCampuses: campuses.length,
      activeCampuses: campuses.reduce((count, campus) => count + (campus.status === 'ACTIVE' ? 1 : 0), 0),
      totalManagers,
      activeManagers,
      totalMentors: mentors.length,
      activeMentors,
      totalStudents: students.length,
      activeStudents,
      totalUsers: users.length,
    },
    roleDistribution: roleCounts,
    campuses: campusBreakdown,
    recentAuditLogs: recentAudit,
  }

  return sendJson(res, 200, {
    success: true,
    message: 'Super Admin telemetry loaded successfully.',
    data: telemetry,
  })
}


// ─── 2. Campus Management ────────────────────────────────────────────────────

async function handleListCampuses(res: ServerResponse) {
  const { data: campuses, error } = await supabaseServer
    .from('campuses')
    .select('*, manager:users!campuses_manager_id_fkey(id, email, name, status)')
    .order('name', { ascending: true })

  if (error) {
    // If foreign key relation syntax fails, fall back to plain select
    const fallback = await supabaseServer.from('campuses').select('*').order('name', { ascending: true })
    if (fallback.error) throw fallback.error

    const managerIds = (fallback.data || []).map((c) => c.manager_id).filter(Boolean)
    let managersMap: Record<string, { id: string; email: string; name: string | null }> = {}
    if (managerIds.length > 0) {
      const { data: mData } = await supabaseServer.from('users').select('id, email, name').in('id', managerIds)
      if (mData) {
        managersMap = Object.fromEntries(mData.map((m) => [m.id, m]))
      }
    }

    // Attach student and mentor counts
    const enriched = await enrichCampusesWithCounts(fallback.data || [], managersMap)
    return sendJson(res, 200, {
      success: true,
      message: 'Campuses retrieved successfully.',
      data: enriched,
    })
  }

  const managersMap = Object.fromEntries(
    (campuses || [])
      .filter((c) => c.manager)
      .map((c) => [c.manager.id, c.manager])
  )
  const enriched = await enrichCampusesWithCounts(campuses || [], managersMap)

  return sendJson(res, 200, {
    success: true,
    message: 'Campuses retrieved successfully.',
    data: enriched,
  })
}

async function enrichCampusesWithCounts(
  campuses: any[],
  managersMap: Record<string, any>
) {
  const [studentsRes, mentorsRes] = await Promise.all([
    supabaseServer.from('students').select('id, campus_id, status'),
    supabaseServer.from('mentors').select('id, campus_id, status'),
  ])

  const studentCountsByCampus = new Map<string, { total: number; active: number }>()
  for (const student of studentsRes.data || []) {
    if (!student.campus_id) continue
    const counts = studentCountsByCampus.get(student.campus_id) || { total: 0, active: 0 }
    counts.total++
    if (student.status === 'ACTIVE') counts.active++
    studentCountsByCampus.set(student.campus_id, counts)
  }

  const mentorCountsByCampus = new Map<string, { total: number; active: number }>()
  for (const mentor of mentorsRes.data || []) {
    if (!mentor.campus_id) continue
    const counts = mentorCountsByCampus.get(mentor.campus_id) || { total: 0, active: 0 }
    counts.total++
    if (mentor.status === 'ACTIVE') counts.active++
    mentorCountsByCampus.set(mentor.campus_id, counts)
  }

  return campuses.map((campus) => {
    const studentCounts = studentCountsByCampus.get(campus.id)
    const mentorCounts = mentorCountsByCampus.get(campus.id)
    return {
      ...campus,
      manager: managersMap[campus.manager_id] || campus.manager || null,
      studentCount: studentCounts?.total || 0,
      activeStudentCount: studentCounts?.active || 0,
      mentorCount: mentorCounts?.total || 0,
      activeMentorCount: mentorCounts?.active || 0,
    }
  })
}


async function handleCreateCampus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : ''
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const city = typeof body.city === 'string' ? body.city.trim() : null
  const state = typeof body.state === 'string' ? body.state.trim() : null
  const country = typeof body.country === 'string' ? body.country.trim() : 'India'
  const status = body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE'
  const managerId = typeof body.managerId === 'string' && body.managerId !== 'NONE' ? body.managerId.trim() : null

  if (!code || !/^[A-Z0-9_-]{2,50}$/.test(code)) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Code',
      message: 'Campus code is required (2-50 alphanumeric characters, hyphens or underscores).',
    })
  }

  if (!name || name.length > 255) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Name',
      message: 'Campus name is required and must not exceed 255 characters.',
    })
  }

  // Check unique code
  const { data: existing } = await supabaseServer.from('campuses').select('id').eq('code', code).maybeSingle()
  if (existing) {
    return sendJson(res, 409, {
      success: false,
      error: 'Conflict',
      message: `A campus with code "${code}" already exists.`,
    })
  }

  const { data: created, error } = await supabaseServer
    .from('campuses')
    .insert({
      code,
      name,
      city,
      state,
      country,
      status,
      manager_id: managerId,
    })
    .select()
    .single()

  if (error) throw error

  // If manager assigned, update their user record
  if (managerId) {
    await supabaseServer.from('users').update({ campus_id: created.id }).eq('id', managerId)
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'CREATE_CAMPUS',
    'CAMPUS',
    created.id,
    `${name} (${code})`,
    { code, name, city, state, country, status, managerId },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 201, {
    success: true,
    message: `Campus "${name}" created successfully.`,
    data: created,
  })
}

async function handleUpdateCampus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const campusId = typeof body.campusId === 'string' ? body.campusId.trim() : (typeof body.id === 'string' ? body.id.trim() : '')
  if (!campusId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Campus ID',
      message: 'Campus ID is required.',
    })
  }

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (typeof body.name === 'string' && body.name.trim()) updates.name = body.name.trim()
  if (typeof body.city === 'string') updates.city = body.city.trim() || null
  if (typeof body.state === 'string') updates.state = body.state.trim() || null
  if (typeof body.country === 'string') updates.country = body.country.trim() || null
  if (typeof body.status === 'string') updates.status = body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE'
  if ('managerId' in body) {
    updates.manager_id = typeof body.managerId === 'string' && body.managerId !== 'NONE' ? body.managerId.trim() : null
  }

  const { data: updated, error } = await supabaseServer
    .from('campuses')
    .update(updates)
    .eq('id', campusId)
    .select()
    .single()

  if (error) throw error

  if ('manager_id' in updates && updates.manager_id) {
    await supabaseServer.from('users').update({ campus_id: campusId }).eq('id', updates.manager_id)
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_CAMPUS',
    'CAMPUS',
    campusId,
    updated?.name || campusId,
    updates,
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Campus updated successfully.`,
    data: updated,
  })
}

async function handleToggleCampusStatus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const campusId = typeof body.campusId === 'string' ? body.campusId.trim() : (typeof body.id === 'string' ? body.id.trim() : '')
  const status = body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE'

  if (!campusId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Campus ID',
      message: 'Campus ID is required.',
    })
  }

  const { data: updated, error } = await supabaseServer
    .from('campuses')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', campusId)
    .select('id, name, code, status')
    .single()

  if (error) throw error

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'TOGGLE_CAMPUS_STATUS',
    'CAMPUS',
    campusId,
    updated?.name || campusId,
    { newStatus: status },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Campus status changed to ${status}.`,
    data: updated,
  })
}

async function handleAssignCampusManager(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const campusId = typeof body.campusId === 'string' ? body.campusId.trim() : ''
  const managerId = typeof body.managerId === 'string' && body.managerId !== 'NONE' ? body.managerId.trim() : null

  if (!campusId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Campus ID',
      message: 'Campus ID is required.',
    })
  }

  // Unbind previous manager from this campus if changed
  const { data: currentCampus } = await supabaseServer.from('campuses').select('id, manager_id').eq('id', campusId).maybeSingle()
  if (currentCampus?.manager_id && currentCampus.manager_id !== managerId) {
    await supabaseServer.from('users').update({ campus_id: null, "updatedAt": new Date().toISOString() }).eq('id', currentCampus.manager_id)
  }

  let managerName = 'Unassigned'
  if (managerId) {
    const { data: mgr } = await supabaseServer.from('users').select('id, name, email, role').eq('id', managerId).maybeSingle()
    if (!mgr) {
      return sendJson(res, 404, {
        success: false,
        error: 'Manager Not Found',
        message: 'The specified manager could not be found.',
      })
    }
    managerName = mgr.name || mgr.email
    await supabaseServer.from('users').update({ campus_id: campusId, "updatedAt": new Date().toISOString() }).eq('id', managerId)
  }

  const { data: updated, error } = await supabaseServer
    .from('campuses')
    .update({ manager_id: managerId, updated_at: new Date().toISOString() })
    .eq('id', campusId)
    .select('id, name, code, manager_id')
    .single()

  if (error) throw error

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'ASSIGN_CAMPUS_MANAGER',
    'CAMPUS',
    campusId,
    updated?.name || campusId,
    { managerId, managerName },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Campus manager assigned: ${managerName}.`,
    data: updated,
  })
}

// ─── 3. Campus Managers Management ───────────────────────────────────────────

async function handleListManagers(res: ServerResponse) {
  const [managersRes, campusesRes] = await Promise.all([
    supabaseServer
      .from('users')
      .select('id, email, name, role, status, campus_id, deleted_at, created_at:createdAt, updated_at:updatedAt')
      .in('role', ['CAMPUS_MANAGER', 'ADMIN'])
      .order('name', { ascending: true }),
    supabaseServer.from('campuses').select('id, name, code, manager_id'),
  ])

  if (managersRes.error) throw managersRes.error

  const campuses = campusesRes.data || []
  const campusMap = Object.fromEntries(campuses.map((c) => [c.id, c]))

  const managers = (managersRes.data || [])
    .filter((m: any) => !m.deleted_at)
    .map((m: any) => {
    const assignedCampus = m.campus_id ? campusMap[m.campus_id] : campuses.find((c) => c.manager_id === m.id)
    return {
      ...m,
      created_at: m.created_at || m.createdAt || new Date().toISOString(),
      updated_at: m.updated_at || m.updatedAt || new Date().toISOString(),
      campus: assignedCampus ? { id: assignedCampus.id, name: assignedCampus.name, code: assignedCampus.code } : null,
    }
  })

  return sendJson(res, 200, {
    success: true,
    message: 'Campus managers retrieved successfully.',
    data: managers,
  })
}

async function handleProvisionManager(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const campusId = typeof body.campusId === 'string' && body.campusId !== 'NONE' ? body.campusId.trim() : null

  if (!email || !EMAIL_REGEX.test(email)) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Email',
      message: 'A valid email address is required.',
    })
  }

  if (!name || name.length > 100) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Name',
      message: 'Manager full name is required.',
    })
  }

  // Check if user already exists
  const { data: existingUser } = await supabaseServer.from('users').select('id, role').eq('email', email).maybeSingle()

  let userId: string
  if (existingUser) {
    userId = existingUser.id
    const { error: updErr } = await supabaseServer
      .from('users')
      .update({
        name,
        role: 'CAMPUS_MANAGER',
        status: 'ACTIVE',
        campus_id: campusId,
        "updatedAt": new Date().toISOString(),
      })
      .eq('id', userId)

    if (updErr) throw updErr
  } else {
    const { data: created, error: crtErr } = await supabaseServer
      .from('users')
      .insert({
        email,
        name,
        role: 'CAMPUS_MANAGER',
        status: 'ACTIVE',
        campus_id: campusId,
      })
      .select('id')
      .single()

    if (crtErr) throw crtErr
    userId = created.id
  }

  // If campusId provided, link campus manager_id
  if (campusId) {
    await supabaseServer.from('campuses').update({ manager_id: userId }).eq('id', campusId)
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'PROVISION_CAMPUS_MANAGER',
    'USER',
    userId,
    `${name} (${email})`,
    { email, name, role: 'CAMPUS_MANAGER', campusId },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 201, {
    success: true,
    message: `Campus manager "${name}" provisioned successfully.`,
    data: { id: userId, email, name, role: 'CAMPUS_MANAGER', campusId },
  })
}

async function handleAssignManagerCampus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const managerId = typeof body.managerId === 'string' ? body.managerId.trim() : ''
  const campusId = typeof body.campusId === 'string' && body.campusId !== 'NONE' ? body.campusId.trim() : null

  if (!managerId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Manager ID',
      message: 'Manager ID is required.',
    })
  }

  // Clear this manager from any existing campus assignment first
  await supabaseServer.from('campuses').update({ manager_id: null, updated_at: new Date().toISOString() }).eq('manager_id', managerId)

  const { data: user, error: uErr } = await supabaseServer
    .from('users')
    .update({ campus_id: campusId, "updatedAt": new Date().toISOString() })
    .eq('id', managerId)
    .select('id, email, name, role, campus_id')
    .single()

  if (uErr) throw uErr

  if (campusId) {
    await supabaseServer.from('campuses').update({ manager_id: managerId, updated_at: new Date().toISOString() }).eq('id', campusId)
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'ASSIGN_MANAGER_CAMPUS',
    'USER',
    managerId,
    user.name || user.email,
    { campusId },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Campus manager campus assignment updated.',
    data: user,
  })
}

async function handleToggleManagerStatus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const managerId = typeof body.managerId === 'string' ? body.managerId.trim() : ''
  const status = body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE'

  if (!managerId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Manager ID',
      message: 'Manager ID is required.',
    })
  }

  const { data: user, error } = await supabaseServer
    .from('users')
    .update({ status, "updatedAt": new Date().toISOString() })
    .eq('id', managerId)
    .select('id, email, name, status')
    .single()

  if (error) throw error

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'TOGGLE_MANAGER_STATUS',
    'USER',
    managerId,
    user.name || user.email,
    { newStatus: status },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Manager status changed to ${status}.`,
    data: user,
  })
}

// ─── 4. Mentor Management ────────────────────────────────────────────────────

async function handleListMentors(res: ServerResponse) {
  const [mentorsRes, campusesRes, linksRes] = await Promise.all([
    supabaseServer
      .from('mentors')
      .select('id, user_id, name, email, mentor_code, max_students, status, campus_id, created_at, updated_at')
      .order('name', { ascending: true }),
    supabaseServer.from('campuses').select('id, name, code'),
    supabaseServer.from('mentor_students').select('mentor_id').eq('status', 'ACTIVE'),
  ])

  if (mentorsRes.error) throw mentorsRes.error

  const campuses = campusesRes.data || []
  const campusMap = Object.fromEntries(campuses.map((c) => [c.id, c]))

  const activeLinks = linksRes.data || []
  const countsMap: Record<string, number> = {}
  for (const l of activeLinks) {
    countsMap[l.mentor_id] = (countsMap[l.mentor_id] || 0) + 1
  }

  const enriched = (mentorsRes.data || []).map((m) => ({
    ...m,
    assignedStudentCount: countsMap[m.id] || 0,
    campus: m.campus_id ? campusMap[m.campus_id] || null : null,
  }))

  return sendJson(res, 200, {
    success: true,
    message: 'Mentors retrieved successfully.',
    data: enriched,
  })
}

async function handleProvisionMentor(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const campusId = typeof body.campusId === 'string' && body.campusId !== 'NONE' ? body.campusId.trim() : null
  const maxStudents = typeof body.maxStudents === 'number' && body.maxStudents > 0 ? body.maxStudents : 30

  if (!email || !EMAIL_REGEX.test(email)) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Email',
      message: 'A valid mentor email address is required.',
    })
  }

  if (!name || name.length > 100) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Name',
      message: 'Mentor name is required.',
    })
  }

  // 1. Check or upsert `users`
  let userId: string
  const { data: existingUser } = await supabaseServer.from('users').select('id').eq('email', email).maybeSingle()
  if (existingUser) {
    userId = existingUser.id
    await supabaseServer
      .from('users')
      .update({
        name,
        role: 'MENTOR',
        status: 'ACTIVE',
        campus_id: campusId,
        "updatedAt": new Date().toISOString(),
      })
      .eq('id', userId)
  } else {
    const { data: created, error: crtErr } = await supabaseServer
      .from('users')
      .insert({
        email,
        name,
        role: 'MENTOR',
        status: 'ACTIVE',
        campus_id: campusId,
      })
      .select('id')
      .single()

    if (crtErr) throw crtErr
    userId = created.id
  }

  // 2. Check or create `mentors` profile
  const { data: existingMentor } = await supabaseServer.from('mentors').select('id, mentor_code').eq('user_id', userId).maybeSingle()

  let mentorId: string
  let mentorCode: string

  if (existingMentor) {
    mentorId = existingMentor.id
    mentorCode = existingMentor.mentor_code
    await supabaseServer
      .from('mentors')
      .update({
        name,
        email,
        max_students: maxStudents,
        campus_id: campusId,
        status: 'ACTIVE',
        updated_at: new Date().toISOString(),
      })
      .eq('id', mentorId)
  } else {
    // Generate unique code
    const randPart = Math.random().toString(36).substring(2, 6).toUpperCase()
    mentorCode = `MEN-${randPart}`
    const { data: createdM, error: mErr } = await supabaseServer
      .from('mentors')
      .insert({
        user_id: userId,
        name,
        email,
        mentor_code: mentorCode,
        max_students: maxStudents,
        status: 'ACTIVE',
        campus_id: campusId,
      })
      .select('id')
      .single()

    if (mErr) throw mErr
    mentorId = createdM.id
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'PROVISION_MENTOR',
    'MENTOR',
    mentorId,
    `${name} (${email})`,
    { mentorCode, maxStudents, campusId },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 201, {
    success: true,
    message: `Mentor "${name}" provisioned successfully.`,
    data: { id: mentorId, userId, name, email, mentorCode, maxStudents, campusId },
  })
}

async function handleUpdateMentor(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const mentorId = typeof body.mentorId === 'string' ? body.mentorId.trim() : (typeof body.id === 'string' ? body.id.trim() : '')
  if (!mentorId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Mentor ID',
      message: 'Mentor ID is required.',
    })
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (typeof body.name === 'string' && body.name.trim()) updates.name = body.name.trim()
  if (typeof body.maxStudents === 'number' && body.maxStudents > 0) updates.max_students = body.maxStudents
  if (typeof body.campusId === 'string') updates.campus_id = body.campusId !== 'NONE' ? body.campusId.trim() : null
  if (typeof body.status === 'string') updates.status = body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE'

  const { data: updated, error } = await supabaseServer
    .from('mentors')
    .update(updates)
    .eq('id', mentorId)
    .select('*, user_id')
    .single()

  if (error) throw error

  // Sync users record
  if (updated?.user_id) {
    const userUpdates: Record<string, unknown> = { "updatedAt": new Date().toISOString() }
    if (updates.name) userUpdates.name = updates.name
    if ('campus_id' in updates) userUpdates.campus_id = updates.campus_id
    if (updates.status) userUpdates.status = updates.status
    await supabaseServer.from('users').update(userUpdates).eq('id', updated.user_id)
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_MENTOR',
    'MENTOR',
    mentorId,
    updated?.name || mentorId,
    updates,
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Mentor updated successfully.',
    data: updated,
  })
}

async function handleToggleMentorStatus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const mentorId = typeof body.mentorId === 'string' ? body.mentorId.trim() : ''
  const status = body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE'

  if (!mentorId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Mentor ID',
      message: 'Mentor ID is required.',
    })
  }

  const { data: updated, error } = await supabaseServer
    .from('mentors')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', mentorId)
    .select('id, name, user_id, status')
    .single()

  if (error) throw error

  if (updated?.user_id) {
    await supabaseServer.from('users').update({ status }).eq('id', updated.user_id)
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'TOGGLE_MENTOR_STATUS',
    'MENTOR',
    mentorId,
    updated?.name || mentorId,
    { newStatus: status },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Mentor status changed to ${status}.`,
    data: updated,
  })
}

// ─── 5. Student Management ───────────────────────────────────────────────────

async function handleListStudents(
  body: Record<string, unknown>,
  req: IncomingMessage & { query?: unknown },
  res: ServerResponse
) {
  const query = (typeof req.query === 'object' && req.query ? (req.query as Record<string, unknown>) : {}) as Record<string, unknown>
  const search = typeof body.search === 'string' ? body.search.trim().toLowerCase() : String(query.search || '').trim().toLowerCase()
  const campusId = typeof body.campusId === 'string' && body.campusId !== 'ALL' ? body.campusId.trim() : String(query.campusId || '').trim()
  const mentorId = typeof body.mentorId === 'string' && body.mentorId !== 'ALL' ? body.mentorId.trim() : String(query.mentorId || '').trim()
  const status = typeof body.status === 'string' && body.status !== 'ALL' ? body.status.trim() : String(query.status || '').trim()
  const page = Math.max(1, parseInt(String(body.page || query.page || '1'), 10))
  const limit = Math.min(200, Math.max(10, parseInt(String(body.limit || query.limit || '50'), 10)))

  // Build query
  let q = supabaseServer
    .from('students')
    .select('id, user_id, name, email, student_code, status, campus_id, created_at, updated_at', { count: 'exact' })

  if (campusId && campusId !== 'ALL') {
    q = q.eq('campus_id', campusId)
  }
  if (status && status !== 'ALL') {
    q = q.eq('status', status)
  }
  if (search) {
    q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%,student_code.ilike.%${search}%`)
  }

  const offset = (page - 1) * limit
  q = q.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

  const { data: students, count, error } = await q
  if (error) throw error

  const studentList = students || []
  const studentIds = studentList.map((s) => s.id)
  const userIds = studentList.map((s) => s.user_id).filter(Boolean)

  // Fetch active mentor links
  let mentorMap: Record<string, { id: string; name: string; email: string }> = {}
  if (studentIds.length > 0) {
    const { data: links } = await supabaseServer
      .from('mentor_students')
      .select('student_id, mentor:mentors(id, name, email)')
      .in('student_id', studentIds)
      .eq('status', 'ACTIVE')

    if (links) {
      for (const l of links) {
        if (l.mentor) {
          const m = Array.isArray(l.mentor) ? l.mentor[0] : l.mentor
          if (m) mentorMap[l.student_id] = m
        }
      }
    }
  }

  // Fetch campuses map
  const campusIds = Array.from(new Set(studentList.map((s) => s.campus_id).filter(Boolean)))
  let campusMap: Record<string, { id: string; name: string; code: string }> = {}
  if (campusIds.length > 0) {
    const { data: campuses } = await supabaseServer.from('campuses').select('id, name, code').in('id', campusIds)
    if (campuses) {
      campusMap = Object.fromEntries(campuses.map((c) => [c.id, c]))
    }
  }

  // Fetch progression summary for users
  let progressMap: Record<string, { solvedCount: number; totalXp: number }> = {}
  if (userIds.length > 0) {
    const { data: upRows } = await supabaseServer
      .from('UserProgress')
      .select('userId, status, xpEarned')
      .in('userId', userIds)

    if (upRows) {
      for (const row of upRows) {
        const uId = row.userId
        if (!progressMap[uId]) progressMap[uId] = { solvedCount: 0, totalXp: 0 }
        if (row.status === 'SOLVED') progressMap[uId].solvedCount++
        progressMap[uId].totalXp += row.xpEarned || 0
      }
    }
  }

  let enriched = studentList.map((s) => ({
    ...s,
    mentor: mentorMap[s.id] || null,
    campus: s.campus_id ? campusMap[s.campus_id] || null : null,
    stats: progressMap[s.user_id] || { solvedCount: 0, totalXp: 0 },
  }))

  if (mentorId && mentorId !== 'ALL') {
    enriched = enriched.filter((s) => s.mentor?.id === mentorId)
  }

  return sendJson(res, 200, {
    success: true,
    message: 'Students retrieved successfully.',
    data: {
      students: enriched,
      totalCount: count ?? enriched.length,
      page,
      limit,
      totalPages: Math.ceil((count ?? enriched.length) / limit),
    },
  })
}

async function handleEnrollStudent(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const campusId = typeof body.campusId === 'string' && body.campusId !== 'NONE' ? body.campusId.trim() : null
  const mentorId = typeof body.mentorId === 'string' && body.mentorId !== 'NONE' ? body.mentorId.trim() : null
  const explicitCode = typeof body.studentCode === 'string' ? body.studentCode.trim().toUpperCase() : ''

  if (!name || name.length > 100) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Name',
      message: 'Student name is required and must not exceed 100 characters.',
    })
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 255) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Email',
      message: 'A valid student email address is required.',
    })
  }

  // 1. Check or upsert `users`
  let userId: string
  const { data: existingUser } = await supabaseServer.from('users').select('id, role').eq('email', email).maybeSingle()
  if (existingUser) {
    userId = existingUser.id
    await supabaseServer
      .from('users')
      .update({
        name,
        role: 'STUDENT',
        status: 'ACTIVE',
        campus_id: campusId,
        "updatedAt": new Date().toISOString(),
      })
      .eq('id', userId)
  } else {
    const { data: created, error: crtErr } = await supabaseServer
      .from('users')
      .insert({
        email,
        name,
        role: 'STUDENT',
        status: 'ACTIVE',
        campus_id: campusId,
      })
      .select('id')
      .single()

    if (crtErr) throw crtErr
    userId = created.id
  }

  // 2. Check or create `students`
  const { data: existingStudent } = await supabaseServer.from('students').select('id, student_code').eq('user_id', userId).maybeSingle()

  let studentId: string
  let studentCode: string

  if (existingStudent) {
    studentId = existingStudent.id
    studentCode = existingStudent.student_code
    await supabaseServer
      .from('students')
      .update({
        name,
        email,
        campus_id: campusId,
        status: 'ACTIVE',
        updated_at: new Date().toISOString(),
      })
      .eq('id', studentId)
  } else {
    studentCode = explicitCode || `STU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    const { data: createdS, error: sErr } = await supabaseServer
      .from('students')
      .insert({
        user_id: userId,
        name,
        email,
        student_code: studentCode,
        status: 'ACTIVE',
        campus_id: campusId,
      })
      .select('id')
      .single()

    if (sErr) throw sErr
    studentId = createdS.id
  }

  // 3. Optional Mentor Assignment
  let mentorName: string | null = null
  if (mentorId) {
    const { data: mentorRec } = await supabaseServer.from('mentors').select('id, user_id, name').eq('id', mentorId).maybeSingle()
    if (mentorRec) {
      mentorName = mentorRec.name
      // Deactivate other mentor links
      await supabaseServer.from('mentor_students').update({ status: 'INACTIVE', unassigned_at: new Date().toISOString() }).eq('student_id', studentId).neq('mentor_id', mentorRec.id).eq('status', 'ACTIVE')
      // Upsert active assignment
      await supabaseServer.from('mentor_students').upsert(
        {
          mentor_id: mentorRec.id,
          student_id: studentId,
          status: 'ACTIVE',
          assigned_at: new Date().toISOString(),
          unassigned_at: null,
        },
        { onConflict: 'mentor_id,student_id' }
      )
      if (mentorRec.user_id) {
        await supabaseServer.from('users').update({ mentorId: mentorRec.user_id }).eq('id', userId)
      }
    }
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'ENROLL_STUDENT',
    'STUDENT',
    studentId,
    `${name} (${email})`,
    { studentCode, campusId, mentorId, mentorName },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 201, {
    success: true,
    message: `Student "${name}" enrolled successfully.`,
    data: { id: studentId, userId, name, email, studentCode, campusId, mentorId, mentorName },
  })
}

async function handleUpdateStudent(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const studentId = typeof body.studentId === 'string' ? body.studentId.trim() : (typeof body.id === 'string' ? body.id.trim() : '')
  if (!studentId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Student ID',
      message: 'Student ID is required.',
    })
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (typeof body.name === 'string' && body.name.trim()) updates.name = body.name.trim()
  if (typeof body.campusId === 'string') updates.campus_id = body.campusId !== 'NONE' ? body.campusId.trim() : null
  if (typeof body.status === 'string') updates.status = body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE'

  const { data: updated, error } = await supabaseServer
    .from('students')
    .update(updates)
    .eq('id', studentId)
    .select('*, user_id')
    .single()

  if (error) throw error

  // Sync users record
  if (updated?.user_id) {
    const userUpdates: Record<string, unknown> = { "updatedAt": new Date().toISOString() }
    if (updates.name) userUpdates.name = updates.name
    if ('campus_id' in updates) userUpdates.campus_id = updates.campus_id
    if (updates.status) userUpdates.status = updates.status
    await supabaseServer.from('users').update(userUpdates).eq('id', updated.user_id)
  }

  // Handle mentor reassignment if specified
  if ('mentorId' in body) {
    const rawMentor = body.mentorId
    const newMentorId = typeof rawMentor === 'string' && rawMentor !== 'NONE' ? rawMentor.trim() : null
    if (!newMentorId) {
      await supabaseServer.from('mentor_students').update({ status: 'INACTIVE', unassigned_at: new Date().toISOString() }).eq('student_id', studentId).eq('status', 'ACTIVE')
      if (updated?.user_id) {
        await supabaseServer.from('users').update({ mentorId: null }).eq('id', updated.user_id)
      }
    } else {
      const { data: mentorRec } = await supabaseServer.from('mentors').select('id, user_id, name').eq('id', newMentorId).maybeSingle()
      if (mentorRec) {
        await supabaseServer.from('mentor_students').update({ status: 'INACTIVE', unassigned_at: new Date().toISOString() }).eq('student_id', studentId).neq('mentor_id', mentorRec.id).eq('status', 'ACTIVE')
        await supabaseServer.from('mentor_students').upsert(
          {
            mentor_id: mentorRec.id,
            student_id: studentId,
            status: 'ACTIVE',
            assigned_at: new Date().toISOString(),
            unassigned_at: null,
          },
          { onConflict: 'mentor_id,student_id' }
        )
        if (updated?.user_id && mentorRec.user_id) {
          await supabaseServer.from('users').update({ mentorId: mentorRec.user_id }).eq('id', updated.user_id)
        }
      }
    }
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_STUDENT',
    'STUDENT',
    studentId,
    updated?.name || studentId,
    updates,
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Student updated successfully.',
    data: updated,
  })
}

/**
 * Handle Permanent Delete Student
 * Cascade deletes student profile, user record, mentor assignments, and student progress/submissions.
 * Guaranteed: Only students can be deleted. Non-student roles are strictly forbidden.
 * Feedback tables are never touched.
 */
async function handleDeleteStudent(
  body: Record<string, unknown>,
  req: IncomingMessage & { query?: unknown },
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const queryStudentId =
    typeof req.query === 'object' && req.query
      ? String((req.query as Record<string, unknown>).studentId || (req.query as Record<string, unknown>).id || '')
      : ''
  const studentId =
    (typeof body.studentId === 'string'
      ? body.studentId.trim()
      : typeof body.id === 'string'
      ? body.id.trim()
      : '') || queryStudentId.trim()

  if (!studentId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Student ID',
      message: 'Student ID is required for student deletion.',
    })
  }

  // 1. Authoritative Student Resolution (accepts students.id or users.id)
  let studentRecord: { id: string; user_id: string; name: string | null; email: string | null } | null = null

  const byStudentId = await supabaseServer
    .from('students')
    .select('id, user_id, name, email')
    .eq('id', studentId)
    .maybeSingle()

  if (byStudentId.data) {
    studentRecord = byStudentId.data
  } else {
    const byUserId = await supabaseServer
      .from('students')
      .select('id, user_id, name, email')
      .eq('user_id', studentId)
      .maybeSingle()
    if (byUserId.data) {
      studentRecord = byUserId.data
    }
  }

  let canonicalUserId: string | null = studentRecord?.user_id || null
  let canonicalStudentId: string | null = studentRecord?.id || null
  let studentName = studentRecord?.name || 'Student'
  let studentEmail = studentRecord?.email || ''

  // Fallback: check if student exists directly in `users` with role = 'STUDENT'
  if (!canonicalUserId) {
    const byUser = await supabaseServer.from('users').select('id, name, email, role').eq('id', studentId).maybeSingle()
    if (byUser.data) {
      if (byUser.data.role !== 'STUDENT') {
        return sendJson(res, 403, {
          success: false,
          error: 'Forbidden Operation',
          message: `Cannot delete user with role ${byUser.data.role}. Only student accounts may be deleted.`,
        })
      }
      canonicalUserId = byUser.data.id
      studentName = byUser.data.name || studentName
      studentEmail = byUser.data.email || studentEmail
    }
  }

  if (!canonicalUserId && !canonicalStudentId) {
    return sendJson(res, 404, {
      success: false,
      error: 'Student Not Found',
      message: 'The specified student could not be found or has already been deleted.',
    })
  }

  // 2. Strict check: Target user must NOT be a manager, mentor, or admin
  let authUidToDelete: string | null = null
  if (canonicalUserId) {
    const { data: userRow } = await supabaseServer
      .from('users')
      .select('id, name, role, email, "authUid"')
      .eq('id', canonicalUserId)
      .maybeSingle()

    if (userRow) {
      if (userRow.role && userRow.role !== 'STUDENT') {
        return sendJson(res, 403, {
          success: false,
          error: 'Forbidden Operation',
          message: `Cannot delete user with role ${userRow.role}. Only student accounts may be deleted.`,
        })
      }
      authUidToDelete = (userRow as { authUid?: string }).authUid || null
      studentEmail = userRow.email || studentEmail
      studentName = userRow.name || studentName
    }
  }

  // 3. Execute authoritative deletion in dependency order:
  // Step A: Delete mentor assignments
  if (canonicalStudentId) {
    await supabaseServer.from('mentor_students').delete().eq('student_id', canonicalStudentId)
  }

  // Step B: Delete student submissions and progress
  if (canonicalUserId) {
    await supabaseServer.from('Submission').delete().eq('userId', canonicalUserId)
    await supabaseServer.from('UserProgress').delete().eq('userId', canonicalUserId)
  }

  // Step C: Delete student profile
  if (canonicalStudentId) {
    await supabaseServer.from('students').delete().eq('id', canonicalStudentId)
  }

  // Step D: Delete user record
  if (canonicalUserId) {
    await supabaseServer.from('users').delete().eq('id', canonicalUserId)
  }

  // Step E: Delete Supabase Auth account if linked
  if (authUidToDelete) {
    try {
      await supabaseServer.auth.admin.deleteUser(authUidToDelete)
    } catch (authErr) {
      console.warn(`[superadmin-delete] Auth deletion note:`, authErr)
    }
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'DELETE_STUDENT',
    'STUDENT',
    canonicalStudentId || canonicalUserId,
    `${studentName} (${studentEmail})`,
    { canonicalStudentId, canonicalUserId },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Student "${studentName}" (${studentEmail}) and all associated records have been permanently deleted.`,
    data: {
      studentId: canonicalStudentId,
      userId: canonicalUserId,
      name: studentName,
      email: studentEmail,
      deletedAt: new Date().toISOString(),
    },
  })
}

// ─── 6. Role & Permission Management ─────────────────────────────────────────

async function handleListUserRoles(res: ServerResponse) {
  const [usersRes, campusesRes] = await Promise.all([
    supabaseServer
      .from('users')
      .select('id, email, name, role, status, campus_id, deleted_at, created_at:createdAt, updated_at:updatedAt')
      .order('email', { ascending: true }),
    supabaseServer.from('campuses').select('id, name, code'),
  ])

  if (usersRes.error) throw usersRes.error

  const campuses = campusesRes.data || []
  const campusMap = Object.fromEntries(campuses.map((c) => [c.id, c]))

  const enriched = (usersRes.data || [])
    .filter((u: any) => !u.deleted_at)
    .map((u: any) => ({
    ...u,
    created_at: u.created_at || u.createdAt || new Date().toISOString(),
    updated_at: u.updated_at || u.updatedAt || new Date().toISOString(),
    campus: u.campus_id ? campusMap[u.campus_id] || null : null,
    isSuperAdminProtected: u.email?.toLowerCase().trim() === SUPER_ADMIN_EMAIL,
  }))

  return sendJson(res, 200, {
    success: true,
    message: 'User roles directory retrieved successfully.',
    data: enriched,
  })
}

async function handleUpdateUserRole(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const targetUserId = typeof body.userId === 'string' ? body.userId.trim() : ''
  const newRole = typeof body.newRole === 'string' ? body.newRole.trim().toUpperCase() : ''

  if (!targetUserId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing User ID',
      message: 'User ID is required.',
    })
  }

  if (newRole === 'SUPERADMIN') {
    return sendJson(res, 403, {
      success: false,
      error: 'Forbidden Operation',
      message: 'Forbidden: SUPERADMIN role cannot be assigned to other accounts.',
    })
  }

  if (!ALLOWED_TARGET_ROLES.has(newRole)) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Role',
      message: `Invalid role "${newRole}". Supported roles: ${Array.from(ALLOWED_TARGET_ROLES).join(', ')}.`,
    })
  }

  // Fetch target user
  const { data: targetUser, error: findErr } = await supabaseServer
    .from('users')
    .select('id, email, name, role, status, campus_id')
    .eq('id', targetUserId)
    .maybeSingle()

  if (findErr) throw findErr
  if (!targetUser) {
    return sendJson(res, 404, {
      success: false,
      error: 'User Not Found',
      message: 'The target user could not be found.',
    })
  }

  const targetEmail = (targetUser.email || '').toLowerCase().trim()

  // GUARD 1: sgjitbros@gmail.com can NEVER be demoted or changed from SUPERADMIN
  if (targetEmail === SUPER_ADMIN_EMAIL) {
    return sendJson(res, 403, {
      success: false,
      error: 'Operation Forbidden',
      message: 'Forbidden: The sole Super Administrator account (sgjitbros@gmail.com) cannot be demoted or modified.',
    })
  }

  // GUARD 2: Attempting to assign SUPERADMIN to any other account is strictly forbidden
  if (newRole === 'SUPERADMIN' && targetEmail !== SUPER_ADMIN_EMAIL) {
    return sendJson(res, 403, {
      success: false,
      error: 'Operation Forbidden',
      message: 'Forbidden: Super Administrator role cannot be assigned to other accounts.',
    })
  }

  // GUARD 3: Self-modification
  if (targetUserId === adminId) {
    return sendJson(res, 403, {
      success: false,
      error: 'Operation Forbidden',
      message: 'Forbidden: Self-role changes are not permitted.',
    })
  }

  const previousRole = targetUser.role

  // If user was CAMPUS_MANAGER and role is changing away, unbind manager_id on any campus
  if (previousRole === 'CAMPUS_MANAGER' && newRole !== 'CAMPUS_MANAGER') {
    await supabaseServer
      .from('campuses')
      .update({ manager_id: null, updated_at: new Date().toISOString() })
      .eq('manager_id', targetUserId)
  }

  // Update role in `users`
  const { data: updated, error: updErr } = await supabaseServer
    .from('users')
    .update({ role: newRole, "updatedAt": new Date().toISOString() })
    .eq('id', targetUserId)
    .select('id, email, name, role, status')
    .single()

  if (updErr) throw updErr

  if (String(targetUser.role || '').toUpperCase() === 'CONTENT_MANAGER' && newRole !== 'CONTENT_MANAGER') {
    await supabaseServer.from('content_manager_assignments').update({ is_active: false, revoked_by: SUPER_ADMIN_EMAIL, revoked_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('user_id', targetUserId)
  }

  // If transitioning to MENTOR, ensure profile exists in `mentors`
  if (newRole === 'MENTOR') {
    const { data: existingM } = await supabaseServer.from('mentors').select('id').eq('user_id', targetUserId).maybeSingle()
    if (!existingM) {
      const mentorCode = `MEN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      await supabaseServer.from('mentors').insert({
        user_id: targetUserId,
        name: targetUser.name,
        email: targetUser.email,
        mentor_code: mentorCode,
        max_students: 30,
        status: 'ACTIVE',
        campus_id: targetUser.campus_id,
      })
    }
  }

  // If transitioning to STUDENT, ensure profile exists in `students`
  if (newRole === 'STUDENT') {
    const { data: existingS } = await supabaseServer.from('students').select('id').eq('user_id', targetUserId).maybeSingle()
    if (!existingS) {
      const studentCode = `STU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      await supabaseServer.from('students').insert({
        user_id: targetUserId,
        name: targetUser.name,
        email: targetUser.email,
        student_code: studentCode,
        status: 'ACTIVE',
        campus_id: targetUser.campus_id,
      })
    }
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_USER_ROLE',
    'USER',
    targetUserId,
    `${targetUser.name || targetEmail} (${targetEmail})`,
    { previousRole, newRole },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `User "${targetUser.name || targetEmail}" role updated to ${newRole}.`,
    data: updated,
  })
}

async function handleUpdateUser(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const targetUserId = typeof body.userId === 'string' ? body.userId.trim() : ''
  if (!targetUserId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing User ID',
      message: 'User ID is required.',
    })
  }

  const { data: targetUser, error: findErr } = await supabaseServer
    .from('users')
    .select('id, email, name, role, status, campus_id')
    .eq('id', targetUserId)
    .maybeSingle()

  if (findErr) throw findErr
  if (!targetUser) {
    return sendJson(res, 404, {
      success: false,
      error: 'User Not Found',
      message: 'The target user could not be found.',
    })
  }

  const targetEmail = (targetUser.email || '').toLowerCase().trim()
  const isTargetSuperAdmin = targetEmail === SUPER_ADMIN_EMAIL

  // Parse updates
  const newName = typeof body.name === 'string' ? body.name.trim() : targetUser.name
  let newRole = typeof body.role === 'string' ? body.role.trim().toUpperCase() : targetUser.role
  let newStatus = typeof body.status === 'string' ? body.status.trim().toUpperCase() : targetUser.status
  let newCampusId = body.campusId !== undefined
    ? (typeof body.campusId === 'string' && body.campusId !== 'NONE' && body.campusId.trim() ? body.campusId.trim() : null)
    : targetUser.campus_id

  // Security Guards:
  if (isTargetSuperAdmin) {
    if (newRole !== 'SUPERADMIN') {
      return sendJson(res, 403, {
        success: false,
        error: 'Operation Forbidden',
        message: 'Forbidden: The sole Super Administrator account (sgjitbros@gmail.com) cannot be demoted or modified.',
      })
    }
    if (newStatus === 'INACTIVE') {
      return sendJson(res, 403, {
        success: false,
        error: 'Operation Forbidden',
        message: 'Forbidden: The sole Super Administrator account cannot be deactivated.',
      })
    }
  } else {
    if (newRole === 'SUPERADMIN') {
      return sendJson(res, 403, {
        success: false,
        error: 'Operation Forbidden',
        message: 'Forbidden: Super Administrator role cannot be assigned to other accounts.',
      })
    }
  }

  if (newRole && !ALLOWED_TARGET_ROLES.has(newRole) && newRole !== 'SUPERADMIN') {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Role',
      message: `Invalid role "${newRole}". Supported roles: ${Array.from(ALLOWED_TARGET_ROLES).join(', ')}.`,
    })
  }

  if (newStatus && newStatus !== 'ACTIVE' && newStatus !== 'INACTIVE') {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Status',
      message: 'Status must be ACTIVE or INACTIVE.',
    })
  }

  // Self-demotion / deactivation guard
  if (targetUserId === adminId && (newRole !== targetUser.role || newStatus === 'INACTIVE')) {
    return sendJson(res, 403, {
      success: false,
      error: 'Operation Forbidden',
      message: 'Forbidden: Self-role changes or self-deactivation are not permitted.',
    })
  }

  // If campus is changing and user was a CAMPUS_MANAGER:
  if (targetUser.campus_id !== newCampusId && (targetUser.role === 'CAMPUS_MANAGER' || targetUser.role === 'ADMIN')) {
    if (targetUser.campus_id) {
      await supabaseServer
        .from('campuses')
        .update({ manager_id: null, updated_at: new Date().toISOString() })
        .eq('id', targetUser.campus_id)
        .eq('manager_id', targetUserId)
    }
  }

  // If role is changing away from CAMPUS_MANAGER, unbind manager_id on any campus
  if (targetUser.role === 'CAMPUS_MANAGER' && newRole !== 'CAMPUS_MANAGER') {
    await supabaseServer
      .from('campuses')
      .update({ manager_id: null, updated_at: new Date().toISOString() })
      .eq('manager_id', targetUserId)
  }

  // Update user in `users`
  const updatePayload: Record<string, any> = {
    name: newName,
    role: newRole,
    status: newStatus,
    campus_id: newCampusId,
    "updatedAt": new Date().toISOString(),
  }

  const { data: updated, error: updErr } = await supabaseServer
    .from('users')
    .update(updatePayload)
    .eq('id', targetUserId)
    .select('id, email, name, role, status, campus_id')
    .single()

  if (updErr) throw updErr

  // Profile synchronization if role or status changed:
  if (newRole === 'MENTOR') {
    const { data: existingM } = await supabaseServer.from('mentors').select('id').eq('user_id', targetUserId).maybeSingle()
    if (existingM) {
      await supabaseServer.from('mentors').update({ name: newName, status: newStatus, campus_id: newCampusId, updated_at: new Date().toISOString() }).eq('id', existingM.id)
    } else {
      const mentorCode = `MEN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      await supabaseServer.from('mentors').insert({
        user_id: targetUserId,
        name: newName,
        email: targetUser.email,
        mentor_code: mentorCode,
        max_students: 30,
        status: newStatus,
        campus_id: newCampusId,
      })
    }
  } else if (newRole === 'STUDENT') {
    const { data: existingS } = await supabaseServer.from('students').select('id').eq('user_id', targetUserId).maybeSingle()
    if (existingS) {
      await supabaseServer.from('students').update({ name: newName, status: newStatus, campus_id: newCampusId, updated_at: new Date().toISOString() }).eq('id', existingS.id)
    } else {
      const studentCode = `STU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      await supabaseServer.from('students').insert({
        user_id: targetUserId,
        name: newName,
        email: targetUser.email,
        student_code: studentCode,
        status: newStatus,
        campus_id: newCampusId,
      })
    }
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_USER',
    'USER',
    targetUserId,
    `${newName || targetEmail} (${targetEmail})`,
    {
      previous: { name: targetUser.name, role: targetUser.role, status: targetUser.status, campus_id: targetUser.campus_id },
      updated: { name: newName, role: newRole, status: newStatus, campus_id: newCampusId },
    },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `User "${newName || targetEmail}" updated successfully.`,
    data: updated,
  })
}

async function handleTransferRole(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const sourceUserId = typeof body.sourceUserId === 'string' ? body.sourceUserId.trim() : ''
  const destinationUserId = typeof body.destinationUserId === 'string' ? body.destinationUserId.trim() : ''
  const roleToTransfer = typeof body.roleToTransfer === 'string'
    ? body.roleToTransfer.trim().toUpperCase()
    : (typeof body.role === 'string' ? body.role.trim().toUpperCase() : '')
  const requestedSourceNewRole = typeof body.sourceNewRole === 'string' ? body.sourceNewRole.trim().toUpperCase() : ''
  const campusId = typeof body.campusId === 'string' && body.campusId !== 'NONE' && body.campusId.trim() ? body.campusId.trim() : null

  if (!sourceUserId || !destinationUserId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Users',
      message: 'Both source user ID and destination user ID are required.',
    })
  }

  if (sourceUserId === destinationUserId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Transfer',
      message: 'Source and destination users must be different.',
    })
  }

  if (roleToTransfer === 'SUPERADMIN') {
    return sendJson(res, 403, {
      success: false,
      error: 'Forbidden Operation',
      message: 'Forbidden: SUPERADMIN role cannot be transferred.',
    })
  }

  if (!ALLOWED_TARGET_ROLES.has(roleToTransfer)) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Role',
      message: `Invalid role to transfer: "${roleToTransfer}". Supported roles: ${Array.from(ALLOWED_TARGET_ROLES).join(', ')}.`,
    })
  }

  // Fetch both users
  const [sourceRes, destRes] = await Promise.all([
    supabaseServer.from('users').select('id, email, name, role, status, campus_id').eq('id', sourceUserId).maybeSingle(),
    supabaseServer.from('users').select('id, email, name, role, status, campus_id').eq('id', destinationUserId).maybeSingle(),
  ])

  if (sourceRes.error) throw sourceRes.error
  if (destRes.error) throw destRes.error

  const sourceUser = sourceRes.data
  const destUser = destRes.data

  if (!sourceUser) {
    return sendJson(res, 404, {
      success: false,
      error: 'Source User Not Found',
      message: 'The source user holding the role could not be found.',
    })
  }
  if (!destUser) {
    return sendJson(res, 404, {
      success: false,
      error: 'Destination User Not Found',
      message: 'The destination user to receive the role could not be found.',
    })
  }

  const sourceEmail = (sourceUser.email || '').toLowerCase().trim()
  const destEmail = (destUser.email || '').toLowerCase().trim()

  // Guard: SuperAdmin cannot be source user losing role
  if (sourceEmail === SUPER_ADMIN_EMAIL) {
    return sendJson(res, 403, {
      success: false,
      error: 'Operation Forbidden',
      message: 'Forbidden: The sole Super Administrator account (sgjitbros@gmail.com) cannot transfer their role away.',
    })
  }
  if (destEmail === SUPER_ADMIN_EMAIL) {
    return sendJson(res, 403, {
      success: false,
      error: 'Operation Forbidden',
      message: 'Forbidden: Cannot transfer a role onto the Super Administrator account.',
    })
  }

  // Validate source user actually holds the role being transferred
  if (sourceUser.role !== roleToTransfer) {
    return sendJson(res, 400, {
      success: false,
      error: 'Role Mismatch',
      message: `Source user "${sourceUser.name || sourceEmail}" does not currently hold the role "${roleToTransfer}" (current role: ${sourceUser.role}).`,
    })
  }

  // Validate destination user does not already hold this role
  if (destUser.role === roleToTransfer) {
    return sendJson(res, 400, {
      success: false,
      error: 'Duplicate Role',
      message: `Destination user "${destUser.name || destEmail}" already holds the role "${roleToTransfer}".`,
    })
  }

  // Validate destination user status
  if (destUser.status === 'INACTIVE') {
    return sendJson(res, 400, {
      success: false,
      error: 'Inactive Destination',
      message: `Cannot transfer role to inactive user "${destUser.name || destEmail}". Please activate their account first.`,
    })
  }

  // Determine source user's new role (defaults to STUDENT if transferring MENTOR/CAMPUS_MANAGER)
  let sourceNewRole = requestedSourceNewRole
  if (!sourceNewRole || sourceNewRole === roleToTransfer) {
    sourceNewRole = 'STUDENT'
  }
  if (!ALLOWED_TARGET_ROLES.has(sourceNewRole)) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Resulting Role',
      message: `Invalid new role "${sourceNewRole}" for source user.`,
    })
  }

  const effectiveCampusId = campusId || destUser.campus_id || sourceUser.campus_id

  // Perform transfer operations:
  // Step 1: Destination user gets roleToTransfer
  const destUpdatePayload: Record<string, any> = {
    role: roleToTransfer,
    "updatedAt": new Date().toISOString(),
  }
  if (roleToTransfer === 'CAMPUS_MANAGER' && effectiveCampusId) {
    destUpdatePayload.campus_id = effectiveCampusId
  }

  const { error: destUpdErr } = await supabaseServer
    .from('users')
    .update(destUpdatePayload)
    .eq('id', destinationUserId)

  if (destUpdErr) throw destUpdErr

  // Step 2: Source user gets sourceNewRole
  const sourceUpdatePayload: Record<string, any> = {
    role: sourceNewRole,
    "updatedAt": new Date().toISOString(),
  }
  // If source was campus manager and new role is not campus manager, unbind them from any campus they managed
  if (roleToTransfer === 'CAMPUS_MANAGER' && sourceNewRole !== 'CAMPUS_MANAGER') {
    await supabaseServer
      .from('campuses')
      .update({ manager_id: null, updated_at: new Date().toISOString() })
      .eq('manager_id', sourceUserId)
  }

  const { error: sourceUpdErr } = await supabaseServer
    .from('users')
    .update(sourceUpdatePayload)
    .eq('id', sourceUserId)

  if (sourceUpdErr) throw sourceUpdErr

  // Step 3: Profile synchronization:
  if (roleToTransfer === 'CAMPUS_MANAGER') {
    // Unbind destination from any prior campus they may have managed
    await supabaseServer
      .from('campuses')
      .update({ manager_id: null, updated_at: new Date().toISOString() })
      .eq('manager_id', destinationUserId)

    // Assign destination to the target effective campus
    if (effectiveCampusId) {
      await supabaseServer
        .from('campuses')
        .update({ manager_id: destinationUserId, updated_at: new Date().toISOString() })
        .eq('id', effectiveCampusId)
    }
  } else if (roleToTransfer === 'MENTOR') {
    const { data: existingM } = await supabaseServer.from('mentors').select('id').eq('user_id', destinationUserId).maybeSingle()
    if (!existingM) {
      const mentorCode = `MEN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      await supabaseServer.from('mentors').insert({
        user_id: destinationUserId,
        name: destUser.name,
        email: destUser.email,
        mentor_code: mentorCode,
        max_students: 30,
        status: 'ACTIVE',
        campus_id: effectiveCampusId,
      })
    } else {
      await supabaseServer.from('mentors').update({ status: 'ACTIVE', campus_id: effectiveCampusId, updated_at: new Date().toISOString() }).eq('id', existingM.id)
    }
  } else if (roleToTransfer === 'STUDENT') {
    const { data: existingS } = await supabaseServer.from('students').select('id').eq('user_id', destinationUserId).maybeSingle()
    if (!existingS) {
      const studentCode = `STU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      await supabaseServer.from('students').insert({
        user_id: destinationUserId,
        name: destUser.name,
        email: destUser.email,
        student_code: studentCode,
        status: 'ACTIVE',
        campus_id: effectiveCampusId,
      })
    } else {
      await supabaseServer.from('students').update({ status: 'ACTIVE', campus_id: effectiveCampusId, updated_at: new Date().toISOString() }).eq('id', existingS.id)
    }
  }

  // Ensure source user's new profile exists if demoted to STUDENT/MENTOR
  if (sourceNewRole === 'STUDENT') {
    const { data: existingS } = await supabaseServer.from('students').select('id').eq('user_id', sourceUserId).maybeSingle()
    if (!existingS) {
      const studentCode = `STU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      await supabaseServer.from('students').insert({
        user_id: sourceUserId,
        name: sourceUser.name,
        email: sourceUser.email,
        student_code: studentCode,
        status: 'ACTIVE',
        campus_id: sourceUser.campus_id,
      })
    }
  } else if (sourceNewRole === 'MENTOR') {
    const { data: existingM } = await supabaseServer.from('mentors').select('id').eq('user_id', sourceUserId).maybeSingle()
    if (!existingM) {
      const mentorCode = `MEN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      await supabaseServer.from('mentors').insert({
        user_id: sourceUserId,
        name: sourceUser.name,
        email: sourceUser.email,
        mentor_code: mentorCode,
        max_students: 30,
        status: 'ACTIVE',
        campus_id: sourceUser.campus_id,
      })
    }
  }

  // Record Audit Log
  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'TRANSFER_ROLE',
    'USER',
    destinationUserId,
    `Transfer ${roleToTransfer}: ${sourceUser.name || sourceEmail} -> ${destUser.name || destEmail}`,
    {
      roleTransferred: roleToTransfer,
      source: { id: sourceUserId, email: sourceEmail, previousRole: sourceUser.role, newRole: sourceNewRole },
      destination: { id: destinationUserId, email: destEmail, previousRole: destUser.role, newRole: roleToTransfer },
      campusId: effectiveCampusId,
    },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Role "${roleToTransfer}" successfully transferred from ${sourceUser.name || sourceEmail} to ${destUser.name || destEmail}. ${sourceUser.name || sourceEmail} is now ${sourceNewRole}.`,
    data: {
      sourceUser: { id: sourceUserId, role: sourceNewRole },
      destinationUser: { id: destinationUserId, role: roleToTransfer },
      source: { id: sourceUserId, role: sourceNewRole },
      destination: { id: destinationUserId, role: roleToTransfer },
      roleTransferred: roleToTransfer,
      transferredRole: roleToTransfer,
    },
  })
}

async function handleToggleUserStatus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const targetUserId = typeof body.userId === 'string' ? body.userId.trim() : ''
  const requestedStatus = typeof body.status === 'string' ? body.status.trim().toUpperCase() : ''

  if (!targetUserId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing User ID',
      message: 'User ID is required.',
    })
  }

  const { data: targetUser, error: findErr } = await supabaseServer
    .from('users')
    .select('id, email, name, role, status')
    .eq('id', targetUserId)
    .maybeSingle()

  if (findErr) throw findErr
  if (!targetUser) {
    return sendJson(res, 404, {
      success: false,
      error: 'User Not Found',
      message: 'The target user could not be found.',
    })
  }

  const targetEmail = (targetUser.email || '').toLowerCase().trim()
  const nextStatus = requestedStatus || (targetUser.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')

  if (targetEmail === SUPER_ADMIN_EMAIL && nextStatus === 'INACTIVE') {
    return sendJson(res, 403, {
      success: false,
      error: 'Operation Forbidden',
      message: 'Forbidden: The sole Super Administrator account (sgjitbros@gmail.com) cannot be deactivated.',
    })
  }

  if (targetUserId === adminId && nextStatus === 'INACTIVE') {
    return sendJson(res, 403, {
      success: false,
      error: 'Operation Forbidden',
      message: 'Forbidden: Self-deactivation is not permitted.',
    })
  }

  const { data: updated, error: updErr } = await supabaseServer
    .from('users')
    .update({ status: nextStatus, "updatedAt": new Date().toISOString() })
    .eq('id', targetUserId)
    .select('id, email, name, role, status')
    .single()

  if (updErr) throw updErr

  // Synchronize status to profile
  if (targetUser.role === 'MENTOR') {
    await supabaseServer.from('mentors').update({ status: nextStatus, updated_at: new Date().toISOString() }).eq('user_id', targetUserId)
  } else if (targetUser.role === 'STUDENT') {
    await supabaseServer.from('students').update({ status: nextStatus, updated_at: new Date().toISOString() }).eq('user_id', targetUserId)
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'TOGGLE_USER_STATUS',
    'USER',
    targetUserId,
    `${targetUser.name || targetEmail} (${targetEmail})`,
    { previousStatus: targetUser.status, newStatus: nextStatus },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Account for ${targetUser.name || targetEmail} is now ${nextStatus}.`,
    data: updated,
  })
}

async function handleDeleteUser(
  body: Record<string, unknown>,
  adminId: string,
  callerEmail: string,
  clientIp: string,
  res: ServerResponse
) {
  const targetUserId = typeof body.userId === 'string' ? body.userId.trim() : ''
  const confirmEmail = typeof body.confirmEmail === 'string' ? body.confirmEmail.trim().toLowerCase() : ''
  const reason = typeof body.reason === 'string' ? body.reason.trim() : ''

  if (!targetUserId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing User ID',
      message: 'User ID is required.',
    })
  }

  if (!reason || reason.length < 3) {
    return sendJson(res, 400, {
      success: false,
      error: 'Deletion Reason Required',
      message: 'Please provide a deletion reason (at least 3 characters).',
    })
  }

  if (!confirmEmail) {
    return sendJson(res, 400, {
      success: false,
      error: 'Email Confirmation Required',
      message: 'Please type the target user email to confirm deletion.',
    })
  }

  const { data: targetUser, error: findErr } = await supabaseServer
    .from('users')
    .select('id, email, name, role, status, authUid, campus_id, deleted_at')
    .eq('id', targetUserId)
    .maybeSingle()

  if (findErr) throw findErr
  if (!targetUser) {
    return sendJson(res, 404, {
      success: false,
      error: 'User Not Found',
      message: 'The target user could not be found.',
    })
  }

  const targetEmail = (targetUser.email || '').toLowerCase().trim()
  const targetRole = (targetUser.role || 'STUDENT').toUpperCase().trim()

  if (targetUser.deleted_at) {
    return sendJson(res, 409, {
      success: false,
      error: 'Already Deleted',
      message: `Account for ${targetUser.name || targetEmail} has already been deleted.`,
    })
  }

  // Critical Protection 1: Protected sole Super Admin account
  if (targetEmail === SUPER_ADMIN_EMAIL) {
    return sendJson(res, 403, {
      success: false,
      error: 'Protected Account',
      message: `Forbidden: The protected Super Administrator account (${SUPER_ADMIN_EMAIL}) cannot be deleted.`,
    })
  }

  // Critical Protection 2: Self-deletion prevention
  if (targetUserId === adminId) {
    return sendJson(res, 403, {
      success: false,
      error: 'Self-Deletion Forbidden',
      message: 'Forbidden: You cannot delete your own currently logged-in Super Admin account.',
    })
  }

  // Critical Protection 3: Last active Super Admin protection
  if (targetRole === SUPER_ADMIN_ROLE) {
    const { data: otherAdmins, error: adminCountErr } = await supabaseServer
      .from('users')
      .select('id, status, deleted_at')
      .eq('role', SUPER_ADMIN_ROLE)
      .eq('status', 'ACTIVE')
      .neq('id', targetUserId)

    if (adminCountErr) throw adminCountErr
    const activeOthers = (otherAdmins || []).filter((a: any) => !a.deleted_at)
    if (activeOthers.length === 0) {
      return sendJson(res, 403, {
        success: false,
        error: 'Last Super Admin Protected',
        message: 'Forbidden: Cannot delete the last active Super Administrator account.',
      })
    }
  }

  if (confirmEmail !== targetEmail) {
    return sendJson(res, 400, {
      success: false,
      error: 'Email Confirmation Mismatch',
      message: `Confirmation email "${confirmEmail}" does not match "${targetEmail}".`,
    })
  }

  const now = new Date().toISOString()

  // 1. Safe soft deletion on public.users (preserves identity, role, email, and FK history)
  const { data: updatedUser, error: updErr } = await supabaseServer
    .from('users')
    .update({
      status: 'INACTIVE',
      deleted_at: now,
      deleted_by: callerEmail,
      deletion_reason: reason,
      updatedAt: now,
    })
    .eq('id', targetUserId)
    .select('id, email, name, role, status, deleted_at, deleted_by, deletion_reason')
    .single()

  if (updErr) throw updErr

  // 2. Role-specific access revocation (strictly preserving academic & historical records)
  const { data: studentProfile } = await supabaseServer
    .from('students')
    .select('id')
    .eq('user_id', targetUserId)
    .maybeSingle()

  if (studentProfile?.id) {
    await supabaseServer
      .from('students')
      .update({ status: 'INACTIVE', updated_at: now })
      .eq('id', studentProfile.id)

    await supabaseServer
      .from('mentor_students')
      .update({ status: 'INACTIVE', unassigned_at: now, updated_at: now })
      .eq('student_id', studentProfile.id)
      .eq('status', 'ACTIVE')
  }

  const { data: mentorProfile } = await supabaseServer
    .from('mentors')
    .select('id')
    .eq('user_id', targetUserId)
    .maybeSingle()

  if (mentorProfile?.id) {
    await supabaseServer
      .from('mentors')
      .update({ status: 'INACTIVE', updated_at: now })
      .eq('id', mentorProfile.id)

    await supabaseServer
      .from('mentor_students')
      .update({ status: 'INACTIVE', unassigned_at: now, updated_at: now })
      .eq('mentor_id', mentorProfile.id)
      .eq('status', 'ACTIVE')
  }

  // Unassign campus manager link if this user was managing a campus
  await supabaseServer
    .from('campuses')
    .update({ manager_id: null, updated_at: now })
    .eq('manager_id', targetUserId)

  // Revoke active Content Manager assignment while preserving assignment & profile history
  const { data: cmAssignment } = await supabaseServer
    .from('content_manager_assignments')
    .select('id, status, is_active')
    .eq('user_id', targetUserId)
    .maybeSingle()

  if (cmAssignment && (cmAssignment.status === 'ACTIVE' || cmAssignment.is_active === true)) {
    await supabaseServer
      .from('content_manager_assignments')
      .update({
        status: 'REVOKED',
        is_active: false,
        revoked_by: callerEmail,
        revoked_at: now,
        updated_by: callerEmail,
        updated_at: now,
      })
      .eq('id', cmAssignment.id)
  }

  // 3. Revoke active sessions & prevent future auth logins without deleting auth.users
  invalidateAuthCacheForUser(targetUserId)
  let sessionRevoked = false
  let authLoginBlocked = false
  const authUid = (targetUser as { authUid?: string | null }).authUid || null
  if (authUid && supabaseServer.auth?.admin) {
    try {
      const authAdmin = supabaseServer.auth.admin as unknown as {
        signOut?: (jwtOrUid: string, scope?: string) => Promise<unknown>
        updateUserById?: (uid: string, attrs: Record<string, unknown>) => Promise<unknown>
      }
      if (typeof authAdmin.signOut === 'function') {
        await authAdmin.signOut(authUid, 'global')
        sessionRevoked = true
      }
      if (typeof authAdmin.updateUserById === 'function') {
        await authAdmin.updateUserById(authUid, { ban_duration: '876000h' })
        authLoginBlocked = true
      }
    } catch (authErr) {
      console.warn('[superadmin-delete-user] Auth session/ban notice:', authErr)
    }
  }

  // 4. Mandatory append-only audit log
  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'DELETE_USER',
    'USER',
    targetUserId,
    `${targetUser.name || targetEmail} (${targetEmail})`,
    {
      role: targetRole,
      previousStatus: targetUser.status,
      campusId: targetUser.campus_id || null,
      reason,
      softDeleted: true,
      sessionRevoked,
      authLoginBlocked,
      preservedRecords: [
        'UserProgress',
        'Submission',
        'mentor_students',
        'content_manager_assignments',
        'content_managers',
        'admin_audit_logs',
      ],
    },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Account for "${targetUser.name || targetEmail}" (${targetEmail}) has been safely deactivated and removed from active listings.`,
    data: {
      ...(updatedUser as Record<string, unknown>),
      sessionRevoked,
      authLoginBlocked,
    },
  })
}

async function handleAssignUserCampus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const targetUserId = typeof body.userId === 'string' ? body.userId.trim() : ''
  const campusId = typeof body.campusId === 'string' && body.campusId !== 'NONE' && body.campusId.trim() ? body.campusId.trim() : null

  if (!targetUserId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing User ID',
      message: 'User ID is required.',
    })
  }

  const { data: targetUser, error: findErr } = await supabaseServer
    .from('users')
    .select('id, email, name, role, status, campus_id')
    .eq('id', targetUserId)
    .maybeSingle()

  if (findErr) throw findErr
  if (!targetUser) {
    return sendJson(res, 404, {
      success: false,
      error: 'User Not Found',
      message: 'The target user could not be found.',
    })
  }

  const previousCampusId = targetUser.campus_id

  // If user was campus manager of previous campus, clear old campus manager_id
  if (previousCampusId && (targetUser.role === 'CAMPUS_MANAGER' || targetUser.role === 'ADMIN')) {
    await supabaseServer
      .from('campuses')
      .update({ manager_id: null, updated_at: new Date().toISOString() })
      .eq('id', previousCampusId)
      .eq('manager_id', targetUserId)
  }

  const { data: updated, error: updErr } = await supabaseServer
    .from('users')
    .update({ campus_id: campusId, "updatedAt": new Date().toISOString() })
    .eq('id', targetUserId)
    .select('id, email, name, role, status, campus_id')
    .single()

  if (updErr) throw updErr

  // Synchronize to profiles
  if (targetUser.role === 'MENTOR') {
    await supabaseServer.from('mentors').update({ campus_id: campusId, updated_at: new Date().toISOString() }).eq('user_id', targetUserId)
  } else if (targetUser.role === 'STUDENT') {
    await supabaseServer.from('students').update({ campus_id: campusId, updated_at: new Date().toISOString() }).eq('user_id', targetUserId)
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'ASSIGN_USER_CAMPUS',
    'USER',
    targetUserId,
    `${targetUser.name || targetUser.email} (${targetUser.email})`,
    { previousCampusId, newCampusId: campusId },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Campus assignment updated for ${targetUser.name || targetUser.email}.`,
    data: updated,
  })
}

// ─── 7. Audit Log Access ─────────────────────────────────────────────────────

async function handleListAuditLogs(
  body: Record<string, unknown>,
  req: IncomingMessage & { query?: unknown },
  res: ServerResponse
) {
  const query = (typeof req.query === 'object' && req.query ? (req.query as Record<string, unknown>) : {}) as Record<string, unknown>
  const actionFilter = typeof body.actionFilter === 'string' && body.actionFilter !== 'ALL' ? body.actionFilter.trim() : String(query.actionFilter || '').trim()
  const targetType = typeof body.targetType === 'string' && body.targetType !== 'ALL' ? body.targetType.trim() : String(query.targetType || '').trim()
  const page = Math.max(1, parseInt(String(body.page || query.page || '1'), 10))
  const limit = Math.min(200, Math.max(10, parseInt(String(body.limit || query.limit || '50'), 10)))

  let q = supabaseServer
    .from('admin_audit_logs')
    .select('*', { count: 'exact' })

  if (actionFilter && actionFilter !== 'ALL') {
    q = q.eq('action', actionFilter)
  }
  if (targetType && targetType !== 'ALL') {
    q = q.eq('target_type', targetType)
  }

  const offset = (page - 1) * limit
  q = q.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

  const { data: logs, count, error } = await q
  if (error) throw error

  return sendJson(res, 200, {
    success: true,
    message: 'Audit logs retrieved successfully.',
    data: {
      logs: logs || [],
      totalCount: count ?? (logs || []).length,
      page,
      limit,
      totalPages: Math.ceil((count ?? (logs || []).length) / limit),
    },
  })
}

// ─── 8. Questions Management ────────────────────────────────────────────────

async function handleListQuestions(
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  const urlObj = new URL(req.url || '/', 'http://localhost')
  const search = typeof body.search === 'string' ? body.search.trim().toLowerCase() : (urlObj.searchParams.get('search') || '').trim().toLowerCase()
  const difficulty = typeof body.difficulty === 'string' ? body.difficulty.trim() : (urlObj.searchParams.get('difficulty') || 'ALL').trim()
  const topic = typeof body.topic === 'string' ? body.topic.trim() : (urlObj.searchParams.get('topic') || 'ALL').trim()
  const status = typeof body.status === 'string' ? body.status.trim().toUpperCase() : (urlObj.searchParams.get('status') || 'ALL').trim().toUpperCase()
  const learningUnitId = typeof body.learningUnitId === 'string'
    ? body.learningUnitId.trim()
    : (urlObj.searchParams.get('learningUnitId') || '').trim()
  const onlyLearningUnits = body.onlyLearningUnits === true || urlObj.searchParams.get('onlyLearningUnits') === 'true'
  const onlyBelts = body.onlyBelts === true || urlObj.searchParams.get('onlyBelts') === 'true'
  const belt = typeof body.belt === 'string'
    ? body.belt.trim()
    : typeof body.belt === 'number'
    ? String(body.belt)
    : (urlObj.searchParams.get('belt') || 'ALL').trim()

  const requestedPage = Number.parseInt(String(body.page ?? urlObj.searchParams.get('page') ?? '1'), 10)
  const requestedLimit = Number.parseInt(String(body.limit ?? urlObj.searchParams.get('limit') ?? '50'), 10)
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1
  const limit = Number.isFinite(requestedLimit) ? Math.min(100, Math.max(1, requestedLimit)) : 50

  const [problemsRes, beltsRes] = await Promise.all([
    supabaseServer
      .from('Problem')
      .select('id, beltId, learningUnitId, order, title, slug, difficulty, subdivision, canonicalProblemId, isActive, status, approvalStatus, timeLimitMs, memoryLimitMb, examples, starterCodes, createdAt, updatedAt'),
    supabaseServer
      .from('Belt')
      .select('id, order, name, title'),
  ])

  if (problemsRes.error) throw problemsRes.error

  const beltOrderMap = buildBeltOrderMap(beltsRes?.data)
  const problems = problemsRes.data || []
  const statsSubset = learningUnitId ? problems.filter((p: any) => p.learningUnitId === learningUnitId) : problems
  let totalPublished = 0
  let totalDraft = 0
  let totalArchived = 0
  let totalPendingReview = 0
  const difficultyCounts: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 }
  const topicCounts: Record<string, number> = {}

  for (const problem of statsSubset) {
    const rawSt = String(problem.status || '').toUpperCase()
    const rawAppSt = String(problem.approvalStatus || '').toUpperCase()
    const isArchived = rawSt === 'ARCHIVED'
    const isPending = rawSt === 'PENDING_REVIEW' || rawAppSt === 'PENDING_REVIEW'
    const isPub = !isArchived && !isPending && (rawSt === 'PUBLISHED' || (rawSt !== 'DRAFT' && Boolean(problem.isActive)))
    const isDraft = !isArchived && !isPending && !isPub

    if (isArchived) totalArchived++
    else if (isPending) totalPendingReview++
    else if (isPub) totalPublished++
    else if (isDraft) totalDraft++

    const diff = problem.difficulty || 'Easy'
    if (diff in difficultyCounts) difficultyCounts[diff]++

    const problemTopic = problem.subdivision || 'General'
    topicCounts[problemTopic] = (topicCounts[problemTopic] || 0) + 1
  }

  const filtered = problems.filter((problem: any) => {
    if (learningUnitId && problem.learningUnitId !== learningUnitId) return false
    if (!learningUnitId && onlyLearningUnits && !problem.learningUnitId) return false
    if (!learningUnitId && onlyBelts && problem.learningUnitId) return false
    if (difficulty !== 'ALL' && problem.difficulty !== difficulty) return false
    if (topic !== 'ALL' && (problem.subdivision || 'General') !== topic) return false

    const rawSt = String(problem.status || '').toUpperCase()
    const isPub = rawSt === 'PUBLISHED' || (rawSt !== 'DRAFT' && rawSt !== 'PENDING_REVIEW' && rawSt !== 'ARCHIVED' && problem.isActive)
    if (status === 'PUBLISHED' && !isPub) return false
    if (status === 'DRAFT' && (isPub || rawSt === 'PENDING_REVIEW' || rawSt === 'ARCHIVED')) return false
    if (status === 'PENDING_REVIEW' && rawSt !== 'PENDING_REVIEW' && String(problem.approvalStatus || '').toUpperCase() !== 'PENDING_REVIEW') return false
    if (status === 'ARCHIVED' && rawSt !== 'ARCHIVED') return false

    if (belt !== 'ALL' && !learningUnitId) {
      if (problem.learningUnitId) return false
      const beltNum = parseInt(belt.replace(/[^0-9]/g, ''), 10)
      const hasBeltNumber = Number.isFinite(beltNum)
      const problemBeltOrder = getProblemBeltOrder(problem, beltOrderMap)
      const matchesBeltOrder = hasBeltNumber && problemBeltOrder === beltNum
      const matchesBeltId = problem.beltId === belt || (
        hasBeltNumber && problem.beltId === 'mock-belt-' + beltNum
      )
      const matchesSlug = hasBeltNumber && typeof problem.slug === 'string' && problem.slug.startsWith('belt-' + beltNum + '-')
      if (!matchesBeltOrder && !matchesBeltId && !matchesSlug) return false
    }

    if (search) {
      const matchTitle = (problem.title || '').toLowerCase().includes(search)
      const matchSlug = (problem.slug || '').toLowerCase().includes(search)
      const matchTopic = (problem.subdivision || '').toLowerCase().includes(search)
      if (!matchTitle && !matchSlug && !matchTopic) return false
    }
    return true
  })

  // Hierarchical sort BEFORE pagination slice:
  // 1. Parent Belt numeric order -> 2. Problem numeric order -> 3. Variant sequence -> 4. Subdivision -> 5. Title / ID
  filtered.sort((a: any, b: any) => compareProblemsHierarchically(a, b, beltOrderMap))

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const currentPage = Math.min(page, totalPages)
  const offset = (currentPage - 1) * limit
  const pageProblems = filtered.slice(offset, offset + limit)
  const pageProblemIds = pageProblems.map((problem: any) => problem.id)

  // Query test case counts: try ProblemTestCase, fallback to TestCase
  const testCaseCounts = new Map<string, { total: number; visible: number; hidden: number }>()
  if (pageProblemIds.length > 0) {
    let testCasesRes: any = await supabaseServer
      .from('ProblemTestCase')
      .select('id, problemId, displayOrder, isHidden')
      .in('problemId', pageProblemIds)

    if (testCasesRes.error || !testCasesRes.data || testCasesRes.data.length === 0) {
      testCasesRes = await supabaseServer
        .from('TestCase')
        .select('id, problemId, testIndex, isHidden')
        .in('problemId', pageProblemIds)
    }

    if (testCasesRes.data) {
      for (const tc of testCasesRes.data) {
        const counts = testCaseCounts.get(tc.problemId) || { total: 0, visible: 0, hidden: 0 }
        counts.total++
        if (tc.isHidden) counts.hidden++
        else counts.visible++
        testCaseCounts.set(tc.problemId, counts)
      }
    }
  }

  const enrichedQuestions = pageProblems.map((problem: any) => {
    const testCaseCount = testCaseCounts.get(problem.id) || { total: 0, visible: 0, hidden: 0 }
    const examples = Array.isArray(problem.examples) ? problem.examples : []
    const inferredBeltOrder = getProblemBeltOrder(problem, beltOrderMap)
    const resolvedStatus = resolvePublicationStatus(problem.status, problem.isActive, problem.approvalStatus)

    return {
      id: problem.id,
      slug: problem.slug,
      title: problem.title,
      order: typeof problem.order === 'number' ? problem.order : (Number.parseInt(String(problem.order ?? 0), 10) || 0),
      difficulty: problem.difficulty,
      topic: problem.subdivision || 'General',
      subdivision: problem.subdivision,
      learningUnitId: problem.learningUnitId || null,
      beltId: problem.learningUnitId ? (problem.beltId || null) : (problem.beltId || 'mock-belt-' + inferredBeltOrder),
      beltOrder: inferredBeltOrder,
      status: resolvedStatus,
      approvalStatus: problem.approvalStatus || 'APPROVED',
      isActive: Boolean(problem.isActive),
      timeLimitMs: problem.timeLimitMs || 2000,
      memoryLimitMb: problem.memoryLimitMb || 256,
      description: '',
      inputFormat: '',
      outputFormat: '',
      constraints: '',
      examples,
      starterCodes: problem.starterCodes || {},
      exampleCount: examples.length,
      testCaseCount,
      visibleTestCaseCount: testCaseCount.visible,
      hiddenTestCaseCount: testCaseCount.hidden,
      createdAt: problem.createdAt || problem.created_at || new Date().toISOString(),
      updatedAt: problem.updatedAt || problem.updated_at || problem.createdAt || new Date().toISOString(),
    }
  })

  return sendJson(res, 200, {
    success: true,
    message: 'Questions retrieved successfully.',
    data: {
      questions: enrichedQuestions,
      stats: {
        total: statsSubset.length,
        published: totalPublished,
        draft: totalDraft,
        archived: totalArchived,
        pendingReview: totalPendingReview,
        easy: difficultyCounts.Easy || 0,
        medium: difficultyCounts.Medium || 0,
        hard: difficultyCounts.Hard || 0,
        difficultyCounts,
        topicCounts,
      },
      total,
      page: currentPage,
      limit,
      totalPages,
    },
  })
}

async function findQuestionByIdOrSlug(idOrSlug: string): Promise<any | null> {
  const byId = await supabaseServer
    .from('Problem')
    .select('*')
    .eq('id', idOrSlug)
    .maybeSingle()

  if (byId.error) throw byId.error
  if (byId.data) return byId.data

  const bySlug = await supabaseServer
    .from('Problem')
    .select('*')
    .eq('slug', idOrSlug)
    .maybeSingle()

  if (bySlug.error) throw bySlug.error
  return bySlug.data || null
}

async function handleGetQuestion(
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  const urlObj = new URL(req.url || '/', 'http://localhost')
  const idOrSlug = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim()
      ? body.slug.trim()
      : (urlObj.searchParams.get('id') || urlObj.searchParams.get('slug') || '').trim())

  if (!idOrSlug) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'Question ID or slug is required.',
    })
  }

  const question = await findQuestionByIdOrSlug(idOrSlug)
  if (!question) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question with identifier "${idOrSlug}" was not found.`,
    })
  }

  // 1. Fetch Examples (try normalized ProblemExample first, fallback to JSON column)
  let examples: any[] = []
  const { data: peRows } = await supabaseServer
    .from('ProblemExample')
    .select('*')
    .eq('problemId', question.id)
    .order('displayOrder', { ascending: true })

  if (peRows && peRows.length > 0) {
    examples = peRows.map((pe: any, idx: number) => ({
      id: pe.id,
      problemId: pe.problemId,
      label: `Example ${pe.displayOrder || idx + 1}`,
      input: pe.input || '',
      output: pe.expectedOutput || '',
      expectedOutput: pe.expectedOutput || '',
      explanation: pe.explanation || '',
      displayOrder: pe.displayOrder || idx + 1,
    }))
  } else if (Array.isArray(question.examples)) {
    examples = question.examples.map((ex: any, idx: number) => ({
      id: ex.id || `ex-${idx + 1}`,
      label: ex.label || `Example ${idx + 1}`,
      input: ex.input || '',
      output: ex.output || ex.expectedOutput || '',
      expectedOutput: ex.output || ex.expectedOutput || '',
      explanation: ex.explanation || '',
      displayOrder: ex.displayOrder || idx + 1,
    }))
  }

  // 2. Fetch Test Cases (try normalized ProblemTestCase first, fallback to TestCase)
  let testCases: any[] = []
  const { data: ptcRows } = await supabaseServer
    .from('ProblemTestCase')
    .select('*')
    .eq('problemId', question.id)
    .order('displayOrder', { ascending: true })

  if (ptcRows && ptcRows.length > 0) {
    testCases = ptcRows.map((tc: any, idx: number) => ({
      id: tc.id,
      problemId: tc.problemId,
      testIndex: tc.displayOrder || idx + 1,
      displayOrder: tc.displayOrder || idx + 1,
      input: tc.input || '',
      expectedOutput: tc.expectedOutput || '',
      isHidden: Boolean(tc.isHidden),
      points: tc.points ?? 10,
      description: tc.explanation || '',
      explanation: tc.explanation || '',
    }))
  } else {
    const { data: legacyCases } = await supabaseServer
      .from('TestCase')
      .select('*')
      .eq('problemId', question.id)
      .order('testIndex', { ascending: true })

    testCases = (legacyCases || []).map((tc: any, idx: number) => ({
      id: tc.id,
      problemId: tc.problemId,
      testIndex: tc.testIndex || idx + 1,
      displayOrder: tc.testIndex || idx + 1,
      input: tc.input || '',
      expectedOutput: tc.expectedOutput || '',
      isHidden: Boolean(tc.isHidden),
      points: 10,
      description: tc.explanation || '',
      explanation: tc.explanation || '',
    }))
  }

  // 3. Fetch Starter Code (try ProblemStarterCode first, fallback to JSON column)
  let starterCodes: Record<string, string> = {}
  const { data: pscRows } = await supabaseServer
    .from('ProblemStarterCode')
    .select('*')
    .eq('problemId', question.id)

  if (pscRows && pscRows.length > 0) {
    for (const sc of pscRows) {
      if (sc.language) starterCodes[sc.language] = sc.code || ''
    }
  } else if (question.starterCodes && typeof question.starterCodes === 'object') {
    starterCodes = { ...question.starterCodes }
  }

  // 4. Fetch Revisions
  const { data: revisions } = await supabaseServer
    .from('ProblemRevision')
    .select('id, version, changeSummary, changedBy, createdAt')
    .eq('problemId', question.id)
    .order('version', { ascending: false })

  const visibleCount = testCases.filter((tc) => !tc.isHidden).length
  const hiddenCount = testCases.filter((tc) => tc.isHidden).length
  const isPub = question.status === 'PUBLISHED' || (question.status !== 'DRAFT' && question.isActive)

  return sendJson(res, 200, {
    success: true,
    message: 'Question details retrieved.',
    data: {
      id: question.id,
      slug: question.slug,
      title: question.title,
      difficulty: question.difficulty,
      topic: question.subdivision || 'General',
      subdivision: question.subdivision,
      learningUnitId: question.learningUnitId || null,
      beltId: question.beltId || null,
      status: isPub ? 'PUBLISHED' : 'DRAFT',
      isActive: Boolean(question.isActive),
      timeLimitMs: question.timeLimitMs || 2000,
      memoryLimitMb: question.memoryLimitMb || 256,
      createdBy: question.createdBy || null,
      updatedBy: question.updatedBy || null,
      description: question.description || '',
      inputFormat: question.inputFormat || '',
      outputFormat: question.outputFormat || '',
      constraints: question.explanation || '',
      examples,
      testCases,
      starterCodes,
      exampleCount: examples.length,
      testCaseCount: {
        total: testCases.length,
        visible: visibleCount,
        hidden: hiddenCount,
      },
      revisions: revisions || [],
      createdAt: question.createdAt || question.created_at,
      updatedAt: question.updatedAt || question.updated_at,
    },
  })
}

async function handleGetQuestionPreview(
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  const urlObj = new URL(req.url || '/', 'http://localhost')
  const idOrSlug = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim()
      ? body.slug.trim()
      : (urlObj.searchParams.get('id') || urlObj.searchParams.get('slug') || '').trim())

  if (!idOrSlug) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'Question ID or slug is required.',
    })
  }

  const question = await findQuestionByIdOrSlug(idOrSlug)
  if (!question) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question with identifier "${idOrSlug}" was not found.`,
    })
  }

  // Fetch test cases (STRICT SECURITY GUARANTEE: isHidden === false only)
  let visibleCases: any[] = []
  let totalCount = 0
  let hiddenCount = 0

  const { data: ptcCases } = await supabaseServer
    .from('ProblemTestCase')
    .select('id, displayOrder, input, expectedOutput, explanation, isHidden, points')
    .eq('problemId', question.id)
    .order('displayOrder', { ascending: true })

  if (ptcCases && ptcCases.length > 0) {
    totalCount = ptcCases.length
    hiddenCount = ptcCases.filter((tc: any) => tc.isHidden).length
    visibleCases = ptcCases
      .filter((tc: any) => !tc.isHidden)
      .map((tc: any, idx: number) => ({
        testIndex: tc.displayOrder || idx + 1,
        displayOrder: tc.displayOrder || idx + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        explanation: tc.explanation,
        isHidden: false,
        points: tc.points ?? 10,
      }))
  } else {
    const { data: legacyCases } = await supabaseServer
      .from('TestCase')
      .select('testIndex, input, expectedOutput, explanation, isHidden')
      .eq('problemId', question.id)
      .order('testIndex', { ascending: true })

    const lCases = legacyCases || []
    totalCount = lCases.length
    hiddenCount = lCases.filter((tc: any) => tc.isHidden).length
    visibleCases = lCases
      .filter((tc: any) => !tc.isHidden)
      .map((tc: any) => ({
        testIndex: tc.testIndex,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        explanation: tc.explanation,
        isHidden: false,
      }))
  }

  let examples: any[] = []
  const { data: peList } = await supabaseServer
    .from('ProblemExample')
    .select('*')
    .eq('problemId', question.id)
    .order('displayOrder', { ascending: true })

  if (peList && peList.length > 0) {
    examples = peList.map((pe: any, idx: number) => ({
      label: `Example ${pe.displayOrder || idx + 1}`,
      input: pe.input,
      output: pe.expectedOutput,
      explanation: pe.explanation,
    }))
  } else if (Array.isArray(question.examples)) {
    examples = question.examples
  }

  let starterCodes: Record<string, string> = {}
  const { data: pscList } = await supabaseServer
    .from('ProblemStarterCode')
    .select('language, code')
    .eq('problemId', question.id)

  if (pscList && pscList.length > 0) {
    for (const sc of pscList) {
      if (sc.language) starterCodes[sc.language] = sc.code
    }
  } else if (question.starterCodes) {
    starterCodes = question.starterCodes
  }

  const isPub = question.status === 'PUBLISHED' || (question.status !== 'DRAFT' && question.isActive)

  return sendJson(res, 200, {
    success: true,
    message: 'Question preview generated (hidden test cases protected).',
    data: {
      id: question.id,
      slug: question.slug,
      title: question.title,
      difficulty: question.difficulty,
      topic: question.subdivision || 'General',
      subdivision: question.subdivision,
      learningUnitId: question.learningUnitId || null,
      beltId: question.beltId || null,
      status: isPub ? 'PUBLISHED' : 'DRAFT',
      timeLimitMs: question.timeLimitMs || 2000,
      memoryLimitMb: question.memoryLimitMb || 256,
      description: question.description,
      inputFormat: question.inputFormat,
      outputFormat: question.outputFormat,
      constraints: question.explanation || '',
      examples,
      starterCodes,
      testCases: visibleCases,
      visibleTestCases: visibleCases,
      testCaseCount: {
        total: totalCount,
        visible: visibleCases.length,
        hidden: hiddenCount,
      },
      testCaseMeta: {
        totalCount,
        visibleCount: visibleCases.length,
        hiddenCount,
      },
    },
  })
}

async function handleCreateQuestion(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const slug = typeof body.slug === 'string' ? body.slug.trim().toLowerCase() : ''
  const difficulty = typeof body.difficulty === 'string' ? body.difficulty.trim() : 'Easy'
  const topic = typeof body.topic === 'string' ? body.topic.trim() : (typeof body.subdivision === 'string' ? body.subdivision.trim() : 'General')
  const description = typeof body.description === 'string' ? body.description.trim() : ''
  const inputFormat = typeof body.inputFormat === 'string' ? body.inputFormat.trim() : ''
  const outputFormat = typeof body.outputFormat === 'string' ? body.outputFormat.trim() : ''
  const constraints = typeof body.constraints === 'string' ? body.constraints.trim() : ''
  const status = typeof body.status === 'string' ? body.status.trim().toUpperCase() : 'PUBLISHED'
  const isActive = status !== 'DRAFT'
  const timeLimitMs = typeof body.timeLimitMs === 'number' && body.timeLimitMs > 0 ? body.timeLimitMs : 2000
  const memoryLimitMb = typeof body.memoryLimitMb === 'number' && body.memoryLimitMb > 0 ? body.memoryLimitMb : 256

  const examples = Array.isArray(body.examples) ? body.examples : []
  const testCases = Array.isArray(body.testCases) ? body.testCases : []

  // Validations:
  if (!title || title.length < 3) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Title',
      message: 'Question title must be at least 3 characters long.',
    })
  }

  if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Slug',
      message: 'Slug must contain only lowercase alphanumeric characters and hyphens (e.g. "my-two-sum").',
    })
  }

  if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Difficulty',
      message: 'Difficulty must be "Easy", "Medium", or "Hard".',
    })
  }

  if (!description) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Description',
      message: 'Problem description statement is required.',
    })
  }

  if (testCases.length === 0) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Test Cases',
      message: 'At least one test case is required to evaluate code execution.',
    })
  }

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]
    if (typeof tc.input !== 'string' || typeof tc.expectedOutput !== 'string') {
      return sendJson(res, 400, {
        success: false,
        error: 'Invalid Test Case',
        message: `Test case #${i + 1} must include both input and expectedOutput strings.`,
      })
    }
  }

  const { data: existingList } = await supabaseServer.from('Problem').select('id, slug')
  const isSlugTaken = (existingList || []).some((p: any) => p.slug === slug)
  if (isSlugTaken) {
    return sendJson(res, 409, {
      success: false,
      error: 'Slug Conflict',
      message: `A question with slug "${slug}" already exists. Please choose a unique identifier.`,
    })
  }

  const starterCodes = body.starterCodes || {
    python: '# Language: Python 3\nimport sys\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    solve()\n',
    javascript: '// Language: JavaScript (Node.js)\nconst fs = require("fs");\n\nfunction solve() {\n    const input = fs.readFileSync(0, "utf-8").trim();\n    if (!input) return;\n    // Write your solution here\n}\n\nsolve();\n',
    cpp: '// Language: C++ (g++)\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}\n',
    java: '// Language: Java (OpenJDK)\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // Write your solution here\n        scanner.close();\n    }\n}\n',
  }

  const problemId = `prob-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`

  const learningUnitId = typeof body.learningUnitId === 'string' && body.learningUnitId.trim()
    ? body.learningUnitId.trim()
    : null

  if (learningUnitId) {
    const { data: unit, error: unitErr } = await supabaseServer
      .from('LearningUnit')
      .select('id')
      .eq('id', learningUnitId)
      .maybeSingle()
    if (unitErr) throw unitErr
    if (!unit) {
      return sendJson(res, 404, {
        success: false,
        error: 'Learning Unit Not Found',
        message: `Learning Unit with ID "${learningUnitId}" does not exist.`,
      })
    }
  }

  let beltId: string | null = null
  if (learningUnitId) {
    beltId = null
  } else {
    const rawBelt = body.beltId !== undefined ? body.beltId : body.belt
    if (rawBelt !== undefined) {
      if (typeof rawBelt === 'string' && !rawBelt.trim()) {
        return sendJson(res, 400, {
          success: false,
          error: 'Missing Belt Selection',
          message: 'A valid Practice Belt selection is required.',
        })
      }
      const candidateStr = String(rawBelt).trim()
      const { data: belts, error: beltErr } = await supabaseServer
        .from('Belt')
        .select('id, order, name, title')
        .order('order', { ascending: true })
      if (beltErr) throw beltErr
      const matchedBelt = (belts || []).find((b: any) => b.id === candidateStr)
      if (!matchedBelt) {
        return sendJson(res, 400, {
          success: false,
          error: 'Invalid Belt ID',
          message: `Belt identifier "${candidateStr}" does not exist. Please select a valid Belt.`,
        })
      }
      beltId = matchedBelt.id
    } else {
      // Fallback for requests omitting beltId on practice questions
      const { data: belts, error: beltErr } = await supabaseServer
        .from('Belt')
        .select('id, order, name, title')
        .order('order', { ascending: true })
      if (beltErr) throw beltErr
      if (!belts || belts.length === 0) {
        return sendJson(res, 400, {
          success: false,
          error: 'Missing Belt Selection',
          message: 'No practice belts exist in the system.',
        })
      }
      beltId = belts[0].id
    }
  }

  const order = typeof body.order === 'number' && !isNaN(body.order) ? body.order : 1

  const legacyExamples = examples.map((ex: any, idx: number) => ({
    label: ex.label || `Example ${idx + 1}`,
    input: ex.input || '',
    output: ex.output || ex.expectedOutput || '',
    explanation: ex.explanation || '',
  }))

  const reqStatus = typeof body.status === 'string' && body.status.trim() ? body.status.trim().toUpperCase() : ''
  const finalStatus = reqStatus || (isActive ? 'PUBLISHED' : 'DRAFT')
  const approvalStatus = finalStatus === 'PUBLISHED'
    ? 'APPROVED'
    : finalStatus === 'PENDING_REVIEW'
    ? 'PENDING_REVIEW'
    : 'DRAFT'
  const isFinalActive = finalStatus === 'PUBLISHED'

  // 1. Insert Problem
  const problemRecord: Record<string, any> = {
    id: problemId,
    beltId,
    learningUnitId,
    order,
    slug,
    title,
    difficulty,
    subdivision: topic,
    description,
    inputFormat,
    outputFormat,
    explanation: constraints,
    timeLimitMs,
    memoryLimitMb,
    status: finalStatus,
    approvalStatus,
    isActive: isFinalActive,
    publishedAt: isFinalActive ? new Date().toISOString() : null,
    publishedBy: isFinalActive ? adminId : null,
    examples: legacyExamples,
    starterCodes,
    createdBy: adminId,
    updatedBy: adminId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const { data: createdProb, error: probErr } = await supabaseServer
    .from('Problem')
    .insert(problemRecord)
    .select()
    .single()

  if (probErr) throw probErr

  // 2. Insert ProblemExample
  const peRows = examples.map((ex: any, idx: number) => ({
    id: `pe-${problemId}-${idx + 1}`,
    problemId,
    input: ex.input || '',
    expectedOutput: ex.output || ex.expectedOutput || '',
    explanation: ex.explanation || null,
    displayOrder: idx + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
  if (peRows.length > 0) {
    await supabaseServer.from('ProblemExample').insert(peRows)
  }

  // 3. Insert ProblemTestCase & legacy TestCase
  const ptcRows = testCases.map((tc: any, idx: number) => ({
    id: `ptc-${problemId}-${idx + 1}`,
    problemId,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    isHidden: Boolean(tc.isHidden),
    displayOrder: tc.displayOrder || tc.testIndex || idx + 1,
    points: typeof tc.points === 'number' ? tc.points : 10,
    explanation: tc.explanation || tc.description || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
  await supabaseServer.from('ProblemTestCase').insert(ptcRows)

  const legacyTcRows = testCases.map((tc: any, idx: number) => ({
    id: `tc-${problemId}-${idx + 1}`,
    problemId,
    testIndex: tc.testIndex || tc.displayOrder || idx + 1,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    explanation: tc.explanation || tc.description || null,
    isHidden: Boolean(tc.isHidden),
  }))
  await supabaseServer.from('TestCase').insert(legacyTcRows)

  // 4. Insert ProblemStarterCode
  const pscRows = Object.entries(starterCodes).map(([lang, code]) => ({
    id: `psc-${problemId}-${lang}`,
    problemId,
    language: lang,
    code: String(code),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
  if (pscRows.length > 0) {
    await supabaseServer.from('ProblemStarterCode').insert(pscRows)
  }

  // 5. Insert initial ProblemRevision (v1)
  await supabaseServer.from('ProblemRevision').insert({
    id: `rev-${problemId}-1`,
    problemId,
    version: 1,
    snapshot: {
      problem: problemRecord,
      examples: peRows,
      testCases: ptcRows,
      starterCodes,
    },
    changedBy: adminId,
    changeSummary: 'Initial question creation',
    createdAt: new Date().toISOString(),
  })

  // 6. Register in testRepository for live execution compatibility
  registerCustomSuite(slug, {
    title,
    testCases: ptcRows.map((r: any) => ({
      testIndex: r.displayOrder,
      input: r.input,
      expectedOutput: r.expectedOutput,
      isHidden: r.isHidden,
    })),
  })

  // 7. Audit Log
  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'CREATE_QUESTION',
    'QUESTION',
    problemId,
    `${title} (${slug})`,
    { slug, difficulty, topic, status: isActive ? 'PUBLISHED' : 'DRAFT', testCaseCount: ptcRows.length },
    'SUCCESS',
    null,
    clientIp
  )

  const visibleCount = ptcRows.filter((c: any) => !c.isHidden).length
  const hiddenCount = ptcRows.filter((c: any) => c.isHidden).length

  return sendJson(res, 201, {
    success: true,
    message: `Question "${title}" created successfully.`,
    data: {
      ...createdProb,
      examples: peRows,
      testCases: ptcRows,
      testCaseCount: {
        total: ptcRows.length,
        visible: visibleCount,
        hidden: hiddenCount,
      },
      status: isActive ? 'PUBLISHED' : 'DRAFT',
    },
  })
}

async function handleUpdateQuestion(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const id = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim() ? body.slug.trim() : '')

  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'Question ID or slug is required for updates.',
    })
  }

  let existing: any = null
  const { data: byId } = await supabaseServer
    .from('Problem')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (byId) {
    existing = byId
  } else {
    const { data: bySlug } = await supabaseServer
      .from('Problem')
      .select('*')
      .eq('slug', id)
      .maybeSingle()
    if (bySlug) existing = bySlug
  }

  if (!existing) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question with identifier "${id}" was not found.`,
    })
  }

  const updates: Record<string, any> = {
    updatedBy: adminId,
    updatedAt: new Date().toISOString(),
  }

  if (typeof body.title === 'string' && body.title.trim()) updates.title = body.title.trim()
  if (typeof body.difficulty === 'string' && ['Easy', 'Medium', 'Hard'].includes(body.difficulty)) updates.difficulty = body.difficulty
  if (typeof body.topic === 'string') updates.subdivision = body.topic.trim()
  if (typeof body.description === 'string') updates.description = body.description.trim()
  if (typeof body.inputFormat === 'string') updates.inputFormat = body.inputFormat.trim()
  if (typeof body.outputFormat === 'string') updates.outputFormat = body.outputFormat.trim()
  if (typeof body.constraints === 'string') updates.explanation = body.constraints.trim()
  if (typeof body.timeLimitMs === 'number' && body.timeLimitMs > 0) updates.timeLimitMs = body.timeLimitMs
  if (typeof body.memoryLimitMb === 'number' && body.memoryLimitMb > 0) updates.memoryLimitMb = body.memoryLimitMb

  const reqStatus = typeof body.status === 'string' ? body.status.trim().toUpperCase() : ''
  if (typeof body.isActive === 'boolean' && reqStatus) {
    if (body.isActive && ['DRAFT', 'ARCHIVED', 'PENDING_REVIEW'].includes(reqStatus)) {
      return sendJson(res, 400, {
        success: false,
        error: 'Invalid Status Combination',
        message: `A question cannot be active while status is ${reqStatus}.`,
      })
    }
    if (!body.isActive && reqStatus === 'PUBLISHED') {
      return sendJson(res, 400, {
        success: false,
        error: 'Invalid Status Combination',
        message: 'A question cannot be inactive while status is PUBLISHED.',
      })
    }
  }

  if (reqStatus) {
    updates.status = reqStatus
    updates.isActive = reqStatus === 'PUBLISHED'
    if (updates.status === 'PUBLISHED') {
      updates.approvalStatus = 'APPROVED'
      updates.publishedAt = new Date().toISOString()
      updates.publishedBy = adminId
    } else if (updates.status === 'PENDING_REVIEW') {
      updates.approvalStatus = 'PENDING_REVIEW'
    } else if (updates.status === 'DRAFT') {
      updates.approvalStatus = 'DRAFT'
    }
    // If updates.status === 'ARCHIVED', do not overwrite approvalStatus (preserve history!)
  } else if (typeof body.isActive === 'boolean') {
    updates.isActive = body.isActive
    updates.status = body.isActive ? 'PUBLISHED' : 'DRAFT'
    if (updates.isActive) {
      updates.approvalStatus = 'APPROVED'
      updates.publishedAt = new Date().toISOString()
      updates.publishedBy = adminId
    } else {
      updates.approvalStatus = 'DRAFT'
    }
  } else if (body.submitForReview === true || body.approvalStatus === 'PENDING_REVIEW') {
    updates.approvalStatus = 'PENDING_REVIEW'
    if (existing.status !== 'PUBLISHED') {
      updates.status = 'PENDING_REVIEW'
      updates.isActive = false
    }
  }

  if (body.learningUnitId !== undefined) {
    if (typeof body.learningUnitId === 'string' && body.learningUnitId.trim()) {
      const lid = body.learningUnitId.trim()
      const { data: unit, error: unitErr } = await supabaseServer
        .from('LearningUnit')
        .select('id')
        .eq('id', lid)
        .maybeSingle()
      if (unitErr) throw unitErr
      if (!unit) {
        return sendJson(res, 404, {
          success: false,
          error: 'Learning Unit Not Found',
          message: `Learning Unit with ID "${lid}" does not exist.`,
        })
      }
      updates.learningUnitId = lid
    } else {
      updates.learningUnitId = null
    }
  }

  if (body.beltId !== undefined || body.belt !== undefined) {
    const rawBelt = body.beltId !== undefined ? body.beltId : body.belt
    if (rawBelt === null) {
      updates.beltId = null
    } else if (typeof rawBelt === 'string' && !rawBelt.trim()) {
      return sendJson(res, 400, {
        success: false,
        error: 'Missing Belt Selection',
        message: 'A valid Practice Belt selection is required.',
      })
    } else {
      const candidateStr = String(rawBelt).trim()
      const { data: belts, error: beltErr } = await supabaseServer
        .from('Belt')
        .select('id, order, name, title')
        .order('order', { ascending: true })
      if (beltErr) throw beltErr
      const matchedBelt = (belts || []).find((b: any) => b.id === candidateStr)
      if (!matchedBelt) {
        return sendJson(res, 400, {
          success: false,
          error: 'Invalid Belt ID',
          message: `Belt identifier "${candidateStr}" does not exist. Please select a valid Belt.`,
        })
      }
      updates.beltId = matchedBelt.id
    }
  }
  if (typeof body.order === 'number' && !isNaN(body.order)) {
    updates.order = body.order
  }

  // Synchronize Examples
  let currentExamples = existing.examples || []
  if (Array.isArray(body.examples)) {
    currentExamples = body.examples.map((ex: any, idx: number) => ({
      label: ex.label || `Example ${idx + 1}`,
      input: ex.input || '',
      output: ex.output || ex.expectedOutput || '',
      explanation: ex.explanation || '',
    }))
    updates.examples = currentExamples

    await supabaseServer.from('ProblemExample').delete().eq('problemId', existing.id)
    const peRows = body.examples.map((ex: any, idx: number) => ({
      id: `pe-${existing.id}-${idx + 1}`,
      problemId: existing.id,
      input: ex.input || '',
      expectedOutput: ex.output || ex.expectedOutput || '',
      explanation: ex.explanation || null,
      displayOrder: idx + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    if (peRows.length > 0) {
      await supabaseServer.from('ProblemExample').insert(peRows)
    }
  }

  // Synchronize Test Cases
  let currentTestCases: any[] = []
  if (Array.isArray(body.testCases) && body.testCases.length > 0) {
    await supabaseServer.from('ProblemTestCase').delete().eq('problemId', existing.id)
    await supabaseServer.from('TestCase').delete().eq('problemId', existing.id)

    const ptcRows = body.testCases.map((tc: any, idx: number) => ({
      id: `ptc-${existing.id}-${idx + 1}`,
      problemId: existing.id,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      isHidden: Boolean(tc.isHidden),
      displayOrder: tc.displayOrder || tc.testIndex || idx + 1,
      points: typeof tc.points === 'number' ? tc.points : 10,
      explanation: tc.explanation || tc.description || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    await supabaseServer.from('ProblemTestCase').insert(ptcRows)

    const legacyRows = body.testCases.map((tc: any, idx: number) => ({
      id: `tc-${existing.id}-${idx + 1}`,
      problemId: existing.id,
      testIndex: tc.testIndex || tc.displayOrder || idx + 1,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      explanation: tc.explanation || tc.description || null,
      isHidden: Boolean(tc.isHidden),
    }))
    await supabaseServer.from('TestCase').insert(legacyRows)
    currentTestCases = ptcRows

    registerCustomSuite(existing.slug, {
      title: updates.title || existing.title,
      testCases: ptcRows.map((r: any) => ({
        testIndex: r.displayOrder,
        input: r.input,
        expectedOutput: r.expectedOutput,
        isHidden: r.isHidden,
      })),
    })
  }

  // Synchronize Starter Code
  let currentStarterCodes = existing.starterCodes || {}
  if (body.starterCodes && typeof body.starterCodes === 'object') {
    currentStarterCodes = { ...body.starterCodes }
    updates.starterCodes = currentStarterCodes

    await supabaseServer.from('ProblemStarterCode').delete().eq('problemId', existing.id)
    const pscRows = Object.entries(body.starterCodes).map(([lang, code]) => ({
      id: `psc-${existing.id}-${lang}`,
      problemId: existing.id,
      language: lang,
      code: String(code),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    if (pscRows.length > 0) {
      await supabaseServer.from('ProblemStarterCode').insert(pscRows)
    }
  }

  // Update Problem row
  const { data: updated, error: updErr } = await supabaseServer
    .from('Problem')
    .update(updates)
    .eq('id', existing.id)
    .select()
    .single()

  if (updErr) throw updErr

  // Record Revision History Snapshot
  const { data: revList } = await supabaseServer
    .from('ProblemRevision')
    .select('version')
    .eq('problemId', existing.id)

  const maxVer = (revList || []).reduce((max: number, r: any) => Math.max(max, r.version || 0), 0)
  const nextVer = maxVer + 1
  const changeSummary = typeof body.changeSummary === 'string' && body.changeSummary.trim()
    ? body.changeSummary.trim()
    : 'Updated question details'

  await supabaseServer.from('ProblemRevision').insert({
    id: `rev-${existing.id}-${nextVer}`,
    problemId: existing.id,
    version: nextVer,
    snapshot: {
      problem: updated,
      examples: currentExamples,
      testCases: currentTestCases,
      starterCodes: currentStarterCodes,
    },
    changedBy: adminId,
    changeSummary,
    createdAt: new Date().toISOString(),
  })

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_QUESTION',
    'QUESTION',
    existing.id,
    `${updates.title || existing.title} (${existing.slug})`,
    { ...updates, revisionVersion: nextVer },
    'SUCCESS',
    null,
    clientIp
  )

  let finalCases = currentTestCases
  if (finalCases.length === 0) {
    const { data: dbCases } = await supabaseServer
      .from('ProblemTestCase')
      .select('*')
      .eq('problemId', existing.id)
    finalCases = dbCases || []
    if (finalCases.length === 0) {
      const { data: lCases } = await supabaseServer.from('TestCase').select('*').eq('problemId', existing.id)
      finalCases = lCases || []
    }
  }

  const visibleCount = finalCases.filter((c: any) => !c.isHidden).length
  const hiddenCount = finalCases.filter((c: any) => c.isHidden).length

  return sendJson(res, 200, {
    success: true,
    message: `Question "${updates.title || existing.title}" updated successfully.`,
    data: {
      ...updated,
      status: updated.status || (updated.isActive ? 'PUBLISHED' : 'DRAFT'),
      testCaseCount: {
        total: finalCases.length,
        visible: visibleCount,
        hidden: hiddenCount,
      },
    },
  })
}

async function handleDuplicateQuestion(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const id = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim() ? body.slug.trim() : '')

  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'Question ID or slug is required to duplicate.',
    })
  }

  const { data: allMatching, error: findErr } = await supabaseServer
    .from('Problem')
    .select('*')

  if (findErr) throw findErr

  const original = (allMatching || []).find((p: any) => p.id === id || p.slug === id)
  if (!original) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question with identifier "${id}" was not found.`,
    })
  }

  // Fetch test cases from ProblemTestCase or TestCase
  let originalCases: any[] = []
  const { data: ptcCases } = await supabaseServer
    .from('ProblemTestCase')
    .select('*')
    .eq('problemId', original.id)
    .order('displayOrder', { ascending: true })

  if (ptcCases && ptcCases.length > 0) {
    originalCases = ptcCases
  } else {
    const { data: tcCases } = await supabaseServer
      .from('TestCase')
      .select('*')
      .eq('problemId', original.id)
      .order('testIndex', { ascending: true })
    originalCases = tcCases || []
  }

  // Generate unique duplicate slug
  const baseSlug = `${original.slug}-copy`
  let duplicateSlug = baseSlug
  const isSlugTaken = (allMatching || []).some((p: any) => p.slug === duplicateSlug)
  if (isSlugTaken) {
    duplicateSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`
  }

  const newProblemId = `prob-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const newTitle = `${original.title} (Copy)`

  const clonedProbRecord = {
    id: newProblemId,
    beltId: original.beltId || null,
    learningUnitId: original.learningUnitId || null,
    order: (original.order || 0) + 1,
    slug: duplicateSlug,
    title: newTitle,
    difficulty: original.difficulty,
    subdivision: original.subdivision,
    description: original.description,
    inputFormat: original.inputFormat,
    outputFormat: original.outputFormat,
    explanation: original.explanation,
    timeLimitMs: original.timeLimitMs || 2000,
    memoryLimitMb: original.memoryLimitMb || 256,
    examples: original.examples,
    starterCodes: original.starterCodes,
    status: 'DRAFT',
    isActive: false,
    createdBy: adminId,
    updatedBy: adminId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const { data: cloned, error: cloneErr } = await supabaseServer
    .from('Problem')
    .insert(clonedProbRecord)
    .select()
    .single()

  if (cloneErr) throw cloneErr

  // Clone ProblemExample
  const { data: origExamples } = await supabaseServer
    .from('ProblemExample')
    .select('*')
    .eq('problemId', original.id)

  const examplesToClone = (origExamples && origExamples.length > 0)
    ? origExamples
    : (Array.isArray(original.examples) ? original.examples : [])

  const clonedExampleRows = examplesToClone.map((ex: any, idx: number) => ({
    id: `pe-${newProblemId}-${idx + 1}`,
    problemId: newProblemId,
    input: ex.input || '',
    expectedOutput: ex.expectedOutput || ex.output || '',
    explanation: ex.explanation || null,
    displayOrder: ex.displayOrder || idx + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
  if (clonedExampleRows.length > 0) {
    await supabaseServer.from('ProblemExample').insert(clonedExampleRows)
  }

  // Clone ProblemTestCase & TestCase
  const clonedPtc = originalCases.map((tc: any, idx: number) => ({
    id: `ptc-${newProblemId}-${idx + 1}`,
    problemId: newProblemId,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    isHidden: Boolean(tc.isHidden),
    displayOrder: tc.displayOrder || tc.testIndex || idx + 1,
    points: tc.points ?? 10,
    explanation: tc.explanation || tc.description || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))

  const clonedLegacyTc = originalCases.map((tc: any, idx: number) => ({
    id: `tc-${newProblemId}-${idx + 1}`,
    problemId: newProblemId,
    testIndex: tc.testIndex || tc.displayOrder || idx + 1,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    explanation: tc.explanation || tc.description || null,
    isHidden: Boolean(tc.isHidden),
  }))

  if (clonedPtc.length > 0) {
    await supabaseServer.from('ProblemTestCase').insert(clonedPtc)
    await supabaseServer.from('TestCase').insert(clonedLegacyTc)

    registerCustomSuite(duplicateSlug, {
      title: newTitle,
      testCases: clonedPtc.map((r: any) => ({
        testIndex: r.displayOrder,
        input: r.input,
        expectedOutput: r.expectedOutput,
        isHidden: r.isHidden,
      })),
    })
  }

  // Clone ProblemStarterCode
  if (original.starterCodes && typeof original.starterCodes === 'object') {
    const pscRows = Object.entries(original.starterCodes).map(([lang, code]) => ({
      id: `psc-${newProblemId}-${lang}`,
      problemId: newProblemId,
      language: lang,
      code: String(code),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    if (pscRows.length > 0) {
      await supabaseServer.from('ProblemStarterCode').insert(pscRows)
    }
  }

  // Revision 1 for clone
  await supabaseServer.from('ProblemRevision').insert({
    id: `rev-${newProblemId}-1`,
    problemId: newProblemId,
    version: 1,
    snapshot: {
      problem: clonedProbRecord,
      examples: clonedExampleRows,
      testCases: clonedPtc,
      starterCodes: original.starterCodes,
    },
    changedBy: adminId,
    changeSummary: `Duplicated from ${original.title}`,
    createdAt: new Date().toISOString(),
  })

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'DUPLICATE_QUESTION',
    'QUESTION',
    newProblemId,
    `${newTitle} (${duplicateSlug})`,
    { sourceId: original.id, sourceSlug: original.slug, duplicateSlug },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 201, {
    success: true,
    message: `Question duplicated as "${newTitle}".`,
    data: {
      ...cloned,
      status: 'DRAFT',
      testCases: clonedPtc,
    },
  })
}

async function handleToggleQuestionStatus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const id = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim() ? body.slug.trim() : '')
  const requestedStatus = typeof body.status === 'string' ? body.status.trim().toUpperCase() : ''

  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'Question ID or slug is required.',
    })
  }

  const existing = await findQuestionByIdOrSlug(id)

  if (!existing) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question with identifier "${id}" was not found.`,
    })
  }

  if (typeof body.isActive === 'boolean' && requestedStatus) {
    if (body.isActive && ['DRAFT', 'ARCHIVED', 'PENDING_REVIEW'].includes(requestedStatus)) {
      return sendJson(res, 400, {
        success: false,
        error: 'Invalid Status Combination',
        message: `A question cannot be active while status is ${requestedStatus}.`,
      })
    }
    if (!body.isActive && requestedStatus === 'PUBLISHED') {
      return sendJson(res, 400, {
        success: false,
        error: 'Invalid Status Combination',
        message: 'A question cannot be inactive while status is PUBLISHED.',
      })
    }
  }

  let nextIsActive: boolean
  let nextStatus: string
  if (typeof body.isActive === 'boolean') {
    nextIsActive = body.isActive
    if (requestedStatus) {
      nextStatus = requestedStatus
    } else {
      nextStatus = nextIsActive ? 'PUBLISHED' : 'DRAFT'
    }
  } else if (requestedStatus) {
    nextIsActive = requestedStatus === 'PUBLISHED'
    nextStatus = requestedStatus
  } else {
    nextIsActive = !existing.isActive
    nextStatus = nextIsActive ? 'PUBLISHED' : 'DRAFT'
  }

  const now = new Date().toISOString()
  const approvalStatus = nextIsActive
    ? 'APPROVED'
    : nextStatus === 'ARCHIVED'
    ? (existing.approvalStatus || 'DRAFT')
    : nextStatus === 'PENDING_REVIEW'
    ? 'PENDING_REVIEW'
    : 'DRAFT'

  const updatePayload: Record<string, any> = {
    isActive: nextIsActive,
    status: nextStatus,
    approvalStatus,
    updatedBy: adminId,
    updatedAt: now,
  }
  if (nextIsActive) {
    updatePayload.publishedAt = now
    updatePayload.publishedBy = adminId
  }

  const { data: updated, error: updErr } = await supabaseServer
    .from('Problem')
    .update(updatePayload)
    .eq('id', existing.id)
    .select()
    .single()

  if (updErr) throw updErr

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'TOGGLE_QUESTION_STATUS',
    'QUESTION',
    existing.id,
    `${existing.title} (${existing.slug})`,
    { previousStatus: existing.status || (existing.isActive ? 'PUBLISHED' : 'DRAFT'), newStatus: nextStatus },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Question "${existing.title}" is now ${nextStatus}.`,
    data: {
      ...updated,
      status: nextStatus,
      isActive: nextIsActive,
      approvalStatus,
    },
  })
}

async function handleRestoreQuestion(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const id = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim() ? body.slug.trim() : '')

  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'Question ID or slug is required.',
    })
  }

  const existing = await findQuestionByIdOrSlug(id)

  if (!existing) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question with identifier "${id}" was not found.`,
    })
  }

  const currentStatus = String(existing.status || '').toUpperCase()
  if (currentStatus !== 'ARCHIVED') {
    return sendJson(res, 409, {
      success: false,
      error: 'Conflict',
      message: 'Only archived questions can be restored to draft.',
    })
  }

  const now = new Date().toISOString()
  const { data: updated, error: updErr } = await supabaseServer
    .from('Problem')
    .update({
      isActive: false,
      status: 'DRAFT',
      approvalStatus: 'DRAFT',
      updatedBy: adminId,
      updatedAt: now,
    })
    .eq('id', existing.id)
    .select()
    .single()

  if (updErr) throw updErr

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'RESTORE_QUESTION',
    'QUESTION',
    existing.id,
    `${existing.title} (${existing.slug})`,
    { previousStatus: existing.status || (existing.isActive ? 'PUBLISHED' : 'DRAFT'), newStatus: 'DRAFT' },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Question "${existing.title}" has been restored to draft.`,
    data: {
      ...updated,
      status: 'DRAFT',
      isActive: false,
      approvalStatus: 'DRAFT',
    },
  })
}

async function handleDeleteQuestion(
  body: Record<string, unknown>,
  req: IncomingMessage,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const urlObj = new URL(req.url || '/', 'http://localhost')
  const id = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim()
      ? body.slug.trim()
      : (urlObj.searchParams.get('id') || urlObj.searchParams.get('slug') || '').trim())

  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'Question ID or slug is required for deletion.',
    })
  }

  const { data: allMatching, error: findErr } = await supabaseServer
    .from('Problem')
    .select('id, slug, title')

  if (findErr) throw findErr

  const existing = (allMatching || []).find((p: any) => p.id === id || p.slug === id)
  if (!existing) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question with identifier "${id}" was not found.`,
    })
  }

  // Delete child rows from all tables
  await supabaseServer.from('TestCase').delete().eq('problemId', existing.id)
  await supabaseServer.from('ProblemTestCase').delete().eq('problemId', existing.id)
  await supabaseServer.from('ProblemExample').delete().eq('problemId', existing.id)
  await supabaseServer.from('ProblemStarterCode').delete().eq('problemId', existing.id)
  await supabaseServer.from('ProblemRevision').delete().eq('problemId', existing.id)

  // Delete problem
  const { error: delErr } = await supabaseServer.from('Problem').delete().eq('id', existing.id)
  if (delErr) throw delErr

  // Unregister from testRepository
  unregisterCustomSuite(existing.slug)

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'DELETE_QUESTION',
    'QUESTION',
    existing.id,
    `${existing.title} (${existing.slug})`,
    { deletedId: existing.id, deletedSlug: existing.slug },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Question "${existing.title}" (${existing.slug}) deleted successfully.`,
    data: { id: existing.id, deletedId: existing.id, slug: existing.slug, title: existing.title },
  })
}

async function handleRunQuestionTests(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const code = typeof body.code === 'string' ? body.code : ''
  if (!code.trim()) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Code',
      message: 'Source code is required for execution.',
    })
  }
  if (code.length > 65536) {
    return sendJson(res, 400, {
      success: false,
      error: 'Payload Too Large',
      message: 'Submitted code exceeds the maximum allowed limit of 64KB.',
    })
  }

  const rawLanguage = typeof body.language === 'string' ? body.language : 'python'
  const normLang = normalizeLanguage(rawLanguage)
  if (!normLang) {
    return sendJson(res, 400, {
      success: false,
      error: 'Unsupported Language',
      message: `Unsupported language "${rawLanguage}". Supported: Python, JavaScript, Java, C++.`,
    })
  }

  const filter = typeof body.filter === 'string' ? body.filter.toLowerCase() : 'all'

  // Resolve test cases either from body.testCases or from database by id/slug
  let rawCases: Array<{
    id?: string
    testIndex?: number
    input: string
    expectedOutput: string
    isHidden?: boolean
    description?: string
  }> = []

  if (Array.isArray(body.testCases) && body.testCases.length > 0) {
    rawCases = body.testCases.map((tc: any, idx: number) => ({
      testIndex: typeof tc.displayOrder === 'number' ? tc.displayOrder : (typeof tc.testIndex === 'number' ? tc.testIndex : idx + 1),
      input: String(tc.input ?? ''),
      expectedOutput: String(tc.expectedOutput ?? ''),
      isHidden: Boolean(tc.isHidden),
      description: typeof tc.description === 'string' ? tc.description : (tc.explanation || ''),
    }))
  } else {
    const idOrSlug = typeof body.id === 'string' && body.id.trim()
      ? body.id.trim()
      : (typeof body.slug === 'string' && body.slug.trim()
        ? body.slug.trim()
        : (typeof body.idOrSlug === 'string' && body.idOrSlug.trim() ? body.idOrSlug.trim() : ''))

    if (!idOrSlug) {
      return sendJson(res, 400, {
        success: false,
        error: 'Missing Test Cases',
        message: 'Either testCases array or a question ID/slug is required.',
      })
    }

    const { data: allMatching, error: pErr } = await supabaseServer.from('Problem').select('id, slug, title')
    if (pErr) throw pErr
    const found = (allMatching || []).find((p: any) => p.id === idOrSlug || p.slug === idOrSlug)
    if (!found) {
      return sendJson(res, 404, {
        success: false,
        error: 'Question Not Found',
        message: `Question "${idOrSlug}" was not found.`,
      })
    }

    // Try ProblemTestCase first, fallback to TestCase
    let dbCases: any[] | null = null
    const { data: ptcCases } = await supabaseServer
      .from('ProblemTestCase')
      .select('*')
      .eq('problemId', found.id)
      .order('displayOrder', { ascending: true })

    if (ptcCases && ptcCases.length > 0) {
      dbCases = ptcCases.map((tc: any, idx: number) => ({
        id: tc.id,
        testIndex: tc.displayOrder ?? idx + 1,
        input: tc.input || '',
        expectedOutput: tc.expectedOutput || '',
        isHidden: Boolean(tc.isHidden),
        description: tc.explanation || '',
      }))
    } else {
      const { data: legacyCases } = await supabaseServer
        .from('TestCase')
        .select('*')
        .eq('problemId', found.id)
        .order('testIndex', { ascending: true })

      dbCases = (legacyCases || []).map((tc: any, idx: number) => ({
        id: tc.id,
        testIndex: tc.testIndex ?? idx + 1,
        input: tc.input || '',
        expectedOutput: tc.expectedOutput || '',
        isHidden: Boolean(tc.isHidden),
        description: tc.description || tc.explanation || '',
      }))
    }

    rawCases = dbCases || []
  }

  if (rawCases.length === 0) {
    return sendJson(res, 400, {
      success: false,
      error: 'No Test Cases',
      message: 'No test cases available to execute.',
    })
  }

  // Apply filter: 'all' | 'public' | 'hidden'
  let casesToRun = rawCases
  if (filter === 'public') {
    casesToRun = rawCases.filter((tc) => !tc.isHidden)
  } else if (filter === 'hidden') {
    casesToRun = rawCases.filter((tc) => tc.isHidden)
  }

  if (casesToRun.length === 0) {
    return sendJson(res, 400, {
      success: false,
      error: 'Empty Filter Selection',
      message: `No test cases found for filter "${filter}". Total cases available: ${rawCases.length} (${rawCases.filter((t) => !t.isHidden).length} public, ${rawCases.filter((t) => t.isHidden).length} hidden).`,
    })
  }

  const engine = selectEngine(normLang)
  const started = performance.now()
  const outcome = await engine.run({
    code,
    language: normLang,
    inputs: casesToRun.map((tc) => tc.input),
  })

  const overallTimeMs = Math.round(performance.now() - started)

  if (outcome.kind === 'unavailable') {
    return sendJson(res, 503, {
      success: false,
      error: 'Execution Unavailable',
      message: outcome.message || 'Judge engine is temporarily unavailable.',
    })
  }

  if (outcome.kind === 'compile_error') {
    return sendJson(res, 200, {
      success: false,
      error: 'Compilation Error',
      message: outcome.error,
      data: {
        status: 'COMPILATION_ERROR',
        engine: engine.name,
        overallTimeMs,
        passedCount: 0,
        totalCount: casesToRun.length,
        allPassed: false,
        compilationError: outcome.error,
        results: casesToRun.map((tc, idx) => ({
          testIndex: tc.testIndex ?? idx + 1,
          isHidden: Boolean(tc.isHidden),
          description: tc.description || (tc.isHidden ? 'Hidden validation test' : 'Public sample test'),
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: '',
          executionTimeMs: 0,
          status: 'runtime_error',
          passed: false,
          error: outcome.error,
        })),
      },
    })
  }

  const results = casesToRun.map((tc, idx) => {
    const r = outcome.cases[idx] || { output: '', kind: 'runtime_error', ms: 0, error: 'No response' }
    let caseStatus: 'passed' | 'failed' | 'runtime_error' | 'time_limit_exceeded' = 'passed'
    const matches = outputsMatch(r.output, tc.expectedOutput)

    if (r.kind === 'timeout') {
      caseStatus = 'time_limit_exceeded'
    } else if (r.kind === 'runtime_error' || r.kind === 'memory') {
      caseStatus = 'runtime_error'
    } else {
      caseStatus = matches ? 'passed' : 'failed'
    }

    return {
      testIndex: tc.testIndex ?? idx + 1,
      isHidden: Boolean(tc.isHidden),
      description: tc.description || (tc.isHidden ? 'Hidden validation test' : 'Public sample test'),
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: r.output || '',
      executionTimeMs: r.ms,
      status: caseStatus,
      passed: caseStatus === 'passed',
      error: r.error || null,
    }
  })

  const passedCount = results.filter((r) => r.passed).length
  const allPassed = passedCount === results.length
  let overallStatus: string = 'ACCEPTED'
  if (!allPassed) {
    if (results.some((r) => r.status === 'time_limit_exceeded')) overallStatus = 'TIME_LIMIT_EXCEEDED'
    else if (results.some((r) => r.status === 'runtime_error')) overallStatus = 'RUNTIME_ERROR'
    else overallStatus = 'WRONG_ANSWER'
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'RUN_QUESTION_TESTS',
    'QUESTION',
    (body.id || body.slug || 'custom') as string,
    `Admin test runner executed ${results.length} tests (${normLang})`,
    {
      filter,
      totalExecuted: results.length,
      passedCount,
      allPassed,
      overallStatus,
      engine: engine.name,
    },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Admin Test Runner: ${passedCount} / ${results.length} tests passed (${normLang}, ${overallTimeMs}ms).`,
    data: {
      status: overallStatus,
      engine: engine.name,
      overallTimeMs,
      passedCount,
      totalCount: results.length,
      allPassed,
      results,
    },
  })
}

async function handleListQuestionRevisions(
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  const urlObj = new URL(req.url || '/', 'http://localhost')
  const idOrSlug = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.problemId === 'string' && body.problemId.trim()
      ? body.problemId.trim()
      : (typeof body.slug === 'string' && body.slug.trim()
        ? body.slug.trim()
        : (urlObj.searchParams.get('id') || urlObj.searchParams.get('problemId') || urlObj.searchParams.get('slug') || '').trim()))

  if (!idOrSlug) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'Question ID or slug is required to list revisions.',
    })
  }

  const question = await findQuestionByIdOrSlug(idOrSlug)
  if (!question) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question "${idOrSlug}" was not found.`,
    })
  }

  const { data: revisions, error: revErr } = await supabaseServer
    .from('ProblemRevision')
    .select('id, problemId, version, changeSummary, changedBy, createdAt, snapshot')
    .eq('problemId', question.id)
    .order('version', { ascending: false })

  if (revErr) throw revErr

  return sendJson(res, 200, {
    success: true,
    message: `Found ${(revisions || []).length} revisions for "${question.title}".`,
    data: revisions || [],
  })
}

async function handleRestoreQuestionRevision(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const problemId = typeof body.problemId === 'string' && body.problemId.trim()
    ? body.problemId.trim()
    : (typeof body.id === 'string' && body.id.trim() ? body.id.trim() : '')

  const revisionId = typeof body.revisionId === 'string' && body.revisionId.trim()
    ? body.revisionId.trim()
    : (typeof body.version === 'number' ? String(body.version) : '')

  if (!problemId || !revisionId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Parameters',
      message: 'Both problemId and revisionId (or version) are required to restore a revision.',
    })
  }

  const question = await findQuestionByIdOrSlug(problemId)
  if (!question) {
    return sendJson(res, 404, {
      success: false,
      error: 'Question Not Found',
      message: `Question "${problemId}" was not found.`,
    })
  }

  // Load all revisions for question
  const { data: revList, error: revListErr } = await supabaseServer
    .from('ProblemRevision')
    .select('*')
    .eq('problemId', question.id)

  if (revListErr) throw revListErr

  const targetRevision = (revList || []).find(
    (r: any) => r.id === revisionId || String(r.version) === revisionId
  )

  if (!targetRevision) {
    return sendJson(res, 404, {
      success: false,
      error: 'Revision Not Found',
      message: `Revision "${revisionId}" does not exist for question "${question.title}".`,
    })
  }

  const snapshot = targetRevision.snapshot || {}
  const snapProb = snapshot.problem || {}
  const snapExamples = Array.isArray(snapshot.examples) ? snapshot.examples : []
  const snapCases = Array.isArray(snapshot.testCases) ? snapshot.testCases : []
  const snapStarterCodes = snapshot.starterCodes || {}

  // 1. Restore Problem row
  const restoredUpdates: Record<string, any> = {
    title: snapProb.title || question.title,
    difficulty: snapProb.difficulty || question.difficulty,
    subdivision: snapProb.subdivision || question.subdivision,
    description: snapProb.description || question.description,
    inputFormat: snapProb.inputFormat || question.inputFormat,
    outputFormat: snapProb.outputFormat || question.outputFormat,
    explanation: snapProb.explanation || question.explanation,
    timeLimitMs: snapProb.timeLimitMs || question.timeLimitMs || 2000,
    memoryLimitMb: snapProb.memoryLimitMb || question.memoryLimitMb || 256,
    examples: snapProb.examples || question.examples,
    starterCodes: snapStarterCodes,
    updatedBy: adminId,
    updatedAt: new Date().toISOString(),
  }

  const { data: updatedProb, error: probUpdErr } = await supabaseServer
    .from('Problem')
    .update(restoredUpdates)
    .eq('id', question.id)
    .select()
    .single()

  if (probUpdErr) throw probUpdErr

  // 2. Restore Examples
  await supabaseServer.from('ProblemExample').delete().eq('problemId', question.id)
  const peRows = snapExamples.map((ex: any, idx: number) => ({
    id: `pe-${question.id}-${idx + 1}`,
    problemId: question.id,
    input: ex.input || '',
    expectedOutput: ex.expectedOutput || ex.output || '',
    explanation: ex.explanation || null,
    displayOrder: ex.displayOrder || idx + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
  if (peRows.length > 0) {
    await supabaseServer.from('ProblemExample').insert(peRows)
  }

  // 3. Restore Test Cases
  await supabaseServer.from('ProblemTestCase').delete().eq('problemId', question.id)
  await supabaseServer.from('TestCase').delete().eq('problemId', question.id)

  const ptcRows = snapCases.map((tc: any, idx: number) => ({
    id: `ptc-${question.id}-${idx + 1}`,
    problemId: question.id,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    isHidden: Boolean(tc.isHidden),
    displayOrder: tc.displayOrder || tc.testIndex || idx + 1,
    points: tc.points ?? 10,
    explanation: tc.explanation || tc.description || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
  await supabaseServer.from('ProblemTestCase').insert(ptcRows)

  const legacyTcRows = snapCases.map((tc: any, idx: number) => ({
    id: `tc-${question.id}-${idx + 1}`,
    problemId: question.id,
    testIndex: tc.testIndex || tc.displayOrder || idx + 1,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    explanation: tc.explanation || tc.description || null,
    isHidden: Boolean(tc.isHidden),
  }))
  await supabaseServer.from('TestCase').insert(legacyTcRows)

  registerCustomSuite(question.slug, {
    title: restoredUpdates.title,
    testCases: ptcRows.map((r: any) => ({
      testIndex: r.displayOrder,
      input: r.input,
      expectedOutput: r.expectedOutput,
      isHidden: r.isHidden,
    })),
  })

  // 4. Restore Starter Code
  await supabaseServer.from('ProblemStarterCode').delete().eq('problemId', question.id)
  const pscRows = Object.entries(snapStarterCodes).map(([lang, code]) => ({
    id: `psc-${question.id}-${lang}`,
    problemId: question.id,
    language: lang,
    code: String(code),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
  if (pscRows.length > 0) {
    await supabaseServer.from('ProblemStarterCode').insert(pscRows)
  }

  // 5. Insert new restoration revision
  const maxVer = (revList || []).reduce((max: number, r: any) => Math.max(max, r.version || 0), 0)
  const nextVer = maxVer + 1

  await supabaseServer.from('ProblemRevision').insert({
    id: `rev-${question.id}-${nextVer}`,
    problemId: question.id,
    version: nextVer,
    snapshot: {
      problem: updatedProb,
      examples: peRows,
      testCases: ptcRows,
      starterCodes: snapStarterCodes,
    },
    changedBy: adminId,
    changeSummary: `Restored from revision v${targetRevision.version}`,
    createdAt: new Date().toISOString(),
  })

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'RESTORE_QUESTION_REVISION',
    'QUESTION',
    question.id,
    `${question.title} restored to v${targetRevision.version}`,
    { restoredFromVersion: targetRevision.version, newVersion: nextVer },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Question "${question.title}" successfully restored from revision v${targetRevision.version}.`,
    data: {
      ...updatedProb,
      examples: peRows,
      testCases: ptcRows,
      starterCodes: snapStarterCodes,
      restoredFromVersion: targetRevision.version,
      currentVersion: nextVer,
    },
  })
}

// ─── 9. Curriculum (Courses) Management Handlers ─────────────────────────────

async function handleListCurriculumModules(
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  const urlObj = new URL(req.url || '/', 'http://localhost')
  const search = typeof body.search === 'string' ? body.search.trim().toLowerCase() : (urlObj.searchParams.get('search') || '').trim().toLowerCase()

  const [modulesRes, unitsRes] = await Promise.all([
    supabaseServer.from('Module').select('*').order('order', { ascending: true }),
    supabaseServer.from('LearningUnit').select('*').order('order', { ascending: true }),
  ])

  // 1. Check errors explicitly. Never swallow database errors or convert them to mock data!
  if (modulesRes.error) {
    console.error('[curriculum] Supabase Module query error:', modulesRes.error)
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to load curriculum modules from database: ${modulesRes.error.message || 'Database query error.'}`,
    })
  }

  if (unitsRes.error) {
    console.error('[curriculum] Supabase LearningUnit query error:', unitsRes.error)
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to load learning units from database: ${unitsRes.error.message || 'Database query error.'}`,
    })
  }

  const rawModules = modulesRes.data || []
  const rawUnits = (unitsRes.data || []).map((unit: any) => ({ ...unit, concept: unit.concept ?? unit.content }))

  // 2. If database Module table is genuinely empty, return an honest empty state (zero mock fallbacks)
  if (rawModules.length === 0) {
    return sendJson(res, 200, {
      success: true,
      message: 'Curriculum modules retrieved successfully (0 modules in database).',
      data: {
        modules: [],
        stats: {
          totalModules: 0,
          totalLearningUnits: 0,
          publishedModules: 0,
          draftModules: 0,
          publishedUnits: 0,
          draftUnits: 0,
        },
      },
    })
  }

  // Group units by moduleId
  const unitsByModuleId = new Map<string, any[]>()
  for (const u of rawUnits) {
    if (!unitsByModuleId.has(u.moduleId)) {
      unitsByModuleId.set(u.moduleId, [])
    }
    unitsByModuleId.get(u.moduleId)!.push(u)
  }

  let totalPublishedModules = 0
  let totalDraftModules = 0
  let totalPublishedUnits = 0
  let totalDraftUnits = 0

  const modules = rawModules.map((m: any) => {
    const isModActive = m.isActive !== false && m.status !== 'DRAFT'
    if (isModActive) totalPublishedModules++
    else totalDraftModules++

    let mUnits = unitsByModuleId.get(m.id) || []
    mUnits.sort((a, b) => (a.order || 0) - (b.order || 0))

    for (const u of mUnits) {
      if (u.isActive !== false && u.status !== 'DRAFT') totalPublishedUnits++
      else totalDraftUnits++
    }

    if (search) {
      mUnits = mUnits.filter((u: any) =>
        (u.title || '').toLowerCase().includes(search) ||
        (u.concept || '').toLowerCase().includes(search) ||
        (u.content || '').toLowerCase().includes(search)
      )
    }

    return {
      id: m.id,
      order: m.order,
      title: m.title,
      description: m.description || '',
      isActive: isModActive,
      status: isModActive ? 'PUBLISHED' : 'DRAFT',
      learningUnitsCount: (unitsByModuleId.get(m.id) || []).length,
      learningUnits: mUnits,
    }
  })

  // Sort modules by order
  modules.sort((a, b) => a.order - b.order)

  return sendJson(res, 200, {
    success: true,
    message: 'Curriculum modules retrieved successfully.',
    data: {
      modules,
      stats: {
        totalModules: rawModules.length,
        totalLearningUnits: rawUnits.length,
        publishedModules: totalPublishedModules,
        draftModules: totalDraftModules,
        publishedUnits: totalPublishedUnits,
        draftUnits: totalDraftUnits,
      },
    },
  })
}

function assertPrivilegedDatabaseAccess(res: ServerResponse): boolean {
  const configErr = getPrivilegedServerKeyError()
  if (configErr) {
    sendJson(res, 503, {
      success: false,
      error: 'Server Misconfigured',
      message: configErr,
    })
    return false
  }
  return true
}

async function handleCreateCurriculumModule(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''
  const order = typeof body.order === 'number' ? body.order : null

  if (!title) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Module Title',
      message: 'Module title is required.',
    })
  }

  const { data: existingModules, error: listErr } = await supabaseServer.from('Module').select('order')
  if (listErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to inspect existing modules: ${listErr.message}`,
    })
  }

  const nextOrder = order ?? ((existingModules || []).reduce((max: number, m: any) => Math.max(max, m.order || 0), 0) + 1)
  const newModuleId = `mod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`

  const { data: created, error: createErr } = await supabaseServer
    .from('Module')
    .insert({
      id: newModuleId,
      title,
      description,
      order: nextOrder,
      isActive: true,
      status: 'PUBLISHED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single()

  if (createErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to create module in database: ${createErr.message}`,
    })
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'CREATE_CURRICULUM_MODULE',
    'CURRICULUM',
    newModuleId,
    title,
    { title, order: nextOrder, description },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 201, {
    success: true,
    message: `Module "${title}" created successfully.`,
    data: { ...created, learningUnits: [] },
  })
}

async function handleUpdateCurriculumModule(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Module ID',
      message: 'Module ID is required for update.',
    })
  }

  if (id.startsWith('mock-')) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Demonstration or mock items cannot be updated in the database. Please create a database-backed module first.',
    })
  }

  const updates: Record<string, any> = { updatedAt: new Date().toISOString() }
  if (typeof body.title === 'string' && body.title.trim()) updates.title = body.title.trim()
  if (typeof body.description === 'string') updates.description = body.description.trim()
  if (typeof body.order === 'number') updates.order = body.order
  if (typeof body.isActive === 'boolean') updates.isActive = body.isActive
  if (typeof body.status === 'string') updates.status = body.status.toUpperCase()

  const { data: updated, error: updErr } = await supabaseServer
    .from('Module')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (updErr) {
    if (updErr.code === 'PGRST116') {
      return sendJson(res, 404, {
        success: false,
        error: 'Not Found',
        message: `Module with ID "${id}" was not found in the database.`,
      })
    }
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to update module: ${updErr.message || 'Database error.'}`,
    })
  }

  if (!updated) {
    return sendJson(res, 404, {
      success: false,
      error: 'Not Found',
      message: `Module with ID "${id}" was not found in the database.`,
    })
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_CURRICULUM_MODULE',
    'CURRICULUM',
    id,
    updates.title || id,
    updates,
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Module updated successfully.`,
    data: updated,
  })
}

async function handleDeleteCurriculumModule(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Module ID',
      message: 'Module ID is required for deletion.',
    })
  }

  if (id.startsWith('mock-')) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Demonstration or mock items cannot be deleted from the database.',
    })
  }

  // Check if module exists
  const { data: existingModule, error: findErr } = await supabaseServer
    .from('Module')
    .select('id, title')
    .eq('id', id)
    .maybeSingle()

  if (findErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to verify module existence: ${findErr.message}`,
    })
  }
  if (!existingModule) {
    return sendJson(res, 404, {
      success: false,
      error: 'Not Found',
      message: `Module with ID "${id}" does not exist in the database.`,
    })
  }

  // Cascade delete learning units
  const { error: luDelErr } = await supabaseServer.from('LearningUnit').delete().eq('moduleId', id)
  if (luDelErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to delete associated learning units: ${luDelErr.message}`,
    })
  }

  // Delete module
  const { error: delErr } = await supabaseServer.from('Module').delete().eq('id', id)
  if (delErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to delete module: ${delErr.message}`,
    })
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'DELETE_CURRICULUM_MODULE',
    'CURRICULUM',
    id,
    `Module ${id}`,
    { deletedId: id },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Module and associated learning units deleted successfully.',
    data: { id },
  })
}

async function handleReorderCurriculumModules(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const moduleOrders = Array.isArray(body.moduleOrders) ? body.moduleOrders : []
  if (moduleOrders.length === 0) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Orders',
      message: 'moduleOrders array is required.',
    })
  }

  if (moduleOrders.some((item) => typeof item.id === 'string' && item.id.startsWith('mock-'))) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Demonstration or mock items cannot be reordered in the database.',
    })
  }

  for (const item of moduleOrders) {
    if (item.id && typeof item.order === 'number') {
      const { error: reorderErr } = await supabaseServer.from('Module').update({ order: item.order }).eq('id', item.id)
      if (reorderErr) {
        return sendJson(res, 500, {
          success: false,
          error: 'Database Error',
          message: `Failed to update module order: ${reorderErr.message}`,
        })
      }
    }
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'REORDER_CURRICULUM_MODULES',
    'CURRICULUM',
    'bulk',
    `Reordered ${moduleOrders.length} modules`,
    { moduleOrders },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Modules reordered successfully.',
  })
}

async function handleCreateLearningUnit(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const moduleId = typeof body.moduleId === 'string' ? body.moduleId.trim() : ''
  const title = typeof body.title === 'string' ? body.title.trim() : ''

  if (!moduleId || !title) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Fields',
      message: 'Module ID and unit title are required.',
    })
  }

  if (moduleId.startsWith('mock-')) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Cannot add learning units to mock demonstration modules. Please create a database-backed module first.',
    })
  }

  const { data: targetModule, error: modErr } = await supabaseServer
    .from('Module')
    .select('id')
    .eq('id', moduleId)
    .maybeSingle()

  if (modErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to verify target module: ${modErr.message}`,
    })
  }
  if (!targetModule) {
    return sendJson(res, 404, {
      success: false,
      error: 'Not Found',
      message: `Target module with ID "${moduleId}" does not exist in the database.`,
    })
  }

  const { data: existingUnits } = await supabaseServer.from('LearningUnit').select('order').eq('moduleId', moduleId)
  const nextOrder = typeof body.order === 'number'
    ? body.order
    : ((existingUnits || []).reduce((max: number, u: any) => Math.max(max, u.order || 0), 0) + 1)

  const newUnitId = `unit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`

  const newUnit = {
    id: newUnitId,
    moduleId,
    order: nextOrder,
    title,
    // The database stores the lesson theory in "content"; the UI labels it "concept".
    content: typeof body.content === 'string' ? body.content : (typeof body.concept === 'string' ? body.concept : ''),
    approach: typeof body.approach === 'string' ? body.approach : '',
    codeSnippets: body.codeSnippets || {},
    codingQuestion: typeof body.codingQuestion === 'string' ? body.codingQuestion : '',
    inputFormat: typeof body.inputFormat === 'string' ? body.inputFormat : '',
    outputFormat: typeof body.outputFormat === 'string' ? body.outputFormat : '',
    examples: Array.isArray(body.examples) ? body.examples : [],
    readingTimeMinutes: typeof body.readingTimeMinutes === 'number' ? body.readingTimeMinutes : 2,
    isActive: true,
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const { data: created, error: createErr } = await supabaseServer
    .from('LearningUnit')
    .insert(newUnit)
    .select()
    .single()

  if (createErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to create learning unit in database: ${createErr.message}`,
    })
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'CREATE_LEARNING_UNIT',
    'CURRICULUM',
    newUnitId,
    title,
    { moduleId, title, order: nextOrder },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 201, {
    success: true,
    message: `Learning unit "${title}" created successfully.`,
    data: created,
  })
}

async function handleUpdateLearningUnit(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Unit ID',
      message: 'Learning Unit ID is required.',
    })
  }

  if (id.startsWith('mock-')) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Demonstration or mock items cannot be updated in the database. Please create a database-backed unit first.',
    })
  }

  const updates: Record<string, any> = { updatedAt: new Date().toISOString() }
  if (typeof body.title === 'string' && body.title.trim()) updates.title = body.title.trim()
  // "concept" is a UI alias for the existing database "content" column.
  if (typeof body.content === 'string') updates.content = body.content
  else if (typeof body.concept === 'string') updates.content = body.concept
  if (typeof body.approach === 'string') updates.approach = body.approach
  if (body.codeSnippets !== undefined) updates.codeSnippets = body.codeSnippets
  if (typeof body.codingQuestion === 'string') updates.codingQuestion = body.codingQuestion
  if (typeof body.inputFormat === 'string') updates.inputFormat = body.inputFormat
  if (typeof body.outputFormat === 'string') updates.outputFormat = body.outputFormat
  if (Array.isArray(body.examples)) updates.examples = body.examples
  if (typeof body.readingTimeMinutes === 'number') updates.readingTimeMinutes = body.readingTimeMinutes
  if (typeof body.order === 'number') updates.order = body.order
  if (typeof body.isActive === 'boolean') updates.isActive = body.isActive
  if (typeof body.status === 'string') updates.status = body.status.toUpperCase()

  const { data: updated, error: updErr } = await supabaseServer
    .from('LearningUnit')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (updErr) {
    if (updErr.code === 'PGRST116') {
      return sendJson(res, 404, {
        success: false,
        error: 'Not Found',
        message: `Learning unit with ID "${id}" was not found in the database.`,
      })
    }
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to update learning unit: ${updErr.message || 'Database error.'}`,
    })
  }

  if (!updated) {
    return sendJson(res, 404, {
      success: false,
      error: 'Not Found',
      message: `Learning unit with ID "${id}" was not found in the database.`,
    })
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_LEARNING_UNIT',
    'CURRICULUM',
    id,
    updates.title || id,
    updates,
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Learning unit updated successfully.',
    data: updated,
  })
}

async function handleDeleteLearningUnit(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Unit ID',
      message: 'Learning Unit ID is required.',
    })
  }

  if (id.startsWith('mock-')) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Demonstration or mock items cannot be deleted from the database.',
    })
  }

  const { data: existing, error: findErr } = await supabaseServer
    .from('LearningUnit')
    .select('id, title')
    .eq('id', id)
    .maybeSingle()

  if (findErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to verify unit existence: ${findErr.message}`,
    })
  }
  if (!existing) {
    return sendJson(res, 404, {
      success: false,
      error: 'Not Found',
      message: `Learning unit with ID "${id}" was not found in the database.`,
    })
  }

  const { error: delErr } = await supabaseServer.from('LearningUnit').delete().eq('id', id)
  if (delErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to delete learning unit: ${delErr.message}`,
    })
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'DELETE_LEARNING_UNIT',
    'CURRICULUM',
    id,
    `Unit ${id}`,
    { deletedId: id },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Learning unit deleted successfully.',
    data: { id },
  })
}

async function handleReorderLearningUnits(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const unitOrders = Array.isArray(body.unitOrders) ? body.unitOrders : []
  if (unitOrders.length === 0) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Orders',
      message: 'unitOrders array is required.',
    })
  }

  if (unitOrders.some((item) => typeof item.id === 'string' && item.id.startsWith('mock-'))) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Demonstration or mock items cannot be reordered in the database.',
    })
  }

  for (const item of unitOrders) {
    if (item.id && typeof item.order === 'number') {
      const { error: reorderErr } = await supabaseServer.from('LearningUnit').update({ order: item.order }).eq('id', item.id)
      if (reorderErr) {
        return sendJson(res, 500, {
          success: false,
          error: 'Database Error',
          message: `Failed to update learning unit order: ${reorderErr.message}`,
        })
      }
    }
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'REORDER_LEARNING_UNITS',
    'CURRICULUM',
    'bulk',
    `Reordered ${unitOrders.length} learning units`,
    { unitOrders },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Learning units reordered successfully.',
  })
}

async function handleToggleModuleStatus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Module ID',
      message: 'Module ID is required.',
    })
  }

  if (id.startsWith('mock-')) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Demonstration or mock items cannot be toggled in the database.',
    })
  }

  const { data: existing, error: findErr } = await supabaseServer.from('Module').select('*').eq('id', id).maybeSingle()
  if (findErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to verify module: ${findErr.message}`,
    })
  }
  if (!existing) {
    return sendJson(res, 404, {
      success: false,
      error: 'Not Found',
      message: 'Module not found.',
    })
  }

  const nextIsActive = typeof body.isActive === 'boolean' ? body.isActive : !existing.isActive
  const nextStatus = nextIsActive ? 'PUBLISHED' : 'DRAFT'

  const { data: updated, error: updErr } = await supabaseServer
    .from('Module')
    .update({ isActive: nextIsActive, status: nextStatus, updatedAt: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (updErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to update module status: ${updErr.message}`,
    })
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'TOGGLE_MODULE_STATUS',
    'CURRICULUM',
    id,
    existing.title,
    { previousStatus: existing.status, newStatus: nextStatus },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Module status changed to ${nextStatus}.`,
    data: updated,
  })
}

async function handleToggleLearningUnitStatus(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Unit ID',
      message: 'Unit ID is required.',
    })
  }

  if (id.startsWith('mock-')) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Operation',
      message: 'Demonstration or mock items cannot be toggled in the database.',
    })
  }

  const { data: existing, error: findErr } = await supabaseServer.from('LearningUnit').select('*').eq('id', id).maybeSingle()
  if (findErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to verify learning unit: ${findErr.message}`,
    })
  }
  if (!existing) {
    return sendJson(res, 404, {
      success: false,
      error: 'Not Found',
      message: 'Learning unit not found.',
    })
  }

  const nextIsActive = typeof body.isActive === 'boolean' ? body.isActive : !existing.isActive
  const nextStatus = nextIsActive ? 'PUBLISHED' : 'DRAFT'

  const { data: updated, error: updErr } = await supabaseServer
    .from('LearningUnit')
    .update({ isActive: nextIsActive, status: nextStatus, updatedAt: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (updErr) {
    return sendJson(res, 500, {
      success: false,
      error: 'Database Error',
      message: `Failed to update unit status: ${updErr.message}`,
    })
  }

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'TOGGLE_LEARNING_UNIT_STATUS',
    'CURRICULUM',
    id,
    existing.title,
    { previousStatus: existing.status, newStatus: nextStatus },
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: `Learning unit status changed to ${nextStatus}.`,
    data: updated,
  })
}

async function handleListBelts(res: ServerResponse) {
  const [beltsRes, problemsRes] = await Promise.all([
    supabaseServer.from('Belt').select('*').order('order', { ascending: true }),
    supabaseServer.from('Problem').select('id, beltId, isActive, slug, status, approvalStatus'),
  ])

  let rawBelts = beltsRes.data || []
  if (rawBelts.length === 0) {
    rawBelts = (problemsData as any[]).map((b, idx) => ({
      id: `mock-belt-${b.order || idx + 1}`,
      order: b.order || idx + 1,
      name: b.belt || `Belt ${b.order || idx + 1}`,
      title: b.title,
      description: b.description || '',
      color: b.color || '#EAB308',
      createdAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
    }))
  }

  const allProblems = problemsRes.data || []

  const belts = rawBelts.map((b: any) => {
    // Count problems assigned to this belt
    const bOrder = b.order
    const beltProbs = allProblems.filter((p: any) =>
      p.beltId === b.id ||
      p.beltId === `mock-belt-${bOrder}` ||
      (p.slug && p.slug.startsWith(`belt-${bOrder}-`))
    )

    let beltPub = 0
    let beltDraft = 0
    let beltArchived = 0
    let beltPending = 0

    for (const p of beltProbs) {
      const rawSt = String(p.status || '').toUpperCase()
      const rawAppSt = String(p.approvalStatus || '').toUpperCase()
      const isArchived = rawSt === 'ARCHIVED'
      const isPending = rawSt === 'PENDING_REVIEW' || rawAppSt === 'PENDING_REVIEW'
      const isPub = !isArchived && !isPending && (rawSt === 'PUBLISHED' || (rawSt !== 'DRAFT' && Boolean(p.isActive)))
      const isDraft = !isArchived && !isPending && !isPub

      if (isArchived) beltArchived++
      else if (isPending) beltPending++
      else if (isPub) beltPub++
      else if (isDraft) beltDraft++
    }

    const fallbackTotal = (problemsData as any[])[bOrder - 1]?.problems?.length || 0
    const totalCount = beltProbs.length > 0 ? beltProbs.length : fallbackTotal
    const publishedCount = beltProbs.length > 0 ? beltPub : totalCount
    const draftCount = beltProbs.length > 0 ? beltDraft : 0
    const archivedCount = beltArchived
    const pendingReviewCount = beltPending

    return {
      id: b.id,
      order: b.order,
      name: b.name || `Belt ${b.order}`,
      title: b.title,
      description: b.description || '',
      color: b.color || '#EAB308',
      problemCount: totalCount,
      publishedCount,
      draftCount,
      archivedCount,
      pendingReviewCount,
    }
  })

  belts.sort((a, b) => a.order - b.order)

  return sendJson(res, 200, {
    success: true,
    message: 'Belts retrieved successfully.',
    data: {
      belts,
      stats: {
        totalBelts: belts.length,
        totalProblems: belts.reduce((sum, b) => sum + b.problemCount, 0),
        publishedProblems: belts.reduce((sum, b) => sum + b.publishedCount, 0),
        draftProblems: belts.reduce((sum, b) => sum + b.draftCount, 0),
        archivedProblems: belts.reduce((sum, b) => sum + (b.archivedCount || 0), 0),
        pendingReviewProblems: belts.reduce((sum, b) => sum + (b.pendingReviewCount || 0), 0),
      },
    },
  })
}

async function handleUpdateBelt(
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const idOrOrder = body.id || body.order
  if (!idOrOrder) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Belt Identifier',
      message: 'Belt id or order is required.',
    })
  }

  const updates: Record<string, any> = { updatedAt: new Date().toISOString() }
  if (typeof body.title === 'string' && body.title.trim()) updates.title = body.title.trim()
  if (typeof body.name === 'string' && body.name.trim()) updates.name = body.name.trim()
  if (typeof body.description === 'string') updates.description = body.description.trim()
  if (typeof body.color === 'string' && body.color.trim()) updates.color = body.color.trim()

  let query = supabaseServer.from('Belt').update(updates)
  if (typeof body.id === 'string') {
    query = query.eq('id', body.id)
  } else if (typeof body.order === 'number') {
    query = query.eq('order', body.order)
  }

  const { data: updated, error: updErr } = await query.select().single()
  if (updErr) throw updErr

  await recordAdminAudit(
    SUPER_ADMIN_EMAIL,
    adminId,
    'UPDATE_BELT',
    'PRACTICE_BELT',
    String(idOrOrder),
    updates.title || `Belt ${idOrOrder}`,
    updates,
    'SUCCESS',
    null,
    clientIp
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Belt updated successfully.',
    data: updated,
  })
}
