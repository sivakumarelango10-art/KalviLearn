/**
 * KalviLearn — Independent Content Manager API Handler (/api/content-manager)
 *
 * Completely isolated from /api/super-admin.
 * Every endpoint enforces:
 * 1. Valid authenticated session (401 on missing/invalid token)
 * 2. Active CONTENT_MANAGER role + active ContentManagerAssignment (403 immediately on revocation)
 * 3. Granular per-action permission via requirePermission() (403 on missing permission)
 * 4. Module / Learning Unit scope check (403 on cross-scope IDOR attempts)
 * 5. Publication workflow enforcement (DRAFT -> PENDING_REVIEW -> PUBLISHED)
 * 6. Hidden test case protection & append-only ContentAuditLog
 */

import type { IncomingMessage, ServerResponse } from 'http'
import { authenticateFeedbackRequest, supabaseServer, getPrivilegedServerKeyError } from './feedbackAuth'
import { applyCors, getClientIp, RateLimiter, readJsonBody, PayloadTooLargeError } from './httpSecurity'
import { formatErrorMessage } from '../lib/errorUtils'
import { resolveRoute } from './routeResolver'
import { registerCustomSuite, unregisterCustomSuite } from './judge/testRepository'
import { selectEngine } from './judge/engines'
import { outputsMatch } from './judge/compare'
import { normalizeLanguage } from './judge/questionId'
import { hasContentPermission, CONTENT_PERMISSION_LIST } from '../lib/contentPermissions'
import {
  ContentManagerContext,
  PermissionDeniedError,
  requireContentManager,
  requirePermission,
  requireAnyPermission,
  canManageModule,
  requireModuleManageScope,
  canAccessLearningUnit,
  requireLearningUnitScope,
  canAccessQuestion,
  requireQuestionScope,
  sanitizeTestCasesForContext,
  sanitizeRevisionForContext,
  recordContentAudit,
} from './contentRbac'

const ALLOWED_CONTENT_ACTIONS = new Set<string>([
  'me',
  'dashboard',
  'list_belts',
  'list_curriculum_modules',
  'create_curriculum_module',
  'update_curriculum_module',
  'reorder_curriculum_modules',
  'toggle_module_status',
  'delete_curriculum_module',
  'create_learning_unit',
  'update_learning_unit',
  'reorder_learning_units',
  'toggle_learning_unit_status',
  'toggle_unit_status',
  'submit_learning_unit_for_review',
  'delete_learning_unit',
  'list_questions',
  'get_question',
  'get_question_preview',
  'create_question',
  'update_question',
  'submit_question_for_review',
  'duplicate_question',
  'toggle_question_status',
  'restore_question',
  'delete_question',
  'run_question_tests',
  'list_question_revisions',
  'restore_question_revision',
  'list_my_revisions',
])

const ipLimiter = new RateLimiter(120, 60_000)
const userLimiter = new RateLimiter(60, 60_000)

export function resetContentManagerRateLimitsForTesting() {
  ipLimiter.reset()
  userLimiter.reset()
}

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

const PROHIBITED_SUPER_ADMIN_ACTIONS = new Set([
  'list_campuses',
  'create_campus',
  'update_campus',
  'toggle_campus_status',
  'assign_campus_manager',
  'list_managers',
  'provision_manager',
  'assign_manager_campus',
  'toggle_manager_status',
  'list_mentors',
  'provision_mentor',
  'update_mentor',
  'toggle_mentor_status',
  'list_students',
  'enroll_student',
  'update_student',
  'delete_student',
  'list_roles',
  'list_users_roles',
  'update_user_role',
  'update_user',
  'edit_user',
  'transfer_role',
  'transfer_user_role',
  'toggle_user_status',
  'assign_user_campus',
  'list_audit_logs',
  'list_content_managers',
  'create_content_manager',
  'grant_content_manager',
  'update_content_manager',
  'suspend_content_manager',
  'reactivate_content_manager',
  'revoke_content_manager',
  'search_users_for_content_manager',
  'approve_publish_content',
  'reject_content_review',
])

export default async function handler(
  req: IncomingMessage & { body?: unknown; query?: unknown },
  res: ServerResponse & { status?: (code: number) => { json: (data: unknown) => void }; json?: (data: unknown) => void }
) {
  applyCors(req, res, {
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    headers: 'Content-Type, Authorization, X-Idempotency-Key, X-Kalvi-Subpath, X-Kalvi-Action',
  })

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  const clientIp = getClientIp(req)
  const ipCheck = ipLimiter.check(clientIp)
  if (!ipCheck.allowed) {
    res.setHeader('Retry-After', String(ipCheck.retryAfter || 60))
    return sendJson(res, 429, {
      success: false,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please wait before trying again.',
    })
  }

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

  // 1. Authenticate caller
  const authHeader = (req.headers['authorization'] || (req.headers as Record<string, string | undefined>)['Authorization']) as string | undefined
  const auth = await authenticateFeedbackRequest(authHeader)
  if (!auth.authenticated || !auth.user) {
    return sendJson(res, auth.statusCode || 401, {
      success: false,
      error: auth.error || 'Authentication required.',
      message: auth.error || 'Authentication required.',
    })
  }

  // 2. Central Content Manager authorization check (`requireContentManager`)
  const resolution = await requireContentManager(auth.user)
  if (!resolution.authorized) {
    return sendJson(res, resolution.statusCode, {
      success: false,
      error: 'Access Denied',
      message: resolution.error,
    })
  }
  const ctx = resolution.ctx

  const userCheck = userLimiter.check(ctx.userId)
  if (!userCheck.allowed) {
    res.setHeader('Retry-After', String(userCheck.retryAfter || 60))
    return sendJson(res, 429, {
      success: false,
      error: 'Too Many Requests',
      message: 'Account rate limit exceeded. Please wait a moment.',
    })
  }

  // 3. Route & Action Resolution
  const route = resolveRoute(req, body, '/api/content-manager')
  req.query = { ...route.queryParams, ...(typeof req.query === 'object' && req.query ? req.query : {}) }

  let action = route.action
  const sub = route.subpath
  const method = route.method
  const url = (req.url || '').toLowerCase()

  if (!action) {
    if (sub === 'me' || url.includes('/me')) action = 'me'
    else if (sub === 'dashboard' || url.includes('/dashboard')) action = 'dashboard'
    else if (sub === 'belts' || url.includes('/belts')) action = 'list_belts'
    else if (sub === 'curriculum' || sub.startsWith('curriculum/')) {
      if (method === 'GET') action = 'list_curriculum_modules'
    } else if (sub === 'questions' || sub.startsWith('questions/')) {
      if (method === 'GET') action = 'list_questions'
      else if (method === 'DELETE') action = 'delete_question'
    } else if (sub === 'revisions' || sub.startsWith('revisions/')) {
      if (method === 'GET') action = 'list_my_revisions'
    }
  }

  // Explicitly deny prohibited Super Admin, user/campus management, or non-allowlisted actions
  if (
    PROHIBITED_SUPER_ADMIN_ACTIONS.has(action) ||
    sub.startsWith('students') ||
    sub.startsWith('mentors') ||
    sub.startsWith('campuses') ||
    sub.startsWith('managers') ||
    sub.startsWith('roles') ||
    sub.startsWith('content-managers') ||
    (action && !ALLOWED_CONTENT_ACTIONS.has(action))
  ) {
    return sendJson(res, 403, {
      success: false,
      error: 'Forbidden',
      message: 'Content Managers cannot access platform administration, user roles, students, mentors, or campus endpoints.',
    })
  }

  try {
    if (action === 'me') {
      const { data: cmProfile } = await supabaseServer
        .from('content_managers')
        .select('id, manager_code, department, designation')
        .eq('user_id', ctx.userId)
        .maybeSingle()

      return sendJson(res, 200, {
        success: true,
        message: 'Content Manager context verified.',
        data: {
          userId: ctx.userId,
          profileId: cmProfile?.id || null,
          email: ctx.email,
          name: ctx.name,
          managerCode: cmProfile?.manager_code || null,
          department: cmProfile?.department || null,
          designation: cmProfile?.designation || null,
          role: ctx.role,
          assignmentId: ctx.assignmentId,
          scopeType: ctx.scopeType,
          permissions: Array.from(ctx.permissions),
          allKnownPermissions: CONTENT_PERMISSION_LIST,
          assignedModuleIds: Array.from(ctx.assignedModuleIds),
          assignedLearningUnitIds: Array.from(ctx.assignedLearningUnitIds),
          grantedBy: ctx.grantedBy,
          grantedAt: ctx.grantedAt,
          notes: ctx.notes,
        },
      })
    }

    if (action === 'dashboard') {
      return await handleGetDashboard(ctx, res)
    }
    if (action === 'list_belts') {
      return await handleListBelts(res)
    }

    // Curriculum & Learning Units
    if (action === 'list_curriculum_modules') {
      return await handleListCurriculumModules(ctx, body, req, res)
    }
    if (action === 'create_curriculum_module') {
      return await handleCreateCurriculumModule(ctx, body, clientIp, res)
    }
    if (action === 'update_curriculum_module') {
      return await handleUpdateCurriculumModule(ctx, body, clientIp, res)
    }
    if (action === 'reorder_curriculum_modules') {
      return await handleReorderCurriculumModules(ctx, body, clientIp, res)
    }
    if (action === 'toggle_module_status') {
      return await handleToggleModuleStatus(ctx, body, clientIp, res)
    }
    if (action === 'delete_curriculum_module') {
      return await handleDeleteCurriculumModule(ctx, body, clientIp, res)
    }
    if (action === 'create_learning_unit') {
      return await handleCreateLearningUnit(ctx, body, clientIp, res)
    }
    if (action === 'update_learning_unit') {
      return await handleUpdateLearningUnit(ctx, body, clientIp, res)
    }
    if (action === 'reorder_learning_units') {
      return await handleReorderLearningUnits(ctx, body, clientIp, res)
    }
    if (action === 'toggle_learning_unit_status' || action === 'toggle_unit_status') {
      return await handleToggleLearningUnitStatus(ctx, body, clientIp, res)
    }
    if (action === 'submit_learning_unit_for_review') {
      return await handleSubmitLearningUnitForReview(ctx, body, clientIp, res)
    }
    if (action === 'delete_learning_unit') {
      return await handleDeleteLearningUnit(ctx, body, clientIp, res)
    }

    // Coding Questions
    if (action === 'list_questions') {
      return await handleListQuestions(ctx, body, req, res)
    }
    if (action === 'get_question') {
      return await handleGetQuestion(ctx, body, req, res)
    }
    if (action === 'get_question_preview') {
      return await handleGetQuestionPreview(ctx, body, req, res)
    }
    if (action === 'create_question') {
      return await handleCreateQuestion(ctx, body, clientIp, res)
    }
    if (action === 'update_question') {
      return await handleUpdateQuestion(ctx, body, clientIp, res)
    }
    if (action === 'submit_question_for_review') {
      return await handleSubmitQuestionForReview(ctx, body, clientIp, res)
    }
    if (action === 'duplicate_question') {
      return await handleDuplicateQuestion(ctx, body, clientIp, res)
    }
    if (action === 'toggle_question_status') {
      return await handleToggleQuestionStatus(ctx, body, clientIp, res)
    }
    if (action === 'restore_question') {
      return await handleRestoreQuestion(ctx, body, clientIp, res)
    }
    if (action === 'delete_question') {
      return await handleDeleteQuestion(ctx, body, clientIp, res)
    }
    if (action === 'run_question_tests') {
      return await handleRunQuestionTests(ctx, body, clientIp, res)
    }
    if (action === 'list_question_revisions') {
      return await handleListQuestionRevisions(ctx, body, req, res)
    }
    if (action === 'restore_question_revision') {
      return await handleRestoreQuestionRevision(ctx, body, clientIp, res)
    }
    if (action === 'list_my_revisions') {
      return await handleListMyRevisions(ctx, body, req, res)
    }

    return sendJson(res, 404, {
      success: false,
      error: 'Unknown Action',
      message: `Content Manager endpoint or action "${action || sub}" was not found.`,
    })
  } catch (err: unknown) {
    if (err instanceof PermissionDeniedError) {
      return sendJson(res, err.statusCode, {
        success: false,
        error: 'Permission Denied',
        message: err.message,
      })
    }
    console.error('[content-manager] Unhandled endpoint error:', err)
    const msg = formatErrorMessage(err, 'An internal error occurred in the Content Manager service.')
    return sendJson(res, 500, {
      success: false,
      error: 'Internal Server Error',
      message: msg,
    })
  }
}

// ─── Helper: Belt & Question Lookups ─────────────────────────────────────────

