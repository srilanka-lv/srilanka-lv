import 'modern-normalize/modern-normalize.css';

import type { Metadata, Viewport } from 'next';
import { PublicEnvScript, env } from 'next-runtime-env';
import type { ReactNode } from 'react';

import '@/shared/styles/global.css';

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
  metadataBase: env('NEXT_PUBLIC_SELF_URL'),
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
        <PublicEnvScript />
        <ThemeScript />
      </head>
      <Layout>{children}</Layout>
    </html>
  );
}
