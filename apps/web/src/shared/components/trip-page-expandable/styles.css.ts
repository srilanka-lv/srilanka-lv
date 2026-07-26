import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { font, color, spacing, border } = vars;

export const tripPagePlanItineraryItemStyle = style({
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});

const tripPagePlanItineraryItemToggleBaseStyle = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  gap: spacing[2],
  background: 'none',
  border: 'none',
  outline: 'none',
  margin: 0,
  padding: `${spacing[3]} ${0}`,
  fontSize: font.size.lg,
  fontWeight: font.weight.medium,
  color: color.foreground,
  textAlign: 'left',
  width: '100%',
  borderRadius: border.radius.medium,
  transitionProperty: 'padding, background-color',
  transitionDuration: '325ms',
  transitionTimingFunction: 'cubic-bezier(0.675, 0.145, 0.000, 1.015)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',

  selectors: {
    '&:not([data-state-expanded="true"]):hover': {
      backgroundColor: `color-mix(in oklch, ${color.foreground} 3.25%, transparent)`,
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gap: spacing[4],
      padding: spacing[4],
      fontSize: font.size.xl,
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
  fontSize: font.size.lg,
  fontWeight: font.weight.normal,
  position: 'relative',
  top: '-1px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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
    },
  ],
  expanded: [
    tripPagePlanItineraryItemContentTextBaseStyle,
    {
      paddingTop: spacing[2],
      paddingBottom: spacing[4],
      pointerEvents: 'auto',
      opacity: 1,
    },
  ],
});

globalStyle(`${tripPagePlanItineraryItemContentTextBaseStyle} p:first-child`, {
  marginTop: 0,
});

globalStyle(`${tripPagePlanItineraryItemContentTextBaseStyle} p:last-child`, {
  marginBottom: 0,
});
