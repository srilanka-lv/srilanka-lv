type PortableSpan = { _type?: string; text?: string };
type PortableBlock = { _type?: string; style?: string; children?: PortableSpan[] };

export function blockText(block: PortableBlock): string {
  if (block._type !== 'block' || !Array.isArray(block.children)) {
    return '';
  }

  return block.children
    .map((child) => child.text ?? '')
    .join('')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

export function blockContentToPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .map((block) => blockText(block as PortableBlock))
    .filter((text) => text !== '')
    .join(' ');
}
