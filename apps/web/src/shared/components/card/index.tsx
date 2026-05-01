import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cardStyles } from './styles.css';

type AllowedElement = 'div' | 'section' | 'article' | 'aside';

type CardOwnProps<T extends AllowedElement = 'div'> = {
  as?: T;
  variant?: 'filled' | 'outline';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  radius?: 'small' | 'medium' | 'large';
  children: ReactNode;
};

export type CardProps<T extends AllowedElement = 'div'> = CardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>;

export function Card<T extends AllowedElement = 'div'>({
  as,
  variant,
  shadow,
  radius,
  children,
  className,
  ...props
}: CardProps<T> & { className?: string }) {
  const Component = as ?? 'div';

  return (
    <Component className={clsx(cardStyles({ variant, shadow, radius }), className)} {...props}>
      {children}
    </Component>
  );
}
