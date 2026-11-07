-- =========================================================================
-- KalviLearn: Complete Coding Question Database Architecture Redesign
-- Migration: 20261107_problem_normalized_architecture
-- Fully additive, non-destructive, idempotent, and transactional
-- Preserves all 500 existing questions, 1500 test cases, and historical records
-- =========================================================================

-- 1. Add missing lifecycle, limit, and auditing columns to public."Problem"
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'PUBLISHED';
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "timeLimitMs" INTEGER NOT NULL DEFAULT 2000;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "memoryLimitMb" INTEGER NOT NULL DEFAULT 256;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "createdBy" TEXT;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "updatedBy" TEXT;

-- 2. Backfill existing records with canonical published defaults and timestamps
UPDATE public."Problem"
SET 
  "status" = COALESCE("status", 'PUBLISHED'),
  "isActive" = COALESCE("isActive", true),
  "timeLimitMs" = COALESCE("timeLimitMs", 2000),
  "memoryLimitMb" = COALESCE("memoryLimitMb", 256),
  "updatedAt" = COALESCE("updatedAt", "createdAt", CURRENT_TIMESTAMP);

-- 3. Create high-performance indexes on Problem
CREATE INDEX IF NOT EXISTS idx_problem_status ON public."Problem"("status");
CREATE INDEX IF NOT EXISTS idx_problem_isactive ON public."Problem"("isActive");
CREATE INDEX IF NOT EXISTS idx_problem_beltid ON public."Problem"("beltId");
CREATE INDEX IF NOT EXISTS idx_problem_learningunitid ON public."Problem"("learningUnitId");

-- 4. Create dedicated ProblemExample table
CREATE TABLE IF NOT EXISTS public."ProblemExample" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL REFERENCES public."Problem"("id") ON DELETE CASCADE,
  "input" TEXT NOT NULL,
  "expectedOutput" TEXT NOT NULL,
  "explanation" TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_problem_example_problemid ON public."ProblemExample"("problemId", "displayOrder");

-- 5. Create dedicated ProblemTestCase table
CREATE TABLE IF NOT EXISTS public."ProblemTestCase" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL REFERENCES public."Problem"("id") ON DELETE CASCADE,
  "input" TEXT NOT NULL,
  "expectedOutput" TEXT NOT NULL,
  "isHidden" BOOLEAN NOT NULL DEFAULT false,
  "displayOrder" INTEGER NOT NULL DEFAULT 1,
  "points" INTEGER NOT NULL DEFAULT 10,
  "explanation" TEXT,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_problem_testcase_problemid ON public."ProblemTestCase"("problemId", "displayOrder");
CREATE INDEX IF NOT EXISTS idx_problem_testcase_hidden ON public."ProblemTestCase"("problemId", "isHidden");

-- 6. Create dedicated ProblemStarterCode table
CREATE TABLE IF NOT EXISTS public."ProblemStarterCode" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL REFERENCES public."Problem"("id") ON DELETE CASCADE,
  "language" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_problem_starter_code UNIQUE ("problemId", "language")
);
CREATE INDEX IF NOT EXISTS idx_problem_startercode_problemid ON public."ProblemStarterCode"("problemId");

-- 7. Create dedicated ProblemRevision table
CREATE TABLE IF NOT EXISTS public."ProblemRevision" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL REFERENCES public."Problem"("id") ON DELETE CASCADE,
  "version" INTEGER NOT NULL DEFAULT 1,
  "snapshot" JSONB NOT NULL,
  "changedBy" TEXT,
  "changeSummary" TEXT,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_problem_revision_problemid ON public."ProblemRevision"("problemId", "version" DESC);

-- =========================================================================
-- DATA MIGRATION: Migrate existing JSON and relational data to new tables
-- =========================================================================

