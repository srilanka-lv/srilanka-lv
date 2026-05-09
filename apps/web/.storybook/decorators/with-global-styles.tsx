import 'modern-normalize/modern-normalize.css';

import '@/shared/styles/global.css';

import type { Decorator } from '@storybook/nextjs-vite';

export const WithGlobalStyles: Decorator = (Story) => {
  return <Story />;
};
