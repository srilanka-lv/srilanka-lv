import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color, focus, border, transition } = vars;

const hairline = `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`;

export const faqListStyle = style({
  borderTop: hairline,
});

export const faqItemStyle = style({
  borderBottom: hairline,
});

export const faqSummaryStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[4],
  // A full-width row at least 48px tall: an easy thumb target on a phone.
  minHeight: spacing[12],
  paddingBlock: spacing[4],
  cursor: 'pointer',
  listStyle: 'none',
  borderRadius: border.radius.small,

  selectors: {
    '&::-webkit-details-marker': {
      display: 'none',
    },
    '&:focus-visible': {
      outline: `${focus.width} solid ${focus.color}`,
      outlineOffset: focus.offset,
    },
  },
});

export const faqQuestionStyle = style({
  margin: 0,
  fontSize: font.size.lg,
  fontWeight: font.weight.medium,
  lineHeight: font.lineHeight.snug,
});

export const faqChevronStyle = style({
  flexShrink: 0,
  width: spacing[5],
  height: spacing[5],
  // Same ink as the itinerary's day toggles, so both disclosure lists match.
  color: `color-mix(in oklch, ${color.foreground} 70%, transparent)`,
  transitionProperty: 'transform',
  transitionDuration: transition.duration.fast,
  transitionTimingFunction: transition.easing.easeInOut,

  selectors: {
    [`${faqItemStyle}[open] &`]: {
      transform: 'rotate(180deg)',
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transitionDuration: '0s',
    },
  },
});

export const faqAnswerStyle = style({
  margin: 0,
  paddingBottom: spacing[5],
  maxWidth: '65ch',
  lineHeight: font.lineHeight.relaxed,
  color: `color-mix(in oklch, ${color.foreground} 85%, transparent)`,
});
