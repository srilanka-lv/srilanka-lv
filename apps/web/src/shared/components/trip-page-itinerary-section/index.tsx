import { Fragment } from 'react';

import { Heading } from '../heading';
import { TripPageBookingCta } from '../trip-page-booking-cta';
import { TripPageExpandable } from '../trip-page-expandable';
import { tripPageSectionTitleStyle } from '../trip-page-section/styles.css';
import { tripItineraryDays } from './index.data';
import {
  tripPagePlanItineraryItemSeparatorStyle,
  tripPagePlanItinerarySectionCtaStyle,
  tripPagePlanItinerarySectionStyle,
  tripPagePlanItinerarySectionWrapperStyle,
  tripPagePlanItineraryStyle,
  tripPagePlanItineraryTitleStyle,
} from './styles.css';

export const TRIP_PAGE_ITINERARY_SECTION_ID = 'celojuma-plans';

export const TripPageItinerarySection = () => (
  <section
    id={TRIP_PAGE_ITINERARY_SECTION_ID}
    className={tripPagePlanItinerarySectionStyle}
    data-trip-section="itinerary"
  >
    <div>
      <div className={tripPagePlanItinerarySectionWrapperStyle}>
        <Heading
          as="h2"
          variant="h2"
          className={`${tripPageSectionTitleStyle} ${tripPagePlanItineraryTitleStyle}`}
        >
          Ceļojuma plāns
        </Heading>
        <TripPageBookingCta
          className={tripPagePlanItinerarySectionCtaStyle}
          placement="itinerary"
          withDetails={false}
        />
      </div>
    </div>
    <div className={tripPagePlanItineraryStyle}>
      {tripItineraryDays.map((day, index) => (
        <Fragment key={day.title}>
          {index > 0 && <hr className={tripPagePlanItineraryItemSeparatorStyle} />}
          <TripPageExpandable
            day={index + 1}
            title={day.title}
            subject={day.subject}
            imageSrc={day.imageSrc}
            content={day.content}
          />
        </Fragment>
      ))}
    </div>
  </section>
);
