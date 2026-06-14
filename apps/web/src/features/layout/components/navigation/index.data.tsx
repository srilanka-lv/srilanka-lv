import {
  SiFacebook,
  SiInstagram,
  SiPatreon,
  SiTiktok,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import {
  PAGE_ABOUT_ME_SLUG,
  PAGE_BLOGS_SLUG,
  PAGE_CONTACT_SLUG,
  PAGE_FLIGHT_TICKETS_SLUG,
  PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG,
  PAGE_INFO_DAILY_BUDGET_SLUG,
  PAGE_INFO_HOW_LONG_TO_GO_SLUG,
  PAGE_INFO_TRANSPORT_SLUG,
  PAGE_INFO_VISA_SLUG,
  PAGE_INFO_WHAT_TO_DO_WHAT_NOT_TO_DO_SLUG,
  PAGE_INFO_WHERE_TO_STAY_SLUG,
  PAGE_PRODUCTS_SLUG,
} from '@packages/sanity/constants/pages-slugs';
import {
  Home,
  MailCheck,
  Newspaper,
  ShoppingBag,
  SquareUserRound,
  TicketsPlane,
} from 'lucide-react';

export const navigationItems = [
  {
    visibleInNavigation: true,
    label: 'Sākums',
    icon: <Home size={20} />,
    href: '/',
  },
  {
    visibleInNavigation: true,
    label: 'Blogi',
    icon: <Newspaper size={20} />,
    href: `/${PAGE_BLOGS_SLUG}`,
  },
  {
    visibleInNavigation: true,
    label: 'Produkti',
    icon: <ShoppingBag size={20} />,
    href: `/${PAGE_PRODUCTS_SLUG}`,
  },
  {
    visibleInNavigation: true,
    label: 'Lidojumu cenas',
    icon: <TicketsPlane size={20} />,
    href: `/${PAGE_FLIGHT_TICKETS_SLUG}`,
  },
  {
    visibleInNavigation: true,
    label: 'Par mani',
    icon: <SquareUserRound size={20} />,
    href: `/${PAGE_ABOUT_ME_SLUG}`,
  },
  {
    visibleInNavigation: true,
    label: 'Kontakti',
    icon: <MailCheck size={20} />,
    href: `/${PAGE_CONTACT_SLUG}`,
  },
  {
    visibleInNavigation: false,
    label: 'Ko darīt, ko nedarīt',
    href: `/${PAGE_INFO_WHAT_TO_DO_WHAT_NOT_TO_DO_SLUG}`,
  },
  {
    visibleInNavigation: false,
    label: 'Kurās Šrilankas vietās vislabāk palikt',
    href: `/${PAGE_INFO_WHERE_TO_STAY_SLUG}`,
  },
  {
    visibleInNavigation: false,
    label: 'Dienas budžets ceļojumam uz Šrilanku',
    href: `/${PAGE_INFO_DAILY_BUDGET_SLUG}`,
  },
  {
    visibleInNavigation: false,
    label: 'Lētākais veids, kā nokļūt no Latvijas uz Šrilanku',
    href: `/${PAGE_FLIGHT_TICKETS_SLUG}`,
  },
  {
    visibleInNavigation: false,
    label: 'Labākais laiks, lai ceļotu uz Šrilanku',
    href: `/${PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG}`,
  },
  {
    visibleInNavigation: false,
    label: 'Cik ilgu laiku ir jāieplāno ceļojumam uz Šrilanku',
    href: `/${PAGE_INFO_HOW_LONG_TO_GO_SLUG}`,
  },
  {
    visibleInNavigation: false,
    label: 'Kā iegūt Šrilankas tūristu vīzu Latvijas pilsoņiem',
    href: `/${PAGE_INFO_VISA_SLUG}`,
  },
  {
    visibleInNavigation: false,
    label: 'Dažādās transportu veidu iespējas Šrilankā',
    href: `/${PAGE_INFO_TRANSPORT_SLUG}`,
  },
];

export const socialMediaItems = [
  {
    icon: <SiInstagram size={20} />,
    href: 'https://www.instagram.com/dzivetropos',
  },
  {
    icon: <SiTiktok size={20} />,
    href: 'https://www.tiktok.com/dzivetropos',
  },
  {
    icon: <SiYoutube size={20} />,
    href: 'https://www.youtube.com/dzivetropos',
  },
  {
    icon: <SiPatreon size={20} />,
    href: 'https://www.patreon.com/dzivetropos',
  },
  {
    icon: <SiFacebook size={20} />,
    href: 'https://www.facebook.com/dzivetropos',
  },
];
