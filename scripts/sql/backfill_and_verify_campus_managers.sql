-- =========================================================================
-- KalviLearn: Candidate Preview & Backfill Verification
-- Migration: 20261117_dedicated_campus_managers_table
-- Read-only verification queries.
-- =========================================================================

-- =========================================================================
-- PART 1: READ-ONLY CANDIDATE PREVIEW QUERY
-- Uses the exact same eligibility conditions as the migration.
-- Identifies every eligible user and provides qualification rationale.
-- =========================================================================
SELECT
  u."id" AS user_id,
  u."email" AS user_email,
  u."name" AS user_name,
  u."role" AS user_role,
  u."status" AS user_status,
  u."campus_id" AS user_campus_id,
  c."id" AS managed_campus_id,
  c."name" AS managed_campus_name,
  CASE
    WHEN upper(u."role") = 'CAMPUS_MANAGER' THEN 'EXPLICIT_CAMPUS_MANAGER_ROLE'
    WHEN c."id" IS NOT NULL THEN 'CAMPUS_MANAGER_ASSIGNED_IN_CAMPUSES_TABLE'
    WHEN upper(u."role") = 'ADMIN' AND u."campus_id" IS NOT NULL THEN 'LEGACY_ADMIN_WITH_CAMPUS_MAPPING'
    ELSE 'CONFIRMED_CAMPUS_ASSOCIATION'
  END AS qualification_reason
FROM public."users" u
LEFT JOIN public."campuses" c ON c."manager_id" = u."id"
WHERE lower(trim(u."email")) <> 'sgjitbros@gmail.com'
  AND upper(coalesce(u."role", '')) <> 'SUPERADMIN'
  AND (
    upper(u."role") = 'CAMPUS_MANAGER'
    OR u."id" IN (
      SELECT DISTINCT c2."manager_id"
      FROM public."campuses" c2
      WHERE c2."manager_id" IS NOT NULL
    )
    OR (
      upper(u."role") = 'ADMIN'
      AND (
        u."campus_id" IS NOT NULL
        OR EXISTS (
          SELECT 1
          FROM public."campuses" c3
          WHERE c3."manager_id" = u."id"
        )
      )
    )
  )
ORDER BY u."email";


-- =========================================================================
-- PART 2: POST-MIGRATION BACKFILL VERIFICATION & INTEGRITY AUDIT
-- =========================================================================

-- 1. Check table existence, columns, and data types
SELECT
  table_schema,
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'campus_managers'
ORDER BY ordinal_position;

-- 2. Check indexes on public.campus_managers
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'campus_managers'
ORDER BY indexname;

-- 3. Check Row Level Security (RLS) is enabled
SELECT
  c.relname AS table_name,
  c.relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname = 'campus_managers';

-- 4. Verify 1-to-1 profile synchronization for every eligible candidate
SELECT
  u.id AS user_id,
  u.email AS user_email,
  u.name AS user_name,
  u.role AS user_role,
  u.status AS user_status,
  u.campus_id AS user_campus_id,
  c.id AS managed_campus_id,
  c.name AS managed_campus_name,
  cm.id AS campus_manager_profile_id,
  cm.manager_code,
  cm.department,
  cm.designation,
  cm.created_at AS profile_created_at,
  CASE
    WHEN cm.id IS NOT NULL THEN 'SYNCED'
    ELSE 'MISSING_PROFILE'
  END AS synchronization_status
FROM public.users u
LEFT JOIN public.campuses c ON c.manager_id = u.id
LEFT JOIN public.campus_managers cm ON cm.user_id = u.id
WHERE lower(trim(u.email)) <> 'sgjitbros@gmail.com'
  AND upper(coalesce(u.role, '')) <> 'SUPERADMIN'
  AND (
    upper(u.role) = 'CAMPUS_MANAGER'
    OR c.id IS NOT NULL
    OR (upper(u.role) = 'ADMIN' AND u.campus_id IS NOT NULL)
  )
ORDER BY u.email;

-- 5. CRITICAL: Confirm protected Super Admin (sgjitbros@gmail.com) has NO profile
SELECT
  u.id AS user_id,
  u.email AS user_email,
  u.role AS user_role,
  cm.id AS accidental_profile_id,
  CASE
    WHEN cm.id IS NULL THEN 'SECURELY_EXCLUDED'
    ELSE 'VIOLATION_SUPERADMIN_PROFILE_FOUND'
  END AS superadmin_protection_status
FROM public.users u
LEFT JOIN public.campus_managers cm ON cm.user_id = u.id
WHERE lower(trim(u.email)) = 'sgjitbros@gmail.com';

-- 6. Confirm NO user with SUPERADMIN role has a campus_managers profile
SELECT
  u.id AS user_id,
  u.email AS user_email,
  u.role AS user_role,
  cm.id AS accidental_profile_id,
  CASE
    WHEN cm.id IS NULL THEN 'SECURELY_EXCLUDED'
    ELSE 'VIOLATION_SUPERADMIN_ROLE_PROFILE_FOUND'
  END AS role_protection_status
FROM public.users u
LEFT JOIN public.campus_managers cm ON cm.user_id = u.id
WHERE upper(coalesce(u.role, '')) = 'SUPERADMIN';

-- 7. Confirm unrelated ADMIN accounts (no campus mapping) are NOT assigned a profile
SELECT
  u.id AS user_id,
  u.email AS user_email,
  u.role AS user_role,
  u.campus_id,
  cm.id AS accidental_profile_id,
  CASE
    WHEN cm.id IS NULL THEN 'CORRECTLY_EXCLUDED'
    ELSE 'ACCIDENTAL_PROFILE_FOUND'
  END AS admin_exclusion_status
FROM public.users u
LEFT JOIN public.campuses c ON c.manager_id = u.id
LEFT JOIN public.campus_managers cm ON cm.user_id = u.id
WHERE upper(u.role) = 'ADMIN'
  AND u.campus_id IS NULL
  AND c.id IS NULL
ORDER BY u.email;

-- 8. Confirm no orphaned profiles (profiles without a matching user)
SELECT
  cm.id AS orphaned_profile_id,
  cm.user_id,
  cm.email
FROM public.campus_managers cm
LEFT JOIN public.users u ON u.id = cm.user_id
WHERE u.id IS NULL;
