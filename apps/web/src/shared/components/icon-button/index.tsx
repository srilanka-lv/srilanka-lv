import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Button } from '../button';

type AllowedElement = 'button' | 'a';

type IconButtonOwnProps<T extends AllowedElement = 'button'> = {
  as?: T;
  iconSlot: ReactNode;
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
};

export type IconButtonProps<T extends AllowedElement = 'button'> = IconButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof IconButtonOwnProps<T>>;

export function IconButton<T extends AllowedElement = 'button'>({
  iconSlot,
  ...rest
}: IconButtonProps<T> & { className?: string }) {
  return <Button iconSlot={iconSlot} {...rest} />;
}
