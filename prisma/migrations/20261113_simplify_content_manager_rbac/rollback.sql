-- =========================================================================
-- Rollback for Migration: 20261113_simplify_content_manager_rbac
-- =========================================================================

BEGIN;

ALTER TABLE public."content_manager_assignments"
  ALTER COLUMN "scope_type" SET DEFAULT 'NONE';

DO $$
BEGIN
  IF to_regclass('public."content_manager_permissions"') IS NOT NULL THEN
    COMMENT ON TABLE public."content_manager_permissions" IS NULL;
  END IF;

  IF to_regclass('public."content_manager_scopes"') IS NOT NULL THEN
    COMMENT ON TABLE public."content_manager_scopes" IS NULL;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

COMMIT;
