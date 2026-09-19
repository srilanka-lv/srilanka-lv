import { SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons';
import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { Compass, Home, Newspaper, ShoppingBag, SquareUserRound, TicketsPlane } from 'lucide-react';

import { INSTAGRAM_URL } from '@/shared/constants/instagram';

export const navigationItems = [
  {
    // Home stays registered for breadcrumbs but is not listed in the header:
    // the logo already links there, and the slot goes to the pillar guide.
    visibleInNavigation: false,
    label: 'Sākums',
    icon: <Home size={20} />,
    href: '/',
  },
  {
    // The pillar guide. Its label doubles as the page's H1 and as the sitewide
    // anchor text, so it must stay the exact target phrase.
    visibleInNavigation: true,
    label: 'Ceļojums uz Šrilanku',
    icon: <Compass size={20} />,
    href: `/${PAGES.LV.GUIDE_TRIP}`,
  },
  {
    visibleInNavigation: true,
    label: 'Produkti',
    icon: <ShoppingBag size={20} />,
    href: `/${PAGES.LV.PRODUCTS}`,
  },
  {
    visibleInNavigation: true,
    label: 'Lidojumu cenas',
    icon: <TicketsPlane size={20} />,
    href: `/${PAGES.LV.FLIGHT_TICKETS}`,
  },
  {
    visibleInNavigation: true,
    label: 'Blogi',
    icon: <Newspaper size={20} />,
    href: `/${PAGES.LV.BLOGS}`,
  },
  {
    visibleInNavigation: true,
    label: 'Par mani',
    icon: <SquareUserRound size={20} />,
    href: `/${PAGES.LV.ABOUT_ME}`,
  },
  {
    visibleInNavigation: false,
    label: 'Ko darīt, ko nedarīt',
    href: `/${PAGES.LV.INFO_WHAT_TO_DO}`,
  },
  {
    visibleInNavigation: false,
    label: 'Kurās Šrilankas vietās vislabāk palikt',
    href: `/${PAGES.LV.INFO_WHERE_TO_STAY}`,
  },
  {
    visibleInNavigation: false,
    label: 'Dienas budžets ceļojumam uz Šrilanku',
    href: `/${PAGES.LV.INFO_DAILY_BUDGET}`,
  },
  {
    visibleInNavigation: false,
    label: 'Lētākais veids, kā nokļūt no Latvijas uz Šrilanku',
    href: `/${PAGES.LV.FLIGHT_TICKETS}`,
  },
  {
    visibleInNavigation: false,
    label: 'Labākais laiks, lai ceļotu uz Šrilanku',
    href: `/${PAGES.LV.INFO_BEST_TIME_TO_TRAVEL}`,
  },
  {
    visibleInNavigation: false,
    label: 'Cik ilgu laiku ir jāieplāno ceļojumam uz Šrilanku',
    href: `/${PAGES.LV.INFO_HOW_LONG_TO_GO}`,
  },
  {
    visibleInNavigation: false,
    label: 'Kā iegūt Šrilankas tūristu vīzu Latvijas pilsoņiem',
    href: `/${PAGES.LV.INFO_VISA}`,
  },
  {
    visibleInNavigation: false,
    label: 'Dažādās transportu veidu iespējas Šrilankā',
    href: `/${PAGES.LV.INFO_TRANSPORT}`,
  },
];

export const socialMediaItems = [
  {
    icon: <SiInstagram size={20} />,
    label: 'Instagram',
    href: INSTAGRAM_URL,
  },
  // {
  //   icon: <SiTiktok size={20} />,
  //   label: 'TikTok',
  //   href: 'https://www.tiktok.com/@dzivetropos',
  // },
  // {
  //   icon: <SiYoutube size={20} />,
  //   label: 'YouTube',
  //   href: 'https://www.youtube.com/@dzivetropos',
  // },
  // {
  //   icon: <SiPatreon size={20} />,
  //   label: 'Patreon',
  //   href: 'https://www.patreon.com/dzivetropos',
  // },
  {
    icon: <SiFacebook size={20} />,
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61590469498422',
  },
];
