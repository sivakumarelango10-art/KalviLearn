import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Search,
  RefreshCw,
  Plus,
  Eye,
  Edit3,
  Copy,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCode,
  Tag,
  Lock,
  Globe,
  Archive,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Play,
  ShieldCheck,
  Terminal,
  Check,
  ArrowLeft,
  Code2,
  Clock,
  Cpu,
  Languages,
  History as HistoryIcon,
} from 'lucide-react'
import {
  AdminQuestion,
  AdminQuestionExample,
  AdminQuestionRevision,
  AdminQuestionsDashboardStats,
  AdminTestRunnerResponseData,
  fetchAdminQuestions,
  fetchAdminQuestionById,
  fetchAdminQuestionPreview,
  createAdminQuestion,
  updateAdminQuestion,
  duplicateAdminQuestion,
  toggleAdminQuestionStatus,
  restoreAdminQuestion,
  deleteAdminQuestion,
  runAdminQuestionTests,
  fetchAdminQuestionRevisions,
  restoreAdminQuestionRevision,
  fetchBelts,
} from '@/lib/superAdminService'
import {
  fetchCmQuestions,
  fetchCmQuestionById,
  fetchCmQuestionPreview,
  createCmQuestion,
  updateCmQuestion,
  duplicateCmQuestion,
  toggleCmQuestionStatus,
  restoreCmQuestion,
  deleteCmQuestion,
  runCmQuestionTests,
  fetchCmQuestionRevisions,
  restoreCmQuestionRevision,
  fetchCmBelts,
} from '@/lib/contentManagerService'
import { CODING_TOPICS } from '@/coding/topics'
import { cn } from '@/lib/utils'

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Easy: {
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-400',
    border: 'border-emerald-800/60',
  },
  Medium: {
    bg: 'bg-amber-950/40',
    text: 'text-amber-400',
    border: 'border-amber-800/60',
  },
  Hard: {
    bg: 'bg-red-950/40',
    text: 'text-red-400',
    border: 'border-red-800/60',
  },
}

interface QuestionFormData {
  id?: string
  title: string
  slug: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  subdivision: string
  beltId?: string | null
  learningUnitId?: string | null
  status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | 'PENDING_REVIEW'
  description: string
  inputFormat: string
  outputFormat: string
  constraints: string
  timeLimitMs: number
  memoryLimitMb: number
  changeSummary?: string
  isActive: boolean
  examples: AdminQuestionExample[]
  testCases: Array<{
    id?: string
    input: string
    expectedOutput: string
    isHidden: boolean
    points?: number
    description?: string
  }>
  starterCodes: Record<string, string>
}

const DEFAULT_FORM: QuestionFormData = {
  title: '',
  slug: '',
  difficulty: 'Easy',
  subdivision: 'Variables & Data Types',
  status: 'PUBLISHED',
  description: '',
  inputFormat: '',
  outputFormat: '',
  constraints: '',
  timeLimitMs: 2000,
  memoryLimitMb: 256,
  changeSummary: '',
  isActive: true,
  examples: [
    {
      label: 'Example 1',
      input: '',
      output: '',
      explanation: '',
    },
  ],
  testCases: [
    {
      input: '',
      expectedOutput: '',
      isHidden: false,
      points: 10,
      description: 'Sample test case',
    },
    {
      input: '',
      expectedOutput: '',
      isHidden: true,
      points: 10,
      description: 'Hidden validation test case',
    },
  ],
  starterCodes: {
    python: '# Language: Python 3\nimport sys\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    solve()\n',
    javascript: '// Language: JavaScript (Node.js)\nconst fs = require("fs");\n\nfunction solve() {\n    const input = fs.readFileSync(0, "utf-8").trim();\n    if (!input) return;\n    // Write your solution here\n}\n\nsolve();\n',
  },
}

export interface SuperAdminQuestionsPageProps {
  initialBelt?: number | 'ALL'
  initialTopic?: string
  learningUnitId?: string
  backRoute?: string
  backLabel?: string
  customTitle?: string
  customDescription?: string
  isEmbedded?: boolean
  unitTitle?: string
  apiMode?: 'super-admin' | 'content-manager'
  grantedPermissions?: string[]
  scopedUnits?: Array<{ id: string; title: string; moduleId?: string }>
  questionMode?: 'practice' | 'learn-coding' | 'all'
  availableBelts?: Array<{ id: string; order: number; name: string; title: string }>
}

