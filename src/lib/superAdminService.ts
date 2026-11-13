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
  profileId?: string | null
  email: string
  name: string | null
  managerCode?: string | null
  department?: string | null
  designation?: string | null
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
/**
 * Super Admin auth only: never keep an access token in React state or a module cache.
 * getSession waits for Supabase auth initialization and returns the SDK-managed session.
 */
type SupabaseSessionSnapshot = Awaited<ReturnType<typeof supabase.auth.getSession>>

// Coalesce simultaneous page-load requests into one SDK session read. This is an
// in-flight promise only: no access token or session is persisted in a module cache.
let sessionReadInFlight: Promise<SupabaseSessionSnapshot> | null = null

async function getSessionSnapshot(): Promise<SupabaseSessionSnapshot> {
  if (sessionReadInFlight) return sessionReadInFlight

  const pending = supabase.auth.getSession()
  sessionReadInFlight = pending
  try {
    return await pending
  } finally {
    if (sessionReadInFlight === pending) sessionReadInFlight = null
  }
}

let refreshInFlight: Promise<string | null> | null = null

async function refreshSuperAdminAccessToken(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight

  refreshInFlight = (async () => {
    try {
      const { data: { session }, error } = await getSessionSnapshot()
      if (error || !session?.refresh_token) return null

      const { data, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: session.refresh_token,
      })
      if (refreshError || !data.session?.access_token) return null
      return data.session.access_token
    } catch {
      return null
    } finally {
      refreshInFlight = null
    }
  })()

  return refreshInFlight
}

async function getAuthHeader(forceRefresh = false): Promise<string | null> {
  try {
    // Existing local test-auth behavior is intentionally limited to local development.
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      const testToken = localStorage.getItem('kalvi_test_auth_token')
      if (testToken) return testToken.startsWith('Bearer ') ? testToken : `Bearer ${testToken}`
    }

    // getSession initializes from persisted storage and cooperates with the Supabase SDK's
    // automatic refresh. Check expiry ourselves so requests don't race an about-to-expire JWT.
    const { data: { session }, error } = await getSessionSnapshot()
    if (error || !session) return null

    const expiresAtMs = typeof session.expires_at === 'number' ? session.expires_at * 1000 : 0
    const shouldRefresh = forceRefresh || !session.access_token || (expiresAtMs > 0 && expiresAtMs <= Date.now() + 30_000)
    const token = shouldRefresh ? await refreshSuperAdminAccessToken() : session.access_token

    return token ? `Bearer ${token}` : null
  } catch {
    return null
  }
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
    const cleanSubpath = primaryPath.replace(/^\/api\/super-admin\/?/, '').split('?')[0]
    const bodyWithAction = { ...payload, action: actionName }

    let url = primaryPath
    if (method === 'GET') {
      const searchParams = new URLSearchParams()
      for (const [key, value] of Object.entries(bodyWithAction)) {
        if (value !== undefined && value !== null) searchParams.append(key, String(value))
      }
      url = `${primaryPath}?${searchParams.toString()}`
    }

    const createOptions = async (forceRefresh = false): Promise<RequestInit> => {
      const authHeader = await getAuthHeader(forceRefresh)
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Kalvi-Subpath': cleanSubpath,
        'X-Kalvi-Action': actionName,
        ...(authHeader ? { Authorization: authHeader } : {}),
      }
      return {
        method,
        headers,
        ...(method !== 'GET' ? { body: JSON.stringify(bodyWithAction) } : {}),
      }
    }

    const requestWithFallback = async (options: RequestInit): Promise<Response> => {
      let response = await fetch(url, options)
      if (response.status === 404) {
        if (method === 'GET') {
          const searchParams = new URLSearchParams()
          for (const [key, value] of Object.entries(bodyWithAction)) {
            if (value !== undefined && value !== null) searchParams.append(key, String(value))
          }
          response = await fetch(`/api/super-admin?${searchParams.toString()}`, options)
        } else {
          response = await fetch('/api/super-admin', options)
        }
      }
      return response
    }

    const testAuthEnabled = import.meta.env.DEV && typeof window !== 'undefined' && !!localStorage.getItem('kalvi_test_auth_token')
    let options = await createOptions()
    if (!('Authorization' in (options.headers || {})) && !testAuthEnabled) {
      const { data: { session }, error: sessionError } = await getSessionSnapshot()
      if (sessionError) return { success: false, error: 'Your sign-in session could not be restored. Please sign in with Google again.' }
      return { success: false, error: session ? 'Your session has no usable access token. Please sign in with Google again.' : 'Your sign-in session is missing. Please sign in with Google again.' }
    }

    let response = await requestWithFallback(options)
    if (response.status === 401 && !testAuthEnabled) {
      options = await createOptions(true)
      if ('Authorization' in (options.headers || {})) {
        response = await requestWithFallback(options)
      } else {
        return { success: false, error: 'Your session could not be refreshed. Please sign in with Google again.' }
      }
    }

    const data = await response.json().catch(() => null)
    if (!response.ok || !data?.success) {
      const message = data?.message || data?.error || `Request failed with status ${response.status}`
      if (response.status === 401) return { success: false, error: 'Your session is invalid or expired. Please sign in with Google again.' }
      if (response.status === 403) return { success: false, error: message || 'Your account does not have Super Admin permission.' }
      if (response.status >= 500) return { success: false, error: `Super Admin service error: ${message}` }
      return { success: false, error: formatErrorMessage(message) }
    }

    return { success: true, data: data.data }
  } catch (err) {
    const message = formatErrorMessage(err, 'Super Admin operation failed.')
    if (err instanceof TypeError) return { success: false, error: 'Unable to reach the Super Admin service. Check your connection and retry.' }
    return { success: false, error: message }
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

export async function deleteUserAccount(
  userId: string,
  confirmEmail: string,
  reason: string
): Promise<{ success: boolean; data?: unknown; message?: string; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/roles',
    { userId, confirmEmail, reason },
    'delete_user',
    'POST'
  )
}

