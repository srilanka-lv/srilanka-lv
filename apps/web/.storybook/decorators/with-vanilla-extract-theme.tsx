import type { Decorator } from '@storybook/nextjs-vite';
import { useLayoutEffect } from 'react';

import { darkTheme } from '@/shared/styles/themes/theme.dark.css';
import { lightTheme } from '@/shared/styles/themes/theme.light.css';

function getThemeClass(selected: string): string {
  if (selected === 'dark') {
    return darkTheme;
  }

  if (selected === 'light') {
    return lightTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;
}

export const withVanillaExtractTheme: Decorator = (Story, context) => {
  const selected = context.globals.theme ?? 'system';

  useLayoutEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      root.classList.remove(lightTheme, darkTheme);
      root.classList.add(getThemeClass(selected));
    };

    applyTheme();

    if (selected === 'system') {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => {
        applyTheme();
      };

      darkModeQuery.addEventListener('change', handler);

      return () => {
        darkModeQuery.removeEventListener('change', handler);
        root.classList.remove(lightTheme, darkTheme);
      };
    }

    return () => {
      root.classList.remove(lightTheme, darkTheme);
    };
  }, [selected]);

  return <Story />;
};
