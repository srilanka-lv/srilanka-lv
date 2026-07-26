import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, color, font } = vars;

export const tripPagePlanItinerarySectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
  marginTop: spacing[8],
  // 2rem + the footer's 4rem top padding = the site-wide 6rem seam to the
  // footer's first heading.
  marginBottom: spacing[8],
  backgroundColor: color.background,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(1, min-content)',
    },
  },
});

export const tripPagePlanItinerarySectionWrapperStyle = style({
  position: 'sticky',
  top: spacing[4],
});

export const tripPageTitleStyle = style({
  fontSize: font.size['2xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: 0,
  marginBottom: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: font.size['4xl'],
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['5xl'],
    },
  },
});

export const tripPagePlanItinerarySectionCtaStyle = style({
  display: 'none',

  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      display: 'block',
      marginTop: spacing[8],
      maxWidth: '320px',
      marginLeft: spacing[3],
    },
  },
});

export const tripPagePlanItineraryStyle = style({
  gridColumn: 'span 2',
});

export const tripPagePlanItineraryItemSeparatorStyle = style({
  gridColumn: '1 / 3',
  height: '1px',
  backgroundColor: `color-mix(in oklch, ${color.foreground} 10%, transparent)`,
  margin: 0,
  padding: 0,
  width: '100%',
  border: 'none',

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      width: `calc(100% - 2 * ${spacing[4]})`,
      paddingLeft: spacing[4],
      paddingRight: spacing[4],
      marginTop: spacing[2],
      marginBottom: spacing[2],
    },
  },
});
