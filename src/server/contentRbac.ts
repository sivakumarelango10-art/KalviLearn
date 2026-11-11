/**
 * KalviLearn Server-Side Content Manager RBAC, Scope & Audit Enforcement
 *
 * Security Invariants:
 * 1. Always queries live database user role + content_manager_assignments (revocation takes effect immediately).
 * 2. Never falls back to client-supplied roles, IDs, or permissions.
 * 3. Enforces granular per-action permissions via requirePermission().
 * 4. Enforces module & learning unit scope on every read/write/reorder/test/revision call (IDOR prevention).
 * 5. Strips hidden test cases when caller lacks `content.hidden_test_case.manage`.
 */

import { supabaseServer } from './feedbackAuth'
import type { AuthenticatedUser } from './feedbackAuth'
import {
  ContentPermission,
  ContentScopeType,
  CONTENT_MANAGER_ROLE,
  hasContentPermission,
  normalizePermissionsList,
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
 * Authoritative live check of Content Manager role, assignment status, permissions, and scopes.
 * Queries the database directly so access revocation and permission updates take effect immediately.
 */
export async function resolveContentManagerContext(
  authUser: AuthenticatedUser
): Promise<ContentAuthResolution> {
  // Explicitly reject non-CONTENT_MANAGER accounts (including STUDENT, MENTOR, CAMPUS_MANAGER, SUPERADMIN)
  const tokenRole = (authUser.role || '').toUpperCase().trim()
  if (tokenRole !== CONTENT_MANAGER_ROLE) {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Content Manager dashboard and APIs require an active CONTENT_MANAGER assignment.',
    }
  }

  // 1. Live lookup on `users` table (never rely on cached JWT claim for revocation)
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
    return { authorized: false, statusCode: 503, error: 'Unable to verify Content Manager permissions.' }
  }

  if (!assignment || assignment.is_active !== true) {
    return {
      authorized: false,
      statusCode: 403,
      error: 'Access Denied: Your Content Manager assignment is inactive or has been revoked.',
    }
  }

  // 3. Load granular permissions and scopes concurrently
  const [permRes, scopeRes] = await Promise.all([
    supabaseServer
      .from('content_manager_permissions')
      .select('permission')
      .eq('assignment_id', assignment.id),
    supabaseServer
      .from('content_manager_scopes')
      .select('module_id, learning_unit_id')
      .eq('assignment_id', assignment.id),
  ])

  if (permRes.error || scopeRes.error) {
    console.error('[content-rbac] Failed loading permissions/scopes:', permRes.error || scopeRes.error)
    return { authorized: false, statusCode: 503, error: 'Unable to load Content Manager permissions.' }
  }

  const normalizedPerms = normalizePermissionsList(
    (permRes.data || []).map((row: any) => row.permission)
  )
  const assignedModuleIds = new Set<string>()
  const assignedLearningUnitIds = new Set<string>()

  for (const row of scopeRes.data || []) {
    if (typeof (row as any).module_id === 'string' && (row as any).module_id) {
      assignedModuleIds.add((row as any).module_id)
    }
    if (typeof (row as any).learning_unit_id === 'string' && (row as any).learning_unit_id) {
      assignedLearningUnitIds.add((row as any).learning_unit_id)
    }
  }

  const rawScopeType = String(assignment.scope_type || 'NONE').toUpperCase()
  const scopeType: ContentScopeType =
    rawScopeType === 'GLOBAL' ? 'GLOBAL' : rawScopeType === 'SCOPED' ? 'SCOPED' : 'NONE'

  return {
    authorized: true,
    ctx: {
      userId: dbUser.id,
      email: dbUser.email,
      name: dbUser.name || authUser.name || dbUser.email.split('@')[0],
      role: CONTENT_MANAGER_ROLE,
      assignmentId: assignment.id,
      isActive: true,
      scopeType,
      permissions: new Set(normalizedPerms),
      assignedModuleIds,
      assignedLearningUnitIds,
      grantedBy: assignment.granted_by || null,
      grantedAt: assignment.granted_at || null,
      notes: assignment.notes || null,
    },
  }
}

/**
 * Throws PermissionDeniedError (403) if the caller lacks the exact granular permission.
 */
export function requirePermission(
  ctx: ContentManagerContext,
  permission: ContentPermission
): void {
  if (!hasContentPermission(ctx.permissions, permission)) {
    throw new PermissionDeniedError(
      `Access Denied: Missing required permission "${permission}".`
    )
  }
}

/**
 * Verifies the caller has at least one of the specified permissions.
 */
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

/**
 * Checks whether a Content Manager can mutate/manage a specific Module.
 * Note: Unit-only scoped users cannot mutate the parent Module itself.
 */
