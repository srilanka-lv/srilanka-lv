import clsx from 'clsx';
import type { FunctionComponent, ReactNode } from 'react';

import {
  sectionFaqsItemAnswerStyle,
  sectionFaqsItemStyle,
  sectionFaqsItemTitleStyle,
} from './styles.css';

export type FaqListItemProps = {
  className?: string;
  iconSlot?: ReactNode;
  linkSlot?: ReactNode;
  questionSlot: ReactNode;
  answerSlot: ReactNode;
};

export const FaqListItem: FunctionComponent<FaqListItemProps> = ({
  className,
  iconSlot,
  linkSlot,
  questionSlot,
  answerSlot,
}) => (
  <article className={clsx(sectionFaqsItemStyle, className)}>
    {iconSlot}
    <span className={sectionFaqsItemTitleStyle}>{questionSlot}</span>
    <span className={sectionFaqsItemAnswerStyle}>{answerSlot}</span>
    {linkSlot}
  </article>
);
