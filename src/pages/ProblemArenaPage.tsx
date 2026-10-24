import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import Editor, { OnMount } from '@monaco-editor/react'
import confetti from 'canvas-confetti'
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileText,
  History,
  HelpCircle,
  ChevronRight,
  AlertTriangle,
  Lock,
} from 'lucide-react'
import {
  getCurriculum,
  getProblemByLanguageAndSlug,
  normalizeLanguageSlug,
  ProgrammingLanguage,
} from '@/data/curriculum/index'
import { getCodingQuestionBySlug } from '@/coding/questions'
import { executeCode, isAuthoritativeAccept, TestCaseExecution, type RunResult } from '@/lib/runner/codeRunner'
import {
  getUserState,
  recordProblemSuccess,
  recordProblemAttempt,
  getLanguageSavedCode,
  SubmissionRecord,
} from '@/lib/progress'
import { cn } from '@/lib/utils'
import { QuestionCompletionModal } from '@/components/arena/QuestionCompletionModal'
import { ProblemNotFoundCard } from '@/components/common/ProblemNotFoundCard'

export const ProblemArenaPage: React.FC = () => {
  const { lang, slug } = useParams<{ lang?: string; slug?: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const langParam = searchParams.get('lang')

  // Resolve active language: locked to route param :lang if provided
  const currentLanguage: ProgrammingLanguage = useMemo(() => {
    return normalizeLanguageSlug(lang || langParam || localStorage.getItem('kalvi_preferred_language'))
  }, [lang, langParam])

  const curriculum = useMemo(() => getCurriculum(currentLanguage), [currentLanguage])

  const codingQuestion = useMemo(() => getCodingQuestionBySlug(slug), [slug])
  const isLearnCoding = Boolean(codingQuestion)

  // Find problem within this language's curriculum
  const currentProblemData = useMemo(() => {
    if (codingQuestion) {
      const targetProblem = getProblemByLanguageAndSlug(currentLanguage, slug || '')
      return {
        belt: {
          order: 0,
          name: codingQuestion.topicTitle,
          title: `Learn › Coding › ${codingQuestion.topicTitle}`,
          color: '#ED2A2B',
          description: codingQuestion.topicTitle,
          problems: [],
        },
        problem: targetProblem!,
        nextSlug: null,
      }
    }

    let targetProblem = getProblemByLanguageAndSlug(currentLanguage, slug || '')
    let targetBelt = curriculum.belts[0]
    let targetBeltIndex = 0
    let targetProblemIndex = 0

    if (!targetProblem) {
      // Fallback to first problem in first belt
      targetBelt = curriculum.belts[0]
      targetProblem = targetBelt.problems[0]
      targetBeltIndex = 0
      targetProblemIndex = 0
    } else {
      for (let bIdx = 0; bIdx < curriculum.belts.length; bIdx++) {
        const currentBelt = curriculum.belts[bIdx]
        const problemIdx = currentBelt.problems.findIndex((problemItem) => problemItem.slug === targetProblem?.slug)
        if (problemIdx !== -1) {
          targetBelt = currentBelt
          targetBeltIndex = bIdx
          targetProblemIndex = problemIdx
          break
        }
      }
    }

    // Next problem resolution in the same language track
    let nextSlug: string | null = null
    if (targetProblemIndex + 1 < targetBelt.problems.length) {
      nextSlug = targetBelt.problems[targetProblemIndex + 1].slug
    } else if (targetBeltIndex + 1 < curriculum.belts.length) {
      nextSlug = curriculum.belts[targetBeltIndex + 1].problems[0].slug
    }

    return {
      belt: targetBelt,
      problem: targetProblem!,
      nextSlug,
    }
  }, [curriculum, currentLanguage, slug, codingQuestion])

  const currentBelt = currentProblemData.belt
  const currentProblem = currentProblemData.problem
  const nextProblemSlug = currentProblemData.nextSlug
  const authoritativeTotalCount = currentProblem.testCases?.length || 10
  const visibleCount = useMemo(() => {
    if (!currentProblem.testCases || currentProblem.testCases.length === 0) return 3
    const count = currentProblem.testCases.filter((tc) => !tc.isHidden).length
    return count > 0 ? count : 3
  }, [currentProblem])

  // State
  const [activeTab, setActiveTab] = useState<'description' | 'submissions' | 'help'>('description')
  const [code, setCode] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Results keyed by testIndex (filled live from the judge stream; never by array position).
  const [testResults, setTestResults] = useState<Record<number, TestCaseExecution> | null>(null)
  // Cases included in the current/last execution (Run: visible only, Submit: all) and live phase.
  const [runScope, setRunScope] = useState<{ mode: 'run' | 'submit'; caseIndexes: number[]; judgeTotal: number } | null>(null)
  const [judgePhase, setJudgePhase] = useState<'idle' | 'connecting' | 'judging'>('idle')
  const [executionSummary, setExecutionSummary] = useState<{
    passed: number
    total: number
    isSubmit: boolean
    accepted: boolean
    offlinePreview?: boolean
  } | null>(null)
  const [compilationError, setCompilationError] = useState<string | null>(null)
  // True when `compilationError` is a server/infrastructure failure rather than an error in the student's code.
  const [errorIsSystem, setErrorIsSystem] = useState(false)
  const [activeCaseTab, setActiveCaseTab] = useState<number>(1)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submissionFailed, setSubmissionFailed] = useState<{ passed: number; total: number } | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<SubmissionRecord[]>([])
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false)

  const editorRef = useRef<Parameters<OnMount>[0] | null>(null)
  // Synchronous execution lock: React state (isRunning/isSubmitting) updates asynchronously, so two clicks in
  // the same tick would both pass a state-based guard and fire two executions / two submissions.
  const executingRef = useRef(false)
  // Bumped whenever the problem/language changes so late responses for a previous context are not rendered.
  const contextVersionRef = useRef(0)
  // Server-issued id of the evaluation currently being displayed; events for any other evaluation are ignored.
  const activeSubmissionIdRef = useRef<string | null>(null)

  // Initialize code on problem or language change
  useEffect(() => {
    contextVersionRef.current += 1
    const savedCode = getLanguageSavedCode(currentProblem.slug, currentLanguage)

    if (savedCode) {
      setCode(savedCode)
    } else {
      setCode(currentProblem.starterCode)
    }

    setTestResults(null)
    setRunScope(null)
    setJudgePhase('idle')
    activeSubmissionIdRef.current = null
    setExecutionSummary(null)
    setCompilationError(null)
    setShowSuccessModal(false)
    setSubmissionFailed(null)
    setActiveCaseTab(1)

    // Load submission history for this problem and language
    const userState = getUserState()
    const subs = userState.submissions.filter(
      (submissionRecord) =>
        submissionRecord.problemSlug === currentProblem.slug &&
        (submissionRecord.language === currentLanguage || submissionRecord.language === curriculum.runnerLanguage)
    )
    setRecentSubmissions(subs)
  }, [currentProblem.slug, currentLanguage, currentProblem.starterCode, curriculum.runnerLanguage])

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor

    editor.updateOptions({
      contextmenu: true,
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
      lineNumbers: 'on',
      roundedSelection: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      stopRenderingLineAfter: 1500,
      renderWhitespace: 'none',
      quickSuggestions: { other: true, comments: false, strings: false },
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      },
    })
  }

  // Unified Execution Pipeline across all 10 Test Cases
  const handleExecute = async (isSubmit: boolean) => {
    if (executingRef.current || isRunning || isSubmitting) return
    executingRef.current = true
    const contextVersion = contextVersionRef.current
    // Capture the identity of what is being executed so a late response is attributed to the right problem.
    const executedProblem = currentProblem
    const executedLanguage = currentLanguage

    if (isSubmit) {
      setIsSubmitting(true)
    } else {
      setIsRunning(true)
    }

    setSubmissionFailed(null)
    setCompilationError(null)
    setExecutionSummary(null)
    setTestResults({})
    activeSubmissionIdRef.current = null
    setJudgePhase('connecting')
    // Immediate, honest scope: Run executes the visible cases, Submit the full suite. Nothing is marked
    // passed/failed until the server reports that specific case.
    const allIndexes = (currentProblem.testCases || []).map((tc, idx) => tc.testIndex || idx + 1)
    setRunScope({
      mode: isSubmit ? 'submit' : 'run',
      caseIndexes: isSubmit ? allIndexes : allIndexes.filter((i) => i <= visibleCount),
      judgeTotal: authoritativeTotalCount,
    })

    // Read current code directly from Monaco editor ref if mounted, avoiding any stale React state
    const currentCode = editorRef.current?.getValue() ?? code

    const visibleCases = (currentProblem.testCases || []).slice(0, visibleCount).map((tc, idx) => ({
      testIndex: tc.testIndex || idx + 1,
      input: tc.input || '',
      expectedOutput: tc.expectedOutput || '',
    }))

    const isCurrent = () => contextVersionRef.current === contextVersion

    try {
      const result: RunResult = await executeCode(currentProblem.slug, curriculum.runnerLanguage, currentCode, visibleCases, isSubmit, {
        onEvent: (event) => {
          if (!isCurrent()) return
          if (event.type === 'started') {
            activeSubmissionIdRef.current = event.submissionId
            setJudgePhase('judging')
            setRunScope({ mode: event.mode, caseIndexes: event.cases.map((c) => c.testIndex), judgeTotal: event.judgeTotal })
            return
          }
          if (event.submissionId !== activeSubmissionIdRef.current) return // stale evaluation
          setTestResults((prev) => ({ ...(prev || {}), [event.result.testIndex]: event.result }))
        },
      })

      // Authoritative acceptance: a Submit whose server-reported suite is complete and fully passed.
      const accepted = isAuthoritativeAccept(result, isSubmit)

      // The student navigated / switched language while the request was in flight: the server has already
      // persisted the outcome; do not paint it over a different problem's editor.
      if (!isCurrent()) {
        if (isSubmit && !result.compilationError) {
          if (accepted) {
            recordProblemSuccess(executedProblem.slug, executedProblem.title, executedLanguage, currentCode, result.overallTimeMs)
          } else {
            recordProblemAttempt(
              executedProblem.slug,
              executedProblem.title,
              executedLanguage,
              currentCode,
              result.passedCount,
              result.totalCount,
              result.overallTimeMs
            )
          }
        }
        return
      }

      if (result.compilationError) {
        setCompilationError(result.compilationError)
        setErrorIsSystem(result.errorKind === 'system')
        setTestResults(null)
        setExecutionSummary({ passed: 0, total: result.totalCount, isSubmit, accepted: false })
        setSubmissionFailed(isSubmit ? { passed: 0, total: result.totalCount } : null)
        return
      }

      // Final, authoritative per-case results (also covers environments that buffer the stream).
      const byIndex: Record<number, TestCaseExecution> = {}
      for (const r of result.results) byIndex[r.testIndex] = r
      setTestResults(byIndex)
      if (result.submissionId) activeSubmissionIdRef.current = result.submissionId
      setExecutionSummary({
        passed: result.passedCount,
        total: result.totalCount,
        isSubmit,
        accepted,
        offlinePreview: result.offlinePreview,
      })

      if (isSubmit) {
        if (accepted) {
          const totalTime = result.results.reduce((acc, t) => acc + (t.executionTimeMs || 0), 0) || result.overallTimeMs || 0
          recordProblemSuccess(currentProblem.slug, currentProblem.title, currentLanguage, currentCode, totalTime, {
            awardXp: !isLearnCoding,
          })

          const state = getUserState()
          setRecentSubmissions(
            state.submissions.filter(
              (s) =>
                s.problemSlug === currentProblem.slug &&
                (s.language === currentLanguage || s.language === curriculum.runnerLanguage)
            )
          )

          // All judge tests passed (server-confirmed): celebrate.
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
          setShowSuccessModal(true)
        } else {
          recordProblemAttempt(
            currentProblem.slug,
            currentProblem.title,
            currentLanguage,
            currentCode,
            result.passedCount,
            result.totalCount,
            result.overallTimeMs
          )
          setSubmissionFailed({ passed: result.passedCount, total: result.totalCount })

          const state = getUserState()
          setRecentSubmissions(
            state.submissions.filter(
              (s) =>
                s.problemSlug === currentProblem.slug &&
                (s.language === currentLanguage || s.language === curriculum.runnerLanguage)
            )
          )
        }
      }
    } catch (err: unknown) {
      if (!isCurrent()) return
      const errMsg = err instanceof Error ? err.message : 'An unexpected execution error occurred.'
      setCompilationError(errMsg)
      setErrorIsSystem(true)
      setTestResults(null)
      setExecutionSummary({ passed: 0, total: isSubmit ? authoritativeTotalCount : visibleCount, isSubmit, accepted: false })
      setSubmissionFailed(isSubmit ? { passed: 0, total: authoritativeTotalCount } : null)
    } finally {
      executingRef.current = false
      if (isCurrent()) setJudgePhase('idle')
      setIsRunning(false)
      setIsSubmitting(false)
    }
  }

  const handleRun = () => handleExecute(false)
  const handleSubmit = () => handleExecute(true)

  const performReset = () => {
    setCode(currentProblem.starterCode || '')
    setTestResults(null)
    setRunScope(null)
    setExecutionSummary(null)
    setCompilationError(null)
    setSubmissionFailed(null)
    setActiveCaseTab(1)
    setShowResetConfirmModal(false)
  }

  const handleResetClick = () => {
    if (isRunning || isSubmitting) return
    const starter = currentProblem.starterCode || ''
    const isModified = code.trim() !== starter.trim()
    if (isModified) {
      setShowResetConfirmModal(true)
    } else {
      performReset()
    }
  }

  // Handlers for QuestionCompletionModal
  const handleContinue = () => {
    setShowSuccessModal(false)

    if (nextProblemSlug) {
      navigate(`/practice/${currentLanguage}/${nextProblemSlug}`)
    } else if (isLearnCoding && codingQuestion) {
      navigate(`/learn/coding/${codingQuestion.topicId}`)
    } else {
      navigate(`/practice/${currentLanguage}`)
    }
  }

  const handleCancel = () => {
    setShowSuccessModal(false)
  }

  // Check if requested slug is invalid
  const isProblemNotFound = useMemo(() => {
    if (!slug) return false
    return !getProblemByLanguageAndSlug(currentLanguage, slug)
  }, [currentLanguage, slug])

  if (isProblemNotFound) {
    return <ProblemNotFoundCard slug={slug} language={currentLanguage} />
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-neutral-900 text-neutral-100">
      {/* Arena Top Toolbar with Clean Breadcrumb */}
      <div className="h-12 bg-neutral-950 border-b border-neutral-800 px-4 flex items-center justify-between flex-shrink-0">
        {isLearnCoding && codingQuestion ? (
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
            <Link
              to="/learn"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors flex-shrink-0"
            >
              Learn <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/learn/coding"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors flex-shrink-0"
            >
              Coding <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to={`/learn/coding/${codingQuestion.topicId}`}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors flex-shrink-0"
            >
              {codingQuestion.topicTitle} <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800/60 flex-shrink-0">
              {codingQuestion.topicTitle}
            </span>
            <h1 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
              {currentProblem.title}
            </h1>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
            <Link
              to="/practice"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors flex-shrink-0"
            >
              Practice <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to={`/practice/${currentLanguage}`}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors flex-shrink-0"
            >
              {curriculum.name} Practice <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 flex-shrink-0">
              {currentBelt.name}
            </span>
            <h1 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
              {currentProblem.order}. {currentProblem.title}
            </h1>
          </div>
        )}

        {/* Locked Language Indicator (no cross-language switching inside a problem) & Action Buttons */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Language Locked Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold shadow-sm">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentBelt.color }}
            />
            <span>{curriculum.badgeName}</span>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetClick}
            disabled={isRunning || isSubmitting}
            title={`Reset ${curriculum.name} code to default starter template`}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium border border-neutral-700 transition-all interactive-btn disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 transition-all interactive-btn disabled:opacity-50"
          >
            {isRunning && <span className="absolute inset-0 animate-shimmer pointer-events-none" />}
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all interactive-btn disabled:opacity-50 shadow-red-950/20"
          >
            {isSubmitting && <span className="absolute inset-0 animate-shimmer pointer-events-none" />}
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Testing All 10...' : 'Submit'}</span>
          </button>
        </div>
      </div>

      {/* Dual Panel Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Problem Description, Submissions & Help */}
        <div className="w-full md:w-1/2 lg:w-5/12 border-r border-neutral-800 flex flex-col bg-neutral-900 overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-neutral-800 px-4 bg-neutral-950/60">
            <button
              onClick={() => setActiveTab('description')}
              className={cn(
                'flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 transition-colors',
                activeTab === 'description'
                  ? 'border-[#ED2A2B] text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Description</span>
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={cn(
                'flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 transition-colors',
                activeTab === 'submissions'
                  ? 'border-[#ED2A2B] text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              )}
            >
              <History className="w-3.5 h-3.5" />
              <span>Submissions ({recentSubmissions.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={cn(
                'flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 transition-colors',
                activeTab === 'help'
                  ? 'border-[#ED2A2B] text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              )}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Get Help</span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-neutral-300 text-sm">
            {activeTab === 'description' && (
              <>
                {/* Title & Badge */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500 font-mono">
                      +{currentProblem.xp} XP
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white">
                    {currentProblem.title}
                  </h2>
                  <p className="text-neutral-300 leading-relaxed">
                    {currentProblem.description}
                  </p>
                </div>

                {/* Input Format */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Input Format
                  </h3>
                  <div className="p-3 bg-neutral-950 rounded-lg text-xs font-mono text-neutral-300 border border-neutral-800/80 whitespace-pre-wrap">
                    {currentProblem.inputFormat}
                  </div>
                </div>

                {/* Output Format */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Output Format
                  </h3>
                  <div className="p-3 bg-neutral-950 rounded-lg text-xs font-mono text-neutral-300 border border-neutral-800/80 whitespace-pre-wrap">
                    {currentProblem.outputFormat}
                  </div>
                </div>

                {/* Constraints */}
                {(currentProblem as any).constraints && (
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Constraints
                    </h3>
                    <div className="p-3 bg-neutral-950 rounded-lg text-xs font-mono text-neutral-300 border border-neutral-800/80 whitespace-pre-wrap">
                      {(currentProblem as any).constraints}
                    </div>
                  </div>
                )}

                {/* Worked Examples with Input, Output, and Explanation */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Examples
                  </h3>
                  {((currentProblem.examples && currentProblem.examples.length > 0)
                    ? currentProblem.examples
                    : currentProblem.testCases.slice(0, 3)
                  ).map((ex: any, idx: number) => {
                    const inputVal = ex.input ?? ''
                    const outputVal = ex.output ?? ex.expectedOutput ?? ''
                    const explanationVal = ex.explanation ?? ''
                    return (
                      <div
                        key={idx}
                        className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800/90 space-y-3 text-xs"
                      >
                        <div className="font-semibold text-neutral-300 flex items-center justify-between">
                          <span>Example {idx + 1}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-neutral-500 text-[11px] font-medium block">Input:</span>
                          <pre className="p-2.5 bg-neutral-900 rounded-lg font-mono text-neutral-200 border border-neutral-800/60 overflow-x-auto whitespace-pre-wrap">
                            {inputVal}
                          </pre>
                        </div>
                        <div className="space-y-1">
                          <span className="text-neutral-500 text-[11px] font-medium block">Output:</span>
                          <pre className="p-2.5 bg-neutral-900 rounded-lg font-mono text-emerald-400 border border-neutral-800/60 overflow-x-auto whitespace-pre-wrap">
                            {outputVal}
                          </pre>
                        </div>
                        {explanationVal && (
                          <div className="space-y-1.5 pt-1 border-t border-neutral-800/70">
                            <span className="text-neutral-400 text-[11px] font-semibold block uppercase tracking-wider">
                              Explanation:
                            </span>
                            <div className="p-3 bg-neutral-900/60 rounded-lg text-neutral-300 text-xs leading-relaxed border border-neutral-800/50 whitespace-pre-wrap">
                              {explanationVal}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Past Submissions ({curriculum.name})
                </h3>
                {recentSubmissions.length === 0 ? (
                  <p className="text-neutral-500 text-xs py-4">
                    No {curriculum.name} submissions yet for this problem.
                  </p>
                ) : (
                  recentSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {sub.status === 'PASSED' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <div>
                          <div className="font-medium text-white">
                            {sub.status} ({sub.passedTests}/{sub.totalTests} tests)
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            {sub.language} • {new Date(sub.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-neutral-400 font-mono text-[11px]">
                        {sub.executionTimeMs}ms
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'help' && (
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Algorithmic Hints
                </h3>
                <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-2 text-xs">
                  <div className="font-semibold text-amber-400">Key Tip</div>
                  <p className="text-neutral-300">
                    Read the input format carefully. Ensure your {curriculum.name} solution parses all inputs from standard input and prints only the exact required output without extraneous labels.
                  </p>
                </div>
                <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-2 text-xs">
                  <div className="font-semibold text-neutral-300">Edge Cases to Consider:</div>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-400">
                    <li>Single element or zero input values</li>
                    <li>Negative numbers or large bounds</li>
                    <li>Exact space separation between printed numbers</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Monaco Code Editor + Test Case Drawer */}
        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col bg-neutral-950 overflow-hidden">
          {/* Monaco Editor Container */}
          <div className="flex-1 relative overflow-hidden">
            <Editor
              height="100%"
              theme="vs-dark"
              language={curriculum.monacoLanguage}
              value={code}
              onChange={(value) => {
                setCode(value || '')
                if (testResults !== null || executionSummary !== null || compilationError !== null || submissionFailed !== null) {
                  setTestResults(null)
                  setExecutionSummary(null)
                  setCompilationError(null)
                  setSubmissionFailed(null)
                }
              }}
              onMount={handleEditorMount}
            />
          </div>

          {/* Failure Alert Banner */}
          {submissionFailed && (
            <div className="px-4 py-3 bg-red-950/80 border-t border-red-900/80 flex items-center justify-between text-xs animate-banner-drop">
              <div className="flex items-center gap-2 text-red-300">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 animate-pulse-subtle" />
                <span>
                  ❌ <strong>{submissionFailed.passed}/{submissionFailed.total}</strong> test cases passed. Fix your solution and try again.
                </span>
              </div>
              <button
                onClick={() => setSubmissionFailed(null)}
                className="px-3 py-1 bg-red-900/60 hover:bg-red-800 text-red-200 font-medium rounded transition-all interactive-btn"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Test Cases Bottom Drawer ({authoritativeTotalCount} Test Cases: 3 Visible, {authoritativeTotalCount - 3} Hidden) */}
          <div className="h-64 border-t border-neutral-800 bg-neutral-900 flex flex-col overflow-hidden">
            {/* Drawer Tabs */}
            <div className="h-10 bg-neutral-950 px-3 flex items-center justify-between border-b border-neutral-800 flex-shrink-0">
              <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-neutral-800 flex-nowrap min-w-0">
                <span className="text-xs font-semibold text-neutral-400 mr-1.5 flex-shrink-0">
                  Test Cases:
                </span>
                {Array.from({ length: authoritativeTotalCount }, (_, i) => i + 1).map((caseNum) => {
                  const isVisible = caseNum <= visibleCount
                  const tcResult = testResults?.[caseNum] ?? null
                  const inScope = runScope?.caseIndexes.includes(caseNum) ?? false
                  const executing = isRunning || isSubmitting
                  const pending = executing && inScope && !tcResult
                  const notRun = !!runScope && !inScope && !executing

                  return (
                    <button
                      key={caseNum}
                      onClick={() => setActiveCaseTab(caseNum)}
                      title={notRun ? 'Not run - Run evaluates only the visible cases. Submit runs all cases.' : undefined}
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all duration-200 interactive-tab flex-shrink-0',
                        activeCaseTab === caseNum
                          ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700'
                          : isVisible
                          ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                          : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/60'
                      )}
                    >
                      {tcResult ? (
                        tcResult.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in-75 duration-200 flex-shrink-0" />
                        ) : tcResult.isTimeLimitExceeded ? (
                          <XCircle className="w-3.5 h-3.5 text-amber-400 animate-in zoom-in-75 duration-200 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-400 animate-in zoom-in-75 duration-200 flex-shrink-0" />
                        )
                      ) : pending ? (
                        <span className="w-3 h-3 rounded-full border-2 border-amber-400 border-t-transparent animate-spin flex-shrink-0" aria-label="pending" />
                      ) : notRun ? (
                        <span className="w-2 h-2 rounded-full bg-neutral-700 flex-shrink-0" aria-label="not run" />
                      ) : null}
                      <span>Case {caseNum}</span>
                      {!isVisible && (
                        <Lock className="w-3 h-3 text-neutral-400 ml-0.5 inline-block flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Status Header: live, authoritative counts */}
              <div className="text-[11px] font-mono flex items-center gap-2 pl-3 flex-shrink-0">
                {isRunning || isSubmitting ? (
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    {judgePhase === 'connecting'
                      ? isSubmitting
                        ? 'Submitting…'
                        : 'Running…'
                      : `${isSubmitting ? 'Judging' : 'Running'} · Passed ${
                          Object.values(testResults || {}).filter((r) => r.passed).length
                        } / ${runScope?.caseIndexes.length ?? (isSubmitting ? authoritativeTotalCount : visibleCount)}`}
                  </span>
                ) : compilationError ? (
                  <span className="text-red-400 font-semibold">
                    Passed 0 / {executionSummary?.total ?? authoritativeTotalCount}
                  </span>
                ) : executionSummary ? (
                  <span
                    className={cn(
                      'font-semibold',
                      executionSummary.accepted
                        ? 'text-emerald-400'
                        : executionSummary.passed === executionSummary.total
                        ? 'text-emerald-400/80'
                        : 'text-amber-400'
                    )}
                  >
                    Passed {executionSummary.passed} / {executionSummary.total}
                    {executionSummary.isSubmit
                      ? executionSummary.accepted
                        ? ' · Accepted'
                        : ''
                      : executionSummary.offlinePreview
                      ? ' visible · offline preview'
                      : ' visible · Submit to run all ' + authoritativeTotalCount}
                  </span>
                ) : (
                  <span className="text-neutral-500">Passed 0 / {authoritativeTotalCount}</span>
                )}
              </div>
            </div>

            {/* Active Test Case Details */}
            <div key={activeCaseTab} className="flex-1 p-4 overflow-y-auto text-xs font-mono space-y-3 animate-page-enter">
              {(() => {
                const activeResult = testResults?.[activeCaseTab] ?? null
                if ((isRunning || isSubmitting) && !activeResult && (runScope?.caseIndexes.includes(activeCaseTab) ?? true)) {
                  return (
                    <div className="flex flex-col items-center justify-center py-8 space-y-3 font-sans">
                      <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      <div className="text-xs text-neutral-300 font-medium">
                        {judgePhase === 'connecting' ? 'Sending to the judge…' : `Case ${activeCaseTab} is being evaluated…`}
                      </div>
                    </div>
                  )
                }

                if (compilationError) {
                  return (
                    <div className="space-y-3 font-sans">
                      <div className="p-3 bg-red-950/60 border border-red-900/80 rounded-lg text-red-200 text-xs flex items-center gap-2 font-semibold">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>
                          {errorIsSystem
                            ? 'Execution service error: your code was not run'
                            : 'Compilation / Syntax Error: Test cases not executed'}
                        </span>
                      </div>
                      <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-red-400 font-mono text-xs whitespace-pre-wrap overflow-x-auto">
                        {compilationError}
                      </div>
                    </div>
                  )
                }

                const isHiddenCase = activeCaseTab > visibleCount
                const tcResult = activeResult
                const caseNotRun = !!runScope && !runScope.caseIndexes.includes(activeCaseTab)

                if (isHiddenCase) {
                  return (
                    <div className="space-y-3 font-sans">
                      <div className="p-3 bg-neutral-950/80 rounded-lg border border-neutral-800 text-neutral-400 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-neutral-200">
                          <Lock className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <span>Hidden Test Case #{activeCaseTab}</span>
                          <span className="text-[10px] font-normal text-neutral-500">
                            • {activeCaseTab - visibleCount} of {authoritativeTotalCount - visibleCount} Hidden Tests
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                          This test is evaluated securely. Its input and expected output are hidden to evaluate edge cases, boundary constraints, and prevent hardcoded solutions.
                        </p>
                      </div>

                      {tcResult !== null ? (
                        <div className="space-y-2">
                          <div className="text-[11px] text-neutral-400 font-medium flex items-center justify-between">
                            <span>Evaluation Status:</span>
                            {tcResult.executionTimeMs !== undefined && (
                              <span className="text-[10px] text-neutral-500 font-mono">
                                {tcResult.executionTimeMs}ms
                              </span>
                            )}
                          </div>
                          <div
                            className={cn(
                              'p-3 rounded-lg border text-xs font-semibold flex items-center gap-2',
                              tcResult.passed
                                ? 'bg-emerald-950/40 border-emerald-900/80 text-emerald-300'
                                : tcResult.isTimeLimitExceeded
                                ? 'bg-amber-950/40 border-amber-900/80 text-amber-300'
                                : 'bg-red-950/40 border-red-900/80 text-red-300'
                            )}
                          >
                            {tcResult.passed ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <span>Case {activeCaseTab} 🔒 — Passed</span>
                              </>
                            ) : tcResult.isTimeLimitExceeded ? (
                              <>
                                <XCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                <span>Case {activeCaseTab} 🔒 — Time Limit Exceeded</span>
                              </>
                            ) : tcResult.status === 'runtime_error' ? (
                              <>
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                <span>Case {activeCaseTab} 🔒 — Runtime Error</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                <span>Case {activeCaseTab} 🔒 — Wrong Answer</span>
                              </>
                            )}
                          </div>
                        </div>
                      ) : caseNotRun ? (
                        <div className="p-4 text-center text-neutral-500 text-xs font-sans">
                          Not run: <strong className="text-neutral-300">Run</strong> evaluates only the visible cases. Click{' '}
                          <strong className="text-neutral-300">Submit</strong> to evaluate all {authoritativeTotalCount} cases, including this one.
                        </div>
                      ) : (
                        <div className="p-4 text-center text-neutral-500 text-xs font-sans">
                          Click <strong className="text-neutral-300">Submit</strong> to evaluate this hidden test case.
                        </div>
                      )}
                    </div>
                  )
                }

                // Visible Test Case (1, 2, 3)
                const visibleTestCase = currentProblem.testCases[activeCaseTab - 1]

                return (
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] font-sans text-neutral-400 mb-1 flex items-center justify-between">
                        <span>Input:</span>
                        <span className="text-[10px] text-neutral-500">Visible Case {activeCaseTab}</span>
                      </div>
                      <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 text-neutral-200 whitespace-pre-wrap">
                        {visibleTestCase?.input ?? ''}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-sans text-neutral-400 mb-1">
                        Expected Output:
                      </div>
                      <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 text-emerald-400 whitespace-pre-wrap">
                        {visibleTestCase?.expectedOutput ?? ''}
                      </div>
                    </div>

                    {tcResult && (
                      <div>
                        <div className="text-[11px] font-sans text-neutral-400 mb-1 flex items-center justify-between">
                          <span>Your Output:</span>
                          <div className="flex items-center gap-2">
                            {tcResult.executionTimeMs !== undefined && (
                              <span className="text-[10px] text-neutral-500 font-mono">
                                {tcResult.executionTimeMs}ms
                              </span>
                            )}
                            <span
                              className={
                                tcResult.passed
                                  ? 'text-emerald-400 font-semibold'
                                  : tcResult.isTimeLimitExceeded
                                  ? 'text-amber-400 font-semibold'
                                  : 'text-red-400 font-semibold'
                              }
                            >
                              {tcResult.passed
                                ? '✓ Passed'
                                : tcResult.isTimeLimitExceeded
                                ? '⏱ Time Limit Exceeded'
                                : tcResult.status === 'runtime_error'
                                ? '✗ Runtime Error'
                                : '✗ Wrong Answer'}
                            </span>
                          </div>
                        </div>
                        <div
                          className={cn(
                            'p-2.5 rounded border whitespace-pre-wrap font-mono text-xs',
                            tcResult.passed
                              ? 'bg-neutral-950 border-emerald-900/60 text-emerald-300'
                              : tcResult.isTimeLimitExceeded
                              ? 'bg-neutral-950 border-amber-900/60 text-amber-300'
                              : 'bg-neutral-950 border-red-900/60 text-red-300'
                          )}
                        >
                          {tcResult.actualOutput ? String(tcResult.actualOutput) : tcResult.error ? String(tcResult.error) : '(No output returned)'}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Question Completion Modal: strictly with Cancel and Continue buttons */}
      <QuestionCompletionModal
        isOpen={showSuccessModal}
        hasNextQuestion={!!nextProblemSlug}
        nextQuestionSlug={nextProblemSlug}
        onContinue={handleContinue}
        onCancel={handleCancel}
        isLearnCoding={isLearnCoding}
      />

      {/* Reset Confirmation Modal */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Reset Editor Code?</h3>
                <p className="text-xs text-neutral-400">Revert to default starter template</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Your edits in this editor session will be reverted to the official {curriculum.name} starter code.
              Your solved status, XP, streak, and previous submission history will <strong>not</strong> be affected.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors interactive-btn"
              >
                Cancel
              </button>
              <button
                onClick={performReset}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#ED2A2B] hover:bg-red-600 text-white transition-colors shadow-sm shadow-red-950/20 interactive-btn"
              >
                Reset to Starter Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
