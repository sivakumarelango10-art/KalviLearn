# Testing, content, and maintenance audit evidence

Audit date: 20 October 2026 (Asia/Calcutta). This is a local source review and offline validation. No production requests, database queries, migrations, seeds, production load tests, or package installation were performed for this workstream.

## Verified content results

| Check | Result |
| --- | --- |
| Client practice catalog | 10 belts, 500 questions |
| Client coding catalog | 740 questions |
| `python scripts/judge_oracle.py` | Exit 0; 740/740 questions and 7,400 expected outputs recomputed; zero mismatches |
| `python scripts/practice_oracle.py` | Exit 0; 502 server suites and 5,020 expected outputs recomputed; zero mismatches, invalid/ambiguous inputs, or shape errors |
| Practice format-dependent cases | 75; oracle reports their formats are explicitly documented and their outputs verified under those formats |

The practice server repository contains two more suites than the 500-question client catalog. The oracle count of 502 is not a claim that the UI offers 502 practice questions. These checks demonstrate stored-answer consistency under the implemented oracle families; they do not establish educational originality, complete adversarial coverage, or runtime performance.

## Findings

### T1 — High: legacy full seed destroys learner history and rebuilds an obsolete, unsafe client catalog

- Evidence: `scripts/seedAll.cjs:64` assembles the legacy three-belt/85-problem bank. Lines 90–116 include all ten test inputs and expected outputs in each client problem; line 130 writes the payload to `src/data/problems.json`. Line 135 executes `TRUNCATE TABLE "Submission", "UserProgress", "TestCase", "Problem", "Belt", "LearningUnit", "Module" CASCADE`.
- Impact: executing the retained script against a configured database deletes learner submissions and progress, replaces the current 500-problem catalog with 85 legacy problems, and places hidden test content back into client source. There is no explicit reset flag, staging-only host restriction, backup, or transaction wrapping the rebuild.
- Recommendation: retire the legacy entry point or make it fail closed outside an explicitly named disposable database; require a separate reset action, back up first, and use the current content builder with server/client test separation. Keep the bundle leak guard.
- Validation: source inspection only; the script was not executed.

### T2 — High: user seeding reopens public roster access

- Evidence: `scripts/seedUsers.cjs:64–70` grants `SELECT` to `anon`, enables RLS, and creates a permissive `FOR SELECT USING (true)` policy on `public.users`. This happens regardless of whether `ALLOW_USER_TABLE_RESET` is set.
- Impact: a routine seed after applying the security migration can re-expose the entire users table to anonymous/public-key requests, because the new permissive policy applies broadly and combines permissively with existing policies.
- Recommendation: remove privilege/policy mutations from seed scripts; manage policies exclusively through reviewed migrations, and test that rerunning seeds preserves the hardened policy set.
- Validation: source inspection; no production policy state was queried.

### T3 — High: integration test teardown can delete concurrent real webhook events

- Evidence: `scripts/test-teamsync-webhook-sender.ts:457` deletes delivery rows with `event_id LIKE 'evt_%'` and a creation time after the test started. `scripts/test-teamsync-webhook.ts:849` deletes incoming event rows using the same prefix and a receipt time after test start.
- Production overlap: `src/server/teamSyncWebhookSender.ts:182`, `:213`, `:247`, and `:287` generate `evt_status`, `evt_prio`, `evt_assign`, and `evt_comment` identifiers. These all match the cleanup predicate.
- Impact: running the test suites against a live project can delete legitimate webhook delivery/audit/deduplication records created concurrently, even though the comments call cleanup “scoped.” Time alone does not identify test ownership.
- Recommendation: run these suites only against a disposable test database; generate a unique per-run identifier, track exact inserted IDs, and delete only those IDs. Check Supabase's returned `error` on cleanup; a fulfilled request promise does not establish a successful delete.
- Validation: source inspection; no deletes were run.

### T4 — Medium: full test command is not an offline, isolated regression suite

- Evidence: `package.json:40` combines local checks with `test:auth`, `test:streak`, `test:problem-stats`, `test:dashboard-stats`, `test:backend-feedback`, and TeamSync integration suites. `src/lib/supabase.ts:5–12` and `src/server/feedbackAuth.ts:11–24` use a real project URL and publishable key as development defaults. `scripts/test-teamsync-webhook.ts:57–73` explicitly reads `.env`.
- Impact: a developer can run a generic “all tests” command and reach the live project without deliberately selecting it. Feedback/webhook suites insert, update, and delete data. Existing historical reports also describe earlier full-suite runs leaving synthetic production feedback; those historical counts were not revalidated.
- Recommendation: split `test:unit` / offline validation from `test:integration`; require an explicitly configured test project and reject known production project URLs before any integration write.
- Validation: source inspection only; live suites were excluded.

### T5 — Medium: load tests do not prove successful authenticated execution and can report false success

