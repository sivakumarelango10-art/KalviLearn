export type ProgrammingLanguage = 'python' | 'java' | 'nodejs' | 'cpp'

export interface LanguageProblem {
  id: string
  slug: string
  legacySlug?: string
  learningUnitId?: string
  language: ProgrammingLanguage
  belt: number
  beltName: string
  beltTitle: string
  beltColor: string
  beltDescription: string
  order: number
  title: string
  description: string
  inputFormat: string
  outputFormat: string
  explanation?: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  xp: number
  starterCode: string
  testCases: Array<{
    testIndex: number
    input?: string
    expectedOutput?: string
    isHidden?: boolean
  }>
}

export interface LanguageBelt {
  order: number
  name: string
  title: string
  description: string
  color: string
  language: ProgrammingLanguage
  problems: LanguageProblem[]
}

export interface LanguageCurriculum {
  language: ProgrammingLanguage
  name: string
  badgeName: string
  description: string
  monacoLanguage: 'python' | 'java' | 'javascript' | 'cpp'
  runnerLanguage: 'python' | 'java' | 'javascript' | 'cpp'
  belts: LanguageBelt[]
}
