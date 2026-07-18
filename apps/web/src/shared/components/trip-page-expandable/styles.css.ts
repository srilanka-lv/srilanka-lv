import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { font, color, spacing, border } = vars;

export const tripPagePlanItineraryItemStyle = style({
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});

const tripPagePlanItineraryItemToggleBaseStyle = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: spacing[4],
  background: 'none',
  border: 'none',
  outline: 'none',
  padding: spacing[4],
  margin: 0,
  fontSize: font.size.xl,
  fontWeight: font.weight.medium,
  color: color.foreground,
  textAlign: 'left',
  width: '100%',
  borderRadius: border.radius.medium,
  transitionProperty: 'padding, background-color',
  transitionDuration: '325ms',
  transitionTimingFunction: 'cubic-bezier(0.675, 0.145, 0.000, 1.015)',
  cursor: 'pointer',

  selectors: {
    '&:not([data-state-expanded="true"]):hover': {
      backgroundColor: `color-mix(in oklch, ${color.foreground} 3.25%, transparent)`,
    },
  },
});

export const tripPagePlanItineraryItemToggleStyles = styleVariants({
  expanded: [
    tripPagePlanItineraryItemToggleBaseStyle,
    {
      backgroundColor: 'transparent',
      paddingLeft: 0,
    },
  ],
  collapsed: [
    tripPagePlanItineraryItemToggleBaseStyle,
    {
      backgroundColor: `color-mix(in oklch, ${color.foreground} 0%, transparent)`,
    },
  ],
});

export const tripPagePlanItineraryItemToggleTitleStyle = style({
  fontSize: font.size.base,
  fontWeight: font.weight.normal,
  color: '#e67e22',
});

const tripPagePlanItineraryItemToggleIconBaseStyle = style({
  width: spacing[4],
  height: spacing[4],
  marginLeft: 'auto',
  transitionProperty: 'transform',
  transitionDuration: '325ms',
  transitionTimingFunction: 'cubic-bezier(0.675, 0.145, 0.000, 1.015)',
});

export const tripPagePlanItineraryItemToggleIconStyles = styleVariants({
  expanded: [
    tripPagePlanItineraryItemToggleIconBaseStyle,
    {
      transform: 'rotate(180deg)',
    },
  ],
  collapsed: [
    tripPagePlanItineraryItemToggleIconBaseStyle,
    {
      transform: 'rotate(0deg)',
    },
  ],
});

export const tripPagePlanItineraryItemContentBaseStyle = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  transitionProperty: 'grid-template-rows',
  transitionDuration: '325ms',
  transitionTimingFunction: 'cubic-bezier(0.675, 0.145, 0.000, 1.015)',
});

export const tripPagePlanItineraryItemContentBaseStyles = styleVariants({
  collapsed: [
    tripPagePlanItineraryItemContentBaseStyle,
    {
      gridTemplateRows: '0fr',
    },
  ],
  expanded: [
    tripPagePlanItineraryItemContentBaseStyle,
    {
      gridTemplateRows: '1fr',
    },
  ],
});

const tripPagePlanItineraryItemContentTextBaseStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: spacing[4],
  minHeight: '0',
  transitionProperty: 'opacity, padding, background-color',
  transitionDuration: '325ms',
  transitionTimingFunction: 'cubic-bezier(0.675, 0.145, 0.000, 1.015)',
  paddingLeft: spacing[6],
  paddingRight: spacing[6],
  overflow: 'hidden',
  borderRadius: border.radius.large,
});

export const tripPagePlanItineraryItemContentImageStyle = style({
  borderRadius: border.radius.large,
});

export const tripPagePlanItineraryItemContentTextBaseStyles = styleVariants({
  collapsed: [
    tripPagePlanItineraryItemContentTextBaseStyle,
    {
      paddingTop: 0,
      paddingBottom: 0,
      pointerEvents: 'none',
      opacity: 0,
      backgroundColor: `color-mix(in oklch, ${color.foreground} 0%, transparent)`,
    },
  ],
  expanded: [
    tripPagePlanItineraryItemContentTextBaseStyle,
    {
      paddingTop: spacing[6],
      paddingBottom: spacing[6],
      pointerEvents: 'auto',
      opacity: 1,
      backgroundColor: `color-mix(in oklch, ${color.foreground} 3.25%, transparent)`,
    },
  ],
});
