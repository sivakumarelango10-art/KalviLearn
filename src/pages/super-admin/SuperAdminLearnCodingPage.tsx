import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Code,
  ArrowLeft,
  ArrowRight,
  Search,
  BookOpen,
  X,
  Trophy,
  AlertTriangle,
  Clock,
  Code2,
  FileText,
  Sparkles,
  Copy,
  Check,
  Edit2,
  CheckCircle2,
} from 'lucide-react'
import curriculumData from '@/data/curriculum.json'
import { AdminBelt, fetchBelts, updateBelt } from '@/lib/superAdminService'
import { SuperAdminQuestionsPage } from './SuperAdminQuestionsPage'
import { cn } from '@/lib/utils'

interface CurriculumExample {
  input?: string
  output?: string
  explanation?: string
}

interface CurriculumUnit {
  order: number
  title: string
  concept?: string
  content?: string
  approach?: string
  codingQuestion?: string
  inputFormat?: string
  outputFormat?: string
  readingTimeMinutes?: number
  codeSnippets?: {
    python?: string
    cpp?: string
    java?: string
    javascript?: string
  }
  examples?: CurriculumExample[]
}

interface CurriculumModule {
  order: number
  title: string
  description?: string
  learningUnits: CurriculumUnit[]
}

const CURRICULUM_MODULES = curriculumData as unknown as CurriculumModule[]

// Fallback belt definitions
const FALLBACK_BELTS: AdminBelt[] = [
  { id: 'belt-1', order: 1, name: 'Belt 1', title: 'Yellow Belt', color: '#EAB308', description: 'Variables, Operators, and Conditional Logic', problemCount: 20, publishedCount: 20, draftCount: 0 },
  { id: 'belt-2', order: 2, name: 'Belt 2', title: 'Orange Belt', color: '#F97316', description: 'Loop Logic & Introductory Arrays', problemCount: 30, publishedCount: 30, draftCount: 0 },
  { id: 'belt-3', order: 3, name: 'Belt 3', title: 'Green Belt', color: '#10B981', description: 'Structured Problem Solving', problemCount: 35, publishedCount: 35, draftCount: 0 },
  { id: 'belt-4', order: 4, name: 'Belt 4', title: 'Purple Belt', color: '#8B5CF6', description: 'Structured Problem Solving & Techniques', problemCount: 40, publishedCount: 40, draftCount: 0 },
  { id: 'belt-5', order: 5, name: 'Belt 5', title: 'Blue Belt', color: '#3B82F6', description: 'Structured Problem Solving & Data Structures', problemCount: 40, publishedCount: 40, draftCount: 0 },
  { id: 'belt-6', order: 6, name: 'Belt 6', title: 'Brown Belt', color: '#92400E', description: 'Recursion and State', problemCount: 40, publishedCount: 40, draftCount: 0 },
  { id: 'belt-7', order: 7, name: 'Belt 7', title: 'Sr. Brown Belt', color: '#78350F', description: 'Search, Optimization & Feasibility Models', problemCount: 60, publishedCount: 60, draftCount: 0 },
  { id: 'belt-8', order: 8, name: 'Belt 8', title: 'Red Belt', color: '#EF4444', description: 'Trees & Hierarchical Structures', problemCount: 65, publishedCount: 65, draftCount: 0 },
  { id: 'belt-9', order: 9, name: 'Belt 9', title: 'Sr. Red Belt', color: '#B91C1C', description: 'Graph Algorithms & Network Traversal', problemCount: 80, publishedCount: 80, draftCount: 0 },
  { id: 'belt-10', order: 10, name: 'Belt 10', title: 'Black Belt', color: '#171717', description: 'Advanced DP, Sequences & Bitwise Reasoning', problemCount: 90, publishedCount: 90, draftCount: 0 },
]

/**
 * Rich text parser for inline markdown formatting
 */
