import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Breadcrumbs } from '.';

const meta = {
  title: 'Shared/Components/Breadcrumbs',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

const sectionItems = [
  { name: 'Sākums', href: '/' },
  { name: 'Blogi', href: '/blogi' },
];

const postItems = [
  { name: 'Sākums', href: '/' },
  { name: 'Blogi', href: '/blogi' },
  { name: 'Sigirija un tās noslēpums', href: '/blogi/sigirija' },
];

export const SectionLight: Story = {
  args: { items: sectionItems },
  globals: { theme: 'light' },
};

export const SectionDark: Story = {
  args: { items: sectionItems },
  globals: { theme: 'dark' },
};

export const PostLight: Story = {
  args: { items: postItems },
  globals: { theme: 'light' },
};

export const PostDark: Story = {
  args: { items: postItems },
  globals: { theme: 'dark' },
};
