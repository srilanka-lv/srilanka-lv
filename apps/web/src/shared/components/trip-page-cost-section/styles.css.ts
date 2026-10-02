import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color } = vars;

const hairline = `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`;

export const costTableStyle = style({
  width: '100%',
  marginTop: spacing[6],
  borderCollapse: 'collapse',
});

export const costRowStyle = style({
  borderTop: hairline,
});

export const costTotalRowStyle = style({
  borderTop: `2px solid ${color.foreground}`,
  fontWeight: font.weight.semibold,
});

export const costLabelStyle = style({
  paddingBlock: spacing[3],
  paddingRight: spacing[4],
  textAlign: 'left',
  fontWeight: 'inherit',
  verticalAlign: 'top',
});

export const costNoteStyle = style({
  display: 'block',
  fontSize: font.size.sm,
  fontWeight: font.weight.normal,
  color: `color-mix(in oklch, ${color.foreground} 70%, transparent)`,
});

export const costAmountStyle = style({
  paddingBlock: spacing[3],
  textAlign: 'right',
  verticalAlign: 'top',
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',

  selectors: {
    // A placeholder is long text, so it wraps instead of pushing the table wide.
    '&:has(mark)': {
      whiteSpace: 'normal',
      textAlign: 'left',
      maxWidth: '14rem',
    },
  },
});
