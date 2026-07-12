import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, border, color } = vars;

export const tripPageTitleStyle = style({
  fontSize: font.size['5xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: spacing[8],
  marginBottom: spacing[8],
});

export const tripPageHeroSectionStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: '1fr',
  gap: spacing[8],
  marginTop: spacing[4],
  marginBottom: spacing[24],
});

export const tripPageImageGalleryStyle = style({
  gridColumn: '1 / 3',
  display: 'grid',
  gridTemplateRows: 'repeat(2, min-content)',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing[2],
});

export const tripPageImageGalleryMainImageStyle = style({
  position: 'relative',
  gridRow: '1 / 2',
  gridColumn: '1 / 2',
  gridArea: '1 / 1 / 2 / 4',
  minHeight: '500px',
  overflow: 'hidden',
  borderTopLeftRadius: border.radius.large,
  borderTopRightRadius: border.radius.large,
});

export const tripPageImageGalleryThumbnailsContainerStyle = style({
  gridRow: '2 / 3',
  gridColumn: '1 / 4',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, min-content)',
  gap: spacing[2],
});

export const tripPageImageGalleryThumbnailImageStyle = style({
  position: 'relative',
  overflow: 'hidden',
  minHeight: '100px',
  aspectRatio: '2 / 1.25',
  selectors: {
    '&:nth-of-type(4)': {
      borderBottomLeftRadius: border.radius.large,
    },
    '&:nth-of-type(6)': {
      borderBottomRightRadius: border.radius.large,
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
  position: 'sticky',
  display: 'grid',
  gridTemplateRows: 'repeat(7, min-content)',
  gridTemplateColumns: '1fr 1fr',
  height: 'auto',
  top: spacing[8],
  gridColumn: '3 / 4',
  gridRow: '1 / 2',
  borderRadius: border.radius.large,
  borderStyle: 'solid',
  borderWidth: '0.5px',
  borderColor: `color-mix(in oklch, ${color.foreground} 25%, transparent)`,
  padding: spacing[6],
  alignSelf: 'start',
});

export const tripPageSummaryItemStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
  whiteSpace: 'nowrap',
});

export const tripPageSummaryItemTitleStyle = style({
  fontSize: font.size.sm,
  fontWeight: font.weight.light,
  color: `color-mix(in oklch, ${color.foreground} 75%, transparent)`,
});

export const tripPageSummaryItemValueStyle = style({
  fontSize: font.size.base,
  fontWeight: font.weight.medium,
  color: color.foreground,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: font.lineHeight.relaxed,
});

export const tripPageSummaryItemValueListStyle = style({
  fontWeight: font.weight.medium,
  color: color.foreground,
  padding: 0,
  margin: 0,
  listStyle: 'none',
  listStylePosition: 'inside',
});

export const tripPageSummaryItemValueListItemIncludedStyle = style({
  selectors: {
    '&::before': {
      color: 'green',
      content: '✔',
      display: 'inline-block',
      marginRight: spacing[2],
      fontSize: font.size.xs,
    },
  },
});

export const tripPageSummaryItemValueListItemExcludedStyle = style({
  selectors: {
    '&::before': {
      color: 'red',
      content: '✗',
      display: 'inline-block',
      marginRight: spacing[2],
      fontSize: font.size.xs,
    },
  },
});

export const tripPageSummaryItemSeparatorStyle = style({
  gridColumn: '1 / 3',
  height: '1px',
  backgroundColor: `color-mix(in oklch, ${color.foreground} 7.5%, transparent)`,
  marginTop: spacing[4],
  marginBottom: spacing[4],
});

export const tripPageUspSectionStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, min-content)',
  gap: spacing[8],
});

export const tripPageUspTitleStyle = style({
  fontSize: font.size['5xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: 0,
});

export const tripPageUspItemListStyle = style({
  fontSize: font.size.base,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(2, min-content)',
  gap: spacing[8],
  gridColumn: '2 / 4',
  gridRow: '1 / 2',
  padding: 0,
  margin: 0,
});

export const tripPagePlanItinerarySectionStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(1, min-content)',
  gap: spacing[8],
  marginBottom: spacing[16],
  backgroundColor: color.background,
});

export const tripPagePlanItinerarySectionMapStyle = style({
  position: 'relative',
  gridColumn: '1 / 2',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: border.radius.large,
  backgroundColor: `color-mix(in oklch, ${color.accent} 10%, transparent)`,
  alignSelf: 'flex-start',
});

export const tripPagePlanItineraryStyle = style({
  gridColumn: 'span 2',
});

export const tripPagePlanItineraryItemSeparatorStyle = style({
  gridColumn: '1 / 3',
  height: '1px',
  backgroundColor: `color-mix(in oklch, ${color.foreground} 10%, transparent)`,
  marginTop: spacing[2],
  marginBottom: spacing[2],
  paddingLeft: spacing[4],
  paddingRight: spacing[4],
  width: `calc(100% - 2 * ${spacing[4]})`,
  border: 'none',
});
