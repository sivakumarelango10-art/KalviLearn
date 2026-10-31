# Backend, security, and integration audit notes

Audit date: 2026-10-20 (Asia/Calcutta). These notes assess the checked-out source. They do not certify the deployed configuration or database policy state.

## Scope and method

Reviewed `src/server/` authentication, execution and submission handlers, judge selection and native/local/Judge0 engines, child-process isolation, feedback handlers and lifecycle, attachment handling, HTTP/rate-limit utilities, inbound/outbound TeamSync integration, Prisma models, and the security migration. Traced mentor assignment authorization into `src/lib/mentorService.ts`.

Executable checks used synthetic identities, in-memory Supabase replacements, a TeamSync mock transport, and a `fetch` replacement that throws `AUDIT_NETWORK_DISABLED`. No live service calls or database writes were performed. Three small language examples ran in the compiled child-process worker. No hostile memory, fork, or infinite-loop payloads were executed.

Priorities below use P1 for major security/correctness issues and P2 for operational or narrower correctness issues. “Confirmed source” means the behavior is present in the repository; applicability to a live deployment depends on whether that code/policy is deployed.

## Findings

### B01 — P1: Mentor assignment authorization can be created by the mentor who benefits from it

Evidence:

- `prisma/migrations/20261006_security_hardening_rls/migration.sql:344-350`: authenticated mentors may insert an ACTIVE `mentor_students` row whenever `mentor_id` is their own; updates may change `student_id` while keeping their own `mentor_id`.
- `prisma/schema.prisma:183-200`: uniqueness is only `(mentorId, studentId)`, not one active mentor per student.
- Migration lines `132-142`, `353-361`: that same relation grants access to the student's submissions and progress.
- `src/server/feedbackHandler.ts:57-69,310-316`: the relation also grants authority to change the student's feedback lifecycle.
- `src/lib/mentorService.ts:888-918,960-977`: “already assigned to another mentor” and capacity checks exist only in browser code. Other mentors' relation rows are invisible under the SELECT policy at migration lines `339-343`, so even the normal client lookup may not see another mentor's assignment.

Impact: an authenticated mentor can directly create a relationship to a student already assigned to a different mentor and obtain that student's code/progress and ticket-management authority. This breaks the intended cohort boundary. The legacy `users.mentorId` trigger does not protect the authoritative `mentor_students` write.

Remediation: use a server-side or privileged database assignment operation that atomically validates the student's eligibility, current assignment, and mentor capacity. Revoke direct relation mutation or enforce equivalent constraints with policies/triggers. Add a partial unique index on `student_id WHERE status='ACTIVE'`, and prohibit non-admin changes to relation identity columns.

Validation: confirmed by source/policy tracing; no mutation of a real database was attempted. Additional live constraints could reduce exposure and must be compared with the migration.

### B02 — P1: Student and mentor profile columns lack authorization guards

Evidence:

- Migration `177`: authenticated role receives table-wide INSERT/UPDATE permissions.
- Migration `312-325`: any MENTOR may insert or update any `students` row, without requiring a cohort relationship and without restricting `id`, `user_id`, `student_code`, or `status`.
- Migration `334-336`: a mentor may update all columns of their own mentor profile, including capacity and status.
- The column guard at migration `243-304` applies only to `users`.

Impact: a mentor can alter another cohort's student identity/profile mapping or status. Since authorization helpers join `students.user_id`, changing the mapping also changes the meaning of existing mentor relationships. A mentor can raise their own `max_students` and bypass the browser's capacity check. A student can edit their own profile status/code even though the user-table guard says self-service is display-name-only.

Remediation: make profile identity columns immutable to ordinary clients, scope profile edits to the permitted actor/cohort, and explicitly authorize administrative fields. Prefer server-side roster operations with transactions.

Validation: confirmed source/policy issue; effective production exposure depends on applied policies/triggers.

### B03 — P1: Production silently falls back to incorrect Python, Java, and C++ semantics

Evidence:

- `src/server/judge/engines.ts:241-245`: absent `JUDGE0_URL`, selection returns the local engine when native execution is unavailable.
- `src/server/judge/native.ts:75-78`: native execution is disabled by default in production.
- Local language runners transpile these languages to JavaScript.

