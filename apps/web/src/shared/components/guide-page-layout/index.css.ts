import { globalStyle, style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { breakpoint, color, font, spacing } = vars;

export const guideArticleStyle = style({
  maxWidth: breakpoint.md,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: spacing[24],
});

/**
 * The guide body is hand-written JSX, not Portable Text, so the article
 * typography that `BlogText` applies per block is applied here to the plain
 * elements instead. Values mirror `blog-text/styles.css.ts` so the guide reads
 * like every other long page on the site.
 */
export const guideBodyStyle = style({});

globalStyle(
  `${guideBodyStyle} p`,
  inOverridesLayer({
    marginBlock: spacing[6],
    fontSize: font.size.lg,
    lineHeight: font.lineHeight.normal,
    textWrap: 'balance',

    '@media': {
      [`screen and (min-width: ${breakpoints.lg})`]: {
        fontSize: font.size.xl,
      },
    },
  }),
);

globalStyle(
  `${guideBodyStyle} h2`,
  inOverridesLayer({
    marginBlock: spacing[4],
    marginTop: spacing[12],
    fontSize: font.size['4xl'],
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
    textWrap: 'balance',
  }),
);

globalStyle(
  `${guideBodyStyle} h3`,
  inOverridesLayer({
    marginBlock: spacing[4],
    marginTop: spacing[8],
    fontSize: font.size['2xl'],
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
    textWrap: 'balance',
  }),
);

globalStyle(
  `${guideBodyStyle} ul, ${guideBodyStyle} ol`,
  inOverridesLayer({
    marginBlock: spacing[4],
    paddingLeft: spacing[4],
    fontSize: font.size.lg,
    lineHeight: font.lineHeight.relaxed,

    '@media': {
      [`screen and (min-width: ${breakpoints.lg})`]: {
        fontSize: font.size.xl,
      },
    },
  }),
);

globalStyle(
  `${guideBodyStyle} li`,
  inOverridesLayer({
    marginBlock: spacing[2],
    textWrap: 'balance',
  }),
);

globalStyle(
  `${guideBodyStyle} blockquote`,
  inOverridesLayer({
    marginBlock: spacing[4],
    marginTop: spacing[12],
    paddingLeft: spacing[4],
    borderLeft: `4px solid ${color.primaryForeground}`,
    fontStyle: 'italic',
  }),
);
