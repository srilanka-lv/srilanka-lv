import { createVar, globalStyle, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, border, color, shadow, focus, zIndex, transition } = vars;

const primaryColorVar = createVar();
const secondaryColorVar = createVar();

export const buttonStyles = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    gridColumn: 'span 2',
    outline: 'none',
    border: 'none',
    width: '100%',
    fontSize: font.size.lg,
    fontWeight: font.weight.medium,
    padding: spacing[4],
    marginBottom: spacing[2],
    borderRadius: border.radius.medium,
    cursor: 'pointer',
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '100ms',
    transitionTimingFunction: 'cubic-bezier(0.675, 0.145, 0.000, 1.015)',

    vars: {
      [primaryColorVar]: '#20bf6b',
      [secondaryColorVar]: '#f5f6fa',
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.xs})`]: {
        marginBottom: spacing[4],
      },
    },
  },
  variants: {
    variant: {
      primary: {
        color: color.background,
        backgroundColor: primaryColorVar,
        boxShadow: `0 2px 0 0 oklch(from ${primaryColorVar} calc(l - 0.1) c h)`,

        selectors: {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: `0 3px 0 0 oklch(from ${primaryColorVar} calc(l - 0.1) c h)`,
          },
          '&:active': {
            transform: 'translateY(2px)',
            boxShadow: `0 0 0 0 oklch(from ${primaryColorVar} calc(l - 0.3) c h)`,
          },
        },
      },
      secondary: {
        color: color.foreground,
        fontSize: font.size.base,
        backgroundColor: 'transparent',
        border: `0.5px solid oklch(from ${secondaryColorVar} calc(l - 0.125) c h)`,
        boxShadow: `0 2px 0 0 oklch(from ${secondaryColorVar} calc(l - 0.125) c h)`,
        marginBottom: 0,

        '@media': {
          [`screen and (min-width: ${breakpoints.xs})`]: {
            marginBottom: 0,
          },
        },

        selectors: {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: `0 3px 0 0 oklch(from ${secondaryColorVar} calc(l - 0.125) c h)`,
          },
          '&:active': {
            transform: 'translateY(2px)',
            boxShadow: `0 0 0 0 oklch(from ${secondaryColorVar} calc(l - 0.125) c h)`,
          },
        },
      },
    },
  },
});

export const buttonIconStyle = style({
  width: spacing[5],
  height: spacing[5],
  fill: 'currentColor',
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const scaleFadeIn = keyframes({
  from: {
    opacity: 0,
    transform: `translateY(${spacing[2]})`,
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const scaleFadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: `translateY(${spacing[2]})`,
  },
});

export const backdropStyle = style({
  position: 'fixed',
  inset: 0,
  zIndex: zIndex['40'],
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(2px)',
  selectors: {
    "&[data-state='open']": {
      animation: `${fadeIn} ${transition.duration.faster} ease-out`,
    },
    "&[data-state='closed']": {
      animation: `${fadeOut} ${transition.duration.faster} ease-in`,
    },
  },
});

export const positionerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  inset: 0,
  zIndex: zIndex['50'],
  overscrollBehaviorY: 'none',
});

export const contentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  position: 'relative',
  width: '56rem',
  maxWidth: `calc(100vw - ${spacing[8]})`,
  maxHeight: `calc(100vh - ${spacing[8]})`,
  padding: spacing[6],
  borderRadius: border.radius.medium,
  border: `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`,
  backgroundColor: color.background,
  boxShadow: shadow.large,
  outline: 0,
  selectors: {
    '&[hidden]': {
      display: 'none',
    },
    "&[data-state='open']": {
      animation: `${scaleFadeIn} ${transition.duration.faster} ease-out`,
    },
    "&[data-state='closed']": {
      animation: `${scaleFadeOut} ${transition.duration.faster} ease-in`,
    },
  },
});

globalStyle(`${contentStyle} ul, ${contentStyle} li`, {
  margin: `${spacing[2]} 0 0`,
  padding: 0,
  fontSize: font.size.base,
  lineHeight: font.lineHeight.normal,
  listStyle: 'none',
});

export const titleStyle = style({
  margin: 0,
  fontSize: font.size.lg,
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.snug,
  color: color.foreground,
});

export const descriptionStyle = style({
  margin: `${spacing[1]} 0 0`,
  fontSize: font.size.base,
  lineHeight: font.lineHeight.normal,
});

export const closeTriggerStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: spacing[3],
  right: spacing[3],
  width: spacing[6],
  height: spacing[6],
  padding: 0,
  border: 'none',
  borderRadius: border.radius.small,
  background: 'transparent',
  color: color.foreground,
  cursor: 'pointer',
  transitionProperty: 'background-color',
  transitionDuration: transition.duration.faster,
  transitionTimingFunction: transition.easing.easeInOut,
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in oklch, ${color.foreground} 6%, transparent)`,
    },
    '&:focus-visible': {
      outline: `${focus.width} solid ${focus.color}`,
      outlineOffset: focus.offset,
    },
  },
});
