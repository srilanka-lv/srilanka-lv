import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border, shadow } = vars;

// One object, two halves: a trip photo carrying the invitation, and the
// booking side on the card surface. On phones the photo sits on top.
export const closingSectionStyle = style({
  display: 'grid',
  marginTop: spacing[16],
  // 2rem + the footer's 4rem top padding = the site-wide 6rem seam to the
  // footer's first heading.
  marginBottom: spacing[8],
  overflow: 'hidden',
  borderRadius: border.radius.large,
  border: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,
  backgroundColor: color.surface,
  boxShadow: shadow.medium,
  scrollMarginTop: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      minHeight: '34rem',
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
      marginTop: spacing[24],
    },
  },
});

export const closingMediaStyle = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  minHeight: '22rem',
  isolation: 'isolate',

  // Theme-independent black scrim, as on the other photo sections, so the
  // whitesmoke text stays legible on any part of the photo.
  '::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.625) 10%, rgba(255, 255, 255, 0) 75%)',
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      minHeight: '26rem',
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      minHeight: 0,
    },
  },
});

export const closingPhotoStyle = style({
  zIndex: -2,
  objectFit: 'cover',
  // Keep her face in frame from the square phone crop to the tall desktop one.
  objectPosition: '60% 40%',
});

export const closingInviteStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  width: '100%',
  padding: spacing[6],
  color: 'whitesmoke',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      padding: spacing[10],
    },
  },
});

export const closingTitleStyle = style({
  margin: 0,
  color: 'inherit',
  fontSize: font.size['4xl'],
  fontWeight: font.weight.normal,
  lineHeight: 1.05,
  letterSpacing: font.letterSpacing.tight,
  textWrap: 'balance',

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: font.size['6xl'],
    },
  },
});

export const closingFactsStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${spacing[2]} ${spacing[5]}`,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const closingFactStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[2],
  fontSize: font.size.base,
  fontWeight: font.weight.medium,
  fontVariantNumeric: 'tabular-nums',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size.lg,
    },
  },
});

export const closingFactIconStyle = style({
  flexShrink: 0,
  width: spacing[5],
  height: spacing[5],
});

// The booking side: her line first, then the price, then both next steps.
export const closingBookingStyle = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: spacing[6],
  minWidth: 0,
  padding: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      padding: spacing[10],
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      paddingInline: spacing[12],
    },
  },
});

// Same grammar as the "Kopā ar Grietu" row in the facts card at the top.
export const closingHostStyle = style({
  display: 'grid',
  gridTemplateColumns: `${spacing[12]} minmax(0, 1fr)`,
  columnGap: spacing[4],
  alignItems: 'center',
  paddingBottom: spacing[6],
  borderBottom: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,
});

export const closingHostPortraitStyle = style({
  display: 'block',
  width: spacing[12],
  height: spacing[12],
  borderRadius: '50%',
  objectFit: 'cover',
});

export const closingHostTextStyle = style({
  margin: 0,
  fontSize: font.size.lg,
  lineHeight: font.lineHeight.snug,
  textWrap: 'pretty',
});
