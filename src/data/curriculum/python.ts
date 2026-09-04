import problemsData from '../problems.json'
import { LanguageCurriculum, LanguageBelt, LanguageProblem } from './types'

const pythonBeltsConfig = [
  {
    order: 1,
    name: 'Python Belt 1',
    title: 'Python Foundations',
    description: 'Master Python fundamentals, print, input, variables, operators, and conditionals.',
    color: '#3B82F6',
  },
  {
    order: 2,
    name: 'Python Belt 2',
    title: 'Loops & Control Flow in Python',
    description: 'Master while loops, for-in loops, range(), break/continue, and Pythonic iteration.',
    color: '#10B981',
  },
  {
    order: 3,
    name: 'Python Belt 3',
    title: 'Lists & String Manipulation',
    description: 'Master Python lists, string methods, slicing, traversal, and algorithmic transformations.',
    color: '#8B5CF6',
  },
]

const belts: LanguageBelt[] = problemsData.map((rawBelt) => {
  const meta = pythonBeltsConfig.find((b) => b.order === rawBelt.order) || {
    order: rawBelt.order,
    name: `Python Belt ${rawBelt.order}`,
    title: rawBelt.title,
    description: rawBelt.description,
    color: rawBelt.color,
  }

  const problems: LanguageProblem[] = rawBelt.problems.map((p) => ({
    id: `python_${p.slug}`,
    slug: p.slug,
    language: 'python',
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

export const pythonCurriculum: LanguageCurriculum = {
  language: 'python',
  name: 'Python',
  badgeName: 'Python 3',
  description: 'Solve problems using Python. Master Pythonic algorithms, clean syntax, and rapid problem solving.',
  monacoLanguage: 'python',
  runnerLanguage: 'python',
  belts,
}
