import type { Decorator } from '@storybook/nextjs-vite';
import { useEffect } from 'react';

import { galindo, lora } from '@/shared/fonts/fonts';

export const withNextFont: Decorator = (Story) => {
  useEffect(() => {
    document.documentElement.classList.add(lora.variable, galindo.variable);
    return () => {
      document.documentElement.classList.remove(lora.variable, galindo.variable);
    };
  }, []);

  return <Story />;
};
