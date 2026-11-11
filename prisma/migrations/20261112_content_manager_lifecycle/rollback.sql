-- =========================================================================
-- Rollback for Migration: 20261112_content_manager_lifecycle
-- =========================================================================

BEGIN;

DROP INDEX IF EXISTS public."idx_cm_assignments_status";

ALTER TABLE public."content_manager_assignments"
  DROP CONSTRAINT IF EXISTS "chk_cm_assignments_status_active_sync";

ALTER TABLE public."content_manager_assignments"
  DROP CONSTRAINT IF EXISTS "chk_cm_assignments_status";

ALTER TABLE public."content_manager_assignments"
  DROP COLUMN IF EXISTS "updated_by";

ALTER TABLE public."content_manager_assignments"
  DROP COLUMN IF EXISTS "suspension_reason";

ALTER TABLE public."content_manager_assignments"
  DROP COLUMN IF EXISTS "suspended_at";

ALTER TABLE public."content_manager_assignments"
  DROP COLUMN IF EXISTS "suspended_by";

ALTER TABLE public."content_manager_assignments"
  DROP COLUMN IF EXISTS "invited_at";

ALTER TABLE public."content_manager_assignments"
  DROP COLUMN IF EXISTS "invited_by";

ALTER TABLE public."content_manager_assignments"
  DROP COLUMN IF EXISTS "status";

NOTIFY pgrst, 'reload schema';

COMMIT;
