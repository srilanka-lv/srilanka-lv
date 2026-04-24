import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Header } from './index';

const meta = {
  title: 'Features/Layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLight: Story = {
  globals: { theme: 'light' },
};

export const DefaultDark: Story = {
  globals: { theme: 'dark' },
};
