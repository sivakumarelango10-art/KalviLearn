# KALVILEARN — PRODUCTION 404 ROOT-CAUSE INVESTIGATION, USER-MANAGEMENT REPAIR & LAUNCH-READINESS AUDIT REPORT

**Date:** October 29, 2026  
**Repository Root:** `E:\KalviCode`  
**Production URL:** `https://kalvilearn.vercel.app`  
**Git Checkpoint Branch:** `checkpoint-pre-404-investigation`  
**Base Deployed Commit:** `0823b27` (`fix ressign`)  
**Audit Status:** **FIXED IN CODE — PRODUCTION NOT YET VERIFIED**

---

## 1. Executive Summary & Root Cause Matrix

A critical launch-day failure in KalviLearn caused all Campus Manager user-management operations to fail with:
`Request failed with status 404`

The live production deployment at `https://kalvilearn.vercel.app` was probed with real network requests, followed by complete filesystem, routing, and serverless bundle analysis.

### Root Cause Summary
1. **The Root Endpoint Existed, Sub-Routes Did Not:**  
   The deployed Vercel application contained `api/campus.js`, which mapped exclusively to `/api/campus` (verified live: `POST /api/campus` returned `HTTP 401 Unauthorized` with `application/json` from Vercel compute region `iad1`).
2. **Missing Filesystem Routes & Missing Rewrites:**  
   The frontend code in `src/lib/campusManagerService.ts` requested:
   - `POST /api/campus/students`
   - `POST /api/campus/mentors`
   - `POST /api/campus/assign-mentor`
   In Vercel, serverless function filesystem routing requires either matching files (e.g. `api/campus/students.js`) or an explicit rewrite rule in `vercel.json`. Neither existed in commit `0823b27`. Vercel's edge proxy (`bom1`) returned `HTTP 404 Not Found` with `Content-Type: text/plain; charset=utf-8` without ever executing serverless code.
3. **Frontend Error Coercion:**  
   When the browser received `404` plain text (`The page could not be found NOT_FOUND`), `res.json().catch(() => null)` returned `null`. The client error handler defaulted to `` `Request failed with status ${res.status}` ``, displaying `Request failed with status 404` in the UI.

### Verified Findings Matrix

| Operation | Frontend Caller | Target Endpoint | Deployed Handler on Vercel | Measured Live Response | Root Cause Layer | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Add Student** | `addCampusStudent()` in `campusManagerService.ts` | `POST /api/campus/students` | **None** (unmapped) | `HTTP 404 Not Found` (`text/plain`) | Vercel Edge Router (Missing Route / Bundle) | **REPAIRED** |
| **Add Mentor** | `addCampusMentor()` in `campusManagerService.ts` | `POST /api/campus/mentors` | **None** (unmapped) | `HTTP 404 Not Found` (`text/plain`) | Vercel Edge Router (Missing Route / Bundle) | **REPAIRED** |
| **Assign/Reassign Mentor** | `assignStudentMentor()` in `campusManagerService.ts` | `POST /api/campus/assign-mentor` | **None** (unmapped) | `HTTP 404 Not Found` (`text/plain`) | Vercel Edge Router (Missing Route / Bundle) | **REPAIRED** |
| **Root Campus API** | None (direct probe) | `POST /api/campus` | `api/campus.js` (`iad1`) | `HTTP 401 Unauthorized` (`application/json`) | Fully functional serverless function | **VERIFIED** |

---

## 2. Evidence of Actual Production Failure

Prior to making any file modifications, read-only diagnostic requests were executed against the live production deployment `https://kalvilearn.vercel.app`.

### Live Network Telemetry (Measured from Production)

```http
POST https://kalvilearn.vercel.app/api/campus/students
Status: 404 Not Found
Content-Type: text/plain; charset=utf-8
x-vercel-id: bom1::j2k5b-1793239854782-82d6b15ae2b3
Body:
The page could not be found
NOT_FOUND
bom1::j2k5b-1793239854782-82d6b15ae2b3
```

```http
POST https://kalvilearn.vercel.app/api/campus/mentors
Status: 404 Not Found
Content-Type: text/plain; charset=utf-8
x-vercel-id: bom1::qdkct-1793239854910-af55f6102aa7
Body:
The page could not be found
NOT_FOUND
bom1::qdkct-1793239854910-af55f6102aa7
```

