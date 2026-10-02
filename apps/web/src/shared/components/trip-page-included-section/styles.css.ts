import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border, shadow } = vars;

export const includedColumnsStyle = style({
  display: 'grid',
  gap: spacing[8],
  alignItems: 'start',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
      gap: spacing[10],
    },
  },
});

// What the price buys sits on the raised card; what it leaves out stays a
// quiet list on the page ground, so the two never weigh the same.
export const includedColumnStyles = styleVariants({
  included: {
    padding: spacing[6],
    borderRadius: border.radius.large,
    border: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,
    backgroundColor: color.surface,
    boxShadow: shadow.small,
  },
  excluded: {
    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        paddingTop: spacing[6],
      },
    },
  },
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

// The page's green (the reserve button's) marks what is included; the
// excluded items keep the ink, muted.
export const includedIconStyles = styleVariants({
  included: [iconBase, { color: '#20bf6b' }],
  excluded: [iconBase, { color: `color-mix(in oklch, ${color.foreground} 50%, transparent)` }],
});
