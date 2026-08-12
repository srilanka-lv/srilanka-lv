import type { SanityTable, TableCell, TableRow } from 'structured-table';

const renderCellText = (cell: TableCell): string => {
  if (cell.type === 'link') {
    return `[${cell.text}](${cell.href})`;
  }

  if (cell.type === 'button') {
    return cell.url ? `[${cell.text}](${cell.url})` : cell.text;
  }

  if (typeof cell.value === 'string') {
    return cell.value;
  }

  return cell.value.map((node) => node.data).join('');
};

const renderRow = (row: TableRow): string => {
  const cells = row.cells.map((cell) =>
    renderCellText(cell).replaceAll('|', '\\|').replaceAll(/\s+/g, ' ').trim(),
  );

  return `| ${cells.join(' | ')} |`;
};

export const sanityTableToMarkdown = (table: SanityTable): string => {
  const cols = table.header?.cells.length ?? table.body[0]?.cells.length ?? table.cols;

  if (!cols) {
    return '';
  }

  const headerRow = table.header
    ? renderRow(table.header)
    : `| ${Array.from({ length: cols }, () => ' ').join(' | ')} |`;
  const divider = `| ${Array.from({ length: cols }, () => '---').join(' | ')} |`;
  const bodyRows = [...table.body, ...(table.footer ? [table.footer] : [])].map(renderRow);

  const lines = [headerRow, divider, ...bodyRows];

  if (table.caption) {
    lines.push('', `*${table.caption}*`);
  }

  return lines.join('\n');
};
