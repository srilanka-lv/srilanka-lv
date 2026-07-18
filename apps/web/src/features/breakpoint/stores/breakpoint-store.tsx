'use client';

import {
  type FunctionComponent,
  type PropsWithChildren,
  createContext,
  use,
  useState,
} from 'react';

import { useBreakpointRepository } from '../contexts/breakpoint-repository-context';
import type { BreakpointStore } from '../types/breakpoint-store';
import { createBreakpointAtoms } from './breakpoint-store-atoms';

const BreakpointStoreContext = createContext<BreakpointStore>(undefined);

export const BreakpointStoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const breakpointRepository = useBreakpointRepository();

  const [storeContext] = useState(() => {
    const atoms = createBreakpointAtoms(breakpointRepository);

    return atoms;
  });

  return (
    <BreakpointStoreContext.Provider value={storeContext}>
      {children}
    </BreakpointStoreContext.Provider>
  );
};

export const useBreakpointStore = () => {
  const context = use(BreakpointStoreContext);

  if (!context) {
    throw new Error('useBreakpointStore must be used within a BreakpointStoreProvider');
  }

  return context;
};
