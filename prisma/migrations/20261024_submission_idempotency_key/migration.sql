-- Migration: Add idempotencyKey to Submission table for DB-level uniqueness guarantee
-- Prepared locally for fix/live-site-bugs-oct24. DO NOT apply to production until approval.

ALTER TABLE "Submission" ADD COLUMN IF NOT EXISTS "idempotencyKey" TEXT;

-- Create unique index on idempotencyKey to enforce single-write idempotency across serverless instances
CREATE UNIQUE INDEX IF NOT EXISTS "Submission_idempotencyKey_key" ON "Submission"("idempotencyKey");
