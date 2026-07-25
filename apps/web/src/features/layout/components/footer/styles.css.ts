import { style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, color, zIndex, font } = vars;

export const footerStyle = style(
  inOverridesLayer({
    position: 'relative',
    padding: `${spacing[12]} 0`,
    textWrap: 'balance',
    color: color.primary,
    backgroundColor: 'transparent',

    selectors: {
      '&::before': {
        content: '',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100svw',
        borderTop: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,
        zIndex: zIndex['-10'],
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        padding: `${spacing[16]} 0`,
      },
    },
  }),
);

export const footerColumnsStyle = style(
  inOverridesLayer({
    display: 'grid',
    gap: spacing[10],
    marginTop: spacing[12],
    paddingTop: spacing[12],
    borderTop: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,

    '@media': {
      [`screen and (min-width: ${breakpoints.xl})`]: {
        gridTemplateColumns: '1.25fr 1fr 1.1fr',
        gap: spacing[16],
      },
    },
  }),
);

export const footerHeadingStyle = style(
  inOverridesLayer({
    fontSize: font.size['2xl'],
    margin: 0,
  }),
);

export const footerTextStyle = style(
  inOverridesLayer({
    fontSize: font.size.base,
  }),
);

export const footerListStyle = style(
  inOverridesLayer({
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }),
);

export const footerProfileStyle = style(
  inOverridesLayer({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
    marginTop: spacing[8],
  }),
);

export const footerProfilePictureStyle = style(
  inOverridesLayer({
    width: spacing[20],
    height: spacing[20],
    borderRadius: '100px',
  }),
);

export const footerSignatureStyle = style(
  inOverridesLayer({
    fill: color.foreground,
    width: spacing[40],
    height: 'auto',
  }),
);
