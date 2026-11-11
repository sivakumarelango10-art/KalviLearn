-- =========================================================================
-- KalviLearn: Content Manager RBAC, Scoped Access & Publication Workflow
-- Migration: 20261111_content_manager_rbac
-- Safe, additive, idempotent, transactional migration.
-- Zero destructive changes to existing Super Admin or student tables.
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- 1. Extend Problem, Module, and LearningUnit for Publication Approval Workflow
-- Existing published records default to 'APPROVED' so student visibility is preserved.
-- -------------------------------------------------------------------------
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "approvalStatus" TEXT NOT NULL DEFAULT 'APPROVED';
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "submittedForReviewAt" TIMESTAMPTZ;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "submittedForReviewBy" TEXT;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMPTZ;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "publishedBy" TEXT;
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "reviewNotes" TEXT;

ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "approvalStatus" TEXT NOT NULL DEFAULT 'APPROVED';
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "submittedForReviewAt" TIMESTAMPTZ;
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "submittedForReviewBy" TEXT;
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMPTZ;
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "publishedBy" TEXT;
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "reviewNotes" TEXT;
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "createdBy" TEXT;
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "updatedBy" TEXT;

ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "approvalStatus" TEXT NOT NULL DEFAULT 'APPROVED';
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "submittedForReviewAt" TIMESTAMPTZ;
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "submittedForReviewBy" TEXT;
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMPTZ;
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "publishedBy" TEXT;
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "reviewNotes" TEXT;
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "createdBy" TEXT;
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "updatedBy" TEXT;

CREATE INDEX IF NOT EXISTS "Problem_approvalStatus_idx" ON public."Problem"("approvalStatus");
CREATE INDEX IF NOT EXISTS "Module_approvalStatus_idx" ON public."Module"("approvalStatus");
CREATE INDEX IF NOT EXISTS "LearningUnit_approvalStatus_idx" ON public."LearningUnit"("approvalStatus");

-- -------------------------------------------------------------------------
-- 2. Content Manager Assignment Table (1-to-1 with users)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."content_manager_assignments" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "user_id" TEXT NOT NULL UNIQUE REFERENCES public."users"("id") ON DELETE CASCADE,
  "previous_role" VARCHAR(50) NOT NULL DEFAULT 'STUDENT',
  "scope_type" VARCHAR(20) NOT NULL DEFAULT 'NONE' CHECK ("scope_type" IN ('NONE', 'SCOPED', 'GLOBAL')),
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "granted_by" VARCHAR(255),
  "granted_at" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "revoked_by" VARCHAR(255),
  "revoked_at" TIMESTAMPTZ,
  "notes" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS "idx_cm_assignments_is_active" ON public."content_manager_assignments"("is_active");
CREATE INDEX IF NOT EXISTS "idx_cm_assignments_scope_type" ON public."content_manager_assignments"("scope_type");

-- -------------------------------------------------------------------------
-- 3. Content Manager Granular Permissions Table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."content_manager_permissions" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "assignment_id" TEXT NOT NULL REFERENCES public."content_manager_assignments"("id") ON DELETE CASCADE,
  "permission" VARCHAR(100) NOT NULL,
  "granted_at" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT "uq_cm_assignment_permission" UNIQUE ("assignment_id", "permission")
);

CREATE INDEX IF NOT EXISTS "idx_cm_permissions_assignment_id" ON public."content_manager_permissions"("assignment_id");
CREATE INDEX IF NOT EXISTS "idx_cm_permissions_permission" ON public."content_manager_permissions"("permission");

-- -------------------------------------------------------------------------
-- 4. Content Manager Module & Learning Unit Scope Table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."content_manager_scopes" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "assignment_id" TEXT NOT NULL REFERENCES public."content_manager_assignments"("id") ON DELETE CASCADE,
  "module_id" TEXT REFERENCES public."Module"("id") ON DELETE CASCADE,
  "learning_unit_id" TEXT REFERENCES public."LearningUnit"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT "chk_cm_scope_target" CHECK ("module_id" IS NOT NULL OR "learning_unit_id" IS NOT NULL)
);

CREATE UNIQUE INDEX IF NOT EXISTS "uq_cm_assignment_module"
  ON public."content_manager_scopes"("assignment_id", "module_id")
  WHERE "module_id" IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "uq_cm_assignment_unit"
  ON public."content_manager_scopes"("assignment_id", "learning_unit_id")
  WHERE "learning_unit_id" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "idx_cm_scopes_assignment_id" ON public."content_manager_scopes"("assignment_id");
CREATE INDEX IF NOT EXISTS "idx_cm_scopes_module_id" ON public."content_manager_scopes"("module_id");
CREATE INDEX IF NOT EXISTS "idx_cm_scopes_unit_id" ON public."content_manager_scopes"("learning_unit_id");

-- -------------------------------------------------------------------------
-- 5. Append-Only Content Audit Log Table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."content_audit_logs" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "actor_user_id" TEXT NOT NULL,
  "actor_email" VARCHAR(255) NOT NULL,
  "actor_role" VARCHAR(50) NOT NULL,
  "action" VARCHAR(100) NOT NULL,
  "resource_type" VARCHAR(50) NOT NULL,
  "resource_id" TEXT,
  "resource_label" TEXT,
  "permission_used" VARCHAR(100),
  "previous_values" JSONB,
  "updated_values" JSONB,
  "change_summary" TEXT,
  "ip_address" VARCHAR(100),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS "idx_content_audit_actor" ON public."content_audit_logs"("actor_user_id");
CREATE INDEX IF NOT EXISTS "idx_content_audit_resource" ON public."content_audit_logs"("resource_type", "resource_id");
CREATE INDEX IF NOT EXISTS "idx_content_audit_created_at" ON public."content_audit_logs"("created_at" DESC);

-- -------------------------------------------------------------------------
-- 6. Strict RLS Hardening (Zero direct client mutation of RBAC or Audit tables)
-- -------------------------------------------------------------------------
ALTER TABLE public."content_manager_assignments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."content_manager_permissions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."content_manager_scopes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."content_audit_logs" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public."content_manager_assignments" FROM anon, authenticated, PUBLIC;
REVOKE ALL ON TABLE public."content_manager_permissions" FROM anon, authenticated, PUBLIC;
REVOKE ALL ON TABLE public."content_manager_scopes" FROM anon, authenticated, PUBLIC;
REVOKE ALL ON TABLE public."content_audit_logs" FROM anon, authenticated, PUBLIC;

GRANT ALL ON TABLE public."content_manager_assignments" TO service_role;
GRANT ALL ON TABLE public."content_manager_permissions" TO service_role;
GRANT ALL ON TABLE public."content_manager_scopes" TO service_role;

-- Append-only privilege + trigger enforcement for content_audit_logs (even service_role cannot UPDATE/DELETE)
REVOKE UPDATE, DELETE, TRUNCATE ON TABLE public."content_audit_logs" FROM service_role;
GRANT SELECT, INSERT ON TABLE public."content_audit_logs" TO service_role;

CREATE OR REPLACE FUNCTION public.prevent_content_audit_log_mutation()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, pg_temp
AS $$
BEGIN
  RAISE EXCEPTION 'content_audit_logs is strictly append-only; UPDATE and DELETE operations are forbidden.';
END;
$$;

DROP TRIGGER IF EXISTS trg_content_audit_logs_immutable ON public."content_audit_logs";
CREATE TRIGGER trg_content_audit_logs_immutable
  BEFORE UPDATE OR DELETE ON public."content_audit_logs"
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_content_audit_log_mutation();

NOTIFY pgrst, 'reload schema';

COMMIT;
