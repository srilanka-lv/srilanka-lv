import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const blogHeroTitleStyle = style({
  color: vars.color.secondary,
  mixBlendMode: 'luminosity',
  fontSize: vars.font.size['5xl'],
  fontWeight: vars.font.weight.semibold,
  textShadow: `0 ${vars.spacing[8]} ${vars.spacing[8]} rgba(0, 0, 0, 0.0625)`,
  textAlign: 'left',
  padding: 0,
  margin: 0,

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      fontSize: vars.font.size['5xl'],
    },
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: vars.font.size['6xl'],
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: vars.font.size['7xl'],
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: vars.font.size['8xl'],
      marginLeft: '-.62rem',
    },
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      fontSize: vars.font.size['9xl'],
      marginLeft: '-.62rem',
    },
  },
});
