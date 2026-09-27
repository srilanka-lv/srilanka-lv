import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

import { Button } from '@/shared/components/button';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import type { FlightDateModel } from '../../models/flight-data-model';
import { buildKiwiFlightsUrl } from '../../utils/build-kiwi-flights-url';
import { formatDateLabel } from '../../utils/format-date-label';
import { formatDuration } from '../../utils/format-duration';
import { formatPrice } from '../../utils/format-price';
import { FlightDateDetails } from '../flight-date-details';
import { FlightItinerary } from '../flight-itinerary';
import {
  actionsStyle,
  airlinesStyle,
  chevronStyle,
  contentStyle,
  ctaLinkStyle,
  dateStyle,
  disclaimerStyle,
  logoGroupStyle,
  logoStyle,
  metaStyle,
  priceStyle,
  rowStyle,
  summaryStyle,
} from './styles.css';

type FlightDateRowProps = {
  entry: FlightDateModel;
  queriedOnLabel: string;
};

export const FlightDateRow: FunctionComponent<FlightDateRowProps> = ({ entry, queriedOnLabel }) => {
  const { cheapestFlight } = entry;
  const airlines = [
    ...new Map(cheapestFlight.flights.map((leg) => [leg.airline, leg.airlineLogo])).entries(),
  ];

  return (
    <FlightDateDetails className={rowStyle} date={entry.date} price={cheapestFlight.price}>
      <summary className={summaryStyle}>
        <span className={dateStyle}>{formatDateLabel(entry.date)}</span>
        <span className={airlinesStyle}>
          <span className={logoGroupStyle} aria-hidden>
            {airlines.map(([airline, logo]) => (
              <Image
                key={airline}
                className={logoStyle}
                src={logo}
                alt={airline}
                width={20}
                height={20}
              />
            ))}
          </span>
          {airlines.map(([airline]) => airline).join(', ')}
        </span>
        <span className={metaStyle}>
          {cheapestFlight.stops} {FLIGHT_PAGE_COPY.stopsSuffix} ·{' '}
          {formatDuration(cheapestFlight.totalDuration)}
        </span>
        <span className={priceStyle}>{formatPrice(cheapestFlight.price)}</span>
        <ChevronDown className={chevronStyle} size={20} aria-hidden />
      </summary>
      <div className={contentStyle}>
        <FlightItinerary flight={cheapestFlight} />
        <div className={actionsStyle}>
          <Button
            as="a"
            variant="primary"
            size="medium"
            className={ctaLinkStyle}
            href={buildKiwiFlightsUrl(entry.date)}
            target="_blank"
            rel="sponsored noopener"
            data-umami-event="flight-booking-click"
            data-umami-event-partner="kiwi"
            data-umami-event-placement="date-row"
            data-umami-event-date={entry.date}
            data-umami-event-price={cheapestFlight.price}
          >
            {FLIGHT_PAGE_COPY.rowCtaLabel}
          </Button>
          <span className={disclaimerStyle}>
            {FLIGHT_PAGE_COPY.priceDisclaimer.replace('{date}', queriedOnLabel)}
          </span>
        </div>
      </div>
    </FlightDateDetails>
  );
};
