import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, color, font, focus, border } = vars;

export const footerLinksListStyle = style(
  inComponentsLayer({
    listStyle: 'none',
    padding: 0,
    margin: `${spacing[4]} 0 0`,
    display: 'grid',
    gap: spacing[3],
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.relaxed,
  }),
);

export const footerLinksLinkStyle = style(
  inComponentsLayer({
    display: 'inline-block',

    selectors: {
      '&:link, &:visited, &:active': {
        color: 'inherit',
        textDecoration: 'underline',
        textDecorationColor: `color-mix(in oklch, ${color.accent} 50%, transparent)`,
        textUnderlineOffset: '3px',
      },
      '&::after': {
        display: 'none',
      },
      '&:hover': {
        color: color.accent,
        textDecorationColor: color.accent,
      },
      '&:focus-visible': {
        color: color.accent,
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: focus.offset,
        borderRadius: border.radius.small,
      },
    },
  }),
);
