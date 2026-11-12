/**
 * KalviLearn Server-Side Content Manager Authorization & Audit Enforcement
 *
 * Simplified Fixed-Profile Model:
 * 1. Valid Supabase Auth JWT + live `public.users` row (`role = 'CONTENT_MANAGER'`, `status = 'ACTIVE'`).
 * 2. Live `public.content_manager_assignments` check (`status = 'ACTIVE'` and `is_active = true`; immediate 403 on SUSPENDED/REVOKED).
 * 3. Single fixed educational content profile covering Curriculum, Practice Questions (Belts), Learn Coding Questions (Units), Examples, Test Cases & Starter Codes.
 * 4. Strictly forbids Super Admin, role management, student/mentor/campus operations, and platform settings.
 */

import { supabaseServer } from './feedbackAuth'
import type { AuthenticatedUser } from './feedbackAuth'
import {
  ContentPermission,
  ContentScopeType,
  CONTENT_MANAGER_ROLE,
  FIXED_CONTENT_MANAGER_PERMISSIONS,
  hasContentPermission,
} from '../lib/contentPermissions'

export interface ContentManagerContext {
  userId: string
  email: string
  name: string
  role: typeof CONTENT_MANAGER_ROLE
  assignmentId: string
  isActive: boolean
  scopeType: ContentScopeType
  permissions: Set<ContentPermission>
  assignedModuleIds: Set<string>
  assignedLearningUnitIds: Set<string>
  grantedBy: string | null
  grantedAt: string | null
  notes: string | null
}

export type ContentAuthResolution =
  | { authorized: true; ctx: ContentManagerContext }
  | { authorized: false; statusCode: number; error: string }

export class PermissionDeniedError extends Error {
  statusCode: number
  constructor(message: string, statusCode = 403) {
    super(message)
    this.name = 'PermissionDeniedError'
    this.statusCode = statusCode
  }
}

/**
 * Central authorization helper (`requireContentManager`):
 * Verifies valid user identity, `CONTENT_MANAGER` role, and an `ACTIVE` assignment
 * in `public.content_manager_assignments` without querying legacy permission/scope tables.
 */
export async function requireContentManager(
  authUser: AuthenticatedUser
): Promise<ContentAuthResolution> {
  const tokenRole = (authUser.role || '').toUpperCase().trim()
  if (tokenRole !== CONTENT_MANAGER_ROLE) {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Content Manager dashboard and APIs require an active CONTENT_MANAGER assignment.',
    }
  }

  // 1. Live lookup on `users` table
  type DbUserRow = { id: string; email: string; name: string | null; role: string; status: string }
  let dbUser: DbUserRow | null = null

  const byId = await supabaseServer
    .from('users')
    .select('id, email, name, role, status')
    .eq('id', authUser.id)
    .maybeSingle()

  if (byId.error) {
    console.error('[content-rbac] Failed to verify user record:', byId.error)
    return { authorized: false, statusCode: 503, error: 'Unable to verify Content Manager account.' }
  }
  dbUser = byId.data as DbUserRow | null

  if (!dbUser && authUser.email) {
    const byEmail = await supabaseServer
      .from('users')
      .select('id, email, name, role, status')
      .eq('email', authUser.email.toLowerCase())
      .maybeSingle()
    if (byEmail.error) {
      console.error('[content-rbac] Failed to verify user by email:', byEmail.error)
      return { authorized: false, statusCode: 503, error: 'Unable to verify Content Manager account.' }
    }
    dbUser = byEmail.data as DbUserRow | null
  }

  if (!dbUser) {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: User account is not registered or has been removed.',
    }
  }

  if ((dbUser.status || '').toUpperCase() !== 'ACTIVE') {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Your user account is inactive.',
    }
  }

  if ((dbUser.role || '').toUpperCase() !== CONTENT_MANAGER_ROLE) {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Content Manager role is not assigned or has been revoked.',
    }
  }

  // 2. Live lookup on `content_manager_assignments`
  const { data: assignment, error: assignErr } = await supabaseServer
    .from('content_manager_assignments')
    .select('*')
    .eq('user_id', dbUser.id)
    .maybeSingle()

  if (assignErr) {
    console.error('[content-rbac] Failed to inspect content_manager_assignments:', assignErr)
    return { authorized: false, statusCode: 503, error: 'Unable to verify Content Manager access.' }
  }

  if (!assignment) {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Your Content Manager assignment is inactive or has been revoked.',
    }
  }

  const assignmentStatus = String((assignment as any).status || '').toUpperCase()
  if (assignmentStatus === 'SUSPENDED') {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Your Content Manager access is currently suspended.',
    }
  }
  if (assignmentStatus === 'REVOKED') {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Your Content Manager assignment has been revoked.',
    }
  }
  if (assignmentStatus === 'INVITED') {
    if (!authUser.synthetic) {
      const now = new Date().toISOString()
      const { error: actErr } = await supabaseServer
        .from('content_manager_assignments')
        .update({
          status: 'ACTIVE',
          is_active: true,
          updated_at: now,
        })
        .eq('id', assignment.id)
        .eq('status', 'INVITED')
      if (actErr) {
        return { authorized: false, statusCode: 503, error: 'Unable to activate Content Manager invitation.' }
      }
      assignment.is_active = true
      ;(assignment as any).status = 'ACTIVE'
      await recordContentAudit({
        actorUserId: dbUser.id,
        actorEmail: dbUser.email,
        actorRole: CONTENT_MANAGER_ROLE,
        action: 'ACCEPT_CONTENT_MANAGER_INVITE',
        resourceType: 'CONTENT_MANAGER_ACCESS',
        resourceId: dbUser.id,
        resourceLabel: dbUser.email,
        previousValues: { status: 'INVITED', isActive: false },
        updatedValues: { status: 'ACTIVE', isActive: true },
        changeSummary: `${dbUser.email} accepted Content Manager invitation via verified authentication`,
      })
    } else {
      return {
        authorized: false,
        statusCode: 403,
        error: 'Access Denied: Your Content Manager invitation is pending acceptance.',
      }
    }
  }
  if (assignment.is_active !== true) {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Your Content Manager assignment is inactive or has been revoked.',
    }
  }

  return {
    authorized: true,
    ctx: {
      userId: dbUser.id,
      email: dbUser.email,
      name: dbUser.name || authUser.name || dbUser.email.split('@')[0],
      role: CONTENT_MANAGER_ROLE,
      assignmentId: assignment.id,
      isActive: true,
      scopeType: 'GLOBAL',
      permissions: new Set<ContentPermission>(FIXED_CONTENT_MANAGER_PERMISSIONS),
      assignedModuleIds: new Set<string>(),
      assignedLearningUnitIds: new Set<string>(),
      grantedBy: assignment.granted_by || null,
      grantedAt: assignment.granted_at || null,
      notes: assignment.notes || null,
    },
  }
}

