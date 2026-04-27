import { globalStyle } from '@vanilla-extract/css';

import { vars } from './themes/theme.contract.css';

globalStyle('body', {
  backgroundColor: vars.color.background,
  color: vars.color.foreground,
  fontFamily: vars.font.family.body,
  lineHeight: vars.font.lineHeight.normal,
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
