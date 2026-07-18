import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconMoneyWallet } from '.';

const meta = {
  title: 'Components/Icons/Money Wallet',
  component: IconMoneyWallet,
} satisfies Meta<typeof IconMoneyWallet>;

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
