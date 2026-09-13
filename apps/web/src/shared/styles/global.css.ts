import { globalStyle } from '@vanilla-extract/css';

import { inBaseLayer } from './layers/layers';
import { vars } from './themes/theme.contract.css';
import { breakpoints } from './tokens/breakpoints';

const { color, font, border, focus, transition, spacing } = vars;

globalStyle(
  'html, body',
  inBaseLayer({
    overflowX: 'clip',
    overflowClipBox: 'content-box',

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        overflowX: 'initial',
        overflowClipBox: 'initial',
      },
    },
  }),
);

// In-page anchors (the guide's table of contents and its heading links) glide
// instead of jumping. Guarded by the motion preference, and the root layout
// carries `data-scroll-behavior="smooth"` so Next 16 still scrolls route
// changes instantly rather than animating the whole page on every navigation.
globalStyle(
  'html',
  inBaseLayer({
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        scrollBehavior: 'smooth',
      },
    },
  }),
);

globalStyle(
  'body',
  inBaseLayer({
    backgroundColor: color.background,
    color: color.foreground,
    fontFamily: font.family.body,
    lineHeight: font.lineHeight.normal,
    textRendering: 'optimizeLegibility',
    fontSmooth: 'antialiased',
  }),
);

// Every link carries a coral bar along its baseline that grows to fill the
// line on hover.
//
// The bar is a background on the link itself, not an absolutely positioned
// pseudo-element. A pseudo-element cannot follow an inline box that wraps: its
// containing block runs from the first fragment's left edge to the last
// fragment's right edge, which on a wrapped link runs backwards and collapses
// to zero width. The bar then painted nothing at all, and because the hover
// state flips the text to near-white, any link that broke across two lines
// disappeared into the page on hover. `box-decoration-break: clone` hands each
// line fragment its own copy of the background, so a wrapped link gets a bar
// on every line it occupies.
//
// Anything that wants no bar sets `backgroundImage: 'none'` from the
// components or overrides layer, which sits after this one.
globalStyle(
  `body a:link, body a:visited, body a:hover, body a:active`,
  inBaseLayer({
    outline: 'none',
    position: 'relative',
    color: '#ee5253',
    textDecoration: 'none',
    backgroundImage: 'linear-gradient(#ee5253, #ee5253)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 100%',
    backgroundSize: `100% 1px`,
    borderRadius: border.radius.small,
    WebkitBoxDecorationBreak: 'clone',
    boxDecorationBreak: 'clone',
    transitionTimingFunction: transition.easing.easeInOut,
    transitionDuration: transition.duration.faster,
    transitionProperty: 'background-size, color',
  }),
);

// Text on the filled coral bar. `accentForeground` is the token the palette
// defines for exactly this pairing.
globalStyle(
  `body a:hover, body a:focus-visible`,
  inBaseLayer({
    color: color.accentForeground,
    backgroundSize: '100% 100%',
  }),
);

// An anchor that presents as a button sits on the button's own surface, where
// the link bar has nothing to underline. `Button` stamps `role="button"` on
// every element it renders that is not a `button`.
globalStyle(
  'body a[role="button"]',
  inBaseLayer({
    backgroundImage: 'none',
  }),
);

globalStyle(
  'button:focus-visible',
  inBaseLayer({
    outline: `${focus.width} solid ${focus.color}`,
    outlineOffset: focus.offset,
    borderRadius: border.radius.small,
  }),
);
