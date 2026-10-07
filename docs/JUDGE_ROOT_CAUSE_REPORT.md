# Judge Root-Cause Report: "visible cases pass, hidden cases fail"

Date: 2026-10-07. Scope: the 500 practice questions and 740 coding questions, which hold 12,400 test cases (8,680 of them hidden). Every number below comes from a command that was actually run (see *Automated test results*).

## 1. Root cause

The test data was not the main problem. The bank is correct and every hidden case is in its proper place. The failures came from **how code was executed**, plus a few gaps between the statements and the starter code.

| # | Root cause | Effect on correct solutions | Fix |
|---|---|---|---|
| 1 | **No real interpreter.** `JUDGE0_URL` is not set anywhere, so every Python, Java and C++ submission went to the local engine. That engine **transpiles them to JavaScript** with regular expressions, so integer division, overflow, formatting and most syntax do not behave as in the real language. | With known-correct solutions, the local engine failed **Python 16/29** (wrong answers, or "Unexpected token" errors) and **Java 10/10** (0/10 cases each). | New **native engine** (`src/server/judge/native.ts`). It runs the real `python`, `javac`+`java` and `g++` when Judge0 is not configured. Result: Python 29/29, Java 10/10. |
| 2 | **The Node.js runner was not real Node.** The in-sandbox JS runner faked stdin and stdout. | **15 of 18** common Node I/O patterns produced wrong output or crashed. Examples: `const readline = require('readline')` failed with "Identifier already declared". `process.stdout.write('1 ')` printed each piece on its own line. `console.error` output was graded. Chained `rl.on().on()` crashed. `process.stdin.resume()` threw. | The runner I/O now follows Node exactly (`src/server/codeRunnerCore.ts`). All **18 of 18** patterns match real Node, and the pipeline test N checks this. |
| 3 | **The tree input format was undocumented** (65 tree questions). The data uses array-index order: the children of index `i` are at `2i+1` and `2i+2`. The statement only said "level-order; -1 = missing". | A correct solution using the common LeetCode-style compact parser built a different tree for `10 -1 20 -1 -1 15 25`. That made **45 cases** fail, most of them hidden. | Each statement now documents the layout with an example (`scripts/fix-tree-input-format.cjs`). The test data is unchanged; the oracle verifies it under the documented format. |
| 4 | **`bst-lower-bound` was ambiguous** (5 questions). The statement said values are "inserted into the BST", but in the data `-1` means an empty slot. | Inserting `-1` as a value changed the answers in **30 cases**. | The statement now says to insert every value except `-1`, and defines the output. |
| 5 | **The edit-distance starter code dropped empty strings** (9 questions). Hidden cases 5 and 6 contain an empty string as an empty line. The starter code used `read().strip()` / `.trim()`, and Java's `Scanner.nextLine()` throws in this situation. | A correct algorithm written on top of the starter code passed cases 1–3 and failed hidden cases 5–6. | The starter code now reads the two lines exactly, in all 4 languages, and the statement explains how an empty string is given (`scripts/fix-edit-distance-io.cjs`). |
| 6 | Earlier in this task, already fixed: constraint-violating hidden data (49 practice suites), undefined graph terms (52 coding statements), a client fallback that invented hidden failures, fuzzy question lookup, and a stale dev worker. | | See git history and the earlier sections of this task. |

## 2. Files changed (this round)

- `src/server/judge/native.ts` (new): the real-runtime engine. It uses a temp directory per submission and an environment stripped of all server secrets (security test 2). It applies a time limit and a 1 MiB output cap. Line endings are normalised to LF. A Python syntax error is reported as a compile error before any case result is streamed.
- `src/server/judge/engines.ts`: `selectEngine(language)` picks Judge0 when `JUDGE0_URL` is set, otherwise native for Python/Java/C++ when the runtime is installed, otherwise the local engine.
- `src/server/executeService.ts`, `src/lib/runner/codeRunner.ts`: engine name `'native'`.
- `src/server/codeRunnerCore.ts`: a faithful Node stdin/stdout implementation inside the sandbox realm. It adds no new host functions beyond a stdout writer and an error reporter, and the existing vm hardening still applies.
- `src/data/problems.json`: 115 statement and starter-code fields. **No test data was changed.**
- New checks:
  - `scripts/practice_oracle.py`
  - `scripts/test-judge-all-questions.ts`
  - `scripts/lib/node-io-patterns.ts`
  - sections N and P in `scripts/test-judge-pipeline.ts`
  - native secret-isolation tests in `scripts/test-security-hardening.ts`
- New fix scripts (idempotent, already applied): `scripts/fix-tree-input-format.cjs`, `scripts/fix-edit-distance-io.cjs`.
- `package.json`: `test:practice-oracle` and `test:judge-all`, both added to `test:all`.

## 3. Execution pipeline

