-- =========================================================================
-- KalviLearn: Complete Coding Question Database Architecture Redesign
-- Migration: 20261107_problem_normalized_architecture (AUDITED & HARDENED)
-- Fully additive, non-destructive, idempotent, and transactional
-- Preserves all existing questions, test cases, and historical records
-- Zero data loss, robust text/JSON validation, publication & RPC security
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- 0. Verify Managed Supabase Roles Exist (Fail-closed if missing)
-- Production migrations must NEVER create Supabase-managed roles.
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
END $$;

-- -------------------------------------------------------------------------
-- 1. Helper function for safe JSON/TEXT parsing (prevents transaction aborts)
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.safe_jsonb_convert(val text)
RETURNS jsonb
LANGUAGE plpgsql
IMMUTABLE
SET search_path = pg_catalog, pg_temp
AS $$
BEGIN
  IF val IS NULL OR trim(val) = '' THEN
    RETURN NULL;
  END IF;
  RETURN val::jsonb;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$;

-- -------------------------------------------------------------------------
-- 2. Audit & Quarantine Tables (guarantees zero silent discards)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."ProblemMigrationJsonAudit" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL,
  "slug" TEXT,
  "failedField" TEXT NOT NULL,
  "rawContent" TEXT,
  "detectedAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "reason" TEXT,
  CONSTRAINT uq_problem_migration_json_audit UNIQUE ("problemId", "failedField")
);

CREATE TABLE IF NOT EXISTS public."OrphanedTestCaseAudit" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL,
  "testIndex" INTEGER,
  "input" TEXT NOT NULL,
  "expectedOutput" TEXT NOT NULL,
  "isHidden" BOOLEAN DEFAULT false,
  "explanation" TEXT,
  "discoveredAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "disposition" TEXT NOT NULL DEFAULT 'PENDING_REVIEW'
);

-- -------------------------------------------------------------------------
-- 3. Add missing lifecycle, limit, auditing, and reference columns to public."Problem"
-- (Ensures columns exist before any subsequent UPDATE or SELECT references them)
-- Default status to 'DRAFT' and isActive to false initially so unverified legacy
-- rows are never accidentally published. Defaults are switched to PUBLISHED/true
-- after the archival backfill below.
-- -------------------------------------------------------------------------
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'DRAFT';
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "canonicalProblemId" TEXT;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "subdivision" TEXT;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "explanation" TEXT;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "exampleExplanation" TEXT;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "timeLimitMs" INTEGER NOT NULL DEFAULT 2000;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "memoryLimitMb" INTEGER NOT NULL DEFAULT 256;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "createdBy" TEXT;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "updatedBy" TEXT;

-- =========================================================================
-- SECTION 4: ARCHIVAL BACKFILL & PUBLICATION SAFETY FOR 500 PRACTICE PROBLEMS
-- Authoritative source: docs/question-audit/question_decisions_compact.json & src/data/problems.json
-- Invariant: 58 active canonical + 442 archived duplicates = 500 practice problems.
-- =========================================================================

-- 4.1. Temporary mapping tables (scoped to transaction, dropped on COMMIT)
CREATE TEMP TABLE IF NOT EXISTS temp_canonical_active_problems (
  canonical_id TEXT PRIMARY KEY
) ON COMMIT DROP;

CREATE TEMP TABLE IF NOT EXISTS temp_duplicate_archive_map (
  duplicate_id TEXT PRIMARY KEY,
  canonical_id TEXT NOT NULL
) ON COMMIT DROP;

-- 4.2. Populate 58 verified canonical practice questions
INSERT INTO temp_canonical_active_problems (canonical_id) VALUES
  ('belt-1-q1-arithmetic-check-v1'),
  ('belt-1-q2-absolute-difference-v1'),
  ('belt-1-q3-largest-of-three-v1'),
  ('belt-1-q4-middle-value-v1'),
  ('belt-1-q5-divisibility-report-v1'),
  ('belt-1-q6-sign-product-v1'),
  ('belt-1-q7-range-membership-v1'),
  ('belt-1-q8-piecewise-fare-v1'),
  ('belt-1-q9-operator-precedence-v1'),
  ('belt-1-q10-three-way-comparison-v1'),
  ('belt-2-q11-array-sum-v1'),
  ('belt-2-q12-array-minimum-v1'),
  ('belt-2-q13-count-above-threshold-v1'),
  ('belt-2-q14-reverse-array-v1'),
  ('belt-2-q15-rotate-left-v1'),
  ('belt-2-q16-second-largest-v1'),
  ('belt-2-q17-prefix-running-sum-v1'),
  ('belt-2-q18-distinct-count-v1'),
  ('belt-2-q19-longest-equal-run-v1'),
  ('belt-2-q20-pair-sum-exists-v1'),
  ('belt-2-q21-move-zeroes-v1'),
  ('belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-2-q23-frequency-of-target-v1'),
  ('belt-2-q24-first-maximum-index-v1'),
  ('belt-2-q25-alternating-sum-v1'),
  ('belt-6-q1-climbing-cost-v1'),
  ('belt-6-q2-house-robber-v1'),
  ('belt-6-q3-coin-change-minimum-v1'),
  ('belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-6-q5-partition-equal-sum-v1'),
  ('belt-6-q6-grid-minimum-path-v1'),
  ('belt-6-q7-string-edit-distance-v1'),
  ('belt-6-q8-maximum-product-subarray-v1'),
  ('belt-6-q9-decode-digit-string-v1'),
  ('belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-7-q21-components-v1'),
  ('belt-7-q22-bipartite-v1'),
  ('belt-7-q23-shortest-path-v1'),
  ('belt-7-q24-topological-order-v1'),
  ('belt-7-q25-mst-v1'),
  ('belt-7-q26-scc-v1'),
  ('belt-7-q27-cycle-detection-v1'),
  ('belt-7-q28-reachability-v1'),
  ('belt-7-q29-dag-longest-path-v1'),
  ('belt-7-q30-dsu-connectivity-v1'),
  ('belt-8-q1-height-v1'),
  ('belt-8-q2-leaf-count-v1'),
  ('belt-8-q3-balance-v1'),
  ('belt-8-q4-preorder-v1'),
  ('belt-8-q5-inorder-v1'),
  ('belt-8-q6-postorder-v1'),
  ('belt-8-q7-level-sum-v1'),
  ('belt-8-q8-diameter-v1'),
  ('belt-8-q9-bst-validity-v1'),
  ('belt-8-q10-bst-lower-bound-v1'),
  ('belt-8-q11-root-to-leaf-sum-v1'),
  ('belt-8-q12-symmetry-v1'),
  ('belt-8-q13-zigzag-v1')
ON CONFLICT (canonical_id) DO NOTHING;

