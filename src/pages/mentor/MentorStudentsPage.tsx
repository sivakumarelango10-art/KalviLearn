import React, { useState, useMemo } from 'react'
import {
  Users,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StudentRecord {
  id: string
  name: string
  email: string
  belt: 'Belt 1' | 'Belt 2' | 'Belt 3'
  beltColor: string
  progressPercent: number
  solvedCount: number
  streak: number
  language: string
  lastActive: string
  status: 'ACTIVE' | 'ATTENTION'
  joinedDate: string
}

const SCHOLAR_DIRECTORY: StudentRecord[] = [
  {
    id: 's-1',
    name: 'Arun',
    email: 'arun.k@kalvium.community',
    belt: 'Belt 3',
    beltColor: '#EF4444',
    progressPercent: 72,
    solvedCount: 61,
    streak: 8,
    language: 'Python',
    lastActive: '2 hours ago',
    status: 'ACTIVE',
    joinedDate: 'Jan 2026',
  },
  {
    id: 's-2',
    name: 'Priya',
    email: 'priya.s@kalvium.community',
    belt: 'Belt 2',
    beltColor: '#10B981',
    progressPercent: 51,
    solvedCount: 43,
    streak: 5,
    language: 'Java',
    lastActive: '5 hours ago',
    status: 'ACTIVE',
    joinedDate: 'Jan 2026',
  },
  {
    id: 's-3',
    name: 'Karthik',
    email: 'karthik.m@kalvium.community',
    belt: 'Belt 1',
    beltColor: '#3B82F6',
    progressPercent: 24,
    solvedCount: 20,
    streak: 2,
    language: 'C++',
    lastActive: '1 day ago',
    status: 'ACTIVE',
    joinedDate: 'Feb 2026',
  },
  {
    id: 's-4',
    name: 'Kavya Ramesh',
    email: 'kavya.ramesh.s.121@kalvium.community',
    belt: 'Belt 2',
    beltColor: '#10B981',
    progressPercent: 65,
    solvedCount: 55,
    streak: 12,
    language: 'Python',
    lastActive: 'Just now',
    status: 'ACTIVE',
    joinedDate: 'Jan 2026',
  },
  {
    id: 's-5',
    name: 'Prajith P S',
    email: 'prajith.p.s.121@kalvium.community',
    belt: 'Belt 3',
    beltColor: '#EF4444',
    progressPercent: 88,
    solvedCount: 75,
    streak: 15,
    language: 'Python',
    lastActive: '30 mins ago',
    status: 'ACTIVE',
    joinedDate: 'Jan 2026',
  },
  {
    id: 's-6',
    name: 'Ananya Sharma',
    email: 'ananya.s@kalvium.community',
    belt: 'Belt 1',
    beltColor: '#3B82F6',
    progressPercent: 18,
    solvedCount: 15,
    streak: 0,
    language: 'Node.js',
    lastActive: '4 days ago',
    status: 'ATTENTION',
    joinedDate: 'Feb 2026',
  },
  {
    id: 's-7',
    name: 'Rohan Verma',
    email: 'rohan.v@kalvium.community',
    belt: 'Belt 2',
    beltColor: '#10B981',
    progressPercent: 44,
    solvedCount: 37,
    streak: 3,
    language: 'Python',
    lastActive: '1 day ago',
    status: 'ACTIVE',
    joinedDate: 'Jan 2026',
  },
  {
    id: 's-8',
    name: 'Sneha Patel',
    email: 'sneha.p@kalvium.community',
    belt: 'Belt 3',
    beltColor: '#EF4444',
    progressPercent: 91,
    solvedCount: 77,
    streak: 19,
    language: 'Java',
    lastActive: '1 hour ago',
    status: 'ACTIVE',
    joinedDate: 'Jan 2026',
  },
  {
    id: 's-9',
    name: 'Vikas Reddy',
    email: 'vikas.r@kalvium.community',
    belt: 'Belt 1',
    beltColor: '#3B82F6',
    progressPercent: 12,
    solvedCount: 10,
    streak: 0,
    language: 'C++',
    lastActive: '5 days ago',
    status: 'ATTENTION',
    joinedDate: 'Feb 2026',
  },
  {
    id: 's-10',
    name: 'Meera Nair',
    email: 'meera.n@kalvium.community',
    belt: 'Belt 2',
    beltColor: '#10B981',
    progressPercent: 58,
    solvedCount: 49,
    streak: 6,
    language: 'Python',
    lastActive: '3 hours ago',
    status: 'ACTIVE',
    joinedDate: 'Jan 2026',
  },
]

export const MentorStudentsPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [beltFilter, setBeltFilter] = useState<'all' | 'Belt 1' | 'Belt 2' | 'Belt 3' | 'attention'>('all')
  const [sortBy, setSortBy] = useState<'progress' | 'streak' | 'name'>('progress')

  const filtered = useMemo(() => {
    return SCHOLAR_DIRECTORY.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())

      if (!matchesSearch) return false

      if (beltFilter === 'all') return true
      if (beltFilter === 'attention') return s.status === 'ATTENTION'
      return s.belt === beltFilter
    }).sort((a, b) => {
      if (sortBy === 'progress') return b.progressPercent - a.progressPercent
      if (sortBy === 'streak') return b.streak - a.streak
      return a.name.localeCompare(b.name)
    })
  }, [search, beltFilter, sortBy])

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
            Manage your assigned 128 scholars, track individual belt mastery, and pinpoint students needing guidance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700">
            Cohort 2026 • 128 Assigned
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
            {(['all', 'Belt 3', 'Belt 2', 'Belt 1', 'attention'] as const).map((filter) => (
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
                  ? 'All'
                  : filter === 'attention'
                  ? 'Attention (12)'
                  : filter}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
            <span className="text-[11px] text-neutral-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
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
                  <span className="block font-bold text-neutral-700">{student.language}</span>
                  <span className="text-[10px] text-neutral-400">Language</span>
                </div>
              </div>

              {/* Status Badge & Action */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-neutral-400">
                  Active: {student.lastActive}
                </span>
                {student.status === 'ATTENTION' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    Attention
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MentorStudentsPage