1. **Run** executes visible cases 1–3. **Submit** executes all 10 from the server-side suite; the client never sends tests.
2. The question is resolved by exact, source-aware ID.
3. **Engine selection:**
   - **Judge0**, when configured (container-isolated, real compilers). This is the production path.
   - **Native**, when Judge0 is not configured, outside production only. In production it is used only with `KALVI_NATIVE_JUDGE=1`.
   - **Local sandbox:** real JavaScript for Node.js. For other languages it is the transpiler, used only as a last resort.
4. Per-case results stream back as NDJSON. Hidden cases carry only metadata.
5. The verdict is Accepted only when all 10 of 10 cases pass in a Submit.

## 4. Bank validation

- **Practice (500 questions, plus 2 legacy suites):**
  - 5,020 cases recomputed by an independent oracle: **0 mismatches**, 0 shape errors, 0 undocumented ambiguities.
  - 75 cases depend on the input format, which is now documented in their statements.
- **Coding (740 questions):** 7,400 cases recomputed, **0 mismatches**.
- **Every question:** cases are indexed 1–10, with 1–3 visible and 4–10 hidden. Client and server visible cases are identical, and there are 0 ID collisions (`test:judge-audit`).
- **End to end:** a correct program, built from the statement alone, was submitted for **all 1,240 questions** through the real Submit path. **1,240 of 1,240 were accepted 10/10**, covering 12,400 cases including all 8,680 hidden ones (`test:judge-all`, native engine).
- **Integer ranges:** no expected output exceeds the 32-bit range in either bank. The only large numbers are digit strings in decode-digit-string.

## 5. Language tests

| Language | Engine (no Judge0) | Result |
|---|---|---|
| Python 3.13 | native (real CPython) | 29/29 references 10/10; 1,240/1,240 questions 10/10; wrong solutions rejected; syntax error → COMPILATION_ERROR; infinite loop → TLE |
| Java 21 | native (javac + java) | 10/10 references 10/10; compile error → COMPILATION_ERROR |
| Node.js | local sandbox (real JS) | references 10/10; 18/18 I/O patterns identical to real Node |
| C++ | native when `g++` exists, otherwise the transpiler | **Not verified: no g++ on this machine.** |

## 6. Old vs new (known-correct solutions, no Judge0 configured)

| | Before | After |
|---|---|---|
| Python | 13/29 accepted | **29/29** |
| Java | 0/10 accepted | **10/10** |
| Node I/O patterns | 3/18 correct | **18/18** |
| Tree / BST / edit-distance format traps | 84 cases where a correct solution could fail | 0 (documented, starter code fixed) |
| Whole-bank Submit with a correct solution | not measured | **1,240/1,240 at 10/10** |

## 7. Security

- Native child processes receive no server environment variables. This is tested for Python `os.environ` and Java `System.getenv`.
- Native child processes run in a throw-away temp directory, under a time limit and an output cap.
- The native engine is **not** a container sandbox: code can still read files and use the network with the server user's privileges. It is therefore **off in production** unless explicitly opted in. Production should use Judge0.
- Hidden inputs and outputs never leave the server: the bundle scan found 0 of 4,522 hidden strings, and hidden case events carry metadata only.
- The JS sandbox's existing escape tests still pass (90/90 security tests).
- The RLS migration `20261006_security_hardening_rls` is **still not applied** (awaiting your approval).

## 8. Required for production (action needed)

On Vercel (`NODE_ENV=production`) there is no Python or Java runtime, so **Python, Java and C++ are still transpiled until a Judge0 endpoint is configured.** Set these in the Vercel environment:

```
JUDGE0_URL=<your Judge0 CE endpoint>
JUDGE0_AUTH_TOKEN=<key>
# Optional:
JUDGE0_AUTH_HEADER
JUDGE0_RAPIDAPI_HOST
JUDGE0_LANGUAGE_IDS
```

## 9. Automated test results (run 2026-10-07)

| Check | Result |
|---|---|
| `npx tsc -b` | exit 0 |
| `npm run build` (includes `check:bundle`) | exit 0; 0/4,522 hidden strings in `dist/` |
| `test:judge-all` | 1,240/1,240 accepted 10/10 (12,400 cases) |
| `test:practice-oracle` | 5,020 cases, 0 mismatches |
| `test:judge-oracle` | 7,400 cases, 0 mismatches |
| `test:judge` | 136/136 |
| `test:judge-audit` | PASSED |
| `test:security` | 90/90 |
| `npm test` | 29/29 |
| `test:coding` | 100/100 |
| `test:audit` | 40/40 |
| `test:multilang` | 33/33 |
| `test:practice-import` | 43/43 |
| `test:practice-e2e` | 7/7 |
| `validate:coding-judge` | passed |

**Not run:** `test:auth`, `test:streak`, `test:feedback`, `test:backend-feedback`, `test:teamsync*`, `test:problem-stats` and `test:dashboard-stats`. These suites write synthetic rows to the live Supabase database and are not affected by the judge changes.

**Not verified:**
- The arena UI in a browser, which needs a Google login.
- A real Judge0 instance; only the local Judge0-compatible test server was used.
- C++ compiled with a real g++.
