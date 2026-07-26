import type { FunctionComponent } from 'react';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import { formatShortDate } from '../../utils/format-short-date';
import { chipStyles, stampStyle, statusLineStyle } from './styles.css';

type FlightStatusLineProps = {
  queriedOn: string;
};

export const FlightStatusLine: FunctionComponent<FlightStatusLineProps> = ({ queriedOn }) => (
  <div className={statusLineStyle}>
    <span className={chipStyles.route}>{FLIGHT_PAGE_COPY.routeChip}</span>
    <span className={chipStyles.oneWay}>{FLIGHT_PAGE_COPY.oneWayChip}</span>
    <span className={stampStyle}>
      {FLIGHT_PAGE_COPY.checkedOnPrefix} {formatShortDate(queriedOn)}
    </span>
  </div>
);