export async function updateUserDetails(
  userId: string,
  updates: {
    name?: string
    role?: 'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN'
    status?: 'ACTIVE' | 'INACTIVE'
    campusId?: string | null
  }
): Promise<{ success: boolean; data?: AdminUserRole; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/roles',
    { userId, ...updates },
    'update_user',
    'POST'
  )
}

export async function transferUserRole(payload: {
  sourceUserId: string
  destinationUserId: string
  roleToTransfer: 'MENTOR' | 'STUDENT' | 'CAMPUS_MANAGER' | 'ADMIN'
  sourceNewRole?: 'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | 'ADMIN'
  campusId?: string | null
}): Promise<{ success: boolean; data?: unknown; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/roles',
    payload,
    'transfer_role',
    'POST'
  )
}

export async function toggleUserStatus(
  userId: string,
  status?: 'ACTIVE' | 'INACTIVE'
): Promise<{ success: boolean; data?: AdminUserRole; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/roles',
    { userId, status },
    'toggle_user_status',
    'POST'
  )
}

export async function assignUserCampus(
  userId: string,
  campusId: string | null
): Promise<{ success: boolean; data?: AdminUserRole; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/roles',
    { userId, campusId },
    'assign_user_campus',
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

// ─── 8. Questions Management ──────────────────────────────────────────────────

export interface AdminQuestionExample {
  id?: string
  problemId?: string
  label?: string
  input: string
  output: string
  explanation?: string
  displayOrder?: number
}

export interface AdminTestCase {
  id?: string
  problemId?: string
  testIndex?: number
  displayOrder?: number
  input: string
  expectedOutput: string
  isHidden?: boolean
  points?: number
  description?: string
  explanation?: string
}

export interface AdminQuestionRevision {
  id: string
  problemId: string
  version: number
  snapshot: Record<string, unknown>
  changedBy?: string | null
  changeSummary?: string | null
  createdAt: string
}

export interface AdminQuestion {
  id: string
  slug: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  subdivision: string
  topic?: string
  beltId?: string | null
  beltOrder?: number
  learningUnitId?: string | null
  status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | 'PENDING_REVIEW'
  description: string
  inputFormat?: string
  outputFormat?: string
  constraints?: string
  explanation?: string
  timeLimitMs?: number
  memoryLimitMb?: number
  createdBy?: string | null
  updatedBy?: string | null
  examples: AdminQuestionExample[]
  starterCodes?: Record<string, string>
  isActive: boolean
  createdAt: string
  updatedAt: string
  testCaseCount?: {
    total: number
    visible: number
    hidden: number
  }
  testCases?: AdminTestCase[]
  revisions?: AdminQuestionRevision[]
}

export interface AdminQuestionInput {
  slug?: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  subdivision: string
  description: string
  inputFormat?: string
  outputFormat?: string
  constraints?: string
  timeLimitMs?: number
  memoryLimitMb?: number
  status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | 'PENDING_REVIEW'
  examples?: AdminQuestionExample[]
  starterCodes?: Record<string, string>
  learningUnitId?: string | null
  beltId?: string | null
  isActive?: boolean
  changeSummary?: string
  testCases: Array<{
    id?: string
    input: string
    expectedOutput: string
    isHidden?: boolean
    points?: number
    displayOrder?: number
    description?: string
    explanation?: string
  }>
}

export interface AdminQuestionsDashboardStats {
  total: number
  published: number
  draft: number
  easy: number
  medium: number
  hard: number
}

export async function fetchAdminQuestions(params?: {
  search?: string
  difficulty?: string
  topic?: string
  status?: string
  belt?: number | string
  learningUnitId?: string
  onlyLearningUnits?: boolean
  onlyBelts?: boolean
  page?: number
  limit?: number
}): Promise<{
  success: boolean
  data?: {
    questions: AdminQuestion[]
    stats: AdminQuestionsDashboardStats
    total: number
    page: number
    limit: number
    totalPages: number
  }
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    params || {},
    'list_questions',
    'POST'
  )
}

