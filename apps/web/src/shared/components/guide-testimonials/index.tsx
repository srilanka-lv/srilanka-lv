import Image from 'next/image';
import type { FunctionComponent } from 'react';

import {
  figureStyle,
  itemStyle,
  listStyle,
  nameStyle,
  portraitStyle,
  quoteStyle,
} from './styles.css';

export type GuideTestimonial = {
  /** First name and initial, as the person agreed to be shown. */
  name: string;
  quote: string;
  portraitSrc: string;
};

type GuideTestimonialsProps = {
  items: GuideTestimonial[];
};

/**
 * Quotes from past travellers, each with the portrait and name they gave
 * permission for. Real HTML quotation semantics (figure, blockquote,
 * figcaption), no ratings and no schema: there is nothing to rate.
 */
export const GuideTestimonials: FunctionComponent<GuideTestimonialsProps> = ({ items }) => (
  <ul className={listStyle}>
    {items.map((item) => (
      <li key={item.name} className={itemStyle}>
        <Image
          className={portraitStyle}
          src={item.portraitSrc}
          alt={item.name}
          width={64}
          height={64}
          sizes="64px"
        />
        <figure className={figureStyle}>
          <blockquote className={quoteStyle}>
            <p>{item.quote}</p>
          </blockquote>
          <figcaption className={nameStyle}>{item.name}</figcaption>
        </figure>
      </li>
    ))}
  </ul>
);
