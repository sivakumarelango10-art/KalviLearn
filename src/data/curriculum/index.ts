import { ProgrammingLanguage, LanguageCurriculum, LanguageProblem } from './types'
import { pythonCurriculum } from './python'
import { javaCurriculum } from './java'
import { nodejsCurriculum } from './nodejs'
import { cppCurriculum } from './cpp'
import { getCodingQuestionBySlug } from '../../coding/questions'

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

const DEFAULT_STARTER_CODES: Record<ProgrammingLanguage, string> = {
  python: '# Language: Python 3\nimport sys\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()\n',
  java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        scanner.close();\n    }\n}\n',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}\n',
  nodejs: 'const fs = require("fs");\n\nfunction solve() {\n    const input = fs.readFileSync(0, "utf-8").trim();\n    if (!input) return;\n}\n\nsolve();\n',
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

  // Check new Coding Question Bank (740 questions)
  const codingQ = getCodingQuestionBySlug(slug)
  if (codingQ) {
    const normalizedLang = normalizeLanguageSlug(lang)
    const visibleTests = codingQ.visibleTests || []
    const visibleCount = codingQ.testCaseMeta?.visibleCount ?? (visibleTests.length || 3)
    const hiddenCount = codingQ.testCaseMeta?.hiddenCount ?? 7

    const testCases: LanguageProblem['testCases'] = [
      ...visibleTests.map((vt) => ({
        testIndex: vt.testIndex,
        input: vt.input,
        expectedOutput: vt.expectedOutput,
        isHidden: false,
      })),
      ...Array.from({ length: hiddenCount }, (_, i) => ({
        testIndex: visibleCount + i + 1,
        isHidden: true,
      })),
    ]

    return {
      id: codingQ.id,
      slug: codingQ.slug,
      language: normalizedLang,
      belt: 1,
      beltName: codingQ.topicTitle,
      beltTitle: codingQ.topicTitle,
      beltColor: '#ED2A2B',
      beltDescription: 'Topic Coding Practice',
      order: codingQ.globalNumber,
      title: codingQ.title,
      description: codingQ.problemStatement,
      inputFormat: codingQ.inputFormat,
      outputFormat: codingQ.outputFormat,
      constraints: codingQ.constraints,
      examples: codingQ.examples,
      difficulty: codingQ.difficulty || 'Easy',
      xp: 50,
      starterCode: DEFAULT_STARTER_CODES[normalizedLang],
      testCases,
    } as LanguageProblem
  }

  return null
}
