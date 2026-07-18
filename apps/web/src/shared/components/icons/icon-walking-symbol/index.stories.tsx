import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconWalkingSymbol } from '.';

const meta = {
  title: 'Components/Icons/Icon Walking Symbol',
  component: IconWalkingSymbol,
} satisfies Meta<typeof IconWalkingSymbol>;

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
