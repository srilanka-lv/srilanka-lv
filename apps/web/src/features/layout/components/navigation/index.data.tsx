import {
  SiFacebook,
  SiInstagram,
  SiPatreon,
  SiTiktok,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import {
  Home,
  MailCheck,
  Newspaper,
  ShoppingBag,
  SquareUserRound,
  TicketsPlane,
} from 'lucide-react';

import {
  PAGE_ABOUT_ME_SLUG,
  PAGE_BLOGS_SLUG,
  PAGE_CONTACT_SLUG,
  PAGE_FLIGHT_TICKETS_SLUG,
  PAGE_PRODUCTS_SLUG,
} from '@/features/sanity/constants/pages-slugs';

export const navigationItems = [
  {
    label: 'Sākums',
    icon: <Home size={20} />,
    href: '/',
  },
  {
    label: 'Blogi',
    icon: <Newspaper size={20} />,
    href: `/${PAGE_BLOGS_SLUG}`,
  },
  {
    label: 'Produkti',
    icon: <ShoppingBag size={20} />,
    href: `/${PAGE_PRODUCTS_SLUG}`,
  },
  {
    label: 'Lidojumu cenas',
    icon: <TicketsPlane size={20} />,
    href: `/${PAGE_FLIGHT_TICKETS_SLUG}`,
  },
  {
    label: 'Par mani',
    icon: <SquareUserRound size={20} />,
    href: `/${PAGE_ABOUT_ME_SLUG}`,
  },
  {
    label: 'Kontakti',
    icon: <MailCheck size={20} />,
    href: `/${PAGE_CONTACT_SLUG}`,
  },
] as const;

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