async function resolveBeltId(rawBeltId: unknown): Promise<string | null> {
  const { data: belts, error } = await supabaseServer
    .from('Belt')
    .select('id, order, name, title')
    .order('order', { ascending: true })
  if (error || !belts || belts.length === 0) {
    return typeof rawBeltId === 'string' && rawBeltId.trim() ? rawBeltId.trim() : null
  }
  const str = typeof rawBeltId === 'string' ? rawBeltId.trim() : ''
  if (str) {
    const exact = belts.find((b: any) => b.id === str)
    if (exact) return exact.id
    const orderMatch = str.match(/(\d+)$/)
    if (orderMatch) {
      const targetOrder = Number.parseInt(orderMatch[1], 10)
      const byOrder = belts.find((b: any) => b.order === targetOrder)
      if (byOrder) return byOrder.id
    }
  }
  return belts[0].id
}

async function handleListBelts(res: ServerResponse) {
  const [beltsRes, probRes] = await Promise.all([
    supabaseServer.from('Belt').select('*').order('order', { ascending: true }),
    supabaseServer.from('Problem').select('id, beltId, learningUnitId, status, isActive'),
  ])
  if (beltsRes.error) throw beltsRes.error
  if (probRes.error) throw probRes.error

  const practiceProbs = (probRes.data || []).filter((p: any) => !p.learningUnitId)
  const enriched = (beltsRes.data || []).map((b: any) => {
    const forBelt = practiceProbs.filter((p: any) => p.beltId === b.id)
    const publishedCount = forBelt.filter(
      (p: any) => p.status === 'PUBLISHED' || (p.status !== 'DRAFT' && p.status !== 'ARCHIVED' && p.isActive)
    ).length
    return {
      id: b.id,
      order: b.order,
      name: b.name,
      title: b.title,
      color: b.color || '#EAB308',
      description: b.description || '',
      problemCount: forBelt.length,
      publishedCount,
      draftCount: forBelt.length - publishedCount,
    }
  })

  return sendJson(res, 200, {
    success: true,
    message: 'Practice belts retrieved.',
    data: enriched,
  })
}

async function findQuestionByIdOrSlug(idOrSlug: string): Promise<any | null> {
  const { data: byId, error: idErr } = await supabaseServer
    .from('Problem')
    .select('*')
    .eq('id', idOrSlug)
    .maybeSingle()
  if (idErr) throw idErr
  if (byId) return byId

  const { data: bySlug, error: slugErr } = await supabaseServer
    .from('Problem')
    .select('*')
    .eq('slug', idOrSlug)
    .maybeSingle()
  if (slugErr) throw slugErr
  return bySlug || null
}

// ─── 1. Overview Dashboard ───────────────────────────────────────────────────

async function handleGetDashboard(ctx: ContentManagerContext, res: ServerResponse) {
  requirePermission(ctx, 'content.dashboard.view')

  const [modRes, unitRes, probRes, auditRes] = await Promise.all([
    supabaseServer.from('Module').select('id, title, order, status, isActive, approvalStatus, updatedAt').order('order', { ascending: true }),
    supabaseServer.from('LearningUnit').select('id, moduleId, title, order, status, isActive, approvalStatus, updatedAt, updatedBy').order('order', { ascending: true }),
    supabaseServer.from('Problem').select('id, title, slug, difficulty, learningUnitId, beltId, status, isActive, approvalStatus, updatedAt, updatedBy, createdBy').order('updatedAt', { ascending: false }),
    supabaseServer.from('content_audit_logs').select('*').eq('actor_user_id', ctx.userId).order('created_at', { ascending: false }).limit(20),
  ])

  if (modRes.error) throw modRes.error
  if (unitRes.error) throw unitRes.error
  if (probRes.error) throw probRes.error

  const allModules = modRes.data || []
  const allUnits = unitRes.data || []
  const allProblems = probRes.data || []

  // Filter strictly by Content Manager scope
  const visibleUnits: any[] = []
  for (const u of allUnits) {
    const { allowed } = await canAccessLearningUnit(ctx, u.id, u.moduleId)
    if (allowed) visibleUnits.push(u)
  }

  const visibleUnitModuleIds = new Set(visibleUnits.map((u: any) => u.moduleId))
  const visibleModules = allModules.filter((m: any) => {
    if (ctx.scopeType === 'GLOBAL') return true
    if (ctx.scopeType === 'NONE') return false
    return ctx.assignedModuleIds.has(m.id) || visibleUnitModuleIds.has(m.id)
  })

  const visibleQuestions: any[] = []
  for (const p of allProblems) {
    if (await canAccessQuestion(ctx, p)) {
      visibleQuestions.push(p)
    }
  }

  const canSeePublished =
    hasContentPermission(ctx.permissions, 'content.question.view') ||
    hasContentPermission(ctx.permissions, 'content.question.publish')

  let draftQuestions = 0
  let publishedQuestions = 0
  let pendingQuestionApprovals = 0
  for (const q of visibleQuestions) {
    const st = String(q.status || '').toUpperCase()
    const app = String(q.approvalStatus || '').toUpperCase()
    if (app === 'PENDING_REVIEW' || st === 'PENDING_REVIEW') pendingQuestionApprovals++
    if (st === 'PUBLISHED' || (st !== 'DRAFT' && st !== 'ARCHIVED' && st !== 'PENDING_REVIEW' && q.isActive)) {
      publishedQuestions++
    } else if (st !== 'ARCHIVED') {
      draftQuestions++
    }
  }

  const pendingUnitApprovals = visibleUnits.filter(
    (u: any) => String(u.approvalStatus || '').toUpperCase() === 'PENDING_REVIEW' || String(u.status || '').toUpperCase() === 'PENDING_REVIEW'
  ).length

  const recentlyUpdatedLessons = [...visibleUnits]
    .sort((a: any, b: any) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')))
    .slice(0, 6)
    .map((u: any) => ({
      id: u.id,
      moduleId: u.moduleId,
      title: u.title,
      status: u.status || (u.isActive ? 'PUBLISHED' : 'DRAFT'),
      approvalStatus: u.approvalStatus || 'APPROVED',
      updatedAt: u.updatedAt,
    }))

  const recentlyEditedQuestions = [...visibleQuestions]
    .sort((a: any, b: any) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')))
    .slice(0, 6)
    .map((q: any) => ({
      id: q.id,
      slug: q.slug,
      title: q.title,
      difficulty: q.difficulty,
      learningUnitId: q.learningUnitId,
      status: q.status || (q.isActive ? 'PUBLISHED' : 'DRAFT'),
      approvalStatus: q.approvalStatus || 'APPROVED',
      updatedAt: q.updatedAt,
    }))

  const totalModules = visibleModules.length
  const totalLearningUnits = visibleUnits.length
  const totalPracticeQuestions = visibleQuestions.filter((q: any) => !q.learningUnitId).length
  const totalLearnCodingQuestions = visibleQuestions.filter((q: any) => Boolean(q.learningUnitId)).length

  return sendJson(res, 200, {
    success: true,
    message: 'Content Manager dashboard overview retrieved.',
    data: {
      scopeType: ctx.scopeType,
      stats: {
        totalModules,
        assignedModulesCount: totalModules,
        totalLearningUnits,
        totalPracticeQuestions,
        totalLearnCodingQuestions,
        totalCodingQuestions: visibleQuestions.length,
        draftQuestions,
        publishedQuestions: canSeePublished ? publishedQuestions : null,
        pendingApprovals: pendingQuestionApprovals + pendingUnitApprovals,
        pendingQuestionApprovals,
        pendingUnitApprovals,
      },
      assignedModules: visibleModules.map((m: any) => ({
        id: m.id,
        title: m.title,
        order: m.order,
        status: m.status || (m.isActive ? 'PUBLISHED' : 'DRAFT'),
        canManageModule: canManageModule(ctx, m.id),
        unitCount: visibleUnits.filter((u: any) => u.moduleId === m.id).length,
      })),
      recentlyUpdatedLessons,
      recentlyEditedQuestions,
      recentActivity: auditRes.data || [],
    },
  })
}

// ─── 2. Curriculum & Learning Units ──────────────────────────────────────────

async function handleListCurriculumModules(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  requireAnyPermission(ctx, ['content.curriculum.view', 'content.learning_unit.view', 'content.question.view'])

  const urlObj = new URL(req.url || '/', 'http://localhost')
  const search =
    typeof body.search === 'string'
      ? body.search.trim().toLowerCase()
      : (urlObj.searchParams.get('search') || '').trim().toLowerCase()

  const [modulesRes, unitsRes] = await Promise.all([
    supabaseServer.from('Module').select('*').order('order', { ascending: true }),
    supabaseServer.from('LearningUnit').select('*').order('order', { ascending: true }),
  ])

  if (modulesRes.error) throw modulesRes.error
  if (unitsRes.error) throw unitsRes.error

  const rawModules = modulesRes.data || []
  const rawUnits = (unitsRes.data || []).map((unit: any) => ({
    ...unit,
    concept: unit.content ?? unit.concept ?? '',
  }))

  // Group ONLY authorized learning units by moduleId
  const authorizedUnitsByModule = new Map<string, any[]>()
  for (const u of rawUnits) {
    const { allowed } = await canAccessLearningUnit(ctx, u.id, u.moduleId)
    if (!allowed) continue
    if (!authorizedUnitsByModule.has(u.moduleId)) {
      authorizedUnitsByModule.set(u.moduleId, [])
    }
    authorizedUnitsByModule.get(u.moduleId)!.push(u)
  }

  let totalPublishedModules = 0
  let totalDraftModules = 0
  let totalPublishedUnits = 0
  let totalDraftUnits = 0

  const filteredModules = rawModules.filter((m: any) => {
    if (ctx.scopeType === 'GLOBAL') return true
    if (ctx.scopeType === 'NONE') return false
    return ctx.assignedModuleIds.has(m.id) || authorizedUnitsByModule.has(m.id)
  })

  const modules = filteredModules.map((m: any) => {
    const isModActive = m.isActive !== false && m.status !== 'DRAFT' && m.status !== 'PENDING_REVIEW'
    if (isModActive) totalPublishedModules++
    else totalDraftModules++

    let mUnits = authorizedUnitsByModule.get(m.id) || []
    mUnits.sort((a, b) => (a.order || 0) - (b.order || 0))

    for (const u of mUnits) {
      if (u.isActive !== false && u.status !== 'DRAFT' && u.status !== 'PENDING_REVIEW') totalPublishedUnits++
      else totalDraftUnits++
    }

    if (search) {
      mUnits = mUnits.filter(
        (u: any) =>
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
      status: m.status || (isModActive ? 'PUBLISHED' : 'DRAFT'),
      approvalStatus: m.approvalStatus || 'APPROVED',
      canManageModule: canManageModule(ctx, m.id),
      learningUnitsCount: (authorizedUnitsByModule.get(m.id) || []).length,
      learningUnits: mUnits,
    }
  })

  modules.sort((a, b) => a.order - b.order)

  return sendJson(res, 200, {
    success: true,
    message: 'Curriculum modules retrieved.',
    data: {
      modules,
      stats: {
        totalModules: modules.length,
        totalLearningUnits: Array.from(authorizedUnitsByModule.values()).reduce((sum, list) => sum + list.length, 0),
        publishedModules: totalPublishedModules,
        draftModules: totalDraftModules,
        publishedUnits: totalPublishedUnits,
        draftUnits: totalDraftUnits,
      },
    },
  })
}

async function handleCreateCurriculumModule(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.curriculum.create')

  if (ctx.scopeType !== 'GLOBAL') {
    return sendJson(res, 403, {
      success: false,
      error: 'Scope Denied',
      message: 'Creating top-level curriculum modules requires GLOBAL Content Manager scope.',
    })
  }

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

  const canPublish = hasContentPermission(ctx.permissions, 'content.learning_unit.publish')
  const requestedPublish = body.status === 'PUBLISHED' || body.isActive === true
  if (requestedPublish && !canPublish) {
    return sendJson(res, 403, {
      success: false,
      error: 'Permission Denied',
      message: 'Missing permission "content.learning_unit.publish" to create directly as PUBLISHED. Save as DRAFT instead.',
    })
  }

  const isPublished = canPublish && requestedPublish
  const { data: existingModules, error: listErr } = await supabaseServer.from('Module').select('order')
  if (listErr) throw listErr

  const nextOrder = order ?? ((existingModules || []).reduce((max: number, m: any) => Math.max(max, m.order || 0), 0) + 1)
  const newModuleId = `mod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const now = new Date().toISOString()

  const { data: created, error: createErr } = await supabaseServer
    .from('Module')
    .insert({
      id: newModuleId,
      title,
      description,
      order: nextOrder,
      isActive: isPublished,
      status: isPublished ? 'PUBLISHED' : 'DRAFT',
      approvalStatus: isPublished ? 'APPROVED' : 'DRAFT',
      createdBy: ctx.userId,
      updatedBy: ctx.userId,
      publishedBy: isPublished ? ctx.userId : null,
      publishedAt: isPublished ? now : null,
      createdAt: now,
      updatedAt: now,
    })
    .select()
    .single()

  if (createErr) throw createErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'CREATE_CURRICULUM_MODULE',
    resourceType: 'MODULE',
    resourceId: newModuleId,
    resourceLabel: title,
    permissionUsed: 'content.curriculum.create',
    updatedValues: { title, description, order: nextOrder, status: created.status },
    changeSummary: `Created module "${title}" (${created.status})`,
    ipAddress: clientIp,
  })

  return sendJson(res, 201, {
    success: true,
    message: `Module "${title}" created successfully.`,
    data: { ...created, canManageModule: true, learningUnits: [] },
  })
}

async function handleUpdateCurriculumModule(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.curriculum.update')

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) {
    return sendJson(res, 400, { success: false, error: 'Missing Module ID', message: 'Module ID is required.' })
  }

  requireModuleManageScope(ctx, id)

  const { data: existing, error: findErr } = await supabaseServer.from('Module').select('*').eq('id', id).maybeSingle()
  if (findErr) throw findErr
  if (!existing) {
    return sendJson(res, 404, { success: false, error: 'Not Found', message: `Module "${id}" not found.` })
  }

  const updates: Record<string, any> = {
    updatedBy: ctx.userId,
    updatedAt: new Date().toISOString(),
  }
  if (typeof body.title === 'string' && body.title.trim()) updates.title = body.title.trim()
  if (typeof body.description === 'string') updates.description = body.description.trim()
  if (typeof body.order === 'number') updates.order = body.order

  if (typeof body.status === 'string' || typeof body.isActive === 'boolean') {
    const requestedStatus = typeof body.status === 'string' ? body.status.toUpperCase() : (body.isActive ? 'PUBLISHED' : 'DRAFT')
    if (requestedStatus !== existing.status) {
      if (requestedStatus === 'PUBLISHED') {
        requirePermission(ctx, 'content.learning_unit.publish')
        updates.status = 'PUBLISHED'
        updates.isActive = true
        updates.approvalStatus = 'APPROVED'
        updates.publishedBy = ctx.userId
        updates.publishedAt = new Date().toISOString()
      } else if (requestedStatus === 'DRAFT' || requestedStatus === 'ARCHIVED') {
        requirePermission(ctx, 'content.learning_unit.publish')
        updates.status = requestedStatus
        updates.isActive = false
      }
    }
  }

  const { data: updated, error: updErr } = await supabaseServer
    .from('Module')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (updErr) throw updErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'UPDATE_CURRICULUM_MODULE',
    resourceType: 'MODULE',
    resourceId: id,
    resourceLabel: updates.title || existing.title,
    permissionUsed: 'content.curriculum.update',
    previousValues: { title: existing.title, description: existing.description, order: existing.order, status: existing.status },
    updatedValues: updates,
    changeSummary: `Updated module "${updates.title || existing.title}"`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, {
    success: true,
    message: 'Module updated successfully.',
    data: updated,
  })
}

async function handleReorderCurriculumModules(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.curriculum.reorder')

  const orders = Array.isArray(body.orders) ? body.orders : []
  if (orders.length === 0) {
    return sendJson(res, 400, { success: false, error: 'Missing Order Data', message: 'Module orders array is required.' })
  }

  for (const item of orders as Array<{ id: string; order: number }>) {
    if (!item?.id || typeof item.order !== 'number') continue
    requireModuleManageScope(ctx, item.id)
  }

  const now = new Date().toISOString()
  for (const item of orders as Array<{ id: string; order: number }>) {
    if (item.id && typeof item.order === 'number') {
      const { error } = await supabaseServer
        .from('Module')
        .update({ order: item.order, updatedBy: ctx.userId, updatedAt: now })
        .eq('id', item.id)
      if (error) throw error
    }
  }

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'REORDER_CURRICULUM_MODULES',
    resourceType: 'MODULE',
    resourceLabel: 'Modules Order',
    permissionUsed: 'content.curriculum.reorder',
    updatedValues: { orders },
    changeSummary: `Reordered ${orders.length} curriculum modules`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, { success: true, message: 'Modules reordered successfully.' })
}

async function handleToggleModuleStatus(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.learning_unit.publish')

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Module ID', message: 'Module ID is required.' })
  requireModuleManageScope(ctx, id)

  const { data: existing, error: findErr } = await supabaseServer.from('Module').select('*').eq('id', id).maybeSingle()
  if (findErr) throw findErr
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Module "${id}" not found.` })

  const nextActive = typeof body.isActive === 'boolean' ? body.isActive : !(existing.isActive !== false && existing.status !== 'DRAFT')
  const now = new Date().toISOString()

  const { data: updated, error: updErr } = await supabaseServer
    .from('Module')
    .update({
      isActive: nextActive,
      status: nextActive ? 'PUBLISHED' : 'DRAFT',
      approvalStatus: nextActive ? 'APPROVED' : 'DRAFT',
      publishedBy: nextActive ? ctx.userId : existing.publishedBy,
      publishedAt: nextActive ? now : existing.publishedAt,
      updatedBy: ctx.userId,
      updatedAt: now,
    })
    .eq('id', id)
    .select()
    .single()
  if (updErr) throw updErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'TOGGLE_MODULE_STATUS',
    resourceType: 'MODULE',
    resourceId: id,
    resourceLabel: existing.title,
    permissionUsed: 'content.learning_unit.publish',
    previousValues: { status: existing.status, isActive: existing.isActive },
    updatedValues: { status: updated.status, isActive: updated.isActive },
    changeSummary: `Changed module "${existing.title}" status to ${updated.status}`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, { success: true, message: `Module is now ${updated.status}.`, data: updated })
}

