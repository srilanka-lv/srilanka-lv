type PortableTextSpan = {
  _type: 'span';
  text?: string;
  marks?: string[];
};

type PortableTextMarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

type PortableTextBlock = {
  _type: 'block';
  style?: string;
  listItem?: string;
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
};

type UnknownBlock = Record<string, unknown> & { _type: string };

export type CustomTypeSerializers = Record<string, (value: unknown) => string | null>;

const HEADING_PREFIXES: Record<string, string> = {
  h1: '# ',
  h2: '## ',
  h3: '### ',
  h4: '#### ',
  h5: '##### ',
  h6: '###### ',
};

const isTextBlock = (block: UnknownBlock): block is PortableTextBlock & UnknownBlock =>
  block._type === 'block';

const renderSpan = (span: PortableTextSpan, markDefs: PortableTextMarkDef[]): string => {
  let text = span.text ?? '';

  if (!text) {
    return '';
  }

  for (const mark of span.marks ?? []) {
    if (mark === 'strong') {
      text = `**${text}**`;
    } else if (mark === 'em') {
      text = `*${text}*`;
    } else if (mark === 'code') {
      text = `\`${text}\``;
    } else {
      const markDef = markDefs.find((def) => def._key === mark);

      if (markDef?._type === 'link' && markDef.href) {
        text = `[${text}](${markDef.href})`;
      }
    }
  }

  return text;
};

const renderChildren = (block: PortableTextBlock): string =>
  (block.children ?? [])
    .map((child) => renderSpan(child, block.markDefs ?? []))
    .join('')
    .trim();

const renderTextBlock = (block: PortableTextBlock): string | null => {
  const text = renderChildren(block);

  if (!text) {
    return null;
  }

  const style = block.style ?? 'normal';
  const headingPrefix = HEADING_PREFIXES[style];

  if (headingPrefix) {
    return `${headingPrefix}${text}`;
  }

  if (style === 'blockquote') {
    return text
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n');
  }

  return text;
};

export const portableTextToMarkdown = (
  blocks: readonly unknown[] | null | undefined,
  customTypes: CustomTypeSerializers = {},
): string => {
  if (!blocks || blocks.length === 0) {
    return '';
  }

  const parts: string[] = [];
  let listLines: string[] = [];
  let listType: string | null = null;
  const listCounters = new Map<number, number>();

  const flushList = (): void => {
    if (listLines.length > 0) {
      parts.push(listLines.join('\n'));
      listLines = [];
    }
    listType = null;
    listCounters.clear();
  };

  for (const rawBlock of blocks) {
    const block = rawBlock as UnknownBlock;

    if (isTextBlock(block) && block.listItem) {
      const text = renderChildren(block);

      if (!text) {
        continue;
      }

      const level = Math.max(block.level ?? 1, 1);

      if (level === 1 && listType !== null && listType !== block.listItem) {
        flushList();
      }

      if (level === 1) {
        listType = block.listItem;
      }

      const indent = '  '.repeat(level - 1);

      // A new deeper run restarts numbering once the list returns to a
      // shallower level.
      for (const countedLevel of listCounters.keys()) {
        if (countedLevel > level) {
          listCounters.delete(countedLevel);
        }
      }

      if (block.listItem === 'number') {
        const count = (listCounters.get(level) ?? 0) + 1;
        listCounters.set(level, count);
        listLines.push(`${indent}${count}. ${text}`);
      } else {
        listLines.push(`${indent}- ${text}`);
      }

      continue;
    }

    flushList();

    if (isTextBlock(block)) {
      const rendered = renderTextBlock(block);

      if (rendered) {
        parts.push(rendered);
      }

      continue;
    }

    const serialize = customTypes[block._type];
    const rendered = serialize?.(block);

    if (rendered) {
      parts.push(rendered);
    }
  }

  flushList();

  if (parts.length === 0) {
    return '';
  }

  return `${parts.join('\n\n')}\n`;
};
