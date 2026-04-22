import type { FunctionComponent, PropsWithChildren } from 'react';

import { SanityContextProvider } from '@/features/sanity/contexts/sanity-context';
import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';

// Moved the instantiation of the providers and repository to the top of the file to avoid re-creating them on every render.
const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

export const AppContextProviders: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <SanityContextProvider value={sanityRepository}>{children}</SanityContextProvider>;
};
