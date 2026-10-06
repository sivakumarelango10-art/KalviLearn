/**
 * Post-build REGRESSION guard.
 * Fails the build if any hidden test-case data (inputs / expected outputs of cases 4-10) or
 * server-only test repositories end up in the browser bundle (dist/).
 * Run automatically by `npm run build` and `npm run check:bundle`.
 */
const fs = require('fs')
const path = require('path')

const dist = process.env.DIST_DIR ? path.resolve(process.env.DIST_DIR) : path.resolve(__dirname, '..', 'dist')
if (!fs.existsSync(dist)) {
  console.error('check-bundle: dist/ not found - run vite build first')
  process.exit(1)
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })
}
const files = walk(dist).filter((f) => /\.(js|mjs|html|json|map)$/.test(f))
const bundle = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n')

// Read client-safe sources to identify legitimately public strings (descriptions, worked examples, visible tests)
let publicText = ''

const problemsClientPath = path.resolve(__dirname, '..', 'src', 'data', 'problems.json')
if (fs.existsSync(problemsClientPath)) {
  try {
    const problemsClientSource = JSON.parse(fs.readFileSync(problemsClientPath, 'utf8'))
    publicText += JSON.stringify(
      problemsClientSource.map((b) =>
        b.problems.map((p) => [
          p.description,
          p.examples,
          p.explanation,
          p.exampleExplanation,
          p.starterCodes,
          p.testCases.filter((t) => !t.isHidden),
        ])
      )
    )
  } catch (e) {}
}

const codingClientQuestionsPath = path.resolve(__dirname, '..', 'src', 'data', 'coding', 'questions.json')
if (fs.existsSync(codingClientQuestionsPath)) {
  try {
    const codingQuestions = JSON.parse(fs.readFileSync(codingClientQuestionsPath, 'utf8'))
    publicText += JSON.stringify(
      Object.values(codingQuestions).map((q) => [
        q.title,
        q.problemStatement,
        q.inputFormat,
        q.outputFormat,
        q.constraints,
        q.examples,
        q.visibleTests,
      ])
    )
  } catch (e) {}
}

// 1. Check Belt server test cases
let checked = 0
const leaks = []

const serverBeltPath = path.resolve(__dirname, '..', 'src', 'server', 'data', 'serverTestCases.json')
if (fs.existsSync(serverBeltPath)) {
  const server = JSON.parse(fs.readFileSync(serverBeltPath, 'utf8'))
  for (const [slug, entry] of Object.entries(server)) {
    const cases = entry.testCases || []
    cases.forEach((tc, i) => {
      if (i < 3) return
      for (const value of [tc.input, tc.expectedOutput]) {
        if (typeof value !== 'string' || value.length < 10) continue
        const needle = JSON.stringify(value).slice(1, -1)
        if (publicText.includes(needle)) continue
        checked++
        if (bundle.includes(needle)) leaks.push(`belt:${slug}#${i + 1}`)
      }
    })
  }
}

// 2. Check 740 Coding Bank server test cases (5,180 hidden test cases)
const codingServerPath = path.resolve(__dirname, '..', 'src', 'server', 'data', 'codingTestCases.json')
if (fs.existsSync(codingServerPath)) {
  const codingServer = JSON.parse(fs.readFileSync(codingServerPath, 'utf8'))
  for (const [slug, entry] of Object.entries(codingServer)) {
    const cases = entry.testCases || []
    cases.forEach((tc) => {
      if (!tc.isHidden && tc.testIndex <= 3) return
      for (const value of [tc.input, tc.expectedOutput]) {
        if (typeof value !== 'string' || value.length < 10) continue
        const needle = JSON.stringify(value).slice(1, -1)
        if (publicText.includes(needle)) continue
        checked++
        if (bundle.includes(needle)) leaks.push(`coding:${slug}#${tc.testIndex}`)
      }
    })
  }
}

// Ensure server repository exports/identifiers are not bundled in frontend
const markers = ['serverTestCases', 'codingTestCases'].filter((m) => {
  // Only flag if it appears as an actual code identifier in a non-api bundle
  return bundle.includes(`export const ${m}`) || bundle.includes(`"${m}":`)
})

if (leaks.length || markers.length) {
  console.error(`check-bundle: FAIL - hidden test data reachable from the browser bundle (${leaks.length} cases, markers: ${markers.join(',') || 'none'})`)
  console.error(leaks.slice(0, 10).join(', '))
  process.exit(1)
}
console.log(`check-bundle: OK - ${checked} unique hidden test strings checked, none present in dist/ (${files.length} files scanned)`)
