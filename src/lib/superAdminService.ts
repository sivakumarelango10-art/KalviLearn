import { supabase } from './supabase'
import { formatErrorMessage } from './errorUtils'

export interface SuperAdminDashboardTelemetry {
  overview: {
    totalCampuses: number
    activeCampuses: number
    totalManagers: number
    activeManagers: number
    totalMentors: number
    activeMentors: number
    totalStudents: number
    activeStudents: number
    totalUsers: number
  }
  roleDistribution: Record<string, number>
  campuses: Array<{
    id: string
    code: string
    name: string
    city: string | null
    state: string | null
    status: 'ACTIVE' | 'INACTIVE'
    totalStudents: number
    activeStudents: number
    totalMentors: number
    activeMentors: number
    hasManager: boolean
  }>
  recentAuditLogs: AdminAuditLogEntry[]
}

export interface AdminCampus {
  id: string
  code: string
  name: string
  city: string | null
  state: string | null
  country: string | null
  status: 'ACTIVE' | 'INACTIVE'
  manager_id: string | null
  manager?: {
    id: string
    email: string
    name: string | null
    status?: string
  } | null
  studentCount?: number
  activeStudentCount?: number
  mentorCount?: number
  activeMentorCount?: number
  created_at: string
  updated_at: string
}

export interface AdminCampusManager {
  id: string
  email: string
  name: string | null
  role: string
  status: string
  campus_id: string | null
  campus?: {
    id: string
    name: string
    code: string
  } | null
  created_at: string
  updated_at: string
}

export interface AdminMentor {
  id: string
  user_id: string
  name: string | null
  email: string | null
  mentor_code: string
  max_students: number
  status: string
  campus_id: string | null
  campus?: {
    id: string
    name: string
    code: string
  } | null
  assignedStudentCount: number
  created_at: string
  updated_at: string
}

export interface AdminStudent {
  id: string
  user_id: string
  name: string | null
  email: string | null
  student_code: string
  status: string
  campus_id: string | null
  campus?: {
    id: string
    name: string
    code: string
  } | null
  mentor?: {
    id: string
    name: string | null
    email: string | null
  } | null
  stats: {
    solvedCount: number
    totalXp: number
  }
  created_at: string
  updated_at: string
}

export interface AdminUserRole {
  id: string
  email: string
  name: string | null
  role: string
  status: string
  campus_id: string | null
  campus?: {
    id: string
    name: string
    code: string
  } | null
  isSuperAdminProtected: boolean
  created_at: string
  updated_at: string
}

export interface AdminAuditLogEntry {
  id: string
  admin_email: string
  admin_id: string | null
  action: string
  target_type: string
  target_id: string | null
  target_label: string | null
  details: Record<string, unknown> | null
  status: string
  error_message: string | null
  ip_address: string | null
  created_at: string
}

/**
 * Retrieves the authorization bearer header from the active Supabase session.
 */
async function getAuthHeader(): Promise<string | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.access_token) {
      return `Bearer ${session.access_token}`
    }
  } catch {
    // Non-browser or disconnected environment
  }
  return null
}

/**
 * Execute Super Admin API requests with path fallback to root `/api/super-admin`.
 */
async function callSuperAdminApi<T = unknown>(
  primaryPath: string,
  payload: Record<string, unknown> = {},
  actionName: string,
  method: 'POST' | 'GET' | 'DELETE' = 'POST'
): Promise<{ success: boolean; error?: string; data?: T }> {
  try {
    const authHeader = await getAuthHeader()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    }

    const bodyWithAction = { ...payload, action: actionName }

    let url = primaryPath
    const fetchOptions: RequestInit = {
      method,
      headers,
    }

    if (method === 'GET') {
      const searchParams = new URLSearchParams()
      for (const [k, v] of Object.entries(bodyWithAction)) {
        if (v !== undefined && v !== null) {
          searchParams.append(k, String(v))
        }
      }
      url = `${primaryPath}?${searchParams.toString()}`
    } else {
      fetchOptions.body = JSON.stringify(bodyWithAction)
    }

    // Try primary path first (/api/super-admin/dashboard, /api/super-admin/campuses, etc.)
    let res = await fetch(url, fetchOptions)

    // Fallback to /api/super-admin if subpath yields 404
    if (res.status === 404) {
      if (method === 'GET') {
        const searchParams = new URLSearchParams()
        for (const [k, v] of Object.entries(bodyWithAction)) {
          if (v !== undefined && v !== null) {
            searchParams.append(k, String(v))
          }
        }
        res = await fetch(`/api/super-admin?${searchParams.toString()}`, fetchOptions)
      } else {
        res = await fetch('/api/super-admin', {
          ...fetchOptions,
          body: JSON.stringify(bodyWithAction),
        })
      }
    }

    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.success) {
      const errMsg = data?.message || data?.error || `Request failed with status ${res.status}`
      return { success: false, error: formatErrorMessage(errMsg) }
    }

    return { success: true, data: data?.data }
  } catch (err) {
    const msg = formatErrorMessage(err, 'Super Admin operation failed.')
    return { success: false, error: msg }
  }
}

// ─── 1. Dashboard ────────────────────────────────────────────────────────────

export async function fetchSuperAdminDashboard(): Promise<{
  success: boolean
  data?: SuperAdminDashboardTelemetry
  error?: string
}> {
  return callSuperAdminApi<SuperAdminDashboardTelemetry>(
    '/api/super-admin/dashboard',
    {},
    'dashboard',
    'POST'
  )
}

// ─── 2. Campuses ─────────────────────────────────────────────────────────────

