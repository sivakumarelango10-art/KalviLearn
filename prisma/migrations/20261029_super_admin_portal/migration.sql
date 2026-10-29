-- KalviLearn Super Admin Portal Migration
-- Adds campuses and admin_audit_logs tables, provisions sgjitbros@gmail.com as SUPERADMIN

-- 1. Create campuses table
CREATE TABLE IF NOT EXISTS public.campuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(50) UNIQUE NOT NULL,
  name varchar(255) NOT NULL,
  city varchar(100),
  state varchar(100),
  country varchar(100) DEFAULT 'India',
  status varchar(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
  manager_id text REFERENCES public.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_campuses_code ON public.campuses(code);
CREATE INDEX IF NOT EXISTS idx_campuses_status ON public.campuses(status);
CREATE INDEX IF NOT EXISTS idx_campuses_manager ON public.campuses(manager_id);

-- 2. Add campus_id column to users, students, and mentors if not already present
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS campus_id uuid REFERENCES public.campuses(id) ON DELETE SET NULL;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS campus_id uuid REFERENCES public.campuses(id) ON DELETE SET NULL;
ALTER TABLE public.mentors ADD COLUMN IF NOT EXISTS campus_id uuid REFERENCES public.campuses(id) ON DELETE SET NULL;

-- 3. Create default campus if none exists
INSERT INTO public.campuses (code, name, city, state, country, status)
VALUES ('KALVIUM-MAIN', 'Kalvium Technology Campus', 'Coimbatore', 'Tamil Nadu', 'India', 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

-- 4. Associate existing users/students/mentors without campus_id to the primary campus
DO $$
DECLARE
  default_campus_id uuid;
BEGIN
  SELECT id INTO default_campus_id FROM public.campuses WHERE code = 'KALVIUM-MAIN' LIMIT 1;
  IF default_campus_id IS NOT NULL THEN
    UPDATE public.users SET campus_id = default_campus_id WHERE campus_id IS NULL;
    UPDATE public.students SET campus_id = default_campus_id WHERE campus_id IS NULL;
    UPDATE public.mentors SET campus_id = default_campus_id WHERE campus_id IS NULL;
  END IF;
END $$;

-- 5. Create admin_audit_logs table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email varchar(255) NOT NULL,
  admin_id varchar(255),
  action varchar(100) NOT NULL,
  target_type varchar(50) NOT NULL,
  target_id varchar(255),
  target_label varchar(255),
  details jsonb DEFAULT '{}'::jsonb,
  status varchar(20) DEFAULT 'SUCCESS' CHECK (status IN ('SUCCESS', 'FAILED')),
  error_message text,
  ip_address varchar(50),
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_admin_email ON public.admin_audit_logs(admin_email);
CREATE INDEX IF NOT EXISTS idx_audit_action ON public.admin_audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_target ON public.admin_audit_logs(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON public.admin_audit_logs(created_at DESC);

-- 6. Provision Sole Authorized Super Admin in users table
INSERT INTO public.users (id, email, name, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'sgjitbros@gmail.com',
  'Super Administrator',
  'SUPERADMIN',
  'ACTIVE'
)
ON CONFLICT (email) DO UPDATE
SET role = 'SUPERADMIN', status = 'ACTIVE', "updatedAt" = now();

-- 7. RLS configuration for new tables
ALTER TABLE public.campuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- campuses policies
DROP POLICY IF EXISTS campuses_select_policy ON public.campuses;
CREATE POLICY campuses_select_policy ON public.campuses
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS campuses_write_policy ON public.campuses;
CREATE POLICY campuses_write_policy ON public.campuses
  FOR ALL TO authenticated
  USING (
    lower(coalesce(auth.jwt()->>'email', '')) = 'sgjitbros@gmail.com'
    AND EXISTS (
      SELECT 1 FROM public.users u
      WHERE lower(u.email) = 'sgjitbros@gmail.com'
        AND upper(u.role) = 'SUPERADMIN'
        AND upper(u.status) = 'ACTIVE'
    )
  )
  WITH CHECK (
    lower(coalesce(auth.jwt()->>'email', '')) = 'sgjitbros@gmail.com'
    AND EXISTS (
      SELECT 1 FROM public.users u
      WHERE lower(u.email) = 'sgjitbros@gmail.com'
        AND upper(u.role) = 'SUPERADMIN'
        AND upper(u.status) = 'ACTIVE'
    )
  );

-- admin_audit_logs policies: read-only for superadmin; write via service_role/superadmin; append-only
DROP POLICY IF EXISTS audit_select_policy ON public.admin_audit_logs;
CREATE POLICY audit_select_policy ON public.admin_audit_logs
  FOR SELECT TO authenticated
  USING (
    lower(coalesce(auth.jwt()->>'email', '')) = 'sgjitbros@gmail.com'
    AND EXISTS (
      SELECT 1 FROM public.users u
      WHERE lower(u.email) = 'sgjitbros@gmail.com'
        AND upper(u.role) = 'SUPERADMIN'
        AND upper(u.status) = 'ACTIVE'
    )
  );

DROP POLICY IF EXISTS audit_insert_policy ON public.admin_audit_logs;
CREATE POLICY audit_insert_policy ON public.admin_audit_logs
  FOR INSERT TO authenticated
  WITH CHECK (
    lower(coalesce(auth.jwt()->>'email', '')) = 'sgjitbros@gmail.com'
    AND EXISTS (
      SELECT 1 FROM public.users u
      WHERE lower(u.email) = 'sgjitbros@gmail.com'
        AND upper(u.role) = 'SUPERADMIN'
        AND upper(u.status) = 'ACTIVE'
    )
  );
