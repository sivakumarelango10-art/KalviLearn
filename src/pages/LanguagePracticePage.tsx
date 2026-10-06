import React, { useState, useMemo, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Search, RotateCcw } from 'lucide-react'
import {
  getCurriculum,
  isValidLanguage,
  normalizeLanguageSlug,
  ProgrammingLanguage,
} from '@/data/curriculum/index'
import {
  getLanguageProgress,
  isProblemAttemptedInLanguage,
  subscribeProgress,
} from '@/lib/progress'
import { LanguageHeader } from '@/components/practice/LanguageHeader'
import { BeltCard } from '@/components/practice/BeltCard'
import { PracticeFilters } from '@/components/practice/PracticeFilters'
import { ProblemRow } from '@/components/practice/ProblemRow'

export const LanguagePracticePage: React.FC = () => {
  const { lang } = useParams<{ lang: string }>()

  // Validate language param - if it's a legacy problem slug, redirect cleanly
  if (!isValidLanguage(lang)) {
    const preferredLang = normalizeLanguageSlug(localStorage.getItem('kalvi_preferred_language'))
    if (lang && (lang.includes('belt') || lang.includes('-'))) {
      return <Navigate to={`/practice/${preferredLang}/${lang}`} replace />
    }
    return <Navigate to="/practice" replace />
  }

  const currentLang = normalizeLanguageSlug(lang) as ProgrammingLanguage
  const curriculum = useMemo(() => getCurriculum(currentLang), [currentLang])

  // Filters and state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBelt, setSelectedBelt] = useState<number | 'all'>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'solved' | 'unsolved'>('all')
  const [collapsedBelts, setCollapsedBelts] = useState<Record<number, boolean>>({})

  // Progress state
  const [solvedSlugs, setSolvedSlugs] = useState<string[]>([])
  const [languageXp, setLanguageXp] = useState<number>(0)

  const totalCurriculumProblems = useMemo(() => {
    return curriculum.belts.reduce((sum, b) => sum + b.problems.length, 0)
  }, [curriculum])

  useEffect(() => {
    const updateProgress = () => {
      const prog = getLanguageProgress(currentLang, totalCurriculumProblems)
      setSolvedSlugs(prog.solvedSlugs)
      setLanguageXp(prog.xp)
    }

    updateProgress()
    // Remember student's active language
    localStorage.setItem('kalvi_preferred_language', currentLang)

    return subscribeProgress(updateProgress)
  }, [currentLang, totalCurriculumProblems])

  // Belt Statistics
  const beltStats = useMemo(() => {
    return curriculum.belts.map((belt) => {
      const total = belt.problems.length
      const solved = belt.problems.filter((p) => solvedSlugs.includes(p.slug)).length
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
  }, [curriculum, solvedSlugs])

  const totalProblemsCount = totalCurriculumProblems
  const totalSolvedCount = solvedSlugs.length
  const totalPercentage = totalProblemsCount > 0 ? Math.round((totalSolvedCount / totalProblemsCount) * 100) : 0

  const toggleBeltCollapse = (order: number) => {
    setCollapsedBelts((prev) => ({ ...prev, [order]: !prev[order] }))
  }

  // Filtered Belts and Problems
  const filteredBelts = useMemo(() => {
    return curriculum.belts
      .filter((belt) => selectedBelt === 'all' || belt.order === selectedBelt)
      .map((belt) => {
        const filteredProblems = belt.problems.filter((problem) => {
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
  }, [curriculum, searchQuery, selectedBelt, selectedDifficulty, selectedStatus, solvedSlugs])

  // Count total matching problems across all belts
  const totalFilteredProblems = useMemo(() => {
    return filteredBelts.reduce((sum, b) => sum + b.problems.length, 0)
  }, [filteredBelts])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedBelt('all')
    setSelectedDifficulty('all')
    setSelectedStatus('all')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 bg-white">
      {/* Language Header with brand badge, back button, and progress gauge */}
      <LanguageHeader
        curriculum={curriculum}
        solvedCount={totalSolvedCount}
        totalCount={totalProblemsCount}
        percentage={totalPercentage}
        xp={languageXp}
      />

      {/* Belt Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        {beltStats.map((b) => {
          const isSelected = selectedBelt === b.order
          return (
            <BeltCard
              key={b.order}
              order={b.order}
              name={b.name}
              title={b.title}
              color={b.color}
              solved={b.solved}
              total={b.total}
              percentage={b.percentage}
              isSelected={isSelected}
              onClick={() => setSelectedBelt(isSelected ? 'all' : b.order)}
            />
          )
        })}
      </div>

      {/* Filters and Search Bar */}
      <PracticeFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBelt={selectedBelt}
        onSelectBelt={setSelectedBelt}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        languageName={curriculum.name}
      />

      {/* Problem Belts Directory */}
      <div className="space-y-6">
        {totalFilteredProblems === 0 ? (
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200/90 p-10 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-neutral-200/60 flex items-center justify-center mx-auto text-neutral-500">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neutral-800">No Problems Found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                {searchQuery
                  ? `No problems match "${searchQuery}" under the current filter selections.`
                  : 'No problems match the selected difficulty and status filters.'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-sm transition-all interactive-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          filteredBelts.map((belt) => {
            const isCollapsed = !!collapsedBelts[belt.order]
            const solvedInBelt = belt.problems.filter((p) => solvedSlugs.includes(p.slug)).length

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
                    belt.problems.map((problem) => {
                      const isSolved = solvedSlugs.includes(problem.slug)
                      const isAttempted = isProblemAttemptedInLanguage(problem.slug, currentLang)

                      return (
                        <ProblemRow
                          key={problem.slug}
                          problem={problem}
                          isSolved={isSolved}
                          isAttempted={isAttempted}
                          language={currentLang}
                        />
                      )
                    })
                  )}
                </div>
              )}
            </div>
          )
        }))}
      </div>
    </div>
  )
}
