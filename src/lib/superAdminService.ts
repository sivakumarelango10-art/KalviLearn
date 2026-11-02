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
/**
 * Super Admin auth only: never keep an access token in React state or a module cache.
 * getSession waits for Supabase auth initialization and returns the SDK-managed session.
 */
let refreshInFlight: Promise<string | null> | null = null

async function refreshSuperAdminAccessToken(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight

  refreshInFlight = (async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
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
    const { data: { session }, error } = await supabase.auth.getSession()
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
    const authHeader = await getAuthHeader()
    const cleanSubpath = primaryPath.replace(/^\/api\/super-admin\/?/, '').split('?')[0]
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Kalvi-Subpath': cleanSubpath,
      'X-Kalvi-Action': actionName,
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
  label?: string
  input: string
  output: string
  explanation?: string
}

export interface AdminTestCase {
  id?: string
  problemId?: string
  testIndex?: number
  input: string
  expectedOutput: string
  isHidden?: boolean
  description?: string
  explanation?: string
}

export interface AdminQuestion {
  id: string
  slug: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  subdivision: string
  topic?: string
  beltId?: string
  beltOrder?: number
  status?: 'PUBLISHED' | 'DRAFT'
  description: string
  inputFormat?: string
  outputFormat?: string
  constraints?: string
  explanation?: string
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
  examples?: AdminQuestionExample[]
  starterCodes?: Record<string, string>
  isActive?: boolean
  testCases: Array<{
    input: string
    expectedOutput: string
    isHidden?: boolean
    description?: string
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



