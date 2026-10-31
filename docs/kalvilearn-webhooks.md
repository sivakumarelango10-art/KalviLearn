# TeamSync Outbound Webhook Sender Specification (Phase 4B)

## 1. Overview
The **TeamSync Webhook Sender** provides a resilient, auditable, and secure mechanism for propagating TeamSync ticket events back to KalviLearn. Whenever a ticket status changes, priority is updated, an engineer is assigned, or a staff comment is created, TeamSync generates an HMAC-signed webhook event and dispatches it to KalviLearn's inbound webhook gateway.

```
┌─────────────────────────────────────────────────────────┐
│                    TeamSync Core                        │
│   (Status Change, Assignment, Escalation, Comments)     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              Outbox Persistence Layer                   │
│          (teamsync_webhook_deliveries)                  │
│                                                         │
│  - Generates stable eventId (evt_xxx)                   │
│  - Persists payload with status: 'PENDING'              │
│  - Guarantees transaction commit before delivery        │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               Reliable Dispatch Engine                  │
│                                                         │
│  - SSRF defense & destination URL validation            │
│  - Canonical HMAC-SHA256 signature calculation          │
│  - Bounded exponential backoff retries (502/503/504)    │
│  - Fast failure on permanent errors (400/401/403/422)   │
│  - Updates outbox status ('DELIVERED' / 'FAILED')       │
└────────────────────────────┬────────────────────────────┘
                             │ HTTPS POST
                             │ Headers:
                             │   X-TeamSync-Signature
                             │   X-TeamSync-Timestamp
                             │   X-TeamSync-Event-ID
                             ▼
┌─────────────────────────────────────────────────────────┐
│            KalviLearn Inbound Webhook API               │
│      (/api/integrations/teamsync/webhooks)              │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Inbound Endpoint & Headers
- **Endpoint**: Configured via `KALVILEARN_WEBHOOK_URL` (Default: `https://kalvilearn.vercel.app/api/integrations/teamsync/webhooks`)
- **HTTP Method**: `POST`
- **Request Headers**:
  | Header | Format | Description |
  | :--- | :--- | :--- |
  | `Content-Type` | `application/json` | JSON body |
  | `X-TeamSync-Signature` | Hex string | HMAC-SHA256 of `${timestamp}.${rawBody}` using `KALVILEARN_WEBHOOK_SECRET` |
  | `X-TeamSync-Timestamp` | Epoch seconds | Unix timestamp in seconds |
  | `X-TeamSync-Event-ID` | String / UUID | Unique event identifier (`evt_...`), stable across retries |

---

## 3. Cryptographic Signature Generation
The signature uses HMAC-SHA256 with the shared webhook secret:
```typescript
import crypto from 'crypto'

const payloadToSign = `${timestamp}.${rawBody}`
const signature = crypto
  .createHmac('sha256', secret)
  .update(payloadToSign, 'utf8')
  .digest('hex')
```

---

## 4. Supported Event Types & Sample Payloads

### 1. `STATUS_CHANGED`
Dispatched when a ticket moves between lifecycle states (`OPEN`, `TRIAGED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`, `REOPENED`):
```json
{
  "eventId": "evt_status_1788832100_a1b2c3",
  "eventType": "STATUS_CHANGED",
  "timestamp": 1788832100,
  "source": "TEAMSYNC",
  "ticketId": "ts_tkt_482910",
  "ticketNumber": "TS-48291",
  "sourceReferenceId": "FB-1052",
  "ticket": {
    "id": "ts_tkt_482910",
    "ticketNumber": "TS-48291",
    "sourceReferenceId": "FB-1052",
    "source": "KALVILEARN"
  },
  "previousStatus": "OPEN",
  "newStatus": "TRIAGED"
}
```

### 2. `PRIORITY_CHANGED`
Dispatched when a ticket's priority is escalated or adjusted:
```json
{
  "eventId": "evt_prio_1788832100_d4e5f6",
  "eventType": "PRIORITY_CHANGED",
  "timestamp": 1788832100,
  "source": "TEAMSYNC",
  "ticketId": "ts_tkt_482910",
  "ticketNumber": "TS-48291",
  "sourceReferenceId": "FB-1052",
  "ticket": {
    "id": "ts_tkt_482910",
    "ticketNumber": "TS-48291",
    "sourceReferenceId": "FB-1052",
    "source": "KALVILEARN"
  },
  "previousPriority": "MEDIUM",
  "newPriority": "HIGH"
}
```

