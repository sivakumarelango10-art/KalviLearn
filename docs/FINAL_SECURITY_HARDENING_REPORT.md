# FINAL SECURITY & PRODUCTION HARDENING REPORT

Date: 2026-10-06 · Repo `E:\KalviCode` (base `765efc6`, **uncommitted working tree**) · Supersedes the conclusions of `docs/ENGINEERING_AUDIT_REPORT.md` where they differ (differences are called out in §1.3).

Legend — **VERIFIED**: executed and observed in this audit · **FIXED**: change made · **NOT FIXED** · **NOT VERIFIED** · **REQUIRES MANUAL ACTION**.

---

## 1. Executive Summary

### 1.1 Verdict: **NOT PRODUCTION READY**

**Reason, stated plainly:** the live Supabase database is still vulnerable. Against today's live policies, **33 of 39** attack attempts succeeded (inside a transaction that was always rolled back; nothing was modified). An anonymous caller holding only the public key can read all 142 users, 418 submissions, 600 feedback reports, 148 roster rows, and 142 webhook events; can forge or delete progress; and any signed-in user can rewrite other users' roles and e-mails. The fix is written and verified (below) but **has not been applied to production — it requires your explicit approval** (Phase 19 gate, §23). Under your own rule ("do not call it Production Ready while the live database remains vulnerable"), the verdict cannot be higher until it is applied and re-verified.

**Everything that can be fixed in code has been fixed and tested.** If the migration is applied in the order given in §23 and the post-migration checks in §20 pass, the verdict becomes **PRODUCTION READY WITH WARNINGS** (warnings: §21).

### 1.2 What changed in this pass (beyond the previous audit)

1. **Identity model redesigned.** My previous migration resolved identity from the JWT *email claim*. You asked me not to; I replaced it with a trusted, client-unwritable mapping column `users."authUid"` populated only from **confirmed Google identities**, plus link triggers. Forged-claim attacks are tested and blocked (ID1–ID4).
2. **Sandbox is now a separate OS process** (was: vm inside the API process). I found a flaw in my own previous work: a memory bomb (`new Array(2**32-1)`) **aborted the entire API process**, and a worker-thread alternative does not help (V8 fatal OOM aborts the process; a global `--max-old-space-size` also disables worker limits). Submitted code now runs in a forked child with an **empty environment**, a native heap cap, `--disallow-code-generation-from-strings`, Node's permission model (fs/spawn/worker denied) where supported, and a hard SIGKILL timeout.
3. **Global rate limiting** via an atomic Postgres counter (`rate_limit_hit`, service-role only) with in-memory fallback.
4. **Upload content validation by magic bytes** (SVG/HTML/polyglots rejected; client-declared MIME/name ignored).
5. **Analytics truncation fixed** (PostgREST 1000-row cap): SQL aggregate RPC for the campus overview + range pagination for the other whole-table reads.
6. **Cache isolation extended** to in-memory service caches (cleared on logout / account switch).
7. **Verified rollback**: `rollback.sql` is generated from the exact pre-migration snapshot and proven (migration → rollback → diff against baseline: identical).
8. **Forensics** on production test data and duplicate submissions (§15, §14) — read-only, nothing deleted.

### 1.3 Corrections to the previous report (honesty ledger)

| Previous claim / action | Reality |
|---|---|
| "Sandbox hardened; memory abuse = residual" | Memory abuse could **kill the API process**; now contained by process isolation (verified). |
| Migration identity by JWT email claim | Replaced by `authUid` mapping (above). |
| Dry-runs "safe" | They were data-safe but **not traffic-safe**: each dry-run transaction takes exclusive table locks (`ALTER TABLE … ENABLE RLS`, `DROP INDEX`, …) for 1–3 minutes against the **live** database. During that time logins and queries on those tables queue. I observed it first-hand: `test:auth`'s DB lookups hit their 3.5 s timeout while a dry-run was open. I ran roughly 10 such windows across both passes, and one detached job ran concurrently with another by mistake. No data changed, but production traffic during those windows could have stalled. **Run future dry-runs on a Supabase branch/clone.** |
| "Hidden tests leak into bundle" (retracted earlier) | Still retracted; `check:bundle` remains as a regression guard. |
| `node_modules` emptied by my worktree cleanup (earlier) | Restored with `npm ci`, lockfile unchanged. |

