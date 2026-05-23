import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border } = vars;

export const inlineImageFigureStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    margin: 0,

    selectors: {
      '&::before, &::after': {
        display: 'block',
        content: '',
        width: '100%',
        maxWidth: breakpoints.xs,
        marginTop: spacing[12],
        marginBottom: spacing[8],
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '4px',
        backgroundColor: `color-mix(in oklch, ${color.accent} 5%, transparent)`,
        borderRadius: border.radius.large,
      },
      '&::before': {
        marginTop: spacing[12],
        marginBottom: spacing[20],
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.xl})`]: {
        position: 'relative',
        width: '125%',
        left: '-12.5%',
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        width: '150%',
        left: '-25%',
      },
    },
  }),
);

globalStyle(
  `${inlineImageFigureStyle} img`,
  inComponentsLayer({
    borderRadius: border.radius.large,
    overflow: 'hidden',
  }),
);

export const inlineImageCaptionStyle = style(
  inComponentsLayer({
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.snug,
    color: color.foreground,
    textAlign: 'center',
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
  }),
);
