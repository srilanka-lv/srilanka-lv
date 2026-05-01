import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { textStyles } from './styles.css';

type AllowedElement = 'p' | 'span' | 'strong' | 'em' | 'small' | 'label';

type TextOwnProps<T extends AllowedElement = 'p'> = {
  as?: T;
  fontSize?: 'small' | 'medium' | 'large';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontStyle?: 'normal' | 'italic';
  children: ReactNode;
};

export type TextProps<T extends AllowedElement = 'p'> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

export function Text<T extends AllowedElement = 'p'>({
  as,
  fontSize,
  fontWeight,
  fontStyle,
  children,
  className,
  ...props
}: TextProps<T> & { className?: string }) {
  const Component = as ?? 'p';

  return (
    // @ts-expect-error: Generic polymorphic spread is not resolvable by TypeScript.
    <Component
      className={clsx(textStyles({ fontSize, fontWeight, fontStyle }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
