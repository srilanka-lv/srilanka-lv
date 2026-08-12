import { buildSiteOverviewMarkdown } from '@/features/sanity/utils/build-site-overview-markdown';

export const revalidate = 3600;

export const GET = async (): Promise<Response> => {
  const markdown = await buildSiteOverviewMarkdown();

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
