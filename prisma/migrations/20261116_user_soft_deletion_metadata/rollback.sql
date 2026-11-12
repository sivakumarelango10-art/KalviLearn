-- Rollback for 20261116_user_soft_deletion_metadata
BEGIN;

DROP INDEX IF EXISTS public."idx_users_deleted_at";

ALTER TABLE public."users"
  DROP COLUMN IF EXISTS "deletion_reason",
  DROP COLUMN IF EXISTS "deleted_by",
  DROP COLUMN IF EXISTS "deleted_at";

NOTIFY pgrst, 'reload schema';

COMMIT;

