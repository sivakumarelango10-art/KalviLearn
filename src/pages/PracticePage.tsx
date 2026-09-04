import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import problemsData from '@/data/problems.json'
import { getUserState, subscribeProgress } from '@/lib/progress'
import { cn } from '@/lib/utils'

export const PracticePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBelt, setSelectedBelt] = useState<number | 'all'>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'solved' | 'unsolved'>('all')
  const [collapsedBelts, setCollapsedBelts] = useState<Record<number, boolean>>({})

  const [solvedSlugs, setSolvedSlugs] = useState<string[]>([])
  const [attemptedSlugs, setAttemptedSlugs] = useState<string[]>([])

  useEffect(() => {
    const updateProgress = () => {
      const state = getUserState()
      setSolvedSlugs(state.solvedSlugs || [])
      const attempted = Object.keys(state.progress || {}).filter(
        (slug) => state.progress[slug].status === 'ATTEMPTED' && !state.solvedSlugs.includes(slug)
      )
      setAttemptedSlugs(attempted)
    }

    updateProgress()
    return subscribeProgress(updateProgress)
  }, [])

  // Calculate belt completion statistics
  const beltStats = useMemo(() => {
    return problemsData.map((belt) => {
      const total = belt.problems.length
      const solved = belt.problems.filter((p: { slug: string }) => solvedSlugs.includes(p.slug)).length
      const percentage = total > 0 ? Math.round((solved / total) * 100) : 0
      return {
        order: belt.order,
        name: belt.name,
        title: belt.title,
        color: belt.color,
        total,
        solved,
        percentage,
      }
    })
  }, [solvedSlugs])

  const totalProblemsCount = 85
  const totalSolvedCount = solvedSlugs.length
  const totalPercentage = Math.round((totalSolvedCount / totalProblemsCount) * 100)

  const toggleBeltCollapse = (order: number) => {
    setCollapsedBelts((prev) => ({ ...prev, [order]: !prev[order] }))
  }

  // Filtered Belts and Problems
  const filteredBelts = useMemo(() => {
    return problemsData
      .filter((belt) => selectedBelt === 'all' || belt.order === selectedBelt)
      .map((belt) => {
        const filteredProblems = belt.problems.filter((problem: { title: string; description: string; difficulty: string; slug: string }) => {
          // Search query
          if (
            searchQuery &&
            !problem.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !problem.description.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return false
          }

          // Difficulty filter
          if (selectedDifficulty !== 'all' && problem.difficulty !== selectedDifficulty) {
            return false
          }

          // Status filter
          const isSolved = solvedSlugs.includes(problem.slug)
          if (selectedStatus === 'solved' && !isSolved) return false
          if (selectedStatus === 'unsolved' && isSolved) return false

          return true
        })

        return {
          ...belt,
          problems: filteredProblems,
        }
      })
  }, [searchQuery, selectedBelt, selectedDifficulty, selectedStatus, solvedSlugs])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>85 Belt Mastery Problems</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Practice Arena</h1>
            <p className="text-sm sm:text-base text-neutral-300">
              Solve progressively challenging problems across three mastery belts. Each problem includes 10 test cases (3 visible + 7 hidden), multi-language starter code, and strict anti-cheat verification.
            </p>
          </div>

          {/* Overall Progress Gauge */}
          <div className="bg-neutral-800/80 backdrop-blur border border-neutral-700/60 rounded-xl p-4 sm:p-5 flex items-center gap-5 flex-shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-neutral-700"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#ED2A2B"
                  strokeWidth="6"
                  strokeDasharray={163.36}
                  strokeDashoffset={163.36 - (163.36 * totalPercentage) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute text-xs font-bold">{totalPercentage}%</span>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Total Solved</div>
              <div className="text-xl font-bold text-white">
                {totalSolvedCount} <span className="text-sm font-normal text-neutral-400">/ {totalProblemsCount}</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                {totalProblemsCount - totalSolvedCount} remaining
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Belt Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {beltStats.map((b) => {
          const isSelected = selectedBelt === b.order
          return (
            <div
              key={b.order}
              onClick={() => setSelectedBelt(isSelected ? 'all' : b.order)}
              className={cn(
                'cursor-pointer rounded-xl p-5 border transition-all duration-200 bg-white hover:shadow-md relative overflow-hidden',
                isSelected
                  ? 'border-neutral-900 ring-2 ring-neutral-900 shadow-sm'
                  : 'border-neutral-200/80 hover:border-neutral-300'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: b.color }}
                  />
                  <span className="font-bold text-neutral-900 text-sm">{b.name}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                  {b.solved} / {b.total} Solved
                </span>
              </div>
              <div className="text-xs text-neutral-500 font-medium line-clamp-1 mb-3">
                {b.title}
              </div>
              {/* Progress bar */}
              <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${b.percentage}%`,
                    backgroundColor: b.color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search problems by name or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Belt pills */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold text-neutral-600">
            <button
              onClick={() => setSelectedBelt('all')}
              className={cn(
                'px-2.5 py-1 rounded-md transition-all duration-200 interactive-tab',
                selectedBelt === 'all' ? 'bg-white text-neutral-900 shadow-sm scale-105' : 'text-neutral-600 hover:text-neutral-900'
              )}
            >
              All Belts
            </button>
            <button
              onClick={() => setSelectedBelt(1)}
              className={cn(
                'px-2.5 py-1 rounded-md transition-all duration-200 interactive-tab',
                selectedBelt === 1 ? 'bg-white text-neutral-900 shadow-sm scale-105' : 'text-neutral-600 hover:text-neutral-900'
              )}
            >
              Belt 1
            </button>
            <button
              onClick={() => setSelectedBelt(2)}
              className={cn(
                'px-2.5 py-1 rounded-md transition-all duration-200 interactive-tab',
                selectedBelt === 2 ? 'bg-white text-neutral-900 shadow-sm scale-105' : 'text-neutral-600 hover:text-neutral-900'
              )}
            >
              Belt 2
            </button>
            <button
              onClick={() => setSelectedBelt(3)}
              className={cn(
                'px-2.5 py-1 rounded-md transition-all duration-200 interactive-tab',
                selectedBelt === 3 ? 'bg-white text-neutral-900 shadow-sm scale-105' : 'text-neutral-600 hover:text-neutral-900'
              )}
            >
              Belt 3
            </button>
          </div>

          {/* Difficulty selector */}
          <select
            value={selectedDifficulty}
            onChange={(e: any) => setSelectedDifficulty(e.target.value)}
            className="text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status selector */}
          <select
            value={selectedStatus}
            onChange={(e: any) => setSelectedStatus(e.target.value)}
            className="text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          >
            <option value="all">All Statuses</option>
            <option value="solved">Solved Only</option>
            <option value="unsolved">Unsolved Only</option>
          </select>
        </div>
      </div>

      {/* Problem Belts Listing */}
      <div className="space-y-6">
        {filteredBelts.map((belt) => {
          const isCollapsed = !!collapsedBelts[belt.order]
          const solvedInBelt = belt.problems.filter((p: any) => solvedSlugs.includes(p.slug)).length

          return (
            <div
              key={belt.order}
              className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden"
            >
              {/* Belt Group Header */}
              <div
                onClick={() => toggleBeltCollapse(belt.order)}
                className="p-5 sm:p-6 bg-gradient-to-r from-neutral-50 to-white border-b border-neutral-200 flex items-center justify-between cursor-pointer hover:bg-neutral-100/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
                    style={{ backgroundColor: belt.color }}
                  >
                    B{belt.order}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-neutral-900">{belt.name}</h2>
                      <span className="text-xs font-medium text-neutral-500">• {belt.title}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{belt.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-700">
                    {solvedInBelt} / {belt.problems.length} Solved
                  </span>
                  <button
                    className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
                    aria-label="Toggle section"
                  >
                    {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Problems Table / List */}
              {!isCollapsed && (
                <div className="divide-y divide-neutral-100">
                  {belt.problems.length === 0 ? (
                    <div className="p-8 text-center text-sm text-neutral-500">
                      No problems match your current search and filter criteria in this belt.
                    </div>
                  ) : (
                    belt.problems.map((problem: any) => {
                      const isSolved = solvedSlugs.includes(problem.slug)
                      const isAttempted = attemptedSlugs.includes(problem.slug)

                      const difficultyBadge =
                        problem.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : problem.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200'

                      return (
                        <div
                          key={problem.slug}
                          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/90 transition-all duration-200 group hover:translate-x-1"
                        >
                          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                            {/* Problem Index & Status Indicator */}
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold bg-neutral-100 text-neutral-600 transition-transform duration-200 group-hover:scale-105">
                              {problem.order}
                            </div>

                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <Link
                                  to={`/practice/${problem.slug}`}
                                  className="font-semibold text-neutral-900 hover:text-[#ED2A2B] transition-colors text-sm sm:text-base truncate"
                                >
                                  {problem.title}
                                </Link>

                                <span
                                  className={cn(
                                    'text-[11px] font-medium px-2 py-0.5 rounded-full border transition-all duration-200',
                                    difficultyBadge
                                  )}
                                >
                                  {problem.difficulty}
                                </span>

                                {isSolved && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 animate-in zoom-in-75 duration-200">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Solved
                                  </span>
                                )}

                                {!isSolved && isAttempted && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 animate-in zoom-in-75 duration-200">
                                    <Clock className="w-3 h-3 text-amber-600" />
                                    Attempted
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-neutral-500 line-clamp-1 max-w-xl">
                                {problem.description}
                              </p>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                            <span className="text-[11px] text-neutral-400 hidden lg:inline">
                              10 Test Cases • 50 XP
                            </span>
                            <Link
                              to={`/practice/${problem.slug}`}
                              className={cn(
                                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 interactive-btn',
                                isSolved
                                  ? 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                                  : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:shadow-md'
                              )}
                            >
                              <span>{isSolved ? 'Solve Again' : 'Solve'}</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
