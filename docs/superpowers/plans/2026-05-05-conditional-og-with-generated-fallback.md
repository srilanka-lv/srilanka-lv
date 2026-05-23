# Conditional OG with generated fallback — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all three Sanity Open Graph fields optional on blog posts and serve a generated PNG (cover image + white "ripped paper" SVG strips + white logo + white title) via Next's `opengraph-image.tsx` convention when the editor leaves the OG image blank.

**Architecture:** Drop `required()` from the OG schema fields, regenerate types, and let `generateMetadata` serve manual OG when present and fall through to the conventional `opengraph-image.tsx` route when absent. The route runs in Node, queries Sanity, loads a vendored Comme TTF, and renders JSX through `next/og`'s `ImageResponse`.

**Tech Stack:** Next.js 16 (App Router), `next/og` / Satori, Sanity (schema + queries), `@fontsource/comme` (vendored TTF), TypeScript, Bun.

---

## Spec reference

`docs/superpowers/specs/2026-05-05-conditional-og-with-generated-fallback-design.md`

## File map

**Modified:**
- `packages/sanity/src/schemas/objects/open-graph.ts` — drop `.required()` from `openGraphImage`.
- `packages/sanity/src/schemas/documents/blog-posts.tsx` — drop `.required()` on the `openGraph` field.
- `packages/sanity/src/sanity.types.ts` — regenerated.
- `apps/web/src/app/blogs/[slug]/page.tsx` — extend `generateMetadata` with the OG fallback chain.
- `apps/web/package.json` — add `@fontsource/comme` dependency.

**Created:**
- `apps/web/src/shared/fonts/comme/comme-bold-data.ts` — reads vendored TTF as `ArrayBuffer` at module scope.
- `apps/web/src/shared/components/blog-og-image-template/index.tsx` — JSX template (Satori-compatible, inline styles only).
- `apps/web/src/shared/components/blog-og-image-template/logo.tsx` — Satori-compatible inline-SVG `srilanka-lv` wordmark, white fill.
- `apps/web/src/shared/components/blog-og-image-template/cover-image-effect.tsx` — Satori-compatible inline-SVG rip paths, white fill.
- `apps/web/src/shared/components/blog-og-image-template/branded-fallback.tsx` — JSX rendered when the cover image / Sanity query fails.
- `apps/web/src/app/blogs/[slug]/opengraph-image.tsx` — Next convention route; default export returns `ImageResponse`.

---

## Task 1: Make OG fields optional in Sanity

**Files:**
- Modify: `packages/sanity/src/schemas/objects/open-graph.ts`
- Modify: `packages/sanity/src/schemas/documents/blog-posts.tsx`
- Regenerate: `packages/sanity/src/sanity.types.ts`

- [ ] **Step 1: Drop `.required()` from `openGraphImage`**

In `packages/sanity/src/schemas/objects/open-graph.ts`, change the `openGraphImage` field's validation from:

```ts
validation: (rule) =>
  rule.required().custom(imageDimensionsValidator({ width: 1200, height: 630 })),
```

to:

```ts
validation: (rule) =>
  rule.custom(imageDimensionsValidator({ width: 1200, height: 630 })),
```

(`imageDimensionsValidator` already short-circuits on undefined at `packages/sanity/src/schemas/utils/validate-image-dimensions.ts:14`, so no extra guard is needed.)

- [ ] **Step 2: Drop `.required()` from `openGraph` on blog posts**

In `packages/sanity/src/schemas/documents/blog-posts.tsx`, change the `openGraph` field from:

```tsx
defineField({
  title: 'Open Graph',
  name: 'openGraph',
  type: 'openGraph',
  validation: (rule) => rule.required(),
}),
```

to:

```tsx
defineField({
  title: 'Open Graph',
  name: 'openGraph',
  type: 'openGraph',
}),
```

- [ ] **Step 3: Regenerate Sanity types**

Run from repo root:

```bash
bun studio:typegen
```

Expected: writes a fresh `packages/sanity/src/sanity.types.ts`. No errors.

- [ ] **Step 4: Verify the type changed**

Run:

```bash
grep -A 2 "openGraph" packages/sanity/src/sanity.types.ts | head -40
```

Expected: `openGraph` appears as `?:` (optional) on the blog post types, and `openGraphImage` is also optional inside the OG object.

