/**
 * Common ways students read stdin and write stdout in Node.js. Used to check that the in-sandbox Node.js runner
 * (the production engine for JavaScript when no Judge0 endpoint is configured) behaves exactly like real Node.
 */
export interface NodeIoPattern {
  name: string
  input: string
  code: string
  /** stdout of real Node.js on Linux (the judge platform), trimmed */
  expected: string
  /** true when the pattern depends on Linux (e.g. /dev/stdin) and cannot be cross-checked with Node on Windows */
  linuxOnly?: boolean
}

const SUM_INPUT = '3\n1 2 3\n'

export const NODE_IO_PATTERNS: NodeIoPattern[] = [
  {
    name: 'fs.readFileSync(0, utf8)',
    input: SUM_INPUT,
    code: `const lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n'); console.log(lines[1].split(' ').map(Number).reduce((a, b) => a + b, 0))`,
    expected: '6',
  },
  {
    name: "fs.readFileSync('/dev/stdin').toString()",
    input: SUM_INPUT,
    code: `const fs = require('fs'); const d = fs.readFileSync('/dev/stdin').toString().trim().split(/\\s+/).map(Number); console.log(d.slice(1).reduce((a, b) => a + b, 0))`,
    expected: '6',
    linuxOnly: true,
  },
  {
    name: "require('node:fs')",
    input: SUM_INPUT,
    code: `const { readFileSync } = require('node:fs'); const t = readFileSync(0, 'utf8').split(/\\s+/).filter(Boolean).map(Number); console.log(t.slice(1).reduce((a, b) => a + b, 0))`,
    expected: '6',
  },
  {
    name: "const readline = require('readline')",
    input: SUM_INPUT,
    code: `const readline = require('readline'); const rl = readline.createInterface({ input: process.stdin }); const lines = []; rl.on('line', (l) => lines.push(l)); rl.on('close', () => { console.log(lines[1].split(' ').map(Number).reduce((a, b) => a + b, 0)) })`,
    expected: '6',
  },
  {
    name: 'readline chained .on().on()',
    input: SUM_INPUT,
    code: `const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout, terminal: false }); const lines = []; rl.on('line', (l) => lines.push(l)).on('close', () => console.log(lines.length))`,
    expected: '2',
  },
  {
    name: "readline: 'close' registered before 'line'",
    input: SUM_INPUT,
    code: `const rl = require('readline').createInterface({ input: process.stdin }); const lines = []; rl.on('close', () => console.log(lines.join('|'))); rl.on('line', (l) => lines.push(l))`,
    expected: '3|1 2 3',
  },
  {
    name: 'readline async iterator',
    input: SUM_INPUT,
    code: `const readline = require('readline'); (async () => { const rl = readline.createInterface({ input: process.stdin }); const lines = []; for await (const l of rl) lines.push(l); console.log(lines.length, lines[1]) })()`,
    expected: '2 1 2 3',
  },
  {
    name: 'process.stdin data/end + resume/setEncoding',
    input: SUM_INPUT,
    code: `process.stdin.resume(); process.stdin.setEncoding('utf8'); let s = ''; process.stdin.on('data', (c) => (s += c)); process.stdin.on('end', () => { const t = s.split(/\\s+/).filter(Boolean).map(Number); console.log(t.slice(1).reduce((a, b) => a + b, 0)) })`,
    expected: '6',
  },
  {
    name: "process.stdin 'end' registered before 'data'",
    input: SUM_INPUT,
    code: `let s = ''; process.stdin.on('end', () => console.log(s.trim().split('\\n').length)); process.stdin.on('data', (c) => (s += c))`,
    expected: '2',
  },
  {
    name: 'process.stdout.write pieces',
    input: SUM_INPUT,
    code: `const a = require('fs').readFileSync(0, 'utf8').trim().split('\\n')[1].split(' '); for (const x of a) process.stdout.write(x + ' '); process.stdout.write('\\n')`,
    expected: '1 2 3',
  },
  {
    name: 'stdout.write then console.log',
    input: SUM_INPUT,
    code: `process.stdout.write('a'); process.stdout.write('b'); console.log('c'); process.stdout.write('d\\n')`,
    expected: 'abc\nd',
  },
  {
    name: 'console.error is stderr (not graded)',
    input: SUM_INPUT,
    code: `console.error('debug info'); console.log(42)`,
    expected: '42',
  },
  {
    name: 'user-defined print()',
    input: SUM_INPUT,
    code: `function print(x) { console.log(x) } print(7)`,
    expected: '7',
  },
  {
    name: 'user const readline (own helper)',
    input: SUM_INPUT,
    code: `const data = require('fs').readFileSync(0, 'utf8').split('\\n'); let i = 0; const readline = () => data[i++]; readline(); console.log(readline())`,
    expected: '1 2 3',
  },
  {
    name: 'readline trailing newline (no empty last line)',
    input: 'abc\n',
    code: `const lines = []; require('readline').createInterface({ input: process.stdin }).on('line', (l) => lines.push(l)).on('close', () => console.log(lines.length))`,
    expected: '1',
  },
  {
    name: 'readline keeps a blank first line',
    input: '\nabc',
    code: `const lines = []; require('readline').createInterface({ input: process.stdin }).on('line', (l) => lines.push(l)).on('close', () => console.log(JSON.stringify(lines)))`,
    expected: '["","abc"]',
  },
  {
    name: 'console.log multiple args / numbers',
    input: SUM_INPUT,
    code: `console.log(1, 'a', 2.5, true, null)`,
    expected: '1 a 2.5 true null',
  },
  {
    name: 'BigInt arithmetic printed via String',
    input: '1000000000 1000000000 1000000000\n',
    code: `const [a, b, c] = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(BigInt); console.log(String((a + b) * c - b))`,
    expected: '1999999999000000000',
  },
]
