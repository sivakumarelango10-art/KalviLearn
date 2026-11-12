/**
 * KalviLearn Content Manager Access Profile
 *
 * Single fixed capability profile shared by all active CONTENT_MANAGER accounts.
 * Every active Content Manager receives uniform access to:
 * - Curriculum Modules & Learning Units (Learn)
 * - Practice Coding Questions (Belts)
 * - Learn Coding Lesson Questions (Learning Units)
 * - Associated examples, public/hidden test cases, starter codes, and test runner
 */

export const CONTENT_MANAGER_ROLE = 'CONTENT_MANAGER' as const

export const CONTENT_PERMISSION_LIST = [
  'content.dashboard.view',

  'content.curriculum.view',
  'content.curriculum.create',
  'content.curriculum.update',
  'content.curriculum.reorder',

  'content.learning_unit.view',
  'content.learning_unit.create',
  'content.learning_unit.update',
  'content.learning_unit.reorder',
  'content.learning_unit.publish',
  'content.learning_unit.delete',

  'content.question.view',
  'content.question.create',
  'content.question.update',
  'content.question.duplicate',
  'content.question.preview',
  'content.question.run_tests',
  'content.question.publish',
  'content.question.archive',
  'content.question.delete',

  'content.example.manage',
  'content.test_case.manage',
  'content.hidden_test_case.manage',
  'content.starter_code.manage',

  'content.revision.view_own',
  'content.revision.view_all',
  'content.revision.restore',
] as const

export type ContentPermission = (typeof CONTENT_PERMISSION_LIST)[number]
export type ContentScopeType = 'NONE' | 'SCOPED' | 'GLOBAL'

export const FIXED_CONTENT_MANAGER_PERMISSIONS: ContentPermission[] = [...CONTENT_PERMISSION_LIST]

export interface ContentCapabilityArea {
  id: string
  title: string
  description: string
  capabilities: string[]
}

export const FIXED_CONTENT_MANAGER_AREAS: ContentCapabilityArea[] = [
  {
    id: 'curriculum',
    title: 'Learn — Curriculum Management',
    description: 'Create, edit, organize, and publish educational modules and lessons.',
    capabilities: [
      'View, add, edit, and reorder curriculum modules',
      'Add, edit, and reorder Learning Units within modules',
      'Edit lesson concepts, approaches, reading times, and explanations',
      'Manage standard Draft / Published lifecycle for modules and lessons',
    ],
  },
  {
    id: 'practice',
    title: 'Practice — Coding Question Management',
    description: 'Author and maintain Belt-based Practice coding problems.',
    capabilities: [
      'View, add, edit, and duplicate Practice coding questions',
      'Preserve and assign Belt relationships (Belt 1–10)',
      'Manage descriptions, constraints, input/output formats, and examples',
      'Manage public & hidden test cases, multi-language starter code, and run tests',
    ],
  },
  {
    id: 'learn-coding',
    title: 'Learn Coding — Lesson Question Management',
    description: 'Author and maintain coding problems attached directly to Learning Units.',
    capabilities: [
      'View Learn Coding curriculum modules and lessons',
      'Add and edit coding questions associated with a Learning Unit',
      'Manage Python, Java, C++, and JavaScript starter code & examples',
      'Manage public & hidden test cases, run test suites, and save changes',
    ],
  },
]

const VALID_PERMISSION_SET = new Set<string>(CONTENT_PERMISSION_LIST)

export function isValidContentPermission(value: string): value is ContentPermission {
  return VALID_PERMISSION_SET.has(value)
}

export function normalizePermissionsList(raw: unknown): ContentPermission[] {
  if (!Array.isArray(raw)) return [...FIXED_CONTENT_MANAGER_PERMISSIONS]
  const seen = new Set<ContentPermission>()
  for (const item of raw) {
    if (typeof item === 'string') {
      const trimmed = item.trim()
      if (isValidContentPermission(trimmed)) seen.add(trimmed)
    }
  }
  return seen.size > 0 ? Array.from(seen) : [...FIXED_CONTENT_MANAGER_PERMISSIONS]
}

export function hasContentPermission(
  permissions: readonly string[] | ReadonlySet<string> | undefined | null,
  required: ContentPermission
): boolean {
  if (!permissions) return false
  if (permissions instanceof Set) return permissions.has(required)
  return (permissions as readonly string[]).includes(required)
}

export function hasAnyContentPermission(
  permissions: readonly string[] | ReadonlySet<string> | undefined | null,
  requiredList: readonly ContentPermission[]
): boolean {
  return requiredList.some((perm) => hasContentPermission(permissions, perm))
}
