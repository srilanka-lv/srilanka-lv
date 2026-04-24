import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Navigation } from './index';

const meta = {
  title: 'Features/Layout/Navigation',
  component: Navigation,
} satisfies Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLight: Story = {
  globals: { theme: 'light' },
};

export const DefaultDark: Story = {
  globals: { theme: 'dark' },
};
