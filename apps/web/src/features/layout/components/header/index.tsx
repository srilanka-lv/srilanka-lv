import clsx from 'clsx';
import type { FunctionComponent } from 'react';

import { Logo } from '@/shared/components/logo';

import { Navigation } from '../navigation';
import { headerStyle, logoStyle } from './styles.css';

type HeaderProps = {
  className?: string;
};

export const Header: FunctionComponent<HeaderProps> = ({ className }) => (
  <header className={clsx(headerStyle, className)}>
    <Logo className={logoStyle} />
    <Navigation />
  </header>
);
