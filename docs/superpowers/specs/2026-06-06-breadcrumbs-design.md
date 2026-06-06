# Breadcrumbs Design

## Overview

A `Breadcrumbs` component at `apps/web/src/shared/components/breadcrumbs/` that renders both a visible `<nav>` for visitors and a `BreadcrumbList` JSON-LD `<script>` for search engines from a single `items` prop. One source of truth — visible labels and structured data cannot drift.

## Coverage

| Page | URL | Chain |
| --- | --- | --- |
| Blog listing | `/blogi` | Sākums › Blogi |
| Blog post | `/blogi/[slug]` | Sākums › Blogi › *post title* |
| Products | `/produkti` | Sākums › Produkti |
| Flight tickets | `/letakie-lidojumi-uz-srilanku-no-rigas` | Sākums › Lidojumu cenas |
| About me | `/par-mani` | Sākums › Par mani |
| Contact | `/kontakti` | Sākums › Kontakti |

Home (`/`) gets no breadcrumb — it's the top of the tree.

## Files

- `apps/web/src/shared/components/breadcrumbs/index.tsx` — component that renders nav + JSON-LD
- `apps/web/src/shared/components/breadcrumbs/styles.css.ts` — vanilla-extract styles
- `apps/web/src/shared/components/breadcrumbs/build-items.ts` — `buildSectionItems` and `buildPostItems`

## Component

### Props

```ts
type BreadcrumbItem = { name: string; url: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};
```

### Output

The component returns a fragment with two siblings, both rendered at the call-site's DOM position:

1. `<script type="application/ld+json">` containing `@context: 'https://schema.org'` and `@graph: [BreadcrumbList]`. Every item — including the last — carries a URL in `itemListElement[*].item`.
2. `<nav aria-label="Breadcrumbs">` containing an `<ol>`. Each crumb is an `<li>` (only `<li>` elements are direct children of `<ol>` — keeps the markup valid). All crumbs except the last contain an `<a>` link to the crumb's URL. The last crumb is plain text inside `<li aria-current="page">`. The `›` (U+203A) separator is rendered via a CSS `::after` pseudo-element on every `<li>` except `:last-child` — no DOM node, no screen-reader noise, valid HTML.

### Markup shape (blog post example)

```html
<nav aria-label="Breadcrumbs">
  <ol>
    <li><a href="/">Sākums</a></li>
    <li><a href="/blogi">Blogi</a></li>
    <li aria-current="page">Sigirija un tās noslepums</li>
  </ol>
</nav>
```

The `›` character between crumbs is rendered by the stylesheet (`li:not(:last-child)::after { content: '\\203A'; … }`), not present in the DOM.

### JSON-LD shape

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Sākums",  "item": "https://…/" },
        { "@type": "ListItem", "position": 2, "name": "Blogi",   "item": "https://…/blogi" },
        { "@type": "ListItem", "position": 3, "name": "Sigirija un tās noslepums", "item": "https://…/blogi/sigirija" }
      ]
    }
  ]
}
```

## Build helpers

Both helpers return `BreadcrumbItem[]` with absolute URLs (via `getSiteUrl()`). Labels for static-page crumbs are resolved by looking the crumb's `href` up in `navigationItems` (from `features/layout/components/navigation/index.data`). The post crumb's label is the passed post title.

```ts
export function buildSectionItems(href: string): BreadcrumbItem[];
// → [{ name: 'Sākums', url: '…/' }, { name: <nav label for href>, url: '…/<href>' }]

export function buildPostItems(slug: string, title: string): BreadcrumbItem[];
// → [home, blog, { name: title, url: '…/blogi/<slug>' }]
```

If `href` doesn't match any entry in `navigationItems`, the helper throws. Fail-loud at build / first request, not silently broken in production.

## Styling

Vanilla-extract following project conventions:

- Subtle visual weight: smaller font than body, muted text color, modest top/bottom padding
- Inline-flex row with gap; wraps on narrow viewports
- Links use the standard hover/focus treatment from the design system
- Separator inherits the muted color and respects the same line-height as the crumbs
- Current-page item is plain text — slightly stronger color than links to read as "you are here"

Exact tokens (color, spacing, font size) are decided during implementation against the existing design tokens.

## Mounting

| Page | Mount location | Position in DOM |
| --- | --- | --- |
| `/blogi` | `shared/components/blogs-page-layout/index.tsx` | First child, above `<SectionBlogs>` |
| `/blogi/[slug]` | `shared/components/blog-page-layout/index.tsx` | Inside `<article>`, between `<BlogHero>` and `<BlogText>` — just above the first body paragraph |
| `/produkti` | `app/products/page.tsx` | First child of returned content |
| `/letakie-lidojumi-uz-srilanku-no-rigas` | `app/flight-tickets/page.tsx` | First child of returned content |
| `/par-mani` | `app/about-me/page.tsx` | First child of returned content |
| `/kontakti` | `app/contact/page.tsx` | First child of returned content |

For `/blogi/[slug]`, the mount lives inside `BlogPageLayout` (next to `BlogPostJsonLd`) because the post title is already fetched there — no duplicate Sanity query.

## Relationship to existing JSON-LD components

`HomeJsonLd` and `BlogPostJsonLd` are unchanged. The new `Breadcrumbs` component emits an independent `<script type="application/ld+json">` tag alongside any existing JSON-LD on the same page. Multiple JSON-LD blocks per page are supported by Google's structured-data parser.

## Out of scope

- Visible breadcrumb on `/` (home is the root)
- Storybook stories (can be added later if/when other breadcrumb shapes appear)
- A site-wide automatic breadcrumb derived from `usePathname()` — each page mounts the component explicitly with its known chain
