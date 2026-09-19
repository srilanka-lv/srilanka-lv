import type { FunctionComponent, PropsWithChildren } from 'react';

import { todoStyle } from './styles.css';

/**
 * A visible placeholder inside the guide for a fact, number or line that
 * still has to come from Grieta or Dave. Loud on purpose: none of these may
 * survive to the release.
 */
export const GuideTodo: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <mark className={todoStyle} data-guide-todo="">
    [{children}]
  </mark>
);
