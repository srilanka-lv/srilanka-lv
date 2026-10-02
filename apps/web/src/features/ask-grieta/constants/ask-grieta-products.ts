import { PAGES, RETIRED_PAGES } from '@packages/sanity/constants/pages-slugs';

// Chip labels follow the names the site already uses for these products.
// `about` completes "…, lai parunātu par …" on the success screen.
export const ASK_GRIETA_PRODUCTS = [
  { id: 'girls-trip', label: 'Meiteņu ceļojums', about: 'meiteņu ceļojumu' },
  { id: 'consultation', label: '1:1 konsultācija', about: '1:1 konsultāciju' },
  {
    id: 'travel-plan',
    label: 'Personalizēts ceļojuma plāns',
    about: 'personalizētu ceļojuma plānu',
  },
] as const;

export type AskGrietaProductId = (typeof ASK_GRIETA_PRODUCTS)[number]['id'];

export const findAskGrietaProduct = (id: string | null | undefined) =>
  ASK_GRIETA_PRODUCTS.find((product) => product.id === id);

// Short aliases accepted by the ?ask=<product> deep link, so Instagram bio and
// DM links can stay short (e.g. ?ask=trip).
const DEEP_LINK_ALIASES: Record<string, AskGrietaProductId> = {
  trip: 'girls-trip',
  'girls-trip': 'girls-trip',
  consultation: 'consultation',
  call: 'consultation',
  plan: 'travel-plan',
  'travel-plan': 'travel-plan',
};

export const DEEP_LINK_ALIAS: Record<AskGrietaProductId, string> = {
  'girls-trip': 'trip',
  consultation: 'consultation',
  'travel-plan': 'plan',
};

export const resolveDeepLinkProduct = (value: string | null): AskGrietaProductId | null =>
  value ? (DEEP_LINK_ALIASES[value.toLowerCase()] ?? null) : null;

// Product slugs from products-page/index.data.ts, for cards built from that list.
export const PRODUCT_BY_SLUG: Record<string, AskGrietaProductId> = {
  [PAGES.LV.PRODUCTS_GIRLS_TRIP]: 'girls-trip',
  [RETIRED_PAGES.LV.PRODUCTS_CONSULTATION]: 'consultation',
  [RETIRED_PAGES.LV.PRODUCTS_HOLIDAY_PLAN]: 'travel-plan',
};

// `usePathname()` gives the EN route on the server and the LV slug on the
// client, so match both.
export const resolvePageProduct = (pathname: string): AskGrietaProductId | null => {
  if (
    pathname.includes(PAGES.LV.PRODUCTS_GIRLS_TRIP) ||
    pathname.endsWith(`/${PAGES.EN.PRODUCTS}/${PAGES.EN.PRODUCTS_GIRLS_TRIP}`)
  ) {
    return 'girls-trip';
  }

  return null;
};
