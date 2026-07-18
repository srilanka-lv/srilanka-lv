import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Divider } from '.';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    spacing: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['default', 'subtle'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: { variant: 'solid' },
};

export const Dashed: Story = {
  args: { variant: 'dashed' },
};

export const Dotted: Story = {
  args: { variant: 'dotted' },
};

export const Subtle: Story = {
  args: { color: 'subtle' },
};

export const SpacingSmall: Story = {
  args: { spacing: 'small' },
};

export const SpacingLarge: Story = {
  args: { spacing: 'large' },
};

export const Light: Story = {
  globals: { theme: 'light' },
};

export const Dark: Story = {
  globals: { theme: 'dark' },
};
