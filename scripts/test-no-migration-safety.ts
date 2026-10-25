import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import {
  setPracticeArchiveEnabled,
  isPracticeArchiveEnabled,
} from '../src/lib/featureFlags'
import {
  fetchTotalProblemCount,
  getActiveProblemsCount,
  mapToCanonicalPracticeSlug,
  isPracticeProblemActive,
  getCanonicalPracticeProblem,
  fetchAuthoritativeBeltsWithProblems,
} from '../src/lib/problemStatsService'
import { computeStudentBelt, BELT_DEFINITIONS } from '../src/lib/mentorService'
import { pythonCurriculum, javaCurriculum, cppCurriculum, nodejsCurriculum } from '../src/data/curriculum/index'
import problemsData from '../src/data/problems.json'

const EXPECTED_REAL_BELT_SIZES = [20, 30, 35, 40, 40, 40, 60, 65, 80, 90]
const EXPECTED_ACTIVE_SIZES = [10, 15, 0, 0, 0, 10, 10, 13, 0, 0]

async function runSafetyTests() {
  console.log('--- 1. Proving No Database Column Dependencies (AST & Codebase Audit) ---')

  // Scan all TS/JS files in src, server, and api for database calls touching isActive or canonicalProblemId
  const searchDirs = ['src', 'server', 'api']
  const problematicPatterns = [
    /\.from\(['"]Problem['"]\)[^;]*\.select\([^)]*isActive/i,
    /\.from\(['"]Problem['"]\)[^;]*\.select\([^)]*canonicalProblemId/i,
    /\.from\(['"]Problem['"]\)[^;]*\.eq\(['"]isActive['"]/i,
    /\.from\(['"]Problem['"]\)[^;]*\.eq\(['"]canonicalProblemId['"]/i,
    /\.from\(['"]Problem['"]\)[^;]*\.filter\(['"]isActive['"]/i,
  ]

  let violationCount = 0

  function scanDir(dir: string) {
    const fullPath = path.resolve(process.cwd(), dir)
    if (!fs.existsSync(fullPath)) return
    const entries = fs.readdirSync(fullPath, { withFileTypes: true })
    for (const entry of entries) {
      const res = path.join(dir, entry.name)
      if (entry.isDirectory() && entry.name !== 'node_modules') {
        scanDir(res)
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js'))) {
        const content = fs.readFileSync(path.resolve(process.cwd(), res), 'utf-8')
        for (const pattern of problematicPatterns) {
          if (pattern.test(content)) {
            console.error(`VIOLATION: ${res} contains DB query referencing non-migrated column: ${pattern}`)
            violationCount++
          }
        }
      }
    }
  }

  for (const dir of searchDirs) {
    scanDir(dir)
  }

  assert.strictEqual(violationCount, 0, 'Zero database queries must touch Problem.isActive or Problem.canonicalProblemId')
  console.log('✓ PASS: Exactly 0 database queries reference Problem.isActive or canonicalProblemId.')

  console.log('\n--- 2. Verifying Default Mode (PRACTICE_ARCHIVE_ENABLED = false) ---')
  setPracticeArchiveEnabled(false)
  assert.strictEqual(isPracticeArchiveEnabled(), false, 'Default flag must be false')

  // Total problems
  const totalDefault = await fetchTotalProblemCount()
  assert.strictEqual(totalDefault, 500, `Expected 500 problems when archive disabled, got ${totalDefault}`)
  assert.strictEqual(getActiveProblemsCount(), 500)

  // Real belt sizes in problems.json
  const rawBeltSizes = problemsData.map((b) => b.problems.length)
  assert.deepStrictEqual(rawBeltSizes, EXPECTED_REAL_BELT_SIZES, 'problems.json belt sizes must match real sizes: 20, 30, 35, 40, 40, 40, 60, 65, 80, 90')

  // Curriculum belts when flag is false
  const pyBelts = pythonCurriculum.belts
  const pySizes = pyBelts.map((b) => b.problems.length)
  assert.deepStrictEqual(pySizes, EXPECTED_REAL_BELT_SIZES, 'Practice curriculum must show all 500 problems across 10 belts')
  assert.strictEqual(pyBelts.reduce((sum, b) => sum + b.problems.length, 0), 500)

  // Belts with problems from service
  const serviceBelts = await fetchAuthoritativeBeltsWithProblems()
  assert.strictEqual(serviceBelts.reduce((sum, b) => sum + b.Problem.length, 0), 500)

  // In default mode, all problems are active and slugs map to themselves
  const sampleArchivedSlug = 'belt-1-q11-arithmetic-check-v2'
  assert.strictEqual(isPracticeProblemActive(sampleArchivedSlug), true, 'All problems active when flag is false')
  assert.strictEqual(mapToCanonicalPracticeSlug(sampleArchivedSlug), sampleArchivedSlug, 'No canonical remapping when flag is false')

  // Belt progression milestones for 500 problems
  assert.strictEqual(computeStudentBelt(0).name, 'Belt 1')
  assert.strictEqual(computeStudentBelt(20).name, 'Belt 2')
  assert.strictEqual(computeStudentBelt(50).name, 'Belt 3')
  assert.strictEqual(computeStudentBelt(85).name, 'Belt 4')
  assert.strictEqual(computeStudentBelt(125).name, 'Belt 5')
  assert.strictEqual(computeStudentBelt(165).name, 'Belt 6')
  assert.strictEqual(computeStudentBelt(205).name, 'Belt 7')
  assert.strictEqual(computeStudentBelt(265).name, 'Belt 8')
  assert.strictEqual(computeStudentBelt(330).name, 'Belt 9')
  assert.strictEqual(computeStudentBelt(410).name, 'Belt 10')
  console.log('✓ PASS: When flag is false, Practice shows all 500 problems with original belt sizes & milestones.')

  console.log('\n--- 3. Verifying Archived Benchmark Mode (PRACTICE_ARCHIVE_ENABLED = true) ---')
  setPracticeArchiveEnabled(true)
  assert.strictEqual(isPracticeArchiveEnabled(), true, 'Flag must be true when enabled')

  const totalActive = await fetchTotalProblemCount()
  assert.strictEqual(totalActive, 58, `Expected 58 active benchmark problems, got ${totalActive}`)
  assert.strictEqual(getActiveProblemsCount(), 58)

  const pyBeltsActive = pythonCurriculum.belts
  const pyActiveSizes = pyBeltsActive.map((b) => b.problems.length)
  assert.deepStrictEqual(pyActiveSizes, EXPECTED_ACTIVE_SIZES, 'Active belt sizes must match: 10, 15, 0, 0, 0, 10, 10, 13, 0, 0')
  assert.strictEqual(pyBeltsActive.reduce((sum, b) => sum + b.problems.length, 0), 58)

  // In active mode, archived duplicate maps to canonical v1
  assert.strictEqual(isPracticeProblemActive(sampleArchivedSlug), false)
  assert.strictEqual(mapToCanonicalPracticeSlug(sampleArchivedSlug), 'belt-1-q1-arithmetic-check-v1')
  const canonicalProb = getCanonicalPracticeProblem(sampleArchivedSlug)
  assert.strictEqual(canonicalProb?.slug, 'belt-1-q1-arithmetic-check-v1')

  // Belt progression milestones for 58 problems
  assert.strictEqual(computeStudentBelt(0).name, 'Belt 1')
  assert.strictEqual(computeStudentBelt(10).name, 'Belt 2')
  assert.strictEqual(computeStudentBelt(25).name, 'Belt 6')
  assert.strictEqual(computeStudentBelt(35).name, 'Belt 7')
  assert.strictEqual(computeStudentBelt(45).name, 'Belt 8')
  console.log('✓ PASS: When flag is true, Practice switches seamlessly to 58 active problems with canonical carry-over.')

  // Reset to default false
  setPracticeArchiveEnabled(false)
  assert.strictEqual(isPracticeArchiveEnabled(), false)
  console.log('\n✓ ALL PRE-MIGRATION SAFETY CHECKS PASSED!')
}

runSafetyTests().catch((err) => {
  console.error('Safety test failure:', err)
  process.exit(1)
})
