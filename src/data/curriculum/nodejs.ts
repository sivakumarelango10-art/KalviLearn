import problemsData from '../problems.json'
import { LanguageCurriculum, LanguageBelt, LanguageProblem } from './types'

const nodejsBeltsConfig = [
  {
    order: 1,
    name: 'Node.js Belt 1',
    title: 'JavaScript Core Foundations',
    description: 'Master Node.js I/O with fs.readFileSync, let/const, types, operators, and conditionals.',
    color: '#539E43',
  },
  {
    order: 2,
    name: 'Node.js Belt 2',
    title: 'Loops & Iterative Control',
    description: 'Master for/while loops, control flow patterns, and algorithmic loops in Node.js.',
    color: '#10B981',
  },
  {
    order: 3,
    name: 'Node.js Belt 3',
    title: 'Arrays & String Processing',
    description: 'Master JavaScript arrays, string methods, parsing, and data manipulation in Node.js.',
    color: '#8B5CF6',
  },
]

const belts: LanguageBelt[] = problemsData.map((rawBelt) => {
  const meta = nodejsBeltsConfig.find((b) => b.order === rawBelt.order) || {
    order: rawBelt.order,
    name: `Node.js Belt ${rawBelt.order}`,
    title: rawBelt.title,
    description: rawBelt.description,
    color: rawBelt.color,
  }

  const problems: LanguageProblem[] = rawBelt.problems.map((p) => ({
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
    title: p.title,
    description: p.description,
    inputFormat: p.inputFormat,
    outputFormat: p.outputFormat,
    explanation: (p as { explanation?: string }).explanation,
    difficulty: p.difficulty as 'Easy' | 'Medium' | 'Hard',
    xp: 50,
    starterCode:
      p.starterCodes?.javascript ||
      "const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf-8').trim();\n    if (!input) return;\n}\n\nsolve();\n",
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

export const nodejsCurriculum: LanguageCurriculum = {
  language: 'nodejs',
  name: 'Node.js',
  badgeName: 'Node.js (JavaScript)',
  description: 'Solve problems using Node.js. Master JavaScript runtime concepts, standard stream I/O, and modern syntax.',
  monacoLanguage: 'javascript',
  runnerLanguage: 'javascript',
  belts,
}
