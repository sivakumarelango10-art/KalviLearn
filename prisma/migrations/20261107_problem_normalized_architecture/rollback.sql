-- =========================================================================
-- Rollback for Migration: 20261107_problem_normalized_architecture
-- =========================================================================

-- Drop created child tables
DROP TABLE IF EXISTS public."ProblemRevision" CASCADE;
DROP TABLE IF EXISTS public."ProblemStarterCode" CASCADE;
DROP TABLE IF EXISTS public."ProblemTestCase" CASCADE;
DROP TABLE IF EXISTS public."ProblemExample" CASCADE;

-- Drop created indexes on Problem
DROP INDEX IF EXISTS public.idx_problem_status;
DROP INDEX IF EXISTS public.idx_problem_isactive;

-- Drop newly added columns on Problem
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "status";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "isActive";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "timeLimitMs";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "memoryLimitMb";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "updatedAt";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "createdBy";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "updatedBy";

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

