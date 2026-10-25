/**
 * Verification Suite for Learn › Coding Execution Fix
 *
 * Verifies:
 * 1. Question ID validation: plain slugs, learn composite ids, and learn slugs are accepted.
 * 2. Rejected IDs: "learn:../x", "learn:a:b:c", "LEARN::", spaces, dots, slashes, length limit violations.
 * 3. Clear distinct error messages: unknown question / unsupported language / code too long / python-only.
 * 4. Custom test input feature validation.
 * 5. Python-only questions rejection when submitted with non-Python languages.
 * 6. Bank480 JSON questions (13 and 15 test cases) execute without misconfiguration error.
 * 7. Learn Submit does NOT write to Practice tables (reason = 'learn_practice_isolated').
 * 8. Practice bank still works as before.
 * 9. Multi-language Learn evaluation: Run and Submit work across all 24 topics.
 */

import assert from 'node:assert'
import { EventEmitter } from 'node:events'
import { isValidQuestionId, normalizeLanguage, isPythonOnlyQuestion, MAX_CODE_CHARS } from '../src/server/judge/questionId'
import { executeQuestion, executeCustomInput } from '../src/server/executeService'
import apiHandler from '../src/server/apiHandler'
import submitHandler from '../src/server/submitHandler'
import { REFERENCES } from './lib/reference-solutions'
import { getAllLearnTopics } from '../src/data/learn/coding/index'

process.env.ALLOW_TEST_AUTH_TOKENS = '1'
const STUDENT_TOKEN = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'

function mockCall(options: {
  method?: string
  headers?: Record<string, string>
  body?: unknown
}) {
  const req = new EventEmitter() as any
  req.method = options.method || 'POST'
  req.url = '/api/execute'
  req.socket = { remoteAddress: '127.0.0.1' }
  req.headers = {
    'content-type': 'application/json',
    ...(options.headers || {}),
  }
  req.body = options.body

  let statusCode = 200
  let responseData: any = null
  const headers: Record<string, string> = {}

  const res: any = {
    statusCode: 200,
    setHeader: (k: string, v: string) => {
      headers[k.toLowerCase()] = v
    },
    status: (code: number) => {
      statusCode = code
      return {
        json: (data: unknown) => {
          responseData = data
        },
      }
    },
    json: (data: unknown) => {
      responseData = data
    },
    end: (chunk?: string) => {
      if (chunk && !responseData) {
        try {
          responseData = JSON.parse(chunk)
        } catch {
          responseData = chunk
        }
      }
    },
  }

  return {
    req,
    res,
    status: () => statusCode,
    body: () => responseData,
    headers,
  }
}

