import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Layout } from '.';

const meta = {
  title: 'Features/Layout/Layout',
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLight: Story = {
  globals: { theme: 'light' },
};

export const DefaultDark: Story = {
  globals: { theme: 'dark' },
};
