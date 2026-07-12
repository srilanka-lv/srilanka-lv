import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { font, color, spacing, border } = vars;

export const tripPagePlanItineraryItemStyle = style({
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});

const tripPagePlanItineraryItemToggleBaseStyle = style({
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

  selectors: {
    '&:not([data-state-expanded="true"]):hover': {
      cursor: 'pointer',
      backgroundColor: `color-mix(in oklch, ${color.foreground} 5%, transparent)`,
    },
  },
});

export const tripPagePlanItineraryItemToggleStyles = styleVariants({
  expanded: [
    tripPagePlanItineraryItemToggleBaseStyle,
    {
      backgroundColor: 'transparent',
      paddingLeft: 0,
      paddingRight: 0,
    },
  ],
  collapsed: [
    tripPagePlanItineraryItemToggleBaseStyle,
    {
      backgroundColor: `color-mix(in oklch, ${color.foreground} 0%, transparent)`,
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
  minHeight: '0',
  transitionProperty: 'opacity, padding',
  transitionDuration: '325ms',
  transitionTimingFunction: 'cubic-bezier(0.675, 0.145, 0.000, 1.015)',
});

export const tripPagePlanItineraryItemContentTextBaseStyles = styleVariants({
  collapsed: [
    tripPagePlanItineraryItemContentTextBaseStyle,
    {
      pointerEvents: 'none',
      opacity: 0,
      paddingTop: spacing[0],
      paddingBottom: spacing[0],
    },
  ],
  expanded: [
    tripPagePlanItineraryItemContentTextBaseStyle,
    {
      pointerEvents: 'auto',
      opacity: 1,
      paddingTop: 0,
      paddingBottom: spacing[4],
    },
  ],
});
