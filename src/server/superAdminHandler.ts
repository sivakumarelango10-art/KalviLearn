import type { IncomingMessage, ServerResponse } from 'http'
import { authenticateFeedbackRequest, supabaseServer } from './feedbackAuth'
import { applyCors, getClientIp, RateLimiter, readJsonBody, PayloadTooLargeError } from './httpSecurity'
import { formatErrorMessage } from '../lib/errorUtils'

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
    headers: 'Content-Type, Authorization, X-Idempotency-Key',
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

  // Parse Body if present
  let body: Record<string, unknown> = {}
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

  // Route & Action Dispatching
  const method = (req.method || '').toUpperCase()
  const url = (req.url || '').toLowerCase()
  const matchedPath = (
    ((req.headers['x-matched-path'] as string) || (req.headers['x-now-route-matches'] as string) || '')
  ).toLowerCase()
  const rawAction = typeof body.action === 'string' ? body.action : ''
  const queryAction = typeof req.query === 'object' && req.query ? String((req.query as Record<string, unknown>).action || '') : ''
  const action = (rawAction || queryAction).toLowerCase()

  try {
    // 1. Dashboard Telemetry
    if (action === 'dashboard' || url.includes('/dashboard') || matchedPath.includes('/dashboard')) {
      return await handleGetDashboard(res)
    }

    // 2. Campus Management
    if (action === 'list_campuses' || (method === 'GET' && (url.includes('/campuses') || matchedPath.includes('/campuses')))) {
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
    if (action === 'list_managers' || (method === 'GET' && (url.includes('/managers') || matchedPath.includes('/managers')))) {
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
    if (action === 'list_mentors' || (method === 'GET' && (url.includes('/mentors') || matchedPath.includes('/mentors')))) {
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
    if (action === 'list_students' || (method === 'GET' && (url.includes('/students') || matchedPath.includes('/students')))) {
      return await handleListStudents(body, req, res)
    }
    if (action === 'enroll_student') {
      return await handleEnrollStudent(body, auth.user.id, clientIp, res)
    }
    if (action === 'update_student') {
      return await handleUpdateStudent(body, auth.user.id, clientIp, res)
    }
    if (action === 'delete_student' || (method === 'DELETE' && (url.includes('/students') || matchedPath.includes('/students')))) {
      return await handleDeleteStudent(body, req, auth.user.id, clientIp, res)
    }

    // 6. Role & Permission Management
    if (action === 'list_roles' || action === 'list_users_roles' || (method === 'GET' && (url.includes('/roles') || matchedPath.includes('/roles')))) {
      return await handleListUserRoles(res)
    }
    if (action === 'update_user_role') {
      return await handleUpdateUserRole(body, auth.user.id, clientIp, res)
    }

    // 7. Audit Logs
    if (action === 'list_audit_logs' || (method === 'GET' && (url.includes('/audit') || matchedPath.includes('/audit')))) {
      return await handleListAuditLogs(body, req, res)
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
  // Aggregate live counts from Supabase database tables
  const [
    campusesRes,
    usersRes,
    mentorsRes,
    studentsRes,
    auditRes,
  ] = await Promise.all([
    supabaseServer.from('campuses').select('id, code, name, city, state, status, manager_id'),
    supabaseServer.from('users').select('id, role, status, campus_id'),
    supabaseServer.from('mentors').select('id, status, campus_id, max_students'),
    supabaseServer.from('students').select('id, status, campus_id'),
    supabaseServer.from('admin_audit_logs').select('*').order('created_at', { ascending: false }).limit(10),
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

  // Role counts
  const roleCounts: Record<string, number> = {
    STUDENT: 0,
    MENTOR: 0,
    CAMPUS_MANAGER: 0,
    ADMIN: 0,
    SUPERADMIN: 0,
  }
  for (const u of users) {
    const r = (u.role || 'STUDENT').toUpperCase()
    roleCounts[r] = (roleCounts[r] || 0) + 1
  }

  // Campus breakdown
  const campusBreakdown = campuses.map((c) => {
    const cStudents = students.filter((s) => s.campus_id === c.id)
    const cMentors = mentors.filter((m) => m.campus_id === c.id)
    const cManagers = users.filter((u) => u.campus_id === c.id && (u.role === 'CAMPUS_MANAGER' || u.role === 'ADMIN'))
    return {
      id: c.id,
      code: c.code,
      name: c.name,
      city: c.city,
      state: c.state,
      status: c.status,
      totalStudents: cStudents.length,
      activeStudents: cStudents.filter((s) => s.status === 'ACTIVE').length,
      totalMentors: cMentors.length,
      activeMentors: cMentors.filter((m) => m.status === 'ACTIVE').length,
      hasManager: !!c.manager_id || cManagers.length > 0,
    }
  })

  const telemetry = {
    overview: {
      totalCampuses: campuses.length,
      activeCampuses: campuses.filter((c) => c.status === 'ACTIVE').length,
      totalManagers: users.filter((u) => u.role === 'CAMPUS_MANAGER' || u.role === 'ADMIN').length,
      activeManagers: users.filter((u) => (u.role === 'CAMPUS_MANAGER' || u.role === 'ADMIN') && u.status === 'ACTIVE').length,
      totalMentors: mentors.length,
      activeMentors: mentors.filter((m) => m.status === 'ACTIVE').length,
      totalStudents: students.length,
      activeStudents: students.filter((s) => s.status === 'ACTIVE').length,
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

  const students = studentsRes.data || []
  const mentors = mentorsRes.data || []

  return campuses.map((c) => {
    const cStudents = students.filter((s) => s.campus_id === c.id)
    const cMentors = mentors.filter((m) => m.campus_id === c.id)
    return {
      ...c,
      manager: managersMap[c.manager_id] || c.manager || null,
      studentCount: cStudents.length,
      activeStudentCount: cStudents.filter((s) => s.status === 'ACTIVE').length,
      mentorCount: cMentors.length,
      activeMentorCount: cMentors.filter((m) => m.status === 'ACTIVE').length,
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
    await supabaseServer.from('users').update({ campus_id: campusId }).eq('id', managerId)
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
      .select('id, email, name, role, status, campus_id, created_at, updated_at')
      .in('role', ['CAMPUS_MANAGER', 'ADMIN'])
      .order('name', { ascending: true }),
    supabaseServer.from('campuses').select('id, name, code, manager_id'),
  ])

  if (managersRes.error) throw managersRes.error

  const campuses = campusesRes.data || []
  const campusMap = Object.fromEntries(campuses.map((c) => [c.id, c]))

  const managers = (managersRes.data || []).map((m) => {
    const assignedCampus = m.campus_id ? campusMap[m.campus_id] : campuses.find((c) => c.manager_id === m.id)
    return {
      ...m,
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

  const { data: user, error: uErr } = await supabaseServer
    .from('users')
    .update({ campus_id: campusId, "updatedAt": new Date().toISOString() })
    .eq('id', managerId)
    .select('id, email, name, role, campus_id')
    .single()

  if (uErr) throw uErr

  if (campusId) {
    await supabaseServer.from('campuses').update({ manager_id: managerId }).eq('id', campusId)
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
        updated_at: new Date().toISOString(),
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
    await supabaseServer.from('submissions').delete().eq('userId', canonicalUserId)
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
      .select('id, email, name, role, status, campus_id, created_at, updated_at')
      .order('email', { ascending: true }),
    supabaseServer.from('campuses').select('id, name, code'),
  ])

  if (usersRes.error) throw usersRes.error

  const campuses = campusesRes.data || []
  const campusMap = Object.fromEntries(campuses.map((c) => [c.id, c]))

  const enriched = (usersRes.data || []).map((u) => ({
    ...u,
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

  // Update role in `users`
  const { data: updated, error: updErr } = await supabaseServer
    .from('users')
    .update({ role: newRole, "updatedAt": new Date().toISOString() })
    .eq('id', targetUserId)
    .select('id, email, name, role, status')
    .single()

  if (updErr) throw updErr

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
