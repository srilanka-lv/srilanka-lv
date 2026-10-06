import type { ReactNode } from 'react';

import { TodoGrietaMark } from '@/shared/components/todo-grieta-mark';
import { TODO_GRIETA } from '@/shared/constants/todo-grieta';

import { TripPageFaqItem } from '../trip-page-faq-item';
import { TripPageSection } from '../trip-page-section';
import { tripPageFaqs } from './index.data';
import { faqListStyle } from './styles.css';

export const TRIP_PAGE_FAQ_SECTION_ID = 'jautajumi';

// Answers are plain strings (they double as FAQPage schema), so an unfilled
// placeholder inside one is found by its marker and shown as loudly as the
// placeholders elsewhere on the page.
const placeholderPattern = new RegExp(`(\\[${TODO_GRIETA}: [^\\]]*\\])`);

const renderAnswer = (answer: string): ReactNode =>
  answer.split(placeholderPattern).map((part, index) =>
    placeholderPattern.test(part) ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: split parts of one static string.
      <TodoGrietaMark key={index}>{part}</TodoGrietaMark>
    ) : (
      part
    ),
  );

/**
 * The questions as disclosures that open like the itinerary days: closed by
 * default so the list scans as questions, every answer still in the HTML for
 * search and for the FAQPage schema.
 */
export const TripPageFaqSection = () => (
  <TripPageSection id={TRIP_PAGE_FAQ_SECTION_ID} title="Biežāk uzdotie jautājumi" trackingId="faq">
    <div className={faqListStyle}>
      {tripPageFaqs.map((faq) => (
        <TripPageFaqItem
          key={faq.id}
          id={faq.id}
          question={faq.question}
          answer={renderAnswer(faq.answer)}
        />
      ))}
    </div>
  </TripPageSection>
);
