import clsx from 'clsx';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

import {
  figureStyle,
  itemStyle,
  itemWithoutPortraitStyle,
  listStyle,
  nameStyle,
  portraitStyle,
  quoteStyle,
  quoteWithoutPortraitStyle,
} from './styles.css';

export type GuideTestimonial = {
  /** First name and initial, as the person agreed to be shown. */
  name: string;
  quote: string;
  portraitSrc: string;
};

type GuideTestimonialsProps = {
  items: GuideTestimonial[];
  /** Show each traveller's portrait. Off, the quotes run full width with the name above. */
  withPortraits?: boolean;
};

/**
 * Quotes from past travellers, each with the portrait and name they gave
 * permission for. Real HTML quotation semantics (figure, blockquote,
 * figcaption), no ratings and no schema: there is nothing to rate.
 */
export const GuideTestimonials: FunctionComponent<GuideTestimonialsProps> = ({
  items,
  withPortraits = true,
}) => (
  <ul className={listStyle}>
    {items.map((item) => (
      <li key={item.name} className={clsx(itemStyle, !withPortraits && itemWithoutPortraitStyle)}>
        {withPortraits && (
          <Image
            className={portraitStyle}
            src={item.portraitSrc}
            alt={item.name}
            width={64}
            height={64}
            sizes="64px"
          />
        )}
        <figure className={figureStyle}>
          <blockquote className={clsx(quoteStyle, !withPortraits && quoteWithoutPortraitStyle)}>
            <p>{item.quote}</p>
          </blockquote>
          <figcaption className={nameStyle}>{item.name}</figcaption>
        </figure>
      </li>
    ))}
  </ul>
);
