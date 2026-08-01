import { keyframes, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, font, spacing, zIndex } = vars;

// One shared column for every paper element of the letter, sized to 65ch at
// the paragraph size; a font-size-relative 65ch would give each type size its
// own width and break the left edge.
const storyColumnWidth = '44rem';

const turnLineRise = keyframes({
  from: { opacity: 0, translate: '0 1.25rem' },
  to: { opacity: 1, translate: '0 0' },
});

export const storySectionStyle = style(
  inComponentsLayer({
    marginTop: spacing[16],
  }),
);

export const storyParagraphStyle = style(
  inComponentsLayer({
    width: '100%',
    maxWidth: storyColumnWidth,
    margin: `0 auto ${spacing[6]}`,
    fontSize: font.size.lg,
    lineHeight: font.lineHeight.relaxed,
  }),
);

export const storyTurnLineStyle = style(
  inComponentsLayer({
    width: '100%',
    maxWidth: storyColumnWidth,
    margin: `${spacing[16]} auto ${spacing[8]}`,
    fontSize: font.size['2xl'],
    fontWeight: font.weight.light,
    lineHeight: font.lineHeight.snug,
    textWrap: 'balance',

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['3xl'],
      },
    },
  }),
);

export const storyPhotoBreakStyle = style(
  inComponentsLayer({
    position: 'relative',
    width: '100svw',
    left: '50%',
    right: '50%',
    marginLeft: '-50svw',
    marginRight: '-50svw',
    marginTop: spacing[16],
    marginBottom: spacing[16],
    height: '65svh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',

    selectors: {
      // Same theme-independent black scrim as the incumbent photo sections
      // (section-hero); keeps the whitesmoke line legible in both themes.
      '&::after': {
        content: '',
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.625) 10%, rgba(255, 255, 255, 0) 75%)',
        zIndex: 1,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        height: '75svh',
      },
    },
  }),
);

export const storyPhotoBreakImageStyle = style(
  inComponentsLayer({
    objectFit: 'cover',
    objectPosition: 'center center',
  }),
);

export const storyPhotoBreakLineStyle = style(
  inComponentsLayer({
    position: 'relative',
    zIndex: zIndex['10'],
    color: 'whitesmoke',
    mixBlendMode: 'luminosity',
    fontSize: font.size['3xl'],
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight.tight,
    textAlign: 'left',
    textWrap: 'balance',
    width: '100%',
    maxWidth: breakpoints.md,
    margin: '0 auto',
    padding: `0 ${spacing[6]} ${spacing[12]}`,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['5xl'],
        padding: `0 ${spacing[6]} ${spacing[16]}`,
      },
    },

    // The page's one authored motion moment: each turn line settles into place
    // as its photo scrolls into view. Scroll-driven CSS only, so browsers
    // without animation-timeline (and reduced-motion readers) simply see the
    // line already in place.
    '@supports': {
      '(animation-timeline: view())': {
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            animationName: turnLineRise,
            animationTimeline: 'view()',
            animationRangeStart: 'entry 30%',
            animationRangeEnd: 'entry 90%',
            animationFillMode: 'both',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            animationDuration: 'auto',
          },
        },
      },
    },
  }),
);

export const storyClosingStyle = style(
  inComponentsLayer({
    width: '100%',
    maxWidth: storyColumnWidth,
    margin: `${spacing[16]} auto 0`,
    fontSize: font.size.xl,
    fontWeight: font.weight.light,
    lineHeight: font.lineHeight.snug,
    textWrap: 'balance',

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['2xl'],
      },
    },
  }),
);

export const storySignatureWrapperStyle = style(
  inComponentsLayer({
    width: '100%',
    maxWidth: storyColumnWidth,
    margin: `${spacing[10]} auto 0`,
  }),
);

export const storySignatureStyle = style(
  inComponentsLayer({
    display: 'block',
    fill: color.foreground,
    width: spacing[48],
    height: 'auto',
  }),
);
