# KalviLearn — Engineering, Security & Realtime Audit Report

Audit date: 2026-10-06 · Repo: `E:\KalviCode` (branch `main`, base commit `765efc6`) · Auditor: Claude (Sonnet 5.5)

Legend used throughout: **VERIFIED** (executed/observed in this audit) · **NOT VERIFIED** · **REQUIRES PRODUCTION ENVIRONMENT** · **REQUIRES MANUAL TESTING** · **NOT MEASURED**.

---

## A. Executive summary

| Area | Status | One-line reason |
|---|---|---|
| Overall security | **NEEDS ATTENTION** (code: hardened · database: fix ready, **not yet applied**) | The worst exposure is in the *live database policies*, and the corrective migration has deliberately **not** been applied to production (see §M for the required order). |
| Performance | **PARTIALLY OPTIMIZED** | One measured hotspot fixed (practice list render); several aggregate queries remain client-side. Most runtime metrics are NOT MEASURED. |
| Realtime | **PARTIALLY HEALTHY** | Cleanup is correct everywhere; a duplicate subscription was removed; feedback realtime could never fire (tables not in the publication) — fixed in the pending migration. |

**What was wrong, in plain terms (all VERIFIED):**

1. **Any student could read the server's environment variables** (including the Supabase service-role key in production) by submitting code. Proof-of-concept returned a probe secret through 4 different escape routes; the "security guard" was a regex that was trivially bypassed.
2. **The live database allowed anonymous access.** With only the public anon key, a caller could read **all 142 users, 416 submissions, 479 feedback reports, 148 mentor/student roster rows**, and (via `USING (true)` write policies) modify progress, rosters, tickets and any user's `role`.
3. **One line of submitted code could crash the server process** (unhandled promise rejection).
4. `/api/execute` required **no authentication**; the webhook receiver accepted an **empty HMAC key** when no secret was configured.
5. Every Submit wrote **two** database rows (server + browser) — observed in production at 09:44 today for a real student.

Everything in (1), (3), (4), (5) is fixed in code and covered by tests. Item (2) is fixed in a migration that was **verified by 61 adversarial checks inside a rolled-back transaction against the live schema, but not applied**.

---

## B. Codebase audit

**Architecture map (VERIFIED by reading code + live DB introspection):**
Vite/React 19 SPA (Tailwind, Monaco, react-router) → Supabase (Auth: Google OAuth; Postgres; Realtime; Storage) with the browser querying Supabase **directly** for rosters/dashboards (RLS is therefore the security boundary), plus 5 Vercel serverless handlers bundled by esbuild into `api/`: `execute`, `submit`, `feedback`, `integrations/teamsync/tickets`, `integrations/teamsync/webhooks`. Code execution = runners that transpile Python/Java/C++ to JS and evaluate it (server-side and in a browser worker). TeamSync = outbound ticket API + inbound HMAC-signed webhooks.

**Inspected in full:** `apiHandler`, `submitHandler`, `executeService`, `feedbackAuth`, `feedbackHandler`, `teamSyncWebhookAuth`, `teamSyncWebhookHandler`. **Inspected partially:** `teamSyncHandler` (≈60%), `teamSyncWebhookService` (first 140 lines), `teamSyncWebhookSender` (secret/SSRF-validation part), the runners (entry points + evaluation sites). **Not read:** `feedbackLifecycle`, `teamSyncService` (exercised only through their existing tests). Also: `src/lib/{supabase,authService,cloudSync,progress,streak}`, `AuthContext`, `AppLayout`, `ProblemArenaPage`, `LanguagePracticePage`, mentor/campus/growth services (targeted: queries, subscriptions, writes), `prisma/schema.prisma`, all migrations and RLS scripts, `vercel.json`, `vite.config.ts`, `package.json`, `.env.example`, the test scripts (searched for DB writes/deletes/auth tokens; the DB-touching ones were read around those points), and the **live database** (policies, grants, indexes, constraints, columns, row counts, auth↔users identity mapping, storage policies, realtime publication — read-only).
**Not read line-by-line:** the large presentational pages (mentor/campus/profile/legal pages, ~20 components). These were covered by targeted searches (XSS sinks, subscriptions, storage keys, queries, writes) — **no `dangerouslySetInnerHTML`/`innerHTML`/raw SQL exists anywhere in `src/`**.

