import type { FunctionComponent } from 'react';

import { todoGrietaMarkStyle } from './styles.css';

type TodoGrietaMarkProps = {
  /** The string the todoGrieta helper returns, so the placeholder check still finds the call. */
  children: string;
};

/**
 * Shows an unfilled placeholder loudly on the page, so a review or a
 * screenshot cannot miss it. See `todoGrieta` for how placeholders block a
 * merge.
 */
export const TodoGrietaMark: FunctionComponent<TodoGrietaMarkProps> = ({ children }) => (
  <mark className={todoGrietaMarkStyle}>{children}</mark>
);