Offline production-configuration proof, with `NODE_ENV=production`, `KALVI_NATIVE_JUDGE=0`, `JUDGE0_URL` unset, and `KALVI_SANDBOX_ENTRY` pointing to the built worker:

| Language | Submitted expression/program | Required output | Actual local-engine output |
| --- | --- | --- | --- |
| C++ | `cout << 5 / 2 << endl;` inside `main` | `2` | `2.5` |
| Java | `System.out.println(5 / 2);` inside `main` | `2` | `2.5` |
| Python | `print(-3 // 2)` | `-2` | `-1` |

All three returned `kind: "ran"`, per-case `kind: "ok"`, and `engine: "local"`. A correct learner solution is therefore marked wrong, or an incorrect solution may pass against JavaScript behavior.

Remediation: require a configured real, isolated judge for these languages in production and fail closed with a clear availability error when absent. Add deployment validation and conformance examples for integer division, modulo, overflow, formatting, collections, and standard-library support.

Validation: reproduced in local child processes; remote deployment environment was not inspected.

### B04 — P1: A live-style TeamSync API credential is committed as a development fallback

Evidence: `src/server/teamSyncService.ts:133-135` contains a hardcoded token with a live-style prefix and defaults to a remote TeamSync host. Lines `160-161` send it in both authorization and API-key headers.

Impact: if the committed token remains valid, anyone with repository access can use the integration credential. Local development/test code can send real external tickets when configuration or mock setup is omitted. The token is intentionally not reproduced here.

Remediation: revoke/rotate the exposed token if valid, remove credential and live-endpoint fallbacks, require explicit integration configuration, and default tests to blocked network/mock transports.

Validation: the literal and its call path are confirmed; token validity was deliberately not tested. Treat active compromise as unverified.

### B05 — P1: Feedback idempotency caches share caller-provided keys across users

Evidence:

- `src/server/feedbackHandler.ts:425-433,646-650`
- `src/server/teamSyncHandler.ts:154-165,432-436`

The cache key is the raw `X-Idempotency-Key` (or body key) whenever supplied, without the authenticated user ID. Both handlers return the cached response before inserting the current user's report.

Offline proof using two different authenticated synthetic students and the same key:

```json
{
  "firstStatus": 201,
  "secondStatus": 200,
  "firstId": "report-1",
  "secondId": "report-1",
  "databaseInsertCount": 1
}
```

Impact: the second user receives another user's report/ticket metadata and a success response although their own report was never saved. Knowledge or collision of another user's key is required for a targeted case. The cache is also process-local and populated only after completion, so concurrent duplicates or requests routed to different instances are not reliably deduplicated.

Remediation: use an authenticated-user-scoped, length-bounded key and request hash, persist it with a uniqueness constraint, and reserve it before starting work. Return conflict when one key is reused for a different request.

Validation: cross-user behavior reproduced against the actual feedback handler with all storage/network calls replaced in memory. The identical TeamSync handler pattern was confirmed statically.

### B06 — P1: Failed and unmapped webhook events are permanently treated as successful duplicates

Evidence: `src/server/teamSyncWebhookService.ts:248-272` selects `status` but ignores its value. Any existing event produces HTTP 200 `DUPLICATE_EVENT_IGNORED`. Failed events are written at `409-419` and `604-615`; unmapped events at `329-338`.

Offline proof:

```json
{"statusCode":200,"code":"DUPLICATE_EVENT_IGNORED","writes":0}
```

The event already stored in the mock database had `status: "FAILED"`.

Impact: a transient database error, out-of-order status transition, or temporarily missing report mapping cannot be repaired by retrying the same event ID. The receiver explicitly tells the sender the retry succeeded without processing it.

Remediation: distinguish PROCESSED from retryable/failed/unmapped states; atomically claim processing, retry recoverable failures, and store an outcome only after committing the associated changes. Provide reconciliation for unmapped events.

Validation: reproduced offline using the actual processor.

### B07 — P1: Webhooks acknowledge success despite failed comment/audit/event persistence

Evidence: `src/server/teamSyncWebhookService.ts:547-580` logs and ignores a comment insertion error, ignores returned audit/event insertion errors, and returns HTTP 200 at `591-600`. The independent writes are not a transaction; the idempotency check is a preceding SELECT rather than an atomic reservation.

