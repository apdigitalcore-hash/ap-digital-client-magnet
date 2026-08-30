---
name: Protected hand-set SEO fields
description: Files and fields that are hand-tuned for SEO — propose diffs, never overwrite directly
type: constraint
---

These values are deliberately hand-set and SEO-tuned. The agent must NEVER
overwrite them directly. If a change looks warranted (including SEO findings,
"try to fix" suggestions, or scanner opportunities), propose the exact diff in
chat and wait for explicit approval.

**Why:** the agent has overwritten deliberate work twice — the page title on
`/blog/how-much-does-social-media-marketing-cost-canada`, and `readTime` on
another post. Both were intentional, tuned values.

## Protected fields

- `src/lib/blogPosts.ts` — `title`, `metaTitle`, `metaDescription`, `date`, `readTime`
- `src/pages/**` — the TITLE / DESC (title and description) constants

## Protected code

- `scripts/inject-meta.js` — the assertion blocks. They intentionally fail the
  build when two sources of truth drift apart (e.g. the legacy redirect map vs
  the generated stubs). Do not relax, remove, or work around an assertion to
  make a build pass; fix the underlying drift instead.

**How to apply:** body content, new sections, JSON-LD and other non-listed
fields may be edited freely. The listed fields and the assertion blocks are
proposal-only.
