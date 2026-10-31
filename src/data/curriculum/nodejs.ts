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
        id: `nodejs_${p.slug}`,
        slug: p.slug,
        legacySlug: (p as any).legacySlug,
        learningUnitId: (p as any).learningUnitId || (p as any).id,
        language: 'nodejs',
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
          p.starterCodes?.javascript ||
          'const fs = require("fs");\n\nfunction solve() {\n    const input = fs.readFileSync(0, "utf-8").trim();\n    if (!input) return;\n}\n\nsolve();\n',
        testCases: p.testCases || [],
      }))

    return {
      order: rawBelt.order,
      name: meta.name,
      title: meta.title,
      description: meta.description,
      color: meta.color,
      language: 'nodejs',
      problems,
    }
  })
}

export const nodejsCurriculum: LanguageCurriculum = {
  language: 'nodejs',
  name: 'Node.js',
  badgeName: 'Node 18',
  description: 'Build fast, scalable algorithms using JavaScript in the Node.js V8 runtime environment.',
  monacoLanguage: 'javascript',
  runnerLanguage: 'javascript',
  get belts() {
    return buildBelts()
  },
}
