'use client';

import { ChevronDown } from 'lucide-react';
import { type FunctionComponent, type ReactNode, useId, useRef, useState } from 'react';

import { emitTripEngagement } from '@/shared/utils/trip-engagement';

import {
  faqAnswerInnerStyle,
  faqAnswerStyles,
  faqChevronStyles,
  faqItemStyle,
  faqQuestionStyle,
  faqToggleStyle,
} from './styles.css';

type TripPageFaqItemProps = {
  /** Stable slug reported when the question is opened. */
  id: string;
  question: string;
  answer: ReactNode;
};

/**
 * One FAQ question, with the same disclosure as the itinerary days: a button
 * in the heading, the answer sliding open on the shared motion. The answer is
 * always in the HTML (search and the FAQPage schema read it) and inert while
 * closed. Opening it tells the engagement tracking with a bubbling event.
 */
export const TripPageFaqItem: FunctionComponent<TripPageFaqItemProps> = ({
  id,
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const answerId = useId();
  const state = isOpen ? 'open' : 'closed';

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      if (itemRef.current) {
        emitTripEngagement(itemRef.current, { type: 'faq-open', questionId: id });
      }
    }
  };

  return (
    <div ref={itemRef} className={faqItemStyle}>
      <h3 className={faqQuestionStyle}>
        <button
          type="button"
          className={faqToggleStyle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={toggle}
        >
          <span>{question}</span>
          <ChevronDown className={faqChevronStyles[state]} aria-hidden="true" strokeWidth={1.75} />
        </button>
      </h3>
      <div id={answerId} className={faqAnswerStyles[state]} inert={!isOpen}>
        <div className={faqAnswerInnerStyle}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};
