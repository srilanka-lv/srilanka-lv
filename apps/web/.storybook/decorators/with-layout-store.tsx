import type { Decorator } from '@storybook/nextjs-vite';

import { LayoutStoreProvider } from '@/features/layout/stores/layout-store';

export const WithLayoutStore: Decorator = (Story) => {
  return (
    <LayoutStoreProvider>
      <Story />
    </LayoutStoreProvider>
  );
};