export async function fetchAdminQuestionById(idOrSlug: string): Promise<{
  success: boolean
  data?: AdminQuestion
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    { id: idOrSlug },
    'get_question',
    'POST'
  )
}

export async function fetchAdminQuestionPreview(idOrSlug: string): Promise<{
  success: boolean
  data?: AdminQuestion
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    { id: idOrSlug },
    'get_question_preview',
    'POST'
  )
}

export async function createAdminQuestion(payload: AdminQuestionInput): Promise<{
  success: boolean
  data?: AdminQuestion
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    payload as unknown as Record<string, unknown>,
    'create_question',
    'POST'
  )
}

export async function updateAdminQuestion(
  id: string,
  payload: Partial<AdminQuestionInput>
): Promise<{
  success: boolean
  data?: AdminQuestion
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    { id, ...payload },
    'update_question',
    'POST'
  )
}

export async function duplicateAdminQuestion(
  id: string,
  newTitle?: string,
  newSlug?: string
): Promise<{
  success: boolean
  data?: AdminQuestion
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    { id, newTitle, newSlug },
    'duplicate_question',
    'POST'
  )
}

export async function toggleAdminQuestionStatus(
  id: string,
  isActive?: boolean
): Promise<{
  success: boolean
  data?: { id: string; slug: string; isActive: boolean }
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    { id, isActive },
    'toggle_question_status',
    'POST'
  )
}

export async function deleteAdminQuestion(id: string): Promise<{
  success: boolean
  data?: { deletedId: string; slug: string }
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    { id },
    'delete_question',
    'POST'
  )
}

export interface AdminTestRunnerResult {
  testIndex: number
  isHidden: boolean
  description?: string
  input: string
  expectedOutput: string
  actualOutput: string
  executionTimeMs: number
  status: 'passed' | 'failed' | 'runtime_error' | 'time_limit_exceeded'
  passed: boolean
  error?: string | null
}

export interface AdminTestRunnerResponseData {
  status: string
  engine: string
  overallTimeMs: number
  passedCount: number
  totalCount: number
  allPassed: boolean
  compilationError?: string
  results: AdminTestRunnerResult[]
}

export async function runAdminQuestionTests(payload: {
  id?: string
  slug?: string
  idOrSlug?: string
  code: string
  language: string
  filter?: 'all' | 'public' | 'hidden'
  testCases?: Array<{
    testIndex?: number
    input: string
    expectedOutput: string
    isHidden: boolean
    description?: string
  }>
}): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: AdminTestRunnerResponseData
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    payload,
    'run_question_tests',
    'POST'
  )
}

export async function fetchAdminQuestionRevisions(idOrSlug: string): Promise<{
  success: boolean
  data?: AdminQuestionRevision[]
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    { id: idOrSlug },
    'list_question_revisions',
    'POST'
  )
}

export async function restoreAdminQuestionRevision(
  problemId: string,
  revisionId: string
): Promise<{
  success: boolean
  data?: AdminQuestion
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/questions',
    { problemId, revisionId },
    'restore_question_revision',
    'POST'
  )
}

// ─── 9. Curriculum (Courses) Management ─────────────────────────────

export interface AdminCurriculumExample {
  input: string
  output: string
  explanation?: string
}

export interface AdminLearningUnit {
  id: string
  moduleId: string
  order: number
  title: string
  concept?: string
  content?: string
  approach?: string
  codeSnippets?: {
    python?: string
    cpp?: string
    java?: string
    javascript?: string
  }
  codingQuestion?: string
  inputFormat?: string
  outputFormat?: string
  examples?: AdminCurriculumExample[]
  readingTimeMinutes?: number
  isActive?: boolean
  status?: 'PUBLISHED' | 'DRAFT'
  createdAt?: string
  updatedAt?: string
}

