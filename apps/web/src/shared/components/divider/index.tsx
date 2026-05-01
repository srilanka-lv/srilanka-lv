import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import { dividerStyles } from './styles.css';

type DividerProps = {
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'small' | 'medium' | 'large' | 'none';
  color?: 'default' | 'subtle';
} & Omit<ComponentPropsWithoutRef<'hr'>, 'children'>;

export function Divider({ variant, spacing, color, className, ...props }: DividerProps) {
  return <hr className={clsx(dividerStyles({ variant, spacing, color }), className)} {...props} />;
}
