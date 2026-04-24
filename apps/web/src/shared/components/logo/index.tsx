import clsx from 'clsx';
import type { FunctionComponent } from 'react';

import { Heading } from '../heading';
import { logoStyles } from './styles.css';

type LogoProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large';
};

export const Logo: FunctionComponent<LogoProps> = ({ className, size }) => {
  return (
    <Heading as="span" variant="unstyled" className={clsx(logoStyles({ size }), className)}>
      Šrilanka.lv
    </Heading>
  );
};
