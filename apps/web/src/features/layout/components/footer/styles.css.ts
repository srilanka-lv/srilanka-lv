import { style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, color, zIndex, font } = vars;

export const footerStyle = style(
  inOverridesLayer({
    position: 'relative',
    display: 'grid',
    gap: spacing[12],
    justifyContent: 'center',
    padding: `${spacing[20]} 0`,
    textWrap: 'balance',
    color: color.primary,
    backgroundColor: 'transparent',

    selectors: {
      '&::before': {
        alignSelf: 'center',
        justifySelf: 'center',
        position: 'absolute',
        content: '',
        backgroundColor: `color-mix(in oklch, ${color.accent} 5%, transparent)`,
        height: '100%',
        width: '100svw',
        zIndex: zIndex['-10'],
        borderTop: `1px solid ${color.primaryForeground}`,
        borderBottom: `1px solid ${color.primaryForeground}`,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.xs})`]: {
        padding: `${spacing[32]} ${spacing[8]}`,
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: spacing[12],
        padding: `${spacing[48]} ${spacing[0]}`,
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        position: 'relative',
        width: '100svw',
        left: '50%',
        right: '50%',
        marginLeft: '-50svw',
        marginRight: '-50svw',
        paddingLeft: spacing[40],
        paddingRight: spacing[40],
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
    fontSize: font.size.lg,
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
