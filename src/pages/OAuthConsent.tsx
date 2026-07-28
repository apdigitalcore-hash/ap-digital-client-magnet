import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Check, List, MapPin, DollarSign, Mail, Shield } from "lucide-react";

const MCP_TOOLS = [
  {
    icon: List,
    name: "list_services",
    label: "Services catalog",
    description: "Read the list of marketing services AP Digital offers (Paid Ads, Social Media).",
  },
  {
    icon: MapPin,
    name: "list_locations",
    label: "Service locations",
    description: "Read the BC cities AP Digital serves (Vancouver, Surrey, Burnaby, and more).",
  },
  {
    icon: DollarSign,
    name: "get_pricing",
    label: "Pricing tiers",
    description: "Read per-service monthly pricing in CAD. Month-to-month, no contracts.",
  },
  {
    icon: Mail,
    name: "get_contact_info",
    label: "Contact & booking",
    description: "Read public contact channels (email, phone) and the Calendly booking link.",
  },
];


// Beta @supabase/supabase-js auth.oauth namespace — type shim.
type AuthorizationDetails = {
  client?: { name?: string; redirect_uri?: string };
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

function getOAuth(): OAuthApi | null {
  const anyAuth = (supabase.auth as unknown) as { oauth?: OAuthApi };
  return anyAuth.oauth ?? null;
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const oauth = getOAuth();
      if (!oauth) {
        setError("OAuth authorization is not available in this build.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    const oauth = getOAuth();
    if (!oauth) return;
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8">
          <h1 className="text-xl font-bold mb-2">Authorization error</h1>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </main>
    );
  }

  const clientName = details.client?.name ?? "an app";
  const redirectUri = details.client?.redirect_uri;
  const userEmail = undefined; // Optional: could fetch from session
  const scopeString = details.scope?.trim();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-teal mb-4">
          <Shield className="w-3.5 h-3.5" /> Authorization request
        </div>
        <h1 className="font-display text-2xl font-bold mb-2 text-foreground">
          Connect <span className="text-teal">{clientName}</span> to AP Digital
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {clientName} is requesting access to call this app's MCP tools as you.
        </p>

        {redirectUri && (
          <div className="rounded-lg border border-border bg-background/50 px-3 py-2 mb-6 text-xs">
            <span className="text-muted-foreground">Redirects to: </span>
            <span className="font-mono text-foreground break-all">{redirectUri}</span>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            {clientName} will be able to:
          </h2>
          <ul className="space-y-3">
            {MCP_TOOLS.map((tool) => (
              <li key={tool.name} className="flex gap-3 rounded-lg border border-border bg-background/40 p-3">
                <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <tool.icon className="w-4 h-4 text-teal" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{tool.label}</p>
                    <code className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                      {tool.name}
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-teal/5 border border-teal/20 p-3 mb-6">
          <div className="flex gap-2 text-xs text-muted-foreground">
            <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" strokeWidth={3} />
            <p>
              All tools are <span className="text-foreground font-semibold">read-only</span>. This does not bypass this app's permissions or backend policies, and {clientName} cannot modify your account.
            </p>
          </div>
        </div>

        {scopeString && (
          <details className="mb-6 text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              Requested scope string
            </summary>
            <code className="block mt-2 p-2 rounded bg-muted font-mono text-muted-foreground break-all">
              {scopeString}
            </code>
          </details>
        )}

        <div className="flex gap-3">
          <Button onClick={() => decide(true)} disabled={busy} className="flex-1">
            {busy ? "Please wait…" : `Approve ${clientName}`}
          </Button>
          <Button onClick={() => decide(false)} disabled={busy} variant="secondary" className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </main>
  );
}

