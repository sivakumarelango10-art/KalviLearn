import problemsData from '../problems.json'
import { LanguageCurriculum, LanguageBelt, LanguageProblem } from './types'

const cppBeltsConfig = [
  {
    order: 1,
    name: 'C++ Belt 1',
    title: 'C++ Core Syntax & Fast I/O',
    description: 'Master cin/cout, fast I/O optimizations, fundamental types, operators, and branching.',
    color: '#00599C',
  },
  {
    order: 2,
    name: 'C++ Belt 2',
    title: 'Loops & Control Flow',
    description: 'Master for, while, do-while loops, nested loops, and loop control statements in C++.',
    color: '#10B981',
  },
  {
    order: 3,
    name: 'C++ Belt 3',
    title: 'Arrays, Vectors & Strings',
    description: 'Master std::vector, C-arrays, string operations, indexing, and array algorithms in C++.',
    color: '#8B5CF6',
  },
]

const belts: LanguageBelt[] = problemsData.map((rawBelt) => {
  const meta = cppBeltsConfig.find((b) => b.order === rawBelt.order) || {
    order: rawBelt.order,
    name: `C++ Belt ${rawBelt.order}`,
    title: rawBelt.title,
    description: rawBelt.description,
    color: rawBelt.color,
  }

  const problems: LanguageProblem[] = rawBelt.problems.map((p) => ({
    id: `cpp_${p.slug}`,
    slug: p.slug,
    language: 'cpp',
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
    explanation: (p as any).explanation,
    difficulty: p.difficulty as 'Easy' | 'Medium' | 'Hard',
    xp: 50,
    starterCode:
      p.starterCodes?.cpp ||
      '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    return 0;\n}\n',
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

export const cppCurriculum: LanguageCurriculum = {
  language: 'cpp',
  name: 'C++',
  badgeName: 'C++ (g++)',
  description: 'Solve problems using C++. Master fast execution, Standard Template Library (STL), and memory efficiency.',
  monacoLanguage: 'cpp',
  runnerLanguage: 'cpp',
  belts,
}
