import { ProgrammingLanguage, LanguageCurriculum, LanguageProblem } from './types'
import { pythonCurriculum } from './python'
import { javaCurriculum } from './java'
import { nodejsCurriculum } from './nodejs'
import { cppCurriculum } from './cpp'

export * from './types'
export { pythonCurriculum } from './python'
export { javaCurriculum } from './java'
export { nodejsCurriculum } from './nodejs'
export { cppCurriculum } from './cpp'

export const SUPPORTED_LANGUAGES: ProgrammingLanguage[] = ['python', 'java', 'nodejs', 'cpp']

export const CURRICULA: Record<ProgrammingLanguage, LanguageCurriculum> = {
  python: pythonCurriculum,
  java: javaCurriculum,
  nodejs: nodejsCurriculum,
  cpp: cppCurriculum,
}

export function isValidLanguage(lang: string | null | undefined): lang is ProgrammingLanguage {
  if (!lang) return false
  const normalizedLang = lang.toLowerCase()
  return SUPPORTED_LANGUAGES.includes(normalizedLang as ProgrammingLanguage)
}

export function normalizeLanguageSlug(lang: string | null | undefined): ProgrammingLanguage {
  if (!lang) return 'python'
  const normalizedLang = lang.toLowerCase()
  if (normalizedLang === 'javascript' || normalizedLang === 'node' || normalizedLang === 'nodejs' || normalizedLang === 'js') return 'nodejs'
  if (normalizedLang === 'java') return 'java'
  if (normalizedLang === 'cpp' || normalizedLang === 'c++') return 'cpp'
  if (normalizedLang === 'python') return 'python'
  return 'python'
}

export function getCurriculum(lang: string | null | undefined): LanguageCurriculum {
  const normalized = normalizeLanguageSlug(lang)
  return CURRICULA[normalized] || CURRICULA.python
}

export function getProblemByLanguageAndSlug(
  lang: string | null | undefined,
  slug: string
): LanguageProblem | null {
  const curriculum = getCurriculum(lang)
  for (const belt of curriculum.belts) {
    const found = belt.problems.find(
      (problem) =>
        problem.slug === slug ||
        problem.legacySlug === slug ||
        problem.learningUnitId?.toLowerCase() === slug.toLowerCase() ||
        problem.id === slug
    )
    if (found) return found
  }
  return null
}
