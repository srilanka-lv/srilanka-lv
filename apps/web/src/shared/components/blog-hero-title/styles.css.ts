import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { font, spacing, zIndex } = vars;

export const blogHeroTitleStyle = style({
  color: 'inherit',
  mixBlendMode: 'luminosity',
  fontSize: font.size['5xl'],
  fontWeight: font.weight.semibold,
  textShadow: `0 ${spacing[8]} ${spacing[8]} rgba(0, 0, 0, 0.0625)`,
  textAlign: 'left',
  padding: 0,
  margin: 0,
  zIndex: zIndex['10'],

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      fontSize: font.size['5xl'],
    },
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: font.size['6xl'],
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['7xl'],
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: font.size['8xl'],
      marginLeft: '-.62rem',
    },
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      fontSize: font.size['9xl'],
      marginLeft: '-.62rem',
    },
  },
});
