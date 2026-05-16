import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconCalendarDate } from '.';

const meta = {
  title: 'Components/Icons/Calendar Date',
  component: IconCalendarDate,
} satisfies Meta<typeof IconCalendarDate>;

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
