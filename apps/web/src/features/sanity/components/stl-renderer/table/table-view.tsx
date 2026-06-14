import type { SanityTable, TableCell } from 'structured-table';

import { ButtonCell, LinkCell, TextCell } from '../cell';
import { stlTableStyle } from '../styles.css';

function TableCellContent({ data }: { data: TableCell }) {
  switch (data.type) {
    case 'text':
      return <TextCell data={data} />;
    case 'link':
      return <LinkCell data={data} />;
    case 'button':
      return <ButtonCell data={data} />;
    default:
      return null;
  }
}

function getBodyCellTag(cell: TableCell): 'td' | 'th' {
  return cell.cellType === 'header' ? 'th' : 'td';
}

type TableViewProps = {
  data: SanityTable;
  className?: string;
};

export default function TableView({ data, className }: TableViewProps) {
  const tableClassName = className ? `${stlTableStyle} ${className}` : stlTableStyle;

  return (
    <table className={tableClassName}>
      {data.header ? (
        <thead>
          <tr>
            {data.showSerialIndex ? <th>#</th> : null}
            {data.header.cells.map((cell) => (
              <th
                key={cell.uid}
                colSpan={cell.colSpan ?? 1}
                rowSpan={cell.rowSpan ?? 1}
                style={{ textAlign: cell.align || 'left' }}
                className={cell.class}
              >
                <TableCellContent data={cell} />
              </th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {data.body.map((row, idx) => (
          <tr key={row.uid}>
            {data.showSerialIndex ? <td>{idx + 1}</td> : null}
            {row.cells.map((cell) => {
              const Tag = getBodyCellTag(cell);
              return (
                <Tag
                  key={cell.uid}
                  colSpan={cell.colSpan ?? 1}
                  rowSpan={cell.rowSpan ?? 1}
                  style={{ textAlign: cell.align || 'left' }}
                  className={cell.class}
                >
                  <TableCellContent data={cell} />
                </Tag>
              );
            })}
          </tr>
        ))}
      </tbody>
      {data.footer && data.footer.cells.length > 0 ? (
        <tfoot>
          <tr>
            {data.showSerialIndex ? <th>#</th> : null}
            {data.footer.cells.map((cell) => (
              <th
                key={cell.uid}
                colSpan={cell.colSpan ?? 1}
                rowSpan={cell.rowSpan ?? 1}
                style={{ textAlign: cell.align || 'left' }}
                className={cell.class}
              >
                <TableCellContent data={cell} />
              </th>
            ))}
          </tr>
        </tfoot>
      ) : null}
    </table>
  );
}
