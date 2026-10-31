/**
 * Full judge-bank audit (both banks, every question) through the SAME runtime lookup used by Run/Submit.
 *
 *  - every client question resolves server-side via getServerTests() (not by reading JSON directly)
 *  - exactly 10 tests: 3 visible + 7 hidden, testIndex 1..10, no duplicates, no empty expected outputs
 *  - client-visible cases are byte-identical to the server's visible cases (Run/Submit agree with the UI)
 *  - no identity collisions: cross-bank keys, client routes (practice curricula vs coding slugs), normalized titles
 *  - generated dataset copies agree (.ts module === .json) so dev/prod cannot import different data
 *  - exact lookup: unknown / near-miss identifiers do NOT resolve (no fuzzy matching)
 */
import practiceClient from '../src/data/problems.json'
import codingClient from '../src/data/coding/questions.json'
import practiceJson from '../src/server/data/serverTestCases.json'
import codingJson from '../src/server/data/codingTestCases.json'
import * as practiceTs from '../src/server/data/serverTestCases'
import { codingTestCases as codingTs } from '../src/server/data/codingTestCases'
import { getServerTests, findCrossBankCollisions, listAllQuestionIds } from '../src/server/judge/testRepository'
import { CURRICULA, getProblemByLanguageAndSlug } from '../src/data/curriculum/index'
import { findLearnQuestionBySlug, getLearnRedirect } from '../src/data/learn/coding/index'

let failures = 0
const problems: string[] = []
function check(cond: boolean, msg: string) {
  if (!cond) {
    failures++
    if (problems.length < 40) problems.push(msg)
  }
}

type ClientCase = { testIndex?: number; input?: string; expectedOutput?: string; isHidden?: boolean }

// ---- client question lists
const practiceQuestions: Array<{ slug: string; title: string; testCases: ClientCase[] }> = []
for (const belt of practiceClient as Array<{ problems: Array<{ slug: string; title: string; testCases: ClientCase[] }> }>) {
  for (const p of belt.problems) practiceQuestions.push(p)
}
const codingQuestions = (Array.isArray(codingClient) ? codingClient : Object.values(codingClient)) as Array<{
  id: string
  slug: string
  title: string
  visibleTests?: ClientCase[]
  testCaseMeta?: { visibleCount: number; hiddenCount: number; totalCount: number }
}>

let suites = 0
let visible = 0
let hidden = 0
function auditSuite(label: string, identifier: string, clientVisible: ClientCase[]) {
  const suite = getServerTests(identifier)
  check(!!suite, `${label}: no server suite for "${identifier}"`)
  if (!suite) return
  suites++
  visible += suite.visibleCount
  hidden += suite.hiddenCount
  check(suite.testCases.length === 10, `${label}: ${suite.testCases.length} tests (expected 10)`)
  check(suite.visibleCount === 3, `${label}: ${suite.visibleCount} visible (expected 3)`)
  check(suite.hiddenCount === 7, `${label}: ${suite.hiddenCount} hidden (expected 7)`)
  const idx = suite.testCases.map((t) => t.testIndex)
  check(JSON.stringify(idx) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), `${label}: test indexes ${idx.join(',')}`)
  check(suite.testCases.slice(0, 3).every((t) => !t.isHidden) && suite.testCases.slice(3).every((t) => t.isHidden), `${label}: visible/hidden ordering`)
  for (const t of suite.testCases) {
    check(typeof t.input === 'string' && t.input.length > 0, `${label}#${t.testIndex}: empty input`)
    check(typeof t.expectedOutput === 'string' && t.expectedOutput.trim().length > 0, `${label}#${t.testIndex}: empty expected output`)
    check(!/\r/.test(t.input) && !/\r/.test(t.expectedOutput), `${label}#${t.testIndex}: CR characters in judge data`)
  }
  // Client-visible cases must be exactly the server's visible cases (what the student sees is what Run executes).
  const serverVisible = suite.testCases.filter((t) => !t.isHidden)
  check(clientVisible.length === 3, `${label}: client shows ${clientVisible.length} visible cases`)
  serverVisible.forEach((sv, i) => {
    const cv = clientVisible[i]
    check(!!cv && cv.input === sv.input && cv.expectedOutput === sv.expectedOutput, `${label}: client visible case ${i + 1} differs from server`)
  })
}

console.log('========================================================================')
console.log('🔎 JUDGE BANK AUDIT (runtime lookup path)')
console.log('========================================================================')

