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
        id: `cpp_${p.slug}`,
        slug: p.slug,
        legacySlug: (p as any).legacySlug,
        learningUnitId: (p as any).learningUnitId || (p as any).id,
        language: 'cpp',
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
          p.starterCodes?.cpp ||
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}\n',
        testCases: p.testCases || [],
      }))

    return {
      order: rawBelt.order,
      name: meta.name,
      title: meta.title,
      description: meta.description,
      color: meta.color,
      language: 'cpp',
      problems,
    }
  })
}

export const cppCurriculum: LanguageCurriculum = {
  language: 'cpp',
  name: 'C++',
  badgeName: 'C++ 20',
  description: 'Write lightning-fast, high-performance competitive programming solutions with standard C++.',
  monacoLanguage: 'cpp',
  runnerLanguage: 'cpp',
  get belts() {
    return buildBelts()
  },
}
