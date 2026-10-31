-- Add TeamSync integration columns to feedback_reports
ALTER TABLE "public"."feedback_reports"
ADD COLUMN IF NOT EXISTS "teamsync_id" VARCHAR(100),
ADD COLUMN IF NOT EXISTS "teamsync_ticket_number" VARCHAR(50),
ADD COLUMN IF NOT EXISTS "teamsync_status" VARCHAR(30) DEFAULT 'PENDING',
ADD COLUMN IF NOT EXISTS "teamsync_attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS "teamsync_last_attempt" TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS "teamsync_error" TEXT;

-- Create indexes for TeamSync query efficiency
CREATE INDEX IF NOT EXISTS "idx_feedback_reports_teamsync_status" ON "public"."feedback_reports"("teamsync_status");
CREATE INDEX IF NOT EXISTS "idx_feedback_reports_teamsync_id" ON "public"."feedback_reports"("teamsync_id");
