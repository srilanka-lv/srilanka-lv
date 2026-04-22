'use client';

import type { ReactNode } from 'react';

import { createSanityClient } from '../providers/sanity-client';
import { SanityContext } from './sanity-context';

const client = createSanityClient();

interface SanityContextProviderProps {
  children: ReactNode;
}

export function SanityContextProvider({ children }: SanityContextProviderProps) {
  return <SanityContext value={{ client }}>{children}</SanityContext>;
}
