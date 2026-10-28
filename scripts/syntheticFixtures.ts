import { supabase } from '../src/lib/supabase'

export const SYNTHETIC_STUDENT_A = '00000000-0000-0000-0000-000000000001'
export const SYNTHETIC_STUDENT_B = '00000000-0000-0000-0000-000000000002'

export const SYNTHETIC_FIXTURES: Record<
  string,
  {
    userProgress: Array<{ problemId: string; status: string; language: string; Problem?: { slug: string } }>
    submissions: Array<{
      id: string
      problemId: string
      status: string
      passedTests: number
      totalTests: number
      language: string
      Problem?: { slug: string }
    }>
  }
> = {
  [SYNTHETIC_STUDENT_A]: {
    userProgress: [
      {
        problemId: 'a203e926-08d8-47dd-a44b-fd283ab7261b',
        status: 'SOLVED',
        language: 'python',
        Problem: { slug: 'belt-1-q1-arithmetic-check-v1' },
      },
      {
        problemId: 'a203e926-08d8-47dd-a44b-fd283ab7261b',
        status: 'SOLVED',
        language: 'cpp',
        Problem: { slug: 'belt-1-q1-arithmetic-check-v1' },
      },
      {
        problemId: '93a3c3d6-9f20-46e9-93ab-b88874c57f14',
        status: 'SOLVED',
        language: 'java',
        Problem: { slug: 'belt-1-q2-absolute-difference-v1' },
      },
      {
        problemId: '74534869-6c3c-4112-af4c-5b6f00c80c4c',
        status: 'SOLVED',
        language: 'python',
        Problem: { slug: 'belt-3-q5-rotate-left-v1' },
      },
    ],
    submissions: [
      {
        id: 'sub-syn-1',
        problemId: 'a203e926-08d8-47dd-a44b-fd283ab7261b',
        status: 'PASSED',
        passedTests: 10,
        totalTests: 10,
        language: 'python',
        Problem: { slug: 'belt-1-q1-arithmetic-check-v1' },
      },
      {
        id: 'sub-syn-2',
        problemId: 'a203e926-08d8-47dd-a44b-fd283ab7261b',
        status: 'PASSED',
        passedTests: 10,
        totalTests: 10,
        language: 'cpp',
        Problem: { slug: 'belt-1-q1-arithmetic-check-v1' },
      },
      {
        id: 'sub-syn-3',
        problemId: '93a3c3d6-9f20-46e9-93ab-b88874c57f14',
        status: 'PASSED',
        passedTests: 10,
        totalTests: 10,
        language: 'java',
        Problem: { slug: 'belt-1-q2-absolute-difference-v1' },
      },
      {
        id: 'sub-syn-4',
        problemId: '74534869-6c3c-4112-af4c-5b6f00c80c4c',
        status: 'PASSED',
        passedTests: 10,
        totalTests: 10,
        language: 'python',
        Problem: { slug: 'belt-3-q5-rotate-left-v1' },
      },
      {
        id: 'sub-syn-5',
        problemId: '3ba80d35-5363-449b-aae4-1eb182f81970',
        status: 'FAILED',
        passedTests: 3,
        totalTests: 10,
        language: 'python',
        Problem: { slug: 'belt-1-q3-largest-of-three-v1' },
      },
      {
        id: 'sub-syn-6',
        problemId: '3ba80d35-5363-449b-aae4-1eb182f81970',
        status: 'ERROR',
        passedTests: 0,
        totalTests: 10,
        language: 'python',
        Problem: { slug: 'belt-1-q3-largest-of-three-v1' },
      },
    ],
  },
  [SYNTHETIC_STUDENT_B]: {
    userProgress: [],
    submissions: [],
  },
}

let isInterceptorInstalled = false

export function installSyntheticSupabaseInterceptor() {
  if (isInterceptorInstalled) return
  isInterceptorInstalled = true

  const originalFrom = supabase.from.bind(supabase)

  supabase.from = function (table: string): any {
    if (table !== 'UserProgress' && table !== 'Submission') {
      return originalFrom(table)
    }

    let currentRealBuilder: any = originalFrom(table)
    let filteredUserId: string | null = null
    let filteredStatus: string | null = null
    let isCountQuery = false

    const chain: any = {
      select(columns?: string, options?: { count?: string; head?: boolean }) {
        if (options?.count === 'exact' && options?.head === true) {
          isCountQuery = true
        }
        if (typeof currentRealBuilder?.select === 'function') {
          currentRealBuilder = currentRealBuilder.select(columns, options)
        }
        return chain
      },
      eq(col: string, val: any) {
        if (
          col === 'userId' &&
          typeof val === 'string' &&
          (SYNTHETIC_FIXTURES[val] ||
            val.startsWith('00000000-') ||
            val.startsWith('test_') ||
            val.startsWith('mock_') ||
            val.startsWith('unauthorized_') ||
            val.startsWith('fresh_') ||
            val.startsWith('non_existent_'))
        ) {
          filteredUserId = val
        }
        if (col === 'status') {
          filteredStatus = val
        }
        if (typeof currentRealBuilder?.eq === 'function') {
          currentRealBuilder = currentRealBuilder.eq(col, val)
        }
        return chain
      },
      order(col: string, opts: any) {
        if (typeof currentRealBuilder?.order === 'function') {
          currentRealBuilder = currentRealBuilder.order(col, opts)
        }
        return chain
      },
      limit(n: number) {
        if (typeof currentRealBuilder?.limit === 'function') {
          currentRealBuilder = currentRealBuilder.limit(n)
        }
        return chain
      },
      single() {
        if (typeof currentRealBuilder?.single === 'function') {
          currentRealBuilder = currentRealBuilder.single()
        }
        return chain
      },
      then(onfulfilled: any, onrejected: any) {
        if (filteredUserId) {
          const fixture = SYNTHETIC_FIXTURES[filteredUserId] || { userProgress: [], submissions: [] }
          if (table === 'UserProgress') {
            const rows = filteredStatus
              ? fixture.userProgress.filter((r) => r.status === filteredStatus)
              : fixture.userProgress
            return Promise.resolve({ data: rows, error: null, count: rows.length }).then(onfulfilled, onrejected)
          }
          if (table === 'Submission') {
            if (isCountQuery) {
              return Promise.resolve({ data: null, error: null, count: fixture.submissions.length }).then(
                onfulfilled,
                onrejected
              )
            }
            const rows = filteredStatus
              ? fixture.submissions.filter((r) => r.status === filteredStatus)
              : fixture.submissions
            return Promise.resolve({ data: rows, error: null, count: rows.length }).then(onfulfilled, onrejected)
          }
        }
        return currentRealBuilder.then(onfulfilled, onrejected)
      },
    }

    return chain
  }
}
