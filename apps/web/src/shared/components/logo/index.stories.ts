import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Logo } from '.';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLight: Story = {
  globals: { theme: 'light' },
};

export const DefaultDark: Story = {
  globals: { theme: 'dark' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const Medium: Story = {
  args: { size: 'medium' },
};

export const Large: Story = {
  args: { size: 'large' },
};
