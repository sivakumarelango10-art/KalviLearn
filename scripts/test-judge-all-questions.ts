/**
 * End-to-end check of EVERY question (500 practice + 740 coding = 1,240 questions, 12,400 test cases).
 *
 * For each question a known-correct Python program is submitted through the production Submit path
 * (executeQuestion, mode 'submit'): exact question lookup -> server-side 10-case suite -> real CPython (native
 * engine; or Judge0 when JUDGE0_URL is set) -> output comparison -> verdict. Every question must be ACCEPTED 10/10,
 * which proves that the hidden cases are present, placed at indexes 4-10, and gradeable by a correct solution.
 *
 * The program is the independent oracle (scripts/practice_oracle.py / scripts/judge_oracle.py) with only the
 * question's STATEMENT embedded - it never reads stored test data.  Prints metadata only.
 *
 *   npx tsx scripts/test-judge-all-questions.ts [--bank practice|coding] [--limit N]
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const args = process.argv.slice(2)
const onlyBank = args.includes('--bank') ? args[args.indexOf('--bank') + 1] : null
const limit = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : Infinity

function stripMain(source: string): string {
  const stripped = source.replace(/\r\n/g, '\n').replace(/\nif __name__ == ["']__main__["']:\n\s+main\(\)\s*$/, '\n')
  if (/\nif __name__ == /.test(stripped)) throw new Error('could not remove the oracle entry point')
  return stripped
}

const practiceOracle = stripMain(readFileSync(join(ROOT, 'scripts', 'practice_oracle.py'), 'utf8'))
const codingOracle = stripMain(readFileSync(join(ROOT, 'scripts', 'judge_oracle.py'), 'utf8')).replace(
  /^ROOT = .*?\nif isinstance\(QUESTIONS, dict\):\n {4}QUESTIONS = list\(QUESTIONS\.values\(\)\)\n/ms,
  'BANK = {}\nQUESTIONS = []\n'
)
// The submitted programs must compute answers from the statement only - never read the stored test data.
if (/read_text|BANK = json/.test(codingOracle)) throw new Error('coding oracle program would read the test bank')

function practiceProgram(slug: string, statement: string): string {
  return `${practiceOracle}
_fn = FAMILIES[family_of(${JSON.stringify(slug)})]
_inp = sys.stdin.read()
_out = _fn(_inp, ${JSON.stringify(statement)}) if getattr(_fn, 'wants_statement', False) else _fn(_inp)
sys.stdout.write(str(_out) + "\\n")
`
}

function codingProgram(q: { slug: string; problemStatement: string }): string {
  return `${codingOracle}
_q = {"slug": ${JSON.stringify(q.slug)}, "problemStatement": ${JSON.stringify(q.problemStatement)}}
_fam, _fn = family_of(_q)
sys.stdout.write(str(_fn(sys.stdin.read())) + "\\n")
`
}

async function main() {
  const { executeQuestion } = await import('../src/server/executeService')
  const { nativeAvailable } = await import('../src/server/judge/native')
  if (!process.env.JUDGE0_URL && !nativeAvailable('python')) {
    console.error('No real Python runtime (native engine) and no JUDGE0_URL: cannot run the end-to-end bank check.')
    process.exit(1)
  }

  type Job = { bank: 'practice' | 'coding'; slug: string; code: string }
  const jobs: Job[] = []
  if (onlyBank !== 'coding') {
    const belts = JSON.parse(readFileSync(join(ROOT, 'src', 'data', 'problems.json'), 'utf8')) as Array<{ problems: Array<{ slug: string; inputFormat: string }> }>
    for (const p of belts.flatMap((b) => b.problems).slice(0, limit)) jobs.push({ bank: 'practice', slug: p.slug, code: practiceProgram(p.slug, p.inputFormat) })
  }
  if (onlyBank !== 'practice') {
    const raw = JSON.parse(readFileSync(join(ROOT, 'src', 'data', 'coding', 'questions.json'), 'utf8'))
    const list = (Array.isArray(raw) ? raw : Object.values(raw)) as Array<{ slug: string; problemStatement: string }>
    for (const q of list.slice(0, limit)) jobs.push({ bank: 'coding', slug: q.slug, code: codingProgram(q) })
  }

  const tally = { practice: { ok: 0, bad: 0 }, coding: { ok: 0, bad: 0 } }
  const engines = new Set<string>()
  const failures: string[] = []
  let next = 0
  let done = 0
  const t0 = Date.now()
  const worker = async () => {
    while (next < jobs.length) {
      const job = jobs[next++]
      const r = await executeQuestion({
        questionSlug: job.bank === 'coding' ? `coding:${job.slug}` : `practice:${job.slug}`,
        language: 'python',
        code: job.code,
        mode: 'submit',
      })
      engines.add(r.engine || 'none')
      const ok = r.status === 'ACCEPTED' && r.passed === 10 && r.total === 10 && r.hiddenCount === 7
      tally[job.bank][ok ? 'ok' : 'bad']++
      if (!ok) {
        const failed = r.testCases.filter((t) => t.status !== 'passed').map((t) => `${t.testIndex}${t.visible ? 'v' : 'h'}:${t.status}`)
        const visibleError = r.testCases.find((t) => t.visible && t.error)?.error || r.message || ''
        failures.push(`${job.bank}:${job.slug} -> ${r.status} ${r.passed}/${r.total} [${failed.join(' ')}] ${visibleError.slice(-160)}`)
      }
      if (++done % 100 === 0) console.log(`  ... ${done}/${jobs.length} questions (${Math.round((Date.now() - t0) / 1000)}s)`)
    }
  }
  await Promise.all(Array.from({ length: 3 }, worker))

  console.log('========================================================================')
  console.log(`ALL-QUESTION SUBMIT CHECK (engine: ${[...engines].join(', ')})`)
  console.log(`  practice: ${tally.practice.ok} accepted 10/10, ${tally.practice.bad} not accepted`)
  console.log(`  coding  : ${tally.coding.ok} accepted 10/10, ${tally.coding.bad} not accepted`)
  console.log(`  test cases executed: ${(tally.practice.ok + tally.practice.bad + tally.coding.ok + tally.coding.bad) * 10}`)
  for (const f of failures.slice(0, 60)) console.log('  x ' + f)
  if (failures.length > 60) console.log(`  ... ${failures.length - 60} more`)
  console.log('========================================================================')
  process.exit(failures.length ? 1 : 0)
}

main().catch((err) => {
  console.error('all-question check crashed:', err)
  process.exit(1)
})
