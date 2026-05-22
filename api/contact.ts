/**
 * /api/contact — receives contact form submissions, sends email via Resend.
 *
 * Requires RESEND_API_KEY environment variable in Vercel.
 * Domain ap-digital.ca must be verified in Resend (it is).
 */

export const config = { runtime: 'edge' };

const ALLOWED_NICHES = ['salon', 'real-estate', 'trades', 'coaching', 'other'] as const;
const NAME_REGEX = /^[a-zA-Z\s\-'\.]+$/;
const PHONE_REGEX = /^[\d\s\+\-\(\)]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NICHE_LABELS: Record<string, string> = {
  'salon': 'Salon / Beauty',
  'real-estate': 'Real Estate',
  'trades': 'Trades / Contractors',
  'coaching': 'Coaching / Consulting',
  'other': 'Other',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

export default async function handler(req: Request) {
  console.log(`[contact] ${req.method} request received from ${req.headers.get('origin') || 'unknown'}`);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const business = typeof body.business === 'string' ? body.business.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const niche = typeof body.niche === 'string' ? body.niche.trim() : '';

  if (!name || name.length > 100 || !NAME_REGEX.test(name)) {
    return jsonResponse({ error: 'Invalid name' }, 400);
  }
  if (!email || email.length > 255 || !EMAIL_REGEX.test(email)) {
    return jsonResponse({ error: 'Invalid email' }, 400);
  }
  if (!business || business.length > 200) {
    return jsonResponse({ error: 'Invalid business name' }, 400);
  }
  if (phone && (phone.length > 20 || !PHONE_REGEX.test(phone))) {
    return jsonResponse({ error: 'Invalid phone' }, 400);
  }
  if (!ALLOWED_NICHES.includes(niche as typeof ALLOWED_NICHES[number])) {
    return jsonResponse({ error: 'Invalid industry' }, 400);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - process.env is available in Vercel Edge Runtime
  const resendApiKey: string | undefined = typeof process !== 'undefined' ? process.env.RESEND_API_KEY : undefined;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY environment variable not set');
    return jsonResponse({ error: 'Email service not configured (missing API key)' }, 500);
  }

  const industryLabel = NICHE_LABELS[niche] || niche;

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AP Digital Leads <leads@ap-digital.ca>',
        to: ['apdigital.core@gmail.com'],
        reply_to: email,
        subject: `New Lead: ${name} — ${business}`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;">
            <div style="background:#fff;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <h2 style="margin:0 0 8px;color:#0f172a;">New Lead from ap-digital.ca</h2>
              <p style="margin:0 0 24px;color:#64748b;font-size:14px;">A new contact form submission just came in.</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#64748b;width:120px;">Name</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;font-weight:600;">${escapeHtml(name)}</td></tr>
                <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#64748b;">Email</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;"><a href="mailto:${escapeHtml(email)}" style="color:#0d9488;">${escapeHtml(email)}</a></td></tr>
                <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#64748b;">Business</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;font-weight:600;">${escapeHtml(business)}</td></tr>
                <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#64748b;">Phone</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;">${phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#0d9488;">${escapeHtml(phone)}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}</td></tr>
                <tr><td style="padding:12px 0;color:#64748b;">Industry</td><td style="padding:12px 0;color:#0f172a;font-weight:600;">${escapeHtml(industryLabel)}</td></tr>
              </table>
              <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;">
                <p style="margin:8px 0 0;color:#94a3b8;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend error:', emailResponse.status, errorText);
      return jsonResponse({ error: 'Failed to send email', detail: errorText }, 502);
    }

    const result = await emailResponse.json();
    return jsonResponse({ success: true, id: result.id }, 200);
  } catch (err) {
    console.error('Unexpected error:', err);
    return jsonResponse({ error: 'Server error' }, 500);
  }
}
