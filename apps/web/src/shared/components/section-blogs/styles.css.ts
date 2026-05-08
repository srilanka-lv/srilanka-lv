import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing } = vars;

export const sectionBlogsTitleStyle = style({
  marginBottom: 0,
});

export const sectionBlogsStyle = style({
  position: 'relative',
  display: 'grid',
  width: '100svw',
  gridTemplateColumns: 'repeat(auto-fit, minmax(10%, 1fr))',
  gap: spacing[8],
  padding: spacing[8],
  left: '50%',
  right: '50%',
  marginLeft: '-50svw',
  marginRight: '-50svw',
});
