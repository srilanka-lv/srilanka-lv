# Conditional Open Graph fields with generated fallback (blog posts)

**Status:** Draft
**Date:** 2026-05-05
**Scope:** `apps/web` (blog post pages), `packages/sanity` (schemas)

## Problem

Open Graph fields on blog posts are required in Sanity today (`openGraph` object is `required()`, and `openGraphImage` enforces a 1200×630 upload). This forces editors to produce a designed social card for every post, which is friction we don't need given that every post already has a high-quality cover image and a strong title.

We want to make all three Open Graph fields (`openGraphTitle`, `openGraphDescription`, `openGraphImage`) optional. When the editor leaves the OG image blank, the site should auto-generate one using Next.js's `opengraph-image.tsx` convention, mirroring the visual language of the on-page hero so the social card and the page itself feel like the same thing.

## Goals

- All three OG fields on `blogPosts` become optional.
- When `openGraphImage` is absent, a generated PNG (1200×630) is served via the Next.js convention file.
- The generated image visually echoes the existing blog hero: cover photo as background, white "ripped paper" SVG strips top + bottom (same paths used on the web), white wordmark top-left, white post title bottom-left, dark gradient overlay for legibility.
- Two-tier fallback chain for OG title and description (no cross-talk with the `seo` object).
- No regressions for existing posts that already have manual OG data.

## Non-goals

- Generating OG images for non-blog content (pages, FAQs, products). Out of scope for this iteration; the route file lives under `blogs/[slug]/` and only this folder gets the convention.
- Studio preview of the generated image. The OG image only renders at build/runtime; editors won't see it inside Sanity Studio.
- Sharing-debugger automation. Cache invalidation on Twitter/Facebook is a manual post-deploy step.

## Design

### Fallback chain (two-tier, no `seo` involvement)

| Output | Source order |
|---|---|
| `og:title` | `openGraph.openGraphTitle` ?? `title` |
| `og:description` | `openGraph.openGraphDescription` ?? `excerpt` |
| `og:image` | `openGraph.openGraphImage` (Sanity asset) ?? generated `opengraph-image.png` |

`seo.metaTitle` and `seo.metaDescription` continue to feed only `<title>` and `<meta name="description">`. They are intentionally not part of the OG chain — keeping SEO and OG channels independent matches how editors think about them.

### Sanity schema changes (`packages/sanity`)

**`schemas/objects/open-graph.ts`**
- Drop `.required()` from the `openGraphImage` field's validation rule.
- Keep the existing `imageDimensionsValidator({ width: 1200, height: 630 })` — it short-circuits on undefined values, so it only runs when an image is provided. Verify this during implementation; if the validator does run on `undefined`, wrap it in a guard.

**`schemas/documents/blog-posts.tsx`**
- Drop `validation: (rule) => rule.required()` from the `openGraph` field. The whole object becomes optional.

**`packages/sanity/src/sanity.types.ts`**
- Regenerate via the existing typegen pipeline. `openGraph` becomes `?: { openGraphTitle?: string; openGraphDescription?: string; openGraphImage?: ... } | null` on `BlogPostBySlugQueryResult`.

### Web changes (`apps/web`)

**New file: `apps/web/src/app/blogs/[slug]/opengraph-image.tsx`**

Default export following Next.js's convention:
- Accepts `{ params: { slug } }`.
- Queries Sanity (`DefaultSanityRepository` + `blogPostBySlugQuery`) for `{ title, coverImage }`.
- Builds the cover image URL with `urlForImage(coverImage).width(1200).height(630).fit('crop').auto('format').quality(85).url()` (Sanity CDN respects hotspot data automatically).
- Loads `Comme` TTF once at module scope via `node:fs.readFileSync` and caches the `ArrayBuffer`.
- Returns `new ImageResponse(<Template ... />, { width: 1200, height: 630, fonts: [{ name: 'Comme', data, weight: 700, style: 'normal' }] })`.
- Default Node runtime (not Edge) — we depend on `urlForImage` and the Sanity client.
- Static caching: no `dynamic` export. Next pre-renders one PNG per slug at build.

**Update: `apps/web/src/app/blogs/[slug]/page.tsx`**

Extend `generateMetadata` to populate `openGraph`:

```ts
return {
  title: post?.seo?.metaTitle,
  description: post?.seo?.metaDescription,
  openGraph: {
    title: post?.openGraph?.openGraphTitle ?? post?.title,
    description: post?.openGraph?.openGraphDescription ?? post?.excerpt,
    ...(post?.openGraph?.openGraphImage
      ? {
          images: [
            {
              url: urlForImage(post.openGraph.openGraphImage)
                .width(1200)
                .height(630)
                .fit('crop')
                .auto('format')
                .url(),
              width: 1200,
              height: 630,
              alt: post.openGraph.openGraphImage.alt ?? '',
            },
          ],
        }
      : {}),
    // When images is omitted, Next auto-injects /blogs/[slug]/opengraph-image.
  },
};
```

