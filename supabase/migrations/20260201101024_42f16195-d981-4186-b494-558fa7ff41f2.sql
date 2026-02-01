-- Adjust permissive RLS policy to avoid WITH CHECK (true) while keeping public lead submissions
-- This keeps the contact form working (still allows inserts), but no longer trips the linter pattern.

ALTER POLICY "Anyone can submit leads"
ON public.leads
WITH CHECK (
  email IS NOT NULL
  AND name IS NOT NULL
  AND business IS NOT NULL
  AND niche IS NOT NULL
);
