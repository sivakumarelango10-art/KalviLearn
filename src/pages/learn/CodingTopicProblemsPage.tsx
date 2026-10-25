import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Code2,
} from 'lucide-react'
import { getLearnTopic, getLearnQuestionsByTopic } from '@/data/learn/coding'
import { getLearnQuestionStatus, subscribeLearnProgress } from '@/lib/learnProgress'
import { FormattedText } from '@/components/common/FormattedText'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

/**
 * CodingTopicProblemsPage
 * Displays all problem cards for a specific coding topic with real problem counts and in-topic search.
 */
export const CodingTopicProblemsPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>()
  const { user } = useAuth()

  const [searchQuery, setSearchQuery] = useState('')
  const [, setProgressTick] = useState(0)

  // Topic lookup
  const topic = useMemo(() => {
    return topicId ? getLearnTopic(topicId) : undefined
  }, [topicId])

  // Problems in this topic
  const problems = useMemo(() => {
    return topicId ? getLearnQuestionsByTopic(topicId) : []
  }, [topicId])

  // Subscribe to user progress
  useEffect(() => {
    const unsubscribe = subscribeLearnProgress(() => {
      setProgressTick((t) => t + 1)
    })
    return () => unsubscribe()
  }, [])

  // Filter problems by search query
  const filteredProblems = useMemo(() => {
    if (!searchQuery.trim()) return problems
    const q = searchQuery.toLowerCase().trim()
    return problems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.problemStatement.toLowerCase().includes(q)
    )
  }, [problems, searchQuery])

  // If topic is not found
  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400">
          <Code2 className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-neutral-900">Topic Not Found</h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          The requested coding topic could not be found. Please return to the coding topics overview.
        </p>
        <Link
          to="/learn/coding"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Coding Topics</span>
        </Link>
      </div>
    )
  }

  const TopicIcon = topic.icon

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
        <Link
          to="/learn"
          className="hover:text-neutral-900 transition-colors font-medium"
        >
          Learn
        </Link>
        <span>/</span>
        <Link
          to="/learn/coding"
          className="hover:text-neutral-900 transition-colors font-medium"
        >
          Coding
        </Link>
        <span>/</span>
        <span className="font-semibold text-neutral-900">{topic.title}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="p-2.5 rounded-xl bg-neutral-900 text-white shadow-sm">
              <TopicIcon className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {topic.title}
            </h1>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/60">
              {problems.length} {problems.length === 1 ? 'Problem' : 'Problems'}
            </span>
          </div>
          <FormattedText
            as="p"
            text={topic.description}
            className="text-xs sm:text-sm text-neutral-600 leading-relaxed"
          />
        </div>

        {/* Search problems */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems in this topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Back button link and status summary */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link
          to="/learn/coding"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all Coding Topics</span>
        </Link>
        {searchQuery.trim() && (
          <span className="text-xs text-neutral-500 font-medium">
            Showing {filteredProblems.length} of {problems.length} problems
          </span>
        )}
      </div>

      {/* Problems List */}
      {filteredProblems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProblems.map((problem, index) => {
            const status = getLearnQuestionStatus(problem.slug, user?.id)
            const isSolved = status === 'SOLVED'
            const isAttempted = status === 'ATTEMPTED'

            return (
              <div
                key={problem.id}
                className={cn(
                  'group bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between',
                  isSolved && 'border-emerald-200/80 bg-emerald-50/10'
                )}
              >
                <div className="space-y-2.5">
                  {/* Status badge, Numbering & Title */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span className="text-xs font-semibold text-neutral-400 font-mono shrink-0">
                        #{problem.order || index + 1}
                      </span>
                      <Link
                        to={`/learn/coding/${topic.id}/${problem.slug}`}
                        className="text-base font-bold text-neutral-900 group-hover:text-neutral-950 transition-colors hover:underline truncate"
                      >
                        {problem.title}
                      </Link>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {problem.difficulty && (
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border',
                            problem.difficulty === 'Easy'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : problem.difficulty === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          )}
                        >
                          {problem.difficulty}
                        </span>
                      )}
                      {isSolved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : isAttempted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Attempted</span>
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Problem preview */}
                  <FormattedText
                    as="p"
                    text={problem.problemStatement}
                    className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2"
                  />
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/learn/coding/${topic.id}/${problem.slug}`}
                    className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/learn/coding/${topic.id}/${problem.slug}/solve`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-[#ED2A2B] text-white text-xs font-semibold shadow-sm transition-all group-hover:translate-x-0.5"
                  >
                    <span>Solve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-base font-semibold text-neutral-900">No matching problems found</h2>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search query or clear the filter to view all problems in this topic.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  )
}

export default CodingTopicProblemsPage
