import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

// RFC 9727 API catalog in the RFC 9264 linkset+json format.
export const GET = (): Response => {
  const siteUrl = getSiteUrl();

  const catalog = {
    linkset: [
      {
        anchor: `${siteUrl}/`,
        'service-desc': [
          {
            href: `${siteUrl}/openapi.json`,
            type: 'application/openapi+json',
          },
        ],
        'service-doc': [
          {
            href: `${siteUrl}/llms.txt`,
            type: 'text/markdown',
          },
        ],
        status: [
          {
            href: `${siteUrl}/api/up`,
          },
        ],
      },
    ],
  };

  return Response.json(catalog, {
    headers: {
      'Content-Type': 'application/linkset+json',
    },
  });
};
