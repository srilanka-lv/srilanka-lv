import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font } = vars;

export const tripPageSectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: spacing[16],
  scrollMarginTop: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: spacing[8],
      marginTop: spacing[24],
    },
  },
});

/**
 * Every H2 on the trip page shares this step. It tops out at 4xl: in the
 * one-third column a 5xl heading broke "Cik tas izmaksās kopā?" over three
 * lines and outweighed the content it introduces.
 */
export const tripPageSectionTitleStyle = style({
  fontSize: font.size['3xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  letterSpacing: font.letterSpacing.tight,
  textWrap: 'balance',
  marginTop: 0,
  marginBottom: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: font.size['4xl'],
      marginBottom: spacing[8],
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      position: 'sticky',
      top: spacing[8],
      alignSelf: 'start',
      marginBottom: 0,
    },
  },
});

export const tripPageSectionBodyStyle = style({
  minWidth: 0,
  fontSize: font.size.base,
  lineHeight: font.lineHeight.relaxed,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridColumn: '2 / 4',
    },
  },
});
