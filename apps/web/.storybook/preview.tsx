import type { Preview } from '@storybook/nextjs-vite';

import { WithBreakpointRepository } from './decorators/with-breakpoint-repository';
import { WithGlobalStyles } from './decorators/with-global-styles';
import { WithLayoutStore } from './decorators/with-layout-store';
import { WithNextFont } from './decorators/with-next-font';
import { WithVanillaExtractTheme } from './decorators/with-vanilla-extract-theme';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    viewport: {
      options: {
        xxs: { name: 'xxs (320px)', styles: { width: '320px', height: '100%' } },
        xs: { name: 'xs (480px)', styles: { width: '480px', height: '100%' } },
        sm: { name: 'sm (640px)', styles: { width: '640px', height: '100%' } },
        md: { name: 'md (768px)', styles: { width: '768px', height: '100%' } },
        lg: { name: 'lg (1024px)', styles: { width: '1024px', height: '100%' } },
        xl: { name: 'xl (1280px)', styles: { width: '1280px', height: '100%' } },
        xxl: { name: 'xxl (1536px)', styles: { width: '1536px', height: '100%' } },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'sun',
        items: [
          { value: 'system', title: 'System', icon: 'browser' },
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'system',
  },
  // Notice the order of the decorators. We sort them from the most specific to the least specific.
  decorators: [
    WithLayoutStore,
    WithBreakpointRepository,
    WithVanillaExtractTheme,
    WithGlobalStyles,
    WithNextFont,
  ],
};

export default preview;
