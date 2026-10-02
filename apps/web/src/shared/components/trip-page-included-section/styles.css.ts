import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border } = vars;

export const includedColumnsStyle = style({
  display: 'grid',
  gap: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: spacing[8],
    },
  },
});

export const includedColumnStyle = style({
  padding: spacing[6],
  borderRadius: border.radius.large,
  border: `0.5px solid color-mix(in oklch, ${color.foreground} 25%, transparent)`,
});

export const includedSubtitleStyle = style({
  margin: 0,
  marginBottom: spacing[4],
  fontSize: font.size.lg,
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.snug,
});

export const includedListStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[3],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const includedItemStyle = style({
  display: 'grid',
  gridTemplateColumns: `${spacing[6]} minmax(0, 1fr)`,
  columnGap: spacing[3],
  alignItems: 'start',
  fontSize: font.size.base,
  lineHeight: font.lineHeight.snug,
});

const iconBase = style({
  width: spacing[6],
  height: spacing[6],
});

// The same green and red the old summary used for its ✔ and ✗ marks.
export const includedIconStyles = styleVariants({
  included: [iconBase, { color: '#20bf6b' }],
  excluded: [iconBase, { color: `color-mix(in oklch, ${color.foreground} 55%, transparent)` }],
});
