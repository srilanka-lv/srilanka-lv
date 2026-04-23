# Button Component Design

## Overview

A reusable, polymorphic button component at `apps/web/src/shared/components/button/` styled with vanilla-extract recipes.

## Props

- `variant` — `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size` — `'small' | 'medium' | 'large'` (default: `'medium'`)
- `as` — HTML element to render as (default: `'button'`). Supports `'a'` or any HTML element string. When `as="a"`, all anchor props (e.g. `href`) are available.
- Spreads all native HTML props of the rendered element
- `children` — button content

## Files

- `index.tsx` — polymorphic component with TypeScript generics for type-safe prop spreading
- `index.styles.css.ts` — vanilla-extract recipe with variant and size maps
- `index.stories.ts` — Storybook stories for all variants, sizes, and polymorphic usage

## Styling

Uses `@vanilla-extract/recipes` `recipe` function. Variants and sizes map to class names at build time — no runtime CSS.

### Variants

- **primary** — solid background, contrasting text
- **secondary** — muted background, dark text
- **outline** — transparent background, border, dark text
- **ghost** — transparent background, no border, dark text

### Sizes

- **small** — compact padding, smaller font
- **medium** — default padding and font
- **large** — generous padding, larger font

## Polymorphic typing

The component uses a generic to infer the element type from the `as` prop:

```typescript
<Button>Click me</Button>                          // renders <button>
<Button as="a" href="/flights">Go</Button>         // renders <a>, href is type-safe
<Button as="a">Missing href</Button>               // works, href is optional on <a>
```

When `as` is omitted, all `<button>` props are available (e.g. `type`, `disabled`, `onClick`).

## Storybook stories

- Primary, Secondary, Outline, Ghost variants
- Small, Medium, Large sizes
- As link (`as="a"`)
- Disabled state