### 3. `ASSIGNED`
Dispatched when a ticket is assigned to an engineer or staff member:
```json
{
  "eventId": "evt_assign_1788832100_g7h8i9",
  "eventType": "ASSIGNED",
  "timestamp": 1788832100,
  "source": "TEAMSYNC",
  "ticketId": "ts_tkt_482910",
  "ticketNumber": "TS-48291",
  "sourceReferenceId": "FB-1052",
  "ticket": {
    "id": "ts_tkt_482910",
    "ticketNumber": "TS-48291",
    "sourceReferenceId": "FB-1052",
    "source": "KALVILEARN"
  },
  "assignee": {
    "id": "usr_sarah_chen",
    "name": "Sarah Chen",
    "email": "sarah.chen@teamsync.io"
  }
}
```

### 4. `COMMENT_CREATED`
Dispatched when staff post a note or response to the ticket:
```json
{
  "eventId": "evt_comment_1788832100_j0k1l2",
  "eventType": "COMMENT_CREATED",
  "timestamp": 1788832100,
  "source": "TEAMSYNC",
  "ticketId": "ts_tkt_482910",
  "ticketNumber": "TS-48291",
  "sourceReferenceId": "FB-1052",
  "ticket": {
    "id": "ts_tkt_482910",
    "ticketNumber": "TS-48291",
    "sourceReferenceId": "FB-1052",
    "source": "KALVILEARN"
  },
  "comment": {
    "id": "ts_cmt_893012",
    "authorName": "Alex Rivera",
    "authorEmail": "alex.rivera@teamsync.io",
    "authorRole": "STAFF",
    "content": "We have identified the root cause and deployed a hotfix.",
    "createdAt": "2026-09-08T15:30:00.000Z"
  }
}
```

---

## 5. Delivery Reliability & Retry Policy

### Bounded Retries with Exponential Backoff
- **Max Retries**: 3 attempts.
- **Base Backoff**: $100\text{ms} \times 2^{(\text{attempt} - 1)} + \text{jitter}$.
- **Timeout**: 5000ms per attempt enforced via `AbortController`.
- **Transient Failures (Retried)**:
  - Network disconnection / DNS resolution failure
  - Request timeout
  - `502 Bad Gateway`
  - `503 Service Unavailable`
  - `504 Gateway Timeout`
  - `429 Too Many Requests`
- **Permanent Failures (Fails immediately without retry)**:
  - `400 Bad Request`
  - `401 Unauthorized`
  - `403 Forbidden`
  - `404 Not Found`
  - `422 Unprocessable Entity` (e.g. illegal status transition)

### Idempotency & Stable `eventId`
Every generated event receives a unique, stable `eventId` that is **persisted and reused across all retries**. This guarantees that KalviLearn's inbound receiver can deduplicate multiple delivery attempts of the same event without creating duplicate records.

---

## 6. Outbox Database Architecture
Outbound dispatches are persisted to `teamsync_webhook_deliveries`:
- `event_id`: Unique identifier (indexed).
- `event_type`: Event type classification.
- `ticket_id`, `ticket_number`, `source_reference_id`: Ticket cross-references.
- `destination`: Target webhook URL.
- `payload`: Exact JSON sent to destination.
- `status`: Lifecycle state (`PENDING` $\rightarrow$ `DELIVERED` or `FAILED` or `RETRYING`).
- `attempt_count`: Number of transmission attempts.
- `http_status`: HTTP code received from server.
- `error`: Diagnostic error message on failure.
- `created_at`, `last_attempt`, `next_retry`, `completed_at`: Auditing timestamps.

---

## 7. Security Controls

1. **SSRF Defense**: The destination URL is validated using `validateWebhookDestination()`. Protocol must be HTTPS in production. Cloud metadata IPs (`169.254.169.254`, `metadata.google.internal`) and reserved internal IPs are strictly blocked.
2. **Strict Variable Scope**: `KALVILEARN_WEBHOOK_URL` is set strictly on the server side and is never user-controllable or exposed to frontend client bundles.
3. **Secret Hygiene**: `KALVILEARN_WEBHOOK_SECRET` is kept server-side only and stripped from logs and API responses.

---

## 8. Environment Variables

```env
# TeamSync Webhook Sender to KalviLearn (Phase 4B)
KALVILEARN_WEBHOOK_URL=https://kalvilearn.vercel.app/api/integrations/teamsync/webhooks
KALVILEARN_WEBHOOK_SECRET=your_server_side_webhook_secret
```
