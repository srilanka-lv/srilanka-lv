import type { FunctionComponent } from 'react';

import { listStyle, summaryStyle, tocStyle } from './styles.css';

export type GuideTocItem = {
  id: string;
  title: string;
};

type GuideTocProps = {
  items: GuideTocItem[];
};

/**
 * Table of contents built from the section list. A native `details` element,
 * open by default, so it works with no JavaScript and collapses on a phone
 * with one tap.
 */
export const GuideToc: FunctionComponent<GuideTocProps> = ({ items }) => (
  <nav aria-label="Saturs">
    <details className={tocStyle} open>
      <summary className={summaryStyle}>Saturs</summary>
      <ol className={listStyle}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ol>
    </details>
  </nav>
);
