import { supabase } from './supabase'
import { formatErrorMessage } from './errorUtils'
import type { ContentPermission, ContentScopeType } from './contentPermissions'
import type {
  AdminCurriculumModule,
  AdminLearningUnit,
  AdminQuestion,
  AdminQuestionInput,
  AdminQuestionRevision,
  AdminQuestionsDashboardStats,
  AdminTestRunnerResponseData,
} from './superAdminService'

export interface ContentManagerProfile {
  userId: string
  email: string
  name: string
  role: 'CONTENT_MANAGER'
  assignmentId: string
  scopeType: ContentScopeType
  permissions: ContentPermission[]
  assignedModuleIds: string[]
  assignedLearningUnitIds: string[]
  grantedBy: string | null
  grantedAt: string | null
  notes: string | null
}

export interface ContentAuditLogEntry {
  id: string
  actor_user_id: string
  actor_email: string
  actor_role: string
  action: string
  resource_type: string
  resource_id: string | null
  resource_label: string | null
  permission_used: string | null
  previous_values: Record<string, unknown> | null
  updated_values: Record<string, unknown> | null
  change_summary: string | null
  ip_address: string | null
  created_at: string
}

export interface ContentManagerDashboardData {
  scopeType: ContentScopeType
  stats: {
    assignedModulesCount: number
    totalLearningUnits: number
    totalCodingQuestions: number
    draftQuestions: number
    publishedQuestions: number | null
    pendingApprovals: number
    pendingQuestionApprovals: number
    pendingUnitApprovals: number
  }
  assignedModules: Array<{
    id: string
    title: string
    order: number
    status: string
    canManageModule: boolean
    unitCount: number
  }>
  recentlyUpdatedLessons: Array<{
    id: string
    moduleId: string
    title: string
    status: string
    approvalStatus: string
    updatedAt: string
  }>
  recentlyEditedQuestions: Array<{
    id: string
    slug: string
    title: string
    difficulty: string
    learningUnitId: string | null
    status: string
    approvalStatus: string
    updatedAt: string
  }>
  recentActivity: ContentAuditLogEntry[]
}

