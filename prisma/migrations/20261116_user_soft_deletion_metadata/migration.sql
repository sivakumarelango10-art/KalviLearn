-- =========================================================================
-- KalviLearn: Safe Soft-Deletion Metadata on public.users
-- Migration: 20261116_user_soft_deletion_metadata
-- Safe, forward-only, idempotent, transactional migration.
-- Preserves all existing users, academic progress, submissions, and audits.
-- =========================================================================

BEGIN;

ALTER TABLE public."users"
  ADD COLUMN IF NOT EXISTS "deleted_at" TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "deleted_by" TEXT,
  ADD COLUMN IF NOT EXISTS "deletion_reason" TEXT;

-- Standard B-tree index reconciling with Prisma schema: @@index([deletedAt]) -> "users_deleted_at_idx"
CREATE INDEX IF NOT EXISTS "users_deleted_at_idx"
  ON public."users"("deleted_at");

NOTIFY pgrst, 'reload schema';

COMMIT;

