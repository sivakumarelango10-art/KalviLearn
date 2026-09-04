import React, { useState, useMemo, useEffect } from 'react'
import {
  Users,
  Search,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  MentorStudent,
  fetchMentorRoster,
  subscribeToMentorUpdates,
} from '@/lib/mentorService'

export const MentorStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<MentorStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [beltFilter, setBeltFilter] = useState<'all' | 'Belt 1' | 'Belt 2' | 'Belt 3' | 'attention'>('all')
  const [sortBy, setSortBy] = useState<'progress' | 'streak' | 'name'>('progress')

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const data = await fetchMentorRoster()
        if (isMounted) {
          setStudents(data)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error loading students:', err)
        if (isMounted) setIsLoading(false)
      }
    }

    loadData()

    const unsubscribe = subscribeToMentorUpdates(() => {
      loadData()
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const attentionCount = students.filter((s) => s.needsAttention).length

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.language.toLowerCase().includes(search.toLowerCase())

      if (!matchesSearch) return false

      if (beltFilter === 'all') return true
      if (beltFilter === 'attention') return s.needsAttention
      return s.belt === beltFilter
    }).sort((a, b) => {
      if (sortBy === 'progress') return b.progressPercent - a.progressPercent
      if (sortBy === 'streak') return b.streak - a.streak
      return a.name.localeCompare(b.name)
    })
  }, [students, search, beltFilter, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-page-enter">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100">
              <Users className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Scholar Directory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Manage your registered scholars, track individual belt mastery, and pinpoint students needing guidance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700">
            Cohort 2026 • {isLoading ? '...' : `${students.length} Assigned`}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name, email, or language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Belt Filters */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {(['all', 'Belt 3', 'Belt 2', 'Belt 1', 'attention'] as const).map((filter) => {
              const count =
                filter === 'all'
                  ? students.length
                  : filter === 'attention'
                  ? attentionCount
                  : students.filter((s) => s.belt === filter).length

              return (
                <button
                  key={filter}
                  onClick={() => setBeltFilter(filter)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all interactive-tab',
                    beltFilter === filter
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  )}
                >
                  {filter === 'all'
                    ? `All (${count})`
                    : filter === 'attention'
                    ? `Attention (${count})`
                    : `${filter} (${count})`}
                </button>
              )
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
            <span className="text-[11px] text-neutral-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'progress' | 'streak' | 'name')}
              className="text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="progress">Highest Progress</option>
              <option value="streak">Longest Streak</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Student Cards */}
      {isLoading ? (
        <div className="py-16 text-center text-neutral-500">
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#ED2A2B]" />
            <span className="text-xs font-medium">Loading registered scholars...</span>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-neutral-400 bg-white rounded-2xl border border-neutral-200">
          No scholars found matching the selected filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((student) => {
            const initials = student.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()

            return (
              <div
                key={student.id}
                className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4 hover:border-neutral-300 transition-all interactive-card"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm">{student.name}</h3>
                      <p className="text-[11px] text-neutral-400 font-mono truncate max-w-[150px]">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-2xs"
                    style={{ backgroundColor: student.beltColor }}
                  >
                    {student.belt}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                    <span>Progress</span>
                    <span className="font-bold text-neutral-900">{student.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${student.progressPercent}%`,
                        backgroundColor: student.beltColor,
                      }}
                    />
                  </div>
                </div>

                {/* Meta Details */}
                <div className="pt-2 border-t border-neutral-100 grid grid-cols-3 text-center text-xs">
                  <div>
                    <span className="block font-bold text-neutral-900">{student.solvedCount}</span>
                    <span className="text-[10px] text-neutral-400">Solved</span>
                  </div>
                  <div>
                    <span className="block font-bold text-amber-500">{student.streak}d</span>
                    <span className="text-[10px] text-neutral-400">Streak</span>
                  </div>
                  <div>
                    <span className="block font-bold text-neutral-700 uppercase">{student.language}</span>
                    <span className="text-[10px] text-neutral-400">Language</span>
                  </div>
                </div>

                {/* Status Badge & Action */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-neutral-400">
                    Active: {student.lastActive}
                  </span>
                  {student.needsAttention && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Attention
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MentorStudentsPage
