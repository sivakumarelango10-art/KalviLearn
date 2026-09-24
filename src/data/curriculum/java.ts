import problemsData from '../problems.json'
import { LanguageCurriculum, LanguageBelt, LanguageProblem } from './types'

const javaBeltsConfig = [
  {
    order: 1,
    name: 'Java Belt 1',
    title: 'Java Foundations & Scanner I/O',
    description: 'Master Java class structure, Scanner standard input, primitives, operators, and if-else logic.',
    color: '#E76F00',
  },
  {
    order: 2,
    name: 'Java Belt 2',
    title: 'Control Structures & Loops',
    description: 'Master for loops, while loops, nested control flow, and iterative problem solving in Java.',
    color: '#10B981',
  },
  {
    order: 3,
    name: 'Java Belt 3',
    title: 'Arrays & String Operations',
    description: 'Master 1D/2D arrays, String manipulation, character inspection, and array algorithms in Java.',
    color: '#8B5CF6',
  },
]

const belts: LanguageBelt[] = problemsData.map((rawBelt) => {
  const meta = javaBeltsConfig.find((b) => b.order === rawBelt.order) || {
    order: rawBelt.order,
    name: `Java Belt ${rawBelt.order}`,
    title: rawBelt.title,
    description: rawBelt.description,
    color: rawBelt.color,
  }

  const problems: LanguageProblem[] = rawBelt.problems.map((p) => ({
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
    title: p.title,
    description: p.description,
    inputFormat: p.inputFormat,
    outputFormat: p.outputFormat,
    explanation: (p as { explanation?: string }).explanation,
    difficulty: p.difficulty as 'Easy' | 'Medium' | 'Hard',
    xp: 50,
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

export const javaCurriculum: LanguageCurriculum = {
  language: 'java',
  name: 'Java',
  badgeName: 'Java (OpenJDK)',
  description: 'Solve problems using Java. Master object-oriented principles, robust standard libraries, and high performance.',
  monacoLanguage: 'java',
  runnerLanguage: 'java',
  belts,
}
