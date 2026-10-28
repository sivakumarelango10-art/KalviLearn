import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  Flame,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Code2,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MentorStudent } from '@/lib/mentorService'
import { PythonLogo, JavaLogo, CppLogo } from '@/components/practice/LanguageCards'
import { NodejsOfficialLogo, AllLanguagesLogo } from '@/pages/mentor/MentorStudentsPage'

interface StudentDetailModalProps {
  student: MentorStudent | null
  initialLanguage?: (typeof LANGUAGES)[number]['id']
  onClose: () => void
}

const LANGUAGES = [
  { id: 'all', label: 'All Languages', shortLabel: 'All' },
  { id: 'cpp', label: 'C++', shortLabel: 'C++' },
  { id: 'python', label: 'Python', shortLabel: 'Python' },
  { id: 'java', label: 'Java', shortLabel: 'Java' },
  { id: 'nodejs', label: 'Node.Js', shortLabel: 'Node.Js' },
] as const

type LanguageKey = (typeof LANGUAGES)[number]['id']

const renderLangLogo = (id: LanguageKey | string, className: string = 'w-4 h-4') => {
  switch (id) {
    case 'cpp':
      return <CppLogo className={className} />
    case 'python':
      return <PythonLogo className={className} />
    case 'java':
      return <JavaLogo className={className} />
    case 'nodejs':
      return <NodejsOfficialLogo className={className} />
    default:
      return <AllLanguagesLogo className={className} />
  }
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, initialLanguage, onClose }) => {
  const [activeTab, setActiveTab] = useState<'solved' | 'submissions'>('solved')
  const [langFilter, setLangFilter] = useState<LanguageKey>(initialLanguage || 'all')

  useEffect(() => {
    if (initialLanguage) {
      setLangFilter(initialLanguage)
    }
  }, [initialLanguage, student])

  // Lock body scroll and register Escape key listener
  useEffect(() => {
    if (!student) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [student, onClose])

  if (!student || typeof document === 'undefined') return null

  const studentName = student.name || 'Student'
  const initials =
    studentName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0] || '')
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'ST'

  const solvedList =
    langFilter === 'all'
      ? student.solvedProblems || []
      : (student.solvedProblems || []).filter((p) =>
          p.languages ? p.languages.includes(langFilter) : p.language === langFilter
        )

  const submissionsList = student.recentSubmissions || []

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-detail-title"
    >
      <div
        className="bg-white w-full max-w-3xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-neutral-200 space-y-6 relative max-h-[92vh] flex flex-col animate-modal-pop overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Header Profile Identity */}
        <div className="flex items-start gap-4 pr-10">
          <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white font-extrabold text-lg flex items-center justify-center shadow-xs flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 id="student-detail-title" className="text-xl font-bold text-neutral-900 truncate">
                {studentName}
              </h2>
              <span
                className="px-2.5 py-0.5 rounded text-[11px] font-extrabold text-white shadow-2xs"
                style={{ backgroundColor: student.beltColor }}
              >
                {student.belt}
              </span>
              {student.needsAttention ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Intervention Required
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Active & On Track
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-500 font-mono truncate">
              {student.email}
            </p>

            {/* Academic Growth Mentor */}
            <div className="flex items-center gap-3 pt-1 text-xs text-neutral-600 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Mentor:</span>{' '}
                <strong className="text-neutral-900 font-semibold">
                  {student.mentorName || 'Assigned Growth Mentor'}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* 2. Key Metrics Bar (Real Telemetry: Solved, XP, Streak, Progress) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-50/90 rounded-2xl border border-neutral-200/80 text-center">
          <div className="space-y-0.5">
            <div className="text-xl font-extrabold text-neutral-900">
              {student.solvedCount}
            </div>
            <div className="text-[11px] font-semibold text-neutral-500">Problems Solved</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-xl font-extrabold text-[#ED2A2B] flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 fill-[#ED2A2B]" />
              <span>{student.totalXp}</span>
            </div>
            <div className="text-[11px] font-semibold text-neutral-500">Total XP Earned</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-xl font-extrabold text-amber-500 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{student.streak}d</span>
            </div>
            <div className="text-[11px] font-semibold text-neutral-500">Coding Streak</div>
          </div>

          <div className="space-y-0.5">
            <div className="text-xl font-extrabold text-neutral-900">
              {student.progressPercent}%
            </div>
            <div className="text-[11px] font-semibold text-neutral-500">Curriculum Progress</div>
          </div>
        </div>

        {/* Attention Notice if needed */}
        {student.needsAttention && student.attentionReason && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Intervention Recommended:</span>{' '}
              {student.attentionReason}
            </div>
          </div>
        )}

        {/* 3. Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('solved')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all',
                activeTab === 'solved'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              )}
            >
              Solved Challenges ({student.solvedProblems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('submissions')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all',
                activeTab === 'submissions'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              )}
            >
              Recent Submissions ({submissionsList.length})
            </button>
          </div>

          <div className="text-[11px] text-neutral-400 hidden sm:block">
            Last Active: <strong className="text-neutral-700">{student.lastActive}</strong>
          </div>
        </div>

        {/* 4. Tab Content */}
        {activeTab === 'solved' && (
          <div className="space-y-3 flex-1 overflow-hidden flex flex-col">
            {/* Language filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {LANGUAGES.map((lang) => {
                const isSelected = langFilter === lang.id
                const count =
                  lang.id === 'all'
                    ? student.solvedProblems.length
                    : student.languageSolvedCounts?.[lang.id] || 0

                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLangFilter(lang.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer',
                      isSelected
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    )}
                  >
                    <span className="flex-shrink-0 flex items-center justify-center">
                      {renderLangLogo(lang.id, 'w-3.5 h-3.5')}
                    </span>
                    <span>{lang.shortLabel}</span>
                    <span
                      className={cn(
                        'text-[10px] px-1.5 py-0.2 rounded-md font-mono',
                        isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-200/80 text-neutral-700'
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Solved Problems Scroll Area */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[360px] overscroll-contain">
              {solvedList.length === 0 ? (
                <div className="py-12 text-center text-neutral-400 space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-medium">
                    No solved problems recorded in {LANGUAGES.find((l) => l.id === langFilter)?.label} yet.
                  </p>
                </div>
              ) : (
                solvedList.map((prob) => {
                  const activeLang = langFilter !== 'all' ? langFilter : prob.language
                  const langBadge =
                    activeLang === 'cpp'
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : activeLang === 'python'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : activeLang === 'java'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-teal-100 text-teal-800 border-teal-200'
                  const langLabel =
                    LANGUAGES.find((l) => l.id === activeLang)?.shortLabel ||
                    (activeLang === 'cpp' ? 'C++' : prob.languageLabel)

                  return (
                    <div
                      key={prob.problemId}
                      className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between gap-3 hover:border-neutral-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-neutral-900 truncate">
                            {prob.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span
                              className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white shadow-2xs"
                              style={{ backgroundColor: prob.beltColor }}
                            >
                              {prob.beltName}
                            </span>
                            <span
                              className={cn(
                                'text-[9px] font-bold px-1.5 py-0.5 rounded',
                                prob.difficulty.toLowerCase() === 'easy'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : prob.difficulty.toLowerCase() === 'medium'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                              )}
                            >
                              {prob.difficulty}
                            </span>
                            {prob.languages && prob.languages.length > 1 && langFilter === 'all' ? (
                              <div className="flex items-center gap-1">
                                {prob.languages.map((l) => {
                                  const badgeClass =
                                    l === 'cpp'
                                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                                      : l === 'python'
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                      : l === 'java'
                                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                                      : 'bg-teal-100 text-teal-800 border-teal-200'
                                  const label = LANGUAGES.find((item) => item.id === l)?.shortLabel || l
                                  return (
                                    <span
                                      key={l}
                                      className={cn(
                                        'text-[9px] font-extrabold px-1.5 py-0.5 rounded border inline-flex items-center gap-1',
                                        badgeClass
                                      )}
                                    >
                                      {renderLangLogo(l, 'w-3 h-3')}
                                      <span>{label}</span>
                                    </span>
                                  )
                                })}
                              </div>
                            ) : (
                              <span
                                className={cn(
                                  'text-[9px] font-extrabold px-2 py-0.5 rounded border inline-flex items-center gap-1.5',
                                  langBadge
                                )}
                              >
                                {renderLangLogo(activeLang, 'w-3 h-3')}
                                <span>{langLabel}</span>
                              </span>
                            )}
                            <span className="text-[10px] text-neutral-400">
                              {prob.solvedAtFormatted}
                            </span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={`/practice/${activeLang}/${prob.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/60 transition-colors flex-shrink-0"
                        title="Inspect Problem in Arena"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[390px] overscroll-contain">
            {submissionsList.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                  <Clock className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium">No recent submissions recorded for this student.</p>
              </div>
            ) : (
              submissionsList.map((sub) => {
                const isPassed = sub.status === 'PASSED'

                return (
                  <div
                    key={sub.id}
                    className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between gap-3 hover:border-neutral-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          'w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0',
                          isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        )}
                      >
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-neutral-900 truncate">
                            {sub.problemTitle}
                          </h4>
                          <span
                            className={cn(
                              'text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase',
                              isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            )}
                          >
                            {sub.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-500 flex-wrap">
                          <span
                            className="font-extrabold px-1.5 py-0.2 rounded text-white shadow-2xs"
                            style={{ backgroundColor: sub.beltColor }}
                          >
                            {sub.beltName}
                          </span>
                          <span className="font-semibold text-neutral-700">
                            {sub.languageLabel}
                          </span>
                          <span>•</span>
                          <span className="font-mono">
                            {sub.passedTests}/{sub.totalTests} Tests
                          </span>
                          <span>•</span>
                          <span>{sub.executionTimeMs}ms</span>
                          <span>•</span>
                          <span className="text-neutral-400">{sub.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`/practice/${sub.language}/${sub.problemSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/60 transition-colors flex-shrink-0"
                      title="Inspect Problem in Arena"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* 5. Modal Footer */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Enrolled: {student.joinedDate || 'Jan 2026'}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
