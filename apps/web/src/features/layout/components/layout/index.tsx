import type { FunctionComponent, PropsWithChildren } from 'react';

import { AppContextProviders } from '@/shared/components/app-context-providers';

import { Header } from '../header';
import { layoutStyle } from './styles.css';

type LayoutProps = PropsWithChildren;

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <AppContextProviders>
      <body className={layoutStyle}>
        <Header />
        <main>{children}</main>
        <aside></aside>
        <footer></footer>
      </body>
    </AppContextProviders>
  );
};
