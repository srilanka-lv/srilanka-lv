import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconContentWrite } from '.';

const meta = {
  title: 'Components/Icons/Icon Content Write',
  component: IconContentWrite,
} satisfies Meta<typeof IconContentWrite>;

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
