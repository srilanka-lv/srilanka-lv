# BlogCoverImage Fixed Background Design

## Overview

Convert `BlogCoverImage` from a `next/image` `<Image fill>` element to a CSS `background-image` (via `image-set()`) on a 100dvh element with `background-attachment: fixed`. The cover image appears pinned within its area as the user scrolls; once the user has scrolled past the area, the article wipes over it from bottom to top.

## Goal

Visual: as the user scrolls, the cover image's top edge stays anchored to the top of the viewport while the article rises up to cover it from the bottom. After ~100dvh of scrolling, the image is fully covered and the article scrolls normally over the page background. The existing top and bottom `CoverImageEffect` gradient overlays remain unchanged.

## Location

`apps/web/src/shared/components/blog-cover-image/`

Files:
- `index.tsx` — component
- `styles.css.ts` — vanilla-extract styles

Call site at `apps/web/src/app/blogs/[blogSlug]/page.tsx:48` is **not changed** — the new API is compatible with the existing `<BlogCoverImage src={...} alt={...} />` invocation.

## API

```tsx
type BlogCoverImageProps = {
  src: string;
  alt: string;
};
```

Simplified from the previous `Omit<ImageProps, 'fill' | 'width' | 'height'>` because the component no longer renders an `<img>`. `src` and `alt` match the only two props the call site currently passes.

## Implementation

### Component (`index.tsx`)

```tsx
import { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { CoverImageEffect } from '../cover-image-effect';
import { coverImageBackgroundStyle, coverImageBackgroundVar } from './styles.css';

type BlogCoverImageProps = {
  src: string;
  alt: string;
};

const getBackgroundImage = (srcSet = '') => {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ');
      return `url("${url}") ${dpi}`;
    })
    .join(', ');
  return `image-set(${imageSet})`;
};

export const BlogCoverImage: FunctionComponent<BlogCoverImageProps> = ({ src, alt }) => {
  const {
    props: { srcSet, sizes, src: optimizedSrc },
  } = getImageProps({
    src,
    alt,
    width: 2400,
    height: 1600,
    sizes: '100vw',
    quality: 90,
  });

  preload(optimizedSrc, { as: 'image', imageSrcSet: srcSet, imageSizes: sizes });

  return (
    <>
      <CoverImageEffect variant="top" />
      <div
        className={coverImageBackgroundStyle}
        role="img"
        aria-label={alt}
        style={assignInlineVars({ [coverImageBackgroundVar]: getBackgroundImage(srcSet) })}
      />
      <CoverImageEffect variant="bottom" />
    </>
  );
};
```

### Styles (`styles.css.ts`)

```ts
import { createVar, fallbackVar, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const coverImageBackgroundVar = createVar();

export const coverImageBackgroundStyle = style({
  width: '100vw',
  height: '100dvh',
  marginTop: vars.spacing[24],
  backgroundImage: fallbackVar(coverImageBackgroundVar, 'none'),
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',

  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      height: 'calc(100dvh - 96px)',
      marginBottom: '23px',
    },
  },
});
```

The previous `coverImageWrapperStyle` and `coverImageSpacerStyle` are both removed. A single in-flow element carries both the layout space (replacing the spacer) and the background paint (replacing the wrapper).

## Behavior notes

- **`background-attachment: fixed` mechanics.** The browser paints the background sized to the viewport (cover-fitted to viewport dimensions), and clips it to the element's box. As the user scrolls, the element's visible portion shrinks from the bottom (because article content rises into view from below); the bg's top stays anchored to the viewport top. After scrolling past the element, no portion of the bg is painted.
- **iOS Safari and older mobile browsers fall back to `background-attachment: scroll`.** This is a graceful degradation: the image scrolls with the page (the project's current behavior). No mobile regression — just no parallax effect on those clients. Acceptable trade-off vs. the alternatives (a 200dvh sticky wrapper that doubles empty scroll distance, or JS scroll listeners).
- **`getImageProps` width/height.** Set to 2400×1600 (3:2). These dimensions are used by Next's image optimizer only to compute the responsive `srcSet`; the actual rendered crop is governed by `background-size: cover` and `background-position: center`. The Sanity URL builder at the call site already requests width 2400.
- **`sizes: '100vw'`.** With `background-attachment: fixed` the bg is painted at viewport width, so the browser should pick the largest applicable srcSet candidate.
- **Quality 90.** Matches the Sanity URL builder's existing `quality(90)` request at the call site.
- **`image-set()` via CSS variable.** The dynamic value is plumbed through a vanilla-extract `createVar` + `assignInlineVars`, keeping `styles.css.ts` free of inline string concatenation. `fallbackVar(..., 'none')` ensures the static stylesheet is valid in isolation.
- **Preload.** `react-dom`'s `preload(href, { as: 'image', imageSrcSet, imageSizes })` emits a deduped `<link rel="preload" as="image">` so the cover (the LCP element) stays prioritized after losing the `<Image preload>` browser hint. This matches the project's existing migration off Next 16's deprecated `priority` prop.
- **Accessibility.** Removing the `<img>` element loses the alt text exposure to assistive tech. The bg `<div>` carries `role="img"` and `aria-label={alt}` to preserve the semantic. If the cover image is purely decorative for a given post (alt is empty), the empty `aria-label` correctly signals that.
- **Header offset.** `marginTop: vars.spacing[24]` (mobile) and `height: calc(100dvh - 96px)` + `marginBottom: 23px` (xl) preserve today's header-clearance and bottom-spacing behavior.
- **Visible bg crop.** Because `background-attachment: fixed` paints at viewport size (not element-box size), the visible portion of the image is the element-box-sized window over a viewport-sized cover crop. With the element at `marginTop: spacing[24]` and `height: 100dvh`, the user sees a cropped slice of the viewport-sized image starting just below the header. For typical hero images this reads naturally; if a specific post requires precise framing, that's handled at the Sanity image level (focal point), not in this component.

## What is NOT changing

- `CoverImageEffect` component and its styles
- The call site at `apps/web/src/app/blogs/[blogSlug]/page.tsx:48`
- Sanity URL building (still `width(2400).quality(90).fit('max').auto('format')`)
- Header positioning, breakpoints, spacing tokens
