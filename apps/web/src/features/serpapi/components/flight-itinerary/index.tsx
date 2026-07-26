import { Fragment, type FunctionComponent } from 'react';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import type { FlightCheapestModel } from '../../models/flight-data-model';
import { formatDuration } from '../../utils/format-duration';
import {
  itineraryListStyle,
  layoverStyle,
  legMetaStyle,
  legRouteStyle,
  legStyle,
  legTimeStyle,
  overnightStyle,
} from './styles.css';

type FlightItineraryProps = {
  flight: FlightCheapestModel;
};

const formatTime = (dateTime: string): string => dateTime.slice(11);

export const FlightItinerary: FunctionComponent<FlightItineraryProps> = ({ flight }) => (
  <ol className={itineraryListStyle}>
    {flight.flights.map((leg, index) => {
      const layover = flight.layovers[index];

      return (
        <Fragment key={leg.flightNumber}>
          <li className={legStyle}>
            <span className={legRouteStyle}>
              <span className={legTimeStyle}>{formatTime(leg.departureAirport.time)}</span>{' '}
              {leg.departureAirport.name} ({leg.departureAirport.id}) →{' '}
              <span className={legTimeStyle}>{formatTime(leg.arrivalAirport.time)}</span>{' '}
              {leg.arrivalAirport.name} ({leg.arrivalAirport.id})
            </span>
            <span className={legMetaStyle}>
              <span>
                {leg.airline} {leg.flightNumber} · {formatDuration(leg.duration)}
              </span>
              {leg.overnight && (
                <span className={overnightStyle}>{FLIGHT_PAGE_COPY.overnightLabel}</span>
              )}
            </span>
          </li>
          {layover && (
            <li className={layoverStyle}>
              {formatDuration(layover.duration)} {FLIGHT_PAGE_COPY.layoverSuffix} · {layover.id}
            </li>
          )}
        </Fragment>
      );
    })}
  </ol>
);
