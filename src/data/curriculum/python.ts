import problemsData from '../problems.json'
import { LanguageCurriculum, LanguageBelt, LanguageProblem } from './types'
import { isPracticeArchiveEnabled } from '../../lib/featureFlags'

function buildBelts(): LanguageBelt[] {
  const archiveEnabled = isPracticeArchiveEnabled()
  return problemsData.map((rawBelt) => {
    const meta = {
      order: rawBelt.order,
      name: `${rawBelt.name} (${rawBelt.title})`,
      title: rawBelt.title,
      description: rawBelt.description,
      color: rawBelt.color,
    }

    const problems: LanguageProblem[] = rawBelt.problems
      .filter((p: any) => !archiveEnabled || p.isActive !== false)
      .map((p) => ({
        id: `python_${p.slug}`,
        slug: p.slug,
        legacySlug: (p as any).legacySlug,
        learningUnitId: (p as any).learningUnitId || (p as any).id,
        language: 'python',
        belt: rawBelt.order,
        beltName: meta.name,
        beltTitle: meta.title,
        beltColor: meta.color,
        beltDescription: meta.description,
        order: p.order,
        globalNumber: (p as any).globalNumber,
        subdivision: (p as any).subdivision,
        title: p.title,
        description: p.description,
        inputFormat: p.inputFormat,
        outputFormat: p.outputFormat,
        explanation: (p as any).explanation,
        exampleExplanation: (p as any).exampleExplanation,
        examples: (p as any).examples || [],
        difficulty: p.difficulty as 'Easy' | 'Medium' | 'Hard',
        xp: 50,
        isActive: (p as any).isActive !== false,
        canonicalProblemId: (p as any).canonicalProblemId || null,
        starterCode:
          p.starterCodes?.python ||
          '# Language: Python 3\nimport sys\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()\n',
        testCases: p.testCases || [],
      }))

    return {
      order: rawBelt.order,
      name: meta.name,
      title: meta.title,
      description: meta.description,
      color: meta.color,
      language: 'python',
      problems,
    }
  })
}

export const pythonCurriculum: LanguageCurriculum = {
  language: 'python',
  name: 'Python',
  badgeName: 'Python 3',
  description: 'Solve problems using Python. Master Pythonic algorithms, clean syntax, and rapid problem solving.',
  monacoLanguage: 'python',
  runnerLanguage: 'python',
  get belts() {
    return buildBelts()
  },
}
