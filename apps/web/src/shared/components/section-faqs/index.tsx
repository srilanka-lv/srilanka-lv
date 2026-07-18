import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentProps, FunctionComponent } from 'react';

import { FaqListItem } from '../faq-list-item';
import { Heading } from '../heading';
import { faqItems } from './index.data';
import {
  sectionFaqsContentStyle,
  sectionFaqsItemLinkStyle,
  sectionFaqsStyle,
  sectionFaqsTitleStyle,
} from './styles.css';

type SectionFaqsProps = {
  className?: string;
} & ComponentProps<'section'>;

export const SectionFaqs: FunctionComponent<SectionFaqsProps> = ({ className, ...props }) => (
  <section className={clsx(sectionFaqsStyle, className)} {...props}>
    <Heading as="h3" variant="h2" className={sectionFaqsTitleStyle}>
      Viss par ceļošanu Šrilankā
    </Heading>
    <div className={sectionFaqsContentStyle}>
      {faqItems.map((item) => (
        <FaqListItem
          key={item.question}
          iconSlot={item.icon}
          questionSlot={item.question}
          answerSlot={item.answer}
          linkSlot={
            <Link className={sectionFaqsItemLinkStyle} href={item.href}>
              Vairāk informācijas →
            </Link>
          }
        />
      ))}
    </div>
  </section>
);