async function resolveAuthHeaders(forceRefresh = false): Promise<{ headers: Record<string, string>; error?: string }> {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const testToken = localStorage.getItem('kalvi_test_auth_token')
    if (testToken) {
      return { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${testToken}` } }
    }
  }

  let { data: { session }, error: sessionError } = await supabase.auth.getSession()
  if (forceRefresh || (!session?.access_token && !sessionError)) {
    const refreshed = await supabase.auth.refreshSession()
    session = refreshed.data.session
    sessionError = refreshed.error
  }

  if (sessionError || !session?.access_token) {
    return {
      headers: { 'Content-Type': 'application/json' },
      error: 'Your authentication session has expired. Please sign in again.',
    }
  }

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
  }
}

export async function callContentManagerApi<T>(
  path: string,
  payload: Record<string, unknown> = {},
  actionName: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST'
): Promise<{ success: boolean; data?: T; error?: string; statusCode?: number; message?: string }> {
  try {
    const firstAuth = await resolveAuthHeaders(false)
    if (firstAuth.error) {
      return { success: false, error: firstAuth.error, statusCode: 401 }
    }

    const bodyWithAction = { ...payload, action: actionName }
    const makeUrl = () => {
      if (method === 'GET') {
        const params = new URLSearchParams()
        for (const [k, v] of Object.entries(bodyWithAction)) {
          if (v !== undefined && v !== null) params.append(k, String(v))
        }
        return `${path}?${params.toString()}`
      }
      return path
    }

    const executeFetch = async (headers: Record<string, string>) => {
      const opts: RequestInit = {
        method,
        headers,
        ...(method !== 'GET' ? { body: JSON.stringify(bodyWithAction) } : {}),
      }
      let response = await fetch(makeUrl(), opts)
      if (response.status === 404) {
        const fallbackUrl = method === 'GET' ? `/api/content-manager?action=${encodeURIComponent(actionName)}` : '/api/content-manager'
        response = await fetch(fallbackUrl, opts)
      }
      return response
    }

    let response = await executeFetch(firstAuth.headers)
    if (response.status === 401) {
      const retryAuth = await resolveAuthHeaders(true)
      if (!retryAuth.error) {
        response = await executeFetch(retryAuth.headers)
      }
    }

    const json = await response.json().catch(() => null)
    if (!response.ok || !json?.success) {
      const errMsg = json?.message || json?.error || `Request failed (${response.status})`
      return {
        success: false,
        error: formatErrorMessage(errMsg),
        statusCode: response.status,
      }
    }

    return {
      success: true,
      data: json.data as T,
      message: json.message,
      statusCode: response.status,
    }
  } catch (err) {
    return {
      success: false,
      error: formatErrorMessage(err, 'Unable to reach the Content Manager service.'),
    }
  }
}

export async function fetchContentManagerProfile() {
  return callContentManagerApi<ContentManagerProfile>('/api/content-manager/me', {}, 'me', 'GET')
}

export async function fetchContentManagerDashboard() {
  return callContentManagerApi<ContentManagerDashboardData>('/api/content-manager/dashboard', {}, 'dashboard', 'GET')
}

export async function fetchCmCurriculumModules(search?: string) {
  return callContentManagerApi<{
    modules: Array<AdminCurriculumModule & { canManageModule?: boolean; approvalStatus?: string }>
    stats: {
      totalModules: number
      totalLearningUnits: number
      publishedModules: number
      draftModules: number
      publishedUnits: number
      draftUnits: number
    }
  }>('/api/content-manager/curriculum', { search }, 'list_curriculum_modules', 'POST')
}

export async function createCmCurriculumModule(payload: {
  title: string
  description?: string
  order?: number
  status?: string
}) {
  return callContentManagerApi<AdminCurriculumModule>('/api/content-manager/curriculum', payload, 'create_curriculum_module', 'POST')
}

export async function updateCmCurriculumModule(
  id: string,
  payload: { title?: string; description?: string; order?: number; status?: string; isActive?: boolean }
) {
  return callContentManagerApi<AdminCurriculumModule>('/api/content-manager/curriculum', { id, ...payload }, 'update_curriculum_module', 'POST')
}

export async function reorderCmCurriculumModules(orders: Array<{ id: string; order: number }>) {
  return callContentManagerApi<void>('/api/content-manager/curriculum', { orders }, 'reorder_curriculum_modules', 'POST')
}

export async function toggleCmModuleStatus(id: string, isActive?: boolean) {
  return callContentManagerApi<AdminCurriculumModule>('/api/content-manager/curriculum', { id, isActive }, 'toggle_module_status', 'POST')
}

export async function deleteCmCurriculumModule(id: string) {
  return callContentManagerApi<void>('/api/content-manager/curriculum', { id }, 'delete_curriculum_module', 'POST')
}

export async function createCmLearningUnit(payload: {
  moduleId: string
  title: string
  concept: string
  approach?: string
  codingQuestion?: string
  inputFormat?: string
  outputFormat?: string
  readingTimeMinutes?: number
  order?: number
  codeSnippets?: Record<string, string>
  examples?: any[]
  status?: string
  submitForReview?: boolean
}) {
  return callContentManagerApi<AdminLearningUnit>('/api/content-manager/curriculum', payload, 'create_learning_unit', 'POST')
}

export async function updateCmLearningUnit(
  id: string,
  payload: {
    title?: string
    concept?: string
    approach?: string
    codingQuestion?: string
    inputFormat?: string
    outputFormat?: string
    readingTimeMinutes?: number
    order?: number
    codeSnippets?: Record<string, string>
    examples?: any[]
    status?: string
  }
) {
  return callContentManagerApi<AdminLearningUnit>('/api/content-manager/curriculum', { id, ...payload }, 'update_learning_unit', 'POST')
}

export async function submitCmLearningUnitForReview(id: string, changeSummary?: string) {
  return callContentManagerApi<AdminLearningUnit>('/api/content-manager/curriculum', { id, changeSummary }, 'submit_learning_unit_for_review', 'POST')
}

export async function reorderCmLearningUnits(moduleId: string, orders: Array<{ id: string; order: number }>) {
  return callContentManagerApi<void>('/api/content-manager/curriculum', { moduleId, orders }, 'reorder_learning_units', 'POST')
}

export async function toggleCmLearningUnitStatus(id: string, isActive?: boolean) {
  return callContentManagerApi<AdminLearningUnit>('/api/content-manager/curriculum', { id, isActive }, 'toggle_learning_unit_status', 'POST')
}

export async function deleteCmLearningUnit(id: string) {
  return callContentManagerApi<void>('/api/content-manager/curriculum', { id }, 'delete_learning_unit', 'POST')
}

export async function fetchCmQuestions(params: {
  search?: string
  difficulty?: string
  topic?: string
  status?: string
  belt?: string
  learningUnitId?: string
  onlyLearningUnits?: boolean
  onlyBelts?: boolean
  page?: number
  limit?: number
} = {}) {
  return callContentManagerApi<{
    questions: AdminQuestion[]
    stats: AdminQuestionsDashboardStats
    total: number
    page: number
    limit: number
    totalPages: number
  }>('/api/content-manager/questions', params as Record<string, unknown>, 'list_questions', 'POST')
}

export async function fetchCmQuestionById(idOrSlug: string) {
  return callContentManagerApi<AdminQuestion>('/api/content-manager/questions', { id: idOrSlug }, 'get_question', 'POST')
}

export async function fetchCmQuestionPreview(idOrSlug: string) {
  return callContentManagerApi<AdminQuestion>('/api/content-manager/questions', { id: idOrSlug }, 'get_question_preview', 'POST')
}

export async function createCmQuestion(payload: AdminQuestionInput & { submitForReview?: boolean }) {
  return callContentManagerApi<AdminQuestion>('/api/content-manager/questions', payload as unknown as Record<string, unknown>, 'create_question', 'POST')
}

export async function updateCmQuestion(id: string, payload: Partial<AdminQuestionInput> & { submitForReview?: boolean }) {
  return callContentManagerApi<AdminQuestion>('/api/content-manager/questions', { id, ...payload } as Record<string, unknown>, 'update_question', 'POST')
}

export async function submitCmQuestionForReview(id: string, changeSummary?: string) {
  return callContentManagerApi<AdminQuestion>('/api/content-manager/questions', { id, changeSummary }, 'submit_question_for_review', 'POST')
}

export async function duplicateCmQuestion(id: string) {
  return callContentManagerApi<AdminQuestion>('/api/content-manager/questions', { id }, 'duplicate_question', 'POST')
}

export async function toggleCmQuestionStatus(id: string, isActive?: boolean) {
  return callContentManagerApi<AdminQuestion>('/api/content-manager/questions', { id, isActive }, 'toggle_question_status', 'POST')
}

export async function deleteCmQuestion(id: string) {
  return callContentManagerApi<void>('/api/content-manager/questions', { id }, 'delete_question', 'POST')
}

export async function runCmQuestionTests(payload: {
  id?: string
  slug?: string
  language: string
  code: string
  filter?: 'all' | 'public' | 'hidden'
  testCases?: Array<{
    input: string
    expectedOutput: string
    isHidden?: boolean
    description?: string
    displayOrder?: number
  }>
}) {
  return callContentManagerApi<AdminTestRunnerResponseData>('/api/content-manager/questions', payload as Record<string, unknown>, 'run_question_tests', 'POST')
}

export async function fetchCmQuestionRevisions(problemId: string) {
  return callContentManagerApi<AdminQuestionRevision[]>('/api/content-manager/questions', { problemId }, 'list_question_revisions', 'POST')
}

export async function restoreCmQuestionRevision(problemId: string, revisionId: string) {
  return callContentManagerApi<AdminQuestion>('/api/content-manager/questions', { problemId, revisionId }, 'restore_question_revision', 'POST')
}

export async function fetchCmMyRevisions() {
  return callContentManagerApi<{
    auditLogs: ContentAuditLogEntry[]
    questionRevisions: AdminQuestionRevision[]
    scope: 'ALL_REVISIONS' | 'OWN_REVISIONS'
  }>('/api/content-manager/revisions', {}, 'list_my_revisions', 'GET')
}