---

## 2. Critical vulnerabilities

| Issue | Severity | Found | Fixed in Code | Fixed in DB | Verified |
|---|---|---|---|---|---|
| Student code could read server env vars incl. service-role key | CRITICAL | Yes (PoC leaked a probe secret via 4 routes) | **FIXED** (vm sandbox → now child process, empty env) | n/a | **VERIFIED** (PoC pre/post; 32 escape attempts, 0 leaks; 88-check suite) |
| Anonymous read of users/submissions(code)/feedback/rosters/webhook logs | CRITICAL | Yes — 9/9 anonymous SELECTs succeed on live DB | n/a | **Migration ready — NOT APPLIED** | **VERIFIED** exploitable now; blocked in rolled-back dry run |
| Anonymous INSERT forged UserProgress; DELETE all progress; UPDATE all feedback | CRITICAL | Yes (AN10, AN12, AN13) | Client writes removed | **NOT APPLIED** | VERIFIED exploitable now / blocked post |
| Role escalation + identity takeover (`UPDATE users` role/email of others) | CRITICAL | Yes (ST7, ST8, MN5, MN6, CM1–CM3) | n/a | **NOT APPLIED** (trigger + policies) | VERIFIED exploitable now / blocked post |
| `/api/execute` unauthenticated | CRITICAL | Yes | **FIXED** | n/a | VERIFIED |
| Webhook accepts empty-key HMAC when secret unset | CRITICAL | Yes | **FIXED** (fail closed) | n/a | VERIFIED |
| Memory bomb aborts the API process | CRITICAL (new) | Yes — exit 134, host dead | **FIXED** (child process + native cap) | n/a | VERIFIED (dev + production-shaped artifact) |

## 3. High vulnerabilities

| Issue | Severity | Found | Fixed in Code | Fixed in DB | Verified |
|---|---|---|---|---|---|
| Unhandled promise rejection from submitted code crashes the process | HIGH | Yes (reproduced) | **FIXED** (now also isolated in the child) | n/a | VERIFIED |
| Client-forged XP/progress/submissions | HIGH | Yes (ST9, ST10, CM4) | **FIXED** (browser writes removed) | NOT APPLIED (writes revoked) | VERIFIED |
| Mentor could advance any user's feedback ticket (IDOR) | HIGH | Yes | **FIXED** | RLS also blocks (MN7) | VERIFIED |
| Test tokens honoured on `NODE_ENV` alone; auth fails open on DB error | HIGH | Yes | **FIXED** | n/a | VERIFIED |
| `feedback_comments`, `feedback_audit_logs`, `teamsync_webhook_*` have RLS **off** | HIGH | Yes (AN8, AN9, ST12) | n/a | **NOT APPLIED** | VERIFIED |
| Duplicate submission writes (server + browser) | HIGH | Yes — §14 | **FIXED** | n/a | VERIFIED in code/tests; production data shows the history |
| Previous identity design (email claim) spoofable if Auth config loosens | HIGH | Self-found | **FIXED** (authUid) | NOT APPLIED | VERIFIED (ID1–ID4) |

## 4. Medium vulnerabilities

