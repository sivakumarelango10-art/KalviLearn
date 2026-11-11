import React, { useEffect, useState, useMemo } from 'react'
import {
  BookOpen,
  Layers,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Send,
  Globe,
  Lock,
  X,
} from 'lucide-react'
import { useContentManager } from '@/contexts/ContentManagerContext'
import {
  fetchCmCurriculumModules,
  createCmCurriculumModule,
  updateCmCurriculumModule,
  reorderCmCurriculumModules,
  toggleCmModuleStatus,
  deleteCmCurriculumModule,
  createCmLearningUnit,
  updateCmLearningUnit,
  submitCmLearningUnitForReview,
  reorderCmLearningUnits,
  toggleCmLearningUnitStatus,
  deleteCmLearningUnit,
} from '@/lib/contentManagerService'
import type { AdminCurriculumModule, AdminLearningUnit } from '@/lib/superAdminService'
import { SuperAdminQuestionsPage } from '@/pages/super-admin/SuperAdminQuestionsPage'
import { cn } from '@/lib/utils'

interface ContentManagerCurriculumPageProps {
  focusMode?: 'curriculum' | 'learning-units'
}

export const ContentManagerCurriculumPage: React.FC<ContentManagerCurriculumPageProps> = ({
  focusMode = 'curriculum',
}) => {
  const { profile, hasPermission } = useContentManager()
  const [modules, setModules] = useState<Array<AdminCurriculumModule & { canManageModule?: boolean; approvalStatus?: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({})
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null)

  // Modals
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<AdminCurriculumModule | null>(null)
  const [moduleForm, setModuleForm] = useState({ title: '', description: '', order: 1 })
  const [savingModule, setSavingModule] = useState(false)

  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false)
  const [activeModuleIdForUnit, setActiveModuleIdForUnit] = useState<string | null>(null)
  const [editingUnit, setEditingUnit] = useState<AdminLearningUnit | null>(null)
  const [unitForm, setUnitForm] = useState({
    title: '',
    concept: '',
    approach: '',
    codingQuestion: '',
    inputFormat: '',
    outputFormat: '',
    readingTimeMinutes: 2,
    order: 1,
  })
  const [savingUnit, setSavingUnit] = useState(false)
  const [previewUnit, setPreviewUnit] = useState<AdminLearningUnit | null>(null)

  const [deleteTarget, setDeleteTarget] = useState<{ type: 'module' | 'unit'; id: string; title: string } | null>(null)

  const canCreateMod = hasPermission('content.curriculum.create') && profile?.scopeType === 'GLOBAL'
  const canUpdateMod = hasPermission('content.curriculum.update')
  const canReorderMod = hasPermission('content.curriculum.reorder')
  const canCreateUnit = hasPermission('content.learning_unit.create')
  const canUpdateUnit = hasPermission('content.learning_unit.update')
  const canReorderUnit = hasPermission('content.learning_unit.reorder')
  const canPublishUnit = hasPermission('content.learning_unit.publish')
  const canDeleteUnit = hasPermission('content.learning_unit.delete')

  const loadCurriculum = async () => {
    setLoading(true)
    setError(null)
    const res = await fetchCmCurriculumModules(search.trim() || undefined)
    if (res.success && res.data) {
      const list = res.data.modules || []
      setModules(list)
      if (list.length > 0 && !selectedModuleId) {
        const first = list[0]
        setSelectedModuleId(first.id)
        setExpandedModules((prev) => ({ ...prev, [first.id]: true }))
        if (first.learningUnits && first.learningUnits.length > 0 && !selectedUnitId) {
          setSelectedUnitId(first.learningUnits[0].id)
        }
      }
    } else {
      setError(res.error || 'Failed to load curriculum.')
    }
    setLoading(false)
  }

  useEffect(() => {
    document.title = focusMode === 'learning-units' ? 'KalviLearn — Learning Units' : 'KalviLearn — Curriculum'
    loadCurriculum()
  }, [])

  const selectedModule = useMemo(
    () => modules.find((m) => m.id === selectedModuleId) || null,
    [modules, selectedModuleId]
  )

  const selectedUnit = useMemo(() => {
    for (const m of modules) {
      const found = (m.learningUnits || []).find((u) => u.id === selectedUnitId)
      if (found) return found
    }
    return null
  }, [modules, selectedUnitId])

  const openCreateModule = () => {
    setEditingModule(null)
    setModuleForm({ title: '', description: '', order: modules.length + 1 })
    setIsModuleModalOpen(true)
  }

  const openEditModule = (mod: AdminCurriculumModule) => {
    setEditingModule(mod)
    setModuleForm({ title: mod.title, description: mod.description || '', order: mod.order })
    setIsModuleModalOpen(true)
  }

  const handleSaveModule = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!moduleForm.title.trim()) return
    setSavingModule(true)
    setError(null)
    const res = editingModule
      ? await updateCmCurriculumModule(editingModule.id, moduleForm)
      : await createCmCurriculumModule(moduleForm)
    setSavingModule(false)
    if (res.success) {
      setSuccessMsg(editingModule ? `Module "${moduleForm.title}" updated.` : `Module "${moduleForm.title}" created as Draft.`)
      setIsModuleModalOpen(false)
      loadCurriculum()
    } else {
      setError(res.error || 'Failed to save module.')
    }
  }

  const handleMoveModule = async (idx: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? idx - 1 : idx + 1
    if (target < 0 || target >= modules.length) return
    const copy = [...modules]
    const tmp = copy[idx]
    copy[idx] = copy[target]
    copy[target] = tmp
    const orders = copy.map((m, i) => ({ id: m.id, order: i + 1 }))
    const res = await reorderCmCurriculumModules(orders)
    if (res.success) {
      setSuccessMsg('Module order updated.')
      loadCurriculum()
    } else {
      setError(res.error || 'Failed to reorder modules.')
    }
  }

  const openCreateUnit = (moduleId: string) => {
    const mod = modules.find((m) => m.id === moduleId)
    setEditingUnit(null)
    setActiveModuleIdForUnit(moduleId)
    setUnitForm({
      title: '',
      concept: '',
      approach: '',
      codingQuestion: '',
      inputFormat: '',
      outputFormat: '',
      readingTimeMinutes: 2,
      order: (mod?.learningUnits?.length || 0) + 1,
    })
    setIsUnitModalOpen(true)
  }

  const openEditUnit = (unit: AdminLearningUnit) => {
    setEditingUnit(unit)
    setActiveModuleIdForUnit(unit.moduleId)
    setUnitForm({
      title: unit.title,
      concept: unit.concept || unit.content || '',
      approach: unit.approach || '',
      codingQuestion: unit.codingQuestion || '',
      inputFormat: unit.inputFormat || '',
      outputFormat: unit.outputFormat || '',
      readingTimeMinutes: unit.readingTimeMinutes || 2,
      order: unit.order || 1,
    })
    setIsUnitModalOpen(true)
  }

  const handleSaveUnit = async (submitForReview = false) => {
    if (!unitForm.title.trim()) return
    setSavingUnit(true)
    setError(null)
    const res = editingUnit
      ? await updateCmLearningUnit(editingUnit.id, {
          ...unitForm,
          ...(submitForReview ? { status: 'PENDING_REVIEW' } : {}),
        })
      : await createCmLearningUnit({
          moduleId: activeModuleIdForUnit!,
          ...unitForm,
          submitForReview,
        })
    setSavingUnit(false)
    if (res.success) {
      setSuccessMsg(
        submitForReview
          ? `Lesson "${unitForm.title}" submitted for Super Admin review.`
          : editingUnit
          ? `Lesson "${unitForm.title}" updated.`
          : `Lesson "${unitForm.title}" saved as Draft.`
      )
      setIsUnitModalOpen(false)
      loadCurriculum()
    } else {
      setError(res.error || 'Failed to save learning unit.')
    }
  }

  const handleMoveUnit = async (mod: AdminCurriculumModule, idx: number, dir: 'up' | 'down') => {
    const units = mod.learningUnits || []
    const target = dir === 'up' ? idx - 1 : idx + 1
    if (target < 0 || target >= units.length) return
    const copy = [...units]
    const tmp = copy[idx]
    copy[idx] = copy[target]
    copy[target] = tmp
    const orders = copy.map((u, i) => ({ id: u.id, order: i + 1 }))
    const res = await reorderCmLearningUnits(mod.id, orders)
    if (res.success) {
      setSuccessMsg('Learning unit order updated.')
      loadCurriculum()
    } else {
      setError(res.error || 'Failed to reorder learning units.')
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    const res =
      deleteTarget.type === 'module'
        ? await deleteCmCurriculumModule(deleteTarget.id)
        : await deleteCmLearningUnit(deleteTarget.id)
    setDeleteTarget(null)
    if (res.success) {
      setSuccessMsg(`Deleted "${deleteTarget.title}".`)
      if (selectedUnitId === deleteTarget.id) setSelectedUnitId(null)
      loadCurriculum()
    } else {
      setError(res.error || 'Delete failed.')
    }
  }

  if (!hasPermission('content.curriculum.view') && !hasPermission('content.learning_unit.view')) {
    return (
      <div className="p-8 rounded-2xl border border-[#681717] bg-[#1F0B0B]/30 text-center space-y-3">
        <Lock className="w-8 h-8 text-[#FF6266] mx-auto" />
        <h2 className="text-lg font-bold text-white">Curriculum Access Restricted</h2>
        <p className="text-sm text-neutral-400">
          Your assignment does not include <code className="text-[#FF6266]">content.curriculum.view</code> or{' '}
          <code className="text-[#FF6266]">content.learning_unit.view</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            {focusMode === 'learning-units' ? (
              <Layers className="w-6 h-6 text-[#FF6266]" />
            ) : (
              <BookOpen className="w-6 h-6 text-[#FF6266]" />
            )}
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {focusMode === 'learning-units' ? 'Learning Units Studio' : 'Curriculum Management'}
            </h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Author, structure, reorder, and submit lessons for publication approval strictly within your authorized scope.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadCurriculum}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080808] border border-white/10 hover:border-white/20 text-xs font-medium text-neutral-300"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF6266]' : ''}`} />
            Refresh
          </button>
          {canCreateMod && (
            <button
              type="button"
              onClick={openCreateModule}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              New Module
            </button>
          )}
        </div>
      </div>

      {/* Feedback banners */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {error}
          </span>
          <button onClick={() => setError(null)} className="text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {successMsg}
          </span>
          <button onClick={() => setSuccessMsg(null)} className="text-neutral-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          loadCurriculum()
        }}
        className="flex items-center gap-2 bg-[#080808] p-2.5 rounded-xl border border-white/10"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search authorized lessons or modules..."
            className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#FF6266]"
          />
        </div>
        <button type="submit" className="px-4 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222] text-xs font-semibold text-white">
          Filter
        </button>
      </form>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Module & Learning Unit Tree */}
        <div className="lg:col-span-5 space-y-3">
          {loading && modules.length === 0 ? (
            <div className="p-10 text-center bg-[#080808] border border-white/10 rounded-2xl text-xs text-neutral-400">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#FF6266]" />
              Loading authorized curriculum...
            </div>
          ) : modules.length === 0 ? (
            <div className="p-10 text-center bg-[#080808] border border-dashed border-white/15 rounded-2xl text-xs text-neutral-400 space-y-2">
              <Lock className="w-6 h-6 text-neutral-600 mx-auto" />
              <div className="font-semibold text-white">No Curriculum Modules in Your Scope</div>
              <p>If this is unexpected, verify your scope assignment with a Super Admin.</p>
            </div>
          ) : (
            modules.map((mod, mIdx) => {
              const isExpanded = expandedModules[mod.id] ?? true
              const canEditThisModule = Boolean(mod.canManageModule) && canUpdateMod
              return (
                <div key={mod.id} className="rounded-2xl bg-[#080808] border border-white/10 overflow-hidden">
                  <div className="p-3.5 bg-black/50 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModuleId(mod.id)
                        setExpandedModules((prev) => ({ ...prev, [mod.id]: !isExpanded }))
                      }}
                      className="flex items-center gap-2 min-w-0 flex-1 text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          M{mod.order}: {mod.title}
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          {mod.learningUnits?.length || 0} units · {mod.status}
                        </div>
                      </div>
                    </button>

                    <div className="flex items-center gap-1 shrink-0">
                      {canReorderMod && mod.canManageModule && (
                        <>
                          <button
                            type="button"
                            disabled={mIdx === 0}
                            onClick={() => handleMoveModule(mIdx, 'up')}
                            title="Move Up"
                            className="p-1 rounded hover:bg-white/10 text-neutral-400 disabled:opacity-30"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={mIdx === modules.length - 1}
                            onClick={() => handleMoveModule(mIdx, 'down')}
                            title="Move Down"
                            className="p-1 rounded hover:bg-white/10 text-neutral-400 disabled:opacity-30"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {canEditThisModule && (
                        <button
                          type="button"
                          onClick={() => openEditModule(mod)}
                          title="Edit Module"
                          className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {canPublishUnit && mod.canManageModule && (
                        <button
                          type="button"
                          onClick={async () => {
                            const r = await toggleCmModuleStatus(mod.id, !mod.isActive)
                            if (r.success) {
                              setSuccessMsg(`Module status updated.`)
                              loadCurriculum()
                            } else setError(r.error || 'Failed to update status.')
                          }}
                          title={mod.isActive ? 'Unpublish Module' : 'Publish Module'}
                          className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-emerald-400"
                        >
                          {mod.isActive ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      {canCreateUnit && mod.canManageModule && (
                        <button
                          type="button"
                          onClick={() => openCreateUnit(mod.id)}
                          title="Add Learning Unit"
                          className="p-1 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/60"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="divide-y divide-white/5">
                      {(mod.learningUnits || []).map((unit, uIdx) => (
                        <div
                          key={unit.id}
                          onClick={() => {
                            setSelectedModuleId(mod.id)
                            setSelectedUnitId(unit.id)
                          }}
                          className={cn(
                            'px-3.5 py-2.5 flex items-center justify-between gap-2 cursor-pointer transition',
                            selectedUnitId === unit.id ? 'bg-[#1F0B0B]/70 border-l-2 border-[#ED2A2B]' : 'hover:bg-white/[0.03]'
                          )}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-neutral-200 truncate">
                              {unit.order}. {unit.title}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                              <span
                                className={cn(
                                  'px-1.5 py-0.2 rounded font-semibold',
                                  unit.status === 'PUBLISHED'
                                    ? 'text-emerald-400 bg-emerald-950/40'
                                    : String(unit.status) === 'PENDING_REVIEW'
                                    ? 'text-amber-300 bg-amber-950/40'
                                    : 'text-neutral-400 bg-neutral-900'
                                )}
                              >
                                {unit.status || (unit.isActive ? 'PUBLISHED' : 'DRAFT')}
                              </span>
                              <span className="text-neutral-500">{unit.readingTimeMinutes || 2}m read</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {canReorderUnit && mod.canManageModule && (
                              <>
                                <button
                                  type="button"
                                  disabled={uIdx === 0}
                                  onClick={() => handleMoveUnit(mod, uIdx, 'up')}
                                  className="p-1 rounded hover:bg-white/10 text-neutral-400 disabled:opacity-30"
                                >
                                  <ChevronUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={uIdx === (mod.learningUnits?.length || 0) - 1}
                                  onClick={() => handleMoveUnit(mod, uIdx, 'down')}
                                  className="p-1 rounded hover:bg-white/10 text-neutral-400 disabled:opacity-30"
                                >
                                  <ChevronDown className="w-3 h-3" />
                                </button>
                              </>
                            )}
                            <button
                              type="button"
                              onClick={() => setPreviewUnit(unit)}
                              title="Preview Unit"
                              className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            {canUpdateUnit && (
                              <button
                                type="button"
                                onClick={() => openEditUnit(unit)}
                                title="Edit Learning Unit"
                                className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-amber-400"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {canDeleteUnit && (
                              <button
                                type="button"
                                onClick={() => setDeleteTarget({ type: 'unit', id: unit.id, title: unit.title })}
                                title="Delete Learning Unit"
                                className="p-1 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Right: Selected Learning Unit Detail + Embedded Question Studio */}
        <div className="lg:col-span-7 space-y-5">
          {selectedUnit ? (
            <>
              <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-mono text-[#FF6266]">
                      {selectedModule ? `Module ${selectedModule.order}: ${selectedModule.title}` : 'Learning Unit'}
                    </div>
                    <h2 className="text-lg font-bold text-white mt-0.5">{selectedUnit.title}</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewUnit(selectedUnit)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#141414] border border-white/10 text-xs text-neutral-200 hover:text-white"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    {canUpdateUnit && (
                      <button
                        type="button"
                        onClick={() => openEditUnit(selectedUnit)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#141414] border border-white/10 text-xs text-neutral-200 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit Lesson
                      </button>
                    )}
                    {canUpdateUnit && !canPublishUnit && selectedUnit.status !== 'PUBLISHED' && (
                      <button
                        type="button"
                        onClick={async () => {
                          const r = await submitCmLearningUnitForReview(selectedUnit.id)
                          if (r.success) {
                            setSuccessMsg(`"${selectedUnit.title}" submitted for review.`)
                            loadCurriculum()
                          } else setError(r.error || 'Submission failed.')
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white"
                      >
                        <Send className="w-3.5 h-3.5" /> Submit for Review
                      </button>
                    )}
                    {canPublishUnit && (
                      <button
                        type="button"
                        onClick={async () => {
                          const r = await toggleCmLearningUnitStatus(selectedUnit.id, !selectedUnit.isActive)
                          if (r.success) {
                            setSuccessMsg(`Learning unit publication status updated.`)
                            loadCurriculum()
                          } else setError(r.error || 'Status update failed.')
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-xs font-semibold text-white"
                      >
                        {selectedUnit.isActive ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                        {selectedUnit.isActive ? 'Unpublish' : 'Publish'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 text-xs text-neutral-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {selectedUnit.concept || selectedUnit.content || 'No lesson concept written yet.'}
                </div>
              </div>

              {/* Embedded Full 7-Tab Coding Question Manager scoped to this Unit */}
              {hasPermission('content.question.view') && (
                <SuperAdminQuestionsPage
                  isEmbedded
                  learningUnitId={selectedUnit.id}
                  unitTitle={selectedUnit.title}
                  apiMode="content-manager"
                  grantedPermissions={profile?.permissions || []}
                />
              )}
            </>
          ) : (
            <div className="p-12 rounded-2xl bg-[#080808] border border-dashed border-white/10 text-center text-xs text-neutral-400">
              Select a Learning Unit from the left panel to edit its lesson content and manage attached coding questions.
            </div>
          )}
        </div>
      </div>

      {/* Module Modal */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveModule}
            className="w-full max-w-md rounded-2xl bg-[#121212] border border-white/15 p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {editingModule ? 'Edit Module' : 'Create Curriculum Module'}
              </h3>
              <button type="button" onClick={() => setIsModuleModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Module Title *</label>
              <input
                type="text"
                required
                value={moduleForm.title}
                onChange={(e) => setModuleForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Description</label>
              <textarea
                rows={3}
                value={moduleForm.description}
                onChange={(e) => setModuleForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModuleModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/15 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingModule}
                className="px-4 py-2 rounded-lg bg-[#ED2A2B] hover:bg-[#d62425] text-white text-xs font-semibold"
              >
                {savingModule ? 'Saving...' : 'Save Module'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Learning Unit Modal */}
      {isUnitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-[#121212] border border-white/15 p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {editingUnit ? `Edit Lesson: ${editingUnit.title}` : 'Create Learning Unit'}
              </h3>
              <button type="button" onClick={() => setIsUnitModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs text-neutral-300 mb-1">Lesson Title *</label>
                <input
                  type="text"
                  value={unitForm.title}
                  onChange={(e) => setUnitForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Reading Time (min)</label>
                <input
                  type="number"
                  min={1}
                  value={unitForm.readingTimeMinutes}
                  onChange={(e) => setUnitForm((p) => ({ ...p, readingTimeMinutes: Number(e.target.value) || 2 }))}
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Concept / Lesson Explanation *</label>
              <textarea
                rows={5}
                value={unitForm.concept}
                onChange={(e) => setUnitForm((p) => ({ ...p, concept: e.target.value }))}
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Approach / Walkthrough</label>
              <textarea
                rows={3}
                value={unitForm.approach}
                onChange={(e) => setUnitForm((p) => ({ ...p, approach: e.target.value }))}
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsUnitModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/15 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingUnit}
                onClick={() => handleSaveUnit(false)}
                className="px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] text-white text-xs font-semibold"
              >
                Save Draft
              </button>
              <button
                type="button"
                disabled={savingUnit}
                onClick={() => handleSaveUnit(true)}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
              >
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Unit Modal */}
      {previewUnit && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-[#121212] border border-white/15 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Lesson Preview: {previewUnit.title}</h3>
              <button type="button" onClick={() => setPreviewUnit(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {previewUnit.concept || previewUnit.content}
            </div>
            {previewUnit.approach && (
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-neutral-300">
                <strong className="text-white block mb-1">Approach</strong>
                {previewUnit.approach}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#121212] border border-red-900/60 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Confirm Deletion</h3>
            <p className="text-xs text-neutral-300">
              Permanently delete <strong className="text-white">{deleteTarget.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3 py-1.5 rounded-lg border border-white/15 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