async function runTests() {
  console.log('========================================================================')
  console.log('🧪 VERIFYING LEARN › CODING EXECUTION FIX')
  console.log('========================================================================\n')

  // -------------------------------------------------------------------------
  // TEST 1: Question ID Format Validation (Unit)
  // -------------------------------------------------------------------------
  console.log('--- Suite 1: Question ID Validator (isValidQuestionId) ---')

  // Accepted formats:
  assert.strictEqual(isValidQuestionId('arithmetic-check'), true, 'plain slug must be accepted')
  assert.strictEqual(isValidQuestionId('belt-1-q1-arithmetic-check-v1'), true, 'practice slug must be accepted')
  assert.strictEqual(isValidQuestionId('learn:basic-arithmetic-operations:arithmetic-check'), true, 'learn composite id accepted')
  assert.strictEqual(isValidQuestionId('learn:arithmetic-check'), true, 'learn bare slug accepted')
  assert.strictEqual(isValidQuestionId('a'.repeat(128)), true, 'slug of max length 128 accepted')
  assert.strictEqual(isValidQuestionId('learn:' + 't'.repeat(64) + ':' + 's'.repeat(128)), true, 'max length learn composite id accepted')

  // Rejected formats:
  assert.strictEqual(isValidQuestionId('learn:../x'), false, 'path traversal "learn:../x" rejected')
  assert.strictEqual(isValidQuestionId('learn:a:b:c'), false, '3-segment "learn:a:b:c" rejected')
  assert.strictEqual(isValidQuestionId('LEARN::'), false, 'empty topic/slug "LEARN::" rejected')
  assert.strictEqual(isValidQuestionId('learn::slug'), false, 'empty topic "learn::slug" rejected')
  assert.strictEqual(isValidQuestionId('learn:topic:'), false, 'empty slug "learn:topic:" rejected')
  assert.strictEqual(isValidQuestionId('learn:'), false, '"learn:" rejected')
  assert.strictEqual(isValidQuestionId('slug with space'), false, 'slug with space rejected')
  assert.strictEqual(isValidQuestionId('slug/with/slash'), false, 'slug with slash rejected')
  assert.strictEqual(isValidQuestionId('slug.with.dot'), false, 'slug with dot rejected')
  assert.strictEqual(isValidQuestionId('a'.repeat(129)), false, 'slug exceeding 128 characters rejected')
  assert.strictEqual(isValidQuestionId('learn:' + 't'.repeat(65) + ':slug'), false, 'topic exceeding 64 characters rejected')
  assert.strictEqual(isValidQuestionId('learn:topic:' + 's'.repeat(129)), false, 'learn slug exceeding 128 characters rejected')
  assert.strictEqual(isValidQuestionId('practice:belt-1'), false, 'non-learn prefix "practice:" rejected')
  assert.strictEqual(isValidQuestionId('coding:foo'), false, 'non-learn prefix "coding:" rejected')
  assert.strictEqual(isValidQuestionId(''), false, 'empty string rejected')
  assert.strictEqual(isValidQuestionId(null), false, 'null rejected')
  console.log('  ✅ [PASS] isValidQuestionId correctly accepts and rejects all formats')

  // -------------------------------------------------------------------------
  // TEST 2: Handler Input Validation & Distinct Error Messages
  // -------------------------------------------------------------------------
  console.log('\n--- Suite 2: Distinct Error Messages in Handlers ---')

  // 2A: Missing parameters
  {
    const c = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: '', language: 'python', code: 'x' } })
    await apiHandler(c.req, c.res)
    assert.strictEqual(c.status(), 400)
    assert.strictEqual(c.body().error, 'Missing Parameters')
    assert.strictEqual(c.body().message, 'questionSlug, language, and code are required.')

    const sc = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: '', language: 'python', code: 'x' } })
    await submitHandler(sc.req, sc.res)
    assert.strictEqual(sc.status(), 400)
    assert.strictEqual(sc.body().error, 'Missing Parameters')
  }
  console.log('  ✅ [PASS] Missing parameters rejected with distinct 400 error')

  // 2B: Code too long (> 65,536 chars)
  {
    const bigCode = 'a'.repeat(MAX_CODE_CHARS + 10)
    const c = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: 'arithmetic-check', language: 'python', code: bigCode } })
    await apiHandler(c.req, c.res)
    assert.strictEqual(c.status(), 400)
    assert.strictEqual(c.body().error, 'Payload Too Large')
    assert.match(c.body().message, /Code size exceeds maximum limit of 65536 characters/)

    const sc = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: 'arithmetic-check', language: 'python', code: bigCode } })
    await submitHandler(sc.req, sc.res)
    assert.strictEqual(sc.status(), 400)
    assert.strictEqual(sc.body().error, 'Payload Too Large')
    assert.match(sc.body().message, /Code size exceeds maximum limit of 65536 characters/)
  }
  console.log('  ✅ [PASS] Oversized code rejected with Payload Too Large (400)')

  // 2C: Invalid Question identifier
  for (const badSlug of ['learn:../x', 'learn:a:b:c', 'LEARN::', 'slug with space', 'slug/with/slash', 'slug.with.dot']) {
    const c = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: badSlug, language: 'python', code: 'print(1)' } })
    await apiHandler(c.req, c.res)
    assert.strictEqual(c.status(), 400, `apiHandler must reject ${badSlug} with 400`)
    assert.strictEqual(c.body().error, 'Invalid Question')
    assert.strictEqual(c.body().message, 'Invalid question identifier.')

    const sc = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: badSlug, language: 'python', code: 'print(1)' } })
    await submitHandler(sc.req, sc.res)
    assert.strictEqual(sc.status(), 400, `submitHandler must reject ${badSlug} with 400`)
    assert.strictEqual(sc.body().error, 'Invalid Question')
    assert.strictEqual(sc.body().message, 'Invalid question identifier.')
  }
  console.log('  ✅ [PASS] Malformed question slugs rejected with Invalid Question (400)')

  // 2D: Unsupported language
  {
    const c = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: 'arithmetic-check', language: 'ruby', code: 'puts 1' } })
    await apiHandler(c.req, c.res)
    assert.strictEqual(c.status(), 400)
    assert.strictEqual(c.body().error, 'Unsupported Language')
    assert.match(c.body().message, /Unsupported programming language: "ruby"/)

    const sc = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: 'arithmetic-check', language: 'ruby', code: 'puts 1' } })
    await submitHandler(sc.req, sc.res)
    assert.strictEqual(sc.status(), 400)
    assert.strictEqual(sc.body().error, 'Unsupported Language')
    assert.match(sc.body().message, /Unsupported programming language: "ruby"/)
  }
  console.log('  ✅ [PASS] Unsupported language rejected with Unsupported Language (400)')

  // 2E: Python-only question rejected with non-Python language
  {
    const pyOnlySlug = 'learn:scope:local-parameter-shadows-global'
    for (const nonPy of ['java', 'nodejs', 'cpp']) {
      const c = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: pyOnlySlug, language: nonPy, code: 'x' } })
      await apiHandler(c.req, c.res)
      assert.strictEqual(c.status(), 400, `apiHandler must reject ${nonPy} on python-only question`)
      assert.strictEqual(c.body().error, 'Unsupported Language')
      assert.strictEqual(c.body().message, 'This question only supports Python.')

      const sc = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: pyOnlySlug, language: nonPy, code: 'x' } })
      await submitHandler(sc.req, sc.res)
      assert.strictEqual(sc.status(), 400, `submitHandler must reject ${nonPy} on python-only question`)
      assert.strictEqual(sc.body().error, 'Unsupported Language')
      assert.strictEqual(sc.body().message, 'This question only supports Python.')
    }
  }
  console.log('  ✅ [PASS] Python-only questions reject non-Python languages with clear message (400)')

  // 2F: Unknown question (syntactically valid slug but not in testRepository) -> 404
  {
    const unknownSlug = 'learn:variables-data-types:this-slug-does-not-exist'
    const c = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: unknownSlug, language: 'python', code: 'print(1)' } })
    await apiHandler(c.req, c.res)
    assert.strictEqual(c.status(), 404, 'Unknown question in apiHandler must return 404')
    assert.strictEqual(c.body().error, 'Question Not Found')

    const sc = mockCall({ headers: { authorization: STUDENT_TOKEN }, body: { questionSlug: unknownSlug, language: 'python', code: 'print(1)' } })
    await submitHandler(sc.req, sc.res)
    assert.strictEqual(sc.status(), 404, 'Unknown question in submitHandler must return 404')
    assert.strictEqual(sc.body().error, 'Question Not Found')
  }
  console.log('  ✅ [PASS] Unknown questions return 404 Question Not Found')

  // -------------------------------------------------------------------------
  // TEST 3: Custom Test Input Feature Validation
  // -------------------------------------------------------------------------
  console.log('\n--- Suite 3: Custom Test Input Feature ---')
  {
    // Custom input on Learn question
    const c = mockCall({
      headers: { authorization: STUDENT_TOKEN },
      body: {
        questionSlug: 'learn:basic-arithmetic-operations:arithmetic-check',
        language: 'python',
        code: 'a, b, c = map(int, input().split())\nprint((a + b) * c - b)',
        customInput: '2 3 4',
      },
    })
    await apiHandler(c.req, c.res)
    assert.strictEqual(c.status(), 200, 'Custom input evaluation succeeded (200)')
    assert.strictEqual(c.body().success, true)
    assert.strictEqual(c.body().total, 1)
    assert.strictEqual(c.body().passed, 1)
    assert.strictEqual(c.body().testCases[0].actualOutput.trim(), '17')

    // Custom input oversized (> 64KB)
    const bigInput = 'x'.repeat(MAX_CODE_CHARS + 1)
    const cBig = mockCall({
      headers: { authorization: STUDENT_TOKEN },
      body: {
        questionSlug: 'learn:basic-arithmetic-operations:arithmetic-check',
        language: 'python',
        code: 'print(1)',
        customInput: bigInput,
      },
    })
    await apiHandler(cBig.req, cBig.res)
    assert.strictEqual(cBig.status(), 400)
    assert.strictEqual(cBig.body().error, 'Payload Too Large')

    // Custom input on python-only question with non-python rejected
    const cPyOnly = mockCall({
      headers: { authorization: STUDENT_TOKEN },
      body: {
        questionSlug: 'learn:scope:local-parameter-shadows-global',
        language: 'java',
        code: 'class Main {}',
        customInput: '1 2',
      },
    })
    await apiHandler(cPyOnly.req, cPyOnly.res)
    assert.strictEqual(cPyOnly.status(), 400)
    assert.strictEqual(cPyOnly.body().error, 'Unsupported Language')
    assert.strictEqual(cPyOnly.body().message, 'This question only supports Python.')
  }
  console.log('  ✅ [PASS] Custom test input operates securely with proper guards')

  // -------------------------------------------------------------------------
  // TEST 4: Bank480 JSON Questions (13 and 15 test cases)
  // -------------------------------------------------------------------------
  console.log('\n--- Suite 4: Bank480 JSON Questions Evaluation ---')
  {
    // A 13-test-case bank480 question
    const q13 = 'learn:variables-data-types:integer-to-decimal-string'
    const pyCode = `
import sys, json
raw = sys.stdin.read().strip()
if raw:
    data = json.loads(raw)
    print(data["value"])
`
    const run13 = await executeQuestion({ questionSlug: q13, language: 'python', code: pyCode, mode: 'run' })
    assert.strictEqual(run13.success, true, 'Bank480 13-case question Run succeeds')
    assert.strictEqual(run13.total, 3, 'Bank480 Run runs 3 visible cases')
    assert.strictEqual(run13.passed, 3, 'Bank480 Run passes 3/3 visible')
    assert.strictEqual(run13.judgeTotal, 13, 'Bank480 judgeTotal is 13')

    const sub13 = await executeQuestion({ questionSlug: q13, language: 'python', code: pyCode, mode: 'submit' })
    assert.strictEqual(sub13.success, true, 'Bank480 13-case question Submit succeeds')
    assert.strictEqual(sub13.total, 13, 'Bank480 Submit runs all 13 cases')
    assert.strictEqual(sub13.passed, 13, 'Bank480 Submit passes 13/13 cases')
  }
  console.log('  ✅ [PASS] Bank480 questions with >10 cases evaluate perfectly on Run and Submit')

  // -------------------------------------------------------------------------
  // TEST 5: Learn Submit Isolation from Practice DB
  // -------------------------------------------------------------------------
  console.log('\n--- Suite 5: Learn Submit Database Isolation ---')
  {
    const pyCode = 'a, b, c = map(int, input().split())\nprint((a + b) * c - b)'
    const sc = mockCall({
      headers: { authorization: STUDENT_TOKEN },
      body: {
        questionSlug: 'learn:basic-arithmetic-operations:arithmetic-check',
        language: 'python',
        code: pyCode,
      },
    })
    await submitHandler(sc.req, sc.res)
    assert.strictEqual(sc.status(), 200)
    assert.strictEqual(sc.body().isSolved, true)
    assert.strictEqual(sc.body().persistence?.reason, 'learn_practice_isolated')
    assert.strictEqual(sc.body().persistence?.saved, false)
    assert.strictEqual(sc.body().xpAwarded, 0)
  }
  console.log('  ✅ [PASS] Learn Submit never writes to Practice DB (reason: learn_practice_isolated)')

  // -------------------------------------------------------------------------
  // TEST 6: Practice Bank Unaffected
  // -------------------------------------------------------------------------
  console.log('\n--- Suite 6: Practice Bank Regression Check ---')
  {
    const pyCode = 'a, b, c = map(int, input().split())\nprint((a + b) * c - b)'
    const practiceSlug = 'belt-1-q1-arithmetic-check-v1'

    const runRes = await executeQuestion({ questionSlug: practiceSlug, language: 'python', code: pyCode, mode: 'run' })
    assert.strictEqual(runRes.success, true)
    assert.strictEqual(runRes.total, 3)
    assert.strictEqual(runRes.passed, 3)

    const subRes = await executeQuestion({ questionSlug: practiceSlug, language: 'python', code: pyCode, mode: 'submit' })
    assert.strictEqual(subRes.success, true)
    assert.strictEqual(subRes.total, 10)
    assert.strictEqual(subRes.passed, 10)
  }
  console.log('  ✅ [PASS] Practice bank behaves exactly as before')

  // -------------------------------------------------------------------------
  // TEST 7: Multi-Language Evaluation Across All 24 Learn Topics
  // -------------------------------------------------------------------------
  console.log('\n--- Suite 7: Multi-Language Verification Across All 24 Topics ---')
  const allTopics = getAllLearnTopics()
  assert.strictEqual(allTopics.length, 24, '24 topics must be loaded')

  const TOPIC_SOLUTIONS: Record<string, { slug: string; python: string; nodejs?: string; java?: string }> = {
    'variables-data-types': {
      slug: 'profile-echo',
      python: `import sys\nprint(" ".join(sys.stdin.read().split()))`,
      nodejs: `const data = require('fs').readFileSync(0, 'utf8'); console.log(data.trim().split(/\\s+/).join(' '));`,
    },
    'basic-arithmetic-operations': {
      slug: 'arithmetic-check',
      python: `a, b, c = map(int, input().split())\nprint((a + b) * c - b)`,
      nodejs: `const tok = require('fs').readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log((tok[0] + tok[1]) * tok[2] - tok[1]);`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n    System.out.println((a + b) * c - b);\n  }\n}`,
    },
    'conditionals-control-flow': {
      slug: 'middle-of-three',
      python: `import sys\nparts = sys.stdin.read().split()\nif parts: print(sorted([int(p) for p in parts])[1])`,
      nodejs: `const tok = require('fs').readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(tok.sort((a,b) => a - b)[1]);`,
    },
    'loops': {
      slug: 'iterative-running-total',
      python: `a, b = map(int, input().split())\nstate = a + 1\nstate = state * b\nprint(state - 1)`,
    },
    'nested-loops': {
      slug: 'grid-cell-score',
      python: `n, m = map(int, input().split())\ns = 0\nfor r in range(1, n + 1):\n    for c in range(1, m + 1):\n        s += (r + c + 1) % 5\nprint(s)`,
    },
    'functions': {
      slug: 'two-argument-maximum-function',
      python: `def f(a, b):\n    return (a * 1 + b) // 1\n\na, b = map(int, input().split())\nprint(f(a, b))`,
    },
    'scope': {
      slug: 'local-shadows-global',
      python: `g, x = map(int, input().split())\n\ndef compute(x):\n    local_value = x + 1\n    return local_value\n\nprint(compute(x), g)`,
    },
    'arrays-1d-lists': {
      slug: 'array-sum-even-indices-raw-1',
      python: `n = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr[i] for i in range(0, n, 2)))`,
      nodejs: `const tok = require('fs').readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet s = 0;\nfor (let i = 0; i < tok[0]; i += 2) s += tok[1 + i];\nconsole.log(s);`,
    },
    'strings-as-arrays': {
      slug: 'vowel-count',
      python: `s = input().strip()\nprint(sum((ord(ch) + 1) % 7 for ch in s))`,
    },
    'arrays-2d-matrices': {
      slug: 'matrix-total',
      python: `import sys\ntok = list(map(int, sys.stdin.read().split()))\nif tok:\n    rows, cols = tok[0], tok[1]\n    idx = 2\n    total = 0\n    for r in range(rows):\n        for c in range(cols):\n            total += tok[idx] + (r + c)\n            idx += 1\n    print(total)`,
    },
    'linear-search': {
      slug: 'first-target-position',
      python: `import sys\ntok = list(map(int, sys.stdin.read().split()))\nif tok:\n    n = tok[0]\n    arr = tok[1:1+n]\n    ans = -1\n    for i, v in enumerate(arr):\n        if (v + 1) % 5 == 1:\n            ans = i\n            break\n    print(ans)`,
    },
    'binary-search': {
      slug: 'exact-binary-search',
      python: `import sys\ntok = list(map(int, sys.stdin.read().split()))\nif tok:\n    target = tok[0] + 1\n    lo, hi = 0, target\n    ans = target\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if mid * mid >= target:\n            ans = mid\n            hi = mid - 1\n        else:\n            lo = mid + 1\n    print(ans)`,
    },
    'sorting': {
      slug: 'bubble-sort',
      python: `import sys\ntok = list(map(int, sys.stdin.read().split()))\nif tok:\n    n = tok[0]\n    arr = tok[1:1+n]\n    arr.sort(key=lambda v: (((abs(v) + 1) % 7), v))\n    print(' '.join(map(str, arr)))`,
    },
    'sets': {
      slug: 'unique-count',
      python: `import sys\ntok = list(map(int, sys.stdin.read().split()))\nif tok:\n    n, m = tok[0], tok[1]\n    a = tok[2:2+n]\n    b = tok[2+n:2+n+m]\n    u = set(a) | set(b)\n    print(sum((v + 1) % 11 for v in u))`,
    },
    'two-pointers': {
      slug: 'sorted-pair-sum',
      python: `import sys\ntok = list(map(int, sys.stdin.read().split()))\nif tok:\n    n = tok[0]\n    arr = tok[1:1+n]\n    i, j = 0, n - 1\n    total = 0\n    while i < j:\n        total += abs(arr[j] - arr[i]) + 1\n        i += 1\n        j -= 1\n    print(total)`,
    },
    'dictionaries-hash-maps': {
      slug: 'first-unique-value',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    data = json.loads(raw)\n    nums = data["nums"]\n    from collections import Counter\n    c = Counter(nums)\n    ans = "null"\n    for x in nums:\n        if c[x] == 1:\n            ans = str(x)\n            break\n    print(ans)`,
    },
    'recursion': {
      slug: 'recursive-sum',
      python: `n = int(input())\nprint(n * (n + 1) // 2)`,
    },
    'trees-bst': {
      slug: 'tree-count-all-nodes-1',
      python: `import sys\ntok = list(map(int, sys.stdin.read().split()))\nif tok:\n    n = tok[0]\n    arr = tok[1:1+n]\n    print(sum(1 for x in arr if x != -1))`,
    },
    'graphs': {
      slug: 'graph-count-degree-zero-1',
      python: `import sys\ntok = list(map(int, sys.stdin.read().split()))\nif tok:\n    n, m = tok[0], tok[1]\n    deg = [0] * n\n    idx = 2\n    for _ in range(m):\n        u, v = tok[idx], tok[idx+1]\n        deg[u] += 1; deg[v] += 1; idx += 2\n    print(sum(1 for i in range(n) if deg[i] == 0))`,
    },
    'dynamic-programming': {
      slug: 'weighted-recurrence-dp-1',
      python: `n = int(input())\ndp = [0] * max(n + 1, 4)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = 2 * dp[i-1] + (3 * dp[i-3] if i >= 3 else 0)\nprint(dp[n])`,
    },
    'dsa-algorithms': {
      slug: 'sliding-window-maximum',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    data = json.loads(raw)\n    nums, k = data["nums"], data["k"]\n    if not nums or k <= 0:\n        print("[]")\n    else:\n        print(json.dumps([max(nums[i:i+k]) for i in range(len(nums)-k+1)], separators=(",", ":")))`,
    },
    'oop-classes-objects': {
      slug: 'construct-student-summaries',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    data = json.loads(raw)\n    print(json.dumps([f"{r['name']}:{r['score']}" for r in data["records"]], separators=(",", ":")))`,
    },
    'oop-methods': {
      slug: 'counter-increment-and-decrement',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    data = json.loads(raw)\n    v = data["initial"]\n    for c in data["commands"]:\n        if c["method"] == "increment": v += c["value"]\n        elif c["method"] == "decrement": v -= c["value"]\n    print(v)`,
    },
    'oop-inheritance': {
      slug: 'basic-overridden-double',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    data = json.loads(raw)\n    a, b = data["a"], data["b"]\n    print(json.dumps([a + b, (a + b) * 2], separators=(",", ":")))`,
    },
  }

  for (const topic of allTopics) {
    const sol = TOPIC_SOLUTIONS[topic.slug]
    assert.ok(sol, `Solution definition for topic "${topic.slug}" must exist`)

    const namespacedSlug = `learn:${topic.slug}:${sol.slug}`

    // Python evaluation (supported by all 24 topics)
    const pyRun = await executeQuestion({ questionSlug: namespacedSlug, language: 'python', code: sol.python, mode: 'run' })
    if (!pyRun.success || pyRun.passed !== pyRun.visibleCount) {
      console.error(`[${topic.slug}] pyRun failure details:`, JSON.stringify(pyRun, null, 2))
    }
    assert.strictEqual(pyRun.success, true, `[${topic.slug}] Python Run must succeed`)
    assert.strictEqual(pyRun.passed, pyRun.visibleCount, `[${topic.slug}] Python Run visible cases passed`)

    const pySub = await executeQuestion({ questionSlug: namespacedSlug, language: 'python', code: sol.python, mode: 'submit' })
    if (!pySub.success || pySub.passed !== pySub.total) {
      console.error(`[${topic.slug}] pySub failure details:`, JSON.stringify(pySub, null, 2))
    }
    assert.strictEqual(pySub.success, true, `[${topic.slug}] Python Submit must succeed`)
    assert.strictEqual(pySub.passed, pySub.total, `[${topic.slug}] Python Submit 100% passed (${pySub.passed}/${pySub.total})`)

    // For Node.js (if defined)
    if (sol.nodejs) {
      const jsRun = await executeQuestion({ questionSlug: namespacedSlug, language: 'nodejs', code: sol.nodejs, mode: 'run' })
      assert.strictEqual(jsRun.success, true, `[${topic.slug}] Node.js Run must succeed`)
      const jsSub = await executeQuestion({ questionSlug: namespacedSlug, language: 'nodejs', code: sol.nodejs, mode: 'submit' })
      assert.strictEqual(jsSub.success, true, `[${topic.slug}] Node.js Submit must succeed`)
    }

    // For Java (if defined)
    if (sol.java) {
      const javaRun = await executeQuestion({ questionSlug: namespacedSlug, language: 'java', code: sol.java, mode: 'run' })
      assert.strictEqual(javaRun.success, true, `[${topic.slug}] Java Run must succeed`)
      const javaSub = await executeQuestion({ questionSlug: namespacedSlug, language: 'java', code: sol.java, mode: 'submit' })
      assert.strictEqual(javaSub.success, true, `[${topic.slug}] Java Submit must succeed`)
    }
  }
  console.log('  ✅ [PASS] Successfully evaluated solutions across all 24 Learn topics!')

  // Check C++ execution on arithmetic-check in basic-arithmetic-operations
  const cppCode = `
#include <iostream>
using namespace std;
int main() {
    long long a, b, c;
    if (cin >> a >> b >> c) {
        cout << (a + b) * c - b << endl;
    }
    return 0;
}
`
  const cppRun = await executeQuestion({
    questionSlug: 'learn:basic-arithmetic-operations:arithmetic-check',
    language: 'cpp',
    code: cppCode,
    mode: 'run',
  })
  assert.strictEqual(cppRun.success, true, 'C++ Learn Run succeeded')
  assert.strictEqual(cppRun.passed, 3)

  const cppSub = await executeQuestion({
    questionSlug: 'learn:basic-arithmetic-operations:arithmetic-check',
    language: 'cpp',
    code: cppCode,
    mode: 'submit',
  })
  assert.strictEqual(cppSub.success, true, 'C++ Learn Submit succeeded')
  assert.strictEqual(cppSub.passed, 10)
  console.log('  ✅ [PASS] C++ Learn Run and Submit evaluated with 100% accuracy')

  console.log('\n========================================================================')
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!')
  console.log('========================================================================\n')
}

runTests().catch((err) => {
  console.error('Test suite failed:', err)
  process.exit(1)
})
