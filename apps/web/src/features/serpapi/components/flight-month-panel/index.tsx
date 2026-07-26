import type { FunctionComponent } from 'react';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import type { FlightMonthModel } from '../../models/flight-data-model';
import { formatMonthLabel } from '../../utils/format-month-label';
import { formatPrice } from '../../utils/format-price';
import { FlightDateRow } from '../flight-date-row';
import {
  panelHeaderStyle,
  panelLowestStyle,
  panelStyle,
  panelTitleStyle,
  rowListStyle,
} from './styles.css';

type FlightMonthPanelProps = {
  month: FlightMonthModel;
  queriedOnLabel: string;
};

export const FlightMonthPanel: FunctionComponent<FlightMonthPanelProps> = ({
  month,
  queriedOnLabel,
}) => (
  <section className={panelStyle}>
    <header className={panelHeaderStyle}>
      <h2 className={panelTitleStyle}>{formatMonthLabel(month.month, 'long')}</h2>
      <span className={panelLowestStyle}>
        {FLIGHT_PAGE_COPY.lowestPriceLabel} {formatPrice(month.lowestPrice)}
      </span>
    </header>
    <div className={rowListStyle}>
      {month.dates.map((entry) => (
        <FlightDateRow key={entry.date} entry={entry} queriedOnLabel={queriedOnLabel} />
      ))}
    </div>
  </section>
);
