import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Search,
  Code2,
  ArrowRight,
  ArrowLeft,
  FileText,
} from 'lucide-react'
import curriculumData from '@/data/curriculum.json'
import { cn } from '@/lib/utils'

interface LearningExample {
  input?: string
  output?: string
  explanation?: string
}

interface LearningUnit {
  order: number
  title: string
  content?: string
  codingQuestion?: string
  inputFormat?: string
  outputFormat?: string
  examples?: LearningExample[]
  readingTimeMinutes?: number
}

interface CurriculumModule {
  order: number
  title: string
  learningUnits: LearningUnit[]
}

const modules = curriculumData as unknown as CurriculumModule[]

/**
 * Robust markdown formatter for inline bold (**text**), inline code (`code`), and italic (*text*).
 * Eliminates raw markdown asterisks and converts them into semantic HTML elements.
 */
function parseRichText(text: string): React.ReactNode {
  if (!text) return null
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g)
  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={index} className="font-bold text-neutral-950">
          {token.slice(2, -2)}
        </strong>
      )
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[11px] border border-neutral-200/80"
        >
          {token.slice(1, -1)}
        </code>
      )
    }
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      return (
        <em key={index} className="italic text-neutral-800">
          {token.slice(1, -1)}
        </em>
      )
    }
    return <React.Fragment key={index}>{token}</React.Fragment>
  })
}

/**
 * Defensive cleaner for problem format specifications.
 * Strips redundant **Input Format:** / **Output Format:** headers and raw ``` text ``` code fences.
 */
