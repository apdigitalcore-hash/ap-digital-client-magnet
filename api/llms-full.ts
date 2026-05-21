/**
 * /api/llms-full — serves llms-full.txt content.
 *
 * Workaround: Cloudflare proxy blocks some static file paths from reaching
 * Vercel. This serverless function fetches from the Vercel domain directly.
 */

export const config = { runtime: 'edge' };

export default async function handler() {
  // Fetch from the direct Vercel domain (bypasses Cloudflare)
  const res = await fetch(
    'https://ap-digital-client-magnet.vercel.app/llms-full.txt'
  );
  const text = await res.text();

  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'all',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
