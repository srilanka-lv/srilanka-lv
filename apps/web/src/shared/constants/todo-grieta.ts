/**
 * Marker for copy only Grieta (or the partner, Ceļo ar Mariku) can supply:
 * a fact the site must not guess. It renders on the page as-is so nobody can
 * miss it, and `bun run check:placeholders` fails while any call remains, so
 * a pull request carrying one is not ready to merge.
 *
 * Pass the question that needs answering as a string literal; the check lists
 * it. Fill a placeholder by replacing the whole call with the final copy.
 */
export const TODO_GRIETA = 'TODO_GRIETA';

export const todoGrieta = (question: string): string => `[${TODO_GRIETA}: ${question}]`;
