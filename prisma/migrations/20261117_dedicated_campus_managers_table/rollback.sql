-- =========================================================================
-- KalviLearn: Safe Rollback for 20261117_dedicated_campus_managers_table
-- Safe, transactional rollback strategy without destructive CASCADE.
-- Guards against dropping unintended dependent objects.
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- 1. Dependency Guard: Verify no external tables reference campus_managers
--    Aborts safely if any unexpected foreign keys reference this table.
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_dependent_fks TEXT[];
BEGIN
  IF to_regclass('public.campus_managers') IS NOT NULL THEN
    SELECT array_agg(conrelid::regclass::text || '.' || conname)
    INTO v_dependent_fks
    FROM pg_constraint
    WHERE confrelid = 'public.campus_managers'::regclass
      AND conrelid <> 'public.campus_managers'::regclass;

    IF v_dependent_fks IS NOT NULL AND array_length(v_dependent_fks, 1) > 0 THEN
      RAISE EXCEPTION 'Rollback aborted: external foreign keys reference public.campus_managers: %',
        array_to_string(v_dependent_fks, ', ');
    END IF;
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- 2. Drop RLS Policies
-- -------------------------------------------------------------------------
DROP POLICY IF EXISTS "service_role_all_campus_managers" ON public."campus_managers";

-- -------------------------------------------------------------------------
-- 3. Safely Drop Table with RESTRICT (fails-closed if dependencies exist)
-- -------------------------------------------------------------------------
DROP TABLE IF EXISTS public."campus_managers" RESTRICT;

-- -------------------------------------------------------------------------
-- 4. Reload PostgREST Schema Cache
-- -------------------------------------------------------------------------
NOTIFY pgrst, 'reload schema';

COMMIT;
