import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, transition } = vars;

export const faqListItemStyle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const faqListQuestionStyle = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing[4],
  outline: 'none',
  border: 'none',
  background: 'transparent',
  textAlign: 'left',
  fontSize: font.size.lg,
  fontWeight: font.weight.semibold,
  margin: 0,
  padding: 0,
  cursor: 'pointer',
});

globalStyle(`${faqListQuestionStyle} svg`, {
  transitionTimingFunction: transition.easing.easeInOut,
  transitionDuration: transition.duration.faster,
  transitionProperty: 'transform',
});

globalStyle(`${faqListQuestionStyle}:hover svg, ${faqListQuestionStyle}:focus-visible svg`, {
  transform: `rotate(-15deg) scale(1.2)`,
});

export const faqListQuestionTextStyle = style({
  display: 'block',
  fontSize: font.size.xl,
  fontWeight: font.weight.semibold,
});

const faqListAnswerStyle = style({
  display: 'grid',
  fontSize: font.size.base,
  paddingTop: spacing[1],
  paddingBottom: spacing[1],
  paddingLeft: spacing[12],
  transitionTimingFunction: transition.easing.easeInOut,
  transitionDuration: transition.duration.fast,
  transitionProperty: 'grid-template-rows, opacity',
});

export const faqListAnswerStyles = styleVariants({
  closed: [
    faqListAnswerStyle,
    {
      gridTemplateRows: '0fr',
      opacity: 0,
    },
  ],
  open: [
    faqListAnswerStyle,
    {
      gridTemplateRows: '1fr',
      opacity: 1,
    },
  ],
});

export const faqListAnswerContainerStyle = style({
  display: 'block',
  overflow: 'clip',
  minHeight: 0,
});

globalStyle(`${faqListAnswerContainerStyle} p:first-of-type`, {
  marginTop: 0,
});

globalStyle(`${faqListAnswerContainerStyle} p:last-of-type`, {
  marginBottom: 0,
});
