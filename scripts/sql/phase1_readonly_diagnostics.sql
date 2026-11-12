-- =========================================================================
-- KalviLearn Phase 1 Read-Only Production Audit Diagnostics
-- Target Supabase Project Reference: iavxnhwbgoarnexmyxpn
-- Execute in Supabase SQL Editor (READ ONLY - makes zero changes)
-- =========================================================================

-- A. Identity Infrastructure
SELECT
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'authUid'
  ) AS has_auth_uid_column,
  EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname = 'public' AND tablename = 'users' AND indexname = 'users_authuid_key'
  ) AS has_auth_uid_unique_index,
  to_regprocedure('public.users_link_identity()') IS NOT NULL AS has_users_link_identity_fn,
  to_regprocedure('public.auth_identity_link_user()') IS NOT NULL AS has_auth_identity_link_user_fn,
  EXISTS (
    SELECT 1 FROM pg_trigger t JOIN pg_class c ON c.oid = t.tgrelid JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'users' AND t.tgname = 'trg_users_link_identity' AND NOT t.tgisinternal
  ) AS has_trg_users_link_identity,
  EXISTS (
    SELECT 1 FROM pg_trigger t JOIN pg_class c ON c.oid = t.tgrelid JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth' AND c.relname = 'identities' AND t.tgname = 'trg_auth_identity_link_user' AND NOT t.tgisinternal
  ) AS has_trg_auth_identity_link_user;

-- B. User Role Constraint & Current Distinct Roles
SELECT conname, pg_get_constraintdef(c.oid) AS definition
FROM pg_constraint c
JOIN pg_class t ON t.oid = c.conrelid
JOIN pg_namespace n ON n.oid = t.relnamespace
WHERE n.nspname = 'public' AND t.relname = 'users' AND c.contype = 'c';

SELECT upper(role) AS role, COUNT(*) AS user_count
FROM public.users
GROUP BY upper(role)
ORDER BY role;

-- C. Security Infrastructure (RLS, Policies, Triggers, Grants on public.users)
SELECT relrowsecurity AS rls_enabled, relforcerowsecurity AS rls_forced
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relname = 'users';

SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'users'
ORDER BY policyname;

SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public' AND table_name = 'users'
  AND grantee IN ('PUBLIC', 'anon', 'authenticated', 'service_role')
ORDER BY grantee, privilege_type;

-- D. Content Manager State & Target Account Check
SELECT
  a.id AS assignment_id,
  a.user_id,
  u.email,
  u.role AS user_role,
  u.status AS user_status,
  a.previous_role,
  a.scope_type,
  a.status AS assignment_status,
  a.is_active,
  a.granted_by,
  a.granted_at
FROM public.content_manager_assignments a
LEFT JOIN public.users u ON u.id = a.user_id
ORDER BY a.created_at DESC;

SELECT
  a.id AS auth_uid,
  a.email,
  a.email_confirmed_at,
  i.provider,
  u.id AS app_user_id,
  u.role AS app_role,
  u.status AS app_status
FROM auth.users a
LEFT JOIN auth.identities i ON i.user_id = a.id AND i.provider = 'google'
LEFT JOIN public.users u ON lower(u.email) = lower(a.email)
WHERE lower(a.email) IN ('abcdefdfdd@gmail.com', 'sgjitbros@gmail.com');

-- E. 20261006 Migration Completeness Spot-Check
SELECT
  to_regprocedure('public.app_current_user_id()') IS NOT NULL AS has_app_current_user_id,
  to_regprocedure('public.guard_users_update()') IS NOT NULL AS has_guard_users_update,
  to_regprocedure('public.campus_overview_metrics()') IS NOT NULL AS has_campus_overview_metrics,
  to_regclass('public.api_rate_limits') IS NOT NULL AS has_api_rate_limits,
  to_regprocedure('public.rate_limit_hit(text, integer, integer)') IS NOT NULL AS has_rate_limit_hit,
  to_regclass('public.content_managers') IS NOT NULL AS has_content_managers_table;

