import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { border, color, font, spacing } = vars;

export const wrapperStyle = style(
  inComponentsLayer({
    marginBlock: spacing[6],
    overflowX: 'auto',
    border: `1px solid ${color.border}`,
    borderRadius: border.radius.medium,
    backgroundColor: color.surface,
  }),
);

export const tableStyle = style(
  inComponentsLayer({
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: font.size.base,
    lineHeight: font.lineHeight.normal,
    fontVariantNumeric: 'tabular-nums',
  }),
);

// The caption is the resting point after a dense block: body size, warm
// tinted from the foreground rather than gray, so the eye lands on the date
// of the numbers before moving on.
export const captionStyle = style(
  inComponentsLayer({
    captionSide: 'bottom',
    paddingBlock: spacing[3],
    paddingInline: spacing[4],
    fontSize: font.size.base,
    lineHeight: font.lineHeight.snug,
    color: `color-mix(in oklch, ${color.foreground} 72%, ${color.background})`,
    textAlign: 'left',
    textWrap: 'pretty',
  }),
);

globalStyle(
  `${tableStyle} th, ${tableStyle} td`,
  inComponentsLayer({
    paddingBlock: spacing[3],
    paddingInline: spacing[4],
    borderBottom: `1px solid ${color.border}`,
    textAlign: 'left',
    verticalAlign: 'top',
  }),
);

globalStyle(
  `${tableStyle} th`,
  inComponentsLayer({
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    letterSpacing: font.letterSpacing.wide,
    // The product family's coral tint, so the header row reads as the
    // table's title bar rather than another stone stripe.
    color: color.foreground,
    backgroundColor: `color-mix(in oklch, ${color.accent} 8%, ${color.background})`,
    whiteSpace: 'nowrap',
  }),
);

globalStyle(
  `${tableStyle} tbody tr:last-child td`,
  inComponentsLayer({
    borderBottom: 0,
  }),
);
