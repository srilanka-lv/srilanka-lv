import type { FunctionComponent } from 'react';

import { formatLatvianMonthYear } from '@/shared/utils/format-latvian-month-year';

import { contentUpdatedAtStyle } from './styles.css';

type ContentUpdatedAtProps = {
  updatedAt: string;
};

export const ContentUpdatedAt: FunctionComponent<ContentUpdatedAtProps> = ({ updatedAt }) => (
  <p className={contentUpdatedAtStyle}>Atjaunots: {formatLatvianMonthYear(updatedAt)}</p>
);
