import type { FunctionComponent } from 'react';

import { Heading } from '@/shared/components/heading';

import { footerHeadingStyle, footerListStyle } from '../footer/styles.css';

export const FooterProducts: FunctionComponent = () => {
  return (
    <div>
      <Heading as="h6" className={footerHeadingStyle}>
        Mūsu produkti
      </Heading>
      <ul className={footerListStyle}>
        <li>Footer</li>
      </ul>
    </div>
  );
};
