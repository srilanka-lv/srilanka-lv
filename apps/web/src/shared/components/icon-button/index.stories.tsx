import { SiInstagram, SiSnapchat } from '@icons-pack/react-simple-icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Mail } from 'lucide-react';
import { fn } from 'storybook/test';

import { IconButton } from '.';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: { onClick: fn(), 'aria-label': 'Icon button', iconSlot: <Mail /> },
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
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', iconSlot: <Mail />, 'aria-label': 'Send email' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', iconSlot: <Mail />, 'aria-label': 'Send email' },
};

export const Outline: Story = {
  args: { variant: 'outline', iconSlot: <Mail />, 'aria-label': 'Send email' },
};

export const Small: Story = {
  args: { size: 'small', iconSlot: <Mail />, 'aria-label': 'Send email' },
};

export const Large: Story = {
  args: { size: 'large', iconSlot: <Mail />, 'aria-label': 'Send email' },
};

export const Instagram: Story = {
  args: { variant: 'ghost', iconSlot: <SiInstagram />, 'aria-label': 'Instagram' },
};

export const Snapchat: Story = {
  args: { variant: 'ghost', iconSlot: <SiSnapchat />, 'aria-label': 'Snapchat' },
};

export const Light: Story = {
  args: { iconSlot: <Mail />, 'aria-label': 'Send email' },
  globals: { theme: 'light' },
};

export const Dark: Story = {
  args: { iconSlot: <Mail />, 'aria-label': 'Send email' },
  globals: { theme: 'dark' },
};
