-- =========================================================================
-- KalviLearn: Simplify Content Manager RBAC to Single Fixed Capability Model
-- Migration: 20261113_simplify_content_manager_rbac
-- Safe, additive, idempotent, non-destructive, transactional migration.
-- Depends on: 20261111_content_manager_rbac & 20261112_content_manager_lifecycle
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- 0. Verify Prerequisite Tables & Columns
-- -------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public."users"') IS NULL
     OR to_regclass('public."content_manager_assignments"') IS NULL
     OR to_regclass('public."content_audit_logs"') IS NULL THEN
    RAISE EXCEPTION 'Migration aborted: Content Manager tables missing. Execute 20261111_content_manager_rbac first.';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'content_manager_assignments'
      AND column_name = 'status'
  ) THEN
    RAISE EXCEPTION 'Migration aborted: lifecycle columns missing. Execute 20261112_content_manager_lifecycle first.';
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- 1. Standardize All Content Manager Assignments on Unified Profile ('GLOBAL')
-- Removes runtime reliance on per-user permissions or module-by-module scopes
-- while preserving all user associations, lifecycle states, and audit logs.
-- -------------------------------------------------------------------------
ALTER TABLE public."content_manager_assignments"
  ALTER COLUMN "scope_type" SET DEFAULT 'GLOBAL';

UPDATE public."content_manager_assignments"
SET "scope_type" = 'GLOBAL',
    "updated_at" = timezone('utc'::text, now())
WHERE "scope_type" IS DISTINCT FROM 'GLOBAL'
  AND "status" IN ('ACTIVE', 'INVITED', 'SUSPENDED');

-- Non-destructively document legacy RBAC tables without dropping deployed data
DO $$
BEGIN
  IF to_regclass('public."content_manager_permissions"') IS NOT NULL THEN
    COMMENT ON TABLE public."content_manager_permissions" IS
      'DEPRECATED (20261113): Unused by runtime Content Manager authorization; retained non-destructively for historical reference.';
  END IF;

  IF to_regclass('public."content_manager_scopes"') IS NOT NULL THEN
    COMMENT ON TABLE public."content_manager_scopes" IS
      'DEPRECATED (20261113): Unused by runtime Content Manager authorization; retained non-destructively for historical reference.';
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- 2. Verify RLS & Zero Direct Client Privileges Remain Intact
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_unprotected_rls INTEGER;
  v_exposed_grants INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_unprotected_rls
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname IN ('content_manager_assignments', 'content_audit_logs')
    AND c.relrowsecurity IS DISTINCT FROM true;

  SELECT COUNT(*) INTO v_exposed_grants
  FROM information_schema.role_table_grants
  WHERE table_schema = 'public'
    AND table_name IN ('content_manager_assignments', 'content_audit_logs')
    AND grantee IN ('PUBLIC', 'anon', 'authenticated');

  IF v_unprotected_rls > 0 OR v_exposed_grants > 0 THEN
    RAISE EXCEPTION 'Migration aborted: security invariant failed (rls=%, exposed=%).',
      v_unprotected_rls, v_exposed_grants;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

COMMIT;