export function canManageModule(ctx: ContentManagerContext, moduleId: string): boolean {
  if (ctx.scopeType === 'GLOBAL') return true
  if (ctx.scopeType === 'NONE') return false
  return ctx.assignedModuleIds.has(moduleId)
}

export function requireModuleManageScope(ctx: ContentManagerContext, moduleId: string): void {
  if (!canManageModule(ctx, moduleId)) {
    throw new PermissionDeniedError(
      `Scope Denied: You do not have Content Manager scope for module "${moduleId}".`
    )
  }
}

/**
 * Checks whether a Content Manager can view/manage a Learning Unit.
 * Allowed if GLOBAL, if unitId is explicitly assigned, or if its parent moduleId is assigned.
 */
export async function canAccessLearningUnit(
  ctx: ContentManagerContext,
  learningUnitId: string,
  knownModuleId?: string | null
): Promise<{ allowed: boolean; moduleId: string | null }> {
  let moduleId = knownModuleId ?? null
  if (!moduleId) {
    const { data: unit } = await supabaseServer
      .from('LearningUnit')
      .select('id, moduleId')
      .eq('id', learningUnitId)
      .maybeSingle()
    moduleId = unit?.moduleId ?? null
  }

  if (ctx.scopeType === 'GLOBAL') return { allowed: true, moduleId }
  if (ctx.scopeType === 'NONE') return { allowed: false, moduleId }

  if (ctx.assignedLearningUnitIds.has(learningUnitId)) {
    return { allowed: true, moduleId }
  }
  if (moduleId && ctx.assignedModuleIds.has(moduleId)) {
    return { allowed: true, moduleId }
  }
  return { allowed: false, moduleId }
}

export async function requireLearningUnitScope(
  ctx: ContentManagerContext,
  learningUnitId: string,
  knownModuleId?: string | null
): Promise<string | null> {
  const { allowed, moduleId } = await canAccessLearningUnit(ctx, learningUnitId, knownModuleId)
  if (!allowed) {
    throw new PermissionDeniedError(
      `Scope Denied: You do not have Content Manager scope for learning unit "${learningUnitId}".`
    )
  }
  return moduleId
}

/**
 * Checks whether a Content Manager can access/mutate a Coding Question.
 * - GLOBAL scope: allowed for all curriculum & practice questions.
 * - SCOPED scope: allowed ONLY if the question's learningUnitId falls within an assigned unit or assigned module.
 *   Unlinked belt questions (learningUnitId === null) are NOT editable by SCOPED managers.
 * - NONE scope: denied.
 */
export async function canAccessQuestion(
  ctx: ContentManagerContext,
  question: { id?: string; learningUnitId?: string | null; beltId?: string | null }
): Promise<boolean> {
  if (ctx.scopeType === 'GLOBAL') return true
  if (ctx.scopeType === 'NONE') return false

  if (question.learningUnitId) {
    const { allowed } = await canAccessLearningUnit(ctx, question.learningUnitId)
    return allowed
  }

  return false
}

export async function requireQuestionScope(
  ctx: ContentManagerContext,
  question: { id?: string; learningUnitId?: string | null; beltId?: string | null }
): Promise<void> {
  const allowed = await canAccessQuestion(ctx, question)
  if (!allowed) {
    throw new PermissionDeniedError(
      `Scope Denied: Question "${question.id || 'unknown'}" is outside your assigned curriculum scope.`
    )
  }
}

/**
 * Strips hidden test case payloads if caller does not hold `content.hidden_test_case.manage`.
 */
export function sanitizeTestCasesForContext(
  ctx: ContentManagerContext,
  testCases: any[]
): { sanitized: any[]; hiddenCount: number } {
  const canViewHidden = hasContentPermission(ctx.permissions, 'content.hidden_test_case.manage')
  const hiddenCount = testCases.filter((tc) => Boolean(tc?.isHidden)).length
  if (canViewHidden) {
    return { sanitized: testCases, hiddenCount }
  }
  return {
    sanitized: testCases.filter((tc) => !tc?.isHidden),
    hiddenCount,
  }
}

/**
 * Protects hidden test cases inside historical ProblemRevision snapshots.
 */
export function sanitizeRevisionForContext(ctx: ContentManagerContext, revision: any): any {
  const canViewHidden = hasContentPermission(ctx.permissions, 'content.hidden_test_case.manage')
  if (canViewHidden || !revision?.snapshot) return revision
  const snapshot = { ...revision.snapshot }
  if (Array.isArray(snapshot.testCases)) {
    snapshot.testCases = snapshot.testCases.filter((tc: any) => !tc?.isHidden)
  }
  return {
    ...revision,
    snapshot,
  }
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
