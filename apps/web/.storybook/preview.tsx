import type { Preview } from '@storybook/nextjs-vite';

import { withGlobalStyles } from './decorators/with-global-styles';
import { withNextFont } from './decorators/with-next-font';
import { withVanillaExtractTheme } from './decorators/with-vanilla-extract-theme';

const preview: Preview = {
  parameters: {
    layout: 'centered',
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
  decorators: [withGlobalStyles, withNextFont, withVanillaExtractTheme],
};

export default preview;
