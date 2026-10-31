/**
 * One-off judge-data correction (2026-10-07), kept for provenance. Found by the constraint lint in
 * scripts/test-judge-bank-audit.ts.
 *
 * The published constraints of these practice problems say 1 <= n <= 100000, but one case per suite used n = 0
 * (mostly with the n-values line missing entirely). Constraint-following solutions read that line and fail
 * (Python: EOFError), so correct code lost hidden cases. Each violating case is replaced by a valid boundary case
 * (n = 1, extreme values) whose expected output is COMPUTED by the solver below. Server copies (.json + .ts) and the
 * client copy of visible cases are updated identically.
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const serverJson = path.join(root, 'src', 'server', 'data', 'serverTestCases.json')
const serverTs = path.join(root, 'src', 'server', 'data', 'serverTestCases.ts')
const clientJson = path.join(root, 'src', 'data', 'problems.json')

const FIXES = [
  {
    family: /distinct-count-v\d+$/,
    testIndex: 5,
    isBad: (input) => input.trim() === '0',
    input: '1\n-1000000000',
    solve: (input) => {
      const [, ...a] = input.split(/\s+/).map(Number)
      return String(new Set(a).size)
    },
  },
  {
    family: /frequency-of-target-v\d+$/,
    testIndex: 10,
    isBad: (input) => /^0\s+-?\d+\s*$/.test(input.trim()),
    input: '1 1000000000\n1000000000',
    solve: (input) => {
      const [n, t, ...a] = input.split(/\s+/).map(Number)
      return String(a.slice(0, n).filter((v) => v === t).length)
    },
  },
  {
    family: /merge-sorted-arrays-v\d+$/,
    testIndex: 3,
    isBad: (input) => /^0\s+\d+/.test(input.trim()),
    input: '1 2\n-1000000000\n-1000000000 1000000000',
    solve: (input) => {
      const lines = input.split('\n')
      const [n, m] = lines[0].split(/\s+/).map(Number)
      const a = lines[1].split(/\s+/).map(Number).slice(0, n)
      const b = lines[2].split(/\s+/).map(Number).slice(0, m)
      return [...a, ...b].sort((x, y) => x - y).join(' ')
    },
  },
]

function applyTo(bank, getCases) {
  const changed = []
  for (const [slug, entry] of Object.entries(bank)) {
    for (const fix of FIXES) {
      if (!fix.family.test(slug)) continue
      const tc = getCases(entry).find((t) => t.testIndex === fix.testIndex)
      if (tc && typeof tc.input === 'string' && fix.isBad(tc.input)) {
        tc.input = fix.input
        tc.expectedOutput = fix.solve(fix.input)
        changed.push(`${slug}#${fix.testIndex}`)
      }
    }
  }
  return changed
}

const sj = JSON.parse(fs.readFileSync(serverJson, 'utf8'))
const changedJson = applyTo(sj, (e) => e.testCases)
fs.writeFileSync(serverJson, JSON.stringify(sj, null, 2), 'utf8')

const ts = fs.readFileSync(serverTs, 'utf8')
const marker = 'export const serverTestCases = '
const start = ts.indexOf(marker) + marker.length
const end = ts.lastIndexOf('} as const;')
const st = JSON.parse(ts.slice(start, end + 1))
const changedTs = applyTo(st, (e) => e.testCases)
fs.writeFileSync(serverTs, ts.slice(0, start) + JSON.stringify(st, null, 2) + ts.slice(end + 1), 'utf8')

// Client copy holds VISIBLE cases only (hidden entries are content-free placeholders).
const cj = JSON.parse(fs.readFileSync(clientJson, 'utf8'))
const clientBank = {}
for (const belt of cj) for (const p of belt.problems) clientBank[p.slug] = p
const changedClient = applyTo(clientBank, (p) => p.testCases.filter((t) => !t.isHidden))
fs.writeFileSync(clientJson, JSON.stringify(cj, null, 2), 'utf8')

console.log(`server json: ${changedJson.length} cases | server ts: ${changedTs.length} cases | client visible: ${changedClient.length} cases`)
for (const fix of FIXES) console.log(`  ${fix.family.source}#${fix.testIndex}: ${JSON.stringify(fix.input)} => ${JSON.stringify(fix.solve(fix.input))}`)
