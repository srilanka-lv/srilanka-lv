import { getSiteUrl } from './get-site-url';

export function getLicenseUrl(): string {
  return `${getSiteUrl()}/license`;
}