function cleanSpecificationText(text?: string): string {
  if (!text) return ''
  let s = text.trim()
  s = s.replace(/^\*\*(?:Input|Output)\s+Format:\*\*\s*/i, '')
  s = s.replace(/```[^\n]*\r?\n([\s\S]*?)```/g, '$1')
  s = s.replace(/```/g, '')
  s = s.replace(/\n{3,}/g, '\n\n')
  return s.trim()
}

/**
 * Renders coding question with dedicated bold title and formatted prompt.
 */
function renderCodingQuestion(text?: string): React.ReactNode {
  if (!text) return null
  const titleMatch = text.match(/^\*\*([^*]+)\*\*(?:\n+([\s\S]*))?$/)
  if (titleMatch) {
    const [, title, body] = titleMatch
    return (
      <div className="space-y-2">
        <h4 className="text-base font-bold text-neutral-900 tracking-tight">
          {title}
        </h4>
        {body && (
          <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
            {parseRichText(body)}
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
      {parseRichText(text)}
    </div>
  )
}

export const LearnPage: React.FC = () => {
  const [selectedModuleOrder, setSelectedModuleOrder] = useState<number>(1)
  const [selectedUnitOrder, setSelectedUnitOrder] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 1: true })

  // Active module
  const currentModule = useMemo(() => {
    return (
      modules.find((m) => m.order === selectedModuleOrder) ||
      modules[0]
    )
  }, [selectedModuleOrder])

  // Active learning unit
  const currentUnit = useMemo(() => {
    const units = currentModule?.learningUnits || []
    return (
      units.find((u) => u.order === selectedUnitOrder) ||
      units[0]
    )
  }, [currentModule, selectedUnitOrder])

  // Navigation: previous and next unit
  const units = currentModule?.learningUnits || []
  const currentUnitIndex = units.findIndex(
    (u) => u.order === currentUnit?.order
  )

  const hasPrev = currentUnitIndex > 0
  const hasNext = currentUnitIndex !== -1 && currentUnitIndex < units.length - 1

  const handlePrev = () => {
    if (hasPrev && units[currentUnitIndex - 1]) {
      setSelectedUnitOrder(units[currentUnitIndex - 1].order)
    }
  }

  const handleNext = () => {
    if (hasNext && units[currentUnitIndex + 1]) {
      setSelectedUnitOrder(units[currentUnitIndex + 1].order)
    }
  }

  const totalMatchingUnits = useMemo(() => {
    if (!searchQuery) return 1
    return modules.reduce(
      (sum, m) =>
        sum +
        m.learningUnits.filter((u) =>
          u.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).length,
      0
    )
  }, [searchQuery])

  const toggleModule = (order: number) => {
    setExpandedModules((prev) => ({ ...prev, [order]: !prev[order] }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100">
              <BookOpen className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">Curriculum & Concepts</h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            10 comprehensive modules and 89 structured learning units from fundamentals to algorithmic synthesis.
          </p>
        </div>

        <Link
          to="/practice"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-sm transition-all self-start md:self-center"
        >
          <span>Go to Practice Arena</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Modules & Units Tree (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col h-[750px]">
          <div className="p-4 border-b border-neutral-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Modules Syllabus
              </span>
              <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                10 Modules
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search learning units..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Module List Accordion */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
            {totalMatchingUnits === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-400 space-y-2 animate-in fade-in duration-150">
                <p>No learning units found matching "{searchQuery}".</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold text-[#ED2A2B] hover:underline"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              modules.map((mod) => {
                const isModuleActive = mod.order === selectedModuleOrder
                const isExpanded = !!expandedModules[mod.order]

                const filteredUnits = mod.learningUnits.filter((u) =>
                  searchQuery ? u.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
                )

                if (searchQuery && filteredUnits.length === 0) return null

                return (
                  <div key={mod.order} className="select-none">
                  {/* Module Header */}
                  <div
                    onClick={() => {
                      setSelectedModuleOrder(mod.order)
                      toggleModule(mod.order)
                      if (!isExpanded && mod.learningUnits.length > 0) {
                        setSelectedUnitOrder(mod.learningUnits[0].order)
                      }
                    }}
                    className={cn(
                      'p-3.5 flex items-center justify-between cursor-pointer transition-colors text-xs font-semibold',
                      isModuleActive
                        ? 'bg-neutral-100/90 text-neutral-900'
                        : 'hover:bg-neutral-50 text-neutral-700'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-neutral-200/80 flex items-center justify-center text-[10px] font-bold text-neutral-700 flex-shrink-0">
                        {mod.order}
                      </span>
                      <span className="truncate">{mod.title}</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] text-neutral-400">
                        {mod.learningUnits.length}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </div>
                  </div>

                  {/* Units inside this module */}
                  {(isExpanded || searchQuery) && (
                    <div className="bg-neutral-50/70 divide-y divide-neutral-100/60 pl-4">
                      {filteredUnits.map((unit: any) => {
                        const isUnitActive =
                          mod.order === selectedModuleOrder && unit.order === selectedUnitOrder

                        return (
                          <div
                            key={unit.order}
                            onClick={() => {
                              setSelectedModuleOrder(mod.order)
                              setSelectedUnitOrder(unit.order)
                            }}
                            className={cn(
                              'py-2 px-3 text-xs cursor-pointer transition-all duration-200 flex items-center justify-between interactive-tab',
                              isUnitActive
                                ? 'bg-neutral-900 text-white font-medium rounded-l-lg scale-[1.01] shadow-sm'
                                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 hover:translate-x-1'
                            )}
                          >
                            <span className="truncate">
                              {unit.order}. {unit.title}
                            </span>
                            {isUnitActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ED2A2B] ml-2 flex-shrink-0 animate-pulse-subtle" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }))}
          </div>
        </div>

        {/* Right Column: Learning Unit Content (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col h-[750px]">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Module {currentModule.order} • {currentModule.title}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                Unit {currentUnit.order}: {currentUnit.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                className={cn(
                  'p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all duration-200 interactive-btn',
                  hasPrev
                    ? 'border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 shadow-sm'
                    : 'border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed'
                )}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev Unit</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!hasNext}
                className={cn(
                  'p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all duration-200 interactive-btn',
                  hasNext
                    ? 'border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 shadow-sm'
                    : 'border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed'
                )}
              >
                <span className="hidden sm:inline">Next Unit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body with smooth fade & slide */}
          <div
            key={`${currentModule.order}-${currentUnit.order}`}
            className="flex-1 overflow-y-auto p-6 space-y-8 text-neutral-800 animate-page-enter"
          >
            {/* Section 1: Concept & Theory */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <span>Concept & Theory</span>
              </div>
              <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap bg-neutral-50/80 p-5 rounded-2xl border border-neutral-200/80 text-neutral-700 font-sans">
                {parseRichText(currentUnit.content || '')}
              </div>
            </div>

            {/* Section 2: Coding Question */}
            {currentUnit.codingQuestion && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Coding Question</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-sm space-y-5">
                  <div>
                    {renderCodingQuestion(currentUnit.codingQuestion)}
                  </div>

                  {currentUnit.inputFormat && (
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Input Specification
                      </div>
                      <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 font-mono text-xs text-neutral-800 whitespace-pre-wrap leading-relaxed">
                        {parseRichText(cleanSpecificationText(currentUnit.inputFormat))}
                      </div>
                    </div>
                  )}

                  {currentUnit.outputFormat && (
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Output Specification
                      </div>
                      <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 font-mono text-xs text-neutral-800 whitespace-pre-wrap leading-relaxed">
                        {parseRichText(cleanSpecificationText(currentUnit.outputFormat))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 3: Examples */}
            {currentUnit.examples && currentUnit.examples.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Worked Examples</span>
                </div>
                <div className="space-y-3">
                  {currentUnit.examples.map((ex: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-neutral-50/60 p-4 rounded-xl border border-neutral-200 text-xs space-y-2.5"
                    >
                      <div className="font-bold text-neutral-800">Example {idx + 1}</div>
                      {ex.input && (
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-500 font-medium shrink-0">Input:</span>
                          <code className="bg-white px-2 py-0.5 rounded border border-neutral-200 font-mono text-neutral-800">
                            {ex.input}
                          </code>
                        </div>
                      )}
                      {ex.output && (
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-500 font-medium shrink-0">Output:</span>
                          <code className="bg-white px-2 py-0.5 rounded border border-neutral-200 font-mono text-neutral-800">
                            {ex.output}
                          </code>
                        </div>
                      )}
                      {ex.explanation && (
                        <div className="text-neutral-600 text-xs leading-relaxed whitespace-pre-wrap pt-1 border-t border-neutral-200/60">
                          {parseRichText(ex.explanation)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer CTA: Test this concept in the arena */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-neutral-500">
                Ready to practice? Test your code in the Practice Arena with automatic evaluation.
              </div>
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <span>Practice in Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
