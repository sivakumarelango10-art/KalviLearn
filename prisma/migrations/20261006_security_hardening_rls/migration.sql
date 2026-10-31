-- ============================================================================
-- KalviLearn security hardening: Row-Level Security, privileges, integrity, indexes
-- ============================================================================
-- WHY
--   The live database had `USING (true)` / `WITH CHECK (true)` policies granted to the public/anon role on
--   users, students, mentors, mentor_students, Submission, UserProgress and feedback_reports (anonymous read of
--   every user's PII and submitted code; anonymous write/delete of progress, rosters and tickets; any signed-in
--   user able to UPDATE any user's `role`). feedback_comments, feedback_audit_logs and the TeamSync webhook tables
--   had RLS disabled with full anon grants. UserProgress was unique on (userId, problemId) only, so a student
--   could not hold the same problem solved in two languages.
--
-- IDENTITY MODEL
--   public.users.id is NOT the Supabase auth uid for most accounts (users are provisioned by email before first
--   login). Policies therefore resolve the caller through a TRUSTED MAPPING COLUMN, users."authUid" (= auth.users.id):
--     auth.uid()  ->  public.users."authUid"  ->  users.id / role / status  ->  mentors / students / mentor_students
--   The column is filled (a) by a one-time backfill from CONFIRMED GOOGLE identities matched by lower(email), and
--   (b) afterwards by SECURITY DEFINER triggers that link an unlinked users row when a confirmed Google identity with
--   the same email appears. It is NEVER client-writable (a BEFORE trigger resets any client-supplied value), so
--   changing an email or forging a JWT email claim cannot re-point an identity. Email is only used once, at link time.
--
-- WRITE MODEL
--   * Submission, UserProgress, feedback_*, teamsync_* are written ONLY by the server (service_role bypasses RLS).
--     The browser can never write progress/XP/submissions/tickets.
--   * Roster administration by CAMPUS_MANAGER / ADMIN and mentor self-service stay available to the client but are
--     constrained by policies + a trigger that blocks role/status/email escalation.
--
-- This file is idempotent. Apply with:  psql "$DIRECT_URL" -v ON_ERROR_STOP=1 -f migration.sql
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 0. Trusted identity mapping: users."authUid"
-- ---------------------------------------------------------------------------
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS "authUid" uuid;
CREATE UNIQUE INDEX IF NOT EXISTS users_authuid_key ON public.users ("authUid") WHERE "authUid" IS NOT NULL;

-- One-time backfill: only CONFIRMED GOOGLE identities, matched on case-insensitive email, never overwriting a link.
UPDATE public.users u
SET "authUid" = a.id
FROM auth.users a
WHERE u."authUid" IS NULL
  AND lower(a.email) = lower(u.email)
  AND a.email_confirmed_at IS NOT NULL
  AND EXISTS (SELECT 1 FROM auth.identities i WHERE i.user_id = a.id AND i.provider = 'google')
  AND NOT EXISTS (SELECT 1 FROM public.users x WHERE x."authUid" = a.id);

-- public.users side: new/edited rows link to an existing confirmed Google identity; clients can never set authUid.
CREATE OR REPLACE FUNCTION public.users_link_identity() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth, pg_temp AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    NEW."authUid" := OLD."authUid";
  ELSE
    NEW."authUid" := NULL;
  END IF;
  IF NEW."authUid" IS NULL THEN
    SELECT a.id INTO NEW."authUid"
    FROM auth.users a
    WHERE lower(a.email) = lower(NEW.email)
      AND a.email_confirmed_at IS NOT NULL
      AND EXISTS (SELECT 1 FROM auth.identities i WHERE i.user_id = a.id AND i.provider = 'google')
      AND NOT EXISTS (SELECT 1 FROM public.users x WHERE x."authUid" = a.id)
    LIMIT 1;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_users_link_identity ON public.users;
CREATE TRIGGER trg_users_link_identity BEFORE INSERT OR UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.users_link_identity();

-- auth side: when a confirmed Google identity is created, link the matching provisioned users row.
CREATE OR REPLACE FUNCTION public.auth_identity_link_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth, pg_temp AS $$
BEGIN
  IF NEW.provider = 'google' THEN
    UPDATE public.users u
    SET "authUid" = NEW.user_id
    FROM auth.users a
    WHERE a.id = NEW.user_id
      AND a.email_confirmed_at IS NOT NULL
      AND u."authUid" IS NULL
      AND lower(u.email) = lower(a.email)
      AND NOT EXISTS (SELECT 1 FROM public.users x WHERE x."authUid" = a.id);
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_auth_identity_link_user ON auth.identities;
CREATE TRIGGER trg_auth_identity_link_user AFTER INSERT ON auth.identities
  FOR EACH ROW EXECUTE FUNCTION public.auth_identity_link_user();

-- ---------------------------------------------------------------------------
-- 1. Identity helpers (SECURITY DEFINER so they can read users/mentors/... without RLS recursion)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.app_current_user_id() RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT u.id
  FROM public.users u
  WHERE u."authUid" = auth.uid()
    AND upper(u.status) = 'ACTIVE'
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.app_current_role() RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT upper(u.role) FROM public.users u WHERE u.id = public.app_current_user_id()
$$;

CREATE OR REPLACE FUNCTION public.app_is_staff() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT coalesce(public.app_current_role() IN ('ADMIN', 'SUPERADMIN', 'CAMPUS_MANAGER'), false)
$$;

CREATE OR REPLACE FUNCTION public.app_is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT coalesce(public.app_current_role() IN ('ADMIN', 'SUPERADMIN'), false)
$$;

CREATE OR REPLACE FUNCTION public.app_current_mentor_id() RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT m.id FROM public.mentors m
  WHERE m.user_id = public.app_current_user_id() AND upper(m.status) = 'ACTIVE'
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.app_current_student_id() RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT s.id FROM public.students s WHERE s.user_id = public.app_current_user_id() LIMIT 1
$$;

-- True when the caller is a mentor with an ACTIVE assignment to the student whose users.id is p_user_id.
CREATE OR REPLACE FUNCTION public.app_is_mentor_of_user(p_user_id text) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.mentor_students ms
    JOIN public.students s ON s.id = ms.student_id
    WHERE ms.mentor_id = public.app_current_mentor_id()
      AND ms.status = 'ACTIVE'
      AND s.user_id = p_user_id
  )