export const resolveContentManagerContext = requireContentManager

export function requirePermission(
  ctx: ContentManagerContext,
  permission: ContentPermission
): void {
  if (!hasContentPermission(ctx.permissions, permission)) {
    throw new PermissionDeniedError(
      `Access Denied: Missing required capability "${permission}".`
    )
  }
}

export function requireAnyPermission(
  ctx: ContentManagerContext,
  permissions: readonly ContentPermission[]
): void {
  if (!permissions.some((p) => hasContentPermission(ctx.permissions, p))) {
    throw new PermissionDeniedError(
      `Access Denied: Requires one of [${permissions.join(', ')}].`
    )
  }
}

export function canManageModule(_ctx: ContentManagerContext, _moduleId: string): boolean {
  return true
}

export function requireModuleManageScope(_ctx: ContentManagerContext, _moduleId: string): void {
  // Unified fixed capability grants full educational module access to all active Content Managers
}

export async function canAccessLearningUnit(
  _ctx: ContentManagerContext,
  learningUnitId: string,
  knownModuleId?: string | null
): Promise<{ allowed: boolean; moduleId: string | null }> {
  let moduleId = knownModuleId ?? null
  if (!moduleId && learningUnitId) {
    const { data: unit } = await supabaseServer
      .from('LearningUnit')
      .select('id, moduleId')
      .eq('id', learningUnitId)
      .maybeSingle()
    moduleId = unit?.moduleId ?? null
  }
  return { allowed: true, moduleId }
}

export async function requireLearningUnitScope(
  ctx: ContentManagerContext,
  learningUnitId: string,
  knownModuleId?: string | null
): Promise<string | null> {
  const { moduleId } = await canAccessLearningUnit(ctx, learningUnitId, knownModuleId)
  return moduleId
}

export async function canAccessQuestion(
  _ctx: ContentManagerContext,
  _question: { id?: string; learningUnitId?: string | null; beltId?: string | null }
): Promise<boolean> {
  return true
}

export async function requireQuestionScope(
  _ctx: ContentManagerContext,
  _question: { id?: string; learningUnitId?: string | null; beltId?: string | null }
): Promise<void> {
  // Unified fixed capability grants access to both Practice and Learn Coding questions
}

export function sanitizeTestCasesForContext(
  _ctx: ContentManagerContext,
  testCases: any[]
): { sanitized: any[]; hiddenCount: number } {
  const hiddenCount = testCases.filter((tc) => Boolean(tc?.isHidden)).length
  return { sanitized: testCases, hiddenCount }
}

export function sanitizeRevisionForContext(_ctx: ContentManagerContext, revision: any): any {
  return revision
}

/**
 * Append-only Content Management Audit Logger.
 */
export async function recordContentAudit(params: {
  actorUserId: string
  actorEmail: string
  actorRole: string
  action: string
  resourceType:
    | 'MODULE'
    | 'LEARNING_UNIT'
    | 'PROBLEM'
    | 'EXAMPLE'
    | 'TEST_CASE'
    | 'STARTER_CODE'
    | 'REVISION'
    | 'CONTENT_MANAGER_ACCESS'
  resourceId?: string | null
  resourceLabel?: string | null
  permissionUsed?: string | null
  previousValues?: Record<string, unknown> | null
  updatedValues?: Record<string, unknown> | null
  changeSummary?: string | null
  ipAddress?: string | null
}): Promise<void> {
  try {
    const id = `caudit-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
    await supabaseServer.from('content_audit_logs').insert({
      id,
      actor_user_id: params.actorUserId,
      actor_email: params.actorEmail,
      actor_role: params.actorRole,
      action: params.action,
      resource_type: params.resourceType,
      resource_id: params.resourceId ?? null,
      resource_label: params.resourceLabel ?? null,
      permission_used: params.permissionUsed ?? null,
      previous_values: params.previousValues ?? null,
      updated_values: params.updatedValues ?? null,
      change_summary: params.changeSummary ?? null,
      ip_address: params.ipAddress ?? null,
      created_at: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[content-audit] Audit log write failure:', err)
  }
}
