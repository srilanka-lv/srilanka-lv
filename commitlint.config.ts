import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  parserPreset: {
    parserOpts: {
      // Matches: type(scope): emoji subject
      // e.g. "feat: ✨ add new feature" or "fix(auth): 🐛 resolve login bug"
      headerPattern:
        /^(\w+)(?:\((.*)\))?!?:\s(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})(?:\uFE0F)?\s((?:(?!#).)*(?:(?!\s).))(?:\s\(?(#\d*)\)?)?$/u,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'wip',
      ],
    ],
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'scope-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};

export default config;
