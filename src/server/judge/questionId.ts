/**
 * Shared question ID validation and language normalization for evaluation endpoints.
 *
 * Accepted question ID formats:
 *   - Plain slugs:  ^[a-z0-9][a-z0-9-]{0,127}$ (max 128 characters)
 *   - Learn IDs:    ^learn:[a-z0-9-]{1,64}:[a-z0-9][a-z0-9-]{0,127}$
 *   - Learn slugs:  ^learn:[a-z0-9][a-z0-9-]{0,127}$
 *
 * No spaces, slashes, dots, or other prefixes are permitted.
 */

export const PLAIN_SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,127}$/i
export const LEARN_ID_PATTERN = /^learn:[a-z0-9-]{1,64}:[a-z0-9][a-z0-9-]{0,127}$/i
export const LEARN_SLUG_PATTERN = /^learn:[a-z0-9][a-z0-9-]{0,127}$/i

export const MAX_QUESTION_ID_LENGTH = 200
export const MAX_CODE_CHARS = 65536

export type SupportedLanguage = 'python' | 'java' | 'cpp' | 'nodejs'

export const ALLOWED_LANGUAGES: ReadonlySet<SupportedLanguage> = new Set<SupportedLanguage>([
  'python',
  'java',
  'cpp',
  'nodejs',
])

export function isValidQuestionId(id: unknown): id is string {
  if (typeof id !== 'string') return false
  if (id.length === 0 || id.length > MAX_QUESTION_ID_LENGTH) return false
  // Reject spaces, dots, slashes, backslashes explicitly
  if (/[\s./\\]/.test(id)) return false
  return (
    PLAIN_SLUG_PATTERN.test(id) ||
    LEARN_ID_PATTERN.test(id) ||
    LEARN_SLUG_PATTERN.test(id)
  )
}

export function normalizeLanguage(raw: unknown): SupportedLanguage | null {
  if (typeof raw !== 'string') return null
  const l = raw.trim().toLowerCase()
  if (l === 'javascript' || l === 'js' || l === 'node' || l === 'nodejs') return 'nodejs'
  if (l === 'java') return 'java'
  if (l === 'cpp' || l === 'c++') return 'cpp'
  if (l === 'python' || l === 'py') return 'python'
  return null
}

/**
 * 41 Python-specific Learn questions (20 in Scope, 20 in Inheritance, 1 in DSA Algorithms).
 * Attempting to run or submit these questions in non-Python languages is rejected.
 */
export const PYTHON_ONLY_SLUGS: ReadonlySet<string> = new Set<string>([
  'local-parameter-shadows-global',
  'local-assignment-does-not-leak',
  'read-global-without-rebinding',
  'global-keyword-mutation',
  'enclosing-variable-read',
  'nonlocal-increment',
  'inner-shadow-vs-enclosing',
  'nested-closure-captures-parameter',
  'loop-variable-persists-in-function',
  'if-block-uses-local-function-scope',
  'comprehension-does-not-overwrite-x',
  'parameter-rebinding-does-not-modify-caller',
  'three-level-legb-lookup',
  'closest-scope-wins',
  'nonlocal-swap-state',
  'closure-factory-with-two-calls',
  'default-parameter-evaluated-at-definition',
  'local-and-global-same-name',
  'nested-function-argument-overrides-closure',
  'two-independent-closure-instances',
  'prefix-xor-values',
  'basic-overridden-double',
  'inherit-without-override',
  'override-changes-subtraction',
  'super-method-extension',
  'three-level-method-chain',
  'runtime-polymorphism',
  'constructor-field-inheritance',
  'overridden-property-of-shape',
  'parent-vs-child-multiplier',
  'super-call-twice',
  'inherited-helper-used-by-override',
  'derived-helper-overrides-parent-helper',
  'grandchild-uses-parent-override',
  'class-hierarchy-type-flags',
  'template-method-dispatch',
  'override-with-conditional',
  'grandchild-super-chain',
  'cooperative-diamond-inheritance',
  'subclass-method-calls-another-override',
  'polymorphic-aggregate',
])

export function isPythonOnlyQuestion(questionSlug: string): boolean {
  if (!questionSlug) return false
  const parts = questionSlug.split(':')
  const slug = parts[parts.length - 1].toLowerCase()
  return PYTHON_ONLY_SLUGS.has(slug)
}

import learnQuestionLanguages from './learnQuestionLanguages.json'

export function getSupportedLanguagesForQuestion(questionSlug: string): SupportedLanguage[] {
  if (!questionSlug) return ['python', 'nodejs', 'java', 'cpp']

  // Practice questions support all 4 languages
  if (!questionSlug.startsWith('learn:')) {
    return ['python', 'nodejs', 'java', 'cpp']
  }

  // Learn question
  const parts = questionSlug.split(':')
  const slug = parts[parts.length - 1].toLowerCase()
  const keyWithTopic = parts.length >= 3 ? `${parts[1].toLowerCase()}:${slug}` : slug

  const langs = (learnQuestionLanguages as Record<string, SupportedLanguage[]>)[keyWithTopic] ||
                (learnQuestionLanguages as Record<string, SupportedLanguage[]>)[slug]

  if (langs && langs.length > 0) {
    return langs
  }

  return ['python']
}

export function isLanguageSupportedForQuestion(questionSlug: string, lang: SupportedLanguage): boolean {
  return getSupportedLanguagesForQuestion(questionSlug).includes(lang)
}


