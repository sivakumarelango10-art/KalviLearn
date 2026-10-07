/**
 * Known-correct reference solutions (written from each problem statement), one or more per topic, plus deliberately
 * wrong solutions. Used to validate (a) that the judge grades real programs correctly and (b) that the bank's expected
 * outputs - including the hidden ones - agree with an independent implementation of the statement.
 */
export interface Reference {
  slug: string
  topic: string
  python: string
  java?: string
  nodejs?: string
}

const javaMain = (body: string) =>
  `import java.util.*;\nimport java.io.*;\npublic class Main {\n  public static void main(String[] args) throws IOException {\n    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n    StreamTokenizer st = new StreamTokenizer(br);\n${body}\n  }\n}\n`
const nodeAll = (body: string) => `const data = require('fs').readFileSync(0, 'utf8');\nconst tok = data.trim().split(/\\s+/);\n${body}\n`

export const REFERENCES: Reference[] = [
  {
    slug: 'profile-echo', topic: 'variables-data-types',
    python: `import sys\nprint(" ".join(sys.stdin.read().split()))`,
    nodejs: nodeAll(`console.log(tok.join(' '));`),
  },
  {
    slug: 'arithmetic-check', topic: 'basic-arithmetic-operations',
    python: `a, b, c = map(int, input().split())\nprint((a + b) * c - b)`,
    java: javaMain(`    long[] v = new long[3];\n    for (int i = 0; i < 3; i++) { st.nextToken(); v[i] = (long) st.nval; }\n    System.out.println((v[0] + v[1]) * v[2] - v[1]);`),
    nodejs: nodeAll(`const [a, b, c] = tok.map(Number);\nconsole.log((a + b) * c - b);`),
  },
  {
    slug: 'largest-of-three', topic: 'conditionals-control-flow',
    python: `a, b, c = map(int, input().split())\nif a >= b and a >= c:\n    print(a)\nelif b >= c:\n    print(b)\nelse:\n    print(c)`,
    java: javaMain(`    long best = Long.MIN_VALUE;\n    for (int i = 0; i < 3; i++) { st.nextToken(); best = Math.max(best, (long) st.nval); }\n    System.out.println(best);`),
  },
  {
    slug: 'iterative-running-total', topic: 'loops',
    // b may be negative in the hidden cases, so the state is scaled rather than looped b times.
    python: `a, b = map(int, input().split())\nstate = a + 1\nstate = state * b\nprint(state - 1)`,
  },
  {
    slug: 'grid-cell-score', topic: 'nested-loops',
    python: `n, m = map(int, input().split())\ns = 0\nfor r in range(1, n + 1):\n    for c in range(1, m + 1):\n        s += (r + c + 1) % 5\nprint(s)`,
    java: javaMain(`    st.nextToken(); int n = (int) st.nval; st.nextToken(); int m = (int) st.nval;\n    long s = 0;\n    for (int r = 1; r <= n; r++) for (int c = 1; c <= m; c++) s += (r + c + 1) % 5;\n    System.out.println(s);`),
  },
  {
    slug: 'two-argument-maximum-function', topic: 'functions',
    python: `def f(a, b):\n    return (a * 1 + b) // 1\n\na, b = map(int, input().split())\nprint(f(a, b))`,
  },
  {
    slug: 'local-shadows-global', topic: 'scope',
    python: `g, x = map(int, input().split())\n\ndef compute(x):\n    local_value = x + 1\n    return local_value\n\nprint(compute(x), g)`,
  },
  {
    slug: 'array-sum-even-indices-raw-1', topic: 'arrays-1d-lists',
    python: `n = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr[i] for i in range(0, n, 2)))`,
    nodejs: nodeAll(`const n = Number(tok[0]);\nlet s = 0;\nfor (let i = 0; i < n; i += 2) s += Number(tok[1 + i]);\nconsole.log(s);`),
  },
  {
    slug: 'vowel-count', topic: 'strings-as-arrays',
    python: `s = input().strip()\nprint(sum((ord(ch) + 1) % 7 for ch in s))`,
    java: javaMain(`    String s = br.readLine().trim();\n    long t = 0;\n    for (char ch : s.toCharArray()) t += (ch + 1) % 7;\n    System.out.println(t);`),
  },
  {
    slug: 'matrix-total', topic: 'arrays-2d-matrices',
    python: `r, c = map(int, input().split())\nm = [list(map(int, input().split())) for _ in range(r)]\nprint(sum(m[i][j] + (i + j) for i in range(r) for j in range(c)))`,
    nodejs: nodeAll(`const [r, c] = [Number(tok[0]), Number(tok[1])];\nlet s = 0, k = 2;\nfor (let i = 0; i < r; i++) for (let j = 0; j < c; j++) s += Number(tok[k++]) + i + j;\nconsole.log(s);`),
  },
  {
    slug: 'first-target-position', topic: 'linear-search',
    python: `n = int(input())\narr = list(map(int, input().split()))\nans = -1\nfor i, v in enumerate(arr):\n    if (v + 1) % 5 == 1:\n        ans = i\n        break\nprint(ans)`,
  },
  {
    slug: 'exact-binary-search', topic: 'binary-search',
    python: `n = int(input())\nlo, hi = 0, n + 1\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if mid * mid >= n + 1:\n        hi = mid\n    else:\n        lo = mid + 1\nprint(lo)`,
    java: javaMain(`    st.nextToken(); long n = (long) st.nval;\n    long lo = 0, hi = n + 1;\n    while (lo < hi) { long mid = (lo + hi) / 2; if (mid * mid >= n + 1) hi = mid; else lo = mid + 1; }\n    System.out.println(lo);`),
  },
  {
    slug: 'bubble-sort', topic: 'sorting',
    python: `n = int(input())\narr = list(map(int, input().split()))\nprint(*sorted(arr, key=lambda v: ((abs(v) + 1) % 7, v)))`,
    nodejs: nodeAll(`const n = Number(tok[0]);\nconst a = tok.slice(1, 1 + n).map(Number);\na.sort((x, y) => ((Math.abs(x) + 1) % 7) - ((Math.abs(y) + 1) % 7) || x - y);\nconsole.log(a.join(' '));`),
  },
  {
    slug: 'unique-count', topic: 'sets',
    python: `n, m = map(int, input().split())\na = set(map(int, input().split()))\nb = set(map(int, input().split()))\nprint(sum((v + 1) % 11 for v in a | b))`,
  },
  {
    slug: 'sorted-pair-sum', topic: 'two-pointers',
    python: `n = int(input())\na = list(map(int, input().split()))\nl, r, s = 0, n - 1, 0\nwhile l < r:\n    s += abs(a[r] - a[l]) + 1\n    l += 1\n    r -= 1\nprint(s)`,
    java: javaMain(`    st.nextToken(); int n = (int) st.nval; long[] a = new long[n];\n    for (int i = 0; i < n; i++) { st.nextToken(); a[i] = (long) st.nval; }\n    long s = 0; int l = 0, r = n - 1;\n    while (l < r) { s += Math.abs(a[r] - a[l]) + 1; l++; r--; }\n    System.out.println(s);`),
  },
  {
    slug: 'frequency-map', topic: 'dictionaries-hash-maps',
    python: `n = int(input())\nfreq = {}\nfor v in map(int, input().split()):\n    freq[v] = freq.get(v, 0) + 1\nprint(sum(v * (c + 1) for v, c in freq.items()))`,
    nodejs: nodeAll(`const n = Number(tok[0]);\nconst f = new Map();\nfor (const t of tok.slice(1, 1 + n)) { const v = Number(t); f.set(v, (f.get(v) || 0) + 1); }\nlet s = 0;\nfor (const [v, c] of f) s += v * (c + 1);\nconsole.log(s);`),
  },
  {
    slug: 'recursive-sum', topic: 'recursion',
    python: `import sys\nsys.setrecursionlimit(100000)\n\ndef F(n):\n    return 0 if n == 0 else (n * 1) % 13 + F(n - 1)\n\nprint(F(int(input())))`,
  },
  {
    slug: 'tree-count-all-nodes-1', topic: 'trees-bst',
    python: `n = int(input())\nvals = list(map(int, input().split())) if n > 0 else []\nexists = [False] * n\nfor i, v in enumerate(vals):\n    parent_ok = i == 0 or exists[(i - 1) // 2]\n    exists[i] = v != -1 and parent_ok\nprint(sum(exists))`,
  },
  {
    slug: 'graph-count-degree-zero-1', topic: 'graphs',
    python: `import sys\ndata = sys.stdin.read().split()\nn, m = int(data[0]), int(data[1])\ndeg = [0] * n\nfor i in range(m):\n    u, v = int(data[2 + 2 * i]), int(data[3 + 2 * i])\n    deg[u] += 1\n    deg[v] += 1\nprint(sum(1 for d in deg if d == 0))`,
    java: javaMain(`    st.nextToken(); int n = (int) st.nval; st.nextToken(); int m = (int) st.nval;\n    int[] deg = new int[n];\n    for (int i = 0; i < m; i++) { st.nextToken(); int u = (int) st.nval; st.nextToken(); int v = (int) st.nval; deg[u]++; deg[v]++; }\n    int c = 0; for (int d : deg) if (d == 0) c++;\n    System.out.println(c);`),
  },
  {
    slug: 'weighted-recurrence-dp-1', topic: 'dynamic-programming',
    python: `n = int(input())\ndp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = 2 * dp[i - 1] + (3 * dp[i - 3] if i >= 3 else 0)\nprint(dp[n])`,
  },
  {
    slug: 'stack-balance-score', topic: 'dsa-algorithms',
    python: `a, b = map(int, input().split())\nstack = [a + 1]\ntop = stack.pop() * b\nprint(top - 1)`,
  },
  {
    slug: 'student-object', topic: 'oop-classes-objects',
    python: `class Student:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n\n    @property\n    def score(self):\n        return (self.a + 1) * self.b - 1\n\na, b = map(int, input().split())\nprint(Student(a, b).score)`,
    java: javaMain(`    st.nextToken(); long a = (long) st.nval; st.nextToken(); long b = (long) st.nval;\n    System.out.println(new Student(a, b).score());\n  }\n  static class Student {\n    final long a, b;\n    Student(long a, long b) { this.a = a; this.b = b; }\n    long score() { return (a + 1) * b - 1; }`),
  },
  {
    slug: 'deposit-method', topic: 'oop-methods',
    python: `class Account:\n    def __init__(self, base):\n        self.balance = base\n\n    def apply(self, times):\n        self.balance = (self.balance + 1) * times - 1\n        return self.balance\n\na, b = map(int, input().split())\nprint(Account(a).apply(b))`,
  },
  {
    slug: 'person-student', topic: 'oop-inheritance',
    python: `class Person:\n    def __init__(self, a):\n        self.a = a\n\nclass Student(Person):\n    def __init__(self, a, b):\n        super().__init__(a)\n        self.b = b\n\n    def result(self):\n        return (self.a + 1) * self.b - 1\n\na, b = map(int, input().split())\nprint(Student(a, b).result())`,
    nodejs: nodeAll(`class Person { constructor(a) { this.a = a } }\nclass Student extends Person { constructor(a, b) { super(a); this.b = b } result() { return (this.a + 1) * this.b - 1 } }\nconst [a, b] = tok.map(Number);\nconsole.log(new Student(a, b).result());`),
  },
  // Original practice bank (belt) question, for old-vs-new parity
  {
    slug: 'belt-1-q1-arithmetic-check-v1', topic: 'practice-bank',
    python: `a, b, c = map(int, input().split())\nprint((a + b) * c - b)`,
    java: javaMain(`    long[] v = new long[3];\n    for (int i = 0; i < 3; i++) { st.nextToken(); v[i] = (long) st.nval; }\n    System.out.println((v[0] + v[1]) * v[2] - v[1]);`),
    nodejs: nodeAll(`const [a, b, c] = tok.map(Number);\nconsole.log((a + b) * c - b);`),
  },
  // Practice-bank families whose hidden data was corrected (constraint violations) - must now be 10/10 for
  // ordinary constraint-following code that reads the n-values line.
  {
    slug: 'belt-2-q14-reverse-array-v1', topic: 'practice-bank',
    python: `n = int(input())\narr = input().split()\nprint(" ".join(reversed(arr)))`,
    java: javaMain(`    int n = Integer.parseInt(br.readLine().trim());\n    String[] a = br.readLine().trim().split("\\\\s+");\n    StringBuilder sb = new StringBuilder();\n    for (int i = n - 1; i >= 0; i--) { sb.append(a[i]); if (i > 0) sb.append(' '); }\n    System.out.println(sb);`),
  },
  {
    slug: 'belt-2-q18-distinct-count-v1', topic: 'practice-bank',
    python: `n = int(input())\nprint(len(set(input().split())))`,
  },
  {
    slug: 'belt-2-q23-frequency-of-target-v1', topic: 'practice-bank',
    python: `n, t = map(int, input().split())\narr = list(map(int, input().split()))\nprint(arr.count(t))`,
  },
  {
    slug: 'belt-2-q22-merge-sorted-arrays-v1', topic: 'practice-bank',
    python: `n, m = map(int, input().split())\na = list(map(int, input().split()))\nb = list(map(int, input().split()))\nprint(*sorted(a + b))`,
  },
]

