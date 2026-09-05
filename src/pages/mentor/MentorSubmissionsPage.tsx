import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Editor from '@monaco-editor/react'
import {
  Send,
  CheckCircle2,
  XCircle,
  Code2,
  Search,
  X,
  Loader2,
  Copy,
  Check,
  Clock,
  Calendar,
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
  const [copied, setCopied] = useState(false)

  // Keyboard shortcut (Escape) to close modal and body scroll lock
  useEffect(() => {
    if (!inspectingSub) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectingSub(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [inspectingSub])

  const handleCopyCode = async () => {
    if (!inspectingSub?.code) return
    try {
      await navigator.clipboard.writeText(inspectingSub.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard fallback
    }
  }

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

      {/* Code Inspector Modal (Portaled directly to document.body) */}
      {inspectingSub &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setInspectingSub(null)}
          >
            <div
              className="bg-[#12141A] text-neutral-100 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col h-[85vh] max-h-[720px] min-h-[480px] animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Bar */}
              <div className="px-5 py-3.5 border-b border-neutral-800 bg-[#161922] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 text-[#ED2A2B] flex items-center justify-center shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white truncate">
                        {inspectingSub.problemTitle}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-800 text-neutral-300 font-mono border border-neutral-700/60">
                        {inspectingSub.languageLabel}
                      </span>
                      {inspectingSub.beltName && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-neutral-400 bg-neutral-800/50">
                          {inspectingSub.beltName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Test Result Pill */}
                  {inspectingSub.status === 'PASSED' && inspectingSub.passedTests === 10 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>10/10 Passed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                      <span>{inspectingSub.passedTests}/10 Passed</span>
                    </span>
                  )}

                  {/* Copy Code Button */}
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
                    title="Copy code to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setInspectingSub(null)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors ml-1"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Student Metadata Sub-bar */}
              <div className="px-5 py-2.5 bg-[#12141A] border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-300">
                    {inspectingSub.studentName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-neutral-200">{inspectingSub.studentName}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="font-mono text-neutral-400 text-[11px]">{inspectingSub.studentEmail}</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    <span>{inspectingSub.executionTimeMs}ms execution</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-500" />
                    <span>{inspectingSub.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Monaco Read-only Code View */}
              <div className="flex-1 min-h-0 relative bg-[#1e1e1e]">
                <Editor
                  height="100%"
                  theme="vs-dark"
                  language={inspectingSub.language === 'nodejs' ? 'javascript' : inspectingSub.language}
                  value={inspectingSub.code || '// No code submitted'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: true, maxColumn: 40 },
                    fontSize: 13,
                    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                    renderLineHighlight: 'all',
                    padding: { top: 12, bottom: 12 },
                  }}
                />
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-2.5 bg-[#161922] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span>{(inspectingSub.code || '').split('\n').length} lines</span>
                  <span>•</span>
                  <span>{(inspectingSub.code || '').length} characters</span>
                  <span>•</span>
                  <span className="text-neutral-400">Read-only student submission</span>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectingSub(null)}
                  className="px-3.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default MentorSubmissionsPage
