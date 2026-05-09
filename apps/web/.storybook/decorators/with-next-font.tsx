import type { Decorator } from '@storybook/nextjs-vite';
import { useEffect } from 'react';

import { comme } from '@/shared/fonts/fonts';

export const WithNextFont: Decorator = (Story) => {
  useEffect(() => {
    document.documentElement.classList.add(comme.variable);
    return () => {
      document.documentElement.classList.remove(comme.variable);
    };
  }, []);

  return <Story />;
};
