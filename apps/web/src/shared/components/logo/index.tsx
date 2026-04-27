'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';

import { Heading } from '../heading';
import { logoStyles } from './styles.css';

type LogoProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large';
};

export const Logo: FunctionComponent<LogoProps> = ({ className, size }) => {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <Heading as="span" variant="unstyled" className={clsx(logoStyles({ size }), className)}>
        Šrilanka.lv
      </Heading>
    );
  }

  return (
    <Link href="/">
      <Heading as="span" variant="unstyled" className={clsx(logoStyles({ size }), className)}>
        Šrilanka.lv
      </Heading>
    </Link>
  );
};
