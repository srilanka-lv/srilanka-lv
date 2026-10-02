import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { darkThemeSelector } from '@/shared/styles/themes/theme.dark.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border } = vars;

const hairline = `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`;

export const stepsStyle = style({
  display: 'grid',
  gap: spacing[4],
  margin: 0,
  padding: 0,
  listStyle: 'none',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: spacing[8],
    },
  },
});

export const stepStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
  padding: spacing[6],
  borderRadius: border.radius.large,
  border: `0.5px solid color-mix(in oklch, ${color.foreground} 25%, transparent)`,
});

export const stepAmountStyle = style({
  fontSize: font.size['3xl'],
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.none,
  fontVariantNumeric: 'tabular-nums',
});

export const stepBodyStyle = style({
  minWidth: 0,
});

globalStyle(`${stepBodyStyle} p`, {
  margin: 0,
});

export const stepTitleStyle = style({
  margin: 0,
  marginBottom: spacing[2],
  fontSize: font.size.lg,
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.snug,
});

export const operatorStyle = style({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  columnGap: spacing[4],
  alignItems: 'start',
  marginTop: spacing[6],
  paddingBlock: spacing[4],
  borderTop: hairline,
  borderBottom: hairline,
});

globalStyle(`${operatorStyle} p`, {
  margin: 0,
});

export const operatorLinkStyle = style({
  backgroundImage: 'none',
});

export const operatorLogoStyle = style({
  display: 'block',
  selectors: {
    // The logo artwork is pure black on transparency, so inverting it yields
    // the white version for dark backgrounds without a second asset.
    [`${darkThemeSelector} &`]: {
      filter: 'invert(1)',
    },
  },
});

export const termsStyle = style({
  marginTop: spacing[6],
});

export const termsTitleStyle = style({
  margin: 0,
  marginBottom: spacing[2],
  fontSize: font.size.lg,
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.snug,
});
