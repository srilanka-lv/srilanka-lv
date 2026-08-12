import { createHash } from 'node:crypto';

import {
  AGENT_SKILL_DESCRIPTION,
  AGENT_SKILL_NAME,
  buildAgentSkillMarkdown,
} from '@/shared/constants/agent-skill';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

// Agent Skills Discovery RFC v0.2.0 index.
export const GET = (): Response => {
  const siteUrl = getSiteUrl();
  const markdown = buildAgentSkillMarkdown(siteUrl);
  const digest = createHash('sha256').update(markdown, 'utf8').digest('hex');

  const index = {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: AGENT_SKILL_NAME,
        type: 'skill-md',
        description: AGENT_SKILL_DESCRIPTION,
        url: `${siteUrl}/.well-known/agent-skills/${AGENT_SKILL_NAME}/SKILL.md`,
        digest: `sha256:${digest}`,
      },
    ],
  };

  return Response.json(index);
};
