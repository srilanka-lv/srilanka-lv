'use client';

import {
  type FunctionComponent,
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import { useBreakpointRepository } from '@/features/breakpoint/contexts/breakpoint-repository-context';

import type { LayoutStore } from '../types/layout-store';
import { createLayoutAtoms } from './layout-store-atoms';

const LayoutStoreContext = createContext<LayoutStore>(undefined);

export const LayoutStoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const breakpointRepository = useBreakpointRepository();

  const [storeContext] = useState(() => {
    const atoms = createLayoutAtoms(breakpointRepository);

    return atoms;
  });

  return <LayoutStoreContext.Provider value={storeContext}>{children}</LayoutStoreContext.Provider>;
};

export const useLayoutStore = () => {
  const context = useContext(LayoutStoreContext);

  if (!context) {
    throw new Error('useLayoutStore must be used within a LayoutStoreProvider');
  }

  return context;
};
