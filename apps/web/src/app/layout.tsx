import type { Metadata } from 'next';
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
      <body>{children}</body>
    </html>
  );
}
