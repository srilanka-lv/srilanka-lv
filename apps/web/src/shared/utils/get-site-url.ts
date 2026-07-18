export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SELF_URL as string;
}
