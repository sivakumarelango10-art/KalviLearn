-- =========================================================================
-- Rollback for Migration: 20261115_dedicated_content_managers_table
-- =========================================================================
-- SAFETY WARNINGS:
--  1. Executing this rollback permanently deletes all rows and profile metadata
--     (manager_code, department, designation) stored in public.content_managers.
--  2. Authoritative Content Manager authorization (public.users,
--     public.content_manager_assignments, and public.content_audit_logs)
--     is preserved and NOT modified by this rollback.
--  3. Always take a logical backup before rolling back in production:
--     pg_dump --table=public.content_managers -F c -f content_managers_backup.dump
-- =========================================================================

BEGIN;

DROP POLICY IF EXISTS "service_role_all_content_managers" ON public."content_managers";
REVOKE ALL ON TABLE public."content_managers" FROM PUBLIC, anon, authenticated, service_role;
DROP TABLE IF EXISTS public."content_managers" CASCADE;

NOTIFY pgrst, 'reload schema';

COMMIT;

