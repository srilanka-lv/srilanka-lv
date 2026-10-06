import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import {
  tripDisclosureReducedMotion,
  tripDisclosureTransition,
} from '@/shared/styles/trip-disclosure-motion';

const { spacing, font, color, focus, border } = vars;

const hairline = `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`;

export const faqItemStyle = style({
  borderBottom: hairline,
});

export const faqQuestionStyle = style({
  margin: 0,
  fontSize: font.size.lg,
  fontWeight: font.weight.medium,
  lineHeight: font.lineHeight.snug,
});

export const faqToggleStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[4],
  width: '100%',
  // A full-width row at least 48px tall: an easy thumb target on a phone.
  minHeight: spacing[12],
  margin: 0,
  paddingBlock: spacing[4],
  paddingInline: 0,
  border: 'none',
  borderRadius: border.radius.small,
  background: 'none',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',

  selectors: {
    '&:focus-visible': {
      outline: `${focus.width} solid ${focus.color}`,
      // Tighter than the site default so the ring stays clear of the answer.
      outlineOffset: '2px',
    },
  },
});

const faqChevronBaseStyle = style({
  flexShrink: 0,
  width: spacing[5],
  height: spacing[5],
  // Same ink as the itinerary's day toggles, so both disclosure lists match.
  color: `color-mix(in oklch, ${color.foreground} 70%, transparent)`,
  transitionProperty: 'transform',
  ...tripDisclosureTransition,

  '@media': tripDisclosureReducedMotion,
});

export const faqChevronStyles = styleVariants({
  closed: [faqChevronBaseStyle, { transform: 'rotate(0deg)' }],
  open: [faqChevronBaseStyle, { transform: 'rotate(180deg)' }],
});

// Height animates through grid rows (0fr to 1fr), as in the itinerary.
const faqAnswerBaseStyle = style({
  display: 'grid',
  transitionProperty: 'grid-template-rows, opacity',
  ...tripDisclosureTransition,

  '@media': tripDisclosureReducedMotion,
});

export const faqAnswerStyles = styleVariants({
  closed: [faqAnswerBaseStyle, { gridTemplateRows: '0fr', opacity: 0 }],
  open: [faqAnswerBaseStyle, { gridTemplateRows: '1fr', opacity: 1 }],
});

export const faqAnswerInnerStyle = style({
  minHeight: 0,
  overflow: 'hidden',
});

globalStyle(`${faqAnswerInnerStyle} > p`, {
  margin: 0,
  paddingBottom: spacing[5],
  maxWidth: '65ch',
  lineHeight: font.lineHeight.relaxed,
  color: `color-mix(in oklch, ${color.foreground} 85%, transparent)`,
});
