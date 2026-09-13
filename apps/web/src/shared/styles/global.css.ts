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

globalStyle(
  `body a:link, body a:visited, body a:hover, body a:active`,
  inBaseLayer({
    outline: 'none',
    position: 'relative',
    color: '#ee5253',
    textDecoration: 'none',
    transitionTimingFunction: transition.easing.easeInOut,
    transitionDuration: transition.duration.faster,
    transitionProperty: 'color',
  }),
);

// Text on the filled coral bar. `accentForeground` is the token the palette
// defines for exactly this pairing; it resolves to the same values the old
// `background` did in both themes, so nothing shifts, but the intent is now
// stated rather than coincidental.
globalStyle(
  `body a:hover, body a:focus-visible`,
  inBaseLayer({
    color: color.accentForeground,
  }),
);

globalStyle(
  `body a:link::after, body a:visited::after, body a:active::after`,
  inBaseLayer({
    mixBlendMode: 'color-dodge',
    position: 'absolute',
    display: 'block',
    content: '',
    backgroundColor: '#ee5253',
    left: '0',
    bottom: '0',
    width: `100%`,
    height: spacing[1],
    zIndex: '1',
    borderRadius: border.radius.small,
    transitionTimingFunction: transition.easing.easeInOut,
    transitionDuration: transition.duration.faster,
    transitionProperty: 'height',
  }),
);

globalStyle(
  `body a:hover::after, body a:focus-visible::after`,
  inBaseLayer({
    height: `calc(100%)`,
  }),
);

// The bar is solid brand coral behind the glyphs in BOTH themes.
//
// It used to be color-dodge in light mode, which only worked on the page's own
// background. On any lighter surface the dodge resolves to pure white, and
// since the hover text is near-white too, the whole link vanished: every link
// inside a white card or table went invisible on hover. Dark mode had already
// abandoned the blend for the mirror problem, where it blew out to neon red.
//
// Without the blend the bar would paint over the glyphs, since its base
// z-index is 1, so it drops beneath them; isolation keeps that negative
// z-index inside the link's own stacking context rather than behind an
// ancestor's background.
globalStyle(
  'body a:link, body a:visited, body a:active',
  inBaseLayer({
    isolation: 'isolate',
  }),
);

globalStyle(
  'body a:link::after, body a:visited::after, body a:active::after',
  inBaseLayer({
    mixBlendMode: 'normal',
    zIndex: '-1',
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
