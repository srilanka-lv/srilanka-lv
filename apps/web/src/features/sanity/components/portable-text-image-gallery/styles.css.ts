import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border } = vars;

export const imageGalleryGridStyle = style(
  inComponentsLayer({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: spacing[3],
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginTop: spacing[16],
    marginBottom: spacing[16],
    paddingTop: spacing[16],
    paddingBottom: spacing[12],

    selectors: {
      '&::before, &::after': {
        position: 'absolute',
        display: 'block',
        content: '',
        width: '100%',
        maxWidth: breakpoints.xs,
        height: '4px',
        backgroundColor: `color-mix(in oklch, ${color.accent} 5%, transparent)`,
        borderRadius: border.radius.large,
        top: '100%',
        left: '50%',
        right: '50%',
        transform: 'translateX(-50%)',
      },
      '&::before': {
        top: 'initial',
        bottom: '100%',
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

export const imageGalleryItemStyle = style(
  inComponentsLayer({
    margin: 0,
  }),
);

globalStyle(
  `${imageGalleryItemStyle} img`,
  inComponentsLayer({
    borderRadius: border.radius.small,
  }),
);

globalStyle(
  `${imageGalleryItemStyle}:first-of-type img`,
  inComponentsLayer({
    borderTopLeftRadius: border.radius.large,
    borderBottomLeftRadius: border.radius.large,
  }),
);

globalStyle(
  `${imageGalleryItemStyle}:last-of-type img`,
  inComponentsLayer({
    borderTopRightRadius: border.radius.large,
    borderBottomRightRadius: border.radius.large,
  }),
);

export const imageGalleryFigureStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    margin: 0,
  }),
);

export const imageGalleryImageWrapperStyle = style(
  inComponentsLayer({
    position: 'relative',
    aspectRatio: '9 / 16',
    overflow: 'clip',
  }),
);

export const imageGalleryCaptionStyle = style(
  inComponentsLayer({
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.snug,
    color: color.foreground,
    textAlign: 'center',
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
  }),
);
