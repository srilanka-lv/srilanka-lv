import '@/shared/styles/global.css';
import '@/shared/styles/layers/layers.css';
import '@/shared/styles/reset.css';

import type { Metadata, Viewport } from 'next';
import type { FunctionComponent, ReactNode } from 'react';

import { Layout } from '@/features/layout/components/layout';
import { ThemeScript } from '@/shared/components/theme-script';
import { comme } from '@/shared/fonts/fonts';
import { lightTheme as theme } from '@/shared/styles/themes/theme.light.css';
import { darkColors, lightColors } from '@/shared/styles/tokens/colors';

export const revalidate = 3600;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: lightColors.background },
    { media: '(prefers-color-scheme: dark)', color: darkColors.background },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Šrilanka 26/27',
    default: 'Šrilanka.lv',
  },
  metadataBase: process.env.NEXT_PUBLIC_SELF_URL
    ? new URL(process.env.NEXT_PUBLIC_SELF_URL)
    : undefined,
  openGraph: {
    images: '/og-image.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Šrilanka.lv',
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/splash/iphone-16-pro-max-1320x2868.jpg',
        media:
          '(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/iphone-16-pro-1206x2622.jpg',
        media:
          '(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/iphone-15-pro-max-1290x2796.jpg',
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/iphone-15-pro-1179x2556.jpg',
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/iphone-14-1170x2532.jpg',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/iphone-13-mini-1125x2436.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/iphone-11-pro-max-1242x2688.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/iphone-11-828x1792.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/iphone-se-750x1334.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/ipad-pro-129-2048x2732.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/ipad-pro-11-1668x2388.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/ipad-air-1640x2360.jpg',
        media:
          '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/ipad-mini-1488x2266.jpg',
        media:
          '(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
};

type RootLayoutReturnType = Readonly<{
  children: ReactNode;
}>;

const NextRootLayout: FunctionComponent<RootLayoutReturnType> = ({ children }) => (
  <html lang="lv" className={`${comme.variable} ${theme}`} translate="no">
    <head>
      <ThemeScript />
    </head>
    <Layout>{children}</Layout>
  </html>
);

export default NextRootLayout;
