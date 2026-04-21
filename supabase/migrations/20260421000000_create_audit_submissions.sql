-- Audit submissions from the Marketing Health Score tool
CREATE TABLE public.audit_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  business_name TEXT,
  website_url TEXT,
  industry TEXT NOT NULL,
  answers JSONB NOT NULL,
  scores JSONB NOT NULL,
  overall_score INTEGER NOT NULL,
  weakest_area TEXT NOT NULL,
  analysis_source TEXT NOT NULL DEFAULT 'rule-based',
  analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_submissions_email ON public.audit_submissions(email);
CREATE INDEX idx_audit_submissions_created_at ON public.audit_submissions(created_at DESC);

ALTER TABLE public.audit_submissions ENABLE ROW LEVEL SECURITY;

-- No direct anonymous access — only the edge function (service role) writes.
CREATE POLICY "Deny anonymous select" ON public.audit_submissions
FOR SELECT TO anon USING (false);

CREATE POLICY "Deny anonymous insert" ON public.audit_submissions
FOR INSERT TO anon WITH CHECK (false);

CREATE POLICY "Deny anonymous update" ON public.audit_submissions
FOR UPDATE TO anon USING (false);

CREATE POLICY "Deny anonymous delete" ON public.audit_submissions
FOR DELETE TO anon USING (false);
