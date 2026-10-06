-- ============================================================================
-- ROLLBACK for 20261006_security_hardening_rls  (GENERATED from docs/baseline-db-snapshot-2026-10-06.json)
--
-- Restores the policies, grants, RLS flags, indexes, bucket config and realtime publication that existed BEFORE the
-- hardening migration. WARNING: this re-opens the anonymous read/write holes the migration closed. Use it only if the
-- application is broken and cannot be fixed forward; re-apply the migration as soon as possible.
--
-- Data note: the migration changes no rows except adding users."authUid". Rolling back drops that column (it can be
-- recomputed by re-running the migration). The old UNIQUE (userId, problemId) index on "UserProgress" is only restored
-- if no problem has progress rows in more than one language (otherwise it is skipped with a NOTICE).
-- Run: psql "$DIRECT_URL" -v ON_ERROR_STOP=1 -f rollback.sql
-- ============================================================================
BEGIN;

-- 1. Remove objects introduced by the migration
DROP TRIGGER IF EXISTS trg_guard_users_update ON public.users;
DROP TRIGGER IF EXISTS trg_users_link_identity ON public.users;
DROP TRIGGER IF EXISTS trg_auth_identity_link_user ON auth.identities;
DROP FUNCTION IF EXISTS public.guard_users_update() CASCADE;
DROP FUNCTION IF EXISTS public.users_link_identity() CASCADE;
DROP FUNCTION IF EXISTS public.auth_identity_link_user() CASCADE;
DROP FUNCTION IF EXISTS public.campus_overview_metrics() CASCADE;
DROP FUNCTION IF EXISTS public.rate_limit_hit(text, integer, integer) CASCADE;
DROP FUNCTION IF EXISTS public.app_current_user_id() CASCADE;
DROP FUNCTION IF EXISTS public.app_current_role() CASCADE;
DROP FUNCTION IF EXISTS public.app_is_staff() CASCADE;
DROP FUNCTION IF EXISTS public.app_is_admin() CASCADE;
DROP FUNCTION IF EXISTS public.app_current_mentor_id() CASCADE;
DROP FUNCTION IF EXISTS public.app_current_student_id() CASCADE;
DROP FUNCTION IF EXISTS public.app_is_mentor_of_user(text) CASCADE;
DROP FUNCTION IF EXISTS public.app_my_mentor_user_id() CASCADE;
DROP TABLE IF EXISTS public.api_rate_limits;

-- 2. Drop every current public policy (migration policies), then restore the original ones
DO $$ DECLARE r record; BEGIN FOR r IN SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public' LOOP EXECUTE format('DROP POLICY %I ON %I.%I', r.policyname, r.schemaname, r.tablename); END LOOP; END $$;
DROP POLICY IF EXISTS "feedback_attachments_insert_authenticated" ON storage.objects;

CREATE POLICY "Public read access" ON public."Belt" FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON public."LearningUnit" FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON public."Module" FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON public."Problem" FOR SELECT TO public USING (true);
CREATE POLICY "Allow insert submission" ON public."Submission" FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public read submissions" ON public."Submission" FOR SELECT TO public USING (true);
CREATE POLICY "Public read visible test cases" ON public."TestCase" FOR SELECT TO public USING (("isHidden" = false));
CREATE POLICY "Allow upsert user progress" ON public."UserProgress" FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "Public read user progress" ON public."UserProgress" FOR SELECT TO public USING (true);
CREATE POLICY "Users and service can insert feedback" ON public."feedback_reports" FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Users and staff can update feedback" ON public."feedback_reports" FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Users can read own feedback" ON public."feedback_reports" FOR SELECT TO public USING ((((auth.uid())::text = user_id) OR true));
CREATE POLICY "Allow roster mutations" ON public."mentor_students" FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "Public read roster" ON public."mentor_students" FOR SELECT TO public USING (true);
CREATE POLICY "Allow roster mutations" ON public."mentors" FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "Public read roster" ON public."mentors" FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Public Insert Feedback Attachments" ON storage.objects;
CREATE POLICY "Public Insert Feedback Attachments" ON storage."objects" FOR INSERT TO public WITH CHECK ((bucket_id = 'feedback-attachments'::text));
DROP POLICY IF EXISTS "Public Read Feedback Attachments" ON storage.objects;
CREATE POLICY "Public Read Feedback Attachments" ON storage."objects" FOR SELECT TO public USING ((bucket_id = 'feedback-attachments'::text));
CREATE POLICY "Allow roster mutations" ON public."students" FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "Public read roster" ON public."students" FOR SELECT TO public USING (true);
CREATE POLICY "Public read users" ON public."users" FOR SELECT TO public USING (true);
CREATE POLICY "Users can read own profile" ON public."users" FOR SELECT TO public USING ((((auth.uid())::text = id) OR true));
CREATE POLICY "Users can update only own profile" ON public."users" FOR UPDATE TO public USING (((auth.uid())::text = id)) WITH CHECK (((auth.uid())::text = id));
CREATE POLICY "Users update own profile" ON public."users" FOR UPDATE TO public USING (true) WITH CHECK (true);

