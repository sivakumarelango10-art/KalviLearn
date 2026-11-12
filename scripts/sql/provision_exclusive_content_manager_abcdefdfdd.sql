-- =========================================================================
-- KalviLearn Phase 3 & 4: Provision & Exclusively Activate Content Manager
-- Target Account: abcdefdfdd@gmail.com (Auth UID: f7d6f8a8-846f-41ba-a246-6ae10ee98be1)
-- Prerequisite: Run 20261114_identity_linking_and_role_repair FIRST.
-- Execute in Supabase SQL Editor for project iavxnhwbgoarnexmyxpn.
-- =========================================================================

BEGIN;

DO $$
DECLARE
  v_target_email       CONSTANT TEXT := 'abcdefdfdd@gmail.com';
  v_expected_auth_uid  CONSTANT UUID := 'f7d6f8a8-846f-41ba-a246-6ae10ee98be1'::uuid;
  v_super_admin_email  CONSTANT TEXT := 'sgjitbros@gmail.com';
  v_auth_uid           UUID;
  v_auth_confirmed     TIMESTAMPTZ;
  v_has_google_id      BOOLEAN;
  v_app_user_id        TEXT;
  v_existing_auth_uid  UUID;
  v_existing_role      TEXT;
  v_previous_role      TEXT;
  v_super_admin_id     TEXT;
  v_super_admin_role   TEXT;
  v_other              RECORD;
  v_restored_role      TEXT;
  v_inconsistent_count INTEGER;
  v_active_count       INTEGER;
  v_other_active_count INTEGER;
  v_target_is_active   BOOLEAN;
  v_target_assign_id   TEXT;
  v_now                TIMESTAMPTZ := timezone('utc'::text, now());
