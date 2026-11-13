-- =========================================================================
-- KalviLearn: Dedicated Campus Managers Profile Table
-- Migration: 20261117_dedicated_campus_managers_table
-- Safe, forward-only, idempotent, transactional migration.
-- Depends on: public.users & public.campuses
-- Preserves all existing tables, campus assignments, roles, and audits.
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

  IF to_regclass('public.users') IS NULL THEN
    RAISE EXCEPTION 'Migration aborted: public.users is missing.';
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- 1. Create Dedicated public.campus_managers Profile Table (One-to-One)
--    Campus assignment relationship remains authoritative in campuses.manager_id.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."campus_managers" (
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

CREATE INDEX IF NOT EXISTS "idx_campus_managers_user_id"
  ON public."campus_managers"("user_id");

CREATE INDEX IF NOT EXISTS "idx_campus_managers_email"
  ON public."campus_managers"(lower("email"));

CREATE INDEX IF NOT EXISTS "idx_campus_managers_manager_code"
  ON public."campus_managers"("manager_code")
  WHERE "manager_code" IS NOT NULL;

-- -------------------------------------------------------------------------
-- 2. Backfill Existing Campus Managers (Active and Inactive)
--    Identifies genuine campus managers using:
--    a) Explicit CAMPUS_MANAGER role
--    b) Existing campuses.manager_id references
--    c) Legacy ADMIN accounts ONLY when their campus association is confirmed
--    EXPLICITLY EXCLUDES:
--    - Protected Super Admin (sgjitbros@gmail.com) under all circumstances
--    - Any user holding the SUPERADMIN role
--    - Unrelated ADMIN accounts with no campus association
-- -------------------------------------------------------------------------
INSERT INTO public."campus_managers" (
  "id",
  "user_id",
  "name",
  "email",
  "manager_code",
  "department",
  "designation",
  "created_at",
  "updated_at"
)
SELECT
  gen_random_uuid()::text,
  u."id",
  u."name",
  lower(u."email"),
  'CMG-' || upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 6)),
  'Campus Operations',
  'Campus Manager',
  timezone('utc'::text, now()),
  timezone('utc'::text, now())
FROM public."users" u
WHERE lower(trim(u."email")) <> 'sgjitbros@gmail.com'
  AND upper(coalesce(u."role", '')) <> 'SUPERADMIN'
  AND (
    upper(u."role") = 'CAMPUS_MANAGER'
    OR u."id" IN (
      SELECT DISTINCT c."manager_id"
      FROM public."campuses" c
      WHERE c."manager_id" IS NOT NULL
    )
    OR (
      upper(u."role") = 'ADMIN'
      AND (
        u."campus_id" IS NOT NULL
        OR EXISTS (
          SELECT 1
          FROM public."campuses" c
          WHERE c."manager_id" = u."id"
        )
      )
    )
  )
ON CONFLICT ("user_id") DO NOTHING;

-- -------------------------------------------------------------------------
-- 3. Security Hardening: RLS & Zero Direct Client Privileges
-- -------------------------------------------------------------------------
ALTER TABLE public."campus_managers" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public."campus_managers" FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public."campus_managers" FROM service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."campus_managers" TO service_role;

DROP POLICY IF EXISTS "service_role_all_campus_managers" ON public."campus_managers";
CREATE POLICY "service_role_all_campus_managers"
  ON public."campus_managers"
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
    AND c.relname = 'campus_managers';

  SELECT COUNT(*) INTO v_exposed_grants
  FROM information_schema.role_table_grants
  WHERE table_schema = 'public'
    AND table_name = 'campus_managers'
    AND grantee IN ('PUBLIC', 'anon', 'authenticated');

  SELECT COUNT(*) INTO v_service_select
  FROM information_schema.role_table_grants
  WHERE table_schema = 'public'
    AND table_name = 'campus_managers'
    AND grantee = 'service_role'
    AND privilege_type = 'SELECT';

  IF v_rls_enabled IS DISTINCT FROM true OR v_exposed_grants > 0 OR v_service_select = 0 THEN
    RAISE EXCEPTION 'Migration aborted: campus_managers security invariant failed (rls=%, exposed=%, svc=%).',
      v_rls_enabled, v_exposed_grants, v_service_select;
  END IF;

  -- Verify protected Super Admin sgjitbros@gmail.com was NOT assigned a profile
  IF EXISTS (
    SELECT 1 FROM public."campus_managers" cm
    JOIN public."users" u ON u."id" = cm."user_id"
    WHERE lower(trim(u."email")) = 'sgjitbros@gmail.com'
       OR lower(trim(coalesce(cm."email", ''))) = 'sgjitbros@gmail.com'
  ) THEN
    RAISE EXCEPTION 'Migration aborted: protected Super Admin sgjitbros@gmail.com was erroneously assigned a campus manager profile.';
  END IF;

  -- Verify no account holding SUPERADMIN role was assigned a profile
  IF EXISTS (
    SELECT 1 FROM public."campus_managers" cm
    JOIN public."users" u ON u."id" = cm."user_id"
    WHERE upper(coalesce(u."role", '')) = 'SUPERADMIN'
  ) THEN
    RAISE EXCEPTION 'Migration aborted: account with SUPERADMIN role was erroneously assigned a campus manager profile.';
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

COMMIT;
