-- =========================================================================
-- KalviLearn: Complete Coding Question Database Architecture Redesign
-- Rollback for Migration: 20261107_problem_normalized_architecture (AUDITED)
-- =========================================================================
--
-- IMPORTANT ROLLBACK LIMITATIONS & SAFETY AUDIT:
-- 1. This script cleanly removes the normalized child tables:
--    ProblemExample, ProblemTestCase, ProblemStarterCode, ProblemRevision,
--    and the migration audit/quarantine tables.
-- 2. Dual-write synchronization in src/server/superAdminHandler.ts ensures all
--    question updates made post-migration have also been written to legacy columns
--    (Problem.examples, Problem.starterCodes, and TestCase). Therefore, question
--    and test-case content is preserved in the legacy tables.
-- 3. REVISION LOSS WARNING:
--    Revisions stored in ProblemRevision do not exist in legacy tables. Any
--    revision history generated post-migration will be permanently dropped.
-- 4. CRITICAL: "isActive" on Problem is INTENTIONALLY NOT DROPPED.
--    "isActive" was introduced in migration 20261024_archive_duplicate_problems
--    to isolate 442 duplicate practice questions. Dropping "isActive" would
--    corrupt duplicate question isolation and must never be dropped.
-- 5. MANDATORY PRE-MIGRATION BACKUP:
--    Always execute a logical backup before running migrations:
--    pg_dump -h <host> -U postgres -d postgres --table=public."Problem" --table=public."TestCase" -F c -b -f pre_migration_backup.dump
-- =========================================================================

BEGIN;

-- 1. Revoke and Drop Stored Procedures and Helpers
REVOKE ALL ON FUNCTION public.save_question_atomic(TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, JSONB, JSONB, JSONB, TEXT, TEXT) FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION public.safe_jsonb_convert(TEXT) FROM PUBLIC, anon, authenticated, service_role;
DROP FUNCTION IF EXISTS public.save_question_atomic(TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, JSONB, JSONB, JSONB, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.safe_jsonb_convert(TEXT);

-- 2. Drop Audit, Quarantine, and Any Leftover Private Staging Schema
DROP TABLE IF EXISTS public."ProblemMigrationJsonAudit" CASCADE;
DROP TABLE IF EXISTS public."OrphanedTestCaseAudit" CASCADE;
DROP SCHEMA IF EXISTS kalvilearn_migration_staging CASCADE;

-- 3. Drop Normalized Child Tables (automatically removes their RLS and grants)
DROP TABLE IF EXISTS public."ProblemRevision" CASCADE;
DROP TABLE IF EXISTS public."ProblemStarterCode" CASCADE;
DROP TABLE IF EXISTS public."ProblemTestCase" CASCADE;
DROP TABLE IF EXISTS public."ProblemExample" CASCADE;

-- 4. Drop Indexes on Problem added exclusively here (preserve isActive & canonicalProblemId indexes)
DROP INDEX IF EXISTS public."Problem_status_idx";
DROP INDEX IF EXISTS public.idx_problem_status;

-- 5. Drop Columns Added Exclusively in this Migration
-- (Note: "isActive" and "canonicalProblemId" are intentionally NOT DROPPED to preserve duplicate question isolation)
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "status";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "timeLimitMs";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "memoryLimitMb";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "updatedAt";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "createdBy";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "updatedBy";

-- 6. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

COMMIT;