async function handleDeleteCurriculumModule(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.learning_unit.delete')

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Module ID', message: 'Module ID is required.' })
  requireModuleManageScope(ctx, id)

  const { data: existing, error: findErr } = await supabaseServer.from('Module').select('*').eq('id', id).maybeSingle()
  if (findErr) throw findErr
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Module "${id}" not found.` })

  await supabaseServer.from('LearningUnit').delete().eq('moduleId', id)
  const { error: delErr } = await supabaseServer.from('Module').delete().eq('id', id)
  if (delErr) throw delErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'DELETE_CURRICULUM_MODULE',
    resourceType: 'MODULE',
    resourceId: id,
    resourceLabel: existing.title,
    permissionUsed: 'content.learning_unit.delete',
    previousValues: { title: existing.title, order: existing.order },
    changeSummary: `Deleted module "${existing.title}"`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, { success: true, message: `Module "${existing.title}" deleted successfully.` })
}

async function handleCreateLearningUnit(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.learning_unit.create')

  const moduleId = typeof body.moduleId === 'string' ? body.moduleId.trim() : ''
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const concept = typeof body.concept === 'string' ? body.concept.trim() : (typeof body.content === 'string' ? body.content.trim() : '')

  if (!moduleId || !title) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Parameters',
      message: 'Both moduleId and unit title are required.',
    })
  }

  requireModuleManageScope(ctx, moduleId)

  const { data: mod, error: modErr } = await supabaseServer.from('Module').select('id').eq('id', moduleId).maybeSingle()
  if (modErr) throw modErr
  if (!mod) {
    return sendJson(res, 404, { success: false, error: 'Module Not Found', message: `Module "${moduleId}" not found.` })
  }

  const canPublish = hasContentPermission(ctx.permissions, 'content.learning_unit.publish')
  const requestedPublish = body.status === 'PUBLISHED' || body.isActive === true
  if (requestedPublish && !canPublish) {
    return sendJson(res, 403, {
      success: false,
      error: 'Permission Denied',
      message: 'Missing permission "content.learning_unit.publish" to publish directly. Save as DRAFT or submit for review.',
    })
  }

  const { data: existingUnits } = await supabaseServer.from('LearningUnit').select('order').eq('moduleId', moduleId)
  const nextOrder =
    typeof body.order === 'number'
      ? body.order
      : (existingUnits || []).reduce((max: number, u: any) => Math.max(max, u.order || 0), 0) + 1

  const unitId = `lu-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const now = new Date().toISOString()
  const isPublished = canPublish && requestedPublish
  const initialStatus = isPublished ? 'PUBLISHED' : body.submitForReview ? 'PENDING_REVIEW' : 'DRAFT'

  const { data: created, error: createErr } = await supabaseServer
    .from('LearningUnit')
    .insert({
      id: unitId,
      moduleId,
      order: nextOrder,
      title,
      content: concept,
      codingQuestion: typeof body.codingQuestion === 'string' ? body.codingQuestion : '',
      inputFormat: typeof body.inputFormat === 'string' ? body.inputFormat : '',
      outputFormat: typeof body.outputFormat === 'string' ? body.outputFormat : '',
      examples: Array.isArray(body.examples) ? body.examples : [],
      codeSnippets: body.codeSnippets || {},
      approach: typeof body.approach === 'string' ? body.approach : '',
      readingTimeMinutes: typeof body.readingTimeMinutes === 'number' ? body.readingTimeMinutes : 2,
      isActive: isPublished,
      status: initialStatus,
      approvalStatus: isPublished ? 'APPROVED' : body.submitForReview ? 'PENDING_REVIEW' : 'DRAFT',
      submittedForReviewAt: body.submitForReview ? now : null,
      submittedForReviewBy: body.submitForReview ? ctx.userId : null,
      publishedAt: isPublished ? now : null,
      publishedBy: isPublished ? ctx.userId : null,
      createdBy: ctx.userId,
      updatedBy: ctx.userId,
      createdAt: now,
      updatedAt: now,
    })
    .select()
    .single()

  if (createErr) throw createErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'CREATE_LEARNING_UNIT',
    resourceType: 'LEARNING_UNIT',
    resourceId: unitId,
    resourceLabel: title,
    permissionUsed: 'content.learning_unit.create',
    updatedValues: { moduleId, title, order: nextOrder, status: initialStatus },
    changeSummary: `Created learning unit "${title}" (${initialStatus})`,
    ipAddress: clientIp,
  })

  return sendJson(res, 201, {
    success: true,
    message: `Learning Unit "${title}" created as ${initialStatus}.`,
    data: { ...created, concept: created.content },
  })
}

