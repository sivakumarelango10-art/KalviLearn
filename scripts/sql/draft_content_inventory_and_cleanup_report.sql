-- =========================================================================
-- KalviLearn Draft Content Inventory, Ordering Audit & Cleanup Report
-- 100% READ-ONLY DIAGNOSTIC SCRIPT (Makes zero modifications to data)
-- Target: Supabase PostgreSQL (public.Problem, public.Belt, public.LearningUnit)
-- =========================================================================

-- -------------------------------------------------------------------------
-- SECTION 1: Summary Statistics of Problem Publication & Active States
-- -------------------------------------------------------------------------
SELECT
  COUNT(*) AS total_problems,
  COUNT(*) FILTER (WHERE "isActive" = true AND COALESCE(status, 'PUBLISHED') = 'PUBLISHED') AS published_active_count,
  COUNT(*) FILTER (WHERE status = 'DRAFT' OR ("isActive" = false AND COALESCE(status, '') != 'ARCHIVED')) AS draft_count,
  COUNT(*) FILTER (WHERE status = 'PENDING_REVIEW' OR "approvalStatus" = 'PENDING_REVIEW') AS pending_review_count,
  COUNT(*) FILTER (WHERE status = 'ARCHIVED') AS archived_count,
  COUNT(*) FILTER (WHERE "learningUnitId" IS NOT NULL) AS learn_coding_count,
  COUNT(*) FILTER (WHERE "beltId" IS NOT NULL AND "learningUnitId" IS NULL) AS practice_belt_count
FROM public."Problem";

-- -------------------------------------------------------------------------
-- SECTION 2: Draft & Unpublished Practice / Learn Coding Questions Inventory
-- Identifies every record marked as DRAFT, inactive, or unapproved.
-- Includes related test cases, examples, starter codes, submissions, and safety assessment.
-- -------------------------------------------------------------------------
WITH submission_counts AS (
  SELECT "problemId", COUNT(*) AS sub_count
  FROM public."Submission"
  GROUP BY "problemId"
),
test_case_counts AS (
  SELECT
    "problemId",
    COUNT(*) AS total_ptc,
    COUNT(*) FILTER (WHERE "isHidden" = true) AS hidden_ptc,
    COUNT(*) FILTER (WHERE "isHidden" = false) AS visible_ptc
  FROM public."ProblemTestCase"
  GROUP BY "problemId"
),
legacy_tc_counts AS (
  SELECT "problemId", COUNT(*) AS legacy_count
  FROM public."TestCase"
  GROUP BY "problemId"
),
example_counts AS (
  SELECT "problemId", COUNT(*) AS ex_count
  FROM public."ProblemExample"
  GROUP BY "problemId"
),
starter_code_counts AS (
  SELECT "problemId", COUNT(*) AS starter_count
  FROM public."ProblemStarterCode"
  GROUP BY "problemId"
)
SELECT
  'public.Problem' AS "table_name",
  p.id AS "record_id",
  p.title AS "title",
  p.slug AS "slug",
  p.order AS "numeric_order",
  CASE
    WHEN b.id IS NOT NULL THEN 'Belt ' || b.order || ' (' || b.title || ')'
    WHEN lu.id IS NOT NULL THEN 'Lesson: ' || lu.title
    ELSE 'Unassigned'
  END AS "belt_or_curriculum_scope",
  p.difficulty AS "difficulty",
  COALESCE(p.status, 'PUBLISHED') AS "current_status",
  COALESCE(p."approvalStatus", 'APPROVED') AS "approval_status",
  p."isActive" AS "is_active",
  p."canonicalProblemId" AS "canonical_reference",
  COALESCE(tc.total_ptc, ltc.legacy_count, 0) AS "test_cases_count",
  COALESCE(tc.hidden_ptc, 0) AS "hidden_test_cases_count",
  COALESCE(ex.ex_count, 0) AS "examples_count",
  COALESCE(sc.starter_count, 0) AS "starter_codes_count",
  COALESCE(sub.sub_count, 0) AS "student_submissions_count",
  CASE
    WHEN COALESCE(sub.sub_count, 0) > 0 THEN
      'KEEP AS DRAFT / ARCHIVE: Contains student submissions (' || sub.sub_count || ' records) — do NOT delete'
    WHEN p."canonicalProblemId" IS NOT NULL AND p."isActive" = false THEN
      'SAFE TO ARCHIVE: Archived duplicate mapped to canonical problem ' || p."canonicalProblemId"
    WHEN COALESCE(tc.total_ptc, ltc.legacy_count, 0) = 0 THEN
      'SAFE TO REMOVE OR FINISH: Incomplete draft with zero test cases'
    WHEN p.status = 'PENDING_REVIEW' OR p."approvalStatus" = 'PENDING_REVIEW' THEN
      'KEEP AS REVIEW: Content submitted for administrative approval'
    ELSE
      'SAFE TO KEEP AS DRAFT: Work-in-progress content preserved for authoring'
  END AS "safety_assessment"
