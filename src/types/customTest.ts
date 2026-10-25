export interface CustomTestCase {
  id: string
  name: string
  input: string
  expectedOutput: string
  actualOutput?: string
  error?: string
  compilationError?: string
  executionTimeMs?: number
  status?: 'matches' | 'mismatches' | 'ran' | 'error'
  lastRunAt?: number
}
