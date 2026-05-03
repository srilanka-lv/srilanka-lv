import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const faqListItemStyle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const faqListQuestionStyle = style({
  outline: 'none',
  border: 'none',
  background: 'transparent',
  textAlign: 'left',
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  margin: 0,
  padding: 0,
});

export const faqListQuestionTextStyle = style({
  display: 'block',
  paddingTop: vars.spacing[1],
  paddingBottom: vars.spacing[1],
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
});

const faqListAnswerStyle = style({
  display: 'grid',
  fontSize: vars.font.size.base,
  transitionTimingFunction: vars.transition.easing.easeInOut,
  transitionDuration: vars.transition.duration.fast,
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