for (const q of practiceQuestions) {
  const vis = q.testCases.filter((t) => !t.isHidden)
  auditSuite(`practice:${q.slug}`, q.slug, vis)
  // Client data must never carry hidden contents.
  check(q.testCases.filter((t) => t.isHidden).every((t) => !t.input && !t.expectedOutput), `practice:${q.slug}: hidden test content in client data`)
}
for (const q of codingQuestions) {
  auditSuite(`coding:${q.slug}`, q.slug, q.visibleTests || [])
  // The id form the client also uses must resolve to the same suite.
  check(getServerTests(q.id)?.questionId === `coding:${q.slug}`, `coding:${q.slug}: id "${q.id}" resolves elsewhere`)
  check(q.testCaseMeta?.totalCount === 10 && q.testCaseMeta.visibleCount === 3 && q.testCaseMeta.hiddenCount === 7, `coding:${q.slug}: client testCaseMeta`)
}

// ---- server-only suites (in repository but not reachable from the client)
const clientIds = new Set([...practiceQuestions.map((q) => `practice:${q.slug}`), ...codingQuestions.map((q) => `coding:${q.slug}`)])
const orphans = listAllQuestionIds().filter((id) => !clientIds.has(id))

// ---- collisions
const crossBank = findCrossBankCollisions()
check(crossBank.length === 0, `cross-bank key collisions: ${crossBank.join(', ')}`)
const dupPractice = practiceQuestions.length - new Set(practiceQuestions.map((q) => q.slug)).size
const dupCoding = codingQuestions.length - new Set(codingQuestions.map((q) => q.slug)).size
check(dupPractice === 0, `duplicate practice slugs: ${dupPractice}`)
check(dupCoding === 0, `duplicate coding slugs: ${dupCoding}`)

// Route identity: the arena resolves a URL slug against the practice curricula FIRST (slug/legacySlug/learningUnitId/id)
// and only then against the coding bank, so a coding slug equal to any practice identifier would be unreachable.
const practiceRouteKeys = new Set<string>()
for (const curriculum of Object.values(CURRICULA)) {
  for (const belt of curriculum.belts) {
    for (const p of belt.problems as Array<{ slug: string; legacySlug?: string; learningUnitId?: string; id?: string }>) {
      for (const k of [p.slug, p.legacySlug, p.learningUnitId?.toLowerCase(), p.id]) if (k) practiceRouteKeys.add(k)
    }
  }
}
const routeCollisions = codingQuestions.filter((q) => practiceRouteKeys.has(q.slug) || practiceRouteKeys.has(q.slug.toLowerCase()))
check(routeCollisions.length === 0, `coding slugs shadowed by practice routes: ${routeCollisions.map((q) => q.slug).join(', ')}`)
let routeMismatch = 0
for (const q of codingQuestions) {
  const found = findLearnQuestionBySlug(q.slug) || getLearnRedirect(q.slug)
  if (!found) routeMismatch++
}
check(routeMismatch === 0, `coding questions whose arena route resolves to a different problem: ${routeMismatch}`)

// Normalized-title collisions are reported (titles are NOT used for lookup; ids are).
const norm = (t: string) => t.toLowerCase().replace(/\(variant \d+\)/, '').replace(/[^a-z0-9]+/g, ' ').trim()
const practiceTitles = new Set(practiceQuestions.map((q) => norm(q.title)))
const titleOverlap = codingQuestions.filter((q) => practiceTitles.has(norm(q.title))).length

// ---- dataset copies
const practiceTsMap = (practiceTs as unknown as { serverTestCases?: unknown }).serverTestCases
check(JSON.stringify(codingTs) === JSON.stringify(codingJson), 'codingTestCases.ts differs from codingTestCases.json')
check(JSON.stringify(practiceTsMap) === JSON.stringify(practiceJson), 'serverTestCases.ts differs from serverTestCases.json')

