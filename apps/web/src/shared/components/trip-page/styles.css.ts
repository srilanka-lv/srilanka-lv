import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { darkThemeSelector } from '@/shared/styles/themes/theme.dark.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color } = vars;

export const tripPageTitleStyle = style({
  fontSize: font.size['2xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: 0,
  marginBottom: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: font.size['4xl'],
      marginTop: spacing[6],
      marginBottom: spacing[6],
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['5xl'],
      marginTop: spacing[8],
      marginBottom: spacing[8],
    },
  },
});

export const tripPageCollaborationStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: font.size['sm'],
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.none,
  gap: spacing[4],
  marginBottom: spacing[8],
  paddingTop: spacing[4],
  paddingBottom: spacing[4],
  borderTop: `1px dashed ${color.foreground}`,
  borderBottom: `1px dashed ${color.foreground}`,
  whiteSpace: 'nowrap',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['lg'],
    },
  },
});

export const tripPageCollaborationLinkStyle = style({
  selectors: {
    '&:after': {
      display: 'none',
    },
  },
});

export const tripPageCollaborationLogoStyle = style({
  selectors: {
    // The logo artwork is pure black on transparency, so inverting it yields
    // the white version for dark backgrounds without a second asset.
    [`${darkThemeSelector} &`]: {
      filter: 'invert(1)',
    },
  },
});
