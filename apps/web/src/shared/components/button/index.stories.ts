import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { Button } from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { onClick: fn(), children: 'Button' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
  args: { variant: 'primary' },
  globals: { theme: 'light' },
};

export const PrimaryDark: Story = {
  args: { variant: 'primary' },
  globals: { theme: 'dark' },
};

export const SecondaryLight: Story = {
  args: { variant: 'secondary' },
  globals: { theme: 'light' },
};

export const SecondaryDark: Story = {
  args: { variant: 'secondary' },
  globals: { theme: 'dark' },
};

export const OutlineLight: Story = {
  args: { variant: 'outline' },
  globals: { theme: 'light' },
};

export const OutlineDark: Story = {
  args: { variant: 'outline' },
  globals: { theme: 'dark' },
};

export const GhostLight: Story = {
  args: { variant: 'ghost' },
  globals: { theme: 'light' },
};

export const GhostDark: Story = {
  args: { variant: 'ghost' },
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

export const Disabled = {
  args: { disabled: true },
} satisfies StoryObj;

export const AsLink = {
  args: {
    as: 'a',
    href: '/flights-calendar',
    children: 'Go to flights',
  },
} satisfies StoryObj;
