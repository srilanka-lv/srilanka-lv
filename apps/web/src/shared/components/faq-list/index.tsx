import clsx from 'clsx';
import type { ComponentProps } from 'react';

import { FaqListItem, type FaqListItemProps } from '../faq-list-item';
import { faqListStyle } from './styles.css';

type FaqListProps = {
  className?: string;
  questionClassName?: string;
  questionTextClassName?: string;
  answerClassName?: string;
  items: FaqListItemProps[];
} & ComponentProps<'div'>;

export function FaqList({
  className,
  questionClassName,
  questionTextClassName,
  answerClassName,
  items,
  ...props
}: FaqListProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div {...props} className={clsx(faqListStyle, className)}>
      {items.map((props) => (
        <FaqListItem key={props.id} {...props} />
      ))}
    </div>
  );
}