| Issue | Severity | Found | Fixed in Code | Fixed in DB | Verified |
|---|---|---|---|---|---|
| CORS `*` on authenticated APIs | MEDIUM | Yes | **FIXED** (allow-list) | n/a | VERIFIED |
| Attachment accepted any URL; MIME/name trusted | MEDIUM | Yes | **FIXED** (trusted bucket URL only + magic-byte sniffing + safe object names) | NOT APPLIED (bucket: auth-only insert, 5 MB, image MIME) | VERIFIED (13 tests) |
| Cross-account local/in-memory cache leakage | MEDIUM | Yes | **FIXED** (owner tag + cache registry cleared on logout/switch) | n/a | VERIFIED (unit); real-browser **NOT VERIFIED** |
| Per-instance-only rate limits | MEDIUM | Yes | **FIXED** (distributed counter) | NOT APPLIED (function/table) | VERIFIED in dry run (limiter + permissions) |
| `UserProgress` unique on (user, problem) → multi-language can't coexist; 7 passed (user,problem,language) combos have **no** progress row | MEDIUM | Yes | Code uses insert/update with 23505 handling | NOT APPLIED (new unique index) | VERIFIED in dry run; **7-row data gap NOT FIXED** (backfill would change XP — needs your decision) |
| PostgREST 1000-row truncation in analytics | MEDIUM | Yes | **FIXED** (RPC + pagination) | RPC NOT APPLIED | Pagination VERIFIED by type-check/logic; RPC VERIFIED in dry run |
| Feedback realtime could never fire (tables not in publication) | MEDIUM | Yes | n/a | NOT APPLIED | VERIFIED (publication diff) |

## 5. Low vulnerabilities

| Issue | Severity | Status |
|---|---|---|
| Verbose internal error messages | LOW | **FIXED** |
| Dev webhook secret literal in source/tests | LOW | **FIXED** |
| Security headers only on HTML routes | LOW | **FIXED** (REQUIRES MANUAL ACTION: confirm on deployed site) |
| Historical migration `20260908_add_feedback_reports` contains `USING (… OR true)` | LOW | **NOT FIXED** deliberately (migrations are immutable history; the new migration drops/replaces every policy) |
| Dev-only passwordless `loginWithEmail` cannot work against hardened DB | LOW | Accepted (disabled in production already) |

---

## 6. Database / RLS findings

**Live snapshot (read-only, `docs/baseline-db-snapshot-2026-10-06.json`):** 16 public tables; RLS **off** on `feedback_audit_logs`, `feedback_comments`, `teamsync_webhook_deliveries`, `teamsync_webhook_events`; 24 policies, **13 of them `USING/CHECK true` or `OR true`**; `anon` and `authenticated` hold SELECT/INSERT/UPDATE/DELETE/TRUNCATE on every table (except `anon` on `users`); no `authUid`; 1 trigger (`check_single_mentor_assignment`); 1 function; realtime publication = `Submission, UserProgress, users`.

**Per-table matrix on LIVE policies (VERIFIED by attack, rolled back) → after migration (VERIFIED):**

| Table | Anonymous now | Student now | Mentor now | Campus mgr now | After migration |
|---|---|---|---|---|---|
| users | SELECT all (142) | SELECT all; UPDATE others' role/email | + self-promote, promote others | + grant ADMIN/SUPERADMIN, deactivate peer | anon ✗; student own row (+own mentor); mentor own + STUDENT rows; staff all; role/status/email/mentorId/authUid guarded by trigger |
| Submission | SELECT all, INSERT | SELECT all; INSERT as other user | SELECT unassigned students' | SELECT all | anon ✗; own; mentor = assigned students; staff all; **no client writes** |
| UserProgress | SELECT, INSERT forged XP, DELETE all | forge XP | – | forge XP | same as Submission |
| feedback_reports | SELECT all, UPDATE all (560) | SELECT/UPDATE all | UPDATE all | UPDATE all | anon ✗; own; admins all; **no client writes** |
| feedback_comments / audit_logs / webhook_* | **RLS off — full anon access** | same | same | same | RLS on; no client policy (service role only); comments readable by report owner/admin |
| students / mentors / mentor_students | SELECT all, **write all** | – | edit other mentors, reassign others' students | – | scoped (see §8) |
| TestCase (hidden) | – | hidden cases NOT readable (already) | – | – | unchanged (visible only), anon ✗ |
| ADMIN / SUPERADMIN | **No such accounts exist** (users: 128 STUDENT, 11 MENTOR, 3 CAMPUS_MANAGER). Policies exist; admin paths are **NOT VERIFIED** with a real account. |
| "Own campus only" | **Not implementable**: there is no campus entity in the schema. CAMPUS_MANAGER is effectively global. Multi-campus needs a `campusId` model — **NOT FIXED**, flagged. |

