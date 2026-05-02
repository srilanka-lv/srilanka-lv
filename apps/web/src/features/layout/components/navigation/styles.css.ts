import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const navigationStyles = recipe({
  base: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: vars.spacing[2],
    top: '.5rem',
    left: `calc(100% + ${vars.spacing[4]})`,
    height: 'auto',
    padding: `${vars.spacing[6]} ${vars.spacing[6]}`,
    zIndex: vars.zIndex['20'],
    // Animate `transform` with the standard easing; `visibility` is a binary
    // property (no in-between values), so its "transition" is just a delayed
    // snap. The per-state delay below makes the snap happen at the END of the
    // close animation (so the menu stays visible while it slides out) and
    // IMMEDIATELY on open (so the slide-in is visible from frame one).
    transitionProperty: 'transform, visibility',
    transitionDuration: `${vars.transition.duration.normal}, 0s`,
    transitionTimingFunction: `${vars.transition.easing.easeInOut}, linear`,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        top: 'initial',
        left: 'initial',
        width: 'initial',
        padding: 'unset',
        transform: 'unset',
        visibility: 'visible',
        transitionProperty: 'unset',
        transitionDuration: 'unset',
        transitionTimingFunction: 'unset',
        transitionDelay: 'unset',
        height: 'unset',
        borderRadius: 'unset',
        boxShadow: 'unset',
        backgroundColor: 'unset',
        gap: vars.spacing[6],
      },
      [`screen and (min-width: ${breakpoints.lg})`]: {
        gap: vars.spacing[8],
      },
    },
  },
  variants: {
    isVisible: {
      true: {
        transform: `translateX(calc(-100% - ${vars.spacing[2]}))`,
        visibility: 'visible',
        // Open: snap to "visible" with no delay so the slide-in is visible.
        transitionDelay: '0s, 0s',
      },
      false: {
        transform: 'translateX(0%)',
        visibility: 'hidden',
        // Close: defer the visibility snap until the slide-out finishes, so
        // the menu stays in the rendered tree for the full animation.
        transitionDelay: `0s, ${vars.transition.duration.normal}`,
      },
    },
  },
});

export const navigationItemStyles = recipe({
  base: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing[3],
    color: vars.color.foreground,
    textDecoration: 'none',
    fontSize: vars.font.size.lg,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.none,
    whiteSpace: 'nowrap',
    paddingTop: vars.spacing[2],
    paddingBottom: vars.spacing[2],
    transitionProperty: 'color',
    transitionDuration: vars.transition.duration.fast,
    transitionTimingFunction: vars.transition.easing.easeInOut,

    selectors: {
      '&:link, &:visited, &:hover, &:active': {
        color: vars.color.primary,
      },
      '&:link::after, &:visited::after, &:hover::after, &:active::after': {
        content: '',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        width: '100%',
        height: '1.5px',
        backgroundColor: vars.color.primary,
        borderRadius: vars.border.radius.large,
        transform: 'scaleX(0)',
        opacity: 0,
        transitionProperty: 'transform, opacity, background-color',
        transitionDuration: vars.transition.duration.fast,
        transitionTimingFunction: vars.transition.easing.easeInOut,

        '@media': {
          [`screen and (max-width: ${breakpoints.md})`]: {
            display: 'none',
          },
        },
      },
      '&:hover::after': {
        opacity: 1,
        transform: 'scaleX(1)',
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.xs})`]: {
        fontSize: vars.font.size.lg,
        gap: vars.spacing[2],
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        fontSize: vars.font.size.xl,
      },
    },
  },
  variants: {
    active: {
      true: {
        selectors: {
          '&:link, &:visited, &:hover, &:active': {
            color: vars.color.accent,
          },
          '&:link::after, &:visited::after, &:hover::after, &:active::after': {
            backgroundColor: vars.color.accent,
            opacity: 1,
            transform: 'scaleX(1)',
          },
        },
      },
      false: {
        selectors: {
          '&:link, &:visited, &:hover, &:active': {
            color: vars.color.primary,
          },
        },
      },
    },
  },
});

export const navigationButtonStyle = style({
  display: 'block',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      display: 'none',
    },
  },
});

export const navigationBackdropStyles = recipe({
  base: {
    position: 'fixed',
    inset: 0,
    zIndex: vars.zIndex['10'],
    appearance: 'none',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'default',

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        display: 'none',
      },
    },
  },
  variants: {
    isVisible: {
      true: {
        pointerEvents: 'auto',
        visibility: 'visible',
      },
      false: {
        pointerEvents: 'none',
        visibility: 'hidden',
      },
    },
  },
});

export const navigationItemsDividerStyle = style({
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      display: 'none',
    },
  },
});

export const socialMediaStyle = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: vars.spacing[3],
  marginTop: vars.spacing[2],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      display: 'none',
    },
  },
});

export const socialMediaItemStyle = style({
  selectors: {
    '&:link, &:visited, &:hover, &:active': {
      color: vars.color.primary,
    },
  },
});