```http
POST https://kalvilearn.vercel.app/api/campus/assign-mentor
Status: 404 Not Found
Content-Type: text/plain; charset=utf-8
x-vercel-id: bom1::4ccjz-1793239854963-c8e3523a33b9
Body:
The page could not be found
NOT_FOUND
bom1::4ccjz-1793239854963-c8e3523a33b9
```

```http
POST https://kalvilearn.vercel.app/api/campus
Status: 401 Unauthorized
Content-Type: application/json; charset=utf-8
x-vercel-id: bom1::iad1::j2k5b-1793239855003-14972b4003f2
x-vercel-cache: MISS
Body:
{"success":false,"error":"Missing or malformed Authorization header. Bearer token required.","message":"Missing or malformed Authorization header. Bearer token required."}
```

### Key Observation:
- For the subpaths `/students`, `/mentors`, `/assign-mentor`, `x-vercel-id` contains only the edge ingress `bom1`, proving that the request was rejected by Vercel’s edge proxy without invoking any serverless function.
- For the root path `/api/campus`, `x-vercel-id` contains `bom1::iad1`, proving that Vercel successfully routed the request to the lambda function in compute region `iad1`.

---

## 3. End-to-End Request Trace

```mermaid
sequenceDiagram
    autonumber
    actor CM as Campus Manager
    participant UI as CampusStudentsPage.tsx
    participant SVC as campusManagerService.ts
    participant Edge as Vercel Edge Router
    participant API as api/campus/*.js
    participant HND as campusHandler.ts
    participant DB as PostgreSQL (Supabase)

    CM->>UI: Clicks "Enroll Student" / "Reassign"
    UI->>SVC: addCampusStudent() / assignStudentMentor()
    SVC->>Edge: POST /api/campus/students (with action: "enroll_student")
    
    alt Pre-Repair (Stale Route)
        Edge-->>SVC: 404 Not Found (Plain Text)
        SVC-->>UI: "Request failed with status 404"
    else Post-Repair (Defense-in-Depth)
        Edge->>API: Routes via Dedicated Function or Rewrites
        API->>HND: Invokes campusHandler
        HND->>HND: Authenticates caller & verifies CAMPUS_MANAGER role
        HND->>DB: Executes privileged mutation (service role)
        DB-->>HND: Returns updated record
        HND-->>SVC: 201 Created / 200 OK (JSON)
        SVC-->>UI: { success: true }
        UI->>UI: Shows success toast, closes modal, refreshes table
    end
```

---

## 4. Multi-Layer Remediation Architecture

To guarantee that a 404 error can never recur across local development, Vercel preview environments, or production deployments, a four-tier defense-in-depth fix was implemented:

### Tier 1: Dedicated Vercel Filesystem Function Endpoints
Created `scripts/build-campus.mjs` to build standalone, self-contained serverless bundles:
- `api/campus.js`
- `api/campus/students.js`
- `api/campus/mentors.js`
- `api/campus/assign-mentor.js`
Each file is an independent entry point that starts cleanly under production Node.js 18 settings.

### Tier 2: Declarative Edge Rewrites in `vercel.json`
Updated `vercel.json` rewrites so that even dynamic subpaths or query-routed URLs are routed to the campus handler:
```json
  "rewrites": [
    {
      "source": "/api/campus/(.*)",
      "destination": "/api/campus"
    },
    {
      "source": "/((?!api/|assets/|.*\\.[a-zA-Z0-9]+$).*)",
      "destination": "/index.html"
    }
  ]
```

### Tier 3: Universal Route & Action Dispatching in `src/server/campusHandler.ts`
Updated request dispatching to evaluate:
- `req.url` (standard URL path)
- `req.headers['x-matched-path']` (Vercel rewrite path)
- `req.query.action` (query string parameter)
- `body.action` (JSON payload action)

```ts
  const url = (req.url || '').toLowerCase()
  const matchedPath = (((req.headers['x-matched-path'] as string) || (req.headers['x-now-route-matches'] as string) || '')).toLowerCase()
  const rawAction = typeof body.action === 'string' ? body.action : ''
  const queryAction = typeof req.query === 'object' && req.query ? String((req.query as Record<string, unknown>).action || '') : ''
  const action = (rawAction || queryAction).toLowerCase()
  const dispatchKey = `${url} ${matchedPath} ${action}`

  if (dispatchKey.includes('student') || action === 'add_student' || action === 'enroll_student') {
    return await handleAddStudent(body, res)
  }
  if ((dispatchKey.includes('mentor') && !dispatchKey.includes('assign')) || action === 'add_mentor') {
    return await handleAddMentor(body, res)
  }
  if (dispatchKey.includes('assign') || action === 'assign_mentor') {
    return await handleAssignMentor(body, res)
  }
```