**Migration** `prisma/migrations/20261006_security_hardening_rls/migration.sql`: reviewed line by line — no `DROP TABLE`, no `DROP COLUMN`, no row `DELETE` other than pruning its own rate-limit table; only `DROP INDEX` of 4 redundant duplicates and the superseded 2-column unique; adds `users."authUid"` (nullable), 2 constraints families (validated on existing data), 9 indexes, 13 helper functions, 3 triggers, 22 policies, 1 table (`api_rate_limits`), realtime + storage + bucket changes. **VERIFIED: changes no existing row** (counts identical after apply).

## 7. Authentication findings

- Supabase Google OAuth is the only provider (37/37 identities, all confirmed). Server verifies tokens with `auth.getUser`, then resolves the app user from `users."authUid"`; unlinked rows bind only via confirmed Google identity + matching e-mail; DB error ⇒ **fail closed (503)**; inactive/unregistered ⇒ 403. **VERIFIED** by tests (JWT path against real Supabase tokens: **REQUIRES MANUAL ACTION** — log in once as each role after deployment).
- **Identity mapping, exactly:** `auth.uid()` → `public.users."authUid"` → `users.id/role/status` → `mentors.user_id` / `students.user_id` → `mentor_students` (ACTIVE). Findings behind the design: 37 auth users, 30 match an app user by e-mail, 6 by id (subset of the 30), 7 have no app user, **0** conflicts, no case duplicates, no non-lowercase e-mails.
- **REQUIRES MANUAL ACTION:** disable e-mail/password sign-ups and auto-confirm in Supabase Auth settings (the trigger also requires a *Google* identity, but defence in depth).

## 8. Authorization findings

Every endpoint independently checks authentication → identity (from token) → role → ownership; request-body `userId`, query ids, URL ids, client role and localStorage are never trusted (**VERIFIED**: IDOR tests, mentor/student ticket tests, per-user limits). Roster operations remain client-driven but are policy-constrained: mentors may only link/unlink **themselves** (`mentor_students.mentor_id = own`, `users.mentorId` ∈ {self, null}); campus managers may grant only STUDENT/MENTOR and cannot touch peers/admins; students may edit only their display name. **Positive controls (VERIFIED, 18):** student login lookup, own data, own mentor card, own profile/name sync; mentor roster, add-by-email claim round-trip, release; campus manager reads, onboarding (promote/provision), overview RPC, auto-link of an already-existing Google account.

## 9. Sandbox findings (`node:vm` + child process)

**Design now:** parent API process → `fork()` child (`api/_sandbox-worker.mjs`, bundle contains only runners + sandbox; no Supabase client/handlers/test repository) → `vm` context (null-prototype global, no `process`/`require`/`eval`/`Function`/`import()`/wasm, constructor-chain lock, stack-trace lock).

