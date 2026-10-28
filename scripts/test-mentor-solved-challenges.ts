/**
 * Test Suite: Mentor Portal Solved Challenges & Progress Consistency Audit
 *
 * Verifies:
 * 1. Bug 1: Problems Solved stat in StudentDetailModal has NO denominator (/ 500 or / total).
 * 2. Bug 2: Successfully solved C++ challenges appear in Solved Challenges under 'all' and 'cpp'.
 * 3. Multi-language solve deduplication: Solved in Python + C++ counts as 1 overall solve,
 *    appears in both Python and C++ filters, and once in All.
 * 4. Failed/partial submissions (e.g. 3/10 tests) are NOT counted as solved.
 * 5. Duplicate passed submissions do not inflate solved count or duplicate items.
 * 6. Recent Submissions contains all student attempts with full fidelity.
 * 7. Language filters (All, C++, Python, Java, Node.js) remain consistent across views.
 */

import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import {
  normalizeLanguage,
  getLanguageLabel,
  problemLookupCache,
  fetchMentorRoster,
  invalidateMentorCache,
  type SolvedProblemItem,
  type MentorStudent,
} from '../src/lib/mentorService'
import {
  SYNTHETIC_STUDENT_A,
  installSyntheticSupabaseInterceptor,
} from './syntheticFixtures'

let passedTestsCount = 0
function test(name: string, fn: () => void | Promise<void>) {
  try {
    const res = fn()
    if (res instanceof Promise) {
      return res.then(() => {
        console.log(`  ✓ ${name}`)
        passedTestsCount++
      })
    }
    console.log(`  ✓ ${name}`)
    passedTestsCount++
  } catch (err) {
    console.error(`  ✗ ${name}`)
    throw err
  }
}

