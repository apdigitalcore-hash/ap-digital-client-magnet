import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const SAMPLE = `keyword,volume,kd,position,url
web developer vancouver,1000,20,-,forgeandsmith.com
web design vancouver,1600,38,-,forgeandsmith.com`;

export default function AdminOpportunityBrief() {
  const navigate = useNavigate();
  const [competitorData, setCompetitorData] = useState("");
  const [seoData, setSeoData] = useState("");
  const [notes, setNotes] = useState("");
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) navigate("/login?next=/admin/opportunity-brief", { replace: true });
    })();
  }, [navigate]);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setBrief(null);
    const { data, error: fnError } = await supabase.functions.invoke("opportunity-brief", {
      body: { competitorData, seoData, notes },
    });
    if (fnError || data?.error) {
      setError(data?.error ?? "Could not generate the brief. Team sign-in is required.");
      setLoading(false);
      return;
    }
    setBrief(data.brief as string);
    setLoading(false);
  };

  const copy = async () => {
    if (!brief) return;
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canSubmit = (competitorData.trim() || seoData.trim()) && !loading;

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <Helmet>
        <title>Opportunity Brief | AP Digital Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Opportunity brief</h1>
          <p className="text-sm text-gray-400 mt-1">
            Paste competitor exports and our own search data, and get a prioritized keyword and content
            plan back.{" "}
            <Link to="/admin/seo" className="underline">
              SEO progress
            </Link>
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="competitor" className="block text-sm font-medium mb-2">
              Competitor data
            </label>
            <textarea
              id="competitor"
              value={competitorData}
              onChange={(e) => setCompetitorData(e.target.value)}
              rows={8}
              placeholder={`Paste a keyword gap or competitor export, e.g.\n${SAMPLE}`}
              className="w-full rounded-lg border border-border bg-card p-3 text-sm font-mono"
            />
          </div>

          <div>
            <label htmlFor="seo" className="block text-sm font-medium mb-2">
              Our SEO data
            </label>
            <textarea
              id="seo"
              value={seoData}
              onChange={(e) => setSeoData(e.target.value)}
              rows={8}
              placeholder="Paste Search Console queries/pages, rankings, or traffic rows for ap-digital.ca"
              className="w-full rounded-lg border border-border bg-card p-3 text-sm font-mono"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2">
              Focus for this brief <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="e.g. we want more trades leads in Surrey and Langley this quarter"
              className="w-full rounded-lg border border-border bg-card p-3 text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => void generate()} disabled={!canSubmit}>
              {loading ? "Building brief…" : "Generate brief"}
            </Button>
            {loading && (
              <span className="text-xs text-gray-400">
                This can take a minute while the model works through the data.
              </span>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-8 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
            {error}
          </div>
        )}

        {brief && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Your brief</h2>
              <Button variant="outline" size="sm" onClick={() => void copy()}>
                {copied ? "Copied" : "Copy markdown"}
              </Button>
            </div>
            <pre className="whitespace-pre-wrap break-words rounded-xl border border-border bg-card p-5 text-sm leading-relaxed">
              {brief}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
