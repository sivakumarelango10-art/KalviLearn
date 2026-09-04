import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Editor, { OnMount } from '@monaco-editor/react'
import confetti from 'canvas-confetti'
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  FileText,
  History,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react'
import problemsData from '@/data/problems.json'
import { runTestCases, TestCaseExecution } from '@/lib/runner/codeRunner'
import {
  getUserState,
  recordProblemSuccess,
  recordProblemAttempt,
} from '@/lib/progress'
import { cn } from '@/lib/utils'

export const ProblemArenaPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  // Find problem across all belts
  let currentBelt = problemsData[0]
  let currentProblem = currentBelt.problems[0]
  let currentBeltIndex = 0
  let currentProblemIndex = 0

  for (let bIdx = 0; bIdx < problemsData.length; bIdx++) {
    const b = problemsData[bIdx]
    const pIdx = b.problems.findIndex((p: any) => p.slug === slug)
    if (pIdx !== -1) {
      currentBelt = b
      currentProblem = b.problems[pIdx]
      currentBeltIndex = bIdx
      currentProblemIndex = pIdx
      break
    }
  }

  // Next problem resolution
  let nextProblemSlug: string | null = null
  if (currentProblemIndex + 1 < currentBelt.problems.length) {
    nextProblemSlug = currentBelt.problems[currentProblemIndex + 1].slug
  } else if (currentBeltIndex + 1 < problemsData.length) {
    nextProblemSlug = problemsData[currentBeltIndex + 1].problems[0].slug
  }

  // State
  const [activeTab, setActiveTab] = useState<'description' | 'submissions' | 'help'>('description')
  const [language, setLanguage] = useState<'python' | 'javascript' | 'cpp' | 'java'>('python')
  const [code, setCode] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestCaseExecution[] | null>(null)
  const [activeCaseTab, setActiveCaseTab] = useState<number>(1)
  const [antiCheatWarning, setAntiCheatWarning] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submissionFailed, setSubmissionFailed] = useState<{ passed: number; total: number } | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([])

  const editorRef = useRef<any>(null)

  // Initialize code on problem or language change
  useEffect(() => {
    const userState = getUserState()
    const saved = userState.progress[currentProblem.slug]

    if (saved && saved.bestCode && saved.language === language) {
      setCode(saved.bestCode)
    } else {
      const defaultStarter =
        (currentProblem.starterCodes as any)[language] ||
        `// Write your ${language} solution here`
      setCode(defaultStarter)
    }

    setTestResults(null)
    setShowSuccessModal(false)
    setSubmissionFailed(null)

    // Load submission history for this problem
    const subs = userState.submissions.filter(s => s.problemSlug === currentProblem.slug)
    setRecentSubmissions(subs)
  }, [currentProblem.slug, language])

  // Anti-Cheat: Intercept Cut, Copy, Paste & Right Click
  const triggerAntiCheatWarning = () => {
    setAntiCheatWarning('⚠️ Manual Coding Enforced: Copy, Paste, and Cut are disabled in Practice Arena.')
    setTimeout(() => setAntiCheatWarning(null), 3000)
  }

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor

    // Intercept keyboard shortcuts
    editor.onKeyDown((e) => {
      // Ctrl+C, Ctrl+V, Ctrl+X, Cmd+C, Cmd+V, Cmd+X
      const isModifier = e.ctrlKey || e.metaKey
      if (isModifier && (e.code === 'KeyC' || e.code === 'KeyV' || e.code === 'KeyX')) {
        e.preventDefault()
        e.stopPropagation()
        triggerAntiCheatWarning()
      }
    })

    // Disable editor context menu
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
    })
  }

  // Execute Visible 3 Test Cases
  const handleRun = async () => {
    setIsRunning(true)
    setSubmissionFailed(null)

    // Run first 3 visible test cases
    const visibleCases = currentProblem.testCases.slice(0, 3)
    const result = await runTestCases(code, language, visibleCases)

    setTestResults(result.results)
    setActiveCaseTab(1)
    setIsRunning(false)
  }

  // Execute All 10 Test Cases (3 visible + 7 hidden)
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmissionFailed(null)

    // Run all 10 test cases
    const allCases = currentProblem.testCases
    const result = await runTestCases(code, language, allCases)

    setTestResults(result.results)
    setIsSubmitting(false)

    if (result.passed) {
      // Record success, reward XP
      recordProblemSuccess(
        currentProblem.slug,
        currentProblem.title,
        language,
        code,
        result.overallTimeMs
      )

      // Fire confetti burst!
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
        language,
        code,
        result.passedCount,
        result.totalCount,
        result.overallTimeMs
      )

      setSubmissionFailed({
        passed: result.passedCount,
        total: result.totalCount,
      })
    }

    // Refresh submission list
    const state = getUserState()
    setRecentSubmissions(state.submissions.filter(s => s.problemSlug === currentProblem.slug))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-neutral-900 text-neutral-100">
      {/* Anti-Cheat Warning Toast */}
      {antiCheatWarning && (
        <div className="fixed top-20 right-6 z-50 bg-amber-500 text-neutral-950 font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-xs sm:text-sm animate-bounce">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{antiCheatWarning}</span>
        </div>
      )}

      {/* Arena Top Toolbar */}
      <div className="h-12 bg-neutral-950 border-b border-neutral-800 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/practice"
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            Practice <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
            {currentBelt.name}
          </span>
          <h1 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
            {currentProblem.order}. {currentProblem.title}
          </h1>
        </div>

        {/* Language Selection & Action Buttons */}
        <div className="flex items-center gap-2.5">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-neutral-800 text-neutral-200 text-xs font-medium px-3 py-1.5 rounded-md border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#ED2A2B]"
          >
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript (Node.js)</option>
            <option value="cpp">C++ (g++)</option>
            <option value="java">Java (OpenJDK)</option>
          </select>

          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
          >
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
                      +50 XP
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
                  Past Submissions
                </h3>
                {recentSubmissions.length === 0 ? (
                  <p className="text-neutral-500 text-xs py-4">No submissions yet for this problem.</p>
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
                    Read the input format carefully. Ensure your solution parses all inputs from standard input and prints only the exact required output without extraneous labels.
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
          >
            <Editor
              height="100%"
              theme="vs-dark"
              language={language === 'python' ? 'python' : language === 'javascript' ? 'javascript' : language === 'cpp' ? 'cpp' : 'java'}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorMount}
            />
          </div>

          {/* Failure Alert Banner (if submit fails) */}
          {submissionFailed && (
            <div className="px-4 py-3 bg-red-950/80 border-t border-red-900/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-red-300">
                <XCircle className="w-4 h-4 text-red-400" />
                <span>
                  Some test cases failed. Passed: <strong>{submissionFailed.passed} / {submissionFailed.total}</strong>
                </span>
              </div>
              <button
                onClick={() => setSubmissionFailed(null)}
                className="px-3 py-1 bg-red-900/60 hover:bg-red-800 text-red-200 font-medium rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Test Cases Bottom Drawer */}
          <div className="h-64 border-t border-neutral-800 bg-neutral-900 flex flex-col overflow-hidden">
            {/* Drawer Tabs */}
            <div className="h-10 bg-neutral-950 px-3 flex items-center justify-between border-b border-neutral-800 flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-neutral-400 mr-2">
                  Test Cases:
                </span>
                {(testResults || currentProblem.testCases.slice(0, 3)).map((tc: any, i: number) => {
                  const num = i + 1
                  const isVisible = i < 3
                  if (!isVisible && !testResults) return null

                  const isPassed = tc.passed !== undefined ? tc.passed : null

                  return (
                    <button
                      key={num}
                      onClick={() => setActiveCaseTab(num)}
                      className={cn(
                        'px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors',
                        activeCaseTab === num
                          ? 'bg-neutral-800 text-white'
                          : 'text-neutral-400 hover:text-neutral-200'
                      )}
                    >
                      {isPassed === true && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      {isPassed === false && <XCircle className="w-3 h-3 text-red-400" />}
                      <span>Case {num}</span>
                    </button>
                  )
                })}
              </div>

              {testResults && (
                <div className="text-[11px] text-neutral-400 font-mono">
                  Passed {testResults.filter(t => t.passed).length} / {testResults.length}
                </div>
              )}
            </div>

            {/* Active Test Case Details */}
            <div className="flex-1 p-4 overflow-y-auto text-xs font-mono space-y-3">
              {(() => {
                const targetCase =
                  testResults?.[activeCaseTab - 1] ||
                  currentProblem.testCases[activeCaseTab - 1]

                if (!targetCase) return <div className="text-neutral-500">Run code to see test results.</div>

                return (
                  <div className="space-y-3">
                    {/* Input */}
                    <div>
                      <div className="text-[11px] font-sans text-neutral-400 mb-1">
                        Input:
                      </div>
                      <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 text-neutral-200 whitespace-pre-wrap">
                        {targetCase.input}
                      </div>
                    </div>

                    {/* Expected Output */}
                    <div>
                      <div className="text-[11px] font-sans text-neutral-400 mb-1">
                        Expected Output:
                      </div>
                      <div className="p-2.5 bg-neutral-950 rounded border border-neutral-800 text-emerald-400 whitespace-pre-wrap">
                        {targetCase.expectedOutput}
                      </div>
                    </div>

                    {/* Actual Output (if executed) */}
                    {'actualOutput' in targetCase && (
                      <div>
                        <div className="text-[11px] font-sans text-neutral-400 mb-1 flex items-center justify-between">
                          <span>Your Output:</span>
                          <span className={(targetCase as any).passed ? 'text-emerald-400' : 'text-red-400'}>
                            {(targetCase as any).passed ? '✓ Matches' : '✗ Incorrect Output'}
                          </span>
                        </div>
                        <div
                          className={cn(
                            'p-2.5 rounded border whitespace-pre-wrap',
                            (targetCase as any).passed
                              ? 'bg-neutral-950 border-emerald-900/60 text-emerald-300'
                              : 'bg-neutral-950 border-red-900/60 text-red-300'
                          )}
                        >
                          {String((targetCase as any).actualOutput || '')}
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

      {/* Completion Modal: 🎉 Problem Completed! */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 text-neutral-900 shadow-2xl border border-neutral-100 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-neutral-900">
                🎉 Problem Completed!
              </h3>
              <p className="text-sm text-neutral-500">
                All 10 test cases passed.
              </p>
            </div>

            <div className="px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-semibold text-sm">
              +50 XP Earned
            </div>

            <p className="text-xs text-neutral-400">
              What would you like to do next?
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-2.5 pt-2">
              {nextProblemSlug ? (
                <button
                  onClick={() => {
                    setShowSuccessModal(false)
                    navigate(`/practice/${nextProblemSlug}`)
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ED2A2B] hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                >
                  <span>Next Problem</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowSuccessModal(false)
                    navigate('/revise')
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-black text-white text-sm font-semibold transition-colors"
                >
                  <span>Revise Solved</span>
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-sm font-medium transition-colors"
              >
                Stay Here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
