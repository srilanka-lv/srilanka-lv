import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconHelpQuestionCircle } from '.';

const meta = {
  title: 'Components/Icons/Help Question Circle',
  component: IconHelpQuestionCircle,
} satisfies Meta<typeof IconHelpQuestionCircle>;

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
