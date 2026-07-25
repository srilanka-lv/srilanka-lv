import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { font, spacing, zIndex, color } = vars;

export const subFooterStyle = style(
  inComponentsLayer({
    position: 'relative',
    fontSize: font.size.sm,
    fontWeight: font.weight.normal,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
    padding: `${spacing[4]} 0`,
    margin: 0,

    selectors: {
      '&::before': {
        position: 'absolute',
        content: '',
        top: 0,
        height: '100%',
        width: '100svw',
        zIndex: zIndex['-10'],
        borderTop: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.xl})`]: {
        flexDirection: 'row',
        padding: `${spacing[6]} 0`,
      },
    },
  }),
);

export const subFooterItemStyle = style(
  inComponentsLayer({
    position: 'relative',
    zIndex: zIndex['10'],
    display: 'inline-flex',
    alignItems: 'center',
    paddingTop: spacing[1],
    paddingBottom: spacing[1],

    selectors: {
      '&:not(:last-child)::after': {
        content: '',
        display: 'none',
        width: '1px',
        height: spacing[4],
        backgroundColor: color.foreground,
        marginLeft: spacing[2],
        marginRight: spacing[2],

        '@media': {
          [`screen and (min-width: ${breakpoints.xl})`]: {
            display: 'inline-block',
            marginLeft: spacing[4],
            marginRight: spacing[4],
          },
        },
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.xl})`]: {
        paddingTop: spacing[4],
        paddingBottom: spacing[4],
      },
    },
  }),
);

export const subFooterLinkStyle = style(
  inComponentsLayer({
    color: 'inherit',
  }),
);