- Evidence: `tests/load/harness.cjs:117–146` defaults to the live application URL and supplies no `Authorization` header, while `src/server/apiHandler.ts:55` authenticates every execution request. The harness uses `isSubmit: false` (Run mode: three visible tests), while the acceptance test's header claims ten-case evaluation. It equates HTTP 200 with correctness and defaults absent case data to ten.
- Confirmed offline reproduction: replacing `global.fetch` with a stub returning HTTP 200 and `{}` produced `ok: true`, `evaluatedCases: 10`, `passedCount: 0`, and `totalCount: 10`.
- Confirmed offline reproduction: a stubbed HTTP 401 for every worker yielded a 100% error rate, but `tests/load/concurrency-200.cjs` completed with process exit code 0. Its success/failure results do not control the process status. Soak and worst-case entry points likewise lack acceptance thresholds.
- Additional limits: no request abort deadline; the “200-user” soak uses 50 workers; latency/throughput numbers describe requests and can therefore measure rejection throughput instead of judge throughput.
- Recommendation: require an explicit non-production target and distinct authorized test identities, validate verdict/case counts/hidden-data sanitization, distinguish Run and Submit workloads, set timeouts and latency/error thresholds, and exit nonzero on failed acceptance criteria.
- Validation: only local fetch stubs were used. No load was sent to any server.

### T6 — Medium: test runner is missing from the locked dependency graph

- Evidence: `package.json:15–39` invokes `npx tsx` for TypeScript tests, but `tsx` is absent from declared dependencies/devDependencies and there is no `node_modules/tsx` package entry in `package-lock.json`. The workspace also has no installed `node_modules/tsx` or `.bin/tsx` at inspection time.
- Impact: a fresh locked install does not supply the test runner. Running tests may require an unpinned network fetch or a preexisting machine cache, so test execution is not reproducible or offline.
- Recommendation: declare and lock `tsx` as a development dependency, invoke the installed executable, and document Python/JDK/C++ runtime requirements for relevant judge tests.
- Validation: read-only manifest/lockfile/installed-path inspection; no install attempted.

### T7 — Medium coverage gap: several “UI” tests exercise local replicas instead of actual components

- Evidence: `scripts/test-frontend-feedback-ui.ts:59` defines its own `validateFormInput`, and around line 123 defines its own attachment validator; neither is the production component's handler. The test's required-title rule checks only emptiness, whereas `src/components/feedback/FeedbackForm.tsx:303` requires at least three characters. `scripts/test-student-profile-ui.ts:69` creates a string-rendering replica for its student rendering scenarios.
- Impact: these scripts can stay green when the actual UI validation/rendering breaks. They do not establish interaction, accessibility, focus, upload, or responsive-layout behavior.
- Recommendation: extract shared pure validation for direct tests and add a small set of browser/component tests that actually render the production components and exercise their critical flows.
- Validation: source comparison. This is a coverage limitation, not evidence that every listed UI behavior currently fails.

### T8 — Low: onboarding documentation describes a superseded product architecture

- Evidence: `README.md:3–19` describes 85 problems in three belts, while the actual client catalog has 500 problems in ten belts plus 740 coding questions. It describes client-side multi-language execution in its feature list while the current system has authenticated server-side judge paths. No `.github/workflows` directory was found.
- Impact: new maintainers receive incorrect scope and execution guidance, and repository-hosted CI enforcement was not demonstrated.
- Recommendation: update README counts, architecture, test isolation instructions, runtime prerequisites, and current deployment configuration. Add CI for the safe locked build and offline checks; treat staging integration checks separately.

## Additional maintenance concerns

- `scripts/fastSyncDb.cjs:99–110` deletes existing test cases for every problem loaded into `problemIdMap`, then inserts replacements later. Missing source suites silently become `[]`. There is no transaction around the delete/reinsert sequence, so interruption or insert failure leaves missing test cases. The script also includes database problems outside the client bank in the deletion set.
- `scripts/migrateCurriculum.cjs:61` deletes all learning units before recreating them, without one enclosing transaction.
- Seed/registration/migration/`rls-*` scripts are not safe offline test commands. Even rollback-based RLS tests connect to a real database and can take blocking DDL locks.
- Build-time startup checks are useful but limited: `scripts/check-api-startup.mjs` verifies all bundles import; it only invokes execute/submit handlers, and checks missing-configuration behavior, not successful authenticated data flows.
- The hidden-data bundle check is a useful regression guard, but uses string matching and excludes short/public-overlapping values; it is not a substitute for import-boundary enforcement.

## Safe test execution guidance

Use existing local binaries, clear or replace inherited remote judge/database configuration as appropriate, and do not allow `npx` to install packages implicitly.

| Classification | Commands/suites |
| --- | --- |
| Local read-only content checks | Python `judge_oracle.py`, `practice_oracle.py`; `test:judge-audit`, `test:coding`, `test:practice-import` |
| Local execution checks when `JUDGE0_URL` is unset | `npm test`, `test:multilang`, `test:security`, `test:practice-e2e`, `test:audit`, `validate:coding-judge`; `test:judge-all` executes all 1,240 client questions through real Python and may take substantial time |
| Local test Judge0 server | `test:judge` replaces its Judge0 URL with a local compatible server; native runtime availability determines real-language coverage |
| Local helper checks with limited UI coverage | `test:feedback`; standalone `test-student-profile-ui.ts` |
| Real Supabase reads; excluded from this workstream | `test:auth`, `test:streak`, `test:problem-stats`, `test:dashboard-stats` |
| Real Supabase writes/deletes; excluded | `test:backend-feedback`, `test:teamsync`, `test:teamsync-webhook`, `test:teamsync-sender` |
| Potential live traffic; excluded | All `tests/load/*.cjs` entry points unless explicitly configured and isolated |
| Destructive/database maintenance; excluded | Seeds, registrations/imports, migrations, `fastSyncDb`, `secureDatabaseRls`, `rls-adversarial`, `rls-rollback-test` |

Build and broader runtime suite results are owned by the main audit and should be reported separately from the checks executed in this workstream.
