-- =========================================================================
-- KalviLearn: Content Manager Account Reconciliation & Verification
-- Target: dhanusree.inbox@gmail.com
--
-- Validates & aligns the 5 core tables + Supabase Auth:
--   1. auth.users (Google OAuth Identity)
--   2. public.users (Application User Record with authUid mapping)
--   3. public.content_managers (Dedicated 1-to-1 CM Profile)
--   4. public.content_manager_assignments (Active GLOBAL Assignment)
--   5. public.content_manager_permissions & public.content_manager_scopes (Legacy/Standardized RBAC)
--
-- Safe, transactional, idempotent, fail-closed execution.
-- Super Admin (sgjitbros@gmail.com) is protected.
-- =========================================================================

-- -------------------------------------------------------------------------
-- PART 1: READ-ONLY PRE-RECONCILIATION DIAGNOSTIC
-- -------------------------------------------------------------------------
SELECT
  'auth.users' AS source_table,
  a.id::text AS id,
  a.email,
  a.email_confirmed_at::text AS detail_1,
  a.raw_app_meta_data->>'provider' AS detail_2
FROM auth.users a
WHERE lower(a.email) = 'dhanusree.inbox@gmail.com'
UNION ALL
SELECT
  'public.users' AS source_table,
  u.id,
  u.email,
  u.role AS detail_1,
  u."authUid"::text AS detail_2
FROM public.users u
WHERE lower(u.email) = 'dhanusree.inbox@gmail.com'
UNION ALL
SELECT
  'public.content_managers' AS source_table,
  cm.id,
  cm.email,
  cm.manager_code AS detail_1,
  cm.user_id AS detail_2
FROM public.content_managers cm
WHERE lower(cm.email) = 'dhanusree.inbox@gmail.com'
UNION ALL
SELECT
  'public.content_manager_assignments' AS source_table,
  cma.id,
  u.email,
  cma.status AS detail_1,
  cma.is_active::text AS detail_2
FROM public.content_manager_assignments cma
JOIN public.users u ON u.id = cma.user_id
WHERE lower(u.email) = 'dhanusree.inbox@gmail.com';


-- -------------------------------------------------------------------------
-- PART 2: TRANSACTIONAL IDEMPOTENT RECONCILIATION
-- -------------------------------------------------------------------------
BEGIN;

DO $$
DECLARE
  v_target_email       CONSTANT TEXT := 'dhanusree.inbox@gmail.com';
  v_super_admin_email  CONSTANT TEXT := 'sgjitbros@gmail.com';
  v_auth_uid           UUID;
  v_auth_confirmed     TIMESTAMPTZ;
  v_app_user_id        TEXT;
  v_existing_auth_uid  UUID;
  v_existing_role      TEXT;
  v_previous_role      TEXT;
  v_super_admin_id     TEXT;
  v_super_admin_role   TEXT;
  v_assignment_id      TEXT;
  v_cm_profile_id      TEXT;
  v_manager_code       TEXT;
  v_now                TIMESTAMPTZ := timezone('utc'::text, now());
  v_inconsistent_count INTEGER;
  v_perm_count         INTEGER;
  v_scope_count        INTEGER;
