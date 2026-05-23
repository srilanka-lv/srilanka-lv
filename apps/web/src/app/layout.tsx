import '@/shared/styles/layers/layers.css';
import '@/shared/styles/reset.css';
import '@/shared/styles/global.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { Layout } from '@/features/layout/components/layout';
import { ThemeScript } from '@/shared/components/theme-script';
import { comme } from '@/shared/fonts/fonts';
import { lightTheme as theme } from '@/shared/styles/themes/theme.light.css';
import { darkColors, lightColors } from '@/shared/styles/tokens/colors';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: lightColors.background },
    { media: '(prefers-color-scheme: dark)', color: darkColors.background },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Šrilanka.lv',
    default: 'Šrilanka.lv',
  },
  metadataBase: process.env.NEXT_PUBLIC_SELF_URL
    ? new URL(process.env.NEXT_PUBLIC_SELF_URL)
    : undefined,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/og-image.png',
  },
};

type RootLayoutReturnType = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutReturnType) {
  return (
    <html lang="lv" className={`${comme.variable} ${theme}`} translate="no">
      <head>
        <ThemeScript />
      </head>
      <Layout>{children}</Layout>
    </html>
  );
}
