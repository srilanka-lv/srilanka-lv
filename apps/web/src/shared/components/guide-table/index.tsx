import type { FunctionComponent, ReactNode } from 'react';

import { captionStyle, tableStyle, wrapperStyle } from './styles.css';

type GuideTableProps = {
  /** Column headers. Omit for a two-column label/value table that needs none. */
  head?: ReactNode[];
  /** Body rows, one array of cells per row. */
  rows: ReactNode[][];
  /** Shown under the table. Put the date of the numbers here. */
  caption?: string;
};

/**
 * A real HTML table inside a horizontally scrolling wrapper, so wide tables
 * never make the page itself scroll sideways on a phone. Google indexes the
 * cell text, which an infographic cannot offer.
 */
export const GuideTable: FunctionComponent<GuideTableProps> = ({ head, rows, caption }) => (
  <div className={wrapperStyle}>
    <table className={tableStyle}>
      {caption ? <caption className={captionStyle}>{caption}</caption> : null}
      {head ? (
        <thead>
          <tr>
            {head.map((cell, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: header cells are static
              <th key={index} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {rows.map((row, rowIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: rows are static content
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: cells are static content
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