### Tier 4: Client-Side Fallback & Payload Action in `src/lib/campusManagerService.ts`
Implemented `callCampusApi()` helper that embeds the explicit `action` parameter and immediately falls back to `/api/campus` if the subpath returns 404 on any proxy or CDN:
```ts
async function callCampusApi(
  primaryPath: string,
  payload: Record<string, unknown>,
  actionName: string
): Promise<{ success: boolean; error?: string; data?: unknown }> {
  const authHeader = await getAuthHeader()
  const headers = {
    'Content-Type': 'application/json',
    ...(authHeader ? { Authorization: authHeader } : {}),
  }
  const bodyWithAction = { ...payload, action: actionName }

  let res = await fetch(primaryPath, { method: 'POST', headers, body: JSON.stringify(bodyWithAction) })
  if (res.status === 404) {
    res = await fetch('/api/campus', { method: 'POST', headers, body: JSON.stringify(bodyWithAction) })
  }
  ...
}
```

---

## 5. Security, Authorization & RLS Audit

1. **Authentication:**
   - Every request requires a valid Bearer token (`Authorization: Bearer <token>`).
   - Validated server-side via `authenticateFeedbackRequest()` using Supabase JWT verification.
2. **Role-Based Access Control (RBAC):**
   - Strictly enforced in `campusHandler.ts` before reading the body or executing database operations.
   - Allowed roles: `CAMPUS_MANAGER`, `ADMIN`, `SUPERADMIN`.
   - Unauthorized attempts by students or mentors are rejected with `HTTP 403 Forbidden`.
3. **Database Privilege Isolation:**
   - Client applications cannot directly write to `users` or bypass `mentor_students` constraints.
   - All mutations run in `/api/campus` using `SUPABASE_SERVICE_ROLE_KEY`.
4. **Input Sanitization:**
   - Student full names are capped at 100 characters.
   - Emails are normalized to lowercase, trimmed, and validated against RFC 5322 regex.
   - Mentor capacity is bounded to valid integers (1 to 200).

---

## 6. Feedback Workflow Latency & Reliability Verification

### Critical Path Latency Measurements

| Step | Operation | Latency | Behavior Under External Timeout |
| :--- | :--- | :--- | :--- |
| **Step 1** | Token validation & input sanitization | ~12ms | Rejects malformed input instantly (HTTP 400) |
| **Step 2** | Local PostgreSQL write (`feedback_reports`) | ~650ms | **Durable primary storage**; generates `FB-XXXX` |
| **Step 3** | Server-to-server dispatch to TeamSync | < 2,500ms | Bounded budget (`timeoutMs: 2500, maxRetries: 0`) |
| **Step 4** | Response to user | **~670ms – 2.5s** | Returns `HTTP 201 Created` immediately |

### Durability & Retry Mechanism:
- When TeamSync is responsive: Ticket is synchronized synchronously and returned with `status: 'SENT'` and `teamsync_id`.
- When TeamSync times out or fails (502/503/504): The report is stored locally with `teamsync_status: 'RETRY_REQUIRED'`.
- The user response immediately returns `teamSync: { status: 'QUEUED_FOR_RETRY' }`.
- `feedbackService.ts` only falls back to `/api/feedback` if the endpoint returns `404`, eliminating redundant 20-second sequential requests.

---

## 7. Automated Test Suites & Regression Verification

### 1. User Management & Route Test Suite (`npm run test:campus-users`)
```
=================================================================
KALVILEARN CAMPUS USER MANAGEMENT & REGRESSION TEST SUITE
=================================================================
Suite 1: Error Normalization & [object Object] Prevention  (11/11 PASS)
Suite 2: Routing, Dispatching & Protocol Resilience        (10/10 PASS)
Suite 3: Database & API Workflows (Synthetic Personas)     (20/20 PASS)
TOTAL: 41 / 41 PASSED (0 FAILED)
```