| Control | Result (all VERIFIED unless noted) |
|---|---|
| Env vars inaccessible | child has `env: {}`; 32 escape attempts + probe: 0 leaks |
| Filesystem / spawn | Node permission model denies read/write/list/spawn (probe on this Node 24 build); on older runtimes falls back to process isolation only — **NOT VERIFIED on Vercel's runtime** |
| Network | `fetch/XHR/WebSocket/require` absent in the context; **egress is NOT blocked at process level** (permission model does not restrict network) |
| Infinite loop / regex ReDoS / `Atomics.wait` / proxy+getter traps | TLE within 7 s budget; hard SIGKILL at 10 s |
| Memory abuse | unbounded growth and `new Array(2**32-1)` → **"Memory Limit Exceeded"; parent RSS stayed ~40–60 MB** (was: host abort). Off-heap `ArrayBuffer(2 GB)` is allocated lazily and is **not** capped by the heap limit — **NOT FIXED** (needs cgroup/container memory limit) |
| Promise rejection / dynamic import / constructor & `Function`/`eval` escapes / error getters | all contained (child dies at most) |
| Fail-closed | If the child entry file is missing in production the API refuses to execute (503) unless `SANDBOX_ALLOW_INPROCESS=1` |

**This is defence in depth, not perfect isolation:** same machine, same network namespace, same OS user, shared with the API instance.

## 10. API findings

`/api/execute` and `/api/submit`: auth mandatory, per-IP (pre-auth) + per-user (**global** after migration) limits, strict schema (slug/language/size/type), 256 KB body cap, idempotency scoped per user with in-flight de-dup, first-solve XP exactly once (unique key + `23505` handling), generic errors. `/api/feedback`, `/api/integrations/teamsync/*`: allow-listed CORS, trusted attachment URLs only, magic-byte validated uploads, device-info cap, mentor scoping. Dev server routes all `/api/*` through the real handlers.

## 11. Webhook findings

**VERIFIED (existing 63 + 40 + new tests):** missing secret ⇒ 503 reject; wrong secret ⇒ 401; tampered body ⇒ rejected; stale timestamp (replay) ⇒ rejected; correct ⇒ accepted; duplicate `event_id` ⇒ idempotent; malformed JSON ⇒ 400; no CORS headers; empty/default secret impossible (`computeTeamSyncSignature` throws; no literal in source). Webhook flood limit is per-IP and per-instance only — acceptable because every request is HMAC-gated; **REQUIRES MANUAL ACTION:** confirm `TEAMSYNC_WEBHOOK_SECRET` is set in Vercel.

## 12. Realtime findings

Subscriptions found: AuthContext (student progress), growth-mentor card, mentor pages (+live submissions), campus pages, feedback status/comments. **VERIFIED (unit, 14 checks):** each subscribe creates a channel and each unsubscribe removes it, across repeated mount/unmount (simulating login → logout → login another user); student-progress realtime has exactly **one** owner (duplicate in `AppLayout` removed). Feedback realtime tables were missing from the publication (migration adds them). After migration, Realtime enforces the role-scoped SELECT policies, so campus/mentor unfiltered channels stop leaking other users' rows. **NOT VERIFIED:** real-browser tab switching, reconnect after network loss, two simultaneous tabs — **REQUIRES MANUAL ACTION**.

## 13. Performance findings

Unchanged from the previous report plus: sandbox adds ≈80 ms process-spawn overhead per execution (measured, production-shaped artifact); auth-token cache removes two Supabase round-trips from warm requests; analytics RPC replaces whole-table transfers for the overview. API latency / DB latency / React render counts remain **NOT MEASURED**.

## 14. Data-integrity findings — duplicate submissions (Phase 11)

- **Cause (VERIFIED):** two writers for one click — the server (`/api/submit`, id `sub_<rand>_<ts>`) **and** the browser (`saveSuccessToCloud/saveAttemptToCloud`, `crypto.randomUUID()`). Observed live at 09:44:22 (server) + 09:44:28 (browser), same student, same Java solve.
- **Scale:** 418 submissions: 383 UUID-format, 35 server-format. **125** same-user/problem/language pairs within 60 s across **63** users; **19** are exact server+browser pairs (gap 0.5–8 s) = the dual write. The rest are two server-format rows 30–52 s apart (genuine re-submissions) or failed-pairs.
- **Both rows are legitimate attempts of one click; XP/progress was NOT duplicated:** 0 duplicate `(user,problem,language)` progress rows; XP is stored once per progress row.
- **Fix (code):** browser writes removed; server uses idempotency (per-user key, shared in-flight promise), first-solve insert-or-update with unique-violation handling, and the browser holds a synchronous ref lock. Historical rows **not deleted**.
- **Related gap:** 7 passed `(user, problem, language)` combinations have **no** `UserProgress` row (old unique index; 3 `(user,problem)` pairs solved in 2+ languages). Backfilling would add XP — **NOT DONE**; backfill SQL available on request.