async function handleUpdateLearningUnit(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.learning_unit.update')

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Unit ID', message: 'Learning Unit ID is required.' })

  const { data: existing, error: findErr } = await supabaseServer.from('LearningUnit').select('*').eq('id', id).maybeSingle()
  if (findErr) throw findErr
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Learning Unit "${id}" not found.` })

  await requireLearningUnitScope(ctx, id, existing.moduleId)

  const now = new Date().toISOString()
  const updates: Record<string, any> = {
    updatedBy: ctx.userId,
    updatedAt: now,
  }
  if (typeof body.title === 'string' && body.title.trim()) updates.title = body.title.trim()
  const conceptVal = typeof body.concept === 'string' ? body.concept.trim() : typeof body.content === 'string' ? body.content.trim() : undefined
  if (conceptVal !== undefined) updates.content = conceptVal
  if (typeof body.approach === 'string') updates.approach = body.approach
  if (typeof body.codingQuestion === 'string') updates.codingQuestion = body.codingQuestion
  if (typeof body.inputFormat === 'string') updates.inputFormat = body.inputFormat
  if (typeof body.outputFormat === 'string') updates.outputFormat = body.outputFormat
  if (typeof body.readingTimeMinutes === 'number' && !isNaN(body.readingTimeMinutes)) {
    updates.readingTimeMinutes = Math.max(1, body.readingTimeMinutes)
  } else if (typeof body.readingTimeMinutes === 'string' && body.readingTimeMinutes.trim() && !isNaN(Number(body.readingTimeMinutes))) {
    updates.readingTimeMinutes = Math.max(1, parseInt(body.readingTimeMinutes, 10))
  }
  if (typeof body.order === 'number') updates.order = body.order
  if (Array.isArray(body.examples)) updates.examples = body.examples
  if (body.codeSnippets !== undefined) updates.codeSnippets = body.codeSnippets

  if (typeof body.status === 'string') {
    const reqStatus = body.status.trim().toUpperCase()
    const canPub = hasContentPermission(ctx.permissions, 'content.learning_unit.publish')
    if (reqStatus === 'PUBLISHED') {
      if (!canPub) {
        return sendJson(res, 403, {
          success: false,
          error: 'Permission Denied',
          message: 'Missing permission "content.learning_unit.publish". Submit for Super Admin review instead.',
        })
      }
      updates.status = 'PUBLISHED'
      updates.isActive = true
      updates.approvalStatus = 'APPROVED'
      updates.publishedBy = ctx.userId
      updates.publishedAt = now
    } else if (reqStatus === 'PENDING_REVIEW') {
      updates.status = existing.status === 'PUBLISHED' ? 'PUBLISHED' : 'PENDING_REVIEW'
      updates.approvalStatus = 'PENDING_REVIEW'
      updates.submittedForReviewBy = ctx.userId
      updates.submittedForReviewAt = now
    } else if (reqStatus === 'DRAFT') {
      if (existing.status === 'PUBLISHED' && !canPub) {
        return sendJson(res, 403, {
          success: false,
          error: 'Permission Denied',
          message: 'Missing permission "content.learning_unit.publish" to unpublish a live unit.',
        })
      }
      updates.status = 'DRAFT'
      updates.isActive = false
      updates.approvalStatus = 'DRAFT'
    }
  }

  const { data: updated, error: updErr } = await supabaseServer
    .from('LearningUnit')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (updErr) throw updErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'UPDATE_LEARNING_UNIT',
    resourceType: 'LEARNING_UNIT',
    resourceId: id,
    resourceLabel: updates.title || existing.title,
    permissionUsed: 'content.learning_unit.update',
    previousValues: { title: existing.title, status: existing.status, order: existing.order },
    updatedValues: updates,
    changeSummary: `Updated learning unit "${updates.title || existing.title}"`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, {
    success: true,
    message: 'Learning Unit updated successfully.',
    data: { ...updated, concept: updated.content ?? updated.concept ?? '' },
  })
}

async function handleSubmitLearningUnitForReview(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.learning_unit.update')

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Unit ID', message: 'Learning Unit ID is required.' })

  const { data: existing, error: findErr } = await supabaseServer.from('LearningUnit').select('*').eq('id', id).maybeSingle()
  if (findErr) throw findErr
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Learning Unit "${id}" not found.` })

  await requireLearningUnitScope(ctx, id, existing.moduleId)

  const now = new Date().toISOString()
  const nextStatus = existing.status === 'PUBLISHED' ? 'PUBLISHED' : 'PENDING_REVIEW'
  const { data: updated, error: updErr } = await supabaseServer
    .from('LearningUnit')
    .update({
      status: nextStatus,
      approvalStatus: 'PENDING_REVIEW',
      submittedForReviewAt: now,
      submittedForReviewBy: ctx.userId,
      updatedBy: ctx.userId,
      updatedAt: now,
    })
    .eq('id', id)
    .select()
    .single()
  if (updErr) throw updErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'SUBMIT_LEARNING_UNIT_FOR_REVIEW',
    resourceType: 'LEARNING_UNIT',
    resourceId: id,
    resourceLabel: existing.title,
    permissionUsed: 'content.learning_unit.update',
    previousValues: { approvalStatus: existing.approvalStatus, status: existing.status },
    updatedValues: { approvalStatus: 'PENDING_REVIEW', status: nextStatus },
    changeSummary: typeof body.changeSummary === 'string' && body.changeSummary.trim()
      ? body.changeSummary.trim()
      : `Submitted learning unit "${existing.title}" for Super Admin publication review`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, {
    success: true,
    message: `Learning unit "${existing.title}" submitted for review.`,
    data: { ...updated, concept: updated.content },
  })
}

async function handleReorderLearningUnits(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.learning_unit.reorder')

  const moduleId = typeof body.moduleId === 'string' ? body.moduleId.trim() : ''
  const orders = Array.isArray(body.orders) ? body.orders : []
  if (!moduleId || orders.length === 0) {
    return sendJson(res, 400, { success: false, error: 'Missing Parameters', message: 'moduleId and orders are required.' })
  }

  requireModuleManageScope(ctx, moduleId)
  const now = new Date().toISOString()

  for (const item of orders as Array<{ id: string; order: number }>) {
    if (item.id && typeof item.order === 'number') {
      await requireLearningUnitScope(ctx, item.id, moduleId)
      const { error } = await supabaseServer
        .from('LearningUnit')
        .update({ order: item.order, updatedBy: ctx.userId, updatedAt: now })
        .eq('id', item.id)
        .eq('moduleId', moduleId)
      if (error) throw error
    }
  }

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'REORDER_LEARNING_UNITS',
    resourceType: 'LEARNING_UNIT',
    resourceId: moduleId,
    resourceLabel: `Units in ${moduleId}`,
    permissionUsed: 'content.learning_unit.reorder',
    updatedValues: { moduleId, orders },
    changeSummary: `Reordered ${orders.length} learning units in module ${moduleId}`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, { success: true, message: 'Learning units reordered successfully.' })
}

async function handleToggleLearningUnitStatus(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.learning_unit.publish')

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Unit ID', message: 'Learning Unit ID is required.' })

  const { data: existing, error: findErr } = await supabaseServer.from('LearningUnit').select('*').eq('id', id).maybeSingle()
  if (findErr) throw findErr
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Learning Unit "${id}" not found.` })

  await requireLearningUnitScope(ctx, id, existing.moduleId)

  const nextActive = typeof body.isActive === 'boolean' ? body.isActive : !(existing.isActive !== false && existing.status !== 'DRAFT')
  const now = new Date().toISOString()
  const { data: updated, error: updErr } = await supabaseServer
    .from('LearningUnit')
    .update({
      isActive: nextActive,
      status: nextActive ? 'PUBLISHED' : 'DRAFT',
      approvalStatus: nextActive ? 'APPROVED' : 'DRAFT',
      publishedBy: nextActive ? ctx.userId : existing.publishedBy,
      publishedAt: nextActive ? now : existing.publishedAt,
      updatedBy: ctx.userId,
      updatedAt: now,
    })
    .eq('id', id)
    .select()
    .single()
  if (updErr) throw updErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'TOGGLE_LEARNING_UNIT_STATUS',
    resourceType: 'LEARNING_UNIT',
    resourceId: id,
    resourceLabel: existing.title,
    permissionUsed: 'content.learning_unit.publish',
    previousValues: { status: existing.status, isActive: existing.isActive },
    updatedValues: { status: updated.status, isActive: updated.isActive },
    changeSummary: `Changed learning unit "${existing.title}" status to ${updated.status}`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, { success: true, message: `Learning Unit is now ${updated.status}.`, data: updated })
}

async function handleDeleteLearningUnit(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.learning_unit.delete')

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Unit ID', message: 'Learning Unit ID is required.' })

  const { data: existing, error: findErr } = await supabaseServer.from('LearningUnit').select('*').eq('id', id).maybeSingle()
  if (findErr) throw findErr
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Learning Unit "${id}" not found.` })

  await requireLearningUnitScope(ctx, id, existing.moduleId)

  const { error: delErr } = await supabaseServer.from('LearningUnit').delete().eq('id', id)
  if (delErr) throw delErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'DELETE_LEARNING_UNIT',
    resourceType: 'LEARNING_UNIT',
    resourceId: id,
    resourceLabel: existing.title,
    permissionUsed: 'content.learning_unit.delete',
    previousValues: { moduleId: existing.moduleId, title: existing.title },
    changeSummary: `Deleted learning unit "${existing.title}"`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, { success: true, message: `Learning Unit "${existing.title}" deleted.` })
}

// ─── 3. Coding Questions ─────────────────────────────────────────────────────

