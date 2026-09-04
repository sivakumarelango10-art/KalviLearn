import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  Search,
  ArrowRight,
  History,
  FileCode,
  BookOpen,
} from 'lucide-react'
import problemsData from '@/data/problems.json'
import { getUserState, subscribeProgress, UserProgressRecord, SubmissionRecord } from '@/lib/progress'
import { cn } from '@/lib/utils'

interface SolvedProblemItem {
  slug: string
  title: string
  order: number
  difficulty: string
  description: string
  inputFormat: string
  outputFormat: string
  explanation?: string
  beltName: string
  beltColor: string
  bestCode: string
  language: string
  attempts: number
  solvedAt: string
}

export const RevisePage: React.FC = () => {
  const navigate = useNavigate()
  const [solvedSlugs, setSolvedSlugs] = useState<string[]>([])
  const [progressMap, setProgressMap] = useState<Record<string, UserProgressRecord>>({})
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'description' | 'history'>('code')

  // Load user progress
  useEffect(() => {
    const loadData = () => {
      const state = getUserState()
      setSolvedSlugs(state.solvedSlugs || [])
      setProgressMap(state.progress || {})
      setSubmissions(state.submissions || [])

      if (!selectedSlug && state.solvedSlugs.length > 0) {
        setSelectedSlug(state.solvedSlugs[0])
      }
    }

    loadData()
    return subscribeProgress(loadData)
  }, [])

  // Build list of solved problems with problem metadata
  const solvedProblems = useMemo(() => {
    const list: SolvedProblemItem[] = []
    for (const belt of problemsData) {
      for (const p of belt.problems) {
        if (solvedSlugs.includes(p.slug)) {
          const prog = progressMap[p.slug]
          list.push({
            slug: p.slug,
            title: p.title,
            order: p.order,
            difficulty: p.difficulty,
            description: p.description,
            inputFormat: p.inputFormat,
            outputFormat: p.outputFormat,
            explanation: (p as { explanation?: string }).explanation,
            beltName: belt.name,
            beltColor: belt.color,
            bestCode: prog?.bestCode || '',
            language: prog?.language || 'python',
            attempts: prog?.attempts || 1,
            solvedAt: prog?.solvedAt || '',
          })
        }
      }
    }
    return list
  }, [solvedSlugs, progressMap])

  // Filtered list based on search
  const filteredSolved = useMemo(() => {
    if (!searchQuery) return solvedProblems
    return solvedProblems.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.beltName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [solvedProblems, searchQuery])

  // Active problem
  const currentProblem = useMemo(() => {
    return solvedProblems.find((p) => p.slug === selectedSlug) || solvedProblems[0] || null
  }, [solvedProblems, selectedSlug])

  // Problem-specific submissions
  const problemSubmissions = useMemo(() => {
    if (!currentProblem) return []
    return submissions.filter((s) => s.problemSlug === currentProblem.slug)
  }, [submissions, currentProblem])

  const handleCopyCode = () => {
    if (currentProblem?.bestCode) {
      navigator.clipboard.writeText(currentProblem.bestCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // If no problems solved yet
  if (solvedProblems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-[#ED2A2B] flex items-center justify-center mx-auto shadow-sm">
          <RotateCcw className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-neutral-900">Revise & Review Solutions</h1>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            You haven't solved any problems yet! Once you successfully pass all 10 test cases in the Practice Arena, your accepted solutions will be cataloged here for revision and re-attempts.
          </p>
        </div>
        <div>
          <Link
            to="/practice"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-semibold text-sm hover:bg-neutral-800 shadow-sm transition-all"
          >
            <span>Explore Practice Arena</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Revise & Solution Vault</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {solvedProblems.length} Solved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Review your accepted code solutions, inspect problem specifications, and re-attempt challenges to build speed.
          </p>
        </div>

        <Link
          to="/practice"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold self-start sm:self-center transition-colors"
        >
          <span>Continue Practice</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Dual-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Solved Problems List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-neutral-100 space-y-3">
            <div className="font-bold text-neutral-900 text-sm">Solved Problems Directory</div>
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search solved problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
            {filteredSolved.length === 0 ? (
              <div className="p-6 text-center text-xs text-neutral-400">
                No solved problems match your search.
              </div>
            ) : (
              filteredSolved.map((p) => {
                const isSelected = p.slug === currentProblem?.slug
                return (
                  <div
                    key={p.slug}
                    onClick={() => {
                      setSelectedSlug(p.slug)
                      setActiveTab('code')
                    }}
                    className={cn(
                      'p-3.5 cursor-pointer transition-all duration-200 text-left space-y-1.5 interactive-tab',
                      isSelected
                        ? 'bg-neutral-900 text-white shadow-sm scale-[1.01]'
                        : 'hover:bg-neutral-50 hover:translate-x-1 text-neutral-900'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'text-[10px] font-bold px-2 py-0.5 rounded',
                          isSelected
                            ? 'bg-neutral-800 text-neutral-300'
                            : 'bg-neutral-100 text-neutral-600'
                        )}
                      >
                        {p.beltName} • #{p.order}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] font-medium uppercase',
                          isSelected ? 'text-neutral-400' : 'text-neutral-400'
                        )}
                      >
                        {p.language}
                      </span>
                    </div>

                    <div className="font-semibold text-xs truncate">{p.title}</div>

                    <div
                      className={cn(
                        'flex items-center gap-2 text-[10px]',
                        isSelected ? 'text-neutral-400' : 'text-neutral-500'
                      )}
                    >
                      <span>{p.difficulty}</span>
                      <span>•</span>
                      <span>{p.attempts} {p.attempts === 1 ? 'attempt' : 'attempts'}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Column: Read-Only Solution Viewer & Problem Details */}
        {currentProblem && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col h-[700px]">
            {/* Header & Tabs */}
            <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: currentProblem.beltColor }}
                  />
                  <span className="text-xs font-semibold text-neutral-600">
                    {currentProblem.beltName}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <h2 className="text-base font-bold text-neutral-900">{currentProblem.title}</h2>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700">
                    {currentProblem.difficulty}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-50 shadow-sm transition-all duration-200 interactive-btn"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 animate-in zoom-in-75 duration-150" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigate(`/practice/${currentProblem.slug}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all duration-200 interactive-btn shadow-red-600/20"
                >
                  <RotateCcw className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-45" />
                  <span>Re-attempt</span>
                </button>
              </div>
            </div>

            {/* Sub-navigation tabs */}
            <div className="flex items-center border-b border-neutral-200 px-4 bg-white">
              <button
                onClick={() => setActiveTab('code')}
                className={cn(
                  'flex items-center gap-2 py-2.5 px-3 text-xs font-semibold border-b-2 transition-colors',
                  activeTab === 'code'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                )}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Accepted Solution ({currentProblem.language})</span>
              </button>

              <button
                onClick={() => setActiveTab('description')}
                className={cn(
                  'flex items-center gap-2 py-2.5 px-3 text-xs font-semibold border-b-2 transition-colors',
                  activeTab === 'description'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Problem Description</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={cn(
                  'flex items-center gap-2 py-2.5 px-3 text-xs font-semibold border-b-2 transition-colors',
                  activeTab === 'history'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                )}
              >
                <History className="w-3.5 h-3.5" />
                <span>Submissions ({problemSubmissions.length})</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'code' && (
                <div className="h-full w-full">
                  <Editor
                    height="100%"
                    theme="vs-dark"
                    language={
                      currentProblem.language === 'cpp'
                        ? 'cpp'
                        : currentProblem.language === 'javascript'
                        ? 'javascript'
                        : currentProblem.language === 'java'
                        ? 'java'
                        : 'python'
                    }
                    value={currentProblem.bestCode || '// No code saved for this solution'}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              )}

              {activeTab === 'description' && (
                <div className="p-6 overflow-y-auto h-full space-y-5 text-sm text-neutral-800">
                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Problem Statement
                    </h3>
                    <p className="leading-relaxed whitespace-pre-wrap">{currentProblem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Input Format
                    </h3>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 font-mono text-xs">
                      {currentProblem.inputFormat}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Output Format
                    </h3>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 font-mono text-xs">
                      {currentProblem.outputFormat}
                    </div>
                  </div>

                  {currentProblem.explanation && (
                    <div>
                      <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        Explanation
                      </h3>
                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs">
                        {currentProblem.explanation}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="p-4 overflow-y-auto h-full">
                  {problemSubmissions.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400 text-xs">
                      No submission log found for this session.
                    </div>
                  ) : (
                    <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
                      <div className="bg-neutral-50 px-4 py-2.5 font-semibold text-neutral-600 grid grid-cols-12 gap-2">
                        <div className="col-span-4">Status</div>
                        <div className="col-span-3">Language</div>
                        <div className="col-span-3">Runtime</div>
                        <div className="col-span-2">Passed</div>
                      </div>
                      {problemSubmissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-neutral-50/80 transition-colors"
                        >
                          <div className="col-span-4 flex items-center gap-1.5">
                            {sub.status === 'PASSED' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-amber-500" />
                            )}
                            <span
                              className={cn(
                                'font-semibold',
                                sub.status === 'PASSED' ? 'text-emerald-700' : 'text-amber-700'
                              )}
                            >
                              {sub.status}
                            </span>
                          </div>
                          <div className="col-span-3 font-mono text-neutral-600 uppercase">
                            {sub.language}
                          </div>
                          <div className="col-span-3 text-neutral-500">
                            {sub.executionTimeMs} ms
                          </div>
                          <div className="col-span-2 font-semibold text-neutral-700">
                            {sub.passedTests} / {sub.totalTests}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
