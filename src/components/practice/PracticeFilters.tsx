import React from 'react'
import { Search } from 'lucide-react'

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
  const [localSearch, setLocalSearch] = React.useState(searchQuery)

  React.useEffect(() => {
    setLocalSearch(searchQuery)
  }, [searchQuery])

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== searchQuery) {
        onSearchChange(localSearch)
      }
    }, 150)
    return () => clearTimeout(handler)
  }, [localSearch, searchQuery, onSearchChange])

  return (
    <div className="bg-white rounded-xl p-4 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search */}
      <div className="relative w-full md:w-80">
        <label htmlFor="practice-problem-search" className="sr-only">
          Search problems
        </label>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          id="practice-problem-search"
          type="search"
          placeholder={`Search ${languageName} problems...`}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        {/* Belt selector */}
        <select
          value={selectedBelt === 'all' ? 'all' : String(selectedBelt)}
          onChange={(e) => onSelectBelt(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
          className="text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
        >
          <option value="all">All Belts (10 Belts)</option>
          <option value="1">Belt 1 (Yellow Belt)</option>
          <option value="2">Belt 2 (Orange Belt)</option>
          <option value="3">Belt 3 (Green Belt)</option>
          <option value="4">Belt 4 (Purple Belt)</option>
          <option value="5">Belt 5 (Blue Belt)</option>
          <option value="6">Belt 6 (Brown Belt)</option>
          <option value="7">Belt 7 (Sr. Brown Belt)</option>
          <option value="8">Belt 8 (Red Belt)</option>
          <option value="9">Belt 9 (Sr. Red Belt)</option>
          <option value="10">Belt 10 (Black Belt)</option>
        </select>

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
