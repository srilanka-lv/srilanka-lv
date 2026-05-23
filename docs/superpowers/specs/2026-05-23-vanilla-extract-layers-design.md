# Vanilla Extract Cascade Layers Design

## Overview

Add CSS cascade layers (`@layer`) to the web app's vanilla-extract setup so that cross-file CSS source ordering stops being load-bearing. Today, `bun web:dev` (webpack loader) and `bun web:build` (Turbopack loader) traverse `.css.ts` files in different orders, which causes equal-specificity class rules from different files to win in different orders between dev and production. The observable bug is `blogHeroTitleStyle`'s responsive `font-size` media queries losing to `headingStyles({variant:'h1'})`'s flat `font-size: 5xl` at large viewports in dev only. Layers give us explicit, deterministic cascade order regardless of bundler.

This migration is comprehensive: all 43 `.css.ts` files in `apps/web/src` get classified and wrapped.

## Goal

Eliminate visual differences between `bun web:dev` and `bun web:build` caused by CSS source-order. After migration, the responsive `font-size` on `blogHeroTitleStyle` must scale correctly in dev at every breakpoint, and any future per-component style applied on top of a recipe (via `className`) must override the recipe's properties regardless of which bundler is running.

## Architecture

### Layer order

Three layers, declared bottom-up (lowest precedence → highest):

| Layer | Purpose | Examples |
|---|---|---|
| `base` | Element-level globals + recipes (variant systems) | `globals.css.ts`, `headingStyles`, `buttonStyles`, `iconButtonStyles` |
| `components` | Per-component styles that are the primary styling on their element | `navigation/styles.css.ts`, `header/styles.css.ts`, `card/styles.css.ts`, `footer/styles.css.ts` |
| `overrides` | Styles intentionally layered on top of an already-styled component via `className` | `blog-hero-title/styles.css.ts` |

Higher layers win equal-specificity conflicts against lower layers, regardless of stylesheet source order.

### Layer-declaration file

```typescript
// apps/web/src/shared/styles/layers.css.ts
import { globalLayer } from '@vanilla-extract/css';

export const baseLayer       = globalLayer('base');
export const componentsLayer = globalLayer('components');
export const overridesLayer  = globalLayer('overrides');

const inLayer = <T>(layer: string) => (rule: T) => ({ '@layer': { [layer]: rule } });

export const inBaseLayer       = inLayer(baseLayer);
export const inComponentsLayer = inLayer(componentsLayer);
export const inOverridesLayer  = inLayer(overridesLayer);
```

`globalLayer()` calls in this order emit `@layer base, components, overrides;` in the output bundle — that single declaration is what makes the cascade deterministic.

### Import order

`layers.css.ts` is imported as the **first import** at the top of `apps/web/src/app/layout.tsx`, before any other CSS, vanilla-extract, or component import:

```typescript
// apps/web/src/app/layout.tsx
import '@/shared/styles/layers.css';
// ...everything else after
```

This guarantees the `@layer ...;` declaration is emitted before any layered or unlayered style rules in the final bundle, which is what vanilla-extract's own docs recommend.

## Helper API

Three pre-bound wrappers — one per layer:

```typescript
// component style
export const cardStyle = style(inComponentsLayer({
  padding: spacing[4],
  border: `1px solid ${color.border}`,
}));

// recipe — wrap each rule (base + every variant value)
export const headingStyles = recipe({
  base: inBaseLayer({ lineHeight: font.lineHeight.tight }),
  variants: {
    variant: {
      h1: inBaseLayer({ fontSize: font.size['5xl'], fontWeight: font.weight.extrabold }),
      h2: inBaseLayer({ fontSize: font.size['4xl'], fontWeight: font.weight.bold }),
      // ...
    },
  },
});

// override style
export const blogHeroTitleStyle = style(inOverridesLayer({
  color: 'inherit',
  fontSize: font.size['5xl'],
  '@media': { /* ... */ },
}));

// globals
globalStyle('html', inBaseLayer({ fontFamily: 'system-ui' }));
```

The helpers are a thin convenience over the documented `style({ '@layer': { [layerRef]: { ... } } })` shape — they produce the exact object literal the docs show. No magic, no static-analysis risk.

## What stays unlayered

