import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { LanguageProblem } from '@/data/curriculum/index'
import { cn } from '@/lib/utils'

interface ProblemRowProps {
  problem: LanguageProblem
  isSolved: boolean
  isAttempted: boolean
  language: string
}

export const ProblemRow: React.FC<ProblemRowProps> = ({
  problem,
  isSolved,
  isAttempted,
  language,
}) => {
  const difficultyBadge =
    problem.difficulty === 'Easy'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : problem.difficulty === 'Medium'
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-red-50 text-red-700 border-red-200'

  const problemUrl = `/practice/${language}/${problem.slug}`

  return (
    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/90 transition-all duration-200 group hover:translate-x-1">
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        {/* Problem Index */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold bg-neutral-100 text-neutral-600 transition-transform duration-200 group-hover:scale-105">
          {problem.order}
        </div>

        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              to={problemUrl}
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
          to={problemUrl}
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
}
