import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, border, color, shadow } = vars;

export const tripPageHeroSectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      gap: spacing[8],
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: '1fr',
      marginTop: spacing[4],
      marginBottom: spacing[12],
    },
  },
});

export const tripPageImageGalleryStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridColumn: '1 / 3',
      gridRow: '1 / 2',
      display: 'grid',
      gridTemplateRows: 'repeat(2, min-content)',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: spacing[2],
    },
  },
});

export const tripPageHeroSectionDescriptionStyle = style({
  gridColumn: '1 / 4',
  display: 'flex',
  flexDirection: 'column',
  marginTop: spacing[4],
});

export const tripPageHeroSectionDescriptionParagraphStyle = style({
  fontSize: font.size.lg,
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.relaxed,
  marginTop: spacing[3],
  marginBottom: spacing[3],
});

export const tripPageSummaryStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
  height: 'auto',
  // The site's filled card: the one raised surface on the page, so the price
  // and the two buttons read as the thing to act on.
  borderRadius: border.radius.large,
  border: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,
  backgroundColor: color.surface,
  boxShadow: shadow.medium,
  padding: spacing[5],
  textAlign: 'left',
  // Clears the sticky mobile bar's anchor jump and the header.
  scrollMarginTop: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      padding: spacing[6],
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      position: 'sticky',
      top: spacing[8],
      gridColumn: '3 / 4',
      gridRow: '1 / 2',
      alignSelf: 'start',
    },
  },
});

// Label-and-value rows: values never wrap, whatever the column width, and
// the eye runs down one edge instead of zig-zagging a 2x2 grid.
export const tripPageSummaryFactsStyle = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  borderTop: `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`,
});

export const tripPageSummaryFactStyle = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: spacing[4],
  paddingBlock: spacing[2],
  borderBottom: `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`,
});

export const tripPageSummaryItemTitleStyle = style({
  fontSize: font.size.sm,
  color: `color-mix(in oklch, ${color.foreground} 70%, transparent)`,
});

export const tripPageSummaryItemValueStyle = style({
  margin: 0,
  fontSize: font.size.base,
  fontWeight: font.weight.medium,
  color: color.foreground,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: font.lineHeight.snug,
  textAlign: 'right',
  whiteSpace: 'nowrap',
});

export const tripPageHeroHostStyle = style({
  display: 'grid',
  gridTemplateColumns: `${spacing[12]} minmax(0, 1fr)`,
  columnGap: spacing[3],
  alignItems: 'center',
});

export const tripPageHeroHostPortraitStyle = style({
  display: 'block',
  width: spacing[12],
  height: spacing[12],
  borderRadius: '50%',
  objectFit: 'cover',
});

export const tripPageHeroHostTextStyle = style({
  margin: 0,
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.snug,
});

export const tripPageHeroLinksStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: `${spacing[2]} ${spacing[5]}`,
  margin: 0,
  fontSize: font.size.sm,
});