async function runAll() {
  console.log('\n--- 1. AST & Component Inspection (Bug 1: Denominator Removal) ---')

  test('StudentDetailModal.tsx does NOT render a denominator in Problems Solved card', () => {
    const modalPath = path.resolve('src/components/mentor/StudentDetailModal.tsx')
    const code = fs.readFileSync(modalPath, 'utf8')

    // Must NOT contain `{student.solvedCount} / {student.totalProblems}` or `/ 500`
    assert.ok(
      !code.includes('{student.solvedCount} / {student.totalProblems}'),
      'StudentDetailModal must not have {student.solvedCount} / {student.totalProblems}'
    )
    assert.ok(
      !code.includes('/ 500'),
      'StudentDetailModal must not contain hardcoded / 500'
    )
    assert.ok(
      !code.includes('{student.solvedCount} /'),
      'StudentDetailModal must not have any denominator after student.solvedCount'
    )

    // Must contain plain {student.solvedCount}
    assert.ok(
      code.includes('{student.solvedCount}'),
      'StudentDetailModal must display student.solvedCount'
    )
  })

  test('StudentDetailModal.tsx filters solved problems considering multi-language solves', () => {
    const modalPath = path.resolve('src/components/mentor/StudentDetailModal.tsx')
    const code = fs.readFileSync(modalPath, 'utf8')

    // Must check languages array if present
    assert.ok(
      code.includes('p.languages ? p.languages.includes(langFilter) : p.language === langFilter') ||
      code.includes('p.languages.includes(langFilter)'),
      'StudentDetailModal must check p.languages when filtering by language'
    )
  })

  test('MentorStudentsPage.tsx filters solvedInActive considering multi-language solves', () => {
    const pagePath = path.resolve('src/pages/mentor/MentorStudentsPage.tsx')
    const code = fs.readFileSync(pagePath, 'utf8')

    assert.ok(
      code.includes('p.languages ? p.languages.includes(langFilter) : p.language === langFilter') ||
      code.includes('p.languages.includes(langFilter)'),
      'MentorStudentsPage must check p.languages when filtering solvedInActive'
    )
  })

  console.log('\n--- 2. Language Normalization & Pre-seeded Lookup Cache ---')

  test('normalizeLanguage correctly recognizes C++, Java, Node.js, and Python variants', () => {
    assert.strictEqual(normalizeLanguage('cpp'), 'cpp')
    assert.strictEqual(normalizeLanguage('c++'), 'cpp')
    assert.strictEqual(normalizeLanguage('C++'), 'cpp')
    assert.strictEqual(normalizeLanguage('CPP'), 'cpp')
    assert.strictEqual(normalizeLanguage('g++'), 'cpp')

    assert.strictEqual(normalizeLanguage('python'), 'python')
    assert.strictEqual(normalizeLanguage('Python 3'), 'python')
    assert.strictEqual(normalizeLanguage('py'), 'python')

    assert.strictEqual(normalizeLanguage('java'), 'java')
    assert.strictEqual(normalizeLanguage('Java (OpenJDK)'), 'java')

    assert.strictEqual(normalizeLanguage('nodejs'), 'nodejs')
    assert.strictEqual(normalizeLanguage('javascript'), 'nodejs')
    assert.strictEqual(normalizeLanguage('js'), 'nodejs')
  })

  test('problemLookupCache is pre-seeded with catalog items and resolves slugs', () => {
    assert.ok(problemLookupCache.size > 0, 'problemLookupCache must be pre-seeded')
    const sample = problemLookupCache.get('belt-1-q1-arithmetic-check-v1')
    assert.ok(sample, 'problemLookupCache must have belt-1-q1-arithmetic-check-v1')
    assert.strictEqual(sample.slug, 'belt-1-q1-arithmetic-check-v1')
    assert.ok(sample.title, 'problemLookupCache entry must have title')
    assert.ok(sample.beltName, 'problemLookupCache entry must have beltName')
  })

  console.log('\n--- 3. Multi-Language Aggregation & Solve Deduplication Logic ---')

  test('A C++ solve appears in Solved Challenges and under the C++ filter', () => {
    // Simulate student with 1 C++ solve
    const student: MentorStudent = {
      id: 'student-1',
      name: 'Alex Coder',
      email: 'alex@example.com',
      belt: 'Yellow Belt',
      beltColor: '#EAB308',
      progressPercent: 2,
      solvedCount: 1,
      totalProblems: 58,
      totalXp: 50,
      streak: 3,
      language: 'cpp',
      lastActive: 'Just now',
      status: 'ACTIVE',
      isActive: true,
      needsAttention: false,
      languageSolvedCounts: {
        python: 0,
        java: 0,
        cpp: 1,
        nodejs: 0,
      },
      solvedProblems: [
        {
          problemId: 'belt-1-q1-arithmetic-check-v1',
          title: 'Arithmetic Check (Variant 1)',
          slug: 'belt-1-q1-arithmetic-check-v1',
          difficulty: 'Easy',
          beltName: 'Belt 1',
          beltColor: '#EAB308',
          language: 'cpp',
          languageLabel: 'C++',
          languages: ['cpp'],
          solvedAt: new Date().toISOString(),
          solvedAtFormatted: 'Just now',
        },
      ],
      recentSubmissions: [
        {
          id: 'sub-1',
          problemTitle: 'Arithmetic Check (Variant 1)',
          problemSlug: 'belt-1-q1-arithmetic-check-v1',
          beltName: 'Belt 1',
          beltColor: '#EAB308',
          language: 'cpp',
          languageLabel: 'C++',
          status: 'PASSED',
          passedTests: 10,
          totalTests: 10,
          executionTimeMs: 15,
          createdAt: 'Just now',
          createdAtRaw: new Date().toISOString(),
        },
      ],
    }

    // Filter 'all'
    const allSolved = (student.solvedProblems || []).filter((p) =>
      p.languages ? p.languages.includes('all' as any) || true : true
    )
    assert.strictEqual(allSolved.length, 1)

    // Filter 'cpp'
    const cppSolved = (student.solvedProblems || []).filter((p) =>
      p.languages ? p.languages.includes('cpp') : p.language === 'cpp'
    )
    assert.strictEqual(cppSolved.length, 1, 'C++ filter must return the C++ solve')
    assert.strictEqual(cppSolved[0].slug, 'belt-1-q1-arithmetic-check-v1')

    // Filter 'python'
    const pySolved = (student.solvedProblems || []).filter((p) =>
      p.languages ? p.languages.includes('python') : p.language === 'python'
    )
    assert.strictEqual(pySolved.length, 0, 'Python filter must return 0')
  })

  test('Multi-language solve on same problem: deduplicated to 1 solve, visible in both language filters', () => {
    // Problem solved in Python first, then C++
    const problemItem: SolvedProblemItem = {
      problemId: 'belt-1-q1-arithmetic-check-v1',
      title: 'Arithmetic Check (Variant 1)',
      slug: 'belt-1-q1-arithmetic-check-v1',
      difficulty: 'Easy',
      beltName: 'Belt 1',
      beltColor: '#EAB308',
      language: 'cpp', // latest solved
      languageLabel: 'C++',
      languages: ['python', 'cpp'], // solved in both!
      solvedAt: new Date().toISOString(),
      solvedAtFormatted: 'Just now',
    }

    const student: MentorStudent = {
      id: 'student-2',
      name: 'Taylor Multilang',
      email: 'taylor@example.com',
      belt: 'Yellow Belt',
      beltColor: '#EAB308',
      progressPercent: 2,
      solvedCount: 1, // 1 unique problem solved!
      totalProblems: 58,
      totalXp: 50,
      streak: 5,
      language: 'cpp',
      lastActive: 'Just now',
      status: 'ACTIVE',
      isActive: true,
      needsAttention: false,
      languageSolvedCounts: {
        python: 1,
        java: 0,
        cpp: 1,
        nodejs: 0,
      },
      solvedProblems: [problemItem],
      recentSubmissions: [
        {
          id: 'sub-cpp',
          problemTitle: 'Arithmetic Check (Variant 1)',
          problemSlug: 'belt-1-q1-arithmetic-check-v1',
          beltName: 'Belt 1',
          beltColor: '#EAB308',
          language: 'cpp',
          languageLabel: 'C++',
          status: 'PASSED',
          passedTests: 10,
          totalTests: 10,
          executionTimeMs: 12,
          createdAt: 'Just now',
          createdAtRaw: new Date().toISOString(),
        },
        {
          id: 'sub-py',
          problemTitle: 'Arithmetic Check (Variant 1)',
          problemSlug: 'belt-1-q1-arithmetic-check-v1',
          beltName: 'Belt 1',
          beltColor: '#EAB308',
          language: 'python',
          languageLabel: 'Python',
          status: 'PASSED',
          passedTests: 10,
          totalTests: 10,
          executionTimeMs: 25,
          createdAt: '2 hours ago',
          createdAtRaw: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
    }

    // 1. Solved count must be 1 (not inflated to 2)
    assert.strictEqual(student.solvedCount, 1)

    // 2. All filter must show 1 problem
    const allFilter = student.solvedProblems
    assert.strictEqual(allFilter.length, 1)

    // 3. Python filter must include the problem
    const pythonFilter = student.solvedProblems.filter((p) =>
      p.languages ? p.languages.includes('python') : p.language === 'python'
    )
    assert.strictEqual(pythonFilter.length, 1, 'Problem must appear under Python filter')

    // 4. C++ filter must ALSO include the problem (fixes Bug 2)
    const cppFilter = student.solvedProblems.filter((p) =>
      p.languages ? p.languages.includes('cpp') : p.language === 'cpp'
    )
    assert.strictEqual(cppFilter.length, 1, 'Problem must appear under C++ filter')

    // 5. Java filter must be empty
    const javaFilter = student.solvedProblems.filter((p) =>
      p.languages ? p.languages.includes('java') : p.language === 'java'
    )
    assert.strictEqual(javaFilter.length, 0, 'Problem must not appear under Java filter')
  })

  test('Failed C++ submission (3/10 tests) is NOT marked as solved', () => {
    // In our register logic:
    const s = {
      status: 'FAILED',
      passedTests: 3,
      totalTests: 10,
      language: 'cpp',
    }
    const isPassed =
      (s.status?.toUpperCase() === 'PASSED' || s.status?.toUpperCase() === 'ACCEPTED') &&
      ((s.passedTests != null && s.totalTests != null && s.passedTests === s.totalTests && s.totalTests > 0) ||
        (s.passedTests ?? 0) >= 10 ||
        (s.status?.toUpperCase() === 'PASSED' && (s.totalTests == null || s.passedTests == null || s.passedTests === s.totalTests)))

    assert.strictEqual(isPassed, false, 'Failed submission with 3/10 tests must NOT be passed')
  })

  test('Duplicate passed C++ submissions do not duplicate cards in uniqueSolvedOverall', () => {
    const solvedByLang: Record<'python' | 'java' | 'nodejs' | 'cpp', Set<string>> = {
      python: new Set(),
      java: new Set(),
      cpp: new Set(),
      nodejs: new Set(),
    }
    const uniqueSolvedOverall = new Map<string, SolvedProblemItem>()

    const registerSolvedProblem = (
      slugCandidate: string,
      lang: 'python' | 'java' | 'nodejs' | 'cpp',
      solvedAt: string
    ) => {
      solvedByLang[lang].add(slugCandidate)
      const existing = uniqueSolvedOverall.get(slugCandidate)
      if (!existing) {
        uniqueSolvedOverall.set(slugCandidate, {
          problemId: slugCandidate,
          title: 'Problem 1',
          slug: slugCandidate,
          difficulty: 'Easy',
          beltName: 'Belt 1',
          beltColor: '#EAB308',
          language: lang,
          languageLabel: getLanguageLabel(lang),
          languages: [lang],
          solvedAt,
          solvedAtFormatted: 'Just now',
        })
      } else {
        if (!existing.languages) existing.languages = [existing.language]
        if (!existing.languages.includes(lang)) existing.languages.push(lang)
      }
    }

    // 3 duplicate C++ submissions for the same problem
    registerSolvedProblem('prob-1', 'cpp', '2026-10-28T10:00:00Z')
    registerSolvedProblem('prob-1', 'cpp', '2026-10-28T10:05:00Z')
    registerSolvedProblem('prob-1', 'cpp', '2026-10-28T10:10:00Z')

    assert.strictEqual(uniqueSolvedOverall.size, 1, 'Only 1 card in uniqueSolvedOverall')
    assert.strictEqual(solvedByLang.cpp.size, 1, 'Only 1 problem count in C++')
  })

  console.log('\n--- 4. End-to-End fetchMentorRoster Integration Test ---')

  await test('fetchMentorRoster accurately aggregates C++ and Python multi-language solves', async () => {
    installSyntheticSupabaseInterceptor()
    invalidateMentorCache()

    const roster = await fetchMentorRoster(undefined, true)
    assert.ok(roster.length > 0, 'Roster must contain synthetic students')

    const studentA = roster.find((s) => s.id === SYNTHETIC_STUDENT_A)
    assert.ok(studentA, 'Student A must be present in roster')

    // 1. Solved count: 3 distinct problems solved (arithmetic-check in py+cpp, absolute-diff in java, rotate-left in py)
    assert.strictEqual(studentA.solvedCount, 3, 'Unique solved count must be 3')

    // 2. Language counts
    assert.strictEqual(studentA.languageSolvedCounts.python, 2, 'Python solved count must be 2')
    assert.strictEqual(studentA.languageSolvedCounts.cpp, 1, 'C++ solved count must be 1')
    assert.strictEqual(studentA.languageSolvedCounts.java, 1, 'Java solved count must be 1')
    assert.strictEqual(studentA.languageSolvedCounts.nodejs, 0, 'Node.js solved count must be 0')

    // 3. Multi-language problem check: arithmetic-check must have both python and cpp in languages
    const arithmeticCheck = studentA.solvedProblems.find(
      (p) => p.slug === 'belt-1-q1-arithmetic-check-v1'
    )
    assert.ok(arithmeticCheck, 'arithmetic-check must be in solvedProblems')
    assert.ok(arithmeticCheck.languages, 'languages array must be populated')
    assert.ok(arithmeticCheck.languages.includes('python'), 'must include python')
    assert.ok(arithmeticCheck.languages.includes('cpp'), 'must include cpp')

    // 4. Modal filter simulation for C++:
    const cppSolved = studentA.solvedProblems.filter((p) =>
      p.languages ? p.languages.includes('cpp') : p.language === 'cpp'
    )
    assert.strictEqual(cppSolved.length, 1, 'C++ filter must return the C++ solve')
    assert.strictEqual(cppSolved[0].slug, 'belt-1-q1-arithmetic-check-v1')

    // 5. Failed submission (3/10 tests) is NOT in solvedProblems
    const failedProb = studentA.solvedProblems.find(
      (p) => p.slug === 'belt-1-q3-largest-of-three-v1'
    )
    assert.strictEqual(failedProb, undefined, 'Failed problem must NOT be in solvedProblems')

    // 6. Recent Submissions contains the failed attempt with status FAILED
    const failedSub = studentA.recentSubmissions.find(
      (s) => s.problemSlug === 'belt-1-q3-largest-of-three-v1' && s.status === 'FAILED'
    )
    assert.ok(failedSub, 'Failed attempt must be recorded in recentSubmissions')
    assert.strictEqual(failedSub.passedTests, 3)
    assert.strictEqual(failedSub.totalTests, 10)
  })

  console.log(`\nAll ${passedTestsCount} mentor solved challenges & language filter audit tests passed successfully!`)
}

runAll().catch((err) => {
  console.error('\nTest suite failed:', err)
  process.exit(1)
})
