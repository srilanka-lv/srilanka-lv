import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InputField } from './index';

const meta = {
  title: 'Forms/InputField',
  component: InputField,
  args: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "We won't share your email" },
};

export const WithError: Story = {
  args: { errorMessage: 'Please enter a valid email address' },
};

export const WithHelperAndError: Story = {
  args: {
    helperText: "We won't share your email",
    errorMessage: 'Please enter a valid email address',
  },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Cannot edit this' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'readonly@example.com' },
};

export const Loading: Story = {
  args: { loading: true, value: 'checking...' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const Medium: Story = {
  args: { size: 'medium' },
};

export const Large: Story = {
  args: { size: 'large' },
};

export const Password: Story = {
  args: { label: 'Password', type: 'password', placeholder: 'Enter password' },
};

export const DefaultLight: Story = {
  globals: { theme: 'light' },
};

export const DefaultDark: Story = {
  globals: { theme: 'dark' },
};

export const ErrorLight: Story = {
  args: { errorMessage: 'Invalid email' },
  globals: { theme: 'light' },
};

export const ErrorDark: Story = {
  args: { errorMessage: 'Invalid email' },
  globals: { theme: 'dark' },
};