async function handleListQuestions(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  requirePermission(ctx, 'content.question.view')

  const urlObj = new URL(req.url || '/', 'http://localhost')
  const search = typeof body.search === 'string' ? body.search.trim().toLowerCase() : (urlObj.searchParams.get('search') || '').trim().toLowerCase()
  const difficulty = typeof body.difficulty === 'string' ? body.difficulty.trim() : (urlObj.searchParams.get('difficulty') || 'ALL').trim()
  const topic = typeof body.topic === 'string' ? body.topic.trim() : (urlObj.searchParams.get('topic') || 'ALL').trim()
  const statusFilter = typeof body.status === 'string' ? body.status.trim().toUpperCase() : (urlObj.searchParams.get('status') || 'ALL').trim().toUpperCase()
  const learningUnitId = typeof body.learningUnitId === 'string' ? body.learningUnitId.trim() : (urlObj.searchParams.get('learningUnitId') || '').trim()
  const questionTypeRaw = typeof body.questionType === 'string' ? body.questionType.trim().toUpperCase() : (urlObj.searchParams.get('questionType') || 'ALL').trim().toUpperCase()
  const beltParam = typeof body.beltId === 'string' && body.beltId.trim()
    ? body.beltId.trim()
    : (typeof body.belt === 'string' && body.belt.trim() ? body.belt.trim() : (urlObj.searchParams.get('beltId') || urlObj.searchParams.get('belt') || '').trim())
  const requestedPage = Number.parseInt(String(body.page ?? urlObj.searchParams.get('page') ?? '1'), 10)
  const requestedLimit = Number.parseInt(String(body.limit ?? urlObj.searchParams.get('limit') ?? '50'), 10)
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1
  const limit = Number.isFinite(requestedLimit) ? Math.min(100, Math.max(1, requestedLimit)) : 50

  if (learningUnitId) {
    await requireLearningUnitScope(ctx, learningUnitId)
  }

  let resolvedFilterBeltId = ''
  if (beltParam && beltParam !== 'ALL') {
    resolvedFilterBeltId = (await resolveBeltId(beltParam)) || beltParam
  }

  const { data: allProblems, error: problemsError } = await supabaseServer
    .from('Problem')
    .select('id, beltId, learningUnitId, order, title, slug, difficulty, subdivision, isActive, status, approvalStatus, timeLimitMs, memoryLimitMb, examples, starterCodes, createdBy, updatedBy, createdAt, updatedAt')
    .order('createdAt', { ascending: false })

  if (problemsError) throw problemsError

  const scopedProblems = []
  for (const p of allProblems || []) {
    if (questionTypeRaw === 'PRACTICE' && p.learningUnitId) continue
    if ((questionTypeRaw === 'LEARN_CODING' || questionTypeRaw === 'LEARN-CODING') && !p.learningUnitId) continue
    if (await canAccessQuestion(ctx, p)) {
      scopedProblems.push(p)
    }
  }

  const statsSubset = learningUnitId
    ? scopedProblems.filter((p: any) => p.learningUnitId === learningUnitId)
    : resolvedFilterBeltId
      ? scopedProblems.filter((p: any) => p.beltId === resolvedFilterBeltId)
      : scopedProblems
  let totalPublished = 0
  let totalDraft = 0
  const difficultyCounts: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 }
  const topicCounts: Record<string, number> = {}

  for (const problem of statsSubset) {
    const isPub = problem.status === 'PUBLISHED' || (problem.status !== 'DRAFT' && problem.status !== 'PENDING_REVIEW' && problem.status !== 'ARCHIVED' && problem.isActive)
    if (isPub) totalPublished++
    else totalDraft++
    const diff = problem.difficulty || 'Easy'
    if (diff in difficultyCounts) difficultyCounts[diff]++
    const problemTopic = problem.subdivision || 'General'
    topicCounts[problemTopic] = (topicCounts[problemTopic] || 0) + 1
  }

  const filtered = scopedProblems.filter((problem: any) => {
    if (learningUnitId && problem.learningUnitId !== learningUnitId) return false
    if (resolvedFilterBeltId && problem.beltId !== resolvedFilterBeltId) return false
    if (difficulty !== 'ALL' && problem.difficulty !== difficulty) return false
    if (topic !== 'ALL' && (problem.subdivision || 'General') !== topic) return false
    const st = String(problem.status || '').toUpperCase()
    const isPub = st === 'PUBLISHED' || (st !== 'DRAFT' && st !== 'PENDING_REVIEW' && st !== 'ARCHIVED' && problem.isActive)
    if (statusFilter === 'PUBLISHED' && !isPub) return false
    if (statusFilter === 'DRAFT' && (isPub || st === 'PENDING_REVIEW' || st === 'ARCHIVED')) return false
    if (statusFilter === 'PENDING_REVIEW' && st !== 'PENDING_REVIEW' && problem.approvalStatus !== 'PENDING_REVIEW') return false
    if (statusFilter === 'ARCHIVED' && st !== 'ARCHIVED') return false

    if (search) {
      const mTitle = (problem.title || '').toLowerCase().includes(search)
      const mSlug = (problem.slug || '').toLowerCase().includes(search)
      const mTopic = (problem.subdivision || '').toLowerCase().includes(search)
      if (!mTitle && !mSlug && !mTopic) return false
    }
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const currentPage = Math.min(page, totalPages)
  const offset = (currentPage - 1) * limit
  const pageProblems = filtered.slice(offset, offset + limit)
  const pageIds = pageProblems.map((p: any) => p.id)

  const testCaseCounts = new Map<string, { total: number; visible: number; hidden: number }>()
  if (pageIds.length > 0) {
    let tcRes: any = await supabaseServer.from('ProblemTestCase').select('id, problemId, isHidden').in('problemId', pageIds)
    if (tcRes.error || !tcRes.data || tcRes.data.length === 0) {
      tcRes = await supabaseServer.from('TestCase').select('id, problemId, isHidden').in('problemId', pageIds)
    }
    if (tcRes.data) {
      for (const tc of tcRes.data) {
        const counts = testCaseCounts.get(tc.problemId) || { total: 0, visible: 0, hidden: 0 }
        counts.total++
        if (tc.isHidden) counts.hidden++
        else counts.visible++
        testCaseCounts.set(tc.problemId, counts)
      }
    }
  }

  const canSeeHiddenCount = hasContentPermission(ctx.permissions, 'content.hidden_test_case.manage')
  const enrichedQuestions = pageProblems.map((problem: any) => {
    const rawCounts = testCaseCounts.get(problem.id) || { total: 0, visible: 0, hidden: 0 }
    const effectiveCounts = canSeeHiddenCount
      ? rawCounts
      : { total: rawCounts.visible, visible: rawCounts.visible, hidden: 0 }
    const examples = Array.isArray(problem.examples) ? problem.examples : []
    const st = String(problem.status || '').toUpperCase()
    const resolvedStatus = st || (problem.isActive ? 'PUBLISHED' : 'DRAFT')

    return {
      id: problem.id,
      slug: problem.slug,
      title: problem.title,
      difficulty: problem.difficulty,
      topic: problem.subdivision || 'General',
      subdivision: problem.subdivision,
      learningUnitId: problem.learningUnitId || null,
      beltId: problem.beltId || null,
      status: resolvedStatus,
      approvalStatus: problem.approvalStatus || 'APPROVED',
      isActive: Boolean(problem.isActive),
      timeLimitMs: problem.timeLimitMs || 2000,
      memoryLimitMb: problem.memoryLimitMb || 256,
      examples,
      starterCodes: problem.starterCodes || {},
      exampleCount: examples.length,
      testCaseCount: effectiveCounts,
      visibleTestCaseCount: effectiveCounts.visible,
      hiddenTestCaseCount: effectiveCounts.hidden,
      createdAt: problem.createdAt || new Date().toISOString(),
      updatedAt: problem.updatedAt || problem.createdAt || new Date().toISOString(),
    }
  })

  return sendJson(res, 200, {
    success: true,
    message: 'Scoped questions retrieved.',
    data: {
      questions: enrichedQuestions,
      stats: {
        total: statsSubset.length,
        published: totalPublished,
        draft: totalDraft,
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

async function handleGetQuestion(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  requirePermission(ctx, 'content.question.view')

  const urlObj = new URL(req.url || '/', 'http://localhost')
  const idOrSlug = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim()
      ? body.slug.trim()
      : (urlObj.searchParams.get('id') || urlObj.searchParams.get('slug') || '').trim())

  if (!idOrSlug) {
    return sendJson(res, 400, { success: false, error: 'Missing Identifier', message: 'Question ID or slug is required.' })
  }

  const question = await findQuestionByIdOrSlug(idOrSlug)
  if (!question) {
    return sendJson(res, 404, { success: false, error: 'Question Not Found', message: `Question "${idOrSlug}" not found.` })
  }

  await requireQuestionScope(ctx, question)

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

  let rawTestCases: any[] = []
  const { data: ptcRows } = await supabaseServer
    .from('ProblemTestCase')
    .select('*')
    .eq('problemId', question.id)
    .order('displayOrder', { ascending: true })

  if (ptcRows && ptcRows.length > 0) {
    rawTestCases = ptcRows.map((tc: any, idx: number) => ({
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

    rawTestCases = (legacyCases || []).map((tc: any, idx: number) => ({
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

  const { sanitized: testCases, hiddenCount } = sanitizeTestCasesForContext(ctx, rawTestCases)

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

  let revisions: any[] = []
  if (hasContentPermission(ctx.permissions, 'content.revision.view_all') || hasContentPermission(ctx.permissions, 'content.revision.view_own')) {
    const { data: revRows } = await supabaseServer
      .from('ProblemRevision')
      .select('id, version, changeSummary, changedBy, createdAt')
      .eq('problemId', question.id)
      .order('version', { ascending: false })

    const viewAll = hasContentPermission(ctx.permissions, 'content.revision.view_all')
    revisions = (revRows || []).filter(
      (r: any) => viewAll || r.changedBy === ctx.userId || r.changedBy === ctx.email
    )
  }

  const visibleCount = testCases.filter((tc) => !tc.isHidden).length
  const canSeeHidden = hasContentPermission(ctx.permissions, 'content.hidden_test_case.manage')

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
      status: question.status || (question.isActive ? 'PUBLISHED' : 'DRAFT'),
      approvalStatus: question.approvalStatus || 'APPROVED',
      reviewNotes: question.reviewNotes || null,
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
        total: canSeeHidden ? rawTestCases.length : visibleCount,
        visible: visibleCount,
        hidden: canSeeHidden ? hiddenCount : 0,
      },
      revisions,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    },
  })
}

async function handleGetQuestionPreview(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  requirePermission(ctx, 'content.question.preview')

  const urlObj = new URL(req.url || '/', 'http://localhost')
  const idOrSlug = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim()
      ? body.slug.trim()
      : (urlObj.searchParams.get('id') || urlObj.searchParams.get('slug') || '').trim())

  if (!idOrSlug) {
    return sendJson(res, 400, { success: false, error: 'Missing Identifier', message: 'Question ID or slug is required.' })
  }

  const question = await findQuestionByIdOrSlug(idOrSlug)
  if (!question) {
    return sendJson(res, 404, { success: false, error: 'Question Not Found', message: `Question "${idOrSlug}" not found.` })
  }

  await requireQuestionScope(ctx, question)

  let examples: any[] = []
  const { data: peRows } = await supabaseServer
    .from('ProblemExample')
    .select('*')
    .eq('problemId', question.id)
    .order('displayOrder', { ascending: true })

  if (peRows && peRows.length > 0) {
    examples = peRows.map((pe: any, idx: number) => ({
      label: `Example ${pe.displayOrder || idx + 1}`,
      input: pe.input || '',
      output: pe.expectedOutput || '',
      explanation: pe.explanation || '',
    }))
  } else if (Array.isArray(question.examples)) {
    examples = question.examples
  }

  // Strictly public test cases ONLY on preview
  let publicTestCases: any[] = []
  let hiddenCount = 0
  const { data: ptcCases } = await supabaseServer
    .from('ProblemTestCase')
    .select('id, displayOrder, input, expectedOutput, explanation, isHidden, points')
    .eq('problemId', question.id)
    .order('displayOrder', { ascending: true })

  if (ptcCases && ptcCases.length > 0) {
    hiddenCount = ptcCases.filter((tc: any) => tc.isHidden).length
    publicTestCases = ptcCases
      .filter((tc: any) => !tc.isHidden)
      .map((tc: any, idx: number) => ({
        testIndex: tc.displayOrder || idx + 1,
        input: tc.input || '',
        expectedOutput: tc.expectedOutput || '',
        explanation: tc.explanation || '',
        isHidden: false,
      }))
  } else {
    const { data: lCases } = await supabaseServer
      .from('TestCase')
      .select('testIndex, input, expectedOutput, explanation, isHidden')
      .eq('problemId', question.id)
      .order('testIndex', { ascending: true })
    hiddenCount = (lCases || []).filter((tc: any) => tc.isHidden).length
    publicTestCases = (lCases || [])
      .filter((tc: any) => !tc.isHidden)
      .map((tc: any, idx: number) => ({
        testIndex: tc.testIndex || idx + 1,
        input: tc.input || '',
        expectedOutput: tc.expectedOutput || '',
        explanation: tc.explanation || '',
        isHidden: false,
      }))
  }

  return sendJson(res, 200, {
    success: true,
    message: 'Student preview payload generated (hidden test cases strictly masked).',
    data: {
      id: question.id,
      slug: question.slug,
      title: question.title,
      difficulty: question.difficulty,
      subdivision: question.subdivision,
      description: question.description,
      inputFormat: question.inputFormat,
      outputFormat: question.outputFormat,
      constraints: question.explanation || '',
      timeLimitMs: question.timeLimitMs || 2000,
      memoryLimitMb: question.memoryLimitMb || 256,
      examples,
      publicTestCases,
      hiddenTestCaseCount: hiddenCount,
      starterCodes: question.starterCodes || {},
    },
  })
}

async function handleCreateQuestion(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.question.create')

  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const slug = typeof body.slug === 'string' ? body.slug.trim().toLowerCase() : ''
  const difficulty = typeof body.difficulty === 'string' ? body.difficulty.trim() : 'Easy'
  const topic = typeof body.topic === 'string' ? body.topic.trim() : (typeof body.subdivision === 'string' ? body.subdivision.trim() : 'General')
  const description = typeof body.description === 'string' ? body.description.trim() : ''
  const inputFormat = typeof body.inputFormat === 'string' ? body.inputFormat.trim() : ''
  const outputFormat = typeof body.outputFormat === 'string' ? body.outputFormat.trim() : ''
  const constraints = typeof body.constraints === 'string' ? body.constraints.trim() : ''
  const timeLimitMs = typeof body.timeLimitMs === 'number' && body.timeLimitMs > 0 ? body.timeLimitMs : 2000
  const memoryLimitMb = typeof body.memoryLimitMb === 'number' && body.memoryLimitMb > 0 ? body.memoryLimitMb : 256
  const examples = Array.isArray(body.examples) ? body.examples : []
  const testCases = Array.isArray(body.testCases) ? body.testCases : []

  // Publication permission check
  const canPublish = hasContentPermission(ctx.permissions, 'content.question.publish')
  const rawStatus = typeof body.status === 'string' ? body.status.trim().toUpperCase() : ''
  const submitForReview = body.submitForReview === true || rawStatus === 'PENDING_REVIEW'

  if ((rawStatus === 'PUBLISHED' || body.isActive === true) && !canPublish) {
    return sendJson(res, 403, {
      success: false,
      error: 'Permission Denied',
      message: 'Missing permission "content.question.publish". Content Managers without publish permission must save as DRAFT or submit for review.',
    })
  }

  // Hidden test case permission check
  if (testCases.some((tc: any) => Boolean(tc?.isHidden))) {
    requirePermission(ctx, 'content.hidden_test_case.manage')
  }
  if (testCases.length > 0) {
    requirePermission(ctx, 'content.test_case.manage')
  }
  if (examples.length > 0) {
    requirePermission(ctx, 'content.example.manage')
  }
  if (body.starterCodes && typeof body.starterCodes === 'object') {
    requirePermission(ctx, 'content.starter_code.manage')
  }

  // Scope enforcement
  const learningUnitId = typeof body.learningUnitId === 'string' && body.learningUnitId.trim()
    ? body.learningUnitId.trim()
    : null

  if (ctx.scopeType !== 'GLOBAL') {
    if (!learningUnitId) {
      return sendJson(res, 403, {
        success: false,
        error: 'Scope Denied',
        message: 'Scoped Content Managers must assign new coding questions to an authorized Learning Unit.',
      })
    }
    await requireLearningUnitScope(ctx, learningUnitId)
  }

  if (learningUnitId) {
    const { data: unit, error: unitErr } = await supabaseServer
      .from('LearningUnit')
      .select('id')
      .eq('id', learningUnitId)
      .maybeSingle()
    if (unitErr) throw unitErr
    if (!unit) {
      return sendJson(res, 404, { success: false, error: 'Learning Unit Not Found', message: `Learning Unit "${learningUnitId}" does not exist.` })
    }
  }

  if (!title || title.length < 3) {
    return sendJson(res, 400, { success: false, error: 'Invalid Title', message: 'Question title must be at least 3 characters long.' })
  }
  if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return sendJson(res, 400, { success: false, error: 'Invalid Slug', message: 'Slug must contain only lowercase alphanumeric characters and hyphens.' })
  }
  if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
    return sendJson(res, 400, { success: false, error: 'Invalid Difficulty', message: 'Difficulty must be "Easy", "Medium", or "Hard".' })
  }
  if (!description) {
    return sendJson(res, 400, { success: false, error: 'Missing Description', message: 'Problem description is required.' })
  }
  if (testCases.length === 0) {
    return sendJson(res, 400, { success: false, error: 'Missing Test Cases', message: 'At least one test case is required.' })
  }

  const { data: existingList } = await supabaseServer.from('Problem').select('id, slug')
  if ((existingList || []).some((p: any) => p.slug === slug)) {
    return sendJson(res, 409, { success: false, error: 'Slug Conflict', message: `A question with slug "${slug}" already exists.` })
  }

  const isPublished = canPublish && (rawStatus === 'PUBLISHED' || body.isActive === true)
  const finalStatus = isPublished ? 'PUBLISHED' : submitForReview ? 'PENDING_REVIEW' : 'DRAFT'
  const approvalStatus = isPublished ? 'APPROVED' : submitForReview ? 'PENDING_REVIEW' : 'DRAFT'
  const now = new Date().toISOString()
  const problemId = `prob-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`

  const starterCodes = body.starterCodes || {
    python: '# Language: Python 3\nimport sys\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()\n',
    javascript: '// Language: JavaScript (Node.js)\nconst fs = require("fs");\nfunction solve() {}\nsolve();\n',
  }

  const legacyExamples = examples.map((ex: any, idx: number) => ({
    label: ex.label || `Example ${idx + 1}`,
    input: ex.input || '',
    output: ex.output || ex.expectedOutput || '',
    explanation: ex.explanation || '',
  }))

  const beltId = learningUnitId ? null : await resolveBeltId(body.beltId)
  const order = typeof body.order === 'number' && !isNaN(body.order) ? body.order : 1

  const { data: createdProb, error: probErr } = await supabaseServer
    .from('Problem')
    .insert({
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
      isActive: isPublished,
      submittedForReviewAt: submitForReview ? now : null,
      submittedForReviewBy: submitForReview ? ctx.userId : null,
      publishedAt: isPublished ? now : null,
      publishedBy: isPublished ? ctx.userId : null,
      examples: legacyExamples,
      starterCodes,
      createdBy: ctx.userId,
      updatedBy: ctx.userId,
      createdAt: now,
      updatedAt: now,
    })
    .select()
    .single()
  if (probErr) throw probErr

  const peRows = examples.map((ex: any, idx: number) => ({
    id: `pe-${problemId}-${idx + 1}`,
    problemId,
    input: ex.input || '',
    expectedOutput: ex.output || ex.expectedOutput || '',
    explanation: ex.explanation || null,
    displayOrder: idx + 1,
    createdAt: now,
    updatedAt: now,
  }))
  if (peRows.length > 0) await supabaseServer.from('ProblemExample').insert(peRows)

  const ptcRows = testCases.map((tc: any, idx: number) => ({
    id: `ptc-${problemId}-${idx + 1}`,
    problemId,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    isHidden: Boolean(tc.isHidden),
    displayOrder: tc.displayOrder || tc.testIndex || idx + 1,
    points: typeof tc.points === 'number' ? tc.points : 10,
    explanation: tc.explanation || tc.description || null,
    createdAt: now,
    updatedAt: now,
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

  const pscRows = Object.entries(starterCodes).map(([lang, code]) => ({
    id: `psc-${problemId}-${lang}`,
    problemId,
    language: lang,
    code: String(code),
    createdAt: now,
    updatedAt: now,
  }))
  if (pscRows.length > 0) await supabaseServer.from('ProblemStarterCode').insert(pscRows)

  if (isPublished) {
    registerCustomSuite(slug, {
      title,
      testCases: ptcRows.map((r: any) => ({
        testIndex: r.displayOrder,
        input: r.input,
        expectedOutput: r.expectedOutput,
        isHidden: r.isHidden,
      })),
    })
  }

  await supabaseServer.from('ProblemRevision').insert({
    id: `rev-${problemId}-1`,
    problemId,
    version: 1,
    snapshot: {
      problem: createdProb,
      examples: legacyExamples,
      testCases: ptcRows,
      starterCodes,
    },
    changedBy: ctx.userId,
    changeSummary: typeof body.changeSummary === 'string' && body.changeSummary.trim()
      ? body.changeSummary.trim()
      : `Created question (${finalStatus})`,
    createdAt: now,
  })

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'CREATE_QUESTION',
    resourceType: 'PROBLEM',
    resourceId: problemId,
    resourceLabel: `${title} (${slug})`,
    permissionUsed: 'content.question.create',
    updatedValues: { title, slug, learningUnitId, status: finalStatus, approvalStatus },
    changeSummary: `Created question "${title}" with status ${finalStatus}`,
    ipAddress: clientIp,
  })

  return sendJson(res, 201, {
    success: true,
    message: `Question "${title}" created (${finalStatus}).`,
    data: {
      ...createdProb,
      examples: peRows,
      testCases: ptcRows,
      testCaseCount: {
        total: ptcRows.length,
        visible: ptcRows.filter((c: any) => !c.isHidden).length,
        hidden: ptcRows.filter((c: any) => c.isHidden).length,
      },
    },
  })
}

async function handleUpdateQuestion(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.question.update')

  const id = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.slug === 'string' && body.slug.trim() ? body.slug.trim() : '')

  if (!id) {
    return sendJson(res, 400, { success: false, error: 'Missing Identifier', message: 'Question ID or slug is required.' })
  }

  const existing = await findQuestionByIdOrSlug(id)
  if (!existing) {
    return sendJson(res, 404, { success: false, error: 'Question Not Found', message: `Question "${id}" not found.` })
  }

  await requireQuestionScope(ctx, existing)

  const now = new Date().toISOString()
  const updates: Record<string, any> = {
    updatedBy: ctx.userId,
    updatedAt: now,
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
  if (typeof body.order === 'number' && !isNaN(body.order)) updates.order = body.order
  if ('beltId' in body && !updates.learningUnitId && !(existing.learningUnitId && body.learningUnitId === undefined)) {
    updates.beltId = body.beltId ? await resolveBeltId(body.beltId) : null
  }

  // Validate moving between learning units
  if (body.learningUnitId !== undefined && body.learningUnitId !== existing.learningUnitId) {
    if (typeof body.learningUnitId === 'string' && body.learningUnitId.trim()) {
      const targetLid = body.learningUnitId.trim()
      await requireLearningUnitScope(ctx, targetLid)
      const { data: unit } = await supabaseServer.from('LearningUnit').select('id').eq('id', targetLid).maybeSingle()
      if (!unit) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Learning Unit "${targetLid}" not found.` })
      updates.learningUnitId = targetLid
    } else if (ctx.scopeType === 'GLOBAL') {
      updates.learningUnitId = null
    } else {
      return sendJson(res, 403, { success: false, error: 'Scope Denied', message: 'Scoped Content Managers cannot detach questions from learning units.' })
    }
  }

  // Status & publication transition validation
  const canPublish = hasContentPermission(ctx.permissions, 'content.question.publish')
  const canArchive = hasContentPermission(ctx.permissions, 'content.question.archive')
  const existingStatus = String(existing.status || (existing.isActive ? 'PUBLISHED' : 'DRAFT')).toUpperCase()

  if (typeof body.status === 'string') {
    const reqStatus = body.status.trim().toUpperCase()
    if (reqStatus !== existingStatus) {
      if (reqStatus === 'PUBLISHED') {
        if (!canPublish) {
          return sendJson(res, 403, {
            success: false,
            error: 'Permission Denied',
            message: 'Missing permission "content.question.publish". Submit for Super Admin review instead.',
          })
        }
        updates.status = 'PUBLISHED'
        updates.isActive = true
        updates.approvalStatus = 'APPROVED'
        updates.publishedAt = now
        updates.publishedBy = ctx.userId
      } else if (reqStatus === 'ARCHIVED') {
        if (!canArchive) {
          return sendJson(res, 403, {
            success: false,
            error: 'Permission Denied',
            message: 'Missing permission "content.question.archive".',
          })
        }
        updates.status = 'ARCHIVED'
        updates.isActive = false
      } else if (reqStatus === 'PENDING_REVIEW') {
        updates.status = existingStatus === 'PUBLISHED' ? 'PUBLISHED' : 'PENDING_REVIEW'
        updates.approvalStatus = 'PENDING_REVIEW'
        updates.submittedForReviewAt = now
        updates.submittedForReviewBy = ctx.userId
      } else if (reqStatus === 'DRAFT') {
        if (existingStatus === 'PUBLISHED' && !canPublish && !canArchive) {
          return sendJson(res, 403, {
            success: false,
            error: 'Permission Denied',
            message: 'Cannot unpublish a live question without publish or archive permission.',
          })
        }
        updates.status = 'DRAFT'
        updates.isActive = false
        updates.approvalStatus = 'DRAFT'
      }
    }
  } else if (body.submitForReview === true) {
    updates.approvalStatus = 'PENDING_REVIEW'
    updates.submittedForReviewAt = now
    updates.submittedForReviewBy = ctx.userId
    if (existingStatus !== 'PUBLISHED') {
      updates.status = 'PENDING_REVIEW'
      updates.isActive = false
    }
  }

  // Examples update
  let currentExamples = existing.examples || []
  if (Array.isArray(body.examples)) {
    requirePermission(ctx, 'content.example.manage')
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
      createdAt: now,
      updatedAt: now,
    }))
    if (peRows.length > 0) await supabaseServer.from('ProblemExample').insert(peRows)
  }

  // Test Cases update (preserving hidden cases if caller lacks hidden_test_case.manage)
  let currentTestCases: any[] = []
  if (Array.isArray(body.testCases) && body.testCases.length > 0) {
    requirePermission(ctx, 'content.test_case.manage')
    const canManageHidden = hasContentPermission(ctx.permissions, 'content.hidden_test_case.manage')

    if (!canManageHidden && body.testCases.some((tc: any) => Boolean(tc?.isHidden))) {
      return sendJson(res, 403, {
        success: false,
        error: 'Permission Denied',
        message: 'Missing permission "content.hidden_test_case.manage" to modify or add hidden test cases.',
      })
    }

    let casesToSave = body.testCases
    if (!canManageHidden) {
      // Preserve existing hidden test cases intact
      const { data: existingPtc } = await supabaseServer.from('ProblemTestCase').select('*').eq('problemId', existing.id)
      const existingHidden = (existingPtc || []).filter((tc: any) => Boolean(tc.isHidden))
      casesToSave = [...body.testCases.filter((tc: any) => !tc.isHidden), ...existingHidden]
    }

    await supabaseServer.from('ProblemTestCase').delete().eq('problemId', existing.id)
    await supabaseServer.from('TestCase').delete().eq('problemId', existing.id)

    const ptcRows = casesToSave.map((tc: any, idx: number) => ({
      id: `ptc-${existing.id}-${idx + 1}`,
      problemId: existing.id,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      isHidden: Boolean(tc.isHidden),
      displayOrder: tc.displayOrder || tc.testIndex || idx + 1,
      points: typeof tc.points === 'number' ? tc.points : 10,
      explanation: tc.explanation || tc.description || null,
      createdAt: now,
      updatedAt: now,
    }))
    await supabaseServer.from('ProblemTestCase').insert(ptcRows)

    const legacyRows = casesToSave.map((tc: any, idx: number) => ({
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

    if ((updates.status || existingStatus) === 'PUBLISHED') {
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
  }

  // Starter Code update
  let currentStarterCodes = existing.starterCodes || {}
  if (body.starterCodes && typeof body.starterCodes === 'object') {
    requirePermission(ctx, 'content.starter_code.manage')
    currentStarterCodes = { ...body.starterCodes }
    updates.starterCodes = currentStarterCodes

    await supabaseServer.from('ProblemStarterCode').delete().eq('problemId', existing.id)
    const pscRows = Object.entries(body.starterCodes).map(([lang, code]) => ({
      id: `psc-${existing.id}-${lang}`,
      problemId: existing.id,
      language: lang,
      code: String(code),
      createdAt: now,
      updatedAt: now,
    }))
    if (pscRows.length > 0) await supabaseServer.from('ProblemStarterCode').insert(pscRows)
  }

  const { data: updated, error: updErr } = await supabaseServer
    .from('Problem')
    .update(updates)
    .eq('id', existing.id)
    .select()
    .single()
  if (updErr) throw updErr

  const { data: revList } = await supabaseServer.from('ProblemRevision').select('version').eq('problemId', existing.id)
  const maxVer = (revList || []).reduce((max: number, r: any) => Math.max(max, r.version || 0), 0)
  const nextVer = maxVer + 1
  const changeSummary = typeof body.changeSummary === 'string' && body.changeSummary.trim()
    ? body.changeSummary.trim()
    : 'Updated question via Content Manager'

  if (currentTestCases.length === 0) {
    const { data: dbCases } = await supabaseServer.from('ProblemTestCase').select('*').eq('problemId', existing.id)
    currentTestCases = dbCases || []
  }

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
    changedBy: ctx.userId,
    changeSummary,
    createdAt: now,
  })

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'UPDATE_QUESTION',
    resourceType: 'PROBLEM',
    resourceId: existing.id,
    resourceLabel: `${updates.title || existing.title} (${existing.slug})`,
    permissionUsed: 'content.question.update',
    previousValues: { title: existing.title, status: existing.status, approvalStatus: existing.approvalStatus },
    updatedValues: { ...updates, revisionVersion: nextVer },
    changeSummary,
    ipAddress: clientIp,
  })

  const { sanitized, hiddenCount } = sanitizeTestCasesForContext(ctx, currentTestCases)
  const canSeeHidden = hasContentPermission(ctx.permissions, 'content.hidden_test_case.manage')

  return sendJson(res, 200, {
    success: true,
    message: `Question "${updates.title || existing.title}" updated.`,
    data: {
      ...updated,
      testCases: sanitized,
      testCaseCount: {
        total: canSeeHidden ? currentTestCases.length : sanitized.length,
        visible: sanitized.filter((c: any) => !c.isHidden).length,
        hidden: canSeeHidden ? hiddenCount : 0,
      },
    },
  })
}

async function handleSubmitQuestionForReview(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.question.update')

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Question ID', message: 'Question ID is required.' })

  const existing = await findQuestionByIdOrSlug(id)
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Question "${id}" not found.` })

  await requireQuestionScope(ctx, existing)

  const now = new Date().toISOString()
  const existingStatus = String(existing.status || '').toUpperCase()
  const nextStatus = existingStatus === 'PUBLISHED' ? 'PUBLISHED' : 'PENDING_REVIEW'

  const { data: updated, error: updErr } = await supabaseServer
    .from('Problem')
    .update({
      status: nextStatus,
      approvalStatus: 'PENDING_REVIEW',
      submittedForReviewAt: now,
      submittedForReviewBy: ctx.userId,
      updatedBy: ctx.userId,
      updatedAt: now,
    })
    .eq('id', existing.id)
    .select()
    .single()
  if (updErr) throw updErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'SUBMIT_QUESTION_FOR_REVIEW',
    resourceType: 'PROBLEM',
    resourceId: existing.id,
    resourceLabel: `${existing.title} (${existing.slug})`,
    permissionUsed: 'content.question.update',
    previousValues: { approvalStatus: existing.approvalStatus, status: existing.status },
    updatedValues: { approvalStatus: 'PENDING_REVIEW', status: nextStatus },
    changeSummary: typeof body.changeSummary === 'string' && body.changeSummary.trim()
      ? body.changeSummary.trim()
      : `Submitted "${existing.title}" for Super Admin publication review`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, {
    success: true,
    message: `Question "${existing.title}" submitted for review.`,
    data: updated,
  })
}

async function handleDuplicateQuestion(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.question.duplicate')
  requirePermission(ctx, 'content.question.create')

  const sourceId = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.sourceId === 'string' && body.sourceId.trim() ? body.sourceId.trim() : '')
  if (!sourceId) return sendJson(res, 400, { success: false, error: 'Missing Source ID', message: 'Source question ID is required.' })

  const source = await findQuestionByIdOrSlug(sourceId)
  if (!source) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Question "${sourceId}" not found.` })

  await requireQuestionScope(ctx, source)

  const newProblemId = `prob-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const newSlug = `${source.slug}-copy-${Math.random().toString(36).substring(2, 6)}`
  const newTitle = `${source.title} (Copy)`
  const now = new Date().toISOString()

  const { data: created, error: createErr } = await supabaseServer
    .from('Problem')
    .insert({
      id: newProblemId,
      beltId: source.beltId,
      learningUnitId: source.learningUnitId,
      order: (source.order || 1) + 1,
      slug: newSlug,
      title: newTitle,
      difficulty: source.difficulty,
      subdivision: source.subdivision,
      description: source.description,
      inputFormat: source.inputFormat,
      outputFormat: source.outputFormat,
      explanation: source.explanation,
      timeLimitMs: source.timeLimitMs || 2000,
      memoryLimitMb: source.memoryLimitMb || 256,
      status: 'DRAFT',
      approvalStatus: 'DRAFT',
      isActive: false,
      examples: source.examples || [],
      starterCodes: source.starterCodes || {},
      createdBy: ctx.userId,
      updatedBy: ctx.userId,
      createdAt: now,
      updatedAt: now,
    })
    .select()
    .single()
  if (createErr) throw createErr

  const { data: sourceExamples } = await supabaseServer.from('ProblemExample').select('*').eq('problemId', source.id)
  if (sourceExamples && sourceExamples.length > 0) {
    await supabaseServer.from('ProblemExample').insert(
      sourceExamples.map((ex: any, idx: number) => ({
        id: `pe-${newProblemId}-${idx + 1}`,
        problemId: newProblemId,
        input: ex.input,
        expectedOutput: ex.expectedOutput,
        explanation: ex.explanation,
        displayOrder: ex.displayOrder || idx + 1,
        createdAt: now,
        updatedAt: now,
      }))
    )
  }

  let { data: sourceCases } = await supabaseServer.from('ProblemTestCase').select('*').eq('problemId', source.id)
  if (!sourceCases || sourceCases.length === 0) {
    const { data: lCases } = await supabaseServer.from('TestCase').select('*').eq('problemId', source.id)
    sourceCases = lCases || []
  }

  const canCopyHidden = hasContentPermission(ctx.permissions, 'content.hidden_test_case.manage')
  const casesToClone = canCopyHidden ? sourceCases : sourceCases.filter((tc: any) => !tc.isHidden)

  if (casesToClone.length > 0) {
    await supabaseServer.from('ProblemTestCase').insert(
      casesToClone.map((tc: any, idx: number) => ({
        id: `ptc-${newProblemId}-${idx + 1}`,
        problemId: newProblemId,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isHidden: Boolean(tc.isHidden),
        displayOrder: tc.displayOrder || tc.testIndex || idx + 1,
        points: tc.points ?? 10,
        explanation: tc.explanation || null,
        createdAt: now,
        updatedAt: now,
      }))
    )
    await supabaseServer.from('TestCase').insert(
      casesToClone.map((tc: any, idx: number) => ({
        id: `tc-${newProblemId}-${idx + 1}`,
        problemId: newProblemId,
        testIndex: tc.testIndex || tc.displayOrder || idx + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        explanation: tc.explanation || null,
        isHidden: Boolean(tc.isHidden),
      }))
    )
  }

  await supabaseServer.from('ProblemRevision').insert({
    id: `rev-${newProblemId}-1`,
    problemId: newProblemId,
    version: 1,
    snapshot: { problem: created, examples: sourceExamples || [], testCases: casesToClone, starterCodes: source.starterCodes || {} },
    changedBy: ctx.userId,
    changeSummary: `Duplicated from "${source.title}" (${source.slug})`,
    createdAt: now,
  })

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'DUPLICATE_QUESTION',
    resourceType: 'PROBLEM',
    resourceId: newProblemId,
    resourceLabel: newTitle,
    permissionUsed: 'content.question.duplicate',
    updatedValues: { sourceId: source.id, newSlug },
    changeSummary: `Duplicated "${source.title}" into draft "${newTitle}"`,
    ipAddress: clientIp,
  })

  return sendJson(res, 201, {
    success: true,
    message: `Question duplicated into draft "${newTitle}".`,
    data: created,
  })
}

async function handleToggleQuestionStatus(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  const id = typeof body.id === 'string' && body.id.trim() ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Question ID', message: 'Question ID is required.' })

  const existing = await findQuestionByIdOrSlug(id)
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Question "${id}" not found.` })

  await requireQuestionScope(ctx, existing)

  const requestedStatus = typeof body.status === 'string' ? body.status.toUpperCase() : ''
  const nextActive = requestedStatus
    ? requestedStatus === 'PUBLISHED'
    : typeof body.isActive === 'boolean'
    ? body.isActive
    : !(existing.status === 'PUBLISHED' || existing.isActive)

  if (nextActive) {
    requirePermission(ctx, 'content.question.publish')
  } else {
    requireAnyPermission(ctx, ['content.question.publish', 'content.question.archive'])
  }

  const finalStatus = requestedStatus || (nextActive ? 'PUBLISHED' : 'DRAFT')
  const now = new Date().toISOString()

  const { data: updated, error: updErr } = await supabaseServer
    .from('Problem')
    .update({
      isActive: nextActive,
      status: finalStatus,
      approvalStatus: nextActive ? 'APPROVED' : finalStatus === 'ARCHIVED' ? 'REJECTED' : 'DRAFT',
      publishedAt: nextActive ? now : existing.publishedAt,
      publishedBy: nextActive ? ctx.userId : existing.publishedBy,
      updatedBy: ctx.userId,
      updatedAt: now,
    })
    .eq('id', existing.id)
    .select()
    .single()
  if (updErr) throw updErr

  if (!nextActive) unregisterCustomSuite(existing.slug)

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'TOGGLE_QUESTION_STATUS',
    resourceType: 'PROBLEM',
    resourceId: existing.id,
    resourceLabel: `${existing.title} (${existing.slug})`,
    permissionUsed: nextActive ? 'content.question.publish' : 'content.question.archive',
    previousValues: { status: existing.status, isActive: existing.isActive },
    updatedValues: { status: finalStatus, isActive: nextActive },
    changeSummary: `Changed question "${existing.title}" status to ${finalStatus}`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, {
    success: true,
    message: `Question "${existing.title}" is now ${finalStatus}.`,
    data: updated,
  })
}

async function handleRestoreQuestion(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  const id = typeof body.id === 'string' && body.id.trim() ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Question ID', message: 'Question ID is required.' })

  const existing = await findQuestionByIdOrSlug(id)
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Question "${id}" not found.` })

  await requireQuestionScope(ctx, existing)
  requireAnyPermission(ctx, ['content.question.archive', 'content.question.create', 'content.question.update'])

  const now = new Date().toISOString()
  const { data: updated, error: updErr } = await supabaseServer
    .from('Problem')
    .update({
      isActive: false,
      status: 'DRAFT',
      approvalStatus: 'DRAFT',
      updatedBy: ctx.userId,
      updatedAt: now,
    })
    .eq('id', existing.id)
    .select()
    .single()

  if (updErr) throw updErr

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'RESTORE_QUESTION',
    resourceType: 'PROBLEM',
    resourceId: existing.id,
    resourceLabel: `${existing.title} (${existing.slug})`,
    permissionUsed: 'content.question.archive',
    previousValues: { status: existing.status, isActive: existing.isActive },
    updatedValues: { status: 'DRAFT', isActive: false },
    changeSummary: `Restored question "${existing.title}" from archived to draft`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, {
    success: true,
    message: `Question "${existing.title}" restored to draft.`,
    data: updated,
  })
}

