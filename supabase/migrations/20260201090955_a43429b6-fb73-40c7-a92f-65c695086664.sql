-- Fix RLS policies on 'leads' table
-- Problem: All policies are RESTRICTIVE which means they add restrictions but don't grant access
-- Solution: Change admin policies to PERMISSIVE and remove conflicting 'Deny all deletes' policy

-- 1. Drop all existing policies on leads table
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can read leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Deny all updates to leads" ON public.leads;

-- 2. Create proper PERMISSIVE policies for leads
-- Allow anyone to submit leads (public form submission)
CREATE POLICY "Anyone can submit leads"
ON public.leads
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can read leads
CREATE POLICY "Admins can read leads"
ON public.leads
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Deny all updates (using RESTRICTIVE with false for absolute block)
CREATE POLICY "Deny all updates to leads"
ON public.leads
AS RESTRICTIVE
FOR UPDATE
USING (false);

-- Fix RLS policies on 'user_roles' table
-- Problem: RESTRICTIVE policies don't grant access, they only add restrictions
-- Solution: Change to PERMISSIVE policies

-- 3. Drop all existing policies on user_roles table
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- 4. Create proper PERMISSIVE policies for user_roles
-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update roles
CREATE POLICY "Admins can update roles"
ON public.user_roles
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can delete roles
CREATE POLICY "Admins can delete roles"
ON public.user_roles
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));