export const SuperAdminQuestionsPage: React.FC<SuperAdminQuestionsPageProps> = ({
  initialBelt,
  initialTopic,
  learningUnitId,
  backRoute,
  backLabel,
  customTitle,
  customDescription,
  isEmbedded,
  unitTitle,
  apiMode = 'super-admin',
  grantedPermissions = [],
  scopedUnits,
  questionMode = 'all',
  availableBelts,
}) => {
  const isCmMode = apiMode === 'content-manager'
  const permSet = new Set(grantedPermissions)
  const hasPerm = (p: string) => !isCmMode || permSet.has(p)
  const canCreateQ = hasPerm('content.question.create')
  const canUpdateQ = hasPerm('content.question.update')
  const canDuplicateQ = hasPerm('content.question.duplicate') && canCreateQ
  const canPreviewQ = hasPerm('content.question.preview')
  const canRunTestsQ = hasPerm('content.question.run_tests')
  const canManageExamplesQ = hasPerm('content.example.manage')
  const canManagePublicTestsQ = hasPerm('content.test_case.manage')
  const canManageHiddenTestsQ = hasPerm('content.hidden_test_case.manage')
  const canManageStarterCodeQ = hasPerm('content.starter_code.manage')
  const canPublishQ = hasPerm('content.question.publish')
  const canArchiveQ = hasPerm('content.question.archive')
  const canDeleteQ = hasPerm('content.question.delete')
  const canRestoreRevQ = hasPerm('content.revision.restore')

  const qApi = {
    fetchList: isCmMode ? fetchCmQuestions : fetchAdminQuestions,
    fetchById: isCmMode ? fetchCmQuestionById : fetchAdminQuestionById,
    fetchPreview: isCmMode ? fetchCmQuestionPreview : fetchAdminQuestionPreview,
    create: isCmMode ? createCmQuestion : createAdminQuestion,
    update: isCmMode ? updateCmQuestion : updateAdminQuestion,
    duplicate: isCmMode ? duplicateCmQuestion : duplicateAdminQuestion,
    toggleStatus: isCmMode ? toggleCmQuestionStatus : toggleAdminQuestionStatus,
    restoreQuestion: isCmMode ? restoreCmQuestion : restoreAdminQuestion,
    remove: isCmMode ? deleteCmQuestion : deleteAdminQuestion,
    runTests: isCmMode ? runCmQuestionTests : runAdminQuestionTests,
    fetchRevisions: isCmMode ? fetchCmQuestionRevisions : fetchAdminQuestionRevisions,
    restoreRevision: isCmMode ? restoreCmQuestionRevision : restoreAdminQuestionRevision,
  }
  const [questions, setQuestions] = useState<AdminQuestion[]>([])
  const [stats, setStats] = useState<AdminQuestionsDashboardStats>({
    total: 0,
    published: 0,
    draft: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  })
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Filters
  const [search, setSearch] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('ALL')
  const [topicFilter, setTopicFilter] = useState(initialTopic ?? 'ALL')
  const [beltFilter, setBeltFilter] = useState<number | 'ALL'>(initialBelt ?? 'ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const questionListRequestId = useRef(0)

  // Internal Belts fallback if availableBelts prop is missing
  const [internalBelts, setInternalBelts] = useState<Array<{ id: string; order: number; name: string; title: string }>>([])
  const effectiveBelts = (availableBelts && availableBelts.length > 0) ? availableBelts : internalBelts

  useEffect(() => {
    if (!availableBelts || availableBelts.length === 0) {
      const fetcher = isCmMode ? fetchCmBelts : fetchBelts
      fetcher()
        .then((res: any) => {
          if (res.success && res.data) {
            const bList = Array.isArray(res.data) ? res.data : (res.data.belts || [])
            setInternalBelts(bList)
          }
        })
        .catch(() => {})
    }
  }, [availableBelts, isCmMode])

  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<QuestionFormData>(DEFAULT_FORM)
  const [editorTab, setEditorTab] = useState<'info' | 'content' | 'formats' | 'examples' | 'testcases' | 'languages' | 'runner' | 'revisions'>('info')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Revisions state
  const [revisions, setRevisions] = useState<AdminQuestionRevision[]>([])
  const [revisionsLoading, setRevisionsLoading] = useState(false)
  const [restoringRevisionId, setRestoringRevisionId] = useState<string | null>(null)
  const [selectedRevisionSnapshot, setSelectedRevisionSnapshot] = useState<any | null>(null)

  // Preview Modals
  const [previewQuestion, setPreviewQuestion] = useState<AdminQuestion | null>(null) // Student Preview
  const [adminPreviewQuestion, setAdminPreviewQuestion] = useState<AdminQuestion | null>(null) // Full Super Admin Preview

  // Standalone Test Runner Modal
  const [testRunnerModalQuestion, setTestRunnerModalQuestion] = useState<AdminQuestion | null>(null)

  // Runner state (shared across editor tab and standalone runner modal)
  const [runnerCode, setRunnerCode] = useState<string>('')
  const [runnerLanguage, setRunnerLanguage] = useState<string>('python')
  const [runnerFilter, setRunnerFilter] = useState<'all' | 'public' | 'hidden'>('all')
  const [runnerLoading, setRunnerLoading] = useState<boolean>(false)
  const [runnerResult, setRunnerResult] = useState<AdminTestRunnerResponseData | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Delete Modal
  const [questionToDelete, setQuestionToDelete] = useState<AdminQuestion | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('open_admin_preview') === 'true') {
      setAdminPreviewQuestion({
        id: 'mock-prob-1',
        slug: 'two-sum-multiplier',
        title: 'Two Sum Multiplier (Audited)',
        difficulty: 'Medium',
        topic: '1D Arrays / Lists',
        subdivision: '1D Arrays / Lists',
        status: 'PUBLISHED',
        isActive: true,
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that their product equals target.\n\nDemonstrates full public and hidden test case visibility for Super Admin.',
        inputFormat: 'First line contains integer n and target. Second line contains n space-separated integers.',
        outputFormat: 'Print the two zero-based indices separated by a space.',
        constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
        examples: [
          { label: 'Example 1', input: '4 18\n2 9 11 15', output: '0 1', explanation: 'nums[0] * nums[1] = 2 * 9 = 18' },
        ],
        testCases: [
          { id: 'tc-1', testIndex: 1, isHidden: false, description: 'Visible sample test case', input: '4 18\n2 9 11 15', expectedOutput: '0 1' },
          { id: 'tc-2', testIndex: 2, isHidden: true, description: 'Hidden validation test case 1 (negative)', input: '3 -12\n-3 4 5', expectedOutput: '0 1' },
          { id: 'tc-3', testIndex: 3, isHidden: true, description: 'Hidden validation test case 2 (large scale)', input: '5 100\n1 2 4 25 50', expectedOutput: '2 3' },
        ],
        createdAt: '2026-10-31T09:00:00Z',
        updatedAt: '2026-10-31T09:00:00Z',
      })
    } else if (params.get('open_runner') === 'true') {
      setIsEditorOpen(true)
      setEditorTab('runner')
      setRunnerCode('import sys\n\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    if not lines:\n        return\n    nums = list(map(int, lines[1].split()))\n    target = int(lines[0].split()[1])\n    mp = {}\n    for i, n in enumerate(nums):\n        if n != 0 and target % n == 0:\n            diff = target // n\n            if diff in mp:\n                print(f"{mp[diff]} {i}")\n                return\n        mp[n] = i\n\nif __name__ == "__main__":\n    solve()\n')
      setRunnerResult({
        status: 'ACCEPTED',
        engine: 'native',
        overallTimeMs: 42,
        passedCount: 3,
        totalCount: 3,
        allPassed: true,
        results: [
          { testIndex: 1, isHidden: false, description: 'Visible sample test case', input: '4 18\n2 9 11 15', expectedOutput: '0 1', actualOutput: '0 1\n', executionTimeMs: 12, status: 'passed', passed: true },
          { testIndex: 2, isHidden: true, description: 'Hidden validation test case 1', input: '3 -12\n-3 4 5', expectedOutput: '0 1', actualOutput: '0 1\n', executionTimeMs: 15, status: 'passed', passed: true },
          { testIndex: 3, isHidden: true, description: 'Hidden validation test case 2', input: '5 100\n1 2 4 25 50', expectedOutput: '2 3', actualOutput: '2 3\n', executionTimeMs: 15, status: 'passed', passed: true },
        ],
      })
    } else if (params.get('open_reorder') === 'true') {
      setIsEditorOpen(true)
      setEditorTab('testcases')
    }
  }, [])

  const loadQuestions = async () => {
    const requestId = ++questionListRequestId.current
    try {
      setLoading(true)
      setError(null)
      const res = await qApi.fetchList({
        search: search.trim() || undefined,
        difficulty: difficultyFilter !== 'ALL' ? difficultyFilter : undefined,
        topic: topicFilter !== 'ALL' ? topicFilter : undefined,
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        belt: learningUnitId || questionMode === 'learn-coding' ? undefined : (beltFilter !== 'ALL' ? String(beltFilter) : undefined),
        questionType: questionMode === 'practice' ? 'PRACTICE' : questionMode === 'learn-coding' ? 'LEARN_CODING' : undefined,
        learningUnitId: learningUnitId || undefined,
        page,
        limit: isEmbedded ? 50 : 15,
      })

      // Ignore an older response if a newer filter/page request has already started.
      if (requestId !== questionListRequestId.current) return

      if (res.success && res.data) {
        setQuestions(res.data.questions || [])
        setStats(res.data.stats)
        setTotalPages(res.data.totalPages || 1)
      } else {
        setError(res.error || 'Failed to fetch questions.')
      }
    } catch (err: any) {
      if (requestId === questionListRequestId.current) {
        setError(err?.message || 'Unexpected error occurred while fetching questions.')
      }
    } finally {
      if (requestId === questionListRequestId.current) setLoading(false)
    }
  }

  useEffect(() => {
    loadQuestions()
  }, [difficultyFilter, topicFilter, statusFilter, beltFilter, page, learningUnitId, questionMode])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (page !== 1) {
      setPage(1)
      return
    }
    void loadQuestions()
  }

  const handleResetFilters = () => {
    setSearch('')
    setDifficultyFilter('ALL')
    setTopicFilter('ALL')
    setStatusFilter('ALL')
    setPage(1)
  }

  // Slug generator helper
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (newTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: !isEditing ? generateSlug(newTitle) : prev.slug,
    }))
  }

  // Open Add modal
  const handleOpenAdd = () => {
    setIsEditing(false)
    let initialBeltId: string | null = null
    if (!learningUnitId && questionMode !== 'learn-coding') {
      if (initialBelt && initialBelt !== 'ALL') {
        const found = effectiveBelts.find((b) => b.order === Number(initialBelt) || b.id === String(initialBelt))
        initialBeltId = found ? found.id : effectiveBelts[0]?.id || null
      } else {
        initialBeltId = effectiveBelts[0]?.id || null
      }
    }
    setFormData({
      ...DEFAULT_FORM,
      subdivision: initialTopic || DEFAULT_FORM.subdivision,
      beltId: initialBeltId,
      learningUnitId: learningUnitId || null,
      examples: [
        {
          label: 'Example 1',
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        },
      ],
      testCases: [
        {
          input: '2 7 11 15\n9',
          expectedOutput: '0 1',
          isHidden: false,
          description: 'Visible sample test case',
        },
        {
          input: '3 2 4\n6',
          expectedOutput: '1 2',
          isHidden: true,
          description: 'Hidden evaluation test case',
        },
      ],
    })
    setFormErrors({})
    setEditorTab('info')
    setIsEditorOpen(true)
  }

  // Fetch full content and test cases only when an administrator opens the editor.
  const handleOpenEdit = async (q: AdminQuestion) => {
    setActionLoading(true)
    setError(null)
    try {
      const res = await qApi.fetchById(q.id)
      if (!res.success || !res.data) {
        setError(res.error || 'Failed to load question details for editing.')
        return
      }

      const question = res.data
      setIsEditing(true)
      setFormData({
        id: question.id,
        title: question.title,
        slug: question.slug,
        difficulty: question.difficulty,
        subdivision: question.subdivision,
        beltId: question.learningUnitId
          ? null
          : (effectiveBelts.find((b) => b.id === question.beltId || b.order === question.beltOrder)?.id || question.beltId || null),
        learningUnitId: question.learningUnitId ?? (learningUnitId || null),
        status: question.status || (question.isActive ? 'PUBLISHED' : 'DRAFT'),
        description: question.description || '',
        inputFormat: question.inputFormat || '',
        outputFormat: question.outputFormat || '',
        constraints: question.constraints || question.explanation || '',
        timeLimitMs: question.timeLimitMs || 2000,
        memoryLimitMb: question.memoryLimitMb || 256,
        changeSummary: '',
        isActive: question.isActive,
        examples: question.examples?.length
          ? question.examples
          : [{ label: 'Example 1', input: '', output: '', explanation: '' }],
        testCases: question.testCases?.length
          ? question.testCases.map((tc) => ({
              id: tc.id,
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              isHidden: !!tc.isHidden,
              points: tc.points ?? 10,
              description: tc.description || tc.explanation || '',
            }))
          : [{ input: '', expectedOutput: '', isHidden: false, points: 10, description: '' }],
        starterCodes: question.starterCodes || {
          python: '# Write your solution here\n',
          javascript: '// Write your solution here\n',
        },
      })
      setFormErrors({})
      setEditorTab('info')
      setIsEditorOpen(true)

      // Fetch revisions in background
      setRevisionsLoading(true)
      qApi.fetchRevisions(question.id)
        .then((r: any) => {
          if (r.success && r.data) setRevisions(r.data)
        })
        .finally(() => setRevisionsLoading(false))
    } catch (err: any) {
      setError(err?.message || 'Unable to load question details for editing.')
    } finally {
      setActionLoading(false)
    }
  }

  // Open Preview Modal (Student View - strictly omits hidden tests)
  const handleOpenPreview = async (q: AdminQuestion) => {
    setPreviewQuestion(null)
    try {
      const res = await qApi.fetchPreview(q.id)
      if (res.success && res.data) {
        setPreviewQuestion(res.data)
      } else {
        setError(res.error || 'Failed to load question preview.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error loading preview.')
    }
  }

  // Open Super Admin Full Preview (includes ALL test cases - public and hidden with full inputs/outputs)
  const handleOpenAdminPreview = async (q: AdminQuestion) => {
    setAdminPreviewQuestion(null)
    setActionLoading(true)
    try {
      const res = await qApi.fetchById(q.id)
      if (res.success && res.data) {
        setAdminPreviewQuestion(res.data)
      } else {
        setError(res.error || 'Failed to load Super Admin full preview.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error loading full preview.')
    } finally {
      setActionLoading(false)
    }
  }

  // Open Standalone Test Runner
  const handleOpenTestRunner = async (q: AdminQuestion) => {
    try {
      setActionLoading(true)
      const res = await qApi.fetchById(q.id)
      const targetQ = res.success && res.data ? res.data : q
      setTestRunnerModalQuestion(targetQ)
      setRunnerLanguage('python')
      setRunnerCode(
        targetQ.starterCodes?.python ||
        '# Python 3 solution\\nimport sys\\n\\ndef solve():\\n    lines = sys.stdin.read().splitlines()\\n    if not lines: return\\n    # Process input lines\\n\\nif __name__ == "__main__":\\n    solve()\\n'
      )
      setRunnerResult(null)
      setRunnerFilter('all')
    } catch (err: any) {
      setError(err?.message || 'Error opening test runner.')
    } finally {
      setActionLoading(false)
    }
  }

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // Duplicate Question
  const handleDuplicate = async (q: AdminQuestion) => {
    setActionLoading(true)
    try {
      const res = await qApi.duplicate(q.id)
      if (res.success && res.data) {
        setSuccessMsg(`Question duplicated as draft: "${res.data.title}"`)
        loadQuestions()
      } else {
        setError(res.error || 'Failed to duplicate question.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error duplicating question.')
    } finally {
      setActionLoading(false)
    }
  }

  // Toggle Publish Status
  const handleToggleStatus = async (q: AdminQuestion) => {
    setActionLoading(true)
    try {
      const res = await qApi.toggleStatus(q.id, !q.isActive)
      if (res.success) {
        setSuccessMsg(
          `Question "${q.title}" ${!q.isActive ? 'published to Arena' : 'reverted to draft'}.`
        )
        loadQuestions()
      } else {
        setError(res.error || 'Failed to toggle publication status.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error updating status.')
    } finally {
      setActionLoading(false)
    }
  }

  // Restore / Unarchive Question
  const handleRestoreQuestion = async (q: AdminQuestion) => {
    setActionLoading(true)
    try {
      const res = await qApi.restoreQuestion(q.id)
      if (res.success) {
        setSuccessMsg(`Question "${q.title}" restored to draft.`)
        loadQuestions()
      } else {
        setError(res.error || 'Failed to restore question.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error restoring question.')
    } finally {
      setActionLoading(false)
    }
  }

  // Delete Question
  const handleDeleteConfirm = async () => {
    if (!questionToDelete) return
    setActionLoading(true)
    try {
      const res = await qApi.remove(questionToDelete.id)
      if (res.success) {
        setSuccessMsg(`Question "${questionToDelete.title}" deleted successfully.`)
        setQuestionToDelete(null)
        loadQuestions()
      } else {
        setError(res.error || 'Failed to delete question.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error deleting question.')
    } finally {
      setActionLoading(false)
    }
  }

  // Form Validation & Save
  const handleSaveQuestion = async (publishImmediate?: boolean, submitForReview = false) => {
    const errors: Record<string, string> = {}
    if (!formData.title.trim()) errors.title = 'Title is required.'
    if (!formData.slug.trim()) {
      errors.slug = 'Slug is required.'
    } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(formData.slug.trim())) {
      errors.slug = 'Slug must only contain lowercase letters, numbers, and single hyphens.'
    }
    if (isCmMode && questionMode === 'learn-coding' && !(learningUnitId || formData.learningUnitId)) {
      errors.learningUnitId = 'Please select a Learning Unit for this Learn Coding question.'
    }
    if (!learningUnitId && !formData.learningUnitId && questionMode !== 'learn-coding') {
      if (!formData.beltId || !formData.beltId.trim()) {
        errors.beltId = 'Please select a Practice Belt.'
      }
    }
    if (!formData.description.trim()) errors.description = 'Problem description is required.'
    if (!formData.testCases || formData.testCases.length === 0) {
      errors.testCases = 'At least 1 test case is required.'
    } else {
      const emptyTc = formData.testCases.find(
        (tc) => !tc.input.trim() || !tc.expectedOutput.trim()
      )
      if (emptyTc) {
        errors.testCases = 'All test cases must have non-empty Input and Expected Output.'
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      // Switch to the tab with errors
      if (errors.title || errors.slug || errors.description || errors.learningUnitId || errors.beltId) setEditorTab('info')
      else if (errors.testCases) setEditorTab('testcases')
      return
    }

    setActionLoading(true)
    try {
      const activeState = submitForReview ? false : (publishImmediate !== undefined ? publishImmediate : formData.isActive)
      const resolvedStatus = submitForReview ? 'PENDING_REVIEW' : (publishImmediate === false ? 'DRAFT' : (formData.status || (activeState ? 'PUBLISHED' : 'DRAFT')))
      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        difficulty: formData.difficulty,
        subdivision: formData.subdivision,
        status: resolvedStatus as QuestionFormData['status'],
        submitForReview,
        description: formData.description.trim(),
        inputFormat: formData.inputFormat.trim(),
        outputFormat: formData.outputFormat.trim(),
        constraints: formData.constraints.trim(),
        timeLimitMs: formData.timeLimitMs || 2000,
        memoryLimitMb: formData.memoryLimitMb || 256,
        changeSummary: formData.changeSummary?.trim() || undefined,
        isActive: activeState,
        examples: (!isEditing || canManageExamplesQ) ? formData.examples.filter((e) => e.input.trim() && e.output.trim()) : undefined,
        testCases: formData.testCases.map((tc, idx) => ({
          input: tc.input.trim(),
          expectedOutput: tc.expectedOutput.trim(),
          isHidden: tc.isHidden,
          points: tc.points ?? 10,
          displayOrder: idx + 1,
          description: tc.description?.trim(),
        })),
        starterCodes: (!isEditing || canManageStarterCodeQ) ? formData.starterCodes : undefined,
        // Scope question to lesson and nullify beltId
        learningUnitId: learningUnitId || formData.learningUnitId || undefined,
        beltId: (learningUnitId || formData.learningUnitId) ? null : (formData.beltId || undefined),
      }

      let res
      if (isEditing && formData.id) {
        res = await qApi.update(formData.id, payload)
      } else {
        res = await qApi.create(payload)
      }

      if (res.success) {
        setSuccessMsg(
          isEditing
            ? `Question "${payload.title}" updated successfully.`
            : `Question "${payload.title}" created successfully ${activeState ? '(Published)' : '(Draft)'}.`
        )
        setIsEditorOpen(false)
        loadQuestions()
      } else {
        setError(res.error || 'Failed to save question.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error saving question.')
    } finally {
      setActionLoading(false)
    }
  }

  // Move example up / down
  const handleMoveExample = (idx: number, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1
      if (targetIdx < 0 || targetIdx >= prev.examples.length) return prev
      const copy = [...prev.examples]
      const temp = copy[idx]
      copy[idx] = copy[targetIdx]
      copy[targetIdx] = temp
      return { ...prev, examples: copy }
    })
  }

  // Starter code handlers
  const handleUpdateStarterCode = (lang: string, code: string) => {
    setFormData((prev) => ({
      ...prev,
      starterCodes: {
        ...prev.starterCodes,
        [lang]: code,
      },
    }))
  }

  const handleAddLanguage = (lang: string) => {
    if (!lang) return
    const defaultTemplates: Record<string, string> = {
      python: '# Language: Python 3\nimport sys\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()\n',
      javascript: '// Language: JavaScript (Node.js)\nconst fs = require("fs");\n\nfunction solve() {\n}\n\nsolve();\n',
      nodejs: '// Language: JavaScript (Node.js)\nconst fs = require("fs");\n\nfunction solve() {\n}\n\nsolve();\n',
      cpp: '// Language: C++ (g++)\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}\n',
      java: '// Language: Java (OpenJDK)\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n    }\n}\n',
    }
    const template = defaultTemplates[lang] || `// Starter code for ${lang}\n`
    setFormData((prev) => ({
      ...prev,
      starterCodes: {
        ...prev.starterCodes,
        [lang]: template,
      },
    }))
  }

  const handleRemoveLanguage = (lang: string) => {
    setFormData((prev) => {
      const next = { ...prev.starterCodes }
      delete next[lang]
      return { ...prev, starterCodes: next }
    })
  }

  // Revision Restore Handler
  const handleRestoreRevision = async (rev: AdminQuestionRevision) => {
    if (!formData.id) return
    const confirm = window.confirm(
      `Restore revision v${rev.version} (${rev.changeSummary || 'No summary'})?\n\nThis will restore all question details, examples, test cases, and starter codes.`
    )
    if (!confirm) return

    setRestoringRevisionId(rev.id)
    try {
      const res = await qApi.restoreRevision(formData.id, rev.id)
      if (res.success && res.data) {
        const q = res.data
        setFormData((prev) => ({
          ...prev,
          title: q.title,
          difficulty: q.difficulty,
          subdivision: q.subdivision,
          description: q.description || '',
          inputFormat: q.inputFormat || '',
          outputFormat: q.outputFormat || '',
          constraints: q.constraints || q.explanation || '',
          timeLimitMs: q.timeLimitMs || 2000,
          memoryLimitMb: q.memoryLimitMb || 256,
          status: q.status || (q.isActive ? 'PUBLISHED' : 'DRAFT'),
          examples: q.examples || [],
          testCases: (q.testCases || []).map((tc: any) => ({
            id: tc.id,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: !!tc.isHidden,
            points: tc.points ?? 10,
            description: tc.description || tc.explanation || '',
          })),
          starterCodes: q.starterCodes || prev.starterCodes,
        }))
        setSuccessMsg(`Question successfully restored to revision v${rev.version}.`)
        // Refresh revisions
        const revRes = await qApi.fetchRevisions(formData.id)
        if (revRes.success && revRes.data) setRevisions(revRes.data)
      } else {
        setError(res.error || 'Failed to restore revision.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error restoring revision.')
    } finally {
      setRestoringRevisionId(null)
    }
  }

    // Example handlers
  const handleAddExample = () => {
    setFormData((prev) => ({
      ...prev,
      examples: [
        ...prev.examples,
        {
          label: `Example ${prev.examples.length + 1}`,
          input: '',
          output: '',
          explanation: '',
        },
      ],
    }))
  }

  const handleRemoveExample = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== idx),
    }))
  }

  const handleUpdateExample = (
    idx: number,
    field: keyof AdminQuestionExample,
    val: string
  ) => {
    setFormData((prev) => {
      const copy = [...prev.examples]
      copy[idx] = { ...copy[idx], [field]: val }
      return { ...prev, examples: copy }
    })
  }

  // Test Case handlers
  const handleAddTestCase = (isHidden = false) => {
    setFormData((prev) => ({
      ...prev,
      testCases: [
        ...prev.testCases,
        {
          input: '',
          expectedOutput: '',
          isHidden,
          description: isHidden ? 'Hidden test case' : 'Sample test case',
        },
      ],
    }))
  }

  const handleDuplicateTestCase = (idx: number) => {
    setFormData((prev) => {
      const tc = prev.testCases[idx]
      const copy = [...prev.testCases]
      copy.splice(idx + 1, 0, {
        ...tc,
        description: `${tc.description || 'Test case'} (Copy)`,
      })
      return { ...prev, testCases: copy }
    })
  }

  const handleRemoveTestCase = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== idx),
    }))
  }

  const handleUpdateTestCase = (idx: number, field: string, val: any) => {
    setFormData((prev) => {
      const copy = [...prev.testCases]
      copy[idx] = { ...copy[idx], [field]: val }
      return { ...prev, testCases: copy }
    })
  }

  // Reorder test cases (Move Up / Down)
  const handleMoveTestCase = (idx: number, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1
      if (targetIdx < 0 || targetIdx >= prev.testCases.length) return prev
      const copy = [...prev.testCases]
      const temp = copy[idx]
      copy[idx] = copy[targetIdx]
      copy[targetIdx] = temp
      return { ...prev, testCases: copy }
    })
  }

  // Run tests from the question editor (Tab 5)
  const handleRunEditorTests = async (targetFilter?: 'all' | 'public' | 'hidden') => {
    const filterToUse = targetFilter || runnerFilter
    setRunnerFilter(filterToUse)
    setRunnerLoading(true)
    try {
      const casesToRun = formData.testCases.map((tc, idx) => ({
        testIndex: idx + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isHidden: Boolean(tc.isHidden),
        description: tc.description,
      }))

      const res = await qApi.runTests({
        id: formData.id,
        code: runnerCode || (formData.starterCodes?.[runnerLanguage] || ''),
        language: runnerLanguage,
        filter: filterToUse,
        testCases: casesToRun,
      })

      if (res.success && res.data) {
        setRunnerResult(res.data)
      } else {
        setError(res.error || 'Failed to execute test cases in editor.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error executing tests in editor.')
    } finally {
      setRunnerLoading(false)
    }
  }

  // Run tests from the standalone test runner modal
  const handleRunStandaloneTests = async (targetFilter?: 'all' | 'public' | 'hidden') => {
    if (!testRunnerModalQuestion) return
    const filterToUse = targetFilter || runnerFilter
    setRunnerFilter(filterToUse)
    setRunnerLoading(true)
    try {
      const res = await qApi.runTests({
        id: testRunnerModalQuestion.id,
        slug: testRunnerModalQuestion.slug,
        code: runnerCode,
        language: runnerLanguage,
        filter: filterToUse,
      })

      if (res.success && res.data) {
        setRunnerResult(res.data)
      } else {
        setError(res.error || 'Failed to execute test cases in standalone runner.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error executing standalone tests.')
    } finally {
      setRunnerLoading(false)
    }
  }

  return (
    <div className={isEmbedded ? "space-y-4 pt-6 border-t border-neutral-850" : "space-y-6 pb-12"}>
      {isEmbedded ? (
        <div className="space-y-4">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Coding Questions
                  </h4>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800">
                    {stats.total} Total
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/80">
                    {stats.published} Published
                  </span>
                  {stats.draft > 0 && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/80">
                      {stats.draft} Draft
                    </span>
                  )}
                  {(stats.archived ?? 0) > 0 && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                      {stats.archived} Archived
                    </span>
                  )}
                  {(stats.pendingReview ?? 0) > 0 && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/80">
                      {stats.pendingReview} In Review
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Interactive coding exercises with automated test cases attached to {unitTitle ? `"${unitTitle}"` : 'this lesson'}.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadQuestions}
                disabled={loading}
                className="p-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
                title="Refresh questions"
              >
                <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
              </button>
              {canCreateQ && (<button
                type="button"
                onClick={handleOpenAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-950/30"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Question</span>
              </button>)}
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-red-950/30 border border-red-800/80 text-red-300 text-xs">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-200">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/80 text-emerald-300 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
              <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-200">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Questions list or Empty State */}
          {loading && questions.length === 0 ? (
            <div className="p-8 text-center bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-400 text-xs">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
              Loading lesson questions...
            </div>
          ) : error && questions.length === 0 ? (
            <div className="p-8 text-center bg-neutral-950/80 rounded-xl border border-red-900/40 space-y-3">
              <div className="w-10 h-10 rounded-full bg-red-950/40 border border-red-800/60 flex items-center justify-center mx-auto text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-red-300">
                  Failed to load lesson questions
                </p>
                <p className="text-[11px] text-neutral-400 mt-1 max-w-md mx-auto">
                  {error}
                </p>
              </div>
              <button
                type="button"
                onClick={loadQuestions}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-semibold transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : questions.length === 0 ? (
            <div className="p-8 text-center bg-neutral-950/60 rounded-xl border border-dashed border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-300">
                  No coding questions have been added to this learning unit yet.
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Add coding exercises with automated test cases so learners can practice right inside this lesson.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {questions.map((q) => {
                const diff = DIFFICULTY_COLORS[q.difficulty] || DIFFICULTY_COLORS.Easy
                const totalTests = q.testCaseCount?.total ?? q.testCases?.length ?? 0
                const hiddenTests = q.testCaseCount?.hidden ?? q.testCases?.filter((t) => t.isHidden)?.length ?? 0
                const visibleTests = totalTests - hiddenTests

                return (
                  <div
                    key={q.id}
                    className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700/80 rounded-xl p-3.5 transition-all space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-wrap">
                        <h5 className="font-semibold text-white text-xs truncate">
                          {q.title}
                        </h5>
                        <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 shrink-0">
                          {q.slug}
                        </span>
                        <span
                          className={cn(
                            'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border shrink-0',
                            diff.bg,
                            diff.text,
                            diff.border
                          )}
                        >
                          {q.difficulty}
                        </span>
                        {q.status === 'ARCHIVED' ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-950/40 text-rose-400 border border-rose-800/60 shrink-0">
                            <Archive className="w-2.5 h-2.5" /> Archived
                          </span>
                        ) : q.status === 'PENDING_REVIEW' ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-950/40 text-blue-400 border border-blue-800/60 shrink-0">
                            <Clock className="w-2.5 h-2.5" /> In Review
                          </span>
                        ) : (q.isActive || q.status === 'PUBLISHED') ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 shrink-0">
                            <Globe className="w-2.5 h-2.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-neutral-900 text-neutral-400 border border-neutral-800 shrink-0">
                            <Lock className="w-2.5 h-2.5" /> Draft
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                        {canPreviewQ && (<button
                          type="button"
                          onClick={() => handleOpenPreview(q)}
                          title="Learner Preview (Hides hidden test cases)"
                          className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>)}
                        {(!isCmMode || (canPreviewQ && canManageHiddenTestsQ)) && (<button
                          type="button"
                          onClick={() => handleOpenAdminPreview(q)}
                          title="Admin Full Inspection (All public & hidden test cases)"
                          className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-emerald-400 border border-neutral-800 transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>)}
                        {canRunTestsQ && (<button
                          type="button"
                          onClick={() => handleOpenTestRunner(q)}
                          title="Run Test Cases"
                          className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-blue-400 border border-neutral-800 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>)}
                        {canUpdateQ && (<button
                          type="button"
                          onClick={() => handleOpenEdit(q)}
                          title="Edit Question"
                          className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 border border-neutral-800 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>)}
                        {canDuplicateQ && (<button
                          type="button"
                          onClick={() => handleDuplicate(q)}
                          title="Duplicate as Draft"
                          className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>)}
                        {q.status === 'ARCHIVED' && (canArchiveQ || canUpdateQ) && (
                          <button
                            type="button"
                            onClick={() => handleRestoreQuestion(q)}
                            title="Restore to Draft (Unarchive)"
                            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-cyan-400 border border-neutral-800 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {(canPublishQ || canArchiveQ) && (<button
                          type="button"
                          onClick={() => handleToggleStatus(q)}
                          title={q.isActive ? 'Unpublish to Draft' : (q.status === 'ARCHIVED' ? 'Publish Question (from Archived)' : 'Publish Question')}
                          className={cn(
                            'p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors',
                            q.isActive
                              ? 'text-neutral-400 hover:text-amber-400'
                              : 'text-neutral-400 hover:text-emerald-400'
                          )}
                        >
                          {q.isActive ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                        </button>)}
                        {canDeleteQ && (<button
                          type="button"
                          onClick={() => setQuestionToDelete(q)}
                          title="Delete Question"
                          className="p-1.5 rounded bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 border border-neutral-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>)}
                      </div>
                    </div>

                    {/* Metadata footer */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-neutral-400 font-mono pt-2 border-t border-neutral-900">
                      <span className="flex items-center gap-1">
                        <span className="text-white font-semibold">{totalTests}</span> Test Cases ({visibleTests} public, {hiddenTests} hidden)
                      </span>
                      <span>·</span>

                      <span className="flex items-center gap-1 text-neutral-300">
                        <Code2 className="w-3 h-3 text-neutral-500" />
                        <span>{q.starterCodes && Object.keys(q.starterCodes).length > 0 ? Object.keys(q.starterCodes).map((l) => l.toUpperCase()).join(' · ') : 'PYTHON · JS'}</span>
                      </span>
                      <span>·</span>
                      <span>{q.examples?.length || 0} Examples</span>
                      {q.updatedAt && (
                        <>
                          <span>·</span>

                          <span className="text-neutral-500">Updated {new Date(q.updatedAt).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Optional Breadcrumb Back Link */}
      {backRoute && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400">
          <Link
            to={backRoute}
            className="hover:text-white transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{backLabel || 'Back'}</span>
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-red-400 font-semibold">{customTitle || 'Questions'}</span>
        </nav>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#262626] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-950/40 border border-red-800/60 text-[#ED2A2B]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                {customTitle || 'Questions Management'}
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-950/60 text-red-300 border border-red-800/80 font-mono">
                  {initialBelt ? `Belt ${initialBelt}` : initialTopic ? 'Topic' : 'Arena'}
                </span>
              </h1>
              <p className="text-sm text-neutral-400">
                {customDescription ||
                  'Author, organize, preview, and grade coding problems for the student Problem Arena.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadQuestions}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#333] hover:border-[#555] bg-[#141414] text-neutral-300 text-sm font-medium transition-colors"
            title="Refresh Questions"
          >
            <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
            Refresh
          </button>
          {canCreateQ && (<button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-sm font-semibold transition-all shadow-md shadow-red-950/30"
          >
            <Plus className="w-4 h-4" />
            Create Question
          </button>)}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start justify-between gap-3 p-4 rounded-lg bg-red-950/30 border border-red-800/80 text-red-300 text-sm">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-200">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="flex items-start justify-between gap-3 p-4 rounded-lg bg-emerald-950/30 border border-emerald-800/80 text-emerald-300 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-200">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Total</span>
          <div className="text-2xl font-bold text-white mt-1">{stats.total}</div>
          <div className="text-xs text-neutral-500 mt-1">All Questions</div>
        </div>
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">Published</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{stats.published}</div>
          <div className="text-xs text-neutral-500 mt-1">Live to Students</div>
        </div>
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <span className="text-xs text-amber-400 uppercase tracking-wider font-semibold">Drafts</span>
          <div className="text-2xl font-bold text-amber-300 mt-1">{stats.draft}</div>
          <div className="text-xs text-neutral-500 mt-1">Unpublished</div>
        </div>
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Archived</span>
          <div className="text-2xl font-bold text-neutral-400 mt-1">{stats.archived ?? 0}</div>
          <div className="text-xs text-neutral-500 mt-1">Soft Deleted</div>
        </div>
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">Easy</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{stats.easy}</div>
          <div className="text-xs text-neutral-500 mt-1">Fundamental</div>
        </div>
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <span className="text-xs text-amber-400 uppercase tracking-wider font-semibold">Medium</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">{stats.medium}</div>
          <div className="text-xs text-neutral-500 mt-1">Intermediate</div>
        </div>
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <span className="text-xs text-red-400 uppercase tracking-wider font-semibold">Hard</span>
          <div className="text-2xl font-bold text-red-400 mt-1">{stats.hard}</div>
          <div className="text-xs text-neutral-500 mt-1">Advanced</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121212] border border-[#262626] rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#ED2A2B] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
            />
          </form>

          {/* Difficulty Filter */}
          <div className="md:col-span-2">
            <select
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value)
                setPage(1)
              }}
              className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-neutral-200 outline-none"
            >
              <option value="ALL">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Topic Filter */}
          <div className="md:col-span-2">
            <select
              value={topicFilter}
              onChange={(e) => {
                setTopicFilter(e.target.value)
                setPage(1)
              }}
              className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-neutral-200 outline-none"
            >
              <option value="ALL">All Topics</option>
              {CODING_TOPICS.map((topic) => (
                <option key={topic.id} value={topic.sourceTitle}>
                  {topic.title}
                </option>
              ))}
            </select>
          </div>

          {(!isCmMode || questionMode === 'practice') && (
          <div className="md:col-span-2">
            <select
              value={beltFilter}
              onChange={(e) => {
                setBeltFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))
                setPage(1)
              }}
              className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-neutral-200 outline-none"
            >
              <option value="ALL">All Belts</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((b) => (
                <option key={b} value={b}>
                  Belt {b}
                </option>
              ))}
            </select>
          </div>

          )}
          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPage(1)
              }}
              className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-neutral-200 outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="PENDING_REVIEW">In Review</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {(search || difficultyFilter !== 'ALL' || topicFilter !== 'ALL' || statusFilter !== 'ALL') && (
          <div className="flex items-center justify-between pt-2 border-t border-[#222] text-xs">
            <span className="text-neutral-400">
              Active filters applied. Showing matching results.
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[#ED2A2B] hover:underline font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Questions Table */}
      <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-[#181818] border-b border-[#262626] text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              <tr>
                <th className="py-3 px-4"># / Belt</th>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Topic / Subdivision</th>
                <th className="py-3 px-4 text-center">Examples</th>
                <th className="py-3 px-4 text-center">Test Cases</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {loading && questions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-500">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#ED2A2B]" />
                    Loading questions...
                  </td>
                </tr>
              ) : error && questions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-red-400">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-60 text-red-400" />
                    <p className="font-semibold text-sm">Failed to load questions</p>
                    <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">{error}</p>
                    <button
                      type="button"
                      onClick={loadQuestions}
                      className="mt-3 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-xs font-semibold text-neutral-200 inline-flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry</span>
                    </button>
                  </td>
                </tr>
          ) : questions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-500">
                    <FileCode className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No questions found matching your criteria.
                  </td>
                </tr>
              ) : (
                questions.map((q) => {
                  const diff = DIFFICULTY_COLORS[q.difficulty] || DIFFICULTY_COLORS.Easy
                  const totalTests = q.testCaseCount?.total ?? q.testCases?.length ?? 0
                  const hiddenTests = q.testCaseCount?.hidden ?? q.testCases?.filter((t) => t.isHidden)?.length ?? 0
                  const visibleTests = totalTests - hiddenTests

                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-[#181818]/70 transition-colors group"
                    >
                      {/* # / Belt */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {q.beltOrder ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-neutral-800 text-neutral-200 border border-neutral-700">
                              Belt {q.beltOrder}
                            </span>
                          ) : q.learningUnitId ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/60">
                              Lesson
                            </span>
                          ) : (
                            <span className="text-xs text-neutral-500">—</span>
                          )}
                          <span className="text-xs font-mono font-medium text-neutral-400">
                            #{q.order ?? '—'}
                          </span>
                        </div>
                      </td>

                      {/* Title & Slug */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white">{q.title}</div>
                        <div className="text-xs font-mono text-neutral-500 mt-0.5">
                          {q.slug}
                        </div>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border',
                            diff.bg,
                            diff.text,
                            diff.border
                          )}
                        >
                          {q.difficulty}
                        </span>
                      </td>

                      {/* Topic */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-neutral-300 text-xs">
                          <Tag className="w-3.5 h-3.5 text-neutral-500" />
                          <span className="truncate max-w-[200px]" title={q.subdivision}>
                            {q.subdivision || 'General'}
                          </span>
                        </div>
                      </td>

                      {/* Examples */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#1e1e1e] text-neutral-300 text-xs font-medium">
                          {q.examples?.length || 0}
                        </span>
                      </td>

                      {/* Test Cases */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 text-xs">
                          <span className="font-semibold text-white">{totalTests}</span>
                          <span className="text-neutral-500">
                            ({visibleTests} pub · {hiddenTests} hid)
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {q.status === 'ARCHIVED' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-neutral-900 text-neutral-400 border border-neutral-700">
                            <Archive className="w-3 h-3" /> Archived
                          </span>
                        ) : q.status === 'PENDING_REVIEW' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-950/40 text-blue-400 border border-blue-800/60">
                            <Clock className="w-3 h-3" /> In Review
                          </span>
                        ) : (q.status === 'PUBLISHED' || (q.status !== 'DRAFT' && q.isActive)) ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/60">
                            <Globe className="w-3 h-3" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-950/40 text-amber-400 border border-amber-800/60">
                            <Lock className="w-3 h-3" /> Draft
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right relative">
                        <div className="flex items-center justify-end gap-1">
                          {canPreviewQ && (<button
                            onClick={() => handleOpenPreview(q)}
                            title="Student Preview (Student View)"
                            className="p-1.5 rounded hover:bg-[#262626] text-neutral-400 hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>)}
                          {(!isCmMode || (canPreviewQ && canManageHiddenTestsQ)) && (<button
                            onClick={() => handleOpenAdminPreview(q)}
                            title="Super Admin Full Preview (All Public & Hidden Tests)"
                            className="p-1.5 rounded hover:bg-red-950/40 text-neutral-400 hover:text-red-400 transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>)}
                          {canRunTestsQ && (<button
                            onClick={() => handleOpenTestRunner(q)}
                            title="Admin Test Runner (Run Public & Hidden Tests)"
                            className="p-1.5 rounded hover:bg-blue-950/40 text-neutral-400 hover:text-blue-400 transition-colors"
                          >
                            <Terminal className="w-4 h-4" />
                          </button>)}
                          {canUpdateQ && (<button
                            onClick={() => handleOpenEdit(q)}
                            title="Edit Question"
                            className="p-1.5 rounded hover:bg-[#262626] text-neutral-400 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>)}
                          {canDuplicateQ && (<button
                            onClick={() => handleDuplicate(q)}
                            title="Duplicate as Draft"
                            className="p-1.5 rounded hover:bg-[#262626] text-neutral-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>)}
                          {q.status === 'ARCHIVED' && (canArchiveQ || canUpdateQ) && (
                            <button
                              onClick={() => handleRestoreQuestion(q)}
                              title="Restore to Draft (Unarchive)"
                              className="p-1.5 rounded hover:bg-[#262626] text-neutral-400 hover:text-cyan-400 transition-colors"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                          {(canPublishQ || canArchiveQ) && (<button
                            onClick={() => handleToggleStatus(q)}
                            title={q.isActive ? 'Unpublish to Draft' : (q.status === 'ARCHIVED' ? 'Publish Question (from Archived)' : 'Publish Question')}
                            className={cn(
                              'p-1.5 rounded hover:bg-[#262626] transition-colors',
                              q.isActive
                                ? 'text-neutral-400 hover:text-amber-400'
                                : 'text-neutral-400 hover:text-emerald-400'
                            )}
                          >
                            {q.isActive ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          </button>)}
                          {canDeleteQ && (<button
                            onClick={() => setQuestionToDelete(q)}
                            title="Delete Question"
                            className="p-1.5 rounded hover:bg-red-950/40 text-neutral-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>)}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#262626] flex items-center justify-between text-xs text-neutral-400">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded bg-[#1a1a1a] border border-[#333] hover:border-[#555] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded bg-[#1a1a1a] border border-[#333] hover:border-[#555] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          ADD / EDIT QUESTION MODAL
      ────────────────────────────────────────────────────────────── */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-[#2e2e2e] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#161616]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-950/40 border border-red-800/60 text-[#ED2A2B]">
                  {isEditing ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {isEditing ? `Edit Question: ${formData.title}` : 'Create New Coding Question'}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Define problem statement, examples, constraints, and validation test cases.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#262626]"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#262626] bg-[#141414] px-4 overflow-x-auto">
              <button
                onClick={() => setEditorTab('info')}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap',
                  editorTab === 'info'
                    ? 'border-[#ED2A2B] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                )}
              >
                1. Basic Info
              </button>
              <button
                onClick={() => setEditorTab('content')}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap',
                  (editorTab === 'content' || editorTab === 'formats')
                    ? 'border-[#ED2A2B] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                )}
              >
                2. Question Content
              </button>
              <button
                onClick={() => setEditorTab('examples')}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap',
                  editorTab === 'examples'
                    ? 'border-[#ED2A2B] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                )}
              >
                3. Examples ({formData.examples.length})
              </button>
              <button
                onClick={() => setEditorTab('testcases')}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap',
                  editorTab === 'testcases'
                    ? 'border-[#ED2A2B] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                )}
              >
                4. Test Cases ({formData.testCases.length})
                {formErrors.testCases && (
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>
              <button
                onClick={() => setEditorTab('languages')}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap',
                  editorTab === 'languages'
                    ? 'border-[#ED2A2B] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                )}
              >
                <Languages className="w-3.5 h-3.5 text-indigo-400" />
                5. Languages ({Object.keys(formData.starterCodes || {}).length})
              </button>
              <button
                onClick={() => {
                  setEditorTab('runner')
                  if (!runnerCode.trim()) {
                    setRunnerCode(
                      formData.starterCodes?.[runnerLanguage] ||
                      '# Python 3 solution\nimport sys\n\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    if not lines: return\n    # Write logic\n\nif __name__ == "__main__":\n    solve()\n'
                    )
                  }
                }}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap',
                  editorTab === 'runner'
                    ? 'border-[#ED2A2B] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                )}
              >
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                6. Test Runner
              </button>
              <button
                onClick={() => setEditorTab('revisions')}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap',
                  editorTab === 'revisions'
                    ? 'border-[#ED2A2B] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                )}
              >
                <HistoryIcon className="w-3.5 h-3.5 text-amber-400" />
                7. Revisions {revisions.length > 0 && `(${revisions.length})`}
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* TAB 1: BASIC INFO */}
              {editorTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Question Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Reverse Linked List"
                        className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-white outline-none"
                      />
                      {formErrors.title && (
                        <p className="text-xs text-red-400 mt-1">{formErrors.title}</p>
                      )}
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        URL Slug <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, slug: e.target.value.toLowerCase() }))
                        }
                        placeholder="e.g. reverse-linked-list"
                        className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-white font-mono outline-none"
                      />
                      {formErrors.slug && (
                        <p className="text-xs text-red-400 mt-1">{formErrors.slug}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Difficulty */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Difficulty
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard',
                          }))
                        }
                        className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-white outline-none"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Publication Status
                      </label>
                      <select
                        value={formData.status || (formData.isActive ? 'PUBLISHED' : 'DRAFT')}
                        onChange={(e) => {
                          const s = e.target.value as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
                          setFormData((prev) => ({
                            ...prev,
                            status: s,
                            isActive: s === 'PUBLISHED',
                          }))
                        }}
                        className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-white outline-none"
                      >
                        {(canPublishQ || formData.status === 'PUBLISHED') && <option value="PUBLISHED">Published (Visible to Students)</option>}
                        <option value="DRAFT">Draft (Admin / Studio Only)</option>
                        <option value="PENDING_REVIEW">Pending Review (Submitted)</option>
                        {(canArchiveQ || formData.status === 'ARCHIVED') && <option value="ARCHIVED">Archived</option>}
                      </select>
                    </div>

                    {/* Topic */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Topic / Category
                      </label>
                      <select
                        value={formData.subdivision}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, subdivision: e.target.value }))
                        }
                        className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-sm text-white outline-none"
                      >
                        {CODING_TOPICS.map((topic) => (
                          <option key={topic.id} value={topic.sourceTitle}>
                            {topic.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Association Details */}
                  <div className="p-4 rounded-xl bg-[#181818] border border-[#2e2e2e] space-y-3">
                    <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Question Association
                    </h4>
                    {questionMode !== 'practice' && (isCmMode && !learningUnitId && (questionMode === 'learn-coding' || (scopedUnits && scopedUnits.length > 0))) ? (
                      <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-1">
                          Learning Unit {questionMode === 'learn-coding' ? '*' : ''}
                        </label>
                        <select
                          value={formData.learningUnitId || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, learningUnitId: e.target.value || null, beltId: e.target.value ? null : prev.beltId }))}
                          className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                        >
                          <option value="">Select Learning Unit...</option>
                          {(scopedUnits || []).map((u) => (
                            <option key={u.id} value={u.id}>{u.title}</option>
                          ))}
                        </select>
                        {formErrors.learningUnitId && (
                          <p className="text-xs text-red-400 mt-1">{formErrors.learningUnitId}</p>
                        )}
                      </div>
                    ) : questionMode !== 'practice' && (learningUnitId || formData.learningUnitId) ? (
                      <div className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800 text-indigo-300 font-semibold">
                          Learn Coding Curriculum
                        </span>
                        <span>Attached to Lesson: <strong className="text-white">{unitTitle || formData.learningUnitId}</strong></span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-neutral-400 mb-1">
                            Belt Practice Assignment <span className="text-red-400">*</span>
                          </label>
                          <select
                            value={formData.beltId || ''}
                            onChange={(e) => setFormData((prev) => ({ ...prev, beltId: e.target.value || null, learningUnitId: null }))}
                            className={cn(
                              "w-full bg-[#121212] border rounded-lg px-3 py-2 text-xs text-white outline-none",
                              formErrors.beltId ? "border-red-500" : "border-[#333] focus:border-[#ED2A2B]"
                            )}
                          >
                            <option value="">Select Belt...</option>
                            {effectiveBelts.map((b) => (
                              <option key={b.id} value={b.id}>
                                Belt {b.order} — {b.title || b.name}
                              </option>
                            ))}
                          </select>
                          {formErrors.beltId && (
                            <p className="text-[11px] text-red-400 mt-1">{formErrors.beltId}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Change Summary for Revisions */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Change Summary (Optional note recorded in Revision History)
                    </label>
                    <input
                      type="text"
                      value={formData.changeSummary || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, changeSummary: e.target.value }))}
                      placeholder="e.g. Added edge test cases, updated memory limit"
                      className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: QUESTION CONTENT */}
              {(editorTab === 'content' || editorTab === 'formats') && (
                <div className="space-y-4">
                  {/* Problem Description */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Problem Statement / Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={6}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      placeholder="Describe the problem, input specifications, and core objective..."
                      className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg p-3 text-sm text-white outline-none font-mono"
                    />
                    {formErrors.description && (
                      <p className="text-xs text-red-400 mt-1">{formErrors.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Input Format Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.inputFormat}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, inputFormat: e.target.value }))
                        }
                        placeholder="e.g. The first line contains an integer n. The second line contains n space-separated integers."
                        className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg p-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Output Format Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.outputFormat}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, outputFormat: e.target.value }))
                        }
                        placeholder="e.g. Return the indices of the two numbers that sum up to target."
                        className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg p-3 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Constraints
                    </label>
                    <textarea
                      rows={3}
                      value={formData.constraints}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, constraints: e.target.value }))
                      }
                      placeholder="e.g. 1 <= nums.length <= 10^4&#10;-10^9 <= nums[i] <= 10^9"
                      className="w-full bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg p-3 text-xs text-white outline-none font-mono"
                    />
                  </div>

                  {/* Execution Limits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#181818] border border-[#2e2e2e]">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        Execution Time Limit (ms)
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="10000"
                        step="100"
                        value={formData.timeLimitMs}
                        onChange={(e) => setFormData((prev) => ({ ...prev, timeLimitMs: Number(e.target.value) || 2000 }))}
                        className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                      <span className="text-[11px] text-neutral-500 mt-1 block">Default: 2000 ms</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-blue-400" />
                        Memory Limit (MB)
                      </label>
                      <input
                        type="number"
                        min="32"
                        max="2048"
                        step="32"
                        value={formData.memoryLimitMb}
                        onChange={(e) => setFormData((prev) => ({ ...prev, memoryLimitMb: Number(e.target.value) || 256 }))}
                        className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                      <span className="text-[11px] text-neutral-500 mt-1 block">Default: 256 MB</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: EXAMPLES */}
              {editorTab === 'examples' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-400">
                      Examples are displayed directly in the problem description for students.
                    </p>
                    <button
                      type="button"
                      disabled={!canManageExamplesQ}
                      onClick={handleAddExample}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-200 text-xs font-semibold transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Example
                    </button>
                  </div>

                  {formData.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#181818] border border-[#2e2e2e] space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={example.label || `Example ${idx + 1}`}
                          onChange={(e) => handleUpdateExample(idx, 'label', e.target.value)}
                          className="bg-transparent text-xs font-bold text-neutral-200 border-b border-transparent focus:border-[#ED2A2B] outline-none"
                        />
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveExample(idx, 'up')}
                            className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20"
                            title="Move Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.examples.length - 1}
                            onClick={() => handleMoveExample(idx, 'down')}
                            className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20"
                            title="Move Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          {formData.examples.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveExample(idx)}
                              className="p-1 rounded text-neutral-500 hover:text-red-400"
                              title="Remove Example"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                            Input
                          </label>
                          <textarea
                            rows={2}
                            value={example.input}
                            onChange={(e) => handleUpdateExample(idx, 'input', e.target.value)}
                            placeholder="nums = [2,7,11,15], target = 9"
                            className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded p-2 text-xs text-white font-mono outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                            Output
                          </label>
                          <textarea
                            rows={2}
                            value={example.output}
                            onChange={(e) => handleUpdateExample(idx, 'output', e.target.value)}
                            placeholder="[0,1]"
                            className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded p-2 text-xs text-white font-mono outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                          Explanation (Optional)
                        </label>
                        <input
                          type="text"
                          value={example.explanation || ''}
                          onChange={(e) => handleUpdateExample(idx, 'explanation', e.target.value)}
                          placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                          className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded px-2.5 py-1.5 text-xs text-neutral-300 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: TEST CASES */}
              {editorTab === 'testcases' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-[#181818] border border-[#2e2e2e]">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Test Cases Management
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Test cases are evaluated by the Judge Engine. Hidden test cases are strictly guarded and never exposed to client browsers.
                      </p>
                      {formErrors.testCases && (
                        <p className="text-xs text-red-400 mt-1">{formErrors.testCases}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {canManagePublicTestsQ && (<button
                        type="button"
                        onClick={() => handleAddTestCase(false)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-emerald-400 text-xs font-semibold border border-emerald-900/50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        + Public Test
                      </button>)}
                      {canManageHiddenTestsQ && (<button
                        type="button"
                        onClick={() => handleAddTestCase(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs font-semibold hover:bg-amber-900/40"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        + Hidden Test
                      </button>)}
                    </div>
                  </div>

                  {/* SECTION 1: PUBLIC TEST CASES */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-[#262626]">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <h5 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                          Public Test Cases ({formData.testCases.filter((t) => !t.isHidden).length})
                        </h5>
                      </div>
                      <span className="text-[11px] text-neutral-500">Visible to students in test runner and preview</span>
                    </div>

                    {formData.testCases.filter((t) => !t.isHidden).length === 0 ? (
                      <div className="p-4 rounded-xl border border-dashed border-[#333] text-center text-xs text-neutral-500">
                        No public test cases added yet. Click "+ Public Test" above.
                      </div>
                    ) : (
                      formData.testCases.map((tc, idx) => {
                        if (tc.isHidden) return null
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-emerald-900/30 bg-[#161816] space-y-3 relative group transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs font-mono font-bold text-emerald-400">
                                  #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateTestCase(idx, 'isHidden', true)}
                                  className="px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border bg-emerald-950/60 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/60"
                                  title="Click to convert to Hidden test case"
                                >
                                  <Globe className="w-2.5 h-2.5" /> Public Sample
                                </button>
                                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                                  <span>Points:</span>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={tc.points ?? 10}
                                    onChange={(e) => handleUpdateTestCase(idx, 'points', Number(e.target.value) || 10)}
                                    className="w-12 bg-[#121212] border border-[#333] rounded px-1.5 py-0.5 text-center text-xs text-white"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={tc.description || ''}
                                  onChange={(e) => handleUpdateTestCase(idx, 'description', e.target.value)}
                                  placeholder="Optional description / label"
                                  className="bg-transparent text-xs text-neutral-400 border-b border-transparent focus:border-neutral-500 outline-none w-44"
                                />
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveTestCase(idx, 'up')}
                                  className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20"
                                  title="Move Up"
                                >
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === formData.testCases.length - 1}
                                  onClick={() => handleMoveTestCase(idx, 'down')}
                                  className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20"
                                  title="Move Down"
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDuplicateTestCase(idx)}
                                  className="p-1 rounded text-neutral-500 hover:text-white"
                                  title="Duplicate Test Case"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                {formData.testCases.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveTestCase(idx)}
                                    className="p-1 rounded text-neutral-500 hover:text-red-400"
                                    title="Delete Test Case"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                                  Input (stdin)
                                </label>
                                <textarea
                                  rows={2}
                                  value={tc.input}
                                  onChange={(e) => handleUpdateTestCase(idx, 'input', e.target.value)}
                                  placeholder="Input lines sent to stdin..."
                                  className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded p-2 text-xs text-white font-mono outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                                  Expected Output (stdout)
                                </label>
                                <textarea
                                  rows={2}
                                  value={tc.expectedOutput}
                                  onChange={(e) => handleUpdateTestCase(idx, 'expectedOutput', e.target.value)}
                                  placeholder="Exact expected stdout..."
                                  className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded p-2 text-xs text-white font-mono outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>

                  {/* SECTION 2: HIDDEN TEST CASES */}
                  {canManageHiddenTestsQ ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-[#262626]">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-400" />
                        <h5 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                          Hidden Test Cases ({formData.testCases.filter((t) => t.isHidden).length})
                        </h5>
                      </div>
                      <span className="text-[11px] text-amber-500/80">Guarded server-side only; never sent to student browsers</span>
                    </div>

                    {formData.testCases.filter((t) => t.isHidden).length === 0 ? (
                      <div className="p-4 rounded-xl border border-dashed border-[#333] text-center text-xs text-neutral-500">
                        No hidden test cases added yet. Click "+ Hidden Test" above.
                      </div>
                    ) : (
                      formData.testCases.map((tc, idx) => {
                        if (!tc.isHidden) return null
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-amber-900/40 bg-[#191612] space-y-3 relative group transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs font-mono font-bold text-amber-400">
                                  #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateTestCase(idx, 'isHidden', false)}
                                  className="px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border bg-amber-950/60 text-amber-300 border-amber-800/80 hover:bg-amber-900/60"
                                  title="Click to convert to Public test case"
                                >
                                  <Lock className="w-2.5 h-2.5" /> Hidden Test
                                </button>
                                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                                  <span>Points:</span>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={tc.points ?? 10}
                                    onChange={(e) => handleUpdateTestCase(idx, 'points', Number(e.target.value) || 10)}
                                    className="w-12 bg-[#121212] border border-[#333] rounded px-1.5 py-0.5 text-center text-xs text-white"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={tc.description || ''}
                                  onChange={(e) => handleUpdateTestCase(idx, 'description', e.target.value)}
                                  placeholder="Optional description / label"
                                  className="bg-transparent text-xs text-neutral-400 border-b border-transparent focus:border-neutral-500 outline-none w-44"
                                />
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveTestCase(idx, 'up')}
                                  className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20"
                                  title="Move Up"
                                >
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === formData.testCases.length - 1}
                                  onClick={() => handleMoveTestCase(idx, 'down')}
                                  className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20"
                                  title="Move Down"
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDuplicateTestCase(idx)}
                                  className="p-1 rounded text-neutral-500 hover:text-white"
                                  title="Duplicate Test Case"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                {formData.testCases.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveTestCase(idx)}
                                    className="p-1 rounded text-neutral-500 hover:text-red-400"
                                    title="Delete Test Case"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                                  Input (stdin)
                                </label>
                                <textarea
                                  rows={2}
                                  value={tc.input}
                                  onChange={(e) => handleUpdateTestCase(idx, 'input', e.target.value)}
                                  placeholder="Input lines sent to stdin..."
                                  className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded p-2 text-xs text-white font-mono outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                                  Expected Output (stdout)
                                </label>
                                <textarea
                                  rows={2}
                                  value={tc.expectedOutput}
                                  onChange={(e) => handleUpdateTestCase(idx, 'expectedOutput', e.target.value)}
                                  placeholder="Exact expected stdout..."
                                  className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded p-2 text-xs text-white font-mono outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-[#2e2e2e] bg-[#161616] text-xs text-neutral-400 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Hidden test case management requires the <code className="text-amber-300">content.hidden_test_case.manage</code> permission. Existing hidden test cases remain safely preserved on the server.</span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: PROGRAMMING LANGUAGES */}
              {editorTab === 'languages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Language Starter Code Templates
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Students receive these templates when they start solving this question in the editor.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAddLanguage(e.target.value)
                            e.target.value = ''
                          }
                        }}
                        defaultValue=""
                        className="bg-[#181818] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                      >
                        <option value="" disabled>+ Add Language...</option>
                        {!formData.starterCodes?.python && <option value="python">Python 3</option>}
                        {!formData.starterCodes?.javascript && <option value="javascript">JavaScript (Node.js)</option>}
                        {!formData.starterCodes?.cpp && <option value="cpp">C++ (g++)</option>}
                        {!formData.starterCodes?.java && <option value="java">Java (OpenJDK)</option>}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(formData.starterCodes || {}).map(([lang, code]) => {
                      const labels: Record<string, string> = {
                        python: 'Python 3',
                        javascript: 'JavaScript (Node.js)',
                        nodejs: 'JavaScript (Node.js)',
                        cpp: 'C++ (g++)',
                        java: 'Java (OpenJDK)',
                      }
                      return (
                        <div key={lang} className="p-4 rounded-xl bg-[#181818] border border-[#2e2e2e] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                              {labels[lang] || lang}
                            </span>
                            {Object.keys(formData.starterCodes || {}).length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveLanguage(lang)}
                                className="text-neutral-500 hover:text-red-400 p-1"
                                title="Remove Language"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <textarea
                            rows={6}
                            value={code}
                            readOnly={!canManageStarterCodeQ}
                            onChange={(e) => canManageStarterCodeQ && handleUpdateStarterCode(lang, e.target.value)}
                            placeholder={`Starter code template for ${lang}...`}
                            className="w-full bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded p-3 text-xs text-neutral-200 font-mono outline-none"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TAB 6: ADMIN TEST RUNNER */}
              {editorTab === 'runner' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-blue-300 text-xs flex items-start gap-2.5">
                    <Terminal className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                    <div>
                      <strong className="block font-semibold">Super Admin Test Runner</strong>
                      <span>
                        Execute solutions against both public samples and hidden test cases using the secure backend Judge Engine.
                        Inspect exact stdout, execution times, diffs, and error outputs in real time.
                      </span>
                    </div>
                  </div>

                  {/* Runner Controls Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#181818] border border-[#2e2e2e] rounded-xl">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-neutral-300">Language:</label>
                      <select
                        value={runnerLanguage}
                        onChange={(e) => {
                          const lang = e.target.value
                          setRunnerLanguage(lang)
                          if (formData.starterCodes?.[lang]) {
                            setRunnerCode(formData.starterCodes[lang])
                          }
                        }}
                        className="bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                      >
                        <option value="python">Python 3</option>
                        <option value="nodejs">JavaScript (Node.js)</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          if (formData.starterCodes?.[runnerLanguage]) {
                            setRunnerCode(formData.starterCodes[runnerLanguage])
                          } else if (runnerLanguage === 'python') {
                            setRunnerCode('# Solution implementation\nimport sys\n\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    if not lines: return\n    # Write logic\n\nif __name__ == "__main__":\n    solve()\n')
                          }
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#222] hover:bg-[#333] text-neutral-300 text-xs font-medium"
                        title="Reset code to starter template"
                      >
                        <RefreshCw className="w-3 h-3" /> Reset Starter
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={runnerLoading}
                        onClick={() => handleRunEditorTests('public')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-200 text-xs font-semibold disabled:opacity-40"
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        Run Public ({formData.testCases.filter((t) => !t.isHidden).length})
                      </button>
                      <button
                        type="button"
                        disabled={runnerLoading}
                        onClick={() => handleRunEditorTests('hidden')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs font-semibold hover:bg-amber-900/40 disabled:opacity-40"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        Run Hidden ({formData.testCases.filter((t) => t.isHidden).length})
                      </button>
                      <button
                        type="button"
                        disabled={runnerLoading}
                        onClick={() => handleRunEditorTests('all')}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold shadow-md shadow-red-950/40 disabled:opacity-40"
                      >
                        <Play className={cn('w-3.5 h-3.5 fill-current', runnerLoading && 'animate-spin')} />
                        {runnerLoading ? 'Running...' : `Run All Tests (${formData.testCases.length})`}
                      </button>
                    </div>
                  </div>

                  {/* Solution Code Editor */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Solution Code ({runnerLanguage}):
                    </label>
                    <textarea
                      rows={8}
                      value={runnerCode}
                      onChange={(e) => setRunnerCode(e.target.value)}
                      placeholder="# Enter your solution here to test against the test cases..."
                      className="w-full bg-[#141414] border border-[#333] focus:border-[#ED2A2B] rounded-lg p-3 text-xs text-neutral-200 font-mono outline-none"
                    />
                  </div>

                  {/* Live Results Panel */}
                  {runnerLoading && (
                    <div className="p-8 rounded-xl bg-[#161616] border border-[#2e2e2e] text-center text-neutral-400 text-sm">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#ED2A2B]" />
                      Executing solution in judge sandbox...
                    </div>
                  )}

                  {!runnerLoading && runnerResult && (
                    <div className="space-y-4 pt-2">
                      <div
                        className={cn(
                          'p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm',
                          runnerResult.allPassed
                            ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                            : 'bg-red-950/30 border-red-800/80 text-red-200'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {runnerResult.allPassed ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                          )}
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>Status: {runnerResult.status}</span>
                              <span className="text-xs px-2 py-0.5 rounded bg-black/40 border border-current font-mono">
                                {runnerResult.passedCount} / {runnerResult.totalCount} Passed (
                                {Math.round((runnerResult.passedCount / (runnerResult.totalCount || 1)) * 100)}%)
                              </span>
                            </div>
                            <div className="text-xs text-neutral-400 mt-0.5">
                              Filter: <span className="uppercase font-semibold">{runnerFilter}</span> · Engine: {runnerResult.engine} · Total Time: {runnerResult.overallTimeMs}ms
                            </div>
                          </div>
                        </div>

                        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-black/50 border border-neutral-700">
                          {runnerResult.allPassed ? 'ALL TEST CASES VERIFIED' : 'FAILED TEST CASES DETECTED'}
                        </div>
                      </div>

                      {runnerResult.compilationError && (
                        <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono whitespace-pre-wrap">
                          <strong className="block text-sm font-sans font-bold text-red-200 mb-1">
                            Compilation / Sandbox Error:
                          </strong>
                          {runnerResult.compilationError}
                        </div>
                      )}

                      <div className="space-y-3">
                        {runnerResult.results.map((r, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              'p-4 rounded-xl border space-y-3 transition-colors',
                              r.passed
                                ? 'bg-[#141814] border-emerald-900/40'
                                : 'bg-[#181414] border-red-900/50'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-neutral-400">
                                  #{r.testIndex}
                                </span>
                                <span
                                  className={cn(
                                    'px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border',
                                    r.isHidden
                                      ? 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                                      : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                                  )}
                                >
                                  {r.isHidden ? (
                                    <>
                                      <Lock className="w-2.5 h-2.5" /> Hidden Test
                                    </>
                                  ) : (
                                    <>
                                      <Globe className="w-2.5 h-2.5" /> Public Sample
                                    </>
                                  )}
                                </span>
                                {r.description && (
                                  <span className="text-xs text-neutral-400 font-medium">
                                    {r.description}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-neutral-500">
                                  {r.executionTimeMs}ms
                                </span>
                                <span
                                  className={cn(
                                    'px-2.5 py-0.5 rounded-full text-xs font-bold border',
                                    r.passed
                                      ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                                      : 'bg-red-950 text-red-400 border-red-700'
                                  )}
                                >
                                  {r.status.toUpperCase()}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                              <div className="bg-[#101010] border border-[#2a2a2a] rounded-lg p-2.5">
                                <span className="text-neutral-500 font-semibold block mb-1">Input (stdin):</span>
                                <pre className="font-mono text-neutral-300 whitespace-pre-wrap max-h-28 overflow-y-auto">
                                  {r.input || '(empty)'}
                                </pre>
                              </div>
                              <div className="bg-[#101010] border border-[#2a2a2a] rounded-lg p-2.5">
                                <span className="text-neutral-500 font-semibold block mb-1">Expected Output:</span>
                                <pre className="font-mono text-neutral-300 whitespace-pre-wrap max-h-28 overflow-y-auto">
                                  {r.expectedOutput || '(empty)'}
                                </pre>
                              </div>
                              <div className="bg-[#101010] border border-[#2a2a2a] rounded-lg p-2.5">
                                <span className="text-neutral-500 font-semibold block mb-1">Actual Stdout:</span>
                                <pre
                                  className={cn(
                                    'font-mono whitespace-pre-wrap max-h-28 overflow-y-auto',
                                    r.passed ? 'text-emerald-300' : 'text-red-400'
                                  )}
                                >
                                  {r.actualOutput || '(no output)'}
                                </pre>
                              </div>
                            </div>

                            {r.error && (
                              <div className="p-2.5 rounded bg-red-950/40 border border-red-900/60 text-red-300 text-xs font-mono">
                                <strong className="font-sans font-semibold">Error:</strong> {r.error}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: REVISION HISTORY */}
              {editorTab === 'revisions' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-300 text-xs flex items-start gap-2.5">
                    <HistoryIcon className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <div>
                      <strong className="block font-semibold">Immutable Revision History</strong>
                      <span>
                        Every modification to this question automatically produces an immutable versioned snapshot.
                        You can inspect snapshots and restore this question to any prior state at any time.
                      </span>
                    </div>
                  </div>

                  {!formData.id ? (
                    <div className="p-8 rounded-xl bg-[#161616] border border-dashed border-[#333] text-center text-neutral-400 text-xs">
                      Revision history will begin recording automatically once this question is created.
                    </div>
                  ) : revisionsLoading ? (
                    <div className="p-8 rounded-xl bg-[#161616] border border-[#2e2e2e] text-center text-neutral-400 text-sm">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#ED2A2B]" />
                      Loading revision history...
                    </div>
                  ) : revisions.length === 0 ? (
                    <div className="p-8 rounded-xl bg-[#161616] border border-dashed border-[#333] text-center text-neutral-400 text-xs">
                      No historical revisions found for this question yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {revisions.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-4 rounded-xl bg-[#181818] border border-[#2e2e2e] space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-400 font-mono text-xs font-bold">
                                v{rev.version}
                              </span>
                              <div>
                                <span className="text-xs font-bold text-white block">
                                  {rev.changeSummary || 'No change summary provided'}
                                </span>
                                <span className="text-[11px] text-neutral-500">
                                  {new Date(rev.createdAt).toLocaleString()} · Author: {rev.changedBy || 'Super Admin'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedRevisionSnapshot(rev.snapshot)}
                                className="px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-300 text-xs font-semibold"
                              >
                                View Snapshot
                              </button>
                              {canRestoreRevQ && (<button
                                type="button"
                                disabled={restoringRevisionId === rev.id}
                                onClick={() => handleRestoreRevision(rev)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold disabled:opacity-40"
                              >
                                <RefreshCw className={cn('w-3.5 h-3.5', restoringRevisionId === rev.id && 'animate-spin')} />
                                {restoringRevisionId === rev.id ? 'Restoring...' : 'Restore This Version'}
                              </button>)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Snapshot Inspector Modal */}
                  {selectedRevisionSnapshot && (
                    <div className="p-4 rounded-xl bg-[#141414] border border-[#333] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-300">Raw Snapshot Inspector</span>
                        <button
                          type="button"
                          onClick={() => setSelectedRevisionSnapshot(null)}
                          className="text-xs text-neutral-500 hover:text-white"
                        >
                          Close
                        </button>
                      </div>
                      <pre className="font-mono text-xs text-neutral-300 bg-[#0d0d0d] p-3 rounded max-h-60 overflow-y-auto whitespace-pre-wrap">
                        {JSON.stringify(selectedRevisionSnapshot, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#262626] bg-[#161616] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <span>
                  Status:{' '}
                  <strong className={formData.isActive ? 'text-emerald-400' : 'text-neutral-300'}>
                    {formData.isActive ? 'Will Publish' : 'Save as Draft'}
                  </strong>
                </span>
                {canPublishQ && (<button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                  className="text-xs underline text-neutral-400 hover:text-white"
                >
                  Toggle
                </button>)}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#333] hover:border-[#555] text-neutral-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleSaveQuestion(false)}
                  className="px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-200 text-xs font-semibold disabled:opacity-40"
                >
                  Save as Draft
                </button>
                {canPublishQ ? (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleSaveQuestion(true)}
                    className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold disabled:opacity-40 shadow-md shadow-red-950/40"
                  >
                    {actionLoading ? 'Saving...' : isEditing ? 'Update & Publish' : 'Publish Question'}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleSaveQuestion(false, true)}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold disabled:opacity-40 shadow-md"
                  >
                    {actionLoading ? 'Submitting...' : 'Submit for Review'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PREVIEW MODAL (STUDENT VIEW - STRICTLY OMITS HIDDEN TESTS)
      ────────────────────────────────────────────────────────────── */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-[#2e2e2e] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
            {/* Header */}
            <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#161616]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-800/60 text-blue-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Student Preview: {previewQuestion.title}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Exact representation of what students see in the Problem Arena.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewQuestion(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#262626]"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Badges bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                    (DIFFICULTY_COLORS[previewQuestion.difficulty] || DIFFICULTY_COLORS.Easy).bg,
                    (DIFFICULTY_COLORS[previewQuestion.difficulty] || DIFFICULTY_COLORS.Easy).text,
                    (DIFFICULTY_COLORS[previewQuestion.difficulty] || DIFFICULTY_COLORS.Easy).border
                  )}
                >
                  {previewQuestion.difficulty}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1e1e1e] border border-[#333] text-neutral-300">
                  {previewQuestion.subdivision}
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  Slug: {previewQuestion.slug}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Problem Description
                </h3>
                <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#161616] border border-[#262626] rounded-xl p-4">
                  {previewQuestion.description}
                </div>
              </div>

              {/* Input / Output Formats */}
              {(previewQuestion.inputFormat || previewQuestion.outputFormat) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previewQuestion.inputFormat && (
                    <div className="bg-[#161616] border border-[#262626] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1">
                        Input Format
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap">
                        {previewQuestion.inputFormat}
                      </p>
                    </div>
                  )}
                  {previewQuestion.outputFormat && (
                    <div className="bg-[#161616] border border-[#262626] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1">
                        Output Format
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap">
                        {previewQuestion.outputFormat}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Constraints */}
              {(previewQuestion.constraints || previewQuestion.explanation) && (
                <div>
                  <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-2">
                    Constraints
                  </h3>
                  <div className="bg-[#161616] border border-[#262626] rounded-xl p-3 text-xs text-neutral-300 font-mono whitespace-pre-wrap">
                    {previewQuestion.constraints || previewQuestion.explanation}
                  </div>
                </div>
              )}

              {/* Examples */}
              {previewQuestion.examples?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Examples
                  </h3>
                  {previewQuestion.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-[#161616] border border-[#262626] rounded-xl p-4 space-y-2 text-xs"
                    >
                      <div className="font-bold text-neutral-200">{ex.label || `Example ${i + 1}`}</div>
                      <div className="space-y-1">
                        <div>
                          <span className="text-neutral-500 font-semibold">Input: </span>
                          <code className="text-neutral-200 font-mono bg-[#111] px-1.5 py-0.5 rounded">
                            {ex.input}
                          </code>
                        </div>
                        <div>
                          <span className="text-neutral-500 font-semibold">Output: </span>
                          <code className="text-emerald-400 font-mono bg-[#111] px-1.5 py-0.5 rounded">
                            {ex.output}
                          </code>
                        </div>
                        {ex.explanation && (
                          <div className="text-neutral-400 pt-1">
                            <span className="font-semibold text-neutral-500">Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Security Banner regarding Hidden Test Cases */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-300 text-xs flex items-start gap-2.5">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <strong className="block font-semibold">Hidden Test Cases Protected</strong>
                  <span>
                    Hidden test cases are strictly excluded from this preview and student client payloads.
                    The Judge Engine evaluates them on the backend during code execution.
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#262626] bg-[#161616] flex justify-end">
              <button
                onClick={() => setPreviewQuestion(null)}
                className="px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-200 text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUPER ADMIN FULL PREVIEW MODAL (INCLUDES ALL HIDDEN TESTS)
      ────────────────────────────────────────────────────────────── */}
      {adminPreviewQuestion && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-red-900/60 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
            {/* Header */}
            <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#161616]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-950/40 border border-red-800/60 text-[#ED2A2B]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Super Admin Full Preview: {adminPreviewQuestion.title}
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-950/60 text-red-300 border border-red-800/80 font-mono">
                      Full Access
                    </span>
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Administrative master inspection view. Displays all problem metadata, constraints, examples, and every public/hidden test case.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAdminPreviewQuestion(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#262626]"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Badges bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                    (DIFFICULTY_COLORS[adminPreviewQuestion.difficulty] || DIFFICULTY_COLORS.Easy).bg,
                    (DIFFICULTY_COLORS[adminPreviewQuestion.difficulty] || DIFFICULTY_COLORS.Easy).text,
                    (DIFFICULTY_COLORS[adminPreviewQuestion.difficulty] || DIFFICULTY_COLORS.Easy).border
                  )}
                >
                  {adminPreviewQuestion.difficulty}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1e1e1e] border border-[#333] text-neutral-300">
                  {adminPreviewQuestion.subdivision}
                </span>
                <span className="text-xs text-neutral-400 font-mono bg-[#181818] px-2 py-0.5 rounded border border-[#2e2e2e]">
                  Slug: {adminPreviewQuestion.slug}
                </span>
                <span
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                    adminPreviewQuestion.status === 'ARCHIVED'
                      ? 'bg-rose-950/40 text-rose-400 border-rose-800/60'
                      : adminPreviewQuestion.status === 'PENDING_REVIEW'
                      ? 'bg-blue-950/40 text-blue-400 border-blue-800/60'
                      : (adminPreviewQuestion.isActive || adminPreviewQuestion.status === 'PUBLISHED')
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                  )}
                >
                  Status: {adminPreviewQuestion.status || (adminPreviewQuestion.isActive ? 'PUBLISHED' : 'DRAFT')}
                </span>
                {adminPreviewQuestion.createdAt && (
                  <span className="text-xs text-neutral-500">
                    Created: {new Date(adminPreviewQuestion.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Problem Description
                </h3>
                <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#161616] border border-[#262626] rounded-xl p-4">
                  {adminPreviewQuestion.description}
                </div>
              </div>

              {/* Input / Output Formats */}
              {(adminPreviewQuestion.inputFormat || adminPreviewQuestion.outputFormat) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adminPreviewQuestion.inputFormat && (
                    <div className="bg-[#161616] border border-[#262626] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1">
                        Input Format
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap">
                        {adminPreviewQuestion.inputFormat}
                      </p>
                    </div>
                  )}
                  {adminPreviewQuestion.outputFormat && (
                    <div className="bg-[#161616] border border-[#262626] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1">
                        Output Format
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap">
                        {adminPreviewQuestion.outputFormat}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Constraints */}
              {(adminPreviewQuestion.constraints || adminPreviewQuestion.explanation) && (
                <div>
                  <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-2">
                    Constraints
                  </h3>
                  <div className="bg-[#161616] border border-[#262626] rounded-xl p-3 text-xs text-neutral-300 font-mono whitespace-pre-wrap">
                    {adminPreviewQuestion.constraints || adminPreviewQuestion.explanation}
                  </div>
                </div>
              )}

              {/* Examples */}
              {adminPreviewQuestion.examples && adminPreviewQuestion.examples.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Examples ({adminPreviewQuestion.examples.length})
                  </h3>
                  {adminPreviewQuestion.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-[#161616] border border-[#262626] rounded-xl p-4 space-y-2 text-xs"
                    >
                      <div className="font-bold text-neutral-200">{ex.label || `Example ${i + 1}`}</div>
                      <div className="space-y-1">
                        <div>
                          <span className="text-neutral-500 font-semibold">Input: </span>
                          <code className="text-neutral-200 font-mono bg-[#111] px-1.5 py-0.5 rounded">
                            {ex.input}
                          </code>
                        </div>
                        <div>
                          <span className="text-neutral-500 font-semibold">Output: </span>
                          <code className="text-emerald-400 font-mono bg-[#111] px-1.5 py-0.5 rounded">
                            {ex.output}
                          </code>
                        </div>
                        {ex.explanation && (
                          <div className="text-neutral-400 pt-1">
                            <span className="font-semibold text-neutral-500">Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Complete Test Suite Section (Public & Hidden) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      Complete Test Suite ({adminPreviewQuestion.testCases?.length || 0} Test Cases)
                      <span className="text-xs font-normal text-neutral-400">
                        ({adminPreviewQuestion.testCases?.filter((t) => !t.isHidden).length || 0} Public · {adminPreviewQuestion.testCases?.filter((t) => t.isHidden).length || 0} Hidden)
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Super Admin Full View — displays every public sample and every hidden test case with full stdin and expected stdout.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const target = adminPreviewQuestion
                      setAdminPreviewQuestion(null)
                      handleOpenTestRunner(target)
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-800/60 text-blue-300 hover:bg-blue-900/40 text-xs font-semibold"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    Open in Test Runner
                  </button>
                </div>

                <div className="space-y-3">
                  {(adminPreviewQuestion.testCases || []).map((tc, idx) => (
                    <div
                      key={tc.id || idx}
                      className={cn(
                        'p-4 rounded-xl border space-y-3',
                        tc.isHidden
                          ? 'bg-[#181512] border-amber-900/50'
                          : 'bg-[#161616] border-[#2e2e2e]'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-neutral-400">
                            #{idx + 1}
                          </span>
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border',
                              tc.isHidden
                                ? 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                                : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                            )}
                          >
                            {tc.isHidden ? (
                              <>
                                <Lock className="w-2.5 h-2.5" /> Hidden Validation Case
                              </>
                            ) : (
                              <>
                                <Globe className="w-2.5 h-2.5" /> Public Sample
                              </>
                            )}
                          </span>
                          {tc.description && (
                            <span className="text-xs text-neutral-400 font-medium">
                              {tc.description}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#101010] border border-[#2a2a2a] rounded-lg p-3">
                          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                            <span>Input (stdin)</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(tc.input, `admin-in-${idx}`)}
                              className="text-neutral-500 hover:text-white"
                              title="Copy Input"
                            >
                              {copiedField === `admin-in-${idx}` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <pre className="font-mono text-neutral-200 whitespace-pre-wrap max-h-32 overflow-y-auto">
                            {tc.input || '(empty input)'}
                          </pre>
                        </div>

                        <div className="bg-[#101010] border border-[#2a2a2a] rounded-lg p-3">
                          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                            <span>Expected Output (stdout)</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(tc.expectedOutput, `admin-exp-${idx}`)}
                              className="text-neutral-500 hover:text-white"
                              title="Copy Expected Output"
                            >
                              {copiedField === `admin-exp-${idx}` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <pre className="font-mono text-emerald-400 whitespace-pre-wrap max-h-32 overflow-y-auto">
                            {tc.expectedOutput || '(empty output)'}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#262626] bg-[#161616] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const target = adminPreviewQuestion
                    setAdminPreviewQuestion(null)
                    handleOpenEdit(target)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-200 text-xs font-semibold"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Question
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = adminPreviewQuestion
                    setAdminPreviewQuestion(null)
                    handleOpenTestRunner(target)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-800/60 text-blue-300 hover:bg-blue-900/40 text-xs font-semibold"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Test Runner
                </button>
              </div>

              <button
                type="button"
                onClick={() => setAdminPreviewQuestion(null)}
                className="px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-200 text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STANDALONE ADMIN TEST RUNNER MODAL
      ────────────────────────────────────────────────────────────── */}
      {testRunnerModalQuestion && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-[#2e2e2e] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
            {/* Header */}
            <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#161616]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-800/60 text-blue-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Admin Test Runner: {testRunnerModalQuestion.title}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Run solutions against all public and hidden test cases with backend judge evaluation.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTestRunnerModalQuestion(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#262626]"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#181818] border border-[#2e2e2e] rounded-xl">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-neutral-300">Language:</label>
                  <select
                    value={runnerLanguage}
                    onChange={(e) => {
                      const lang = e.target.value
                      setRunnerLanguage(lang)
                      if (testRunnerModalQuestion.starterCodes?.[lang]) {
                        setRunnerCode(testRunnerModalQuestion.starterCodes[lang])
                      }
                    }}
                    className="bg-[#121212] border border-[#333] focus:border-[#ED2A2B] rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                  >
                    <option value="python">Python 3</option>
                    <option value="nodejs">JavaScript (Node.js)</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (testRunnerModalQuestion.starterCodes?.[runnerLanguage]) {
                        setRunnerCode(testRunnerModalQuestion.starterCodes[runnerLanguage])
                      } else if (runnerLanguage === 'python') {
                        setRunnerCode('# Python 3 solution\\nimport sys\\n\\ndef solve():\\n    lines = sys.stdin.read().splitlines()\\n    if not lines: return\\n    # Write logic\\n\\nif __name__ == "__main__":\\n    solve()\\n')
                      }
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#222] hover:bg-[#333] text-neutral-300 text-xs font-medium"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Starter
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={runnerLoading}
                    onClick={() => handleRunStandaloneTests('public')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-200 text-xs font-semibold disabled:opacity-40"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    Run Public Tests
                  </button>
                  <button
                    type="button"
                    disabled={runnerLoading}
                    onClick={() => handleRunStandaloneTests('hidden')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs font-semibold hover:bg-amber-900/40 disabled:opacity-40"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    Run Hidden Tests
                  </button>
                  <button
                    type="button"
                    disabled={runnerLoading}
                    onClick={() => handleRunStandaloneTests('all')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold shadow-md shadow-red-950/40 disabled:opacity-40"
                  >
                    <Play className={cn('w-3.5 h-3.5 fill-current', runnerLoading && 'animate-spin')} />
                    {runnerLoading ? 'Running...' : 'Run All Tests'}
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Solution Code:
                </label>
                <textarea
                  rows={8}
                  value={runnerCode}
                  onChange={(e) => setRunnerCode(e.target.value)}
                  placeholder="# Write your solution here..."
                  className="w-full bg-[#141414] border border-[#333] focus:border-[#ED2A2B] rounded-lg p-3 text-xs text-neutral-200 font-mono outline-none"
                />
              </div>

              {/* Live Results Panel */}
              {runnerLoading && (
                <div className="p-8 rounded-xl bg-[#161616] border border-[#2e2e2e] text-center text-neutral-400 text-sm">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#ED2A2B]" />
                  Evaluating solution against judge sandbox...
                </div>
              )}

              {!runnerLoading && runnerResult && (
                <div className="space-y-4 pt-2">
                  <div
                    className={cn(
                      'p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm',
                      runnerResult.allPassed
                        ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                        : 'bg-red-950/30 border-red-800/80 text-red-200'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      {runnerResult.allPassed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>Status: {runnerResult.status}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-black/40 border border-current font-mono">
                            {runnerResult.passedCount} / {runnerResult.totalCount} Passed (
                            {Math.round((runnerResult.passedCount / (runnerResult.totalCount || 1)) * 100)}%)
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          Filter: <span className="uppercase font-semibold">{runnerFilter}</span> · Engine: {runnerResult.engine} · Time: {runnerResult.overallTimeMs}ms
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-black/50 border border-neutral-700">
                      {runnerResult.allPassed ? 'ALL TEST CASES PASSED' : 'TEST FAILURES DETECTED'}
                    </div>
                  </div>

                  {runnerResult.compilationError && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono whitespace-pre-wrap">
                      <strong className="block text-sm font-sans font-bold text-red-200 mb-1">
                        Compilation / Sandbox Error:
                      </strong>
                      {runnerResult.compilationError}
                    </div>
                  )}

                  <div className="space-y-3">
                    {runnerResult.results.map((r, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'p-4 rounded-xl border space-y-3 transition-colors',
                          r.passed
                            ? 'bg-[#141814] border-emerald-900/40'
                            : 'bg-[#181414] border-red-900/50'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-neutral-400">
                              #{r.testIndex}
                            </span>
                            <span
                              className={cn(
                                'px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border',
                                r.isHidden
                                  ? 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                                  : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                              )}
                            >
                              {r.isHidden ? (
                                <>
                                  <Lock className="w-2.5 h-2.5" /> Hidden Test
                                </>
                              ) : (
                                <>
                                  <Globe className="w-2.5 h-2.5" /> Public Sample
                                </>
                              )}
                            </span>
                            {r.description && (
                              <span className="text-xs text-neutral-400 font-medium">
                                {r.description}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-neutral-500">
                              {r.executionTimeMs}ms
                            </span>
                            <span
                              className={cn(
                                'px-2.5 py-0.5 rounded-full text-xs font-bold border',
                                r.passed
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                                  : 'bg-red-950 text-red-400 border-red-700'
                              )}
                            >
                              {r.status.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="bg-[#101010] border border-[#2a2a2a] rounded-lg p-2.5">
                            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                              <span>Input (stdin)</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(r.input, `standalone-in-${idx}`)}
                                className="text-neutral-500 hover:text-white"
                              >
                                {copiedField === `standalone-in-${idx}` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <pre className="font-mono text-neutral-300 whitespace-pre-wrap max-h-28 overflow-y-auto">
                              {r.input || '(empty)'}
                            </pre>
                          </div>

                          <div className="bg-[#101010] border border-[#2a2a2a] rounded-lg p-2.5">
                            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                              <span>Expected Output</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(r.expectedOutput, `standalone-exp-${idx}`)}
                                className="text-neutral-500 hover:text-white"
                              >
                                {copiedField === `standalone-exp-${idx}` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <pre className="font-mono text-emerald-400 whitespace-pre-wrap max-h-28 overflow-y-auto">
                              {r.expectedOutput || '(empty)'}
                            </pre>
                          </div>

                          <div
                            className={cn(
                              'bg-[#101010] rounded-lg p-2.5 border',
                              r.passed ? 'border-emerald-800/50' : 'border-red-800/80'
                            )}
                          >
                            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                              <span>Actual Output</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(r.actualOutput, `standalone-act-${idx}`)}
                                className="text-neutral-500 hover:text-white"
                              >
                                {copiedField === `standalone-act-${idx}` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <pre
                              className={cn(
                                'font-mono whitespace-pre-wrap max-h-28 overflow-y-auto',
                                r.passed ? 'text-emerald-300' : 'text-red-400'
                              )}
                            >
                              {r.actualOutput || '(no output)'}
                            </pre>
                          </div>
                        </div>

                        {r.error && (
                          <div className="p-2.5 rounded bg-red-950/40 border border-red-900/60 text-red-300 text-xs font-mono">
                            <strong className="font-sans font-semibold">Error:</strong> {r.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#262626] bg-[#161616] flex justify-end">
              <button
                type="button"
                onClick={() => setTestRunnerModalQuestion(null)}
                className="px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] text-neutral-200 text-xs font-semibold"
              >
                Close Runner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          DELETE CONFIRMATION MODAL
      ────────────────────────────────────────────────────────────── */}
      {questionToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-red-900/60 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-3 rounded-full bg-red-950/60 border border-red-800/80">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Question</h3>
                <p className="text-xs text-neutral-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-neutral-300">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white">"{questionToDelete.title}"</strong> (
              <code className="text-xs font-mono text-neutral-400">{questionToDelete.slug}</code>
              )? All associated test cases and submission references will be removed.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setQuestionToDelete(null)}
                className="px-4 py-2 rounded-lg border border-[#333] hover:border-[#555] text-neutral-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