async function handleDeleteQuestion(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.question.delete')

  const id = typeof body.id === 'string' && body.id.trim() ? body.id.trim() : ''
  if (!id) return sendJson(res, 400, { success: false, error: 'Missing Question ID', message: 'Question ID is required.' })

  const existing = await findQuestionByIdOrSlug(id)
  if (!existing) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Question "${id}" not found.` })

  await requireQuestionScope(ctx, existing)

  await supabaseServer.from('ProblemExample').delete().eq('problemId', existing.id)
  await supabaseServer.from('ProblemTestCase').delete().eq('problemId', existing.id)
  await supabaseServer.from('TestCase').delete().eq('problemId', existing.id)
  await supabaseServer.from('ProblemStarterCode').delete().eq('problemId', existing.id)
  await supabaseServer.from('ProblemRevision').delete().eq('problemId', existing.id)
  const { error: delErr } = await supabaseServer.from('Problem').delete().eq('id', existing.id)
  if (delErr) throw delErr

  unregisterCustomSuite(existing.slug)

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'DELETE_QUESTION',
    resourceType: 'PROBLEM',
    resourceId: existing.id,
    resourceLabel: `${existing.title} (${existing.slug})`,
    permissionUsed: 'content.question.delete',
    previousValues: { title: existing.title, slug: existing.slug },
    changeSummary: `Deleted question "${existing.title}"`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, { success: true, message: `Question "${existing.title}" deleted.` })
}

async function handleRunQuestionTests(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  requirePermission(ctx, 'content.question.run_tests')

  const code = typeof body.code === 'string' ? body.code : ''
  if (!code.trim()) return sendJson(res, 400, { success: false, error: 'Missing Code', message: 'Source code is required.' })
  if (code.length > 65536) return sendJson(res, 400, { success: false, error: 'Payload Too Large', message: 'Code exceeds 64KB limit.' })

  const rawLanguage = typeof body.language === 'string' ? body.language : 'python'
  const normLang = normalizeLanguage(rawLanguage)
  if (!normLang) {
    return sendJson(res, 400, { success: false, error: 'Unsupported Language', message: `Unsupported language "${rawLanguage}".` })
  }

  const filter = typeof body.filter === 'string' ? body.filter.toLowerCase() : 'all'
  const canViewHidden = hasContentPermission(ctx.permissions, 'content.hidden_test_case.manage')

  if (filter === 'hidden' && !canViewHidden) {
    return sendJson(res, 403, {
      success: false,
      error: 'Permission Denied',
      message: 'Missing permission "content.hidden_test_case.manage" to run isolated hidden test cases.',
    })
  }

  let rawCases: Array<{ testIndex?: number; input: string; expectedOutput: string; isHidden?: boolean; description?: string }> = []

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
      : (typeof body.slug === 'string' && body.slug.trim() ? body.slug.trim() : '')

    if (!idOrSlug) {
      return sendJson(res, 400, { success: false, error: 'Missing Test Cases', message: 'testCases or question id/slug is required.' })
    }

    const found = await findQuestionByIdOrSlug(idOrSlug)
    if (!found) return sendJson(res, 404, { success: false, error: 'Question Not Found', message: `Question "${idOrSlug}" not found.` })
    await requireQuestionScope(ctx, found)

    const { data: ptcCases } = await supabaseServer.from('ProblemTestCase').select('*').eq('problemId', found.id).order('displayOrder', { ascending: true })
    if (ptcCases && ptcCases.length > 0) {
      rawCases = ptcCases.map((tc: any, idx: number) => ({
        testIndex: tc.displayOrder ?? idx + 1,
        input: tc.input || '',
        expectedOutput: tc.expectedOutput || '',
        isHidden: Boolean(tc.isHidden),
        description: tc.explanation || '',
      }))
    } else {
      const { data: lCases } = await supabaseServer.from('TestCase').select('*').eq('problemId', found.id).order('testIndex', { ascending: true })
      rawCases = (lCases || []).map((tc: any, idx: number) => ({
        testIndex: tc.testIndex ?? idx + 1,
        input: tc.input || '',
        expectedOutput: tc.expectedOutput || '',
        isHidden: Boolean(tc.isHidden),
        description: tc.explanation || '',
      }))
    }
  }

  let casesToRun = rawCases
  if (filter === 'public') casesToRun = rawCases.filter((tc) => !tc.isHidden)
  else if (filter === 'hidden') casesToRun = rawCases.filter((tc) => tc.isHidden)

  if (casesToRun.length === 0) {
    return sendJson(res, 400, { success: false, error: 'No Matching Test Cases', message: 'No test cases match the requested filter.' })
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
        results: casesToRun.map((tc, idx) => {
          const hidePayload = Boolean(tc.isHidden) && !canViewHidden
          return {
            testIndex: tc.testIndex ?? idx + 1,
            isHidden: Boolean(tc.isHidden),
            description: tc.description || (tc.isHidden ? 'Hidden validation test' : 'Public sample test'),
            input: hidePayload ? '[HIDDEN]' : tc.input,
            expectedOutput: hidePayload ? '[HIDDEN]' : tc.expectedOutput,
            actualOutput: '',
            executionTimeMs: 0,
            status: 'runtime_error',
            passed: false,
            error: outcome.error,
          }
        }),
      },
    })
  }

  const testResults = casesToRun.map((tc, idx) => {
    const r = outcome.cases[idx] || { output: '', kind: 'runtime_error', ms: 0, error: 'No response' }
    let caseStatus: 'passed' | 'failed' | 'runtime_error' | 'time_limit_exceeded' = 'passed'
    const matches = outputsMatch(r.output, tc.expectedOutput)
    if (r.kind === 'timeout') caseStatus = 'time_limit_exceeded'
    else if (r.kind === 'runtime_error' || r.kind === 'memory') caseStatus = 'runtime_error'
    else caseStatus = matches ? 'passed' : 'failed'

    const passed = caseStatus === 'passed'
    const hidePayload = Boolean(tc.isHidden) && !canViewHidden
    return {
      testIndex: tc.testIndex ?? idx + 1,
      passed,
      status: caseStatus,
      isHidden: Boolean(tc.isHidden),
      description: tc.description || (tc.isHidden ? 'Hidden validation test' : 'Public sample test'),
      input: hidePayload ? '[HIDDEN]' : tc.input,
      expectedOutput: hidePayload ? '[HIDDEN]' : tc.expectedOutput,
      actualOutput: hidePayload ? (passed ? '[PASSED]' : '[FAILED]') : (r.output || ''),
      error: hidePayload ? (r.error ? 'Execution error on hidden test' : null) : (r.error || null),
      executionTimeMs: r.ms || 0,
    }
  })

  const passedCount = testResults.filter((r) => r.passed).length
  const allPassed = passedCount === testResults.length
  let overallStatus = 'ACCEPTED'
  if (!allPassed) {
    if (testResults.some((r) => r.status === 'time_limit_exceeded')) overallStatus = 'TIME_LIMIT_EXCEEDED'
    else if (testResults.some((r) => r.status === 'runtime_error')) overallStatus = 'RUNTIME_ERROR'
    else overallStatus = 'WRONG_ANSWER'
  }

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'RUN_QUESTION_TESTS',
    resourceType: 'PROBLEM',
    resourceId: typeof body.id === 'string' ? body.id : null,
    resourceLabel: `Test Runner (${normLang}, ${passedCount}/${casesToRun.length})`,
    permissionUsed: 'content.question.run_tests',
    updatedValues: { language: normLang, passedCount, totalCount: casesToRun.length, status: overallStatus },
    changeSummary: `Executed ${normLang} test run: ${passedCount}/${casesToRun.length} passed`,
    ipAddress: clientIp,
  })

  return sendJson(res, 200, {
    success: true,
    message: `Executed ${casesToRun.length} tests (${passedCount} passed).`,
    data: {
      language: normLang,
      engine: engine.name,
      status: overallStatus,
      passedCount,
      totalCount: casesToRun.length,
      passedTests: passedCount,
      totalTests: casesToRun.length,
      allPassed,
      overallTimeMs,
      executionTimeMs: overallTimeMs,
      results: testResults,
    },
  })
}

// ─── 4. Revisions & Audit History ────────────────────────────────────────────

async function handleListQuestionRevisions(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  requireAnyPermission(ctx, ['content.revision.view_own', 'content.revision.view_all'])

  const urlObj = new URL(req.url || '/', 'http://localhost')
  const idOrSlug = typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : (typeof body.problemId === 'string' && body.problemId.trim()
      ? body.problemId.trim()
      : (urlObj.searchParams.get('id') || urlObj.searchParams.get('problemId') || '').trim())

  if (!idOrSlug) return sendJson(res, 400, { success: false, error: 'Missing Identifier', message: 'Question ID is required.' })

  const question = await findQuestionByIdOrSlug(idOrSlug)
  if (!question) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Question "${idOrSlug}" not found.` })

  await requireQuestionScope(ctx, question)

  const { data: revisions, error: revErr } = await supabaseServer
    .from('ProblemRevision')
    .select('id, problemId, version, changeSummary, changedBy, createdAt, snapshot')
    .eq('problemId', question.id)
    .order('version', { ascending: false })
  if (revErr) throw revErr

  const canViewAll = hasContentPermission(ctx.permissions, 'content.revision.view_all')
  const filtered = (revisions || [])
    .filter((r: any) => canViewAll || r.changedBy === ctx.userId || r.changedBy === ctx.email)
    .map((r: any) => sanitizeRevisionForContext(ctx, r))

  return sendJson(res, 200, {
    success: true,
    message: `Found ${filtered.length} accessible revisions.`,
    data: filtered,
  })
}

