import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SectionFaqs } from '.';

const meta = {
  title: 'Components/Section FAQs',
  component: SectionFaqs,
} satisfies Meta<typeof SectionFaqs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