export interface AdminCurriculumModule {
  id: string
  order: number
  title: string
  description?: string
  isActive?: boolean
  status?: 'PUBLISHED' | 'DRAFT'
  learningUnitsCount?: number
  learningUnits: AdminLearningUnit[]
  createdAt?: string
  updatedAt?: string
}

export interface AdminCurriculumStats {
  totalModules: number
  totalLearningUnits: number
  publishedModules: number
  draftModules: number
  publishedUnits: number
  draftUnits: number
}

export async function fetchCurriculumModules(params?: {
  search?: string
}): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: {
    modules: AdminCurriculumModule[]
    stats: AdminCurriculumStats
  }
}> {
  const query = new URLSearchParams()
  if (params?.search) query.set('search', params.search)
  const qs = query.toString() ? `?${query.toString()}` : ''
  return callSuperAdminApi(
    `/api/super-admin/curriculum${qs}`,
    params,
    'list_curriculum_modules',
    'GET'
  )
}

export async function createCurriculumModule(payload: {
  title: string
  description?: string
  order?: number
}): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: AdminCurriculumModule
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    payload,
    'create_curriculum_module',
    'POST'
  )
}

export async function updateCurriculumModule(
  id: string,
  payload: {
    title?: string
    description?: string
    order?: number
    isActive?: boolean
    status?: string
  }
): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: AdminCurriculumModule
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    { id, ...payload },
    'update_curriculum_module',
    'POST'
  )
}

export async function deleteCurriculumModule(id: string): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: { id: string }
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    { id },
    'delete_curriculum_module',
    'POST'
  )
}

export async function reorderCurriculumModules(
  moduleOrders: Array<{ id: string; order: number }>
): Promise<{
  success: boolean
  message?: string
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    { moduleOrders },
    'reorder_curriculum_modules',
    'POST'
  )
}

export async function createLearningUnit(payload: {
  moduleId: string
  title: string
  order?: number
  concept?: string
  content?: string
  approach?: string
  codeSnippets?: {
    python?: string
    cpp?: string
    java?: string
    javascript?: string
  }
  codingQuestion?: string
  inputFormat?: string
  outputFormat?: string
  examples?: AdminCurriculumExample[]
  readingTimeMinutes?: number
}): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: AdminLearningUnit
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    payload,
    'create_learning_unit',
    'POST'
  )
}

export async function updateLearningUnit(
  id: string,
  payload: Partial<AdminLearningUnit>
): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: AdminLearningUnit
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    { id, ...payload },
    'update_learning_unit',
    'POST'
  )
}

export async function deleteLearningUnit(id: string): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: { id: string }
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    { id },
    'delete_learning_unit',
    'POST'
  )
}

export async function reorderLearningUnits(
  unitOrders: Array<{ id: string; order: number }>
): Promise<{
  success: boolean
  message?: string
  error?: string
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    { unitOrders },
    'reorder_learning_units',
    'POST'
  )
}

export async function toggleModuleStatus(
  id: string,
  isActive?: boolean
): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: AdminCurriculumModule
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    { id, isActive },
    'toggle_module_status',
    'POST'
  )
}

export async function toggleLearningUnitStatus(
  id: string,
  isActive?: boolean
): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: AdminLearningUnit
}> {
  return callSuperAdminApi(
    '/api/super-admin/curriculum',
    { id, isActive },
    'toggle_learning_unit_status',
    'POST'
  )
}

// ─── 10. Practice Belts Management ─────────────────────────────

export interface AdminBelt {
  id: string
  order: number
  name: string
  title: string
  description: string
  color: string
  problemCount: number
  publishedCount: number
  draftCount: number
}

export interface AdminBeltsStats {
  totalBelts: number
  totalProblems: number
  publishedProblems: number
  draftProblems: number
}

export async function fetchBelts(): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: {
    belts: AdminBelt[]
    stats: AdminBeltsStats
  }
}> {
  return callSuperAdminApi(
    '/api/super-admin/belts',
    {},
    'list_belts',
    'GET'
  )
}

export async function updateBelt(payload: {
  id?: string
  order?: number
  title?: string
  name?: string
  description?: string
  color?: string
}): Promise<{
  success: boolean
  message?: string
  error?: string
  data?: AdminBelt
}> {
  return callSuperAdminApi(
    '/api/super-admin/belts',
    payload,
    'update_belt',
    'POST'
  )
}




