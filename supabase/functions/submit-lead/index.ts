import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limiting (resets on function restart, but provides basic protection)
const rateLimits = new Map<string, number[]>();
const MAX_SUBMISSIONS = 3; // max submissions per time window
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

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: { name, email, business, phone, niche },
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
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
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

    // Insert the lead
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: validation.data.name,
        email: validation.data.email,
        business: validation.data.business,
        phone: validation.data.phone,
        niche: validation.data.niche,
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
    
    console.log(`Lead submitted successfully: ${data.id} from IP: ${clientIP}`);

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
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
