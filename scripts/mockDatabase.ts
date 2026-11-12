/**
 * In-Memory Mock Database Adapter for KalviLearn Super Admin Automated Testing
 *
 * Provides a safe, isolated, deterministic environment that verifies:
 * - PostgreSQL physical column casing (users.createdAt vs created_at aliasing)
 * - Table name casing (Submission vs submissions)
 * - Row-level cascade deletions and relational bindings
 * - Zero network dependencies (runs fully in sandbox without production credentials)
 */

import curriculumData from '../src/data/curriculum.json'
import problemsData from '../src/data/problems.json'

export interface MockDbState {
  campuses: any[]
  users: any[]
  mentors: any[]
  content_managers: any[]
  students: any[]
  mentor_students: any[]
  admin_audit_logs: any[]
  Submission: any[]
  UserProgress: any[]
  Problem: any[]
  TestCase: any[]
  ProblemExample: any[]
  ProblemTestCase: any[]
  ProblemStarterCode: any[]
  ProblemRevision: any[]
  Module: any[]
  LearningUnit: any[]
  Belt: any[]
  auth_users: any[]
  content_manager_assignments: any[]
  content_manager_permissions: any[]
  content_manager_scopes: any[]
  content_audit_logs: any[]
}

export function createInitialMockDb(): MockDbState {
  const defaultCampusId = '7d1b6bfc-e0d7-4fc6-b813-71cceb100ff7'
  const superAdminUserId = '00000000-0000-0000-0000-000000000001'

  const seedProblems = [
    {
      id: 'mock-prob-1',
      beltId: 'mock-belt-1',
      order: 1,
      slug: 'two-sum-problem',
      title: 'Two Sum',
      difficulty: 'Easy',
      subdivision: '1D Arrays / Lists',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
      constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
      inputFormat: 'First line contains integer n and target. Second line contains n space-separated integers.',
      outputFormat: 'Print the two zero-based indices separated by a space.',
      explanation: 'nums[0] + nums[1] = 2 + 7 = 9, so return [0, 1].',
      examples: [
        { label: 'Example 1', input: '4 9\n2 7 11 15', output: '0 1', explanation: '2 + 7 = 9' },
        { label: 'Example 2', input: '3 6\n3 2 4', output: '1 2', explanation: '2 + 4 = 6' },
      ],
      starterCodes: {
        python: 'import sys\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()',
        javascript: 'const fs = require("fs");\nfunction solve() {}\nsolve();',
        cpp: '#include <iostream>\nusing namespace std;\nint main() { return 0; }',
        java: 'import java.util.Scanner;\npublic class Main { public static void main(String[] args) {} }',
      },
      isActive: true,
      createdAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
    },
    {
      id: 'mock-prob-2',
      beltId: 'mock-belt-1',
      order: 2,
      slug: 'palindrome-check',
      title: 'Palindrome Check',
      difficulty: 'Easy',
      subdivision: 'Strings as Arrays',
      description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
      constraints: '1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.',
      inputFormat: 'A single line containing the string s.',
      outputFormat: 'Print "true" if palindrome, otherwise "false".',
      explanation: '"amanaplanacanalpanama" is a palindrome.',
      examples: [
        { label: 'Example 1', input: 'A man, a plan, a canal: Panama', output: 'true', explanation: 'Reads the same backward.' },
        { label: 'Example 2', input: 'race a car', output: 'false', explanation: 'Does not read the same backward.' },
      ],
      starterCodes: {
        python: 'import sys\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()',
        javascript: 'const fs = require("fs");\nfunction solve() {}\nsolve();',
        cpp: '#include <iostream>\nusing namespace std;\nint main() { return 0; }',
        java: 'import java.util.Scanner;\npublic class Main { public static void main(String[] args) {} }',
      },
      isActive: true,
      createdAt: new Date('2026-09-02T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2026-09-02T00:00:00.000Z').toISOString(),
    },
    {
      id: 'mock-prob-3',
      beltId: 'mock-belt-2',
      order: 1,
      slug: 'search-2d-matrix',
      title: 'Search a 2D Matrix',
      difficulty: 'Medium',
      subdivision: '2D Arrays / Matrices',
      description: 'You are given an m x n integer matrix with the following two properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row.',
      constraints: 'm == matrix.length\nn == matrix[i].length\n1 <= m, n <= 100\n-10^4 <= matrix[i][j], target <= 10^4',
      inputFormat: 'First line contains m, n, target. Next m lines each contain n integers.',
      outputFormat: 'Print "true" if target found, otherwise "false".',
      explanation: 'Search finds 3 at row 0 col 1.',
      examples: [
        { label: 'Example 1', input: '3 4 3\n1 3 5 7\n10 11 16 20\n23 30 34 60', output: 'true', explanation: '3 is in the matrix' },
        { label: 'Example 2', input: '3 4 13\n1 3 5 7\n10 11 16 20\n23 30 34 60', output: 'false', explanation: '13 is not in matrix' },
      ],
      starterCodes: {
        python: 'import sys\ndef solve():\n    pass\nif __name__ == "__main__":\n    solve()',
        javascript: 'const fs = require("fs");\nfunction solve() {}\nsolve();',
        cpp: '#include <iostream>\nusing namespace std;\nint main() { return 0; }',
        java: 'import java.util.Scanner;\npublic class Main { public static void main(String[] args) {} }',
      },
      isActive: true,
      createdAt: new Date('2026-09-03T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2026-09-03T00:00:00.000Z').toISOString(),
    },
    {
      id: 'mock-prob-4',
      slug: 'longest-common-subsequence',
      title: 'Longest Common Subsequence',
      difficulty: 'Hard',
      subdivision: 'Conditionals / Control Flow',
      description: 'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.',
      constraints: '1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters.',
      inputFormat: 'Two lines, text1 and text2.',
      outputFormat: 'Length of the LCS.',
      explanation: 'The longest common subsequence is "ace" and its length is 3.',
      examples: [
        { label: 'Example 1', input: 'abcde\nace', output: '3', explanation: 'LCS is "ace"' },
      ],
      starterCodes: {
        python: 'import sys\ndef solve():\n    pass\nif __name__ == "__main__":\n    solve()',
        javascript: 'const fs = require("fs");\nfunction solve() {}\nsolve();',
        cpp: '#include <iostream>\nusing namespace std;\nint main() { return 0; }',
        java: 'import java.util.Scanner;\npublic class Main { public static void main(String[] args) {} }',
      },
      isActive: false, // DRAFT
      createdAt: new Date('2026-09-04T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2026-09-04T00:00:00.000Z').toISOString(),
    },
    {
      id: 'mock-prob-5',
      slug: 'fibonacci-number',
      title: 'Fibonacci Number',
      difficulty: 'Easy',
      subdivision: 'Loops',
      description: 'The Fibonacci numbers, commonly denoted F(n) form a sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.',
      constraints: '0 <= n <= 30',
      inputFormat: 'An integer n.',
      outputFormat: 'Print F(n).',
      explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.',
      examples: [
        { label: 'Example 1', input: '2', output: '1', explanation: 'F(2) = 1' },
        { label: 'Example 2', input: '3', output: '2', explanation: 'F(3) = 2' },
      ],
      starterCodes: {
        python: 'import sys\ndef solve():\n    pass\nif __name__ == "__main__":\n    solve()',
        javascript: 'const fs = require("fs");\nfunction solve() {}\nsolve();',
        cpp: '#include <iostream>\nusing namespace std;\nint main() { return 0; }',
        java: 'import java.util.Scanner;\npublic class Main { public static void main(String[] args) {} }',
      },
      isActive: true,
      createdAt: new Date('2026-09-05T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2026-09-05T00:00:00.000Z').toISOString(),
    },
  ]

  const seedTestCases = [
    // Two Sum cases (3 visible, 2 hidden)
    { id: 'mock-tc-1', problemId: 'mock-prob-1', testIndex: 1, input: '4 9\n2 7 11 15', expectedOutput: '0 1', isHidden: false },
    { id: 'mock-tc-2', problemId: 'mock-prob-1', testIndex: 2, input: '3 6\n3 2 4', expectedOutput: '1 2', isHidden: false },
    { id: 'mock-tc-3', problemId: 'mock-prob-1', testIndex: 3, input: '2 6\n3 3', expectedOutput: '0 1', isHidden: false },
    { id: 'mock-tc-4', problemId: 'mock-prob-1', testIndex: 4, input: '5 10\n1 2 3 4 7', expectedOutput: '2 4', isHidden: true },
    { id: 'mock-tc-5', problemId: 'mock-prob-1', testIndex: 5, input: '4 0\n-3 4 3 90', expectedOutput: '0 2', isHidden: true },

    // Palindrome Check cases
    { id: 'mock-tc-6', problemId: 'mock-prob-2', testIndex: 1, input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', isHidden: false },
    { id: 'mock-tc-7', problemId: 'mock-prob-2', testIndex: 2, input: 'race a car', expectedOutput: 'false', isHidden: false },
    { id: 'mock-tc-8', problemId: 'mock-prob-2', testIndex: 3, input: ' ', expectedOutput: 'true', isHidden: false },
    { id: 'mock-tc-9', problemId: 'mock-prob-2', testIndex: 4, input: '0P', expectedOutput: 'false', isHidden: true },
    { id: 'mock-tc-10', problemId: 'mock-prob-2', testIndex: 5, input: 'ab_a', expectedOutput: 'true', isHidden: true },

    // Search 2D Matrix cases
    { id: 'mock-tc-11', problemId: 'mock-prob-3', testIndex: 1, input: '3 4 3\n1 3 5 7\n10 11 16 20\n23 30 34 60', expectedOutput: 'true', isHidden: false },
    { id: 'mock-tc-12', problemId: 'mock-prob-3', testIndex: 2, input: '3 4 13\n1 3 5 7\n10 11 16 20\n23 30 34 60', expectedOutput: 'false', isHidden: false },
    { id: 'mock-tc-13', problemId: 'mock-prob-3', testIndex: 3, input: '1 1 0\n0', expectedOutput: 'true', isHidden: false },
    { id: 'mock-tc-14', problemId: 'mock-prob-3', testIndex: 4, input: '1 2 1\n1 2', expectedOutput: 'true', isHidden: true },
    { id: 'mock-tc-15', problemId: 'mock-prob-3', testIndex: 5, input: '2 2 4\n1 2\n3 5', expectedOutput: 'false', isHidden: true },

    // LCS cases
    { id: 'mock-tc-16', problemId: 'mock-prob-4', testIndex: 1, input: 'abcde\nace', expectedOutput: '3', isHidden: false },
    { id: 'mock-tc-17', problemId: 'mock-prob-4', testIndex: 2, input: 'abc\nabc', expectedOutput: '3', isHidden: false },
    { id: 'mock-tc-18', problemId: 'mock-prob-4', testIndex: 3, input: 'abc\ndef', expectedOutput: '0', isHidden: false },
    { id: 'mock-tc-19', problemId: 'mock-prob-4', testIndex: 4, input: 'ezupkr\nubmrapg', expectedOutput: '2', isHidden: true },

    // Fibonacci cases
    { id: 'mock-tc-20', problemId: 'mock-prob-5', testIndex: 1, input: '2', expectedOutput: '1', isHidden: false },
    { id: 'mock-tc-21', problemId: 'mock-prob-5', testIndex: 2, input: '3', expectedOutput: '2', isHidden: false },
    { id: 'mock-tc-22', problemId: 'mock-prob-5', testIndex: 3, input: '4', expectedOutput: '3', isHidden: false },
    { id: 'mock-tc-23', problemId: 'mock-prob-5', testIndex: 4, input: '0', expectedOutput: '0', isHidden: true },
    { id: 'mock-tc-24', problemId: 'mock-prob-5', testIndex: 5, input: '10', expectedOutput: '55', isHidden: true },
  ]

  return {
    campuses: [
      {
        id: defaultCampusId,
        code: 'KALVIUM-MAIN',
        name: 'Kalvium Technology Campus',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        country: 'India',
        status: 'ACTIVE',
        manager_id: null,
        created_at: new Date('2026-09-01T00:00:00.000Z').toISOString(),
        updated_at: new Date('2026-09-01T00:00:00.000Z').toISOString(),
      },
    ],
    users: [
      {
        id: superAdminUserId,
        email: 'sgjitbros@gmail.com',
        name: 'Super Administrator',
        role: 'SUPERADMIN',
        status: 'ACTIVE',
        campus_id: defaultCampusId,
        createdAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
        updatedAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
        mentorId: null,
        authUid: 'auth-superadmin-uid-1',
      },
      {
        id: '00000000-0000-4000-a000-000000000004',
        email: 'synthetic.campus@kalvilearn.test',
        name: 'Automated Test Manager',
        role: 'CAMPUS_MANAGER',
        status: 'ACTIVE',
        campus_id: defaultCampusId,
        createdAt: new Date('2026-09-02T00:00:00.000Z').toISOString(),
        updatedAt: new Date('2026-09-02T00:00:00.000Z').toISOString(),
        mentorId: null,
        authUid: null,
      },
    ],
    mentors: [],
    content_managers: [],
    students: [],
    mentor_students: [],
    admin_audit_logs: [],
    Submission: [],
    UserProgress: [],
    Problem: seedProblems.map((p) => ({
      ...p,
      learningUnitId: p.learningUnitId || null,
      status: p.isActive === false ? 'DRAFT' : 'PUBLISHED',
      timeLimitMs: 2000,
      memoryLimitMb: 256,
      createdBy: superAdminUserId,
      updatedBy: superAdminUserId,
    })),
    TestCase: seedTestCases,
    ProblemExample: seedProblems.flatMap((p) =>
      (p.examples || []).map((ex: any, idx: number) => ({
        id: `mock-pe-${p.id}-${idx + 1}`,
        problemId: p.id,
        input: ex.input,
        expectedOutput: ex.output,
        explanation: ex.explanation || null,
        displayOrder: idx + 1,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }))
    ),
    ProblemTestCase: seedTestCases.map((tc, idx) => ({
      id: tc.id,
      problemId: tc.problemId,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      isHidden: tc.isHidden,
      displayOrder: tc.testIndex || idx + 1,
      points: 10,
      explanation: (tc as any).explanation || null,
      createdAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
    })),
    ProblemStarterCode: seedProblems.flatMap((p) =>
      Object.entries(p.starterCodes || {}).map(([lang, code]) => ({
        id: `mock-psc-${p.id}-${lang}`,
        problemId: p.id,
        language: lang,
        code,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }))
    ),
    ProblemRevision: seedProblems.map((p) => ({
      id: `mock-rev-${p.id}-1`,
      problemId: p.id,
      version: 1,
      snapshot: { ...p },
      changedBy: superAdminUserId,
      changeSummary: 'Initial baseline revision',
      createdAt: p.createdAt,
    })),
    Module: (curriculumData as any[]).map((m, idx) => ({
      id: `mock-module-${m.order || idx + 1}`,
      order: m.order || idx + 1,
      title: m.title,
      description: m.description || '',
      isActive: true,
      status: 'PUBLISHED',
      createdAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
    })),
    LearningUnit: (curriculumData as any[]).flatMap((m, mIdx) => {
      const modId = `mock-module-${m.order || mIdx + 1}`
      return (m.learningUnits || []).map((lu: any, luIdx: number) => ({
        id: `mock-unit-${m.order || mIdx + 1}-${lu.order || luIdx + 1}`,
        moduleId: modId,
        order: lu.order || luIdx + 1,
        title: lu.title,
        concept: lu.concept || lu.content || '',
        content: lu.content || lu.concept || '',
        approach: lu.approach || '',
        codeSnippets: lu.codeSnippets || {},
        codingQuestion: lu.codingQuestion || '',
        inputFormat: lu.inputFormat || '',
        outputFormat: lu.outputFormat || '',
        examples: lu.examples || [],
        readingTimeMinutes: lu.readingTimeMinutes || 2,
        isActive: true,
        status: 'PUBLISHED',
        createdAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
        updatedAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
      }))
    }),
    Belt: (problemsData as any[]).map((b, idx) => ({
      id: `mock-belt-${b.order || idx + 1}`,
      order: b.order || idx + 1,
      name: b.belt || `Belt ${b.order || idx + 1}`,
      title: b.title,
      description: b.description || '',
      color: b.color || '#EAB308',
      createdAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2026-09-01T00:00:00.000Z').toISOString(),
    })),
    auth_users: [
      { id: 'auth-superadmin-uid-1', email: 'sgjitbros@gmail.com' },
    ],
    content_manager_assignments: [],
    content_manager_permissions: [],
    content_manager_scopes: [],
    content_audit_logs: [],
  }
}

export function installMockSupabaseServer(supabaseServerInstance: any) {
  supabaseServerInstance.__isMocked = true
  const db = createInitialMockDb()
  ;(db as any).__authControl = { failInvite: false, disableAdmin: false }

  supabaseServerInstance.auth = {
    admin: {
      async listUsers(params?: { page?: number; perPage?: number }) {
        if ((db as any).__authControl.disableAdmin) {
          return { data: null, error: { message: 'Auth admin API unavailable' } }
        }
        const page = Math.max(1, params?.page || 1)
        const perPage = Math.max(1, params?.perPage || 1000)
        const slice = db.auth_users.slice((page - 1) * perPage, page * perPage)
        return { data: { users: slice }, error: null }
      },
      async inviteUserByEmail(email: string, options?: { data?: Record<string, unknown> }) {
        if ((db as any).__authControl.disableAdmin) {
          return { data: { user: null }, error: { message: 'Auth admin API unavailable', status: 503 } }
        }
        if ((db as any).__authControl.failInvite) {
          return { data: { user: null }, error: { message: 'Simulated SMTP invite failure', status: 500 } }
        }
        const normalized = String(email || '').trim().toLowerCase()
        if (db.auth_users.some((u: any) => String(u.email || '').trim().toLowerCase() === normalized)) {
          return {
            data: { user: null },
            error: { message: 'A user with this email address has already been registered', code: 'email_exists', status: 422 },
          }
        }
        const created = {
          id: `auth-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          email: normalized,
          user_metadata: options?.data || {},
          invited_at: new Date().toISOString(),
        }
        db.auth_users.push(created)
        return { data: { user: created }, error: null }
      },
      async deleteUser(uid: string) {
        db.auth_users = db.auth_users.filter((u: any) => u.id !== uid)
        return { data: { user: null }, error: null }
      },
    },
  }

  supabaseServerInstance.rpc = async function (fnName: string, args: any) {
    if (fnName === 'save_question_atomic') {
      const p_id = args.p_id
      const existingIdx = db.Problem.findIndex((p: any) => p.id === p_id)
      const probRecord = {
        id: p_id,
        slug: args.p_slug,
        title: args.p_title,
        difficulty: args.p_difficulty,
        status: args.p_status,
        isActive: args.p_is_active,
        order: args.p_order,
        learningUnitId: args.p_learning_unit_id,
        beltId: args.p_belt_id,
        subdivision: args.p_subdivision,
        description: args.p_description,
        inputFormat: args.p_input_format,
        outputFormat: args.p_output_format,
        explanation: args.p_explanation,
        timeLimitMs: args.p_time_limit_ms,
        memoryLimitMb: args.p_memory_limit_mb,
        examples: args.p_examples,
        starterCodes: args.p_starter_codes,
        updatedBy: args.p_admin_id,
        updatedAt: new Date().toISOString(),
      }
      if (existingIdx >= 0) {
        db.Problem[existingIdx] = { ...db.Problem[existingIdx], ...probRecord }
      } else {
        db.Problem.push({ ...probRecord, createdAt: new Date().toISOString() })
      }

      db.ProblemExample = db.ProblemExample.filter((pe: any) => pe.problemId !== p_id)
      if (Array.isArray(args.p_examples)) {
        args.p_examples.forEach((ex: any, idx: number) => {
          db.ProblemExample.push({
            id: 'pe-' + p_id + '-' + (idx + 1),
            problemId: p_id,
            input: ex.input || '',
            expectedOutput: ex.output || ex.expectedOutput || '',
            explanation: ex.explanation || null,
            displayOrder: idx + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        })
      }

      db.ProblemStarterCode = db.ProblemStarterCode.filter((psc: any) => psc.problemId !== p_id)
      if (args.p_starter_codes && typeof args.p_starter_codes === 'object') {
        Object.entries(args.p_starter_codes).forEach(([lang, code]) => {
          db.ProblemStarterCode.push({
            id: 'psc-' + p_id + '-' + lang,
            problemId: p_id,
            language: lang,
            code: String(code),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        })
      }

      db.ProblemTestCase = db.ProblemTestCase.filter((ptc: any) => ptc.problemId !== p_id)
      db.TestCase = db.TestCase.filter((tc: any) => tc.problemId !== p_id)
      if (Array.isArray(args.p_test_cases)) {
        args.p_test_cases.forEach((tc: any, idx: number) => {
          db.ProblemTestCase.push({
            id: tc.id || ('ptc-' + p_id + '-' + (idx + 1)),
            problemId: p_id,
            input: tc.input || '',
            expectedOutput: tc.expectedOutput || '',
            isHidden: Boolean(tc.isHidden),
            displayOrder: tc.displayOrder || tc.testIndex || idx + 1,
            points: tc.points ?? 10,
            explanation: tc.explanation || tc.description || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          db.TestCase.push({
            id: 'tc-' + p_id + '-' + (idx + 1),
            problemId: p_id,
            testIndex: tc.testIndex || tc.displayOrder || idx + 1,
            input: tc.input || '',
            expectedOutput: tc.expectedOutput || '',
            explanation: tc.explanation || tc.description || null,
            isHidden: Boolean(tc.isHidden),
          })
        })
      }

      const existingRevs = db.ProblemRevision.filter((r: any) => r.problemId === p_id)
      const nextVer = existingRevs.reduce((max, r) => Math.max(max, r.version || 0), 0) + 1
      db.ProblemRevision.push({
        id: 'rev-' + p_id + '-' + nextVer,
        problemId: p_id,
        version: nextVer,
        snapshot: {
          problem: probRecord,
          examples: args.p_examples || [],
          starterCodes: args.p_starter_codes || {},
          testCases: args.p_test_cases || [],
        },
        changedBy: args.p_admin_id,
        changeSummary: args.p_change_summary,
        createdAt: new Date().toISOString(),
      })

      return { data: { success: true, problemId: p_id, version: nextVer }, error: null }
    }
    return { data: null, error: { code: 'PGRST202', message: 'Could not find function ' + fnName } }
  }

  supabaseServerInstance.from = function (tableName: string) {
    if (tableName === 'submissions') {
      // Simulate real PostgreSQL/PostgREST error for lowercase table name
      return {
        delete() {
        if (tableName === 'content_audit_logs') {
          const imErr = { code: 'P0001', message: 'content_audit_logs is strictly append-only; DELETE operations are forbidden.' }
          const errB: any = { eq() { return errB }, then(f: any, r: any) { return Promise.resolve({ data: null, error: imErr }).then(f, r) } }
          return errB
        }
          return {
            eq() {
              return Promise.resolve({
                data: null,
                error: {
                  code: 'PGRST205',
                  message: "Could not find the table 'public.submissions' in the schema cache. Perhaps you meant 'public.Submission'",
                },
              })
            },
          }
        },
      }
    }

    let targetKey = tableName
    if (tableName === 'problems' || tableName === 'questions') targetKey = 'Problem'
    if (tableName === 'test_cases' || tableName === 'testcases') targetKey = 'TestCase'
    if (tableName === 'problem_examples' || tableName === 'ProblemExample' || tableName === 'problem_example') targetKey = 'ProblemExample'
    if (tableName === 'problem_test_cases' || tableName === 'ProblemTestCase' || tableName === 'problem_test_case') targetKey = 'ProblemTestCase'
    if (tableName === 'problem_starter_codes' || tableName === 'ProblemStarterCode' || tableName === 'problem_starter_code') targetKey = 'ProblemStarterCode'
    if (tableName === 'problem_revisions' || tableName === 'ProblemRevision' || tableName === 'problem_revision') targetKey = 'ProblemRevision'
    if (tableName === 'modules' || tableName === 'curriculum_modules') targetKey = 'Module'
    if (tableName === 'learning_units' || tableName === 'learningunits') targetKey = 'LearningUnit'
    if (tableName === 'belts') targetKey = 'Belt'

    if (!(targetKey in db)) {
      throw new Error(`Table ${tableName} not defined in MockDatabase`)
    }

    const tableRows = (db as any)[targetKey] as any[]

    let filters: Array<(row: any) => boolean> = []
    let selectedColumns: string | null = null
    let orderCol: string | null = null
    let orderAsc = true
    let rangeStart = 0
    let rangeEnd = Infinity
    let limitCount = Infinity
    let countExact = false

    const queryBuilder: any = {
      select(cols?: string, opts?: { count?: 'exact' }) {
        selectedColumns = cols || '*'
        if (opts?.count === 'exact') countExact = true

        // Check for users.created_at failure
        if (tableName === 'users' && cols) {
          const rawCols = cols.split(',').map((c) => c.trim())
          for (const c of rawCols) {
            if (c === 'created_at') {
              return Promise.resolve({
                data: null,
                count: null,
                error: {
                  code: '42703',
                  message: 'column users.created_at does not exist',
                },
              })
            }
            if (c === 'updated_at') {
              return Promise.resolve({
                data: null,
                count: null,
                error: {
                  code: '42703',
                  message: 'column users.updated_at does not exist',
                },
              })
            }
          }
        }
        return queryBuilder
      },

      ilike(col: string, val: any) {
        const needle = String(val ?? '').replace(/%/g, '').toLowerCase()
        filters.push((row) => String(row[col] ?? '').toLowerCase().includes(needle))
        return queryBuilder
      },

      eq(col: string, val: any) {
        filters.push((row) => {
          return String(row[col] ?? '') === String(val ?? '')
        })
        return queryBuilder
      },

      is(col: string, val: any) {
        filters.push((row) => (val === null ? row[col] === null || row[col] === undefined : row[col] === val))
        return queryBuilder
      },

      neq(col: string, val: any) {
        filters.push((row) => String(row[col] ?? '') !== String(val ?? ''))
        return queryBuilder
      },

      in(col: string, vals: any[]) {
        const valSet = new Set(vals.map(String))
        filters.push((row) => valSet.has(String(row[col] ?? '')))
        return queryBuilder
      },

      or(filterExpr: string) {
        // e.g. name.ilike.%search%,email.ilike.%search%
        const parts = filterExpr.split(',').map((p) => p.trim())
        filters.push((row) => {
          return parts.some((p) => {
            const match = p.match(/^(\w+)\.ilike\.%(.*)%$/)
            if (match) {
              const [, col, needle] = match
              const val = String(row[col] || '').toLowerCase()
              return val.includes(needle.toLowerCase())
            }
            return false
          })
        })
        return queryBuilder
      },

      order(col: string, opts?: { ascending?: boolean }) {
        orderCol = col
        orderAsc = opts?.ascending !== false
        return queryBuilder
      },

      range(start: number, end: number) {
        rangeStart = start
        rangeEnd = end
        return queryBuilder
      },

      limit(n: number) {
        limitCount = n
        return queryBuilder
      },

      async single() {
        const res = await queryBuilder.execute()
        if (res.error) return res
        if (!res.data || res.data.length === 0) {
          return { data: null, error: { message: 'Row not found' } }
        }
        return { data: res.data[0], error: null }
      },

      async maybeSingle() {
        const res = await queryBuilder.execute()
        if (res.error) return res
        if (!res.data || res.data.length === 0) {
          return { data: null, error: null }
        }
        return { data: res.data[0], error: null }
      },

      insert(payload: any) {
        const items = Array.isArray(payload) ? payload : [payload]
        const inserted: any[] = []
        let insertError: any = null

        for (const item of items) {
          const row = { ...item }
          if (!row.id) {
            row.id = `mock-${tableName}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
          }

          if (tableName === 'campuses') {
            const exists = tableRows.some((r) => r.code === row.code)
            if (exists) {
              insertError = {
                code: '23505',
                message: `duplicate key value violates unique constraint "campuses_code_key"`,
              }
              break
            }
            row.created_at = row.created_at || new Date().toISOString()
            row.updated_at = row.updated_at || new Date().toISOString()
          }

          if (tableName === 'users') {
            // Physical columns verification
            if ('updated_at' in row) {
              insertError = {
                code: '42703',
                message: 'column users.updated_at does not exist',
              }
              break
            }
            const emailLower = String(row.email || '').trim().toLowerCase()
            if (emailLower && tableRows.some((r) => String(r.email || '').trim().toLowerCase() === emailLower)) {
              insertError = {
                code: '23505',
                message: `duplicate key value violates unique constraint "users_email_key"`,
              }
              break
            }
            row.createdAt = row.createdAt || new Date().toISOString()
            row.updatedAt = row.updatedAt || new Date().toISOString()
          }

          if (tableName === 'content_managers') {
            if (tableRows.some((r) => r.user_id === row.user_id)) {
              insertError = {
                code: '23505',
                message: `duplicate key value violates unique constraint "content_managers_user_id_key"`,
              }
              break
            }
            if (row.manager_code && tableRows.some((r) => r.manager_code === row.manager_code)) {
              insertError = {
                code: '23505',
                message: `duplicate key value violates unique constraint "content_managers_manager_code_key"`,
              }
              break
            }
            const nowIso = new Date().toISOString()
            row.created_at = row.created_at || nowIso
            row.updated_at = row.updated_at || nowIso
          }

          if (tableName === 'content_manager_assignments') {
            const exists = tableRows.some((r) => r.user_id === row.user_id)
            if (exists) {
              insertError = {
                code: '23505',
                message: `duplicate key value violates unique constraint "content_manager_assignments_user_id_key"`,
              }
              break
            }
            const nowIso = new Date().toISOString()
            row.status = row.status || 'ACTIVE'
            row.is_active = row.is_active !== undefined ? row.is_active : true
            row.granted_at = row.granted_at || nowIso
            row.created_at = row.created_at || nowIso
            row.updated_at = row.updated_at || nowIso
          }

          if (targetKey === 'Problem') {
            row.learningUnitId = row.learningUnitId !== undefined ? row.learningUnitId : null
            const exists = tableRows.some((r: any) => r.slug === row.slug)
            if (exists) {
              insertError = {
                code: '23505',
                message: `duplicate key value violates unique constraint "Problem_slug_key"`,
              }
              break
            }
            row.createdAt = row.createdAt || new Date().toISOString()
            row.updatedAt = row.updatedAt || new Date().toISOString()
          }

          if (tableName === 'students' || tableName === 'mentors' || tableName === 'admin_audit_logs') {
            row.created_at = row.created_at || new Date().toISOString()
            row.updated_at = row.updated_at || new Date().toISOString()
          }

          tableRows.push(row)
          inserted.push(row)
        }

        const returnBuilder: any = {
          select(cols?: string) {
            return returnBuilder
          },
          single() {
            if (insertError) {
              return Promise.resolve({ data: null, error: insertError })
            }
            return Promise.resolve({ data: inserted[0], error: null })
          },
          then(onfulfilled: any, onrejected: any) {
            if (insertError) {
              return Promise.resolve({ data: null, error: insertError }).then(onfulfilled, onrejected)
            }
            return Promise.resolve({ data: inserted, error: null }).then(onfulfilled, onrejected)
          },
        }

        return returnBuilder
      },

      update(updates: any) {
        if (tableName === 'content_audit_logs') {
          const imErr = { code: 'P0001', message: 'content_audit_logs is strictly append-only; UPDATE operations are forbidden.' }
          const errB: any = { eq() { return errB }, select() { return errB }, single() { return Promise.resolve({ data: null, error: imErr }) }, then(f: any, r: any) { return Promise.resolve({ data: null, error: imErr }).then(f, r) } }
          return errB
        }
        if (tableName === 'users' && 'updated_at' in updates) {
          const errBuilder: any = {
            select() { return errBuilder },
            single() {
              return Promise.resolve({
                data: null,
                error: { code: '42703', message: 'column users.updated_at does not exist' },
              })
            },
            then(onfulfilled: any, onrejected: any) {
              return Promise.resolve({
                data: null,
                error: { code: '42703', message: 'column users.updated_at does not exist' },
              }).then(onfulfilled, onrejected)
            },
          }
          return errBuilder
        }

        const returnBuilder: any = {
          eq(col: string, val: any) {
            filters.push((row) => String(row[col] ?? '') === String(val ?? ''))
            return returnBuilder
          },
          is(col: string, val: any) {
            filters.push((row) => (val === null ? row[col] === null || row[col] === undefined : row[col] === val))
            return returnBuilder
          },

      neq(col: string, val: any) {
            filters.push((row) => String(row[col] ?? '') !== String(val ?? ''))
            return returnBuilder
          },
          select(cols?: string) {
            return returnBuilder
          },
          single() {
            const matchedIndices: number[] = []
            for (let i = 0; i < tableRows.length; i++) {
              if (filters.every((f) => f(tableRows[i]))) {
                matchedIndices.push(i)
              }
            }
            const updatedRows: any[] = []
            for (const idx of matchedIndices) {
              tableRows[idx] = { ...tableRows[idx], ...updates }
              updatedRows.push(tableRows[idx])
            }
            return Promise.resolve({ data: updatedRows[0] || null, error: null })
          },
          maybeSingle() {
            return this.single()
          },
          then(onfulfilled: any, onrejected: any) {
            const matchedIndices: number[] = []
            for (let i = 0; i < tableRows.length; i++) {
              if (filters.every((f) => f(tableRows[i]))) {
                matchedIndices.push(i)
              }
            }
            const updatedRows: any[] = []
            for (const idx of matchedIndices) {
              tableRows[idx] = { ...tableRows[idx], ...updates }
              updatedRows.push(tableRows[idx])
            }
            return Promise.resolve({ data: updatedRows, error: null }).then(onfulfilled, onrejected)
          },
        }

        return returnBuilder
      },

      upsert(item: any, opts?: { onConflict?: string }) {
        let result: any = item
        const conflictCol = opts?.onConflict || 'id'

        if (conflictCol === 'mentor_id,student_id') {
          const idx = tableRows.findIndex(
            (r) => r.mentor_id === item.mentor_id && r.student_id === item.student_id
          )
          if (idx >= 0) {
            tableRows[idx] = { ...tableRows[idx], ...item, updated_at: new Date().toISOString() }
            result = tableRows[idx]
          } else {
            const row = {
              id: item.id || `mock-ms-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              ...item,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
            tableRows.push(row)
            result = row
          }
        } else if (conflictCol === 'user_id' || conflictCol === 'email' || conflictCol === 'code') {
          const idx = tableRows.findIndex((r) => r[conflictCol] === item[conflictCol])
          if (idx >= 0) {
            tableRows[idx] = { ...tableRows[idx], ...item, updated_at: new Date().toISOString() }
            result = tableRows[idx]
          } else {
            const row = {
              id: item.id || `mock-${tableName}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              ...item,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
            tableRows.push(row)
            result = row
          }
        } else {
          const idx = item.id ? tableRows.findIndex((r) => r.id === item.id) : -1
          if (idx >= 0) {
            tableRows[idx] = { ...tableRows[idx], ...item, updated_at: new Date().toISOString() }
            result = tableRows[idx]
          } else {
            const row = {
              id: item.id || `mock-${tableName}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              ...item,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
            tableRows.push(row)
            result = row
          }
        }

        const upsertBuilder: any = {
          select(cols?: string) {
            return upsertBuilder
          },
          single() {
            return Promise.resolve({ data: result, error: null })
          },
          then(onfulfilled: any, onrejected: any) {
            return Promise.resolve({ data: result, error: null }).then(onfulfilled, onrejected)
          },
        }

        return upsertBuilder
      },

      delete() {
        if (tableName === 'content_audit_logs') {
          const imErr = { code: 'P0001', message: 'content_audit_logs is strictly append-only; DELETE operations are forbidden.' }
          const errB: any = { eq() { return errB }, then(f: any, r: any) { return Promise.resolve({ data: null, error: imErr }).then(f, r) } }
          return errB
        }
        const returnBuilder: any = {
          eq(col: string, val: any) {
            filters.push((r) => String(r[col] ?? '') === String(val ?? ''))
            return returnBuilder
          },
          then(onfulfilled: any, onrejected: any) {
            const keepRows: any[] = []
            const deletedRows: any[] = []

            for (const row of tableRows) {
              if (filters.every((f) => f(row))) {
                deletedRows.push(row)
              } else {
                keepRows.push(row)
              }
            }

            (db as any)[targetKey] = keepRows
            if (targetKey === 'Problem') {
              for (const del of deletedRows) {
                db.TestCase = db.TestCase.filter((tc: any) => tc.problemId !== del.id)
                db.ProblemExample = db.ProblemExample.filter((pe: any) => pe.problemId !== del.id)
                db.ProblemTestCase = db.ProblemTestCase.filter((ptc: any) => ptc.problemId !== del.id)
                db.ProblemStarterCode = db.ProblemStarterCode.filter((psc: any) => psc.problemId !== del.id)
                db.ProblemRevision = db.ProblemRevision.filter((pr: any) => pr.problemId !== del.id)
              }
            }
            return Promise.resolve({ data: deletedRows, error: null }).then(onfulfilled, onrejected)
          },
        }
        return returnBuilder
      },

      async execute() {
        let rows = tableRows.filter((r) => filters.every((f) => f(r)))
        const total = rows.length

        if (orderCol) {
          rows.sort((a, b) => {
            const va = a[orderCol!] ?? ''
            const vb = b[orderCol!] ?? ''
            return orderAsc ? (va > vb ? 1 : -1) : va < vb ? 1 : -1
          })
        }

        if (rangeStart > 0 || rangeEnd < Infinity) {
          rows = rows.slice(rangeStart, rangeEnd + 1)
        } else if (limitCount < Infinity) {
          rows = rows.slice(0, limitCount)
        }

        // Apply column selection and aliasing (e.g. created_at:createdAt)
        const transformed = rows.map((r) => {
          if (!selectedColumns || selectedColumns === '*') return { ...r }

          const result: any = {}
          const colDefs = selectedColumns.split(',').map((c) => c.trim())

          for (const def of colDefs) {
            if (def.includes(':')) {
              const [alias, source] = def.split(':').map((s) => s.trim())
              result[alias] = r[source]
            } else {
              result[def] = r[def]
            }
          }
          return result
        })

        return {
          data: transformed,
          count: countExact ? total : transformed.length,
          error: null,
        }
      },

      then(onfulfilled: any, onrejected: any) {
        return queryBuilder.execute().then(onfulfilled, onrejected)
      },
    }

    return queryBuilder
  }

  return db
}
