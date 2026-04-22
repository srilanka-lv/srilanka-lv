import type { Metadata } from 'next';
import { PublicEnvScript } from 'next-runtime-env';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Ceļojums uz Šrilanku | SriLanka.lv',
  description: 'Viss kas jāzina pirms ceļo uz Šrilanku',
};

type RootLayoutReturnType = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutReturnType) {
  return (
    <html lang="lv">
      <head>
        <PublicEnvScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