BEGIN
  -- -----------------------------------------------------------------------
  -- 0. Verify Repair Migration Prerequisites
  -- -----------------------------------------------------------------------
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'authUid'
  ) OR to_regprocedure('public.users_link_identity()') IS NULL THEN
    RAISE EXCEPTION 'Aborted: execute 20261114_identity_linking_and_role_repair first.';
  END IF;

  IF to_regclass('public.content_manager_assignments') IS NULL
     OR to_regclass('public.content_audit_logs') IS NULL
     OR to_regclass('public.content_managers') IS NULL THEN
    RAISE EXCEPTION 'Aborted: Content Manager tables (including public.content_managers) missing.';
  END IF;

  -- Verify Super Admin safety
  SELECT id, upper(role) INTO v_super_admin_id, v_super_admin_role
  FROM public.users
  WHERE lower(email) = v_super_admin_email
  LIMIT 1;

  IF v_super_admin_id IS NOT NULL AND v_super_admin_role <> 'SUPERADMIN' THEN
    RAISE EXCEPTION 'Aborted: Super Admin % has unexpected role %.', v_super_admin_email, v_super_admin_role;
  END IF;

  -- -----------------------------------------------------------------------
  -- 1. Verify Target Supabase Auth Identity (Confirmed Google Account)
  -- -----------------------------------------------------------------------
  SELECT a.id, a.email_confirmed_at
  INTO v_auth_uid, v_auth_confirmed
  FROM auth.users a
  WHERE lower(a.email) = v_target_email
  LIMIT 1;

  IF v_auth_uid IS NULL THEN
    RAISE EXCEPTION 'Aborted: Auth user % does not exist in auth.users.', v_target_email;
  END IF;
  IF v_auth_uid <> v_expected_auth_uid THEN
    RAISE EXCEPTION 'Aborted: Auth UID mismatch for % (expected %, found %).', v_target_email, v_expected_auth_uid, v_auth_uid;
  END IF;
  IF v_auth_confirmed IS NULL THEN
    RAISE EXCEPTION 'Aborted: Auth user % email is not confirmed.', v_target_email;
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM auth.identities i
    WHERE i.user_id = v_auth_uid AND i.provider = 'google'
  ) INTO v_has_google_id;

  IF NOT v_has_google_id THEN
    RAISE EXCEPTION 'Aborted: Confirmed Google identity missing for Auth UID %.', v_auth_uid;
  END IF;

  -- -----------------------------------------------------------------------
  -- 2. Phase 3: Provision Application Profile with Separate App User ID
  --    Initial baseline role = STUDENT; trg_users_link_identity binds authUid.
  -- -----------------------------------------------------------------------
  SELECT id, "authUid", upper(role)
  INTO v_app_user_id, v_existing_auth_uid, v_existing_role
  FROM public.users
  WHERE lower(email) = v_target_email OR "authUid" = v_auth_uid
  LIMIT 1;

  IF v_app_user_id IS NULL THEN
    v_app_user_id := gen_random_uuid()::text;
    v_previous_role := 'STUDENT';

    INSERT INTO public.users ("id", "email", "name", "role", "status", "createdAt", "updatedAt")
    VALUES (v_app_user_id, v_target_email, 'Content Manager', 'STUDENT', 'ACTIVE', v_now, v_now);

    SELECT "authUid" INTO v_existing_auth_uid
    FROM public.users
    WHERE id = v_app_user_id;
  ELSE
    IF v_existing_auth_uid IS NOT NULL AND v_existing_auth_uid <> v_auth_uid THEN
      RAISE EXCEPTION 'Aborted: existing public.users row % is already linked to different authUid %.', v_app_user_id, v_existing_auth_uid;
    END IF;
    v_previous_role := CASE
      WHEN v_existing_role IN ('STUDENT', 'MENTOR', 'CAMPUS_MANAGER') THEN v_existing_role
      ELSE 'STUDENT'
    END;
  END IF;

  IF v_app_user_id = v_auth_uid::text THEN
    RAISE EXCEPTION 'Aborted: application users.id must remain distinct from auth.users.id.';
  END IF;
  IF v_existing_auth_uid <> v_auth_uid THEN
    RAISE EXCEPTION 'Aborted: trusted identity trigger did not link authUid (got %).', v_existing_auth_uid;
  END IF;

  -- -----------------------------------------------------------------------
  -- 3. Phase 4A: Revoke Any Other Active/Non-Revoked Content Managers Safely
  -- -----------------------------------------------------------------------
  -- -----------------------------------------------------------------------
  -- 3. Phase 4A: Detect Inconsistent States & Revoke Other ACTIVE Managers
  --    - Fails closed if any assignment has status/is_active mismatch.
  --    - Preserves SUSPENDED, INVITED, and already REVOKED assignments.
  --    - Preserves all content_managers profile records.
  -- -----------------------------------------------------------------------
  SELECT COUNT(*) INTO v_inconsistent_count
  FROM public.content_manager_assignments
  WHERE NOT (
    (status = 'ACTIVE' AND is_active = true) OR
    (status IN ('SUSPENDED', 'INVITED', 'REVOKED') AND is_active = false)
  );

  IF v_inconsistent_count > 0 THEN
    RAISE EXCEPTION 'Aborted: % inconsistent content_manager_assignments row(s) detected (status/is_active mismatch). Manual review required before provisioning.', v_inconsistent_count;
  END IF;

  FOR v_other IN
    SELECT
      a.id AS assignment_id,
      a.user_id,
      a.previous_role,
      a.status AS assignment_status,
      a.is_active,
      u.email,
      upper(u.role) AS current_role
    FROM public.content_manager_assignments a
    JOIN public.users u ON u.id = a.user_id
    WHERE a.user_id <> v_app_user_id
      AND a.status = 'ACTIVE'
      AND a.is_active = true
  LOOP
    IF lower(v_other.email) = v_super_admin_email OR v_other.current_role = 'SUPERADMIN' THEN
      RAISE EXCEPTION 'Aborted: refusing to modify Super Admin account %.', v_other.email;
    END IF;

    v_restored_role := CASE
      WHEN upper(coalesce(v_other.previous_role, '')) IN ('STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN')
        THEN upper(v_other.previous_role)
      ELSE 'STUDENT'
    END;

    UPDATE public.content_manager_assignments
    SET
      status = 'REVOKED',
      is_active = false,
      revoked_by = v_super_admin_email,
      revoked_at = v_now,
      updated_by = v_super_admin_email,
      updated_at = v_now
    WHERE id = v_other.assignment_id;

    IF v_other.current_role = 'CONTENT_MANAGER' THEN
      UPDATE public.users
      SET role = v_restored_role, "updatedAt" = v_now
      WHERE id = v_other.user_id;
    END IF;

    INSERT INTO public.content_audit_logs (
      id, actor_user_id, actor_email, actor_role, action,
      resource_type, resource_id, resource_label,
      previous_values, updated_values, change_summary, created_at
    ) VALUES (
      gen_random_uuid()::text,
      coalesce(v_super_admin_id, v_super_admin_email),
      v_super_admin_email,
      'SUPERADMIN',
      'REVOKE_CONTENT_MANAGER',
      'CONTENT_MANAGER_ACCESS',
      v_other.user_id,
      v_other.email,
      jsonb_build_object('status', v_other.assignment_status, 'isActive', v_other.is_active, 'role', v_other.current_role),
      jsonb_build_object('status', 'REVOKED', 'isActive', false, 'restoredRole', CASE WHEN v_other.current_role = 'CONTENT_MANAGER' THEN v_restored_role ELSE v_other.current_role END),
      format('Revoked prior Content Manager access for %s while enforcing exclusive access for %s', v_other.email, v_target_email),
      v_now
    );
  END LOOP;

  -- -----------------------------------------------------------------------
  -- 4. Phase 4B: Grant / Activate Exclusive CONTENT_MANAGER Role & Assignment
  -- -----------------------------------------------------------------------
  UPDATE public.users
  SET role = 'CONTENT_MANAGER', status = 'ACTIVE', "updatedAt" = v_now
  WHERE id = v_app_user_id;

  SELECT id INTO v_target_assign_id
  FROM public.content_manager_assignments
  WHERE user_id = v_app_user_id
  LIMIT 1;

  IF v_target_assign_id IS NULL THEN
    v_target_assign_id := gen_random_uuid()::text;
    INSERT INTO public.content_manager_assignments (
      id, user_id, previous_role, scope_type, status, is_active,
      granted_by, granted_at, updated_by, notes, created_at, updated_at
    ) VALUES (
      v_target_assign_id, v_app_user_id, v_previous_role, 'GLOBAL', 'ACTIVE', true,
      v_super_admin_email, v_now, v_super_admin_email,
      'Exclusive production Content Manager activation',
      v_now, v_now
    );
  ELSE
    UPDATE public.content_manager_assignments
    SET
      previous_role = v_previous_role,
      scope_type = 'GLOBAL',
      status = 'ACTIVE',
      is_active = true,
      granted_by = v_super_admin_email,
      granted_at = v_now,
      suspended_by = NULL,
      suspended_at = NULL,
      suspension_reason = NULL,
      revoked_by = NULL,
      revoked_at = NULL,
      updated_by = v_super_admin_email,
      updated_at = v_now
    WHERE id = v_target_assign_id;
  END IF;

  INSERT INTO public.content_managers (
    id, user_id, name, email, department, designation, created_at, updated_at
  ) VALUES (
    gen_random_uuid()::text,
    v_app_user_id,
    'Content Manager',
    v_target_email,
    'Curriculum & Coding',
    'Content Manager',
    v_now,
    v_now
  )
  ON CONFLICT (user_id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = v_now;

  INSERT INTO public.content_audit_logs (
    id, actor_user_id, actor_email, actor_role, action,
    resource_type, resource_id, resource_label,
    previous_values, updated_values, change_summary, created_at
  ) VALUES (
    gen_random_uuid()::text,
    coalesce(v_super_admin_id, v_super_admin_email),
    v_super_admin_email,
    'SUPERADMIN',
    'GRANT_CONTENT_MANAGER',
    'CONTENT_MANAGER_ACCESS',
    v_app_user_id,
    v_target_email,
    jsonb_build_object('role', v_previous_role),
    jsonb_build_object('role', 'CONTENT_MANAGER', 'status', 'ACTIVE', 'isActive', true, 'scopeType', 'GLOBAL'),
    format('Activated exclusive GLOBAL Content Manager access for %s (authUid=%s)', v_target_email, v_auth_uid),
    v_now
  );

  -- -----------------------------------------------------------------------
  -- 5. Post-Condition Assertions (Fail-Closed)
  -- -----------------------------------------------------------------------
  SELECT COUNT(*) INTO v_inconsistent_count
  FROM public.content_manager_assignments
  WHERE NOT (
    (status = 'ACTIVE' AND is_active = true) OR
    (status IN ('SUSPENDED', 'INVITED', 'REVOKED') AND is_active = false)
  );

  IF v_inconsistent_count > 0 THEN
    RAISE EXCEPTION 'Aborted: % inconsistent assignment state(s) remained post-update.', v_inconsistent_count;
  END IF;

  SELECT COUNT(*) INTO v_active_count
  FROM public.content_manager_assignments
  WHERE status = 'ACTIVE' AND is_active = true;

  SELECT COUNT(*) INTO v_other_active_count
  FROM public.content_manager_assignments
  WHERE user_id <> v_app_user_id
    AND (status = 'ACTIVE' OR is_active = true);

  SELECT (status = 'ACTIVE' AND is_active = true) INTO v_target_is_active
  FROM public.content_manager_assignments
  WHERE user_id = v_app_user_id;

  IF v_active_count <> 1 OR v_other_active_count <> 0 OR v_target_is_active IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'Aborted: exclusive active check failed (active=%, other_active=%, target_active=%).',
      v_active_count, v_other_active_count, v_target_is_active;
  END IF;
END $$;

COMMIT;

-- Final Read-Only Verification Output
SELECT
  u.id AS app_user_id,
  u.email,
  u."authUid",
  u.role,
  u.status AS user_status,
  cm.id AS content_manager_profile_id,
  cm.manager_code,
  cm.department,
  cm.designation,
  a.id AS assignment_id,
  a.previous_role,
  a.scope_type,
  a.status AS assignment_status,
  a.is_active
FROM public.users u
JOIN public.content_manager_assignments a ON a.user_id = u.id
LEFT JOIN public.content_managers cm ON cm.user_id = u.id
WHERE a.is_active = true OR lower(u.email) = 'abcdefdfdd@gmail.com';