function parseRichText(text?: string): React.ReactNode {
  if (!text) return null
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g)
  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={index} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      )
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-neutral-800 text-amber-300 font-mono text-[11px] border border-neutral-750"
        >
          {token.slice(1, -1)}
        </code>
      )
    }
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      return (
        <em key={index} className="italic text-neutral-300">
          {token.slice(1, -1)}
        </em>
      )
    }
    return <React.Fragment key={index}>{token}</React.Fragment>
  })
}

export const SuperAdminLearnCodingPage: React.FC = () => {
  const { topicId: urlTopicId, beltId: urlBeltId } = useParams<{ topicId?: string; beltId?: string }>()

  const [activeGroup, setActiveGroup] = useState<'all' | 'curriculum' | 'belts'>('all')
  const [belts, setBelts] = useState<AdminBelt[]>(FALLBACK_BELTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Curriculum group state
  const [selectedModuleOrder, setSelectedModuleOrder] = useState<number | null>(null)
  const [selectedUnitOrder, setSelectedUnitOrder] = useState<number>(1)
  const [activeSnippetLang, setActiveSnippetLang] = useState<'python' | 'cpp' | 'java' | 'javascript'>('python')
  const [copiedSnippet, setCopiedSnippet] = useState(false)

  // Belt selection state
  const [activeScopedBelt, setActiveScopedBelt] = useState<AdminBelt | null>(null)

  // Belt edit modal state
  const [isBeltModalOpen, setIsBeltModalOpen] = useState(false)
  const [editingBelt, setEditingBelt] = useState<AdminBelt | null>(null)
  const [beltForm, setBeltForm] = useState({ title: '', description: '', color: '#EAB308' })

  // Load Belts
  useEffect(() => {
    async function loadBelts() {
      try {
        const res = await fetchBelts()
        if (res.success && res.data?.belts && res.data.belts.length > 0) {
          setBelts(res.data.belts)
        }
      } catch (err: any) {
        console.warn('Using fallback belt metadata:', err?.message)
      }
    }
    loadBelts()
  }, [])

  // Resolve selected belt from URL or state
  const selectedBelt = useMemo(() => {
    if (activeScopedBelt) return activeScopedBelt
    const identifier = urlBeltId || (urlTopicId && urlTopicId.startsWith('belt') ? urlTopicId : null)
    if (!identifier) return null
    const orderNum = parseInt(identifier.replace(/[^0-9]/g, ''), 10)
    return (
      belts.find(
        (b) =>
          b.id === identifier ||
          b.order === orderNum ||
          b.title.toLowerCase() === identifier.toLowerCase()
      ) || null
    )
  }, [urlBeltId, urlTopicId, activeScopedBelt, belts])

  // Total curriculum units count
  const totalCurriculumUnits = useMemo(() => {
    return CURRICULUM_MODULES.reduce((sum, m) => sum + (m.learningUnits?.length || 0), 0)
  }, [])

  // Filtered curriculum modules
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return CURRICULUM_MODULES
    const q = searchQuery.toLowerCase().trim()
    return CURRICULUM_MODULES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.description || '').toLowerCase().includes(q) ||
        m.learningUnits.some((u) => u.title.toLowerCase().includes(q) || (u.concept || '').toLowerCase().includes(q))
    )
  }, [searchQuery])

  // Filtered Belts
  const filteredBelts = useMemo(() => {
    if (!searchQuery.trim()) return belts
    const q = searchQuery.toLowerCase().trim()
    return belts.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    )
  }, [belts, searchQuery])

  // Active module & unit derived state when a module is opened
  const currentModule = useMemo(() => {
    if (selectedModuleOrder === null) return null
    return CURRICULUM_MODULES.find((m) => m.order === selectedModuleOrder) || null
  }, [selectedModuleOrder])

  const currentUnit = useMemo(() => {
    if (!currentModule || !currentModule.learningUnits.length) return null
    return (
      currentModule.learningUnits.find((u) => u.order === selectedUnitOrder) ||
      currentModule.learningUnits[0]
    )
  }, [currentModule, selectedUnitOrder])

  const currentUnitIndex = useMemo(() => {
    if (!currentModule || !currentUnit) return -1
    return currentModule.learningUnits.findIndex((u) => u.order === currentUnit.order)
  }, [currentModule, currentUnit])

  const hasPrevUnit = currentUnitIndex > 0
  const hasNextUnit =
    currentUnitIndex >= 0 &&
    currentModule !== null &&
    currentUnitIndex < currentModule.learningUnits.length - 1

  const handlePrevUnit = () => {
    if (hasPrevUnit && currentModule) {
      setSelectedUnitOrder(currentModule.learningUnits[currentUnitIndex - 1].order)
    }
  }

  const handleNextUnit = () => {
    if (hasNextUnit && currentModule) {
      setSelectedUnitOrder(currentModule.learningUnits[currentUnitIndex + 1].order)
    }
  }

  // Handlers for Belts
  const handleOpenEditBelt = (b: AdminBelt) => {
    setEditingBelt(b)
    setBeltForm({
      title: b.title,
      description: b.description,
      color: b.color,
    })
    setIsBeltModalOpen(true)
  }

  const handleSaveBelt = async () => {
    if (!editingBelt) return
    try {
      const res = await updateBelt({
        id: editingBelt.id,
        title: beltForm.title.trim(),
        description: beltForm.description.trim(),
        color: beltForm.color,
      })
      if (!res.success) throw new Error(res.error)

      setBelts((prev) =>
        prev.map((b) =>
          b.id === editingBelt.id
            ? {
                ...b,
                title: beltForm.title.trim(),
                description: beltForm.description.trim(),
                color: beltForm.color,
              }
            : b
        )
      )
      setSuccessMessage(`Belt ${editingBelt.name} updated.`)
      setIsBeltModalOpen(false)
    } catch (err: any) {
      setError(err?.message || 'Failed to update belt.')
    }
  }

  // --- SUB-VIEW 1: DETAILED MODULE LEARNING UNITS WORKSPACE ---
  if (currentModule && currentUnit) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8 space-y-6 select-none">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 pb-2 border-b border-neutral-800">
          <Link to="/super-admin/content" className="hover:text-white transition-colors">
            Content
          </Link>
          <span className="text-neutral-600">/</span>
          <button
            onClick={() => setSelectedModuleOrder(null)}
            className="hover:text-white transition-colors text-neutral-400"
          >
            Learn Coding
          </button>
          <span className="text-neutral-600">/</span>
          <span className="text-emerald-400 font-semibold truncate">
            Module {currentModule.order}: {currentModule.title}
          </span>
        </nav>

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <button
            onClick={() => setSelectedModuleOrder(null)}
            className="hover:text-white transition-colors flex items-center gap-1.5 text-xs text-neutral-400 font-semibold self-start"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Modules & Belts</span>
          </button>

          <div className="flex items-center gap-2">
            <Link
              to="/super-admin/content/courses"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Open in Courses Manager</span>
            </Link>
          </div>
        </div>

        {/* 2-Panel Module Units Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Unit Navigation List (4 cols) */}
          <div className="lg:col-span-4 bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-xl overflow-hidden flex flex-col h-[760px]">
            <div className="p-4 border-b border-neutral-800 bg-neutral-950/60 space-y-2">
              <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                Module {currentModule.order} Syllabus
              </span>
              <h2 className="text-base font-bold text-white truncate">
                {currentModule.title}
              </h2>
              <span className="text-xs text-neutral-500 font-mono">
                {currentModule.learningUnits.length} Structured Learning Units
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/80 custom-scrollbar">
              {currentModule.learningUnits.map((u) => {
                const isActive = u.order === currentUnit.order
                return (
                  <div
                    key={u.order}
                    onClick={() => setSelectedUnitOrder(u.order)}
                    className={cn(
                      'p-3.5 text-xs cursor-pointer transition-all flex items-center justify-between border-l-2',
                      isActive
                        ? 'bg-emerald-600/10 border-emerald-500 text-white font-semibold'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-mono text-neutral-300 shrink-0">
                        {u.order}
                      </span>
                      <span className="truncate">{u.title}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {u.readingTimeMinutes && (
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {u.readingTimeMinutes}m
                        </span>
                      )}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Selected Unit Content Panel (8 cols) */}
          <div className="lg:col-span-8 bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-xl overflow-hidden flex flex-col h-[760px]">
            {/* Header */}
            <div className="p-5 border-b border-neutral-800 bg-neutral-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    Unit {currentUnit.order} of {currentModule.learningUnits.length}
                  </span>
                  {currentUnit.readingTimeMinutes && (
                    <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {currentUnit.readingTimeMinutes}m read
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {currentUnit.title}
                </h3>
              </div>

              {/* Multilingual Switcher Header */}
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                {(['python', 'cpp', 'java', 'javascript'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveSnippetLang(lang)}
                    className={cn(
                      'px-2.5 py-1 rounded text-[11px] font-semibold transition-colors',
                      activeSnippetLang === lang
                        ? 'bg-emerald-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    )}
                  >
                    {lang === 'python'
                      ? 'Python'
                      : lang === 'cpp'
                      ? 'C++'
                      : lang === 'java'
                      ? 'Java'
                      : 'JavaScript'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs custom-scrollbar">
              {/* Concept & Theory */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Concept & Theory</span>
                </h4>
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-neutral-300 text-xs leading-relaxed whitespace-pre-wrap">
                  {parseRichText(currentUnit.concept || currentUnit.content || 'Theoretical explanation available in lesson curriculum.')}
                </div>
              </div>

              {/* How to Approach */}
              {currentUnit.approach && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>How to Approach This Concept</span>
                  </h4>
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-neutral-300 text-xs leading-relaxed whitespace-pre-wrap">
                    {parseRichText(currentUnit.approach)}
                  </div>
                </div>
              )}

              {/* Multilingual Code Snippets */}
              {currentUnit.codeSnippets && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span>Multilingual Code Snippet ({activeSnippetLang})</span>
                  </h4>

                  <div className="relative bg-neutral-950 rounded-xl border border-neutral-800 p-4 font-mono text-xs overflow-x-auto text-emerald-300">
                    <button
                      onClick={() => {
                        const code = currentUnit.codeSnippets?.[activeSnippetLang] || ''
                        navigator.clipboard.writeText(code)
                        setCopiedSnippet(true)
                        setTimeout(() => setCopiedSnippet(false), 2000)
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                      title="Copy snippet"
                    >
                      {copiedSnippet ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <pre className="whitespace-pre">
                      {currentUnit.codeSnippets[activeSnippetLang] ||
                        `// Code snippet for ${activeSnippetLang} is under curriculum review.`}
                    </pre>
                  </div>
                </div>
              )}

              {/* Formatted I/O Formats */}
              {(currentUnit.inputFormat || currentUnit.outputFormat) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentUnit.inputFormat && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Input Format
                      </span>
                      <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono text-[11px] text-neutral-300 whitespace-pre-wrap">
                        {currentUnit.inputFormat}
                      </div>
                    </div>
                  )}
                  {currentUnit.outputFormat && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Output Format
                      </span>
                      <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono text-[11px] text-neutral-300 whitespace-pre-wrap">
                        {currentUnit.outputFormat}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Formatted Examples */}
              {currentUnit.examples && currentUnit.examples.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Worked Examples ({currentUnit.examples.length})
                  </h4>
                  <div className="space-y-2.5">
                    {currentUnit.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 space-y-2"
                      >
                        <div className="text-[10px] font-bold uppercase text-neutral-500">
                          Example {i + 1}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                          <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-850">
                            <span className="text-neutral-500 block text-[10px] font-sans font-semibold mb-1">
                              Input:
                            </span>
                            <span className="text-neutral-200 whitespace-pre-wrap">{ex.input || '(empty)'}</span>
                          </div>
                          <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-850">
                            <span className="text-neutral-500 block text-[10px] font-sans font-semibold mb-1">
                              Output:
                            </span>
                            <span className="text-neutral-200 whitespace-pre-wrap">{ex.output || '(empty)'}</span>
                          </div>
                        </div>
                        {ex.explanation && (
                          <div className="text-neutral-400 text-xs pt-1 border-t border-neutral-800">
                            <span className="font-semibold text-neutral-300">Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Previous Unit / Next Unit Navigation Footer */}
            <div className="p-4 px-6 border-t border-neutral-800 bg-neutral-950/70 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevUnit}
                disabled={!hasPrevUnit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Unit</span>
              </button>

              <span className="text-xs text-neutral-500 font-mono">
                Unit {currentUnitIndex + 1} of {currentModule.learningUnits.length}
              </span>

              <button
                type="button"
                onClick={handleNextUnit}
                disabled={!hasNextUnit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span>Next Unit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- SUB-VIEW 2: SCOPED BELT QUESTION MANAGER ---
  if (selectedBelt) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8 space-y-6 select-none">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 pb-2 border-b border-neutral-800">
          <Link to="/super-admin/content" className="hover:text-white transition-colors">
            Content
          </Link>
          <span className="text-neutral-600">/</span>
          <button
            onClick={() => setActiveScopedBelt(null)}
            className="hover:text-white transition-colors text-neutral-400"
          >
            Learn Coding
          </button>
          <span className="text-neutral-600">/</span>
          <span className="text-amber-400 font-semibold truncate">
            {selectedBelt.name}: {selectedBelt.title}
          </span>
        </nav>

        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <button
            onClick={() => {
              setActiveScopedBelt(null)
              window.history.pushState({}, '', '/super-admin/content/learn-coding')
            }}
            className="hover:text-white transition-colors flex items-center gap-1.5 text-xs text-neutral-400 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Learn Coding</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedBelt.color }}
            />
            <span className="text-xs font-bold text-neutral-300">
              {selectedBelt.name} — {selectedBelt.title} ({selectedBelt.problemCount} Problems)
            </span>
          </div>
        </div>

        <SuperAdminQuestionsPage
          initialBelt={selectedBelt.order}
          backRoute="/super-admin/content/learn-coding"
          backLabel="Back to Learn Coding"
          customTitle={`Practice Belt: ${selectedBelt.name} (${selectedBelt.title})`}
          customDescription={`Manage challenges, hidden test cases, and difficulty for ${selectedBelt.name}: ${selectedBelt.description}`}
        />
      </div>
    )
  }

  // --- MAIN VIEW: TWO GROUPS (Group 1: Curriculum & Concepts, Group 2: Belt-Based Learning) ---
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8 space-y-8 select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <Link to="/super-admin/content" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Content Hub</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-emerald-400 font-semibold">Learn Coding</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                Learn Coding Management
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Manage structured programming lessons, concepts, explanations, and belt progression.
              </p>
            </div>
          </div>
        </div>

        {/* Courses Manager Shortcut */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/super-admin/content/courses"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-semibold text-xs transition-colors shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Full Courses Editor</span>
          </Link>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-3.5 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Curriculum Modules</span>
          <div className="text-2xl font-black text-white mt-1">{CURRICULUM_MODULES.length} Modules</div>
          <span className="text-[11px] text-neutral-500">Group 1 • Concepts</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Learning Units</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{totalCurriculumUnits} Units</div>
          <span className="text-[11px] text-neutral-500">Multilingual Lessons</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Practice Belts</span>
          <div className="text-2xl font-black text-amber-400 mt-1">{belts.length} Belts</div>
          <span className="text-[11px] text-neutral-500">Group 2 (Yellow to Black)</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Belt Challenges</span>
          <div className="text-2xl font-black text-white mt-1">500 Problems</div>
          <span className="text-[11px] text-neutral-500">Progression Challenges</span>
        </div>
      </div>

      {/* Filter and Group Switcher Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveGroup('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              activeGroup === 'all'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            )}
          >
            All Groups
          </button>
          <button
            type="button"
            onClick={() => setActiveGroup('curriculum')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              activeGroup === 'curriculum'
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                : 'text-neutral-400 hover:text-white'
            )}
          >
            Group 1: Curriculum & Concepts ({CURRICULUM_MODULES.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveGroup('belts')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              activeGroup === 'belts'
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white'
            )}
          >
            Group 2: Belt-Based Learning ({belts.length})
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search modules, concepts, or belts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* ─── GROUP 1: CURRICULUM & CONCEPTS (10 Modules) ─── */}
      {(activeGroup === 'all' || activeGroup === 'curriculum') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-xs">
                1
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">Group 1 — Curriculum & Concepts</h2>
                <span className="text-xs text-neutral-400">
                  10 comprehensive curriculum modules with multilingual code snippets
                </span>
              </div>
            </div>
            <span className="text-xs text-neutral-500 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800 hidden sm:inline">
              {filteredModules.length} Modules • {totalCurriculumUnits} Units
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredModules.map((mod) => {
              return (
                <div
                  key={mod.order}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-md group"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                          {mod.order}
                        </span>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {mod.title}
                        </h3>
                      </div>

                      <span className="text-xs font-mono font-bold text-neutral-400 bg-neutral-950 px-2.5 py-0.5 rounded-full border border-neutral-800">
                        {mod.learningUnits.length} Units
                      </span>
                    </div>

                    {/* Description */}
                    {mod.description && (
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {mod.description}
                      </p>
                    )}

                    {/* Quick Unit Previews (first 3) */}
                    <div className="space-y-1 pt-1">
                      {mod.learningUnits.slice(0, 3).map((u) => (
                        <div
                          key={u.order}
                          className="text-[11px] text-neutral-400 flex items-center gap-2"
                        >
                          <span className="text-neutral-600 font-mono">
                            {mod.order}.{u.order}
                          </span>
                          <span className="truncate">{u.title}</span>
                        </div>
                      ))}
                      {mod.learningUnits.length > 3 && (
                        <div className="text-[10px] text-neutral-500 italic pl-6">
                          + {mod.learningUnits.length - 3} more learning units...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Multilingual Snippets
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModuleOrder(mod.order)
                        setSelectedUnitOrder(1)
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                    >
                      <span>Explore & View Units</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── GROUP 2: BELT-BASED LEARNING (10 Belts) ─── */}
      {(activeGroup === 'all' || activeGroup === 'belts') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-xs">
                2
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">Group 2 — Belt-Based Learning</h2>
                <span className="text-xs text-neutral-400">
                  10 martial arts belt levels with problem progression and test cases
                </span>
              </div>
            </div>
            <span className="text-xs text-neutral-500 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800 hidden sm:inline">
              10 Belts • 500 Practice Problems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBelts.map((belt) => {
              return (
                <div
                  key={belt.id}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-md group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: belt.color }}
                        />
                        <span className="text-xs font-bold font-mono text-neutral-400 uppercase tracking-wider">
                          {belt.name}
                        </span>
                        <span className="text-[11px] font-bold text-white bg-neutral-800 px-2 py-0.5 rounded-full border border-neutral-700">
                          {belt.title}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenEditBelt(belt)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1"
                        title="Edit Belt Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Edit</span>
                      </button>
                    </div>

                    <div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {belt.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        {belt.problemCount} Problems
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        • {belt.publishedCount} Published
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveScopedBelt(belt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
                    >
                      <span>Manage Belt Questions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── EDIT BELT MODAL ─── */}
      {isBeltModalOpen && editingBelt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Edit {editingBelt.name} Details</span>
              </h3>
              <button
                onClick={() => setIsBeltModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Belt Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Yellow Belt"
                  value={beltForm.title}
                  onChange={(e) => setBeltForm({ ...beltForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Accent Color Hex</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={beltForm.color}
                    onChange={(e) => setBeltForm({ ...beltForm, color: e.target.value })}
                    className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={beltForm.color}
                    onChange={(e) => setBeltForm({ ...beltForm, color: e.target.value })}
                    className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono uppercase focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={beltForm.description}
                  onChange={(e) => setBeltForm({ ...beltForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                onClick={() => setIsBeltModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBelt}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white shadow-md shadow-amber-900/30"
              >
                Save Belt Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
