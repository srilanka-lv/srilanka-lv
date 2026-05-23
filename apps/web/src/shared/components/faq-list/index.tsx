import type { BlockContent } from '@packages/sanity/sanity.types';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

import { PortableText } from '@/features/sanity/components/portable-text';
import { Heading } from '@/shared/components/heading';

import { FaqListItem } from '../faq-list-item';
import { faqListItemStyle, faqListStyle, faqListTitleStyle } from './styles.css';

type FaqListProps = {
  className?: string;
  items: {
    id: string;
    questionSlot: string;
    answerSlot: BlockContent;
  }[];
} & ComponentProps<'div'>;

export function FaqList({ className, items, ...props }: FaqListProps) {
  if (!items.length) {
    return null;
  }

  return (
    <>
      <Heading as="h6" variant="h2" className={faqListTitleStyle}>
        Bieži uzdotie jautājumi
      </Heading>
      <div {...props} className={clsx(faqListStyle, className)}>
        {items.map(({ id, questionSlot, answerSlot }) => (
          <FaqListItem
            key={id}
            className={faqListItemStyle}
            questionSlot={questionSlot}
            answerSlot={<PortableText value={answerSlot} />}
          />
        ))}
      </div>
    </>
  );
}
