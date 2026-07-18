import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Text } from '.';

const meta = {
  title: 'Components/Text',
  component: Text,
  args: { children: 'The quick brown fox jumps over the lazy dog' },
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'strong', 'em', 'small', 'label'],
    },
    fontSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    fontStyle: {
      control: 'select',
      options: ['normal', 'italic'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { fontSize: 'small' },
};

export const Large: Story = {
  args: { fontSize: 'large' },
};

export const Bold: Story = {
  args: { fontWeight: 'bold' },
};

export const Italic: Story = {
  args: { fontStyle: 'italic' },
};

export const BoldItalic: Story = {
  args: { fontWeight: 'bold', fontStyle: 'italic' },
};

export const AsSpan: Story = {
  args: { as: 'span' },
};

export const AsLabel: Story = {
  args: { as: 'label', fontSize: 'small', fontWeight: 'medium' },
};

export const Light: Story = {
  globals: { theme: 'light' },
};

export const Dark: Story = {
  globals: { theme: 'dark' },
};