BEGIN
  -- 1. Safeguard Super Admin Account
  SELECT id, upper(role) INTO v_super_admin_id, v_super_admin_role
  FROM public.users
  WHERE lower(email) = v_super_admin_email
  LIMIT 1;

  IF v_super_admin_id IS NOT NULL AND v_super_admin_role <> 'SUPERADMIN' THEN
    RAISE EXCEPTION 'Aborted: Super Admin % has unexpected role %.', v_super_admin_email, v_super_admin_role;
  END IF;

  -- 2. Inspect Supabase Auth Identity
  SELECT a.id, a.email_confirmed_at
  INTO v_auth_uid, v_auth_confirmed
  FROM auth.users a
  WHERE lower(a.email) = v_target_email
  LIMIT 1;

  -- 3. Resolve or Create public.users Row
  SELECT id, "authUid", upper(role)
  INTO v_app_user_id, v_existing_auth_uid, v_existing_role
  FROM public.users
  WHERE lower(email) = v_target_email
  LIMIT 1;

  IF v_app_user_id IS NULL THEN
    v_app_user_id := gen_random_uuid()::text;
    v_previous_role := 'STUDENT';

    INSERT INTO public.users (
      "id", "email", "name", "role", "status", "authUid", "createdAt", "updatedAt"
    ) VALUES (
      v_app_user_id, v_target_email, 'Dhanusree', 'CONTENT_MANAGER', 'ACTIVE', v_auth_uid, v_now, v_now
    );
  ELSE
    v_previous_role := CASE
      WHEN v_existing_role IN ('STUDENT', 'MENTOR', 'CAMPUS_MANAGER') THEN v_existing_role
      ELSE 'STUDENT'
    END;

    UPDATE public.users
    SET
      role = 'CONTENT_MANAGER',
      status = 'ACTIVE',
      "authUid" = coalesce(v_existing_auth_uid, v_auth_uid),
      "updatedAt" = v_now
    WHERE id = v_app_user_id;
  END IF;

  -- 4. Reconcile Dedicated public.content_managers Profile
  SELECT id, manager_code INTO v_cm_profile_id, v_manager_code
  FROM public.content_managers
  WHERE user_id = v_app_user_id OR lower(email) = v_target_email
  LIMIT 1;

  IF v_manager_code IS NULL OR v_manager_code = '' THEN
    v_manager_code := 'CM-' || upper(substr(md5(v_app_user_id || v_target_email), 1, 6));
  END IF;

  IF v_cm_profile_id IS NULL THEN
    INSERT INTO public.content_managers (
      id, user_id, name, email, manager_code, department, designation, created_at, updated_at
    ) VALUES (
      gen_random_uuid()::text,
      v_app_user_id,
      'Dhanusree',
      v_target_email,
      v_manager_code,
      'Curriculum & Coding',
      'Content Manager',
      v_now,
      v_now
    );
  ELSE
    UPDATE public.content_managers
    SET
      user_id = v_app_user_id,
      email = v_target_email,
      manager_code = coalesce(v_manager_code, manager_code),
      department = coalesce(department, 'Curriculum & Coding'),
      designation = coalesce(designation, 'Content Manager'),
      updated_at = v_now
    WHERE id = v_cm_profile_id;
  END IF;

  -- 5. Reconcile public.content_manager_assignments (GLOBAL & ACTIVE)
  SELECT id INTO v_assignment_id
  FROM public.content_manager_assignments
  WHERE user_id = v_app_user_id
  LIMIT 1;

  IF v_assignment_id IS NULL THEN
    v_assignment_id := gen_random_uuid()::text;
    INSERT INTO public.content_manager_assignments (
      id, user_id, previous_role, scope_type, status, is_active,
      granted_by, granted_at, updated_by, notes, created_at, updated_at
    ) VALUES (
      v_assignment_id,
      v_app_user_id,
      v_previous_role,
      'GLOBAL',
      'ACTIVE',
      true,
      v_super_admin_email,
      v_now,
      v_super_admin_email,
      'Content Manager profile authorization reconciliation',
      v_now,
      v_now
    );
  ELSE
    UPDATE public.content_manager_assignments
    SET
      scope_type = 'GLOBAL',
      status = 'ACTIVE',
      is_active = true,
      granted_by = coalesce(granted_by, v_super_admin_email),
      granted_at = coalesce(granted_at, v_now),
      suspended_by = NULL,
      suspended_at = NULL,
      suspension_reason = NULL,
      revoked_by = NULL,
      revoked_at = NULL,
      updated_by = v_super_admin_email,
      updated_at = v_now
    WHERE id = v_assignment_id;
  END IF;

  -- 6. Reconcile Legacy RBAC Tables If Present (Non-destructive)
  IF to_regclass('public.content_manager_permissions') IS NOT NULL THEN
    INSERT INTO public.content_manager_permissions (id, assignment_id, permission, created_at)
    SELECT
      gen_random_uuid()::text,
      v_assignment_id,
      p.perm,
      v_now
    FROM (
      VALUES
        ('content.dashboard.view'),
        ('content.curriculum.view'),
        ('content.curriculum.create'),
        ('content.curriculum.update'),
        ('content.curriculum.reorder'),
        ('content.learning_unit.view'),
        ('content.learning_unit.create'),
        ('content.learning_unit.update'),
        ('content.learning_unit.reorder'),
        ('content.learning_unit.publish'),
        ('content.learning_unit.delete'),
        ('content.question.view'),
        ('content.question.create'),
        ('content.question.update'),
        ('content.question.duplicate'),
        ('content.question.preview'),
        ('content.question.run_tests'),
        ('content.question.publish'),
        ('content.question.archive'),
        ('content.question.delete'),
        ('content.example.manage'),
        ('content.test_case.manage'),
        ('content.hidden_test_case.manage'),
        ('content.starter_code.manage'),
        ('content.revision.view_own'),
        ('content.revision.view_all'),
        ('content.revision.restore')
    ) AS p(perm)
    WHERE NOT EXISTS (
      SELECT 1 FROM public.content_manager_permissions cmp
      WHERE cmp.assignment_id = v_assignment_id AND cmp.permission = p.perm
    );
  END IF;

  IF to_regclass('public.content_manager_scopes') IS NOT NULL THEN
    INSERT INTO public.content_manager_scopes (id, assignment_id, scope_type, created_at)
    SELECT gen_random_uuid()::text, v_assignment_id, 'GLOBAL', v_now
    WHERE NOT EXISTS (
      SELECT 1 FROM public.content_manager_scopes cms
      WHERE cms.assignment_id = v_assignment_id AND cms.scope_type = 'GLOBAL'
    );
  END IF;

  -- 7. Audit Log
  IF to_regclass('public.content_audit_logs') IS NOT NULL THEN
    INSERT INTO public.content_audit_logs (
      id, actor_user_id, actor_email, actor_role, action,
      resource_type, resource_id, resource_label,
      previous_values, updated_values, change_summary, created_at
    ) VALUES (
      gen_random_uuid()::text,
      coalesce(v_super_admin_id, v_super_admin_email),
      v_super_admin_email,
      'SUPERADMIN',
      'RECONCILE_CONTENT_MANAGER',
      'CONTENT_MANAGER_ACCESS',
      v_app_user_id,
      v_target_email,
      jsonb_build_object('role', v_existing_role),
      jsonb_build_object('role', 'CONTENT_MANAGER', 'status', 'ACTIVE', 'isActive', true, 'scopeType', 'GLOBAL', 'authUid', v_auth_uid),
      format('Reconciled Content Manager authorization and profile alignment for %s', v_target_email),
      v_now
    );
  END IF;

  -- 8. Fail-Closed Invariant Assertions
  SELECT COUNT(*) INTO v_inconsistent_count
  FROM public.users u
  WHERE lower(u.email) = v_target_email
    AND (u.role <> 'CONTENT_MANAGER' OR u.status <> 'ACTIVE');

  IF v_inconsistent_count > 0 THEN
    RAISE EXCEPTION 'Aborted: users table invariant failed for %.', v_target_email;
  END IF;

  SELECT COUNT(*) INTO v_inconsistent_count
  FROM public.content_manager_assignments
  WHERE user_id = v_app_user_id
    AND (status <> 'ACTIVE' OR is_active IS DISTINCT FROM true OR scope_type <> 'GLOBAL');

  IF v_inconsistent_count > 0 THEN
    RAISE EXCEPTION 'Aborted: content_manager_assignments invariant failed for %.', v_target_email;
  END IF;

  SELECT COUNT(*) INTO v_inconsistent_count
  FROM public.content_managers
  WHERE user_id = v_app_user_id AND lower(email) = v_target_email;

  IF v_inconsistent_count <> 1 THEN
    RAISE EXCEPTION 'Aborted: expected exactly 1 content_managers profile row for %, found %.', v_target_email, v_inconsistent_count;
  END IF;
END $$;

COMMIT;


-- -------------------------------------------------------------------------
-- PART 3: READ-ONLY POST-RECONCILIATION VERIFICATION
-- -------------------------------------------------------------------------
SELECT
  u.id AS app_user_id,
  u.email AS user_email,
  u."authUid" AS linked_auth_uid,
  u.role AS user_role,
  u.status AS user_status,
  cm.id AS content_manager_profile_id,
  cm.manager_code,
  cm.department,
  cm.designation,
  cma.id AS assignment_id,
  cma.scope_type,
  cma.status AS assignment_status,
  cma.is_active AS assignment_is_active,
  (SELECT COUNT(*) FROM public.content_manager_permissions p WHERE p.assignment_id = cma.id) AS permission_count,
  (SELECT COUNT(*) FROM public.content_manager_scopes s WHERE s.assignment_id = cma.id) AS scope_count
FROM public.users u
JOIN public.content_manager_assignments cma ON cma.user_id = u.id
JOIN public.content_managers cm ON cm.user_id = u.id
WHERE lower(u.email) = 'dhanusree.inbox@gmail.com';

