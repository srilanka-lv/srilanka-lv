import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, border, color, focus } = vars;

export const sectionFaqsStyle = style({
  display: 'flex',
  flexDirection: 'column',

  '@media': {
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      position: 'relative',
      width: '100svw',
      left: '50%',
      right: '50%',
      marginLeft: '-50svw',
      marginRight: '-50svw',
      paddingLeft: spacing[40],
      paddingRight: spacing[40],
    },
  },
});

export const sectionFaqsTitleStyle = style({
  fontSize: font.size['2xl'],
  lineHeight: font.lineHeight.relaxed,
  textAlign: 'center',
  marginTop: spacing[12],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['4xl'],
    },
  },
});

export const sectionFaqsContentStyle = style({
  display: 'grid',
  gridTemplateRows: 'repeat(2, 1fr)',
  gridTemplateColumns: '1fr',
  gap: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
});

export const sectionFaqsItemStyle = style({
  display: 'flex',
  flexDirection: 'column',
  placeItems: 'center',
  placeContent: 'center',
  padding: `${spacing[10]} ${spacing[6]} ${spacing[6]} ${spacing[6]}`,
  gap: spacing[2],
  borderRadius: border.radius.large,
  color: color.primary,
  backgroundColor: `color-mix(in oklch, ${color.accent} 6.25%, transparent)`,
});

export const sectionFaqsItemTitleStyle = style({
  fontSize: font.size.lg,
  fontWeight: font.weight.semibold,
  textAlign: 'center',
  textWrap: 'balance',
  marginBottom: spacing[2],
});

export const sectionFaqsItemLinkStyle = style({
  display: 'block',
  marginTop: 'auto',
  padding: `${spacing[1]} ${spacing[2]}`,
  textDecoration: 'none',
  whiteSpace: 'nowrap',

  selectors: {
    '&:link, &:visited, &:hover, &:active': {
      fontWeight: font.weight.semibold,
      color: color.accent,
    },
    '&:focus-visible': {
      outlineOffset: spacing[1],
      outlineStyle: 'solid',
      outlineWidth: focus.width,
      outlineColor: focus.color,
      borderRadius: border.radius.small,
    },
  },
});

export const sectionFaqsItemAnswerStyle = style({
  fontSize: font.size.base,
  textAlign: 'center',
  textWrap: 'balance',

  '@media': {
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      marginBottom: spacing[4],
    },
  },
});
