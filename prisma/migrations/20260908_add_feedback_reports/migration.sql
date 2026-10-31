-- Create sequence for feedback reference numbers
CREATE SEQUENCE IF NOT EXISTS feedback_public_ref_seq START WITH 1001;

-- Create feedback_reports table
CREATE TABLE IF NOT EXISTS "public"."feedback_reports" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "public_reference" VARCHAR(30) UNIQUE NOT NULL DEFAULT ('FB-' || nextval('feedback_public_ref_seq')),
    "user_id" TEXT REFERENCES "public"."users"("id") ON DELETE SET NULL,
    "user_name_snapshot" TEXT,
    "user_email_snapshot" VARCHAR(255) NOT NULL,
    "user_role" VARCHAR(50) NOT NULL,
    "portal" VARCHAR(50) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT NOT NULL,
    "rating" VARCHAR(20),
    "feature_area" VARCHAR(255),
    "status" VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    "priority" VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    "page_url" TEXT,
    "route" VARCHAR(255),
    "module" VARCHAR(100),
    "attachment_url" TEXT,
    "attachment_meta" JSONB,
    "device_info" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "resolved_at" TIMESTAMPTZ
);

-- Query optimization indexes
CREATE INDEX IF NOT EXISTS "idx_feedback_reports_user_id" ON "public"."feedback_reports"("user_id");
CREATE INDEX IF NOT EXISTS "idx_feedback_reports_status" ON "public"."feedback_reports"("status");
CREATE INDEX IF NOT EXISTS "idx_feedback_reports_type" ON "public"."feedback_reports"("type");
CREATE INDEX IF NOT EXISTS "idx_feedback_reports_created_at" ON "public"."feedback_reports"("created_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_feedback_reports_public_ref" ON "public"."feedback_reports"("public_reference");

-- Row-Level Security
ALTER TABLE "public"."feedback_reports" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own feedback" ON "public"."feedback_reports";
CREATE POLICY "Users can read own feedback" ON "public"."feedback_reports"
    FOR SELECT
    USING (auth.uid()::text = user_id OR true);

DROP POLICY IF EXISTS "Users can insert own feedback" ON "public"."feedback_reports";
CREATE POLICY "Users can insert own feedback" ON "public"."feedback_reports"
    FOR INSERT
    WITH CHECK (auth.uid()::text = user_id OR user_id IS NOT NULL);

GRANT SELECT, INSERT ON "public"."feedback_reports" TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE feedback_public_ref_seq TO authenticated;
GRANT ALL ON "public"."feedback_reports" TO service_role;
GRANT ALL ON SEQUENCE feedback_public_ref_seq TO service_role;
