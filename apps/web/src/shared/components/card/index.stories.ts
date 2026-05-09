import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Card } from '.';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { children: 'Card content', style: { padding: '2rem' } },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    radius: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: { variant: 'filled' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const ShadowSmall: Story = {
  args: { shadow: 'small' },
};

export const ShadowMedium: Story = {
  args: { shadow: 'medium' },
};

export const ShadowLarge: Story = {
  args: { shadow: 'large' },
};

export const RadiusSmall: Story = {
  args: { radius: 'small' },
};

export const RadiusMedium: Story = {
  args: { radius: 'medium' },
};

export const RadiusLarge: Story = {
  args: { radius: 'large' },
};

export const Light: Story = {
  globals: { theme: 'light' },
};

export const Dark: Story = {
  globals: { theme: 'dark' },
};
