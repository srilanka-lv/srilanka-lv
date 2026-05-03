import { globalStyle } from '@vanilla-extract/css';

import { vars } from './themes/theme.contract.css';
import { breakpoints } from './tokens/breakpoints';

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
  backgroundColor: vars.color.background,
  color: vars.color.foreground,
  fontFamily: vars.font.family.body,
  lineHeight: vars.font.lineHeight.normal,
  textRendering: 'optimizeLegibility',
  fontSmooth: 'antialiased',
});

globalStyle('a:link, a:visited, a:hover, a:active', {
  textDecoration: 'none',
});

globalStyle('a:hover', {
  color: vars.color.background,
});

globalStyle('button:focus-visible', {
  outline: `${vars.focus.width} solid ${vars.focus.color}`,
  outlineOffset: vars.focus.offset,
  borderRadius: vars.border.radius.small,
});
