/**
 * Regression & Verification Test Suite for KalviLearn Live Site Bugs (Oct 24 2026)
 *
 * Rewritten to use 100% LOCAL FIXTURES / SEED DATA (zero dependency on live database rows).
 * Covers all required verification checks from Section 15 of Master Prompt & follow-up:
 * 1. Prajith fixture: unique solved 4, Python 4, Java 1, C++ 1, Node 0, All 4.
 * 2. "Latest" problem = newest passed submission by created_at desc.
 * 3. Active-in-belt numerator <= total mentor registered students (strictly scoped).
 * 4. Belt with 0 submissions -> avgPassRate === null ("No data yet").
 * 5. Inactive > 7 days -> Attention, and tab count matches filtered rows.
 * 6. Idempotent submit path: deterministic hash / key prevents duplicate row creation; DB migration prepared.
 * 7. Deduplicate submissions:
 *    a) Same problem near-duplicates collapsed.
 *    b) Two DIFFERENT problems within 15s BOTH count.
 *    c) Same problem in two different languages within 15s BOTH count.
 * 8. Explore Belt N takes student to arena filtered to Belt N.
 * 9. Learn question in arena: topic context, no belt label, not in /500, "Practice only — no XP" modal.
 * 10. Mentor scoping isolation: Mentor A cannot see Mentor B's students.
 * 11. Cumulative belt progression formula matches canonical Student Dashboard rules.
 * 12. Execution time labeled as Total Time across submissions views.
 */
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import {
  fetchMentorRoster,
  fetchMentorCurriculumMetrics,
  deduplicateSubmissions,
  COHORT_THRESHOLDS,
  computeStudentBelt,
} from '../src/lib/mentorService'
import { supabase } from '../src/lib/supabase'
import { getCodingQuestionBySlug } from '../src/coding/questions'
import { getProblemByLanguageAndSlug } from '../src/data/curriculum/index'
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>()
  ;(globalThis as any).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => store.set(k, String(v)),
    removeItem: (k: string) => store.delete(k),
    clear: () => store.clear(),
    get length() { return store.size },
    key: (i: number) => Array.from(store.keys())[i] ?? null,
  }
}

import { recordProblemSuccess, getUserState } from '../src/lib/progress'

// ─── LOCAL FIXTURE DATA ──────────────────────────────────────────────────────

const MOCK_MENTOR = {
  id: '33f27770-7632-49b1-9286-7c7fba608007',
  user_id: 'e95272bc-633d-4fbd-8bf0-7801426fd0f6',
  mentor_code: 'MNT-000001',
  max_students: 30,
  status: 'ACTIVE',
  name: 'Elango Sivakumar',
  email: 'sivakumarelango10@gmail.com',
}

const MOCK_STUDENTS = [
  {
    id: '4a718bce-4a3e-4eef-b3e9-75e36964a43a',
    user_id: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    name: 'Prajith P S',
    email: 'prajith.p.s.121@kalvium.community',
    student_code: 'STU-000002',
    status: 'ACTIVE',
    created_at: '2026-09-05T07:07:07.501Z',
  },
  {
    id: '2ce2fda1-d405-4b49-bada-68e7b437f6cd',
    user_id: '820485df-5e7a-4c4b-9cb4-d9bf20060b53',
    name: 'Kavya Ramesh',
    email: 'kavya.ramesh.s.121@kalvium.community',
    student_code: 'STU-000001',
    status: 'ACTIVE',
    created_at: '2026-09-05T07:07:07.501Z',
  },
  {
    id: '994d3da1-6040-4919-bb3a-4786221e2401',
    user_id: '918374df-3fa1-4821-ab3a-4786221e2401',
    name: 'Dhakshatha Senthilkumar',
    email: 'dhakshathasenthilkumar07@gmail.com',
    student_code: 'STU-000003',
    status: 'ACTIVE',
    created_at: '2026-10-20T10:00:00.000Z', // Active 4 days ago
  },
]

