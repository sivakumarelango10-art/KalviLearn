import type { LucideIcon } from 'lucide-react'

export interface CodingExample {
  input: string
  output: string
  explanation: string
}

export interface JudgeTestCase {
  testIndex: number
  input: string
  expectedOutput: string
  isHidden: boolean
}

export interface TestCaseMeta {
  visibleCount: number
  hiddenCount: number
  totalCount: number
}

export interface CodingQuestion {
  id: string
  slug: string
  globalNumber: number
  topicId: string
  topicTitle: string
  title: string
  problemStatement: string
  inputFormat: string
  outputFormat: string
  constraints: string
  examples: CodingExample[]
  visibleTests?: Array<{
    testIndex: number
    input: string
    expectedOutput: string
  }>
  testCaseMeta?: TestCaseMeta
  difficulty?: 'Easy' | 'Medium' | 'Hard'
}

export interface CodingQuestionSummary {
  id: string
  slug: string
  topicId: string
  title: string
  preview: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
}

export interface CodingTopic {
  id: string
  title: string
  sourceTitle: string
  description: string
  icon: LucideIcon
}

export interface ServerQuestionTestCase {
  slug: string
  title: string
  testCases: JudgeTestCase[]
}