**No changes needed: `apps/web/src/shared/components/blog-post-json-ld/index.tsx`**

The existing implementation already optional-chains `openGraph?.openGraphImage` and conditionally adds the OG `ImageObject` to the JSON-LD `@graph`. When OG is absent, the JSON-LD silently drops it — acceptable behaviour. (We could later extend it to reference the generated OG URL as an `ImageObject`, but that's out of scope.)

### OG image template

**Canvas:** 1200×630.

**Layer stack (back to front):**

1. **Cover image** — `<img>` filling 100% × 100%, `object-fit: cover`, `object-position: center`. Source via Sanity CDN.
2. **Dark gradient overlay** — `linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.45) 100%)`. Darkens the top + bottom bands where logo and title sit; mostly transparent through the middle so the photo reads. Tunable during impl.
3. **White rip SVG (top)** — paths copied from `apps/web/src/shared/components/cover-image-effect/index.tsx`. `fill: #fff`. 48px tall, full canvas width, anchored top.
4. **White rip SVG (bottom)** — same paths rotated 180°. `fill: #fff`. 48px tall, anchored bottom.
5. **Logo** — `srilanka-lv.svg` paths inlined as JSX with `fill: #fff` (the source SVG is solid black; we override). Top-left, ~48px padding from top + left, sits *on the photo* above the rip strip. Width ~200px (final size to be tuned during impl).
6. **Title** — bottom-left, `whitesmoke`, `Comme` 700, ~64–72px (final size tuned during impl), max 3 lines via `display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden`. ~48px padding from bottom + left, sits *on the photo* above the bottom rip strip.

**Visual rationale:** logo + title sit *on* the photo (not in white space) so the cover photo is the dominant visual. The 48px white rip strips are purely decorative — they tie the OG card to the on-page hero (which uses the same SVG as torn edges between cover and surrounding chrome).

### Font loading

Vendor a `Comme-Bold.ttf` (or whichever weight matches the hero) under `apps/web/src/shared/fonts/comme/` and read it at module scope. The OG route reads the file once per build/process and reuses the `ArrayBuffer`.

We don't share the file with `next/font/google`'s pipeline — that's a different rendering path (browser CSS). One vendored font file (~80KB) is acceptable.

### SVG embedding

- **Logo:** inline the path data in JSX (copy from `apps/web/public/images/srilanka-lv.svg`). Override `fill` to `#fff`.
- **Rip effect:** inline the path data in JSX (copy from `apps/web/src/shared/components/cover-image-effect/index.tsx`). `fill: #fff`. Bottom variant rotated via CSS `transform: rotate(180deg)`.

We deliberately don't reuse the React component — it's authored for browser rendering and lives behind a vanilla-extract import; Satori needs raw inline JSX. Same paths, two consumers. Acceptable duplication.

### Generation strategy

- Static at build, one PNG per slug.
- No `export const dynamic = 'force-dynamic'`.
- Default Node runtime.
- Future: if we add ISR for blogs, the OG image inherits the same revalidation behaviour automatically.

## Error handling

| Scenario | Behaviour |
|---|---|
| Sanity query fails or returns null at build | Catch, render branded fallback (solid background + white logo + site name in Comme). Same 1200×630 PNG. Build does not fail. |
| Cover image fetch fails inside Satori | `try/catch` around the render; on error, fall through to the branded fallback. |
| Cover image hotspot / off-center subject | Sanity CDN respects hotspot automatically. No extra work. |
| Long title (>3 lines worth) | Clamped to 3 lines via `line-clamp`. |
| Short title (1 line) | Sits at bottom-left; no special handling. |
| Existing posts with full OG data | Backwards-compatible. They keep their manual override; nothing about their rendering changes. |

## Testing & verification

- **Local visual:** open `http://localhost:3000/blogs/<slug>/opengraph-image` in a browser; verify multiple slugs render correctly.
- **Long-title slug:** verify clamp at 3 lines, no overflow.
- **Branded fallback path:** temporarily force the Sanity query to throw; verify the fallback PNG still renders.
- **Build:** `bun run build` from `apps/web`; confirm one `opengraph-image.png` per blog slug, no build errors.
- **Type check:** confirm `openGraph` is now optional in `sanity.types.ts` and `BlogPostBySlugQueryResult` after typegen.
- **Post-deploy validation:** Twitter card validator, Facebook Sharing Debugger, LinkedIn Post Inspector for two posts (one with full OG override, one with everything falling back).

No automated tests proposed. Snapshotting Satori PNG output is brittle and the value of these tests is primarily visual.

## Open questions

None remaining at design time. Items to verify during implementation:

- Whether `imageDimensionsValidator` short-circuits cleanly on `undefined` (if not, wrap in a guard).
- Final logo width and title font size — tune visually during impl.
- Which Comme weight matches the hero best — confirm by inspecting `apps/web/src/shared/fonts/fonts.ts` and the hero's computed style.
