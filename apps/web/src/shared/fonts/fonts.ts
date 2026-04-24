import { Galindo, Lora } from 'next/font/google';

export const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lora',
});

export const galindo = Galindo({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-galindo',
});
