import { env } from 'next-runtime-env';

export function getSiteUrl(): string {
  return env('NEXT_PUBLIC_SELF_URL') as string;
}
