import type { Decorator } from '@storybook/nextjs-vite';

import { LayoutStoreProvider } from '@/features/layout/stores/layout-store';

export const withLayoutStore: Decorator = (Story) => {
  return (
    <LayoutStoreProvider>
      <Story />
    </LayoutStoreProvider>
  );
};
