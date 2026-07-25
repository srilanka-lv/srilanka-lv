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
