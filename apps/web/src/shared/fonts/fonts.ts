import { TikTok_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const tikTokSans = TikTok_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-tik-tok-sans',
});

export const burchelli = localFont({
  src: './burchelli.woff2',
  variable: '--font-burchelli',
});
