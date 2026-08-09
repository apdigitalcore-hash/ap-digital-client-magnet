import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS - restrict to known domains
const allowedOrigins = [
  "https://ap-digital.ca",
  "https://www.ap-digital.ca",
  "https://apdigital.lovable.app",
  "https://id-preview--5016096a-1f2a-4fc5-a0a5-ef8947dc9e8f.lovable.app",
];

// Add development origins if in development mode
if (Deno.env.get("ENVIRONMENT") === "development") {
  allowedOrigins.push("http://localhost:8080", "http://localhost:5173");
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const safeOrigin = origin || "";
  if (allowedOrigins.some((allowed) => safeOrigin.startsWith(allowed) || safeOrigin.includes(".lovableproject.com") || safeOrigin.includes(".lovable.app"))) {
    return {
      "Access-Control-Allow-Origin": safeOrigin,
      "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
      "Vary": "Origin",
    };
  }
  return {};
}

// In-memory rate limiting (resets on function restart, but provides basic protection)
const rateLimits = new Map<string, number[]>();
const MAX_SUBMISSIONS = 30; // max submissions per time window
const TIME_WINDOW = 3600000; // 1 hour in milliseconds

// Allowed niche values
const ALLOWED_NICHES = ["salon", "real-estate", "trades", "coaching", "other"];

// Validation regex patterns
const NAME_REGEX = /^[a-zA-Z\s\-'\.]+$/;
const PHONE_REGEX = /^[\d\s\+\-\(\)]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LeadData {
  name: string;
  email: string;
  business: string;
  phone?: string | null;
  niche: string;
  source?: string | null;
}

function validateLeadData(data: unknown): { valid: boolean; data?: LeadData; errors?: string[] } {
  const errors: string[] = [];
  
  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Invalid request body"] };
  }

  const input = data as Record<string, unknown>;

  // Name validation
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name) {
    errors.push("Name is required");
  } else if (name.length > 100) {
    errors.push("Name must be less than 100 characters");
  } else if (!NAME_REGEX.test(name)) {
    errors.push("Name contains invalid characters");
  }

  // Email validation
  const email = typeof input.email === "string" ? input.email.trim() : "";
  if (!email) {
    errors.push("Email is required");
  } else if (email.length > 255) {
    errors.push("Email must be less than 255 characters");
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push("Invalid email address");
  }

  // Business validation
  const business = typeof input.business === "string" ? input.business.trim() : "";
  if (!business) {
    errors.push("Business name is required");
  } else if (business.length > 200) {
    errors.push("Business name must be less than 200 characters");
  }

  // Phone validation (optional)
  let phone: string | null = null;
  if (input.phone !== undefined && input.phone !== null && input.phone !== "") {
    phone = typeof input.phone === "string" ? input.phone.trim() : "";
    if (phone.length > 20) {
      errors.push("Phone number must be less than 20 characters");
    } else if (!PHONE_REGEX.test(phone)) {
      errors.push("Phone contains invalid characters");
    }
  }

  // Niche validation
  const niche = typeof input.niche === "string" ? input.niche.trim() : "";
  if (!niche) {
    errors.push("Industry selection is required");
  } else if (!ALLOWED_NICHES.includes(niche)) {
    errors.push("Invalid industry selection");
  }

  // Source tracking (optional)
  let source: string | null = null;
  if (input.source !== undefined && input.source !== null && input.source !== "") {
    source = typeof input.source === "string" ? input.source.trim() : null;
    if (source && source.length > 100) {
      errors.push("Source must be less than 100 characters");
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: { name, email, business, phone, niche, source },
  };
}

function getClientIP(req: Request): string {
  // Try various headers for client IP
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const submissions = rateLimits.get(ip) || [];
  
  // Filter to only recent submissions within time window
  const recentSubmissions = submissions.filter((time) => now - time < TIME_WINDOW);
  
  // Update the map with filtered submissions
  rateLimits.set(ip, recentSubmissions);
  
  return recentSubmissions.length >= MAX_SUBMISSIONS;
}

