import type { FunctionComponent } from 'react';

export type GuideFaqItem = {
  question: string;
  /** Plain text, self-contained: it is also emitted verbatim as FAQPage schema. */
  answer: string;
};

type GuideFaqProps = {
  items: GuideFaqItem[];
};

/**
 * The FAQ block: question as H3, answer as a paragraph. The same array feeds
 * the FAQPage node in the page's JSON-LD, so text and schema never drift.
 */
export const GuideFaq: FunctionComponent<GuideFaqProps> = ({ items }) => (
  <>
    {items.map((item) => (
      <div key={item.question}>
        <h3>{item.question}</h3>
        <p>{item.answer}</p>
      </div>
    ))}
  </>
);
