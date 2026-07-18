/*
 * modern-normalize v3.0.1 (MIT) — ported to vanilla-extract globalStyle in @layer reset.
 * https://github.com/sindresorhus/modern-normalize
 */

import { globalStyle } from '@vanilla-extract/css';

import { inResetLayer } from './layers/layers';

globalStyle(
  '*, ::before, ::after',
  inResetLayer({
    boxSizing: 'border-box',
  }),
);

globalStyle(
  'html',
  inResetLayer({
    fontFamily: `system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`,
    lineHeight: 1.15,
    WebkitTextSizeAdjust: '100%',
    tabSize: 4,
  }),
);

globalStyle(
  'body',
  inResetLayer({
    margin: 0,
  }),
);

globalStyle(
  'b, strong',
  inResetLayer({
    fontWeight: '600',
  }),
);

globalStyle(
  'code, kbd, samp, pre',
  inResetLayer({
    fontFamily: `ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace`,
    fontSize: '1em',
  }),
);

globalStyle(
  'small',
  inResetLayer({
    fontSize: '80%',
  }),
);

globalStyle(
  'sub, sup',
  inResetLayer({
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'baseline',
  }),
);

globalStyle(
  'sub',
  inResetLayer({
    bottom: '-0.25em',
  }),
);

globalStyle(
  'sup',
  inResetLayer({
    top: '-0.5em',
  }),
);

globalStyle(
  'table',
  inResetLayer({
    borderColor: 'currentcolor',
  }),
);

globalStyle(
  'button, input, optgroup, select, textarea',
  inResetLayer({
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    margin: 0,
  }),
);

globalStyle(
  `button, [type='button'], [type='reset'], [type='submit']`,
  inResetLayer({
    WebkitAppearance: 'button',
  }),
);

globalStyle(
  'legend',
  inResetLayer({
    padding: 0,
  }),
);

globalStyle(
  'progress',
  inResetLayer({
    verticalAlign: 'baseline',
  }),
);

globalStyle(
  '::-webkit-inner-spin-button, ::-webkit-outer-spin-button',
  inResetLayer({
    height: 'auto',
  }),
);

globalStyle(
  `[type='search']`,
  inResetLayer({
    WebkitAppearance: 'textfield',
    outlineOffset: '-2px',
  }),
);

globalStyle(
  '::-webkit-search-decoration',
  inResetLayer({
    WebkitAppearance: 'none',
  }),
);

globalStyle(
  '::-webkit-file-upload-button',
  inResetLayer({
    WebkitAppearance: 'button',
    font: 'inherit',
  }),
);

globalStyle(
  'summary',
  inResetLayer({
    display: 'list-item',
  }),
);
