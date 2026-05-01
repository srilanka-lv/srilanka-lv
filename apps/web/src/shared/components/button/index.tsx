import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { buttonStyles } from './styles.css';

type AllowedElement = 'button' | 'a';

type WithIcon = {
  iconSlot: ReactNode;
  children?: ReactNode;
};

type WithoutIcon = {
  iconSlot?: never;
  children: ReactNode;
};

type ButtonOwnProps<T extends AllowedElement = 'button'> = {
  as?: T;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
} & (WithIcon | WithoutIcon);

export type ButtonProps<T extends AllowedElement = 'button'> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

export function Button<T extends AllowedElement = 'button'>({
  as,
  variant,
  size,
  iconSlot,
  children,
  className,
  ...props
}: ButtonProps<T> & { className?: string }) {
  const Component = as ?? 'button';
  const isButton = Component === 'button';
  const iconOnly = Boolean(iconSlot && !children);

  return (
    // @ts-expect-error: This button can be a button or an anchor HTML element. Generic polymorphic spread is not resolvable by TypeScript.
    <Component
      {...(!isButton && { role: 'button', tabIndex: 0 })}
      {...(isButton && { type: 'button' })}
      className={clsx(buttonStyles({ variant, size, iconOnly }), className)}
      {...props}
    >
      {iconSlot}
      {children}
    </Component>
  );
}
