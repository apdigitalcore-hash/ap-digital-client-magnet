# Cloud session brief — expand /contractor-marketing

Paste this whole file as the first message of the cloud session.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` is a prerenderer that writes static HTML per route. **This is what
  Google reads.** A change to a React page that is not mirrored in that file does not reach
  search engines. Every content change must be made in BOTH places.
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (80 tests).

## The task
Deepen one page only: `/contractor-marketing`.
- React page: `src/pages/niches/ContractorMarketing.tsx` (231 lines)
- Prerendered entry: `scripts/inject-meta.js`, the object with `path: 'contractor-marketing'`
  (around line 314) — its `body` string, JSON-LD, and related-links nav.
- Current prerendered body: ~1,719 words. Target: a genuinely more useful page, not padding.

Target terms (monthly volume, difficulty 8/100):
- seo for contractors — 390
- contractor seo — 320
- roofing seo — 320
- contractor marketing agency — 260
- digital marketing for contractors — 210

These are SEO/marketing-service queries, so the page should answer them directly: what
contractor SEO actually involves in Metro Vancouver, how it differs from paid ads, what it
costs, how long it takes, and what a GC should expect month by month. Write in the existing
voice: concrete numbers, no hype, no invented client results.

## Hard constraints
1. **Protected fields — propose, do not edit.** Do not change TITLE, the meta description,
   or the H1 on any page, in either the React file or `inject-meta.js`. If you believe one
   should change, write the proposed new value into
   `docs/proposed-seo-changes-contractor.md` as a before/after diff and leave the code alone.
2. **Do not touch `services/advice-api/` or `supabase/`.** Those carry the claim guard,
   health-audience filter, landing-page handoff detection, and the Gemini budget counter.
   Any change there is out of scope and will be reverted.
3. **One page.** Do not edit other niche or city pages. You may add a link to
   `/contractor-marketing` from existing related-links navs if it is missing, nothing more.
4. **No invented facts.** No client names, no "we increased leads by X%", no case studies.
   Pricing is $759/month, month-to-month, no lock-in, 90-day results guarantee. Business
   location is "Vancouver, BC" with no street address or postal code — do not add one.
5. **No new dependencies.**

## Definition of done
- `npm run build` passes (including the drift assertions in `inject-meta.js`).
- `npm test` passes — all 80 tests, no skips.
- The prerendered output for the route contains the new copy. Verify by grepping the built
  file, e.g. `grep -o 'contractor seo' dist/contractor-marketing/index.html | head`, and
  paste the evidence into the final summary.
- The React page and the prerendered body say the same things — no drift between them.
- One commit, reviewable as a diff without opening a browser. Commit message states what
  changed and the new prerendered word count.
- Final summary lists: word count before/after, which target terms the copy now addresses
  and where, anything you chose not to do, and the contents of
  `docs/proposed-seo-changes-contractor.md` if you wrote it.

## What you cannot do in a cloud session
No browser, and no access to the Lovable, Vercel, or Supabase dashboards. Do not try to
deploy or publish. Everything must be verifiable by build, tests, and diff.
