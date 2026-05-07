'use client';

import type { BlockContent } from '@packages/sanity/sanity.types';
import clsx from 'clsx';
import { type FunctionComponent, useCallback, useState } from 'react';

import { PortableText } from '@/features/sanity/components/portable-text';

import { IconHelpQuestionCircle } from '../icons/icon-help-question-circle';
import { Text } from '../text';
import {
  faqListAnswerContainerStyle,
  faqListAnswerStyles,
  faqListItemStyle,
  faqListQuestionStyle,
  faqListQuestionTextStyle,
} from './styles.css';

export type FaqListItemProps = {
  questionClassName?: string;
  questionTextClassName?: string;
  answerClassName?: string;
  id: string;
  question: string;
  answer: BlockContent;
};

export const FaqListItem: FunctionComponent<FaqListItemProps> = ({
  id,
  question,
  answer,
  questionClassName,
  questionTextClassName,
  answerClassName,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => setExpanded((expanded) => !expanded), []);

  return (
    <article key={id} className={faqListItemStyle}>
      <button
        type="button"
        key={id}
        className={clsx(faqListQuestionStyle, questionClassName)}
        onClick={handleToggle}
      >
        <IconHelpQuestionCircle size="medium" />
        <Text as="span" className={clsx(faqListQuestionTextStyle, questionTextClassName)}>
          {question}
        </Text>
      </button>
      <span className={clsx(faqListAnswerStyles[expanded ? 'open' : 'closed'], answerClassName)}>
        <span className={faqListAnswerContainerStyle}>
          <PortableText value={answer} />
        </span>
      </span>
    </article>
  );
};
