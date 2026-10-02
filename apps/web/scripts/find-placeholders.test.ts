import { describe, expect, it } from 'bun:test';

import { findPlaceholders } from './find-placeholders';

describe('findPlaceholders', () => {
  it('finds nothing in filled copy', () => {
    expect(findPlaceholders('a.tsx', "const answer = 'Jā, droši.';")).toEqual([]);
  });

  it('lists each todoGrieta call with its question and line', () => {
    const source = [
      "const a = todoGrieta('Kāds ir vecums?');",
      '',
      'const b = <p>{todoGrieta("Vai var vienvietīgu istabu?")}</p>;',
    ].join('\n');

    expect(findPlaceholders('a.tsx', source)).toEqual([
      { file: 'a.tsx', line: 1, question: 'Kāds ir vecums?' },
      { file: 'a.tsx', line: 3, question: 'Vai var vienvietīgu istabu?' },
    ]);
  });

  it('reads a call the formatter wrapped over several lines', () => {
    const source = [
      'const a = todoGrieta(',
      "  'Kas notiek, ja grupa',",
      ');',
      'const b = todoGrieta(`Kas notiek,',
      '  ja man jāatceļ?`);',
    ].join('\n');

    expect(findPlaceholders('a.tsx', source)).toEqual([
      { file: 'a.tsx', line: 1, question: 'Kas notiek, ja grupa' },
      { file: 'a.tsx', line: 4, question: 'Kas notiek, ja man jāatceļ?' },
    ]);
  });

  it('keeps an escaped quote inside the question', () => {
    expect(findPlaceholders('a.ts', "todoGrieta('SIA \\'MG Travel\\'?')")).toEqual([
      { file: 'a.ts', line: 1, question: "SIA \\'MG Travel\\'?" },
    ]);
  });

  it('flags a bare marker that is not part of a call', () => {
    const source = "const copy = 'Cena: [TODO_GRIETA: pusdienas]';";

    expect(findPlaceholders('a.ts', source)).toEqual([{ file: 'a.ts', line: 1, question: null }]);
  });
});
