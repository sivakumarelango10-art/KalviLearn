# KalviLearn ↔ TeamSync Integration API Specification (Phase 3)

## 1. Overview

This document specifies the server-to-server integration between **KalviLearn** (source) and **TeamSync** (destination).
KalviLearn users can submit Bug Reports, Feature Suggestions, General Feedback, Issues, Improvement Suggestions, and Other reports. KalviLearn securely dispatches these reports as authoritative tickets to the TeamSync platform.

```
┌───────────────────────────────┐
│     KalviLearn Frontend       │
│  (Feedback UI / Modal Dialog) │
└───────────────┬───────────────┘
                │ HTTPS (Client Session Bearer Token)
                ▼
┌───────────────────────────────┐
│     KalviLearn Backend        │
│  (/api/integrations/teamsync) │
│  - Auth Verification          │
│  - Rate Limiting (15/10min)   │
│  - Input Sanitization (XSS)   │
│  - Deduplication Cache        │
│  - Local PostgreSQL Save      │
└───────────────┬───────────────┘
                │ Server-to-Server HTTPS
                │ (TEAMSYNC_API_KEY + Idempotency-Key)
                ▼
┌───────────────────────────────┐
│         TeamSync API          │
│    (/api/v1/tickets)          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     TeamSync PostgreSQL DB    │
│  (Tickets, Comments, Audit)   │
└───────────────────────────────┘
```

---

## 2. Security Architecture

1. **Zero Secret Exposure**: The TeamSync API Key (`TEAMSYNC_API_KEY`) and TeamSync URL (`TEAMSYNC_API_URL`) are strictly maintained within server-side environment variables. No credentials are leaked to client bundles, HTML, local storage, or network traffic visible to the browser.
2. **Server-Authoritative User Identity**: The KalviLearn client is never trusted to report the author's identity. The backend verifies the Bearer session token via Supabase Auth / PostgreSQL `users` table and snapshots the verified `user.id`, `user.email`, `user.name`, and `user.role`.
3. **Idempotency & Replay Protection**: Every request provides an `Idempotency-Key` (matching the unique `FB-XXXX` reference or custom key). Resubmissions within 60 seconds return cached results without generating duplicate tickets.
4. **Sliding-Window Rate Limiting**: Users and client IPs are throttled to 15 submissions per 10-minute sliding window.

---

## 3. Endpoints

### `POST /api/integrations/teamsync/tickets`

Creates a local feedback report in KalviLearn and dispatches it directly to the TeamSync Ticket API.

#### Headers
| Header | Required | Description |
| :--- | :--- | :--- |
| `Authorization` | Yes | Bearer session token (`Bearer <jwt>`) |
| `Content-Type` | Yes | `application/json` |
| `X-Idempotency-Key` | Optional | Client idempotency key to prevent double submissions |

#### Request Body
```json
{
  "type": "BUG",
  "title": "Problem Arena code editor does not submit on Enter",
  "description": "When pressing Ctrl+Enter in the Monaco editor, the submission event fails to trigger.",
  "priority": "HIGH",
  "route": "/practice",
  "module": "arena",
  "rating": null,
  "featureArea": null,
  "attachment": {
    "fileName": "screenshot.png",
    "fileType": "image/png",
    "fileSize": 142850,
    "dataUrl": "data:image/png;base64,..."
  },
  "deviceInfo": {
    "browser": "Chrome 122",
    "device": "desktop"
  }
}
```

#### Field Specifications
| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `type` | String | Yes | `BUG`, `FEATURE`, `FEEDBACK`, `ISSUE`, `IMPROVEMENT`, `OTHER` |
| `title` | String | Conditional | Required for `BUG` (min 3 chars). Optional for `FEEDBACK` / `OTHER`. Max 255 chars. |
| `description` | String | Yes | Min 5 characters, Max 4000 characters. Automatically sanitized. |
| `priority` | String | No | `LOW`, `MEDIUM` (default), `HIGH`, `CRITICAL` |
| `route` | String | No | Route path (e.g. `/practice`, `/dashboard`, `/mentor`) |
| `rating` | String | No | `VERY_BAD`, `BAD`, `NEUTRAL`, `GOOD`, `EXCELLENT` |
| `attachment` | Object | No | Max 5MB; formats: PNG, JPEG, WEBP, GIF |

