/**
 * KalviLearn Super Admin — Content Manager Access Management & Publication Approvals
 *
 * Strictly executed only inside superAdminHandler.ts (verified SUPERADMIN sgjitbros@gmail.com).
 * Content Managers can NEVER access or invoke any of these endpoints.
 */

import type { IncomingMessage, ServerResponse } from 'http'
import { supabaseServer, hasPrivilegedServerKey } from './feedbackAuth'
import {
  CONTENT_MANAGER_ROLE,
  FIXED_CONTENT_MANAGER_PERMISSIONS,
} from '../lib/contentPermissions'
import { recordContentAudit } from './contentRbac'
import { registerCustomSuite } from './judge/testRepository'

export interface SuperAdminDeps {
  SUPER_ADMIN_EMAIL: string
  sendJson: (res: any, statusCode: number, payload: { success: boolean; message: string; error?: string; data?: unknown }) => void
  recordAdminAudit: (
    adminEmail: string,
    adminId: string,
    action: string,
    targetType: string,
    targetId: string | null,
    targetLabel: string,
    details?: Record<string, unknown>,
    status?: 'SUCCESS' | 'FAILED',
    errorMessage?: string | null,
    ipAddress?: string | null
  ) => Promise<void>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CONTENT_EDIT_ACTIONS = new Set([
  'CREATE_QUESTION',
  'UPDATE_QUESTION',
  'CREATE_TEST_CASE',
  'UPDATE_TEST_CASE',
  'DELETE_TEST_CASE',
  'REORDER_TEST_CASES',
  'CREATE_MODULE',
  'UPDATE_MODULE',
  'CREATE_LEARNING_UNIT',
  'UPDATE_LEARNING_UNIT',
  'SUBMIT_CONTENT_FOR_REVIEW',
  'PUBLISH_QUESTION',
  'UNPUBLISH_QUESTION',
  'RESTORE_PROBLEM_REVISION',
])

function isStatusActive(status: string): boolean {
  return String(status || '').toUpperCase() === 'ACTIVE'
}

function deriveAssignmentStatus(a: any): 'ACTIVE' | 'SUSPENDED' | 'INVITED' | 'REVOKED' {
  const raw = String(a?.status || '').toUpperCase()
  if (raw === 'ACTIVE' || raw === 'SUSPENDED' || raw === 'INVITED' || raw === 'REVOKED') {
    if (!a?.is_active && raw === 'ACTIVE') {
      return a?.revoked_at ? 'REVOKED' : 'SUSPENDED'
    }
    return raw
  }
  if (a?.is_active === true) return 'ACTIVE'
  return a?.revoked_at ? 'REVOKED' : 'SUSPENDED'
}

async function resolveOptionalCampusId(
  deps: SuperAdminDeps,
  rawCampusId: unknown,
  res: ServerResponse
): Promise<{ ok: true; campusId: string | null } | { ok: false }> {
  if (rawCampusId === undefined || rawCampusId === null || rawCampusId === '') {
    return { ok: true, campusId: null }
  }
  if (typeof rawCampusId !== 'string') {
    deps.sendJson(res, 400, {
      success: false,
      error: 'Invalid Campus',
      message: 'campusId must be a valid string.',
    })
    return { ok: false }
  }
  const trimmed = rawCampusId.trim()
  if (!trimmed) return { ok: true, campusId: null }

  const { data: campus, error } = await supabaseServer
    .from('campuses')
    .select('id, status')
    .eq('id', trimmed)
    .maybeSingle()
  if (error) throw error
  if (!campus) {
    deps.sendJson(res, 400, {
      success: false,
      error: 'Invalid Campus',
      message: 'Selected campus was not found.',
    })
    return { ok: false }
  }
  return { ok: true, campusId: campus.id }
}

interface EnsureCmProfileInput {
  userId: string
  name?: string | null
  email?: string | null
  managerCode?: unknown
  department?: unknown
  designation?: unknown
  hasManagerCodeField?: boolean
  hasDepartmentField?: boolean
  hasDesignationField?: boolean
  allowUpdateExisting?: boolean
  now?: string
}

function normalizeOptionalProfileField(raw: unknown, maxLen: number): string | null {
  if (raw === undefined || raw === null) return null
  const s = typeof raw === 'string' ? raw.trim() : ''
  if (!s) return null
  return s.slice(0, maxLen)
}

async function ensureContentManagerProfile(input: EnsureCmProfileInput): Promise<any> {
  const now = input.now || new Date().toISOString()
  const { data: existing, error: selErr } = await supabaseServer
    .from('content_managers')
    .select('*')
    .eq('user_id', input.userId)
    .maybeSingle()

  if (selErr) throw selErr

  const nextManagerCode = normalizeOptionalProfileField(input.managerCode, 30)
  const nextDepartment = normalizeOptionalProfileField(input.department, 100)
  const nextDesignation = normalizeOptionalProfileField(input.designation, 100)

  if (existing) {
    if (!input.allowUpdateExisting) {
      return existing
    }
    const updates: Record<string, unknown> = {}
    if (input.name !== undefined && input.name !== existing.name) {
      updates.name = input.name
    }
    if (input.email !== undefined && input.email && input.email.toLowerCase() !== String(existing.email || '').toLowerCase()) {
      updates.email = input.email.toLowerCase()
    }
    if (input.hasManagerCodeField && nextManagerCode !== (existing.manager_code || null)) {
      updates.manager_code = nextManagerCode
    }
    if (input.hasDepartmentField && nextDepartment !== (existing.department || null)) {
      updates.department = nextDepartment
    }
    if (input.hasDesignationField && nextDesignation !== (existing.designation || null)) {
      updates.designation = nextDesignation
    }
    if (Object.keys(updates).length === 0) {
      return existing
    }
    updates.updated_at = now
    const { data: updated, error: updErr } = await supabaseServer
      .from('content_managers')
      .update(updates)
      .eq('id', existing.id)
      .select('*')
      .single()
    if (updErr) throw updErr
    return updated
  }

  const profileId = `cmp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const { data: inserted, error: insErr } = await supabaseServer
    .from('content_managers')
    .insert({
      id: profileId,
      user_id: input.userId,
      name: input.name ?? null,
      email: input.email ? input.email.toLowerCase() : null,
      manager_code: nextManagerCode,
      department: nextDepartment,
      designation: nextDesignation,
      created_at: now,
      updated_at: now,
    })
    .select('*')
    .single()
  if (insErr) throw insErr
  return inserted
}

export async function handleListContentManagers(
  deps: SuperAdminDeps,
  res: ServerResponse
) {
  const [assignRes, profilesRes, usersRes, campusesRes, auditRes] = await Promise.all([
    supabaseServer.from('content_manager_assignments').select('*').order('created_at', { ascending: false }),
    supabaseServer.from('content_managers').select('*'),
    supabaseServer.from('users').select('id, email, name, role, status, campus_id, createdAt, updatedAt'),
    supabaseServer.from('campuses').select('id, name, code, status'),
    supabaseServer.from('content_audit_logs').select('actor_user_id, action, created_at'),
  ])

  if (assignRes.error) throw assignRes.error
  if (profilesRes.error) throw profilesRes.error
  if (usersRes.error) throw usersRes.error
  if (campusesRes.error) throw campusesRes.error
  if (auditRes.error) throw auditRes.error

  const profilesByUserId = new Map<string, any>((profilesRes.data || []).map((p: any) => [p.user_id, p]))
  const usersById = new Map<string, any>((usersRes.data || []).map((u: any) => [u.id, u]))
  const campusesById = new Map<string, any>((campusesRes.data || []).map((c: any) => [c.id, c]))

  const activityCountByUser = new Map<string, { count: number; editCount: number; lastAt: string | null }>()
  for (const row of auditRes.data || []) {
    const uid = (row as any).actor_user_id
    const cur = activityCountByUser.get(uid) || { count: 0, editCount: 0, lastAt: null }
    cur.count++
    if (CONTENT_EDIT_ACTIONS.has(String((row as any).action || '').toUpperCase())) {
      cur.editCount++
    }
    if (!cur.lastAt || String((row as any).created_at) > cur.lastAt) {
      cur.lastAt = (row as any).created_at
    }
    activityCountByUser.set(uid, cur)
  }

  const assignments = (assignRes.data || []).map((a: any) => {
    const u = usersById.get(a.user_id)
    const p = profilesByUserId.get(a.user_id)
    const campus = u?.campus_id ? campusesById.get(u.campus_id) : null
    const act = activityCountByUser.get(a.user_id) || { count: 0, editCount: 0, lastAt: null }
    const status = deriveAssignmentStatus(a)

    return {
      id: a.id,
      userId: a.user_id,
      profileId: p?.id || null,
      email: u?.email || p?.email || 'unknown',
      name: p?.name || u?.name || null,
      managerCode: p?.manager_code || null,
      department: p?.department || null,
      designation: p?.designation || null,
      campusId: u?.campus_id || null,
      campusName: campus?.name || null,
      userRole: u?.role || 'STUDENT',
      userStatus: u?.status || 'ACTIVE',
      userCreatedAt: u?.createdAt || null,
      previousRole: a.previous_role || 'STUDENT',
      scopeType: 'GLOBAL' as const,
      status,
      isActive: isStatusActive(status),
      grantedBy: a.granted_by || null,
      grantedAt: a.granted_at || null,
      invitedBy: a.invited_by || null,
      invitedAt: a.invited_at || null,
      suspendedBy: a.suspended_by || null,
      suspendedAt: a.suspended_at || null,
      suspensionReason: a.suspension_reason || null,
      revokedBy: a.revoked_by || null,
      revokedAt: a.revoked_at || null,
      updatedBy: a.updated_by || null,
      createdAt: a.created_at || a.granted_at || u?.createdAt || null,
      updatedAt: a.updated_at || u?.updatedAt || a.granted_at || null,
      notes: a.notes || null,
      activityCount: act.count,
      contentEditCount: act.editCount,
      lastActivityAt: act.lastAt,
    }
  })

  const stats = {
    total: assignments.length,
    active: assignments.filter((a) => a.status === 'ACTIVE').length,
    suspended: assignments.filter((a) => a.status === 'SUSPENDED').length,
    revoked: assignments.filter((a) => a.status === 'REVOKED').length,
    invited: assignments.filter((a) => a.status === 'INVITED').length,
    totalContentEdits: assignments.reduce((acc, a) => acc + (a.contentEditCount || 0), 0),
  }

  return deps.sendJson(res, 200, {
    success: true,
    message: 'Content Managers directory retrieved.',
    data: {
      assignments,
      stats,
      campuses: (campusesRes.data || []).filter((c: any) => !c.status || c.status === 'ACTIVE'),
    },
  })
}

export async function handleSearchUsersForContentManager(
  deps: SuperAdminDeps,
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  const urlObj = new URL(req.url || '/', 'http://localhost')
  const search = typeof body.search === 'string'
    ? body.search.trim().toLowerCase()
    : (urlObj.searchParams.get('search') || '').trim().toLowerCase()

  const [usersRes, assignRes] = await Promise.all([
    supabaseServer.from('users').select('id, email, name, role, status, campus_id'),
    supabaseServer.from('content_manager_assignments').select('user_id, is_active, status'),
  ])
  if (usersRes.error) throw usersRes.error
  if (assignRes.error) throw assignRes.error

  const assignMap = new Map<string, { isActive: boolean; status: string }>()
  for (const a of assignRes.data || []) {
    const st = deriveAssignmentStatus(a)
    assignMap.set((a as any).user_id, {
      isActive: isStatusActive(st),
      status: st,
    })
  }

  const users = (usersRes.data || [])
    .filter((u: any) => {
      const email = String(u.email || '').toLowerCase()
      const role = String(u.role || '').toUpperCase()
      if (email === deps.SUPER_ADMIN_EMAIL || role === 'SUPERADMIN') return false
      if (!search) return true
      return (
        email.includes(search) ||
        String(u.name || '').toLowerCase().includes(search) ||
        role.toLowerCase().includes(search)
      )
    })
    .slice(0, 50)
    .map((u: any) => {
      const a = assignMap.get(u.id)
      return {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        status: u.status,
        campusId: u.campus_id || null,
        hasActiveContentManager: a?.isActive === true,
        assignmentStatus: a?.status || null,
      }
    })

  return deps.sendJson(res, 200, {
    success: true,
    message: `Found ${users.length} eligible users.`,
    data: users,
  })
}

export async function handleCreateContentManager(
  deps: SuperAdminDeps,
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const rawMode = typeof body.creationMode === 'string' ? body.creationMode.trim().toUpperCase() : 'DIRECT'
  const creationMode: 'DIRECT' | 'INVITE' = rawMode === 'INVITE' ? 'INVITE' : 'DIRECT'

  if (!name || !email) {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Missing Fields',
      message: 'Full name and email address are required to create a Content Manager.',
    })
  }
  if (name.length > 100) {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Validation Error',
      message: 'Content Manager name must be 100 characters or fewer.',
    })
  }
  if (!EMAIL_REGEX.test(email) || email.length > 255) {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Validation Error',
      message: 'Please provide a valid email address (255 characters or fewer).',
    })
  }
  if (email === deps.SUPER_ADMIN_EMAIL) {
    return deps.sendJson(res, 403, {
      success: false,
      error: 'Protected Account',
      message: 'The sole Super Admin account cannot be reassigned to Content Manager.',
    })
  }

  const campusCheck = await resolveOptionalCampusId(deps, body.campusId, res)
  if (!campusCheck.ok) return

  // Duplicate email check (case-insensitive)
  const { data: existingUsers, error: existingErr } = await supabaseServer
    .from('users')
    .select('id, email, role')
    .ilike('email', email)
  if (existingErr) throw existingErr

  const exactDuplicate = (existingUsers || []).find(
    (u: any) => String(u.email || '').trim().toLowerCase() === email
  )
  if (exactDuplicate) {
    return deps.sendJson(res, 409, {
      success: false,
      error: 'Duplicate Email',
      message: `An account with email "${email}" already exists. Use "Assign Existing User" to grant Content Manager access instead.`,
    })
  }

  const now = new Date().toISOString()
  const assignmentStatus: 'ACTIVE' | 'INVITED' = creationMode === 'INVITE' ? 'INVITED' : 'ACTIVE'
  const assignmentIsActive = isStatusActive(assignmentStatus)
  const notes = typeof body.notes === 'string' && body.notes.trim() ? body.notes.trim() : null

  const authAdmin = (supabaseServer as any)?.auth?.admin
  let invitedAuthUid: string | null = null
  let authInviteSent = false

  if (creationMode === 'INVITE') {
    const canCallAuthAdmin = Boolean((supabaseServer as any)?.__isMocked || hasPrivilegedServerKey())
    if (!canCallAuthAdmin || !authAdmin || typeof authAdmin.inviteUserByEmail !== 'function') {
      return deps.sendJson(res, 503, {
        success: false,
        error: 'Auth Invite Unavailable',
        message: 'Supabase Auth invitation API is unavailable in this configuration. Use Active Direct Provisioning (Google OAuth) or configure SUPABASE_SECRET_KEY.',
      })
    }

    if (typeof authAdmin.listUsers === 'function') {
      const listRes = await authAdmin.listUsers({ page: 1, perPage: 1000 })
      if (listRes?.error) {
        return deps.sendJson(res, 503, {
          success: false,
          error: 'Auth Verification Failed',
          message: `Unable to verify existing Supabase Auth identities before inviting: ${listRes.error.message || 'Unknown Auth error'}`,
        })
      }
      const existingAuthUser = (listRes?.data?.users || []).find(
        (au: any) => String(au?.email || '').trim().toLowerCase() === email
      )
      if (existingAuthUser) {
        return deps.sendJson(res, 409, {
          success: false,
          error: 'Duplicate Auth Identity',
          message: `An authentication identity with email "${email}" already exists in Supabase Auth. Use Active Direct Provisioning or Assign Existing User.`,
        })
      }
    }

    const inviteRes = await authAdmin.inviteUserByEmail(email, {
      data: { name, role: CONTENT_MANAGER_ROLE },
    })
    if (inviteRes?.error || !inviteRes?.data?.user?.id) {
      const errMsg = String(inviteRes?.error?.message || 'Supabase Auth did not return an invited user record.')
      const errCode = String(inviteRes?.error?.code || '')
      const isDuplicateAuth =
        inviteRes?.error?.status === 422 ||
        errCode === 'email_exists' ||
        /already.*registered|already.*exists/i.test(errMsg)

      return deps.sendJson(res, isDuplicateAuth ? 409 : 502, {
        success: false,
        error: isDuplicateAuth ? 'Duplicate Auth Identity' : 'Auth Invite Failed',
        message: isDuplicateAuth
          ? `An authentication identity with email "${email}" already exists in Supabase Auth.`
          : `Failed to send Supabase Auth invitation for "${email}": ${errMsg}`,
      })
    }

    invitedAuthUid = String(inviteRes.data.user.id)
    authInviteSent = true
  }

  let createdUser: any = null
  try {
    const { data: insertedUser, error: userInsertErr } = await supabaseServer
      .from('users')
      .insert({
        email,
        name,
        role: CONTENT_MANAGER_ROLE,
        status: 'ACTIVE',
        campus_id: campusCheck.campusId,
        createdAt: now,
        updatedAt: now,
      })
      .select('id, email, name, role, status, campus_id, createdAt')
      .single()

    if (userInsertErr) {
      if (userInsertErr.code === '23505') {
        if (invitedAuthUid && typeof authAdmin?.deleteUser === 'function') {
          await authAdmin.deleteUser(invitedAuthUid).catch(() => undefined)
        }
        return deps.sendJson(res, 409, {
          success: false,
          error: 'Duplicate Email',
          message: `An account with email "${email}" already exists.`,
        })
      }
      throw userInsertErr
    }
    createdUser = insertedUser

    if (invitedAuthUid && createdUser?.id) {
      await supabaseServer
        .from('users')
        .update({ authUid: invitedAuthUid })
        .eq('id', createdUser.id)
        .is('authUid', null)
    }

    const assignmentId = `cma-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const { error: assignErr } = await supabaseServer
      .from('content_manager_assignments')
      .insert({
        id: assignmentId,
        user_id: createdUser.id,
        previous_role: CONTENT_MANAGER_ROLE,
        scope_type: 'GLOBAL',
        status: assignmentStatus,
        is_active: assignmentIsActive,
        granted_by: deps.SUPER_ADMIN_EMAIL,
        granted_at: now,
        invited_by: creationMode === 'INVITE' ? deps.SUPER_ADMIN_EMAIL : null,
        invited_at: creationMode === 'INVITE' ? now : null,
        updated_by: deps.SUPER_ADMIN_EMAIL,
        notes,
        created_at: now,
        updated_at: now,
      })
    if (assignErr) throw assignErr

    const cmProfile = await ensureContentManagerProfile({
      userId: createdUser.id,
      name,
      email,
      managerCode: body.managerCode,
      department: body.department,
      designation: body.designation,
      hasManagerCodeField: 'managerCode' in body,
      hasDepartmentField: 'department' in body,
      hasDesignationField: 'designation' in body,
      allowUpdateExisting: false,
      now,
    })

    await Promise.all([
      deps.recordAdminAudit(
        deps.SUPER_ADMIN_EMAIL,
        adminId,
        'CREATE_CONTENT_MANAGER_ACCOUNT',
        'CONTENT_MANAGER',
        createdUser.id,
        email,
        {
          name,
          campusId: campusCheck.campusId,
          creationMode,
          assignmentStatus,
          isActive: assignmentIsActive,
          accessProfile: 'FIXED_CONTENT_MANAGER',
          authInviteSent,
        },
        'SUCCESS',
        null,
        clientIp
      ),
      recordContentAudit({
        actorUserId: adminId,
        actorEmail: deps.SUPER_ADMIN_EMAIL,
        actorRole: 'SUPERADMIN',
        action: 'CREATE_CONTENT_MANAGER_ACCOUNT',
        resourceType: 'CONTENT_MANAGER_ACCESS',
        resourceId: createdUser.id,
        resourceLabel: email,
        updatedValues: {
          name,
          email,
          role: CONTENT_MANAGER_ROLE,
          status: assignmentStatus,
          isActive: assignmentIsActive,
          scopeType: 'GLOBAL',
        },
        changeSummary: `Created Content Manager account for ${email} (${assignmentStatus})`,
        ipAddress: clientIp,
      }),
    ])

    return deps.sendJson(res, 201, {
      success: true,
      message: creationMode === 'INVITE'
        ? `Supabase Auth invitation sent to ${email}. Account provisioned as INVITED and will activate upon invite acceptance.`
        : `Content Manager account created for ${email}. They can now sign in via Google OAuth.`,
      data: {
        assignmentId,
        profileId: cmProfile?.id || null,
        userId: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        managerCode: cmProfile?.manager_code || null,
        department: cmProfile?.department || null,
        designation: cmProfile?.designation || null,
        campusId: createdUser.campus_id || null,
        role: CONTENT_MANAGER_ROLE,
        status: assignmentStatus,
        isActive: assignmentIsActive,
        scopeType: 'GLOBAL',
        permissions: [...FIXED_CONTENT_MANAGER_PERMISSIONS],
        authInviteSent,
      },
    })
  } catch (err) {
    // Compensating rollback across both public.users and newly invited auth.users
    if (createdUser?.id) {
      await supabaseServer.from('users').delete().eq('id', createdUser.id)
    }
    if (invitedAuthUid && typeof authAdmin?.deleteUser === 'function') {
      await authAdmin.deleteUser(invitedAuthUid).catch(() => undefined)
    }
    throw err
  }
}

