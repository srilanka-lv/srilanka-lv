import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconNavigationPageRight } from '.';

const meta = {
  title: 'Components/Icons/Navigation Page Right',
  component: IconNavigationPageRight,
} satisfies Meta<typeof IconNavigationPageRight>;

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
