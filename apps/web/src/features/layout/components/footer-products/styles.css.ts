import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, color, font, border, shadow, transition, focus } = vars;

export const footerProductsListStyle = style(
  inComponentsLayer({
    listStyle: 'none',
    padding: 0,
    margin: `${spacing[6]} 0 0`,
    display: 'grid',
    gap: spacing[4],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: spacing[6],
      },
    },
  }),
);

export const footerProductsCardStyle = style(
  inComponentsLayer({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: `${spacing[24]} 1fr`,
    height: '100%',
    overflow: 'hidden',
    borderRadius: border.radius.large,
    border: `1px solid color-mix(in oklch, ${color.primary} 12%, transparent)`,
    backgroundColor: color.background,
    boxShadow: shadow.small,
    transitionProperty: 'transform, box-shadow, border-color',
    transitionDuration: transition.duration.faster,
    transitionTimingFunction: transition.easing.easeInOut,

    selectors: {
      '&:link, &:visited, &:active': {
        color: 'inherit',
      },
      '&::after': {
        display: 'none',
      },
      '&:hover': {
        color: 'inherit',
        transform: 'translateY(-2px)',
        boxShadow: shadow.medium,
        borderColor: `color-mix(in oklch, ${color.accent} 35%, transparent)`,
      },
      '&:focus-visible': {
        color: 'inherit',
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: focus.offset,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        backgroundColor: `transparent`,
        display: 'flex',
        flexDirection: 'column',
      },
    },
  }),
);

export const footerProductsImageWrapStyle = style(
  inComponentsLayer({
    position: 'relative',
    display: 'block',
    overflow: 'hidden',
    minHeight: spacing[24],
    backgroundColor: color.background,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        backgroundColor: `color-mix(in oklch, ${color.accent} 8%, transparent)`,
        aspectRatio: '5 / 3',
        minHeight: 'unset',
      },
    },
  }),
);

export const footerProductsImageStyle = style(
  inComponentsLayer({
    objectFit: 'contain',
    objectPosition: 'right bottom',
    transitionProperty: 'transform',
    transitionDuration: transition.duration.normal,
    transitionTimingFunction: transition.easing.easeInOut,

    selectors: {
      [`${footerProductsCardStyle}:hover &`]: {
        transform: 'scale(1.04)',
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        marginTop: spacing[8],
      },
    },
  }),
);

export const footerProductsBodyStyle = style(
  inComponentsLayer({
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing[2],
    padding: spacing[4],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        flexGrow: 1,
        padding: spacing[5],
      },
    },
  }),
);

export const footerProductsChipStyle = style(
  inComponentsLayer({
    fontSize: font.size.xs,
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
    color: `color-mix(in oklch, ${color.accent} 75%, ${color.foreground})`,
    border: `1px solid color-mix(in oklch, ${color.accent} 45%, transparent)`,
    borderRadius: border.radius.large,
    padding: `${spacing[1]} ${spacing[2]}`,
  }),
);

export const footerProductsTitleStyle = style(
  inComponentsLayer({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    fontSize: font.size.base,
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.snug,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size.lg,
      },
    },
  }),
);

export const footerProductsCtaStyle = style(
  inComponentsLayer({
    marginTop: 'auto',
    paddingTop: spacing[2],
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    color: `color-mix(in oklch, ${color.accent} 75%, ${color.foreground})`,
  }),
);

export const footerProductsWhatsAppCtaStyle = style(
  inComponentsLayer({
    display: 'block',
    marginTop: 'auto',
    paddingTop: spacing[2],
    width: '100%',
    maxWidth: spacing[40],
  }),
);

globalStyle(`${footerProductsWhatsAppCtaStyle} svg`, {
  display: 'block',
  width: '100%',
  height: 'auto',
});