export async function handleGrantOrUpdateContentManager(
  deps: SuperAdminDeps,
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const userId = typeof body.userId === 'string' ? body.userId.trim() : ''
  const targetEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (!userId && !targetEmail) {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Missing User',
      message: 'Either userId or email is required to grant Content Manager access.',
    })
  }

  const userQuery = userId
    ? await supabaseServer.from('users').select('id, email, name, role, status, campus_id').eq('id', userId).maybeSingle()
    : await supabaseServer.from('users').select('id, email, name, role, status, campus_id').eq('email', targetEmail).maybeSingle()

  if (userQuery.error) throw userQuery.error
  const targetUser = userQuery.data as any
  if (!targetUser) {
    return deps.sendJson(res, 404, {
      success: false,
      error: 'User Not Found',
      message: 'Selected user was not found in registered users.',
    })
  }

  if (
    String(targetUser.email || '').toLowerCase() === deps.SUPER_ADMIN_EMAIL ||
    String(targetUser.role || '').toUpperCase() === 'SUPERADMIN'
  ) {
    return deps.sendJson(res, 403, {
      success: false,
      error: 'Protected Account',
      message: 'The sole Super Admin account cannot be reassigned to Content Manager.',
    })
  }

  if (String(targetUser.status || '').toUpperCase() !== 'ACTIVE') {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Inactive User',
      message: 'Cannot grant Content Manager access to an inactive user account.',
    })
  }

  const updatedName = typeof body.name === 'string' ? body.name.trim() : undefined
  if (updatedName !== undefined && (!updatedName || updatedName.length > 100)) {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Validation Error',
      message: 'Content Manager name must be between 1 and 100 characters.',
    })
  }

  let resolvedCampusId: string | null | undefined = undefined
  if ('campusId' in body) {
    const campusCheck = await resolveOptionalCampusId(deps, body.campusId, res)
    if (!campusCheck.ok) return
    resolvedCampusId = campusCheck.campusId
  }

  const notes = typeof body.notes === 'string' ? body.notes.trim() : null
  const now = new Date().toISOString()

  const { data: existingAssign, error: findAssignErr } = await supabaseServer
    .from('content_manager_assignments')
    .select('*')
    .eq('user_id', targetUser.id)
    .maybeSingle()
  if (findAssignErr) throw findAssignErr

  if (body.preventDuplicateAssignment === true && existingAssign) {
    const existingStatus = deriveAssignmentStatus(existingAssign)
    if (existingStatus !== 'REVOKED') {
      return deps.sendJson(res, 409, {
        success: false,
        error: 'Duplicate Assignment',
        message: `${targetUser.email} already has a Content Manager assignment (${existingStatus}). Manage or edit their existing entry instead.`,
      })
    }
  }

  let assignmentId: string
  const currentRole = String(targetUser.role || 'STUDENT').toUpperCase()
  const preservedPreviousRole = currentRole !== CONTENT_MANAGER_ROLE ? currentRole : (existingAssign?.previous_role || 'STUDENT')
  const existingStatus = existingAssign ? deriveAssignmentStatus(existingAssign) : null
  const preserveSuspendedOnEdit = existingAssign && existingStatus === 'SUSPENDED' && body.reactivate !== true
  const nextStatus: 'ACTIVE' | 'SUSPENDED' | 'INVITED' = preserveSuspendedOnEdit
    ? 'SUSPENDED'
    : (existingStatus === 'INVITED' ? 'INVITED' : 'ACTIVE')
  const nextIsActive = isStatusActive(nextStatus)

  if (existingAssign) {
    assignmentId = existingAssign.id
    const { error: updErr } = await supabaseServer
      .from('content_manager_assignments')
      .update({
        scope_type: 'GLOBAL',
        status: nextStatus,
        is_active: nextIsActive,
        previous_role: preservedPreviousRole,
        granted_by: existingAssign.is_active ? existingAssign.granted_by || deps.SUPER_ADMIN_EMAIL : deps.SUPER_ADMIN_EMAIL,
        granted_at: existingAssign.is_active ? existingAssign.granted_at : now,
        suspended_by: preserveSuspendedOnEdit ? existingAssign.suspended_by : null,
        suspended_at: preserveSuspendedOnEdit ? existingAssign.suspended_at : null,
        suspension_reason: preserveSuspendedOnEdit ? existingAssign.suspension_reason : null,
        revoked_by: null,
        revoked_at: null,
        updated_by: deps.SUPER_ADMIN_EMAIL,
        notes,
        updated_at: now,
      })
      .eq('id', assignmentId)
    if (updErr) throw updErr
  } else {
    assignmentId = `cma-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const { error: insErr } = await supabaseServer
      .from('content_manager_assignments')
      .insert({
        id: assignmentId,
        user_id: targetUser.id,
        previous_role: preservedPreviousRole,
        scope_type: 'GLOBAL',
        status: 'ACTIVE',
        is_active: true,
        granted_by: deps.SUPER_ADMIN_EMAIL,
        granted_at: now,
        updated_by: deps.SUPER_ADMIN_EMAIL,
        notes,
        created_at: now,
        updated_at: now,
      })
    if (insErr) throw insErr
  }

  // Update users row (role and optional profile fields, never altering email or Auth identity)
  const userUpdates: Record<string, unknown> = {}
  if (currentRole !== CONTENT_MANAGER_ROLE && !preserveSuspendedOnEdit) {
    userUpdates.role = CONTENT_MANAGER_ROLE
  }
  if (updatedName !== undefined && updatedName !== targetUser.name) {
    userUpdates.name = updatedName
  }
  if (resolvedCampusId !== undefined && resolvedCampusId !== (targetUser.campus_id || null)) {
    userUpdates.campus_id = resolvedCampusId
  }
  if (Object.keys(userUpdates).length > 0) {
    userUpdates.updatedAt = now
    const { error: roleUpdErr } = await supabaseServer
      .from('users')
      .update(userUpdates)
      .eq('id', targetUser.id)
    if (roleUpdErr) throw roleUpdErr
  }

  const cmProfile = await ensureContentManagerProfile({
    userId: targetUser.id,
    name: updatedName ?? targetUser.name,
    email: targetUser.email,
    managerCode: body.managerCode,
    department: body.department,
    designation: body.designation,
    hasManagerCodeField: 'managerCode' in body,
    hasDepartmentField: 'department' in body,
    hasDesignationField: 'designation' in body,
    allowUpdateExisting: Boolean(existingAssign),
    now,
  })

  const auditAction = existingAssign?.is_active || preserveSuspendedOnEdit
    ? 'UPDATE_CONTENT_MANAGER_ACCESS'
    : 'GRANT_CONTENT_MANAGER_ACCESS'
  await Promise.all([
    deps.recordAdminAudit(
      deps.SUPER_ADMIN_EMAIL,
      adminId,
      auditAction,
      'CONTENT_MANAGER',
      targetUser.id,
      targetUser.email,
      { status: nextStatus, updatedName, resolvedCampusId },
      'SUCCESS',
      null,
      clientIp
    ),
    recordContentAudit({
      actorUserId: adminId,
      actorEmail: deps.SUPER_ADMIN_EMAIL,
      actorRole: 'SUPERADMIN',
      action: auditAction,
      resourceType: 'CONTENT_MANAGER_ACCESS',
      resourceId: targetUser.id,
      resourceLabel: targetUser.email,
      updatedValues: { status: nextStatus, scopeType: 'GLOBAL', name: updatedName ?? targetUser.name },
      changeSummary: `${existingAssign?.is_active || preserveSuspendedOnEdit ? 'Updated' : 'Granted'} Content Manager access for ${targetUser.email}`,
      ipAddress: clientIp,
    }),
  ])

  return deps.sendJson(res, 200, {
    success: true,
    message: `Content Manager access saved for ${targetUser.email}.`,
    data: {
      assignmentId,
      profileId: cmProfile?.id || null,
      userId: targetUser.id,
      email: targetUser.email,
      name: updatedName ?? targetUser.name,
      managerCode: cmProfile?.manager_code || null,
      department: cmProfile?.department || null,
      designation: cmProfile?.designation || null,
      campusId: resolvedCampusId !== undefined ? resolvedCampusId : (targetUser.campus_id || null),
      role: CONTENT_MANAGER_ROLE,
      status: nextStatus,
      isActive: nextIsActive,
      scopeType: 'GLOBAL',
      permissions: [...FIXED_CONTENT_MANAGER_PERMISSIONS],
      updatedBy: deps.SUPER_ADMIN_EMAIL,
      updatedAt: now,
    },
  })
}

export async function handleSuspendContentManager(
  deps: SuperAdminDeps,
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const userId = typeof body.userId === 'string' ? body.userId.trim() : ''
  const assignmentId = typeof body.assignmentId === 'string' ? body.assignmentId.trim() : ''
  const reason = typeof body.reason === 'string' && body.reason.trim()
    ? body.reason.trim()
    : (typeof body.suspensionReason === 'string' && body.suspensionReason.trim() ? body.suspensionReason.trim() : null)

  if (!userId && !assignmentId) {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'userId or assignmentId is required to suspend Content Manager access.',
    })
  }

  const assignQuery = assignmentId
    ? await supabaseServer.from('content_manager_assignments').select('*').eq('id', assignmentId).maybeSingle()
    : await supabaseServer.from('content_manager_assignments').select('*').eq('user_id', userId).maybeSingle()

  if (assignQuery.error) throw assignQuery.error
  const assignment = assignQuery.data as any
  if (!assignment) {
    return deps.sendJson(res, 404, { success: false, error: 'Not Found', message: 'Content Manager assignment not found.' })
  }

  const currentStatus = deriveAssignmentStatus(assignment)
  if (currentStatus === 'REVOKED') {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Already Revoked',
      message: 'Revoked Content Manager assignments cannot be suspended.',
    })
  }

  const { data: targetUser } = await supabaseServer
    .from('users')
    .select('id, email, role')
    .eq('id', assignment.user_id)
    .maybeSingle()

  const now = new Date().toISOString()
  const { error: suspErr } = await supabaseServer
    .from('content_manager_assignments')
    .update({
      status: 'SUSPENDED',
      is_active: false,
      suspended_by: deps.SUPER_ADMIN_EMAIL,
      suspended_at: now,
      suspension_reason: reason,
      updated_by: deps.SUPER_ADMIN_EMAIL,
      updated_at: now,
    })
    .eq('id', assignment.id)
  if (suspErr) throw suspErr

  const label = (targetUser as any)?.email || assignment.user_id
  await Promise.all([
    deps.recordAdminAudit(
      deps.SUPER_ADMIN_EMAIL,
      adminId,
      'SUSPEND_CONTENT_MANAGER_ACCESS',
      'CONTENT_MANAGER',
      assignment.user_id,
      label,
      { previousStatus: currentStatus, reason },
      'SUCCESS',
      null,
      clientIp
    ),
    recordContentAudit({
      actorUserId: adminId,
      actorEmail: deps.SUPER_ADMIN_EMAIL,
      actorRole: 'SUPERADMIN',
      action: 'SUSPEND_CONTENT_MANAGER_ACCESS',
      resourceType: 'CONTENT_MANAGER_ACCESS',
      resourceId: assignment.user_id,
      resourceLabel: label,
      previousValues: { status: currentStatus, isActive: Boolean(assignment.is_active) },
      updatedValues: { status: 'SUSPENDED', isActive: false, suspensionReason: reason },
      changeSummary: `Suspended Content Manager access for ${label}${reason ? ` (${reason})` : ''}`,
      ipAddress: clientIp,
    }),
  ])

  return deps.sendJson(res, 200, {
    success: true,
    message: `Content Manager access suspended for ${label}. Permissions and scopes have been preserved.`,
    data: {
      assignmentId: assignment.id,
      userId: assignment.user_id,
      status: 'SUSPENDED',
      isActive: false,
      suspendedBy: deps.SUPER_ADMIN_EMAIL,
      suspendedAt: now,
      suspensionReason: reason,
    },
  })
}

export async function handleReactivateContentManager(
  deps: SuperAdminDeps,
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const userId = typeof body.userId === 'string' ? body.userId.trim() : ''
  const assignmentId = typeof body.assignmentId === 'string' ? body.assignmentId.trim() : ''

  if (!userId && !assignmentId) {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'userId or assignmentId is required to reactivate Content Manager access.',
    })
  }

  const assignQuery = assignmentId
    ? await supabaseServer.from('content_manager_assignments').select('*').eq('id', assignmentId).maybeSingle()
    : await supabaseServer.from('content_manager_assignments').select('*').eq('user_id', userId).maybeSingle()

  if (assignQuery.error) throw assignQuery.error
  const assignment = assignQuery.data as any
  if (!assignment) {
    return deps.sendJson(res, 404, { success: false, error: 'Not Found', message: 'Content Manager assignment not found.' })
  }

  const currentStatus = deriveAssignmentStatus(assignment)
  if (currentStatus === 'REVOKED') {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Revoked Assignment',
      message: 'Revoked Content Manager assignments cannot be reactivated directly. Explicitly reassign access instead.',
    })
  }

  const { data: targetUser } = await supabaseServer
    .from('users')
    .select('id, email, role, status')
    .eq('id', assignment.user_id)
    .maybeSingle()

  if (!targetUser) {
    return deps.sendJson(res, 404, { success: false, error: 'User Not Found', message: 'Associated user account was not found.' })
  }

  const now = new Date().toISOString()

  const { error: reactErr } = await supabaseServer
    .from('content_manager_assignments')
    .update({
      status: 'ACTIVE',
      is_active: true,
      scope_type: 'GLOBAL',
      suspended_by: null,
      suspended_at: null,
      suspension_reason: null,
      updated_by: deps.SUPER_ADMIN_EMAIL,
      updated_at: now,
    })
    .eq('id', assignment.id)
  if (reactErr) throw reactErr

  if (String((targetUser as any).role || '').toUpperCase() !== CONTENT_MANAGER_ROLE) {
    await supabaseServer
      .from('users')
      .update({ role: CONTENT_MANAGER_ROLE, updatedAt: now })
      .eq('id', assignment.user_id)
  }

  // Preserve existing content_managers profile (create only if absent on legacy rows)
  await ensureContentManagerProfile({
    userId: assignment.user_id,
    name: (targetUser as any).name || null,
    email: (targetUser as any).email || null,
    allowUpdateExisting: false,
    now,
  })

  const label = (targetUser as any).email || assignment.user_id
  await Promise.all([
    deps.recordAdminAudit(
      deps.SUPER_ADMIN_EMAIL,
      adminId,
      'REACTIVATE_CONTENT_MANAGER_ACCESS',
      'CONTENT_MANAGER',
      assignment.user_id,
      label,
      { previousStatus: currentStatus },
      'SUCCESS',
      null,
      clientIp
    ),
    recordContentAudit({
      actorUserId: adminId,
      actorEmail: deps.SUPER_ADMIN_EMAIL,
      actorRole: 'SUPERADMIN',
      action: 'REACTIVATE_CONTENT_MANAGER_ACCESS',
      resourceType: 'CONTENT_MANAGER_ACCESS',
      resourceId: assignment.user_id,
      resourceLabel: label,
      previousValues: { status: currentStatus, isActive: Boolean(assignment.is_active) },
      updatedValues: { status: 'ACTIVE', isActive: true },
      changeSummary: `Reactivated Content Manager access for ${label}`,
      ipAddress: clientIp,
    }),
  ])

  return deps.sendJson(res, 200, {
    success: true,
    message: `Content Manager access reactivated for ${label}.`,
    data: {
      assignmentId: assignment.id,
      userId: assignment.user_id,
      status: 'ACTIVE',
      isActive: true,
      scopeType: 'GLOBAL',
      updatedBy: deps.SUPER_ADMIN_EMAIL,
      updatedAt: now,
    },
  })
}

export async function handleRevokeContentManager(
  deps: SuperAdminDeps,
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const userId = typeof body.userId === 'string' ? body.userId.trim() : ''
  const assignmentId = typeof body.assignmentId === 'string' ? body.assignmentId.trim() : ''

  if (!userId && !assignmentId) {
    return deps.sendJson(res, 400, {
      success: false,
      error: 'Missing Identifier',
      message: 'userId or assignmentId is required to revoke Content Manager access.',
    })
  }

  const assignQuery = assignmentId
    ? await supabaseServer.from('content_manager_assignments').select('*').eq('id', assignmentId).maybeSingle()
    : await supabaseServer.from('content_manager_assignments').select('*').eq('user_id', userId).maybeSingle()

  if (assignQuery.error) throw assignQuery.error
  const assignment = assignQuery.data as any
  if (!assignment) {
    return deps.sendJson(res, 404, { success: false, error: 'Not Found', message: 'Content Manager assignment not found.' })
  }

  const { data: targetUser } = await supabaseServer
    .from('users')
    .select('id, email, role')
    .eq('id', assignment.user_id)
    .maybeSingle()

  const now = new Date().toISOString()
  const { error: revErr } = await supabaseServer
    .from('content_manager_assignments')
    .update({
      status: 'REVOKED',
      is_active: false,
      suspended_by: null,
      suspended_at: null,
      suspension_reason: null,
      revoked_by: deps.SUPER_ADMIN_EMAIL,
      revoked_at: now,
      updated_by: deps.SUPER_ADMIN_EMAIL,
      updated_at: now,
    })
    .eq('id', assignment.id)
  if (revErr) throw revErr

  // Immediately restore previous role (or safe STUDENT fallback, never SUPERADMIN or CONTENT_MANAGER)
  const prevRoleRaw = String(assignment.previous_role || 'STUDENT').toUpperCase()
  const safeRestoreRole = ['STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN'].includes(prevRoleRaw) ? prevRoleRaw : 'STUDENT'

  const currentUserRole = String((targetUser as any)?.role || '').toUpperCase()
  const wasRestored = currentUserRole === CONTENT_MANAGER_ROLE
  const effectiveRole = wasRestored ? safeRestoreRole : (currentUserRole || safeRestoreRole)

  if (targetUser && wasRestored) {
    await supabaseServer
      .from('users')
      .update({ role: safeRestoreRole, updatedAt: now })
      .eq('id', assignment.user_id)
  }

  const label = (targetUser as any)?.email || assignment.user_id
  await Promise.all([
    deps.recordAdminAudit(
      deps.SUPER_ADMIN_EMAIL,
      adminId,
      'REVOKE_CONTENT_MANAGER_ACCESS',
      'CONTENT_MANAGER',
      assignment.user_id,
      label,
      { restoredRole: effectiveRole, wasRestored },
      'SUCCESS',
      null,
      clientIp
    ),
    recordContentAudit({
      actorUserId: adminId,
      actorEmail: deps.SUPER_ADMIN_EMAIL,
      actorRole: 'SUPERADMIN',
      action: 'REVOKE_CONTENT_MANAGER_ACCESS',
      resourceType: 'CONTENT_MANAGER_ACCESS',
      resourceId: assignment.user_id,
      resourceLabel: label,
      previousValues: { role: currentUserRole || CONTENT_MANAGER_ROLE, status: deriveAssignmentStatus(assignment), isActive: Boolean(assignment.is_active) },
      updatedValues: { role: effectiveRole, status: 'REVOKED', isActive: false },
      changeSummary: wasRestored
        ? `Revoked Content Manager access for ${label} (role restored to ${effectiveRole})`
        : `Revoked Content Manager access for ${label} (preserved role ${effectiveRole})`,
      ipAddress: clientIp,
    }),
  ])

  return deps.sendJson(res, 200, {
    success: true,
    message: `Content Manager access permanently revoked for ${label}.`,
    data: { userId: assignment.user_id, status: 'REVOKED', restoredRole: effectiveRole, wasRestored },
  })
}

export async function handleGetContentManagerActivity(
  deps: SuperAdminDeps,
  body: Record<string, unknown>,
  req: IncomingMessage,
  res: ServerResponse
) {
  const urlObj = new URL(req.url || '/', 'http://localhost')
  const userId = typeof body.userId === 'string' && body.userId.trim()
    ? body.userId.trim()
    : (urlObj.searchParams.get('userId') || '').trim()

  const query = userId
    ? supabaseServer.from('content_audit_logs').select('*').eq('actor_user_id', userId).order('created_at', { ascending: false }).limit(100)
    : supabaseServer.from('content_audit_logs').select('*').order('created_at', { ascending: false }).limit(100)

  const { data, error } = await query
  if (error) throw error

  return deps.sendJson(res, 200, {
    success: true,
    message: 'Content management activity logs retrieved.',
    data: data || [],
  })
}

export async function handleListPendingContentApprovals(
  deps: SuperAdminDeps,
  res: ServerResponse
) {
  const [probRes, unitRes, usersRes] = await Promise.all([
    supabaseServer.from('Problem').select('id, slug, title, difficulty, learningUnitId, status, approvalStatus, submittedForReviewAt, submittedForReviewBy, updatedBy, updatedAt'),
    supabaseServer.from('LearningUnit').select('id, moduleId, title, status, approvalStatus, submittedForReviewAt, submittedForReviewBy, updatedBy, updatedAt'),
    supabaseServer.from('users').select('id, email, name'),
  ])
  if (probRes.error) throw probRes.error
  if (unitRes.error) throw unitRes.error

  const usersById = new Map<string, any>((usersRes.data || []).map((u: any) => [u.id, u]))

  const pendingQuestions = (probRes.data || [])
    .filter((p: any) => p.approvalStatus === 'PENDING_REVIEW' || p.status === 'PENDING_REVIEW')
    .map((p: any) => {
      const submitter = usersById.get(p.submittedForReviewBy || p.updatedBy)
      return {
        resourceType: 'PROBLEM',
        id: p.id,
        slug: p.slug,
        title: p.title,
        difficulty: p.difficulty,
        learningUnitId: p.learningUnitId,
        status: p.status,
        approvalStatus: p.approvalStatus || 'PENDING_REVIEW',
        submittedAt: p.submittedForReviewAt || p.updatedAt,
        submittedByEmail: submitter?.email || p.submittedForReviewBy || 'Content Manager',
        submittedByName: submitter?.name || null,
      }
    })

  const pendingUnits = (unitRes.data || [])
    .filter((u: any) => u.approvalStatus === 'PENDING_REVIEW' || u.status === 'PENDING_REVIEW')
    .map((u: any) => {
      const submitter = usersById.get(u.submittedForReviewBy || u.updatedBy)
      return {
        resourceType: 'LEARNING_UNIT',
        id: u.id,
        moduleId: u.moduleId,
        title: u.title,
        status: u.status,
        approvalStatus: u.approvalStatus || 'PENDING_REVIEW',
        submittedAt: u.submittedForReviewAt || u.updatedAt,
        submittedByEmail: submitter?.email || u.submittedForReviewBy || 'Content Manager',
        submittedByName: submitter?.name || null,
      }
    })

  return deps.sendJson(res, 200, {
    success: true,
    message: 'Pending publication approvals retrieved.',
    data: {
      pendingQuestions,
      pendingUnits,
      totalPending: pendingQuestions.length + pendingUnits.length,
    },
  })
}

export async function handleApproveOrRejectContent(
  deps: SuperAdminDeps,
  actionType: 'APPROVE' | 'REJECT',
  body: Record<string, unknown>,
  adminId: string,
  clientIp: string,
  res: ServerResponse
) {
  const resourceType = typeof body.resourceType === 'string' ? body.resourceType.trim().toUpperCase() : 'PROBLEM'
  const id = typeof body.id === 'string' ? body.id.trim() : ''
  const reviewNotes = typeof body.reviewNotes === 'string' ? body.reviewNotes.trim() : null

  if (!id) {
    return deps.sendJson(res, 400, { success: false, error: 'Missing Resource ID', message: 'Resource ID is required.' })
  }

  const now = new Date().toISOString()

  if (resourceType === 'LEARNING_UNIT') {
    const { data: unit, error: findErr } = await supabaseServer.from('LearningUnit').select('*').eq('id', id).maybeSingle()
    if (findErr) throw findErr
    if (!unit) return deps.sendJson(res, 404, { success: false, error: 'Not Found', message: `Learning Unit "${id}" not found.` })

    const upd = actionType === 'APPROVE'
      ? {
          status: 'PUBLISHED',
          isActive: true,
          approvalStatus: 'APPROVED',
          publishedAt: now,
          publishedBy: adminId,
          reviewNotes,
          updatedBy: adminId,
          updatedAt: now,
        }
      : {
          status: unit.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
          approvalStatus: 'REJECTED',
          reviewNotes,
          updatedBy: adminId,
          updatedAt: now,
        }

    const { data: updated, error: updErr } = await supabaseServer.from('LearningUnit').update(upd).eq('id', id).select().single()
    if (updErr) throw updErr

    await Promise.all([
      deps.recordAdminAudit(
        deps.SUPER_ADMIN_EMAIL,
        adminId,
        actionType === 'APPROVE' ? 'APPROVE_PUBLISH_LEARNING_UNIT' : 'REJECT_LEARNING_UNIT_REVIEW',
        'LEARNING_UNIT',
        id,
        unit.title,
        { reviewNotes },
        'SUCCESS',
        null,
        clientIp
      ),
      recordContentAudit({
        actorUserId: adminId,
        actorEmail: deps.SUPER_ADMIN_EMAIL,
        actorRole: 'SUPERADMIN',
        action: actionType === 'APPROVE' ? 'APPROVE_AND_PUBLISH' : 'REJECT_REVIEW',
        resourceType: 'LEARNING_UNIT',
        resourceId: id,
        resourceLabel: unit.title,
        updatedValues: upd,
        changeSummary: actionType === 'APPROVE'
          ? `Super Admin approved & published learning unit "${unit.title}"`
          : `Super Admin requested changes on learning unit "${unit.title}": ${reviewNotes || 'No notes'}`,
        ipAddress: clientIp,
      }),
    ])

    return deps.sendJson(res, 200, {
      success: true,
      message: actionType === 'APPROVE' ? `Learning unit "${unit.title}" approved & published.` : `Review feedback recorded for "${unit.title}".`,
      data: updated,
    })
  }

  // PROBLEM
  const { data: prob, error: pFindErr } = await supabaseServer.from('Problem').select('*').eq('id', id).maybeSingle()
  if (pFindErr) throw pFindErr
  if (!prob) return deps.sendJson(res, 404, { success: false, error: 'Not Found', message: `Question "${id}" not found.` })

  const upd = actionType === 'APPROVE'
    ? {
        status: 'PUBLISHED',
        isActive: true,
        approvalStatus: 'APPROVED',
        publishedAt: now,
        publishedBy: adminId,
        reviewNotes,
        updatedBy: adminId,
        updatedAt: now,
      }
    : {
        status: prob.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
        isActive: prob.status === 'PUBLISHED',
        approvalStatus: 'REJECTED',
        reviewNotes,
        updatedBy: adminId,
        updatedAt: now,
      }

  const { data: updated, error: updErr } = await supabaseServer.from('Problem').update(upd).eq('id', id).select().single()
  if (updErr) throw updErr

  if (actionType === 'APPROVE') {
    const { data: ptc } = await supabaseServer.from('ProblemTestCase').select('*').eq('problemId', id).order('displayOrder', { ascending: true })
    if (ptc && ptc.length > 0) {
      registerCustomSuite(prob.slug, {
        title: prob.title,
        testCases: ptc.map((r: any) => ({
          testIndex: r.displayOrder,
          input: r.input,
          expectedOutput: r.expectedOutput,
          isHidden: Boolean(r.isHidden),
        })),
      })
    }
  }

  await Promise.all([
    deps.recordAdminAudit(
      deps.SUPER_ADMIN_EMAIL,
      adminId,
      actionType === 'APPROVE' ? 'APPROVE_PUBLISH_QUESTION' : 'REJECT_QUESTION_REVIEW',
      'QUESTION',
      id,
      prob.title,
      { reviewNotes },
      'SUCCESS',
      null,
      clientIp
    ),
    recordContentAudit({
      actorUserId: adminId,
      actorEmail: deps.SUPER_ADMIN_EMAIL,
      actorRole: 'SUPERADMIN',
      action: actionType === 'APPROVE' ? 'APPROVE_AND_PUBLISH' : 'REJECT_REVIEW',
      resourceType: 'PROBLEM',
      resourceId: id,
      resourceLabel: `${prob.title} (${prob.slug})`,
      updatedValues: upd,
      changeSummary: actionType === 'APPROVE'
        ? `Super Admin approved & published question "${prob.title}"`
        : `Super Admin requested changes on question "${prob.title}": ${reviewNotes || 'No notes'}`,
      ipAddress: clientIp,
    }),
  ])

  return deps.sendJson(res, 200, {
    success: true,
    message: actionType === 'APPROVE' ? `Question "${prob.title}" approved & published.` : `Review feedback recorded for "${prob.title}".`,
    data: updated,
  })
}
