/**
 * KalviLearn Content Manager RBAC — Granular Permission Registry
 *
 * Canonical permission identifiers shared by both server-side authorization
 * enforcement and client-side UI capability gating.
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

export interface ContentPermissionDefinition {
  id: ContentPermission
  label: string
  description: string
  category:
    | 'Dashboard'
    | 'Curriculum'
    | 'Learning Units'
    | 'Questions'
    | 'Examples & Tests'
    | 'Revisions'
    | 'Publication & Destructive'
  defaultEnabled: boolean
  isElevated: boolean
}

export const CONTENT_PERMISSION_CATALOG: ContentPermissionDefinition[] = [
  {
    id: 'content.dashboard.view',
    label: 'View Content Dashboard',
    description: 'Access the Content Manager workspace overview and metrics.',
    category: 'Dashboard',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.curriculum.view',
    label: 'View Curriculum Modules',
    description: 'View assigned curriculum modules and structure.',
    category: 'Curriculum',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.curriculum.create',
    label: 'Create Curriculum Modules',
    description: 'Create new curriculum modules (requires Global scope or elevated approval).',
    category: 'Curriculum',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.curriculum.update',
    label: 'Edit Curriculum Modules',
    description: 'Edit module titles, descriptions, and metadata within scope.',
    category: 'Curriculum',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.curriculum.reorder',
    label: 'Reorder Curriculum Modules',
    description: 'Change display ordering of authorized curriculum modules.',
    category: 'Curriculum',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.learning_unit.view',
    label: 'View Learning Units',
    description: 'View lessons, concepts, and learning unit content.',
    category: 'Learning Units',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.learning_unit.create',
    label: 'Create Learning Units',
    description: 'Create new lessons inside authorized modules.',
    category: 'Learning Units',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.learning_unit.update',
    label: 'Edit Learning Units',
    description: 'Modify lesson text, approach, code snippets, and reading times.',
    category: 'Learning Units',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.learning_unit.reorder',
    label: 'Reorder Learning Units',
    description: 'Reorder lessons inside authorized curriculum modules.',
    category: 'Learning Units',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.question.view',
    label: 'View Coding Questions',
    description: 'Browse and open coding questions within authorized scope.',
    category: 'Questions',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.question.create',
    label: 'Create Coding Questions',
    description: 'Author new draft coding questions inside authorized learning units.',
    category: 'Questions',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.question.update',
    label: 'Edit Coding Questions',
    description: 'Update coding question title, statements, formats, and limits.',
    category: 'Questions',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.question.duplicate',
    label: 'Duplicate Questions',
    description: 'Clone an existing authorized question into a draft.',
    category: 'Questions',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.question.preview',
    label: 'Preview Questions',
    description: 'Preview how questions render for students (public tests only unless hidden access granted).',
    category: 'Questions',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.question.run_tests',
    label: 'Run Question Test Runner',
    description: 'Execute test solutions against question test suites in the sandbox.',
    category: 'Questions',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.example.manage',
    label: 'Manage Question Examples',
    description: 'Add, edit, and reorder sample examples.',
    category: 'Examples & Tests',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.test_case.manage',
    label: 'Manage Public Test Cases',
    description: 'Add, edit, reorder, and delete public test cases.',
    category: 'Examples & Tests',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.hidden_test_case.manage',
    label: 'Manage Hidden Test Cases',
    description: 'View, add, edit, and delete hidden evaluation test cases.',
    category: 'Examples & Tests',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.starter_code.manage',
    label: 'Manage Starter Code',
    description: 'Edit programming-language starter code templates.',
    category: 'Examples & Tests',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.revision.view_own',
    label: 'View Own Revisions & Activity',
    description: 'Inspect revision history and audit entries authored by oneself.',
    category: 'Revisions',
    defaultEnabled: true,
    isElevated: false,
  },
  {
    id: 'content.revision.view_all',
    label: 'View All Question Revisions',
    description: 'Inspect revisions authored by any editor across authorized questions.',
    category: 'Revisions',
    defaultEnabled: false,
    isElevated: true,
  },
  {
    id: 'content.revision.restore',
    label: 'Restore Question Revisions',
    description: 'Roll back a question to a previous snapshot revision.',
    category: 'Revisions',
    defaultEnabled: false,
    isElevated: true,
  },
  {
    id: 'content.question.publish',
    label: 'Publish Coding Questions',
    description: 'Publish coding questions directly to live student visibility without Super Admin approval.',
    category: 'Publication & Destructive',
    defaultEnabled: false,
    isElevated: true,
  },
  {
    id: 'content.question.archive',
    label: 'Archive Coding Questions',
    description: 'Archive or unpublish coding questions.',
    category: 'Publication & Destructive',
    defaultEnabled: false,
    isElevated: true,
  },
  {
    id: 'content.question.delete',
    label: 'Delete Coding Questions',
    description: 'Permanently delete coding questions.',
    category: 'Publication & Destructive',
    defaultEnabled: false,
    isElevated: true,
  },
  {
    id: 'content.learning_unit.publish',
    label: 'Publish Learning Units / Modules',
    description: 'Publish learning units or modules directly to live student visibility.',
    category: 'Publication & Destructive',
    defaultEnabled: false,
    isElevated: true,
  },
  {
    id: 'content.learning_unit.delete',
    label: 'Delete Learning Units / Modules',
    description: 'Permanently delete learning units or curriculum modules.',
    category: 'Publication & Destructive',
    defaultEnabled: false,
    isElevated: true,
  },
]

export const DEFAULT_CONTENT_MANAGER_PERMISSIONS: ContentPermission[] = CONTENT_PERMISSION_CATALOG.filter(
  (p) => p.defaultEnabled
).map((p) => p.id)

export const ELEVATED_CONTENT_PERMISSIONS: ContentPermission[] = CONTENT_PERMISSION_CATALOG.filter(
  (p) => p.isElevated
).map((p) => p.id)

const VALID_PERMISSION_SET = new Set<string>(CONTENT_PERMISSION_LIST)

export function isValidContentPermission(value: string): value is ContentPermission {
  return VALID_PERMISSION_SET.has(value)
}

export function normalizePermissionsList(raw: unknown): ContentPermission[] {
  if (!Array.isArray(raw)) return []
  const seen = new Set<ContentPermission>()
  for (const item of raw) {
    if (typeof item === 'string') {
      const trimmed = item.trim()
      if (isValidContentPermission(trimmed)) {
        seen.add(trimmed)
      }
    }
  }
  return Array.from(seen)
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