// ---- constraint lint: every judge input (visible AND hidden) must satisfy the published constraints.
// A hidden case outside the constraints punishes correct, constraint-following code (e.g. n = 0 when 1 <= n).
const num = (t: string) => {
  const m = /^(-?)(\d+)\^(\d+)$/.exec(t.trim())
  return m ? (m[1] ? -1 : 1) * Math.pow(Number(m[2]), Number(m[3])) : Number(t.replace(/[^\d-]/g, ''))
}
const nums = (s: string) => s.trim().split(/\s+/).filter(Boolean).map(Number)
let lintChecked = 0
const lintViolations: string[] = []
function lint(label: string, constraints: string, testCases: Array<{ testIndex: number; input: string; isHidden: boolean }>) {
  const c = constraints.replace(/\s+/g, ' ')
  const rule = (re: RegExp) => re.exec(c)
  const nRange = rule(/(\d+) (?:≤|<=) n (?:≤|<=) (\d+(?:\^\d+)?)/)
  const valRange =
    rule(/values are (?:integers )?between (-?\d+\^\d+|-?\d+) and (\d+\^\d+|\d+)/) || rule(/(-?\d+(?:\^\d+)?) <= a\[i\] <= (\d+(?:\^\d+)?)/)
  const abcRange = rule(/(-?\d+\^\d+|-?\d+) (?:≤|<=) (?:a,b,c|a,b|every integer input) (?:≤|<=) (\d+\^\d+|\d+)/)
  const mRange = rule(/(\d+) <= m <= (\d+)/)
  const isGraph = /vertices are 0\.\.n-1|vertex index < n/.test(c)
  if (!nRange && !abcRange) return
  for (const tc of testCases) {
    lintChecked++
    const where = `${label}#${tc.testIndex} (${tc.isHidden ? 'hidden' : 'visible'})`
    const lines = tc.input.replace(/\r/g, '').split('\n')
    const all = nums(tc.input)
    if (abcRange) {
      const [lo, hi] = [num(abcRange[1]), num(abcRange[2])]
      if (all.some((v) => !Number.isFinite(v) || v < lo || v > hi)) lintViolations.push(`${where}: value outside [${abcRange[1]}, ${abcRange[2]}]`)
      continue
    }
    if (!nRange) continue
    const n = all[0]
    const [nLo, nHi] = [num(nRange[1]), num(nRange[2])]
    if (!Number.isInteger(n) || n < nLo || n > nHi) {
      lintViolations.push(`${where}: n=${n} outside [${nRange[1]}, ${nRange[2]}]`)
      continue
    }
    if (isGraph) {
      const m = all[1]
      if (mRange && (m < num(mRange[1]) || m > num(mRange[2]))) lintViolations.push(`${where}: m=${m} outside [${mRange[1]}, ${mRange[2]}]`)
      const edges = all.slice(2)
      if (edges.length !== 2 * m) lintViolations.push(`${where}: ${edges.length / 2} edges for m=${m}`)
      if (edges.some((v) => v < 0 || v >= n)) lintViolations.push(`${where}: vertex label outside 0..n-1`)
      continue
    }
    // "first line n, second line n values" formats (only line 2 holds the n values; later lines are other data)
    if (lines.length >= 2 && /^\s*-?\d+\s*$/.test(lines[0])) {
      const values = nums(lines[1])
      if (values.length !== n) lintViolations.push(`${where}: ${values.length} values for n=${n}`)
      if (valRange) {
        const [lo, hi] = [num(valRange[1]), num(valRange[2])]
        if (values.some((v) => v !== -1 && (v < lo || v > hi))) lintViolations.push(`${where}: value outside [${valRange[1]}, ${valRange[2]}]`)
      }
    }
  }
}
for (const q of practiceQuestions as Array<{ slug: string; constraints?: string }>) {
  const suite = getServerTests(q.slug)
  if (suite && q.constraints) lint(`practice:${q.slug}`, q.constraints, suite.testCases)
}
for (const q of codingQuestions as Array<{ slug: string; constraints?: string }>) {
  const suite = getServerTests(q.slug)
  if (suite && q.constraints) lint(`coding:${q.slug}`, q.constraints, suite.testCases)
}
check(lintViolations.length === 0, `constraint violations in judge inputs: ${lintViolations.length} (first: ${lintViolations[0] || '-'})`)

// ---- exact lookup (no fuzzy resolution)
check(getServerTests('x-arithmetic-check') === null, 'near-miss slug resolved (fuzzy lookup still present)')
check(getServerTests('arithmetic') === null, 'prefix slug resolved (fuzzy lookup still present)')
check(getServerTests('coding:does-not-exist') === null, 'unknown coding id resolved')
check(getServerTests('practice:arithmetic-check')?.questionId !== 'coding:arithmetic-check', 'source qualifier ignored')

console.log(`Practice questions checked : ${practiceQuestions.length}`)
console.log(`Coding questions checked   : ${codingQuestions.length}`)
console.log(`Server suites resolved     : ${suites}`)
console.log(`Visible tests              : ${visible}`)
console.log(`Hidden tests               : ${hidden}`)
console.log(`Total judge tests          : ${visible + hidden}`)
console.log(`Server-only suites         : ${orphans.length}${orphans.length ? ` (${orphans.slice(0, 5).join(', ')}${orphans.length > 5 ? ', …' : ''})` : ''}`)
console.log(`Cross-bank key collisions  : ${crossBank.length}`)
console.log(`Route collisions           : ${routeCollisions.length}`)
console.log(`Normalized-title overlaps  : ${titleOverlap} (informational; lookup never uses titles)`)
console.log(`Constraint-lint cases     : ${lintChecked} checked, ${lintViolations.length} violations`)
for (const v of lintViolations.slice(0, Number(process.env.LINT_SHOW || 15))) console.log('  ⚠ ' + v)
console.log(`Invalid findings           : ${failures}`)
for (const p of problems) console.log('  ❌ ' + p)
console.log(failures === 0 ? '✅ JUDGE BANK AUDIT PASSED' : '❌ JUDGE BANK AUDIT FAILED')
process.exit(failures === 0 ? 0 : 1)
