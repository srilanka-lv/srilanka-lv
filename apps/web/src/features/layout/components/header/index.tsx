import clsx from 'clsx';
import type { FunctionComponent } from 'react';

import { Logo } from '@/shared/components/logo';

import { Navigation } from '../navigation';
import { headerStyle } from './styles.css';

type HeaderProps = {
  className?: string;
};

export const Header: FunctionComponent<HeaderProps> = ({ className }) => {
  return (
    <header className={clsx(headerStyle, className)}>
      <Logo size="medium" />
      <Navigation />
    </header>
  );
};
