import { PAGES } from '@packages/sanity/constants/pages-slugs';
import {
  BedDouble,
  CarFront,
  Coffee,
  Headset,
  Languages,
  type LucideIcon,
  Map as MapIcon,
  Plane,
  PlaneLanding,
  ShieldPlus,
  Sparkles,
  Stamp,
  Ticket,
  Utensils,
  Waves,
} from 'lucide-react';
import Link from 'next/link';
import type { FunctionComponent, ReactNode } from 'react';

import { quietLinkStyle } from '@/shared/styles/quiet-link.css';

import { TripPageSection } from '../trip-page-section';
import {
  includedColumnStyle,
  includedColumnsStyle,
  includedIconStyles,
  includedItemStyle,
  includedListStyle,
  includedSubtitleStyle,
} from './styles.css';

export const TRIP_PAGE_INCLUDED_SECTION_ID = 'kas-ieklauts';

type Item = { icon: LucideIcon; label: ReactNode };

const included: Item[] = [
  { icon: BedDouble, label: 'Naktsmājas visas 9 naktis' },
  { icon: Coffee, label: 'Brokastis' },
  { icon: PlaneLanding, label: 'Lidostas transfēri' },
  { icon: CarFront, label: 'Transports pa Šrilanku' },
  { icon: Stamp, label: 'Šrilankas vīza' },
  {
    icon: Sparkles,
    label: 'Aktivitātes: safari, snorkelēšana, gredzenu meistarklase, brauciens pa upi',
  },
  { icon: Ticket, label: 'Visas ieejas maksas' },
  { icon: MapIcon, label: 'Ekskursijas un tūres' },
  { icon: Languages, label: 'Es kā Tava latviešu gide visas 10 dienas' },
  { icon: Headset, label: 'Atbalsts 24/7' },
];

const excluded: Item[] = [
  {
    icon: Plane,
    label: (
      <>
        <Link className={quietLinkStyle} href={`/${PAGES.LV.FLIGHT_TICKETS}`}>
          Lidojuma biļetes
        </Link>{' '}
        uz Šrilanku un atpakaļ
      </>
    ),
  },
  { icon: Utensils, label: 'Pusdienas un vakariņas' },
  { icon: ShieldPlus, label: 'Ceļojuma apdrošināšana' },
  { icon: Waves, label: 'Aktivitātes pēc izvēles: zipline, sērfošana, joga' },
];

const ItemList: FunctionComponent<{ items: Item[]; tone: 'included' | 'excluded' }> = ({
  items,
  tone,
}) => (
  <ul className={includedListStyle}>
    {items.map(({ icon: Icon, label }, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static list, labels can be JSX.
      <li key={index} className={includedItemStyle}>
        <Icon className={includedIconStyles[tone]} aria-hidden="true" strokeWidth={1.75} />
        <span>{label}</span>
      </li>
    ))}
  </ul>
);

/** What the trip price covers and what it does not, as two plain lists. */
export const TripPageIncludedSection = () => (
  <TripPageSection id={TRIP_PAGE_INCLUDED_SECTION_ID} title="Kas iekļauts cenā">
    <div className={includedColumnsStyle}>
      <div className={includedColumnStyle}>
        <h3 className={includedSubtitleStyle}>Cenā iekļauts</h3>
        <ItemList items={included} tone="included" />
      </div>
      <div className={includedColumnStyle}>
        <h3 className={includedSubtitleStyle}>Cenā nav iekļauts</h3>
        <ItemList items={excluded} tone="excluded" />
      </div>
    </div>
  </TripPageSection>
);
