import type { FunctionComponent, PropsWithChildren } from 'react';

import { AppContextProviders } from '@/shared/components/app-context-providers';

import { Footer } from '../footer';
import { Header } from '../header';
import { SubFooter } from '../sub-footer';
import { layoutStyle, mainStyle } from './styles.css';

type LayoutProps = PropsWithChildren;

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <AppContextProviders>
    <body className={layoutStyle}>
      <Header />
      <main className={mainStyle}>{children}</main>
      <Footer />
      <SubFooter />
    </body>
  </AppContextProviders>
);
