# Breadcrumbs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `Breadcrumbs` component to every non-home page that renders both a visible `<nav>` for visitors and a `BreadcrumbList` JSON-LD `<script>` for search engines from a single `items` prop.

**Architecture:** One combined component (`shared/components/breadcrumbs`) emits a `<script type="application/ld+json">` and a `<nav>` from the same `items` prop. Two co-located helpers (`buildSectionItems`, `buildPostItems`) build the items array; labels are sourced from the existing `navigationItems` (so visible labels and JSON-LD are always in sync with the site nav). Mounted page-by-page at the top of the page content — except for `/blogi/[slug]`, where it sits inside `<article>` between `<BlogHero>` and `<BlogText>`.

**Tech Stack:** React 19 server components, Next.js 16 (`next/link`), vanilla-extract (`style` + layers), TypeScript, Storybook.

**Spec:** `docs/superpowers/specs/2026-06-06-breadcrumbs-design.md`

**Notes for the executor:**
- This codebase does not have vitest unit tests for components or utils — it uses Storybook stories for component verification and `bun next build` for type-checking. Do not add `*.test.ts` files.
- Pre-commit hooks run `biome format --write` and `biome check` on staged files automatically — no need to run them manually before committing.
- All file paths are relative to the repo root unless prefixed `apps/web/...`.
- Commit messages follow gitmoji + Angular conventional format (`feat: ✨ ...`, `chore: 💄 ...`, etc.).
- Co-author trailer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.

---

### Task 1: Create the `build-items.ts` helpers

**Files:**
- Create: `apps/web/src/shared/components/breadcrumbs/build-items.ts`

- [ ] **Step 1: Create the file**

Create `apps/web/src/shared/components/breadcrumbs/build-items.ts` with this content:

```ts
import { navigationItems } from '@/features/layout/components/navigation/index.data';
import { PAGE_BLOGS_SLUG } from '@/features/sanity/constants/pages-slugs';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

function findNavLabel(href: string): string {
  const item = navigationItems.find((entry) => entry.href === href);

  if (!item) {
    throw new Error(`No navigationItems entry registered for href: ${href}`);
  }

  return item.label;
}

export function buildSectionItems(href: string): BreadcrumbItem[] {
  return [
    { name: findNavLabel('/'), href: '/' },
    { name: findNavLabel(href), href },
  ];
}

export function buildPostItems(slug: string, title: string): BreadcrumbItem[] {
  const blogHref = `/${PAGE_BLOGS_SLUG}`;

  return [
    { name: findNavLabel('/'), href: '/' },
    { name: findNavLabel(blogHref), href: blogHref },
    { name: title, href: `${blogHref}/${slug}` },
  ];
}
```

- [ ] **Step 2: Verify it type-checks**

Run:
```bash
cd apps/web && bun next build
```
Expected: Build succeeds (the helpers are pure TS, no usage yet — should not error).

If build fails for unrelated reasons (e.g. environment variables, Sanity fetch), that's pre-existing and not caused by this change — proceed.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/breadcrumbs/build-items.ts
git commit -m "$(cat <<'EOF'
feat: ✨ add breadcrumb item builders

`buildSectionItems(href)` and `buildPostItems(slug, title)` return
breadcrumb chains sourced from `navigationItems` so visible labels
and JSON-LD share one source of truth.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Create the `styles.css.ts` styles

**Files:**
- Create: `apps/web/src/shared/components/breadcrumbs/styles.css.ts`

- [ ] **Step 1: Create the styles file**

Create `apps/web/src/shared/components/breadcrumbs/styles.css.ts` with this content:

```ts
import { style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color, focus, border } = vars;

export const breadcrumbsNavStyle = style(
  inComponentsLayer({
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
  }),
);

export const breadcrumbsListStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing[2],
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: font.size.sm,
    color: color.foreground,
  }),
);

export const breadcrumbsItemStyle = style(
  inComponentsLayer({
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],

    selectors: {
      '&:not(:last-child)::after': {
        content: '"\\203A"',
        display: 'inline-block',
        opacity: 0.6,
      },
    },
  }),
);

export const breadcrumbsLinkStyle = style(
  inOverridesLayer({
    selectors: {
      '&:link, &:visited': {
        color: color.foreground,
        textDecoration: 'underline',
        textUnderlineOffset: '0.25em',
        opacity: 0.7,
      },
      '&:hover, &:active': {
        opacity: 1,
      },
      '&:focus-visible': {
        outlineOffset: spacing[1],
        outlineStyle: 'solid',
        outlineWidth: focus.width,
        outlineColor: focus.color,
        borderRadius: border.radius.small,
      },
    },
  }),
);

export const breadcrumbsCurrentStyle = style(
  inComponentsLayer({
    fontWeight: font.weight.semibold,
  }),
);
```

