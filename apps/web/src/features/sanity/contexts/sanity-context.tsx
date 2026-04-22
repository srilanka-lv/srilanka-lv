import { createContext } from '@/shared/utils/create-context';

import type { SanityRepositoryInterface } from '../interfaces/sanity-repository-interface';

export const [SanityContextProvider, useSanityContext, SanityContext] =
  createContext<SanityRepositoryInterface>({
    name: 'SanityRepositoryContext',
    hookName: 'useSanityRepository',
    providerName: 'SanityRepositoryContextProvider',
    errorMessage: 'useSanityRepository must be used within a SanityRepositoryContextProvider',
  });
