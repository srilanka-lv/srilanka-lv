import { Temporal } from '@js-temporal/polyfill';
import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { FlightMonthPanel } from '@/features/serpapi/components/flight-month-panel';
import { FlightPriceExplorer } from '@/features/serpapi/components/flight-price-explorer';
import { FlightStatusLine } from '@/features/serpapi/components/flight-status-line';
import { FLIGHT_PAGE_COPY } from '@/features/serpapi/constants/flight-page-copy';
import flightData from '@/features/serpapi/data/flight-data.json';
import type { FlightDataModel } from '@/features/serpapi/models/flight-data-model';
import { buildGoogleFlightsRouteUrl } from '@/features/serpapi/utils/build-google-flights-url';
import {
  filterUpcomingMonths,
  findCheapestUpcomingMonth,
} from '@/features/serpapi/utils/filter-upcoming-months';
import { formatShortDate } from '@/features/serpapi/utils/format-short-date';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';
import { Button } from '@/shared/components/button';
import { Card } from '@/shared/components/card';
import { SectionBlogs } from '@/shared/components/section-blogs';

import {
  ctaLinkStyle,
  funnelBodyStyle,
  funnelCardStyle,
  funnelTitleStyle,
  introStyle,
  methodNoteStyle,
  pageStyle,
  staleCardStyle,
} from './styles.css';

export const revalidate = 86400;

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGES.LV.FLIGHT_TICKETS);

const data = flightData as FlightDataModel;

const NextFlightCalendarPage: FunctionComponent = () => {
  const href = `/${PAGES.LV.FLIGHT_TICKETS}`;
  const today = Temporal.Now.plainDateISO('Europe/Riga');
  const months = filterUpcomingMonths(data, today);
  const defaultMonth = findCheapestUpcomingMonth(months);
  const queriedOnLabel = formatShortDate(data.queriedOn);
  const summaries = months.map((month) => ({
    month: month.month,
    lowestPrice: month.lowestPrice,
    averagePrice: month.averagePrice,
    dateCount: month.dates.length,
  }));

  return (
    <>
      <div className={pageStyle}>
        <Breadcrumbs items={buildSectionItems(href)} />
        <h1>{findNavLabel(href)}</h1>
        <FlightStatusLine queriedOn={data.queriedOn} />
        <p className={introStyle}>{FLIGHT_PAGE_COPY.intro}</p>
        {defaultMonth ? (
          <FlightPriceExplorer summaries={summaries} defaultMonth={defaultMonth}>
            {months.map((month) => (
              <FlightMonthPanel key={month.month} month={month} queriedOnLabel={queriedOnLabel} />
            ))}
          </FlightPriceExplorer>
        ) : (
          <Card variant="filled" className={staleCardStyle}>
            <p>{FLIGHT_PAGE_COPY.staleNotice}</p>
            <Button
              as="a"
              variant="primary"
              size="medium"
              className={ctaLinkStyle}
              href={buildGoogleFlightsRouteUrl()}
              target="_blank"
              rel="noopener"
            >
              {FLIGHT_PAGE_COPY.staleCtaLabel}
            </Button>
          </Card>
        )}
        <p className={methodNoteStyle}>{FLIGHT_PAGE_COPY.methodNote}</p>
        <Card variant="filled" className={funnelCardStyle}>
          <h2 className={funnelTitleStyle}>{FLIGHT_PAGE_COPY.funnelTitle}</h2>
          <p className={funnelBodyStyle}>{FLIGHT_PAGE_COPY.funnelBody}</p>
          <Button
            as="a"
            variant="primary"
            size="medium"
            className={ctaLinkStyle}
            href={`/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_HOLIDAY_PLAN}`}
          >
            {FLIGHT_PAGE_COPY.funnelCtaLabel}
          </Button>
        </Card>
      </div>
      <SectionBlogs sectionTitle="Mani piedzīvojumi Šrilankā" blogsLimit={6} />
    </>
  );
};

export default NextFlightCalendarPage;
