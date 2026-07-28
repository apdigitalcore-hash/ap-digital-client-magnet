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

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Connect {clientName} to AP Digital</h1>
        <p className="text-sm text-gray-400 mb-4">
          {clientName} will be able to call this app's enabled tools while you are signed in.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          This does not bypass this app's permissions or backend policies.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => decide(true)} disabled={busy} className="flex-1">
            {busy ? "Please wait…" : "Approve"}
          </Button>
          <Button onClick={() => decide(false)} disabled={busy} variant="secondary" className="flex-1">
            Cancel connection
          </Button>
        </div>
      </div>
    </main>
  );
}
