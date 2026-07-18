import { getSiteUrl } from './get-site-url';

export function getLogoUrl(): string {
  return `${getSiteUrl()}/web-app-manifest-512x512.png`;
}
