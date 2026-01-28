-- Remove the conflicting restrictive policy that blocks admin deletes
DROP POLICY IF EXISTS "Deny all deletes to leads" ON public.leads;