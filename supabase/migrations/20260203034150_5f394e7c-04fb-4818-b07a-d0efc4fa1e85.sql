-- Fix leads table RLS: Make admin SELECT policy PERMISSIVE so admins can actually read leads
-- Currently all policies are RESTRICTIVE, which means no one can access the table since
-- RESTRICTIVE policies only add restrictions on top of PERMISSIVE policies

-- Drop the existing restrictive SELECT policy
DROP POLICY IF EXISTS "Admins can read leads" ON public.leads;

-- Create a PERMISSIVE SELECT policy for admins only
CREATE POLICY "Admins can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also fix DELETE policy to be PERMISSIVE for admins
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;

CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));