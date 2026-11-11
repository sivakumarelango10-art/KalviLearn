-- =========================================================================
-- KalviLearn: Content Manager Lifecycle States & Management Metadata
-- Migration: 20261112_content_manager_lifecycle
-- Safe, additive, idempotent, transactional migration.
-- Depends on: 20261111_content_manager_rbac
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- 0. Verify Prerequisite Tables & Managed Roles
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_missing_roles TEXT[];
BEGIN
  SELECT array_agg(r) INTO v_missing_roles
  FROM unnest(ARRAY['anon', 'authenticated', 'service_role']) AS r
  WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = r);

  IF v_missing_roles IS NOT NULL AND array_length(v_missing_roles, 1) > 0 THEN
    RAISE EXCEPTION 'Migration aborted: required Supabase role(s) missing: %', array_to_string(v_missing_roles, ', ');
  END IF;

  IF to_regclass('public."users"') IS NULL
     OR to_regclass('public."content_manager_assignments"') IS NULL
     OR to_regclass('public."content_manager_permissions"') IS NULL
     OR to_regclass('public."content_manager_scopes"') IS NULL
     OR to_regclass('public."content_audit_logs"') IS NULL THEN
    RAISE EXCEPTION 'Migration aborted: Content Manager RBAC tables missing. Execute 20261111_content_manager_rbac first.';
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- 1. Extend content_manager_assignments with Lifecycle Metadata
-- -------------------------------------------------------------------------
ALTER TABLE public."content_manager_assignments"
  ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE';

ALTER TABLE public."content_manager_assignments"
  ADD COLUMN IF NOT EXISTS "invited_by" VARCHAR(255);

ALTER TABLE public."content_manager_assignments"
  ADD COLUMN IF NOT EXISTS "invited_at" TIMESTAMPTZ;

ALTER TABLE public."content_manager_assignments"
  ADD COLUMN IF NOT EXISTS "suspended_by" VARCHAR(255);

ALTER TABLE public."content_manager_assignments"
  ADD COLUMN IF NOT EXISTS "suspended_at" TIMESTAMPTZ;

ALTER TABLE public."content_manager_assignments"
  ADD COLUMN IF NOT EXISTS "suspension_reason" TEXT;

ALTER TABLE public."content_manager_assignments"
  ADD COLUMN IF NOT EXISTS "updated_by" VARCHAR(255);

-- Backfill legacy rows deterministically before applying constraints
UPDATE public."content_manager_assignments"
SET
  "status" = CASE
    WHEN "status" IN ('ACTIVE', 'SUSPENDED', 'INVITED', 'REVOKED') THEN
      CASE
        WHEN "is_active" = false AND "status" = 'ACTIVE' THEN
          CASE WHEN "revoked_at" IS NOT NULL THEN 'REVOKED' ELSE 'SUSPENDED' END
        ELSE "status"
      END
    WHEN "is_active" = true THEN 'ACTIVE'
    WHEN "revoked_at" IS NOT NULL THEN 'REVOKED'
    ELSE 'SUSPENDED'
  END,
  "is_active" = CASE
    WHEN "status" = 'INVITED' THEN false
    WHEN "status" IN ('SUSPENDED', 'REVOKED') THEN false
    WHEN "is_active" = true AND ("status" IS NULL OR "status" = 'ACTIVE') THEN true
    ELSE false
  END;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE n.nspname = 'public'
      AND t.relname = 'content_manager_assignments'
      AND c.conname = 'chk_cm_assignments_status'
  ) THEN
    ALTER TABLE public."content_manager_assignments"
      ADD CONSTRAINT "chk_cm_assignments_status"
      CHECK ("status" IN ('ACTIVE', 'SUSPENDED', 'INVITED', 'REVOKED'));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE n.nspname = 'public'
      AND t.relname = 'content_manager_assignments'
      AND c.conname = 'chk_cm_assignments_status_active_sync'
  ) THEN
    ALTER TABLE public."content_manager_assignments"
      ADD CONSTRAINT "chk_cm_assignments_status_active_sync"
      CHECK (
        ("status" = 'ACTIVE' AND "is_active" = true) OR
        ("status" IN ('INVITED', 'SUSPENDED', 'REVOKED') AND "is_active" = false)
      );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "idx_cm_assignments_status"
  ON public."content_manager_assignments"("status");

-- -------------------------------------------------------------------------
-- 2. Verify RLS & Zero Direct Client Privileges Remain Intact
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_rls_enabled BOOLEAN;
  v_exposed_grants INTEGER;
BEGIN
  SELECT c.relrowsecurity INTO v_rls_enabled
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname = 'content_manager_assignments';

  SELECT COUNT(*) INTO v_exposed_grants
  FROM information_schema.role_table_grants
  WHERE table_schema = 'public'
    AND table_name = 'content_manager_assignments'
    AND grantee IN ('PUBLIC', 'anon', 'authenticated');

  IF v_rls_enabled IS DISTINCT FROM true OR v_exposed_grants > 0 THEN
    RAISE EXCEPTION 'Migration aborted: content_manager_assignments security invariant failed (rls=%, exposed=%).',
      v_rls_enabled, v_exposed_grants;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

COMMIT;