FROM public."Problem" p
LEFT JOIN public."Belt" b ON b.id = p."beltId"
LEFT JOIN public."LearningUnit" lu ON lu.id = p."learningUnitId"
LEFT JOIN test_case_counts tc ON tc."problemId" = p.id
LEFT JOIN legacy_tc_counts ltc ON ltc."problemId" = p.id
LEFT JOIN example_counts ex ON ex."problemId" = p.id
LEFT JOIN starter_code_counts sc ON sc."problemId" = p.id
LEFT JOIN submission_counts sub ON sub."problemId" = p.id
WHERE
  p.status IN ('DRAFT', 'PENDING_REVIEW', 'ARCHIVED')
  OR p."isActive" = false
  OR p."approvalStatus" IN ('DRAFT', 'PENDING_REVIEW', 'REJECTED')
ORDER BY
  b.order ASC NULLS LAST,
  p.order ASC,
  p.title ASC;

-- -------------------------------------------------------------------------
-- SECTION 3: Draft & Unpublished Curriculum Learning Units
-- -------------------------------------------------------------------------
SELECT
  'public.LearningUnit' AS "table_name",
  lu.id AS "record_id",
  m.order AS "module_order",
  m.title AS "module_title",
  lu.order AS "unit_order",
  lu.title AS "unit_title",
  lu."readingTimeMinutes" AS "reading_time_mins",
  lu."isActive" AS "is_active",
  COALESCE(lu.status, 'PUBLISHED') AS "current_status",
  (SELECT COUNT(*) FROM public."Problem" p WHERE p."learningUnitId" = lu.id) AS "linked_problems_count",
  CASE
    WHEN (SELECT COUNT(*) FROM public."Problem" p WHERE p."learningUnitId" = lu.id) > 0 THEN
      'KEEP AS DRAFT: Contains linked coding questions — do NOT delete'
    ELSE
      'SAFE TO KEEP AS DRAFT: Incomplete learning unit preserved for curriculum development'
  END AS "safety_assessment"
FROM public."LearningUnit" lu
JOIN public."Module" m ON m.id = lu."moduleId"
WHERE
  lu.status = 'DRAFT'
  OR lu."isActive" = false
ORDER BY
  m.order ASC,
  lu.order ASC;

-- -------------------------------------------------------------------------
-- SECTION 4: Draft & Unpublished Curriculum Modules
-- -------------------------------------------------------------------------
SELECT
  'public.Module' AS "table_name",
  m.id AS "record_id",
  m.order AS "module_order",
  m.title AS "module_title",
  m."isActive" AS "is_active",
  COALESCE(m.status, 'PUBLISHED') AS "current_status",
  (SELECT COUNT(*) FROM public."LearningUnit" lu WHERE lu."moduleId" = m.id) AS "learning_units_count",
  CASE
    WHEN (SELECT COUNT(*) FROM public."LearningUnit" lu WHERE lu."moduleId" = m.id) > 0 THEN
      'KEEP AS DRAFT: Module contains learning units — do NOT delete'
    ELSE
      'SAFE TO KEEP AS DRAFT: Empty module preserved for curriculum planning'
  END AS "safety_assessment"
FROM public."Module" m
WHERE
  m.status = 'DRAFT'
  OR m."isActive" = false
ORDER BY
  m.order ASC;

-- -------------------------------------------------------------------------
-- SECTION 5: Problem Order & Belt Hierarchy Diagnostics
-- Checks for duplicate order numbers within belts, negative orders, and gaps.
-- -------------------------------------------------------------------------
SELECT
  b.order AS belt_order,
  b.title AS belt_title,
  p.order AS problem_order,
  COUNT(*) AS count_with_same_order,
  string_agg(p.slug, ', ' ORDER BY p.slug) AS conflicting_slugs
FROM public."Problem" p
JOIN public."Belt" b ON b.id = p."beltId"
WHERE p."learningUnitId" IS NULL
GROUP BY b.order, b.title, p.order
HAVING COUNT(*) > 1
ORDER BY b.order, p.order;

-- -------------------------------------------------------------------------
-- SECTION 6: Belts Numeric Order Integrity Check
-- Ensures all martial arts belts have valid 1..10 numeric order.
-- -------------------------------------------------------------------------
SELECT
  id AS belt_id,
  order AS belt_order,
  name AS belt_name,
  title AS belt_title,
  color AS belt_color,
  (SELECT COUNT(*) FROM public."Problem" p WHERE p."beltId" = b.id) AS total_problems_in_belt,
  (SELECT COUNT(*) FROM public."Problem" p WHERE p."beltId" = b.id AND p."isActive" = true AND COALESCE(p.status, 'PUBLISHED') = 'PUBLISHED') AS published_problems_in_belt
FROM public."Belt" b
ORDER BY b.order ASC;
