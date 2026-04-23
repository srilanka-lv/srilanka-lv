import 'modern-normalize/modern-normalize.css';

import type { Metadata } from 'next';
import { PublicEnvScript, env } from 'next-runtime-env';
import type { ReactNode } from 'react';

import '@/shared/styles/global.css';

import { ThemeScript } from '@/shared/components/theme-script';
import { lora } from '@/shared/fonts/fonts';
import { lightTheme } from '@/shared/styles/themes/theme.light.css';

export const metadata: Metadata = {
  title: {
    template: '%s | SriLanka.lv',
    default: 'SriLanka.lv',
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
    <html lang="lv" className={`${lora.variable} ${lightTheme}`}>
      <head>
        <PublicEnvScript />
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
