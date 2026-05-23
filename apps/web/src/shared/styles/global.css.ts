import { globalStyle } from '@vanilla-extract/css';

import { inBaseLayer } from './layers/layers';
import { vars } from './themes/theme.contract.css';
import { breakpoints } from './tokens/breakpoints';

const { color, font, border, focus } = vars;

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
  'a:link, a:visited, a:hover, a:active',
  inBaseLayer({
    textDecoration: 'none',
  }),
);

globalStyle(
  'a:hover',
  inBaseLayer({
    color: color.background,
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