- [ ] **Step 5: Verify TypeScript still compiles**

Run from repo root:

```bash
bunx --bun tsc --noEmit -p apps/web/tsconfig.json
```

Expected: zero errors. (If there are errors, they'll be in `apps/web/src/app/blogs/[slug]/page.tsx` or `blog-page-layout/index.tsx` because `openGraph` is now nullable. They'll be fixed in Task 6 when we update `generateMetadata`. If they appear here too, jot them down — we'll close them out as we go.)

- [ ] **Step 6: Commit**

```bash
git add packages/sanity/src/schemas/objects/open-graph.ts \
        packages/sanity/src/schemas/documents/blog-posts.tsx \
        packages/sanity/src/sanity.types.ts
git commit -m "feat: ✨ make blog post Open Graph fields optional"
```

---

## Task 2: Vendor the Comme font

**Files:**
- Modify: `apps/web/package.json`, `bun.lock`
- Create: `apps/web/src/shared/fonts/comme/comme-bold-data.ts`

- [ ] **Step 1: Install @fontsource/comme**

Run from repo root:

```bash
bun add @fontsource/comme --filter @srilanka/web
```

- [ ] **Step 2: Locate the bundled TTF**

Run:

```bash
ls apps/web/node_modules/@fontsource/comme/files/ | grep -E '700|bold'
```

Expected: at least one file ending in `.ttf` matching weight 700, e.g. `comme-latin-700-normal.ttf`. Note the exact filename — you'll reference it in the next step.

- [ ] **Step 3: Create the font-data util**

Create `apps/web/src/shared/fonts/comme/comme-bold-data.ts`:

```ts
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const fontPath = require.resolve('@fontsource/comme/files/comme-latin-700-normal.ttf');

export const commeBoldData = readFileSync(fontPath);
```

(If Step 2 showed a different filename — e.g. only `.woff` is available — substitute that filename. Satori accepts TTF, OTF, and woff, but TTF is the safest bet.)

- [ ] **Step 4: Verify the file resolves**

Run:

```bash
bunx --bun tsc --noEmit -p apps/web/tsconfig.json
```

Expected: zero new errors related to this file.

- [ ] **Step 5: Commit**

```bash
git add apps/web/package.json bun.lock \
        apps/web/src/shared/fonts/comme/comme-bold-data.ts
git commit -m "feat: ✨ vendor Comme font for Satori OG rendering"
```

---

## Task 3: Build the Satori-compatible SVG components

**Files:**
- Create: `apps/web/src/shared/components/blog-og-image-template/logo.tsx`
- Create: `apps/web/src/shared/components/blog-og-image-template/cover-image-effect.tsx`

- [ ] **Step 1: Create the logo component**

Create `apps/web/src/shared/components/blog-og-image-template/logo.tsx`. Copy each `<path d="...">` from `apps/web/public/images/srilanka-lv.svg` into JSX. The wrapper SVG:

```tsx
type LogoProps = {
  width: number;
};

export function Logo({ width }: LogoProps) {
  const aspectRatio = 576.83 / 109.46;
  const height = width / aspectRatio;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 576.83 109.46"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'flex' }}
    >
      {/* Paste each <path d="..."/> from public/images/srilanka-lv.svg here, with fill="#fff" added */}
      <path fill="#fff" d="M63.19,81.38c.47,10.47..." />
      {/* ...repeat for every path in the source SVG */}
    </svg>
  );
}
```

(Satori requires an explicit `fill` attribute on each path — CSS `fill` rules don't always cascade. Set `fill="#fff"` on every path.)

- [ ] **Step 2: Create the cover image effect component**

Create `apps/web/src/shared/components/blog-og-image-template/cover-image-effect.tsx`. Copy each `<path d="...">` from `apps/web/src/shared/components/cover-image-effect/index.tsx` into JSX. The wrapper:

```tsx
type CoverImageEffectProps = {
  variant: 'top' | 'bottom';
};

export function CoverImageEffect({ variant }: CoverImageEffectProps) {
  return (
    <svg
      width={1200}
      height={48}
      viewBox="0 0 513.73 30.96"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        left: 0,
        ...(variant === 'top' ? { top: 0 } : { bottom: 0, transform: 'rotate(180deg)' }),
      }}
    >
      {/* Paste each <path d="..."/> from cover-image-effect/index.tsx here, with fill="#fff" added */}
      <path fill="#fff" d="M475.63,12.98c..." />
      {/* ...repeat for every path */}
    </svg>
  );
}
```

(Critical: every `<path>` needs `fill="#fff"` explicitly. Don't try to set it on the `<svg>` wrapper — Satori may not propagate.)

- [ ] **Step 3: Verify TypeScript compiles**

Run:

```bash
bunx --bun tsc --noEmit -p apps/web/tsconfig.json
```

Expected: zero new errors.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/shared/components/blog-og-image-template/logo.tsx \
        apps/web/src/shared/components/blog-og-image-template/cover-image-effect.tsx
git commit -m "feat: ✨ add Satori-compatible logo and cover effect SVGs"
```

---

## Task 4: Build the OG image template and branded fallback

**Files:**
- Create: `apps/web/src/shared/components/blog-og-image-template/index.tsx`
- Create: `apps/web/src/shared/components/blog-og-image-template/branded-fallback.tsx`

- [ ] **Step 1: Create the main template**

Create `apps/web/src/shared/components/blog-og-image-template/index.tsx`:

```tsx
import { CoverImageEffect } from './cover-image-effect';
import { Logo } from './logo';

type BlogOgImageTemplateProps = {
  title: string;
  coverImageUrl: string;
  coverImageAlt: string;
};

export function BlogOgImageTemplate({
  title,
  coverImageUrl,
  coverImageAlt,
}: BlogOgImageTemplateProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 1200,
        height: 630,
        display: 'flex',
        backgroundColor: '#fff',
      }}
    >
      {/* Layer 1: cover image */}
      <img
        src={coverImageUrl}
        alt={coverImageAlt}
        width={1200}
        height={630}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Layer 2: dark gradient overlay for legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Layer 5: logo, top-left */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 48,
          display: 'flex',
        }}
      >
        <Logo width={200} />
      </div>

      {/* Layer 6: title, bottom-left.
          display must be '-webkit-box' for Satori's line-clamp support. */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 48,
          right: 48,
          color: 'whitesmoke',
          fontFamily: 'Comme',
          fontWeight: 700,
          fontSize: 68,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {title}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the branded fallback**

Create `apps/web/src/shared/components/blog-og-image-template/branded-fallback.tsx`:

```tsx
import { SITE_NAME } from '@/shared/constants/site-name';

import { Logo } from './logo';

export function BrandedFallback() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        color: 'whitesmoke',
        fontFamily: 'Comme',
        fontWeight: 700,
      }}
    >
      <div style={{ display: 'flex', marginBottom: 32 }}>
        <Logo width={300} />
      </div>
      <div style={{ display: 'flex', fontSize: 36, opacity: 0.8 }}>{SITE_NAME}</div>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run:

```bash
bunx --bun tsc --noEmit -p apps/web/tsconfig.json
```

Expected: zero new errors.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/shared/components/blog-og-image-template/index.tsx \
        apps/web/src/shared/components/blog-og-image-template/branded-fallback.tsx
git commit -m "feat: ✨ build OG image template and branded fallback"
```

---

## Task 5: Create the opengraph-image route

**Files:**
- Create: `apps/web/src/app/blogs/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Write the route file**

Create `apps/web/src/app/blogs/[slug]/opengraph-image.tsx`:

```tsx
import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import { ImageResponse } from 'next/og';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { BlogOgImageTemplate } from '@/shared/components/blog-og-image-template';
import { BrandedFallback } from '@/shared/components/blog-og-image-template/branded-fallback';
import { commeBoldData } from '@/shared/fonts/comme/comme-bold-data';

export const alt = 'Šrilanka.lv blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

const fonts = [
  {
    name: 'Comme',
    data: commeBoldData,
    weight: 700 as const,
    style: 'normal' as const,
  },
];

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpengraphImage({ params }: RouteProps) {
  const { slug } = await params;

  try {
    const post = await sanityRepository.query(blogPostBySlugQuery, { slug });

    if (!post || !post.coverImage) {
      return new ImageResponse(<BrandedFallback />, { ...size, fonts });
    }

    const coverImageUrl = urlForImage(post.coverImage)
      .width(1200)
      .height(630)
      .fit('crop')
      .auto('format')
      .quality(85)
      .url();

    return new ImageResponse(
      <BlogOgImageTemplate
        title={post.title ?? ''}
        coverImageUrl={coverImageUrl}
        coverImageAlt={post.coverImage.alt ?? ''}
      />,
      { ...size, fonts },
    );
  } catch {
    return new ImageResponse(<BrandedFallback />, { ...size, fonts });
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run:

```bash
bunx --bun tsc --noEmit -p apps/web/tsconfig.json
```

Expected: zero new errors. If `urlForImage` complains about `coverImage` being possibly null, the `if (!post || !post.coverImage)` guard above it should be enough — re-check the narrowing.

- [ ] **Step 3: Run the dev server**

Run from repo root:

```bash
bun web:dev
```

Wait for "Ready" output.

- [ ] **Step 4: Visit the OG route in a browser**

In a browser, open `http://localhost:3000/blogs/<some-real-slug>/opengraph-image` (use any blog slug from the dataset).

Expected:
- A 1200×630 PNG renders.
- Cover image fills the canvas.
- White rip strips at top and bottom.
- White logo top-left.
- White post title bottom-left, in Comme.
- Subtle dark gradient at top and bottom.

If the image is blank or broken, check the dev-server console for Satori warnings (especially around CSS properties or font name mismatches).

- [ ] **Step 5: Commit**

Stop the dev server (Ctrl+C). Then:

```bash
git add apps/web/src/app/blogs/[slug]/opengraph-image.tsx
git commit -m "feat: ✨ add opengraph-image route for blog posts"
```

---

## Task 6: Wire up the metadata fallback chain

**Files:**
- Modify: `apps/web/src/app/blogs/[slug]/page.tsx`

- [ ] **Step 1: Add the urlForImage import**

At the top of `apps/web/src/app/blogs/[slug]/page.tsx`, add this import alongside the existing ones (the file currently does not import from `@/features/sanity/utils/url-for-image`):

```ts
import { urlForImage } from '@/features/sanity/utils/url-for-image';
```

- [ ] **Step 2: Update generateMetadata**

Replace the existing `generateMetadata` function in `apps/web/src/app/blogs/[slug]/page.tsx` with:

```ts
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityRepository.query(blogPostBySlugQuery, { slug });

  const ogTitle = post?.openGraph?.openGraphTitle ?? post?.title;
  const ogDescription = post?.openGraph?.openGraphDescription ?? post?.excerpt;
  const ogImage = post?.openGraph?.openGraphImage;

  return {
    title: post?.seo?.metaTitle,
    description: post?.seo?.metaDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(ogImage
        ? {
            images: [
              {
                url: urlForImage(ogImage)
                  .width(1200)
                  .height(630)
                  .fit('crop')
                  .auto('format')
                  .url(),
                width: 1200,
                height: 630,
                alt: ogImage.alt ?? '',
              },
            ],
          }
        : {}),
    },
  };
}
```

(When `images` is omitted, Next auto-injects the URL of `opengraph-image.tsx` into the meta tag.)

- [ ] **Step 3: Verify TypeScript compiles**

Run:

```bash
bunx --bun tsc --noEmit -p apps/web/tsconfig.json
```

Expected: zero errors.

- [ ] **Step 4: Run dev server and view source**

```bash
bun web:dev
```

In a browser, open `http://localhost:3000/blogs/<slug>` for a post that has NO `openGraphImage` set in Sanity (or temporarily clear it in Studio).

View page source. Check the `<head>`.

Expected:
- `<meta property="og:title" content="<post title>">`
- `<meta property="og:description" content="<post excerpt>">`
- `<meta property="og:image" content="/blogs/<slug>/opengraph-image?<hash>">`

For a post that DOES have `openGraphImage` set, the `og:image` URL should point at the Sanity CDN (`cdn.sanity.io/...`).

- [ ] **Step 5: Commit**

Stop the dev server. Then:

```bash
git add apps/web/src/app/blogs/[slug]/page.tsx
git commit -m "feat: ✨ wire generateMetadata to OG fallback chain"
```

---

## Task 7: Manually validate the fallback paths end-to-end

**Files:** none modified — verification only.

- [ ] **Step 1: Test branded fallback path**

In `apps/web/src/app/blogs/[slug]/opengraph-image.tsx`, temporarily insert at the top of the `try` block:

```ts
throw new Error('forced fallback test');
```

Run `bun web:dev`. Visit `http://localhost:3000/blogs/<slug>/opengraph-image`.

Expected: dark grey 1200×630 PNG with white logo centered and "Šrilanka.lv" text under it. No 500 error.

Stop the dev server. Remove the `throw` line. Re-run dev server and verify the normal image renders again.

- [ ] **Step 2: Test post-not-found fallback**

Visit `http://localhost:3000/blogs/this-slug-definitely-does-not-exist/opengraph-image`.

Expected: same branded fallback (no cover image, just logo + site name).

- [ ] **Step 3: Test long title clamping**

Pick a blog post with a title close to or above the 60-char SEO max. Visit its OG URL.

Expected: title fits within 3 lines, no overflow off the canvas. If title overflows, reduce the font size in `blog-og-image-template/index.tsx` (e.g. 68 → 60) and verify again.

- [ ] **Step 4: Test short title positioning**

Pick a blog post with a short title (~30 chars). Visit its OG URL.

Expected: title sits at bottom-left, single line, ~48px from bottom and left edges. Looks intentional — not lonely or off-balance.

- [ ] **Step 5: Verify the build succeeds**

Stop the dev server. Run from repo root:

```bash
bun web:build
```

Expected:
- Build completes without errors.
- Output mentions `opengraph-image` route compilation.
- No Satori-related warnings about missing fonts or invalid CSS.

- [ ] **Step 6: Verify the font is bundled into the standalone output**

This matters because the production Docker image runs the standalone build. If `@fontsource/comme/files/comme-latin-700-normal.ttf` isn't traced into the standalone output, the OG route will 500 in production.

Run:

```bash
find apps/web/.next/standalone -type d -name "@fontsource" -exec ls -R {} \;
```

Expected: the `comme-latin-700-normal.ttf` (or whichever filename you chose in Task 2) appears in the listing.

If it's missing, add a postbuild copy step in `apps/web/package.json`:

```json
"postbuild": "cp -R public .next/standalone/apps/web/ && cp -R .next/static .next/standalone/apps/web/.next/ && mkdir -p .next/standalone/apps/web/node_modules/@fontsource/comme/files && cp node_modules/@fontsource/comme/files/comme-latin-700-normal.ttf .next/standalone/apps/web/node_modules/@fontsource/comme/files/"
```

(Use the actual filename from Task 2 if different.)

Re-run `bun web:build` and re-check.

- [ ] **Step 7: Commit any tweaks**

If you adjusted the font size or other template values during this verification, commit those adjustments:

```bash
git add apps/web/src/shared/components/blog-og-image-template/index.tsx
git commit -m "feat: ✨ tune OG title sizing based on real-content verification"
```

(If no changes were needed, skip the commit.)

---

## Task 8: Final sweep

**Files:** none modified — checks only.

- [ ] **Step 1: Confirm all files committed**

```bash
git status
```

Expected: clean working tree.

- [ ] **Step 2: Confirm full-repo type check**

```bash
bunx --bun tsc --noEmit -p apps/web/tsconfig.json
```

Expected: zero errors.

- [ ] **Step 3: Confirm Biome lints clean**

```bash
bun repo:lint
```

Expected: zero errors. If lint complains about anything in the new files (e.g. `style` object property ordering, ts-ignore comments), fix and re-commit.

- [ ] **Step 4: Confirm runtime page renders**

Run `bun web:dev`. Visit a blog page. Check that nothing about the on-page rendering has regressed (cover image, title, FAQ, JSON-LD all still work).

- [ ] **Step 5: PR description hand-off**

The plan is complete. PR description should include:
- Summary of the change (OG fields are now optional; auto-fallback via `opengraph-image.tsx`).
- Note for reviewers: the `<path>` data in `logo.tsx` and `cover-image-effect.tsx` is verbatim from the existing source SVGs — review for `fill="#fff"` correctness, not for path geometry.
- Post-deploy: validate one OG-overridden post and one fallback post via Twitter / Facebook / LinkedIn debuggers.
