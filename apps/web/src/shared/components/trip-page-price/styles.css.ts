import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color } = vars;

export const priceStyles = styleVariants({
  full: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  },
  compact: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: font.lineHeight.tight,
  },
});

export const priceRowStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  columnGap: spacing[2],
});

export const amountStyle = style({
  fontSize: font.size['3xl'],
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.none,
  fontVariantNumeric: 'tabular-nums',
  color: color.foreground,

  selectors: {
    [`${priceStyles.compact} &`]: {
      fontSize: font.size.lg,
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['4xl'],
    },
  },
});

export const regularAmountStyle = style({
  fontSize: font.size.lg,
  color: `color-mix(in oklch, ${color.foreground} 60%, transparent)`,
  fontVariantNumeric: 'tabular-nums',
});

export const perPersonStyle = style({
  fontSize: font.size.sm,
  color: `color-mix(in oklch, ${color.foreground} 75%, transparent)`,
});

// The early-bird line uses the page's green, the same one as the reserve
// button, so the saving and the action read as one thing.
export const badgeStyle = style({
  alignSelf: 'flex-start',
  margin: 0,
  marginTop: spacing[1],
  paddingBlock: spacing[1],
  paddingInline: spacing[2],
  borderRadius: vars.border.radius.small,
  backgroundColor: 'color-mix(in oklch, #20bf6b 15%, transparent)',
  color: color.foreground,
  fontSize: font.size.sm,
  fontWeight: font.weight.medium,
  lineHeight: font.lineHeight.snug,
});

export const deadlineStyle = style({
  margin: 0,
  fontSize: font.size.sm,
  color: `color-mix(in oklch, ${color.foreground} 75%, transparent)`,

  selectors: {
    [`${priceStyles.compact} &`]: {
      fontSize: font.size.xs,
    },
  },
});

export const visuallyHiddenStyle = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});
