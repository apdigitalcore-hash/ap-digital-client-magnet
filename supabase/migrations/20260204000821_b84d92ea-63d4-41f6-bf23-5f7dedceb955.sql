-- Add explicit anonymous denial policy for leads table (defense-in-depth)
-- This makes the security posture explicit and prevents configuration drift

DROP POLICY IF EXISTS "Deny anonymous read leads" ON public.leads;
CREATE POLICY "Deny anonymous read leads"
ON public.leads
FOR SELECT
TO anon
USING (false);

DROP POLICY IF EXISTS "Deny anonymous update leads" ON public.leads;
CREATE POLICY "Deny anonymous update leads"
ON public.leads
FOR UPDATE
TO anon
USING (false);

DROP POLICY IF EXISTS "Deny anonymous delete leads" ON public.leads;
CREATE POLICY "Deny anonymous delete leads"
ON public.leads
FOR DELETE
TO anon
USING (false);