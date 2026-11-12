-- =========================================================================
-- KalviLearn: Dedicated Content Managers Profile Table
-- Migration: 20261115_dedicated_content_managers_table
-- Safe, forward-only, idempotent, transactional migration.
-- Depends on: public.users & 20261111_content_manager_rbac (content_manager_assignments)
-- Preserves all existing tables, assignments, roles, and audit logs.
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- 0. Verify Prerequisite Tables & Managed Supabase Roles
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

  IF to_regclass('public.users') IS NULL
     OR to_regclass('public.content_manager_assignments') IS NULL THEN
    RAISE EXCEPTION 'Migration aborted: public.users or public.content_manager_assignments is missing.';
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- 1. Create Dedicated public.content_managers Profile Table (One-to-One)
--    Authoritative access lifecycle status remains in content_manager_assignments.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."content_managers" (
  "id"           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "user_id"      TEXT NOT NULL UNIQUE REFERENCES public."users"("id") ON DELETE CASCADE,
  "name"         TEXT,
  "email"        TEXT,
  "manager_code" VARCHAR(30) UNIQUE,
  "department"   TEXT,
  "designation"  TEXT,
  "created_at"   TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "updated_at"   TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS "idx_content_managers_user_id"
  ON public."content_managers"("user_id");

CREATE INDEX IF NOT EXISTS "idx_content_managers_email"
  ON public."content_managers"(lower("email"));

CREATE INDEX IF NOT EXISTS "idx_content_managers_manager_code"
  ON public."content_managers"("manager_code")
  WHERE "manager_code" IS NOT NULL;

-- -------------------------------------------------------------------------
-- 2. Backfill Existing Content Managers (Active, Invited, Suspended & Revoked)
--    Preserves existing profile rows and historical assignment profiles.
-- -------------------------------------------------------------------------
INSERT INTO public."content_managers" (
  "id",
  "user_id",
  "name",
  "email",
  "created_at",
  "updated_at"
)
SELECT
  gen_random_uuid()::text,
  u."id",
  u."name",
  lower(u."email"),
  COALESCE(a."created_at", a."granted_at", timezone('utc'::text, now())),
  timezone('utc'::text, now())
FROM public."content_manager_assignments" a
JOIN public."users" u ON u."id" = a."user_id"
ON CONFLICT ("user_id") DO NOTHING;

-- -------------------------------------------------------------------------
-- 3. Security Hardening: RLS & Zero Direct Client Privileges
-- -------------------------------------------------------------------------
ALTER TABLE public."content_managers" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public."content_managers" FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public."content_managers" FROM service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."content_managers" TO service_role;

DROP POLICY IF EXISTS "service_role_all_content_managers" ON public."content_managers";
CREATE POLICY "service_role_all_content_managers"
  ON public."content_managers"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- -------------------------------------------------------------------------
-- 4. Fail-Closed Security Verification
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_rls_enabled BOOLEAN;
  v_exposed_grants INTEGER;
  v_service_select INTEGER;
BEGIN
  SELECT c.relrowsecurity INTO v_rls_enabled
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname = 'content_managers';

  SELECT COUNT(*) INTO v_exposed_grants
  FROM information_schema.role_table_grants
  WHERE table_schema = 'public'
    AND table_name = 'content_managers'
    AND grantee IN ('PUBLIC', 'anon', 'authenticated');

  SELECT COUNT(*) INTO v_service_select
  FROM information_schema.role_table_grants
  WHERE table_schema = 'public'
    AND table_name = 'content_managers'
    AND grantee = 'service_role'
    AND privilege_type = 'SELECT';

  IF v_rls_enabled IS DISTINCT FROM true OR v_exposed_grants > 0 OR v_service_select = 0 THEN
    RAISE EXCEPTION 'Migration aborted: content_managers security invariant failed (rls=%, exposed=%, svc=%).',
      v_rls_enabled, v_exposed_grants, v_service_select;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

COMMIT;

