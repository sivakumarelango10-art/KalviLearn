import React, { useState, useEffect, useMemo, useRef } from 'react'
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
  Code2,
} from 'lucide-react'
import problemsData from '@/data/problems.json'
import {
  getUserState,
  subscribeProgress,
  UserProgressRecord,
  SubmissionRecord,
  LanguageProgressSummary,
  normalizeProgressLanguage,
} from '@/lib/progress'
import { cn } from '@/lib/utils'

export type LanguageKey = 'python' | 'java' | 'nodejs' | 'cpp'

interface ProblemSolution {
  language: LanguageKey
  languageName: string
  bestCode: string
  attempts: number
  solvedAt: string
}

interface SolvedProblemItem {
  id: string // slug
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
  solvedLanguages: LanguageKey[]
  solutions: Partial<Record<LanguageKey, ProblemSolution>>
  totalAttempts: number
  latestSolvedAt: string
}

const ALL_LANGUAGES: LanguageKey[] = ['python', 'java', 'nodejs', 'cpp']

const LANGUAGE_LABELS: Record<LanguageKey, string> = {
  python: 'Python',
  java: 'Java',
  nodejs: 'Node.js',
  cpp: 'C++',
}

const LANGUAGE_BADGE_STYLES: Record<LanguageKey, string> = {
  python: 'bg-[#EEF5FF] text-[#2B6CB0] border-[#C2DBFE]',
  java: 'bg-[#FFF0ED] text-[#C05621] border-[#FED7D7]',
  nodejs: 'bg-[#EDF8EE] text-[#2F855A] border-[#C6F6D5]',
  cpp: 'bg-[#EEF5FC] text-[#2B6CB0] border-[#BEE3F8]',
}

const MONACO_LANG_MAP: Record<LanguageKey, string> = {
  python: 'python',
  java: 'java',
  nodejs: 'javascript',
  cpp: 'cpp',
}