// ─── 11. Content Manager User & Lifecycle Management ─────────────────────────

export type ContentManagerLifecycleStatus = 'ACTIVE' | 'SUSPENDED' | 'INVITED' | 'REVOKED'

export interface AdminContentManagerAssignment {
  id: string
  userId: string
  profileId?: string | null
  email: string
  name: string | null
  managerCode?: string | null
  department?: string | null
  designation?: string | null
  campusId: string | null
  campusName: string | null
  userRole: string
  userStatus: string
  userCreatedAt: string | null
  previousRole: string
  scopeType?: 'NONE' | 'SCOPED' | 'GLOBAL'
  status: ContentManagerLifecycleStatus
  isActive: boolean
  grantedBy: string | null
  grantedAt: string | null
  invitedBy: string | null
  invitedAt: string | null
  suspendedBy: string | null
  suspendedAt: string | null
  suspensionReason: string | null
  revokedBy: string | null
  revokedAt: string | null
  updatedBy: string | null
  createdAt: string | null
  updatedAt: string | null
  notes: string | null
  activityCount: number
  contentEditCount: number
  lastActivityAt: string | null
}

export interface AdminContentManagerStats {
  total: number
  active: number
  suspended: number
  revoked: number
  invited: number
  totalContentEdits: number
}

export interface AdminEligibleContentUser {
  id: string
  email: string
  name: string | null
  role: string
  status: string
  campusId: string | null
  hasActiveContentManager: boolean
  assignmentStatus: ContentManagerLifecycleStatus | null
}

export async function fetchContentManagersDirectory(): Promise<{
  success: boolean
  data?: {
    assignments: AdminContentManagerAssignment[]
    stats?: AdminContentManagerStats
    campuses?: Array<{ id: string; name: string; code: string; status?: string }>
  }
  message?: string
  error?: string
}> {
  return callSuperAdminApi('/api/super-admin/content-managers', {}, 'list_content_managers', 'POST')
}

export async function searchUsersForContentManager(search: string): Promise<{
  success: boolean
  data?: AdminEligibleContentUser[]
  message?: string
  error?: string
}> {
  return callSuperAdminApi('/api/super-admin/content-managers', { search }, 'search_users_for_content_manager', 'POST')
}

export async function createContentManagerAccount(payload: {
  name: string
  email: string
  campusId?: string | null
  managerCode?: string | null
  department?: string | null
  designation?: string | null
  creationMode?: 'DIRECT' | 'INVITE'
  notes?: string | null
}): Promise<{ success: boolean; data?: any; message?: string; error?: string }> {
  return callSuperAdminApi('/api/super-admin/content-managers', payload, 'create_content_manager', 'POST')
}

export async function grantOrUpdateContentManager(payload: {
  userId?: string
  email?: string
  name?: string
  campusId?: string | null
  managerCode?: string | null
  department?: string | null
  designation?: string | null
  preventDuplicateAssignment?: boolean
  notes?: string | null
}): Promise<{ success: boolean; data?: any; message?: string; error?: string }> {
  return callSuperAdminApi(
    '/api/super-admin/content-managers',
    payload,
    payload.preventDuplicateAssignment ? 'grant_content_manager' : 'update_content_manager',
    'POST'
  )
}

export async function suspendContentManagerAccess(payload: {
  userId?: string
  assignmentId?: string
  reason?: string | null
}): Promise<{ success: boolean; data?: any; message?: string; error?: string }> {
  return callSuperAdminApi('/api/super-admin/content-managers', payload, 'suspend_content_manager', 'POST')
}

export async function reactivateContentManagerAccess(payload: {
  userId?: string
  assignmentId?: string
}): Promise<{ success: boolean; data?: any; message?: string; error?: string }> {
  return callSuperAdminApi('/api/super-admin/content-managers', payload, 'reactivate_content_manager', 'POST')
}

export async function revokeContentManagerAccess(payload: {
  userId?: string
  assignmentId?: string
}): Promise<{ success: boolean; data?: any; message?: string; error?: string }> {
  return callSuperAdminApi('/api/super-admin/content-managers', payload, 'revoke_content_manager', 'POST')
}

export async function fetchContentManagerActivity(userId?: string): Promise<{
  success: boolean
  data?: any[]
  message?: string
  error?: string
}> {
  return callSuperAdminApi('/api/super-admin/content-managers', { userId }, 'get_content_manager_activity', 'POST')
}
