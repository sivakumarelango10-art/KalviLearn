import React from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PracticeFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedBelt: number | 'all'
  onSelectBelt: (belt: number | 'all') => void
  selectedDifficulty: 'all' | 'Easy' | 'Medium' | 'Hard'
  onSelectDifficulty: (difficulty: 'all' | 'Easy' | 'Medium' | 'Hard') => void
  selectedStatus: 'all' | 'solved' | 'unsolved'
  onSelectStatus: (status: 'all' | 'solved' | 'unsolved') => void
  languageName: string
}

export const PracticeFilters: React.FC<PracticeFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedBelt,
  onSelectBelt,
  selectedDifficulty,
  onSelectDifficulty,
  selectedStatus,
  onSelectStatus,
  languageName,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder={`Search ${languageName} problems...`}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        {/* Belt pills */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold text-neutral-600">
          <button
            onClick={() => onSelectBelt('all')}
            className={cn(
              'px-2.5 py-1 rounded-md transition-all duration-200 interactive-tab',
              selectedBelt === 'all'
                ? 'bg-white text-neutral-900 shadow-sm scale-105'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            All Belts
          </button>
          <button
            onClick={() => onSelectBelt(1)}
            className={cn(
              'px-2.5 py-1 rounded-md transition-all duration-200 interactive-tab',
              selectedBelt === 1
                ? 'bg-white text-neutral-900 shadow-sm scale-105'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            Belt 1
          </button>
          <button
            onClick={() => onSelectBelt(2)}
            className={cn(
              'px-2.5 py-1 rounded-md transition-all duration-200 interactive-tab',
              selectedBelt === 2
                ? 'bg-white text-neutral-900 shadow-sm scale-105'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            Belt 2
          </button>
          <button
            onClick={() => onSelectBelt(3)}
            className={cn(
              'px-2.5 py-1 rounded-md transition-all duration-200 interactive-tab',
              selectedBelt === 3
                ? 'bg-white text-neutral-900 shadow-sm scale-105'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            Belt 3
          </button>
        </div>

        {/* Difficulty selector */}
        <select
          value={selectedDifficulty}
          onChange={(e: any) => onSelectDifficulty(e.target.value)}
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
          onChange={(e: any) => onSelectStatus(e.target.value)}
          className="text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-900"
        >
          <option value="all">All Statuses</option>
          <option value="solved">Solved Only</option>
          <option value="unsolved">Unsolved Only</option>
        </select>
      </div>
    </div>
  )
}