$$;

-- users.id of the caller's ACTIVE mentor (so students can read their own mentor's name/email).
CREATE OR REPLACE FUNCTION public.app_my_mentor_user_id() RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT m.user_id
  FROM public.mentor_students ms
  JOIN public.mentors m ON m.id = ms.mentor_id
  WHERE ms.student_id = public.app_current_student_id() AND ms.status = 'ACTIVE'
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION
  public.app_current_user_id(), public.app_current_role(), public.app_is_staff(), public.app_is_admin(),
  public.app_current_mentor_id(), public.app_current_student_id(), public.app_is_mentor_of_user(text),
  public.app_my_mentor_user_id()
FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION
  public.app_current_user_id(), public.app_current_role(), public.app_is_staff(), public.app_is_admin(),
  public.app_current_mentor_id(), public.app_current_student_id(), public.app_is_mentor_of_user(text),
  public.app_my_mentor_user_id()
TO authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 2. Privilege reset: nothing for anon; authenticated gets only what the app needs (RLS decides the rows)
-- ---------------------------------------------------------------------------
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;

GRANT SELECT ON
  public."Belt", public."Module", public."LearningUnit", public."Problem", public."TestCase",
  public."Submission", public."UserProgress",
  public.users, public.students, public.mentors, public.mentor_students,
  public.feedback_reports, public.feedback_comments
TO authenticated;

GRANT INSERT, UPDATE ON public.users, public.students, public.mentors, public.mentor_students TO authenticated;

-- Future tables created by migrations must not silently become world-writable.
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;

