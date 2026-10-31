import { runInSandbox } from '../src/server/sandboxHost'

async function runResourceLimitTests() {
  console.log('========================================================================')
  console.log('⏱️ PYODIDE RESOURCE LIMITS & HOST-KILL TEST SUITE')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function assert(condition: boolean, testName: string, detail?: unknown) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`)
      passed++
    } else {
      console.error(`  ❌ [FAIL] ${testName}`, detail || '')
      failed++
      process.exitCode = 1
    }
  }

  // 1. Deep recursion test
  console.log('--- 1. Testing Deep Recursion ---')
  const recursionCode = `
def recurse(n):
    return recurse(n + 1)
recurse(0)
`
  const recOutcome = await runInSandbox({
    code: recursionCode,
    language: 'python',
    inputs: [''],
  })

  assert(
    recOutcome.kind === 'ran' && !!recOutcome.cases[0]?.error,
    'Deep recursion is caught cleanly',
    recOutcome
  )
  if (recOutcome.kind === 'ran') {
    const err = recOutcome.cases[0]?.error || ''
    assert(
      /recursion/i.test(err),
      `Error mentions recursion: "${err}"`
    )
  }

  // 2. Huge memory allocation test
  console.log('\n--- 2. Testing Memory Bomb (x = [0] * 10**9) ---')
  const memoryCode = `
x = [0] * (10**9)
print(len(x))
`
  const memOutcome = await runInSandbox({
    code: memoryCode,
    language: 'python',
    inputs: [''],
  })

  const memCaught =
    (memOutcome.kind === 'ran' && !!memOutcome.cases[0]?.error && /memory/i.test(memOutcome.cases[0]?.error)) ||
    (memOutcome.kind === 'sandbox_failed' && (memOutcome.reason === 'memory' || /memory/i.test(memOutcome.message)))

  assert(
    memCaught,
    'Memory bomb is caught and terminated (Memory Limit Exceeded / MemoryError)',
    memOutcome
  )

  // 3. Infinite loop test (killed by host SIGKILL timer)
  console.log('\n--- 3. Testing Infinite Loop (while True: pass) ---')
  console.log('  Waiting for host process SIGKILL timeout (approx 10s)...')
  const t0 = Date.now()
  const loopOutcome = await runInSandbox({
    code: 'while True:\n    pass',
    language: 'python',
    inputs: [''],
  })
  const durationMs = Date.now() - t0

  assert(
    loopOutcome.kind === 'sandbox_failed' && loopOutcome.reason === 'timeout',
    `Infinite loop killed by host SIGKILL after ${durationMs}ms`,
    loopOutcome
  )

  console.log(`\n========================================================================`)
  console.log(`SUMMARY: ${passed} passed, ${failed} failed`)
  console.log(`========================================================================`)
  if (failed > 0) process.exit(1)
}

runResourceLimitTests().catch((e) => {
  console.error('Fatal test error:', e)
  process.exit(1)
})
