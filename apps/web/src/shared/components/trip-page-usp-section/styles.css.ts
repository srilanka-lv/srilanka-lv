import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font } = vars;

export const tripPageUspSectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
  marginBottom: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(2, min-content)',
      gap: spacing[8],
    },
  },
});

export const tripPageUspTitleStyle = style({
  fontSize: font.size['2xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: spacing[12],
  marginBottom: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: font.size['4xl'],
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['5xl'],
      marginBottom: spacing[8],
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      marginTop: 0,
    },
  },
});

export const tripPageUspItemListStyle = style({
  fontSize: font.size.base,
  padding: 0,
  paddingLeft: spacing[4],
  margin: 0,

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(2, min-content)',
      gap: spacing[4],
      gridColumn: '2 / 4',
      gridRow: '1 / 2',
    },
  },
});

export const tripPageUspItemListItemStyle = style({
  marginBottom: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      marginBottom: 0,
    },
  },
});
