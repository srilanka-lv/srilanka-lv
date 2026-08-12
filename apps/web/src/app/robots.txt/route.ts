import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

export const GET = (): Response => {
  const siteUrl = getSiteUrl();

  const lines = [
    'User-Agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    '',
    `Host: ${siteUrl}`,
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ];

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
