import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconMovingWalkwayLuggage } from '.';

const meta = {
  title: 'Components/Icons/Moving Walkway Luggage',
  component: IconMovingWalkwayLuggage,
} satisfies Meta<typeof IconMovingWalkwayLuggage>;

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
