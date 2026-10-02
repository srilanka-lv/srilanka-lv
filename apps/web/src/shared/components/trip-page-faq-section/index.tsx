import { GuideFaq } from '@/shared/components/guide-faq';

import { TripPageSection } from '../trip-page-section';
import { tripPageFaqs } from './index.data';
import { tripPageFaqStyle } from './styles.css';

export const TRIP_PAGE_FAQ_SECTION_ID = 'jautajumi';

export const TripPageFaqSection = () => (
  <TripPageSection id={TRIP_PAGE_FAQ_SECTION_ID} title="Biežāk uzdotie jautājumi">
    <div className={tripPageFaqStyle}>
      <GuideFaq items={tripPageFaqs} />
    </div>
  </TripPageSection>
);
