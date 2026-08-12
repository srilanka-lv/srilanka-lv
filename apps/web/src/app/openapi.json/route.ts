import { SITE_NAME } from '@/shared/constants/site-name';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

const markdownResponse = {
  description: 'Markdown document',
  content: {
    'text/markdown': {
      schema: { type: 'string' },
    },
  },
};

export const GET = (): Response => {
  const siteUrl = getSiteUrl();

  const document = {
    openapi: '3.1.0',
    info: {
      title: `${SITE_NAME} public endpoints`,
      description:
        'Machine-readable endpoints of the srilanka.lv travel guide. Content pages also support markdown content negotiation: request any page URL with "Accept: text/markdown" to receive a markdown representation.',
      version: '1.0.0',
    },
    servers: [{ url: siteUrl }],
    paths: {
      '/llms.txt': {
        get: {
          summary: 'Content map of the site as markdown (llms.txt convention)',
          responses: { '200': markdownResponse },
        },
      },
      '/sitemap.xml': {
        get: {
          summary: 'XML sitemap',
          responses: {
            '200': {
              description: 'Sitemap document',
              content: {
                'application/xml': {
                  schema: { type: 'string' },
                },
              },
            },
          },
        },
      },
      '/robots.txt': {
        get: {
          summary: 'Robots and Content-Signal directives',
          responses: {
            '200': {
              description: 'Robots document',
              content: {
                'text/plain': {
                  schema: { type: 'string' },
                },
              },
            },
          },
        },
      },
      '/api/up': {
        get: {
          summary: 'Health check',
          responses: {
            '200': {
              description: 'Service is up',
              content: {
                'text/plain': {
                  schema: { type: 'string' },
                },
              },
            },
          },
        },
      },
      '/.well-known/api-catalog': {
        get: {
          summary: 'API catalog (RFC 9727)',
          responses: {
            '200': {
              description: 'Linkset catalog',
              content: {
                'application/linkset+json': {
                  schema: { type: 'object' },
                },
              },
            },
          },
        },
      },
      '/.well-known/agent-skills/index.json': {
        get: {
          summary: 'Agent skills discovery index',
          responses: {
            '200': {
              description: 'Skills index',
              content: {
                'application/json': {
                  schema: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
  };

  return Response.json(document, {
    headers: {
      'Content-Type': 'application/openapi+json',
    },
  });
};
