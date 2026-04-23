import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { buttonStyles } from './index.styles.css';

type ButtonOwnProps<T extends ElementType = 'button'> = {
  as?: T;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
};

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

export function Button<T extends ElementType = 'button'>({
  as,
  variant,
  size,
  children,
  className,
  ...rest
}: ButtonProps<T> & { className?: string }) {
  const Component = as ?? 'button';

  return (
    <Component
      className={`${buttonStyles({ variant, size })}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
