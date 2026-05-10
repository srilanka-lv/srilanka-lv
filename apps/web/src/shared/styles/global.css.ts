import { globalStyle } from '@vanilla-extract/css';

import { vars } from './themes/theme.contract.css';
import { breakpoints } from './tokens/breakpoints';

const { color, font, border, focus } = vars;

globalStyle('html, body', {
  overflowX: 'clip',
  overflowClipBox: 'content-box',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      overflowX: 'initial',
      overflowClipBox: 'initial',
    },
  },
});

globalStyle('body', {
  backgroundColor: color.background,
  color: color.foreground,
  fontFamily: font.family.body,
  lineHeight: font.lineHeight.normal,
  textRendering: 'optimizeLegibility',
  fontSmooth: 'antialiased',
});

globalStyle('a:link, a:visited, a:hover, a:active', {
  textDecoration: 'none',
});

globalStyle('a:hover', {
  color: color.background,
});

globalStyle('button:focus-visible', {
  outline: `${focus.width} solid ${focus.color}`,
  outlineOffset: focus.offset,
  borderRadius: border.radius.small,
});
