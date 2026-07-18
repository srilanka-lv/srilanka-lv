import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, border, color } = vars;

export const tripPagePlanItinerarySectionStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(1, min-content)',
  gap: spacing[8],
  marginBottom: spacing[16],
  backgroundColor: color.background,
});

export const tripPagePlanItinerarySectionMapStyle = style({
  position: 'sticky',
  top: spacing[8],
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
