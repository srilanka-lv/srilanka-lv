export type Placeholder = {
  file: string;
  line: number;
  /** The question passed to `todoGrieta`, or null for a bare marker. */
  question: string | null;
};

// The marker as it appears in rendered copy (`[TODO_GRIETA: …]`). The bare
// identifier, as code that imports the constant uses it, is not a placeholder.
const MARKER = 'TODO_GRIETA:';

// `todoGrieta('…')`, `todoGrieta("…")` or `todoGrieta(`…`)`, possibly wrapped
// over several lines by the formatter.
const CALL_PATTERN = /todoGrieta\(\s*(['"`])((?:\\.|(?!\1)[\s\S])*)\1\s*,?\s*\)/g;

const lineOf = (source: string, index: number): number => source.slice(0, index).split('\n').length;

/**
 * Every unfilled placeholder in one source file: each `todoGrieta(…)` call,
 * plus any bare TODO_GRIETA marker outside one (copy pasted from a render).
 */
export const findPlaceholders = (file: string, source: string): Placeholder[] => {
  const found: Placeholder[] = [];
  const covered: [number, number][] = [];

  for (const match of source.matchAll(CALL_PATTERN)) {
    const start = match.index;
    covered.push([start, start + match[0].length]);
    found.push({
      file,
      line: lineOf(source, start),
      question: match[2].replace(/\s+/g, ' ').trim(),
    });
  }

  let index = source.indexOf(MARKER);
  while (index !== -1) {
    const position = index;
    if (!covered.some(([from, to]) => position >= from && position < to)) {
      found.push({ file, line: lineOf(source, position), question: null });
    }
    index = source.indexOf(MARKER, index + MARKER.length);
  }

  return found.sort((a, b) => a.line - b.line);
};