-- 8. Migrate Problem.examples JSON array into ProblemExample rows
INSERT INTO public."ProblemExample" ("id", "problemId", "input", "expectedOutput", "explanation", "displayOrder", "createdAt", "updatedAt")
SELECT 
  p.id || '-ex-' || (elem.ord::text),
  p.id,
  COALESCE(elem.val->>'input', ''),
  COALESCE(elem.val->>'output', elem.val->>'expectedOutput', ''),
  elem.val->>'explanation',
  elem.ord::integer,
  COALESCE(p."createdAt", CURRENT_TIMESTAMP),
  COALESCE(p."createdAt", CURRENT_TIMESTAMP)
FROM public."Problem" p,
LATERAL jsonb_array_elements(
  CASE 
    WHEN p.examples IS NULL THEN '[]'::jsonb
    WHEN jsonb_typeof(p.examples::jsonb) = 'array' THEN p.examples::jsonb
    ELSE '[]'::jsonb
  END
) WITH ORDINALITY AS elem(val, ord)
ON CONFLICT ("id") DO NOTHING;

-- 9. Migrate TestCase records into ProblemTestCase rows
INSERT INTO public."ProblemTestCase" ("id", "problemId", "input", "expectedOutput", "isHidden", "displayOrder", "points", "explanation", "createdAt", "updatedAt")
SELECT 
  tc.id,
  tc."problemId",
  tc.input,
  tc."expectedOutput",
  COALESCE(tc."isHidden", false),
  COALESCE(tc."testIndex", 1),
  10,
  tc.explanation,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM public."TestCase" tc
WHERE EXISTS (SELECT 1 FROM public."Problem" p WHERE p.id = tc."problemId")
ON CONFLICT ("id") DO NOTHING;

-- 10. Migrate Problem.starterCodes JSON object into ProblemStarterCode rows
INSERT INTO public."ProblemStarterCode" ("id", "problemId", "language", "code", "createdAt", "updatedAt")
SELECT 
  p.id || '-sc-' || kv.key,
  p.id,
  kv.key,
  kv.value,
  COALESCE(p."createdAt", CURRENT_TIMESTAMP),
  COALESCE(p."createdAt", CURRENT_TIMESTAMP)
FROM public."Problem" p,
LATERAL jsonb_each_text(
  CASE 
    WHEN p."starterCodes" IS NULL THEN '{}'::jsonb
    WHEN jsonb_typeof(p."starterCodes"::jsonb) = 'object' THEN p."starterCodes"::jsonb
    ELSE '{}'::jsonb
  END
) AS kv(key, value)
ON CONFLICT ("problemId", "language") DO UPDATE 
SET "code" = EXCLUDED."code";

-- 11. Create initial baseline ProblemRevision (version 1) for all existing problems
INSERT INTO public."ProblemRevision" ("id", "problemId", "version", "snapshot", "changedBy", "changeSummary", "createdAt")
SELECT 
  p.id || '-rev-1',
  p.id,
  1,
  jsonb_build_object(
    'id', p.id,
    'slug', p.slug,
    'title', p.title,
    'difficulty', p.difficulty,
    'status', COALESCE(p.status, 'PUBLISHED'),
    'learningUnitId', p."learningUnitId",
    'beltId', p."beltId",
    'description', p.description,
    'inputFormat', p."inputFormat",
    'outputFormat', p."outputFormat",
    'constraints', p.explanation,
    'timeLimitMs', 2000,
    'memoryLimitMb', 256,
    'examples', COALESCE(p.examples::jsonb, '[]'::jsonb),
    'starterCodes', COALESCE(p."starterCodes"::jsonb, '{}'::jsonb)
  ),
  'SYSTEM_MIGRATION',
  'Baseline snapshot during database architecture redesign',
  COALESCE(p."createdAt", CURRENT_TIMESTAMP)
FROM public."Problem" p
ON CONFLICT ("id") DO NOTHING;

-- 12. Reload PostgREST schema cache so all changes are immediately available
NOTIFY pgrst, 'reload schema';

