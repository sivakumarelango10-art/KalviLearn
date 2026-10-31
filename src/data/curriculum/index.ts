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

export const DEFAULT_STARTER_CODES: Record<ProgrammingLanguage, string> = {
  python: '# Language: Python 3\nimport sys\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()\n',
  java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        scanner.close();\n    }\n}\n',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}\n',
  nodejs: 'const fs = require("fs");\n\nfunction solve() {\n    const input = fs.readFileSync(0, "utf-8").trim();\n    if (!input) return;\n}\n\nsolve();\n',
}

import problemsData from '../problems.json'

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

  // Fallback: If slug matches an archived duplicate, map to its canonical active problem
  for (const rawBelt of problemsData) {
    const rawProblem = rawBelt.problems.find(
      (p: any) => p.slug === slug || p.id === slug || (p as any).legacySlug === slug
    )
    if (rawProblem && (rawProblem as any).canonicalProblemId) {
      return getProblemByLanguageAndSlug(lang, (rawProblem as any).canonicalProblemId)
    }
  }

  return null
}