export async function fetchCampuses(): Promise<{
  success: boolean
  data?: AdminCampus[]
  error?: string
}> {
  return callSuperAdminApi<AdminCampus[]>(
    '/api/super-admin/campuses',
    {},
    'list_campuses',
    'POST'
  )
}

export async function createCampus(payload: {
  code: string
  name: string
  city?: string
  state?: string
  country?: string
  status?: 'ACTIVE' | 'INACTIVE'
  managerId?: string | null
}): Promise<{ success: boolean; data?: AdminCampus; error?: string }> {
  return callSuperAdminApi<AdminCampus>(
    '/api/super-admin/campuses',
    payload,
    'create_campus',
    'POST'
  )
}

export async function updateCampus(
  campusId: string,
  updates: {
    name?: string
    city?: string | null
    state?: string | null
    country?: string | null
    status?: 'ACTIVE' | 'INACTIVE'
    managerId?: string | null
  }
): Promise<{ success: boolean; data?: AdminCampus; error?: string }> {
  return callSuperAdminApi<AdminCampus>(
    '/api/super-admin/campuses',
    { campusId, ...updates },
    'update_campus',
    'POST'
  )
}

export async function toggleCampusStatus(
  campusId: string,
  status: 'ACTIVE' | 'INACTIVE'
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/campuses',
    { campusId, status },
    'toggle_campus_status',
    'POST'
  )
}

export async function assignCampusManager(
  campusId: string,
  managerId: string | null
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/campuses',
    { campusId, managerId },
    'assign_campus_manager',
    'POST'
  )
}

// ─── 3. Campus Managers ──────────────────────────────────────────────────────

export async function fetchCampusManagers(): Promise<{
  success: boolean
  data?: AdminCampusManager[]
  error?: string
}> {
  return callSuperAdminApi<AdminCampusManager[]>(
    '/api/super-admin/managers',
    {},
    'list_managers',
    'POST'
  )
}

export async function provisionCampusManager(payload: {
  email: string
  name: string
  campusId?: string | null
}): Promise<{ success: boolean; data?: unknown; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/managers',
    payload,
    'provision_manager',
    'POST'
  )
}

export async function assignManagerCampus(
  managerId: string,
  campusId: string | null
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/managers',
    { managerId, campusId },
    'assign_manager_campus',
    'POST'
  )
}

export async function toggleManagerStatus(
  managerId: string,
  status: 'ACTIVE' | 'INACTIVE'
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/managers',
    { managerId, status },
    'toggle_manager_status',
    'POST'
  )
}

// ─── 4. Mentors ──────────────────────────────────────────────────────────────

export async function fetchSuperAdminMentors(): Promise<{
  success: boolean
  data?: AdminMentor[]
  error?: string
}> {
  return callSuperAdminApi<AdminMentor[]>(
    '/api/super-admin/mentors',
    {},
    'list_mentors',
    'POST'
  )
}

export async function provisionMentor(payload: {
  email: string
  name: string
  campusId?: string | null
  maxStudents?: number
}): Promise<{ success: boolean; data?: unknown; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/mentors',
    payload,
    'provision_mentor',
    'POST'
  )
}

export async function updateMentor(
  mentorId: string,
  updates: {
    name?: string
    campusId?: string | null
    maxStudents?: number
    status?: 'ACTIVE' | 'INACTIVE'
  }
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/mentors',
    { mentorId, ...updates },
    'update_mentor',
    'POST'
  )
}

export async function toggleMentorStatus(
  mentorId: string,
  status: 'ACTIVE' | 'INACTIVE'
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/mentors',
    { mentorId, status },
    'toggle_mentor_status',
    'POST'
  )
}

// ─── 5. Students ─────────────────────────────────────────────────────────────

export async function fetchSuperAdminStudents(params?: {
  search?: string
  campusId?: string
  mentorId?: string
  status?: string
  page?: number
  limit?: number
}): Promise<{
  success: boolean
  data?: {
    students: AdminStudent[]
    totalCount: number
    page: number
    limit: number
    totalPages: number
  }
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/students',
    params || {},
    'list_students',
    'POST'
  )
}

export async function enrollStudent(payload: {
  name: string
  email: string
  campusId?: string | null
  mentorId?: string | null
  studentCode?: string
}): Promise<{ success: boolean; data?: unknown; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/students',
    payload,
    'enroll_student',
    'POST'
  )
}

export async function updateStudent(
  studentId: string,
  updates: {
    name?: string
    campusId?: string | null
    mentorId?: string | null
    status?: 'ACTIVE' | 'INACTIVE'
  }
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/students',
    { studentId, ...updates },
    'update_student',
    'POST'
  )
}

export async function deleteStudentPermanent(
  studentId: string
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/students',
    { studentId },
    'delete_student',
    'POST'
  )
}

// ─── 6. Roles & Permissions ──────────────────────────────────────────────────

export async function fetchUserRolesDirectory(): Promise<{
  success: boolean
  data?: AdminUserRole[]
  error?: string
}> {
  return callSuperAdminApi<AdminUserRole[]>(
    '/api/super-admin/roles',
    {},
    'list_users_roles',
    'POST'
  )
}

export async function updateUserRole(
  userId: string,
  newRole: 'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN'
): Promise<{ success: boolean; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/roles',
    { userId, newRole },
    'update_user_role',
    'POST'
  )
}

// ─── 7. Audit Logs ───────────────────────────────────────────────────────────

export async function fetchAuditLogs(params?: {
  page?: number
  limit?: number
  actionFilter?: string
  targetType?: string
}): Promise<{
  success: boolean
  data?: {
    logs: AdminAuditLogEntry[]
    totalCount: number
    page: number
    limit: number
    totalPages: number
  }
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/audit',
    params || {},
    'list_audit_logs',
    'POST'
  )
}