export const RevisePage: React.FC = () => {
  const navigate = useNavigate()
  const [progressMap, setProgressMap] = useState<Record<string, UserProgressRecord>>({})
  const [languageProgress, setLanguageProgress] = useState<Record<string, LanguageProgressSummary>>({})
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([])
  const [selectedProblemSlug, setSelectedProblemSlug] = useState<string | null>(null)
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<'all' | LanguageKey>('all')
  const [activeLanguage, setActiveLanguage] = useState<LanguageKey>('python')
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'description' | 'history'>('code')
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  // Load user progress and subscribe to updates
  useEffect(() => {
    const loadData = () => {
      const state = getUserState()
      setProgressMap(state.progress || {})
      setLanguageProgress(state.languageProgress || {})
      setSubmissions(state.submissions || [])
    }

    loadData()
    return subscribeProgress(loadData)
  }, [])

  // Build deduplicated list of solved problems with all per-language solutions
  const solvedProblems = useMemo(() => {
    const list: SolvedProblemItem[] = []

    for (const belt of problemsData) {
      for (const p of belt.problems) {
        const solutions: Partial<Record<LanguageKey, ProblemSolution>> = {}
        const solvedLangs: LanguageKey[] = []
        let totalAttempts = 0
        let latestSolvedAt = ''

        for (const lang of ALL_LANGUAGES) {
          const langKey = `${lang}:${p.slug}`
          const langProg = progressMap[langKey]
          const genericProg = progressMap[p.slug]
          const solvedInLangSummary = languageProgress[lang]?.solvedSlugs?.includes(p.slug)

          // Check passed submissions for this problem & language
          const passedSub = submissions.find(
            (s) =>
              s.problemSlug === p.slug &&
              normalizeProgressLanguage(s.language) === lang &&
              s.status === 'PASSED'
          )

          const isSolved =
            solvedInLangSummary ||
            langProg?.status === 'SOLVED' ||
            (genericProg?.status === 'SOLVED' && normalizeProgressLanguage(genericProg.language) === lang) ||
            Boolean(passedSub)

          if (isSolved) {
            solvedLangs.push(lang)
            const code =
              langProg?.bestCode ||
              (normalizeProgressLanguage(genericProg?.language) === lang ? genericProg?.bestCode : '') ||
              passedSub?.code ||
              ''

            const attempts = langProg?.attempts || passedSub ? 1 : genericProg?.attempts || 1
            const solvedAt = langProg?.solvedAt || passedSub?.createdAt || genericProg?.solvedAt || ''

            solutions[lang] = {
              language: lang,
              languageName: LANGUAGE_LABELS[lang],
              bestCode: code,
              attempts,
              solvedAt,
            }

            totalAttempts += attempts
            if (!latestSolvedAt || (solvedAt && new Date(solvedAt).getTime() > new Date(latestSolvedAt).getTime())) {
              latestSolvedAt = solvedAt
            }
          }
        }

        if (solvedLangs.length > 0) {
          list.push({
            id: p.slug,
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
            solvedLanguages: solvedLangs,
            solutions,
            totalAttempts: Math.max(totalAttempts, 1),
            latestSolvedAt,
          })
        }
      }
    }

    return list
  }, [languageProgress, progressMap, submissions])

  // Count per language for badges
  const counts = useMemo(() => {
    return {
      all: solvedProblems.length,
      python: solvedProblems.filter((p) => p.solvedLanguages.includes('python')).length,
      java: solvedProblems.filter((p) => p.solvedLanguages.includes('java')).length,
      nodejs: solvedProblems.filter((p) => p.solvedLanguages.includes('nodejs')).length,
      cpp: solvedProblems.filter((p) => p.solvedLanguages.includes('cpp')).length,
    }
  }, [solvedProblems])

  // Filtered list based on language filter & search query
  const filteredSolved = useMemo(() => {
    return solvedProblems.filter((problem) => {
      if (selectedLanguageFilter !== 'all' && !problem.solvedLanguages.includes(selectedLanguageFilter)) {
        return false
      }
      if (searchQuery) {
        const normalizedQuery = searchQuery.toLowerCase()
        return (
          problem.title.toLowerCase().includes(normalizedQuery) ||
          problem.beltName.toLowerCase().includes(normalizedQuery) ||
          problem.solvedLanguages.some((l) => LANGUAGE_LABELS[l].toLowerCase().includes(normalizedQuery))
        )
      }
      return true
    })
  }, [solvedProblems, selectedLanguageFilter, searchQuery])

  // Set default selected item
  useEffect(() => {
    if (!selectedProblemSlug && filteredSolved.length > 0) {
      setSelectedProblemSlug(filteredSolved[0].slug)
    } else if (selectedProblemSlug && !filteredSolved.some((problem) => problem.slug === selectedProblemSlug)) {
      setSelectedProblemSlug(filteredSolved[0]?.slug || null)
    }
  }, [filteredSolved, selectedProblemSlug])

  // Active problem
  const currentProblem = useMemo(() => {
    return filteredSolved.find((problem) => problem.slug === selectedProblemSlug) || filteredSolved[0] || null
  }, [filteredSolved, selectedProblemSlug])

  // Align active language with current problem when problem or filter changes
  useEffect(() => {
    if (!currentProblem) return
    if (selectedLanguageFilter !== 'all' && currentProblem.solvedLanguages.includes(selectedLanguageFilter)) {
      setActiveLanguage(selectedLanguageFilter)
    } else if (!currentProblem.solvedLanguages.includes(activeLanguage)) {
      setActiveLanguage(currentProblem.solvedLanguages[0] || 'python')
    }
  }, [currentProblem, selectedLanguageFilter])

  // Current active solution
  const currentSolution = useMemo(() => {
    if (!currentProblem) return null
    return currentProblem.solutions[activeLanguage] || null
  }, [currentProblem, activeLanguage])

  // Problem-specific submissions
  const problemSubmissions = useMemo(() => {
    if (!currentProblem) return []
    return submissions.filter((submissionItem) => submissionItem.problemSlug === currentProblem.slug)
  }, [submissions, currentProblem])

  const handleCopyCode = () => {
    if (currentSolution?.bestCode) {
      navigator.clipboard.writeText(currentSolution.bestCode)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
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
            You haven't solved any problems yet! Once you successfully pass all 10 test cases in a language's Practice Arena, your accepted solutions will be cataloged here for revision and re-attempts.
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
              {solvedProblems.length} Solved {solvedProblems.length === 1 ? 'Problem' : 'Problems'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Review your accepted solutions across Python, Java, Node.js, and C++, switch languages interactively, and re-attempt challenges.
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

      {/* Language Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedLanguageFilter('all')}
          className={cn(
            'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 interactive-tab flex-shrink-0',
            selectedLanguageFilter === 'all'
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
          )}
        >
          All Languages ({counts.all})
        </button>
        <button
          onClick={() => setSelectedLanguageFilter('python')}
          className={cn(
            'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 interactive-tab flex-shrink-0',
            selectedLanguageFilter === 'python'
              ? 'bg-[#387EB8] text-white shadow-sm'
              : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-[#EEF5FF]'
          )}
        >
          Python ({counts.python})
        </button>
        <button
          onClick={() => setSelectedLanguageFilter('java')}
          className={cn(
            'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 interactive-tab flex-shrink-0',
            selectedLanguageFilter === 'java'
              ? 'bg-[#EA2D2E] text-white shadow-sm'
              : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-[#FFF0ED]'
          )}
        >
          Java ({counts.java})
        </button>
        <button
          onClick={() => setSelectedLanguageFilter('nodejs')}
          className={cn(
            'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 interactive-tab flex-shrink-0',
            selectedLanguageFilter === 'nodejs'
              ? 'bg-[#539E43] text-white shadow-sm'
              : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-[#EDF8EE]'
          )}
        >
          Node.js ({counts.nodejs})
        </button>
        <button
          onClick={() => setSelectedLanguageFilter('cpp')}
          className={cn(
            'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 interactive-tab flex-shrink-0',
            selectedLanguageFilter === 'cpp'
              ? 'bg-[#00599C] text-white shadow-sm'
              : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-[#EEF5FC]'
          )}
        >
          C++ ({counts.cpp})
        </button>
      </div>

      {/* Main Dual-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Solved Problems Directory */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-neutral-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-neutral-900 text-sm">Solved Problems</div>
              <span className="text-xs text-neutral-400 font-medium">
                {filteredSolved.length} {filteredSolved.length === 1 ? 'item' : 'items'}
              </span>
            </div>
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
                No solved problems match your selected language or search filter.
              </div>
            ) : (
              filteredSolved.map((p) => {
                const isSelected = p.slug === currentProblem?.slug
                return (
                  <div
                    key={p.slug}
                    onClick={() => {
                      setSelectedProblemSlug(p.slug)
                      setActiveTab('code')
                    }}
                    className={cn(
                      'p-3.5 cursor-pointer transition-all duration-200 text-left space-y-2 interactive-tab',
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
                          'text-[10px] font-medium px-2 py-0.5 rounded',
                          isSelected
                            ? 'bg-neutral-800 text-neutral-400'
                            : 'bg-neutral-100 text-neutral-500'
                        )}
                      >
                        {p.difficulty}
                      </span>
                    </div>

                    <div className="font-semibold text-xs truncate">{p.title}</div>

                    {/* Language Badges for all solved languages */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      {p.solvedLanguages.map((lang) => (
                        <span
                          key={lang}
                          className={cn(
                            'text-[9px] font-bold px-1.5 py-0.5 rounded border',
                            isSelected
                              ? 'bg-neutral-800 text-white border-neutral-700'
                              : LANGUAGE_BADGE_STYLES[lang]
                          )}
                        >
                          {LANGUAGE_LABELS[lang]}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Column: Multi-Language Solution Viewer & Details */}
        {currentProblem && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col h-[700px]">
            {/* Header */}
            <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
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

                {/* Interactive Multi-Language Switcher */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-medium text-neutral-500 mr-1">Language:</span>
                  {ALL_LANGUAGES.map((lang) => {
                    const isSolved = currentProblem.solvedLanguages.includes(lang)
                    const isSelected = activeLanguage === lang
                    return (
                      <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={cn(
                          'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border',
                          isSelected
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : isSolved
                            ? 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            : 'bg-neutral-50 text-neutral-400 border-dashed border-neutral-200 hover:text-neutral-600'
                        )}
                        title={isSolved ? `Solved in ${LANGUAGE_LABELS[lang]}` : `Not solved yet in ${LANGUAGE_LABELS[lang]}`}
                      >
                        <span>{LANGUAGE_LABELS[lang]}</span>
                        {isSolved ? (
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              isSelected ? 'bg-emerald-400' : 'bg-emerald-500'
                            )}
                          />
                        ) : (
                          <span className="text-[9px] text-neutral-400">未</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                {currentSolution?.bestCode && (
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
                )}

                <button
                  onClick={() =>
                    navigate(`/practice/${activeLanguage}/${currentProblem.slug}`)
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all duration-200 interactive-btn shadow-red-600/20"
                >
                  <RotateCcw className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-45" />
                  <span>
                    {currentSolution?.bestCode
                      ? `Re-attempt in ${LANGUAGE_LABELS[activeLanguage]}`
                      : `Solve in ${LANGUAGE_LABELS[activeLanguage]}`}
                  </span>
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
                <span>
                  Solution ({LANGUAGE_LABELS[activeLanguage]})
                  {currentSolution?.bestCode && ' ✓'}
                </span>
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
                  {currentSolution?.bestCode ? (
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      language={MONACO_LANG_MAP[activeLanguage] || 'python'}
                      value={currentSolution.bestCode}
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
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 bg-neutral-900 text-white">
                      <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400">
                        <Code2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold">
                          No {LANGUAGE_LABELS[activeLanguage]} Solution Yet
                        </h3>
                        <p className="text-xs text-neutral-400 max-w-sm">
                          You haven't solved {currentProblem.title} in {LANGUAGE_LABELS[activeLanguage]} yet. Solve it in {LANGUAGE_LABELS[activeLanguage]} to earn XP and save your solution here.
                        </p>
                      </div>
                      <Link
                        to={`/practice/${activeLanguage}/${currentProblem.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all"
                      >
                        <span>Solve in {LANGUAGE_LABELS[activeLanguage]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
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
                      No submission log found for this problem yet.
                    </div>
                  ) : (
                    <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
                      <div className="bg-neutral-50 px-4 py-2.5 font-semibold text-neutral-600 grid grid-cols-12 gap-2">
                        <div className="col-span-4">Status</div>
                        <div className="col-span-3">Language</div>
                        <div className="col-span-3">Runtime</div>
                        <div className="col-span-2">Passed</div>
                      </div>
                      {problemSubmissions.map((sub) => {
                        const subLang = normalizeProgressLanguage(sub.language)
                        return (
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
                            <div className="col-span-3">
                              <span
                                className={cn(
                                  'text-[10px] font-bold px-2 py-0.5 rounded-full border',
                                  LANGUAGE_BADGE_STYLES[subLang] || 'bg-neutral-100 text-neutral-600 border-neutral-200'
                                )}
                              >
                                {LANGUAGE_LABELS[subLang] || sub.language}
                              </span>
                            </div>
                            <div className="col-span-3 text-neutral-500">
                              {sub.executionTimeMs} ms
                            </div>
                            <div className="col-span-2 font-semibold text-neutral-700">
                              {sub.passedTests} / {sub.totalTests}
                            </div>
                          </div>
                        )
                      })}
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
