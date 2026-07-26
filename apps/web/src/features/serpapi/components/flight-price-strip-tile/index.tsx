'use client';

import { Tabs } from '@ark-ui/react/tabs';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FunctionComponent } from 'react';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import type { FlightMonthSummaryModel } from '../../models/flight-data-model';
import { formatMonthLabel } from '../../utils/format-month-label';
import { formatPrice } from '../../utils/format-price';
import {
  barHeightVar,
  barIndexVar,
  barStyle,
  barTrackStyle,
  monthLabelStyle,
  priceLabelStyle,
  tileStyle,
  visuallyHiddenStyle,
} from './styles.css';

type FlightPriceStripTileProps = {
  summary: FlightMonthSummaryModel;
  maxAveragePrice: number;
  index: number;
};

export const FlightPriceStripTile: FunctionComponent<FlightPriceStripTileProps> = ({
  summary,
  maxAveragePrice,
  index,
}) => {
  const heightPercent = Math.round((summary.averagePrice / maxAveragePrice) * 100);
  const hint = `${FLIGHT_PAGE_COPY.averagePrefix} ${formatPrice(summary.averagePrice)} · ${summary.dateCount} ${FLIGHT_PAGE_COPY.datesSuffix}`;

  return (
    <Tabs.Trigger
      value={summary.month}
      className={tileStyle}
      title={hint}
      style={assignInlineVars({
        [barHeightVar]: `${heightPercent}%`,
        [barIndexVar]: `${index}`,
      })}
    >
      <span className={monthLabelStyle}>{formatMonthLabel(summary.month, 'short')}</span>
      <span className={barTrackStyle} aria-hidden>
        <span className={barStyle} />
      </span>
      <span className={priceLabelStyle}>
        {FLIGHT_PAGE_COPY.priceFromPrefix} {formatPrice(summary.lowestPrice)}
      </span>
      <span className={visuallyHiddenStyle}>{hint}</span>
    </Tabs.Trigger>
  );
};