-- ---------------------------------------------------------------------------
-- 3. Row-Level Security: enable everywhere, drop every legacy policy, re-create least-privilege policies
-- ---------------------------------------------------------------------------
ALTER TABLE public."Belt"                       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Module"                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LearningUnit"               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Problem"                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."TestCase"                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Submission"                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."UserProgress"               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users                        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_students              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_reports             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_comments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_audit_logs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teamsync_webhook_events      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teamsync_webhook_deliveries  ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public' LOOP
    EXECUTE format('DROP POLICY %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- 3a. Curriculum content: readable by signed-in users only, never writable from the client.
CREATE POLICY belt_read          ON public."Belt"         FOR SELECT TO authenticated USING (true);
CREATE POLICY module_read        ON public."Module"       FOR SELECT TO authenticated USING (true);
CREATE POLICY learningunit_read  ON public."LearningUnit" FOR SELECT TO authenticated USING (true);
CREATE POLICY problem_read       ON public."Problem"      FOR SELECT TO authenticated USING (true);
-- Hidden test cases (and their expected outputs) are NEVER readable through the API.
CREATE POLICY testcase_read_visible ON public."TestCase"  FOR SELECT TO authenticated USING ("isHidden" = false);

-- 3b. users
CREATE POLICY users_select ON public.users FOR SELECT TO authenticated USING (
  id = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR (upper(role) = 'STUDENT' AND (SELECT public.app_current_role()) = 'MENTOR')
  OR id = (SELECT public.app_my_mentor_user_id())
);
CREATE POLICY users_insert ON public.users FOR INSERT TO authenticated WITH CHECK (
  (SELECT public.app_is_admin())
  OR ((SELECT public.app_current_role()) = 'CAMPUS_MANAGER' AND upper(role) IN ('STUDENT', 'MENTOR'))
);
CREATE POLICY users_update ON public.users FOR UPDATE TO authenticated
USING (
  id = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR (upper(role) = 'STUDENT' AND (SELECT public.app_current_role()) = 'MENTOR')
)
WITH CHECK (
  id = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR (upper(role) = 'STUDENT' AND (SELECT public.app_current_role()) = 'MENTOR')
);

-- Column-level guard: a policy cannot restrict WHICH columns change, so a trigger blocks escalation.
CREATE OR REPLACE FUNCTION public.guard_users_update() RETURNS trigger
LANGUAGE plpgsql SET search_path = public, pg_temp AS $$
DECLARE
  actor_id   text;
  actor_role text;
BEGIN
  IF current_user IN ('postgres', 'service_role', 'supabase_admin') OR coalesce(auth.role(), '') = 'service_role' THEN
    RETURN NEW;
  END IF;

  IF NEW.id IS DISTINCT FROM OLD.id THEN
    RAISE EXCEPTION 'users.id is immutable' USING ERRCODE = '42501';
  END IF;

  actor_id   := public.app_current_user_id();
  actor_role := public.app_current_role();

  IF actor_role IN ('ADMIN', 'SUPERADMIN') THEN
    RETURN NEW;
  END IF;

  IF actor_role = 'CAMPUS_MANAGER' THEN
    IF NEW.role IS DISTINCT FROM OLD.role AND upper(NEW.role) NOT IN ('STUDENT', 'MENTOR') THEN
      RAISE EXCEPTION 'Campus managers may only assign STUDENT or MENTOR roles' USING ERRCODE = '42501';
    END IF;
    IF upper(OLD.role) IN ('ADMIN', 'SUPERADMIN', 'CAMPUS_MANAGER') AND OLD.id <> actor_id THEN
      RAISE EXCEPTION 'Cannot modify another privileged account' USING ERRCODE = '42501';
    END IF;
    RETURN NEW;
  END IF;

  IF OLD.id = actor_id THEN
    -- Self-service profile edit: never role, status, email (identity key) or mentor link.
    IF NEW.role IS DISTINCT FROM OLD.role
       OR NEW.status IS DISTINCT FROM OLD.status
       OR NEW.email IS DISTINCT FROM OLD.email
       OR NEW."mentorId" IS DISTINCT FROM OLD."mentorId" THEN
      RAISE EXCEPTION 'You may only edit your display name' USING ERRCODE = '42501';
    END IF;
    RETURN NEW;
  END IF;

  IF actor_role = 'MENTOR' AND upper(OLD.role) = 'STUDENT' THEN
    IF NEW.role IS DISTINCT FROM OLD.role
       OR NEW.status IS DISTINCT FROM OLD.status
       OR NEW.email IS DISTINCT FROM OLD.email
       OR NEW.name IS DISTINCT FROM OLD.name THEN
      RAISE EXCEPTION 'Mentors may only change a student''s mentor link' USING ERRCODE = '42501';
    END IF;
    IF NEW."mentorId" IS DISTINCT FROM OLD."mentorId"
       AND NOT ((NEW."mentorId" = actor_id AND OLD."mentorId" IS NULL)
             OR (NEW."mentorId" IS NULL AND OLD."mentorId" = actor_id)) THEN
      RAISE EXCEPTION 'Mentors may only assign or release students to/from themselves' USING ERRCODE = '42501';
    END IF;
    RETURN NEW;
  END IF;

  RAISE EXCEPTION 'Not allowed to modify this user' USING ERRCODE = '42501';
END $$;

DROP TRIGGER IF EXISTS trg_guard_users_update ON public.users;
CREATE TRIGGER trg_guard_users_update BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.guard_users_update();

-- 3c. students
CREATE POLICY students_select ON public.students FOR SELECT TO authenticated USING (
  user_id = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR (SELECT public.app_current_role()) = 'MENTOR'
);
CREATE POLICY students_insert ON public.students FOR INSERT TO authenticated WITH CHECK (
  (SELECT public.app_is_staff()) OR (SELECT public.app_current_role()) = 'MENTOR'
);
CREATE POLICY students_update ON public.students FOR UPDATE TO authenticated
USING (
  user_id = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR (SELECT public.app_current_role()) = 'MENTOR'
)
WITH CHECK (
  user_id = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR (SELECT public.app_current_role()) = 'MENTOR'
);

-- 3d. mentors
CREATE POLICY mentors_select ON public.mentors FOR SELECT TO authenticated USING (
  user_id = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR user_id = (SELECT public.app_my_mentor_user_id())
);
CREATE POLICY mentors_insert ON public.mentors FOR INSERT TO authenticated WITH CHECK ((SELECT public.app_is_staff()));
CREATE POLICY mentors_update ON public.mentors FOR UPDATE TO authenticated
USING (user_id = (SELECT public.app_current_user_id()) OR (SELECT public.app_is_staff()))
WITH CHECK (user_id = (SELECT public.app_current_user_id()) OR (SELECT public.app_is_staff()));

-- 3e. mentor_students
CREATE POLICY mentor_students_select ON public.mentor_students FOR SELECT TO authenticated USING (
  (SELECT public.app_is_staff())
  OR mentor_id = (SELECT public.app_current_mentor_id())
  OR student_id = (SELECT public.app_current_student_id())
);
CREATE POLICY mentor_students_insert ON public.mentor_students FOR INSERT TO authenticated WITH CHECK (
  (SELECT public.app_is_staff())
  OR (mentor_id = (SELECT public.app_current_mentor_id()) AND status = 'ACTIVE')
);
CREATE POLICY mentor_students_update ON public.mentor_students FOR UPDATE TO authenticated
USING ((SELECT public.app_is_staff()) OR mentor_id = (SELECT public.app_current_mentor_id()))
WITH CHECK ((SELECT public.app_is_staff()) OR mentor_id = (SELECT public.app_current_mentor_id()));

-- 3f. Submission / UserProgress: READ ONLY from the client. Writes happen server-side (service_role).
CREATE POLICY submission_select ON public."Submission" FOR SELECT TO authenticated USING (
  "userId" = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR public.app_is_mentor_of_user("userId")
);
CREATE POLICY userprogress_select ON public."UserProgress" FOR SELECT TO authenticated USING (
  "userId" = (SELECT public.app_current_user_id())
  OR (SELECT public.app_is_staff())
  OR public.app_is_mentor_of_user("userId")
);

-- 3g. Feedback: authors read their own reports/comments; admins read all. All writes are server-side.
CREATE POLICY feedback_reports_select ON public.feedback_reports FOR SELECT TO authenticated USING (
  user_id = (SELECT public.app_current_user_id()) OR (SELECT public.app_is_admin())
);
CREATE POLICY feedback_comments_select ON public.feedback_comments FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.feedback_reports r
    WHERE r.id = feedback_comments.feedback_report_id
      AND (r.user_id = (SELECT public.app_current_user_id()) OR (SELECT public.app_is_admin()))
  )
);
-- feedback_audit_logs, teamsync_webhook_events, teamsync_webhook_deliveries: RLS on, NO policies => service_role only.

