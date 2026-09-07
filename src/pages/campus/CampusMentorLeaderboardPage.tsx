import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { fetchMentorLeaderboard, type MentorLeaderboardEntry } from '@/lib/campusManagerService'

export const CampusMentorLeaderboardPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'overall'>('overall')
  const [leaderboard, setLeaderboard] = useState<MentorLeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.title = 'Mentor Leaderboard — Campus Manager'
    let isMounted = true
    const load = async () => {
      setIsLoading(true)
      try {
        const data = await fetchMentorLeaderboard(timeframe)
        if (isMounted) {
          setLeaderboard(data)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [timeframe])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-3">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <span className="text-sm font-semibold text-neutral-500">Loading mentor rankings...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ED2A2B]/10 text-[#ED2A2B] uppercase tracking-wider">
              Faculty Recognition
            </span>
            <span className="text-xs text-neutral-400 font-medium">• Cohort Performance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1.5">
            Mentor Leaderboard
          </h1>
          <p className="text-sm text-neutral-500 max-w-2xl mt-1">
            Celebrating faculty mentors guiding students toward highest curriculum mastery, problem velocity, and solve consistency.
          </p>
        </div>

        {/* Timeframe Pill Switcher */}
        <div className="flex items-center bg-neutral-100 p-1 rounded-2xl text-xs font-bold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimeframe('weekly')}
            className={`px-4 py-2 rounded-xl transition-all ${
              timeframe === 'weekly' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('monthly')}
            className={`px-4 py-2 rounded-xl transition-all ${
              timeframe === 'monthly' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('overall')}
            className={`px-4 py-2 rounded-xl transition-all ${
              timeframe === 'overall' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            All-Time Overall
          </button>
        </div>
      </div>

      {/* Top 3 Mentors Podium */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rank 2 */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col items-center text-center space-y-3 relative overflow-hidden order-2 md:order-1">
            <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 font-extrabold flex items-center justify-center text-sm border-2 border-neutral-300">
              2
            </div>
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white font-bold flex items-center justify-center text-lg shadow-sm">
              {leaderboard[1].name.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base">{leaderboard[1].name}</h3>
              <span className="text-xs text-neutral-400 font-mono">{leaderboard[1].email}</span>
            </div>
            <div className="pt-2 border-t border-neutral-100 w-full flex justify-around text-xs">
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-bold">Students</span>
                <p className="font-bold text-neutral-900">{leaderboard[1].assignedStudents}</p>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-bold">Cohort XP</span>
                <p className="font-bold text-amber-600">{leaderboard[1].cohortTotalXp.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Rank 1: Winner */}
          <div className="bg-gradient-to-b from-amber-50 to-white p-7 rounded-3xl border-2 border-amber-300 shadow-md flex flex-col items-center text-center space-y-3.5 relative overflow-hidden order-1 md:order-2">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center text-base shadow-sm ring-4 ring-amber-100">
              👑 1
            </div>
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-amber-400 font-bold flex items-center justify-center text-xl shadow-md ring-2 ring-amber-300">
              {leaderboard[0].name.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-lg">{leaderboard[0].name}</h3>
              <span className="text-xs text-neutral-500 font-mono">{leaderboard[0].email}</span>
            </div>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
              Campus Lead Mentor
            </span>
            <div className="pt-2 border-t border-amber-200/60 w-full flex justify-around text-xs">
              <div>
                <span className="text-neutral-500 text-[10px] uppercase font-bold">Students</span>
                <p className="font-extrabold text-neutral-900">{leaderboard[0].assignedStudents}</p>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] uppercase font-bold">Cohort XP</span>
                <p className="font-extrabold text-amber-600">{leaderboard[0].cohortTotalXp.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col items-center text-center space-y-3 relative overflow-hidden order-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center text-sm border-2 border-amber-200">
              3
            </div>
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white font-bold flex items-center justify-center text-lg shadow-sm">
              {leaderboard[2].name.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base">{leaderboard[2].name}</h3>
              <span className="text-xs text-neutral-400 font-mono">{leaderboard[2].email}</span>
            </div>
            <div className="pt-2 border-t border-neutral-100 w-full flex justify-around text-xs">
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-bold">Students</span>
                <p className="font-bold text-neutral-900">{leaderboard[2].assignedStudents}</p>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-bold">Cohort XP</span>
                <p className="font-bold text-amber-600">{leaderboard[2].cohortTotalXp.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200/80 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Rank</th>
                <th className="py-3.5 px-6">Mentor</th>
                <th className="py-3.5 px-6">Assigned Students</th>
                <th className="py-3.5 px-6">Cohort Total XP</th>
                <th className="py-3.5 px-6 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {leaderboard.map((entry) => (
                <tr key={entry.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-neutral-700">
                    #{entry.rank}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center text-xs">
                        {entry.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{entry.name}</p>
                        <span className="text-[11px] text-neutral-400 font-mono">{entry.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-neutral-800">
                    {entry.assignedStudents} students
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-amber-600">
                    {entry.cohortTotalXp.toLocaleString()} XP
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        entry.rating === 'EXEMPLARY'
                          ? 'bg-purple-100 text-purple-800'
                          : entry.rating === 'ADVANCED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {entry.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default CampusMentorLeaderboardPage
