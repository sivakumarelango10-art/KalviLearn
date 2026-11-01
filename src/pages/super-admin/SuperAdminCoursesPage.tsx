import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  AlertTriangle,
  Sparkles,
  X,
  Copy,
  Check,
} from 'lucide-react'
import {
  AdminCurriculumModule,
  AdminLearningUnit,
  AdminCurriculumExample,
  fetchCurriculumModules,
  createCurriculumModule,
  updateCurriculumModule,
  deleteCurriculumModule,
  reorderCurriculumModules,
  createLearningUnit,
  updateLearningUnit,
  deleteLearningUnit,
  reorderLearningUnits,
  toggleModuleStatus,
  toggleLearningUnitStatus,
} from '@/lib/superAdminService'
import { cn } from '@/lib/utils'

/**
 * Rich text parser for inline bold (**text**), inline code (`code`), and italics (*text*).
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

export const SuperAdminCoursesPage: React.FC = () => {
  const [modules, setModules] = useState<AdminCurriculumModule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({})

  // Active Selected Module & Unit for Right-Side Panel
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null)
  const [activeSnippetLang, setActiveSnippetLang] = useState<'python' | 'cpp' | 'java' | 'javascript'>('python')
  const [copiedSnippet, setCopiedSnippet] = useState(false)

  // Modals state
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<AdminCurriculumModule | null>(null)
  const [moduleForm, setModuleForm] = useState({ title: '', description: '', order: 1 })

  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false)
  const [activeModuleIdForUnit, setActiveModuleIdForUnit] = useState<string | null>(null)
  const [editingUnit, setEditingUnit] = useState<AdminLearningUnit | null>(null)
  const [unitForm, setUnitForm] = useState<{
    title: string
    concept: string
    approach: string
    codingQuestion: string
    inputFormat: string
    outputFormat: string
    readingTimeMinutes: number
    order: number
    codeSnippets: {
      python: string
      cpp: string
      java: string
      javascript: string
    }
    examples: AdminCurriculumExample[]
  }>({
    title: '',
    concept: '',
    approach: '',
    codingQuestion: '',
    inputFormat: '',
    outputFormat: '',
    readingTimeMinutes: 2,
    order: 1,
    codeSnippets: {
      python: '',
      cpp: '',
      java: '',
      javascript: '',
    },
    examples: [{ input: '', output: '', explanation: '' }],
  })

  // Student Preview Modal
  const [previewUnit, setPreviewUnit] = useState<AdminLearningUnit | null>(null)
  const [previewSnippetLang, setPreviewSnippetLang] = useState<'python' | 'cpp' | 'java' | 'javascript'>('python')
  const [copiedCode, setCopiedCode] = useState(false)

  // Delete Confirmation Modal
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'module' | 'unit'
    id: string
    title: string
    moduleId?: string
  } | null>(null)

  const loadCurriculum = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchCurriculumModules({ search: searchQuery })
      if (res.success && res.data?.modules) {
        setModules(res.data.modules)
        // Expand first module by default
        if (res.data.modules.length > 0) {
          setExpandedModules((prev) => {
            if (Object.keys(prev).length === 0) {
              return { [res.data!.modules[0].id]: true }
            }
            return prev
          })

          setSelectedModuleId((prev) => prev || res.data!.modules[0].id)
          setSelectedUnitId((prev) => {
            if (prev) return prev
            const firstMod = res.data!.modules[0]
            return firstMod.learningUnits?.[0]?.id || null
          })
        }
      } else {
        setError(res.error || 'Failed to load curriculum modules.')
      }
    } catch (err: any) {
      setError(err?.message || 'Error fetching curriculum modules.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCurriculum()
  }, [searchQuery])

  // Active module & unit derived state
  const activeModule = useMemo(() => {
    if (!modules.length) return null
    if (selectedModuleId) {
      const found = modules.find((m) => m.id === selectedModuleId)
      if (found) return found
    }
    return modules[0]
  }, [modules, selectedModuleId])

  const activeUnit = useMemo(() => {
    if (!activeModule || !activeModule.learningUnits?.length) return null
    if (selectedUnitId) {
      const found = activeModule.learningUnits.find((u) => u.id === selectedUnitId)
      if (found) return found
    }
    return activeModule.learningUnits[0]
  }, [activeModule, selectedUnitId])

  // Navigation: previous and next unit
  const activeUnitsList = useMemo(() => activeModule?.learningUnits || [], [activeModule])
  const activeUnitIndex = useMemo(() => {
    if (!activeUnit) return -1
    return activeUnitsList.findIndex((u) => u.id === activeUnit.id)
  }, [activeUnitsList, activeUnit])

  const hasPrevUnit = activeUnitIndex > 0
  const hasNextUnit = activeUnitIndex >= 0 && activeUnitIndex < activeUnitsList.length - 1

  const handlePrevUnit = () => {
    if (hasPrevUnit) {
      setSelectedUnitId(activeUnitsList[activeUnitIndex - 1].id)
    }
  }

  const handleNextUnit = () => {
    if (hasNextUnit) {
      setSelectedUnitId(activeUnitsList[activeUnitIndex + 1].id)
    }
  }

  const toggleExpand = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }))
  }

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {}
    modules.forEach((m) => {
      allExpanded[m.id] = true
    })
    setExpandedModules(allExpanded)
  }

  const collapseAll = () => {
    setExpandedModules({})
  }

  // --- Module Actions ---
  const handleOpenCreateModule = () => {
    setEditingModule(null)
    setModuleForm({
      title: '',
      description: '',
      order: modules.length + 1,
    })
    setIsModuleModalOpen(true)
  }

  const handleOpenEditModule = (mod: AdminCurriculumModule) => {
    setEditingModule(mod)
    setModuleForm({
      title: mod.title,
      description: mod.description || '',
      order: mod.order,
    })
    setIsModuleModalOpen(true)
  }

  const handleSaveModule = async () => {
    if (!moduleForm.title.trim()) {
      setError('Module title is required.')
      return
    }

    try {
      if (editingModule) {
        const res = await updateCurriculumModule(editingModule.id, {
          title: moduleForm.title.trim(),
          description: moduleForm.description.trim(),
          order: moduleForm.order,
        })
        if (!res.success) throw new Error(res.error)
        setSuccessMessage(`Module "${moduleForm.title}" updated.`)
      } else {
        const res = await createCurriculumModule({
          title: moduleForm.title.trim(),
          description: moduleForm.description.trim(),
          order: moduleForm.order,
        })
        if (!res.success) throw new Error(res.error)
        setSuccessMessage(`Module "${moduleForm.title}" created.`)
      }
      setIsModuleModalOpen(false)
      loadCurriculum()
    } catch (err: any) {
      setError(err?.message || 'Failed to save module.')
    }
  }

  const handleMoveModule = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= modules.length) return

    const newModules = [...modules]
    const temp = newModules[index]
    newModules[index] = newModules[targetIndex]
    newModules[targetIndex] = temp

    const moduleOrders = newModules.map((m, idx) => ({ id: m.id, order: idx + 1 }))
    setModules(newModules.map((m, idx) => ({ ...m, order: idx + 1 })))

    try {
      await reorderCurriculumModules(moduleOrders)
      setSuccessMessage('Modules reordered successfully.')
    } catch (err: any) {
      setError('Failed to persist module reordering.')
      loadCurriculum()
    }
  }

  const handleToggleModuleActive = async (mod: AdminCurriculumModule) => {
    try {
      const nextActive = !mod.isActive
      await toggleModuleStatus(mod.id, nextActive)
      setSuccessMessage(`Module is now ${nextActive ? 'Published' : 'Draft'}.`)
      loadCurriculum()
    } catch (err: any) {
      setError('Failed to update module status.')
    }
  }

  // --- Learning Unit Actions ---
  const handleOpenCreateUnit = (moduleId: string) => {
    const targetModule = modules.find((m) => m.id === moduleId)
    const nextOrder = (targetModule?.learningUnits?.length || 0) + 1

    setActiveModuleIdForUnit(moduleId)
    setEditingUnit(null)
    setUnitForm({
      title: '',
      concept: '',
      approach: '',
      codingQuestion: '',
      inputFormat: '',
      outputFormat: '',
      readingTimeMinutes: 2,
      order: nextOrder,
      codeSnippets: {
        python: '# Solution approach in Python\ndef solve():\n    pass\n',
        cpp: '// Solution approach in C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}\n',
        java: '// Solution approach in Java\npublic class Solution {\n    public static void main(String[] args) {\n    }\n}\n',
        javascript: '// Solution approach in JavaScript\nfunction solve() {\n}\n',
      },
      examples: [{ input: '', output: '', explanation: '' }],
    })
    setIsUnitModalOpen(true)
  }

  const handleOpenEditUnit = (unit: AdminLearningUnit) => {
    setActiveModuleIdForUnit(unit.moduleId)
    setEditingUnit(unit)
    setUnitForm({
      title: unit.title,
      concept: unit.concept || unit.content || '',
      approach: unit.approach || '',
      codingQuestion: unit.codingQuestion || '',
      inputFormat: unit.inputFormat || '',
      outputFormat: unit.outputFormat || '',
      readingTimeMinutes: unit.readingTimeMinutes || 2,
      order: unit.order,
      codeSnippets: {
        python: unit.codeSnippets?.python || '',
        cpp: unit.codeSnippets?.cpp || '',
        java: unit.codeSnippets?.java || '',
        javascript: unit.codeSnippets?.javascript || '',
      },
      examples:
        unit.examples && unit.examples.length > 0
          ? unit.examples
          : [{ input: '', output: '', explanation: '' }],
    })
    setIsUnitModalOpen(true)
  }

  const handleSaveUnit = async () => {
    if (!unitForm.title.trim()) {
      setError('Unit title is required.')
      return
    }

    try {
      if (editingUnit) {
        const res = await updateLearningUnit(editingUnit.id, {
          title: unitForm.title.trim(),
          concept: unitForm.concept,
          content: unitForm.concept,
          approach: unitForm.approach,
          codingQuestion: unitForm.codingQuestion,
          inputFormat: unitForm.inputFormat,
          outputFormat: unitForm.outputFormat,
          readingTimeMinutes: unitForm.readingTimeMinutes,
          order: unitForm.order,
          codeSnippets: unitForm.codeSnippets,
          examples: unitForm.examples,
        })
        if (!res.success) throw new Error(res.error)
        setSuccessMessage(`Learning unit "${unitForm.title}" updated.`)
      } else {
        const res = await createLearningUnit({
          moduleId: activeModuleIdForUnit || activeModule?.id || '',
          title: unitForm.title.trim(),
          concept: unitForm.concept,
          content: unitForm.concept,
          approach: unitForm.approach,
          codingQuestion: unitForm.codingQuestion,
          inputFormat: unitForm.inputFormat,
          outputFormat: unitForm.outputFormat,
          readingTimeMinutes: unitForm.readingTimeMinutes,
          order: unitForm.order,
          codeSnippets: unitForm.codeSnippets,
          examples: unitForm.examples,
        })
        if (!res.success) throw new Error(res.error)
        setSuccessMessage(`Learning unit "${unitForm.title}" created.`)
      }
      setIsUnitModalOpen(false)
      loadCurriculum()
    } catch (err: any) {
      setError(err?.message || 'Failed to save learning unit.')
    }
  }

  const handleMoveUnit = async (
    mod: AdminCurriculumModule,
    unitIndex: number,
    direction: 'up' | 'down'
  ) => {
    const units = [...mod.learningUnits]
    const targetIndex = direction === 'up' ? unitIndex - 1 : unitIndex + 1
    if (targetIndex < 0 || targetIndex >= units.length) return

    const temp = units[unitIndex]
    units[unitIndex] = units[targetIndex]
    units[targetIndex] = temp

    const unitOrders = units.map((u, idx) => ({ id: u.id, order: idx + 1 }))

    // Optimistically update
    setModules((prev) =>
      prev.map((m) =>
        m.id === mod.id
          ? {
              ...m,
              learningUnits: units.map((u, idx) => ({ ...u, order: idx + 1 })),
            }
          : m
      )
    )

    try {
      await reorderLearningUnits(unitOrders)
      setSuccessMessage('Learning units reordered.')
    } catch (err: any) {
      setError('Failed to persist unit order.')
      loadCurriculum()
    }
  }

  const handleToggleUnitActive = async (unit: AdminLearningUnit) => {
    try {
      const nextActive = !unit.isActive
      await toggleLearningUnitStatus(unit.id, nextActive)
      setSuccessMessage(`Unit is now ${nextActive ? 'Published' : 'Draft'}.`)
      loadCurriculum()
    } catch (err: any) {
      setError('Failed to toggle unit status.')
    }
  }

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return

    try {
      if (deleteTarget.type === 'module') {
        const res = await deleteCurriculumModule(deleteTarget.id)
        if (!res.success) throw new Error(res.error)
        setSuccessMessage(`Module "${deleteTarget.title}" deleted.`)
      } else {
        const res = await deleteLearningUnit(deleteTarget.id)
        if (!res.success) throw new Error(res.error)
        setSuccessMessage(`Learning unit "${deleteTarget.title}" deleted.`)
      }
      setDeleteTarget(null)
      loadCurriculum()
    } catch (err: any) {
      setError(err?.message || 'Deletion failed.')
    }
  }

  // Aggregate stats
  const totalUnits = useMemo(() => {
    return modules.reduce((sum, m) => sum + (m.learningUnits?.length || 0), 0)
  }, [modules])

  const publishedModulesCount = useMemo(() => {
    return modules.filter((m) => m.isActive !== false && m.status !== 'DRAFT').length
  }, [modules])

  const draftModulesCount = useMemo(() => {
    return modules.length - publishedModulesCount
  }, [modules, publishedModulesCount])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8 space-y-6 select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <Link to="/super-admin/content" className="hover:text-white transition-colors flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Content Hub</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-blue-400 font-semibold">Courses Management</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                Curriculum & Concepts
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                {modules.length} comprehensive modules and {totalUnits} structured learning units with multilingual implementations.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {activeUnit && (
            <button
              onClick={() => {
                setPreviewUnit(activeUnit)
                setPreviewSnippetLang('python')
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Student Preview</span>
            </button>
          )}
          <button
            onClick={handleOpenCreateModule}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-blue-900/30"
          >
            <Plus className="w-4 h-4" />
            <span>Create Module</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-3.5 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
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
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Modules</span>
          <div className="text-2xl font-black text-white mt-1">{modules.length} Modules</div>
          <span className="text-[11px] text-neutral-500">Curriculum Syllabus</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Learning Units</span>
          <div className="text-2xl font-black text-blue-400 mt-1">{totalUnits} Units</div>
          <span className="text-[11px] text-neutral-500">Across all 10 modules</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Published Modules</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{publishedModulesCount} Active</div>
          <span className="text-[11px] text-neutral-500">Live to students</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Draft Modules</span>
          <div className="text-2xl font-black text-neutral-400 mt-1">{draftModulesCount} Draft</div>
          <span className="text-[11px] text-neutral-500">Hidden from students</span>
        </div>
      </div>

      {/* Main Workspace Layout (2-panel: Left Syllabus tree, Right Selected Unit Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Modules Syllabus (4 columns) */}
        <div className="lg:col-span-4 bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-xl overflow-hidden flex flex-col h-[820px]">
          {/* Syllabus Header */}
          <div className="p-4 border-b border-neutral-800 space-y-3 bg-neutral-950/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Modules Syllabus</span>
              </span>
              <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-700">
                {modules.length} Modules • {totalUnits} Units
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search learning units..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Expand / Collapse Controls */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <span>Organize & Select Units</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={expandAll}
                  className="hover:text-white transition-colors"
                >
                  Expand All
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="hover:text-white transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Module List Accordion */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/80 custom-scrollbar">
            {loading && modules.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500">
                Loading curriculum modules...
              </div>
            ) : modules.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500 space-y-2">
                <p>No modules found matching search criteria.</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold text-blue-400 hover:underline"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              modules.map((mod, modIdx) => {
                const isModuleActive = mod.id === selectedModuleId
                const isExpanded = Boolean(expandedModules[mod.id])
                const filteredUnits = mod.learningUnits.filter((u) =>
                  searchQuery
                    ? u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (u.concept || '').toLowerCase().includes(searchQuery.toLowerCase())
                    : true
                )

                if (searchQuery && filteredUnits.length === 0) return null

                return (
                  <div key={mod.id} className="select-none">
                    {/* Module Header Bar */}
                    <div
                      className={cn(
                        'p-3 flex items-center justify-between transition-colors text-xs font-semibold cursor-pointer border-l-2',
                        isModuleActive
                          ? 'bg-neutral-800/70 border-blue-500 text-white'
                          : 'hover:bg-neutral-800/40 border-transparent text-neutral-300'
                      )}
                      onClick={() => {
                        setSelectedModuleId(mod.id)
                        toggleExpand(mod.id)
                        if (!isExpanded && mod.learningUnits.length > 0) {
                          setSelectedUnitId(mod.learningUnits[0].id)
                        }
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Reorder Arrows */}
                        <div
                          className="flex flex-col items-center justify-center -space-y-0.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => handleMoveModule(modIdx, 'up')}
                            disabled={modIdx === 0}
                            title="Move Module Up"
                            className="p-0.5 text-neutral-500 hover:text-white disabled:opacity-20"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveModule(modIdx, 'down')}
                            disabled={modIdx === modules.length - 1}
                            title="Move Module Down"
                            className="p-0.5 text-neutral-500 hover:text-white disabled:opacity-20"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="w-5 h-5 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-300 shrink-0 font-mono">
                          {mod.order}
                        </span>
                        <span className="truncate">{mod.title}</span>
                      </div>

                      {/* Right controls */}
                      <div
                        className="flex items-center gap-1.5 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenCreateUnit(mod.id)}
                          className="p-1 rounded hover:bg-neutral-700 text-neutral-400 hover:text-blue-400 transition-colors"
                          title="Add Unit to Module"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEditModule(mod)}
                          className="p-1 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                          title="Edit Module Title"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleModuleActive(mod)}
                          className={cn(
                            'text-[9px] px-1.5 py-0.5 rounded font-bold uppercase transition-colors',
                            mod.isActive !== false && mod.status !== 'DRAFT'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                              : 'bg-neutral-800 text-neutral-400'
                          )}
                          title="Toggle Status"
                        >
                          {mod.isActive !== false && mod.status !== 'DRAFT' ? 'Live' : 'Draft'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({
                              type: 'module',
                              id: mod.id,
                              title: mod.title,
                            })
                          }
                          className="p-1 rounded hover:bg-red-950/60 text-neutral-500 hover:text-red-400 transition-colors"
                          title="Delete Module"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div
                          className="p-1 cursor-pointer"
                          onClick={() => toggleExpand(mod.id)}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Nested Units List */}
                    {(isExpanded || searchQuery) && (
                      <div className="bg-neutral-950/80 divide-y divide-neutral-900 border-t border-neutral-800/60">
                        {filteredUnits.length === 0 ? (
                          <div className="py-3 px-6 text-[11px] text-neutral-500 italic">
                            No units in this module. Click '+' to add one.
                          </div>
                        ) : (
                          filteredUnits.map((unit, unitIdx) => {
                            const isUnitActive =
                              mod.id === selectedModuleId && unit.id === selectedUnitId

                            return (
                              <div
                                key={unit.id}
                                onClick={() => {
                                  setSelectedModuleId(mod.id)
                                  setSelectedUnitId(unit.id)
                                }}
                                className={cn(
                                  'py-2.5 px-4 text-xs cursor-pointer transition-all flex items-center justify-between border-l-2',
                                  isUnitActive
                                    ? 'bg-blue-600/10 border-blue-500 text-white font-medium'
                                    : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                                )}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  {/* Unit reorder */}
                                  <div
                                    className="flex flex-col items-center justify-center -space-y-0.5"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => handleMoveUnit(mod, unitIdx, 'up')}
                                      disabled={unitIdx === 0}
                                      title="Move Unit Up"
                                      className="p-0.5 text-neutral-600 hover:text-white disabled:opacity-20"
                                    >
                                      <ChevronUp className="w-2.5 h-2.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMoveUnit(mod, unitIdx, 'down')}
                                      disabled={unitIdx === filteredUnits.length - 1}
                                      title="Move Unit Down"
                                      className="p-0.5 text-neutral-600 hover:text-white disabled:opacity-20"
                                    >
                                      <ChevronDown className="w-2.5 h-2.5" />
                                    </button>
                                  </div>

                                  <span className="font-mono text-[10px] text-neutral-500">
                                    {mod.order}.{unit.order}
                                  </span>
                                  <span className="truncate">{unit.title}</span>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span
                                    className={cn(
                                      'w-1.5 h-1.5 rounded-full',
                                      unit.isActive !== false && unit.status !== 'DRAFT'
                                        ? 'bg-emerald-400'
                                        : 'bg-neutral-600'
                                    )}
                                    title={unit.isActive !== false && unit.status !== 'DRAFT' ? 'Published' : 'Draft'}
                                  />
                                  {isUnitActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-1 animate-pulse" />
                                  )}
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Learning Unit Content (8 columns) */}
        <div className="lg:col-span-8 bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-xl overflow-hidden flex flex-col h-[820px]">
          {activeUnit ? (
            <>
              {/* Unit Header Bar */}
              <div className="p-5 border-b border-neutral-800 bg-neutral-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                      Module {activeModule?.order} • {activeModule?.title}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase',
                        activeUnit.isActive !== false && activeUnit.status !== 'DRAFT'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                          : 'bg-neutral-800 text-neutral-400'
                      )}
                    >
                      {activeUnit.isActive !== false && activeUnit.status !== 'DRAFT' ? 'Live' : 'Draft'}
                    </span>
                    {activeUnit.readingTimeMinutes && (
                      <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        {activeUnit.readingTimeMinutes}m read
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span>
                      {activeUnit.order}. {activeUnit.title}
                    </span>
                  </h2>
                </div>

                {/* Unit Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setPreviewUnit(activeUnit)
                      setPreviewSnippetLang('python')
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
                    title="Student Preview"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleOpenEditUnit(activeUnit)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Unit</span>
                  </button>
                  <button
                    onClick={() => handleToggleUnitActive(activeUnit)}
                    className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition-colors"
                  >
                    {activeUnit.isActive !== false && activeUnit.status !== 'DRAFT' ? 'Draft' : 'Publish'}
                  </button>
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        type: 'unit',
                        id: activeUnit.id,
                        title: activeUnit.title,
                        moduleId: activeModule?.id,
                      })
                    }
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950/60 hover:text-red-400 text-neutral-400 text-xs transition-colors"
                    title="Delete Unit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Unit Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs">
                {/* 1. Objectives & Concept */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Core Concept & Theory</span>
                  </h3>
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-neutral-300 text-xs leading-relaxed whitespace-pre-wrap">
                    {parseRichText(activeUnit.concept || activeUnit.content || 'No theoretical description provided.')}
                  </div>
                </div>

                {/* 2. How to Approach */}
                {activeUnit.approach && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>How to Approach This Concept</span>
                    </h3>
                    <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-neutral-300 text-xs leading-relaxed whitespace-pre-wrap">
                      {parseRichText(activeUnit.approach)}
                    </div>
                  </div>
                )}

                {/* 3. Multilingual Code Snippets */}
                {activeUnit.codeSnippets && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-emerald-400" />
                        <span>Multilingual Code Snippets</span>
                      </h3>

                      {/* Language Switcher Tabs */}
                      <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                        {(['python', 'cpp', 'java', 'javascript'] as const).map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setActiveSnippetLang(lang)}
                            className={cn(
                              'px-2.5 py-1 rounded text-[11px] font-semibold transition-colors',
                              activeSnippetLang === lang
                                ? 'bg-blue-600 text-white'
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

                    <div className="relative bg-neutral-950 rounded-xl border border-neutral-800 p-4 font-mono text-xs overflow-x-auto text-emerald-300">
                      <button
                        onClick={() => {
                          const code = activeUnit.codeSnippets?.[activeSnippetLang] || ''
                          navigator.clipboard.writeText(code)
                          setCopiedSnippet(true)
                          setTimeout(() => setCopiedSnippet(false), 2000)
                        }}
                        className="absolute top-3 right-3 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                        title="Copy code"
                      >
                        {copiedSnippet ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <pre className="whitespace-pre">
                        {activeUnit.codeSnippets[activeSnippetLang] ||
                          `// No snippet provided for ${activeSnippetLang}`}
                      </pre>
                    </div>
                  </div>
                )}

                {/* 4. Coding Question */}
                {activeUnit.codingQuestion && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Coding Question Prompt
                    </h3>
                    <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-neutral-300 text-xs leading-relaxed whitespace-pre-wrap">
                      {parseRichText(activeUnit.codingQuestion)}
                    </div>
                  </div>
                )}

                {/* 5. Input & Output Formats */}
                {(activeUnit.inputFormat || activeUnit.outputFormat) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeUnit.inputFormat && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          Input Format
                        </span>
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono text-[11px] text-neutral-300 whitespace-pre-wrap">
                          {activeUnit.inputFormat}
                        </div>
                      </div>
                    )}
                    {activeUnit.outputFormat && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          Output Format
                        </span>
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono text-[11px] text-neutral-300 whitespace-pre-wrap">
                          {activeUnit.outputFormat}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 6. Formatted Examples */}
                {activeUnit.examples && activeUnit.examples.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Formatted Examples ({activeUnit.examples.length})
                    </h3>
                    <div className="space-y-2.5">
                      {activeUnit.examples.map((ex, i) => (
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
                              <span className="text-neutral-200 whitespace-pre-wrap">
                                {ex.input || '(empty)'}
                              </span>
                            </div>
                            <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-850">
                              <span className="text-neutral-500 block text-[10px] font-sans font-semibold mb-1">
                                Output:
                              </span>
                              <span className="text-neutral-200 whitespace-pre-wrap">
                                {ex.output || '(empty)'}
                              </span>
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

              {/* Bottom Unit Navigation (Previous / Next) */}
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
                  Unit {activeUnitIndex + 1} of {activeUnitsList.length}
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
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-neutral-500 space-y-4">
              <BookOpen className="w-12 h-12 text-neutral-700" />
              <div>
                <h3 className="text-sm font-bold text-neutral-300">No Learning Unit Selected</h3>
                <p className="text-xs text-neutral-500 max-w-sm mt-1">
                  Select a learning unit from the syllabus on the left or create a new unit for this module.
                </p>
              </div>
              {activeModule && (
                <button
                  onClick={() => handleOpenCreateUnit(activeModule.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-900/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Unit to Module {activeModule.order}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── MODULE MODAL (Create/Edit) ─── */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>{editingModule ? 'Edit Curriculum Module' : 'Create New Module'}</span>
              </h3>
              <button
                onClick={() => setIsModuleModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Module Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Dynamic Programming & Advanced Graphs"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Overview of concepts taught in this module..."
                  value={moduleForm.description}
                  onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Display Order</label>
                <input
                  type="number"
                  value={moduleForm.order}
                  onChange={(e) => setModuleForm({ ...moduleForm, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                onClick={() => setIsModuleModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModule}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md shadow-blue-900/30"
              >
                {editingModule ? 'Save Changes' : 'Create Module'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── LEARNING UNIT MODAL (Create/Edit) ─── */}
      {isUnitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-4">
            <div className="p-4 px-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>{editingUnit ? 'Edit Learning Unit' : 'Create Learning Unit'}</span>
              </h3>
              <button
                onClick={() => setIsUnitModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-neutral-300 font-semibold mb-1">Unit Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Two Pointers Technique"
                    value={unitForm.title}
                    onChange={(e) => setUnitForm({ ...unitForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Reading Time (mins)</label>
                  <input
                    type="number"
                    value={unitForm.readingTimeMinutes}
                    onChange={(e) =>
                      setUnitForm({ ...unitForm, readingTimeMinutes: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Concept and Theory</label>
                <textarea
                  rows={4}
                  placeholder="Explain the theoretical foundations and concept mechanics..."
                  value={unitForm.concept}
                  onChange={(e) => setUnitForm({ ...unitForm, concept: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">How to Approach This Concept</label>
                <textarea
                  rows={3}
                  placeholder="Step-by-step problem-solving framework and mental model..."
                  value={unitForm.approach}
                  onChange={(e) => setUnitForm({ ...unitForm, approach: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              {/* Multilingual Code Snippets */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <span className="block text-neutral-200 font-bold uppercase tracking-wider text-[11px]">
                  Multilingual Code Snippets
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">Python 3</label>
                    <textarea
                      rows={4}
                      value={unitForm.codeSnippets.python}
                      onChange={(e) =>
                        setUnitForm({
                          ...unitForm,
                          codeSnippets: { ...unitForm.codeSnippets, python: e.target.value },
                        })
                      }
                      placeholder="# Python code example"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">C++ (g++)</label>
                    <textarea
                      rows={4}
                      value={unitForm.codeSnippets.cpp}
                      onChange={(e) =>
                        setUnitForm({
                          ...unitForm,
                          codeSnippets: { ...unitForm.codeSnippets, cpp: e.target.value },
                        })
                      }
                      placeholder="// C++ code example"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">Java</label>
                    <textarea
                      rows={4}
                      value={unitForm.codeSnippets.java}
                      onChange={(e) =>
                        setUnitForm({
                          ...unitForm,
                          codeSnippets: { ...unitForm.codeSnippets, java: e.target.value },
                        })
                      }
                      placeholder="// Java code example"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">JavaScript / Node.js</label>
                    <textarea
                      rows={4}
                      value={unitForm.codeSnippets.javascript}
                      onChange={(e) =>
                        setUnitForm({
                          ...unitForm,
                          codeSnippets: { ...unitForm.codeSnippets, javascript: e.target.value },
                        })
                      }
                      placeholder="// JavaScript code example"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Formatted I/O & Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-neutral-800">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Input Format</label>
                  <input
                    type="text"
                    value={unitForm.inputFormat}
                    onChange={(e) => setUnitForm({ ...unitForm, inputFormat: e.target.value })}
                    placeholder="Input: An array of integers..."
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Output Format</label>
                  <input
                    type="text"
                    value={unitForm.outputFormat}
                    onChange={(e) => setUnitForm({ ...unitForm, outputFormat: e.target.value })}
                    placeholder="Output: A single integer..."
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Coding Question (Prompt)</label>
                <textarea
                  rows={3}
                  value={unitForm.codingQuestion}
                  onChange={(e) => setUnitForm({ ...unitForm, codingQuestion: e.target.value })}
                  placeholder="**Problem Title**\nProblem description..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Dynamic Examples */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-200 font-bold uppercase tracking-wider text-[11px]">
                    Formatted Examples ({unitForm.examples.length})
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setUnitForm({
                        ...unitForm,
                        examples: [
                          ...unitForm.examples,
                          { input: '', output: '', explanation: '' },
                        ],
                      })
                    }
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Example</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {unitForm.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400">
                        <span>Sample Case #{i + 1}</span>
                        {unitForm.examples.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setUnitForm({
                                ...unitForm,
                                examples: unitForm.examples.filter((_, idx) => idx !== i),
                              })
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <input
                            type="text"
                            placeholder="Input value..."
                            value={ex.input || ''}
                            onChange={(e) => {
                              const newEx = [...unitForm.examples]
                              newEx[i].input = e.target.value
                              setUnitForm({ ...unitForm, examples: newEx })
                            }}
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded font-mono text-xs text-white"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Expected output..."
                            value={ex.output || ''}
                            onChange={(e) => {
                              const newEx = [...unitForm.examples]
                              newEx[i].output = e.target.value
                              setUnitForm({ ...unitForm, examples: newEx })
                            }}
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded font-mono text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Explanation (optional)..."
                          value={ex.explanation || ''}
                          onChange={(e) => {
                            const newEx = [...unitForm.examples]
                            newEx[i].explanation = e.target.value
                            setUnitForm({ ...unitForm, examples: newEx })
                          }}
                          className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 px-6 border-t border-neutral-800 flex items-center justify-end gap-2 bg-neutral-900/90">
              <button
                onClick={() => setIsUnitModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUnit}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md shadow-blue-900/30"
              >
                {editingUnit ? 'Save Changes' : 'Create Unit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── STUDENT PREVIEW MODAL ─── */}
      {previewUnit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-4">
            {/* Header */}
            <div className="p-4 px-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Eye className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Student Courses Preview
                </span>
              </div>
              <button
                onClick={() => setPreviewUnit(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs custom-scrollbar">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{previewUnit.title}</h3>
                <div className="flex items-center gap-2 text-neutral-400 text-xs">
                  <span>Unit {previewUnit.order}</span>
                  <span>•</span>
                  <span>{previewUnit.readingTimeMinutes || 2} min read</span>
                </div>
              </div>

              {/* Theory / Concept */}
              <div>
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Concept & Theory</span>
                </h4>
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-neutral-300 text-xs leading-relaxed whitespace-pre-wrap">
                  {previewUnit.concept || previewUnit.content || 'No theory summary available.'}
                </div>
              </div>

              {/* How to Approach */}
              {previewUnit.approach && (
                <div>
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>How to Approach This Concept</span>
                  </h4>
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-neutral-300 text-xs leading-relaxed whitespace-pre-wrap">
                    {previewUnit.approach}
                  </div>
                </div>
              )}

              {/* Multilingual Snippet Tabs */}
              {previewUnit.codeSnippets && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Multilingual Implementation</span>
                    </h4>
                    {/* Language Switcher */}
                    <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
                      {(['python', 'cpp', 'java', 'javascript'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setPreviewSnippetLang(lang)}
                          className={cn(
                            'px-2.5 py-1 rounded text-[11px] font-semibold transition-colors',
                            previewSnippetLang === lang
                              ? 'bg-blue-600 text-white'
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

                  <div className="relative bg-neutral-950 rounded-xl border border-neutral-800 p-4 font-mono text-xs overflow-x-auto text-emerald-300">
                    <button
                      onClick={() => {
                        const code = previewUnit.codeSnippets?.[previewSnippetLang] || ''
                        navigator.clipboard.writeText(code)
                        setCopiedCode(true)
                        setTimeout(() => setCopiedCode(false), 2000)
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                      title="Copy code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <pre className="whitespace-pre">
                      {previewUnit.codeSnippets[previewSnippetLang] ||
                        `// No snippet provided for ${previewSnippetLang}`}
                    </pre>
                  </div>
                </div>
              )}

              {/* Formatted Examples */}
              {previewUnit.examples && previewUnit.examples.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Formatted Examples ({previewUnit.examples.length})
                  </h4>
                  <div className="space-y-2">
                    {previewUnit.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-xs space-y-1.5"
                      >
                        <div className="text-[10px] uppercase font-bold text-neutral-500">
                          Sample {i + 1}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                          <div>
                            <span className="text-neutral-500 block text-[10px]">Input:</span>
                            <span className="text-neutral-200">{ex.input || '(empty)'}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[10px]">Output:</span>
                            <span className="text-neutral-200">{ex.output || '(empty)'}</span>
                          </div>
                        </div>
                        {ex.explanation && (
                          <div className="text-neutral-400 text-[11px] pt-1 border-t border-neutral-800/80">
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 px-6 border-t border-neutral-800 flex items-center justify-end bg-neutral-900/90">
              <button
                onClick={() => setPreviewUnit(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION MODAL ─── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-red-900/80 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-950/80 text-red-400 border border-red-800/80">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Confirm {deleteTarget.type === 'module' ? 'Module' : 'Unit'} Deletion
                </h3>
                <p className="text-xs text-neutral-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white">"{deleteTarget.title}"</strong>
              {deleteTarget.type === 'module' && ' along with all its nested learning units'}?
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white shadow-md shadow-red-900/30"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
