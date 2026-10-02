import type { FunctionComponent, PropsWithChildren } from 'react';

import { Heading } from '../heading';
import {
  tripPageSectionBodyStyle,
  tripPageSectionStyle,
  tripPageSectionTitleStyle,
} from './styles.css';

type TripPageSectionProps = PropsWithChildren<{
  id: string;
  title: string;
}>;

/**
 * One H2 section of the trip page, in the same grammar as "Kāpēc Tev patiks
 * šis ceļojums": the heading in the first column on wide screens, the content
 * across the other two. The id is the anchor in-page links jump to.
 */
export const TripPageSection: FunctionComponent<TripPageSectionProps> = ({
  id,
  title,
  children,
}) => (
  <section id={id} className={tripPageSectionStyle}>
    <Heading as="h2" variant="h2" className={tripPageSectionTitleStyle}>
      {title}
    </Heading>
    <div className={tripPageSectionBodyStyle}>{children}</div>
  </section>
);