---

## 4. Response Schemas

### A. Success (HTTP 201 Created)
```json
{
  "success": true,
  "reportId": "FB-1052",
  "localId": "c89b2b51-3cf3-4a11-a8bc-643597d3f820",
  "feedback": {
    "id": "c89b2b51-3cf3-4a11-a8bc-643597d3f820",
    "reference": "FB-1052",
    "type": "BUG",
    "status": "OPEN",
    "priority": "HIGH",
    "createdAt": "2026-09-08T14:40:00.000Z"
  },
  "teamSync": {
    "ticketId": "ts_ticket_99182",
    "ticketNumber": "TS-1052",
    "status": "OPEN"
  },
  "message": "Report successfully submitted to KalviLearn and synchronized with TeamSync."
}
```

### B. Idempotent Duplicate Replay (HTTP 200 OK)
Returned when an identical request with the same `X-Idempotency-Key` is re-sent within the 60-second window.

### C. Validation Error (HTTP 400 Bad Request)
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Title is required for bug reports.",
  "field": "title"
}
```

### D. Unauthenticated (HTTP 401 Unauthorized)
```json
{
  "success": false,
  "error": "Unauthenticated",
  "message": "Authentication required to submit TeamSync tickets."
}
```

### E. Duplicate Submission (HTTP 409 Conflict)
```json
{
  "success": false,
  "error": "Duplicate Submission",
  "message": "Duplicate submission detected. Please wait before submitting identical feedback."
}
```

### F. Rate Limited (HTTP 429 Too Many Requests)
```json
{
  "success": false,
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please wait 45 seconds before submitting again."
}
```

### G. TeamSync Service Unavailable (HTTP 201 with Fallback / HTTP 504)
When TeamSync times out or returns 502/503/504, KalviLearn preserves the report locally in PostgreSQL and marks `teamsync_status = 'RETRY_REQUIRED'`:
```json
{
  "success": true,
  "reportId": "FB-1053",
  "localId": "...",
  "feedback": { ... },
  "teamSync": {
    "ticketId": null,
    "ticketNumber": null,
    "status": "QUEUED_FOR_RETRY",
    "message": "Ticket saved locally; TeamSync synchronization will retry."
  },
  "message": "Report saved locally in KalviLearn. TeamSync synchronization is queued."
}
```

---

## 5. TeamSync Outbound Contract

KalviLearn sends the following payload to `${TEAMSYNC_API_URL}/api/v1/tickets`:

```json
{
  "source": "KALVILEARN",
  "sourceReferenceId": "FB-1052",
  "type": "BUG",
  "title": "Problem Arena code editor does not submit on Enter",
  "description": "When pressing Ctrl+Enter in the Monaco editor, the submission event fails to trigger.",
  "priority": "HIGH",
  "portal": "STUDENT",
  "user": {
    "id": "00000000-0000-0000-0000-000000000001",
    "name": "Student Scholar",
    "email": "student@example.test",
    "role": "STUDENT"
  },
  "page": "/practice",
  "metadata": {
    "browser": "Chrome 122",
    "device": "desktop",
    "userAgent": "Mozilla/5.0 ...",
    "rating": null,
    "featureArea": null,
    "attachmentUrl": null,
    "submittedAt": "2026-09-08T14:40:00.000Z"
  }
}
```

---

## 6. Environment Configuration

### Required Server-Side Environment Variables
```env
# TeamSync Server-to-Server API (Outbound Phase 3)
TEAMSYNC_API_URL=https://api.teamsync.internal
TEAMSYNC_API_KEY=your_server_side_secret_key

# TeamSync Inbound Webhooks (Phase 4)
TEAMSYNC_WEBHOOK_SECRET=your_server_side_teamsync_webhook_secret
```

---

## 7. Phase 4: TeamSync → KalviLearn Inbound Webhooks & Real-Time Sync

### Overview
In Phase 4, ticket changes occurring inside TeamSync (status changes, triage, assignment, priority escalation, staff comments, resolution, and closure) are streamed back to KalviLearn in real-time via authenticated webhooks.

```
┌──────────────────────────────┐
│        TeamSync Core         │
│  (Status, Assignee, Comment) │
└──────────────┬───────────────┘
               │ HTTPS POST + HMAC-SHA256 Signature
               │ Headers: X-TeamSync-Signature, X-TeamSync-Timestamp, X-TeamSync-Event-ID
               ▼