-- 4.3. Populate 442 verified duplicate-to-canonical mappings
INSERT INTO temp_duplicate_archive_map (duplicate_id, canonical_id) VALUES
  ('belt-1-q11-arithmetic-check-v2', 'belt-1-q1-arithmetic-check-v1'),
  ('belt-1-q12-absolute-difference-v2', 'belt-1-q2-absolute-difference-v1'),
  ('belt-1-q13-largest-of-three-v2', 'belt-1-q3-largest-of-three-v1'),
  ('belt-1-q14-middle-value-v2', 'belt-1-q4-middle-value-v1'),
  ('belt-1-q15-divisibility-report-v2', 'belt-1-q5-divisibility-report-v1'),
  ('belt-1-q16-sign-product-v2', 'belt-1-q6-sign-product-v1'),
  ('belt-1-q17-range-membership-v2', 'belt-1-q7-range-membership-v1'),
  ('belt-1-q18-piecewise-fare-v2', 'belt-1-q8-piecewise-fare-v1'),
  ('belt-1-q19-operator-precedence-v2', 'belt-1-q9-operator-precedence-v1'),
  ('belt-1-q20-three-way-comparison-v2', 'belt-1-q10-three-way-comparison-v1'),
  ('belt-2-q1-arithmetic-check-v1', 'belt-1-q1-arithmetic-check-v1'),
  ('belt-2-q2-absolute-difference-v1', 'belt-1-q2-absolute-difference-v1'),
  ('belt-2-q3-largest-of-three-v1', 'belt-1-q3-largest-of-three-v1'),
  ('belt-2-q4-middle-value-v1', 'belt-1-q4-middle-value-v1'),
  ('belt-2-q5-divisibility-report-v1', 'belt-1-q5-divisibility-report-v1'),
  ('belt-2-q6-sign-product-v1', 'belt-1-q6-sign-product-v1'),
  ('belt-2-q7-range-membership-v1', 'belt-1-q7-range-membership-v1'),
  ('belt-2-q8-piecewise-fare-v1', 'belt-1-q8-piecewise-fare-v1'),
  ('belt-2-q9-operator-precedence-v1', 'belt-1-q9-operator-precedence-v1'),
  ('belt-2-q10-three-way-comparison-v1', 'belt-1-q10-three-way-comparison-v1'),
  ('belt-2-q26-array-sum-v2', 'belt-2-q11-array-sum-v1'),
  ('belt-2-q27-array-minimum-v2', 'belt-2-q12-array-minimum-v1'),
  ('belt-2-q28-count-above-threshold-v2', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-2-q29-reverse-array-v2', 'belt-2-q14-reverse-array-v1'),
  ('belt-2-q30-rotate-left-v2', 'belt-2-q15-rotate-left-v1'),
  ('belt-3-q1-array-sum-v1', 'belt-2-q11-array-sum-v1'),
  ('belt-3-q2-array-minimum-v1', 'belt-2-q12-array-minimum-v1'),
  ('belt-3-q3-count-above-threshold-v1', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-3-q4-reverse-array-v1', 'belt-2-q14-reverse-array-v1'),
  ('belt-3-q5-rotate-left-v1', 'belt-2-q15-rotate-left-v1'),
  ('belt-3-q6-second-largest-v1', 'belt-2-q16-second-largest-v1'),
  ('belt-3-q7-prefix-running-sum-v1', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-3-q8-distinct-count-v1', 'belt-2-q18-distinct-count-v1'),
  ('belt-3-q9-longest-equal-run-v1', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-3-q10-pair-sum-exists-v1', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-3-q11-move-zeroes-v1', 'belt-2-q21-move-zeroes-v1'),
  ('belt-3-q12-merge-sorted-arrays-v1', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-3-q13-frequency-of-target-v1', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-3-q14-first-maximum-index-v1', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-3-q15-alternating-sum-v1', 'belt-2-q25-alternating-sum-v1'),
  ('belt-3-q16-array-sum-v2', 'belt-2-q11-array-sum-v1'),
  ('belt-3-q17-array-minimum-v2', 'belt-2-q12-array-minimum-v1'),
  ('belt-3-q18-count-above-threshold-v2', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-3-q19-reverse-array-v2', 'belt-2-q14-reverse-array-v1'),
  ('belt-3-q20-rotate-left-v2', 'belt-2-q15-rotate-left-v1'),
  ('belt-3-q21-second-largest-v2', 'belt-2-q16-second-largest-v1'),
  ('belt-3-q22-prefix-running-sum-v2', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-3-q23-distinct-count-v2', 'belt-2-q18-distinct-count-v1'),
  ('belt-3-q24-longest-equal-run-v2', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-3-q25-pair-sum-exists-v2', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-3-q26-move-zeroes-v2', 'belt-2-q21-move-zeroes-v1'),
  ('belt-3-q27-merge-sorted-arrays-v2', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-3-q28-frequency-of-target-v2', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-3-q29-first-maximum-index-v2', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-3-q30-alternating-sum-v2', 'belt-2-q25-alternating-sum-v1'),
  ('belt-3-q31-array-sum-v3', 'belt-2-q11-array-sum-v1'),
  ('belt-3-q32-array-minimum-v3', 'belt-2-q12-array-minimum-v1'),
  ('belt-3-q33-count-above-threshold-v3', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-3-q34-reverse-array-v3', 'belt-2-q14-reverse-array-v1'),
  ('belt-3-q35-rotate-left-v3', 'belt-2-q15-rotate-left-v1'),
  ('belt-4-q1-array-sum-v1', 'belt-2-q11-array-sum-v1'),
  ('belt-4-q2-array-minimum-v1', 'belt-2-q12-array-minimum-v1'),
  ('belt-4-q3-count-above-threshold-v1', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-4-q4-reverse-array-v1', 'belt-2-q14-reverse-array-v1'),
  ('belt-4-q5-rotate-left-v1', 'belt-2-q15-rotate-left-v1'),
  ('belt-4-q6-second-largest-v1', 'belt-2-q16-second-largest-v1'),
  ('belt-4-q7-prefix-running-sum-v1', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-4-q8-distinct-count-v1', 'belt-2-q18-distinct-count-v1'),
  ('belt-4-q9-longest-equal-run-v1', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-4-q10-pair-sum-exists-v1', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-4-q11-move-zeroes-v1', 'belt-2-q21-move-zeroes-v1'),
  ('belt-4-q12-merge-sorted-arrays-v1', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-4-q13-frequency-of-target-v1', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-4-q14-first-maximum-index-v1', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-4-q15-alternating-sum-v1', 'belt-2-q25-alternating-sum-v1'),
  ('belt-4-q16-array-sum-v2', 'belt-2-q11-array-sum-v1'),
  ('belt-4-q17-array-minimum-v2', 'belt-2-q12-array-minimum-v1'),
  ('belt-4-q18-count-above-threshold-v2', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-4-q19-reverse-array-v2', 'belt-2-q14-reverse-array-v1'),
  ('belt-4-q20-rotate-left-v2', 'belt-2-q15-rotate-left-v1'),
  ('belt-4-q21-second-largest-v2', 'belt-2-q16-second-largest-v1'),
  ('belt-4-q22-prefix-running-sum-v2', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-4-q23-distinct-count-v2', 'belt-2-q18-distinct-count-v1'),
  ('belt-4-q24-longest-equal-run-v2', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-4-q25-pair-sum-exists-v2', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-4-q26-move-zeroes-v2', 'belt-2-q21-move-zeroes-v1'),
  ('belt-4-q27-merge-sorted-arrays-v2', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-4-q28-frequency-of-target-v2', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-4-q29-first-maximum-index-v2', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-4-q30-alternating-sum-v2', 'belt-2-q25-alternating-sum-v1'),
  ('belt-4-q31-array-sum-v3', 'belt-2-q11-array-sum-v1'),
  ('belt-4-q32-array-minimum-v3', 'belt-2-q12-array-minimum-v1'),
  ('belt-4-q33-count-above-threshold-v3', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-4-q34-reverse-array-v3', 'belt-2-q14-reverse-array-v1'),
  ('belt-4-q35-rotate-left-v3', 'belt-2-q15-rotate-left-v1'),
  ('belt-4-q36-second-largest-v3', 'belt-2-q16-second-largest-v1'),
  ('belt-4-q37-prefix-running-sum-v3', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-4-q38-distinct-count-v3', 'belt-2-q18-distinct-count-v1'),
  ('belt-4-q39-longest-equal-run-v3', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-4-q40-pair-sum-exists-v3', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-5-q1-array-sum-v1', 'belt-2-q11-array-sum-v1'),
  ('belt-5-q2-array-minimum-v1', 'belt-2-q12-array-minimum-v1'),
  ('belt-5-q3-count-above-threshold-v1', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-5-q4-reverse-array-v1', 'belt-2-q14-reverse-array-v1'),
  ('belt-5-q5-rotate-left-v1', 'belt-2-q15-rotate-left-v1'),
  ('belt-5-q6-second-largest-v1', 'belt-2-q16-second-largest-v1'),
  ('belt-5-q7-prefix-running-sum-v1', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-5-q8-distinct-count-v1', 'belt-2-q18-distinct-count-v1'),
  ('belt-5-q9-longest-equal-run-v1', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-5-q10-pair-sum-exists-v1', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-5-q11-move-zeroes-v1', 'belt-2-q21-move-zeroes-v1'),
  ('belt-5-q12-merge-sorted-arrays-v1', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-5-q13-frequency-of-target-v1', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-5-q14-first-maximum-index-v1', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-5-q15-alternating-sum-v1', 'belt-2-q25-alternating-sum-v1'),
  ('belt-5-q16-array-sum-v2', 'belt-2-q11-array-sum-v1'),
  ('belt-5-q17-array-minimum-v2', 'belt-2-q12-array-minimum-v1'),
  ('belt-5-q18-count-above-threshold-v2', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-5-q19-reverse-array-v2', 'belt-2-q14-reverse-array-v1'),
  ('belt-5-q20-rotate-left-v2', 'belt-2-q15-rotate-left-v1'),
  ('belt-5-q21-second-largest-v2', 'belt-2-q16-second-largest-v1'),
  ('belt-5-q22-prefix-running-sum-v2', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-5-q23-distinct-count-v2', 'belt-2-q18-distinct-count-v1'),
  ('belt-5-q24-longest-equal-run-v2', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-5-q25-pair-sum-exists-v2', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-5-q26-move-zeroes-v2', 'belt-2-q21-move-zeroes-v1'),
  ('belt-5-q27-merge-sorted-arrays-v2', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-5-q28-frequency-of-target-v2', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-5-q29-first-maximum-index-v2', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-5-q30-alternating-sum-v2', 'belt-2-q25-alternating-sum-v1'),
  ('belt-5-q31-array-sum-v3', 'belt-2-q11-array-sum-v1'),
  ('belt-5-q32-array-minimum-v3', 'belt-2-q12-array-minimum-v1'),
  ('belt-5-q33-count-above-threshold-v3', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-5-q34-reverse-array-v3', 'belt-2-q14-reverse-array-v1'),
  ('belt-5-q35-rotate-left-v3', 'belt-2-q15-rotate-left-v1'),
  ('belt-5-q36-second-largest-v3', 'belt-2-q16-second-largest-v1'),
  ('belt-5-q37-prefix-running-sum-v3', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-5-q38-distinct-count-v3', 'belt-2-q18-distinct-count-v1'),
  ('belt-5-q39-longest-equal-run-v3', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-5-q40-pair-sum-exists-v3', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-6-q11-climbing-cost-v2', 'belt-6-q1-climbing-cost-v1'),
  ('belt-6-q12-house-robber-v2', 'belt-6-q2-house-robber-v1'),
  ('belt-6-q13-coin-change-minimum-v2', 'belt-6-q3-coin-change-minimum-v1'),
  ('belt-6-q14-longest-increasing-subsequence-v2', 'belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-6-q15-partition-equal-sum-v2', 'belt-6-q5-partition-equal-sum-v1'),
  ('belt-6-q16-grid-minimum-path-v2', 'belt-6-q6-grid-minimum-path-v1'),
  ('belt-6-q17-string-edit-distance-v2', 'belt-6-q7-string-edit-distance-v1'),
  ('belt-6-q18-maximum-product-subarray-v2', 'belt-6-q8-maximum-product-subarray-v1'),
  ('belt-6-q19-decode-digit-string-v2', 'belt-6-q9-decode-digit-string-v1'),
  ('belt-6-q20-maximum-sum-non-adjacent-v2', 'belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-6-q21-climbing-cost-v3', 'belt-6-q1-climbing-cost-v1'),
  ('belt-6-q22-house-robber-v3', 'belt-6-q2-house-robber-v1'),
  ('belt-6-q23-coin-change-minimum-v3', 'belt-6-q3-coin-change-minimum-v1'),
  ('belt-6-q24-longest-increasing-subsequence-v3', 'belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-6-q25-partition-equal-sum-v3', 'belt-6-q5-partition-equal-sum-v1'),
  ('belt-6-q26-grid-minimum-path-v3', 'belt-6-q6-grid-minimum-path-v1'),
  ('belt-6-q27-string-edit-distance-v3', 'belt-6-q7-string-edit-distance-v1'),
  ('belt-6-q28-maximum-product-subarray-v3', 'belt-6-q8-maximum-product-subarray-v1'),
  ('belt-6-q29-decode-digit-string-v3', 'belt-6-q9-decode-digit-string-v1'),
  ('belt-6-q30-maximum-sum-non-adjacent-v3', 'belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-6-q31-climbing-cost-v4', 'belt-6-q1-climbing-cost-v1'),
  ('belt-6-q32-house-robber-v4', 'belt-6-q2-house-robber-v1'),
  ('belt-6-q33-coin-change-minimum-v4', 'belt-6-q3-coin-change-minimum-v1'),
  ('belt-6-q34-longest-increasing-subsequence-v4', 'belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-6-q35-partition-equal-sum-v4', 'belt-6-q5-partition-equal-sum-v1'),
  ('belt-6-q36-grid-minimum-path-v4', 'belt-6-q6-grid-minimum-path-v1'),
  ('belt-6-q37-string-edit-distance-v4', 'belt-6-q7-string-edit-distance-v1'),
  ('belt-6-q38-maximum-product-subarray-v4', 'belt-6-q8-maximum-product-subarray-v1'),
  ('belt-6-q39-decode-digit-string-v4', 'belt-6-q9-decode-digit-string-v1'),
  ('belt-6-q40-maximum-sum-non-adjacent-v4', 'belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-7-q1-array-sum-v1', 'belt-2-q11-array-sum-v1'),
  ('belt-7-q2-array-minimum-v1', 'belt-2-q12-array-minimum-v1'),
  ('belt-7-q3-count-above-threshold-v1', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-7-q4-reverse-array-v1', 'belt-2-q14-reverse-array-v1'),
  ('belt-7-q5-rotate-left-v1', 'belt-2-q15-rotate-left-v1'),
  ('belt-7-q6-second-largest-v1', 'belt-2-q16-second-largest-v1'),
  ('belt-7-q7-prefix-running-sum-v1', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-7-q8-distinct-count-v1', 'belt-2-q18-distinct-count-v1'),
  ('belt-7-q9-longest-equal-run-v1', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-7-q10-pair-sum-exists-v1', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-7-q11-move-zeroes-v1', 'belt-2-q21-move-zeroes-v1'),
  ('belt-7-q12-merge-sorted-arrays-v1', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-7-q13-frequency-of-target-v1', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-7-q14-first-maximum-index-v1', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-7-q15-alternating-sum-v1', 'belt-2-q25-alternating-sum-v1'),
  ('belt-7-q16-array-sum-v2', 'belt-2-q11-array-sum-v1'),
  ('belt-7-q17-array-minimum-v2', 'belt-2-q12-array-minimum-v1'),
  ('belt-7-q18-count-above-threshold-v2', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-7-q19-reverse-array-v2', 'belt-2-q14-reverse-array-v1'),
  ('belt-7-q20-rotate-left-v2', 'belt-2-q15-rotate-left-v1'),
  ('belt-7-q31-components-v2', 'belt-7-q21-components-v1'),
  ('belt-7-q32-bipartite-v2', 'belt-7-q22-bipartite-v1'),
  ('belt-7-q33-shortest-path-v2', 'belt-7-q23-shortest-path-v1'),
  ('belt-7-q34-topological-order-v2', 'belt-7-q24-topological-order-v1'),
  ('belt-7-q35-mst-v2', 'belt-7-q25-mst-v1'),
  ('belt-7-q36-scc-v2', 'belt-7-q26-scc-v1'),
  ('belt-7-q37-cycle-detection-v2', 'belt-7-q27-cycle-detection-v1'),
  ('belt-7-q38-reachability-v2', 'belt-7-q28-reachability-v1'),
  ('belt-7-q39-dag-longest-path-v2', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-7-q40-dsu-connectivity-v2', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-7-q41-components-v3', 'belt-7-q21-components-v1'),
  ('belt-7-q42-bipartite-v3', 'belt-7-q22-bipartite-v1'),
  ('belt-7-q43-shortest-path-v3', 'belt-7-q23-shortest-path-v1'),
  ('belt-7-q44-topological-order-v3', 'belt-7-q24-topological-order-v1'),
  ('belt-7-q45-mst-v3', 'belt-7-q25-mst-v1'),
  ('belt-7-q46-scc-v3', 'belt-7-q26-scc-v1'),
  ('belt-7-q47-cycle-detection-v3', 'belt-7-q27-cycle-detection-v1'),
  ('belt-7-q48-reachability-v3', 'belt-7-q28-reachability-v1'),
  ('belt-7-q49-dag-longest-path-v3', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-7-q50-dsu-connectivity-v3', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-7-q51-components-v4', 'belt-7-q21-components-v1'),
  ('belt-7-q52-bipartite-v4', 'belt-7-q22-bipartite-v1'),
  ('belt-7-q53-shortest-path-v4', 'belt-7-q23-shortest-path-v1'),
  ('belt-7-q54-topological-order-v4', 'belt-7-q24-topological-order-v1'),
  ('belt-7-q55-mst-v4', 'belt-7-q25-mst-v1'),
  ('belt-7-q56-scc-v4', 'belt-7-q26-scc-v1'),
  ('belt-7-q57-cycle-detection-v4', 'belt-7-q27-cycle-detection-v1'),
  ('belt-7-q58-reachability-v4', 'belt-7-q28-reachability-v1'),
  ('belt-7-q59-dag-longest-path-v4', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-7-q60-dsu-connectivity-v4', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-8-q14-height-v2', 'belt-8-q1-height-v1'),
  ('belt-8-q15-leaf-count-v2', 'belt-8-q2-leaf-count-v1'),
  ('belt-8-q16-balance-v2', 'belt-8-q3-balance-v1'),
  ('belt-8-q17-preorder-v2', 'belt-8-q4-preorder-v1'),
  ('belt-8-q18-inorder-v2', 'belt-8-q5-inorder-v1'),
  ('belt-8-q19-postorder-v2', 'belt-8-q6-postorder-v1'),
  ('belt-8-q20-level-sum-v2', 'belt-8-q7-level-sum-v1'),
  ('belt-8-q21-diameter-v2', 'belt-8-q8-diameter-v1'),
  ('belt-8-q22-bst-validity-v2', 'belt-8-q9-bst-validity-v1'),
  ('belt-8-q23-bst-lower-bound-v2', 'belt-8-q10-bst-lower-bound-v1'),
  ('belt-8-q24-root-to-leaf-sum-v2', 'belt-8-q11-root-to-leaf-sum-v1'),
  ('belt-8-q25-symmetry-v2', 'belt-8-q12-symmetry-v1'),
  ('belt-8-q26-zigzag-v2', 'belt-8-q13-zigzag-v1'),
  ('belt-8-q27-height-v3', 'belt-8-q1-height-v1'),
  ('belt-8-q28-leaf-count-v3', 'belt-8-q2-leaf-count-v1'),
  ('belt-8-q29-balance-v3', 'belt-8-q3-balance-v1'),
  ('belt-8-q30-preorder-v3', 'belt-8-q4-preorder-v1'),
  ('belt-8-q31-inorder-v3', 'belt-8-q5-inorder-v1'),
  ('belt-8-q32-postorder-v3', 'belt-8-q6-postorder-v1'),
  ('belt-8-q33-level-sum-v3', 'belt-8-q7-level-sum-v1'),
  ('belt-8-q34-diameter-v3', 'belt-8-q8-diameter-v1'),
  ('belt-8-q35-bst-validity-v3', 'belt-8-q9-bst-validity-v1'),
  ('belt-8-q36-bst-lower-bound-v3', 'belt-8-q10-bst-lower-bound-v1'),
  ('belt-8-q37-root-to-leaf-sum-v3', 'belt-8-q11-root-to-leaf-sum-v1'),
  ('belt-8-q38-symmetry-v3', 'belt-8-q12-symmetry-v1'),
  ('belt-8-q39-zigzag-v3', 'belt-8-q13-zigzag-v1'),
  ('belt-8-q40-height-v4', 'belt-8-q1-height-v1'),
  ('belt-8-q41-leaf-count-v4', 'belt-8-q2-leaf-count-v1'),
  ('belt-8-q42-balance-v4', 'belt-8-q3-balance-v1'),
  ('belt-8-q43-preorder-v4', 'belt-8-q4-preorder-v1'),
  ('belt-8-q44-inorder-v4', 'belt-8-q5-inorder-v1'),
  ('belt-8-q45-postorder-v4', 'belt-8-q6-postorder-v1'),
  ('belt-8-q46-level-sum-v4', 'belt-8-q7-level-sum-v1'),
  ('belt-8-q47-diameter-v4', 'belt-8-q8-diameter-v1'),
  ('belt-8-q48-bst-validity-v4', 'belt-8-q9-bst-validity-v1'),
  ('belt-8-q49-bst-lower-bound-v4', 'belt-8-q10-bst-lower-bound-v1'),
  ('belt-8-q50-root-to-leaf-sum-v4', 'belt-8-q11-root-to-leaf-sum-v1'),
  ('belt-8-q51-symmetry-v4', 'belt-8-q12-symmetry-v1'),
  ('belt-8-q52-zigzag-v4', 'belt-8-q13-zigzag-v1'),
  ('belt-8-q53-height-v5', 'belt-8-q1-height-v1'),
  ('belt-8-q54-leaf-count-v5', 'belt-8-q2-leaf-count-v1'),
  ('belt-8-q55-balance-v5', 'belt-8-q3-balance-v1'),
  ('belt-8-q56-preorder-v5', 'belt-8-q4-preorder-v1'),
  ('belt-8-q57-inorder-v5', 'belt-8-q5-inorder-v1'),
  ('belt-8-q58-postorder-v5', 'belt-8-q6-postorder-v1'),
  ('belt-8-q59-level-sum-v5', 'belt-8-q7-level-sum-v1'),
  ('belt-8-q60-diameter-v5', 'belt-8-q8-diameter-v1'),
  ('belt-8-q61-bst-validity-v5', 'belt-8-q9-bst-validity-v1'),
  ('belt-8-q62-bst-lower-bound-v5', 'belt-8-q10-bst-lower-bound-v1'),
  ('belt-8-q63-root-to-leaf-sum-v5', 'belt-8-q11-root-to-leaf-sum-v1'),
  ('belt-8-q64-symmetry-v5', 'belt-8-q12-symmetry-v1'),
  ('belt-8-q65-zigzag-v5', 'belt-8-q13-zigzag-v1'),
  ('belt-9-q1-components-v1', 'belt-7-q21-components-v1'),
  ('belt-9-q2-bipartite-v1', 'belt-7-q22-bipartite-v1'),
  ('belt-9-q3-shortest-path-v1', 'belt-7-q23-shortest-path-v1'),
  ('belt-9-q4-topological-order-v1', 'belt-7-q24-topological-order-v1'),
  ('belt-9-q5-mst-v1', 'belt-7-q25-mst-v1'),
  ('belt-9-q6-scc-v1', 'belt-7-q26-scc-v1'),
  ('belt-9-q7-cycle-detection-v1', 'belt-7-q27-cycle-detection-v1'),
  ('belt-9-q8-reachability-v1', 'belt-7-q28-reachability-v1'),
  ('belt-9-q9-dag-longest-path-v1', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-9-q10-dsu-connectivity-v1', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-9-q11-components-v2', 'belt-7-q21-components-v1'),
  ('belt-9-q12-bipartite-v2', 'belt-7-q22-bipartite-v1'),
  ('belt-9-q13-shortest-path-v2', 'belt-7-q23-shortest-path-v1'),
  ('belt-9-q14-topological-order-v2', 'belt-7-q24-topological-order-v1'),
  ('belt-9-q15-mst-v2', 'belt-7-q25-mst-v1'),
  ('belt-9-q16-scc-v2', 'belt-7-q26-scc-v1'),
  ('belt-9-q17-cycle-detection-v2', 'belt-7-q27-cycle-detection-v1'),
  ('belt-9-q18-reachability-v2', 'belt-7-q28-reachability-v1'),
  ('belt-9-q19-dag-longest-path-v2', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-9-q20-dsu-connectivity-v2', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-9-q21-components-v3', 'belt-7-q21-components-v1'),
  ('belt-9-q22-bipartite-v3', 'belt-7-q22-bipartite-v1'),
  ('belt-9-q23-shortest-path-v3', 'belt-7-q23-shortest-path-v1'),
  ('belt-9-q24-topological-order-v3', 'belt-7-q24-topological-order-v1'),
  ('belt-9-q25-mst-v3', 'belt-7-q25-mst-v1'),
  ('belt-9-q26-scc-v3', 'belt-7-q26-scc-v1'),
  ('belt-9-q27-cycle-detection-v3', 'belt-7-q27-cycle-detection-v1'),
  ('belt-9-q28-reachability-v3', 'belt-7-q28-reachability-v1'),
  ('belt-9-q29-dag-longest-path-v3', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-9-q30-dsu-connectivity-v3', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-9-q31-components-v4', 'belt-7-q21-components-v1'),
  ('belt-9-q32-bipartite-v4', 'belt-7-q22-bipartite-v1'),
  ('belt-9-q33-shortest-path-v4', 'belt-7-q23-shortest-path-v1'),
  ('belt-9-q34-topological-order-v4', 'belt-7-q24-topological-order-v1'),
  ('belt-9-q35-mst-v4', 'belt-7-q25-mst-v1'),
  ('belt-9-q36-scc-v4', 'belt-7-q26-scc-v1'),
  ('belt-9-q37-cycle-detection-v4', 'belt-7-q27-cycle-detection-v1'),
  ('belt-9-q38-reachability-v4', 'belt-7-q28-reachability-v1'),
  ('belt-9-q39-dag-longest-path-v4', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-9-q40-dsu-connectivity-v4', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-9-q41-components-v5', 'belt-7-q21-components-v1'),
  ('belt-9-q42-bipartite-v5', 'belt-7-q22-bipartite-v1'),
  ('belt-9-q43-shortest-path-v5', 'belt-7-q23-shortest-path-v1'),
  ('belt-9-q44-topological-order-v5', 'belt-7-q24-topological-order-v1'),
  ('belt-9-q45-mst-v5', 'belt-7-q25-mst-v1'),
  ('belt-9-q46-scc-v5', 'belt-7-q26-scc-v1'),
  ('belt-9-q47-cycle-detection-v5', 'belt-7-q27-cycle-detection-v1'),
  ('belt-9-q48-reachability-v5', 'belt-7-q28-reachability-v1'),
  ('belt-9-q49-dag-longest-path-v5', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-9-q50-dsu-connectivity-v5', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-9-q51-components-v6', 'belt-7-q21-components-v1'),
  ('belt-9-q52-bipartite-v6', 'belt-7-q22-bipartite-v1'),
  ('belt-9-q53-shortest-path-v6', 'belt-7-q23-shortest-path-v1'),
  ('belt-9-q54-topological-order-v6', 'belt-7-q24-topological-order-v1'),
  ('belt-9-q55-mst-v6', 'belt-7-q25-mst-v1'),
  ('belt-9-q56-scc-v6', 'belt-7-q26-scc-v1'),
  ('belt-9-q57-cycle-detection-v6', 'belt-7-q27-cycle-detection-v1'),
  ('belt-9-q58-reachability-v6', 'belt-7-q28-reachability-v1'),
  ('belt-9-q59-dag-longest-path-v6', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-9-q60-dsu-connectivity-v6', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-9-q61-components-v7', 'belt-7-q21-components-v1'),
  ('belt-9-q62-bipartite-v7', 'belt-7-q22-bipartite-v1'),
  ('belt-9-q63-shortest-path-v7', 'belt-7-q23-shortest-path-v1'),
  ('belt-9-q64-topological-order-v7', 'belt-7-q24-topological-order-v1'),
  ('belt-9-q65-mst-v7', 'belt-7-q25-mst-v1'),
  ('belt-9-q66-scc-v7', 'belt-7-q26-scc-v1'),
  ('belt-9-q67-cycle-detection-v7', 'belt-7-q27-cycle-detection-v1'),
  ('belt-9-q68-reachability-v7', 'belt-7-q28-reachability-v1'),
  ('belt-9-q69-dag-longest-path-v7', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-9-q70-dsu-connectivity-v7', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-9-q71-components-v8', 'belt-7-q21-components-v1'),
  ('belt-9-q72-bipartite-v8', 'belt-7-q22-bipartite-v1'),
  ('belt-9-q73-shortest-path-v8', 'belt-7-q23-shortest-path-v1'),
  ('belt-9-q74-topological-order-v8', 'belt-7-q24-topological-order-v1'),
  ('belt-9-q75-mst-v8', 'belt-7-q25-mst-v1'),
  ('belt-9-q76-scc-v8', 'belt-7-q26-scc-v1'),
  ('belt-9-q77-cycle-detection-v8', 'belt-7-q27-cycle-detection-v1'),
  ('belt-9-q78-reachability-v8', 'belt-7-q28-reachability-v1'),
  ('belt-9-q79-dag-longest-path-v8', 'belt-7-q29-dag-longest-path-v1'),
  ('belt-9-q80-dsu-connectivity-v8', 'belt-7-q30-dsu-connectivity-v1'),
  ('belt-10-q1-climbing-cost-v1', 'belt-6-q1-climbing-cost-v1'),
  ('belt-10-q2-house-robber-v1', 'belt-6-q2-house-robber-v1'),
  ('belt-10-q3-coin-change-minimum-v1', 'belt-6-q3-coin-change-minimum-v1'),
  ('belt-10-q4-longest-increasing-subsequence-v1', 'belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-10-q5-partition-equal-sum-v1', 'belt-6-q5-partition-equal-sum-v1'),
  ('belt-10-q6-grid-minimum-path-v1', 'belt-6-q6-grid-minimum-path-v1'),
  ('belt-10-q7-string-edit-distance-v1', 'belt-6-q7-string-edit-distance-v1'),
  ('belt-10-q8-maximum-product-subarray-v1', 'belt-6-q8-maximum-product-subarray-v1'),
  ('belt-10-q9-decode-digit-string-v1', 'belt-6-q9-decode-digit-string-v1'),
  ('belt-10-q10-maximum-sum-non-adjacent-v1', 'belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-10-q11-climbing-cost-v2', 'belt-6-q1-climbing-cost-v1'),
  ('belt-10-q12-house-robber-v2', 'belt-6-q2-house-robber-v1'),
  ('belt-10-q13-coin-change-minimum-v2', 'belt-6-q3-coin-change-minimum-v1'),
  ('belt-10-q14-longest-increasing-subsequence-v2', 'belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-10-q15-partition-equal-sum-v2', 'belt-6-q5-partition-equal-sum-v1'),
  ('belt-10-q16-grid-minimum-path-v2', 'belt-6-q6-grid-minimum-path-v1'),
  ('belt-10-q17-string-edit-distance-v2', 'belt-6-q7-string-edit-distance-v1'),
  ('belt-10-q18-maximum-product-subarray-v2', 'belt-6-q8-maximum-product-subarray-v1'),
  ('belt-10-q19-decode-digit-string-v2', 'belt-6-q9-decode-digit-string-v1'),
  ('belt-10-q20-maximum-sum-non-adjacent-v2', 'belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-10-q21-climbing-cost-v3', 'belt-6-q1-climbing-cost-v1'),
  ('belt-10-q22-house-robber-v3', 'belt-6-q2-house-robber-v1'),
  ('belt-10-q23-coin-change-minimum-v3', 'belt-6-q3-coin-change-minimum-v1'),
  ('belt-10-q24-longest-increasing-subsequence-v3', 'belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-10-q25-partition-equal-sum-v3', 'belt-6-q5-partition-equal-sum-v1'),
  ('belt-10-q26-grid-minimum-path-v3', 'belt-6-q6-grid-minimum-path-v1'),
  ('belt-10-q27-string-edit-distance-v3', 'belt-6-q7-string-edit-distance-v1'),
  ('belt-10-q28-maximum-product-subarray-v3', 'belt-6-q8-maximum-product-subarray-v1'),
  ('belt-10-q29-decode-digit-string-v3', 'belt-6-q9-decode-digit-string-v1'),
  ('belt-10-q30-maximum-sum-non-adjacent-v3', 'belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-10-q31-climbing-cost-v4', 'belt-6-q1-climbing-cost-v1'),
  ('belt-10-q32-house-robber-v4', 'belt-6-q2-house-robber-v1'),
  ('belt-10-q33-coin-change-minimum-v4', 'belt-6-q3-coin-change-minimum-v1'),
  ('belt-10-q34-longest-increasing-subsequence-v4', 'belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-10-q35-partition-equal-sum-v4', 'belt-6-q5-partition-equal-sum-v1'),
  ('belt-10-q36-grid-minimum-path-v4', 'belt-6-q6-grid-minimum-path-v1'),
  ('belt-10-q37-string-edit-distance-v4', 'belt-6-q7-string-edit-distance-v1'),
  ('belt-10-q38-maximum-product-subarray-v4', 'belt-6-q8-maximum-product-subarray-v1'),
  ('belt-10-q39-decode-digit-string-v4', 'belt-6-q9-decode-digit-string-v1'),
  ('belt-10-q40-maximum-sum-non-adjacent-v4', 'belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-10-q41-climbing-cost-v5', 'belt-6-q1-climbing-cost-v1'),
  ('belt-10-q42-house-robber-v5', 'belt-6-q2-house-robber-v1'),
  ('belt-10-q43-coin-change-minimum-v5', 'belt-6-q3-coin-change-minimum-v1'),
  ('belt-10-q44-longest-increasing-subsequence-v5', 'belt-6-q4-longest-increasing-subsequence-v1'),
  ('belt-10-q45-partition-equal-sum-v5', 'belt-6-q5-partition-equal-sum-v1'),
  ('belt-10-q46-grid-minimum-path-v5', 'belt-6-q6-grid-minimum-path-v1'),
  ('belt-10-q47-string-edit-distance-v5', 'belt-6-q7-string-edit-distance-v1'),
  ('belt-10-q48-maximum-product-subarray-v5', 'belt-6-q8-maximum-product-subarray-v1'),
  ('belt-10-q49-decode-digit-string-v5', 'belt-6-q9-decode-digit-string-v1'),
  ('belt-10-q50-maximum-sum-non-adjacent-v5', 'belt-6-q10-maximum-sum-non-adjacent-v1'),
  ('belt-10-q51-array-sum-v1', 'belt-2-q11-array-sum-v1'),
  ('belt-10-q52-array-minimum-v1', 'belt-2-q12-array-minimum-v1'),
  ('belt-10-q53-count-above-threshold-v1', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-10-q54-reverse-array-v1', 'belt-2-q14-reverse-array-v1'),
  ('belt-10-q55-rotate-left-v1', 'belt-2-q15-rotate-left-v1'),
  ('belt-10-q56-second-largest-v1', 'belt-2-q16-second-largest-v1'),
  ('belt-10-q57-prefix-running-sum-v1', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-10-q58-distinct-count-v1', 'belt-2-q18-distinct-count-v1'),
  ('belt-10-q59-longest-equal-run-v1', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-10-q60-pair-sum-exists-v1', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-10-q61-move-zeroes-v1', 'belt-2-q21-move-zeroes-v1'),
  ('belt-10-q62-merge-sorted-arrays-v1', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-10-q63-frequency-of-target-v1', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-10-q64-first-maximum-index-v1', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-10-q65-alternating-sum-v1', 'belt-2-q25-alternating-sum-v1'),
  ('belt-10-q66-array-sum-v2', 'belt-2-q11-array-sum-v1'),
  ('belt-10-q67-array-minimum-v2', 'belt-2-q12-array-minimum-v1'),
  ('belt-10-q68-count-above-threshold-v2', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-10-q69-reverse-array-v2', 'belt-2-q14-reverse-array-v1'),
  ('belt-10-q70-rotate-left-v2', 'belt-2-q15-rotate-left-v1'),
  ('belt-10-q71-second-largest-v2', 'belt-2-q16-second-largest-v1'),
  ('belt-10-q72-prefix-running-sum-v2', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-10-q73-distinct-count-v2', 'belt-2-q18-distinct-count-v1'),
  ('belt-10-q74-longest-equal-run-v2', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-10-q75-pair-sum-exists-v2', 'belt-2-q20-pair-sum-exists-v1'),
  ('belt-10-q76-move-zeroes-v2', 'belt-2-q21-move-zeroes-v1'),
  ('belt-10-q77-merge-sorted-arrays-v2', 'belt-2-q22-merge-sorted-arrays-v1'),
  ('belt-10-q78-frequency-of-target-v2', 'belt-2-q23-frequency-of-target-v1'),
  ('belt-10-q79-first-maximum-index-v2', 'belt-2-q24-first-maximum-index-v1'),
  ('belt-10-q80-alternating-sum-v2', 'belt-2-q25-alternating-sum-v1'),
  ('belt-10-q81-array-sum-v3', 'belt-2-q11-array-sum-v1'),
  ('belt-10-q82-array-minimum-v3', 'belt-2-q12-array-minimum-v1'),
  ('belt-10-q83-count-above-threshold-v3', 'belt-2-q13-count-above-threshold-v1'),
  ('belt-10-q84-reverse-array-v3', 'belt-2-q14-reverse-array-v1'),
  ('belt-10-q85-rotate-left-v3', 'belt-2-q15-rotate-left-v1'),
  ('belt-10-q86-second-largest-v3', 'belt-2-q16-second-largest-v1'),
  ('belt-10-q87-prefix-running-sum-v3', 'belt-2-q17-prefix-running-sum-v1'),
  ('belt-10-q88-distinct-count-v3', 'belt-2-q18-distinct-count-v1'),
  ('belt-10-q89-longest-equal-run-v3', 'belt-2-q19-longest-equal-run-v1'),
  ('belt-10-q90-pair-sum-exists-v3', 'belt-2-q20-pair-sum-exists-v1')
ON CONFLICT (duplicate_id) DO NOTHING;

-- 4.3B. Fail-Closed Integrity & Completeness Guard (aborts transaction if inconsistent)
DO $$
DECLARE
  v_canon_count INTEGER;
  v_dup_count INTEGER;
  v_self_ref_map INTEGER;
  v_overlap_count INTEGER;
  v_broken_targets INTEGER;
  v_learn_unit_collision INTEGER;
  v_missing_db_canon_target INTEGER;
  v_belt_rows INTEGER;
  v_missing_canonical INTEGER;
  v_missing_duplicate INTEGER;
  v_unmapped_practice INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_canon_count FROM temp_canonical_active_problems;
  SELECT COUNT(*) INTO v_dup_count FROM temp_duplicate_archive_map;
  IF v_canon_count <> 58 OR v_dup_count <> 442 THEN
    RAISE EXCEPTION 'Migration aborted: expected 58 canonical and 442 duplicate mappings, got % and %.', v_canon_count, v_dup_count;
  END IF;

  SELECT COUNT(*) INTO v_self_ref_map
  FROM temp_duplicate_archive_map
  WHERE duplicate_id = canonical_id;
  IF v_self_ref_map > 0 THEN
    RAISE EXCEPTION 'Migration aborted: % self-referencing duplicate mapping(s) detected.', v_self_ref_map;
  END IF;

  SELECT COUNT(*) INTO v_overlap_count
  FROM temp_duplicate_archive_map m
  JOIN temp_canonical_active_problems c ON c.canonical_id = m.duplicate_id;
  IF v_overlap_count > 0 THEN
    RAISE EXCEPTION 'Migration aborted: % problem(s) appear in both canonical and duplicate sets.', v_overlap_count;
  END IF;

  SELECT COUNT(*) INTO v_broken_targets
  FROM temp_duplicate_archive_map m
  WHERE NOT EXISTS (
    SELECT 1 FROM temp_canonical_active_problems c WHERE c.canonical_id = m.canonical_id
  );
  IF v_broken_targets > 0 THEN
    RAISE EXCEPTION 'Migration aborted: % duplicate mapping(s) point outside the verified canonical set.', v_broken_targets;
  END IF;

  SELECT COUNT(*) INTO v_learn_unit_collision
  FROM public."Problem" p
  JOIN temp_duplicate_archive_map m ON (p."id" = m.duplicate_id OR p."slug" = m.duplicate_id)
  WHERE p."learningUnitId" IS NOT NULL;
  IF v_learn_unit_collision > 0 THEN
    RAISE EXCEPTION 'Migration aborted: % Learn Coding question(s) (learningUnitId IS NOT NULL) matched duplicate archive map.', v_learn_unit_collision;
  END IF;

  SELECT COUNT(*) INTO v_missing_db_canon_target
  FROM public."Problem" p
  JOIN temp_duplicate_archive_map m ON (p."id" = m.duplicate_id OR p."slug" = m.duplicate_id)
  WHERE p."learningUnitId" IS NULL
    AND NOT EXISTS (
      SELECT 1 FROM public."Problem" c
      WHERE (c."id" = m.canonical_id OR c."slug" = m.canonical_id)
        AND c."learningUnitId" IS NULL
        AND c."id" <> p."id"
    );
  IF v_missing_db_canon_target > 0 THEN
    RAISE EXCEPTION 'Migration aborted: % matched duplicate(s) point to a missing or self-referencing canonical Problem in DB.', v_missing_db_canon_target;
  END IF;

  SELECT COUNT(*) INTO v_belt_rows
  FROM public."Problem"
  WHERE ("id" LIKE 'belt-%' OR "slug" LIKE 'belt-%')
    AND "learningUnitId" IS NULL;

  IF v_belt_rows >= 10 THEN
    SELECT COUNT(*) INTO v_missing_canonical
    FROM temp_canonical_active_problems c
    WHERE NOT EXISTS (
      SELECT 1 FROM public."Problem" p
      WHERE (p."id" = c.canonical_id OR p."slug" = c.canonical_id)
        AND p."learningUnitId" IS NULL
    );

    SELECT COUNT(*) INTO v_missing_duplicate
    FROM temp_duplicate_archive_map m
    WHERE NOT EXISTS (
      SELECT 1 FROM public."Problem" p
      WHERE (p."id" = m.duplicate_id OR p."slug" = m.duplicate_id)
        AND p."learningUnitId" IS NULL
    );

    SELECT COUNT(*) INTO v_unmapped_practice
    FROM public."Problem" p
    WHERE p."learningUnitId" IS NULL
      AND (p."beltId" IS NOT NULL OR p."id" LIKE 'belt-%' OR p."slug" LIKE 'belt-%')
      AND NOT EXISTS (
        SELECT 1 FROM temp_canonical_active_problems c
        WHERE p."id" = c.canonical_id OR p."slug" = c.canonical_id
      )
      AND NOT EXISTS (
        SELECT 1 FROM temp_duplicate_archive_map m
        WHERE p."id" = m.duplicate_id OR p."slug" = m.duplicate_id
      );

    IF v_missing_canonical > 0 OR v_missing_duplicate > 0 OR v_unmapped_practice > 0 THEN
      RAISE EXCEPTION 'Migration aborted: production practice mapping mismatch (missing_canonical=%, missing_duplicate=%, unmapped_practice=%).',
        v_missing_canonical, v_missing_duplicate, v_unmapped_practice;
    END IF;
  END IF;
END $$;

-- 4.4. Apply 58 Canonical Practice Questions (Publish & mark active)
-- Safeguard: Only update uninitialized rows, never overwrite manual admin status edits
UPDATE public."Problem" p
SET
  "isActive" = true,
  "status" = 'PUBLISHED',
  "canonicalProblemId" = NULL,
  "updatedAt" = COALESCE(p."updatedAt", p."createdAt", timezone('utc'::text, now()))
FROM temp_canonical_active_problems c
WHERE (p."id" = c.canonical_id OR p."slug" = c.canonical_id)
  AND p."learningUnitId" IS NULL
  AND p."canonicalProblemId" IS NULL
  AND (p."status" = 'DRAFT' OR p."status" IS NULL);

-- 4.5. Apply 442 Duplicate Practice Questions (Archive & isolate)
-- Safeguard: Resolves actual canonical PK id and never modifies Learn Coding or manual edits
UPDATE public."Problem" p
SET
  "isActive" = false,
  "status" = 'ARCHIVED',
  "canonicalProblemId" = c."id",
  "updatedAt" = COALESCE(p."updatedAt", p."createdAt", timezone('utc'::text, now()))
FROM temp_duplicate_archive_map m
JOIN public."Problem" c
  ON (c."id" = m.canonical_id OR c."slug" = m.canonical_id)
 AND c."learningUnitId" IS NULL
WHERE (p."id" = m.duplicate_id OR p."slug" = m.duplicate_id)
  AND p."learningUnitId" IS NULL
  AND (p."canonicalProblemId" IS NULL OR p."status" = 'DRAFT' OR p."status" IS NULL);

-- 4.6. Preserve Learn Coding curriculum questions
-- Any question tied to a learning unit is active curriculum content
UPDATE public."Problem"
SET
  "isActive" = true,
  "status" = 'PUBLISHED',
  "canonicalProblemId" = NULL,
  "updatedAt" = COALESCE("updatedAt", "createdAt", timezone('utc'::text, now()))
WHERE "learningUnitId" IS NOT NULL
  AND "canonicalProblemId" IS NULL
  AND ("status" = 'DRAFT' OR "status" IS NULL);

-- 4.6B. Post-Backfill Referential & Acyclic Integrity Verification
DO $$
DECLARE
  v_self_refs INTEGER;
  v_invalid_refs INTEGER;
  v_cyclic_refs INTEGER;
  v_learn_archived INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_self_refs
  FROM public."Problem"
  WHERE "canonicalProblemId" = "id";

  SELECT COUNT(*) INTO v_invalid_refs
  FROM public."Problem" p
  WHERE p."canonicalProblemId" IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM public."Problem" c WHERE c."id" = p."canonicalProblemId"
    );

  SELECT COUNT(*) INTO v_cyclic_refs
  FROM public."Problem" p
  JOIN public."Problem" c ON c."id" = p."canonicalProblemId"
  WHERE c."canonicalProblemId" IS NOT NULL;

  SELECT COUNT(*) INTO v_learn_archived
  FROM public."Problem"
  WHERE "learningUnitId" IS NOT NULL
    AND "canonicalProblemId" IS NOT NULL;

  IF v_self_refs > 0 OR v_invalid_refs > 0 OR v_cyclic_refs > 0 OR v_learn_archived > 0 THEN
    RAISE EXCEPTION 'Migration aborted: post-backfill invariant failed (self_refs=%, invalid_refs=%, cyclic_refs=%, learn_with_canonical=%).',
      v_self_refs, v_invalid_refs, v_cyclic_refs, v_learn_archived;
  END IF;
END $$;

-- 4.7. General backfill for limits and timestamps
UPDATE public."Problem"
SET
  "timeLimitMs" = COALESCE("timeLimitMs", 2000),
  "memoryLimitMb" = COALESCE("memoryLimitMb", 256),
  "updatedAt" = COALESCE("updatedAt", "createdAt", timezone('utc'::text, now()))
WHERE "timeLimitMs" IS NULL OR "memoryLimitMb" IS NULL OR "updatedAt" IS NULL;

-- 4.8. Set column defaults for future inserts
ALTER TABLE public."Problem" ALTER COLUMN "status" SET DEFAULT 'PUBLISHED';
ALTER TABLE public."Problem" ALTER COLUMN "isActive" SET DEFAULT true;

-- -------------------------------------------------------------------------
-- 5. High-performance indexes on Problem
-- -------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS "Problem_status_idx" ON public."Problem"("status");
CREATE INDEX IF NOT EXISTS "Problem_isActive_idx" ON public."Problem"("isActive");
CREATE INDEX IF NOT EXISTS "Problem_beltId_idx" ON public."Problem"("beltId");
CREATE INDEX IF NOT EXISTS "Problem_learningUnitId_idx" ON public."Problem"("learningUnitId");
CREATE INDEX IF NOT EXISTS "Problem_canonicalProblemId_idx" ON public."Problem"("canonicalProblemId");

-- -------------------------------------------------------------------------
-- 6. Dedicated ProblemExample table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."ProblemExample" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL REFERENCES public."Problem"("id") ON DELETE CASCADE,
  "input" TEXT NOT NULL,
  "expectedOutput" TEXT NOT NULL,
  "explanation" TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS "ProblemExample_problemId_displayOrder_idx" ON public."ProblemExample"("problemId", "displayOrder");

-- -------------------------------------------------------------------------
-- 7. Dedicated ProblemTestCase table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."ProblemTestCase" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL REFERENCES public."Problem"("id") ON DELETE CASCADE,
  "input" TEXT NOT NULL,
  "expectedOutput" TEXT NOT NULL,
  "isHidden" BOOLEAN NOT NULL DEFAULT false,
  "displayOrder" INTEGER NOT NULL DEFAULT 1,
  "points" INTEGER NOT NULL DEFAULT 10,
  "explanation" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS "ProblemTestCase_problemId_displayOrder_idx" ON public."ProblemTestCase"("problemId", "displayOrder");
CREATE INDEX IF NOT EXISTS "ProblemTestCase_problemId_isHidden_idx" ON public."ProblemTestCase"("problemId", "isHidden");

-- -------------------------------------------------------------------------
-- 8. Dedicated ProblemStarterCode table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."ProblemStarterCode" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL REFERENCES public."Problem"("id") ON DELETE CASCADE,
  "language" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT "ProblemStarterCode_problemId_language_key" UNIQUE ("problemId", "language")
);
CREATE INDEX IF NOT EXISTS "ProblemStarterCode_problemId_idx" ON public."ProblemStarterCode"("problemId");

-- -------------------------------------------------------------------------
-- 9. Dedicated ProblemRevision table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."ProblemRevision" (
  "id" TEXT PRIMARY KEY,
  "problemId" TEXT NOT NULL REFERENCES public."Problem"("id") ON DELETE CASCADE,
  "version" INTEGER NOT NULL DEFAULT 1,
  "snapshot" JSONB NOT NULL,
  "changedBy" TEXT,
  "changeSummary" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS "ProblemRevision_problemId_version_idx" ON public."ProblemRevision"("problemId", "version" DESC);

-- =========================================================================
-- DATA MIGRATION: Safe extraction and population
-- =========================================================================

-- 10. Audit malformed or invalid structure JSON text prior to parsing
-- Captures: syntax errors, scalar values, objects in examples, arrays in starterCodes
INSERT INTO public."ProblemMigrationJsonAudit" ("id", "problemId", "slug", "failedField", "rawContent", "reason")
SELECT
  p.id || '-audit-examples',
  p.id,
  p.slug,
  'examples',
  p.examples::text,
  CASE
    WHEN public.safe_jsonb_convert(p.examples::text) IS NULL THEN 'Malformed JSON syntax in examples'
    ELSE 'Unexpected JSON structure in examples: expected array, got ' || jsonb_typeof(public.safe_jsonb_convert(p.examples::text))
  END
FROM public."Problem" p
WHERE p.examples IS NOT NULL
  AND trim(p.examples::text) != ''
  AND (
    public.safe_jsonb_convert(p.examples::text) IS NULL
    OR jsonb_typeof(public.safe_jsonb_convert(p.examples::text)) != 'array'
  )
ON CONFLICT ("problemId", "failedField") DO NOTHING;

INSERT INTO public."ProblemMigrationJsonAudit" ("id", "problemId", "slug", "failedField", "rawContent", "reason")
SELECT
  p.id || '-audit-starterCodes',
  p.id,
  p.slug,
  'starterCodes',
  p."starterCodes"::text,
  CASE
    WHEN public.safe_jsonb_convert(p."starterCodes"::text) IS NULL THEN 'Malformed JSON syntax in starterCodes'
    ELSE 'Unexpected JSON structure in starterCodes: expected object, got ' || jsonb_typeof(public.safe_jsonb_convert(p."starterCodes"::text))
  END
FROM public."Problem" p
WHERE p."starterCodes" IS NOT NULL
  AND trim(p."starterCodes"::text) != ''
  AND (
    public.safe_jsonb_convert(p."starterCodes"::text) IS NULL
    OR jsonb_typeof(public.safe_jsonb_convert(p."starterCodes"::text)) != 'object'
  )
ON CONFLICT ("problemId", "failedField") DO NOTHING;

-- 11. Quarantine orphaned TestCase records (ensures zero silent discards)
INSERT INTO public."OrphanedTestCaseAudit" ("id", "problemId", "testIndex", "input", "expectedOutput", "isHidden", "explanation")
SELECT
  tc.id,
  tc."problemId",
  tc."testIndex",
  tc.input,
  tc."expectedOutput",
  COALESCE(tc."isHidden", false),
  tc.explanation
FROM public."TestCase" tc
WHERE NOT EXISTS (SELECT 1 FROM public."Problem" p WHERE p.id = tc."problemId")
ON CONFLICT ("id") DO NOTHING;

-- 12. Migrate Problem.examples into ProblemExample rows
INSERT INTO public."ProblemExample" ("id", "problemId", "input", "expectedOutput", "explanation", "displayOrder", "createdAt", "updatedAt")
SELECT
  p.id || '-ex-' || (elem.ord::text),
  p.id,
  COALESCE(elem.val->>'input', ''),
  COALESCE(elem.val->>'output', elem.val->>'expectedOutput', ''),
  elem.val->>'explanation',
  elem.ord::integer,
  COALESCE(p."createdAt", timezone('utc'::text, now())),
  COALESCE(p."createdAt", timezone('utc'::text, now()))
FROM public."Problem" p,
LATERAL jsonb_array_elements(
  CASE
    WHEN p.examples IS NULL THEN '[]'::jsonb
    WHEN public.safe_jsonb_convert(p.examples::text) IS NOT NULL
         AND jsonb_typeof(public.safe_jsonb_convert(p.examples::text)) = 'array'
      THEN public.safe_jsonb_convert(p.examples::text)
    ELSE '[]'::jsonb
  END
) WITH ORDINALITY AS elem(val, ord)
ON CONFLICT ("id") DO NOTHING;

-- 13. Migrate valid TestCase records into ProblemTestCase rows
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
  timezone('utc'::text, now()),
  timezone('utc'::text, now())
FROM public."TestCase" tc
WHERE EXISTS (SELECT 1 FROM public."Problem" p WHERE p.id = tc."problemId")
ON CONFLICT ("id") DO NOTHING;

-- 14. Migrate Problem.starterCodes into ProblemStarterCode rows
INSERT INTO public."ProblemStarterCode" ("id", "problemId", "language", "code", "createdAt", "updatedAt")
SELECT
  p.id || '-sc-' || kv.key,
  p.id,
  kv.key,
  kv.value,
  COALESCE(p."createdAt", timezone('utc'::text, now())),
  COALESCE(p."createdAt", timezone('utc'::text, now()))
FROM public."Problem" p,
LATERAL jsonb_each_text(
  CASE
    WHEN p."starterCodes" IS NULL THEN '{}'::jsonb
    WHEN public.safe_jsonb_convert(p."starterCodes"::text) IS NOT NULL
         AND jsonb_typeof(public.safe_jsonb_convert(p."starterCodes"::text)) = 'object'
      THEN public.safe_jsonb_convert(p."starterCodes"::text)
    ELSE '{}'::jsonb
  END
) AS kv(key, value)
ON CONFLICT ("problemId", "language") DO NOTHING;

-- 15. Create COMPLETE baseline ProblemRevision (version 1) including full testCases array
INSERT INTO public."ProblemRevision" ("id", "problemId", "version", "snapshot", "changedBy", "changeSummary", "createdAt")
SELECT
  p.id || '-rev-1',
  p.id,
  1,
  jsonb_build_object(
    'problem', jsonb_build_object(
      'id', p.id,
      'slug', p.slug,
      'title', p.title,
      'difficulty', p.difficulty,
      'status', p.status,
      'isActive', p."isActive",
      'order', p."order",
      'learningUnitId', p."learningUnitId",
      'beltId', p."beltId",
      'subdivision', p."subdivision",
      'description', p.description,
      'inputFormat', p."inputFormat",
      'outputFormat', p."outputFormat",
      'explanation', p.explanation,
      'timeLimitMs', p."timeLimitMs",
      'memoryLimitMb', p."memoryLimitMb"
    ),
    'examples', COALESCE(
      CASE
        WHEN p.examples IS NULL THEN '[]'::jsonb
        WHEN public.safe_jsonb_convert(p.examples::text) IS NOT NULL
             AND jsonb_typeof(public.safe_jsonb_convert(p.examples::text)) = 'array'
          THEN public.safe_jsonb_convert(p.examples::text)
        ELSE '[]'::jsonb
      END,
      '[]'::jsonb
    ),
    'testCases', COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', tc.id,
            'problemId', tc."problemId",
            'testIndex', tc."testIndex",
            'displayOrder', tc."testIndex",
            'input', tc.input,
            'expectedOutput', tc."expectedOutput",
            'isHidden', COALESCE(tc."isHidden", false),
            'points', 10,
            'explanation', tc.explanation
          ) ORDER BY tc."testIndex" ASC
        )
        FROM public."TestCase" tc
        WHERE tc."problemId" = p.id
      ),
      '[]'::jsonb
    ),
    'starterCodes', COALESCE(
      CASE
        WHEN p."starterCodes" IS NULL THEN '{}'::jsonb
        WHEN public.safe_jsonb_convert(p."starterCodes"::text) IS NOT NULL
             AND jsonb_typeof(public.safe_jsonb_convert(p."starterCodes"::text)) = 'object'
          THEN public.safe_jsonb_convert(p."starterCodes"::text)
        ELSE '{}'::jsonb
      END,
      '{}'::jsonb
    )
  ),
  'SYSTEM_MIGRATION',
  'Baseline v1 snapshot during normalized database architecture migration',
  COALESCE(p."createdAt", timezone('utc'::text, now()))
FROM public."Problem" p
ON CONFLICT ("id") DO NOTHING;

-- -------------------------------------------------------------------------
-- 16. Server-Authoritative Atomic Question Persistence Stored Procedure
-- SECURITY DEFINER with fixed search_path = pg_catalog, pg_temp
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.save_question_atomic(
  p_id TEXT,
  p_slug TEXT,
  p_title TEXT,
  p_difficulty TEXT,
  p_status TEXT,
  p_is_active BOOLEAN,
  p_order INTEGER,
  p_learning_unit_id TEXT,
  p_belt_id TEXT,
  p_subdivision TEXT,
  p_description TEXT,
  p_input_format TEXT,
  p_output_format TEXT,
  p_explanation TEXT,
  p_time_limit_ms INTEGER,
  p_memory_limit_mb INTEGER,
  p_examples JSONB,
  p_starter_codes JSONB,
  p_test_cases JSONB,
  p_admin_id TEXT,
  p_change_summary TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp
AS $$
DECLARE
  v_next_version INTEGER;
  v_rev_id TEXT;
  v_result JSONB;
BEGIN
  -- Defense-in-depth: Reject unauthenticated execution
  IF p_admin_id IS NULL OR trim(p_admin_id) = '' THEN
    RAISE EXCEPTION 'Unauthorized: p_admin_id is required';
  END IF;

  -- 1. Upsert Problem row
  INSERT INTO public."Problem" (
    "id", "slug", "title", "difficulty", "status", "isActive", "order",
    "learningUnitId", "beltId", "subdivision", "description",
    "inputFormat", "outputFormat", "explanation", "timeLimitMs", "memoryLimitMb",
    "examples", "starterCodes", "updatedBy", "updatedAt"
  ) VALUES (
    p_id, p_slug, p_title, p_difficulty, p_status, p_is_active, p_order,
    p_learning_unit_id, p_belt_id, p_subdivision, p_description,
    p_input_format, p_output_format, p_explanation, p_time_limit_ms, p_memory_limit_mb,
    p_examples, p_starter_codes, p_admin_id, timezone('utc'::text, now())
  )
  ON CONFLICT ("id") DO UPDATE SET
    "slug" = EXCLUDED."slug",
    "title" = EXCLUDED."title",
    "difficulty" = EXCLUDED."difficulty",
    "status" = EXCLUDED."status",
    "isActive" = EXCLUDED."isActive",
    "order" = EXCLUDED."order",
    "learningUnitId" = EXCLUDED."learningUnitId",
    "beltId" = EXCLUDED."beltId",
    "subdivision" = EXCLUDED."subdivision",
    "description" = EXCLUDED."description",
    "inputFormat" = EXCLUDED."inputFormat",
    "outputFormat" = EXCLUDED."outputFormat",
    "explanation" = EXCLUDED."explanation",
    "timeLimitMs" = EXCLUDED."timeLimitMs",
    "memoryLimitMb" = EXCLUDED."memoryLimitMb",
    "examples" = EXCLUDED."examples",
    "starterCodes" = EXCLUDED."starterCodes",
    "updatedBy" = EXCLUDED."updatedBy",
    "updatedAt" = timezone('utc'::text, now());

  -- 2. Synchronize ProblemExample (clean replacement removes obsolete examples)
  DELETE FROM public."ProblemExample" WHERE "problemId" = p_id;
  IF p_examples IS NOT NULL AND jsonb_typeof(p_examples) = 'array' THEN
    INSERT INTO public."ProblemExample" ("id", "problemId", "input", "expectedOutput", "explanation", "displayOrder", "createdAt", "updatedAt")
    SELECT
      p_id || '-ex-' || (elem.ord::text),
      p_id,
      COALESCE(elem.val->>'input', ''),
      COALESCE(elem.val->>'output', elem.val->>'expectedOutput', ''),
      elem.val->>'explanation',
      elem.ord::integer,
      timezone('utc'::text, now()),
      timezone('utc'::text, now())
    FROM jsonb_array_elements(p_examples) WITH ORDINALITY AS elem(val, ord);
  END IF;

  -- 3. Synchronize ProblemStarterCode (clean replacement removes obsolete languages)
  DELETE FROM public."ProblemStarterCode" WHERE "problemId" = p_id;
  IF p_starter_codes IS NOT NULL AND jsonb_typeof(p_starter_codes) = 'object' THEN
    INSERT INTO public."ProblemStarterCode" ("id", "problemId", "language", "code", "createdAt", "updatedAt")
    SELECT
      p_id || '-sc-' || kv.key,
      p_id,
      kv.key,
      kv.value,
      timezone('utc'::text, now()),
      timezone('utc'::text, now())
    FROM jsonb_each_text(p_starter_codes) AS kv(key, value);
  END IF;

  -- 4. Synchronize Test Cases across both ProblemTestCase and legacy TestCase (clean replacement)
  DELETE FROM public."ProblemTestCase" WHERE "problemId" = p_id;
  DELETE FROM public."TestCase" WHERE "problemId" = p_id;
  IF p_test_cases IS NOT NULL AND jsonb_typeof(p_test_cases) = 'array' THEN
    -- Insert into ProblemTestCase
    INSERT INTO public."ProblemTestCase" ("id", "problemId", "input", "expectedOutput", "isHidden", "displayOrder", "points", "explanation", "createdAt", "updatedAt")
    SELECT
      COALESCE(elem.val->>'id', 'ptc-' || p_id || '-' || elem.ord::text),
      p_id,
      COALESCE(elem.val->>'input', ''),
      COALESCE(elem.val->>'expectedOutput', ''),
      COALESCE((elem.val->>'isHidden')::boolean, false),
      COALESCE((elem.val->>'displayOrder')::integer, (elem.val->>'testIndex')::integer, elem.ord::integer),
      COALESCE((elem.val->>'points')::integer, 10),
      elem.val->>'explanation',
      timezone('utc'::text, now()),
      timezone('utc'::text, now())
    FROM jsonb_array_elements(p_test_cases) WITH ORDINALITY AS elem(val, ord);

    -- Insert into legacy TestCase
    INSERT INTO public."TestCase" ("id", "problemId", "testIndex", "input", "expectedOutput", "explanation", "isHidden")
    SELECT
      'tc-' || p_id || '-' || elem.ord::text,
      p_id,
      COALESCE((elem.val->>'testIndex')::integer, (elem.val->>'displayOrder')::integer, elem.ord::integer),
      COALESCE(elem.val->>'input', ''),
      COALESCE(elem.val->>'expectedOutput', ''),
      elem.val->>'explanation',
      COALESCE((elem.val->>'isHidden')::boolean, false)
    FROM jsonb_array_elements(p_test_cases) WITH ORDINALITY AS elem(val, ord);
  END IF;

  -- 5. Record immutable revision snapshot
  SELECT COALESCE(MAX("version"), 0) + 1 INTO v_next_version
  FROM public."ProblemRevision"
  WHERE "problemId" = p_id;

  v_rev_id := 'rev-' || p_id || '-' || v_next_version::text;

  INSERT INTO public."ProblemRevision" ("id", "problemId", "version", "snapshot", "changedBy", "changeSummary", "createdAt")
  VALUES (
    v_rev_id,
    p_id,
    v_next_version,
    jsonb_build_object(
      'problem', jsonb_build_object(
        'id', p_id,
        'slug', p_slug,
        'title', p_title,
        'difficulty', p_difficulty,
        'status', p_status,
        'isActive', p_is_active,
        'order', p_order,
        'learningUnitId', p_learning_unit_id,
        'beltId', p_belt_id,
        'subdivision', p_subdivision,
        'description', p_description,
        'inputFormat', p_input_format,
        'outputFormat', p_output_format,
        'explanation', p_explanation,
        'timeLimitMs', p_time_limit_ms,
        'memoryLimitMb', p_memory_limit_mb
      ),
      'examples', COALESCE(p_examples, '[]'::jsonb),
      'starterCodes', COALESCE(p_starter_codes, '{}'::jsonb),
      'testCases', COALESCE(p_test_cases, '[]'::jsonb)
    ),
    p_admin_id,
    p_change_summary,
    timezone('utc'::text, now())
  );

  SELECT jsonb_build_object(
    'success', true,
    'problemId', p_id,
    'version', v_next_version
  ) INTO v_result;

  RETURN v_result;
END;
$$;

-- -------------------------------------------------------------------------
-- 17. Security Hardening: Lock down RPCs and all 6 new tables (RLS + Grants)
-- Prevents direct browser/PostgREST reads or writes of hidden test cases,
-- revision snapshots, starter code, examples, and migration quarantine logs.
-- -------------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.save_question_atomic(TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, JSONB, JSONB, JSONB, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.save_question_atomic(TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, JSONB, JSONB, JSONB, TEXT, TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.save_question_atomic(TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, JSONB, JSONB, JSONB, TEXT, TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.save_question_atomic(TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, JSONB, JSONB, JSONB, TEXT, TEXT) TO service_role;

REVOKE ALL ON FUNCTION public.safe_jsonb_convert(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.safe_jsonb_convert(TEXT) TO service_role;

ALTER TABLE public."ProblemExample" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProblemTestCase" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProblemStarterCode" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProblemRevision" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProblemMigrationJsonAudit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."OrphanedTestCaseAudit" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public."ProblemExample" FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public."ProblemTestCase" FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public."ProblemStarterCode" FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public."ProblemRevision" FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public."ProblemMigrationJsonAudit" FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public."OrphanedTestCaseAudit" FROM PUBLIC, anon, authenticated;

REVOKE ALL ON TABLE public."ProblemExample" FROM service_role;
REVOKE ALL ON TABLE public."ProblemTestCase" FROM service_role;
REVOKE ALL ON TABLE public."ProblemStarterCode" FROM service_role;
REVOKE ALL ON TABLE public."ProblemRevision" FROM service_role;
REVOKE ALL ON TABLE public."ProblemMigrationJsonAudit" FROM service_role;
REVOKE ALL ON TABLE public."OrphanedTestCaseAudit" FROM service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."ProblemExample" TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."ProblemTestCase" TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."ProblemStarterCode" TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."ProblemRevision" TO service_role;
GRANT SELECT, INSERT ON TABLE public."ProblemMigrationJsonAudit" TO service_role;
GRANT SELECT, INSERT ON TABLE public."OrphanedTestCaseAudit" TO service_role;

-- Explicit service_role-only RLS policies (zero policies for anon/authenticated)
DROP POLICY IF EXISTS "service_role_all_problem_example" ON public."ProblemExample";
CREATE POLICY "service_role_all_problem_example" ON public."ProblemExample" FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_problem_test_case" ON public."ProblemTestCase";
CREATE POLICY "service_role_all_problem_test_case" ON public."ProblemTestCase" FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_problem_starter_code" ON public."ProblemStarterCode";
CREATE POLICY "service_role_all_problem_starter_code" ON public."ProblemStarterCode" FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_problem_revision" ON public."ProblemRevision";
CREATE POLICY "service_role_all_problem_revision" ON public."ProblemRevision" FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_json_audit" ON public."ProblemMigrationJsonAudit";
CREATE POLICY "service_role_all_json_audit" ON public."ProblemMigrationJsonAudit" FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_orphan_audit" ON public."OrphanedTestCaseAudit";
CREATE POLICY "service_role_all_orphan_audit" ON public."OrphanedTestCaseAudit" FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Fail-closed check: verify RLS is enabled and browser roles hold zero privileges
DO $$
DECLARE
  v_unprotected_rls INTEGER;
  v_exposed_grants INTEGER;
  v_missing_service_grants INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_unprotected_rls
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname IN (
      'ProblemExample',
      'ProblemTestCase',
      'ProblemStarterCode',
      'ProblemRevision',
      'ProblemMigrationJsonAudit',
      'OrphanedTestCaseAudit'
    )
    AND c.relrowsecurity IS DISTINCT FROM true;

  SELECT COUNT(*) INTO v_exposed_grants
  FROM information_schema.role_table_grants
  WHERE table_schema = 'public'
    AND table_name IN (
      'ProblemExample',
      'ProblemTestCase',
      'ProblemStarterCode',
      'ProblemRevision',
      'ProblemMigrationJsonAudit',
      'OrphanedTestCaseAudit'
    )
    AND grantee IN ('PUBLIC', 'anon', 'authenticated');

  SELECT COUNT(DISTINCT table_name) INTO v_missing_service_grants
  FROM information_schema.role_table_grants
  WHERE table_schema = 'public'
    AND table_name IN (
      'ProblemExample',
      'ProblemTestCase',
      'ProblemStarterCode',
      'ProblemRevision',
      'ProblemMigrationJsonAudit',
      'OrphanedTestCaseAudit'
    )
    AND grantee = 'service_role'
    AND privilege_type = 'SELECT';

  IF v_unprotected_rls > 0 OR v_exposed_grants > 0 OR v_missing_service_grants <> 6 THEN
    RAISE EXCEPTION 'Migration aborted: table security invariant failed (unprotected_rls=%, exposed_grants=%, service_tables=%).',
      v_unprotected_rls, v_exposed_grants, v_missing_service_grants;
  END IF;
END $$;

-- 18. Reload PostgREST schema cache so Supabase immediately recognizes the new architecture
NOTIFY pgrst, 'reload schema';

COMMIT;
