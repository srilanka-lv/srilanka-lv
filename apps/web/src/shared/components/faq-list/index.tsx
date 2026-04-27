import type { ReactNode } from 'react';

import { Heading } from '../heading';

type FaqListItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

type FaqListProps = {
  items: FaqListItem[];
};

export function FaqList({ items }: FaqListProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section>
      {items.map((item) => (
        <details key={item.id}>
          <summary>
            <Heading as="h3" variant="h3">
              {item.question}
            </Heading>
          </summary>
          {item.answer}
        </details>
      ))}
    </section>
  );
}
