import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconHomeChimney } from '.';

const meta = {
  title: 'Components/Icons/Icon Home Chimney',
  component: IconHomeChimney,
} satisfies Meta<typeof IconHomeChimney>;

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
