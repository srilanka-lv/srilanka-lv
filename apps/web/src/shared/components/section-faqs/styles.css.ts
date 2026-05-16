import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, border, color, focus } = vars;

export const sectionFaqsStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
});

export const sectionFaqsTitleStyle = style({
  fontSize: font.size['2xl'],
  lineHeight: font.lineHeight.relaxed,
  marginTop: spacing[8],
  marginBottom: spacing[8],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['4xl'],
      textAlign: 'center',
    },
  },
});

export const sectionFaqsContentStyle = style({
  display: 'grid',
  gridTemplateRows: 'repeat(8, 1fr)',
  gridTemplateColumns: '1fr',
  gap: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
});

export const sectionFaqsItemStyle = style({
  display: 'flex',
  flexDirection: 'column',
  placeItems: 'center',
  placeContent: 'center',
  padding: spacing[6],
  gap: spacing[2],
  borderRadius: border.radius.large,
  color: color.primary,
  backgroundColor: `color-mix(in oklch, ${color.accent} 12.5%, transparent)`,
});

export const sectionFaqsItemTitleStyle = style({
  fontSize: font.size.lg,
  fontWeight: font.weight.semibold,
  textAlign: 'center',
  textWrap: 'balance',
});

export const sectionFaqsItemLinkStyle = style({
  selectors: {
    '&:link, &:visited, &:hover, &:active': {
      fontWeight: font.weight.semibold,
      color: color.accent,
    },
    '&:focus-visible': {
      outlineOffset: spacing[2],
      outlineStyle: 'solid',
      outlineWidth: focus.width,
      outlineColor: focus.color,
      borderRadius: border.radius.small,
    },
  },
});
