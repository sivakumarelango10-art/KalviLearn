import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Code2 } from 'lucide-react'
import { searchLearnTopics } from '@/data/learn/coding'
import { CodingTopicCard } from '@/components/learn/CodingTopicCard'

/**
 * CodingTopicsPage
 * Displays all 24 Coding Topics.
 * STRICT RULE: No question counts or problem quantities are displayed anywhere.
 */
export const CodingTopicsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTopics = useMemo(() => {
    return searchLearnTopics(searchQuery)
  }, [searchQuery])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500">
        <Link
          to="/learn"
          className="hover:text-neutral-900 transition-colors flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Learn</span>
        </Link>
        <span>/</span>
        <span className="font-semibold text-neutral-900">Coding</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-neutral-900 text-white shadow-sm">
              <Code2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Coding Topics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Practice programming, problem solving, data structures, algorithms, and object-oriented programming topic by topic.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coding topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => (
            <CodingTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-base font-semibold text-neutral-900">No matching topics found</h2>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search query or clear the filter to view all coding topics.
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

export default CodingTopicsPage
