-- Ensure default campus exists
INSERT INTO public.campuses (id, code, name, city, state, country, status)
VALUES ('00000000-0000-0000-0000-000000000000', 'KALVIUM-MAIN', 'Kalvium Technology Campus', 'Bengaluru', 'Karnataka', 'India', 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

-- Allow service_role to manage campuses & audit logs from the secure backend
DROP POLICY IF EXISTS "service_role_campuses" ON public.campuses;
CREATE POLICY "service_role_campuses" ON public.campuses
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_audit" ON public.admin_audit_logs;
CREATE POLICY "service_role_audit" ON public.admin_audit_logs
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
