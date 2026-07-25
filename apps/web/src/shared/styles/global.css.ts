import { globalStyle } from '@vanilla-extract/css';

import { inBaseLayer } from './layers/layers';
import { vars } from './themes/theme.contract.css';
import { darkThemeSelector } from './themes/theme.dark.css';
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

globalStyle(
  `body a:hover, body a:focus-visible`,
  inBaseLayer({
    color: color.background,
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

// color-dodge blows the coral bar out to neon pure red on dark surfaces, so
// dark mode renders it as the solid brand coral instead. Without the blend
// the bar would paint over the glyphs (its base z-index is 1), so it drops
// beneath the text; isolation keeps that negative z-index inside the link's
// own stacking context instead of behind an ancestor's background. Light
// keeps the original blend untouched.
globalStyle(
  `${darkThemeSelector} body a:link, ${darkThemeSelector} body a:visited, ${darkThemeSelector} body a:active`,
  inBaseLayer({
    isolation: 'isolate',
  }),
);

globalStyle(
  `${darkThemeSelector} body a:link::after, ${darkThemeSelector} body a:visited::after, ${darkThemeSelector} body a:active::after`,
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
