/**
 * Post-build REGRESSION guard (verified clean at audit time: src/data/problems.json carries only
 * `{testIndex, isHidden: true}` for cases 4-10). Fails the build if hidden test-case data (inputs / expected outputs of cases 4-10) or the
 * server-only test repository ends up in the browser bundle (dist/). Run automatically by `npm run build`.
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

const server = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'src', 'server', 'data', 'serverTestCases.json'), 'utf8'))
const problemsClientSource = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'src', 'data', 'problems.json'), 'utf8'))

// Strings that are legitimately public (visible cases, descriptions, examples) must not cause false positives.
const publicText = JSON.stringify(
  problemsClientSource.map((b) => b.problems.map((p) => [p.description, p.examples, p.explanation, p.exampleExplanation, p.starterCodes, p.testCases.filter((t) => !t.isHidden)]))
)

let checked = 0
const leaks = []
for (const [slug, entry] of Object.entries(server)) {
  const cases = entry.testCases || []
  cases.forEach((tc, i) => {
    if (i < 3) return
    for (const value of [tc.input, tc.expectedOutput]) {
      if (typeof value !== 'string' || value.length < 14) continue
      const needle = JSON.stringify(value).slice(1, -1)
      if (publicText.includes(needle)) continue
      checked++
      if (bundle.includes(needle)) leaks.push(`${slug}#${i + 1}`)
    }
  })
}

const markers = ['serverTestCases'].filter((m) => bundle.includes(m))

if (leaks.length || markers.length) {
  console.error(`check-bundle: FAIL - hidden test data reachable from the browser bundle (${leaks.length} cases, markers: ${markers.join(',') || 'none'})`)
  console.error(leaks.slice(0, 10).join(', '))
  process.exit(1)
}
console.log(`check-bundle: OK - ${checked} unique hidden test strings checked, none present in dist/ (${files.length} files scanned)`)
