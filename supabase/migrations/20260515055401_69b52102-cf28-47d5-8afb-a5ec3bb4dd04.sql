-- Drop the anon INSERT policy: leads only get inserted by the submit-lead edge function (service role)
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;

-- Restrict UPDATE on leads to admins only
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Block anon UPDATE explicitly (deny policy)
-- (Already exists as "Deny anonymous update leads")