## 15. Production test-data findings (Phase 10) — nothing deleted

Full per-row table: **`docs/production-test-data-forensics.csv`** (id, reference, created_at, role, e-mail *domain only*, name pattern, user-id status, title, TeamSync status, child rows, source, provenance, classification, safe-to-remove). Headline numbers *at the time of the final forensic run*:

| Class | Rows | Evidence | Safe to remove? |
|---|---|---|---|
| **SYNTHETIC_CONFIRMED** | 521 | reserved `@kalvilearn.test`, name "Automated Test Student/Mentor", user_id = synthetic roster id (`00000000-…`) or null, scripted titles ("Duplicate click test", "Impersonation Attempt", …), `ts_mock_/ts_idem_/ts_tick_` ids, UA "unknown", clustered on 09-22, 09-23, 10-06 | **YES — after your approval.** No comments/audit/webhook rows reference them. |
| LIKELY_SYNTHETIC_REVIEW | 33 | `.test` domain but name does not match the roster | Review |
| **REAL_OR_UNKNOWN** | 46 | non-`.test` domains (gmail / kalvium.community / kalvium.com); every `user_id` resolves to a real `users` row; includes one real mentor's **31 rows on 2026-09-10 with `ts_idem_*` ids** (looks like a test run executed with a real identity), and "Production E2E Connectivity Verification", "hdskjohfa" | **NO** — needs human review; do not bulk-delete |

Other tables: `users` has 2 synthetic accounts (`…0001`, `…0002`); 0 synthetic Submission/UserProgress rows; `teamsync_webhook_events` 142 rows (`evt_ticket_*`, `evt_status_*` … 09-24/25, 1–2 mapped) look like webhook-test output but **provenance is unproven** — not classified as removable. **My own test runs added rows to these tables** (`feedback_reports` grew 479 → 600 across the two passes; each full `test:all` leaves ≈40 rows); they are in the SYNTHETIC class. **Do not run `DELETE … WHERE email LIKE '%test'`** without the CSV review.

## 16. Files changed (this pass)

New: `src/server/{sandboxHost,sandboxWorker,codeRunnerCore,rateLimit,attachmentSecurity}.ts`, `src/lib/{supabasePaging,cacheRegistry}.ts`, `scripts/{rls-adversarial,rls-rollback-test}.cjs`, `docs/baseline-db-snapshot-2026-10-06.json`, `docs/production-test-data-forensics.csv`, `prisma/migrations/20261006_security_hardening_rls/rollback.sql`. Modified: `executeService.ts` (now delegates to the sandbox host), `feedbackAuth.ts` (authUid lookup, tolerant of pre-migration schema), `apiHandler/submitHandler/feedbackHandler/teamSyncHandler.ts` (global limiter, magic-byte uploads), `migration.sql` (authUid mapping, rate limiter), `mentorService/campusManagerService/progress/authService/AuthContext`, `package.json`, `vercel.json` (includeFiles for the child bundle), tests. Removed: `scripts/rls-dry-run.cjs` (superseded). The pre-existing uncommitted `KalviLearn_10_Belt_Programming_Question_Bank_500.md` change was left alone.

## 17. Database migrations

