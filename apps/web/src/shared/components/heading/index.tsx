import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { headingStyles } from './styles.css';

type AllowedElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'unstyled';

type HeadingOwnProps<T extends AllowedElement = 'h2'> = {
  as?: T;
  variant?: Variant;
  children: ReactNode;
};

export type HeadingProps<T extends AllowedElement = 'h2'> = HeadingOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof HeadingOwnProps<T>>;

export function Heading<T extends AllowedElement = 'h2'>({
  as,
  variant,
  children,
  className,
  ...rest
}: HeadingProps<T> & { className?: string }) {
  const Component = as ?? 'h2';
  const resolvedVariant = variant ?? (Component === 'span' ? 'unstyled' : (Component as Variant));

  return (
    <Component className={clsx(headingStyles({ variant: resolvedVariant }), className)} {...rest}>
      {children}
    </Component>
  );
}
