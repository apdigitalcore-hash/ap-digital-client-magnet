CREATE TABLE public.seo_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  referring_domains INTEGER,
  backlinks INTEGER,
  authority_score INTEGER,
  gsc_clicks INTEGER,
  gsc_impressions INTEGER,
  gsc_avg_position NUMERIC(6,2),
  organic_leads INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (snapshot_date)
);

GRANT SELECT ON public.seo_snapshots TO authenticated;
GRANT ALL ON public.seo_snapshots TO service_role;

ALTER TABLE public.seo_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read seo snapshots"
ON public.seo_snapshots FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Deny anonymous read seo snapshots"
ON public.seo_snapshots FOR SELECT TO anon
USING (false);