| Item | Value |
|---|---|
| `migration.sql` SHA-256 | `6c9c2258f4817ad5ee511c6bcb652c5c2a8b2b46245fd242c91a1703b8b265bf` |
| `rollback.sql` SHA-256 | `7808a2823858eddf409b3773ba01eaccc22ba26caee02fa7986bbe1e53966a44` |
| Applied to production? | **NO** |
| Idempotent / single transaction | Yes / Yes |

## 18. Tests executed (clean, strictly sequential final run — nothing else touching the DB)

| Command | Result |
|---|---|
| `npx tsc -b` | **PASS** (exit 0) |
| `npm test` (evaluation pipeline) | **PASS** 17/17 |
| `npm run test:auth` | **PASS** 12/12 |
| `npm run test:streak` | **PASS** 33/33 |
| `npm run test:feedback` | **PASS** 34/34 |
| `npm run test:backend-feedback` | **PASS** 58/58 |
| `npm run test:teamsync` | **PASS** 53/53 |
| `npm run test:teamsync-webhook` | **PASS** 63/63 |
| `npm run test:teamsync-sender` | **PASS** 40/40 |
| `npm run test:multilang` | **PASS** 33/33 |
| `npm run test:security` (new) | **PASS** 88/88 |
| `npm run test:practice-import` / `test:practice-e2e` | **PASS** 43/43 · 7/7 |
| **`npm run test:all`** (chains every suite above) | **PASS, exit 0** |
| **`npm run build`** (tsc, vite, sandbox child bundle, 5 API bundles, `check:bundle`) | **PASS, exit 0** |

Each listed `npm run test:*` command was executed as part of `test:all` (and several individually earlier in the session); I did not run them a second time standalone because every full run writes ≈40 synthetic feedback rows into the live database.

**A failed run I must report:** an earlier `test:all` attempt exited 1 (`test:auth`: 9/12) because it ran *concurrently* with a post-migration dry run that was holding table locks, so the DB lookups timed out. It passed 12/12 when nothing else touched the database. That failure was my doing, not a product defect — but it is also direct evidence of the lock impact described in §1.3.

**Frontend bundle:** unchanged at 2,699,861 B raw JS (previous pass). Production build output includes `api/_sandbox-worker.mjs`.

## 19. Security tests

| Suite | Result |
|---|---|
| `scripts/rls-adversarial.cjs pre` (live policies) | **39 attacks → 33 SUCCEEDED**, 6 blocked (the 6 are blocked by the unrelated mentor-assignment trigger/FK, not by policy) |
| `scripts/rls-adversarial.cjs post` (migration in rolled-back txn) | **43 attacks → 0 succeeded; 18 positive controls all work** (61/61) |
| `scripts/rls-rollback-test.cjs` | **migration → rollback.sql ⇒ policies, grants, RLS flags, indexes, publication, bucket config identical to baseline** |
| `scripts/test-security-hardening.ts` | 88 checks (sandbox escapes & memory bombs, auth, CORS, rate limit, webhook fail-closed, attachments incl. magic bytes, idempotency under concurrency, cache isolation, realtime cleanup) |
| `rls-adversarial` identity tests | forged e-mail claim, re-pointing own `authUid`, inserting a user with another's `authUid` — all blocked |

## 20. Post-migration verification (Phase 20)

**NOT DONE — the migration has not been applied.** What exists instead is the rolled-back dry run (§19). After you approve and apply it, run: `node scripts/rls-adversarial.cjs post` is *not* the right check on a migrated DB — instead run `node scripts/rls-adversarial.cjs pre` (it attacks whatever policies are live) and expect **0 succeeded**; then log in as a student, mentor and campus manager and exercise: dashboard, practice+submit, mentor roster + add-by-email, campus dashboard/analytics, feedback submit + status realtime.

## 21. Remaining risks

