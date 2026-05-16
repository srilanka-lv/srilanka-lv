import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconTakingPicturesMan } from '.';

const meta = {
  title: 'Components/Icons/Icon Taking Pictures Man',
  component: IconTakingPicturesMan,
} satisfies Meta<typeof IconTakingPicturesMan>;

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
