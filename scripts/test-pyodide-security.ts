import { runInSandbox } from '../src/server/sandboxHost'
import { executePythonSafely } from '../src/lib/runner/pyodideRunner'

async function runSecurityTests() {
  console.log('========================================================================')
  console.log('🔒 PYODIDE SECURITY & ISOLATION TEST SUITE')
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

  // 1. Security escape tests
  console.log('--- 1. Testing Blocked Escape Vectors (Must Fail) ---')
  const escapeVectors: Array<{ name: string; code: string }> = [
    { name: 'import js', code: 'import js' },
    { name: 'from js import process', code: 'from js import process' },
    { name: '__import__("js")', code: '__import__("js")' },
    { name: 'importlib.import_module("js")', code: 'import importlib\nimportlib.import_module("js")' },
    { name: 'from importlib import import_module', code: 'from importlib import import_module\nm = import_module("js")' },
    { name: 'pyodide.ffi', code: 'import pyodide\nprint(pyodide.ffi)' },
    { name: 'import pyodide', code: 'import pyodide' },
    { name: 'import pyodide_js', code: 'import pyodide_js' },
    { name: 'import _pyodide', code: 'import _pyodide' },
    { name: 'import _pyodide_core', code: 'import _pyodide_core' },
    { name: 'import os', code: 'import os' },
    { name: 'from os import system', code: 'from os import system' },
    { name: 'import subprocess', code: 'import subprocess' },
    { name: 'import socket', code: 'import socket' },
    { name: 'import urllib', code: 'import urllib' },
    { name: 'import http', code: 'import http' },
    { name: 'import requests', code: 'import requests' },
    { name: 'import pathlib', code: 'import pathlib' },
    { name: 'import shutil', code: 'import shutil' },
    { name: 'import ctypes', code: 'import ctypes' },
    { name: 'sys.modules["js"]', code: 'import sys\nprint(sys.modules["js"])' },
    { name: 'sys.modules["os"]', code: 'import sys\nprint(sys.modules["os"])' },
    { name: 'sys.modules["pyodide"]', code: 'import sys\nprint(sys.modules["pyodide"])' },
    { name: 'nested import inside function', code: 'def f():\n    import js\nf()' },
    { name: 'eval __import__("js")', code: 'eval("__import__(\'js\')")' },
    { name: 'exec import js', code: 'exec("import js")' },
    { name: 'subclasses os.system evasion', code: '[c for c in ().__class__.__base__.__subclasses__() if c.__name__ == "_wrap_close"][0].__init__.__globals__["system"]("echo pwned")' },
  ]

  for (const vector of escapeVectors) {
    const outcome = await runInSandbox({
      code: vector.code,
      language: 'python',
      inputs: [''],
    })

    const hasError =
      outcome.kind === 'precheck_failed' ||
      (outcome.kind === 'ran' && outcome.cases.length > 0 && !!outcome.cases[0].error) ||
      outcome.kind === 'sandbox_failed'

    const errorMsg =
      outcome.kind === 'precheck_failed'
        ? outcome.error
        : outcome.kind === 'ran'
          ? outcome.cases[0]?.error
          : outcome.message

    assert(hasError, `Blocked escape: ${vector.name}`, errorMsg)
  }

  // 2. Legitimate Python code passes
  console.log('\n--- 2. Testing Legitimate Standard Python Libraries ---')
  const legitimateCode = `
import sys, math, json, collections, itertools, heapq, functools
data = sys.stdin.read().split()
a, b = int(data[0]), int(data[1])
c = collections.Counter([1, 2, 2, 3])
h = [3, 1, 2]
heapq.heapify(h)
print(f"sum={a+b}, sqrt={math.sqrt(16)}, counter={c[2]}, min_heap={heapq.heappop(h)}")
`
  const legitOutcome = await runInSandbox({
    code: legitimateCode,
    language: 'python',
    inputs: ['10 20'],
  })

  assert(legitOutcome.kind === 'ran', 'Legitimate Python execution succeeded')
  if (legitOutcome.kind === 'ran') {
    const c = legitOutcome.cases[0]
    assert(!c.error, 'Legitimate execution produced no errors')
    assert(
      c.output === 'sum=30, sqrt=4.0, counter=2, min_heap=1',
      `Output matches expected: "${c.output}"`
    )
  }

  // 3. State isolation test
  console.log('\n--- 3. Testing Run-to-Run Isolation ---')
  // Run A: Corrupts builtins, pollutes globals, and alters sys.modules
  const poisonCode = `
import builtins, sys
builtins.print = None
x = 99999
sys.modules['poison_module'] = 12345
`
  // Run B: Standard print must still work, globals must not have x, sys.modules must not have poison_module
  const checkCode = `
import sys
has_x = 'x' in globals()
has_poison = 'poison_module' in sys.modules
print(f"PRINT_OK, has_x={has_x}, has_poison={has_poison}")
`
  // Execute sequentially through the sandbox
  const resA = await runInSandbox({
    code: poisonCode,
    language: 'python',
    inputs: [''],
  })
  assert(resA.kind === 'ran', 'Poison run A executed')

  const resB = await runInSandbox({
    code: checkCode,
    language: 'python',
    inputs: [''],
  })

  assert(resB.kind === 'ran', 'Check run B executed')
  if (resB.kind === 'ran') {
    const out = resB.cases[0]?.output || ''
    const err = resB.cases[0]?.error
    assert(!err, 'Check run B ran without errors (builtins.print was restored)')
    assert(
      out.includes('PRINT_OK, has_x=False, has_poison=False'),
      `Run B output verified clean state: "${out}"`
    )
  }

  // Also test direct isolation within one job across multiple test cases
  console.log('\n--- 4. Testing Multi-Case Isolation Within Single Job ---')
  const multiCaseTest = await runInSandbox({
    code: `
import sys
line = sys.stdin.read().strip()
if line == '0':
    import builtins
    builtins.print = None
else:
    print(f"CASE_{line}_OK")
`,
    language: 'python',
    inputs: ['0', '1', '2'],
  })

  assert(multiCaseTest.kind === 'ran', 'Multi-case job executed')
  if (multiCaseTest.kind === 'ran') {
    assert(multiCaseTest.cases[1].output === 'CASE_1_OK', `Case 1 printed despite Case 0 poison: "${multiCaseTest.cases[1].output}"`)
    assert(multiCaseTest.cases[2].output === 'CASE_2_OK', `Case 2 printed despite Case 0 poison: "${multiCaseTest.cases[2].output}"`)
  }

  // 5. In-Memory Virtual FileSystem Isolation Test (No Leaks between Run A and Run B)
  console.log('\n--- 5. Testing Filesystem Isolation (/tmp and cwd) ---')
  const fsRunA = await runInSandbox({
    code: `
with open('/tmp/x.txt', 'w') as f:
    f.write('secret_token_tmp')
with open('local.txt', 'w') as f:
    f.write('secret_token_local')
print("WRITTEN")
`,
    language: 'python',
    inputs: [''],
  })
  assert(fsRunA.kind === 'ran', 'Run A file write executed')

  const fsRunB = await runInSandbox({
    code: `
tmp_found = False
local_found = False
try:
    with open('/tmp/x.txt') as f:
        tmp_found = True
except FileNotFoundError:
    pass

try:
    with open('local.txt') as f:
        local_found = True
except FileNotFoundError:
    pass

print(f"tmp_found={tmp_found}, local_found={local_found}")
`,
    language: 'python',
    inputs: [''],
  })

  assert(fsRunB.kind === 'ran', 'Run B file read executed')
  if (fsRunB.kind === 'ran') {
    const out = fsRunB.cases[0]?.output || ''
    assert(
      out.includes('tmp_found=False, local_found=False'),
      `Run B verified files wiped between runs: "${out}"`
    )
  }

  // 6. Recursion limit, stdout, and random seed isolation
  console.log('\n--- 6. Testing sys.setrecursionlimit, sys.stdout, and random.seed Isolation ---')
  const tamperRunA = await runInSandbox({
    code: `
import sys, random
sys.setrecursionlimit(10)
random.seed(12345)
sys.stdout = None
`,
    language: 'python',
    inputs: [''],
  })
  assert(tamperRunA.kind === 'ran', 'Tamper run A executed')

  const tamperRunB = await runInSandbox({
    code: `
import sys
rec_limit = sys.getrecursionlimit()
def recurse(n):
    if n <= 0:
        return 0
    return 1 + recurse(n - 1)

r50 = recurse(50)
print(f"REC_OK={rec_limit >= 1000}, depth50={r50}")
`,
    language: 'python',
    inputs: [''],
  })

  assert(tamperRunB.kind === 'ran', 'Tamper run B executed')
  if (tamperRunB.kind === 'ran') {
    const out = tamperRunB.cases[0]?.output || ''
    const err = tamperRunB.cases[0]?.error
    assert(!err, 'Tamper run B has working stdout and no recursion error')
    assert(
      out.includes('REC_OK=True, depth50=50'),
      `Run B verified clean recursion limit and stdout: "${out}"`
    )
  }

  // 7. Threading and Background Tasks Blocked
  console.log('\n--- 7. Testing Threading & Background Task Isolation ---')
  const threadAttempt = await runInSandbox({
    code: `
import threading
def task():
    pass
t = threading.Thread(target=task)
t.start()
print("THREAD_STARTED")
`,
    language: 'python',
    inputs: [''],
  })
  const threadBlocked =
    threadAttempt.kind === 'precheck_failed' ||
    (threadAttempt.kind === 'ran' && !!threadAttempt.cases[0]?.error) ||
    threadAttempt.kind === 'sandbox_failed'
  assert(threadBlocked, 'Threading import or startup is strictly blocked')

  console.log(`\n========================================================================`)
  console.log(`SUMMARY: ${passed} passed, ${failed} failed`)
  console.log(`========================================================================`)
  if (failed > 0) process.exit(1)
}

runSecurityTests().catch((e) => {
  console.error('Fatal test error:', e)
  process.exit(1)
})
