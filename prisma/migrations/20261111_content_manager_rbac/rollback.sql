-- =========================================================================
-- Rollback for Migration: 20261111_content_manager_rbac
-- =========================================================================

BEGIN;

DROP TRIGGER IF EXISTS trg_content_audit_logs_immutable ON public."content_audit_logs";
REVOKE ALL ON FUNCTION public.prevent_content_audit_log_mutation() FROM PUBLIC, anon, authenticated, service_role;
DROP TABLE IF EXISTS public."content_audit_logs" CASCADE;
DROP FUNCTION IF EXISTS public.prevent_content_audit_log_mutation();
DROP TABLE IF EXISTS public."content_manager_scopes" CASCADE;
DROP TABLE IF EXISTS public."content_manager_permissions" CASCADE;
DROP TABLE IF EXISTS public."content_manager_assignments" CASCADE;

DROP INDEX IF EXISTS public."Problem_approvalStatus_idx";
DROP INDEX IF EXISTS public."Module_approvalStatus_idx";
DROP INDEX IF EXISTS public."LearningUnit_approvalStatus_idx";

ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "approvalStatus";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "submittedForReviewAt";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "submittedForReviewBy";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "publishedAt";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "publishedBy";
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "reviewNotes";

ALTER TABLE public."Module" DROP COLUMN IF EXISTS "approvalStatus";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "submittedForReviewAt";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "submittedForReviewBy";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "publishedAt";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "publishedBy";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "reviewNotes";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "createdBy";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "updatedBy";

ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "approvalStatus";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "submittedForReviewAt";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "submittedForReviewBy";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "publishedAt";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "publishedBy";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "reviewNotes";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "createdBy";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "updatedBy";

NOTIFY pgrst, 'reload schema';

COMMIT;
