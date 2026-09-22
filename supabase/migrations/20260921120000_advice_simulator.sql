-- ADvice — AI ad campaign simulator.
-- Rows are written only by the advice-simulate edge function (service role).
-- Browsers never read the table directly: shared reports go through
-- get_advice_report(share_id), and signed-in users read only their own rows.

CREATE TABLE IF NOT EXISTS public.advice_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.advice_simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id text NOT NULL UNIQUE,
  -- Returned only to the browser that ran the simulation; lets it attach the
  -- simulation to an account later without trusting the public share_id.
  claim_token uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  campaign_name text,
  channel text NOT NULL,
  industry text NOT NULL,
  creative_score int,
  inputs jsonb NOT NULL,
  results jsonb NOT NULL,
  ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS advice_simulations_user_idx ON public.advice_simulations (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS advice_simulations_ip_idx ON public.advice_simulations (ip_hash, created_at DESC);

ALTER TABLE public.advice_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advice_simulations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "advice_users read own" ON public.advice_users
  FOR SELECT TO authenticated USING (id = auth.uid());

CREATE POLICY "advice_simulations read own" ON public.advice_simulations
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Read-only public view of one report by its share id. Never exposes
-- claim_token, user_id or ip_hash.
CREATE OR REPLACE FUNCTION public.get_advice_report(_share_id text)
RETURNS TABLE (share_id text, campaign_name text, channel text, industry text,
               creative_score int, inputs jsonb, results jsonb, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT s.share_id, s.campaign_name, s.channel, s.industry, s.creative_score,
         s.inputs - 'email', s.results, s.created_at
  FROM public.advice_simulations s
  WHERE s.share_id = _share_id
$$;
GRANT EXECUTE ON FUNCTION public.get_advice_report(text) TO anon, authenticated;

-- Attach anonymous simulations to the signed-in user. Needs the claim tokens
-- the browser received when it ran them; already-owned rows are left alone.
CREATE OR REPLACE FUNCTION public.claim_advice_simulations(_tokens uuid[])
RETURNS int
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n int;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  INSERT INTO public.advice_users (id, email)
    SELECT u.id, u.email FROM auth.users u WHERE u.id = auth.uid()
    ON CONFLICT (id) DO NOTHING;
  UPDATE public.advice_simulations SET user_id = auth.uid()
    WHERE claim_token = ANY(_tokens) AND user_id IS NULL;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n;
END $$;
GRANT EXECUTE ON FUNCTION public.claim_advice_simulations(uuid[]) TO authenticated;
