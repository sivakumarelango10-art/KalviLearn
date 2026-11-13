import { supabase } from './supabase'
import type { MultilingualSnippets } from '@/components/learn/CodeSnippetViewer'

export interface LearningExample {
  input?: string
  output?: string
  explanation?: string
  visual?: string
}

export interface StudentLearningUnit {
  id: string
  moduleId: string
  order: number
  title: string
  concept: string
  content: string
  approach?: string
  codeSnippets?: MultilingualSnippets
  codingQuestion?: string
  inputFormat?: string
  outputFormat?: string
  examples: LearningExample[]
  readingTimeMinutes?: number
  isActive: boolean
  status: string
}

export interface StudentCurriculumModule {
  id: string
  order: number
  title: string
  description?: string
  isActive: boolean
  status: string
  learningUnits: StudentLearningUnit[]
}

export type CurriculumFetchResult =
  | { status: 'ok'; modules: StudentCurriculumModule[] }
  | { status: 'empty'; modules: [] }
  | { status: 'error'; modules: []; error: string }

function parseJsonField<T>(raw: unknown, fallback: T): T {
  if (raw === null || raw === undefined) return fallback
  if (typeof raw === 'string') {
    const trimmed = raw.trim()
    if (!trimmed) return fallback
    try {
      return JSON.parse(trimmed) as T
    } catch {
      return fallback
    }
  }
  return raw as T
}

function isPublishedAndActive(record: { isActive?: boolean | null; status?: string | null }): boolean {
  const active = record.isActive !== false
  const status = String(record.status || 'PUBLISHED').toUpperCase().trim()
  return active && status === 'PUBLISHED'
}

/**
 * Fetches published, active curriculum Modules and LearningUnits directly from Supabase.
 * Uses the authenticated browser Supabase client (subject to RLS `module_read` and `learningunit_read`).
 * Never silently falls back to static JSON on database errors or empty datasets.
 */
export async function fetchPublishedCurriculum(
  client: Pick<typeof supabase, 'from'> = supabase
): Promise<CurriculumFetchResult> {
  try {
    const [modulesRes, unitsRes] = await Promise.all([
      client
        .from('Module')
        .select('id, order, title, description, isActive, status')
        .eq('isActive', true)
        .eq('status', 'PUBLISHED')
        .order('order', { ascending: true }),
      client
        .from('LearningUnit')
        .select(
          'id, moduleId, order, title, content, approach, codeSnippets, codingQuestion, inputFormat, outputFormat, examples, readingTimeMinutes, isActive, status'
        )
        .eq('isActive', true)
        .eq('status', 'PUBLISHED')
        .order('order', { ascending: true }),
    ])

    if (modulesRes.error) {
      return {
        status: 'error',
        modules: [],
        error: modulesRes.error.message || 'Failed to load curriculum modules from database.',
      }
    }

    if (unitsRes.error) {
      return {
        status: 'error',
        modules: [],
        error: unitsRes.error.message || 'Failed to load learning units from database.',
      }
    }

    const rawModules = (modulesRes.data || []).filter(isPublishedAndActive)
    const rawUnits = (unitsRes.data || []).filter(isPublishedAndActive)

    if (rawModules.length === 0) {
      return { status: 'empty', modules: [] }
    }

    const unitsByModuleId = new Map<string, StudentLearningUnit[]>()
    for (const u of rawUnits) {
      if (!u.moduleId) continue
      const parsedExamples = parseJsonField<LearningExample[]>(u.examples, [])
      const parsedSnippets = parseJsonField<MultilingualSnippets | undefined>(u.codeSnippets, undefined)
      const unitText = typeof u.content === 'string' ? u.content : ''

      const mappedUnit: StudentLearningUnit = {
        id: u.id,
        moduleId: u.moduleId,
        order: Number(u.order ?? 0),
        title: u.title || 'Untitled Unit',
        concept: unitText,
        content: unitText,
        approach: typeof u.approach === 'string' && u.approach.trim() ? u.approach : undefined,
        codeSnippets:
          parsedSnippets && typeof parsedSnippets === 'object' && Object.keys(parsedSnippets).length > 0
            ? parsedSnippets
            : undefined,
        codingQuestion: typeof u.codingQuestion === 'string' && u.codingQuestion.trim() ? u.codingQuestion : undefined,
        inputFormat: typeof u.inputFormat === 'string' && u.inputFormat.trim() ? u.inputFormat : undefined,
        outputFormat: typeof u.outputFormat === 'string' && u.outputFormat.trim() ? u.outputFormat : undefined,
        examples: Array.isArray(parsedExamples) ? parsedExamples : [],
        readingTimeMinutes:
          typeof u.readingTimeMinutes === 'number' && u.readingTimeMinutes > 0
            ? u.readingTimeMinutes
            : undefined,
        isActive: u.isActive !== false,
        status: String(u.status || 'PUBLISHED').toUpperCase(),
      }

      const list = unitsByModuleId.get(u.moduleId) || []
      list.push(mappedUnit)
      unitsByModuleId.set(u.moduleId, list)
    }

    const modules: StudentCurriculumModule[] = rawModules
      .map((m: any) => {
        const modUnits = (unitsByModuleId.get(m.id) || []).slice().sort((a, b) => a.order - b.order)
        return {
          id: m.id,
          order: Number(m.order ?? 0),
          title: m.title || 'Untitled Module',
          description: typeof m.description === 'string' ? m.description : undefined,
          isActive: m.isActive !== false,
          status: String(m.status || 'PUBLISHED').toUpperCase(),
          learningUnits: modUnits,
        }
      })
      .sort((a, b) => a.order - b.order)

    return { status: 'ok', modules }
  } catch (err: unknown) {
    return {
      status: 'error',
      modules: [],
      error: err instanceof Error ? err.message : 'Unexpected error while loading curriculum.',
    }
  }
}