async function handleRestoreQuestionRevision(
  ctx: ContentManagerContext,
  body: Record<string, unknown>,
  clientIp: string,
  res: ServerResponse
) {
  if (!assertPrivilegedDatabaseAccess(res)) return
  requirePermission(ctx, 'content.revision.restore')

  const problemId = typeof body.problemId === 'string' && body.problemId.trim()
    ? body.problemId.trim()
    : (typeof body.id === 'string' && body.id.trim() ? body.id.trim() : '')
  const revisionId = typeof body.revisionId === 'string' && body.revisionId.trim()
    ? body.revisionId.trim()
    : (typeof body.version === 'number' ? String(body.version) : '')

  if (!problemId || !revisionId) {
    return sendJson(res, 400, { success: false, error: 'Missing Parameters', message: 'problemId and revisionId are required.' })
  }

  const question = await findQuestionByIdOrSlug(problemId)
  if (!question) return sendJson(res, 404, { success: false, error: 'Not Found', message: `Question "${problemId}" not found.` })
  await requireQuestionScope(ctx, question)

  const { data: revList, error: revErr } = await supabaseServer.from('ProblemRevision').select('*').eq('problemId', question.id)
  if (revErr) throw revErr

  const targetRevision = (revList || []).find((r: any) => r.id === revisionId || String(r.version) === revisionId)
  if (!targetRevision) {
    return sendJson(res, 404, { success: false, error: 'Revision Not Found', message: `Revision "${revisionId}" not found.` })
  }

  const snapshot = targetRevision.snapshot || {}
  const snapProb = snapshot.problem || {}
  const snapExamples = Array.isArray(snapshot.examples) ? snapshot.examples : []
  const snapCases = Array.isArray(snapshot.testCases) ? snapshot.testCases : []
  const snapStarterCodes = snapshot.starterCodes || {}
  const now = new Date().toISOString()

  const { data: updatedProb, error: probUpdErr } = await supabaseServer
    .from('Problem')
    .update({
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
      updatedBy: ctx.userId,
      updatedAt: now,
    })
    .eq('id', question.id)
    .select()
    .single()
  if (probUpdErr) throw probUpdErr

  await supabaseServer.from('ProblemExample').delete().eq('problemId', question.id)
  const peRows = snapExamples.map((ex: any, idx: number) => ({
    id: `pe-${question.id}-${idx + 1}`,
    problemId: question.id,
    input: ex.input || '',
    expectedOutput: ex.expectedOutput || ex.output || '',
    explanation: ex.explanation || null,
    displayOrder: ex.displayOrder || idx + 1,
    createdAt: now,
    updatedAt: now,
  }))
  if (peRows.length > 0) await supabaseServer.from('ProblemExample').insert(peRows)

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
    createdAt: now,
    updatedAt: now,
  }))
  if (ptcRows.length > 0) await supabaseServer.from('ProblemTestCase').insert(ptcRows)

  const legacyRows = snapCases.map((tc: any, idx: number) => ({
    id: `tc-${question.id}-${idx + 1}`,
    problemId: question.id,
    testIndex: tc.testIndex || tc.displayOrder || idx + 1,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    explanation: tc.explanation || tc.description || null,
    isHidden: Boolean(tc.isHidden),
  }))
  if (legacyRows.length > 0) await supabaseServer.from('TestCase').insert(legacyRows)

  const maxVer = (revList || []).reduce((max: number, r: any) => Math.max(max, r.version || 0), 0)
  const nextVer = maxVer + 1
  await supabaseServer.from('ProblemRevision').insert({
    id: `rev-${question.id}-${nextVer}`,
    problemId: question.id,
    version: nextVer,
    snapshot: { problem: updatedProb, examples: peRows, testCases: ptcRows, starterCodes: snapStarterCodes },
    changedBy: ctx.userId,
    changeSummary: `Restored from revision v${targetRevision.version}`,
    createdAt: now,
  })

  await recordContentAudit({
    actorUserId: ctx.userId,
    actorEmail: ctx.email,
    actorRole: ctx.role,
    action: 'RESTORE_QUESTION_REVISION',
    resourceType: 'REVISION',
    resourceId: question.id,
    resourceLabel: `${question.title} -> v${targetRevision.version}`,
    permissionUsed: 'content.revision.restore',
    updatedValues: { restoredFromVersion: targetRevision.version, newVersion: nextVer },
    changeSummary: `Restored "${question.title}" from revision v${targetRevision.version}`,
    ipAddress: clientIp,
  })

  const { sanitized } = sanitizeTestCasesForContext(ctx, ptcRows)
  return sendJson(res, 200, {
    success: true,
    message: `Question "${question.title}" restored from v${targetRevision.version}.`,
    data: { ...updatedProb, examples: peRows, testCases: sanitized, starterCodes: snapStarterCodes },
  })
}

