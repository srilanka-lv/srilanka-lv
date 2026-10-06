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
  /** Stable name the engagement tracking reports for this section. */
  trackingId?: string;
}>;

/**
 * One H2 section of the trip page: the heading in the first column on wide
 * screens, where it stays in view while its content scrolls past, and the
 * content across the other two. The id is the anchor in-page links jump to.
 */
export const TripPageSection: FunctionComponent<TripPageSectionProps> = ({
  id,
  title,
  trackingId,
  children,
}) => (
  <section id={id} className={tripPageSectionStyle} data-trip-section={trackingId}>
    <Heading as="h2" variant="h2" className={tripPageSectionTitleStyle}>
      {title}
    </Heading>
    <div className={tripPageSectionBodyStyle}>{children}</div>
  </section>
);
