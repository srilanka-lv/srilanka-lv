import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

import { TodoGrietaMark } from '@/shared/components/todo-grieta-mark';
import { TODO_GRIETA } from '@/shared/constants/todo-grieta';

import { TripPageSection } from '../trip-page-section';
import { tripPageFaqs } from './index.data';
import {
  faqAnswerStyle,
  faqChevronStyle,
  faqItemStyle,
  faqListStyle,
  faqQuestionStyle,
  faqSummaryStyle,
} from './styles.css';

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
 * The questions as native disclosures: closed by default so the list scans
 * as questions, every answer still in the HTML for search and for the
 * FAQPage schema. `data-faq-id` is what the engagement tracking reports.
 */
export const TripPageFaqSection = () => (
  <TripPageSection id={TRIP_PAGE_FAQ_SECTION_ID} title="Biežāk uzdotie jautājumi" trackingId="faq">
    <div className={faqListStyle}>
      {tripPageFaqs.map((faq) => (
        <details key={faq.id} className={faqItemStyle} data-faq-id={faq.id}>
          <summary className={faqSummaryStyle}>
            <h3 className={faqQuestionStyle}>{faq.question}</h3>
            <ChevronDown className={faqChevronStyle} aria-hidden="true" strokeWidth={1.75} />
          </summary>
          <p className={faqAnswerStyle}>{renderAnswer(faq.answer)}</p>
        </details>
      ))}
    </div>
  </TripPageSection>
);