Offline proof with a simulated comment insert error:

```json
{
  "firstStatus": 200,
  "storedEventStatus": "PROCESSED",
  "replayCode": "DUPLICATE_EVENT_IGNORED",
  "commentInsertAttempts": 1
}
```

Impact: comments can be permanently lost while marked processed; audit trails can be incomplete; concurrent duplicate requests can both mutate state and insert logs. Report status may change even if later dependent writes fail.

Remediation: execute report/comment/audit/event writes in a database transaction, check every returned error, and use an atomic event claim/unique key before side effects. Return a retryable failure until all required writes commit.

Validation: comment loss and unrecoverable replay reproduced offline. Concurrency/other ignored-error effects confirmed by source flow.

### B08 — P2: “Queued for retry” has no durable retry consumer

Evidence:

- `src/server/teamSyncHandler.ts:387-429`: writes `RETRY_REQUIRED` or `FAILED` but reports `QUEUED_FOR_RETRY` and promises synchronization.
- `src/server/feedbackHandler.ts:617-626`: records `RETRY_REQUIRED`.
- Repository search for `RETRY_REQUIRED`, `next_retry`, and the sender functions found writers and tests, but no production worker/cron/queue consumer that selects and retries these rows.
- `src/server/teamSyncWebhookSender.ts:467-489` records `next_retry` during the current request; it does not implement recovery after process termination.

Impact: reports saved during an integration outage remain unsynchronized indefinitely after bounded in-request retries are exhausted. The UI promise overstates what the implementation does.

Remediation: use a durable outbox with a scheduled/queue worker, bounded backoff, attempt/status tracking, a dead-letter state, and reconciliation. Until implemented, return an accurate sync-failed/manual-action state.

Validation: confirmed repository implementation gap; an externally managed retry job is possible but was not evidenced or inspected.

### B09 — P2: Feedback parsers and the alternate ticket endpoint bypass shared resource controls

Evidence:

- `src/server/feedbackHandler.ts:107-131` and `src/server/teamSyncHandler.ts:100-124` concatenate streamed request data without a byte limit.
- Their 300 ms timer resolves early but leaves stream listeners active; valid slow uploads can be parsed as an empty body.
- `src/server/teamSyncHandler.ts:15-40,88-90` uses an unbounded per-instance map keyed by user + claimed IP; it does not use the distributed per-user quota present on `/api/feedback`.
- `src/server/teamSyncWebhookHandler.ts:10-33` also uses an unbounded per-IP map.
- `src/server/httpSecurity.ts:99-102` trusts an already-parsed object without checking its serialized size, so the shared byte cap is not uniformly effective across adapters.

Impact: protection and upload behavior vary by entrypoint/runtime. On a long-lived local/self-hosted server, oversized or slow requests can consume memory and legitimate larger attachments can fail. Serverless instance scaling weakens the alternate endpoint's quota. Platform request-size limits may reduce the deployed size-exhaustion impact.

Remediation: use one size-bounded body reader with an attachment-appropriate cap and explicit timeout/abort behavior, enforce limits at the adapter, and apply the same distributed per-user quota to all ticket creation paths. Bound/prune rate-limit maps.

Validation: confirmed source behavior; no oversized/flood tests were run.

## Deployment-dependent risks and narrower gaps

