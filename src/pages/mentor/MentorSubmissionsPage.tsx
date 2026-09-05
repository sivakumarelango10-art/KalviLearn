import React, { useState, useMemo, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import {
  Send,
  CheckCircle2,
  XCircle,
  Code2,
  Search,
  X,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  MentorSubmission,
  fetchMentorSubmissions,
  subscribeToMentorUpdates,
} from '@/lib/mentorService'
import { useAuth } from '@/contexts/AuthContext'

export const MentorSubmissionsPage: React.FC = () => {
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState<MentorSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'PASSED' | 'FAILED'>('all')
  const [langFilter, setLangFilter] = useState<'all' | 'python' | 'java' | 'nodejs' | 'cpp'>('all')
  const [inspectingSub, setInspectingSub] = useState<MentorSubmission | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const data = await fetchMentorSubmissions(user?.id, 60)
        if (isMounted) {
          setSubmissions(data)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error fetching mentor submissions:', err)
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

  const filtered = useMemo(() => {
    return submissions.filter((sub) => {
      const sName = (sub.studentName || '').toLowerCase()
      const pTitle = (sub.problemTitle || '').toLowerCase()
      const sEmail = (sub.studentEmail || '').toLowerCase()
      const q = (search || '').toLowerCase()

      const matchSearch =
        sName.includes(q) ||
        pTitle.includes(q) ||
        sEmail.includes(q)

      if (!matchSearch) return false
      if (statusFilter !== 'all' && sub.status !== statusFilter) return false
      if (langFilter !== 'all' && sub.language !== langFilter) return false
      return true
    })
  }, [submissions, search, statusFilter, langFilter])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-page-enter">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100">
              <Send className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Live Submission Stream
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Real-time evaluation logs across all 10 test cases (3 visible + 7 hidden) for Python, Java, Node.js, and C++.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Database Sync
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, problem, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Tabs */}
          <div className="flex items-center gap-1">
            {(['all', 'PASSED', 'FAILED'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold transition-all interactive-tab',
                  statusFilter === st
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                )}
              >
                {st === 'all'
                  ? `All (${submissions.length})`
                  : st === 'PASSED'
                  ? `Passed (${submissions.filter((s) => s.status === 'PASSED').length})`
                  : `Failed (${submissions.filter((s) => s.status === 'FAILED').length})`}
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value as 'all' | 'python' | 'java' | 'nodejs' | 'cpp')}
              className="text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="all">All Languages</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="nodejs">Node.js</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50 text-neutral-500 font-bold uppercase text-[10px] tracking-wider border-b border-neutral-200/80">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Problem</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Result (All 10 Cases)</th>
                <th className="py-3 px-4">Exec Time</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#ED2A2B]" />
                      <span className="text-xs font-medium">Loading live evaluation feed...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-400">
                    No submissions found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => {
                  const isAllPassed = sub.status === 'PASSED' && sub.passedTests === 10

                  return (
                    <tr key={sub.id} className="hover:bg-neutral-50/70 transition-colors">
                      {/* Student */}
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-bold text-neutral-900">{sub.studentName}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">
                            {sub.studentEmail}
                          </div>
                        </div>
                      </td>

                      {/* Problem */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-neutral-800">{sub.problemTitle}</div>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {sub.beltName}
                        </span>
                      </td>

                      {/* Language */}
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-mono text-[11px] font-semibold">
                          {sub.languageLabel}
                        </span>
                      </td>

                      {/* Test Result */}
                      <td className="py-3 px-4">
                        {isAllPassed ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>10 / 10 PASS</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                            <XCircle className="w-3.5 h-3.5 text-red-500" />
                            <span>{sub.passedTests} / 10 FAILED</span>
                          </div>
                        )}
                      </td>

                      {/* Exec Time */}
                      <td className="py-3 px-4 font-mono text-neutral-500">
                        {sub.executionTimeMs}ms
                      </td>

                      {/* Timestamp */}
                      <td className="py-3 px-4 text-neutral-400 text-[11px]">
                        {sub.createdAt}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setInspectingSub(sub)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 font-semibold text-xs transition-colors interactive-btn shadow-2xs"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>Inspect Code</span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Inspector Modal */}
      {inspectingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-neutral-900 text-neutral-100 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col h-[600px] animate-modal-pop">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {inspectingSub.studentName} — {inspectingSub.problemTitle}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300 font-mono">
                    {inspectingSub.languageLabel}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Result: {inspectingSub.passedTests}/10 test cases passed • {inspectingSub.executionTimeMs}ms execution time
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInspectingSub(null)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Monaco Read-only Code View */}
            <div className="flex-1 relative">
              <Editor
                height="100%"
                theme="vs-dark"
                language={inspectingSub.language === 'nodejs' ? 'javascript' : inspectingSub.language}
                value={inspectingSub.code}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MentorSubmissionsPage
