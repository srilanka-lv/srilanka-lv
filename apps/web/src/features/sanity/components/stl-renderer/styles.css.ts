import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, font, spacing, border, transition } = vars;

export const stlTableStyle = style({
  width: '100%',
  borderCollapse: 'collapse',
  border: `1px solid ${color.secondary}`,
  color: color.foreground,
  fontSize: font.size.lg,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: font.size.xl,
    },
  },
});

globalStyle(`${stlTableStyle} th, ${stlTableStyle} td`, {
  verticalAlign: 'top',
});

globalStyle(`${stlTableStyle} thead tr`, {
  borderBottom: `1px solid ${color.secondary}`,
});

globalStyle(`${stlTableStyle} th`, {
  padding: `${spacing[3]} ${spacing[4]}`,
  textAlign: 'left',
  fontWeight: font.weight.medium,
  color: color.secondaryForeground,
  textTransform: 'none',
  borderBottom: `1px solid ${color.secondary}`,
});

globalStyle(`${stlTableStyle} tbody tr`, {
  borderBottom: `1px solid ${color.secondary}`,
  transition: `background-color ${transition.duration.normal} ${transition.easing.easeInOut}`,
});

globalStyle(`${stlTableStyle} tbody tr:hover`, {
  backgroundColor: color.accent,
});

globalStyle(`${stlTableStyle} tbody tr:last-child`, {
  borderBottom: 'none',
});

globalStyle(`${stlTableStyle} td`, {
  padding: `${spacing[3]} ${spacing[4]}`,
  color: color.foreground,
});

globalStyle(`${stlTableStyle} tfoot tr`, {
  borderTop: `1px solid ${color.secondary}`,
});

globalStyle(`${stlTableStyle} tfoot th`, {
  padding: `${spacing[3]} ${spacing[4]}`,
  textAlign: 'left',
  fontWeight: font.weight.medium,
  color: color.secondaryForeground,
});

globalStyle(`${stlTableStyle} a`, {
  color: color.foreground,
  textDecoration: 'underline',
});

globalStyle(`${stlTableStyle} a:hover`, {
  textDecoration: 'none',
});

globalStyle(`${stlTableStyle} button`, {
  padding: `${spacing[2]} ${spacing[3]}`,
  fontSize: font.size.sm,
  fontWeight: font.weight.medium,
  cursor: 'pointer',
  borderRadius: border.radius.small,
  transition: `all ${transition.duration.normal} ${transition.easing.easeInOut}`,
});

globalStyle(`${stlTableStyle} button[data-variant="default"]`, {
  backgroundColor: color.foreground,
  color: color.background,
  border: `1px solid ${color.foreground}`,
});

globalStyle(`${stlTableStyle} button[data-variant="default"]:hover`, {
  opacity: 0.9,
});

globalStyle(`${stlTableStyle} button[data-variant="outline"]`, {
  backgroundColor: 'transparent',
  color: color.foreground,
  border: `1px solid ${color.secondary}`,
});

globalStyle(`${stlTableStyle} button[data-variant="outline"]:hover`, {
  backgroundColor: color.accent,
});

globalStyle(`${stlTableStyle} button[data-variant="ghost"]`, {
  backgroundColor: 'transparent',
  color: color.foreground,
  border: '1px solid transparent',
});

globalStyle(`${stlTableStyle} button[data-variant="ghost"]:hover`, {
  backgroundColor: color.accent,
});
