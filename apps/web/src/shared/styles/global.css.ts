import { globalStyle } from '@vanilla-extract/css';

import { vars } from './themes/theme.contract.css';

globalStyle('body', {
  backgroundColor: vars.color.background,
  color: vars.color.foreground,
  fontFamily: 'var(--font-lora)',
  lineHeight: vars.font.lineHeight.normal,
});