function recordSubmission(ip: string): void {
  const now = Date.now();
  const submissions = rateLimits.get(ip) || [];
  submissions.push(now);
  rateLimits.set(ip, submissions);
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Reject requests from disallowed origins
  if (Object.keys(corsHeaders).length === 0) {
    return new Response(
      JSON.stringify({ error: "Forbidden" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const clientIP = getClientIP(req);
    
    // Check rate limit
    if (isRateLimited(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Too many submissions. Please try again later.",
          code: "RATE_LIMITED" 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateLeadData(body);
    if (!validation.valid || !validation.data) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validation.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for insert
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // DB-backed rate limit by email (defense against spoofed X-Forwarded-For).
    // Allow at most MAX_SUBMISSIONS by the same email within TIME_WINDOW.
    const since = new Date(Date.now() - TIME_WINDOW).toISOString();
    const { count: recentByEmail, error: countError } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("email", validation.data.email)
      .gte("created_at", since);

    if (countError) {
      console.error("Rate limit check failed:", countError);
    } else if ((recentByEmail ?? 0) >= MAX_SUBMISSIONS) {
      console.log(`Email rate limit exceeded for: ${validation.data.email}`);
      return new Response(
        JSON.stringify({
          error: "Too many submissions. Please try again later.",
          code: "RATE_LIMITED",
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert the lead
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: validation.data.name,
        email: validation.data.email,
        business: validation.data.business,
        phone: validation.data.phone,
        niche: validation.data.niche,
        source: validation.data.source,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to submit lead. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record successful submission for rate limiting
    recordSubmission(clientIP);

    console.log(`Lead submitted successfully: ${data.id}`);

    // Send email notification via Resend. Surface the outcome in the
    // response so the frontend / logs can see whether email actually sent
    // (previously this was non-blocking and silently swallowed errors).
    let emailStatus: "sent" | "skipped" | "failed" = "skipped";
    let emailError: string | null = null;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log(`[submit-lead] RESEND_API_KEY present: ${resendApiKey ? "yes" : "no"}`);
    if (resendApiKey) {
      try {
        const escapeHtml = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

        const lead = validation.data;
        const nicheLabels: Record<string, string> = {
          "salon": "Salon / Beauty",
          "real-estate": "Real Estate",
          "trades": "Trades / Contractors",
          "coaching": "Coaching / Consulting",
          "other": "Other",
        };

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "AP Digital Leads <leads@ap-digital.ca>",
            to: ["apdigital.core@gmail.com"],
            reply_to: lead.email,
            subject: `New Lead: ${lead.name} — ${lead.business}`,
            html: `
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;">
                <div style="background:#fff;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                  <h2 style="margin:0 0 8px;color:#0f172a;">New Lead from ap-digital.ca</h2>
                  <p style="margin:0 0 24px;color:#64748b;font-size:14px;">A new contact form submission just came in.</p>
                  <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#64748b;width:120px;">Name</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;font-weight:600;">${escapeHtml(lead.name)}</td></tr>
                    <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#64748b;">Email</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;"><a href="mailto:${escapeHtml(lead.email)}" style="color:#0d9488;">${escapeHtml(lead.email)}</a></td></tr>
                    <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#64748b;">Business</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;font-weight:600;">${escapeHtml(lead.business)}</td></tr>
                    <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#64748b;">Phone</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;">${lead.phone ? `<a href="tel:${escapeHtml(lead.phone)}" style="color:#0d9488;">${escapeHtml(lead.phone)}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}</td></tr>
                    <tr><td style="padding:12px 0;color:#64748b;">Industry</td><td style="padding:12px 0;color:#0f172a;font-weight:600;">${escapeHtml(nicheLabels[lead.niche] || lead.niche)}</td></tr>
                  </table>
                  <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;color:#94a3b8;font-size:12px;">Lead ID: ${data.id}</p>
                    <p style="margin:8px 0 0;color:#94a3b8;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(lead.name)}.</p>
                  </div>
                </div>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error("Resend email failed:", emailResponse.status, errorText);
          emailStatus = "failed";
          emailError = `Resend ${emailResponse.status}: ${errorText}`;
        } else {
          const resendResult = await emailResponse.json();
          console.log(`Email notification sent for lead ${data.id}: ${JSON.stringify(resendResult)}`);
          emailStatus = "sent";
        }
      } catch (err) {
        console.error("Email send error:", err);
        emailStatus = "failed";
        emailError = err instanceof Error ? err.message : String(err);
      }
    } else {
      console.warn("RESEND_API_KEY not set — skipping email notification");
      emailError = "RESEND_API_KEY not configured in Supabase secrets";
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id, emailStatus, emailError }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