Notes:
- `content: '"\\203A"'` is the JS string `"\203A"`, which in CSS becomes `content: "\203A"` — the U+203A SINGLE RIGHT-POINTING ANGLE QUOTATION MARK (`›`).
- The `breadcrumbsLinkStyle` uses `inOverridesLayer` because it overrides the global `a` reset (same pattern as `section-faqs/styles.css.ts`'s `sectionFaqsItemLinkStyle`).
- Other styles use `inComponentsLayer`, matching the rest of the codebase.

- [ ] **Step 2: Verify it type-checks**

Run:
```bash
cd apps/web && bun next build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/breadcrumbs/styles.css.ts
git commit -m "$(cat <<'EOF'
feat: 💄 add breadcrumbs styles

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Create the `Breadcrumbs` component

**Files:**
- Create: `apps/web/src/shared/components/breadcrumbs/index.tsx`

- [ ] **Step 1: Create the component file**

Create `apps/web/src/shared/components/breadcrumbs/index.tsx` with this content:

```tsx
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { getSiteUrl } from '@/shared/utils/get-site-url';

import type { BreadcrumbItem } from './build-items';
import {
  breadcrumbsCurrentStyle,
  breadcrumbsItemStyle,
  breadcrumbsLinkStyle,
  breadcrumbsListStyle,
  breadcrumbsNavStyle,
} from './styles.css';

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

function toAbsoluteUrl(href: string): string {
  const siteUrl = getSiteUrl();

  if (href === '/') {
    return siteUrl;
  }

  return `${siteUrl}${href}`;
}

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ items }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: toAbsoluteUrl(item.href),
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumbs" className={breadcrumbsNavStyle}>
        <ol className={breadcrumbsListStyle}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            if (isLast) {
              return (
                <li
                  key={item.href}
                  aria-current="page"
                  className={`${breadcrumbsItemStyle} ${breadcrumbsCurrentStyle}`}
                >
                  {item.name}
                </li>
              );
            }

            return (
              <li key={item.href} className={breadcrumbsItemStyle}>
                <Link href={item.href} className={breadcrumbsLinkStyle}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
```

Notes:
- The JSON-LD `<script>` and `<nav>` render at the same DOM position via a fragment.
- All items in JSON-LD carry absolute URLs (including the last). The visible nav uses relative paths in `<Link>` so Next.js does client-side navigation.
- The last crumb is `<li aria-current="page">` plain text — no `<Link>`. Bold weight via `breadcrumbsCurrentStyle`.
- The `›` separator is rendered by `breadcrumbsItemStyle`'s `::after` pseudo-element on every `<li>` except `:last-child`. No DOM separator, no screen-reader noise.
- This is a server component (no `'use client'` directive) — sibling existing JSON-LD components are server components too.

- [ ] **Step 2: Verify it type-checks**

Run:
```bash
cd apps/web && bun next build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/breadcrumbs/index.tsx
git commit -m "$(cat <<'EOF'
feat: ✨ add Breadcrumbs component (nav + json-ld)

Renders both `<nav aria-label="Breadcrumbs">` and a BreadcrumbList
JSON-LD `<script>` from a single `items` prop, so visible labels
and structured data cannot drift.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Add Storybook stories

**Files:**
- Create: `apps/web/src/shared/components/breadcrumbs/index.stories.ts`

- [ ] **Step 1: Create the stories file**

Create `apps/web/src/shared/components/breadcrumbs/index.stories.ts` with this content:

```ts
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Breadcrumbs } from '.';

const meta = {
  title: 'Shared/Components/Breadcrumbs',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

const sectionItems = [
  { name: 'Sākums', href: '/' },
  { name: 'Blogi', href: '/blogi' },
];

const postItems = [
  { name: 'Sākums', href: '/' },
  { name: 'Blogi', href: '/blogi' },
  { name: 'Sigirija un tās noslēpums', href: '/blogi/sigirija' },
];

export const SectionLight: Story = {
  args: { items: sectionItems },
  globals: { theme: 'light' },
};

export const SectionDark: Story = {
  args: { items: sectionItems },
  globals: { theme: 'dark' },
};

export const PostLight: Story = {
  args: { items: postItems },
  globals: { theme: 'light' },
};

export const PostDark: Story = {
  args: { items: postItems },
  globals: { theme: 'dark' },
};
```

- [ ] **Step 2: Verify Storybook builds**

Run:
```bash
cd apps/web && bun build-sb
```
Expected: Storybook static build succeeds.

If `build-sb` is too slow or fails on environment reasons, alternatively run `bun sb` and navigate to `Shared / Components / Breadcrumbs` in the browser to confirm the four stories render — then stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/breadcrumbs/index.stories.ts
git commit -m "$(cat <<'EOF'
feat: 📸 add Breadcrumbs stories (section + post, light + dark)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Mount on `/blogi` (BlogsPageLayout)

**Files:**
- Modify: `apps/web/src/shared/components/blogs-page-layout/index.tsx`

- [ ] **Step 1: Update the layout**

Replace the contents of `apps/web/src/shared/components/blogs-page-layout/index.tsx` with:

```tsx
import type { FunctionComponent } from 'react';

import { PAGE_BLOGS_SLUG } from '@/features/sanity/constants/pages-slugs';

import { Breadcrumbs } from '../breadcrumbs';
import { buildSectionItems } from '../breadcrumbs/build-items';
import { SectionBlogs } from '../section-blogs';
import { blogsPageLayoutBlogsStyle, blogsPageLayoutStyle } from './styles.css';

export const BlogsPageLayout: FunctionComponent = () => (
  <div className={blogsPageLayoutStyle}>
    <Breadcrumbs items={buildSectionItems(`/${PAGE_BLOGS_SLUG}`)} />
    <SectionBlogs sectionBlogsClassName={blogsPageLayoutBlogsStyle} />
    <aside>Partnerships</aside>
  </div>
);
```

Note: The `<Breadcrumbs>` is mounted as the first child of the layout, above `<SectionBlogs>`. The `PAGE_BLOGS_SLUG` import keeps the href DRY with the rest of the codebase.

- [ ] **Step 2: Smoke test in the browser**

Run:
```bash
cd apps/web && bun dev
```

Visit `http://localhost:3000/blogi`. Verify:
- A breadcrumb `Sākums › Blogi` appears above the blog list.
- `Sākums` is a link (hovers, navigates to `/`); `Blogi` is plain bold text.
- View page source and confirm a `<script type="application/ld+json">` containing a `BreadcrumbList` with two items is present.

Stop the dev server (Ctrl-C).

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/blogs-page-layout/index.tsx
git commit -m "$(cat <<'EOF'
feat: ✨ add breadcrumbs to blog listing page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Mount on `/blogi/[slug]` (BlogPageLayout)

**Files:**
- Modify: `apps/web/src/shared/components/blog-page-layout/index.tsx`

- [ ] **Step 1: Update the layout**

In `apps/web/src/shared/components/blog-page-layout/index.tsx`, make these changes:

**(a)** Add two imports near the top of the existing import block (keep the surrounding imports in place):

```tsx
import { Breadcrumbs } from '../breadcrumbs';
import { buildPostItems } from '../breadcrumbs/build-items';
```

**(b)** Inside the returned JSX, insert `<Breadcrumbs>` between `</BlogHero>` and `<BlogText>`. The article section should look like this:

```tsx
<article className={blogPageLayoutArticleStyle}>
  <BlogHero>
    <BlogHeroTitle>{post.title}</BlogHeroTitle>
    <BlogHeroAuthor publishedAt={post.publishedAt} />
  </BlogHero>
  <Breadcrumbs items={buildPostItems(slug, post.title ?? '')} />
  <BlogText body={post.body} />
</article>
```

Note: `post.title` can be `null` per the Sanity type; falling back to an empty string mirrors how `BlogPostJsonLd` already handles this (line 47).

- [ ] **Step 2: Smoke test in the browser**

Run:
```bash
cd apps/web && bun dev
```

Visit any blog post URL (e.g. `http://localhost:3000/blogi/<existing-slug>`). Verify:
- A breadcrumb `Sākums › Blogi › <post title>` appears inside the article, between the title/author block and the body text.
- `Sākums` and `Blogi` are links; the post title is plain bold text.
- View page source and confirm a second `<script type="application/ld+json">` (alongside the existing `BlogPosting` one) containing a `BreadcrumbList` with three items.

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/blog-page-layout/index.tsx
git commit -m "$(cat <<'EOF'
feat: ✨ add breadcrumbs to single blog post page

Mounted between the hero (title + author) and the body text, so the
chain reads naturally just above the first paragraph.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Mount on the four remaining static pages

**Files:**
- Modify: `apps/web/src/app/products/page.tsx`
- Modify: `apps/web/src/app/about-me/page.tsx`
- Modify: `apps/web/src/app/contact/page.tsx`
- Modify: `apps/web/src/app/flight-tickets/page.tsx`

Each page wraps its existing returned element in a fragment with `<Breadcrumbs>` as the first child. All four follow the same pattern; replace each file individually with the content below.

- [ ] **Step 1: Update `products/page.tsx`**

Replace `apps/web/src/app/products/page.tsx` with:

```tsx
import { PAGE_PRODUCTS_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = () => buildPageMetadata(PAGE_PRODUCTS_SLUG);

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs items={buildSectionItems(`/${PAGE_PRODUCTS_SLUG}`)} />
      <span>Products Page</span>
    </>
  );
}
```

- [ ] **Step 2: Update `about-me/page.tsx`**

Replace `apps/web/src/app/about-me/page.tsx` with:

```tsx
import type { Metadata } from 'next';

import { PAGE_ABOUT_ME_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_ABOUT_ME_SLUG);

export default function AboutMePage() {
  return (
    <>
      <Breadcrumbs items={buildSectionItems(`/${PAGE_ABOUT_ME_SLUG}`)} />
      <span>About Me Page</span>
    </>
  );
}
```

- [ ] **Step 3: Update `contact/page.tsx`**

Replace `apps/web/src/app/contact/page.tsx` with:

```tsx
import type { Metadata } from 'next';

import { PAGE_CONTACT_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_CONTACT_SLUG);

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={buildSectionItems(`/${PAGE_CONTACT_SLUG}`)} />
      <span>Contact Page</span>
    </>
  );
}
```

- [ ] **Step 4: Update `flight-tickets/page.tsx`**

Replace `apps/web/src/app/flight-tickets/page.tsx` with:

```tsx
import { PAGE_FLIGHT_TICKETS_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import flightData from '@/features/serpapi/data/flight-data.json';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = () => buildPageMetadata(PAGE_FLIGHT_TICKETS_SLUG);

export default function FlightCalendarPage() {
  return (
    <>
      <Breadcrumbs items={buildSectionItems(`/${PAGE_FLIGHT_TICKETS_SLUG}`)} />
      <div>
        {flightData.months.map((month) => (
          <div key={month.month}>
            <ul>
              <li>{month.label}</li>
              <li>Average price to fly from Riga to Colombo: {month.averagePrice}</li>
              <li>Cheapest price to fly from Riga to Colombo: {month.lowestPrice}</li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 5: Smoke test all four pages**

Run:
```bash
cd apps/web && bun dev
```

Visit each:
- `http://localhost:3000/produkti` → `Sākums › Produkti`
- `http://localhost:3000/par-mani` → `Sākums › Par mani`
- `http://localhost:3000/kontakti` → `Sākums › Kontakti`
- `http://localhost:3000/letakie-lidojumi-uz-srilanku-no-rigas` → `Sākums › Lidojumu cenas`

On each page, verify:
- The breadcrumb chain is correct (two crumbs, first as link, second as bold plain text).
- View source contains a `<script type="application/ld+json">` with a two-item `BreadcrumbList`.

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/app/products/page.tsx apps/web/src/app/about-me/page.tsx apps/web/src/app/contact/page.tsx apps/web/src/app/flight-tickets/page.tsx
git commit -m "$(cat <<'EOF'
feat: ✨ add breadcrumbs to products, about-me, contact, flight-tickets

Each static page mounts <Breadcrumbs> as the first child of its
returned content so the visible chain sits directly under the header.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Final full-site verification

**Files:** None (verification only).

- [ ] **Step 1: Full production build**

Run:
```bash
cd apps/web && bun next build
```
Expected: Build succeeds with no type errors and no missing-href errors from `findNavLabel`.

- [ ] **Step 2: Validate JSON-LD with Google's Rich Results Test (optional but recommended)**

For each affected page (once deployed to a staging URL), paste the URL into https://search.google.com/test/rich-results and confirm the `BreadcrumbList` is detected without errors. Locally, you can copy the rendered `<script type="application/ld+json">` content from page source and paste it into https://validator.schema.org instead.

- [ ] **Step 3: Final summary commit (only if anything was tweaked)**

If steps 1 or 2 turned up an issue and you tweaked code, commit it. Otherwise no commit is needed — the plan is complete.

---

## Spec coverage checklist

Mark each spec requirement as covered after walking through the plan:

- Component at `shared/components/breadcrumbs/index.tsx` → Task 3
- Styles at `shared/components/breadcrumbs/styles.css.ts` → Task 2
- Helpers at `shared/components/breadcrumbs/build-items.ts` → Task 1
- `<nav aria-label="Breadcrumbs">` with `<ol>`, `<li>` per crumb, last with `aria-current="page"` → Task 3
- `›` separator via CSS pseudo-element → Task 2 (selector) + Task 3 (no DOM separator)
- JSON-LD `BreadcrumbList` with absolute URLs for every item → Task 3 (`toAbsoluteUrl`)
- Labels from `navigationItems` → Task 1
- Throws if href missing in `navigationItems` → Task 1 (`findNavLabel`)
- Mount on `/blogi` (above SectionBlogs) → Task 5
- Mount on `/blogi/[slug]` (between BlogHero and BlogText) → Task 6
- Mount on `/produkti`, `/par-mani`, `/kontakti`, `/letakie-...` → Task 7
- Storybook stories → Task 4
- No change to existing `HomeJsonLd` or `BlogPostJsonLd` → confirmed (no task touches them)