┌──────────────────────────────┐
│     KalviLearn Webhook       │
│ (/api/integrations/teamsync/ │
│          webhooks)           │
│  - HMAC-SHA256 Verification  │
│  - Replay Defense (300s)     │
│  - Idempotency Gate          │
│  - Lifecycle Transition Gate │
│  - Sanitization & Audit Log  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  KalviLearn PostgreSQL DB    │
│  - feedback_reports          │
│  - feedback_comments         │
│  - feedback_audit_logs       │
│  - teamsync_webhook_events   │
└──────────────┬───────────────┘
               │ Supabase Realtime Channel
               ▼
┌──────────────────────────────┐
│     KalviLearn Frontend      │
│  (Live Status & Chat Badge)  │
└──────────────────────────────┘
```

### Inbound Endpoint
`POST /api/integrations/teamsync/webhooks`

#### Authentication & Integrity Headers
| Header | Required | Format | Description |
| :--- | :--- | :--- | :--- |
| `X-TeamSync-Signature` | Yes | Hex string or `v1=<hex>` | HMAC-SHA256 signature of `${timestamp}.${rawBody}` using `TEAMSYNC_WEBHOOK_SECRET` |
| `X-TeamSync-Timestamp` | Yes | Epoch seconds (e.g. `1788832000`) | Request timestamp. Rejected if drift > 300 seconds. |
| `X-TeamSync-Event-ID` | Yes | UUID / String | Unique event identifier for idempotency deduplication |
| `Content-Type` | Yes | `application/json` | Request payload format |

#### Supported Event Types
1. `STATUS_CHANGED` / `RESOLVED` / `CLOSED` / `REOPENED`
   - Validates transition according to KalviLearn lifecycle rules (`OPEN` -> `TRIAGED` -> `IN_PROGRESS` -> `RESOLVED` -> `CLOSED` -> `OPEN`).
   - If invalid transition is attempted, responds with HTTP `422 Unprocessable Entity` (`ILLEGAL_STATUS_TRANSITION`) and records failure in `teamsync_webhook_events`.
2. `PRIORITY_CHANGED`
   - Maps external priority to `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.
3. `ASSIGNED`
   - Updates `assigned_to` and `assigned_email` on the feedback record.
4. `COMMENT_CREATED`
   - Sanitizes comment content against XSS and persists in `feedback_comments` idempotently.

#### Idempotency & Unmapped Tickets
- If `eventId` has already been processed: Responds with `200 OK` and `{ duplicate: true, code: 'DUPLICATE_EVENT_IGNORED' }`.
- If ticket does not exist in KalviLearn: Responds with `202 Accepted` and `{ unmapped: true, code: 'UNKNOWN_EXTERNAL_TICKET' }` to prevent remote webhook retry loops while recording event for diagnostics.

#### Example Webhook Event Payload
```json
{
  "eventId": "evt_9b83a218_d901",
  "eventType": "STATUS_CHANGED",
  "timestamp": 1788832100,
  "ticketId": "ts_tkt_482910",
  "ticketNumber": "TS-48291",
  "sourceReferenceId": "FB-1052",
  "previousStatus": "TRIAGED",
  "newStatus": "IN_PROGRESS",
  "assignee": {
    "name": "Sarah Chen",
    "email": "sarah.chen@teamsync.io"
  }
}
```

#### Example Webhook Verification & Curl Call
```bash
TIMESTAMP=$(date +%s)
PAYLOAD='{"eventId":"evt_1","eventType":"STATUS_CHANGED","sourceReferenceId":"FB-1052","newStatus":"IN_PROGRESS"}'
SIGNATURE=$(echo -n "${TIMESTAMP}.${PAYLOAD}" | openssl dgst -sha256 -hmac "teamsync_dev_webhook_secret_key" | sed 's/^.* //')

curl -X POST https://kalvilearn.vercel.app/api/integrations/teamsync/webhooks \
  -H "Content-Type: application/json" \
  -H "X-TeamSync-Signature: ${SIGNATURE}" \
  -H "X-TeamSync-Timestamp: ${TIMESTAMP}" \
  -H "X-TeamSync-Event-ID: evt_1" \
  -d "${PAYLOAD}"
```

