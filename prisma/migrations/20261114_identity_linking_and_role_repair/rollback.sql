-- =========================================================================
-- Rollback for Migration: 20261114_identity_linking_and_role_repair
-- Preserves public.users."authUid" data and users_role_chk safety;
-- restores legacy 5-role constraint ONLY if zero CONTENT_MANAGER users exist.
-- =========================================================================

BEGIN;

DO $$
DECLARE
  v_cm_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_cm_count
  FROM public.users
  WHERE upper(role) = 'CONTENT_MANAGER';

  IF v_cm_count > 0 THEN
    RAISE EXCEPTION 'Rollback aborted: % CONTENT_MANAGER row(s) exist in public.users; revoke/reassign them first.', v_cm_count;
  END IF;

  ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_chk;
  ALTER TABLE public.users
    ADD CONSTRAINT users_role_chk
    CHECK (upper(role) IN ('STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN', 'SUPERADMIN'))
    NOT VALID;
  ALTER TABLE public.users VALIDATE CONSTRAINT users_role_chk;
END $$;

NOTIFY pgrst, 'reload schema';

COMMIT;

