import { Lora } from 'next/font/google';
import localFont from 'next/font/local';

export const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lora',
});

export const burchelli = localFont({
  src: './burchelli.woff2',
  variable: '--font-burchelli',
});
