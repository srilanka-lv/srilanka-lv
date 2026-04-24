import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Heading } from './index';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  args: { children: 'The quick brown fox' },
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'unstyled'],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: { as: 'h1', variant: 'h1' },
};

export const H2: Story = {
  args: { as: 'h2', variant: 'h2' },
};

export const H3: Story = {
  args: { as: 'h3', variant: 'h3' },
};

export const H4: Story = {
  args: { as: 'h4', variant: 'h4' },
};

export const H5: Story = {
  args: { as: 'h5', variant: 'h5' },
};

export const H6: Story = {
  args: { as: 'h6', variant: 'h6' },
};

export const Unstyled: Story = {
  args: { as: 'h2', variant: 'unstyled' },
};

export const SpanAsH1: Story = {
  args: { as: 'span', variant: 'h1' },
};

export const H1Light: Story = {
  args: { as: 'h1', variant: 'h1' },
  globals: { theme: 'light' },
};

export const H1Dark: Story = {
  args: { as: 'h1', variant: 'h1' },
  globals: { theme: 'dark' },
};

export const FreckeFace: Story = {
  args: { as: 'h1', variant: 'h1', style: { fontFamily: 'var(--font-galindo)' } },
};
