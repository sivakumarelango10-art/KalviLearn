export interface LearnExample {
  input: string
  output: string
  explanation: string
}

export interface LearnVisibleTest {
  testIndex: number
  input: string
  expectedOutput: string
}

export interface LearnTestCaseMeta {
  visibleCount: number
  hiddenCount: number
  totalCount: number
}

export interface LearnQuestion {
  id: string // e.g. "learn:conditionals-control-flow:largest-of-three"
  slug: string // "largest-of-three"
  topicId: string
  topicSlug: string
  topicTitle: string
  title: string
  order: number
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  bankId?: string
  problemStatement: string
  inputFormat: string
  outputFormat: string
  constraints: string
  examples: LearnExample[]
  visibleTests: LearnVisibleTest[]
  testCaseMeta: LearnTestCaseMeta
  isPythonOnly?: boolean
  pythonOnlyNote?: string
  starterCodes?: Record<string, string>
  inputMode?: 'line' | 'json'
}

export interface LearnQuestionSummary {
  id: string
  slug: string
  topicId: string
  topicSlug: string
  topicTitle: string
  title: string
  order: number
  preview: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
}

