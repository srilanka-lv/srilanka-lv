import { describe, expect, it } from 'bun:test';
import type { SanityTable } from 'structured-table';

import { sanityTableToMarkdown } from './sanity-table-to-markdown';

const table: SanityTable = {
  name: 'budget',
  caption: 'Daily budget',
  cols: 2,
  showSerialIndex: false,
  header: {
    uid: 'h',
    cells: [
      { uid: 'h1', type: 'text', value: 'Item' },
      { uid: 'h2', type: 'text', value: 'Cost' },
    ],
  },
  body: [
    {
      uid: 'r1',
      cells: [
        { uid: 'c1', type: 'text', value: 'Hostel | night' },
        { uid: 'c2', type: 'link', text: 'from 10 EUR', href: 'https://example.com' },
      ],
    },
  ],
};

describe('sanityTableToMarkdown', () => {
  it('renders header, divider, body and caption with escaped pipes', () => {
    expect(sanityTableToMarkdown(table)).toBe(
      [
        '| Item | Cost |',
        '| --- | --- |',
        '| Hostel \\| night | [from 10 EUR](https://example.com) |',
        '',
        '*Daily budget*',
      ].join('\n'),
    );
  });

  it('renders an empty header row when the table has none', () => {
    const headerless: SanityTable = { ...table, header: undefined, caption: undefined };

    expect(sanityTableToMarkdown(headerless)).toBe(
      [
        '|   |   |',
        '| --- | --- |',
        '| Hostel \\| night | [from 10 EUR](https://example.com) |',
      ].join('\n'),
    );
  });
});
