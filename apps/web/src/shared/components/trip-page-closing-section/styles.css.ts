import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border } = vars;

export const closingSectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[6],
  marginTop: spacing[16],
  // 2rem + the footer's 4rem top padding = the site-wide 6rem seam to the
  // footer's first heading.
  marginBottom: spacing[8],
  padding: spacing[6],
  borderRadius: border.radius.large,
  backgroundColor: `color-mix(in oklch, ${color.accent} 8%, ${color.background})`,
  border: `1px solid color-mix(in oklch, ${color.primary} 12%, transparent)`,
  scrollMarginTop: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing[10],
      padding: spacing[10],
    },
  },
});

export const closingPortraitStyle = style({
  flexShrink: 0,
  width: '10rem',
  height: '10rem',
  borderRadius: '50%',
  objectFit: 'cover',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      width: '15rem',
      height: '15rem',
    },
  },
});

export const closingBodyStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  width: '100%',
  maxWidth: '32rem',
  minWidth: 0,
});

export const closingTitleStyle = style({
  margin: 0,
  fontSize: font.size['2xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: font.size['4xl'],
    },
  },
});

export const closingTextStyle = style({
  margin: 0,
  fontSize: font.size.lg,
  lineHeight: font.lineHeight.relaxed,
});

export const closingActionsStyle = style({
  marginTop: spacing[2],
});