**Files modified (27) / added (7):** see §H.

**Key architectural findings**
- `public.users.id` ≠ Supabase `auth.uid()` for 24 of the 30 accounts matched by email. Any RLS written as `auth.uid() = id` locks most users out — which is almost certainly why the live policies are `OR true`. The new policies resolve identity through the verified JWT **email claim** (SECURITY DEFINER helpers).
- The browser performs privileged writes directly (role changes, roster edits, progress/XP). Progress/XP/submission writes were moved to server-only; roster administration stays client-driven but is now constrained by policies + a column-guard trigger.

---

## C. Performance findings

| # | PROBLEM | ROOT CAUSE | FIX | RESULT |
|---|---|---|---|---|
| P1 | Practice list re-render is slow | `isProblemAttemptedInLanguage` called once **per row** (~500) per render; each call `JSON.parse`d the entire local progress state | `getUserStateReadOnly()` parse cache keyed on the raw storage string; used by the 4 read-only helpers (mutating code still uses `getUserState()`) | **VERIFIED, synthetic worst case (1.4 MB state): 661 ms → 1 ms per list render.** A typical student's state is far smaller, so real gains are smaller. Node benchmark of the function, not a React profile. |
| P2 | Every Submit stored two rows and ran two writes | Server persisted *and* the browser persisted (`saveSuccessToCloud`/`saveAttemptToCloud`) | Removed browser writes; server is the single writer | **VERIFIED in production data:** one real submission at 09:44:22 (server id format) + one at 09:44:28 (browser UUID format). Eliminated in code; fully effective once deployed. |
| P3 | Duplicate realtime refetch | `AuthContext` **and** `AppLayout` both subscribed to `UserProgress`+`Submission` for the same user, each refetching on every event | Removed the `AppLayout` subscription | 2 channels → 1; 4 DB round-trips per event → 2. |
| P4 | Auth cost on every Run/Submit | 2 Supabase round-trips (`auth.getUser` + `users` lookup) per request | 30 s in-memory cache of *verified* tokens (keyed by sha256(token), per-token, bounded) | Not measured in production. Trade-off: ≤30 s deactivation lag. |
| P5 | Campus overview downloaded every Submission/UserProgress row | Client-side aggregation; PostgREST silently caps at 1000 rows (416 submissions today → wrong stats soon) | `campus_overview_metrics()` SQL aggregate (staff-only) + client uses it with fallback | Correct at any scale **once migration is applied**. Other campus aggregates still unbounded (§L). |
| P6 | Missing indexes | See §F | Added | Not measured (tables are small today). |
| P7 | Same-tick double-click double-fired execution/submit | Guard was React state (async) | `useRef` lock + idempotency scoped per user with shared in-flight promise | Unit-verified (concurrent identical submit → one evaluation). |
| P8 | Stale response painted onto another problem | No context check after `await` | Context-version ref; late result still recorded for the right problem, UI untouched | Reasoned + type-checked; **REQUIRES MANUAL TESTING** in a browser. |
| — | Monaco | Editor instance is stable (no `key`, language prop swaps model) | None needed | VERIFIED by reading; no recreation on problem/language change. |
| — | N+1 | Mentor/campus services already batch with `.in()` + `Promise.all` | None needed | **No N+1 pattern found.** |
| — | Frontend bundle | — | Nothing safe to cut within scope | **VERIFIED unchanged: JS 2,699,810 B → 2,699,861 B raw (+51 B).** No improvement claimed. |

