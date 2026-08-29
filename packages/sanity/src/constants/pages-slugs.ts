/**
 * Every page has two paths:
 * - `EN`: the internal Next.js App Router route (the folder name). This is what
 *   `next.config` rewrites *to* and what `usePathname()` returns during SSR.
 * - `LV`: the public Latvian slug visitors actually see in the URL. This is what
 *   `next.config` rewrites *from*, what Sanity stores, and what `usePathname()`
 *   returns on the client.
 *
 * Keep both maps keyed identically so a page's route and slug stay in sync.
 */
export const PAGES = {
  EN: {
    HOME: '',
    PRODUCTS: 'products',
    PRODUCTS_GIRLS_TRIP: 'trip',
    ABOUT_ME: 'about-me',
    FLIGHT_TICKETS: 'flight-tickets',
    BLOGS: 'blog',
    INFO_WHAT_TO_DO: 'holiday-in-sri-lanka-what-to-do',
    INFO_WHERE_TO_STAY: 'holiday-in-sri-lanka-where-to-stay',
    INFO_DAILY_BUDGET: 'holiday-in-sri-lanka-daily-budget',
    INFO_BEST_TIME_TO_TRAVEL: 'holiday-in-sri-lanka-best-time-to-travel',
    INFO_HOW_LONG_TO_GO: 'holiday-in-sri-lanka-how-long-to-go',
    INFO_VISA: 'holiday-in-sri-lanka-how-to-get-a-visa',
    INFO_TRANSPORT: 'holiday-in-sri-lanka-transport',
  },
  LV: {
    HOME: 'sakums',
    PRODUCTS: 'produkti',
    PRODUCTS_GIRLS_TRIP: 'meitenu-celojums-uz-srilanku',
    ABOUT_ME: 'par-mani',
    FLIGHT_TICKETS: 'letakie-lidojumi-uz-srilanku-no-rigas',
    BLOGS: 'blogi',
    INFO_WHAT_TO_DO: 'ko-darit-un-ko-nedarit-srilankas-brivdienas',
    INFO_WHERE_TO_STAY: 'kuras-srilankas-vietas-vislabak-palikt',
    INFO_DAILY_BUDGET: 'dienas-budzets-celojumam-uz-srilanku',
    INFO_BEST_TIME_TO_TRAVEL: 'labakais-laiks-lai-celotu-uz-srilanku',
    INFO_HOW_LONG_TO_GO: 'cik-ilgu-laiku-ir-jaieplano-celojumam-uz-srilanku',
    INFO_VISA: 'ka-iegut-srilankas-turistu-vizu-latvijas-pilsoniem',
    INFO_TRANSPORT: 'dazadas-transportu-veidu-iespejas-srilanka',
  },
} as const;

/**
 * Slugs of retired pages that no longer exist but are still indexed by Google.
 * `next.config` redirects each historical URL to a live page (products to the
 * girls trip, contact to the home page). Kept out of `PAGES` so nothing can
 * link to them internally.
 */
export const RETIRED_PAGES = {
  EN: {
    PRODUCTS_CONSULTATION: 'consultation',
    PRODUCTS_HOLIDAY_PLAN: 'holiday-plan',
    CONTACT: 'contact',
  },
  LV: {
    PRODUCTS_CONSULTATION: 'srilankas-brivdienu-konsultacijas',
    PRODUCTS_HOLIDAY_PLAN: 'personalizets-celojuma-plans-uz-srilanku',
    CONTACT: 'kontakti',
  },
} as const;