-- ---------------------------------------------------------------------------
-- 4. Integrity: per-language progress identity, value constraints
-- ---------------------------------------------------------------------------
-- Multi-language independence: (user, problem, language) is the identity of a progress row.
DROP INDEX IF EXISTS public."UserProgress_userId_problemId_key";
CREATE UNIQUE INDEX IF NOT EXISTS "UserProgress_userId_problemId_language_key"
  ON public."UserProgress" ("userId", "problemId", "language");

ALTER TABLE public."UserProgress" DROP CONSTRAINT IF EXISTS userprogress_status_chk;
ALTER TABLE public."UserProgress" ADD CONSTRAINT userprogress_status_chk CHECK (status IN ('SOLVED', 'ATTEMPTED')) NOT VALID;
ALTER TABLE public."UserProgress" VALIDATE CONSTRAINT userprogress_status_chk;

ALTER TABLE public."UserProgress" DROP CONSTRAINT IF EXISTS userprogress_xp_chk;
ALTER TABLE public."UserProgress" ADD CONSTRAINT userprogress_xp_chk CHECK ("xpEarned" >= 0) NOT VALID;
ALTER TABLE public."UserProgress" VALIDATE CONSTRAINT userprogress_xp_chk;

ALTER TABLE public."Submission" DROP CONSTRAINT IF EXISTS submission_status_chk;
ALTER TABLE public."Submission" ADD CONSTRAINT submission_status_chk CHECK (status IN ('PASSED', 'FAILED', 'ERROR')) NOT VALID;
ALTER TABLE public."Submission" VALIDATE CONSTRAINT submission_status_chk;

ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_chk;
ALTER TABLE public.users ADD CONSTRAINT users_role_chk
  CHECK (upper(role) IN ('STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN', 'SUPERADMIN')) NOT VALID;