| Risk | Status |
|---|---|
| Live DB open until the migration is applied | **NOT FIXED — REQUIRES YOUR APPROVAL** |
| Sandbox shares host/network/user; no egress control; off-heap `ArrayBuffer` uncapped; no CPU quota beyond timeouts | **Residual. Recommendation:** move execution to a dedicated runner (container/Firecracker microVM, no egress, cgroup CPU+memory limits — e.g. Judge0/Piston or a Fargate/Cloud Run job) **before** opening the platform beyond the current closed cohort or raising volume. Not implemented: that is infrastructure, not a code patch. |
| Permission model / `fork` / `includeFiles` behaviour on the Vercel runtime | **NOT VERIFIED — REQUIRES MANUAL ACTION** (deploy to a preview and run one submission). Emergency switch: `SANDBOX_ALLOW_INPROCESS=1` (weaker) |
| Admin/SUPERADMIN policy paths | **NOT VERIFIED** (no such accounts) |
| Campus isolation | **NOT FIXED** — no campus model exists |
| Analytics beyond the overview are paginated, not aggregated (O(n) transfer) | Open |
| Webhook limiter per-instance | Accepted (HMAC-gated) |
| 7-row progress backfill; test-data cleanup | Awaiting your decisions |
| Real-browser: multi-tab, reconnect, double-click, account switching | **REQUIRES MANUAL TESTING** |
| Supabase backup/PITR | **REQUIRES MANUAL ACTION** — confirm before applying |
| Dry runs against live DB take locks | Use a branch DB next time |

## 22. Rollback procedure

1. Prefer fixing forward. If the app is broken after applying: `psql "$DIRECT_URL" -v ON_ERROR_STOP=1 -f prisma/migrations/20261006_security_hardening_rls/rollback.sql` (single transaction; **re-opens the holes** — reapply the migration as soon as possible).
2. Rollback restores policies, grants, RLS flags, indexes, publication and bucket config exactly (diff-verified). It drops `users."authUid"` (recomputable). It restores the old unique `(userId, problemId)` index only if no multi-language progress exists (otherwise skipped with a NOTICE).
3. No data rollback is needed: the migration changes no existing row.
4. Code rollback: redeploy the previous Vercel build; the previous code works with either DB state **except** that the old client's direct progress writes fail once writes are revoked (harmless: the old server also writes).

## 23. Production deployment procedure

**Gate (Phase 19):**

```
READY FOR PRODUCTION RLS MIGRATION
  migration.sql  sha256 6c9c2258f4817ad5ee511c6bcb652c5c2a8b2b46245fd242c91a1703b8b265bf
  rollback.sql   sha256 7808a2823858eddf409b3773ba01eaccc22ba26caee02fa7986bbe1e53966a44
  tables affected: Belt, LearningUnit, Module, Problem, TestCase, Submission, UserProgress, users, students, mentors,
                   mentor_students, feedback_reports, feedback_comments, feedback_audit_logs, teamsync_webhook_events,
                   teamsync_webhook_deliveries (+ new api_rate_limits; storage.objects policy; storage.buckets row)
  policies: 24 existing dropped, 22 created   functions: 13 created   triggers: 3 created   column: users."authUid"
  expected app behaviour: students see only their data; mentors only assigned students (+ all STUDENT user rows for
    add-by-email); campus managers all rosters/analytics; no browser writes to progress/submissions/feedback;
    anonymous access = none; feedback realtime starts working; rate limits become global.
  rollback: §22 (verified)
  APPROVAL REQUIRED — not applied.
```

Order (do not reorder): (1) confirm Supabase backup/PITR; (2) confirm in Vercel: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TEAMSYNC_WEBHOOK_SECRET`; `ALLOW_TEST_AUTH_TOKENS` unset; (3) deploy this code to a **preview**, run one submission (verifies the sandbox child + permission model on Vercel), then promote; (4) take approval → apply migration off-peak (locks last seconds, not minutes); (5) run the live adversarial script (expect 0 succeeded) and the manual role smoke tests; (6) add `SUPABASE_SERVICE_ROLE_KEY` to local `.env` before re-running DB-backed tests; (7) review the forensics CSV and decide on cleanup.
