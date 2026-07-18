import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border } = vars;

export const imageGalleryGridStyle = style(
  inComponentsLayer({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: spacing[3],
    listStyle: 'none',
    margin: 0,
    padding: 0,
    paddingTop: spacing[6],
    paddingBottom: spacing[2],

    selectors: {
      '&::before, &::after': {
        position: 'absolute',
        display: 'block',
        content: '',
        width: '100%',
        maxWidth: breakpoints.sm,
        height: '2px',
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
      [`screen and (min-width: ${breakpoints.md})`]: {
        marginTop: spacing[12],
        marginBottom: spacing[12],
        paddingTop: spacing[12],
        paddingBottom: spacing[10],
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
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
