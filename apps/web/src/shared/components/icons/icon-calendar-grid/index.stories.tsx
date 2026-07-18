import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconCalendarGrid } from '.';

const meta = {
  title: 'Components/Icons/Calendar Grid',
  component: IconCalendarGrid,
} satisfies Meta<typeof IconCalendarGrid>;

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
