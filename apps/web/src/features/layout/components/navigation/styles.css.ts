import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, spacing, zIndex, font, transition, border } = vars;

export const navigationStyles = recipe({
  base: inOverridesLayer({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: spacing[2],
    top: '.5rem',
    left: `calc(100% + ${spacing[4]})`,
    height: 'auto',
    padding: `${spacing[6]} ${spacing[6]}`,
    zIndex: zIndex['20'],
    // Animate `transform` with the standard easing; `visibility` is a binary
    // property (no in-between values), so its "transition" is just a delayed
    // snap. The per-state delay below makes the snap happen at the END of the
    // close animation (so the menu stays visible while it slides out) and
    // IMMEDIATELY on open (so the slide-in is visible from frame one).
    transitionProperty: 'transform, visibility',
    transitionDuration: `${transition.duration.normal}, 0s`,
    transitionTimingFunction: `${transition.easing.easeInOut}, linear`,

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
        gap: spacing[6],
      },
      [`screen and (min-width: ${breakpoints.lg})`]: {
        gap: spacing[8],
      },
    },
  }),
  variants: {
    isVisible: {
      true: inOverridesLayer({
        transform: `translateX(calc(-100% - ${spacing[2]}))`,
        visibility: 'visible',
        // Open: snap to "visible" with no delay so the slide-in is visible.
        transitionDelay: '0s, 0s',
      }),
      false: inOverridesLayer({
        transform: 'translateX(0%)',
        visibility: 'hidden',
        // Close: defer the visibility snap until the slide-out finishes, so
        // the menu stays in the rendered tree for the full animation.
        transitionDelay: `0s, ${transition.duration.normal}`,
      }),
    },
  },
});

export const navigationItemStyles = recipe({
  base: inOverridesLayer({
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    color: 'currentColor',
    textDecoration: 'none',
    fontSize: font.size.lg,
    fontWeight: font.weight.medium,
    lineHeight: font.lineHeight.none,
    whiteSpace: 'nowrap',
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
    transitionProperty: 'color',
    transitionDuration: transition.duration.fast,
    transitionTimingFunction: transition.easing.easeInOut,

    selectors: {
      '&:link, &:visited, &:hover, &:active': {
        color: 'currentColor',
      },
      '&:link::after, &:visited::after, &:hover::after, &:active::after': {
        content: '',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        width: '100%',
        height: '1.5px',
        backgroundColor: 'currentColor',
        borderRadius: border.radius.large,
        transform: 'scaleX(0)',
        opacity: 0,
        transitionProperty: 'transform, opacity, background-color',
        transitionDuration: transition.duration.fast,
        transitionTimingFunction: transition.easing.easeInOut,

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
        fontSize: font.size.lg,
        gap: spacing[2],
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        fontSize: font.size.xl,
      },
    },
  }),
  variants: {
    active: {
      true: inOverridesLayer({
        selectors: {
          '&:link::after, &:visited::after, &:hover::after, &:active::after': {
            backgroundColor: 'currentColor',
            opacity: 1,
            transform: 'scaleX(1)',
          },
        },
      }),
    },
  },
});

export const navigationButtonStyle = style(
  inOverridesLayer({
    width: spacing[10],
    height: spacing[10],
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        display: 'none',
      },
    },
  }),
);

export const navigationBackdropStyles = recipe({
  base: inOverridesLayer({
    position: 'fixed',
    inset: 0,
    zIndex: zIndex['10'],
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
  }),
  variants: {
    isVisible: {
      true: inOverridesLayer({
        pointerEvents: 'auto',
        visibility: 'visible',
      }),
      false: inOverridesLayer({
        pointerEvents: 'none',
        visibility: 'hidden',
      }),
    },
  },
});

export const navigationItemsDividerStyle = style(
  inOverridesLayer({
    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        display: 'none',
      },
    },
  }),
);

export const socialMediaStyle = style(
  inOverridesLayer({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: spacing[3],
    marginTop: spacing[2],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        display: 'none',
      },
    },
  }),
);

export const socialMediaItemStyle = style(
  inOverridesLayer({
    selectors: {
      '&:link, &:visited, &:hover, &:active': {
        color: color.primary,
      },
    },
  }),
);
