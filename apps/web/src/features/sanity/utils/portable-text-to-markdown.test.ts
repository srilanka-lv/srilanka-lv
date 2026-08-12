import { describe, expect, it } from 'bun:test';

import { portableTextToMarkdown } from './portable-text-to-markdown';

const span = (text: string, marks: string[] = []) => ({
  _type: 'span',
  _key: text,
  text,
  marks,
});

describe('portableTextToMarkdown', () => {
  it('renders paragraphs with strong, em, code and link marks', () => {
    const markdown = portableTextToMarkdown([
      {
        _type: 'block',
        _key: 'a',
        style: 'normal',
        markDefs: [{ _key: 'l1', _type: 'link', href: 'https://example.com' }],
        children: [
          span('Plain '),
          span('bold', ['strong']),
          span(' and '),
          span('italic', ['em']),
          span(' and '),
          span('code', ['code']),
          span(' and '),
          span('a link', ['l1']),
          span('.'),
        ],
      },
    ]);

    expect(markdown).toBe(
      'Plain **bold** and *italic* and `code` and [a link](https://example.com).\n',
    );
  });

  it('renders headings and blockquotes', () => {
    const markdown = portableTextToMarkdown([
      { _type: 'block', _key: 'a', style: 'h2', markDefs: [], children: [span('Title')] },
      { _type: 'block', _key: 'b', style: 'h3', markDefs: [], children: [span('Subtitle')] },
      { _type: 'block', _key: 'c', style: 'blockquote', markDefs: [], children: [span('Quoted')] },
    ]);

    expect(markdown).toBe('## Title\n\n### Subtitle\n\n> Quoted\n');
  });

  it('renders bullet and numbered lists with nesting', () => {
    const markdown = portableTextToMarkdown([
      {
        _type: 'block',
        _key: 'a',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [span('First')],
      },
      {
        _type: 'block',
        _key: 'b',
        style: 'normal',
        listItem: 'bullet',
        level: 2,
        markDefs: [],
        children: [span('Nested')],
      },
      {
        _type: 'block',
        _key: 'c',
        style: 'normal',
        listItem: 'number',
        level: 1,
        markDefs: [],
        children: [span('One')],
      },
      {
        _type: 'block',
        _key: 'd',
        style: 'normal',
        listItem: 'number',
        level: 1,
        markDefs: [],
        children: [span('Two')],
      },
    ]);

    expect(markdown).toBe('- First\n  - Nested\n\n1. One\n2. Two\n');
  });

  it('separates a list from a following paragraph', () => {
    const markdown = portableTextToMarkdown([
      {
        _type: 'block',
        _key: 'a',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [span('Item')],
      },
      { _type: 'block', _key: 'b', style: 'normal', markDefs: [], children: [span('After')] },
    ]);

    expect(markdown).toBe('- Item\n\nAfter\n');
  });

  it('uses custom serializers for known custom types and skips unknown ones', () => {
    const markdown = portableTextToMarkdown(
      [
        { _type: 'block', _key: 'a', style: 'normal', markDefs: [], children: [span('Before')] },
        { _type: 'youTube', _key: 'b', url: 'https://youtu.be/x', caption: 'Watch' },
        { _type: 'mysteryWidget', _key: 'c' },
        { _type: 'block', _key: 'd', style: 'normal', markDefs: [], children: [span('After')] },
      ],
      {
        youTube: (value) => {
          const { url, caption } = value as { url?: string; caption?: string };
          return url ? `[${caption ?? 'YouTube'}](${url})` : null;
        },
      },
    );

    expect(markdown).toBe('Before\n\n[Watch](https://youtu.be/x)\n\nAfter\n');
  });

  it('returns an empty string for null or empty input', () => {
    expect(portableTextToMarkdown(null)).toBe('');
    expect(portableTextToMarkdown([])).toBe('');
  });
});
