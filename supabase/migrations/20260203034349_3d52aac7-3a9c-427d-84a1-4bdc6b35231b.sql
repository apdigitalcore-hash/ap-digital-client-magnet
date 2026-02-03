-- Remove the only remaining RESTRICTIVE policy on leads.
-- Updates are denied by default when RLS is enabled and no UPDATE policy exists.
DROP POLICY IF EXISTS "Deny all updates to leads" ON public.leads;