-- =========================================================================
-- KalviLearn: Trusted Google Identity Linking & CONTENT_MANAGER Role Repair
-- Migration: 20261114_identity_linking_and_role_repair
-- Safe, forward-only, idempotent, transactional migration.
-- Preserves all existing public.users rows, auth.users identities, and RLS.
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

  IF to_regclass('public.users') IS NULL THEN
    RAISE EXCEPTION 'Migration aborted: public.users table does not exist.';
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- 1. Ensure Trusted Identity Mapping Column & Partial Unique Index
--    public.users."authUid" links to auth.users.id; NULLs remain allowed.
-- -------------------------------------------------------------------------
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS "authUid" uuid;

CREATE UNIQUE INDEX IF NOT EXISTS users_authuid_key
  ON public.users ("authUid")
  WHERE "authUid" IS NOT NULL;

-- -------------------------------------------------------------------------
-- 2. Trusted Google Identity-Linking Functions & Triggers (from 20261006)
--    - Never overwrites an existing authUid link.
--    - Prevents client-supplied authUid spoofing on INSERT/UPDATE.
--    - Requires confirmed Google identity + case-insensitive email match.
--    - Prevents assigning the same authUid to multiple application users.
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.users_link_identity() RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    NEW."authUid" := OLD."authUid";
  ELSE
    NEW."authUid" := NULL;
  END IF;

  IF NEW."authUid" IS NULL THEN
    SELECT a.id INTO NEW."authUid"
    FROM auth.users a
    WHERE lower(a.email) = lower(NEW.email)
      AND a.email_confirmed_at IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM auth.identities i
        WHERE i.user_id = a.id AND i.provider = 'google'
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.users x
        WHERE x."authUid" = a.id
      )
    LIMIT 1;
  END IF;

  RETURN NEW;
END $$;

REVOKE ALL ON FUNCTION public.users_link_identity() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.users_link_identity() TO service_role;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = 'users'
      AND t.tgname = 'trg_users_link_identity'
      AND NOT t.tgisinternal
  ) THEN
    CREATE TRIGGER trg_users_link_identity
      BEFORE INSERT OR UPDATE ON public.users
      FOR EACH ROW
      EXECUTE FUNCTION public.users_link_identity();
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.auth_identity_link_user() RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
BEGIN
  IF NEW.provider = 'google' THEN
    UPDATE public.users u
    SET "authUid" = NEW.user_id
    FROM auth.users a
    WHERE a.id = NEW.user_id
      AND a.email_confirmed_at IS NOT NULL
      AND u."authUid" IS NULL
      AND lower(u.email) = lower(a.email)
      AND NOT EXISTS (
        SELECT 1 FROM public.users x
        WHERE x."authUid" = a.id
      );
  END IF;
  RETURN NEW;
END $$;

REVOKE ALL ON FUNCTION public.auth_identity_link_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.auth_identity_link_user() TO service_role;

DO $$
BEGIN
  IF to_regclass('auth.identities') IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth'
      AND c.relname = 'identities'
      AND t.tgname = 'trg_auth_identity_link_user'
      AND NOT t.tgisinternal
  ) THEN
    CREATE TRIGGER trg_auth_identity_link_user
      AFTER INSERT ON auth.identities
      FOR EACH ROW
      EXECUTE FUNCTION public.auth_identity_link_user();
  END IF;
END $$;

-- Safe one-time backfill for existing unlinked users with confirmed Google accounts
UPDATE public.users u
SET "authUid" = a.id
FROM auth.users a
WHERE u."authUid" IS NULL
  AND lower(a.email) = lower(u.email)
  AND a.email_confirmed_at IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM auth.identities i
    WHERE i.user_id = a.id AND i.provider = 'google'
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.users x
    WHERE x."authUid" = a.id
  );

-- -------------------------------------------------------------------------
-- 3. Role Constraint Compatibility Repair (users_role_chk)
--    Validates existing roles before replacing constraint so unknown roles
--    are never silently converted. Adds CONTENT_MANAGER cleanly.
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_unknown_roles TEXT;
BEGIN
  SELECT string_agg(DISTINCT coalesce(role, '<NULL>'), ', ')
  INTO v_unknown_roles
  FROM public.users
  WHERE role IS NULL
     OR upper(role) NOT IN ('STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN', 'SUPERADMIN', 'CONTENT_MANAGER');

  IF v_unknown_roles IS NOT NULL THEN
    RAISE EXCEPTION 'Migration aborted: unexpected role(s) found in public.users: %', v_unknown_roles;
  END IF;

  ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_chk;
  ALTER TABLE public.users
    ADD CONSTRAINT users_role_chk
    CHECK (upper(role) IN ('STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN', 'SUPERADMIN', 'CONTENT_MANAGER'))
    NOT VALID;
  ALTER TABLE public.users VALIDATE CONSTRAINT users_role_chk;
END $$;

-- -------------------------------------------------------------------------
-- 4. Security Verification (Fail-Closed)
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_has_authuid BOOLEAN;
  v_has_idx BOOLEAN;
  v_has_users_trg BOOLEAN;
  v_has_auth_trg BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'authUid'
  ) INTO v_has_authuid;

  SELECT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname = 'public' AND tablename = 'users' AND indexname = 'users_authuid_key'
  ) INTO v_has_idx;

  SELECT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'users' AND t.tgname = 'trg_users_link_identity' AND NOT t.tgisinternal
  ) INTO v_has_users_trg;

  SELECT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth' AND c.relname = 'identities' AND t.tgname = 'trg_auth_identity_link_user' AND NOT t.tgisinternal
  ) INTO v_has_auth_trg;

  IF NOT (v_has_authuid AND v_has_idx AND v_has_users_trg AND v_has_auth_trg) THEN
    RAISE EXCEPTION 'Migration aborted: identity linking verification failed (authUid=%, idx=%, users_trg=%, auth_trg=%).',
      v_has_authuid, v_has_idx, v_has_users_trg, v_has_auth_trg;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

COMMIT;

