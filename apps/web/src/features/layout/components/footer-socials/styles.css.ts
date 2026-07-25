import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, color, border, focus, transition } = vars;

export const footerSocialsStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginTop: spacing[8],
  }),
);

export const footerSocialLinkStyle = style(
  inComponentsLayer({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[2],
    borderRadius: border.radius.medium,
    transitionProperty: 'color',
    transitionDuration: transition.duration.faster,
    transitionTimingFunction: transition.easing.easeInOut,

    selectors: {
      '&:link, &:visited, &:active': {
        color: color.accent,
      },
      '&::after': {
        display: 'none',
      },
      '&:hover': {
        color: color.primary,
      },
      '&:focus-visible': {
        color: color.primary,
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: focus.offset,
      },
    },
  }),
);
