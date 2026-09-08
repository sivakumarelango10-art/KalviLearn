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
    "id": "36a74ed3-4a98-4374-a3d1-be0e2050b81c",
    "name": "Kavya Ramesh",
    "email": "kavya.ramesh.s.121@kalvium.community",
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
# TeamSync Server-to-Server API (Server-side only)
TEAMSYNC_API_URL=https://api.teamsync.internal
TEAMSYNC_API_KEY=your_server_side_secret_key
```
