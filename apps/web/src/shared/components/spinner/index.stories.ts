import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Spinner } from './index';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: 'small' },
};

export const Medium: Story = {
  args: { size: 'medium' },
};

export const Large: Story = {
  args: { size: 'large' },
};

export const SmallLight: Story = {
  args: { size: 'small' },
  globals: { theme: 'light' },
};

export const SmallDark: Story = {
  args: { size: 'small' },
  globals: { theme: 'dark' },
};
