import { createContext } from '@/shared/utils/create-context';

import type { BreakpointRepository } from '../interfaces/breakpoint-repository-interface';

export const [BreakpointRepositoryProvider, useBreakpointRepository] =
  createContext<BreakpointRepository>({
    name: 'BreakpointRepositoryContext',
    hookName: 'useBreakpointRepository',
    providerName: '<BreakpointRepositoryProvider />',
  });
