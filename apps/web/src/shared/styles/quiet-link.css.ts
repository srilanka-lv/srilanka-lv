import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { focus } = vars;

// Quiet inline link for places where the site-wide coral link style (coral
// text plus a coral bar that fills on hover) would be too loud: keeps the
// surrounding text colour, swaps the bar for a thin dotted underline and drops
// the hover change. Focus stays visible for keyboard users.
export const quietLinkStyle = style(
  inComponentsLayer({
    borderBottom: '1px dotted currentColor',
    backgroundImage: 'none',
    selectors: {
      '&:link, &:visited, &:hover, &:active, &:focus-visible': {
        color: 'inherit',
      },
      '&:focus-visible': {
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: focus.offset,
      },
    },
  }),
);