ALTER TABLE public.users VALIDATE CONSTRAINT users_role_chk;

-- ---------------------------------------------------------------------------
-- 5. Indexes that match real query patterns (see audit report): per-user history, status rollups, RLS helpers
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS "Submission_userId_createdAt_idx"   ON public."Submission" ("userId", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS "Submission_createdAt_idx"          ON public."Submission" ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "Submission_problemId_idx"          ON public."Submission" ("problemId");
CREATE INDEX IF NOT EXISTS "UserProgress_userId_status_idx"    ON public."UserProgress" ("userId", status);
CREATE INDEX IF NOT EXISTS "UserProgress_problemId_idx"        ON public."UserProgress" ("problemId");
CREATE INDEX IF NOT EXISTS users_email_lower_idx               ON public.users (lower(email));
CREATE INDEX IF NOT EXISTS users_role_idx                      ON public.users (role);
CREATE INDEX IF NOT EXISTS idx_feedback_reports_user_created   ON public.feedback_reports (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_comments_report_created ON public.feedback_comments (feedback_report_id, created_at);
-- Redundant duplicates of unique indexes (pure write overhead):
DROP INDEX IF EXISTS public.idx_feedback_reports_public_ref;               -- == feedback_reports_public_reference_key
DROP INDEX IF EXISTS public.idx_feedback_comments_teamsync_comment_id;     -- == feedback_comments_teamsync_comment_id_key
DROP INDEX IF EXISTS public.idx_teamsync_webhook_events_event_id;          -- == teamsync_webhook_events_event_id_key
DROP INDEX IF EXISTS public.teamsync_webhook_deliveries_event_id_idx;      -- == teamsync_webhook_deliveries_event_id_key

-- ---------------------------------------------------------------------------
-- 6. Realtime: feedback status/comment subscriptions need the tables in the publication.
--    Realtime evaluates the SELECT policies above with the subscriber's JWT, so users only receive their own rows.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'feedback_reports') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback_reports;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'feedback_comments') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback_comments;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 7. Storage: feedback attachments bucket — authenticated uploads only, images only, 5 MB cap
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public Insert Feedback Attachments" ON storage.objects;
DROP POLICY IF EXISTS "feedback_attachments_insert_authenticated" ON storage.objects;
CREATE POLICY "feedback_attachments_insert_authenticated" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'feedback-attachments');

UPDATE storage.buckets
SET file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif']
WHERE id = 'feedback-attachments';

-- ---------------------------------------------------------------------------
-- 8. Campus overview aggregates computed in SQL (staff only). The client previously downloaded EVERY Submission and
--    UserProgress row to aggregate in the browser, which PostgREST silently truncates at 1000 rows.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.campus_overview_metrics() RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
BEGIN
  IF NOT public.app_is_staff() THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;
  RETURN jsonb_build_object(
    'totalStudents',       (SELECT count(*) FROM public.students),
    'totalMentors',        (SELECT count(*) FROM public.mentors),
    'totalSubmissions',    (SELECT count(*) FROM public."Submission"),
    'passedSubmissions',   (SELECT count(*) FROM public."Submission" WHERE status = 'PASSED'),
    'solvedCount',         (SELECT count(*) FROM public."UserProgress" WHERE status = 'SOLVED'),
    'totalXp',             (SELECT coalesce(sum(CASE WHEN status = 'SOLVED' THEN coalesce("xpEarned", 50) ELSE coalesce("xpEarned", 0) END), 0) FROM public."UserProgress"),
    'activeLearners',      (SELECT count(DISTINCT u) FROM (
                              SELECT "userId" AS u FROM public."Submission"   WHERE "createdAt" >= (now() - interval '14 days')
                              UNION
                              SELECT "userId"      FROM public."UserProgress" WHERE "solvedAt"  >= (now() - interval '14 days')
                            ) t)
  );
END $$;
REVOKE ALL ON FUNCTION public.campus_overview_metrics() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.campus_overview_metrics() TO authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 9. Distributed (cross-instance) rate limiting for the serverless API: atomic fixed-window counters.
--    Callable ONLY by service_role (the API); the in-memory limiter remains as a fallback if this is unavailable.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  bucket       text        NOT NULL,
  window_start timestamptz NOT NULL,
  hits         integer     NOT NULL DEFAULT 0,
  PRIMARY KEY (bucket, window_start)
);
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.api_rate_limits FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.rate_limit_hit(p_bucket text, p_max integer, p_window_seconds integer)
RETURNS TABLE (allowed boolean, retry_after integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE
  ws timestamptz;
  h  integer;
BEGIN
  IF p_window_seconds < 1 OR p_max < 1 OR length(p_bucket) > 200 THEN
    RAISE EXCEPTION 'invalid rate limit parameters';
  END IF;
  ws := to_timestamp(floor(extract(epoch FROM now()) / p_window_seconds) * p_window_seconds);
  INSERT INTO public.api_rate_limits AS r (bucket, window_start, hits)
  VALUES (p_bucket, ws, 1)
  ON CONFLICT (bucket, window_start) DO UPDATE SET hits = r.hits + 1
  RETURNING r.hits INTO h;
  IF random() < 0.01 THEN
    DELETE FROM public.api_rate_limits WHERE window_start < now() - interval '1 day';
  END IF;
  RETURN QUERY SELECT h <= p_max,
    greatest(1, ceil(extract(epoch FROM (ws + make_interval(secs => p_window_seconds) - now())))::integer);
END $$;
REVOKE ALL ON FUNCTION public.rate_limit_hit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rate_limit_hit(text, integer, integer) TO service_role;

COMMIT;
