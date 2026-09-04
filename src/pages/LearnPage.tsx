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
  Sparkles,
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
    return (
      currentModule.learningUnits.find((u) => u.order === selectedUnitOrder) ||
      currentModule.learningUnits[0]
    )
  }, [currentModule, selectedUnitOrder])

  // Navigation: previous and next unit
  const currentUnitIndex = currentModule.learningUnits.findIndex(
    (u) => u.order === currentUnit.order
  )

  const hasPrev = currentUnitIndex > 0
  const hasNext = currentUnitIndex < currentModule.learningUnits.length - 1

  const handlePrev = () => {
    if (hasPrev) {
      setSelectedUnitOrder(currentModule.learningUnits[currentUnitIndex - 1].order)
    }
  }

  const handleNext = () => {
    if (hasNext) {
      setSelectedUnitOrder(currentModule.learningUnits[currentUnitIndex + 1].order)
    }
  }

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
            {modules.map((mod) => {
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
                              'py-2 px-3 text-xs cursor-pointer transition-colors flex items-center justify-between',
                              isUnitActive
                                ? 'bg-neutral-900 text-white font-medium rounded-l-lg'
                                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
                            )}
                          >
                            <span className="truncate">
                              {unit.order}. {unit.title}
                            </span>
                            {isUnitActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ED2A2B] ml-2 flex-shrink-0" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
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
                  'p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors',
                  hasPrev
                    ? 'border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700'
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
                  'p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors',
                  hasNext
                    ? 'border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700'
                    : 'border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed'
                )}
              >
                <span className="hidden sm:inline">Next Unit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 text-neutral-800">
            {/* Section 1: Concept & Theory */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Concept & Theory</span>
              </div>
              <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap bg-neutral-50/80 p-5 rounded-2xl border border-neutral-200/80 text-neutral-700 font-sans">
                {currentUnit.content}
              </div>
            </div>

            {/* Section 2: Coding Question */}
            {currentUnit.codingQuestion && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Coding Question</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-sm space-y-4">
                  <div className="text-sm font-semibold text-neutral-900 whitespace-pre-wrap">
                    {currentUnit.codingQuestion}
                  </div>

                  {currentUnit.inputFormat && (
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-neutral-500">Input Specification:</div>
                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 font-mono text-xs whitespace-pre-wrap">
                        {currentUnit.inputFormat}
                      </div>
                    </div>
                  )}

                  {currentUnit.outputFormat && (
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-neutral-500">Output Specification:</div>
                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 font-mono text-xs whitespace-pre-wrap">
                        {currentUnit.outputFormat}
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
                      className="bg-neutral-50/60 p-4 rounded-xl border border-neutral-200 text-xs space-y-2"
                    >
                      <div className="font-semibold text-neutral-700">Example {idx + 1}</div>
                      {ex.input && (
                        <div>
                          <span className="text-neutral-500 font-medium">Input: </span>
                          <code className="bg-white px-2 py-0.5 rounded border border-neutral-200 font-mono">
                            {ex.input}
                          </code>
                        </div>
                      )}
                      {ex.output && (
                        <div>
                          <span className="text-neutral-500 font-medium">Output: </span>
                          <code className="bg-white px-2 py-0.5 rounded border border-neutral-200 font-mono">
                            {ex.output}
                          </code>
                        </div>
                      )}
                      {ex.explanation && (
                        <p className="text-neutral-600 italic whitespace-pre-wrap">
                          {ex.explanation}
                        </p>
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
