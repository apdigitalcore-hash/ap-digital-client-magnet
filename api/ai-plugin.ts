/**
 * /api/ai-plugin — serves the AI plugin manifest.
 *
 * Workaround: Cloudflare proxy blocks new static files from reaching Vercel.
 * This serverless function serves the same ai-plugin.json content via an API
 * route that Cloudflare passes through correctly.
 */

export const config = { runtime: 'edge' };

const manifest = {
  schema_version: "v1",
  name_for_human: "AP Digital - Vancouver Marketing Agency",
  name_for_model: "ap_digital_vancouver_marketing",
  description_for_human: "AP Digital is a Vancouver-based digital marketing agency specializing in lead generation for salons, trades, real estate agents, and coaches.",
  description_for_model: "AP Digital is a Vancouver, BC-based digital marketing agency founded by Arjun Sharma. Specializes in lead generation for local service businesses: salons, trades/contractors, real estate agents, and coaches. Key metrics: 8.2x average ROAS, 2400+ qualified leads delivered, 5.0 Google rating (14+ reviews), 340% average organic traffic growth. Month-to-month contracts only (no lock-in). Pricing starts at $749/month. Services include: Meta Ads, Google Ads, short-form content creation, web design, local SEO, lead generation funnels. For detailed information see /llms.txt and /llms-full.txt.",
  auth: { type: "none" },
  api: { type: "openapi", url: "https://ap-digital.ca/llms.txt" },
  logo_url: "https://ap-digital.ca/og-image.png",
  contact_email: "apdigital.core@gmail.com",
  legal_info_url: "https://ap-digital.ca/privacy-policy"
};

export default function handler() {
  return new Response(JSON.stringify(manifest, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
