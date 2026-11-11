/**
 * KalviLearn Super Admin — Content Manager Access Management & Publication Approvals
 *
 * Strictly executed only inside superAdminHandler.ts (verified SUPERADMIN sgjitbros@gmail.com).
 * Content Managers can NEVER access or invoke any of these endpoints.
 */

import type { IncomingMessage, ServerResponse } from 'http'
import { supabaseServer } from './feedbackAuth'
import {
  CONTENT_MANAGER_ROLE,
  DEFAULT_CONTENT_MANAGER_PERMISSIONS,
  normalizePermissionsList,
  ContentScopeType,
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

export async function handleListContentManagers(
  deps: SuperAdminDeps,
  res: ServerResponse
) {
  const [assignRes, permRes, scopeRes, usersRes, modulesRes, unitsRes, auditRes] = await Promise.all([
    supabaseServer.from('content_manager_assignments').select('*').order('granted_at', { ascending: false }),
    supabaseServer.from('content_manager_permissions').select('*'),
    supabaseServer.from('content_manager_scopes').select('*'),
    supabaseServer.from('users').select('id, email, name, role, status'),
    supabaseServer.from('Module').select('id, title, order'),
    supabaseServer.from('LearningUnit').select('id, moduleId, title, order'),
    supabaseServer.from('content_audit_logs').select('actor_user_id, created_at'),
  ])

  if (assignRes.error) throw assignRes.error
  if (permRes.error) throw permRes.error
  if (scopeRes.error) throw scopeRes.error
  if (usersRes.error) throw usersRes.error

  const usersById = new Map<string, any>((usersRes.data || []).map((u: any) => [u.id, u]))
  const modulesById = new Map<string, any>((modulesRes.data || []).map((m: any) => [m.id, m]))
  const unitsById = new Map<string, any>((unitsRes.data || []).map((u: any) => [u.id, u]))

  const permsByAssignment = new Map<string, string[]>()
  for (const row of permRes.data || []) {
    const arr = permsByAssignment.get((row as any).assignment_id) || []
    arr.push((row as any).permission)
    permsByAssignment.set((row as any).assignment_id, arr)
  }

  const scopesByAssignment = new Map<string, { modules: any[]; learningUnits: any[] }>()
  for (const row of scopeRes.data || []) {
    const aid = (row as any).assignment_id
    if (!scopesByAssignment.has(aid)) scopesByAssignment.set(aid, { modules: [], learningUnits: [] })
    const entry = scopesByAssignment.get(aid)!
    if ((row as any).module_id) {
      const m = modulesById.get((row as any).module_id)
      entry.modules.push({
        id: (row as any).module_id,
        title: m?.title || (row as any).module_id,
        order: m?.order ?? 0,
      })
    }
    if ((row as any).learning_unit_id) {
      const lu = unitsById.get((row as any).learning_unit_id)
      entry.learningUnits.push({
        id: (row as any).learning_unit_id,
        moduleId: lu?.moduleId || null,
        title: lu?.title || (row as any).learning_unit_id,
        order: lu?.order ?? 0,
      })
    }
  }

  const activityCountByUser = new Map<string, { count: number; lastAt: string | null }>()
  for (const row of auditRes.data || []) {
    const uid = (row as any).actor_user_id
    const cur = activityCountByUser.get(uid) || { count: 0, lastAt: null }
    cur.count++
    if (!cur.lastAt || String((row as any).created_at) > cur.lastAt) {
      cur.lastAt = (row as any).created_at
    }
    activityCountByUser.set(uid, cur)
  }

  const assignments = (assignRes.data || []).map((a: any) => {
    const u = usersById.get(a.user_id)
    const perms = permsByAssignment.get(a.id) || []
    const scopeInfo = scopesByAssignment.get(a.id) || { modules: [], learningUnits: [] }
    const act = activityCountByUser.get(a.user_id) || { count: 0, lastAt: null }
    return {
      id: a.id,
      userId: a.user_id,
      email: u?.email || 'unknown',
      name: u?.name || null,
      userRole: u?.role || 'STUDENT',
      userStatus: u?.status || 'ACTIVE',
      previousRole: a.previous_role || 'STUDENT',
      scopeType: a.scope_type || 'NONE',
      isActive: Boolean(a.is_active),
      permissions: perms,
      permissionCount: perms.length,
      moduleIds: scopeInfo.modules.map((m) => m.id),
      learningUnitIds: scopeInfo.learningUnits.map((lu) => lu.id),
      assignedModules: scopeInfo.modules,
      assignedLearningUnits: scopeInfo.learningUnits,
      grantedBy: a.granted_by || null,
      grantedAt: a.granted_at || null,
      revokedBy: a.revoked_by || null,
      revokedAt: a.revoked_at || null,
      notes: a.notes || null,
      activityCount: act.count,
      lastActivityAt: act.lastAt,
    }
  })

  return deps.sendJson(res, 200, {
    success: true,
    message: 'Content Managers directory retrieved.',
    data: {
      assignments,
      modules: (modulesRes.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)),
      learningUnits: (unitsRes.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)),
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
    supabaseServer.from('users').select('id, email, name, role, status'),
    supabaseServer.from('content_manager_assignments').select('user_id, is_active'),
  ])
  if (usersRes.error) throw usersRes.error

  const activeMap = new Map<string, boolean>()
  for (const a of assignRes.data || []) {
    activeMap.set((a as any).user_id, Boolean((a as any).is_active))
  }

  const users = (usersRes.data || [])
    .filter((u: any) => {
      const email = String(u.email || '').toLowerCase()
      const role = String(u.role || '').toUpperCase()
      // Sole Super Admin is never converted to Content Manager
      if (email === deps.SUPER_ADMIN_EMAIL || role === 'SUPERADMIN') return false
      if (!search) return true
      return email.includes(search) || String(u.name || '').toLowerCase().includes(search)
    })
    .slice(0, 50)
    .map((u: any) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      status: u.status,
      hasActiveContentManager: activeMap.get(u.id) === true,
    }))

  return deps.sendJson(res, 200, {
    success: true,
    message: `Found ${users.length} eligible users.`,
    data: users,
  })
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
    ? await supabaseServer.from('users').select('id, email, name, role, status').eq('id', userId).maybeSingle()
    : await supabaseServer.from('users').select('id, email, name, role, status').eq('email', targetEmail).maybeSingle()

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

  // Parse permissions (default to DEFAULT_CONTENT_MANAGER_PERMISSIONS if array not supplied)
  const permissions = Array.isArray(body.permissions)
    ? normalizePermissionsList(body.permissions)
    : [...DEFAULT_CONTENT_MANAGER_PERMISSIONS]

  // Parse scope (safest restricted default is NONE unless explicitly configured)
  const rawScope = typeof body.scopeType === 'string' ? body.scopeType.trim().toUpperCase() : 'NONE'
  const scopeType: ContentScopeType =
    rawScope === 'GLOBAL' ? 'GLOBAL' : rawScope === 'SCOPED' ? 'SCOPED' : 'NONE'

  const moduleIds = Array.isArray(body.moduleIds)
    ? Array.from(new Set(body.moduleIds.filter((id): id is string => typeof id === 'string' && id.trim().length > 0)))
    : []
  const learningUnitIds = Array.isArray(body.learningUnitIds)
    ? Array.from(new Set(body.learningUnitIds.filter((id): id is string => typeof id === 'string' && id.trim().length > 0)))
    : []

  // Validate foreign keys for moduleIds and learningUnitIds when SCOPED
  if (scopeType === 'SCOPED') {
    if (moduleIds.length > 0) {
      const { data: mods } = await supabaseServer.from('Module').select('id').in('id', moduleIds)
      if ((mods || []).length !== moduleIds.length) {
        return deps.sendJson(res, 400, {
          success: false,
          error: 'Invalid Module Scope',
          message: 'One or more specified moduleIds do not exist.',
        })
      }
    }
    if (learningUnitIds.length > 0) {
      const { data: units } = await supabaseServer.from('LearningUnit').select('id').in('id', learningUnitIds)
      if ((units || []).length !== learningUnitIds.length) {
        return deps.sendJson(res, 400, {
          success: false,
          error: 'Invalid Learning Unit Scope',
          message: 'One or more specified learningUnitIds do not exist.',
        })
      }
    }
  }

  const notes = typeof body.notes === 'string' ? body.notes.trim() : null
  const now = new Date().toISOString()

  const { data: existingAssign, error: findAssignErr } = await supabaseServer
    .from('content_manager_assignments')
    .select('*')
    .eq('user_id', targetUser.id)
    .maybeSingle()
  if (findAssignErr) throw findAssignErr

  let assignmentId: string
  const currentRole = String(targetUser.role || 'STUDENT').toUpperCase()
  const preservedPreviousRole = currentRole !== CONTENT_MANAGER_ROLE ? currentRole : (existingAssign?.previous_role || 'STUDENT')

  if (existingAssign) {
    assignmentId = existingAssign.id
    const { error: updErr } = await supabaseServer
      .from('content_manager_assignments')
      .update({
        scope_type: scopeType,
        is_active: true,
        previous_role: preservedPreviousRole,
        granted_by: deps.SUPER_ADMIN_EMAIL,
        granted_at: existingAssign.is_active ? existingAssign.granted_at : now,
        revoked_by: null,
        revoked_at: null,
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
        scope_type: scopeType,
        is_active: true,
        granted_by: deps.SUPER_ADMIN_EMAIL,
        granted_at: now,
        notes,
        created_at: now,
        updated_at: now,
      })
    if (insErr) throw insErr
  }

  // Replace permissions atomically
  await supabaseServer.from('content_manager_permissions').delete().eq('assignment_id', assignmentId)
  if (permissions.length > 0) {
    const permRows = permissions.map((perm, idx) => ({
      id: `cmp-${assignmentId}-${idx + 1}`,
      assignment_id: assignmentId,
      permission: perm,
      granted_at: now,
    }))
    const { error: permInsErr } = await supabaseServer.from('content_manager_permissions').insert(permRows)
    if (permInsErr) throw permInsErr
  }

  // Replace scopes
  await supabaseServer.from('content_manager_scopes').delete().eq('assignment_id', assignmentId)
  if (scopeType === 'SCOPED') {
    const scopeRows: any[] = []
    for (const mId of moduleIds) {
      scopeRows.push({
        id: `cms-m-${assignmentId}-${mId}`,
        assignment_id: assignmentId,
        module_id: mId,
        learning_unit_id: null,
        created_at: now,
      })
    }
    for (const luId of learningUnitIds) {
      scopeRows.push({
        id: `cms-u-${assignmentId}-${luId}`,
        assignment_id: assignmentId,
        module_id: null,
        learning_unit_id: luId,
        created_at: now,
      })
    }
    if (scopeRows.length > 0) {
      const { error: scInsErr } = await supabaseServer.from('content_manager_scopes').insert(scopeRows)
      if (scInsErr) throw scInsErr
    }
  }

  // Update users.role to CONTENT_MANAGER
  if (currentRole !== CONTENT_MANAGER_ROLE) {
    const { error: roleUpdErr } = await supabaseServer
      .from('users')
      .update({ role: CONTENT_MANAGER_ROLE, updatedAt: now })
      .eq('id', targetUser.id)
    if (roleUpdErr) throw roleUpdErr
  }

  const auditAction = existingAssign?.is_active ? 'UPDATE_CONTENT_MANAGER_ACCESS' : 'GRANT_CONTENT_MANAGER_ACCESS'
  await Promise.all([
    deps.recordAdminAudit(
      deps.SUPER_ADMIN_EMAIL,
      adminId,
      auditAction,
      'CONTENT_MANAGER',
      targetUser.id,
      targetUser.email,
      { scopeType, permissionsCount: permissions.length, moduleIds, learningUnitIds },
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
      updatedValues: { scopeType, permissions, moduleIds, learningUnitIds },
      changeSummary: `${existingAssign?.is_active ? 'Updated' : 'Granted'} Content Manager access for ${targetUser.email} (${scopeType})`,
      ipAddress: clientIp,
    }),
  ])

  return deps.sendJson(res, 200, {
    success: true,
    message: `Content Manager access saved for ${targetUser.email}.`,
    data: {
      assignmentId,
      userId: targetUser.id,
      email: targetUser.email,
      role: CONTENT_MANAGER_ROLE,
      scopeType,
      permissions,
      moduleIds,
      learningUnitIds,
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
      is_active: false,
      revoked_by: deps.SUPER_ADMIN_EMAIL,
      revoked_at: now,
      updated_at: now,
    })
    .eq('id', assignment.id)
  if (revErr) throw revErr

  // Immediately restore previous role (or safe STUDENT fallback, never SUPERADMIN)
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
      previousValues: { role: currentUserRole || CONTENT_MANAGER_ROLE, isActive: Boolean(assignment.is_active) },
      updatedValues: { role: effectiveRole, isActive: false },
      changeSummary: wasRestored
        ? `Revoked Content Manager access for ${label} (role restored to ${effectiveRole})`
        : `Revoked Content Manager access for ${label} (preserved role ${effectiveRole})`,
      ipAddress: clientIp,
    }),
  ])

  return deps.sendJson(res, 200, {
    success: true,
    message: `Content Manager access immediately revoked for ${label}.`,
    data: { userId: assignment.user_id, restoredRole: effectiveRole, wasRestored },
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
