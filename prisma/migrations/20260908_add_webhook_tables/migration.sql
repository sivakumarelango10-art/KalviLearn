-- Phase 4 Migration: TeamSync Webhook & Audit System

-- 1. Add assignment and sync columns to feedback_reports
ALTER TABLE "public"."feedback_reports"
ADD COLUMN IF NOT EXISTS "assigned_to" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "assigned_email" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "last_synced_at" TIMESTAMPTZ;

-- 2. Create teamsync_webhook_events table for event idempotency & audit
CREATE TABLE IF NOT EXISTS "public"."teamsync_webhook_events" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "event_id" VARCHAR(100) UNIQUE NOT NULL,
    "event_type" VARCHAR(50) NOT NULL,
    "ticket_id" VARCHAR(100),
    "ticket_number" VARCHAR(50),
    "feedback_report_id" UUID REFERENCES "public"."feedback_reports"("id") ON DELETE SET NULL,
    "payload" JSONB NOT NULL,
    "payload_hash" VARCHAR(64),
    "status" VARCHAR(30) NOT NULL DEFAULT 'PROCESSED',
    "error" TEXT,
    "received_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "processed_at" TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS "idx_teamsync_webhook_events_event_id" ON "public"."teamsync_webhook_events"("event_id");
CREATE INDEX IF NOT EXISTS "idx_teamsync_webhook_events_ticket_id" ON "public"."teamsync_webhook_events"("ticket_id");
CREATE INDEX IF NOT EXISTS "idx_teamsync_webhook_events_feedback_id" ON "public"."teamsync_webhook_events"("feedback_report_id");
CREATE INDEX IF NOT EXISTS "idx_teamsync_webhook_events_status" ON "public"."teamsync_webhook_events"("status");

-- 3. Create feedback_comments table for bidirectional comment synchronization
CREATE TABLE IF NOT EXISTS "public"."feedback_comments" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "feedback_report_id" UUID NOT NULL REFERENCES "public"."feedback_reports"("id") ON DELETE CASCADE,
    "source" VARCHAR(50) NOT NULL DEFAULT 'TEAMSYNC',
    "teamsync_comment_id" VARCHAR(100) UNIQUE,
    "author_name" VARCHAR(255) NOT NULL,
    "author_email" VARCHAR(255),
    "author_role" VARCHAR(50),
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "idx_feedback_comments_report_id" ON "public"."feedback_comments"("feedback_report_id");
CREATE INDEX IF NOT EXISTS "idx_feedback_comments_teamsync_comment_id" ON "public"."feedback_comments"("teamsync_comment_id");

-- 4. Create feedback_audit_logs table for auditability of webhook changes
CREATE TABLE IF NOT EXISTS "public"."feedback_audit_logs" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "feedback_report_id" UUID NOT NULL REFERENCES "public"."feedback_reports"("id") ON DELETE CASCADE,
    "source" VARCHAR(50) NOT NULL DEFAULT 'TEAMSYNC_WEBHOOK',
    "event_id" VARCHAR(100),
    "action" VARCHAR(50) NOT NULL,
    "previous_value" JSONB,
    "new_value" JSONB,
    "details" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "idx_feedback_audit_logs_report_id" ON "public"."feedback_audit_logs"("feedback_report_id");
CREATE INDEX IF NOT EXISTS "idx_feedback_audit_logs_event_id" ON "public"."feedback_audit_logs"("event_id");
CREATE INDEX IF NOT EXISTS "idx_feedback_audit_logs_action" ON "public"."feedback_audit_logs"("action");
