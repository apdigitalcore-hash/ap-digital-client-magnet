import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type Snapshot = {
  snapshot_date: string;
  referring_domains: number | null;
  backlinks: number | null;
  authority_score: number | null;
  gsc_clicks: number | null;
  gsc_impressions: number | null;
  gsc_avg_position: number | null;
  organic_leads: number | null;
};

const METRICS: { key: keyof Snapshot; label: string; hint: string }[] = [
  { key: "referring_domains", label: "Referring domains", hint: "Unique sites linking to you" },
  { key: "backlinks", label: "Backlinks", hint: "Total inbound links" },
  { key: "authority_score", label: "Authority score", hint: "Semrush 0–100" },
  { key: "gsc_clicks", label: "Google clicks", hint: "Last 28 days" },
  { key: "gsc_impressions", label: "Impressions", hint: "Last 28 days" },
  { key: "organic_leads", label: "Leads", hint: "Last 90 days" },
];

function delta(history: Snapshot[], key: keyof Snapshot) {
  const values = history.map((h) => h[key]).filter((v) => typeof v === "number") as number[];
  if (values.length < 2) return null;
  return values[values.length - 1] - values[0];
}

export default function AdminSeo() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<{ semrush: boolean; search_console: boolean } | null>(null);
  const [metric, setMetric] = useState<keyof Snapshot>("referring_domains");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      navigate("/login?next=/admin/seo", { replace: true });
      return;
    }
    const { data, error: fnError } = await supabase.functions.invoke("seo-snapshot", { body: {} });
    if (fnError) {
      setError("Could not load SEO data. Admin access is required.");
      setLoading(false);
      return;
    }
    setHistory((data?.history ?? []) as Snapshot[]);
    setSources(data?.sources ?? null);
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  const latest = history[history.length - 1];

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <Helmet>
        <title>SEO Progress | AP Digital Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">SEO progress</h1>
            <p className="text-sm text-gray-400 mt-1">
              Referring domains, backlinks and organic performance over time.
            </p>
          </div>
          <Button onClick={() => void load()} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh snapshot"}
          </Button>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm mb-8">
            {error}{" "}
            <Link to="/login?next=/admin/seo" className="underline">
              Sign in
            </Link>
          </div>
        )}

        {!error && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {METRICS.map((m) => {
                const value = latest?.[m.key];
                const d = delta(history, m.key);
                return (
                  <button
                    key={m.key}
                    onClick={() => setMetric(m.key)}
                    className={`text-left rounded-xl border p-4 transition-colors ${
                      metric === m.key ? "border-primary bg-card" : "border-border bg-card/50 hover:border-primary/50"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wide text-gray-400">{m.label}</div>
                    <div className="text-2xl font-bold mt-1">
                      {typeof value === "number" ? value : "—"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {d !== null && d !== 0 ? `${d > 0 ? "+" : ""}${d} since first snapshot` : m.hint}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-border bg-card p-4 h-80">
              {history.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="snapshot_date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={metric as string}
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-gray-400 text-center px-6">
                  {loading
                    ? "Loading…"
                    : "First snapshot recorded. Come back after another refresh on a later day to see the trend line."}
                </div>
              )}
            </div>

            {sources && (
              <p className="text-xs text-gray-400 mt-4">
                Sources: Semrush {sources.semrush ? "connected" : "unavailable"} · Search Console{" "}
                {sources.search_console ? "connected" : "unavailable"} · Leads from your database.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
