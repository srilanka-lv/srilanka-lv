import type { Decorator } from '@storybook/nextjs-vite';
import { useEffect } from 'react';

import { burchelli, lora } from '@/shared/fonts/fonts';

export const withNextFont: Decorator = (Story) => {
  useEffect(() => {
    document.documentElement.classList.add(lora.variable, burchelli.variable);
    return () => {
      document.documentElement.classList.remove(lora.variable, burchelli.variable);
    };
  }, []);

  return <Story />;
};
