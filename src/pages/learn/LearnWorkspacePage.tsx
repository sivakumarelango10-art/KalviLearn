import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link, useSearchParams, Navigate } from 'react-router-dom'
import Editor, { OnMount } from '@monaco-editor/react'
import confetti from 'canvas-confetti'
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Lock,
  Terminal,
  FileText,
  AlertTriangle,
} from 'lucide-react'
import {
  getLearnTopic,
  getLearnQuestion,
  getLearnQuestionsByTopic,
  getLearnRedirect,
} from '@/data/learn/coding'
import {
  DEFAULT_STARTER_CODES,
  ProgrammingLanguage,
  normalizeLanguageSlug,
} from '@/data/curriculum/index'
import { executeCode, isAuthoritativeAccept, TestCaseExecution, type RunResult } from '@/lib/runner/codeRunner'
import {
  recordLearnQuestionSolve,
  recordLearnQuestionAttempt,
  isLearnQuestionSolved,
  subscribeLearnProgress,
} from '@/lib/learnProgress'
import { FormattedText } from '@/components/common/FormattedText'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

export const LearnWorkspacePage: React.FC = () => {
  const { topicId, slug } = useParams<{ topicId: string; slug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()

  // Resolve Topic and Question
  const topic = useMemo(() => getLearnTopic(topicId), [topicId])
  const question = useMemo(() => getLearnQuestion(topicId, slug), [topicId, slug])
  const topicQuestions = useMemo(() => (topicId ? getLearnQuestionsByTopic(topicId) : []), [topicId])

  // Check for redirect if question not found
  if (!question && slug) {
    const redirect = getLearnRedirect(slug)
    if (redirect) {
      return <Navigate to={redirect.targetSolveUrl} replace />
    }
  }

  // Language management via ?lang= query param (default to python or last used; force python if python-only)
  const langParam = searchParams.get('lang')
  const currentLanguage: ProgrammingLanguage = useMemo(() => {
    if (question?.isPythonOnly) return 'python'
    return normalizeLanguageSlug(langParam || localStorage.getItem('kalvi_preferred_language'))
  }, [langParam, question?.isPythonOnly])

  // Question navigation context
  const currentIndex = useMemo(() => {
    if (!question) return -1
    return topicQuestions.findIndex((q) => q.slug === question.slug)
  }, [topicQuestions, question])

  const prevQuestion = currentIndex > 0 ? topicQuestions[currentIndex - 1] : null
  const nextQuestion = currentIndex >= 0 && currentIndex + 1 < topicQuestions.length ? topicQuestions[currentIndex + 1] : null

  // Editor and execution state
  const editorRef = useRef<any>(null)
  const [code, setCode] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'history'>('description')
  const [activeCaseTab, setActiveCaseTab] = useState<number>(1)
  const [testResults, setTestResults] = useState<Record<number, TestCaseExecution> | null>(null)
  const [executionSummary, setExecutionSummary] = useState<{
    passed: number
    total: number
    isSubmit: boolean
    accepted: boolean
    overallTimeMs: number
  } | null>(null)
  const [compilationError, setCompilationError] = useState<string | null>(null)
  const [isSolvedLocally, setIsSolvedLocally] = useState<boolean>(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)

  // Storage key for user's code: namespaced strictly to Learn
  const storageKey = useMemo(() => {
    return `learn_code_${topicId || 'unknown'}_${slug || 'unknown'}_${currentLanguage}`
  }, [topicId, slug, currentLanguage])

  // Load code on question or language change
  useEffect(() => {
    if (!question) return
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setCode(saved)
    } else {
      const questionStarter = question.starterCodes?.[currentLanguage]
      setCode(questionStarter || DEFAULT_STARTER_CODES[currentLanguage] || DEFAULT_STARTER_CODES.python)
    }

    // Reset runtime states
    setTestResults(null)
    setExecutionSummary(null)
    setCompilationError(null)
    setShowCompletionModal(false)
    setActiveCaseTab(1)
  }, [question?.slug, currentLanguage, storageKey])

  // Check solve status
  useEffect(() => {
    if (!slug) return
    const check = () => setIsSolvedLocally(isLearnQuestionSolved(slug, user?.id))
    check()
    return subscribeLearnProgress(check)
  }, [slug, user?.id])

  const handleLanguageChange = (newLang: ProgrammingLanguage) => {
    if (question?.isPythonOnly && newLang !== 'python') return
    localStorage.setItem('kalvi_preferred_language', newLang)
    searchParams.set('lang', newLang)
    setSearchParams(searchParams, { replace: true })
  }

  const handleCodeChange = (newCode?: string) => {
    const val = newCode ?? ''
    setCode(val)
    try {
      localStorage.setItem(storageKey, val)
    } catch {
      // quota safeguard
    }
  }

  const handleReset = () => {
    const questionStarter = question?.starterCodes?.[currentLanguage]
    const starter = questionStarter || DEFAULT_STARTER_CODES[currentLanguage] || DEFAULT_STARTER_CODES.python
    setCode(starter)
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // ignore
    }
    if (editorRef.current) {
      editorRef.current.setValue(starter)
    }
  }

  const handleExecute = async (isSubmit: boolean) => {
    if (!question || !topic || isRunning || isSubmitting) return
    if (isSubmit) setIsSubmitting(true)
    else setIsRunning(true)

    setCompilationError(null)
    setExecutionSummary(null)
    setTestResults({})

    const currentCode = editorRef.current?.getValue() ?? code
    const visibleCases = (question.visibleTests || []).map((vt, i) => ({
      testIndex: vt.testIndex ?? i + 1,
      input: vt.input,
      expectedOutput: vt.expectedOutput,
    }))

    const namespacedIdentifier = `learn:${topic.slug}:${question.slug}`

    try {
      const result: RunResult = await executeCode(
        namespacedIdentifier,
        currentLanguage,
        currentCode,
        visibleCases,
        isSubmit,
        {
          onEvent: (event) => {
            if (event.type === 'case') {
              setTestResults((prev) => ({ ...(prev || {}), [event.result.testIndex]: event.result }))
            }
          },
        }
      )

      const accepted = isAuthoritativeAccept(result, isSubmit)

      if (result.compilationError) {
        setCompilationError(result.compilationError)
        setTestResults(null)
        setExecutionSummary({
          passed: 0,
          total: result.totalCount || 10,
          isSubmit,
          accepted: false,
          overallTimeMs: result.overallTimeMs || 0,
        })
        return
      }

      const byIndex: Record<number, TestCaseExecution> = {}
      for (const r of result.results) byIndex[r.testIndex] = r
      setTestResults(byIndex)

      setExecutionSummary({
        passed: result.passedCount,
        total: result.totalCount,
        isSubmit,
        accepted,
        overallTimeMs: result.overallTimeMs,
      })

      if (isSubmit && accepted) {
        // Record solve in Learn progress store (no DB mutation, zero XP, zero /500 impact)
        recordLearnQuestionSolve({
          topicSlug: topic.slug,
          questionSlug: question.slug,
          language: currentLanguage,
          userId: user?.id,
        })
        setIsSolvedLocally(true)
        setShowCompletionModal(true)

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        })
      } else if (isSubmit) {
        recordLearnQuestionAttempt({
          topicSlug: topic.slug,
          questionSlug: question.slug,
          language: currentLanguage,
          userId: user?.id,
        })
      }
    } catch (err: any) {
      console.error('[LearnWorkspace] execution failure:', err)
      setCompilationError(err.message || 'Execution error encountered.')
    } finally {
      setIsRunning(false)
      setIsSubmitting(false)
    }
  }

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor
    editor.updateOptions({
      contextmenu: true,
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: "'Fira Code', Consolas, monospace",
      lineNumbers: 'on',
      roundedSelection: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
    })
  }

  // Not Found State for unknown Topic or Question
  if (!topic || !question) {
    return (
      <div className="min-h-[75vh] w-full flex items-center justify-center p-4 bg-neutral-900 text-neutral-100 font-sans">
        <div className="max-w-md w-full bg-neutral-950 border border-neutral-800 rounded-3xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-red-400 flex items-center justify-center mx-auto shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Question Not Found</h1>
            <p className="text-xs sm:text-sm text-neutral-400">
              The requested coding question could not be located in Learn.
            </p>
          </div>
          <Link
            to="/learn/coding"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Coding Topics</span>
          </Link>
        </div>
      </div>
    )
  }

  const monacoLanguage = currentLanguage === 'nodejs' ? 'javascript' : currentLanguage

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-[#ED2A2B]/30">
      {/* Top Workspace Header */}
      <header className="border-b border-neutral-800/80 bg-neutral-900/95 backdrop-blur px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-400 flex-wrap">
            <Link to="/learn" className="hover:text-white transition-colors">
              Learn
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
            <Link to="/learn/coding" className="hover:text-white transition-colors">
              Coding
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
            <Link to={`/learn/coding/${topic.slug}`} className="hover:text-white transition-colors truncate max-w-[140px] sm:max-w-none">
              {topic.title}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
            <span className="text-neutral-200 font-semibold truncate max-w-[160px] sm:max-w-none">{question.title}</span>
          </nav>

          {/* Topic Position Tag */}
          {currentIndex >= 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700/60 shrink-0">
              {`${currentIndex + 1} of ${topicQuestions.length}`}
            </span>
          )}

          {isSolvedLocally && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/80 shrink-0">
              <CheckCircle2 className="w-3 h-3" />
              <span>Solved</span>
            </span>
          )}
        </div>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector */}
          <div className="flex items-center bg-neutral-950 rounded-lg p-0.5 border border-neutral-800">
            {((question.isPythonOnly ? ['python'] : ['python', 'java', 'nodejs', 'cpp']) as ProgrammingLanguage[]).map((lang) => {
              const label = lang === 'nodejs' ? 'JS' : lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)
              const isActive = currentLanguage === lang
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-xs font-semibold transition-all',
                    isActive ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
                  )}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Reset Code */}
          <button
            type="button"
            onClick={handleReset}
            title="Reset to starter code"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Run Button (Visible Cases) */}
          <button
            type="button"
            onClick={() => handleExecute(false)}
            disabled={isRunning || isSubmitting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold transition-all disabled:opacity-50"
          >
            <Play className={cn('w-3.5 h-3.5 text-neutral-400', isRunning && 'animate-spin')} />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          {/* Submit Button (All 10 Cases) */}
          <button
            type="button"
            onClick={() => handleExecute(true)}
            disabled={isRunning || isSubmitting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            <Send className={cn('w-3.5 h-3.5', isSubmitting && 'animate-pulse')} />
            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Left Column: Problem Details & Tabs */}
        <div className="w-full lg:w-[45%] xl:w-[42%] border-b lg:border-b-0 lg:border-r border-neutral-800/80 flex flex-col bg-neutral-900/40 min-h-0">
          {/* Navigation Bar inside Left Panel */}
          <div className="px-5 py-3 border-b border-neutral-800/80 flex items-center justify-between gap-2 shrink-0">
            <Link
              to={`/learn/coding/${topic.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {topic.title}</span>
            </Link>

            <div className="flex items-center gap-1">
              {prevQuestion ? (
                <Link
                  to={`/learn/coding/${topic.slug}/${prevQuestion.slug}/solve?lang=${currentLanguage}`}
                  title={prevQuestion.title}
                  className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              ) : (
                <span className="p-1 text-neutral-700 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </span>
              )}

              <span className="text-[11px] text-neutral-500 font-mono px-1">
                {currentIndex + 1}/{topicQuestions.length}
              </span>

              {nextQuestion ? (
                <Link
                  to={`/learn/coding/${topic.slug}/${nextQuestion.slug}/solve?lang=${currentLanguage}`}
                  title={nextQuestion.title}
                  className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="p-1 text-neutral-700 cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center px-5 border-b border-neutral-800/80 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={cn(
                'flex items-center gap-2 py-3 text-xs font-semibold border-b-2 transition-colors mr-6',
                activeTab === 'description' ? 'border-[#ED2A2B] text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Problem Description</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={cn(
                'flex items-center gap-2 py-3 text-xs font-semibold border-b-2 transition-colors',
                activeTab === 'history' ? 'border-[#ED2A2B] text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
              )}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Solve History</span>
            </button>
          </div>

          {/* Panel Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {activeTab === 'description' ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 border border-neutral-700/60">
                      Coding
                    </span>
                    {currentIndex >= 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-neutral-400 bg-neutral-900 border border-neutral-800">
                        {currentIndex + 1} of {topicQuestions.length}
                      </span>
                    )}
                    {question.difficulty && (
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border',
                          question.difficulty === 'Easy'
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-900/60'
                            : question.difficulty === 'Medium'
                            ? 'bg-amber-950/60 text-amber-400 border-amber-900/60'
                            : 'bg-rose-950/60 text-rose-400 border-rose-900/60'
                        )}
                      >
                        {question.difficulty}
                      </span>
                    )}
                    {question.isPythonOnly && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-800/60">
                        Python Only
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{question.title}</h1>
                  {question.isPythonOnly && (
                    <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-300 leading-relaxed">
                      {question.pythonOnlyNote || 'Note: This challenge evaluates Python-specific language semantics and is solved exclusively in Python.'}
                    </div>
                  )}
                </div>

                {/* Problem Statement */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Statement</h2>
                  <FormattedText
                    as="div"
                    text={question.problemStatement}
                    className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line"
                  />
                </div>

                {/* Input / Output Formats */}
                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Input Format</h3>
                    <FormattedText
                      as="div"
                      text={question.inputFormat}
                      className="text-xs text-neutral-300 leading-relaxed"
                    />
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Output Format</h3>
                    <FormattedText
                      as="div"
                      text={question.outputFormat}
                      className="text-xs text-neutral-300 leading-relaxed"
                    />
                  </div>
                </div>

                {/* Constraints */}
                {question.constraints && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Constraints</h2>
                    <FormattedText
                      as="div"
                      text={question.constraints}
                      className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 font-mono text-xs text-neutral-300 whitespace-pre-line"
                    />
                  </div>
                )}

                {/* Examples */}
                {question.examples && question.examples.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Examples</h2>
                    {question.examples.map((ex, i) => (
                      <div key={i} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                        <span className="text-[11px] font-bold text-neutral-400">Example {i + 1}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-neutral-500">Input</span>
                            <pre className="mt-1 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-neutral-200 overflow-x-auto whitespace-pre">
                              {ex.input}
                            </pre>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-neutral-500">Output</span>
                            <pre className="mt-1 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-neutral-200 overflow-x-auto whitespace-pre">
                              {ex.output}
                            </pre>
                          </div>
                        </div>
                        {ex.explanation && (
                          <p className="text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/80 pt-2">
                            <span className="font-semibold text-neutral-300">Explanation: </span>
                            {ex.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Challenge Status</h3>
                  <div className="flex items-center gap-2">
                    {isSolvedLocally ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Solved in Learn Track</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Not yet completed</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                    Learn track solutions are saved per challenge for skill building. XP, belts, and mentor streaks are exclusively tied to Practice Arena challenges.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Test Case Results Panel */}
        <div className="flex-1 flex flex-col min-h-0 bg-neutral-950">
          {/* Monaco Code Editor Container */}
          <div className="flex-1 min-h-[300px] border-b border-neutral-800/80 relative">
            <Editor
              height="100%"
              language={monacoLanguage}
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              onMount={handleEditorMount}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                tabSize: 4,
              }}
            />
          </div>

          {/* Bottom Execution & Test Cases Panel */}
          <div className="h-[280px] sm:h-[320px] flex flex-col bg-neutral-900/60 shrink-0">
            {/* Test Case Tab Bar */}
            <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between gap-3 shrink-0 overflow-x-auto">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-2 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Test Cases</span>
                </span>

                {Array.from({ length: 10 }, (_, i) => i + 1).map((caseIndex) => {
                  const isHidden = caseIndex > 3
                  const isSelected = activeCaseTab === caseIndex
                  const outcome = testResults?.[caseIndex]

                  return (
                    <button
                      key={caseIndex}
                      type="button"
                      onClick={() => setActiveCaseTab(caseIndex)}
                      className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all shrink-0',
                        isSelected ? 'bg-neutral-800 text-white border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200',
                        outcome?.passed && 'text-emerald-400',
                        outcome && !outcome.passed && 'text-rose-400'
                      )}
                    >
                      {outcome ? (
                        outcome.passed ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-rose-400" />
                        )
                      ) : isHidden ? (
                        <Lock className="w-3 h-3 text-neutral-500" />
                      ) : null}
                      <span>Case {caseIndex}</span>
                    </button>
                  )
                })}
              </div>

              {/* Execution Summary Pill */}
              {executionSummary && (
                <div
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 border',
                    executionSummary.accepted
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                      : 'bg-rose-950/80 text-rose-400 border-rose-900'
                  )}
                >
                  {executionSummary.accepted
                    ? 'All 10 Passed (Accepted)'
                    : `${executionSummary.passed} / ${executionSummary.total} Passed`}
                </div>
              )}
            </div>

            {/* Test Case Detail Display */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-neutral-300 space-y-3">
              {compilationError ? (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Compilation / Runtime Error</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-xs text-rose-200/90 font-mono overflow-x-auto">
                    {compilationError}
                  </pre>
                </div>
              ) : activeCaseTab > 3 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2 p-6 text-neutral-500">
                  <Lock className="w-8 h-8 text-neutral-600" />
                  <p className="text-xs font-semibold text-neutral-400">Hidden Test Case #{activeCaseTab}</p>
                  <p className="text-[11px] max-w-xs text-neutral-500">
                    Hidden test inputs and expected outputs are verified server-side upon clicking &quot;Submit&quot;.
                  </p>
                  {testResults?.[activeCaseTab] && (
                    <div className="pt-2">
                      <span
                        className={cn(
                          'px-2.5 py-1 rounded-md text-xs font-semibold border',
                          testResults[activeCaseTab].passed
                            ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                            : 'bg-rose-950/80 text-rose-400 border-rose-900'
                        )}
                      >
                        {testResults[activeCaseTab].passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                (() => {
                  const visibleIndex = activeCaseTab - 1
                  const visibleCase = question.visibleTests?.[visibleIndex]
                  const caseResult = testResults?.[activeCaseTab]

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500">Input</span>
                        <pre className="mt-1 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 overflow-x-auto whitespace-pre">
                          {visibleCase?.input || '(no input)'}
                        </pre>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500">Expected Output</span>
                        <pre className="mt-1 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 overflow-x-auto whitespace-pre">
                          {visibleCase?.expectedOutput || ''}
                        </pre>
                      </div>

                      {caseResult && (
                        <div className="md:col-span-2 pt-1">
                          <span className="text-[10px] uppercase font-bold text-neutral-500">Your Output</span>
                          <pre
                            className={cn(
                              'mt-1 p-2.5 rounded-lg border font-mono text-xs overflow-x-auto whitespace-pre',
                              caseResult.passed
                                ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-200'
                                : 'bg-rose-950/20 border-rose-900/60 text-rose-200'
                            )}
                          >
                            {caseResult.actualOutput || '(no output)'}
                          </pre>
                        </div>
                      )}
                    </div>
                  )
                })()
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solved Successfully</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Challenge Completed!</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Great job solving <span className="text-neutral-200 font-semibold">{question.title}</span>! Learn track challenges reinforce your problem solving foundations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCompletionModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold transition-colors"
              >
                Close
              </button>

              {nextQuestion ? (
                <Link
                  to={`/learn/coding/${topic.slug}/${nextQuestion.slug}/solve?lang=${currentLanguage}`}
                  onClick={() => setShowCompletionModal(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Next Challenge</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to={`/learn/coding/${topic.slug}`}
                  onClick={() => setShowCompletionModal(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Back to {topic.title}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LearnWorkspacePage
