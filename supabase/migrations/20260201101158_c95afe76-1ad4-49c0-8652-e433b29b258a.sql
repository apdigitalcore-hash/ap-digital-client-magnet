-- Reduce exposure of role assignments by removing non-admin SELECT access.
-- Frontend does not query user_roles directly; role checks can rely on the has_role() function.

DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
