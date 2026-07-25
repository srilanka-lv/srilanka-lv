import { blockText } from './block-content-to-text';

type PortableBlock = { _type?: string; style?: string };

export type FaqPair = {
  question: string;
  answer: string;
};

const HEADING_STYLES = new Set(['h2', 'h3']);

/**
 * Derives question/answer pairs from portable text: a question-shaped h2/h3
 * (ending with "?") becomes the question, the paragraphs until the next
 * heading become the answer.
 */
export function extractFaqFromBlockContent(blocks: unknown): FaqPair[] {
  if (!Array.isArray(blocks)) {
    return [];
  }

  const pairs: FaqPair[] = [];
  let question: string | null = null;
  let answerParts: string[] = [];

  const flush = () => {
    const answer = answerParts.join(' ').trim();
    if (question && answer !== '') {
      pairs.push({ question, answer });
    }
    question = null;
    answerParts = [];
  };

  for (const rawBlock of blocks) {
    const block = rawBlock as PortableBlock;

    if (block._type === 'block' && HEADING_STYLES.has(block.style ?? '')) {
      flush();
      const heading = blockText(block);
      if (heading.endsWith('?')) {
        question = heading;
      }
      continue;
    }

    if (question && block._type === 'block') {
      const text = blockText(block);
      if (text !== '') {
        answerParts.push(text);
      }
    }
  }

  flush();

  return pairs;
}
