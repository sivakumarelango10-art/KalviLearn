import React, { useState } from 'react'
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react'
import problemsData from '@/data/problems.json'

export const MentorCurriculumPage: React.FC = () => {
  const [expandedBelt, setExpandedBelt] = useState<number | null>(1)

  const beltMetrics = [
    {
      order: 1,
      name: 'Belt 1',
      title: 'Programming Foundations',
      color: '#3B82F6',
      totalProblems: 20,
      cohortCompleted: 108,
      avgPassRate: 92.4,
      bottleneck: 'Nested Loop Patterns (Hidden edge cases)',
    },
    {
      order: 2,
      name: 'Belt 2',
      title: 'Intermediate Data Structures & Logic',
      color: '#10B981',
      totalProblems: 30,
      cohortCompleted: 62,
      avgPassRate: 78.1,
      bottleneck: 'Two-Pointer & Sliding Window Bounds',
    },
    {
      order: 3,
      name: 'Belt 3',
      title: 'Advanced Algorithmic Patterns',
      color: '#EF4444',
      totalProblems: 35,
      cohortCompleted: 24,
      avgPassRate: 64.8,
      bottleneck: 'Dynamic Programming & State Transitions',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-page-enter">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100">
              <BookOpen className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Curriculum Mastery & Belts
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Cohort progression through 85 standardized problems across Belt 1, Belt 2, and Belt 3.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700">
            85 Benchmark Problems
          </span>
        </div>
      </div>

      {/* Belt Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {beltMetrics.map((belt) => (
          <div
            key={belt.order}
            className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 interactive-card"
          >
            <div className="flex items-center justify-between">
              <span
                className="px-3 py-1 rounded-lg text-xs font-bold text-white shadow-2xs"
                style={{ backgroundColor: belt.color }}
              >
                {belt.name}
              </span>
              <span className="text-xs font-bold text-neutral-500">
                {belt.totalProblems} Problems
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-neutral-900">{belt.title}</h3>
              <p className="text-xs text-neutral-500 mt-1">
                {belt.cohortCompleted} / 128 Scholars cleared this milestone
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                <span>Pass Rate</span>
                <span className="font-bold text-neutral-900">{belt.avgPassRate}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${belt.avgPassRate}%`, backgroundColor: belt.color }}
                />
              </div>
            </div>

            <div className="pt-2 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Key Bottleneck:</strong> {belt.bottleneck}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Problem Breakdown Accordion */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden divide-y divide-neutral-100">
        <div className="p-6">
          <h2 className="text-lg font-bold text-neutral-900">
            Problem Catalog & Cohort Mastery
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Click any belt to inspect individual challenges, difficulty ratings, and pass criteria.
          </p>
        </div>

        {problemsData.map((belt) => {
          const isExpanded = expandedBelt === belt.order

          return (
            <div key={belt.order} className="select-none">
              <button
                type="button"
                onClick={() => setExpandedBelt(isExpanded ? null : belt.order)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: belt.color }}
                  />
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">
                      {belt.name} — {belt.title}
                    </h3>
                    <p className="text-xs text-neutral-500">{belt.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-400">
                    {belt.problems.length} problems
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 bg-neutral-50/50">
                  {belt.problems.map((p) => (
                    <div
                      key={p.slug}
                      className="p-3 bg-white rounded-xl border border-neutral-200/80 space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-neutral-400">
                          #{p.order}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                          {p.difficulty}
                        </span>
                      </div>
                      <p className="font-bold text-xs text-neutral-900 truncate">
                        {p.title}
                      </p>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        10 Test Cases (3 Visible, 7 Hidden)
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MentorCurriculumPage
