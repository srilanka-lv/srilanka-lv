import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

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

// The saving and the deadline as one strip under the price: a hairline frame
// with the early-bird on the page's green tint (the same green as the reserve
// button, so the saving and the action read as one thing) and the deadline
// below it on a neutral row.
export const offerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: spacing[2],
  overflow: 'hidden',
  borderRadius: vars.border.radius.medium,
  border: `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`,
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.snug,
});

const offerRow = {
  margin: 0,
  paddingBlock: spacing[2],
  paddingInline: spacing[3],
  textWrap: 'pretty',
} as const;

export const offerEarlyBirdStyle = style({
  ...offerRow,
  backgroundColor: 'color-mix(in oklch, #20bf6b 14%, transparent)',
  borderBottom: `1px solid color-mix(in oklch, ${color.foreground} 8%, transparent)`,
});

globalStyle(`${offerEarlyBirdStyle} strong`, {
  fontWeight: font.weight.semibold,
});

export const offerAfterStyle = style({
  color: `color-mix(in oklch, ${color.foreground} 75%, transparent)`,
});

export const offerDeadlineStyle = style({
  ...offerRow,
  display: 'flex',
  alignItems: 'center',
  gap: spacing[2],
  backgroundColor: `color-mix(in oklch, ${color.foreground} 3%, transparent)`,
  fontWeight: font.weight.medium,
});

export const offerDeadlineIconStyle = style({
  flexShrink: 0,
  width: spacing[4],
  height: spacing[4],
  color: color.accent,
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