- **Local sandbox is not a strong hostile-code boundary.** `src/server/sandboxHost.ts:9-19,99-109` relies on a child process, V8 heap flag, optional Node permissions, and no explicit network egress isolation. It shares the host user/network. `src/server/judge/native.ts:15,75-78` permits native host execution if `KALVI_NATIVE_JUDGE=1`, and defaults to it outside production. Use container/microVM isolation, OS resource quotas, no egress, and process-tree termination for public untrusted execution. No sandbox escape was demonstrated.
- **Permission downgrade is triggered by a runtime crash heuristic.** `src/server/sandboxHost.ts:143-144,166-172` interprets a non-OOM child exit before any case reply as a boot/permission incompatibility, retries the submission without permissions, and disables permissions for future requests in that instance. Restrict fallback to a trusted startup probe; fail closed on student-run crashes. No adversarial crash payload was executed.
- **Queue bounds and cancellation are absent.** `src/server/sandboxHost.ts:39-49` limits active children to four but has no waiting-queue capacity/deadline. Work is not visibly cancelled when the client disconnects. Native concurrency is per request, not a global limit. Add admission control and request cancellation.
- **Prisma identity mapping drift.** The migration adds and relies on `users.authUid` (`migration.sql:35-36,95-101`), but `model User` at `prisma/schema.prisma:125-141` omits the field. Schema-driven `db push`/new migrations need review to avoid removing or failing to model the security-critical mapping. This is a reproducibility risk; no schema push was run.
- **Submission idempotency is per process.** `src/server/submitHandler.ts:18,355-382` correctly scopes keys to users but uses only a Map. A repeat routed to a different serverless instance can insert another Submission row. Unique `(userId,problemId,language)` progress protects stored solve XP against the first-insert race; it does not make the submission itself globally idempotent.
- **Attempts count only fully passing submissions.** `src/server/submitHandler.ts:120` returns before touching UserProgress for failed evaluations. Any consumer treating `UserProgress.attempts` as all solve attempts will undercount; concurrent repeated solves also use a read-modify-write increment.
- **Feedback attachment privacy.** Uploads are intentionally stored in a public bucket (`attachmentSecurity.ts:2`; migration `440-451`); report RLS does not protect image bytes once a URL is known. Consider private storage and expiring URLs for screenshots containing personal or operational data.
- **Storage uploads bypass app MIME inspection.** Migration `440-444` allows every authenticated user to insert into the attachments bucket, with no registered/active-user or ownership prefix check. Direct storage uploads do not pass the server's magic-byte inspection. Bucket MIME/size configuration still offers partial protection.
- **Webhook event ID is outside the HMAC when supplied in a header.** `teamSyncWebhookAuth.ts:20-27` signs timestamp + body; `teamSyncWebhookService.ts:165-170` gives an unsigned event-ID header precedence over the body. Enforce equality with the signed payload ID or include the header in the signature to preserve deduplication if a captured valid request is replayed with a changed header. This requires possession of a signed request within its validity window.

## Positive controls verified in source

- Run/Submit require server-verified bearer identities and registered active users; privileged role is read from the database rather than browser input.
- Synthetic tokens require explicit non-production opt-in; submission persistence excludes synthetic users.
- Submit checks the entire authoritative ten-case suite, uses the verified user's ID, and prevents a mismatched claimed user ID.
- Hidden input, expected output, actual output, and error fields are removed from per-case API and stream responses.
- Code inputs have size/language/slug validation; execution endpoints use pre-auth IP limits and post-auth distributed user limits with a local fallback.
- HMAC verification uses a configured secret, timestamp tolerance, and constant-time comparison; missing secret fails closed.
- Base64 attachments have decoded-size and magic-byte checks, and supplied storage URLs are restricted to the configured bucket origin.
- The RLS migration revokes anonymous table access, makes Submission/UserProgress server-write-only, and protects user role/status/email mutations. The gaps above concern other authoritative tables and deployed migration applicability.

## Reproduction environment and raw result summary

Host Node: `v24.14.0`. Source imports used `node --experimental-transform-types --input-type=module` plus an extension-resolution hook for local TypeScript modules. The first attempt without `--experimental-transform-types` stopped before any test because parameter properties require transformation; the corrected invocation passed.

```text
AUDIT_FAILED_EVENT {"statusCode":200,"code":"DUPLICATE_EVENT_IGNORED","writes":0}
AUDIT_COMMENT_LOSS {"firstStatus":200,"storedEventStatus":"PROCESSED","replayCode":"DUPLICATE_EVENT_IGNORED","commentInsertAttempts":1}
AUDIT_CROSS_USER_IDEMPOTENCY {"firstStatus":201,"secondStatus":200,"firstId":"report-1","secondId":"report-1","databaseInsertCount":1}
AUDIT_PRODUCTION_LANGUAGE cpp    engine=local expected=2  actual=2.5 kind=ok
AUDIT_PRODUCTION_LANGUAGE java   engine=local expected=2  actual=2.5 kind=ok
AUDIT_PRODUCTION_LANGUAGE python engine=local expected=-2 actual=-1 kind=ok
```

These are focused reproductions, not an exhaustive security certification. Production secrets, database contents, live credentials, external service delivery, load behavior, and adversarial sandbox containment were not tested.
