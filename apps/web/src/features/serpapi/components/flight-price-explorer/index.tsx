'use client';

import { Tabs } from '@ark-ui/react/tabs';
import { Children, type FunctionComponent, type ReactNode } from 'react';

import { trackEvent } from '@/shared/utils/analytics';

import type { FlightMonthSummaryModel } from '../../models/flight-data-model';
import { FlightPriceStripTile } from '../flight-price-strip-tile';
import { listStyle, rootStyle } from './styles.css';

type FlightPriceExplorerProps = {
  summaries: FlightMonthSummaryModel[];
  defaultMonth: string;
  // One server-rendered panel per summary, in the same order as `summaries`
  children: ReactNode;
};

export const FlightPriceExplorer: FunctionComponent<FlightPriceExplorerProps> = ({
  summaries,
  defaultMonth,
  children,
}) => {
  const panels = Children.toArray(children);
  const maxAveragePrice = Math.max(...summaries.map((summary) => summary.averagePrice));

  return (
    <Tabs.Root
      defaultValue={defaultMonth}
      className={rootStyle}
      onValueChange={({ value }) => {
        if (value) {
          void trackEvent('flight-month-select', { month: value });
        }
      }}
    >
      <Tabs.List className={listStyle}>
        {summaries.map((summary, index) => (
          <FlightPriceStripTile
            key={summary.month}
            summary={summary}
            maxAveragePrice={maxAveragePrice}
            index={index}
          />
        ))}
      </Tabs.List>
      {summaries.map((summary, index) => (
        <Tabs.Content key={summary.month} value={summary.month}>
          {panels[index]}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
