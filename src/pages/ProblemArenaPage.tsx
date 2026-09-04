import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import Editor, { OnMount } from '@monaco-editor/react'
import confetti from 'canvas-confetti'
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  FileText,
  History,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react'
import {
  getCurriculum,
  getProblemByLanguageAndSlug,
  normalizeLanguageSlug,
  ProgrammingLanguage,
} from '@/data/curriculum/index'
import { executeCode, TestCaseExecution } from '@/lib/runner/codeRunner'
import {
  getUserState,
  recordProblemSuccess,
  recordProblemAttempt,
  getLanguageSavedCode,
  SubmissionRecord,
} from '@/lib/progress'
import { cn } from '@/lib/utils'
import { QuestionCompletionModal } from '@/components/arena/QuestionCompletionModal'

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

  // Find problem within this language's curriculum
  const currentProblemData = useMemo(() => {
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
        const b = curriculum.belts[bIdx]
        const pIdx = b.problems.findIndex((p) => p.slug === targetProblem?.slug)
        if (pIdx !== -1) {
          targetBelt = b
          targetBeltIndex = bIdx
          targetProblemIndex = pIdx
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
  }, [curriculum, currentLanguage, slug])

  const currentBelt = currentProblemData.belt
  const currentProblem = currentProblemData.problem
  const nextProblemSlug = currentProblemData.nextSlug

  // State
  const [activeTab, setActiveTab] = useState<'description' | 'submissions' | 'help'>('description')
  const [code, setCode] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestCaseExecution[] | null>(null)
  const [compilationError, setCompilationError] = useState<string | null>(null)
  const [activeCaseTab, setActiveCaseTab] = useState<number>(1)
  const [antiCheatWarning, setAntiCheatWarning] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submissionFailed, setSubmissionFailed] = useState<{ passed: number; total: number } | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<SubmissionRecord[]>([])

  const editorRef = useRef<any>(null)

  // Initialize code on problem or language change
  useEffect(() => {
    const savedCode = getLanguageSavedCode(currentProblem.slug, currentLanguage)

    if (savedCode) {
      setCode(savedCode)
    } else {
      setCode(currentProblem.starterCode)
    }

    setTestResults(null)
    setCompilationError(null)
    setShowSuccessModal(false)
    setSubmissionFailed(null)
    setActiveCaseTab(1)

    // Load submission history for this problem and language
    const userState = getUserState()
    const subs = userState.submissions.filter(
      (s) =>
        s.problemSlug === currentProblem.slug &&
        (s.language === currentLanguage || s.language === curriculum.runnerLanguage)
    )
    setRecentSubmissions(subs)
  }, [currentProblem.slug, currentLanguage, currentProblem.starterCode, curriculum.runnerLanguage])

  // Anti-Cheat: Intercept Cut, Copy, Paste & Right Click
  const triggerAntiCheatWarning = () => {
    setAntiCheatWarning('⚠️ Manual Coding Enforced: Copy, Paste, and Cut are disabled in Practice Arena.')
    setTimeout(() => setAntiCheatWarning(null), 3000)
  }

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor

    // Intercept keyboard shortcuts
    editor.onKeyDown((e) => {
      const isModifier = e.ctrlKey || e.metaKey
      if (isModifier && (e.code === 'KeyC' || e.code === 'KeyV' || e.code === 'KeyX')) {
        e.preventDefault()
        e.stopPropagation()
        triggerAntiCheatWarning()
      }
    })

    editor.updateOptions({
      contextmenu: false,
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
    if (isRunning || isSubmitting) return

    if (isSubmit) {
      setIsSubmitting(true)
    } else {
      setIsRunning(true)
    }

    setSubmissionFailed(null)
    setCompilationError(null)

    const visibleCases = (currentProblem.testCases || []).slice(0, 3).map((tc: any, idx: number) => ({
      testIndex: tc.testIndex || idx + 1,
      input: tc.input || '',
      expectedOutput: tc.expectedOutput || '',
    }))

    try {
      const result = await executeCode(
        currentProblem.slug,
        curriculum.runnerLanguage,
        code,
        visibleCases,
        isSubmit
      )

      if (result.compilationError) {
        setCompilationError(result.compilationError)
        setTestResults(null)
        setSubmissionFailed(isSubmit ? { passed: 0, total: 10 } : null)
        return
      }

      setTestResults(result.results)

      if (isSubmit) {
        if (result.passed && result.passedCount === 10) {
          // All 10 passed! Fire celebratory confetti and display completion modal
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
          setShowSuccessModal(true)
        } else {
          // Record attempt
          recordProblemAttempt(
            currentProblem.slug,
            currentProblem.title,
            currentLanguage,
            code,
            result.passedCount,
            10,
            result.overallTimeMs
          )

          setSubmissionFailed({
            passed: result.passedCount,
            total: 10,
          })

          // Refresh recent submissions
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
    } catch (err: any) {
      setCompilationError(err?.message || 'An unexpected execution error occurred.')
      setTestResults(null)
      setSubmissionFailed(isSubmit ? { passed: 0, total: 10 } : null)
    } finally {
      setIsRunning(false)
      setIsSubmitting(false)
    }
  }

  const handleRun = () => handleExecute(false)
  const handleSubmit = () => handleExecute(true)

  // Handlers for QuestionCompletionModal
  const handleContinue = () => {
    const totalTime = testResults?.reduce((acc, t) => acc + (t.executionTimeMs || 0), 0) || 0
    recordProblemSuccess(
      currentProblem.slug,
      currentProblem.title,
      currentLanguage,
      code,
      totalTime
    )

    setShowSuccessModal(false)

    if (nextProblemSlug) {
      navigate(`/practice/${currentLanguage}/${nextProblemSlug}`)
    } else {
      navigate(`/practice/${currentLanguage}`)
    }
  }

  const handleCancel = () => {
    setShowSuccessModal(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-neutral-900 text-neutral-100">
      {/* Anti-Cheat Warning Toast with smooth slide */}
      {antiCheatWarning && (
        <div className="fixed top-16 right-6 z-50 bg-amber-500 text-neutral-950 font-medium px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm animate-toast-slide border border-amber-300">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{antiCheatWarning}</span>
        </div>
      )}

      {/* Arena Top Toolbar with Clean Breadcrumb */}
      <div className="h-12 bg-neutral-950 border-b border-neutral-800 px-4 flex items-center justify-between flex-shrink-0">
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
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                      {currentProblem.difficulty}
                    </span>
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

                {/* Visible Examples (First 3) */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Examples
                  </h3>
                  {currentProblem.testCases.slice(0, 3).map((ex: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-neutral-950/80 rounded-lg border border-neutral-800 space-y-2 text-xs"
                    >
                      <div className="font-semibold text-neutral-400">
                        Example {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <span className="text-neutral-500 text-[11px] block">Input:</span>
                        <pre className="p-2 bg-neutral-900 rounded font-mono text-neutral-200">
                          {ex.input}
                        </pre>
                      </div>
                      <div className="space-y-1">
                        <span className="text-neutral-500 text-[11px] block">Output:</span>
                        <pre className="p-2 bg-neutral-900 rounded font-mono text-emerald-400">
                          {ex.expectedOutput}
                        </pre>
                      </div>
                    </div>
                  ))}
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
                  recentSubmissions.map((sub: any) => (
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
          <div
            className="flex-1 relative overflow-hidden"
            onContextMenu={(e) => {
              e.preventDefault()
              triggerAntiCheatWarning()
            }}
            onPaste={(e) => {
              e.preventDefault()
              triggerAntiCheatWarning()
            }}
            onCopy={(e) => {
              e.preventDefault()
              triggerAntiCheatWarning()
            }}
            onCut={(e) => {
              e.preventDefault()
              triggerAntiCheatWarning()
            }}
          >
            <Editor
              height="100%"
              theme="vs-dark"
              language={curriculum.monacoLanguage}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorMount}
            />
          </div>

          {/* Failure Alert Banner */}
          {submissionFailed && (
            <div className="px-4 py-3 bg-red-950/80 border-t border-red-900/80 flex items-center justify-between text-xs animate-banner-drop">
              <div className="flex items-center gap-2 text-red-300">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 animate-pulse-subtle" />
                <span>
                  ❌ <strong>{submissionFailed.passed}/10</strong> test cases passed. Fix your solution and try again.
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

          {/* Test Cases Bottom Drawer (10 Test Cases: 3 Visible, 7 Hidden) */}
          <div className="h-64 border-t border-neutral-800 bg-neutral-900 flex flex-col overflow-hidden">
            {/* Drawer Tabs */}
            <div className="h-10 bg-neutral-950 px-3 flex items-center justify-between border-b border-neutral-800 flex-shrink-0">
              <div className="flex items-center gap-1 overflow-x-auto py-1">
                <span className="text-xs font-semibold text-neutral-400 mr-1.5 flex-shrink-0">
                  Test Cases:
                </span>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((caseNum) => {
                  const isVisible = caseNum <= 3
                  const tcResult = testResults ? testResults[caseNum - 1] : null
                  const isPassed = tcResult ? tcResult.passed : null

                  return (
                    <button
                      key={caseNum}
                      onClick={() => setActiveCaseTab(caseNum)}
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all duration-200 interactive-tab flex-shrink-0',
                        activeCaseTab === caseNum
                          ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                      )}
                    >
                      {isRunning || isSubmitting ? (
                        <span className="text-amber-400 text-[10px] animate-pulse">⏳</span>
                      ) : isPassed === true ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in-75 duration-200 flex-shrink-0" />
                      ) : isPassed === false ? (
                        <XCircle className="w-3.5 h-3.5 text-red-400 animate-in zoom-in-75 duration-200 flex-shrink-0" />
                      ) : null}
                      <span>Case {caseNum} {!isVisible && '🔒'}</span>
                    </button>
                  )
                })}
              </div>

              {/* Status Header */}
              <div className="text-[11px] font-mono flex items-center gap-2 pl-3 flex-shrink-0">
                {isRunning || isSubmitting ? (
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="animate-spin text-xs">⏳</span> Evaluating 10 Test Cases...
                  </span>
                ) : compilationError ? (
                  <span className="text-red-400 font-semibold">Passed 0 / 10</span>
                ) : testResults ? (
                  <span
                    className={cn(
                      'font-semibold',
                      testResults.filter((t) => t.passed).length === testResults.length
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    )}
                  >
                    Passed {testResults.filter((t) => t.passed).length} / {testResults.length}
                  </span>
                ) : (
                  <span className="text-neutral-500">Passed 0 / 10</span>
                )}
              </div>
            </div>

            {/* Active Test Case Details */}
            <div key={activeCaseTab} className="flex-1 p-4 overflow-y-auto text-xs font-mono space-y-3 animate-page-enter">
              {(() => {
                if (isRunning || isSubmitting) {
                  return (
                    <div className="flex flex-col items-center justify-center py-8 space-y-3 font-sans">
                      <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      <div className="text-xs text-neutral-300 font-medium">
                        Running all 10 test cases in isolated sandbox...
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Validating edge cases, boundary constraints, and performance (3000ms limit)
                      </div>
                    </div>
                  )
                }

                if (compilationError) {
                  return (
                    <div className="space-y-3 font-sans">
                      <div className="p-3 bg-red-950/60 border border-red-900/80 rounded-lg text-red-200 text-xs flex items-center gap-2 font-semibold">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>Compilation / Syntax Error: Test cases not executed</span>
                      </div>
                      <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-red-400 font-mono text-xs whitespace-pre-wrap overflow-x-auto">
                        {compilationError}
                      </div>
                    </div>
                  )
                }

                const isHiddenCase = activeCaseTab > 3
                const tcResult = testResults ? testResults[activeCaseTab - 1] : null

                if (isHiddenCase) {
                  return (
                    <div className="space-y-3 font-sans">
                      <div className="p-3 bg-neutral-950/80 rounded-lg border border-neutral-800 text-neutral-400 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-neutral-200">
                          <span>🔒 Hidden Test Case #{activeCaseTab}</span>
                          <span className="text-[10px] font-normal text-neutral-500">• 1 of 7 Hidden Tests</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                          Test inputs and expected benchmarks are concealed for hidden test cases to evaluate edge cases, boundary constraints, and prevent hardcoded solutions.
                        </p>
                      </div>

                      {tcResult ? (
                        <div className="space-y-2">
                          <div className="text-[11px] text-neutral-400 font-medium flex items-center justify-between">
                            <span>Evaluation Result:</span>
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
                                <span>✓ Passed (Matches hidden benchmark)</span>
                              </>
                            ) : tcResult.isTimeLimitExceeded ? (
                              <>
                                <XCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                <span>⏱ Case {activeCaseTab} — Time Limit Exceeded (3000ms timeout)</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                <span>✗ Case {activeCaseTab} — Failed (Output did not match hidden benchmark)</span>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-neutral-500 text-xs font-sans">
                          Click <strong className="text-neutral-300">Run</strong> or <strong className="text-neutral-300">Submit</strong> to execute this hidden test case.
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
                                : '✗ Incorrect Output'}
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
      />
    </div>
  )
}
