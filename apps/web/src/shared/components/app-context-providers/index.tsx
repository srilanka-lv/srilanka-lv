'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';

import { BreakpointRepositoryProvider } from '@/features/breakpoint/contexts/breakpoint-repository-context';
import { DefaultBreakpointRepository } from '@/features/breakpoint/repositories/default-breakpoint-repository';
import { BreakpointStoreProvider } from '@/features/breakpoint/stores/breakpoint-store';
import { LayoutStoreProvider } from '@/features/layout/stores/layout-store';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const AppContextProviders: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const breakpointRepository = new DefaultBreakpointRepository({ breakpoints });

  return (
    <BreakpointRepositoryProvider value={breakpointRepository}>
      <BreakpointStoreProvider>
        <LayoutStoreProvider>{children}</LayoutStoreProvider>
      </BreakpointStoreProvider>
    </BreakpointRepositoryProvider>
  );
};
