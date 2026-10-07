/**
 * One-off judge-data correction (2026-10-07), kept for provenance.
 *
 * Defect: in 16 "Reverse Array" practice suites, hidden case 7 used n = 0 with an empty second line, although the
 * published constraints are 1 <= n <= 100000. A correct solution written to the constraints (e.g. Python
 * `n = int(input()); arr = list(map(int, input().split()))`) raises EOFError on that input, so correct code failed a
 * hidden case. The original markdown source no longer exists in the repo, so the generated server datasets are the
 * source of truth and are corrected here (both copies, identically).
 *
 * Replacement: a valid boundary case inside the constraints (min/max values, zero, negative), expected output computed
 * by reversing - not hand-typed.
 */
const fs = require('fs')
const path = require('path')

const jsonPath = path.join(__dirname, '..', 'src', 'server', 'data', 'serverTestCases.json')
const tsPath = path.join(__dirname, '..', 'src', 'server', 'data', 'serverTestCases.ts')

const values = [-1000000000, 1000000000, 0, -5, 999999999]
const replacement = {
  input: `${values.length}\n${values.join(' ')}`,
  expectedOutput: [...values].reverse().join(' '),
}

function fix(bank) {
  const changed = []
  for (const [slug, suite] of Object.entries(bank)) {
    if (!/reverse-array-v\d+$/.test(slug)) continue
    const tc = suite.testCases.find((t) => t.testIndex === 7)
    if (tc && tc.input.trim() === '0' && tc.expectedOutput === '') {
      tc.input = replacement.input
      tc.expectedOutput = replacement.expectedOutput
      changed.push(slug)
    }
  }
  return changed
}

const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
const changedJson = fix(json)
fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2), 'utf8')

const ts = fs.readFileSync(tsPath, 'utf8')
const marker = 'export const serverTestCases = '
const start = ts.indexOf(marker) + marker.length
const end = ts.lastIndexOf('} as const;')
const tsObj = JSON.parse(ts.slice(start, end + 1))
const changedTs = fix(tsObj)
fs.writeFileSync(tsPath, ts.slice(0, start) + JSON.stringify(tsObj, null, 2) + ts.slice(end + 1), 'utf8')

console.log(`json: ${changedJson.length} suites corrected; ts: ${changedTs.length} suites corrected`)
console.log(`new case 7: input=${JSON.stringify(replacement.input)} expected=${JSON.stringify(replacement.expectedOutput)}`)