- **Theme contract files** (`theme.contract.css.ts`, `theme.light.css.ts`, `theme.dark.css.ts`) — `createTheme` and `createThemeContract` produce CSS custom property declarations, which do not participate in the conflicting-rule cascade. Leaving them unlayered avoids unnecessary wrapping and keeps the existing theme spec intact.
- **`modern-normalize`** — currently imported as a plain CSS package outside vanilla-extract. Stays outside the layered cascade. In practice, modern-normalize targets element selectors (`html`, `body`, `*`) and our component styles target classes, so specificity prevents conflict. If a real conflict surfaces later, the follow-up is to switch to `@import url('modern-normalize/modern-normalize.css') layer(base);` in a small `.css` file imported from `layout.tsx`.

## File categorization

Every `.css.ts` file in `apps/web/src` falls into exactly one bucket. The categorization is performed in Phase 1 of the migration by reading each file:

| Rule | Bucket |
|---|---|
| File contains `createTheme`/`createThemeContract`/`createVar` only, no `style`/`recipe`/`globalStyle` | **Unlayered** |
| File contains `globalStyle(...)` targeting element-level selectors | `base` |
| File contains `recipe(...)` | `base` |
| File contains `style(...)` and the resulting class is the primary styling on its element | `components` |
| File contains `style(...)` whose class is passed via `className` on top of another vanilla-extract class with overlapping properties | `overrides` |

The disambiguation rule for the `components` vs `overrides` boundary: trace every consumer of the exported style. If the style is applied as `className` to a component that already carries another vanilla-extract class with any overlapping property (`font-size`, `font-weight`, `margin`, etc.), the bucket is `overrides`. Otherwise it is `components`.

Ambiguous files are bucketed by best judgment and the choice is documented inline as a code comment at the top of the file: `// layer: components — primary styling on its element` (or similar). User does not need to confirm each file before code is written.

## Migration approach

Single atomic commit. Internal sequencing for sanity, all landing in one commit:

1. **Foundation.** Create `layers.css.ts`. Add the import to `layout.tsx`. Run `bun web:build` and confirm CSS output adds `@layer base, components, overrides;` and nothing else changes.
2. **Categorize.** Walk all 43 `.css.ts` files. Assign each to a bucket using the rules above.
3. **Wrap `base` files.** Every recipe rule and `globalStyle` rule gets `inBaseLayer(...)`.
4. **Wrap `components` files.** Every `style(...)` call gets `inComponentsLayer(...)`.
5. **Wrap `overrides` files.** Every `style(...)` call gets `inOverridesLayer(...)`.
6. **Verify.** Run `bun web:dev` and `bun web:build`. Visually inspect the `BlogHeroTitle` h1 in dev at desktop viewport — it must show responsive `font-size` (8xl/9xl at large viewports), not the recipe's flat 5xl.

The whole change is then committed in one go with a message describing the layer order and helper API.

## Verification

After the commit:
- `bun web:dev` boots cleanly.
- `bun web:build` completes successfully.
- The h1 on a blog page renders with the correct responsive font-size at every breakpoint in both dev and production builds.
- Diffing the generated CSS for the same route between dev and build shows only naming differences (debug-prefixed in dev, hash-only in build) — no cascade order differences.

## Rollback

Single-commit migration ⇒ single-commit revert. `git revert <commit>` removes layers.css.ts, the layout import, all `inXxxLayer(...)` wraps, and returns the codebase to the pre-migration state.

## Open questions / verify-during-implementation

- **Recipe + layer behavior** is not explicitly documented by vanilla-extract. Our approach (wrap each `base` and each variant rule with `inBaseLayer(...)`) is a natural extension since `recipe()` calls `style()` underneath, and `style()` officially supports `@layer`. Verify during step 3 of the migration by inspecting the emitted CSS for the first migrated recipe (`headingStyles`) before wrapping the rest.
- **`@layer` emission ordering across the bundle.** The expectation is that importing `layers.css.ts` first in `layout.tsx` puts the `@layer base, components, overrides;` declaration at the top of the bundle. If it doesn't (because the bundler hoists differently), the fallback is to also import `layers.css.ts` from every `.css.ts` file that's at the root of a feature's style dependency graph (theme contract files are the cleanest place). This guarantees `layers.css.ts` is in every relevant module's dependency graph.

## Out of scope

- Migrating `modern-normalize` into a layer. Punted until a real conflict appears.
- Renaming or restructuring existing `.css.ts` files for any reason other than the layer wrapping itself.
- Establishing layer conventions in other apps (`apps/studio`). This spec is scoped to `apps/web`.
- Performance benchmarking. CSS cascade layers have negligible runtime cost; we accept that without measuring.