**Not changed on purpose:** blanket `useMemo/useCallback/React.memo` (no profiler evidence of benefit); CSP header (Monaco's CDN loader needs a tailored policy — recommended follow-up).

## D. Security findings

| Severity | Category | Finding | Root cause | Fix | Status |
|---|---|---|---|---|---|
| CRITICAL | Code Execution / Secrets | Submitted code could read `process.env` (service-role key) and reach `process` | Runners did `new Function(...)` in the **server's own realm**; guard = bypassable regex | Hardened `node:vm` sandbox (null-prototype context, no `process`/`require`, no `eval`/`Function`/`import()`, scoped host-constructor lock, CPU timeout, output cap, 7 s request budget, error-accessor/Proxy-safe) | **FIXED & VERIFIED** — 17+15 escape attempts, 0 leaks (PoC leaked before fix) |
| CRITICAL | RLS / Data Leakage | Anonymous read of all users, submissions (incl. source code), feedback, rosters | `USING (true)` SELECT policies for `public`; anon table grants | Migration: RLS on every table, all legacy policies dropped, anon has **zero** grants, role-scoped policies | **FIX READY — NOT APPLIED** (dry-run 61/61) |
| CRITICAL | RLS / Authorization | Any signed-in user could `UPDATE users SET role='ADMIN'` on any row | `users` UPDATE policy `USING (true)` | Own-row/role-scoped policy + `guard_users_update` trigger (no role/status/email/mentor-link escalation; campus managers limited to STUDENT/MENTOR, cannot touch peers) | **FIX READY — NOT APPLIED** |
| CRITICAL | RLS | Anonymous write/delete of `UserProgress`, rosters, `feedback_reports` | `FOR ALL USING (true)`; `TRUNCATE` etc. granted to anon | Writes revoked; progress/submissions/feedback server-only | **FIX READY — NOT APPLIED** |
| CRITICAL | Authentication | `/api/execute` open to the internet | No auth check | Bearer token + DB-verified account required; per-user quota | **FIXED & VERIFIED** |
| CRITICAL | Webhooks | Empty HMAC key accepted when no secret configured (attacker can compute the signature) | `secret = env \|\| ''` | Fail closed (503); signing with empty key throws; no hard-coded default secret | **FIXED & VERIFIED** |
| HIGH | Availability | One line (`Promise.reject(...)`/`import()`) killed the Node process | Unhandled rejection from submitted code | Scoped `unhandledRejection` guard (sandbox-originated only; others keep default crash) | **FIXED & VERIFIED** (reproduced crash first) |
| HIGH | Authorization / Integrity | Browser could write its own `SOLVED`/`xpEarned`/Submission rows | Client-side `upsert`/`insert` + `WITH CHECK (auth.uid()=userId)` / `true` policies | Client writes removed; server-authoritative; DB writes revoked from `authenticated` | Code **FIXED**; DB revoke **pending migration** |
| HIGH | IDOR | Any mentor could advance/close any user's feedback ticket | `isAdmin` included `MENTOR` unconditionally | Mentor must be the ticket author's ACTIVE mentor; tests added (403 for unassigned mentor and for students) | **FIXED & VERIFIED** |
| HIGH | Authentication | Role-bearing `test_auth_*` tokens honoured whenever `NODE_ENV !== 'production'` | Env-only gate | Requires explicit `ALLOW_TEST_AUTH_TOKENS=1` and non-production; synthetic users are never persisted | **FIXED & VERIFIED** |
| HIGH | Authentication | Auth failed *open*: DB error ⇒ authenticated STUDENT (inactive check skipped); unregistered auth users accepted | `catch {}` + fallback | Fail closed (503/403); parameterised `.eq()` lookups (no `.or()` string interpolation) | **FIXED** (JWT path against real Supabase: **REQUIRES PRODUCTION ENVIRONMENT**) |
| HIGH | RLS | `feedback_comments`, `feedback_audit_logs`, `teamsync_webhook_events/deliveries` had RLS **off** + anon full grants | Missing `ENABLE ROW LEVEL SECURITY` | RLS on; no client policies (service role only) | **FIX READY — NOT APPLIED** |
| MEDIUM | CORS | `Access-Control-Allow-Origin: *` on authenticated APIs | Copy-pasted headers | Origin allow-list (`ALLOWED_ORIGINS`, prod origin, localhost only outside prod); webhook endpoint emits no CORS | **FIXED & VERIFIED** |
| MEDIUM | Input Validation / XSS | Feedback attachment accepted **any** URL (stored, shown to staff, forwarded to TeamSync) | `attachmentUrl = rawUrl` fallback | Only this project's `feedback-attachments` public bucket URLs; decoded upload ≤5 MB; `deviceInfo` ≤4 KB | **FIXED & VERIFIED** (7 hostile URLs rejected) |
| MEDIUM | Storage | Anonymous uploads to the attachments bucket, no size/MIME limits | Public INSERT policy | Authenticated-only insert; 5 MB + image MIME limits | **FIX READY — NOT APPLIED** |
| MEDIUM | Cache Isolation | Local progress merged across accounts when login happened without a `SIGNED_OUT` | State not tagged with owner | `claimStateForUser`; stale in-flight sync responses ignored | **FIXED & VERIFIED** (unit) |
| MEDIUM | Rate Limiting | IP limiter trusted `x-forwarded-for` first hop; maps grew unbounded; no per-user quota | Ad-hoc copies | Shared bounded limiter; per-IP (pre-auth) + per-user; prefers platform IP headers | **FIXED & VERIFIED** (per-instance only — §L) |
| MEDIUM | Data Integrity | `UserProgress` unique on (user, problem) only → same problem in two languages impossible; code's `onConflict 'userId,problemId,language'` could never match | Live DB drifted from `schema.prisma` | Unique (user, problem, **language**); server uses insert/update with `23505` handling (XP exactly once) | Code **FIXED**; index **pending migration** (dry-run proves coexistence + duplicate rejection) |
| LOW | Error Handling | Internal `err.message` returned to clients | Passed through | Generic messages; details logged server-side | **FIXED** |
| LOW | Secrets | Dev webhook secret literal in source (`ts_whsec_…`) | Convenience default | Removed (source + tests use per-run random secret) | **FIXED** |
| LOW | Headers | Security headers only on HTML routes | `vercel.json` scoping | nosniff/HSTS/X-Frame/Referrer/Permissions-Policy on all routes; `no-store` on `/api/*` | **FIXED** (**REQUIRES PRODUCTION ENVIRONMENT** to confirm) |
| INFO | CSRF | Auth uses Bearer tokens only (no cookies) → classic CSRF not applicable | — | None needed | **VERIFIED by reading** |
| INFO | **Retracted finding** | I initially reported "hidden test cases ship in the client bundle". **That was wrong** — `problems.json` holds only `{testIndex,isHidden:true}` for cases 4-10. I added then removed a Vite stripping plugin; only a post-build regression guard (`check:bundle`, runs in `npm run build`) remains. | Counted flags instead of reading content | — | No leak exists (VERIFIED) |

## E. Realtime audit

| Item | Result |
|---|---|
| Subscriptions found | `AuthContext` (student: `UserProgress`,`Submission`), `AppLayout` (duplicate), growth-mentor hook (`mentor_students`), mentor pages ×3 (+live submissions stream), campus pages ×4 (5 tables each), `feedbackService` (`feedback_reports`,`feedback_comments`) |
| Duplicates | 1 (AppLayout vs AuthContext) — **removed** |
| Cleanup | All have create → listen → `removeChannel` + debounce clear on unsubscribe (VERIFIED by reading); unique channel names |
| **Dead feature** | `feedback_reports`/`feedback_comments` were **not in the `supabase_realtime` publication** → feedback status/comment realtime could never fire. Added in migration (**pending**). Publication currently: `Submission, UserProgress, users`. |
| Isolation | Postgres-changes channels are unfiltered (campus/mentor) — safe only with RLS; today (permissive policies) any subscriber would receive other users' rows. Migration makes Realtime evaluate the role-scoped SELECT policies. |
| Reconnect / optimistic updates / multi-tab | Supabase client auto-reconnects; no optimistic mutations exist (state follows server responses). **NOT VERIFIED / REQUIRES MANUAL TESTING** (network drop, two tabs). Double-XP prevented by DB uniqueness (migration) + server logic. |

## F. Database audit (live, read-only introspection)

- **Tables inspected:** 16 public (`Belt, Problem(500), TestCase(5000: 1500 visible/3500 hidden), Module, LearningUnit, Submission(416), UserProgress(267), users(142: 128 STUDENT/11 MENTOR/3 CAMPUS_MANAGER), students, mentors, mentor_students, feedback_*, teamsync_*`), plus storage policies and the realtime publication.
- **Indexes added (migration):** `UserProgress(userId,problemId,language)` UNIQUE (replaces the 2-column unique), `Submission(userId,createdAt DESC)`, `Submission(createdAt DESC)`, `Submission(problemId)`, `UserProgress(userId,status)`, `UserProgress(problemId)`, `users(lower(email))` (used by the RLS identity helper), `users(role)`, `feedback_reports(user_id,created_at DESC)`, `feedback_comments(feedback_report_id,created_at)`. **Dropped 4 redundant duplicates** of unique indexes. Live DB also lacked `Submission/UserProgress` indexes declared in `schema.prisma` (drift).
- **Constraints added (validated against existing data in the dry run):** status/xp/role CHECKs.
- **N+1 removed:** none existed. **Unbounded queries fixed:** campus overview (RPC). **Remaining:** see §L.
- **Transactions:** progress write is insert-or-update with a unique-violation retry (atomic enough for single-row XP); a true multi-statement transaction would need a Postgres function — not added.
- **Test pollution (VERIFIED):** `feedback_reports` holds **520 rows, 474 with `@…test` emails** — leftovers from the test suites (433 before this audit; the suites I ran left ~41 more because they only delete rows they track). Not deleted (no instruction). Scoped cleanup: `DELETE FROM feedback_reports WHERE user_email_snapshot LIKE '%@kalvilearn.test';` — **review before running**; comments/audit rows cascade.

## G. Hardcoded data audit

| Check | Result |
|---|---|
| Real emails/names/UUIDs in `src/`, `scripts/`, `api` sources | **None** (only the support address on the legal pages and synthetic `@teamsync.io` names in test fixtures) |
| Synthetic test roster | `…@kalvilearn.test` ids `00000000-…-0001..0004` exist only as test identities; now **never persisted** by `/api/submit` and unusable outside explicit test mode. Two exist as rows in `users` (seeded earlier). |
| Fallback/mock production data | None found in services. |
| Remaining constants | Supabase project URL + **publishable** key (public by design, used as dev fallback; production now requires explicit env on the server), prod origin `https://kalvilearn.vercel.app`. |
| Secrets in git history | `git log -S` for service_role / JWT literals: none found. `.env` is git-ignored. |

## H. Files changed

| File | Change | Reason | Risk |
|---|---|---|---|
| `src/server/sandbox.ts` (new) | vm sandbox evaluator + rejection guard | RCE/secret exfil, process-crash DoS | Medium: `vm` isn't a hard boundary (§L) |
| `src/lib/runner/evaluator.ts` (new) + 3 runners | Pluggable evaluator; Python helper installer made re-runnable | Let server swap in sandbox; browser default unchanged | Low (16-program differential test: identical output) |
| `src/server/executeService.ts` | Sandbox install, JS path via evaluator, parse-only compile check, output cap, 7 s budget | Same | Low |
| `src/server/httpSecurity.ts` (new) | CORS allow-list, IP, bounded body reader, bounded limiter, test-auth gate | Shared hardening | Low |
| `src/server/apiHandler.ts`, `submitHandler.ts` | Auth required, per-user limits, validation, idempotency (in-flight dedupe), first-solve XP logic, generic errors | Open execute, double writes, forged identity | Medium: guests/unauthenticated clients now get 401 (intended) |
| `src/server/feedbackAuth.ts` | Fail-closed DB lookup, token cache, test-token gate, trusted-URL helper, prod env requirement | Auth fail-open, hard-coded keys | Medium: unregistered Supabase users now 403 (matches client behaviour) |
| `src/server/feedbackHandler.ts`, `teamSyncHandler.ts` | CORS, IP, attachment trust/size, mentor scoping, no error leakage | IDOR / stored-URL abuse | Low |
| `src/server/teamSync*Auth/Handler/Sender.ts` | Fail-closed secret, no default secret, no CORS on webhook | Forgeable webhooks | Low; **requires secret env in deploy** |
| `src/lib/cloudSync.ts`, `progress.ts` | Removed client DB writes; read-only parse cache; state-owner tagging | Forgery, dupes, perf, account switch | Low |
| `src/contexts/AuthContext.tsx`, `src/layouts/AppLayout.tsx` | Owner claim + stale-response guard; duplicate subscription removed | Cache isolation, realtime | Low |
| `src/pages/ProblemArenaPage.tsx` | Ref execution lock, stale-context guard | Race conditions | Low (manual UI test advised) |
| `src/lib/campusManagerService.ts` | Use SQL aggregate RPC with fallback | Scale/correctness | Low |
| `vite.config.ts` | Dev/preview route **all** `/api/*` through the real handlers (dev `execute` bypassed auth) | Parity | Low |
| `vercel.json`, `.env.example`, `package.json` | Headers, documented env, `test:security`, `check:bundle` in build | Hardening | Low |
| `prisma/migrations/20261006_security_hardening_rls/migration.sql` (new) | RLS/privileges/trigger/indexes/constraints/RPC/realtime/storage | See §D | **High if applied out of order (§M)** |
| `scripts/*` | New `test-security-hardening.ts` (65 checks), `rls-dry-run.cjs`, `check-bundle-no-hidden-tests.cjs`; 5 existing tests updated (test-auth flag, mentor scoping asserts, per-run secrets, **scoped** webhook-event teardown instead of `LIKE '%evt_%'` on all history) | Regression coverage | Low |
| `api/*.js` | Rebuilt bundles (tracked build artifacts) | Contain the new handlers | Low |

*(Pre-existing uncommitted change `KalviLearn_10_Belt_Programming_Question_Bank_500.md` was left untouched.)*

## I. Test results (all executed in this session)

| Test | Result |
|---|---|
| TypeScript (`tsc -b`) | **PASS** (exit 0) |
| Unit/pipeline (`npm test`) | **PASS** 17/17 |
| Auth | **PASS** 12/12 |
| Streak | **PASS** 33/33 |
| Feedback (frontend UI logic) | **PASS** 34/34 |
| Backend Feedback | **PASS** 58/58 (incl. 2 new mentor/student authorization assertions) |
| TeamSync | **PASS** 53/53 |
| TeamSync Webhook | **PASS** 63/63 |
| TeamSync Sender | **PASS** 40/40 |
| Multi-language | **PASS** 33/33 |
| **Security hardening (new)** | **PASS** 65/65 |
| Practice import / e2e | **PASS** 43/43 · 7/7 |
| Full chain `npm run test:all` | **PASS**, exit 0 (2 m 35 s) |
| Production build `npm run build` | **PASS** (tsc + vite + 5 API bundles + `check:bundle`) |
| RLS migration dry run (`scripts/rls-dry-run.cjs`, **rolled back**) | **PASS** 61/61 |

Caveat: DB-backed suites ran against the **live** Supabase project with the public anon key (no service-role key in the local `.env`). They pass *because* of today's permissive policies; **after the migration is applied they require `SUPABASE_SERVICE_ROLE_KEY` in `.env`.**

## J. Security test results

| Scenario | Result |
|---|---|
| Unauthenticated request (execute/submit/feedback) | 401 — VERIFIED |
| Expired / invalid / forged / `alg:none` token | 401 — VERIFIED for invalid, forged and `alg=none`; true *expired* Supabase JWT: **REQUIRES PRODUCTION ENVIRONMENT** |
| Role escalation (`test_auth_admin_*`) | Rejected unless explicit test flag, never in production — VERIFIED |
| IDOR (submit as other user; mentor/student on others' tickets) | 403 — VERIFIED |
| localStorage manipulation | Only UI state; server and (post-migration) RLS ignore it — VERIFIED by design review; role in localStorage cannot grant data |
| User / mentor / campus ID manipulation at DB level | Dry run: students/mentors/campus managers cannot read or modify out-of-scope rows — VERIFIED (rolled back) |
| SQL injection | No raw SQL or string-built filters remain (`.or()` interpolation removed) — VERIFIED by search |
| XSS | No HTML sinks; attachment URLs restricted; titles/descriptions sanitised (existing tests) — VERIFIED |
| Webhook spoofing / tamper / replay (stale timestamp) / empty-key forgery | All rejected — VERIFIED. Duplicate `event_id` idempotency covered by the existing 63 tests |
| Secret exposure | 32 escape attempts, **0 leaks** (pre-fix PoC leaked); bundle contains no hidden tests — VERIFIED |
| Code-execution escape / infinite loop / output flood / rejection crash | Blocked / TLE within budget / capped / survives — VERIFIED |
| Rate-limit abuse | 61st call per user → 429; other users unaffected; limiter memory bounded — VERIFIED (per instance) |
| Anonymous DB access (before → after) | 142 users / 416 submissions / 479 feedback / 148 roster rows readable → **0 and permission denied** (in the rolled-back migration) |

## K. Performance results

| Metric | Before | After | Improvement |
|---|---|---|---|
| Practice list: state parsing per render (synthetic 1.4 MB state, 500 rows) | 661 ms | 1 ms | ~650 ms (benchmark of the function, **not** a React profile) |
| Realtime channels per student session | 2 | 1 | −50% (by construction) |
| Rows written per Submit | 2 (production-observed) | 1 | −50% (once deployed) |
| Frontend JS (raw / gzip) | 2,699,810 / 407,164 B | 2,699,861 / 407,249 B | none (neutral) |
| Build time | — | vite 11.6–16 s; whole `npm run build` ≈ 30 s | n/a |
| Initial page load, API latency, DB query latency, React commit counts, memory, network waterfall | **NOT MEASURED** | **NOT MEASURED** | — |

## L. Remaining risks

| Risk | Label |
|---|---|
| `node:vm` is **not** a hardened boundary and has no memory cap; a novel escape or a memory bomb remains possible. Long-term fix: out-of-process runner (container/microVM/Judge0-Piston). Blast radius is limited by mandatory auth, per-user quota, and Vercel instance limits, but all Vercel functions share env vars (service-role key is reachable by anyone who escapes). | **NOT VERIFIED** beyond the 32 attempts tried |
| The migration is **not applied**. Until it is, the live database is still anonymously readable/writable. | **ACTION REQUIRED** (§M) |
| `SUPABASE_SERVICE_ROLE_KEY` / webhook secrets present in Vercel env? | **REQUIRES PRODUCTION ENVIRONMENT** |
| RLS identity relies on the JWT `email` claim of Google OAuth sign-ins; behaviour with real tokens of each role not exercised | **REQUIRES MANUAL TESTING** (student, mentor, campus-manager login + core flows, incl. mentor "add student by email") |
| Remaining client-side whole-table aggregates (campus students/leaderboards/analytics; mentor analytics) hit PostgREST's 1000-row cap as data grows | Open (needs SQL views/RPCs) |
| Rate limiting is per serverless instance (burst control, not a global quota) | Open (needs a shared store, e.g. Upstash/Redis) |
| 30 s token-verification cache = ≤30 s lag to deactivate an account on the API | Accepted trade-off |
| Mentors can read every STUDENT's `users` row (needed for add-by-email); students' name/email visible to all mentors | Accepted by design — tighten with an RPC if undesired |
| Dev-only passwordless `loginWithEmail` cannot work against the hardened DB (no session) | Dev-only; prod already disabled |
| No CSP header (Monaco loads from a CDN) | Recommended follow-up |
| Capacity limits (mentor `max_students`) enforced client-side only (race possible) | Open |
| Multi-tab, network-drop/reconnect, slow-network behaviour, UI double-click in a real browser | **REQUIRES MANUAL TESTING** |
| Test suites write to the live DB and leave rows (§F) | Open — use a staging project |
| Incident during this audit: my worktree cleanup followed a `node_modules` junction and emptied the real `node_modules`; restored with `npm ci` (lockfile unchanged, no source/data affected). | Resolved |

## M. Final verdict — **PRODUCTION READY WITH WARNINGS** *(for the code in this working tree)* — and **NOT PRODUCTION READY until the database migration is applied**

The application code is hardened, regression-tested (all suites + 65 new security checks green) and builds. But the single most severe exposure — the database policies — lives outside the code and is **still open in production** because applying RLS changes to a live 142-user system without a staging run is your call, not mine.

**Required rollout order (do not reorder):**
1. Confirm in Vercel: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TEAMSYNC_WEBHOOK_SECRET` (or `KALVILEARN_WEBHOOK_SECRET`) are set; `ALLOW_TEST_AUTH_TOKENS` is **not** set; add `ALLOWED_ORIGINS` if other origins call the API. (The new handlers refuse to start in production without the first two.)
2. Review the diff, commit, and deploy this code (server now writes progress; browser no longer does).
3. `npm i --no-save pg dotenv && node scripts/rls-dry-run.cjs` → expect `61/61 checks passed` and `ROLLED BACK`.
4. Apply `prisma/migrations/20261006_security_hardening_rls/migration.sql` (SQL editor or `psql -v ON_ERROR_STOP=1 -f`). Rolling back = restore policies from `scripts/secureDatabaseRls.cjs` history; the migration is idempotent and a single transaction.
5. Smoke-test as a student, a mentor (incl. add-student-by-email) and a campus manager; then add `SUPABASE_SERVICE_ROLE_KEY` to your local `.env` before re-running DB-backed tests.
6. Doing step 4 *before* step 2 would make the currently deployed client/server (which still write directly / may be using the anon key) fail silently — hence the order.