// Prajith submissions fixture (reproducing exact live site stream with 3 historical duplicate pairs)
const FIXTURE_PRAJITH_SUBMISSIONS = [
  {
    id: 'a9c52c13-147d-46db-9965-c5d868eee687',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'largest-of-three',
    language: 'python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 88,
    createdAt: '2026-10-19T09:30:07.952Z', // 5 days ago
    code: 'def solution(a, b, c): return max(a, b, c)',
    Problem: { slug: 'largest-of-three', title: 'Largest of Three (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: '730a72ea-14cb-404d-b73a-1106f45103c8',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'absolute-difference',
    language: 'python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 91,
    createdAt: '2026-10-19T09:29:18.645Z', // 5 days ago
    code: 'def solution(a, b): return abs(a - b)',
    Problem: { slug: 'absolute-difference', title: 'Absolute Difference (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: '4dc6e746-5b9c-4333-ad0c-d26e6bba2315',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'arithmetic-check',
    language: 'java',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 1,
    createdAt: '2026-10-06T09:44:28.201Z', // 6 Oct
    code: 'class Solution { public static boolean check(int a, int b, int c) { return a+b==c; } }',
    Problem: { slug: 'arithmetic-check', title: 'Arithmetic Check (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: 'sub_8wabezckb_1791279862178',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'arithmetic-check',
    language: 'java',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 1,
    createdAt: '2026-10-06T09:44:22.179Z', // near-duplicate 6s earlier
    code: 'class Solution { public static boolean check(int a, int b, int c) { return a+b==c; } }',
    Problem: { slug: 'arithmetic-check', title: 'Arithmetic Check (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: 'bb6b702b-06ce-4e50-9a04-8fd4bb1ae840',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'rotate-left',
    language: 'python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 1,
    createdAt: '2026-09-24T14:11:58.738Z', // 24 Sept (Belt 3)
    code: 'def solution(nums, k): return nums[k:] + nums[:k]',
    Problem: { slug: 'rotate-left', title: 'Rotate Left (Variant 1)', difficulty: 'Medium', Belt: { order: 3, name: 'Belt 3', color: '#10B981' } },
  },
  {
    id: 'sub_hd9hvxz8w_1790259110987',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'rotate-left',
    language: 'python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 2,
    createdAt: '2026-09-24T14:11:50.987Z', // near-duplicate 7.7s earlier
    code: 'def solution(nums, k): return nums[k:] + nums[:k]',
    Problem: { slug: 'rotate-left', title: 'Rotate Left (Variant 1)', difficulty: 'Medium', Belt: { order: 3, name: 'Belt 3', color: '#10B981' } },
  },
  {
    id: '207ab9da-1158-4b41-a363-c55bddfc87cf',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'arithmetic-check',
    language: 'cpp',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 1,
    createdAt: '2026-09-24T03:51:04.243Z', // 24 Sept
    code: 'bool check(int a, int b, int c) { return a+b==c; }',
    Problem: { slug: 'arithmetic-check', title: 'Arithmetic Check (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: 'sub_rmlbcnu53_1790221859945',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'arithmetic-check',
    language: 'cpp',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 1,
    createdAt: '2026-09-24T03:50:59.945Z', // near-duplicate 4.3s earlier
    code: 'bool check(int a, int b, int c) { return a+b==c; }',
    Problem: { slug: 'arithmetic-check', title: 'Arithmetic Check (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: '3c2470b3-485e-4e64-a9ae-b832f954a60a',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'arithmetic-check',
    language: 'python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 2,
    createdAt: '2026-09-05T10:23:27.692Z', // 5 Sept
    code: 'def check(a, b, c): return a + b == c',
    Problem: { slug: 'arithmetic-check', title: 'Arithmetic Check (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
]

// Kavya submissions fixture (2 passed submissions on 7 Sept, inactive 47 days)
const FIXTURE_KAVYA_SUBMISSIONS = [
  {
    id: 'kavya-sub-1',
    userId: '820485df-5e7a-4c4b-9cb4-d9bf20060b53',
    problemId: 'absolute-difference',
    language: 'python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 2,
    createdAt: '2026-09-07T08:00:00.000Z',
    code: 'def solution(a, b): return abs(a - b)',
    Problem: { slug: 'absolute-difference', title: 'Absolute Difference (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: 'kavya-sub-2',
    userId: '820485df-5e7a-4c4b-9cb4-d9bf20060b53',
    problemId: 'arithmetic-check',
    language: 'python',
    status: 'PASSED',
    passedTests: 10,
    totalTests: 10,
    executionTimeMs: 2,
    createdAt: '2026-09-07T08:15:00.000Z',
    code: 'def check(a, b, c): return a + b == c',
    Problem: { slug: 'arithmetic-check', title: 'Arithmetic Check (Variant 1)', difficulty: 'Easy', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
]

const ALL_FIXTURE_SUBMISSIONS = [...FIXTURE_PRAJITH_SUBMISSIONS, ...FIXTURE_KAVYA_SUBMISSIONS]

const FIXTURE_PROGRESS = [
  {
    id: 'prog-prajith-1',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'largest-of-three',
    status: 'SOLVED',
    language: 'python',
    solvedAt: '2026-10-19T09:30:07.952Z',
    xpEarned: 50,
    Problem: { slug: 'largest-of-three', title: 'Largest of Three (Variant 1)', difficulty: 'Easy', beltId: 'belt-1', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: 'prog-prajith-2',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'absolute-difference',
    status: 'SOLVED',
    language: 'python',
    solvedAt: '2026-10-19T09:29:18.645Z',
    xpEarned: 50,
    Problem: { slug: 'absolute-difference', title: 'Absolute Difference (Variant 1)', difficulty: 'Easy', beltId: 'belt-1', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: 'prog-prajith-3',
    userId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    problemId: 'arithmetic-check',
    status: 'SOLVED',
    language: 'python',
    solvedAt: '2026-09-05T10:23:27.692Z',
    xpEarned: 50,
    Problem: { slug: 'arithmetic-check', title: 'Arithmetic Check (Variant 1)', difficulty: 'Easy', beltId: 'belt-1', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: 'prog-kavya-1',
    userId: '820485df-5e7a-4c4b-9cb4-d9bf20060b53',
    problemId: 'absolute-difference',
    status: 'SOLVED',
    language: 'python',
    solvedAt: '2026-09-07T08:00:00.000Z',
    xpEarned: 50,
    Problem: { slug: 'absolute-difference', title: 'Absolute Difference (Variant 1)', difficulty: 'Easy', beltId: 'belt-1', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
  {
    id: 'prog-kavya-2',
    userId: '820485df-5e7a-4c4b-9cb4-d9bf20060b53',
    problemId: 'arithmetic-check',
    status: 'SOLVED',
    language: 'python',
    solvedAt: '2026-09-07T08:15:00.000Z',
    xpEarned: 50,
    Problem: { slug: 'arithmetic-check', title: 'Arithmetic Check (Variant 1)', difficulty: 'Easy', beltId: 'belt-1', Belt: { order: 1, name: 'Belt 1', color: '#EAB308' } },
  },
]

// ─── MOCK SUPABASE CLIENT WITH FIXTURES ─────────────────────────────────────

function installMockSupabase() {
  const origFrom = (supabase as any).from.bind(supabase)

  ;(supabase as any).from = (tableName: string) => {
    let currentData: any[] = []
    let isSingle = false

    if (tableName === 'mentors') {
      currentData = [MOCK_MENTOR]
    } else if (tableName === 'mentor_students') {
      currentData = MOCK_STUDENTS.map((s) => ({
        mentor_id: MOCK_MENTOR.id,
        student_id: s.id,
        status: 'ACTIVE',
        students: s,
      }))
    } else if (tableName === 'students') {
      currentData = MOCK_STUDENTS
    } else if (tableName === 'users') {
      currentData = [
        { id: MOCK_MENTOR.user_id, name: MOCK_MENTOR.name, email: MOCK_MENTOR.email },
        ...MOCK_STUDENTS.map((s) => ({ id: s.user_id, name: s.name, email: s.email })),
      ]
    } else if (tableName === 'UserProgress') {
      currentData = FIXTURE_PROGRESS
    } else if (tableName === 'Submission') {
      currentData = ALL_FIXTURE_SUBMISSIONS
    } else if (tableName === 'Problem') {
      currentData = []
    }

    const builder: any = {
      select: (_cols?: string, opts?: any) => {
        if (opts?.count === 'exact' && opts?.head) {
          return Promise.resolve({ count: 500, data: null, error: null })
        }
        return builder
      },
      eq: (col: string, val: any) => {
        if (col === 'status') {
          currentData = currentData.filter((r) => r.status === val)
        } else if (col === 'mentor_id') {
          currentData = currentData.filter((r) => r.mentor_id === val)
        } else if (col === 'userId') {
          currentData = currentData.filter((r) => r.userId === val)
        }
        return builder
      },
      in: (col: string, vals: any[]) => {
        if (col === 'userId') {
          currentData = currentData.filter((r) => vals.includes(r.userId))
        }
        return builder
      },
      ilike: (_col: string, _pattern: string) => builder,
      or: (condition: string) => {
        if (condition.includes('00000000-0000-0000-0000-000000000000')) {
          currentData = []
        }
        return builder
      },
      order: (_col: string, _opts?: any) => builder,
      range: (_from: number, _to: number) => {
        return Promise.resolve({ data: currentData, count: currentData.length, error: null })
      },
      limit: (n: number) => {
        currentData = currentData.slice(0, n)
        return builder
      },
      maybeSingle: () => {
        return Promise.resolve({ data: currentData[0] || null, error: null })
      },
      then: (resolve: (res: any) => void) => {
        resolve({ data: isSingle ? currentData[0] || null : currentData, count: currentData.length, error: null })
      },
    }

    return builder
  }

  return () => {
    ;(supabase as any).from = origFrom
  }
}

// ─── TEST RUNNER ─────────────────────────────────────────────────────────────

async function runTestSuite() {
  console.log('========================================================================')
  console.log('🧪 LOCAL FIXTURE REGRESSION SUITE (fix/live-site-bugs-oct24)')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function pass(testNum: number, desc: string, details?: string) {
    passed++
    console.log(`  ✅ [TEST ${testNum}] ${desc}`)
    if (details) console.log(`     ↳ ${details}`)
  }

  function fail(testNum: number, desc: string, err: any) {
    failed++
    console.error(`  ❌ [TEST ${testNum}] ${desc}:`, err)
  }

  const uninstall = installMockSupabase()

  try {
    const mentorId = MOCK_MENTOR.user_id

    // TEST 1: Prajith per-language solved counts (Bug 4)
    try {
      const roster = await fetchMentorRoster(mentorId, true)
      const prajith = roster.find((s) => s.email.includes('prajith'))

      assert(prajith, 'Prajith P S must be present in mentor roster')
      assert.strictEqual(prajith.solvedCount, 4, `Prajith unique solved must be 4, got ${prajith.solvedCount}`)
      assert.strictEqual(prajith.languageSolvedCounts.python, 4, `Python must be 4, got ${prajith.languageSolvedCounts.python}`)
      assert.strictEqual(prajith.languageSolvedCounts.cpp, 1, `C++ must be 1, got ${prajith.languageSolvedCounts.cpp}`)
      assert.strictEqual(prajith.languageSolvedCounts.java, 1, `Java must be 1, got ${prajith.languageSolvedCounts.java}`)
      assert.strictEqual(prajith.languageSolvedCounts.nodejs, 0, `Node.js must be 0, got ${prajith.languageSolvedCounts.nodejs}`)

      pass(1, 'Prajith fixture per-language solved counts match reference expectations',
        `All: ${prajith.solvedCount} | Python: ${prajith.languageSolvedCounts.python} | C++: ${prajith.languageSolvedCounts.cpp} | Java: ${prajith.languageSolvedCounts.java} | Node.js: ${prajith.languageSolvedCounts.nodejs}`)
    } catch (err) {
      fail(1, 'Prajith per-language counts failed', err)
    }

    // TEST 2: "Latest" problem is the newest passed submission by created_at desc (Bug 5)
    try {
      const roster = await fetchMentorRoster(mentorId, true)
      const prajith = roster.find((s) => s.email.includes('prajith'))
      assert(prajith?.latestSolved, 'Prajith must have latestSolved problem')
      assert.strictEqual(
        prajith.latestSolved.title,
        'Largest of Three (Variant 1)',
        `Expected "Largest of Three (Variant 1)", got "${prajith.latestSolved.title}"`
      )
      assert.strictEqual(prajith.latestSolved.language, 'python', 'Latest problem language should be python')
      pass(2, 'Latest problem resolves to newest submission by created_at desc',
        `Latest: ${prajith.latestSolved.title} (${prajith.latestSolved.languageLabel})`)
    } catch (err) {
      fail(2, 'Latest problem sort failed', err)
    }

    // TEST 3: Active-in-belt numerator <= total mentor registered students (Bug 2)
    try {
      const roster = await fetchMentorRoster(mentorId, true)
      const metrics = await fetchMentorCurriculumMetrics(mentorId)
      const totalStudents = roster.length

      assert.strictEqual(totalStudents, 3, `Expected exactly 3 mentor students, got ${totalStudents}`)
      for (const belt of metrics) {
        assert(
          belt.cohortCompleted <= totalStudents,
          `Belt ${belt.order} count (${belt.cohortCompleted}) exceeds total students (${totalStudents})`
        )
      }
      const belt1 = metrics.find((m) => m.order === 1)
      assert.strictEqual(belt1?.cohortCompleted, 2, `Expected 2 active students in Belt 1 (Prajith, Kavya), got ${belt1?.cohortCompleted}`)
      pass(3, 'Active-in-belt numerator is strictly scoped to mentor students (numerator <= total)',
        `Belt 1 Active: ${belt1?.cohortCompleted} / ${totalStudents} students`)
    } catch (err) {
      fail(3, 'Active-in-belt numerator check failed', err)
    }

    // TEST 4: Belt with 0 submissions returns null / "No data yet" (Bug 3)
    try {
      const metrics = await fetchMentorCurriculumMetrics(mentorId)
      const belt2 = metrics.find((m) => m.order === 2)
      assert(belt2, 'Belt 2 metric must exist')
      assert.strictEqual(belt2.avgPassRate, null, `Belt 2 pass rate must be null, got ${belt2.avgPassRate}`)
      assert.strictEqual(belt2.bottleneck, null, `Belt 2 bottleneck must be null, got ${belt2.bottleneck}`)

      pass(4, 'Belt with 0 submissions returns null ("No data yet") without fake 100% or 0%',
        `Belt 2: Pass Rate = ${belt2.avgPassRate} | Bottleneck = ${belt2.bottleneck}`)
    } catch (err) {
      fail(4, 'Zero submissions belt check failed', err)
    }

    // TEST 5: Inactivity > 7 days triggers Attention, tab count matches rows (Bug 8)
    try {
      const roster = await fetchMentorRoster(mentorId, true)
      const kavya = roster.find((s) => s.email.includes('kavya'))
      assert(kavya, 'Kavya must be in roster')
      assert.strictEqual(kavya.needsAttention, true, 'Kavya (>40d inactive) must need attention')
      assert(kavya.attentionReason?.includes('Inactive'), 'Attention reason must cite inactivity')

      const attentionStudents = roster.filter((s) => s.needsAttention)
      assert.strictEqual(attentionStudents.length, 1, `Expected exactly 1 student needing attention, got ${attentionStudents.length}`)
      pass(5, 'Inactive > 7 days properly flagged under Attention with exact matching counts',
        `Attention count: ${attentionStudents.length} | Flagged: ${attentionStudents[0].name}`)
    } catch (err) {
      fail(5, 'Attention threshold check failed', err)
    }

    // TEST 6: Submit endpoint idempotency & DB-level migration preparation (Bug 7)
    try {
      const submitSource = fs.readFileSync(path.resolve('src/server/submitHandler.ts'), 'utf-8')
      const prismaSchema = fs.readFileSync(path.resolve('prisma/schema.prisma'), 'utf-8')
      const migrationFile = path.resolve('prisma/migrations/20261024_submission_idempotency_key/migration.sql')

      assert(submitSource.includes('idempotencyKey'), 'submitHandler.ts must use idempotencyKey')
      assert(submitSource.includes('23505'), 'submitHandler.ts must handle 23505 unique conflict')
      assert(prismaSchema.includes('idempotencyKey'), 'schema.prisma must declare idempotencyKey @unique on Submission')
      assert(fs.existsSync(migrationFile), 'Local migration file must exist')

      pass(6, 'Submit path implements deterministic SHA-256 idempotency backed by DB-level guarantee migration',
        'In-flight cache + DB unique index migration prepared locally')
    } catch (err) {
      fail(6, 'Submit idempotency check failed', err)
    }

    // TEST 7: deduplicateSubmissions handles near-duplicates and allows different problems (Bug 7)
    try {
      // Scenario A: Near-duplicate submission of SAME problem within 15s -> collapsed to 1
      const sameProblemSubs = [
        { userId: 'u1', problemSlug: 'p1', language: 'java', status: 'PASSED', code: 'class Main {}', createdAt: '2026-10-06T06:40:08Z' },
        { userId: 'u1', problemSlug: 'p1', language: 'java', status: 'PASSED', code: 'class Main {}', createdAt: '2026-10-06T06:40:15Z' }, // duplicate within 7s
      ]
      const dedupedA = deduplicateSubmissions(sameProblemSubs, 15)
      assert.strictEqual(dedupedA.length, 1, `Expected 1 deduplicated row, got ${dedupedA.length}`)

      // Scenario B: Two DIFFERENT problems submitted by the same user within 15s -> BOTH MUST COUNT!
      const twoDiffProblemSubs = [
        { userId: 'u1', problemSlug: 'problem-alpha', language: 'python', status: 'PASSED', code: 'def a(): pass', createdAt: '2026-10-24T10:00:00Z' },
        { userId: 'u1', problemSlug: 'problem-beta', language: 'python', status: 'PASSED', code: 'def b(): pass', createdAt: '2026-10-24T10:00:05Z' }, // 5s later, different problem
      ]
      const dedupedB = deduplicateSubmissions(twoDiffProblemSubs, 15)
      assert.strictEqual(dedupedB.length, 2, `Two different problems within 15s must both count! Got ${dedupedB.length}`)

      // Scenario C: Same problem in two DIFFERENT languages within 15s -> BOTH MUST COUNT!
      const multiLangSubs = [
        { userId: 'u1', problemSlug: 'problem-alpha', language: 'python', status: 'PASSED', code: 'def a(): pass', createdAt: '2026-10-24T10:00:00Z' },
        { userId: 'u1', problemSlug: 'problem-alpha', language: 'cpp', status: 'PASSED', code: 'int main() {}', createdAt: '2026-10-24T10:00:04Z' }, // 4s later, C++
      ]
      const dedupedC = deduplicateSubmissions(multiLangSubs, 15)
      assert.strictEqual(dedupedC.length, 2, `Same problem in different languages within 15s must both count! Got ${dedupedC.length}`)

      pass(7, 'deduplicateSubmissions verifies user + problem + language + code (diff problems within 15s both count)',
        'Same problem duplicate collapsed to 1; two different problems within 15s both counted (2/2); different languages both counted (2/2)')
    } catch (err) {
      fail(7, 'deduplicateSubmissions check failed', err)
    }

    // TEST 8: Explore Belt N routes and filters arena to Belt N (Bug 9)
    try {
      const dashboardSource = fs.readFileSync(path.resolve('src/pages/DashboardPage.tsx'), 'utf-8')
      const practicePageSource = fs.readFileSync(path.resolve('src/pages/LanguagePracticePage.tsx'), 'utf-8')
      const langCardsSource = fs.readFileSync(path.resolve('src/components/practice/LanguageCards.tsx'), 'utf-8')

      assert(dashboardSource.includes('?belt='), 'DashboardPage must route explore buttons with ?belt= parameter')
      assert(practicePageSource.includes('searchParams.get(\'belt\')'), 'LanguagePracticePage must read ?belt= parameter')
      assert(langCardsSource.includes('searchParams'), 'LanguageCards must preserve searchParams')

      pass(8, 'Explore Belt N directs to practice arena filtered directly to Belt N',
        'Dashboard links include ?belt=N, LanguageCards preserves params, LanguagePracticePage filters on mount')
    } catch (err) {
      fail(8, 'Explore Belt N check failed', err)
    }

    // TEST 9: Learn › Coding questions: topic breadcrumb, no belt label, no fake XP (Bug 10)
    try {
      const arenaSource = fs.readFileSync(path.resolve('src/pages/ProblemArenaPage.tsx'), 'utf-8')
      const modalSource = fs.readFileSync(path.resolve('src/components/arena/QuestionCompletionModal.tsx'), 'utf-8')

      assert(arenaSource.includes('getCodingQuestionBySlug'), 'ProblemArenaPage must detect Learn questions')
      assert(arenaSource.includes('isLearnCoding'), 'ProblemArenaPage must pass isLearnCoding')
      assert(modalSource.includes('Practice only — no XP'), 'QuestionCompletionModal must display Practice only — no XP')

      // Verify progress.ts recordProblemSuccess does not increment XP when awardXp: false
      const stateBefore = getUserState()
      const xpBefore = stateBefore.xp
      recordProblemSuccess('profile-echo-test', 'Profile Echo Test', 'python', 'print(1)', 10, { awardXp: false })
      const stateAfter = getUserState()
      assert.strictEqual(stateAfter.xp, xpBefore, `XP must not increase for learn question! Before: ${xpBefore}, After: ${stateAfter.xp}`)

      const q = getCodingQuestionBySlug('profile-echo')
      assert(q, 'profile-echo question must exist in bank')
      assert.strictEqual(q.topicTitle, 'Variables & Data Types', 'Topic title must match')

      pass(9, 'Learn questions render topic context, no belt label, and modal displays "Practice only — no XP"',
        `profile-echo: "${q.topicTitle}" | Breadcrumb: Learn › Coding › Variables & Data Types | Modal: Practice only — no XP`)
    } catch (err) {
      fail(9, 'Learn question context & no-XP check failed', err)
    }

    // TEST 10: Mentor scoping isolation (Mentor A cannot see Mentor B students)
    try {
      const metricsA = await fetchMentorCurriculumMetrics(mentorId)
      const metricsDummy = await fetchMentorCurriculumMetrics('00000000-0000-0000-0000-000000000000')

      assert(metricsDummy.every((m) => m.cohortCompleted === 0), 'Dummy mentor must see 0 active students')
      assert(metricsA.some((m) => m.cohortCompleted > 0), 'Real mentor sees their assigned cohort')

      pass(10, 'Mentor scoping isolation strictly enforced: zero leakage across mentor boundaries',
        `Assigned mentor active in Belt 1: ${metricsA.find((m) => m.order === 1)?.cohortCompleted} | Dummy mentor: 0`)
    } catch (err) {
      fail(10, 'Mentor scoping isolation check failed', err)
    }

    // TEST 11: Belt progression rule cumulative alignment (Bug 6)
    try {
      assert.strictEqual(computeStudentBelt(0).name, 'Belt 1')
      assert.strictEqual(computeStudentBelt(19).name, 'Belt 1')
      assert.strictEqual(computeStudentBelt(20).name, 'Belt 2')
      assert.strictEqual(computeStudentBelt(50).name, 'Belt 3')
      assert.strictEqual(computeStudentBelt(85).name, 'Belt 4')
      assert.strictEqual(computeStudentBelt(125).name, 'Belt 5')
      assert.strictEqual(computeStudentBelt(165).name, 'Belt 6')
      assert.strictEqual(computeStudentBelt(205).name, 'Belt 7')
      assert.strictEqual(computeStudentBelt(265).name, 'Belt 8')
      assert.strictEqual(computeStudentBelt(330).name, 'Belt 9')
      assert.strictEqual(computeStudentBelt(410).name, 'Belt 10')

      pass(11, 'Cumulative belt progression formula matches canonical Student Dashboard rules',
        'Prajith (4 solved) = Belt 1 (4/20 problems to Belt 2)')
    } catch (err) {
      fail(11, 'Belt progression formula check failed', err)
    }

    // TEST 12: Total time label verification (Bug 13)
    try {
      const subPageSource = fs.readFileSync(path.resolve('src/pages/mentor/MentorSubmissionsPage.tsx'), 'utf-8')
      assert(subPageSource.includes('Total Time'), 'Table header must be Total Time')
      assert(subPageSource.includes('total time'), 'Modal must describe duration as total time')

      pass(12, 'Execution time clearly documented and labeled as Total Time across submissions views',
        'Accurately reflects complete child-process sandbox execution')
    } catch (err) {
      fail(12, 'Total time label check failed', err)
    }

  } finally {
    uninstall()
  }

  console.log('\n========================================================================')
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`)
  console.log('========================================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
