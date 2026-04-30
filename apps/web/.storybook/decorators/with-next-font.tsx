import type { Decorator } from '@storybook/nextjs-vite';
import { useEffect } from 'react';

import { burchelli, tikTokSans } from '@/shared/fonts/fonts';

export const withNextFont: Decorator = (Story) => {
  useEffect(() => {
    document.documentElement.classList.add(tikTokSans.variable, burchelli.variable);
    return () => {
      document.documentElement.classList.remove(tikTokSans.variable, burchelli.variable);
    };
  }, []);

  return <Story />;
};
