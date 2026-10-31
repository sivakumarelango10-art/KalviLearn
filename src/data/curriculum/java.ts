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
        id: `java_${p.slug}`,
        slug: p.slug,
        legacySlug: (p as any).legacySlug,
        learningUnitId: (p as any).learningUnitId || (p as any).id,
        language: 'java',
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
          p.starterCodes?.java ||
          'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        scanner.close();\n    }\n}\n',
        testCases: p.testCases || [],
      }))

    return {
      order: rawBelt.order,
      name: meta.name,
      title: meta.title,
      description: meta.description,
      color: meta.color,
      language: 'java',
      problems,
    }
  })
}

export const javaCurriculum: LanguageCurriculum = {
  language: 'java',
  name: 'Java',
  badgeName: 'Java 17',
  description: 'Master enterprise-grade object-oriented programming, data structures, and algorithms with Java.',
  monacoLanguage: 'java',
  runnerLanguage: 'java',
  get belts() {
    return buildBelts()
  },
}