-- 3. Restore original RLS enabled/disabled flags
ALTER TABLE public."Belt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LearningUnit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Module" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Problem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Submission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."TestCase" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."UserProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."feedback_audit_logs" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."feedback_comments" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."feedback_reports" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."mentor_students" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."mentors" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."students" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."teamsync_webhook_deliveries" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."teamsync_webhook_events" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."users" ENABLE ROW LEVEL SECURITY;

-- 4. Restore original table grants (anon / authenticated / service_role)
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Belt" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Belt" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Belt" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."LearningUnit" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."LearningUnit" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."LearningUnit" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Module" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Module" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Module" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Problem" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Problem" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Problem" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Submission" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Submission" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."Submission" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."TestCase" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."TestCase" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."TestCase" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."UserProgress" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."UserProgress" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."UserProgress" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_audit_logs" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_audit_logs" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_audit_logs" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_comments" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_comments" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_comments" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_reports" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_reports" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."feedback_reports" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."mentor_students" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."mentor_students" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."mentor_students" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."mentors" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."mentors" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."mentors" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."students" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."students" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."students" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."teamsync_webhook_deliveries" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."teamsync_webhook_deliveries" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."teamsync_webhook_deliveries" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."teamsync_webhook_events" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."teamsync_webhook_events" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."teamsync_webhook_events" TO service_role;
GRANT REFERENCES, SELECT, TRIGGER, TRUNCATE ON public."users" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."users" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."users" TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;

-- 5. Indexes / constraints
DROP INDEX IF EXISTS public.users_authuid_key;
ALTER TABLE public.users DROP COLUMN IF EXISTS "authUid";
ALTER TABLE public."UserProgress" DROP CONSTRAINT IF EXISTS userprogress_status_chk;
ALTER TABLE public."UserProgress" DROP CONSTRAINT IF EXISTS userprogress_xp_chk;
ALTER TABLE public."Submission" DROP CONSTRAINT IF EXISTS submission_status_chk;
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_chk;
DROP INDEX IF EXISTS public."Submission_userId_createdAt_idx";
DROP INDEX IF EXISTS public."Submission_createdAt_idx";
DROP INDEX IF EXISTS public."Submission_problemId_idx";
DROP INDEX IF EXISTS public."UserProgress_userId_status_idx";
DROP INDEX IF EXISTS public."UserProgress_problemId_idx";
DROP INDEX IF EXISTS public.users_email_lower_idx;
DROP INDEX IF EXISTS public.users_role_idx;
DROP INDEX IF EXISTS public.idx_feedback_reports_user_created;
DROP INDEX IF EXISTS public.idx_feedback_comments_report_created;
CREATE INDEX IF NOT EXISTS idx_feedback_reports_public_ref ON public.feedback_reports USING btree (public_reference);
CREATE INDEX IF NOT EXISTS idx_feedback_comments_teamsync_comment_id ON public.feedback_comments USING btree (teamsync_comment_id);
CREATE INDEX IF NOT EXISTS idx_teamsync_webhook_events_event_id ON public.teamsync_webhook_events USING btree (event_id);
CREATE INDEX IF NOT EXISTS teamsync_webhook_deliveries_event_id_idx ON public.teamsync_webhook_deliveries USING btree (event_id);
DROP INDEX IF EXISTS public."UserProgress_userId_problemId_language_key";
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM public."UserProgress" GROUP BY "userId", "problemId" HAVING count(*) > 1) THEN
    RAISE NOTICE 'Skipping restore of UNIQUE (userId, problemId): multi-language progress rows exist (this is the intended state).';
  ELSE
    CREATE UNIQUE INDEX IF NOT EXISTS "UserProgress_userId_problemId_key" ON public."UserProgress" USING btree ("userId", "problemId");
  END IF;
END $$;

-- 6. Realtime publication back to original membership
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='feedback_reports') THEN ALTER PUBLICATION supabase_realtime DROP TABLE public.feedback_reports; END IF;
  IF EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='feedback_comments') THEN ALTER PUBLICATION supabase_realtime DROP TABLE public.feedback_comments; END IF;
END $$;

-- 7. Storage bucket limits back to original
UPDATE storage.buckets SET file_size_limit = 5242880, allowed_mime_types = ARRAY['image/png','image/jpeg','image/jpg','image/webp','image/gif'] WHERE id = 'feedback-attachments';

COMMIT;
