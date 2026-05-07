import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing } = vars;

export const faqListStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gap: spacing[4],
    },
  },
});
