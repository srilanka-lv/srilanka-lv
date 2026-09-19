import type { FunctionComponent } from 'react';

import { inlineTocHiddenStyle } from '../guide-toc-sidebar/styles.css';
import {
  counterStyle,
  itemStyle,
  linkStyle,
  listStyle,
  summaryStyle,
  tocStyle,
} from './styles.css';

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
 * with one tap. Replaced by the sticky sidebar from `xl` up.
 */
export const GuideToc: FunctionComponent<GuideTocProps> = ({ items }) => (
  <nav aria-label="Saturs" className={inlineTocHiddenStyle}>
    <details className={tocStyle} open>
      <summary className={summaryStyle}>Saturs</summary>
      <ol className={listStyle}>
        {items.map((item, index) => (
          <li key={item.id} className={itemStyle}>
            <a href={`#${item.id}`} className={linkStyle}>
              <span className={counterStyle}>{index + 1}.</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  </nav>
);
