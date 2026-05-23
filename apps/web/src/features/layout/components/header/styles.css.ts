import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, color, zIndex } = vars;

export const headerStyle = style(
  inComponentsLayer({
    position: 'relative',
    zIndex: zIndex['20'],
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
    backgroundColor: color.background,

    selectors: {
      '&::after': {
        content: '',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100svw',
        backgroundColor: color.background,
        zIndex: -1,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        minHeight: '90px',
        flexDirection: 'column',
        gap: spacing[4],
        paddingTop: spacing[6],
        paddingBottom: 0,
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        alignItems: 'baseline',
        flexDirection: 'row',
        gap: spacing[0],
      },
    },
  }),
);

export const logoStyle = style(
  inComponentsLayer({
    width: spacing[40],

    '@media': {
      [`screen and (min-width: ${breakpoints.xs})`]: {
        width: spacing[56],
      },
      [`screen and (min-width: ${breakpoints.md})`]: {
        width: spacing[48],
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        width: spacing[40],
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        width: spacing[48],
      },
    },
  }),
);
