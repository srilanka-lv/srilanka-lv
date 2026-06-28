import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, border } = vars;

export const tripPageTitleStyle = style({
  fontSize: font.size['6xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: 0,
  marginBottom: spacing[4],
});

export const tripPageHeroSectionStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: '1fr',
  gap: spacing[12],
  marginTop: spacing[4],
  marginBottom: spacing[24],
});

globalStyle(`${tripPageHeroSectionStyle} *`, {
  // border: 'solid 1px red',
});

export const tripPageImageGalleryStyle = style({
  gridColumn: '1 / 3',
  display: 'grid',
  gridTemplateRows: 'repeat(2, min-content)',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing[4],
});

export const tripPageImageGalleryMainImageStyle = style({
  position: 'relative',
  gridRow: '1 / 2',
  gridColumn: '1 / 2',
  gridArea: '1 / 1 / 2 / 4',
  minHeight: '500px',
  overflow: 'hidden',
  borderTopLeftRadius: border.radius.large,
  borderTopRightRadius: border.radius.large,
});

export const tripPageImageGalleryThumbnailsContainerStyle = style({
  gridRow: '2 / 3',
  gridColumn: '1 / 4',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, min-content)',
  gap: spacing[4],
});

export const tripPageImageGalleryThumbnailImageStyle = style({
  position: 'relative',
  overflow: 'hidden',
  minHeight: '100px',
  aspectRatio: '2 / 1.25',
  selectors: {
    '&:nth-of-type(4)': {
      borderBottomLeftRadius: border.radius.large,
    },
    '&:nth-of-type(6)': {
      borderBottomRightRadius: border.radius.large,
    },
  },
});
