import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const blogTitleStyle = style({
  position: 'absolute',
  top: '30svh',
  color: vars.color.secondary,
  mixBlendMode: 'luminosity',
  fontSize: vars.font.size['8xl'],
  fontWeight: vars.font.weight.extrabold,
  textAlign: 'left',
  textWrap: 'balance',
  textShadow: `0 ${vars.spacing[8]} ${vars.spacing[8]} rgba(0, 0, 0, 0.0625)`,
});
