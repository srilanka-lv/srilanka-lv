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

export const navigationItems = [
  {
    label: 'Sākums',
    icon: <Home size={20} />,
    href: '/',
  },
  {
    label: 'Blogs',
    icon: <Newspaper size={20} />,
    href: '/blogs',
  },
  {
    label: 'Produkti',
    icon: <ShoppingBag size={20} />,
    href: '/produkti',
  },
  {
    label: 'Lidojumu cenas',
    icon: <TicketsPlane size={20} />,
    href: '/lidojumi-cenas',
  },
  {
    label: 'Par mani',
    icon: <SquareUserRound size={20} />,
    href: '/par-mani',
  },
  {
    label: 'Kontakti',
    icon: <MailCheck size={20} />,
    href: '/kontakti',
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
