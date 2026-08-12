import { buildAgentSkillMarkdown } from '@/shared/constants/agent-skill';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

export const GET = (): Response => {
  const markdown = buildAgentSkillMarkdown(getSiteUrl());

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
