import { globalStyle } from '@vanilla-extract/css';

import { vars } from './themes/theme.contract.css';

// `overflow-x: hidden` is also set on `<body>` (via layoutStyle), but iOS
// Safari frequently ignores body-level overflow clipping during pinch-zoom —
// the `<html>` element is what reliably clips. Without this, off-screen
// positioned elements (e.g. the slide-in mobile nav, full-bleed `::after`
// backgrounds) become visible when the user pinches.
globalStyle('html, body', {
  overflowX: 'hidden',
});

globalStyle('body', {
  backgroundColor: vars.color.background,
  color: vars.color.foreground,
  fontFamily: vars.font.family.body,
  lineHeight: vars.font.lineHeight.normal,
  textRendering: 'optimizeLegibility',
  fontSmooth: 'antialiased',
});

globalStyle('a:link', {
  color: vars.color.accent,
  textDecoration: 'none',
});

globalStyle('a:visited', {
  color: vars.color.accent,
  textDecoration: 'none',
});

globalStyle('a:hover', {
  color: vars.color.accent,
  textDecoration: 'none',
});

globalStyle('a:active', {
  color: vars.color.accent,
  textDecoration: 'none',
});

globalStyle('a:focus-visible, button:focus-visible', {
  outline: `${vars.focus.width} solid ${vars.focus.color}`,
  outlineOffset: vars.focus.offset,
  borderRadius: vars.border.radius.small,
});