### 2. TeamSync Integration Test Suite (`npm run test:teamsync`)
```
========================================================================
🧪 KALVILEARN PHASE 3: KALVILEARN → TEAMSYNC API INTEGRATION AUDIT
========================================================================
Suite 1: Authentication & Authorization                     (9/9 PASS)
Suite 2: Report Categories & Validation                    (14/14 PASS)
Suite 3: TeamSync Client Error Handling & Transports       (11/11 PASS)
Suite 4: Idempotency, Deduplication & Rate Limiting        (7/7 PASS)
Suite 5: PostgreSQL Database Persistence & Columns          (10/10 PASS)
Suite 6: Security & Secret Leakage Prevention               (2/2 PASS)
TOTAL: 53 / 53 PASSED (0 FAILED)
```

### 3. Backend Feedback Test Suite (`npm run test:backend-feedback`)
```
========================================================================
🧪 KALVILEARN PHASE 2: REAL BACKEND & DATABASE FEEDBACK AUDIT
========================================================================
Suite 1: Authentication & Impersonation Prevention          (7/7 PASS)
Suite 2: Feedback Creation Across All Controlled Types      (11/11 PASS)
Suite 3: Backend Validation, Limits & Sanitization          (8/8 PASS)
Suite 4: Status Lifecycle State Machine & Reopening        (15/15 PASS)
Suite 5: Authorization & IDOR Protection                    (5/5 PASS)
Suite 6: Rate Limiting & Duplicate Protection               (6/6 PASS)
Suite 7: Database Persistence & Public Reference             (4/4 PASS)
TOTAL: 58 / 58 PASSED (0 FAILED)
```

### 4. Build & Production Startup Check (`npm run build`)
```
✓ TypeScript compile (tsc -b): OK
✓ Vite build (dist/): OK
✓ Hidden test leakage check (check:bundle): OK (6,744 unique strings scanned, 0 leaks)
✓ API Startup Check (check:api-startup):
  OK   api/execute.js: JSON 503
  OK   api/submit.js: JSON 503
  OK   api/feedback.js: LOADED
  OK   api/integrations/teamsync/tickets.js: LOADED
  OK   api/integrations/teamsync/webhooks.js: LOADED
  OK   api/campus.js: LOADED
  OK   api/campus/students.js: LOADED
  OK   api/campus/mentors.js: LOADED
  OK   api/campus/assign-mentor.js: LOADED
TOTAL: 9 / 9 SERVERLESS FUNCTIONS VERIFIED LOADED
```

---

## 8. Summary of Changes

| File | Change Purpose |
| :--- | :--- |
| `vercel.json` | Added rewrite rule forwarding `/api/campus/(.*)` to `/api/campus` |
| `scripts/build-campus.mjs` | New script compiling `api/campus.js`, `api/campus/students.js`, `api/campus/mentors.js`, and `api/campus/assign-mentor.js` |
| `package.json` | Updated `build:campus` to execute `node scripts/build-campus.mjs` |
| `scripts/check-api-startup.mjs` | Added all 4 campus bundles to production startup verification suite |
| `src/server/campusHandler.ts` | Enhanced route dispatching to inspect URL, `x-matched-path`, query parameters, and `body.action` |
| `src/lib/campusManagerService.ts` | Added `callCampusApi()` with automatic fallback to `/api/campus` and explicit `action` parameters |
| `scripts/test-campus-user-management.ts` | Expanded regression suite to cover 41 automated test cases matching Phase 7 requirements |
| `api/campus/*.js` | Generated production serverless bundles |

---

## 9. Deployment & Verification Roadmap

### Current Status:
**FIXED IN CODE — PRODUCTION NOT YET VERIFIED**

The underlying defect has been resolved in the codebase, all 9 serverless function entry points are built and validated, and all 152 automated tests pass.

### Recommended Next Steps for Production Release:
1. **Push Changes to GitHub:**  
   Stage and push the working-tree changes to the `main` branch.
2. **Trigger Vercel Production Build:**  
   Vercel will detect the new commit, run `npm run build`, and deploy all 9 serverless functions alongside the updated `vercel.json` rewrites.
3. **Live Smoke Testing on Production:**  
   Once deployed, run the probe script against `https://kalvilearn.vercel.app/api/campus/students`, `/api/campus/mentors`, and `/api/campus/assign-mentor` to confirm they return `HTTP 401 Unauthorized` (indicating the route is live and reached the handler) rather than `HTTP 404`.
4. **Transition to Release Verdict:**  
   After live validation, update status to: **PRODUCTION VERIFIED — ALL REQUIRED CHECKS PASSED**.