async function handleListMyRevisions(
  ctx: ContentManagerContext,
  _body: Record<string, unknown>,
  _req: IncomingMessage,
  res: ServerResponse
) {
  requireAnyPermission(ctx, ['content.revision.view_own', 'content.revision.view_all'])

  const canViewAll = hasContentPermission(ctx.permissions, 'content.revision.view_all')
  const [auditRes, revRes] = await Promise.all([
    canViewAll
      ? supabaseServer.from('content_audit_logs').select('*').order('created_at', { ascending: false }).limit(100)
      : supabaseServer.from('content_audit_logs').select('*').eq('actor_user_id', ctx.userId).order('created_at', { ascending: false }).limit(100),
    supabaseServer.from('ProblemRevision').select('id, problemId, version, changeSummary, changedBy, createdAt').order('createdAt', { ascending: false }).limit(100),
  ])

  if (auditRes.error) throw auditRes.error

  const myQuestionRevisions = (revRes.data || []).filter(
    (r: any) => canViewAll || r.changedBy === ctx.userId || r.changedBy === ctx.email
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Content audit activity and revisions retrieved.',
    data: {
      auditLogs: auditRes.data || [],
      questionRevisions: myQuestionRevisions,
      scope: canViewAll ? 'ALL_REVISIONS' : 'OWN_REVISIONS',
    },
  })
}
