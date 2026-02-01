-- Explicitly deny anonymous reads on user_roles (addresses WARN about potential exposure)
-- Corrected quoting for dynamic SQL.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_roles'
      AND policyname = 'Deny anon read roles'
  ) THEN
    EXECUTE 'CREATE POLICY "Deny anon read roles" ON public.user_roles FOR SELECT TO anon USING (false);';
  END IF;
END $$;