/** Deliberately wrong solutions: each must NOT reach 10/10. */
export const WRONG: Array<{ slug: string; why: string; python: string }> = [
  { slug: 'arithmetic-check', why: 'always prints 0', python: `print(0)` },
  { slug: 'largest-of-three', why: 'prints the minimum', python: `a, b, c = map(int, input().split())\nprint(min(a, b, c))` },
  { slug: 'bubble-sort', why: 'wrong sort direction', python: `n = int(input())\narr = list(map(int, input().split()))\nprint(*sorted(arr, key=lambda v: ((abs(v) + 1) % 7, v), reverse=True))` },
  { slug: 'exact-binary-search', why: 'off-by-one predicate', python: `n = int(input())\nx = 0\nwhile x * x <= n + 1:\n    x += 1\nprint(x)` },
  { slug: 'array-sum-even-indices-raw-1', why: 'off-by-one loop (odd indices)', python: `n = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr[i] for i in range(1, n, 2)))` },
  { slug: 'weighted-recurrence-dp-1', why: 'wrong edge case (dp[0]=0)', python: `n = int(input())\ndp = [0] * (n + 1)\nfor i in range(1, n + 1):\n    dp[i] = 2 * dp[i - 1] + (3 * dp[i - 3] if i >= 3 else 0) + (1 if i == 1 else 0)\nprint(dp[n])` },
  { slug: 'first-target-position', why: 'hard-codes the visible answers', python: `print(-1)` },
]
